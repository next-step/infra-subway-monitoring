### 실행스크립트
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
	stages: [
		{duration: '20s', target: 40},
		{duration: '35s', target: 70},
		{duration: '10s', target: 0},
	],

	thresholds: {
		      http_req_duration: ['p(99)<300'], // 99% of requests must complete below 1.5s
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
     script: ./join_page_load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m35s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

     ✓ get lines
     ✓ get paths

     checks.........................: 100.00% ✓ 9796       ✗ 0   
     data_received..................: 10 MB   156 kB/s
     data_sent......................: 1.6 MB  25 kB/s
     http_req_blocked...............: avg=88.27µs  min=3.42µs  med=5.16µs   max=153.18ms p(90)=6.92µs   p(95)=9.29µs  
     http_req_connecting............: avg=14.7µs   min=0s      med=0s       max=65.62ms  p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=272.66ms min=7.09ms  med=291.72ms max=1.12s    p(90)=392.86ms p(95)=422.29ms
       { expected_response:true }...: avg=272.66ms min=7.09ms  med=291.72ms max=1.12s    p(90)=392.86ms p(95)=422.29ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 9796
     http_req_receiving.............: avg=243.62µs min=29.12µs med=70.18µs  max=110.72ms p(90)=191.08µs p(95)=461.27µs
     http_req_sending...............: avg=86.47µs  min=9.97µs  med=17.73µs  max=131.87ms p(90)=29.37µs  p(95)=55.21µs 
     http_req_tls_handshaking.......: avg=51.57µs  min=0s      med=0s       max=87.44ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=272.33ms min=6.99ms  med=291.36ms max=1.12s    p(90)=392.35ms p(95)=421.14ms
     http_reqs......................: 9796    150.661068/s
     iteration_duration.............: avg=546.52ms min=15.74ms med=589.18ms max=1.46s    p(90)=771.08ms p(95)=816.22ms
     iterations.....................: 4898    75.330534/s
     vus............................: 1       min=1        max=69
     vus_max........................: 70      min=70       max=70

```
