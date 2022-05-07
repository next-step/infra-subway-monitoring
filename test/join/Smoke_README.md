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


running (01.0s), 1/1 VUs, 6 complete and 0 interrupted iterations
default   [  10% ] 1 VUs  01.0s/10s

running (02.0s), 1/1 VUs, 16 complete and 0 interrupted iterations
default   [  20% ] 1 VUs  02.0s/10s

running (03.0s), 1/1 VUs, 28 complete and 0 interrupted iterations
default   [  30% ] 1 VUs  03.0s/10s

running (04.0s), 1/1 VUs, 40 complete and 0 interrupted iterations
default   [  40% ] 1 VUs  04.0s/10s

running (05.0s), 1/1 VUs, 53 complete and 0 interrupted iterations
default   [  50% ] 1 VUs  05.0s/10s

running (06.0s), 1/1 VUs, 66 complete and 0 interrupted iterations
default   [  60% ] 1 VUs  06.0s/10s

running (07.0s), 1/1 VUs, 79 complete and 0 interrupted iterations
default   [  70% ] 1 VUs  07.0s/10s

running (08.0s), 1/1 VUs, 93 complete and 0 interrupted iterations
default   [  80% ] 1 VUs  08.0s/10s

running (09.0s), 1/1 VUs, 106 complete and 0 interrupted iterations
default   [  90% ] 1 VUs  09.0s/10s

running (10.0s), 1/1 VUs, 117 complete and 0 interrupted iterations
default   [ 100% ] 1 VUs  10.0s/10s

running (10.1s), 0/1 VUs, 118 complete and 0 interrupted iterations
default ✓ [ 100% ] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 236       ✗ 0  
     data_received..................: 96 kB   9.5 kB/s
     data_sent......................: 62 kB   6.2 kB/s
     http_req_blocked...............: avg=70.32µs min=1.87µs  med=2.79µs  max=15.78ms  p(90)=4.16µs   p(95)=5.6µs   
     http_req_connecting............: avg=4.69µs  min=0s      med=0s      max=1.1ms    p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=42.35ms min=5.62ms  med=37.13ms max=218.96ms p(90)=86.63ms  p(95)=97.75ms 
       { expected_response:true }...: avg=7.47ms  min=5.62ms  med=7.02ms  max=17.49ms  p(90)=10.16ms  p(95)=11.47ms 
     http_req_failed................: 50.00%  ✓ 118       ✗ 118
     http_req_receiving.............: avg=74.18µs min=43.46µs med=74.31µs max=271.25µs p(90)=86.57µs  p(95)=92.19µs 
     http_req_sending...............: avg=22.81µs min=11.48µs med=22.51µs max=90.81µs  p(90)=31.6µs   p(95)=33.68µs 
     http_req_tls_handshaking.......: avg=59.84µs min=0s      med=0s      max=14.12ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=42.26ms min=5.52ms  med=37.03ms max=218.86ms p(90)=86.55ms  p(95)=97.64ms 
     http_reqs......................: 236     23.449891/s
     iteration_duration.............: avg=85.26ms min=63.36ms med=76ms    max=229.63ms p(90)=105.47ms p(95)=129.83ms
     iterations.....................: 118     11.724945/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1

```
