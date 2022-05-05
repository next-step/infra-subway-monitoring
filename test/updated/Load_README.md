## 스크립트
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
    http_req_duration: ['p(99)<100'],
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
	    age: 32,
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
     script: ./load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m35s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m01.0s), 02/70 VUs, 13 complete and 0 interrupted iterations
default   [   1% ] 02/70 VUs  0m01.0s/1m05.0s

running (0m02.0s), 04/70 VUs, 107 complete and 0 interrupted iterations
default   [   3% ] 04/70 VUs  0m02.0s/1m05.0s

running (0m03.0s), 06/70 VUs, 241 complete and 0 interrupted iterations
default   [   5% ] 06/70 VUs  0m03.0s/1m05.0s

running (0m04.0s), 08/70 VUs, 382 complete and 0 interrupted iterations
default   [   6% ] 08/70 VUs  0m04.0s/1m05.0s

running (0m05.0s), 10/70 VUs, 537 complete and 0 interrupted iterations
default   [   8% ] 10/70 VUs  0m05.0s/1m05.0s

running (0m06.0s), 12/70 VUs, 710 complete and 0 interrupted iterations
default   [   9% ] 12/70 VUs  0m06.0s/1m05.0s

running (0m07.0s), 14/70 VUs, 899 complete and 0 interrupted iterations
default   [  11% ] 14/70 VUs  0m07.0s/1m05.0s

running (0m08.0s), 16/70 VUs, 1094 complete and 0 interrupted iterations
default   [  12% ] 16/70 VUs  0m08.0s/1m05.0s

running (0m09.0s), 18/70 VUs, 1302 complete and 0 interrupted iterations
default   [  14% ] 18/70 VUs  0m09.0s/1m05.0s

running (0m10.0s), 20/70 VUs, 1511 complete and 0 interrupted iterations
default   [  15% ] 20/70 VUs  0m10.0s/1m05.0s

running (0m11.0s), 22/70 VUs, 1728 complete and 0 interrupted iterations
default   [  17% ] 22/70 VUs  0m11.0s/1m05.0s

running (0m12.0s), 24/70 VUs, 1957 complete and 0 interrupted iterations
default   [  18% ] 24/70 VUs  0m12.0s/1m05.0s

running (0m13.0s), 26/70 VUs, 2192 complete and 0 interrupted iterations
default   [  20% ] 26/70 VUs  0m13.0s/1m05.0s

running (0m14.0s), 28/70 VUs, 2432 complete and 0 interrupted iterations
default   [  21% ] 28/70 VUs  0m14.0s/1m05.0s

running (0m15.0s), 30/70 VUs, 2677 complete and 0 interrupted iterations
default   [  23% ] 30/70 VUs  0m15.0s/1m05.0s

running (0m16.0s), 32/70 VUs, 2923 complete and 0 interrupted iterations
default   [  25% ] 32/70 VUs  0m16.0s/1m05.0s

running (0m17.0s), 34/70 VUs, 3172 complete and 0 interrupted iterations
default   [  26% ] 34/70 VUs  0m17.0s/1m05.0s

running (0m18.0s), 36/70 VUs, 3423 complete and 0 interrupted iterations
default   [  28% ] 36/70 VUs  0m18.0s/1m05.0s

running (0m19.0s), 37/70 VUs, 3678 complete and 0 interrupted iterations
default   [  29% ] 37/70 VUs  0m19.0s/1m05.0s

running (0m20.0s), 39/70 VUs, 3925 complete and 0 interrupted iterations
default   [  31% ] 39/70 VUs  0m20.0s/1m05.0s

running (0m21.0s), 40/70 VUs, 4186 complete and 0 interrupted iterations
default   [  32% ] 40/70 VUs  0m21.0s/1m05.0s

running (0m22.0s), 41/70 VUs, 4452 complete and 0 interrupted iterations
default   [  34% ] 41/70 VUs  0m22.0s/1m05.0s

running (0m23.0s), 42/70 VUs, 4719 complete and 0 interrupted iterations
default   [  35% ] 42/70 VUs  0m23.0s/1m05.0s

running (0m24.0s), 43/70 VUs, 4977 complete and 0 interrupted iterations
default   [  37% ] 43/70 VUs  0m24.0s/1m05.0s

