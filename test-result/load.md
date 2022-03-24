# Load test script
```
import http from "k6/http";
import {check, group, sleep, fail} from "k6";

// T = 0.4s / VuserMax = (460 * 0.4)/2 = 92 / VuserAverage = (92 * 0.4)/2 = 18
export let options = {
stages: [

        {duration: "10s", target: 18}, // 0 ~ VuserAverage
        {duration: "10s", target: 18}, // VuserAverage
        {duration: "10s", target: 92}, // VuserAverage ~ VuserMax
        {duration: "10s", target: 92}, // VuserMax
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
# Load test result
```
ubuntu@ip-192-168-0-7:~/script$ k6 run load.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 115 max VUs, 1m10s max duration (incl. graceful stop):
           * default: Up to 115 looping VUs for 40s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m40.3s), 000/115 VUs, 11712 complete and 0 interrupted iterations
default ↓ [======================================] 115/115 VUs  40s

     ✓ logged in successfully
     ✓ get favorites successfully

     checks.........................: 100.00% ✓ 23424      ✗ 0
     data_received..................: 11 MB   278 kB/s
     data_sent......................: 6.2 MB  153 kB/s
     http_req_blocked...............: avg=381.41µs min=1.03µs  med=3.19µs  max=537.27ms p(90)=5.43µs   p(95)=12.51µs
     http_req_connecting............: avg=117.88µs min=0s      med=0s      max=230.1ms  p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=92.05ms  min=5.65ms  med=49.15ms max=689.81ms p(90)=206.5ms  p(95)=231.95ms
       { expected_response:true }...: avg=92.05ms  min=5.65ms  med=49.15ms max=689.81ms p(90)=206.5ms  p(95)=231.95ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 23424
     http_req_receiving.............: avg=526.08µs min=18.25µs med=46.96µs max=219.12ms p(90)=622.39µs p(95)=1.63ms
     http_req_sending...............: avg=332.38µs min=5.88µs  med=17.35µs max=284.78ms p(90)=94.4µs   p(95)=502.7µs
     http_req_tls_handshaking.......: avg=229.41µs min=0s      med=0s      max=286.96ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=91.19ms  min=5.57ms  med=48.49ms max=689.76ms p(90)=205.59ms p(95)=230.51ms
     http_reqs......................: 23424   581.418316/s
     iteration_duration.............: avg=187.48ms min=20.46ms med=95.17ms max=919.29ms p(90)=407.6ms  p(95)=462.82ms
     iterations.....................: 11712   290.709158/s
     vus............................: 108     min=3        max=115
     vus_max........................: 115     min=115      max=115

ERRO[0041] some thresholds have failed


```

목표로 했던 1일 최대 rps 를 115로 잡았기 때문에 Vuser max 를 115로 잡았습니다. 해당 트래픽이 목표로한 0.1s 안에 http_req_duration이
들어오지 못했습니다.