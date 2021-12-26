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
		      http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5
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
     script: ./update_page_load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m35s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ logged in successfully
     ✓ updated member

     checks.........................: 100.00% ✓ 32714      ✗ 0    
     data_received..................: 10 MB   156 kB/s
     data_sent......................: 10 MB   157 kB/s
     http_req_blocked...............: avg=314.54µs min=3.17µs  med=5µs      max=414.4ms  p(90)=7.82µs   p(95)=39.66µs 
     http_req_connecting............: avg=64.54µs  min=0s      med=0s       max=154.11ms p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=78.76ms  min=2.62ms  med=71.74ms  max=442.63ms p(90)=148.88ms p(95)=175.95ms
       { expected_response:true }...: avg=78.76ms  min=2.62ms  med=71.74ms  max=442.63ms p(90)=148.88ms p(95)=175.95ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 32714
     http_req_receiving.............: avg=767.72µs min=19.88µs med=43.32µs  max=190.94ms p(90)=596.86µs p(95)=1.7ms   
     http_req_sending...............: avg=337.94µs min=11.45µs med=19.47µs  max=178.94ms p(90)=85.06µs  p(95)=458.29µs
     http_req_tls_handshaking.......: avg=145.14µs min=0s      med=0s       max=386.88ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=77.65ms  min=2.55ms  med=70.84ms  max=421.16ms p(90)=146.86ms p(95)=173.43ms
     http_reqs......................: 32714   503.224383/s
     iteration_duration.............: avg=162.9ms  min=6.26ms  med=160.74ms max=676.32ms p(90)=281.08ms p(95)=318.89ms
     iterations.....................: 16357   251.612191/s
     vus............................: 1       min=1        max=70 
     vus_max........................: 70      min=70       max=70 

```

요청에 대한 총 시간이 100ms를 넘어섰다.
