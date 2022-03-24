# Smoke test script
```
import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
stages: [
{duration: "10s", target: 1},
],
thresholds: {
http_req_duration: ["p(99)<100"], // 99% of requests must complete below 0.1s
},
};
const BASE_URL = 'https://minjoonlee.kro.kr';
const USERNAME = 'minjoon1995@naver.com';
const PASSWORD = '1324';

export default function () {
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

    function 즐겨찾기(accessToken) {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        let myObjects = http.get(`${BASE_URL}/favorites`, authHeaders).json();
        check(myObjects, {'get favorites successfully': (obj) => obj.id != 0});
    }

    // 시나리오
    let token = 로그인().json('accessToken');
    즐겨찾기(token);
}
```

---
# Smoke test 결과
```
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: smoke.js
output: -

scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: Up to 1 looping VUs for 10s over 1 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (10.0s), 0/1 VUs, 451 complete and 0 interrupted iterations
default ↓ [======================================] 1/1 VUs  10s

     ✓ logged in successfully
     ✓ get favorites successfully

     checks.........................: 100.00% ✓ 902       ✗ 0
     data_received..................: 416 kB  42 kB/s
     data_sent......................: 237 kB  24 kB/s
     http_req_blocked...............: avg=29.27µs min=2.03µs  med=2.65µs  max=23.7ms   p(90)=3.69µs  p(95)=4.29µs
     http_req_connecting............: avg=786ns   min=0s      med=0s      max=709.54µs p(90)=0s      p(95)=0s
✓ http_req_duration..............: avg=10.87ms min=5.88ms  med=13.91ms max=39.38ms  p(90)=15.37ms p(95)=15.82ms
{ expected_response:true }...: avg=10.87ms min=5.88ms  med=13.91ms max=39.38ms  p(90)=15.37ms p(95)=15.82ms
http_req_failed................: 0.00%   ✓ 0         ✗ 902
http_req_receiving.............: avg=65.79µs min=42.1µs  med=57.7µs  max=3.86ms   p(90)=73.52µs p(95)=80.61µs
http_req_sending...............: avg=17.31µs min=10.57µs med=15.79µs max=412.5µs  p(90)=22.19µs p(95)=26.01µs
http_req_tls_handshaking.......: avg=16.76µs min=0s      med=0s      max=15.12ms  p(90)=0s      p(95)=0s
http_req_waiting...............: avg=10.79ms min=5.81ms  med=13.85ms max=39.07ms  p(90)=15.27ms p(95)=15.73ms
http_reqs......................: 902     90.131806/s
iteration_duration.............: avg=22.16ms min=20.22ms med=21.68ms max=82.28ms  p(90)=23.1ms  p(95)=24.64ms
iterations.....................: 451     45.065903/s
vus............................: 1       min=1       max=1
vus_max........................: 1       min=1       max=1```