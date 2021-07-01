import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 250, // 1 user looping for 1 minute
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
running (1m41.0s), 000/250 VUs, 23664 complete and 0 interrupted iterations
default ✓ [======================================] 250 VUs  1m40s

     ✗ logged in successfully
      ↳  99% — ✓ 23513 / ✗ 151
     ✗ updated in successfully
      ↳  99% — ✓ 23504 / ✗ 9

     checks.........................: 99.66% ✓ 47017      ✗ 160
     data_received..................: 15 MB  152 kB/s
     data_sent......................: 14 MB  142 kB/s
     http_req_blocked...............: avg=2.37ms   min=0s     med=5µs     max=503.09ms p(90)=8.07µs   p(95)=27.61µs
     http_req_connecting............: avg=302.54µs min=0s     med=0s      max=91.96ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=28.67ms  min=0s     med=11.7ms  max=786.31ms p(90)=71.8ms   p(95)=110.8ms
       { expected_response:true }...: avg=28.77ms  min=3.15ms med=11.76ms max=786.31ms p(90)=72.01ms  p(95)=110.93ms
     http_req_failed................: 0.33%  ✓ 160        ✗ 47017
     http_req_receiving.............: avg=317.48µs min=0s     med=36.95µs max=113.6ms  p(90)=215.22µs p(95)=773.36µs
     http_req_sending...............: avg=633.27µs min=0s     med=18.96µs max=152.01ms p(90)=266.16µs p(95)=1.43ms
     http_req_tls_handshaking.......: avg=1.87ms   min=0s     med=0s      max=444.4ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=27.72ms  min=0s     med=11.28ms max=784.06ms p(90)=69.14ms  p(95)=106.16ms
     http_reqs......................: 47177  467.244292/s
     iteration_duration.............: avg=1.06s    min=1.78ms med=1.02s   max=2.3s     p(90)=1.16s    p(95)=1.22s
     iterations.....................: 23664  234.369903/s
     vus............................: 250    min=250      max=250
     vus_max........................: 250    min=250      max=250

     */
