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


const BASE_URL = 'https://infra-subway.kro.kr';
const USERNAME = 'qa@qa.com';
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
}

/*
running (1m27.9s), 0000/1100 VUs, 35579 complete and 0 interrupted iterations
default ✓ [======================================] 0000/1100 VUs  1m27s

     ✗ logged in successfully
      ↳  39% — ✓ 13917 / ✗ 21662
     ✓ retrieved member

     checks.........................: 55.06% ✓ 26544      ✗ 21662
     data_received..................: 97 MB  1.1 MB/s
     data_sent......................: 18 MB  202 kB/s
     http_req_blocked...............: avg=442.04ms min=0s       med=5.59µs   max=2.59s    p(90)=1.43s    p(95)=1.7s
     http_req_connecting............: avg=179.71ms min=0s       med=126.79ms max=1.78s    p(90)=479.72ms p(95)=600.15ms
   ✓ http_req_duration..............: avg=127.24ms min=0s       med=13.82ms  max=2.27s    p(90)=419.08ms p(95)=591.53ms
       { expected_response:true }...: avg=191.94ms min=3.24ms   med=79.06ms  max=2.07s    p(90)=523.62ms p(95)=689.26ms
     http_req_failed................: 46.37% ✓ 22952      ✗ 26544
     http_req_receiving.............: avg=4.08ms   min=0s       med=28.45µs  max=511.15ms p(90)=136.63µs p(95)=12.68ms
     http_req_sending...............: avg=19.24ms  min=0s       med=16.59µs  max=1.82s    p(90)=62.97ms  p(95)=107.19ms
     http_req_tls_handshaking.......: avg=350.47ms min=0s       med=0s       max=2.24s    p(90)=1.19s    p(95)=1.38s
     http_req_waiting...............: avg=103.91ms min=0s       med=5.23ms   max=2.25s    p(90)=365.52ms p(95)=507.8ms
     http_reqs......................: 49496  563.271168/s
     iteration_duration.............: avg=1.43s    min=179.13µs med=1.21s    max=5.38s    p(90)=2.66s    p(95)=3.17s
     iterations.....................: 35579  404.893827/s
     vus............................: 57     min=50       max=1100
     vus_max........................: 1100   min=1100     max=1100

     */
