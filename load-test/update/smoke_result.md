### 실행 스크립트

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


function 로그인() {
	let payload = JSON.stringify({
		email: USERNAME,
		password: PASSWORD,
	});

	let params = {
		headers: {
			'Content-Type': 'application/json',
		}
	};

	let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);


	check(loginRes, {
		      'logged in successfully': (resp) => resp.json('accessToken') !== '',
		    });

	return loginRes;
}

function 내정보수정(loginRes) {

	  let authHeaders = {
		      headers: {
				'Content-Type': 'application/json',
			         Authorization: `Bearer ${loginRes.json('accessToken')}`,
			          },
	  }

	  let payload = JSON.stringify({
	  	email: USERNAME,
		password: PASSWORD,
		age: 20,
	  });

	  let updateRes = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
	  check(updateRes, { 'updated member': (res) => res.status === 200 });
}

export default function() {
	const loginRes = 로그인();
	내정보수정(loginRes);
}

```

### 결과 스크립트

```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: ./update_page_smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     ✓ logged in successfully
     ✓ updated member

     checks.........................: 100.00% ✓ 2884       ✗ 0   
     data_received..................: 875 kB  87 kB/s
     data_sent......................: 898 kB  90 kB/s
     http_req_blocked...............: avg=13.81µs min=4.02µs  med=4.75µs  max=17.19ms  p(90)=5.29µs  p(95)=6.32µs  
     http_req_connecting............: avg=508ns   min=0s      med=0s      max=528.58µs p(90)=0s      p(95)=0s      
   ✓ http_req_duration..............: avg=3.29ms  min=2.63ms  med=3.3ms   max=11.8ms   p(90)=3.72ms  p(95)=3.88ms  
       { expected_response:true }...: avg=3.29ms  min=2.63ms  med=3.3ms   max=11.8ms   p(90)=3.72ms  p(95)=3.88ms  
     http_req_failed................: 0.00%   ✓ 0          ✗ 2884
     http_req_receiving.............: avg=64.97µs min=31.59µs med=61.44µs max=1.05ms   p(90)=92.86µs p(95)=102.31µs
     http_req_sending...............: avg=21.36µs min=15.37µs med=17.71µs max=665.88µs p(90)=29.62µs p(95)=31.13µs 
     http_req_tls_handshaking.......: avg=7.91µs  min=0s      med=0s      max=16.05ms  p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.2ms   min=2.54ms  med=3.22ms  max=11.69ms  p(90)=3.65ms  p(95)=3.81ms  
     http_reqs......................: 2884    288.172791/s
     iteration_duration.............: avg=6.92ms  min=6.11ms  med=6.77ms  max=26.74ms  p(90)=7.35ms  p(95)=7.63ms  
     iterations.....................: 1442    144.086395/s
     vus............................: 1       min=1        max=1 
     vus_max........................: 1       min=1        max=1 

```


