import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '2s', target: 100 },
        { duration: '5s', target: 100 },
        { duration: '2s', target: 200 },
        { duration: '5s', target: 200 },
        { duration: '2s', target: 300 },
        { duration: '5s', target: 300 },
        { duration: '2s', target: 400 },
        { duration: '5s', target: 400 },
        { duration: '2s', target: 500 },
        { duration: '5s', target: 500 },
        { duration: '2s', target: 600 },
        { duration: '5s', target: 600 },
        { duration: '2s', target: 700 },
        { duration: '5s', target: 700 },
        { duration: '2s', target: 800 },
        { duration: '5s', target: 800 },
        { duration: '2s', target: 900 },
        { duration: '5s', target: 900 },
        { duration: '2s', target: 1000 },
        { duration: '5s', target: 1000 },
        { duration: '2s', target: 1100 },
        { duration: '5s', target: 1100 },
        { duration: '10s', target: 0 },
    ],
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
 * ↳ k6 run stress.js

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: stress.js
 output: -

 scenarios: (100.00%) 1 scenario, 1100 max VUs, 1m57s max duration (incl. graceful stop):
 * default: Up to 1100 looping VUs for 1m27s over 23 stages (gracefulRampDown: 30s, gracefulStop: 30s)


 running (1m27.9s), 0000/1100 VUs, 49151 complete and 0 interrupted iterations
 default ✓ [======================================] 0000/1100 VUs  1m27s

 ✓ find path in successfully
 ✓ distance

 checks.........................: 100.00% ✓ 98302  ✗ 0
 data_received..................: 25 MB   280 kB/s
 data_sent......................: 6.9 MB  78 kB/s
 http_req_blocked...............: avg=692.8µs  min=1µs     med=3µs     max=1.31s    p(90)=5µs     p(95)=6µs
 http_req_connecting............: avg=688.46µs min=0s      med=0s      max=1.31s    p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=39.96ms  min=17.67ms med=34.71ms max=646.45ms p(90)=60.03ms p(95)=74.1ms
 { expected_response:true }...: avg=39.96ms  min=17.67ms med=34.71ms max=646.45ms p(90)=60.03ms p(95)=74.1ms
 http_req_failed................: 0.00%   ✓ 0      ✗ 49151
 http_req_receiving.............: avg=321.87µs min=11µs    med=32µs    max=485.69ms p(90)=91µs    p(95)=646.5µs
 http_req_sending...............: avg=14.61µs  min=5µs     med=12µs    max=343µs    p(90)=21µs    p(95)=28µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=39.62ms  min=17.61ms med=34.55ms max=646.42ms p(90)=59.66ms p(95)=73.65ms
 http_reqs......................: 49151   559.045688/s
 iteration_duration.............: avg=1.04s    min=1.01s   med=1.03s   max=2.36s    p(90)=1.06s   p(95)=1.07s
 iterations.....................: 49151   559.045688/s
 vus............................: 51      min=50   max=1100
 vus_max........................: 1100    min=1100 max=1100

 */