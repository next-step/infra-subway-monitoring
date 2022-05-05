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

   function 내정보수정(token) {
	
	let addHeaders = {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}

	let obj = JSON.stringify({
	    age: 31,
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
     script: ./stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 700 max VUs, 1m40s max duration (incl. graceful stop):
           * default: Up to 700 looping VUs for 1m10s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.6s), 006/700 VUs, 345 complete and 0 interrupted iterations
default   [   1% ] 006/700 VUs  0m00.6s/1m10.0s

running (0m01.6s), 016/700 VUs, 1864 complete and 0 interrupted iterations
default   [   2% ] 016/700 VUs  0m01.6s/1m10.0s

running (0m02.6s), 026/700 VUs, 1867 complete and 0 interrupted iterations
default   [   4% ] 026/700 VUs  0m02.6s/1m10.0s

running (0m03.6s), 036/700 VUs, 2593 complete and 0 interrupted iterations
default   [   5% ] 036/700 VUs  0m03.6s/1m10.0s

running (0m04.6s), 046/700 VUs, 2619 complete and 0 interrupted iterations
default   [   7% ] 046/700 VUs  0m04.6s/1m10.0s

running (0m05.6s), 056/700 VUs, 3052 complete and 0 interrupted iterations
default   [   8% ] 056/700 VUs  0m05.6s/1m10.0s

running (0m06.6s), 066/700 VUs, 3364 complete and 0 interrupted iterations
default   [   9% ] 066/700 VUs  0m06.6s/1m10.0s

running (0m07.6s), 076/700 VUs, 3787 complete and 0 interrupted iterations
default   [  11% ] 076/700 VUs  0m07.6s/1m10.0s

running (0m08.6s), 085/700 VUs, 4134 complete and 0 interrupted iterations
default   [  12% ] 085/700 VUs  0m08.6s/1m10.0s

running (0m09.6s), 095/700 VUs, 4467 complete and 0 interrupted iterations
default   [  14% ] 095/700 VUs  0m09.6s/1m10.0s

running (0m10.6s), 105/700 VUs, 4874 complete and 0 interrupted iterations
default   [  15% ] 105/700 VUs  0m10.6s/1m10.0s

running (0m11.6s), 115/700 VUs, 5141 complete and 0 interrupted iterations
default   [  17% ] 115/700 VUs  0m11.6s/1m10.0s

running (0m12.6s), 125/700 VUs, 5640 complete and 0 interrupted iterations
default   [  18% ] 125/700 VUs  0m12.6s/1m10.0s

running (0m13.6s), 135/700 VUs, 5640 complete and 0 interrupted iterations
default   [  19% ] 135/700 VUs  0m13.6s/1m10.0s

running (0m14.6s), 145/700 VUs, 5756 complete and 0 interrupted iterations
default   [  21% ] 145/700 VUs  0m14.6s/1m10.0s

running (0m15.6s), 155/700 VUs, 5832 complete and 0 interrupted iterations
default   [  22% ] 155/700 VUs  0m15.6s/1m10.0s

running (0m16.6s), 165/700 VUs, 5939 complete and 0 interrupted iterations
default   [  24% ] 165/700 VUs  0m16.6s/1m10.0s

running (0m17.6s), 175/700 VUs, 6024 complete and 0 interrupted iterations
default   [  25% ] 175/700 VUs  0m17.6s/1m10.0s

running (0m18.6s), 185/700 VUs, 6176 complete and 0 interrupted iterations
default   [  27% ] 185/700 VUs  0m18.6s/1m10.0s

running (0m19.6s), 195/700 VUs, 6287 complete and 0 interrupted iterations
default   [  28% ] 195/700 VUs  0m19.6s/1m10.0s

running (0m20.6s), 205/700 VUs, 6390 complete and 0 interrupted iterations
default   [  29% ] 205/700 VUs  0m20.6s/1m10.0s

running (0m21.6s), 215/700 VUs, 6524 complete and 0 interrupted iterations
default   [  31% ] 215/700 VUs  0m21.6s/1m10.0s

running (0m22.6s), 225/700 VUs, 6623 complete and 0 interrupted iterations
default   [  32% ] 225/700 VUs  0m22.6s/1m10.0s

running (0m23.6s), 235/700 VUs, 6792 complete and 0 interrupted iterations
default   [  34% ] 235/700 VUs  0m23.6s/1m10.0s

running (0m24.6s), 245/700 VUs, 6983 complete and 0 interrupted iterations
default   [  35% ] 245/700 VUs  0m24.6s/1m10.0s

running (0m25.6s), 255/700 VUs, 7636 complete and 0 interrupted iterations
default   [  37% ] 255/700 VUs  0m25.6s/1m10.0s

running (0m26.6s), 265/700 VUs, 8441 complete and 0 interrupted iterations
default   [  38% ] 265/700 VUs  0m26.6s/1m10.0s

running (0m27.6s), 275/700 VUs, 9238 complete and 0 interrupted iterations
default   [  39% ] 275/700 VUs  0m27.6s/1m10.0s

running (0m28.6s), 285/700 VUs, 9981 complete and 0 interrupted iterations
default   [  41% ] 285/700 VUs  0m28.6s/1m10.0s

running (0m29.6s), 295/700 VUs, 10986 complete and 0 interrupted iterations
default   [  42% ] 295/700 VUs  0m29.6s/1m10.0s

running (0m30.6s), 305/700 VUs, 12029 complete and 0 interrupted iterations
default   [  44% ] 305/700 VUs  0m30.6s/1m10.0s

running (0m31.6s), 315/700 VUs, 13059 complete and 0 interrupted iterations
default   [  45% ] 315/700 VUs  0m31.6s/1m10.0s

running (0m32.6s), 325/700 VUs, 14386 complete and 0 interrupted iterations
default   [  47% ] 325/700 VUs  0m32.6s/1m10.0s

running (0m33.6s), 335/700 VUs, 15131 complete and 0 interrupted iterations
default   [  48% ] 335/700 VUs  0m33.6s/1m10.0s

running (0m34.6s), 345/700 VUs, 16203 complete and 0 interrupted iterations
default   [  49% ] 345/700 VUs  0m34.6s/1m10.0s

running (0m35.6s), 355/700 VUs, 17360 complete and 0 interrupted iterations
default   [  51% ] 355/700 VUs  0m35.6s/1m10.0s

running (0m36.6s), 365/700 VUs, 18904 complete and 0 interrupted iterations
default   [  52% ] 365/700 VUs  0m36.6s/1m10.0s

running (0m37.6s), 375/700 VUs, 19783 complete and 0 interrupted iterations
default   [  54% ] 375/700 VUs  0m37.6s/1m10.0s

running (0m38.6s), 385/700 VUs, 20581 complete and 0 interrupted iterations
default   [  55% ] 385/700 VUs  0m38.6s/1m10.0s

running (0m39.6s), 395/700 VUs, 21701 complete and 0 interrupted iterations
default   [  57% ] 395/700 VUs  0m39.6s/1m10.0s

running (0m40.6s), 405/700 VUs, 22465 complete and 0 interrupted iterations
default   [  58% ] 405/700 VUs  0m40.6s/1m10.0s

running (0m41.6s), 415/700 VUs, 23868 complete and 0 interrupted iterations
default   [  59% ] 415/700 VUs  0m41.6s/1m10.0s

running (0m42.6s), 425/700 VUs, 25308 complete and 0 interrupted iterations
default   [  61% ] 425/700 VUs  0m42.6s/1m10.0s

running (0m43.6s), 435/700 VUs, 27549 complete and 0 interrupted iterations
default   [  62% ] 435/700 VUs  0m43.6s/1m10.0s

running (0m44.6s), 445/700 VUs, 28580 complete and 0 interrupted iterations
default   [  64% ] 445/700 VUs  0m44.6s/1m10.0s

running (0m45.6s), 455/700 VUs, 29996 complete and 0 interrupted iterations
default   [  65% ] 455/700 VUs  0m45.6s/1m10.0s

running (0m46.6s), 465/700 VUs, 31113 complete and 0 interrupted iterations
default   [  67% ] 465/700 VUs  0m46.6s/1m10.0s

running (0m47.6s), 475/700 VUs, 33251 complete and 0 interrupted iterations
default   [  68% ] 475/700 VUs  0m47.6s/1m10.0s

running (0m48.6s), 485/700 VUs, 34927 complete and 0 interrupted iterations
default   [  69% ] 485/700 VUs  0m48.6s/1m10.0s

running (0m49.6s), 495/700 VUs, 36569 complete and 0 interrupted iterations
default   [  71% ] 495/700 VUs  0m49.6s/1m10.0s

running (0m50.6s), 505/700 VUs, 38349 complete and 0 interrupted iterations
default   [  72% ] 505/700 VUs  0m50.6s/1m10.0s

running (0m51.6s), 515/700 VUs, 39591 complete and 0 interrupted iterations
default   [  74% ] 515/700 VUs  0m51.6s/1m10.0s

running (0m52.6s), 525/700 VUs, 41040 complete and 0 interrupted iterations
default   [  75% ] 525/700 VUs  0m52.6s/1m10.0s

running (0m53.6s), 535/700 VUs, 42069 complete and 0 interrupted iterations
default   [  77% ] 535/700 VUs  0m53.6s/1m10.0s

running (0m54.6s), 545/700 VUs, 43435 complete and 0 interrupted iterations
default   [  78% ] 545/700 VUs  0m54.6s/1m10.0s

running (0m55.6s), 555/700 VUs, 44412 complete and 0 interrupted iterations
default   [  79% ] 555/700 VUs  0m55.6s/1m10.0s

running (0m56.6s), 565/700 VUs, 46006 complete and 0 interrupted iterations
default   [  81% ] 565/700 VUs  0m56.6s/1m10.0s

running (0m57.6s), 575/700 VUs, 47052 complete and 0 interrupted iterations
default   [  82% ] 575/700 VUs  0m57.6s/1m10.0s

running (0m58.6s), 585/700 VUs, 48158 complete and 0 interrupted iterations
default   [  84% ] 585/700 VUs  0m58.6s/1m10.0s

running (0m59.6s), 595/700 VUs, 49435 complete and 0 interrupted iterations
default   [  85% ] 595/700 VUs  0m59.6s/1m10.0s

running (1m00.6s), 605/700 VUs, 50485 complete and 0 interrupted iterations
default   [  87% ] 605/700 VUs  1m00.6s/1m10.0s

running (1m01.6s), 615/700 VUs, 52618 complete and 0 interrupted iterations
default   [  88% ] 615/700 VUs  1m01.6s/1m10.0s

running (1m02.6s), 625/700 VUs, 55320 complete and 0 interrupted iterations
default   [  89% ] 625/700 VUs  1m02.6s/1m10.0s

running (1m03.6s), 635/700 VUs, 56312 complete and 0 interrupted iterations
default   [  91% ] 635/700 VUs  1m03.6s/1m10.0s

running (1m04.6s), 645/700 VUs, 58861 complete and 0 interrupted iterations
default   [  92% ] 645/700 VUs  1m04.6s/1m10.0s

running (1m05.6s), 655/700 VUs, 59429 complete and 0 interrupted iterations
default   [  94% ] 655/700 VUs  1m05.6s/1m10.0s

running (1m06.6s), 665/700 VUs, 61314 complete and 0 interrupted iterations
default   [  95% ] 665/700 VUs  1m06.6s/1m10.0s

running (1m07.6s), 675/700 VUs, 62725 complete and 0 interrupted iterations
default   [  97% ] 675/700 VUs  1m07.6s/1m10.0s

running (1m08.6s), 685/700 VUs, 63716 complete and 0 interrupted iterations
default   [  98% ] 685/700 VUs  1m08.6s/1m10.0s

running (1m09.6s), 695/700 VUs, 65075 complete and 0 interrupted iterations
default   [  99% ] 695/700 VUs  1m09.6s/1m10.0s

running (1m10.6s), 213/700 VUs, 65975 complete and 0 interrupted iterations
default ↓ [ 100% ] 395/700 VUs  1m10s

running (1m11.6s), 024/700 VUs, 66164 complete and 0 interrupted iterations
default ↓ [ 100% ] 395/700 VUs  1m10s

running (1m11.6s), 000/700 VUs, 66188 complete and 0 interrupted iterations
default ↓ [ 100% ] 395/700 VUs  1m10s

     ✗ logged in successfully
      ↳  18% — ✓ 12449 / ✗ 53739
     ✓ retrieved member

     checks.........................: 23.28% ✓ 16312       ✗ 53739
     data_received..................: 82 MB  1.2 MB/s
     data_sent......................: 27 MB  371 kB/s
     http_req_blocked...............: avg=52.77ms  min=0s       med=0s       max=1.04s    p(90)=213.3ms  p(95)=380.5ms 
     http_req_connecting............: avg=46ms     min=0s       med=14.54ms  max=1.06s    p(90)=146.84ms p(95)=187.43ms
   ✗ http_req_duration..............: avg=161.09ms min=0s       med=0s       max=5.61s    p(90)=823.77ms p(95)=1.21s   
       { expected_response:true }...: avg=1.1s     min=35.65ms  med=1.06s    max=5.61s    p(90)=1.65s    p(95)=1.92s   
     http_req_failed................: 91.40% ✓ 71880       ✗ 6757 
     http_req_receiving.............: avg=1.03ms   min=0s       med=0s       max=174.6ms  p(90)=40.14µs  p(95)=68.42µs 
     http_req_sending...............: avg=558.38µs min=0s       med=0s       max=175.86ms p(90)=96.76µs  p(95)=957.76µs
     http_req_tls_handshaking.......: avg=45.26ms  min=0s       med=0s       max=1.02s    p(90)=197.23ms p(95)=305.72ms
     http_req_waiting...............: avg=159.5ms  min=0s       med=0s       max=5.61s    p(90)=815.83ms p(95)=1.2s    
     http_reqs......................: 78637  1097.967554/s
     iteration_duration.............: avg=368.41ms min=279.77µs med=143.45ms max=7.15s    p(90)=1.14s    p(95)=1.92s   
     iterations.....................: 66188  924.148638/s
     vus............................: 69     min=10        max=689
     vus_max........................: 700    min=700       max=700

```
