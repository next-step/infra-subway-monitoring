import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

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

let i = 0;
const BASE_URL = 'http://13.124.137.208:8080';
const USERNAME = 'zxc@naver.com' + i++;
const PASSWORD = 'zxc' + i++;

export default function ()  {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/members`, payload, params);

    check(loginRes, {
        'created in successfully': (resp) => resp.status == 201,
    });
    sleep(1);
};

/**
 *
 ↳ k6 run stress.js

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


 running (1m28.0s), 0000/1100 VUs, 48335 complete and 0 interrupted iterations
 default ✓ [======================================] 0000/1100 VUs  1m27s

 ✓ created in successfully

 checks.........................: 100.00% ✓ 48335  ✗ 0
 data_received..................: 4.8 MB  55 kB/s
 data_sent......................: 9.6 MB  109 kB/s
 http_req_blocked...............: avg=867.26µs min=1µs     med=3µs     max=1.45s  p(90)=5µs     p(95)=6µs
 http_req_connecting............: avg=862.98µs min=0s      med=0s      max=1.45s  p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=57.5ms   min=17.39ms med=30.91ms max=6.58s  p(90)=44.89ms p(95)=54.25ms
 { expected_response:true }...: avg=57.5ms   min=17.39ms med=30.91ms max=6.58s  p(90)=44.89ms p(95)=54.25ms
 http_req_failed................: 0.00%   ✓ 0      ✗ 48335
 http_req_receiving.............: avg=25.54µs  min=10µs    med=22µs    max=1.28ms p(90)=39µs    p(95)=47µs
 http_req_sending...............: avg=17.07µs  min=6µs     med=14µs    max=629µs  p(90)=25µs    p(95)=33µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=57.46ms  min=17.35ms med=30.87ms max=6.58s  p(90)=44.85ms p(95)=54.21ms
 http_reqs......................: 48335   549.509261/s
 iteration_duration.............: avg=1.05s    min=1.01s   med=1.03s   max=7.91s  p(90)=1.04s   p(95)=1.05s
 iterations.....................: 48335   549.509261/s
 vus............................: 57      min=50   max=1100
 vus_max........................: 1100    min=1100 max=1100

 */