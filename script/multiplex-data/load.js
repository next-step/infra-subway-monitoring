import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 250, // 1 user looping for 1 minute
    duration: '100s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra-subway.kro.kr';

export default function () {

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathRes = http.get(`${BASE_URL}/paths?source=1&target=16`, params);

    check(pathRes, {
        'find path in successfully': (resp) => resp.status == 200
    });
    sleep(1);
};

/*
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load-multiplex.js
     output: -

  scenarios: (100.00%) 1 scenario, 1000 max VUs, 2m10s max duration (incl. graceful stop):
           * default: 1000 looping VUs for 1m40s (gracefulStop: 30s)


running (1m48.1s), 0000/1000 VUs, 12549 complete and 0 interrupted iterations
default ✓ [======================================] 1000 VUs  1m40s

     ✓ find path in successfully

     checks.........................: 100.00% ✓ 12549     ✗ 0
     data_received..................: 43 MB   395 kB/s
     data_sent......................: 2.5 MB  23 kB/s
     http_req_blocked...............: avg=130.61ms min=3.62µs   med=6.4µs   max=2.82s    p(90)=20.94µs p(95)=1.25s
     http_req_connecting............: avg=31.75ms  min=0s       med=0s      max=2.23s    p(90)=0s      p(95)=80.32ms
   ✗ http_req_duration..............: avg=7.15s    min=902.8ms  med=7.35s   max=10.76s   p(90)=7.52s   p(95)=7.57s
       { expected_response:true }...: avg=7.15s    min=902.8ms  med=7.35s   max=10.76s   p(90)=7.52s   p(95)=7.57s
     http_req_failed................: 0.00%   ✓ 0         ✗ 12549
     http_req_receiving.............: avg=100.06µs min=25.59µs  med=60.99µs max=95.04ms  p(90)=96.12µs p(95)=150.06µs
     http_req_sending...............: avg=7.1ms    min=10.62µs  med=19.98µs max=760.19ms p(90)=74.62µs p(95)=36.92ms
     http_req_tls_handshaking.......: avg=91.98ms  min=0s       med=0s      max=2.39s    p(90)=0s      p(95)=818.86ms
     http_req_waiting...............: avg=7.14s    min=874.73ms med=7.35s   max=10.76s   p(90)=7.52s   p(95)=7.57s
     http_reqs......................: 12549   116.11129/s
     iteration_duration.............: avg=8.28s    min=2.77s    med=8.36s   max=11.76s   p(90)=8.55s   p(95)=8.6s
     iterations.....................: 12549   116.11129/s
     vus............................: 14      min=14      max=1000
     vus_max........................: 1000    min=1000    max=1000

*/
