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
     script: ./load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m35s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m01.0s), 02/70 VUs, 0 complete and 0 interrupted iterations
default   [   2% ] 02/70 VUs  0m01.0s/1m05.0s

running (0m02.0s), 04/70 VUs, 3 complete and 0 interrupted iterations
default   [   3% ] 04/70 VUs  0m02.0s/1m05.0s

running (0m03.0s), 06/70 VUs, 11 complete and 0 interrupted iterations
default   [   5% ] 06/70 VUs  0m03.0s/1m05.0s

running (0m04.0s), 08/70 VUs, 19 complete and 0 interrupted iterations
default   [   6% ] 08/70 VUs  0m04.0s/1m05.0s

running (0m05.0s), 10/70 VUs, 27 complete and 0 interrupted iterations
default   [   8% ] 10/70 VUs  0m05.0s/1m05.0s

running (0m06.0s), 12/70 VUs, 37 complete and 0 interrupted iterations
default   [   9% ] 12/70 VUs  0m06.0s/1m05.0s

running (0m07.0s), 14/70 VUs, 48 complete and 0 interrupted iterations
default   [  11% ] 14/70 VUs  0m07.0s/1m05.0s

running (0m08.0s), 16/70 VUs, 56 complete and 0 interrupted iterations
default   [  12% ] 16/70 VUs  0m08.0s/1m05.0s

running (0m09.0s), 18/70 VUs, 65 complete and 0 interrupted iterations
default   [  14% ] 18/70 VUs  0m09.0s/1m05.0s

running (0m10.0s), 20/70 VUs, 76 complete and 0 interrupted iterations
default   [  15% ] 20/70 VUs  0m10.0s/1m05.0s

running (0m11.0s), 22/70 VUs, 86 complete and 0 interrupted iterations
default   [  17% ] 22/70 VUs  0m11.0s/1m05.0s

running (0m12.0s), 24/70 VUs, 96 complete and 0 interrupted iterations
default   [  18% ] 24/70 VUs  0m12.0s/1m05.0s

running (0m13.0s), 26/70 VUs, 106 complete and 0 interrupted iterations
default   [  20% ] 26/70 VUs  0m13.0s/1m05.0s

running (0m14.0s), 28/70 VUs, 116 complete and 0 interrupted iterations
default   [  22% ] 28/70 VUs  0m14.0s/1m05.0s

running (0m15.0s), 30/70 VUs, 162 complete and 0 interrupted iterations
default   [  23% ] 30/70 VUs  0m15.0s/1m05.0s

running (0m16.0s), 32/70 VUs, 709 complete and 0 interrupted iterations
default   [  25% ] 32/70 VUs  0m16.0s/1m05.0s

running (0m17.0s), 34/70 VUs, 2809 complete and 0 interrupted iterations
default   [  26% ] 34/70 VUs  0m17.0s/1m05.0s

running (0m18.0s), 36/70 VUs, 5548 complete and 0 interrupted iterations
default   [  28% ] 36/70 VUs  0m18.0s/1m05.0s

running (0m19.0s), 38/70 VUs, 6021 complete and 0 interrupted iterations
default   [  29% ] 38/70 VUs  0m19.0s/1m05.0s

running (0m20.0s), 39/70 VUs, 7045 complete and 0 interrupted iterations
default   [  31% ] 39/70 VUs  0m20.0s/1m05.0s

running (0m21.0s), 40/70 VUs, 7066 complete and 0 interrupted iterations
default   [  32% ] 40/70 VUs  0m21.0s/1m05.0s

running (0m22.0s), 41/70 VUs, 7084 complete and 0 interrupted iterations
default   [  34% ] 41/70 VUs  0m22.0s/1m05.0s

running (0m23.0s), 42/70 VUs, 7109 complete and 0 interrupted iterations
default   [  35% ] 42/70 VUs  0m23.0s/1m05.0s

running (0m24.0s), 43/70 VUs, 7125 complete and 0 interrupted iterations
default   [  37% ] 43/70 VUs  0m24.0s/1m05.0s

running (0m25.0s), 44/70 VUs, 7151 complete and 0 interrupted iterations
default   [  38% ] 44/70 VUs  0m25.0s/1m05.0s

