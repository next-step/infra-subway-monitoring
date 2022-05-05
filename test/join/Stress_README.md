## 스크립트
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
  ],
  thresholds: {
    http_req_duration: ['p(99)<1000'],
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
     script: ./stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 700 max VUs, 1m40s max duration (incl. graceful stop):
           * default: Up to 700 looping VUs for 1m10s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.5s), 006/700 VUs, 0 complete and 0 interrupted iterations
default   [   1% ] 006/700 VUs  0m00.5s/1m10.0s

running (0m01.5s), 016/700 VUs, 0 complete and 0 interrupted iterations
default   [   2% ] 016/700 VUs  0m01.5s/1m10.0s

running (0m02.5s), 025/700 VUs, 0 complete and 0 interrupted iterations
default   [   4% ] 025/700 VUs  0m02.5s/1m10.0s

running (0m03.5s), 035/700 VUs, 10 complete and 0 interrupted iterations
default   [   5% ] 035/700 VUs  0m03.5s/1m10.0s

running (0m04.5s), 045/700 VUs, 17 complete and 0 interrupted iterations
default   [   6% ] 045/700 VUs  0m04.5s/1m10.0s

running (0m05.5s), 055/700 VUs, 24 complete and 0 interrupted iterations
default   [   8% ] 055/700 VUs  0m05.5s/1m10.0s

running (0m06.5s), 065/700 VUs, 32 complete and 0 interrupted iterations
default   [   9% ] 065/700 VUs  0m06.5s/1m10.0s

running (0m07.5s), 075/700 VUs, 42 complete and 0 interrupted iterations
default   [  11% ] 075/700 VUs  0m07.5s/1m10.0s

running (0m08.5s), 085/700 VUs, 53 complete and 0 interrupted iterations
default   [  12% ] 085/700 VUs  0m08.5s/1m10.0s

running (0m09.5s), 095/700 VUs, 66 complete and 0 interrupted iterations
default   [  14% ] 095/700 VUs  0m09.5s/1m10.0s

running (0m10.5s), 105/700 VUs, 76 complete and 0 interrupted iterations
default   [  15% ] 105/700 VUs  0m10.5s/1m10.0s

running (0m11.5s), 115/700 VUs, 89 complete and 0 interrupted iterations
default   [  16% ] 115/700 VUs  0m11.5s/1m10.0s

running (0m12.5s), 125/700 VUs, 99 complete and 0 interrupted iterations
default   [  18% ] 125/700 VUs  0m12.5s/1m10.0s

running (0m13.5s), 135/700 VUs, 112 complete and 0 interrupted iterations
default   [  19% ] 135/700 VUs  0m13.5s/1m10.0s

running (0m14.5s), 145/700 VUs, 127 complete and 0 interrupted iterations
default   [  21% ] 145/700 VUs  0m14.5s/1m10.0s

running (0m15.5s), 155/700 VUs, 140 complete and 0 interrupted iterations
default   [  22% ] 155/700 VUs  0m15.5s/1m10.0s

running (0m16.5s), 165/700 VUs, 153 complete and 0 interrupted iterations
default   [  24% ] 165/700 VUs  0m16.5s/1m10.0s

running (0m17.5s), 175/700 VUs, 166 complete and 0 interrupted iterations
default   [  25% ] 175/700 VUs  0m17.5s/1m10.0s

running (0m18.5s), 185/700 VUs, 178 complete and 0 interrupted iterations
default   [  26% ] 185/700 VUs  0m18.5s/1m10.0s

running (0m19.5s), 195/700 VUs, 190 complete and 0 interrupted iterations
default   [  28% ] 195/700 VUs  0m19.5s/1m10.0s

running (0m20.5s), 205/700 VUs, 206 complete and 0 interrupted iterations
default   [  29% ] 205/700 VUs  0m20.5s/1m10.0s

running (0m21.5s), 215/700 VUs, 221 complete and 0 interrupted iterations
default   [  31% ] 215/700 VUs  0m21.5s/1m10.0s

running (0m22.5s), 225/700 VUs, 234 complete and 0 interrupted iterations
default   [  32% ] 225/700 VUs  0m22.5s/1m10.0s

running (0m23.5s), 235/700 VUs, 246 complete and 0 interrupted iterations
default   [  34% ] 235/700 VUs  0m23.5s/1m10.0s

running (0m24.5s), 245/700 VUs, 260 complete and 0 interrupted iterations
default   [  35% ] 245/700 VUs  0m24.5s/1m10.0s

running (0m25.5s), 255/700 VUs, 275 complete and 0 interrupted iterations
default   [  36% ] 255/700 VUs  0m25.5s/1m10.0s

running (0m26.5s), 265/700 VUs, 881 complete and 0 interrupted iterations
default   [  38% ] 265/700 VUs  0m26.5s/1m10.0s

running (0m27.5s), 275/700 VUs, 2085 complete and 0 interrupted iterations
default   [  39% ] 275/700 VUs  0m27.5s/1m10.0s

