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
nginx : 15.164.169.22
logPath : /home/ubuntu/nginx/logs
WAS : https://prodo-subway.r-e.kr/
logPath : /home/ubuntu/infra-subway-deploy-main/logs

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-prodo-developer
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 투어 쇼핑몰을 서비스중인 국내 I사와 비교
---   
### 성능지표
|   | 지하철노선도 | I사 |
|---|:---:|---:|
|First Contentful Paint|14.6초|  4.2 초  |
|Time to Interactive|15.2초|  37.3 초  |
|Speed Index|14.6초|  13.5 초  |
|Total Blocking Time|560 밀리초|  2,450 밀리초  |
|Largest Contentful Paint|15.2초|  13.8 초  |
|Cumulative Layout Shift|0.041|  0.779  |

---
|   | 지하철노선도 | I사 |
|---|:---:|---:|
| First Byte Time | A | F |
| Keep-alive Enabled | A | A|
| Compress Transfer | F |F|
| Compress Images | A |B|
| Cache static content | C | F|
| Effective use of CDN | X | X
---
### 예산설정 (데스크탑 기준)
#### Lighthouse 점수항목 90점이상으로 설정
| 항목  | 수치 |
|---|:---:|
| First Contentful Paint | 1780 ms |
| Keep-alive Enabled | 3410 ms |
| Compress Transfer | 2500 ms |
| Time to Interactive | 3700 ms |
| Total Blocking Time | 200 ms |
| Effective use of CDN | 0.04 |



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축기능 제공 : gzip
- 사용하지 않는 자바스크립트 제거 : vendors.js, main.js
- 정적 자원에 캐시적용
- 웹폰트 로드 되는 동안 텍스트 표시하기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- Throughput
    - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
    - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
    - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
- 예상치 도출
    - 국내 투어 I사 쇼핑몰의 6개월간 사용자 수 통계 [링크](https://www.similarweb.com/website/tour.tmon.co.kr/?competitors=tour.interpark.com)
    - 통계수치를 바탕으로 I사 하루 사용량 예상: 3만명 가량으로 예상
    - 경쟁업체를 기준으로 선정
    - 사용자가 보통 5번씩 사용한다고 가정
    - 1일 총 접속수: 3만명 * 5 = 15만회
    - 150,000 / 86400 = 2rps
    - 1일 최대 rps: 2 * 100 / 10 = 20 rps
    - 사용자가 1분 내외로 사용한다고 가정.

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
---
### smoke, load, stress 테스트 진행 
- smoke

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://prodo-subway.r-e.kr/';
const USERNAME = 'wjdals300@gmail.com';
const PASSWORD = '1234';

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

  경로조회(loginRes);

  sleep(1);
};

export function 경로조회(loginRes){

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/paths/?source=1&target=2`, authHeaders).json();
};

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

running (11.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 20  ✗ 0
data_received..................: 42 kB   3.8 kB/s
data_sent......................: 8.8 kB  789 B/s
http_req_blocked...............: avg=4.56ms  min=0s      med=0s      max=137.02ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=172.8µs min=0s      med=0s      max=5.18ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=31.22ms min=15.68ms med=18.05ms max=60.41ms  p(90)=59.52ms  p(95)=59.91ms
{ expected_response:true }...: avg=31.22ms min=15.68ms med=18.05ms max=60.41ms  p(90)=59.52ms  p(95)=59.91ms
http_req_failed................: 0.00%   ✓ 0   ✗ 30
http_req_receiving.............: avg=184.3µs min=0s      med=0s      max=997.8µs  p(90)=651.57µs p(95)=839µs
http_req_sending...............: avg=16.89µs min=0s      med=0s      max=506.7µs  p(90)=0s       p(95)=0s
http_req_tls_handshaking.......: avg=3.74ms  min=0s      med=0s      max=112.43ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=31.02ms min=15.61ms med=18.05ms max=60.41ms  p(90)=59.47ms  p(95)=59.91ms
http_reqs......................: 30      2.703746/s
iteration_duration.............: avg=1.1s    min=1.09s   med=1.09s   max=1.23s    p(90)=1.11s    p(95)=1.17s
iterations.....................: 10      0.901249/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```


- load
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '15s', target: 0 },
    { duration: '30s', target: 360 },
    { duration: '60s', target: 360 },
    { duration: '30s', target: 0 },
    { duration: '15s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '15s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  }
};

