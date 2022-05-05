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


running (01.0s), 1/1 VUs, 0 complete and 0 interrupted iterations
default   [  10% ] 1 VUs  01.0s/10s

running (02.0s), 1/1 VUs, 1 complete and 0 interrupted iterations
default   [  20% ] 1 VUs  02.0s/10s

running (03.0s), 1/1 VUs, 2 complete and 0 interrupted iterations
default   [  30% ] 1 VUs  03.0s/10s

running (04.0s), 1/1 VUs, 3 complete and 0 interrupted iterations
default   [  40% ] 1 VUs  04.0s/10s

running (05.0s), 1/1 VUs, 4 complete and 0 interrupted iterations
default   [  50% ] 1 VUs  05.0s/10s

running (06.0s), 1/1 VUs, 5 complete and 0 interrupted iterations
default   [  60% ] 1 VUs  06.0s/10s

running (07.0s), 1/1 VUs, 5 complete and 0 interrupted iterations
default   [  70% ] 1 VUs  07.0s/10s

running (08.0s), 1/1 VUs, 6 complete and 0 interrupted iterations
default   [  80% ] 1 VUs  08.0s/10s

running (09.0s), 1/1 VUs, 7 complete and 0 interrupted iterations
default   [  90% ] 1 VUs  09.0s/10s

running (10.0s), 1/1 VUs, 8 complete and 0 interrupted iterations
default   [ 100% ] 1 VUs  10.0s/10s

running (10.1s), 0/1 VUs, 9 complete and 0 interrupted iterations
default ↓ [ 100% ] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 18       ✗ 0  
     data_received..................: 11 kB   1.1 kB/s
     data_sent......................: 5.0 kB  493 B/s
     http_req_blocked...............: avg=1.44ms   min=2.69µs  med=3.97µs  max=25.97ms  p(90)=4.78µs   p(95)=3.9ms   
     http_req_connecting............: avg=52.35µs  min=0s      med=0s      max=942.43µs p(90)=0s       p(95)=141.36µs
   ✓ http_req_duration..............: avg=59.41ms  min=11.29ms med=16.33ms max=702.99ms p(90)=49.36ms  p(95)=191.4ms 
       { expected_response:true }...: avg=59.41ms  min=11.29ms med=16.33ms max=702.99ms p(90)=49.36ms  p(95)=191.4ms 
     http_req_failed................: 0.00%   ✓ 0        ✗ 18 
     http_req_receiving.............: avg=80.28µs  min=58.02µs med=73.12µs max=137.58µs p(90)=115.96µs p(95)=130.21µs
     http_req_sending...............: avg=26.4µs   min=13.56µs med=23.54µs max=68.72µs  p(90)=35.3µs   p(95)=43.05µs 
     http_req_tls_handshaking.......: avg=734.65µs min=0s      med=0s      max=13.22ms  p(90)=0s       p(95)=1.98ms  
     http_req_waiting...............: avg=59.3ms   min=11.13ms med=16.22ms max=702.83ms p(90)=49.24ms  p(95)=191.24ms
     http_reqs......................: 18      1.780982/s
     iteration_duration.............: avg=1.12s    min=1.02s   med=1.03s   max=1.83s    p(90)=1.2s     p(95)=1.51s   
     iterations.....................: 9       0.890491/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
