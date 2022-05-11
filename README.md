<p align="center">
    <img width="200px;" src="https://raw.githubusercontent.com/woowacourse/atdd-subway-admin-frontend/master/images/main_logo.png"/>
</p>
<p align="center">
  <img alt="npm" src="https://img.shields.io/badge/npm-%3E%3D%205.5.0-blue">
  <img alt="node" src="https://img.shields.io/badge/node-%3E%3D%209.3.0-blue">
  <a href="https://edu.nextstep.camp/c/R89PYi5H" alt="nextstep atdd">
    <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fedu.nextstep.camp%2Fc%2FR89PYi5H">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/next-step/atdd-subway-service">
</p>

<br>

# 인프라공방 샘플 서비스 - 지하철 노선도

<br>

## 🚀 Getting Started

### Install
#### npm 설치
```
cd frontend
npm install
```
> `frontend` 디렉토리에서 수행해야 합니다.

### Usage
#### webpack server 구동
```
npm run dev
```
#### application 구동
```
./gradlew clean build
```
<br>


### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

#### 경쟁사 성능 진단 (모바일)
|             | 서울교통공사 |  네이버지도   | 카카오맵  | 내 서브웨이 |
|-------------|----------|-------------|---------|----------|
| FCP         | 7.1s     | 2.2s        | 1.7s    | 14.8s  |
| Speed Index | 10.9s    | 6.0s        | 7.4s    | 14.8s  |
| LCP         | 8.8s     | 8.0s        | 6.4s    | 15.4s  |
| TTI         | 8.8s     | 6.6s        | 4.5s    | 15.5s  |
| TBT         | 190ms    | 380ms       | 110ms   | 600ms  |
| CLS         | 0        | 0.03        | 0.005   | 0.042  |

#### 웹 성능예산(목표)
|             | 내 서브웨이 |
|-------------|----------|
| FCP         | 3.67s    |
| Speed Index | 8.1s     |
| LCP         | 8.8s     | 
| TTI         | 7.73s    | 
| TBT         | 226ms    | 
| CLS         | 0.012    | 



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
FCP, Speed Index, LCP 등 콘텐츠를 제공해줄 때 성능이 안 좋음 

- 텍스트 압축 사용하기
    - 리소스를 압축(gzip 등)하여 제공
- 정적인 콘텐츠들 캐싱하고 캐싱 수명 길게하기
- 이미지 요소 명시하기


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
하루 100만명 DAU 기준
1일 평균 rps : 11.5 rps 지만 12 rps 로 잡음
1일 최대 rps : (최대 트래픽 / 평소 트래픽) 을 6으로 가정, 70 rps 

목표 latency : 100ms
R = 2 (두번)
T = (2*0.2) = 0.4S
VU = (70*0.4)/2 = 14


2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

smoke.js
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',


  thresholds: {
    http_req_duration: ['p(99)<200'], 
    'retrieved stations': ['p(99)<200'],
    'retrieved lines': ['p(99)<200'],
  },
};
const BASE_URL = 'https://mincheolkk-1st-1step.kro.kr';
export default function ()  {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const stations = http.get(`${BASE_URL}/stations`, params).json();
  check(stations, {
    'retrieved stations': (obj) => obj.length > 0,
  });

  const lines = http.get(`${BASE_URL}/lines`, params).json();
  check(lines, {
    'retrieved lines': (obj) => obj.length > 0,
  });
  sleep(1);
};
```

smoke 결과
```
execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (11.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ↓ [======================================] 1 VUs  10s

     ✓ retrieved stations
     ✓ retrieved lines

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 1.2 MB  106 kB/s
     data_sent......................: 3.6 kB  325 B/s
     http_req_blocked...............: avg=820.33µs min=2.94µs  med=4.4µs   max=16.31ms  p(90)=6.64µs  p(95)=822.37µs
     http_req_connecting............: avg=32.89µs  min=0s      med=0s      max=657.81µs p(90)=0s      p(95)=32.89µs
   ✓ http_req_duration..............: avg=51.05ms  min=27.94ms med=57.72ms max=79.8ms   p(90)=71.94ms p(95)=74.28ms
       { expected_response:true }...: avg=51.05ms  min=27.94ms med=57.72ms max=79.8ms   p(90)=71.94ms p(95)=74.28ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 20
     http_req_receiving.............: avg=1.96ms   min=1.17ms  med=1.61ms  max=7.7ms    p(90)=2.61ms  p(95)=3.2ms
     http_req_sending...............: avg=25.11µs  min=14.19µs med=18.65µs max=131.35µs p(90)=25.68µs p(95)=34.14µs
     http_req_tls_handshaking.......: avg=747.73µs min=0s      med=0s      max=14.95ms  p(90)=0s      p(95)=747.73µs
     http_req_waiting...............: avg=49.06ms  min=26.24ms med=56.2ms  max=76.82ms  p(90)=70.65ms p(95)=72.94ms
     http_reqs......................: 20      1.806281/s
     iteration_duration.............: avg=1.1s     min=1.08s   med=1.1s    max=1.15s    p(90)=1.12s   p(95)=1.13s
     iterations.....................: 10      0.903141/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

load.js
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const aveTraffic = 35;
const maxTraffic = 210;

export let options = {
    stages: [
        {duration: '1m', target: aveTraffic},
        {duration: '1m', target: maxTraffic},
        {duration: '2m', target: aveTraffic},
        {duration: '2m', target: maxTraffic},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], 
    },
};

