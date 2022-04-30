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
 - 부하 테스트시에 저장될 데이터 건수와 크기 : 
 
 - 목표값 설정
   - DAU : 100,000
   - 집중률 : 5.0
   - 1명당 1일 접속수 : 2회
   - 평균 rps : 1일 총접속수 (200,000) / 86,400 * 1.0 = 2.31 rps
   - 최대 rps : 1일 총접속수 (200,000) / 86,400 * 5.0 = 11.55 rps
   - latency : 75 ms

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
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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

- cpu 부하가 높은 기능 (Post /login/token)

> smoke

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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

- db 를 갱신하는 기능 (Post /stations)

> smoke

```js
```
```
```

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
