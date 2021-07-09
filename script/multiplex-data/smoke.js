import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
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
     script: smoke-multiplex.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 2m10s max duration (incl. graceful stop):
           * default: 1 looping VUs for 1m40s (gracefulStop: 30s)


running (1m40.9s), 0/1 VUs, 91 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  1m40s

     ✓ find path in successfully

     checks.........................: 100.00% ✓ 91       ✗ 0
     data_received..................: 164 kB  1.6 kB/s
     data_sent......................: 16 kB   157 B/s
     http_req_blocked...............: avg=371.68µs min=6.89µs  med=7.99µs   max=33.08ms  p(90)=8.8µs    p(95)=9.53µs
     http_req_connecting............: avg=5.01µs   min=0s      med=0s       max=456.66µs p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=107.13ms min=97.04ms med=103.01ms max=253.25ms p(90)=115.29ms p(95)=125.61ms
       { expected_response:true }...: avg=107.13ms min=97.04ms med=103.01ms max=253.25ms p(90)=115.29ms p(95)=125.61ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 91
     http_req_receiving.............: avg=108.07µs min=71.24µs med=99.88µs  max=370.3µs  p(90)=136.8µs  p(95)=146.12µs
     http_req_sending...............: avg=30.22µs  min=22.47µs med=26.91µs  max=93.82µs  p(90)=37.77µs  p(95)=41.51µs
     http_req_tls_handshaking.......: avg=297.81µs min=0s      med=0s       max=27.1ms   p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=106.99ms min=96.88ms med=102.84ms max=253.03ms p(90)=115.18ms p(95)=125.47ms
     http_reqs......................: 91      0.902084/s
     iteration_duration.............: avg=1.1s     min=1.09s   med=1.1s     max=1.28s    p(90)=1.11s    p(95)=1.12s
     iterations.....................: 91      0.902084/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

     */