running (0m25.0s), 44/70 VUs, 5257 complete and 0 interrupted iterations
default   [  38% ] 44/70 VUs  0m25.0s/1m05.0s

running (0m26.0s), 45/70 VUs, 5528 complete and 0 interrupted iterations
default   [  40% ] 45/70 VUs  0m26.0s/1m05.0s

running (0m27.0s), 45/70 VUs, 5793 complete and 0 interrupted iterations
default   [  41% ] 45/70 VUs  0m27.0s/1m05.0s

running (0m28.0s), 46/70 VUs, 6073 complete and 0 interrupted iterations
default   [  43% ] 46/70 VUs  0m28.0s/1m05.0s

running (0m29.0s), 47/70 VUs, 6352 complete and 0 interrupted iterations
default   [  45% ] 47/70 VUs  0m29.0s/1m05.0s

running (0m30.0s), 48/70 VUs, 6643 complete and 0 interrupted iterations
default   [  46% ] 48/70 VUs  0m30.0s/1m05.0s

running (0m31.0s), 49/70 VUs, 6921 complete and 0 interrupted iterations
default   [  48% ] 49/70 VUs  0m31.0s/1m05.0s

running (0m32.0s), 50/70 VUs, 7221 complete and 0 interrupted iterations
default   [  49% ] 50/70 VUs  0m32.0s/1m05.0s

running (0m33.0s), 51/70 VUs, 7516 complete and 0 interrupted iterations
default   [  51% ] 51/70 VUs  0m33.0s/1m05.0s

running (0m34.0s), 51/70 VUs, 7829 complete and 0 interrupted iterations
default   [  52% ] 51/70 VUs  0m34.0s/1m05.0s

running (0m35.0s), 52/70 VUs, 8139 complete and 0 interrupted iterations
default   [  54% ] 52/70 VUs  0m35.0s/1m05.0s

running (0m36.0s), 53/70 VUs, 8446 complete and 0 interrupted iterations
default   [  55% ] 53/70 VUs  0m36.0s/1m05.0s

running (0m37.0s), 54/70 VUs, 8748 complete and 0 interrupted iterations
default   [  57% ] 54/70 VUs  0m37.0s/1m05.0s

running (0m38.0s), 55/70 VUs, 9060 complete and 0 interrupted iterations
default   [  58% ] 55/70 VUs  0m38.0s/1m05.0s

running (0m39.0s), 56/70 VUs, 9371 complete and 0 interrupted iterations
default   [  60% ] 56/70 VUs  0m39.0s/1m05.0s

running (0m40.0s), 57/70 VUs, 9684 complete and 0 interrupted iterations
default   [  61% ] 57/70 VUs  0m40.0s/1m05.0s

running (0m41.0s), 57/70 VUs, 9995 complete and 0 interrupted iterations
default   [  63% ] 57/70 VUs  0m41.0s/1m05.0s

running (0m42.0s), 58/70 VUs, 10308 complete and 0 interrupted iterations
default   [  65% ] 58/70 VUs  0m42.0s/1m05.0s

running (0m43.0s), 59/70 VUs, 10633 complete and 0 interrupted iterations
default   [  66% ] 59/70 VUs  0m43.0s/1m05.0s

running (0m44.0s), 60/70 VUs, 10948 complete and 0 interrupted iterations
default   [  68% ] 60/70 VUs  0m44.0s/1m05.0s

running (0m45.0s), 61/70 VUs, 11278 complete and 0 interrupted iterations
default   [  69% ] 61/70 VUs  0m45.0s/1m05.0s

running (0m46.0s), 62/70 VUs, 11603 complete and 0 interrupted iterations
default   [  71% ] 62/70 VUs  0m46.0s/1m05.0s

running (0m47.0s), 63/70 VUs, 11933 complete and 0 interrupted iterations
default   [  72% ] 63/70 VUs  0m47.0s/1m05.0s

running (0m48.0s), 63/70 VUs, 12260 complete and 0 interrupted iterations
default   [  74% ] 63/70 VUs  0m48.0s/1m05.0s

running (0m49.0s), 64/70 VUs, 12595 complete and 0 interrupted iterations
default   [  75% ] 64/70 VUs  0m49.0s/1m05.0s

running (0m50.0s), 65/70 VUs, 12943 complete and 0 interrupted iterations
default   [  77% ] 65/70 VUs  0m50.0s/1m05.0s

