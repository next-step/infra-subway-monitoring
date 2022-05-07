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


running (01.0s), 1/1 VUs, 53 complete and 0 interrupted iterations
default   [  10% ] 1 VUs  01.0s/10s

running (02.0s), 1/1 VUs, 122 complete and 0 interrupted iterations
default   [  20% ] 1 VUs  02.0s/10s

running (03.0s), 1/1 VUs, 191 complete and 0 interrupted iterations
default   [  30% ] 1 VUs  03.0s/10s

running (04.0s), 1/1 VUs, 262 complete and 0 interrupted iterations
default   [  40% ] 1 VUs  04.0s/10s

running (05.0s), 1/1 VUs, 334 complete and 0 interrupted iterations
default   [  50% ] 1 VUs  05.0s/10s

running (06.0s), 1/1 VUs, 416 complete and 0 interrupted iterations
default   [  60% ] 1 VUs  06.0s/10s

running (07.0s), 1/1 VUs, 493 complete and 0 interrupted iterations
default   [  70% ] 1 VUs  07.0s/10s

running (08.0s), 1/1 VUs, 576 complete and 0 interrupted iterations
default   [  80% ] 1 VUs  08.0s/10s

running (09.0s), 1/1 VUs, 664 complete and 0 interrupted iterations
default   [  90% ] 1 VUs  09.0s/10s

running (10.0s), 1/1 VUs, 748 complete and 0 interrupted iterations
default   [ 100% ] 1 VUs  10.0s/10s

running (10.0s), 0/1 VUs, 750 complete and 0 interrupted iterations
default ↓ [ 100% ] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 1500       ✗ 0  
     data_received..................: 592 kB  59 kB/s
     data_sent......................: 443 kB  44 kB/s
     http_req_blocked...............: avg=17.67µs min=1.53µs  med=2.43µs  max=15.4ms   p(90)=3.54µs  p(95)=4.58µs  
     http_req_connecting............: avg=1.64µs  min=0s      med=0s      max=1.23ms   p(90)=0s      p(95)=0s      
   ✓ http_req_duration..............: avg=6.44ms  min=3.97ms  med=6.02ms  max=28.72ms  p(90)=7.84ms  p(95)=9.37ms  
       { expected_response:true }...: avg=5.97ms  min=3.97ms  med=5.64ms  max=28.72ms  p(90)=6.99ms  p(95)=7.97ms  
     http_req_failed................: 50.00%  ✓ 750        ✗ 750
     http_req_receiving.............: avg=69.17µs min=25.29µs med=62.75µs max=4.68ms   p(90)=87.68µs p(95)=110.42µs
     http_req_sending...............: avg=22.61µs min=9.17µs  med=18.76µs max=612.53µs p(90)=31.61µs p(95)=35.37µs 
     http_req_tls_handshaking.......: avg=12.49µs min=0s      med=0s      max=13.69ms  p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=6.35ms  min=3.91ms  med=5.94ms  max=28.57ms  p(90)=7.74ms  p(95)=9.25ms  
     http_reqs......................: 1500    149.817046/s
     iteration_duration.............: avg=13.33ms min=8.9ms   med=12.72ms max=44.86ms  p(90)=16.23ms p(95)=18.57ms 
     iterations.....................: 750     74.908523/s
     vus............................: 1       min=1        max=1
     vus_max........................: 1       min=1        max=1


```
