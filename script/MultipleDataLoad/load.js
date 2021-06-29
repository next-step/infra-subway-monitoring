import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 300, // 1 user looping for 1 minute
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
 * ↳ k6 run load.js

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: load.js
 output: -

 scenarios: (100.00%) 1 scenario, 300 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 300 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m41.0s), 000/300 VUs, 27075 complete and 0 interrupted iterations
 default ✓ [======================================] 300 VUs  1m40s

 ✓ find path in successfully
 ✓ distance

 checks.........................: 100.00% ✓ 54150 ✗ 0
 data_received..................: 14 MB   134 kB/s
 data_sent......................: 3.8 MB  38 kB/s
 http_req_blocked...............: avg=1.26ms   min=1µs     med=3µs     max=403.05ms p(90)=5µs     p(95)=6µs
 http_req_connecting............: avg=1.25ms   min=0s      med=0s      max=402.97ms p(90)=0s      p(95)=0s
 ✗ http_req_duration..............: avg=111.01ms min=18.55ms med=33.07ms max=9.88s    p(90)=74.01ms p(95)=209.35ms
 { expected_response:true }...: avg=111.01ms min=18.55ms med=33.07ms max=9.88s    p(90)=74.01ms p(95)=209.35ms
 http_req_failed................: 0.00%   ✓ 0     ✗ 27075
 http_req_receiving.............: avg=762.36µs min=12µs    med=34µs    max=9.66s    p(90)=87µs    p(95)=543µs
 http_req_sending...............: avg=15.97µs  min=5µs     med=13µs    max=738µs    p(90)=23µs    p(95)=29µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=110.23ms min=18.08ms med=32.88ms max=9.59s    p(90)=73.51ms p(95)=205.59ms
 http_reqs......................: 27075   267.974598/s
 iteration_duration.............: avg=1.11s    min=1.01s   med=1.03s   max=10.89s   p(90)=1.07s   p(95)=1.21s
 iterations.....................: 27075   267.974598/s
 vus............................: 17      min=17  max=300
 vus_max........................: 300     min=300 max=300

 ERRO[0102] some thresholds have failed
 */