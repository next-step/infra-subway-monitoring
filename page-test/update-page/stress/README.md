# 데이터를 갱신하는 페이지 : Stress Test
## 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 100},
        {duration: '10s', target: 200},
        {duration: '10s', target: 300},
        {duration: '10s', target: 400},
        {duration: '10s', target: 500},
        {duration: '10s', target: 600},
        {duration: '10s', target: 700},
        {duration: '10s', target: 780},
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
## 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update-stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 780 max VUs, 1m50s max duration (incl. graceful stop):
           * default: Up to 780 looping VUs for 1m20s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)

	
running (1m21.0s), 000/780 VUs, 66735 complete and 0 interrupted iterations
default ✗ [======================================] 000/780 VUs  1m20s

     ✗ logged in successfully
      ↳  99% — ✓ 66730 / ✗ 5
     ✗ update member
      ↳  99% — ✓ 66729 / ✗ 1

     checks.........................: 99.99% ✓ 133459      ✗ 6
     data_received..................: 43 MB  536 kB/s
     data_sent......................: 42 MB  523 kB/s
     http_req_blocked...............: avg=56.22µs  min=2.79µs   med=4.2µs    max=116.65ms p(90)=4.88µs   p(95)=5.86µs
     http_req_connecting............: avg=10.33µs  min=0s       med=0s       max=43.31ms  p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=240.9ms  min=476.1µs  med=197.42ms max=3.59s    p(90)=493.32ms p(95)=607.85ms
       { expected_response:true }...: avg=240.91ms min=8.51ms   med=197.42ms max=3.59s    p(90)=493.33ms p(95)=607.85ms
     http_req_failed................: 0.00%  ✓ 6           ✗ 133459
     http_req_receiving.............: avg=51.51µs  min=0s       med=40.52µs  max=29.29ms  p(90)=61.54µs  p(95)=69.82µs
     http_req_sending...............: avg=28.38µs  min=11.53µs  med=16.57µs  max=24.65ms  p(90)=29.08µs  p(95)=37.78µs
     http_req_tls_handshaking.......: avg=40.7µs   min=0s       med=0s       max=95.84ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=240.82ms min=459.31µs med=197.31ms max=3.59s    p(90)=493.23ms p(95)=607.76ms
     http_reqs......................: 133465 1647.843306/s
     iteration_duration.............: avg=482.2ms  min=1.25ms   med=427.88ms max=4.03s    p(90)=939.29ms p(95)=1.12s
     iterations.....................: 66735  823.95252/s
     vus............................: 0      min=0         max=779
     vus_max........................: 780    min=780       max=780

ERRO[0082] some thresholds have failed
```
내 정보 업데이트 페이지는 vux 750 정도 부터 실패하는 요청이 등장했다.