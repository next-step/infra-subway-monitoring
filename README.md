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

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
- /var/log/syslog
  https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/syslog
- /var/log/nginx/access.log
  https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/nginx-access
- /var/log/nginx/error.log
  https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/nginx-error

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=sanola2-dashboard
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
  - 웹 내 텍스트 (js, css 등) 파일의 크기는 1MB를 넘기지 않는다.
  - 초기 서버 응답 시간은 500ms 이하로 한다.
  - Mobile 환경에서의 Time to Interactive 는 5초 이하 여야한다.
  - Lighthouse 점수는 80점 이상이어야 한다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
  - gzip 압축 사용
  - CDN 사용
  - Web component lazy loading 적용
  - 캐싱 적용
  - 불필요한 파일 제거

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
  - DAU 20만
  - 1일 평균 접속 수 5 (1,000,000 회)
  - 1일 평균 RPS 11.5
  - 1일 최대 RPS 50

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
```
// smoke.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 2, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://sanola2.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '123';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

  const findPathResult = http.get(`${BASE_URL}/paths?source=1&target=4`, authHeaders).json();
  check(findPathResult, { 'find path': (data) => data.stations })
  sleep(1);
};
```
```
smoke.js result

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: .\script.js
     output: -

  scenarios: (100.00%) 1 scenario, 2 max VUs, 40s max duration (incl. graceful stop):
           * default: 2 looping VUs for 10s (gracefulStop: 30s)


running (11.0s), 0/2 VUs, 18 complete and 0 interrupted iterations
default ✓ [======================================] 2 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path

     checks.........................: 100.00% ✓ 54       ✗ 0
     data_received..................: 80 kB   7.3 kB/s
     data_sent......................: 15 kB   1.4 kB/s
     http_req_blocked...............: avg=1.95ms   min=0s      med=0s      max=52.65ms  p(90)=0s       p(95)=0s
     http_req_connecting............: avg=186.58µs min=0s      med=0s      max=5.03ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=68.54ms  min=10.82ms med=13.36ms max=255.19ms p(90)=184.31ms p(95)=199.33ms
       { expected_response:true }...: avg=68.54ms  min=10.82ms med=13.36ms max=255.19ms p(90)=184.31ms p(95)=199.33ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 54
     http_req_receiving.............: avg=265.27µs min=0s      med=0s      max=1.01ms   p(90)=964.9µs  p(95)=993.27µs
     http_req_sending...............: avg=131.41µs min=0s      med=0s      max=1.04ms   p(90)=781.17µs p(95)=864.34µs
     http_req_tls_handshaking.......: avg=1.43ms   min=0s      med=0s      max=38.61ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=68.15ms  min=10.21ms med=12.89ms max=254.42ms p(90)=184.28ms p(95)=198.43ms
     http_reqs......................: 54      4.907845/s
     iteration_duration.............: avg=1.22s    min=1.18s   med=1.2s    max=1.38s    p(90)=1.27s    p(95)=1.38s
     iterations.....................: 18      1.635948/s
     vus............................: 0       min=0      max=2
     vus_max........................: 2       min=2      max=2
```
```
// load.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 50},
    { duration: '20s', target: 50},
    { duration: '5s', target: 0},
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<2000']
  },
};

const BASE_URL = 'https://sanola2.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '123';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

  const findPathResult = http.get(`${BASE_URL}/paths?source=1&target=4`, authHeaders).json();
  check(findPathResult, { 'find path': (data) => data.stations })
  sleep(1);
};
```
```
load.js result
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: .\load.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 1m5s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 35s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m48.3s), 00/50 VUs, 140 complete and 0 interrupted iterations
default ✓ [======================================] 00/50 VUs  35s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path

     checks.........................: 100.00% ✓ 420      ✗ 0
     data_received..................: 780 kB  16 kB/s
     data_sent......................: 130 kB  2.7 kB/s
     http_req_blocked...............: avg=2.2ms    min=0s     med=0s     max=85.72ms p(90)=14.67ms  p(95)=17.77ms
     http_req_connecting............: avg=509.42µs min=0s     med=0s     max=5.72ms  p(90)=3.01ms   p(95)=4.6ms
   ✗ http_req_duration..............: avg=3.99s    min=8.65ms med=3.22s  max=13.71s  p(90)=8.87s    p(95)=10.19s
       { expected_response:true }...: avg=3.99s    min=8.65ms med=3.22s  max=13.71s  p(90)=8.87s    p(95)=10.19s
     http_req_failed................: 0.00%   ✓ 0        ✗ 420
     http_req_receiving.............: avg=193.61µs min=0s     med=0s     max=2ms     p(90)=941.14µs p(95)=997.91µs
     http_req_sending...............: avg=56.59µs  min=0s     med=0s     max=1.09ms  p(90)=155.53µs p(95)=527.72µs
     http_req_tls_handshaking.......: avg=1.65ms   min=0s     med=0s     max=78.26ms p(90)=10.77ms  p(95)=13.02ms
     http_req_waiting...............: avg=3.99s    min=8.65ms med=3.22s  max=13.71s  p(90)=8.87s    p(95)=10.18s
     http_reqs......................: 420     8.692935/s
     iteration_duration.............: avg=13s      min=1.73s  med=15.55s max=23.58s  p(90)=17.01s   p(95)=17.18s
     iterations.....................: 140     2.897645/s
     vus............................: 5       min=5      max=50
     vus_max........................: 50      min=50     max=50

ERRO[0050] some thresholds have failed
```
```
// stress.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 20},
    { duration: '20s', target: 20},
    { duration: '10s', target: 50},
    { duration: '20s', target: 50},
    { duration: '10s', target: 100},
    { duration: '20s', target: 100},
    { duration: '10s', target: 0},
  ],

  thresholds: {
    http_req_duration: ['p(99)<5000'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<5000'],
  },
};

const BASE_URL = 'https://sanola2.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '123';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

  const findPathResult = http.get(`${BASE_URL}/paths?source=1&target=4`, authHeaders).json();
  check(findPathResult, { 'find path': (data) => data.stations })
  sleep(1);
};
```
```
stress.js result

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: .\stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 2m10s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 1m40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m06.1s), 000/100 VUs, 368 complete and 5 interrupted iterations
default ✓ [======================================] 000/100 VUs  1m40s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path

     checks.........................: 100.00% ✓ 1116     ✗ 0
     data_received..................: 1.9 MB  15 kB/s
     data_sent......................: 335 kB  2.7 kB/s
     http_req_blocked...............: avg=1.52ms   min=0s     med=0s     max=44.05ms p(90)=139.4µs p(95)=16.1ms
     http_req_connecting............: avg=366.94µs min=0s     med=0s     max=5.7ms   p(90)=0s      p(95)=3.94ms
   ✗ http_req_duration..............: avg=5.57s    min=7.25ms med=3.12s  max=27.2s   p(90)=16.35s  p(95)=20.69s
       { expected_response:true }...: avg=5.57s    min=7.25ms med=3.12s  max=27.2s   p(90)=16.35s  p(95)=20.69s
     http_req_failed................: 0.00%   ✓ 0        ✗ 1116
     http_req_receiving.............: avg=186.18µs min=0s     med=0s     max=1.42ms  p(90)=849.6µs p(95)=999µs
     http_req_sending...............: avg=53.5µs   min=0s     med=0s     max=1.04ms  p(90)=141.9µs p(95)=518.75µs
     http_req_tls_handshaking.......: avg=1.11ms   min=0s     med=0s     max=38.61ms p(90)=0s      p(95)=11.91ms
     http_req_waiting...............: avg=5.57s    min=7.23ms med=3.12s  max=27.2s   p(90)=16.35s  p(95)=20.69s
     http_reqs......................: 1116    8.852571/s
     iteration_duration.............: avg=17.71s   min=1.34s  med=16.62s max=55.47s  p(90)=33.4s   p(95)=33.66s
     iterations.....................: 368     2.919127/s
     vus............................: 3       min=2      max=100
     vus_max........................: 100     min=100    max=100

ERRO[0127] some thresholds have failed
```