import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 250, // 1 user looping for 1 minute
  duration: '100s',

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
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 250 max VUs, 2m10s max duration (incl. graceful stop):
           * default: 250 looping VUs for 1m40s (gracefulStop: 30s)


running (1m41.0s), 000/250 VUs, 24008 complete and 0 interrupted iterations
default ↓ [======================================] 250 VUs  1m40s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 48016      ✗ 0
     data_received..................: 18 MB   173 kB/s
     data_sent......................: 12 MB   120 kB/s
     http_req_blocked...............: avg=2.59ms   min=3.24µs  med=4.99µs  max=806.98ms p(90)=8.08µs   p(95)=27.25µs
     http_req_connecting............: avg=161.46µs min=0s      med=0s      max=53.75ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=18.75ms  min=3.27ms  med=10ms    max=476.55ms p(90)=38.18ms  p(95)=60.49ms
       { expected_response:true }...: avg=18.75ms  min=3.27ms  med=10ms    max=476.55ms p(90)=38.18ms  p(95)=60.49ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 48016
     http_req_receiving.............: avg=320.44µs min=20.77µs med=41.84µs max=203.88ms p(90)=279.88µs p(95)=905.77µs
     http_req_sending...............: avg=621.55µs min=9.16µs  med=17.58µs max=227.01ms p(90)=204.71µs p(95)=1.24ms
     http_req_tls_handshaking.......: avg=2.17ms   min=0s      med=0s      max=731.53ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=17.81ms  min=3.2ms   med=9.62ms  max=390.3ms  p(90)=36.49ms  p(95)=57.7ms
     http_reqs......................: 48016   475.398192/s
     iteration_duration.............: avg=1.04s    min=1s      med=1.02s   max=1.98s    p(90)=1.07s    p(95)=1.13s
     iterations.....................: 24008   237.699096/s
     vus............................: 248     min=248      max=250
     vus_max........................: 250     min=250      max=250

     */
