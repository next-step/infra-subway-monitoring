# 데이터를 조회하는데 여러 데이터를 참조하는 페이지 Smoke Test
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

function 경로_검색(source, target) {
    let pathRes = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);
    check(pathRes, {'find path': (res) => res.status === 200});
}

function 지하철_조회() {
    let stationsRes = http.get(`${BASE_URL}/stations`);
    check(stationsRes, {'find stations': (res) => res.status === 200});
}

export default function ()  {
    지하철_조회();
    경로_검색(103, 102);
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
script: multi-select-smoke.js
output: -

scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 0/1 VUs, 128 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ find stations
     ✓ find path

     checks.........................: 100.00% ✓ 256       ✗ 0
     data_received..................: 9.3 MB  929 kB/s
     data_sent......................: 35 kB   3.5 kB/s
     http_req_blocked...............: avg=155.76µs min=4.58µs  med=5.72µs   max=38.36ms  p(90)=6.38µs  p(95)=7.95µs
     http_req_connecting............: avg=9.16µs   min=0s      med=0s       max=2.34ms   p(90)=0s      p(95)=0s
✓ http_req_duration..............: avg=38.73ms  min=17.87ms med=41.67ms  max=279.29ms p(90)=57.98ms p(95)=63.36ms
{ expected_response:true }...: avg=38.73ms  min=17.87ms med=41.67ms  max=279.29ms p(90)=57.98ms p(95)=63.36ms
http_req_failed................: 0.00%   ✓ 0         ✗ 256
http_req_receiving.............: avg=1.22ms   min=78.97µs med=732.04µs max=7ms      p(90)=2.43ms  p(95)=2.65ms
http_req_sending...............: avg=20.12µs  min=15.92µs med=18.47µs  max=79.61µs  p(90)=26.53µs p(95)=29.63µs
http_req_tls_handshaking.......: avg=135.6µs  min=0s      med=0s       max=34.71ms  p(90)=0s      p(95)=0s
http_req_waiting...............: avg=37.48ms  min=15.75ms med=38.21ms  max=279.15ms p(90)=57.86ms p(95)=63.24ms
http_reqs......................: 256     25.582461/s
iteration_duration.............: avg=78.14ms  min=70.53ms med=73.79ms  max=343.18ms p(90)=84.98ms p(95)=89.39ms
iterations.....................: 128     12.791231/s
vus............................: 1       min=1       max=1
vus_max........................: 1       min=1       max=1
```