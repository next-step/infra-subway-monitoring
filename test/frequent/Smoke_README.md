## 스크립트

```

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  },
};

const BASE_URL = 'https://exemeedys.p-e.kr';
const USERNAME = 'eedys@gmail.com';
const PASSWORD = 'test123';

export default function () {

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
   	'logged in successfully': (resp) => resp.json('') !== '',
   });
   
   let addHeaders = {
    headers: {
	Authorization: `Bearer ${loginRes.json('accessToken')}`
    },
   };

   let myObjects = http.get(`${BASE_URL}/members/me`, addHeaders).json();
   check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
   sleep(1);
}

```

## 결과

```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: ./smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (01.0s), 1/1 VUs, 55 complete and 0 interrupted iterations
default   [  10% ] 1 VUs  01.0s/10s

running (02.0s), 1/1 VUs, 123 complete and 0 interrupted iterations
default   [  20% ] 1 VUs  02.0s/10s

running (03.0s), 1/1 VUs, 195 complete and 0 interrupted iterations
default   [  30% ] 1 VUs  03.0s/10s

running (04.0s), 1/1 VUs, 269 complete and 0 interrupted iterations
default   [  40% ] 1 VUs  04.0s/10s

running (05.0s), 1/1 VUs, 346 complete and 0 interrupted iterations
default   [  50% ] 1 VUs  05.0s/10s

running (06.0s), 1/1 VUs, 427 complete and 0 interrupted iterations
default   [  60% ] 1 VUs  06.0s/10s

running (07.0s), 1/1 VUs, 512 complete and 0 interrupted iterations
default   [  70% ] 1 VUs  07.0s/10s

running (08.0s), 1/1 VUs, 597 complete and 0 interrupted iterations
default   [  80% ] 1 VUs  08.0s/10s

running (09.0s), 1/1 VUs, 689 complete and 0 interrupted iterations
default   [  90% ] 1 VUs  09.0s/10s

running (10.0s), 1/1 VUs, 777 complete and 0 interrupted iterations
default   [ 100% ] 1 VUs  10.0s/10s

running (10.0s), 0/1 VUs, 779 complete and 0 interrupted iterations
default ↓ [ 100% ] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 1558       ✗ 0   
     data_received..................: 550 kB  55 kB/s
     data_sent......................: 400 kB  40 kB/s
     http_req_blocked...............: avg=19.89µs min=1.22µs  med=2.33µs  max=19.94ms  p(90)=3.22µs  p(95)=3.82µs 
     http_req_connecting............: avg=1.42µs  min=0s      med=0s      max=1.17ms   p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=6.22ms  min=3.85ms  med=5.84ms  max=41.59ms  p(90)=7.56ms  p(95)=9.45ms 
       { expected_response:true }...: avg=6.22ms  min=3.85ms  med=5.84ms  max=41.59ms  p(90)=7.56ms  p(95)=9.45ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 1558
     http_req_receiving.............: avg=56.79µs min=21.34µs med=52.36µs max=587.11µs p(90)=77.54µs p(95)=87.18µs
     http_req_sending...............: avg=20.8µs  min=6.58µs  med=18.02µs max=358.2µs  p(90)=29.35µs p(95)=33.26µs
     http_req_tls_handshaking.......: avg=14.3µs  min=0s      med=0s      max=16.88ms  p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=6.14ms  min=3.78ms  med=5.76ms  max=41.47ms  p(90)=7.49ms  p(95)=9.36ms 
     http_reqs......................: 1558    155.740054/s
     iteration_duration.............: avg=12.82ms min=8.5ms   med=12.12ms max=47.56ms  p(90)=15.58ms p(95)=17.96ms
     iterations.....................: 779     77.870027/s
     vus............................: 1       min=1        max=1 
     vus_max........................: 1       min=1        max=1 


```