running (0m28.5s), 285/700 VUs, 3581 complete and 0 interrupted iterations
default   [  41% ] 285/700 VUs  0m28.5s/1m10.0s

running (0m29.5s), 295/700 VUs, 3762 complete and 0 interrupted iterations
default   [  42% ] 295/700 VUs  0m29.5s/1m10.0s

running (0m30.5s), 305/700 VUs, 5340 complete and 0 interrupted iterations
default   [  44% ] 305/700 VUs  0m30.5s/1m10.0s

running (0m31.5s), 315/700 VUs, 6276 complete and 0 interrupted iterations
default   [  45% ] 315/700 VUs  0m31.5s/1m10.0s

running (0m32.5s), 325/700 VUs, 8120 complete and 0 interrupted iterations
default   [  46% ] 325/700 VUs  0m32.5s/1m10.0s

running (0m33.5s), 335/700 VUs, 9507 complete and 0 interrupted iterations
default   [  48% ] 335/700 VUs  0m33.5s/1m10.0s

running (0m34.5s), 345/700 VUs, 11284 complete and 0 interrupted iterations
default   [  49% ] 345/700 VUs  0m34.5s/1m10.0s

running (0m35.5s), 355/700 VUs, 11716 complete and 0 interrupted iterations
default   [  51% ] 355/700 VUs  0m35.5s/1m10.0s

running (0m36.5s), 365/700 VUs, 12982 complete and 0 interrupted iterations
default   [  52% ] 365/700 VUs  0m36.5s/1m10.0s

running (0m37.5s), 375/700 VUs, 14129 complete and 0 interrupted iterations
default   [  54% ] 375/700 VUs  0m37.5s/1m10.0s

running (0m38.5s), 385/700 VUs, 14982 complete and 0 interrupted iterations
default   [  55% ] 385/700 VUs  0m38.5s/1m10.0s

running (0m39.6s), 396/700 VUs, 14983 complete and 0 interrupted iterations
default   [  57% ] 396/700 VUs  0m39.6s/1m10.0s

running (0m40.5s), 405/700 VUs, 16335 complete and 0 interrupted iterations
default   [  58% ] 405/700 VUs  0m40.5s/1m10.0s

running (0m41.5s), 415/700 VUs, 18700 complete and 0 interrupted iterations
default   [  59% ] 415/700 VUs  0m41.5s/1m10.0s

running (0m42.5s), 425/700 VUs, 20270 complete and 0 interrupted iterations
default   [  61% ] 425/700 VUs  0m42.5s/1m10.0s

running (0m43.5s), 435/700 VUs, 21221 complete and 0 interrupted iterations
default   [  62% ] 435/700 VUs  0m43.5s/1m10.0s

running (0m44.5s), 445/700 VUs, 23073 complete and 0 interrupted iterations
default   [  64% ] 445/700 VUs  0m44.5s/1m10.0s

running (0m45.5s), 455/700 VUs, 23629 complete and 0 interrupted iterations
default   [  65% ] 455/700 VUs  0m45.5s/1m10.0s

running (0m46.5s), 465/700 VUs, 26216 complete and 0 interrupted iterations
default   [  66% ] 465/700 VUs  0m46.5s/1m10.0s

running (0m47.5s), 475/700 VUs, 26759 complete and 0 interrupted iterations
default   [  68% ] 475/700 VUs  0m47.5s/1m10.0s

running (0m48.5s), 485/700 VUs, 28265 complete and 0 interrupted iterations
default   [  69% ] 485/700 VUs  0m48.5s/1m10.0s

running (0m49.5s), 495/700 VUs, 28858 complete and 0 interrupted iterations
default   [  71% ] 495/700 VUs  0m49.5s/1m10.0s

running (0m50.5s), 505/700 VUs, 29964 complete and 0 interrupted iterations
default   [  72% ] 505/700 VUs  0m50.5s/1m10.0s

running (0m51.5s), 515/700 VUs, 30448 complete and 0 interrupted iterations
default   [  74% ] 515/700 VUs  0m51.5s/1m10.0s

running (0m52.5s), 525/700 VUs, 31339 complete and 0 interrupted iterations
default   [  75% ] 525/700 VUs  0m52.5s/1m10.0s

running (0m53.5s), 535/700 VUs, 32692 complete and 0 interrupted iterations
default   [  76% ] 535/700 VUs  0m53.5s/1m10.0s

running (0m54.5s), 545/700 VUs, 33979 complete and 0 interrupted iterations
default   [  78% ] 545/700 VUs  0m54.5s/1m10.0s

running (0m55.5s), 555/700 VUs, 34207 complete and 0 interrupted iterations
default   [  79% ] 555/700 VUs  0m55.5s/1m10.0s

running (0m56.5s), 565/700 VUs, 35325 complete and 0 interrupted iterations
default   [  81% ] 565/700 VUs  0m56.5s/1m10.0s

