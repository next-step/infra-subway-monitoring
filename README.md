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
- error : `/home/ubuntu/logs/prod/error.log`    
- file : `/home/ubuntu/logs/prod/prod.log`    
- json : `/home/ubuntu/logs/prod/json.log`   
- spring : `/home/ubuntu/logs/prod/spring.log`   

2. Cloudwatch 대시보드 URL을 알려주세요
[https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=kwj1270-dashboard](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=kwj1270-dashboard) 
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
#### Smoke
**접속 빈도가 높은 페이지**
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
const DATA = JSON.stringify({email: USERNAME, password: PASSWORD});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
  let loginRes = http.post(`${BASE_URL}/login/token`, DATA, PARAMS);

  check(loginRes, {
    'logged in successfully': (resp) => resp.status === 200,
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
----------------------------------------------
    /\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: login-smoke.js
output: -

    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.7s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 20  ✗ 0
data_received..................: 12 kB   1.1 kB/s
data_sent......................: 5.5 kB  515 B/s
http_req_blocked...............: avg=18.51ms min=2.85µs  med=4.61µs  max=370.13ms p(90)=6.98µs   p(95)=18.51ms
http_req_connecting............: avg=14.4µs  min=0s      med=0s      max=288.11µs p(90)=0s       p(95)=14.4µs
   ✓ http_req_duration..............: avg=17.1ms  min=12.08ms med=15.37ms max=26.62ms  p(90)=23.84ms  p(95)=24.04ms
{ expected_response:true }...: avg=17.1ms  min=12.08ms med=15.37ms max=26.62ms  p(90)=23.84ms  p(95)=24.04ms
http_req_failed................: 0.00%   ✓ 0   ✗ 20
http_req_receiving.............: avg=91.53µs min=75.97µs med=85.75µs max=135.11µs p(90)=106.96µs p(95)=112.12µs
http_req_sending...............: avg=31.47µs min=14.36µs med=31.09µs max=102.35µs p(90)=36.02µs  p(95)=40.11µs
http_req_tls_handshaking.......: avg=1.2ms   min=0s      med=0s      max=24.03ms  p(90)=0s       p(95)=1.2ms
http_req_waiting...............: avg=16.97ms min=11.94ms med=15.27ms max=26.47ms  p(90)=23.73ms  p(95)=23.94ms
http_reqs......................: 20      1.864379/s
iteration_duration.............: avg=1.07s   min=1.02s   med=1.03s   max=1.4s     p(90)=1.08s    p(95)=1.24s
iterations.....................: 10      0.93219/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```
**데이터를 갱신하는 페이지**
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
const AGE = 20;
const LOGIN_DATA = JSON.stringify({email: USERNAME, password: PASSWORD,});
const UPDATE_DATA = JSON.stringify({email: USERNAME, password: PASSWORD, age:AGE});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
    let updateRes = http.put(`${BASE_URL}/members/1`, UPDATE_DATA, PARAMS);

    check(updateRes, {
        'update successfully': (resp) => resp.status === 200,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, LOGIN_DATA, PARAMS);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 200,
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
----------------------------------------------
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update-smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ update successfully
     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 30  ✗ 0
     data_received..................: 14 kB   1.3 kB/s
     data_sent......................: 7.8 kB  748 B/s
     http_req_blocked...............: avg=744.24µs min=2.58µs  med=4.22µs  max=22.2ms   p(90)=5.63µs   p(95)=5.94µs
     http_req_connecting............: avg=8.24µs   min=0s      med=0s      max=247.3µs  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=14.53ms  min=10.41ms med=12.48ms max=25.85ms  p(90)=20.65ms  p(95)=22.62ms
       { expected_response:true }...: avg=14.53ms  min=10.41ms med=12.48ms max=25.85ms  p(90)=20.65ms  p(95)=22.62ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 30
     http_req_receiving.............: avg=89.31µs  min=53.9µs  med=79.68µs max=240.94µs p(90)=134.62µs p(95)=143.75µs
     http_req_sending...............: avg=121.97µs min=16.02µs med=27.79µs max=1.39ms   p(90)=163.03µs p(95)=707.93µs
     http_req_tls_handshaking.......: avg=714.11µs min=0s      med=0s      max=21.42ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=14.32ms  min=10.32ms med=12.34ms max=25.74ms  p(90)=19.59ms  p(95)=22.5ms
     http_reqs......................: 30      2.864549/s
     iteration_duration.............: avg=1.04s    min=1.03s   med=1.04s   max=1.08s    p(90)=1.05s    p(95)=1.06s
     iterations.....................: 10      0.95485/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

**데이터를 조회하는데 여러 데이터를 참조하는 페이지**  
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

const BASE_URL = 'https://kwj1270.ga';

export default function () {
    const res = http.get(`${BASE_URL}/stations`);
    check(res, {
        'page load successfully': (resp) => resp.status === 200,
    });


    sleep(1);
}
----------------------------------------------

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: page-smoke.js
output: -

    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (11.0s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ page load successfully

checks.........................: 100.00% ✓ 10  ✗ 0
data_received..................: 725 kB  66 kB/s
data_sent......................: 1.5 kB  136 B/s
http_req_blocked...............: avg=33.71ms min=4.18µs  med=4.64µs  max=337.06ms p(90)=33.71ms p(95)=185.38ms
http_req_connecting............: avg=28.28µs min=0s      med=0s      max=282.82µs p(90)=28.28µs p(95)=155.55µs
   ✓ http_req_duration..............: avg=64.33ms min=50.7ms  med=62.72ms max=89.46ms  p(90)=73.7ms  p(95)=81.58ms
{ expected_response:true }...: avg=64.33ms min=50.7ms  med=62.72ms max=89.46ms  p(90)=73.7ms  p(95)=81.58ms
http_req_failed................: 0.00%   ✓ 0   ✗ 10
http_req_receiving.............: avg=5.16ms  min=3.62ms  med=5.09ms  max=7.63ms   p(90)=6.27ms  p(95)=6.95ms
http_req_sending...............: avg=30.83µs min=24.9µs  med=25.88µs max=68.89µs  p(90)=34.02µs p(95)=51.45µs
http_req_tls_handshaking.......: avg=2.25ms  min=0s      med=0s      max=22.55ms  p(90)=2.25ms  p(95)=12.4ms
http_req_waiting...............: avg=59.13ms min=47.05ms med=57.04ms max=84.19ms  p(90)=67.64ms p(95)=75.91ms
http_reqs......................: 10      0.909936/s
iteration_duration.............: avg=1.09s   min=1.05s   med=1.06s   max=1.4s     p(90)=1.12s   p(95)=1.26s
iterations.....................: 10      0.909936/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```
