# 데이터를 조회하는데 여러 데이터를 참조하는 페이지 Load Test
## 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 5},
        {duration: '35s', target: 10},
        {duration: '5s', target: 0},
    ],
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
     script: multi-select-load.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 10 looping VUs for 1m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.1s), 00/10 VUs, 3661 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  1m0s

     ✓ find stations
     ✓ find path

     checks.........................: 100.00% ✓ 7322       ✗ 0
     data_received..................: 266 MB  4.4 MB/s
     data_sent......................: 997 kB  17 kB/s
     http_req_blocked...............: avg=20.89µs min=3.31µs  med=4.75µs   max=33.95ms  p(90)=5.72µs   p(95)=6.17µs
     http_req_connecting............: avg=2.23µs  min=0s      med=0s       max=1.58ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=43.93ms min=17.24ms med=50.03ms  max=126.59ms p(90)=74.2ms   p(95)=79.48ms
       { expected_response:true }...: avg=43.93ms min=17.24ms med=50.03ms  max=126.59ms p(90)=74.2ms   p(95)=79.48ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7322
     http_req_receiving.............: avg=1.47ms  min=28.48µs med=579.71µs max=21.53ms  p(90)=3.06ms   p(95)=3.92ms
     http_req_sending...............: avg=18.89µs min=10.5µs  med=15.42µs  max=3.87ms   p(90)=23.76µs  p(95)=26.61µs
     http_req_tls_handshaking.......: avg=13.22µs min=0s      med=0s       max=30.97ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=42.44ms min=14.81ms med=47.01ms  max=126.51ms p(90)=74.12ms  p(95)=79.4ms
     http_reqs......................: 7322    121.915312/s
     iteration_duration.............: avg=88.19ms min=68.08ms med=87.23ms  max=149.26ms p(90)=103.44ms p(95)=108.48ms
     iterations.....................: 3661    60.957656/s
     vus............................: 1       min=1        max=10
     vus_max........................: 10      min=10       max=10
```

