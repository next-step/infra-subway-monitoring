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

**가장 중요한 페이지**
- 경로 검색

**Mobile(Chrome, LTE)**
| 항목 | 현재 평균값 | 목표값 |
|--|--|--|
| FCP | 5.753s | < 3s |
| TTI | 6.229s | < 5s |

**Desktop(Chrome, Cable)**
| 항목 | 현재 평균값 | 목표값 |
|--|--|--|
| FCP | 4.918s | < 3s |
| TTI | 5.064s | < 5s |

> [webpagetest.org](https://www.webpagetest.org/) 테스트 결과를 참조하여 작성했습니다.<br>
> 현재 평균값은 Mean 값을 사용했습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기
- 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인하기
- 이미지 요소에 `width` 및 `height` 명시하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

  대상 시스템 범위
  - DAU = 100,000
  - 피크시간대 집중율 = 100
  - 1일 요청 수 = 2

  목푯값 설정
  - 1일 총 접속수 = 200,000
  - 1일 평균 rps = 2.31
  - 1일 최대 rps = 231
  - T = (2 * 0.2) = 0.4
  - VU = (231 * 0.4) / 2 = 46.2

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

**Smoke**
```js
// smoke.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.3s
    'retrieved stations': ['p(99)<200'],
    'retrieved paths': ['p(99)<200'],
  },
};

const BASE_URL = 'https://infraworkshop5.us.to';

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

  const paths = http.get(`${BASE_URL}/paths?source=1&target=2`, params).json();
  check(paths, {
    'retrieved paths': (obj) => obj.distance != 0,
  });

  sleep(1);
};
```
```
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.3s), 0/1 VUs, 6 complete and 0 interrupted iterations
default ↓ [======================================] 1 VUs  10s

     ✓ retrieved stations
     ✓ retrieved paths

     checks.........................: 100.00% ✓ 12       ✗ 0
     data_received..................: 455 kB  44 kB/s
     data_sent......................: 2.3 kB  228 B/s
     http_req_blocked...............: avg=108.31ms min=2.81µs  med=4.03µs   max=1.29s    p(90)=4.81µs   p(95)=584.87ms
     http_req_connecting............: avg=59.57µs  min=0s      med=0s       max=714.87µs p(90)=0s       p(95)=321.69µs
   ✓ http_req_duration..............: avg=245ms    min=67.35ms med=168.32ms max=875.99ms p(90)=552.76ms p(95)=718.02ms
       { expected_response:true }...: avg=245ms    min=67.35ms med=168.32ms max=875.99ms p(90)=552.76ms p(95)=718.02ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 12
     http_req_receiving.............: avg=7.55ms   min=72.13µs med=2.75ms   max=27.01ms  p(90)=24.18ms  p(95)=25.73ms
     http_req_sending...............: avg=129.58µs min=16.74µs med=24.69µs  max=756.46µs p(90)=503.1µs  p(95)=645.27µs
     http_req_tls_handshaking.......: avg=1.08ms   min=0s      med=0s       max=12.99ms  p(90)=0s       p(95)=5.84ms
     http_req_waiting...............: avg=237.31ms min=59.69ms med=159.79ms max=850.55ms p(90)=552.16ms p(95)=706.22ms
     http_reqs......................: 12      1.169994/s
     iteration_duration.............: avg=1.7s     min=1.23s   med=1.29s    max=3.76s    p(90)=2.58s    p(95)=3.17s
     iterations.....................: 6       0.584997/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

**Load**
```js
// load.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 46 },
    { duration: '2m', target: 46 },
    { duration: '2m', target: 0 }, // ramp-down to 0 users
  ],

  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.3s
    'retrieved stations': ['p(99)<200'],
    'retrieved paths': ['p(99)<200'],
  },
};

const BASE_URL = 'https://infraworkshop5.us.to';

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

  const paths = http.get(`${BASE_URL}/paths?source=1&target=2`, params).json();
  check(paths, {
    'retrieved paths': (obj) => obj.distance != 0,
  });

  sleep(1);
};
```
```
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 231 max VUs, 30m30s max duration (incl. graceful stop):
           * default: Up to 231 looping VUs for 30m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (30m01.0s), 000/231 VUs, 7081 complete and 73 interrupted iterations
