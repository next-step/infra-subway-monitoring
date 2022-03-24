# 접속 빈도가 높은 기능
## Load test script
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

// T = 0.1s / VuserMax = (460 * 0.1)/1 = 46 / VuserAverage = (92 * 0.1)/1 = 9
export let options = {
stages: [

        {duration: "10s", target: 9}, // 0 ~ VuserAverage
        {duration: "10s", target: 46}, // VuserAverage
        {duration: "10s", target: 46}, // VuserAverage ~ VuserMax
        {duration: "10s", target: 46}, // VuserMax
],
thresholds: {
http_req_duration: ["p(99)<100"], // 99% of requests must complete below 0.1s
},
};
const BASE_URL = 'https://minjoonlee.kro.kr';

export default function () {
    let myObjects = http.get(`${BASE_URL}`);
    check(myObjects, {'메인화면 로드함': (res) => res.status === 200});
    sleep(1);
};


```
## Load test result
```
ubuntu@ip-192-168-0-7:~/script$ k6 run load-simple.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load-simple.js
     output: -

  scenarios: (100.00%) 1 scenario, 46 max VUs, 1m10s max duration (incl. gracefu                                                                                                                   l stop):
           * default: Up to 46 looping VUs for 40s over 4 stages (gracefulRampDo                                                                                                                   wn: 30s, gracefulStop: 30s)


running (0m41.0s), 00/46 VUs, 1254 complete and 0 interrupted iterations
default ✓ [======================================] 00/46 VUs  40s

     ✓ 메인화면 로드함

     checks.........................: 100.00% ✓ 1254      ✗ 0
     data_received..................: 1.8 MB  44 kB/s
     data_sent......................: 158 kB  3.9 kB/s
     http_req_blocked...............: avg=217.06µs min=1.61µs   med=4.52µs  max=                                                                                                                   36.21ms p(90)=6.65µs   p(95)=19.88µs
     http_req_connecting............: avg=27.35µs  min=0s       med=0s      max=                                                                                                                   1.47ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=1.74ms   min=1.04ms   med=1.56ms  max=                                                                                                                   13.16ms p(90)=2.24ms   p(95)=2.62ms
       { expected_response:true }...: avg=1.74ms   min=1.04ms   med=1.56ms  max=                                                                                                                   13.16ms p(90)=2.24ms   p(95)=2.62ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 1254
     http_req_receiving.............: avg=89.02µs  min=14.71µs  med=69.18µs max=                                                                                                                   2.45ms  p(90)=135.15µs p(95)=190.19µs
     http_req_sending...............: avg=28.64µs  min=6.06µs   med=18.7µs  max=                                                                                                                   4.13ms  p(90)=34.25µs  p(95)=52.13µs
     http_req_tls_handshaking.......: avg=164.9µs  min=0s       med=0s      max=                                                                                                                   14.34ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=1.62ms   min=997.48µs med=1.45ms  max=                                                                                                                   8.94ms  p(90)=2.1ms    p(95)=2.49ms
     http_reqs......................: 1254    30.595868/s
     iteration_duration.............: avg=1s       min=1s       med=1s      max=                                                                                                                   1.03s   p(90)=1s       p(95)=1s
     iterations.....................: 1254    30.595868/s
     vus............................: 46      min=1       max=46
     vus_max........................: 46      min=46      max=46


```

# DB를 사용하는 기능

## Load test script
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


## Load test result
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

  scenarios: (100.00%) 1 scenario, 92 max VUs, 1m10s max duration (incl. graceful stop):
           * default: Up to 92 looping VUs for 40s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m40.2s), 00/92 VUs, 11460 complete and 0 interrupted iterations
default ↓ [======================================] 90/92 VUs  40s

     ✓ logged in successfully
     ✓ get favorites successfully

     checks.........................: 100.00% ✓ 22920      ✗ 0
     data_received..................: 11 MB   271 kB/s
     data_sent......................: 6.0 MB  150 kB/s
     http_req_blocked...............: avg=238.18µs min=1.1µs   med=3.21µs  max=372.74ms p(90)=5.6µs    p(95)=12.79µs
     http_req_connecting............: avg=65.75µs  min=0s      med=0s      max=175.5ms  p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=74.77ms  min=5.64ms  med=42.31ms max=491.76ms p(90)=167.03ms p(95)=189.29ms
       { expected_response:true }...: avg=74.77ms  min=5.64ms  med=42.31ms max=491.76ms p(90)=167.03ms p(95)=189.29ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 22920
     http_req_receiving.............: avg=409.04µs min=14.84µs med=48.47µs max=179.89ms p(90)=451.18µs p(95)=1.26ms
     http_req_sending...............: avg=237.01µs min=6.22µs  med=17.56µs max=136.92ms p(90)=75µs     p(95)=394.69µs
     http_req_tls_handshaking.......: avg=143.31µs min=0s      med=0s      max=314.91ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=74.12ms  min=5.56ms  med=41.62ms max=465.32ms p(90)=166.43ms p(95)=188.07ms
     http_reqs......................: 22920   569.898359/s
     iteration_duration.............: avg=152.26ms min=19.82ms med=80.25ms max=729.67ms p(90)=327.5ms  p(95)=364.1ms
     iterations.....................: 11460   284.94918/s
     vus............................: 92      min=2        max=92
     vus_max........................: 92      min=92       max=92

ERRO[0041] some thresholds have failed

```

해당 트래픽이 목표로한 0.1s 안에 http_req_duration이 들어오지 못했습니다.