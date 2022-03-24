# Stress test script
```
import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "10s", target: 200},
        {duration: "10s", target: 300},
        {duration: "10s", target: 400},
        {duration: "10s", target: 500},
        {duration: "10s", target: 600},
        {duration: "10s", target: 700},
        {duration: "10s", target: 800},
        {duration: "10s", target: 900},
    ],
    thresholds: {
        http_req_duration: ["p(99)<1000"], // 99% of requests must complete below 0.1s
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
# Stress test 결과
```
WARN[0081] Request Failed                                error="Post \"https://minjoonlee.kro.kr/login/token\": EOF"
ERRO[0082] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/script/stress.js:39:48(4))
at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
at 로그인 (file:///home/ubuntu/script/stress.js:38:24(25))
at file:///home/ubuntu/script/stress.js:55:16(17)
at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0081] Request Failed                                error="Post \"https://minjoonlee.kro.kr/login/token\": EOF"
ERRO[0082] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/script/stress.js:39:48(4))
at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
at 로그인 (file:///home/ubuntu/script/stress.js:38:24(25))
at file:///home/ubuntu/script/stress.js:55:16(17)
at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0081] Request Failed                                error="Post \"https://minjoonlee.kro.kr/login/token\": EOF"
ERRO[0082] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/script/stress.js:39:48(4))
at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
at 로그인 (file:///home/ubuntu/script/stress.js:38:24(25))
at file:///home/ubuntu/script/stress.js:55:16(17)
at native  executor=ramping-vus scenario=default source=stacktrace

running (1m21.5s), 000/900 VUs, 24902 complete and 0 interrupted iterations
default ✗ [======================================] 000/900 VUs  1m20s

     ✗ logged in successfully
      ↳  69% — ✓ 17322 / ✗ 7580
     ✓ get favorites successfully

     checks.........................: 81.40% ✓ 33176      ✗ 7580
     data_received..................: 65 MB  797 kB/s
     data_sent......................: 14 MB  175 kB/s
     http_req_blocked...............: avg=295.77ms min=0s      med=3.95µs   max=3.06s  p(90)=1.23s    p(95)=1.41s
     http_req_connecting............: avg=94.42ms  min=0s      med=0s       max=1.2s   p(90)=347.24ms p(95)=411.49ms
✗ http_req_duration..............: avg=408.43ms min=0s      med=413.54ms max=4.4s   p(90)=732.69ms p(95)=853.15ms
{ expected_response:true }...: avg=482.2ms  min=5.99ms  med=469.28ms max=4.4s   p(90)=758.18ms p(95)=876.28ms
http_req_failed................: 21.42% ✓ 9048       ✗ 33176
http_req_receiving.............: avg=11.46ms  min=0s      med=43.47µs  max=1.04s  p(90)=8.85ms   p(95)=80.7ms
http_req_sending...............: avg=30.38ms  min=0s      med=20.91µs  max=3.96s  p(90)=76.34ms  p(95)=147.87ms
http_req_tls_handshaking.......: avg=213.11ms min=0s      med=0s       max=2.72s  p(90)=904.25ms p(95)=1.11s
http_req_waiting...............: avg=366.58ms min=0s      med=391.65ms max=2.92s  p(90)=666.52ms p(95)=750.08ms
http_reqs......................: 42224  518.243689/s
iteration_duration.............: avg=1.53s    min=22.44ms med=1.16s    max=11.27s p(90)=2.89s    p(95)=3.78s
iterations.....................: 24902  305.639076/s
vus............................: 520    min=21       max=890
vus_max........................: 900    min=900      max=900
```

견딜 수 있는 최대 부하를 확인하기 위해서 200부터 100단위로 900까지 Vuser를 생성했습니다. 성능을 테스트하기 위함은 아니므로
http_req_duration는 1초로 잡아준 뒤 테스트했습니다.

**login 서비스가 Vuser가 200명 부터 터지는것을 확인할 수 있었습니다.** 