default ↓ [======================================] 001/231 VUs  30m0s

     ✗ retrieved stations
      ↳  88% — ✓ 6311 / ✗ 841
     ✓ retrieved paths

     checks.........................: 94.09% ✓ 13397    ✗ 841
     data_received..................: 476 MB 264 kB/s
     data_sent......................: 2.4 MB 1.3 kB/s
     http_req_blocked...............: avg=96.48µs min=1.15µs  med=4.24µs   max=42.94ms p(90)=5.58µs  p(95)=6.8µs
     http_req_connecting............: avg=16.78µs min=0s      med=0s       max=24.06ms p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=19.19s  min=30.07ms med=26.03s   max=40.4s   p(90)=36.35s  p(95)=37.01s
       { expected_response:true }...: avg=17.35s  min=30.07ms med=16.53s   max=40.4s   p(90)=36.55s  p(95)=37.07s
     http_req_failed................: 11.61% ✓ 1654     ✗ 12584
     http_req_receiving.............: avg=1.63ms  min=21.63µs med=106.54µs max=65.33ms p(90)=3.51ms  p(95)=6.39ms
     http_req_sending...............: avg=31.34µs min=7.6µs   med=19.93µs  max=4.83ms  p(90)=35.51µs p(95)=50.72µs
     http_req_tls_handshaking.......: avg=73.46µs min=0s      med=0s       max=18.79ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=19.19s  min=29.14ms med=26.03s   max=40.4s   p(90)=36.35s  p(95)=37.01s
     http_reqs......................: 14238  7.905602/s
     iteration_duration.............: avg=39.27s  min=1.1s    med=52.3s    max=1m16s   p(90)=1m13s   p(95)=1m13s
     iterations.....................: 7081   3.931702/s
     vus............................: 1      min=1      max=231
     vus_max........................: 231    min=231    max=231
```

**Stress**
```js
// stress.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 46 },
    { duration: '2m', target: 46*5 },
    { duration: '2m', target: 46*10 },
    { duration: '2m', target: 46*20 },
    { duration: '2m', target: 46*40 },
    { duration: '2m', target: 46*80 },
    { duration: '2m', target: 0 }, // ramp-down to 0 users
  ],

  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
    'retrieved stations': ['p(99)<200'],
    'retrieved paths': ['p(99)<200'],
  },
};

const BASE_URL = 'https://infraworkshop5.us.to';

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

  const paths = http.get(`${BASE_URL}/paths?source=1&target=2`, params).json();
  check(paths, {
    'retrieved paths': (obj) => obj.distance != 0,
  });

  sleep(1);
};
```

```
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

WARN[0000] Error from API server                         error="listen tcp 127.0.0.1:6565: bind: address already in use"
  execution: local
     script: stress.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 300 max VUs, 40m30s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 40m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (40m00.6s), 000/300 VUs, 201644 complete and 0 interrupted iterations
default ↓ [======================================] 001/300 VUs  40m0s

     ✓ retrieved stations
     ✓ retrieved paths

     checks.........................: 100.00% ✓ 64770     ✗ 0
     data_received..................: 2.9 GB  1.2 MB/s
     data_sent......................: 71 MB   30 kB/s
     http_req_blocked...............: avg=21.14ms min=0s      med=0s      max=534.55ms p(90)=98.94ms  p(95)=136.58ms
     http_req_connecting............: avg=22.66ms min=0s      med=17.82ms max=229.89ms p(90)=54.49ms  p(95)=66.99ms
   ✗ http_req_duration..............: avg=1.34s   min=0s      med=0s      max=28.38s   p(90)=6.38s    p(95)=7.94s
       { expected_response:true }...: avg=4.91s   min=29.72ms med=4.97s   max=28.38s   p(90)=8.44s    p(95)=9s
     http_req_failed................: 72.69%  ✓ 172473    ✗ 64770
     http_req_receiving.............: avg=1.7ms   min=0s      med=0s      max=242.01ms p(90)=2.1ms    p(95)=3.43ms
     http_req_sending...............: avg=1.15ms  min=0s      med=0s      max=456.26ms p(90)=536.85µs p(95)=6.79ms
     http_req_tls_handshaking.......: avg=16.47ms min=0s      med=0s      max=410.48ms p(90)=76.48ms  p(95)=105.32ms
     http_req_waiting...............: avg=1.34s   min=0s      med=0s      max=28.3s    p(90)=6.38s    p(95)=7.91s
     http_reqs......................: 237243  98.828357/s
     iteration_duration.............: avg=1.79s   min=1.2ms   med=69ms    max=33.71s   p(90)=8.33s    p(95)=13.04s
     iterations.....................: 201644  83.998875/s
     vus............................: 1       min=1       max=300
     vus_max........................: 300     min=300     max=300
```
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

Application Log
- /home/ubuntu/log/file.log
- /home/ubuntu/log/json.log

Nginx Log
- /var/log/nginx/access.log
- /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요

https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=gongzza