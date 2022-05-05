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

   function 로그인() {
   	let params = {
	   headers: {
	      'Content-Type': 'application/json'
	   },
	}	
   	
	let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
   	
	check(loginRes, {
   		'logged in successfully': (resp) => resp.json('') !== '',
   	});

	return loginRes;
   }

   function 경로검색(token) {
	
	let addHeaders = {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}

   	let myObjects = http.get(`${BASE_URL}/paths?source=1&target=43`, addHeaders).json();
   	check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
   }

   let token = 로그인().json('accessToken');
   경로검색(token);
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


running (01.0s), 1/1 VUs, 9 complete and 0 interrupted iterations
default   [  10% ] 1 VUs  01.0s/10s

running (02.0s), 1/1 VUs, 21 complete and 0 interrupted iterations
default   [  20% ] 1 VUs  02.0s/10s

running (03.0s), 1/1 VUs, 33 complete and 0 interrupted iterations
default   [  30% ] 1 VUs  03.0s/10s

running (04.0s), 1/1 VUs, 46 complete and 0 interrupted iterations
default   [  40% ] 1 VUs  04.0s/10s

running (05.0s), 1/1 VUs, 58 complete and 0 interrupted iterations
default   [  50% ] 1 VUs  05.0s/10s

running (06.0s), 1/1 VUs, 72 complete and 0 interrupted iterations
default   [  60% ] 1 VUs  06.0s/10s

running (07.0s), 1/1 VUs, 85 complete and 0 interrupted iterations
default   [  70% ] 1 VUs  07.0s/10s

running (08.0s), 1/1 VUs, 98 complete and 0 interrupted iterations
default   [  80% ] 1 VUs  08.0s/10s

running (09.0s), 1/1 VUs, 111 complete and 0 interrupted iterations
default   [  90% ] 1 VUs  09.0s/10s

running (10.0s), 1/1 VUs, 124 complete and 0 interrupted iterations
default   [ 100% ] 1 VUs  10.0s/10s

running (10.0s), 0/1 VUs, 125 complete and 0 interrupted iterations
default ✓ [ 100% ] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 250       ✗ 0  
     data_received..................: 101 kB  10 kB/s
     data_sent......................: 66 kB   6.6 kB/s
     http_req_blocked...............: avg=62.67µs min=1.93µs  med=2.83µs  max=14.92ms  p(90)=3.69µs  p(95)=3.87µs  
     http_req_connecting............: avg=4.5µs   min=0s      med=0s      max=1.12ms   p(90)=0s      p(95)=0s      
   ✓ http_req_duration..............: avg=39.8ms  min=6ms     med=36.26ms max=174.92ms p(90)=79.49ms p(95)=86.72ms 
       { expected_response:true }...: avg=7.41ms  min=6ms     med=7.1ms   max=12.5ms   p(90)=8.54ms  p(95)=9.12ms  
     http_req_failed................: 50.00%  ✓ 125       ✗ 125
     http_req_receiving.............: avg=70.57µs min=40.64µs med=71.99µs max=133.71µs p(90)=82.7µs  p(95)=92.82µs 
     http_req_sending...............: avg=24.41µs min=10.12µs med=24.44µs max=87.27µs  p(90)=29.27µs p(95)=32.06µs 
     http_req_tls_handshaking.......: avg=53.35µs min=0s      med=0s      max=13.33ms  p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=39.7ms  min=5.91ms  med=36.16ms max=174.85ms p(90)=79.39ms p(95)=86.59ms 
     http_reqs......................: 250     24.958425/s
     iteration_duration.............: avg=80.11ms min=66.8ms  med=75.51ms max=199.41ms p(90)=95.7ms  p(95)=102.05ms
     iterations.....................: 125     12.479213/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1

```
