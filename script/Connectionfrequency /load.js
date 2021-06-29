import http from 'k6/http';
import {check, sleep} from 'k6';


export let options = {

    vus: 300,
    duration: '100s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};
// 테스트 하고자 하는 계정을 미리 등록시켜 놓는다
const BASE_URL = 'http://13.124.137.208:8080';
const USERNAME = 'abc@naver.com';
const PASSWORD = '1234';

export default function () {

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
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
};

/**
 *
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


 running (1m41.6s), 000/300 VUs, 26672 complete and 0 interrupted iterations
 default ✓ [======================================] 300 VUs  1m40s

 ✓ logged in successfully
 ✓ retrieved member

 checks.....................: 100.00% ✓ 53344 ✗ 0
 data_received..............: 14 MB   134 kB/s
 data_sent..................: 8.6 MB  84 kB/s
 http_req_blocked...........: avg=21.12ms  min=1µs     med=19.33ms max=2.44s    p(90)=39.87ms p(95)=49.03ms
 http_req_connecting........: avg=21.1ms   min=0s      med=19.28ms max=2.44s    p(90)=39.82ms p(95)=48.99ms
 ✓ http_req_duration..........: avg=43.93ms  min=15.99ms med=34.89ms max=921.36ms p(90)=63.09ms p(95)=79.85ms
 http_req_failed............: 100.00% ✓ 53344 ✗ 0
 http_req_receiving.........: avg=245.75µs min=13µs    med=45µs    max=285.23ms p(90)=117µs   p(95)=429µs
 http_req_sending...........: avg=37.54µs  min=6µs     med=31µs    max=1.12ms   p(90)=72µs    p(95)=89µs
 http_req_tls_handshaking...: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...........: avg=43.65ms  min=15.92ms med=34.7ms  max=921.25ms p(90)=62.75ms p(95)=79.26ms
 http_reqs..................: 53344   524.825576/s
 iteration_duration.........: avg=1.13s    min=1.06s   med=1.1s    max=3.53s    p(90)=1.17s   p(95)=1.21s
 iterations.................: 26672   262.412788/s
 vus........................: 28      min=28  max=300
 vus_max....................: 300     min=300 max=300

 */