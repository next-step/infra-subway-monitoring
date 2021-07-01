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


const BASE_URL = 'http://13.124.137.208:8080';
const USERNAME = 'abc@naver.com';
const PASSWORD = '1234';

export default function ()  {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
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


 running (1m57.0s), 0000/1100 VUs, 957 complete and 856 interrupted iterations
 default ✓ [======================================] 0000/1100 VUs  1m27s

 ✓ logged in successfully
 ✓ retrieved member

 checks.........................: 100.00% ✓ 2564   ✗ 0
 data_received..................: 617 kB  5.3 kB/s
 data_sent......................: 761 kB  6.5 kB/s
 http_req_blocked...............: avg=11.98ms  min=1µs      med=5µs    max=1.11s   p(90)=22.53ms p(95)=25.56ms
 http_req_connecting............: avg=11.95ms  min=0s       med=0s     max=1.11s   p(90)=22.46ms p(95)=25.47ms
 ✗ http_req_duration..............: avg=22.29s   min=180.43ms med=21.75s max=55.27s  p(90)=39s     p(95)=42.63s
 { expected_response:true }...: avg=22.21s   min=180.43ms med=21.69s max=55.27s  p(90)=38.97s  p(95)=42.58s
 http_req_failed................: 0.27%   ✓ 7      ✗ 2557
 http_req_receiving.............: avg=295.09µs min=22µs     med=66µs   max=280.3ms p(90)=270.7µs p(95)=673.54µs
 http_req_sending...............: avg=50.85µs  min=7µs      med=32µs   max=277µs   p(90)=106.7µs p(95)=126µs
 http_req_tls_handshaking.......: avg=0s       min=0s       med=0s     max=0s      p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=22.29s   min=180.23ms med=21.75s max=55.27s  p(90)=39s     p(95)=42.63s
 http_reqs......................: 2564    21.913086/s
 iteration_duration.............: avg=36.7s    min=1.64s    med=35.75s max=1m20s   p(90)=1m4s    p(95)=1m8s
 iterations.....................: 957     8.178948/s
 vus............................: 1       min=1    max=1100
 vus_max........................: 1100    min=1100 max=1100

 */