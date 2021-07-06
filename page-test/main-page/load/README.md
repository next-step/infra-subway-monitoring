# 접속 빈도가 높은 페이지 Load Test

## 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 40},
        {duration: '35s', target: 70},~~~~
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

export default function ()  {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    function 로그인() {
        let params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

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

    // 시나리오
    let token = 로그인().json('accessToken');
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
     script: freq_load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.0s), 00/70 VUs, 35245 complete and 0 interrupted iterations
default ✗ [======================================] 00/70 VUs  1m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 70490       ✗ 0
     data_received..................: 25 MB   414 kB/s
     data_sent......................: 18 MB   307 kB/s
     http_req_blocked...............: avg=16.15µs min=2.57µs  med=4.29µs  max=30.87ms  p(90)=4.91µs   p(95)=5.62µs
     http_req_connecting............: avg=2.13µs  min=0s      med=0s      max=4.18ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=35.11ms min=8.34ms  med=36.19ms max=246.3ms  p(90)=52.96ms  p(95)=62.42ms
       { expected_response:true }...: avg=35.11ms min=8.34ms  med=36.19ms max=246.3ms  p(90)=52.96ms  p(95)=62.42ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 70490
     http_req_receiving.............: avg=54.26µs min=23.55µs med=52.37µs max=15.14ms  p(90)=63.89µs  p(95)=70.73µs
     http_req_sending...............: avg=21.98µs min=9.42µs  med=15.38µs max=8.33ms   p(90)=25.46µs  p(95)=29.72µs
     http_req_tls_handshaking.......: avg=9.15µs  min=0s      med=0s      max=28.97ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=35.03ms min=8.26ms  med=36.1ms  max=246.22ms p(90)=52.88ms  p(95)=62.24ms
     http_reqs......................: 70490   1174.716564/s
     iteration_duration.............: avg=70.55ms min=20.27ms med=70.53ms max=293.07ms p(90)=105.63ms p(95)=122.34ms
     iterations.....................: 35245   587.358282/s
     vus............................: 1       min=1         max=69
     vus_max........................: 70      min=70        max=70

```

서비스가 원활한 상태 (응답 속도 100ms 이하) 를 유지하려면 vux 가 최대 70, rps 최대 1200 이하 정도여야 한다.