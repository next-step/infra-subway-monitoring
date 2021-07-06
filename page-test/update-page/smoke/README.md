# 데이터를 갱신하는 페이지 : Smoke Test
## 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
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

function 내_정보_수정(accessToken) {
    let authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 20
    });

    let updateRes = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
    check(updateRes, {
        'update member': (res) => res.status === 200
    });
}

export default function ()  {
    const token = 로그인().json('accessToken');
    내_정보_수정(token);
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
     script: update-smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 0/1 VUs, 451 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ update member

     checks.........................: 100.00% ✓ 902       ✗ 0
     data_received..................: 274 kB  27 kB/s
     data_sent......................: 285 kB  28 kB/s
     http_req_blocked...............: avg=76.04µs min=3.65µs  med=4.74µs  max=64.06ms  p(90)=5.37µs  p(95)=6.37µs
     http_req_connecting............: avg=1.37µs  min=0s      med=0s      max=1.24ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=10.84ms min=8.58ms  med=11.8ms  max=18.73ms  p(90)=12.73ms p(95)=12.93ms
       { expected_response:true }...: avg=10.84ms min=8.58ms  med=11.8ms  max=18.73ms  p(90)=12.73ms p(95)=12.93ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 902
     http_req_receiving.............: avg=56.17µs min=31.83µs med=55.15µs max=330.22µs p(90)=70.94µs p(95)=75.6µs
     http_req_sending...............: avg=24.01µs min=14.87µs med=21.7µs  max=349.27µs p(90)=31.13µs p(95)=32.7µs
     http_req_tls_handshaking.......: avg=32.7µs  min=0s      med=0s      max=29.49ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=10.76ms min=8.48ms  med=11.53ms max=18.65ms  p(90)=12.66ms p(95)=12.86ms
     http_reqs......................: 902     90.128719/s
     iteration_duration.............: avg=22.17ms min=20.87ms med=21.88ms max=95.07ms  p(90)=22.84ms p(95)=23.22ms
     iterations.....................: 451     45.064359/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1

```