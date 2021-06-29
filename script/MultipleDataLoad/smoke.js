import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '100s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://13.124.137.208:8080';

export default function () {

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathRes = http.get(`${BASE_URL}/paths?source=1&target=3`, params);

    check(pathRes, {
        'find path in successfully': (resp) => resp.status == 200,
        'distance': (resp) => resp.json('distance') == 1000,
    });
    sleep(1);
};

/**
 * k6 run smoke.js

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: smoke.js
 output: -

 scenarios: (100.00%) 1 scenario, 1 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 1 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m40.5s), 0/1 VUs, 97 complete and 0 interrupted iterations
 default ✓ [======================================] 1 VUs  1m40s

 ✓ find path in successfully
 ✓ distance

 checks.........................: 100.00% ✓ 194 ✗ 0
 data_received..................: 49 kB   483 B/s
 data_sent......................: 14 kB   135 B/s
 http_req_blocked...............: avg=172.47µs min=2µs     med=5µs     max=16.26ms p(90)=7µs     p(95)=8µs
 http_req_connecting............: avg=166.51µs min=0s      med=0s      max=16.15ms p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=32.9ms   min=22.41ms med=32.58ms max=60.87ms p(90)=37.65ms p(95)=40.16ms
 { expected_response:true }...: avg=32.9ms   min=22.41ms med=32.58ms max=60.87ms p(90)=37.65ms p(95)=40.16ms
 http_req_failed................: 0.00%   ✓ 0   ✗ 97
 http_req_receiving.............: avg=297.02µs min=36µs    med=62µs    max=8.4ms   p(90)=291.6µs p(95)=1.57ms
 http_req_sending...............: avg=27.4µs   min=14µs    med=25µs    max=165µs   p(90)=39µs    p(95)=41.59µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=32.58ms  min=22.32ms med=32.26ms max=60.8ms  p(90)=37.21ms p(95)=40.01ms
 http_reqs......................: 97      0.965366/s
 iteration_duration.............: avg=1.03s    min=1.02s   med=1.03s   max=1.06s   p(90)=1.04s   p(95)=1.04s
 iterations.....................: 97      0.965366/s
 vus............................: 1       min=1 max=1
 vus_max........................: 1       min=1 max=1

 */