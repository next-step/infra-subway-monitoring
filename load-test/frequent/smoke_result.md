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
     script: ./frequent_page_smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0  
     data_received..................: 11 kB   1.1 kB/s
     data_sent......................: 5.5 kB  539 B/s
     http_req_blocked...............: avg=1.17ms   min=4.97µs  med=7.39µs   max=23.3ms   p(90)=9.73µs   p(95)=1.17ms  
     http_req_connecting............: avg=25.73µs  min=0s      med=0s       max=514.76µs p(90)=0s       p(95)=25.73µs 
   ✓ http_req_duration..............: avg=10.24ms  min=9.33ms  med=10.1ms   max=12.82ms  p(90)=10.97ms  p(95)=11.21ms 
       { expected_response:true }...: avg=10.24ms  min=9.33ms  med=10.1ms   max=12.82ms  p(90)=10.97ms  p(95)=11.21ms 
     http_req_failed................: 0.00%   ✓ 0        ✗ 20 
     http_req_receiving.............: avg=121.57µs min=64.27µs med=126.85µs max=187.28µs p(90)=158.68µs p(95)=162.53µs
     http_req_sending...............: avg=35.64µs  min=16.61µs med=34.38µs  max=126.63µs p(90)=46.1µs   p(95)=53.15µs 
     http_req_tls_handshaking.......: avg=834.04µs min=0s      med=0s       max=16.68ms  p(90)=0s       p(95)=834.04µs
     http_req_waiting...............: avg=10.08ms  min=9.15ms  med=9.95ms   max=12.63ms  p(90)=10.79ms  p(95)=11.06ms 
     http_reqs......................: 20      1.952993/s
     iteration_duration.............: avg=1.02s    min=1.02s   med=1.02s    max=1.04s    p(90)=1.02s    p(95)=1.03s   
     iterations.....................: 10      0.976496/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1


```
