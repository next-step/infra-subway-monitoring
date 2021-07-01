import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

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
};

/*
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.3s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 11 kB   1.1 kB/s
     data_sent......................: 5.4 kB  526 B/s
     http_req_blocked...............: avg=1.95ms  min=4.52µs  med=6.28µs  max=38.96ms  p(90)=8.54µs   p(95)=1.96ms
     http_req_connecting............: avg=23.97µs min=0s      med=0s      max=479.45µs p(90)=0s       p(95)=23.97µs
   ✓ http_req_duration..............: avg=10.11ms min=7.48ms  med=8.16ms  max=42.98ms  p(90)=9.51ms   p(95)=14.13ms
       { expected_response:true }...: avg=10.11ms min=7.48ms  med=8.16ms  max=42.98ms  p(90)=9.51ms   p(95)=14.13ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 20
     http_req_receiving.............: avg=78.57µs min=55.25µs med=73.79µs max=124.96µs p(90)=100.71µs p(95)=123.98µs
     http_req_sending...............: avg=26.21µs min=14.48µs med=24.02µs max=80.92µs  p(90)=32.36µs  p(95)=37.69µs
     http_req_tls_handshaking.......: avg=1.42ms  min=0s      med=0s      max=28.4ms   p(90)=0s       p(95)=1.42ms
     http_req_waiting...............: avg=10.01ms min=7.37ms  med=8.05ms  max=42.78ms  p(90)=9.39ms   p(95)=14.02ms
     http_reqs......................: 20      1.950419/s
     iteration_duration.............: avg=1.02s   min=1.01s   med=1.01s   max=1.09s    p(90)=1.02s    p(95)=1.06s
     iterations.....................: 10      0.97521/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

*/
