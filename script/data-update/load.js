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
running (1m41.0s), 000/300 VUs, 26988 complete and 0 interrupted iterations
default ✓ [======================================] 300 VUs  1m40s

     ✗ logged in successfully
      ↳  99% — ✓ 26975 / ✗ 13
     ✓ updated in successfully

     checks.........................: 99.97% ✓ 53950      ✗ 13
     data_received..................: 18 MB  174 kB/s
     data_sent......................: 16 MB  162 kB/s
     http_req_blocked...............: avg=3.2ms    min=3.19µs  med=4.95µs  max=1.2s     p(90)=7.98µs   p(95)=29.68µs
     http_req_connecting............: avg=273.09µs min=0s      med=0s      max=87.07ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=50.44ms  min=3.21ms  med=19.63ms max=1.17s    p(90)=114.46ms p(95)=238.07ms
       { expected_response:true }...: avg=50.43ms  min=3.21ms  med=19.62ms max=1.17s    p(90)=114.43ms p(95)=238.09ms
     http_req_failed................: 0.02%  ✓ 13         ✗ 53950
     http_req_receiving.............: avg=519.3µs  min=0s      med=35.14µs max=254.02ms p(90)=284.1µs  p(95)=1.02ms
     http_req_sending...............: avg=1.27ms   min=11.07µs med=18.52µs max=287.88ms p(90)=419.1µs  p(95)=2.43ms
     http_req_tls_handshaking.......: avg=2.68ms   min=0s      med=0s      max=1.11s    p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=48.64ms  min=3.14ms  med=18.89ms max=1.17s    p(90)=109.82ms p(95)=228.7ms
     http_reqs......................: 53963  534.215505/s
     iteration_duration.............: avg=1.11s    min=43.3ms  med=1.04s   max=2.66s    p(90)=1.26s    p(95)=1.55s
     iterations.....................: 26988  267.1721/s
     vus............................: 5      min=5        max=300
     vus_max........................: 300    min=300      max=300

     */
