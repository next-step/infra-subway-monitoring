import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 300, // 1 user looping for 1 minute
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
running (1m41.0s), 000/300 VUs, 28175 complete and 0 interrupted iterations
default ✓ [======================================] 300 VUs  1m40s

     ✗ logged in successfully
      ↳  99% — ✓ 27983 / ✗ 192
     ✓ retrieved member

     checks.........................: 99.65% ✓ 55965      ✗ 192
     data_received..................: 22 MB  213 kB/s
     data_sent......................: 14 MB  141 kB/s
     http_req_blocked...............: avg=3.76ms   min=0s     med=4.97µs  max=876.42ms p(90)=7.96µs   p(95)=28.71µs
     http_req_connecting............: avg=596.12µs min=0s     med=0s      max=633.27ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=30.45ms  min=0s     med=15.09ms max=1.21s    p(90)=56.45ms  p(95)=80.48ms
       { expected_response:true }...: avg=30.49ms  min=3.29ms med=15.11ms max=1.21s    p(90)=56.44ms  p(95)=80.43ms
     http_req_failed................: 0.34%  ✓ 193        ✗ 55965
     http_req_receiving.............: avg=393.11µs min=0s     med=40.96µs max=147.37ms p(90)=304.8µs  p(95)=1.07ms
     http_req_sending...............: avg=652.86µs min=0s     med=17.36µs max=784.51ms p(90)=257.15µs p(95)=1.73ms
     http_req_tls_handshaking.......: avg=2.94ms   min=0s     med=0s      max=824.33ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=29.4ms   min=0s     med=14.5ms  max=1.17s    p(90)=54.18ms  p(95)=76.19ms
     http_reqs......................: 56158  555.985332/s
     iteration_duration.............: avg=1.06s    min=2.25ms med=1.03s   max=3.03s    p(90)=1.11s    p(95)=1.15s
     iterations.....................: 28175  278.943102/s
     vus............................: 4      min=4        max=300
     vus_max........................: 300    min=300      max=300

     */