running (0m26.0s), 45/70 VUs, 7558 complete and 0 interrupted iterations
default   [  40% ] 45/70 VUs  0m26.0s/1m05.0s

running (0m27.0s), 45/70 VUs, 10107 complete and 0 interrupted iterations
default   [  42% ] 45/70 VUs  0m27.0s/1m05.0s

running (0m28.0s), 46/70 VUs, 10415 complete and 0 interrupted iterations
default   [  43% ] 46/70 VUs  0m28.0s/1m05.0s

running (0m29.0s), 47/70 VUs, 10415 complete and 0 interrupted iterations
default   [  45% ] 47/70 VUs  0m29.0s/1m05.0s

running (0m30.0s), 48/70 VUs, 10425 complete and 0 interrupted iterations
default   [  46% ] 48/70 VUs  0m30.0s/1m05.0s

running (0m31.0s), 49/70 VUs, 10433 complete and 0 interrupted iterations
default   [  48% ] 49/70 VUs  0m31.0s/1m05.0s

running (0m32.0s), 50/70 VUs, 10438 complete and 0 interrupted iterations
default   [  49% ] 50/70 VUs  0m32.0s/1m05.0s

running (0m33.0s), 51/70 VUs, 10447 complete and 0 interrupted iterations
default   [  51% ] 51/70 VUs  0m33.0s/1m05.0s

running (0m34.0s), 51/70 VUs, 10457 complete and 0 interrupted iterations
default   [  52% ] 51/70 VUs  0m34.0s/1m05.0s

running (0m35.0s), 52/70 VUs, 10470 complete and 0 interrupted iterations
default   [  54% ] 52/70 VUs  0m35.0s/1m05.0s

running (0m36.0s), 53/70 VUs, 10480 complete and 0 interrupted iterations
default   [  55% ] 53/70 VUs  0m36.0s/1m05.0s

running (0m37.0s), 54/70 VUs, 10494 complete and 0 interrupted iterations
default   [  57% ] 54/70 VUs  0m37.0s/1m05.0s

running (0m38.0s), 55/70 VUs, 10507 complete and 0 interrupted iterations
default   [  58% ] 55/70 VUs  0m38.0s/1m05.0s

running (0m39.0s), 56/70 VUs, 10521 complete and 0 interrupted iterations
default   [  60% ] 56/70 VUs  0m39.0s/1m05.0s

running (0m40.0s), 57/70 VUs, 10536 complete and 0 interrupted iterations
default   [  62% ] 57/70 VUs  0m40.0s/1m05.0s

running (0m41.0s), 57/70 VUs, 10550 complete and 0 interrupted iterations
default   [  63% ] 57/70 VUs  0m41.0s/1m05.0s

running (0m42.0s), 58/70 VUs, 10567 complete and 0 interrupted iterations
default   [  65% ] 58/70 VUs  0m42.0s/1m05.0s

running (0m43.0s), 59/70 VUs, 10578 complete and 0 interrupted iterations
default   [  66% ] 59/70 VUs  0m43.0s/1m05.0s

running (0m44.0s), 60/70 VUs, 10594 complete and 0 interrupted iterations
default   [  68% ] 60/70 VUs  0m44.0s/1m05.0s

running (0m45.0s), 61/70 VUs, 10611 complete and 0 interrupted iterations
default   [  69% ] 61/70 VUs  0m45.0s/1m05.0s

running (0m46.0s), 62/70 VUs, 10627 complete and 0 interrupted iterations
default   [  71% ] 62/70 VUs  0m46.0s/1m05.0s

running (0m47.0s), 63/70 VUs, 10645 complete and 0 interrupted iterations
default   [  72% ] 63/70 VUs  0m47.0s/1m05.0s

running (0m48.0s), 63/70 VUs, 10662 complete and 0 interrupted iterations
default   [  74% ] 63/70 VUs  0m48.0s/1m05.0s

running (0m49.0s), 64/70 VUs, 10677 complete and 0 interrupted iterations
default   [  75% ] 64/70 VUs  0m49.0s/1m05.0s

running (0m50.0s), 65/70 VUs, 10692 complete and 0 interrupted iterations
default   [  77% ] 65/70 VUs  0m50.0s/1m05.0s

running (0m51.0s), 66/70 VUs, 10711 complete and 0 interrupted iterations
default   [  78% ] 66/70 VUs  0m51.0s/1m05.0s

