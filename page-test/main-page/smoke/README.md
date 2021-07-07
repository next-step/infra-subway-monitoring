# 접속 빈도가 높은 페이지 Smoke Test
## 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

function 로그인() {
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

function 내_정보_조회(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
}

export default function ()  {
    const token = 로그인().json('accessToken');
    내_정보_조회(token);
}

```
## 결과
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


running (10.0s), 0/1 VUs, 437 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 874     ✗ 0
     data_received..................: 306 kB  31 kB/s
     data_sent......................: 229 kB  23 kB/s
     http_req_blocked...............: avg=58.87µs min=4.28µs  med=5.16µs  max=46.81ms  p(90)=5.79µs   p(95)=6.36µs
     http_req_connecting............: avg=1.51µs  min=0s      med=0s      max=1.32ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=11.18ms min=8.64ms  med=12ms    max=24.99ms  p(90)=13.02ms  p(95)=13.49ms
       { expected_response:true }...: avg=11.18ms min=8.64ms  med=12ms    max=24.99ms  p(90)=13.02ms  p(95)=13.49ms
     http_req_failed................: 0.00%   ✓ 0       ✗ 874
     http_req_receiving.............: avg=84.96µs min=53.69µs med=84.56µs max=157.89µs p(90)=100.65µs p(95)=104.88µs
     http_req_sending...............: avg=22.26µs min=13.61µs med=20.99µs max=110.06µs p(90)=32.88µs  p(95)=35.92µs
     http_req_tls_handshaking.......: avg=37.02µs min=0s      med=0s      max=32.35ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=11.07ms min=8.56ms  med=11.89ms max=24.87ms  p(90)=12.92ms  p(95)=13.37ms
     http_reqs......................: 874     87.2884/s
     iteration_duration.............: avg=22.89ms min=21.04ms med=22.46ms max=72.4ms   p(90)=23.77ms  p(95)=24.87ms
     iterations.....................: 437     43.6442/s
     vus............................: 1       min=1     max=1
     vus_max........................: 1       min=1     max=1

```
