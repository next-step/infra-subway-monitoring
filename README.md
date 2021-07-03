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
   * application : /home/ubuntu/nextstep/logs/infra-subway-monitoring.log (3.36.73.166)
   * nginx : /home/ubuntu/nginx/logs (13.209.49.38)

2. Cloudwatch 대시보드 URL을 알려주세요
   * URL :  https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-yjs2952

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   * 이커머스 C 사와 비교
---
### 성능지표 
|   | 지하철노선도 | C사 |
|---|:---:|---:|
|First Contentful Paint|14.5초|  2.6 초  |
|Time to Interactive|15.2초|  8.8 초  | 
|Speed Index|14.5초|  6.4 초  |
|Total Blocking Time|640 밀리초|  440 밀리초  |
|Largest Contentful Paint|15.2초|  12.1 초  |
|Cumulative Layout Shift|0.041|  0.161  |
---
|   | 지하철노선도 | C사 |
|---|:---:|---:|
| First Byte Time | A | A |
| Keep-alive Enabled | A | A|
| Compress Transfer | F |A|
| Compress Images | A |B|
| Cache static content | C | F|
| Effective use of CDN | X | X
---
### 예산설정 (데스크탑 기준)
#### Lighthouse 점수항목 90점이상으로 설정
| 항목  | 수치 |
|---|:---:|
| First Contentful Paint | 910 ms |
| Keep-alive Enabled | 1280 ms |
| Compress Transfer | 1170 ms |
| Time to Interactive | 2380 ms |
| Total Blocking Time | 140 ms |
| Effective use of CDN | 0.10 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   * 텍스트 압축 사용 : gzip, deflate 등
   * 사용하지 않는 자바스크립트 줄이기 : vendors.js, main.js
   * 정적 자원에 캐시사용
   * 웹 폰트가 로드되는 동안 텍스트 표시
   * 이미지 요소에 width, height 명시

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   * Throughput
      - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
      - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
      - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
   * 예상치 도출
      - 모바일&PC 국내 N사 지도의 6개월간 사용자 수 통계 [링크](https://www.similarweb.com/website/coupang.com/?competitors=11st.co.kr)
      - 통계수치를 바탕으로 C사 하루 사용량 예상: 36만명 가량으로 예상
      - 경쟁업체를 기준으로 선정
      - 사용자가 보통 5번씩 사용한다고 가정
      - 1일 총 접속수: 36만명 * 5 = 180만회
      - 180,0000 / 86400 = 20rps
      - 1일 최대 rps: 20 * 100 / 10 = 200 rps
      - 사용자가 1분 내외로 사용한다고 가정.
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

* smoke test
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

const BASE_URL = 'http://3.36.73.166';
const USERNAME = 'test@test.com';
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


running (10.3s), 0/1 VUs, 6 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 12       ✗ 0
data_received..................: 20 kB   2.0 kB/s
data_sent......................: 4.2 kB  407 B/s
http_req_blocked...............: avg=111.76ms min=3µs     med=5µs      max=2.01s    p(90)=10.7µs   p(95)=301.77ms
http_req_connecting............: avg=111.75ms min=0s      med=0s       max=2.01s    p(90)=0s       p(95)=301.73ms
   ✓ http_req_duration..............: avg=128.95ms min=17.28ms med=71.25ms  max=585.04ms p(90)=382.35ms p(95)=434.76ms
{ expected_response:true }...: avg=128.95ms min=17.28ms med=71.25ms  max=585.04ms p(90)=382.35ms p(95)=434.76ms
http_req_failed................: 0.00%   ✓ 0        ✗ 18
http_req_receiving.............: avg=1.09ms   min=63µs    med=404.49µs max=4.51ms   p(90)=2.8ms    p(95)=4.16ms
http_req_sending...............: avg=141.44µs min=17µs    med=31.5µs   max=2.02ms   p(90)=49.4µs   p(95)=356.89µs
http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...............: avg=127.71ms min=16.1ms  med=71.15ms  max=582.74ms p(90)=379.32ms p(95)=434.02ms
http_reqs......................: 18      1.739444/s
iteration_duration.............: avg=1.72s    min=1.13s   med=1.38s    max=3.49s    p(90)=2.64s    p(95)=3.07s
iterations.....................: 6       0.579815/s
vus............................: 1       min=1      max=1
vus_max........................: 1       min=1      max=1
```

* load test
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: "30s", target: 120 }, // simulate ramp-up of traffic from 1 to 120 users over 30 seconds.
    { duration: "1m", target: 220 }, // stay at 120 users for 1 minutes
    { duration: "10s", target: 0 } // ramp-down to 0 users
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  }
};

const BASE_URL = 'http://3.36.73.166';
const USERNAME = 'test@test.com';
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

    scenarios: (100.00%) 1 scenario, 220 max VUs, 2m10s max duration (incl. graceful stop):
* default: Up to 220 looping VUs for 1m40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m40.7s), 000/220 VUs, 8697 complete and 0 interrupted iterations
default ✓ [======================================] 000/220 VUs  1m40s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 17394      ✗ 0
data_received..................: 29 MB   292 kB/s
data_sent......................: 6.1 MB  61 kB/s
http_req_blocked...............: avg=221.5µs  min=1µs    med=5µs      max=452.58ms p(90)=8µs      p(95)=12µs
http_req_connecting............: avg=214.37µs min=0s     med=0s       max=452.4ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=173.17ms min=9.22ms med=157.59ms max=1.25s    p(90)=343.38ms p(95)=387.23ms
{ expected_response:true }...: avg=173.17ms min=9.22ms med=157.59ms max=1.25s    p(90)=343.38ms p(95)=387.23ms
http_req_failed................: 0.00%   ✓ 0          ✗ 26091
http_req_receiving.............: avg=556.26µs min=18µs   med=94µs     max=75.21ms  p(90)=1.42ms   p(95)=2.38ms
http_req_sending...............: avg=35.35µs  min=7µs    med=30µs     max=1.09ms   p(90)=56µs     p(95)=75µs
http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...............: avg=172.57ms min=8.78ms med=156.97ms max=1.25s    p(90)=342.56ms p(95)=386.4ms
http_reqs......................: 26091   259.010937/s
iteration_duration.............: avg=1.52s    min=1.07s  med=1.53s    max=3s       p(90)=1.99s    p(95)=2.07s
iterations.....................: 8697    86.336979/s
vus............................: 12      min=4        max=219
vus_max........................: 220     min=220      max=220
```

* stress test
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '20s', target: 50 },
    { duration: '10s', target: 0 },
    { duration: '20s', target: 230 },
    { duration: '40s', target: 230 },
    { duration: '20s', target: 0 },
    { duration: '10s', target: 50 },
    { duration: '20s', target: 50 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  }
};