const BASE_URL = 'https://prodo-subway.r-e.kr/';
const USERNAME = 'wjdals300@gmail.com';
const PASSWORD = '1234';

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

  경로조회(loginRes);

  sleep(1);
};

export function 경로조회(loginRes){

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/paths/?source=1&target=2`, authHeaders).json();
};

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load.js
output: -

scenarios: (100.00%) 1 scenario, 20 max VUs, 2m10s max duration (incl. graceful stop):
* default: Up to 20 looping VUs for 1m40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (1m40.8s), 00/20 VUs, 1475 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  1m40s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 2950 ✗ 0
data_received..................: 5.6 MB  56 kB/s
data_sent......................: 1.2 MB  12 kB/s
http_req_blocked...............: avg=187.22µs min=0s      med=0s      max=268.83ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=33.05µs  min=0s      med=0s      max=10.14ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=31.3ms   min=11.32ms med=17.98ms max=109.59ms p(90)=60.13ms  p(95)=62.78ms
{ expected_response:true }...: avg=31.3ms   min=11.32ms med=17.98ms max=109.59ms p(90)=60.13ms  p(95)=62.78ms
http_req_failed................: 0.00%   ✓ 0    ✗ 4425
http_req_receiving.............: avg=227.26µs min=0s      med=0s      max=1.32ms   p(90)=852.36µs p(95)=972.28µs
http_req_sending...............: avg=7.17µs   min=0s      med=0s      max=1.14ms   p(90)=0s       p(95)=0s
http_req_tls_handshaking.......: avg=150.81µs min=0s      med=0s      max=261.08ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=31.07ms  min=11.32ms med=17.78ms max=109.59ms p(90)=59.89ms  p(95)=62.67ms
http_reqs......................: 4425    43.90129/s
iteration_duration.............: avg=1.09s    min=1.08s   med=1.09s   max=1.36s    p(90)=1.1s     p(95)=1.11s
iterations.....................: 1475    14.633763/s
vus............................: 2       min=1  max=20
vus_max........................: 20      min=20 max=20

```
- stress
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '15s', target: 0 },
    { duration: '30s', target: 270 },
    { duration: '60s', target: 270 },
    { duration: '30s', target: 0 },
    { duration: '15s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '15s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  }
};

const BASE_URL = 'https://prodo-subway.r-e.kr/';
const USERNAME = 'wjdals300@gmail.com';
const PASSWORD = '1234';

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

  경로조회(loginRes);

  sleep(1);
};

export function 경로조회(loginRes){

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/paths/?source=1&target=2`, authHeaders).json();
};

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress.js
output: -

scenarios: (100.00%) 1 scenario, 270 max VUs, 4m30s max duration (incl. graceful stop):
* default: Up to 270 looping VUs for 4m0s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (4m01.0s), 000/270 VUs, 13426 complete and 0 interrupted iterations
default ✓ [======================================] 000/270 VUs  4m0s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 26852 ✗ 0
data_received..................: 52 MB   214 kB/s
data_sent......................: 11 MB   47 kB/s
http_req_blocked...............: avg=176.89µs min=0s      med=0s       max=167.37ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=47.59µs  min=0s      med=0s       max=26.01ms  p(90)=0s       p(95)=0s     
   ✓ http_req_duration..............: avg=319.95ms min=10.59ms med=408.52ms max=1.87s    p(90)=542.32ms p(95)=579.08ms
{ expected_response:true }...: avg=319.95ms min=10.59ms med=408.52ms max=1.87s    p(90)=542.32ms p(95)=579.08ms
http_req_failed................: 0.00%   ✓ 0     ✗ 40278
http_req_receiving.............: avg=190.48µs min=0s      med=0s       max=3.99ms   p(90)=755.03µs p(95)=925.31µs
http_req_sending...............: avg=5.18µs   min=0s      med=0s       max=1.99ms   p(90)=0s       p(95)=0s
http_req_tls_handshaking.......: avg=127.71µs min=0s      med=0s       max=141.58ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=319.76ms min=10.31ms med=408.36ms max=1.87s    p(90)=542.01ms p(95)=578.73ms
http_reqs......................: 40278   167.158527/s
iteration_duration.............: avg=1.96s    min=1.08s   med=2.08s    max=3.98s    p(90)=2.52s    p(95)=2.88s
iterations.....................: 13426   55.719509/s
vus............................: 1       min=1   max=270
vus_max........................: 270     min=270 max=270

```
