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

nginx : 15.165.74.244
logPath : /home/ubuntu/nginx/logs
WAS : 13.125.77.49
logPath : /home/ubuntu/infra-subway-deploy-main/logs

2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-reversalspring
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   (https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Freversalspring.n-e.kr)
   

|   | 지하철노선도 | I사 |
|---|:---:|---:|
|First Contentful Paint|14.6초|  4.2 초  |
|Time to Interactive|15.2초|  37.3 초  |
|Speed Index|14.6초|  13.5 초  |
|Total Blocking Time|560 밀리초|  2,450 밀리초  |
|Largest Contentful Paint|15.2초|  13.8 초  |
|Cumulative Layout Shift|0.041|  0.779  |

### 예산설정
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

const BASE_URL = 'https://reversalspring.n-e.kr/';
const USERNAME = 'p_illusion@naver.com';
const PASSWORD = 'password';

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
```
### 결과
```javascript
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
default ↓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0  
     data_received..................: 17 kB   1.6 kB/s
     data_sent......................: 8.9 kB  873 B/s
     http_req_blocked...............: avg=2.13ms  min=3.77µs  med=4.12µs  max=63.84ms  p(90)=9.18µs  p(95)=11.87µs
     http_req_connecting............: avg=18.38µs min=0s      med=0s      max=551.46µs p(90)=0s      p(95)=0s     
✓ http_req_duration..............: avg=4.47ms  min=3.33ms  med=4.32ms  max=12.53ms  p(90)=4.68ms  p(95)=4.76ms
{ expected_response:true }...: avg=4.47ms  min=3.33ms  med=4.32ms  max=12.53ms  p(90)=4.68ms  p(95)=4.76ms
http_req_failed................: 0.00%   ✓ 0        ✗ 30
http_req_receiving.............: avg=41.39µs min=30µs    med=33.79µs max=77.69µs  p(90)=59.27µs p(95)=68.13µs
http_req_sending...............: avg=20.14µs min=11.16µs med=12.46µs max=89.26µs  p(90)=29.13µs p(95)=37.45µs
http_req_tls_handshaking.......: avg=1.71ms  min=0s      med=0s      max=51.43ms  p(90)=0s      p(95)=0s     
http_req_waiting...............: avg=4.4ms   min=3.29ms  med=4.25ms  max=12.37ms  p(90)=4.61ms  p(95)=4.68ms
http_reqs......................: 30      2.938552/s
iteration_duration.............: avg=1.02s   min=1.01s   med=1.01s   max=1.08s    p(90)=1.02s   p(95)=1.05s  
iterations.....................: 10      0.979517/s
vus............................: 1       min=1      max=1
vus_max........................: 1       min=1      max=1
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

const BASE_URL = 'https://reversalspring.n-e.kr/';
const USERNAME = 'p_illusion@naver.com';
const PASSWORD = 'password';

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
```

### 결과
```javascript
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load.js
output: -

scenarios: (100.00%) 1 scenario, 360 max VUs, 4m30s max duration (incl. graceful stop):
* default: Up to 360 looping VUs for 4m0s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (4m00.6s), 000/360 VUs, 33656 complete and 0 interrupted iterations
default ✓ [======================================] 000/360 VUs  4m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 67312      ✗ 0     
     data_received..................: 42 MB   175 kB/s
     data_sent......................: 29 MB   120 kB/s
     http_req_blocked...............: avg=23.71µs min=3.09µs  med=4.14µs  max=66.1ms   p(90)=7.79µs   p(95)=25.34µs
     http_req_connecting............: avg=2.23µs  min=0s      med=0s      max=13.85ms  p(90)=0s       p(95)=0s     
✓ http_req_duration..............: avg=7.1ms   min=3.06ms  med=4.98ms  max=136.16ms p(90)=12.75ms  p(95)=18.19ms
{ expected_response:true }...: avg=7.1ms   min=3.06ms  med=4.98ms  max=136.16ms p(90)=12.75ms  p(95)=18.19ms
http_req_failed................: 0.00%   ✓ 0          ✗ 100968
http_req_receiving.............: avg=61.93µs min=19.04µs med=31.24µs max=33.45ms  p(90)=172.37µs p(95)=186.5µs
http_req_sending...............: avg=41.67µs min=9.12µs  med=14.04µs max=31.68ms  p(90)=34.57µs  p(95)=55.86µs
http_req_tls_handshaking.......: avg=15.06µs min=0s      med=0s      max=53.08ms  p(90)=0s       p(95)=0s     
http_req_waiting...............: avg=7ms     min=3.02ms  med=4.9ms   max=136.1ms  p(90)=12.59ms  p(95)=17.98ms
http_reqs......................: 100968  419.609/s
iteration_duration.............: avg=1.02s   min=1.01s   med=1.01s   max=1.27s    p(90)=1.03s    p(95)=1.04s  
iterations.....................: 33656   139.869667/s
vus............................: 1       min=1        max=360
vus_max........................: 360     min=360      max=360
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

const BASE_URL = 'https://reversalspring.n-e.kr/';
const USERNAME = 'p_illusion@naver.com';
const PASSWORD = 'password';

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
```

### 결과
```javascript
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


running (4m00.6s), 000/270 VUs, 25839 complete and 0 interrupted iterations
default ↓ [======================================] 001/270 VUs  4m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 51678      ✗ 0    
     data_received..................: 32 MB   135 kB/s
     data_sent......................: 22 MB   92 kB/s
     http_req_blocked...............: avg=23.48µs min=3.08µs med=4.16µs  max=70.19ms p(90)=7.99µs   p(95)=25.49µs 
     http_req_connecting............: avg=2.11µs  min=0s     med=0s      max=7.56ms  p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=5.24ms  min=3.1ms  med=4.34ms  max=1.02s   p(90)=7.19ms   p(95)=9.69ms  
       { expected_response:true }...: avg=5.24ms  min=3.1ms  med=4.34ms  max=1.02s   p(90)=7.19ms   p(95)=9.69ms  
     http_req_failed................: 0.00%   ✓ 0          ✗ 77517
     http_req_receiving.............: avg=56.39µs min=19.9µs med=31.04µs max=42.33ms p(90)=169.57µs p(95)=183.53µs
     http_req_sending...............: avg=28.93µs min=9.54µs med=13.84µs max=39.46ms p(90)=34.05µs  p(95)=41.95µs 
     http_req_tls_handshaking.......: avg=14.66µs min=0s     med=0s      max=45.87ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.15ms  min=3.05ms med=4.26ms  max=1.02s   p(90)=7.08ms   p(95)=9.56ms  
     http_reqs......................: 77517   322.240967/s
     iteration_duration.............: avg=1.01s   min=1.01s  med=1.01s   max=2.03s   p(90)=1.02s    p(95)=1.02s   
     iterations.....................: 25839   107.413656/s
     vus............................: 1       min=1        max=270
     vus_max........................: 270     min=270      max=270
```