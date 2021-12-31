### 실행 스크립트

```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
	stages: [
		{duration: '30s', target: 100},
		{duration: '1m', target: 100},
		{duration: '30s', target: 200},
		{duration: '1m', target: 200},
		{duration: '30s', target: 300},
		{duration: '1m', target: 300},
		{duration: '1m', target: 0},
	],
	thresholds: {
		http_req_duration: ['p(99)<1000'],

	}
};

const BASE_URL = 'https://eedys-tomcat.p-e.kr'
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

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

```

### 결과 스크립트

```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: ./frequent_page_stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 6m0s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 5m30s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 105974     ✗ 0     
     data_received..................: 38 MB   115 kB/s
     data_sent......................: 27 MB   83 kB/s
     http_req_blocked...............: avg=182.4µs  min=3.24µs  med=5.88µs  max=664.55ms p(90)=10.14µs  p(95)=65.37µs 
     http_req_connecting............: avg=27.8µs   min=0s      med=0s      max=331.22ms p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=47.09ms  min=2.79ms  med=14.83ms max=652.47ms p(90)=141.09ms p(95)=198.48ms
       { expected_response:true }...: avg=47.09ms  min=2.79ms  med=14.83ms max=652.47ms p(90)=141.09ms p(95)=198.48ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 105974
     http_req_receiving.............: avg=867.66µs min=23.49µs med=53.56µs max=546.58ms p(90)=537.78µs p(95)=1.37ms  
     http_req_sending...............: avg=760.94µs min=9.47µs  med=20.57µs max=338.39ms p(90)=226.34µs p(95)=1.07ms  
     http_req_tls_handshaking.......: avg=51.17µs  min=0s      med=0s      max=333.16ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=45.46ms  min=2.68ms  med=14.18ms max=588.94ms p(90)=136.57ms p(95)=192.71ms
     http_reqs......................: 105974  320.553026/s
     iteration_duration.............: avg=1.1s     min=1s      med=1.03s   max=2.13s    p(90)=1.31s    p(95)=1.41s   
     iterations.....................: 52987   160.276513/s
     vus............................: 4       min=4        max=300 
     vus_max........................: 300     min=300      max=300 



```