const BASE_URL = 'https://mincheolkk-1st-1step.kro.kr';
export default function ()  {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const stations = http.get(`${BASE_URL}/stations`, params).json();
  check(stations, {
    'retrieved stations': (obj) => obj.length > 0,
  });

  const lines = http.get(`${BASE_URL}/lines`, params).json();
  check(lines, {
    'retrieved lines': (obj) => obj.length > 0,
  });
  sleep(1);
};
```

load.js 결과
```
execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 210 max VUs, 6m30s max duration (incl. graceful stop):
           * default: Up to 210 looping VUs for 6m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (6m14.7s), 000/210 VUs, 4106 complete and 0 interrupted iterations
default ✗ [======================================] 000/210 VUs  6m0s

     ✓ http_req_duration

     checks.........................: 100.00% ✓ 8212      ✗ 0
     data_received..................: 479 MB  1.3 MB/s
     data_sent......................: 1.5 MB  3.9 kB/s
     http_req_blocked...............: avg=234.12µs min=1.8µs   med=5µs     max=46.57ms p(90)=6.89µs  p(95)=25.83µs
     http_req_connecting............: avg=20.28µs  min=0s      med=0s      max=16.32ms p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=4.43s    min=30.48ms med=4.43s   max=15.43s  p(90)=8.11s   p(95)=8.56s
       { expected_response:true }...: avg=4.43s    min=30.48ms med=4.43s   max=15.43s  p(90)=8.11s   p(95)=8.56s
     http_req_failed................: 0.00%   ✓ 0         ✗ 8212
     http_req_receiving.............: avg=3.42ms   min=87.25µs med=2.47ms  max=63.71ms p(90)=6.59ms  p(95)=9.88ms
     http_req_sending...............: avg=42.39µs  min=9.21µs  med=21.92µs max=16.22ms p(90)=42.36µs p(95)=61.51µs
     http_req_tls_handshaking.......: avg=199.77µs min=0s      med=0s      max=46.07ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=4.43s    min=28.88ms med=4.42s   max=15.43s  p(90)=8.11s   p(95)=8.55s
     http_reqs......................: 8212    21.914479/s
     iteration_duration.............: avg=9.87s    min=1.08s   med=9.88s   max=23.62s  p(90)=17.15s  p(95)=17.9s
     iterations.....................: 4106    10.95724/s
     vus............................: 21      min=1       max=210
     vus_max........................: 210     min=210     max=210

ERRO[0425] some thresholds have failed
```

stress.js
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const aveTraffic = 70;
const maxTraffic = 420;

export let options = {
    stages: [
        {duration: '1m', target: aveTraffic},
        {duration: '1m', target: maxTraffic},
	{duration: '2m', target: aveTraffic},
        {duration: '2m', target: maxTraffic},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], 
    },
};

const BASE_URL = 'https://mincheolkk-1st-1step.kro.kr';
export default function ()  {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const stations = http.get(`${BASE_URL}/stations`, params).json();
  check(stations, {
    'retrieved stations': (obj) => obj.length > 0,
  });

  const lines = http.get(`${BASE_URL}/lines`, params).json();
  check(lines, {
    'retrieved lines': (obj) => obj.length > 0,
  });
  sleep(1);
};
```
stress.js 결과
```
running (6m20.5s), 000/420 VUs, 86704 complete and 3 interrupted iterations
default ✓ [======================================] 000/420 VUs  6m0s

     ✓ http_req_duration

     checks.........................: 100.00% ✓ 7347       ✗ 0
     data_received..................: 495 MB  1.3 MB/s
     data_sent......................: 28 MB   74 kB/s
     http_req_blocked...............: avg=12.3ms   min=0s       med=0s       max=1.1s     p(90)=11.37ms  p(95)=81.41ms
     http_req_connecting............: avg=37.09ms  min=0s       med=25.8ms   max=426.67ms p(90)=86.88ms  p(95)=112.1ms
   ✗ http_req_duration..............: avg=704.85ms min=0s       med=0s       max=31.5s    p(90)=10.45ms  p(95)=5.94s
       { expected_response:true }...: avg=8.72s    min=30.26ms  med=7.87s    max=31.5s    p(90)=16.17s   p(95)=17.23s
     http_req_failed................: 91.93%  ✓ 83725      ✗ 7347
     http_req_receiving.............: avg=1.21ms   min=0s       med=0s       max=578.64ms p(90)=0s       p(95)=2.49ms
     http_req_sending...............: avg=746.85µs min=0s       med=0s       max=368.17ms p(90)=23.43µs  p(95)=387.46µs
     http_req_tls_handshaking.......: avg=9.32ms   min=0s       med=0s       max=898.46ms p(90)=8.38ms   p(95)=61.91ms
     http_req_waiting...............: avg=702.89ms min=0s       med=0s       max=31.48s   p(90)=51.99µs  p(95)=5.94s
     http_reqs......................: 91072   239.345943/s
     iteration_duration.............: avg=928.9ms  min=612.21µs med=123.98ms max=47.43s   p(90)=460.08ms p(95)=1.18s
     iterations.....................: 86704   227.86642/s
     vus............................: 20      min=1        max=419
     vus_max........................: 420     min=420      max=420


ERRO[0440] some thresholds have failed
```


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
   /home/ubuntu/infra-subway-monitoring/log/file.log
   /home/ubuntu/infra-subway-monitoring/log/json.log

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=mincheolkk-dashboard