running (0m57.5s), 575/700 VUs, 36555 complete and 0 interrupted iterations
default   [  82% ] 575/700 VUs  0m57.5s/1m10.0s

running (0m58.5s), 585/700 VUs, 36724 complete and 0 interrupted iterations
default   [  84% ] 585/700 VUs  0m58.5s/1m10.0s

running (0m59.6s), 596/700 VUs, 38552 complete and 0 interrupted iterations
default   [  85% ] 596/700 VUs  0m59.6s/1m10.0s

running (1m00.5s), 605/700 VUs, 39674 complete and 0 interrupted iterations
default   [  86% ] 605/700 VUs  1m00.5s/1m10.0s

running (1m01.5s), 615/700 VUs, 40450 complete and 0 interrupted iterations
default   [  88% ] 615/700 VUs  1m01.5s/1m10.0s

running (1m02.5s), 625/700 VUs, 41587 complete and 0 interrupted iterations
default   [  89% ] 625/700 VUs  1m02.5s/1m10.0s

running (1m03.5s), 635/700 VUs, 41623 complete and 0 interrupted iterations
default   [  91% ] 635/700 VUs  1m03.5s/1m10.0s

running (1m04.5s), 645/700 VUs, 43161 complete and 0 interrupted iterations
default   [  92% ] 645/700 VUs  1m04.5s/1m10.0s

running (1m05.5s), 655/700 VUs, 44702 complete and 0 interrupted iterations
default   [  94% ] 655/700 VUs  1m05.5s/1m10.0s

running (1m06.5s), 665/700 VUs, 45080 complete and 0 interrupted iterations
default   [  95% ] 665/700 VUs  1m06.5s/1m10.0s

running (1m07.9s), 678/700 VUs, 45099 complete and 0 interrupted iterations
default   [  97% ] 678/700 VUs  1m07.9s/1m10.0s

running (1m08.5s), 685/700 VUs, 46663 complete and 0 interrupted iterations
default   [  98% ] 685/700 VUs  1m08.5s/1m10.0s

running (1m09.5s), 695/700 VUs, 47269 complete and 0 interrupted iterations
default   [  99% ] 695/700 VUs  1m09.5s/1m10.0s

running (1m10.5s), 231/700 VUs, 48256 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m11.5s), 215/700 VUs, 48272 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m12.5s), 200/700 VUs, 48287 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m13.5s), 179/700 VUs, 48308 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m14.5s), 167/700 VUs, 48320 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m15.5s), 149/700 VUs, 48338 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m16.5s), 129/700 VUs, 48358 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m17.5s), 111/700 VUs, 48376 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m18.5s), 088/700 VUs, 48399 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m19.5s), 068/700 VUs, 48419 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m20.5s), 050/700 VUs, 48437 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m21.5s), 036/700 VUs, 48451 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m22.5s), 021/700 VUs, 48466 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m23.5s), 010/700 VUs, 48477 complete and 0 interrupted iterations
default ↓ [ 100% ] 700/700 VUs  1m10s

running (1m23.8s), 000/700 VUs, 48487 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/700 VUs  1m10s

     ✗ logged in successfully
      ↳  40% — ✓ 19610 / ✗ 28877
     ✓ retrieved member

     checks.........................: 41.33% ✓ 20349      ✗ 28877
     data_received..................: 37 MB  443 kB/s
     data_sent......................: 18 MB  210 kB/s
     http_req_blocked...............: avg=11.98ms  min=0s       med=1.77µs   max=804.41ms p(90)=4.48µs   p(95)=26.3ms  
     http_req_connecting............: avg=19.52ms  min=0s       med=0s       max=271.21ms p(90)=70.77ms  p(95)=97.18ms 
   ✗ http_req_duration..............: avg=219.41ms min=0s       med=13.99ms  max=16.48s   p(90)=97.98ms  p(95)=201.87ms
       { expected_response:true }...: avg=5.84s    min=31.63ms  med=4.94s    max=16.48s   p(90)=10.25s   p(95)=11.09s  
     http_req_failed................: 98.27% ✓ 66924      ✗ 1173 
     http_req_receiving.............: avg=301.74µs min=0s       med=21.83µs  max=175.98ms p(90)=41.9µs   p(95)=69.39µs 
     http_req_sending...............: avg=1.89ms   min=0s       med=9.42µs   max=758.52ms p(90)=26.81µs  p(95)=92.31µs 
     http_req_tls_handshaking.......: avg=9.22ms   min=0s       med=0s       max=795.23ms p(90)=0s       p(95)=15.08ms 
     http_req_waiting...............: avg=217.22ms min=0s       med=13.55ms  max=16.48s   p(90)=90.38ms  p(95)=175.95ms
     http_reqs......................: 68097  812.519044/s
     iteration_duration.............: avg=464.11ms min=487.37µs med=101.43ms max=22.72s   p(90)=712.69ms p(95)=1.65s   
     iterations.....................: 48487  578.536659/s
     vus............................: 15     min=10       max=699
     vus_max........................: 700    min=700      max=700

```
