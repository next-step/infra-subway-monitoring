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

  var updatePayload = JSON.stringify({
      email: USERNAME,
      password: PASSWORD,
      age: i++
    });

  let authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  let updateRes = http.put(`${BASE_URL}/members/me`, updatePayload, authHeaders);
  check(updateRes, {
          'updated in successfully': (resp) => resp.status == 200,
      });
  sleep(1);
};

/*
running (1m27.9s), 0000/1100 VUs, 35862 complete and 0 interrupted iterations
default ✓ [======================================] 0000/1100 VUs  1m27s

     ✗ logged in successfully
      ↳  40% — ✓ 14397 / ✗ 21465
     ✗ updated in successfully
      ↳  87% — ✓ 12588 / ✗ 1809

     checks.........................: 53.69% ✓ 26985      ✗ 23274
     data_received..................: 91 MB  1.0 MB/s
     data_sent......................: 19 MB  220 kB/s
     http_req_blocked...............: avg=391.34ms min=0s       med=5.38µs   max=2.51s    p(90)=1.33s    p(95)=1.62s
     http_req_connecting............: avg=174.52ms min=0s       med=134.24ms max=1.74s    p(90)=426.35ms p(95)=513.64ms
   ✓ http_req_duration..............: avg=129.72ms min=0s       med=17.37ms  max=1.37s    p(90)=447.39ms p(95)=590.69ms
       { expected_response:true }...: avg=198.49ms min=3.21ms   med=75.75ms  max=1.37s    p(90)=551.19ms p(95)=680.3ms
     http_req_failed................: 46.30% ✓ 23274      ✗ 26985
     http_req_receiving.............: avg=4.53ms   min=0s       med=22.29µs  max=634.68ms p(90)=145.71µs p(95)=20.46ms
     http_req_sending...............: avg=14.73ms  min=0s       med=18.29µs  max=670.89ms p(90)=50.94ms  p(95)=89.58ms
     http_req_tls_handshaking.......: avg=311.33ms min=0s       med=0s       max=2.4s     p(90)=1.06s    p(95)=1.35s
     http_req_waiting...............: avg=110.44ms min=0s       med=7.37ms   max=1.17s    p(90)=406.8ms  p(95)=512.55ms
     http_reqs......................: 50259  571.586765/s
     iteration_duration.............: avg=1.42s    min=177.29µs med=1.15s    max=6.63s    p(90)=2.74s    p(95)=3.25s
     iterations.....................: 35862  407.852217/s
     vus............................: 52     min=50       max=1100
     vus_max........................: 1100   min=1100     max=1100

     */
