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

||네이버지도|카카오맵|running map|성능 예산|
|-|-|-|-|-|
|score|49|69|45|50|
|fcp|2.2|1.7|16.1|2.6|
|tti|7.3|4.6|16.2|8.7|
|lcp|8.1|6.4|16.2|9.7|
|speed index|6.2|5.5|16.1|7.4|
|total bytes|979|1,403|2,629|1,680|

> 모든 성능예산은 경쟁사 중 더 낮은 곳을 기준으로 + 20% 한 수치로 결정. 다만 score 예산은 이미 해당 수치를 충족하여, lighthouse medium 기준인 50점으로 결정

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 우선 이미지도 별로 없는데 total bytes 가 이상하게 큰 부분을 개선 : 분석결과를 보니 대부분 js 로 보여서, 아마도 js 파일 최적화 필요할듯.
- 시간 관련 응답치가 이상하리만치 높게 나오고 있는데(심지어 db가 비어있는데도), 분석 결과로는 대부분 css 요청 관련인듯 하여 css 파일 최적화 역시 필요할듯.
- 아마도 정적파일 요청 최적화만 되어도 위 성능 예산을 충분히 만족시킬 것으로 생각됨.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

 - Target 시스템 범위 : 웹 서버 (nginx) / WAS (spring 어플리케이션) / DB 서버 (mysql server)
 - 부하 테스트시에 저장될 데이터 건수와 크기 : 391,000 건
 
 - 목표값 설정
   - DAU : 500,000
   - 집중률 : 4.0
   - 1명당 1일 접속수 : 2회
   - 평균 rps : 1일 총접속수 (800,000) / 86,400 * 1.0 = 9.25 rps
   - 최대 rps : 1일 총접속수 (800,000) / 86,400 * 5.0 = 46.35 rps
   - latency : 75 ms
   - T : 0.15 * 1 + 0 = 0.15
   - VUser : 0.15 * 46.35 / 1 = 6.95

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 접속 빈도가 높은 기능 (Get /)

> smoke

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';
const USERNAME = 'sangw0804@naver.com';
const PASSWORD = '123456';

