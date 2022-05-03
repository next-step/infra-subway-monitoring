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

const aveTraffic = 12;
const maxTraffic = 70;

export let options = {
    stages: [
        {duration: '1m', target: aveTraffic},
        {duration: '1m', target: maxTraffic},
        {duration: '2m', target: aveTraffic},
        {duration: '2m', target: maxTraffic},
        {duration: '30s', target: aveTraffic},
        {duration: '30s', target: maxTraffic},
    ],
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

load.js 결과
```
execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 7m30s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 7m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (7m04.3s), 00/70 VUs, 5163 complete and 0 interrupted iterations
default ✓ [======================================] 00/70 VUs  7m0s

     ✓ retrieved stations
     ✓ retrieved lines

     checks.........................: 100.00% ✓ 10326     ✗ 0
     data_received..................: 602 MB  1.4 MB/s
     data_sent......................: 1.7 MB  4.0 kB/s
     http_req_blocked...............: avg=87.76µs  min=2.12µs  med=5.37µs   max=71.62ms p(90)=7.13µs  p(95)=11.23µs
     http_req_connecting............: avg=9.93µs   min=0s      med=0s       max=8.34ms  p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=993.74ms min=25.86ms med=982.39ms max=3.51s   p(90)=1.88s   p(95)=2.03s
       { expected_response:true }...: avg=993.74ms min=25.86ms med=982.39ms max=3.51s   p(90)=1.88s   p(95)=2.03s
     http_req_failed................: 0.00%   ✓ 0         ✗ 10326
     http_req_receiving.............: avg=2.89ms   min=86.99µs med=2.31ms   max=45.91ms p(90)=5.11ms  p(95)=6.88ms
     http_req_sending...............: avg=42.99µs  min=7.3µs   med=23.88µs  max=13.01ms p(90)=43.87µs p(95)=50.35µs
     http_req_tls_handshaking.......: avg=64.11µs  min=0s      med=0s       max=25.02ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=990.8ms  min=24.47ms med=979.24ms max=3.51s   p(90)=1.88s   p(95)=2.02s
     http_reqs......................: 10326   24.336804/s
     iteration_duration.............: avg=2.99s    min=1.07s   med=2.95s    max=6.65s   p(90)=4.76s   p(95)=5s
     iterations.....................: 5163    12.168402/s
     vus............................: 11      min=1       max=70
     vus_max........................: 70      min=70      max=70

ERRO[0425] some thresholds have failed
```

stress.js
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const aveTraffic = 120;
const maxTraffic = 600;

export let options = {
    stages: [
        {duration: '1m', target: aveTraffic},
        {duration: '1m', target: maxTraffic},
				{duration: '2m', target: aveTraffic},
        {duration: '2m', target: maxTraffic},
        {duration: '30s', target: aveTraffic},
        {duration: '30s', target: maxTraffic},
    ],
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
stress.js 결과
```
running (7m18.3s), 000/600 VUs, 225326 complete and 16 interrupted iterations
default ↓ [======================================] 599/600 VUs  7m0s

     ✗ retrieved stations
      ↳  99% — ✓ 5008 / ✗ 45
     ✗ retrieved lines
      ↳  99% — ✓ 2697 / ✗ 15

     checks.........................: 99.22% ✓ 7705       ✗ 60
     data_received..................: 603 MB 1.4 MB/s
     data_sent......................: 72 MB  164 kB/s
     http_req_blocked...............: avg=17.17ms  min=0s     med=0s       max=871.47ms p(90)=24.81ms  p(95)=106.01ms
     http_req_connecting............: avg=47.42ms  min=0s     med=32.03ms  max=473.31ms p(90)=111.25ms p(95)=142.81ms
   ✗ http_req_duration..............: avg=376.9ms  min=0s     med=0s       max=36.62s   p(90)=0s       p(95)=22.73ms
       { expected_response:true }...: avg=10.97s   min=25.9ms med=9.37s    max=36.62s   p(90)=20.29s   p(95)=22.41s
     http_req_failed................: 96.65% ✓ 222676     ✗ 7705
     http_req_receiving.............: avg=856.87µs min=0s     med=0s       max=469.76ms p(90)=0s       p(95)=0s
     http_req_sending...............: avg=991.18µs min=0s     med=0s       max=656.05ms p(90)=0s       p(95)=688.69µs
     http_req_tls_handshaking.......: avg=13.93ms  min=0s     med=0s       max=754.89ms p(90)=19.56ms  p(95)=83.11ms
     http_req_waiting...............: avg=375.05ms min=0s     med=0s       max=36.4s    p(90)=0s       p(95)=22.1µs
     http_reqs......................: 230381 525.5697/s
     iteration_duration.............: avg=591.1ms  min=1.39ms med=147.68ms max=1m5s     p(90)=468.35ms p(95)=642.63ms
     iterations.....................: 225326 514.037695/s
     vus............................: 12     min=2        max=600
     vus_max........................: 600    min=600      max=600

ERRO[0440] some thresholds have failed
```


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
