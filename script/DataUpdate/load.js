import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

    vus: 300, // 1 user looping for 1 minute
    duration: '100s',

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


 running (1m41.0s), 000/300 VUs, 23631 complete and 0 interrupted iterations
 default ✓ [======================================] 300 VUs  1m40s

 ✓ created in successfully

 checks.........................: 100.00% ✓ 23631 ✗ 0
 data_received..................: 2.3 MB  23 kB/s
 data_sent......................: 4.7 MB  46 kB/s
 http_req_blocked...............: avg=4.9ms    min=1µs     med=3µs     max=19.18s p(90)=5µs     p(95)=7µs
 http_req_connecting............: avg=4.89ms   min=0s      med=0s      max=19.18s p(90)=0s      p(95)=0s
 ✗ http_req_duration..............: avg=270.8ms  min=17.06ms med=28.22ms max=25.22s p(90)=42.16ms p(95)=69.04ms
 { expected_response:true }...: avg=270.8ms  min=17.06ms med=28.22ms max=25.22s p(90)=42.16ms p(95)=69.04ms
 http_req_failed................: 0.00%   ✓ 0     ✗ 23631
 http_req_receiving.............: avg=30.5µs   min=8µs     med=27µs    max=598µs  p(90)=48µs    p(95)=56µs
 http_req_sending...............: avg=20.76µs  min=6µs     med=18µs    max=1.19ms p(90)=29µs    p(95)=36µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=270.75ms min=17ms    med=28.17ms max=25.22s p(90)=42.09ms p(95)=69ms
 http_reqs......................: 23631   233.907309/s
 iteration_duration.............: avg=1.27s    min=1.01s   med=1.02s   max=26.22s p(90)=1.04s   p(95)=1.07s
 iterations.....................: 23631   233.907309/s
 vus............................: 7       min=7   max=300
 vus_max........................: 300     min=300 max=300

 ERRO[0102] some thresholds have failed
 */