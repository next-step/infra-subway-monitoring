### 실행스크립트
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
	stages: [
		{duration: '10s', target: 100},
		{duration: '10s', target: 200},
		{duration: '10s', target: 300},
		{duration: '10s', target: 400},
		{duration: '10s', target: 500},
		{duration: '10s', target: 600},
		{duration: '10s', target: 700},
		{duration: '10s', target: 0},
	],
	thresholds: {
		      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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
     script: ./join_page_stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 700 max VUs, 1m50s max duration (incl. graceful stop):
           * default: Up to 700 looping VUs for 1m20s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)

     ✗ get lines
      ↳  74% — ✓ 6456 / ✗ 2201
     ✗ get paths
      ↳  75% — ✓ 6511 / ✗ 2146

     checks.........................: 74.89% ✓ 12967      ✗ 4347 
     data_received..................: 36 MB  449 kB/s
     data_sent......................: 4.8 MB 59 kB/s
     http_req_blocked...............: avg=350.11ms min=0s     med=5.66µs   max=5.35s  p(90)=1.52s    p(95)=1.83s   
     http_req_connecting............: avg=104.92ms min=0s     med=0s       max=1.87s  p(90)=392.98ms p(95)=584.65ms
   ✗ http_req_duration..............: avg=903.86ms min=0s     med=952.94ms max=5.72s  p(90)=1.7s     p(95)=1.94s   
       { expected_response:true }...: avg=1.13s    min=7.49ms med=1.17s    max=5.72s  p(90)=1.78s    p(95)=2.02s   
     http_req_failed................: 25.10% ✓ 4347       ✗ 12967
     http_req_receiving.............: avg=14.11ms  min=0s     med=53.99µs  max=1.81s  p(90)=4.16ms   p(95)=73.89ms 
     http_req_sending...............: avg=51.83ms  min=0s     med=19.88µs  max=5.03s  p(90)=87.15ms  p(95)=217.54ms
     http_req_tls_handshaking.......: avg=237.5ms  min=0s     med=0s       max=4.57s  p(90)=1.12s    p(95)=1.34s   
     http_req_waiting...............: avg=837.91ms min=0s     med=915.73ms max=5.1s   p(90)=1.61s    p(95)=1.8s    
     http_reqs......................: 17314  215.516294/s
     iteration_duration.............: avg=3.35s    min=5.38ms med=2.7s     max=20.15s p(90)=6.97s    p(95)=9.01s   
     iterations.....................: 8657   107.758147/s
     vus............................: 59     min=10       max=700
     vus_max........................: 700    min=700      max=700

```
