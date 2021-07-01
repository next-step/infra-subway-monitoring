import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

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
     script: smoke-update.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ updated in successfully

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 10 kB   1.0 kB/s
     data_sent......................: 6.4 kB  626 B/s
     http_req_blocked...............: avg=1.46ms  min=4.37µs  med=7.19µs max=29.1ms   p(90)=8.48µs  p(95)=1.46ms
     http_req_connecting............: avg=25.82µs min=0s      med=0s     max=516.48µs p(90)=0s      p(95)=25.82µs
   ✓ http_req_duration..............: avg=7.84ms  min=4.8ms   med=6.62ms max=33.19ms  p(90)=8.39ms  p(95)=9.85ms
       { expected_response:true }...: avg=7.84ms  min=4.8ms   med=6.62ms max=33.19ms  p(90)=8.39ms  p(95)=9.85ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 20
     http_req_receiving.............: avg=65.2µs  min=42.74µs med=60.6µs max=148.11µs p(90)=86.17µs p(95)=100.55µs
     http_req_sending...............: avg=29.32µs min=17.63µs med=29.2µs max=84.61µs  p(90)=32.66µs p(95)=39.06µs
     http_req_tls_handshaking.......: avg=1.4ms   min=0s      med=0s     max=28.04ms  p(90)=0s      p(95)=1.4ms
     http_req_waiting...............: avg=7.75ms  min=4.71ms  med=6.5ms  max=33.01ms  p(90)=8.3ms   p(95)=9.78ms
     http_reqs......................: 20      1.961326/s
     iteration_duration.............: avg=1.01s   min=1.01s   med=1.01s  max=1.06s    p(90)=1.02s   p(95)=1.04s
     iterations.....................: 10      0.980663/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

     */
