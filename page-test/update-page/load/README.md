# 데이터를 갱신하는 페이지 Load Test 
## 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 40},
        {duration: '35s', target: 70},
        {duration: '5s', target: 0},
    ],
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
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update-load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.0s), 00/70 VUs, 44459 complete and 0 interrupted iterations
default ✓ [======================================] 00/70 VUs  1m0s

     ✓ logged in successfully
     ✓ update member

     checks.........................: 100.00% ✓ 88918       ✗ 0
     data_received..................: 27 MB   452 kB/s
     data_sent......................: 28 MB   468 kB/s
     http_req_blocked...............: avg=15.81µs min=2.72µs  med=4.2µs   max=31.12ms  p(90)=4.82µs  p(95)=5.52µs
     http_req_connecting............: avg=2µs     min=0s      med=0s      max=2.7ms    p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=27.8ms  min=8.31ms  med=25.03ms max=264.13ms p(90)=46.03ms p(95)=55.55ms
       { expected_response:true }...: avg=27.8ms  min=8.31ms  med=25.03ms max=264.13ms p(90)=46.03ms p(95)=55.55ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 88918
     http_req_receiving.............: avg=47.02µs min=17.66µs med=39.62µs max=11.64ms  p(90)=59.62µs p(95)=66.03µs
     http_req_sending...............: avg=25.35µs min=11.41µs med=16.19µs max=13.37ms  p(90)=27.82µs p(95)=33.07µs
     http_req_tls_handshaking.......: avg=9.07µs  min=0s      med=0s      max=29.28ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=27.72ms min=8.24ms  med=24.96ms max=264.09ms p(90)=45.96ms p(95)=55.48ms
     http_reqs......................: 88918   1481.451841/s
     iteration_duration.............: avg=55.92ms min=20.24ms med=52.87ms max=287.39ms p(90)=86.89ms p(95)=100.35ms
     iterations.....................: 44459   740.725921/s
     vus............................: 1       min=1         max=69
     vus_max........................: 70      min=70        max=70

```
> 내 정보 수정 페이지는 vux 70 정도 이하에서 원활하게 (응답속도 100ms) 작동함