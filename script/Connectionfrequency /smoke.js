import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

    vus: 1, // 1 user looping for 1 minute
    duration: '100s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};
// 테스트 하고자 하는 계정을 미리 등록시켜 놓는다
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
 *      checks.........................: 100.00% ✓ 188 ✗ 0
 data_received..................: 42 kB   419 B/s
 data_sent......................: 42 kB   417 B/s
 http_req_blocked...............: avg=1.9ms    min=1µs     med=4µs     max=309.52ms p(90)=8µs     p(95)=8µs
 http_req_connecting............: avg=1.9ms    min=0s      med=0s      max=309.48ms p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=33.85ms  min=20.76ms med=28.34ms max=148.9ms  p(90)=47.19ms p(95)=73.56ms
 { expected_response:true }...: avg=33.85ms  min=20.76ms med=28.34ms max=148.9ms  p(90)=47.19ms p(95)=73.56ms
 http_req_failed................: 0.00%   ✓ 0   ✗ 188
 http_req_receiving.............: avg=259.01µs min=39µs    med=64.5µs  max=5.94ms   p(90)=673.8µs p(95)=1.02ms
 http_req_sending...............: avg=28.34µs  min=11µs    med=22µs    max=112µs    p(90)=46µs    p(95)=50µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=33.56ms  min=20.64ms med=27.93ms max=148.67ms p(90)=47.11ms p(95)=73.48ms
 http_reqs......................: 188     1.861869/s
 iteration_duration.............: avg=1.07s    min=1.04s   med=1.05s   max=1.58s    p(90)=1.1s    p(95)=1.14s
 iterations.....................: 94      0.930934/s
 vus............................: 1       min=1 max=1
 vus_max........................: 1       min=1 max=1
 */