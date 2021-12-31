### 실행스크립트

```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
	vus: 1, // 1 user looping for 1 minute
	duration: '10s',

	thresholds: {
		      http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
		    },
};

const BASE_URL = 'https://eedys-tomcat.p-e.kr'

function 지하철노선목록(loginRes) {

	  let authHeaders = {
		      headers: {
				'Content-Type': 'application/json',
			          },
	  }

	  let linesRes = http.get(`${BASE_URL}/lines`, authHeaders);
	  check(linesRes, { 'get lines': (res) => res.status === 200 });
}

function 경로조회(sourceId, targetId) {

	  let authHeaders = {
		      headers: {
				'Content-Type': 'application/json',
			          },
	  }

	  let linesRes = http.get(`${BASE_URL}/paths?source=${sourceId}&target=${targetId}`, authHeaders);
	  check(linesRes, { 'get paths': (res) => res.status === 200 });
}

export default function() {
	지하철노선목록();
	경로조회(3, 6);
}
```

### 결과스크립트
```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: ./join_page_smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     ✓ get lines
     ✓ get paths

     checks.........................: 100.00% ✓ 1152      ✗ 0   
     data_received..................: 1.2 MB  116 kB/s
     data_sent......................: 185 kB  19 kB/s
     http_req_blocked...............: avg=24.96µs min=4.26µs  med=5.1µs   max=18.48ms  p(90)=6.28µs   p(95)=7.31µs  
     http_req_connecting............: avg=871ns   min=0s      med=0s      max=551.02µs p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=8.49ms  min=6.24ms  med=8.16ms  max=34.99ms  p(90)=10.01ms  p(95)=10.56ms 
       { expected_response:true }...: avg=8.49ms  min=6.24ms  med=8.16ms  max=34.99ms  p(90)=10.01ms  p(95)=10.56ms 
     http_req_failed................: 0.00%   ✓ 0         ✗ 1152
     http_req_receiving.............: avg=87.83µs min=45.25µs med=82.06µs max=284.45µs p(90)=127.11µs p(95)=141.19µs
     http_req_sending...............: avg=18.79µs min=12.61µs med=17.38µs max=265.56µs p(90)=22.56µs  p(95)=28.2µs  
     http_req_tls_handshaking.......: avg=17.88µs min=0s      med=0s      max=17.25ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=8.38ms  min=6.15ms  med=8.06ms  max=34.85ms  p(90)=9.89ms   p(95)=10.43ms 
     http_reqs......................: 1152    115.06589/s
     iteration_duration.............: avg=17.36ms min=13.95ms med=16.42ms max=45.92ms  p(90)=19.99ms  p(95)=21.76ms 
     iterations.....................: 576     57.532945/s
     vus............................: 1       min=1       max=1 
     vus_max........................: 1       min=1       max=1 


```
