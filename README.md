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
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'retrieved stations': ['p(99)<1500'],
    'retrieved lines': ['p(99)<1500'],
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


running (10.1s), 0/1 VUs, 9 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ retrieved stations
     ✓ retrieved lines

     checks.........................: 100.00% ✓ 18       ✗ 0
     data_received..................: 1.1 MB  105 kB/s
     data_sent......................: 3.3 kB  326 B/s
     http_req_blocked...............: avg=2.71ms  min=2.94µs  med=4.25µs  max=48.81ms  p(90)=5.01µs  p(95)=7.32ms
     http_req_connecting............: avg=38.76µs min=0s      med=0s      max=697.75µs p(90)=0s      p(95)=104.66µs
   ✓ http_req_duration..............: avg=54.62ms min=31.29ms med=54.16ms max=88.59ms  p(90)=76.22ms p(95)=79.58ms
       { expected_response:true }...: avg=54.62ms min=31.29ms med=54.16ms max=88.59ms  p(90)=76.22ms p(95)=79.58ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 18
     http_req_receiving.............: avg=1.69ms  min=1.26ms  med=1.57ms  max=2.61ms   p(90)=2.2ms   p(95)=2.32ms
     http_req_sending...............: avg=23.88µs min=15.34µs med=20.25µs max=66.58µs  p(90)=30.63µs p(95)=39.65µs
     http_req_tls_handshaking.......: avg=1.77ms  min=0s      med=0s      max=31.9ms   p(90)=0s      p(95)=4.78ms
     http_req_waiting...............: avg=52.9ms  min=29.45ms med=52.18ms max=87.3ms   p(90)=74.82ms p(95)=78.16ms
     http_reqs......................: 18      1.789158/s
     iteration_duration.............: avg=1.11s   min=1.1s    med=1.11s   max=1.16s    p(90)=1.14s   p(95)=1.15s
     iterations.....................: 9       0.894579/s
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
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.0s
        'retrieved stations': ['p(99)<1500'],
        'retrieved lines': ['p(99)<1500'],
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


running (7m04.1s), 00/70 VUs, 4957 complete and 0 interrupted iterations
default ↓ [======================================] 69/70 VUs  7m0s

     ✓ retrieved stations
     ✓ retrieved lines

     checks.........................: 100.00% ✓ 9914      ✗ 0
     data_received..................: 578 MB  1.4 MB/s
     data_sent......................: 1.6 MB  3.9 kB/s
     http_req_blocked...............: avg=97.38µs min=2.04µs  med=5.49µs  max=48.25ms p(90)=6.86µs  p(95)=7.75µs
     http_req_connecting............: avg=15.43µs min=0s      med=0s      max=36.64ms p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=1.05s   min=26.21ms med=1.03s   max=3.68s   p(90)=1.96s   p(95)=2.1s
       { expected_response:true }...: avg=1.05s   min=26.21ms med=1.03s   max=3.68s   p(90)=1.96s   p(95)=2.1s
     http_req_failed................: 0.00%   ✓ 0         ✗ 9914
     http_req_receiving.............: avg=3.62ms  min=86.54µs med=2.61ms  max=99.25ms p(90)=6.88ms  p(95)=10.55ms
     http_req_sending...............: avg=53.63µs min=8.32µs  med=23.79µs max=16.54ms p(90)=36.61µs p(95)=53.17µs
     http_req_tls_handshaking.......: avg=70.55µs min=0s      med=0s      max=18.45ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1.05s   min=24.48ms med=1.03s   max=3.67s   p(90)=1.96s   p(95)=2.1s
     http_reqs......................: 9914    23.378357/s
     iteration_duration.............: avg=3.11s   min=1.08s   med=3.11s   max=6.54s   p(90)=4.88s   p(95)=5.07s
     iterations.....................: 4957    11.689178/s
     vus............................: 6       min=1       max=70
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
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.0s
        'retrieved stations': ['p(99)<1500'],
        'retrieved lines': ['p(99)<1500'],
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
running (7m18.3s), 000/600 VUs, 205985 complete and 12 interrupted iterations
default ↓ [======================================] 599/600 VUs  7m0s

     ✗ retrieved stations
      ↳  99% — ✓ 5091 / ✗ 28
     ✗ retrieved lines
      ↳  99% — ✓ 2584 / ✗ 11

     checks.........................: 99.49% ✓ 7675       ✗ 39
     data_received..................: 637 MB 1.5 MB/s
     data_sent......................: 67 MB  154 kB/s
     http_req_blocked...............: avg=48.37ms  min=0s      med=0s       max=1.8s     p(90)=108.82ms p(95)=360.16ms
     http_req_connecting............: avg=59.62ms  min=0s      med=39.3ms   max=612.42ms p(90)=143.98ms p(95)=184.51ms
   ✗ http_req_duration..............: avg=403.94ms min=0s      med=0s       max=35.38s   p(90)=2.37ms   p(95)=75.13ms
       { expected_response:true }...: avg=10.85s   min=26.04ms med=9.76s    max=35.38s   p(90)=19.28s   p(95)=21.66s
     http_req_failed................: 96.36% ✓ 203433     ✗ 7675
     http_req_receiving.............: avg=1.31ms   min=0s      med=0s       max=590.06ms p(90)=0s       p(95)=0s
     http_req_sending...............: avg=2.6ms    min=0s      med=0s       max=1.19s    p(90)=28.21µs  p(95)=8.27ms
     http_req_tls_handshaking.......: avg=38.25ms  min=0s      med=0s       max=1.59s    p(90)=85.77ms  p(95)=288.75ms
     http_req_waiting...............: avg=400.02ms min=0s      med=0s       max=35.37s   p(90)=10.41µs  p(95)=89.95µs
     http_reqs......................: 211108 481.666433/s
     iteration_duration.............: avg=656.84ms min=1.39ms  med=162.29ms max=1m8s     p(90)=594.14ms p(95)=929.86ms
     iterations.....................: 205985 469.977737/s
     vus............................: 13     min=2        max=600
     vus_max........................: 600    min=600      max=600

ERRO[0440] some thresholds have failed
```


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