running (0m52.0s), 67/70 VUs, 10728 complete and 0 interrupted iterations
default   [  80% ] 67/70 VUs  0m52.0s/1m05.0s

running (0m53.0s), 68/70 VUs, 10746 complete and 0 interrupted iterations
default   [  82% ] 68/70 VUs  0m53.0s/1m05.0s

running (0m54.0s), 69/70 VUs, 10762 complete and 0 interrupted iterations
default   [  83% ] 69/70 VUs  0m54.0s/1m05.0s

running (0m55.0s), 69/70 VUs, 10779 complete and 0 interrupted iterations
default   [  85% ] 69/70 VUs  0m55.0s/1m05.0s

running (0m56.0s), 70/70 VUs, 10792 complete and 0 interrupted iterations
default   [  86% ] 70/70 VUs  0m56.0s/1m05.0s

running (0m57.0s), 68/70 VUs, 10811 complete and 0 interrupted iterations
default   [  88% ] 68/70 VUs  0m57.0s/1m05.0s

running (0m58.0s), 64/70 VUs, 10830 complete and 0 interrupted iterations
default   [  89% ] 64/70 VUs  0m58.0s/1m05.0s

running (0m59.0s), 57/70 VUs, 10847 complete and 0 interrupted iterations
default   [  91% ] 57/70 VUs  0m59.0s/1m05.0s

running (1m00.0s), 51/70 VUs, 10864 complete and 0 interrupted iterations
default   [  92% ] 51/70 VUs  1m00.0s/1m05.0s

running (1m01.0s), 44/70 VUs, 10879 complete and 0 interrupted iterations
default   [  94% ] 44/70 VUs  1m01.0s/1m05.0s

running (1m02.0s), 32/70 VUs, 10899 complete and 0 interrupted iterations
default   [  95% ] 32/70 VUs  1m02.0s/1m05.0s

running (1m03.0s), 23/70 VUs, 10917 complete and 0 interrupted iterations
default   [  97% ] 23/70 VUs  1m03.0s/1m05.0s

running (1m04.0s), 14/70 VUs, 10931 complete and 0 interrupted iterations
default   [  98% ] 14/70 VUs  1m04.0s/1m05.0s

running (1m05.0s), 01/70 VUs, 10950 complete and 0 interrupted iterations
default   [ 100% ] 01/70 VUs  1m05.0s/1m05.0s

running (1m05.0s), 00/70 VUs, 10951 complete and 0 interrupted iterations
default ✓ [ 100% ] 00/70 VUs  1m5s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 11613      ✗ 0   
     data_received..................: 8.8 MB  136 kB/s
     data_sent......................: 4.4 MB  68 kB/s
     http_req_blocked...............: avg=29.85µs  min=750ns   med=1.87µs  max=49.99ms p(90)=2.99µs  p(95)=5.07µs 
     http_req_connecting............: avg=5.42µs   min=0s      med=0s      max=19.52ms p(90)=0s      p(95)=0s     
   ✗ http_req_duration..............: avg=123.39ms min=1.08ms  med=3.92ms  max=4.86s   p(90)=13.63ms p(95)=1.02s  
       { expected_response:true }...: avg=1.4s     min=10.29ms med=1.32s   max=4.09s   p(90)=2.52s   p(95)=2.97s  
     http_req_failed................: 96.95%  ✓ 21234      ✗ 668 
     http_req_receiving.............: avg=47.85µs  min=8.75µs  med=25.39µs max=17.33ms p(90)=50.74µs p(95)=80.71µs
     http_req_sending...............: avg=36.89µs  min=4.22µs  med=10.75µs max=14.87ms p(90)=23.36µs p(95)=31.33µs
     http_req_tls_handshaking.......: avg=20.91µs  min=0s      med=0s      max=37.81ms p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=123.3ms  min=1.06ms  med=3.85ms  max=4.86s   p(90)=13.39ms p(95)=1.02s  
     http_reqs......................: 21902   336.841348/s
     iteration_duration.............: avg=247.15ms min=2.37ms  med=8.69ms  max=8.95s   p(90)=24.26ms p(95)=2.15s  
     iterations.....................: 10951   168.420674/s
     vus............................: 1       min=1        max=70
     vus_max........................: 70      min=70       max=70

```