const BASE_URL = 'http://3.36.73.166:8080';
const USERNAME = 'test@test.com';
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

    scenarios: (100.00%) 1 scenario, 230 max VUs, 3m10s max duration (incl. graceful stop):
* default: Up to 230 looping VUs for 2m40s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m40.9s), 000/230 VUs, 10379 complete and 0 interrupted iterations
default ✓ [======================================] 000/230 VUs  2m40s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 20758      ✗ 0
data_received..................: 35 MB   218 kB/s
data_sent......................: 7.4 MB  46 kB/s
http_req_blocked...............: avg=131.92µs min=1µs    med=5µs      max=178.41ms p(90)=9µs      p(95)=13µs
http_req_connecting............: avg=124.46µs min=0s     med=0s       max=178.32ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=212.88ms min=8.49ms med=228.78ms max=1.65s    p(90)=408.78ms p(95)=445.19ms
{ expected_response:true }...: avg=212.88ms min=8.49ms med=228.78ms max=1.65s    p(90)=408.78ms p(95)=445.19ms
http_req_failed................: 0.00%   ✓ 0          ✗ 31137
http_req_receiving.............: avg=402.19µs min=19µs   med=95µs     max=27.26ms  p(90)=794µs    p(95)=1.85ms
http_req_sending...............: avg=36.9µs   min=7µs    med=30µs     max=1.66ms   p(90)=60µs     p(95)=79µs
http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...............: avg=212.44ms min=8.28ms med=228.14ms max=1.65s    p(90)=408.07ms p(95)=444.13ms
http_reqs......................: 31137   193.552069/s
iteration_duration.............: avg=1.64s    min=1.07s  med=1.73s    max=3.4s     p(90)=2.15s    p(95)=2.34s
iterations.....................: 10379   64.517356/s
vus............................: 4       min=4        max=230
vus_max........................: 230     min=230      max=230
```