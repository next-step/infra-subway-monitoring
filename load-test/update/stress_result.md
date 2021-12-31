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
		      http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.5
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


### 결과스크립트
```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: ./update_page_stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 700 max VUs, 1m50s max duration (incl. graceful stop):
           * default: Up to 700 looping VUs for 1m20s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)

     ✗ logged in successfully
      ↳  76% — ✓ 17940 / ✗ 5571
     ✗ updated member
      ↳  93% — ✓ 16857 / ✗ 1083

     checks.........................: 83.94% ✓ 34797      ✗ 6654
     data_received..................: 38 MB  472 kB/s
     data_sent......................: 15 MB  182 kB/s
     http_req_blocked...............: avg=169.91ms min=0s     med=5.13µs   max=3.06s p(90)=954.67ms p(95)=1.27s
     http_req_connecting............: avg=70.21ms  min=0s     med=0s       max=1.29s p(90)=331.21ms p(95)=424.06ms
   ✗ http_req_duration..............: avg=391.33ms min=0s     med=381.08ms max=1.84s p(90)=746.95ms p(95)=852.29ms
       { expected_response:true }...: avg=442.27ms min=2.86ms med=438.86ms max=1.84s p(90)=767.13ms p(95)=877.91ms
     http_req_failed................: 16.05% ✓ 6654       ✗ 34797
     http_req_receiving.............: avg=8.46ms   min=0s     med=40.37µs  max=1.14s p(90)=1.19ms   p(95)=46.47ms
     http_req_sending...............: avg=12.4ms   min=0s     med=19.99µs  max=1s    p(90)=12.08ms  p(95)=87.89ms
     http_req_tls_handshaking.......: avg=124.74ms min=0s     med=0s       max=2.6s  p(90)=665.1ms  p(95)=919.49ms
     http_req_waiting...............: avg=370.46ms min=0s     med=371.69ms max=1.84s p(90)=707.12ms p(95)=783.16ms
     http_reqs......................: 41451  518.080413/s
     iteration_duration.............: avg=1.19s    min=6.78ms med=1.01s    max=7.02s p(90)=2.45s    p(95)=3.05s
     iterations.....................: 23511  293.85512/s
     vus............................: 1      min=1        max=699
     vus_max........................: 700    min=700      max=700
```

76% 에서 실패