export default function ()  {
  let response = http.get(`${BASE_URL}/`);
  check(response, { 'main page 200': (response) => response.status === 200 });
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


running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ main page 200

     checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 17 kB   1.7 kB/s
     data_sent......................: 1.6 kB  160 B/s
     http_req_blocked...............: avg=4.43ms  min=6.72µs  med=7.46µs  max=44.24ms  p(90)=4.43ms  p(95)=24.33ms
     http_req_connecting............: avg=63.55µs min=0s      med=0s      max=635.54µs p(90)=63.55µs p(95)=349.54µs
   ✓ http_req_duration..............: avg=2.63ms  min=2.37ms  med=2.67ms  max=2.8ms    p(90)=2.72ms  p(95)=2.76ms
       { expected_response:true }...: avg=2.63ms  min=2.37ms  med=2.67ms  max=2.8ms    p(90)=2.72ms  p(95)=2.76ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=70.58µs min=59.35µs med=67.91µs max=97.42µs  p(90)=81.42µs p(95)=89.42µs
     http_req_sending...............: avg=29.42µs min=21.95µs med=24.4µs  max=66.28µs  p(90)=39.37µs p(95)=52.83µs
     http_req_tls_handshaking.......: avg=1.57ms  min=0s      med=0s      max=15.74ms  p(90)=1.57ms  p(95)=8.66ms
     http_req_waiting...............: avg=2.53ms  min=2.21ms  med=2.58ms  max=2.71ms   p(90)=2.62ms  p(95)=2.67ms
     http_reqs......................: 10      0.991995/s
     iteration_duration.............: avg=1s      min=1s      med=1s      max=1.04s    p(90)=1s      p(95)=1.02s
     iterations.....................: 10      0.991995/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

> load

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 160 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';
const USERNAME = 'sangw0804@naver.com';
const PASSWORD = '123456';

export default function ()  {
  let response = http.get(`${BASE_URL}/`);
  check(response, { 'main page 200': (response) => response.status === 200 });
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

  scenarios: (100.00%) 1 scenario, 160 max VUs, 7m30s max duration (incl. graceful stop):
           * default: Up to 160 looping VUs for 7m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (7m00.0s), 000/160 VUs, 637238 complete and 0 interrupted iterations
default ✗ [======================================] 000/160 VUs  7m0s

     ✓ main page 200

     checks.........................: 100.00% ✓ 637238      ✗ 0
     data_received..................: 804 MB  1.9 MB/s
     data_sent......................: 78 MB   186 kB/s
     http_req_blocked...............: avg=65.46µs min=1.98µs   med=3.7µs   max=200.16ms p(90)=4.49µs   p(95)=5.91µs
     http_req_connecting............: avg=1.3µs   min=0s       med=0s      max=23.96ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=52.65ms min=803.91µs med=32.89ms max=1.25s    p(90)=119.39ms p(95)=139.75ms
       { expected_response:true }...: avg=52.65ms min=803.91µs med=32.89ms max=1.25s    p(90)=119.39ms p(95)=139.75ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 637238
     http_req_receiving.............: avg=47.49µs min=17.3µs   med=38.22µs max=31.53ms  p(90)=58.7µs   p(95)=67.26µs
     http_req_sending...............: avg=18.01µs min=7.47µs   med=10.96µs max=46.03ms  p(90)=20.58µs  p(95)=28.3µs
     http_req_tls_handshaking.......: avg=59.61µs min=0s       med=0s      max=199.21ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=52.59ms min=756.92µs med=32.82ms max=1.25s    p(90)=119.33ms p(95)=139.68ms
     http_reqs......................: 637238  1517.224492/s
     iteration_duration.............: avg=52.82ms min=890.38µs med=33.01ms max=1.25s    p(90)=119.61ms p(95)=140ms
     iterations.....................: 637238  1517.224492/s
     vus............................: 0       min=0         max=160
     vus_max........................: 160     min=160       max=160
```

> stress

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 300 },
    { duration: '1m', target: 300 },
    { duration: '3m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';
const USERNAME = 'sangw0804@naver.com';
const PASSWORD = '123456';

export default function ()  {
  let response = http.get(`${BASE_URL}/`);
  check(response, { 'main page 200': (response) => response.status === 200 });
};
```
```
     ✗ main page 200
      ↳  99% — ✓ 682971 / ✗ 1757

     checks.........................: 99.74% ✓ 682971      ✗ 1757
     data_received..................: 890 MB 2.5 MB/s
     data_sent......................: 87 MB  242 kB/s
     http_req_blocked...............: avg=2.1ms    min=0s       med=3.75µs  max=4.87s   p(90)=4.6µs    p(95)=7.4µs
     http_req_connecting............: avg=10.85µs  min=0s       med=0s      max=67.34ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=78.46ms  min=0s       med=42.63ms max=5.33s   p(90)=175.04ms p(95)=266.48ms
       { expected_response:true }...: avg=78.46ms  min=810.56µs med=42.63ms max=5.33s   p(90)=175.01ms p(95)=266.51ms
     http_req_failed................: 0.25%  ✓ 1757        ✗ 682971
     http_req_receiving.............: avg=51.47µs  min=0s       med=37.99µs max=35.7ms  p(90)=60.2µs   p(95)=70.03µs
     http_req_sending...............: avg=1.78ms   min=0s       med=11.05µs max=5.01s   p(90)=22.24µs  p(95)=32.25µs
     http_req_tls_handshaking.......: avg=430.47µs min=0s       med=0s      max=4.77s   p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=76.62ms  min=0s       med=42.39ms max=4.02s   p(90)=171.6ms  p(95)=263.72ms
     http_reqs......................: 684728 1902.002694/s
     iteration_duration.............: avg=79.03ms  min=898.2µs  med=42.83ms max=5.33s   p(90)=176.02ms p(95)=267.23ms
     iterations.....................: 684728 1902.002694/s
     vus............................: 1      min=1         max=300
     vus_max........................: 300    min=300       max=300
```

- cpu 부하가 높은 기능 (Post /login/token)

> smoke

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';
const USERNAME = 'sangw0804@naver.com';
const PASSWORD = '123456';

export default function ()  {

  let loginPayload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  let loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.post(`${BASE_URL}/login/token`, loginPayload, loginParams);
  check(response, { 'access token created': (response) => response.json('accessToken') !== '' });
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


running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ access token created

     checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 8.6 kB  852 B/s
     data_sent......................: 2.8 kB  272 B/s
     http_req_blocked...............: avg=4.15ms  min=7.08µs  med=7.63µs  max=41.47ms  p(90)=4.15ms  p(95)=22.81ms
     http_req_connecting............: avg=60.65µs min=0s      med=0s      max=606.58µs p(90)=60.65µs p(95)=333.62µs
   ✓ http_req_duration..............: avg=9.76ms  min=8.47ms  med=8.74ms  max=16.5ms   p(90)=12.16ms p(95)=14.33ms
       { expected_response:true }...: avg=9.76ms  min=8.47ms  med=8.74ms  max=16.5ms   p(90)=12.16ms p(95)=14.33ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=73.36µs min=63.61µs med=70.99µs max=89.41µs  p(90)=83.13µs p(95)=86.27µs
     http_req_sending...............: avg=36.28µs min=25.86µs med=30.2µs  max=84.66µs  p(90)=45.08µs p(95)=64.87µs
     http_req_tls_handshaking.......: avg=2.73ms  min=0s      med=0s      max=27.38ms  p(90)=2.73ms  p(95)=15.06ms
     http_req_waiting...............: avg=9.65ms  min=8.38ms  med=8.64ms  max=16.34ms  p(90)=12.05ms p(95)=14.19ms
     http_reqs......................: 10      0.985261/s
     iteration_duration.............: avg=1.01s   min=1s      med=1s      max=1.05s    p(90)=1.01s   p(95)=1.03s
     iterations.....................: 10      0.985261/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

> load

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 160 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';
const USERNAME = 'sangw0804@naver.com';
const PASSWORD = '123456';

export default function ()  {

  let loginPayload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  let loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.post(`${BASE_URL}/login/token`, loginPayload, loginParams);
  check(response, { 'access token created': (response) => response.json('accessToken') !== '' });
  sleep(1);
};
```
```
running (7m00.9s), 000/160 VUs, 33525 complete and 0 interrupted iterations
default ✓ [======================================] 000/160 VUs  7m0s

     ✓ access token created

     checks.........................: 100.00% ✓ 33525     ✗ 0
     data_received..................: 15 MB   35 kB/s
     data_sent......................: 8.0 MB  19 kB/s
     http_req_blocked...............: avg=27.65µs min=3.53µs  med=5.61µs  max=40.93ms  p(90)=7.65µs  p(95)=8.87µs
     http_req_connecting............: avg=3.1µs   min=0s      med=0s      max=7.39ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=5.61ms  min=2.77ms  med=4.66ms  max=77.58ms  p(90)=9.51ms  p(95)=11.97ms
       { expected_response:true }...: avg=5.61ms  min=2.77ms  med=4.66ms  max=77.58ms  p(90)=9.51ms  p(95)=11.97ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 33525
     http_req_receiving.............: avg=54.99µs min=21.29µs med=51.1µs  max=972.05µs p(90)=70.4µs  p(95)=78.49µs
     http_req_sending...............: avg=27.02µs min=11.04µs med=18.92µs max=6.21ms   p(90)=39.41µs p(95)=52.75µs
     http_req_tls_handshaking.......: avg=17.03µs min=0s      med=0s      max=20.76ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=5.53ms  min=2.69ms  med=4.58ms  max=77.47ms  p(90)=9.42ms  p(95)=11.89ms
     http_reqs......................: 33525   79.655887/s
     iteration_duration.............: avg=1s      min=1s      med=1s      max=1.07s    p(90)=1.01s   p(95)=1.01s
     iterations.....................: 33525   79.655887/s
     vus............................: 1       min=1       max=160
     vus_max........................: 160     min=160     max=160
```

> stress

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 400 },
    { duration: '1m', target: 400 },
    { duration: '1m', target: 600 },
    { duration: '1m', target: 600 },
    { duration: '3m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';
const USERNAME = 'sangw0804@naver.com';
const PASSWORD = '123456';

export default function ()  {

  let loginPayload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  let loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.post(`${BASE_URL}/login/token`, loginPayload, loginParams);
  check(response, { 'access token created': (response) => response.json('accessToken') !== '' });
  sleep(1);
};
```
```
    ✗ access token created
      ↳  99% — ✓ 106027 / ✗ 162

     checks.........................: 99.84% ✓ 106027     ✗ 162
     data_received..................: 231 MB 642 kB/s
     data_sent......................: 43 MB  118 kB/s
     http_req_blocked...............: avg=10.51ms  min=3.47µs   med=6.02µs  max=230.97ms p(90)=31.67ms  p(95)=47.36ms
     http_req_connecting............: avg=901.2µs  min=0s       med=0s      max=62.45ms  p(90)=2.4ms    p(95)=5.38ms
   ✓ http_req_duration..............: avg=11.11ms  min=113.91µs med=5.71ms  max=217.92ms p(90)=24.46ms  p(95)=35.75ms
       { expected_response:true }...: avg=11.12ms  min=2.74ms   med=5.72ms  max=217.92ms p(90)=24.48ms  p(95)=35.78ms
     http_req_failed................: 0.15%  ✓ 162        ✗ 106027
     http_req_receiving.............: avg=56.7µs   min=0s       med=45.31µs max=16.33ms  p(90)=65.51µs  p(95)=77.27µs
     http_req_sending...............: avg=151.22µs min=11.05µs  med=26.35µs max=33.16ms  p(90)=152.58µs p(95)=294.51µs
     http_req_tls_handshaking.......: avg=9.55ms   min=0s       med=0s      max=230.23ms p(90)=29.04ms  p(95)=43.96ms
     http_req_waiting...............: avg=10.9ms   min=9.16µs   med=5.62ms  max=217.85ms p(90)=24.04ms  p(95)=35.16ms
     http_reqs......................: 106189 294.451556/s
     iteration_duration.............: avg=1.02s    min=375.96µs med=1s      max=1.28s    p(90)=1.05s    p(95)=1.08s
     iterations.....................: 106189 294.451556/s
     vus............................: 3      min=3        max=600
     vus_max........................: 600    min=600      max=600
```

- db 를 갱신하는 기능 (Post /stations)

> smoke

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import uuid from './uuid.js';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';

export default function ()  {
  let loginPayload = JSON.stringify({
    name: uuid.v4()
  });

  let loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.post(`${BASE_URL}/stations`, loginPayload, loginParams);
  check(response, { 'station created': (response) => response.json('id') !== '' });
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


running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ station created

     checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 8.7 kB  853 B/s
     data_sent......................: 2.7 kB  265 B/s
     http_req_blocked...............: avg=4.99ms  min=6.8µs   med=7.61µs  max=49.91ms  p(90)=4.99ms  p(95)=27.45ms
     http_req_connecting............: avg=59.76µs min=0s      med=0s      max=597.67µs p(90)=59.76µs p(95)=328.71µs
   ✓ http_req_duration..............: avg=8.87ms  min=7.93ms  med=8.71ms  max=9.71ms   p(90)=9.58ms  p(95)=9.64ms
       { expected_response:true }...: avg=8.87ms  min=7.93ms  med=8.71ms  max=9.71ms   p(90)=9.58ms  p(95)=9.64ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=79.22µs min=70.08µs med=79.12µs max=92.02µs  p(90)=91.34µs p(95)=91.68µs
     http_req_sending...............: avg=42.64µs min=27.57µs med=40.22µs max=89.89µs  p(90)=49.57µs p(95)=69.73µs
     http_req_tls_handshaking.......: avg=1.56ms  min=0s      med=0s      max=15.62ms  p(90)=1.56ms  p(95)=8.59ms
     http_req_waiting...............: avg=8.75ms  min=7.83ms  med=8.6ms   max=9.55ms   p(90)=9.46ms  p(95)=9.5ms
     http_reqs......................: 10      0.984943/s
     iteration_duration.............: avg=1.01s   min=1s      med=1s      max=1.06s    p(90)=1.01s   p(95)=1.03s
     iterations.....................: 10      0.984943/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

> load

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import uuid from './uuid.js';

export let options = {
  stages: [
    { duration: '5m', target: 160 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';

export default function ()  {
  let loginPayload = JSON.stringify({
    name: uuid.v4()
  });

  let loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.post(`${BASE_URL}/stations`, loginPayload, loginParams);
  check(response, { 'station created': (response) => response.json('id') !== '' });
};
```
```
running (7m00.0s), 000/160 VUs, 474861 complete and 0 interrupted iterations
default ✗ [======================================] 000/160 VUs  7m0s

     ✓ station created

     checks.........................: 100.00% ✓ 474861      ✗ 0
     data_received..................: 201 MB  479 kB/s
     data_sent......................: 109 MB  261 kB/s
     http_req_blocked...............: avg=10.2µs  min=2.96µs  med=4.1µs   max=32.17ms p(90)=4.68µs   p(95)=5.16µs
     http_req_connecting............: avg=1.11µs  min=0s      med=0s      max=9.28ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=70.71ms min=3.46ms  med=63.87ms max=1.17s   p(90)=130.67ms p(95)=147.6ms
       { expected_response:true }...: avg=70.71ms min=3.46ms  med=63.87ms max=1.17s   p(90)=130.67ms p(95)=147.6ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 474861
     http_req_receiving.............: avg=50.17µs min=21.15µs med=48.53µs max=17.58ms p(90)=61.28µs  p(95)=68.08µs
     http_req_sending...............: avg=20.6µs  min=10.24µs med=15.18µs max=19.2ms  p(90)=25.87µs  p(95)=29µs
     http_req_tls_handshaking.......: avg=4.5µs   min=0s      med=0s      max=17.26ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=70.64ms min=3.39ms  med=63.79ms max=1.17s   p(90)=130.59ms p(95)=147.52ms
     http_reqs......................: 474861  1130.570654/s
     iteration_duration.............: avg=70.88ms min=3.59ms  med=64.04ms max=1.17s   p(90)=130.85ms p(95)=147.78ms
     iterations.....................: 474861  1130.570654/s
     vus............................: 1       min=1         max=160
     vus_max........................: 160     min=160       max=160
```

> stress

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import uuid from './uuid.js';

export let options = {
  stages: [
    { duration: '1m', target: 85 },
    { duration: '1m', target: 85 },
    { duration: '1m', target: 170 },
    { duration: '1m', target: 170 },
    { duration: '1m', target: 255 },
    { duration: '1m', target: 255 },
    { duration: '3m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://next-sangw0804-infra.kro.kr';

export default function ()  {
  let loginPayload = JSON.stringify({
    name: uuid.v4()
  });

  let loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.post(`${BASE_URL}/stations`, loginPayload, loginParams);
  check(response, { 'station created': (response) => response.json('id') !== '' });
};
```
```
running (6m00.0s), 000/250 VUs, 397368 complete and 0 interrupted iterations
default ✗ [======================================] 000/250 VUs  6m0s

     ✗ station created
      ↳  98% — ✓ 391155 / ✗ 6213

     checks.........................: 98.43% ✓ 391155      ✗ 6213
     data_received..................: 192 MB 534 kB/s
     data_sent......................: 94 MB  261 kB/s
     http_req_blocked...............: avg=211.87µs min=0s       med=4.11µs  max=46.08ms p(90)=4.79µs   p(95)=5.75µs
     http_req_connecting............: avg=33.81µs  min=0s       med=0s      max=28.73ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=113.1ms  min=0s       med=89.99ms max=4.13s   p(90)=205.42ms p(95)=300.64ms
       { expected_response:true }...: avg=114.86ms min=3.54ms   med=91.72ms max=4.13s   p(90)=206.34ms p(95)=304.03ms
     http_req_failed................: 1.56%  ✓ 6213        ✗ 391155
     http_req_receiving.............: avg=51.13µs  min=0s       med=49.94µs max=10.97ms p(90)=62.21µs  p(95)=69.65µs
     http_req_sending...............: avg=26.43µs  min=0s       med=15.23µs max=20.76ms p(90)=26.24µs  p(95)=32.41µs
     http_req_tls_handshaking.......: avg=176.99µs min=0s       med=0s      max=45.58ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=113.02ms min=0s       med=89.91ms max=4.13s   p(90)=205.35ms p(95)=300.58ms
     http_reqs......................: 397368 1103.778194/s
     iteration_duration.............: avg=113.5ms  min=243.55µs med=90.29ms max=4.13s   p(90)=205.61ms p(95)=301.45ms
     iterations.....................: 397368 1103.778194/s
     vus............................: 1      min=1         max=249
     vus_max........................: 250    min=250       max=250
```

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

/home/ubuntu/log : 스프링 로그
/var/log/nginx : nginx 로그

2. Cloudwatch 대시보드 URL을 알려주세요

https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=sangw0804