running (0m51.0s), 66/70 VUs, 13288 complete and 0 interrupted iterations
default   [  78% ] 66/70 VUs  0m51.0s/1m05.0s

running (0m52.0s), 67/70 VUs, 13651 complete and 0 interrupted iterations
default   [  80% ] 67/70 VUs  0m52.0s/1m05.0s

running (0m53.0s), 68/70 VUs, 14025 complete and 0 interrupted iterations
default   [  81% ] 68/70 VUs  0m53.0s/1m05.0s

running (0m54.0s), 69/70 VUs, 14385 complete and 0 interrupted iterations
default   [  83% ] 69/70 VUs  0m54.0s/1m05.0s

running (0m55.0s), 69/70 VUs, 14760 complete and 0 interrupted iterations
default   [  85% ] 69/70 VUs  0m55.0s/1m05.0s

running (0m56.0s), 64/70 VUs, 15147 complete and 0 interrupted iterations
default   [  86% ] 64/70 VUs  0m56.0s/1m05.0s

running (0m57.0s), 57/70 VUs, 15528 complete and 0 interrupted iterations
default   [  88% ] 57/70 VUs  0m57.0s/1m05.0s

running (0m58.0s), 50/70 VUs, 15881 complete and 0 interrupted iterations
default   [  89% ] 50/70 VUs  0m58.0s/1m05.0s

running (0m59.0s), 43/70 VUs, 16263 complete and 0 interrupted iterations
default   [  91% ] 43/70 VUs  0m59.0s/1m05.0s

running (1m00.0s), 36/70 VUs, 16647 complete and 0 interrupted iterations
default   [  92% ] 36/70 VUs  1m00.0s/1m05.0s

running (1m01.0s), 29/70 VUs, 17012 complete and 0 interrupted iterations
default   [  94% ] 29/70 VUs  1m01.0s/1m05.0s

running (1m02.0s), 22/70 VUs, 17371 complete and 0 interrupted iterations
default   [  95% ] 22/70 VUs  1m02.0s/1m05.0s

running (1m03.0s), 15/70 VUs, 17760 complete and 0 interrupted iterations
default   [  97% ] 15/70 VUs  1m03.0s/1m05.0s

running (1m04.0s), 08/70 VUs, 18155 complete and 0 interrupted iterations
default   [  98% ] 08/70 VUs  1m04.0s/1m05.0s

running (1m05.0s), 01/70 VUs, 18433 complete and 0 interrupted iterations
default   [ 100% ] 01/70 VUs  1m05.0s/1m05.0s

running (1m05.0s), 00/70 VUs, 18438 complete and 0 interrupted iterations
default ✓ [ 100% ] 00/70 VUs  1m5s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 36876      ✗ 0    
     data_received..................: 15 MB   226 kB/s
     data_sent......................: 11 MB   168 kB/s
     http_req_blocked...............: avg=16.18µs  min=827ns   med=1.8µs    max=28.38ms  p(90)=2.67µs   p(95)=3.4µs   
     http_req_connecting............: avg=2.45µs   min=0s      med=0s       max=4.36ms   p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=72.14ms  min=4.51ms  med=67.27ms  max=612.9ms  p(90)=126.61ms p(95)=148.05ms
       { expected_response:true }...: avg=68.41ms  min=4.51ms  med=64.44ms  max=612.9ms  p(90)=120.28ms p(95)=140.86ms
     http_req_failed................: 50.00%  ✓ 18438      ✗ 18438
     http_req_receiving.............: avg=43.35µs  min=14.55µs med=36.18µs  max=8.29ms   p(90)=57.23µs  p(95)=73.65µs 
     http_req_sending...............: avg=20.12µs  min=5.39µs  med=13.06µs  max=5.56ms   p(90)=27.99µs  p(95)=33.38µs 
     http_req_tls_handshaking.......: avg=10.9µs   min=0s      med=0s       max=15.36ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=72.08ms  min=4.48ms  med=67.21ms  max=612.69ms p(90)=126.53ms p(95)=147.98ms
     http_reqs......................: 36876   567.248816/s
     iteration_duration.............: avg=144.61ms min=9.95ms  med=143.15ms max=736.14ms p(90)=229.54ms p(95)=257.32ms
     iterations.....................: 18438   283.624408/s
     vus............................: 1       min=1        max=70 
     vus_max........................: 70      min=70       max=70 

```
