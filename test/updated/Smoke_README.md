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

   function 내정보수정(token) {
	
	let addHeaders = {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}

	let obj = JSON.stringify({
	    age: 31,
	    email: USERNAME,
	    password: PASSWORD,
	})

   	let myObjects = http.put(`${BASE_URL}/members/me`, obj, addHeaders).json();
   	check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
   }

   let token = 로그인().json('accessToken');
   내정보수정(token);
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

running (02.0s), 1/1 VUs, 37 complete and 0 interrupted iterations
default   [  20% ] 1 VUs  02.0s/10s

running (03.0s), 1/1 VUs, 85 complete and 0 interrupted iterations
default   [  30% ] 1 VUs  03.0s/10s

running (04.0s), 1/1 VUs, 136 complete and 0 interrupted iterations
default   [  40% ] 1 VUs  04.0s/10s

running (05.0s), 1/1 VUs, 191 complete and 0 interrupted iterations
default   [  50% ] 1 VUs  05.0s/10s

running (06.0s), 1/1 VUs, 247 complete and 0 interrupted iterations
default   [  60% ] 1 VUs  06.0s/10s

running (07.0s), 1/1 VUs, 308 complete and 0 interrupted iterations
default   [  70% ] 1 VUs  07.0s/10s

running (08.0s), 1/1 VUs, 366 complete and 0 interrupted iterations
default   [  80% ] 1 VUs  08.0s/10s

running (09.0s), 1/1 VUs, 426 complete and 0 interrupted iterations
default   [  90% ] 1 VUs  09.0s/10s

running (10.0s), 1/1 VUs, 491 complete and 0 interrupted iterations
default   [ 100% ] 1 VUs  10.0s/10s

running (10.0s), 0/1 VUs, 493 complete and 0 interrupted iterations
default ✓ [ 100% ] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 986       ✗ 0  
     data_received..................: 388 kB  39 kB/s
     data_sent......................: 291 kB  29 kB/s
     http_req_blocked...............: avg=19.39µs min=1.58µs  med=2.48µs  max=16.14ms  p(90)=3.51µs  p(95)=4.07µs 
     http_req_connecting............: avg=1.2µs   min=0s      med=0s      max=1.18ms   p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=9.93ms  min=5.53ms  med=8.32ms  max=882.73ms p(90)=11.18ms p(95)=13.72ms
       { expected_response:true }...: avg=9.95ms  min=5.53ms  med=7.72ms  max=882.73ms p(90)=10.09ms p(95)=11.73ms
     http_req_failed................: 50.00%  ✓ 493       ✗ 493
     http_req_receiving.............: avg=60.01µs min=25.35µs med=60.6µs  max=201.01µs p(90)=80.63µs p(95)=88.48µs
     http_req_sending...............: avg=23.78µs min=8.65µs  med=23.25µs max=863.44µs p(90)=30.73µs p(95)=34.74µs
     http_req_tls_handshaking.......: avg=14.46µs min=0s      med=0s      max=14.26ms  p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=9.85ms  min=5.49ms  med=8.25ms  max=882.54ms p(90)=11.06ms p(95)=13.58ms
     http_reqs......................: 986     98.450004/s
     iteration_duration.............: avg=20.29ms min=12.26ms med=17.02ms max=1s       p(90)=22.9ms  p(95)=27.21ms
     iterations.....................: 493     49.225002/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1


```
