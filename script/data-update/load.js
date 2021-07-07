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
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load-update.js
     output: -

  scenarios: (100.00%) 1 scenario, 250 max VUs, 2m10s max duration (incl. graceful stop):
           * default: 250 looping VUs for 1m40s (gracefulStop: 30s)


running (1m41.0s), 000/250 VUs, 23650 complete and 0 interrupted iterations
default ✓ [======================================] 250 VUs  1m40s

     ✓ logged in successfully
     ✓ updated in successfully

     checks.........................: 100.00% ✓ 47300      ✗ 0
     data_received..................: 15 MB   150 kB/s
     data_sent......................: 14 MB   142 kB/s
     http_req_blocked...............: avg=1.95ms   min=2.98µs  med=4.92µs  max=555.68ms p(90)=7.59µs   p(95)=18.17µs
     http_req_connecting............: avg=192.46µs min=0s      med=0s      max=88.9ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=26.92ms  min=3.34ms  med=12.49ms max=1.32s    p(90)=47.4ms   p(95)=74.62ms
       { expected_response:true }...: avg=26.92ms  min=3.34ms  med=12.49ms max=1.32s    p(90)=47.4ms   p(95)=74.62ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 47300
     http_req_receiving.............: avg=253.75µs min=14.21µs med=36.94µs max=149.86ms p(90)=180.03µs p(95)=693.13µs
     http_req_sending...............: avg=418.14µs min=10.83µs med=18.55µs max=108.07ms p(90)=167.18µs p(95)=872.01µs
     http_req_tls_handshaking.......: avg=1.57ms   min=0s      med=0s      max=474.36ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=26.24ms  min=3.26ms  med=12.12ms max=1.32s    p(90)=45.93ms  p(95)=72.3ms
     http_reqs......................: 47300   468.22537/s
     iteration_duration.............: avg=1.06s    min=1s      med=1.03s   max=2.73s    p(90)=1.09s    p(95)=1.14s
     iterations.....................: 23650   234.112685/s
     vus............................: 1       min=1        max=250
     vus_max........................: 250     min=250      max=250

     */
