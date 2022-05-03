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
    http_req_duration: ['p(99)<1500'],
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
	   'Content-Type': 'application/json',
	 },
      }
      
      let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
     
      check(loginRes, {
         'logged in successfully': (resp) => resp.json('') !== '',
      });
      return loginRes;
   }

   function 내정보조회(token) {
      let addHeaders = {
         headers: {
	    Authorization: `Bearer ${token}`,
	 }
      };
      
      let myObjects = http.get(`${BASE_URL}/members/me`, addHeaders).json();
      check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
   }
   
   let token = 로그인().json('accessToken');
   내정보조회(token);
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
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m35s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m01.0s), 02/70 VUs, 6 complete and 0 interrupted iterations
default   [   1% ] 02/70 VUs  0m01.0s/1m05.0s

running (0m02.0s), 04/70 VUs, 82 complete and 0 interrupted iterations
default   [   3% ] 04/70 VUs  0m02.0s/1m05.0s

running (0m03.0s), 06/70 VUs, 200 complete and 0 interrupted iterations
default   [   5% ] 06/70 VUs  0m03.0s/1m05.0s

running (0m04.0s), 08/70 VUs, 338 complete and 0 interrupted iterations
default   [   6% ] 08/70 VUs  0m04.0s/1m05.0s

running (0m05.0s), 10/70 VUs, 490 complete and 0 interrupted iterations
default   [   8% ] 10/70 VUs  0m05.0s/1m05.0s

running (0m06.0s), 12/70 VUs, 652 complete and 0 interrupted iterations
default   [   9% ] 12/70 VUs  0m06.0s/1m05.0s

running (0m07.0s), 14/70 VUs, 833 complete and 0 interrupted iterations
default   [  11% ] 14/70 VUs  0m07.0s/1m05.0s

running (0m08.0s), 16/70 VUs, 1014 complete and 0 interrupted iterations
default   [  12% ] 16/70 VUs  0m08.0s/1m05.0s

running (0m09.0s), 18/70 VUs, 1212 complete and 0 interrupted iterations
default   [  14% ] 18/70 VUs  0m09.0s/1m05.0s

running (0m10.0s), 20/70 VUs, 1416 complete and 0 interrupted iterations
default   [  15% ] 20/70 VUs  0m10.0s/1m05.0s

running (0m11.0s), 22/70 VUs, 1636 complete and 0 interrupted iterations
default   [  17% ] 22/70 VUs  0m11.0s/1m05.0s

running (0m12.0s), 24/70 VUs, 1859 complete and 0 interrupted iterations
default   [  18% ] 24/70 VUs  0m12.0s/1m05.0s

running (0m13.0s), 26/70 VUs, 2085 complete and 0 interrupted iterations
default   [  20% ] 26/70 VUs  0m13.0s/1m05.0s

running (0m14.0s), 28/70 VUs, 2316 complete and 0 interrupted iterations
default   [  21% ] 28/70 VUs  0m14.0s/1m05.0s

running (0m15.0s), 30/70 VUs, 2545 complete and 0 interrupted iterations
default   [  23% ] 30/70 VUs  0m15.0s/1m05.0s

running (0m16.0s), 32/70 VUs, 2773 complete and 0 interrupted iterations
default   [  25% ] 32/70 VUs  0m16.0s/1m05.0s

running (0m17.0s), 34/70 VUs, 3001 complete and 0 interrupted iterations
default   [  26% ] 34/70 VUs  0m17.0s/1m05.0s

running (0m18.0s), 36/70 VUs, 3247 complete and 0 interrupted iterations
default   [  28% ] 36/70 VUs  0m18.0s/1m05.0s

running (0m19.0s), 37/70 VUs, 3490 complete and 0 interrupted iterations
default   [  29% ] 37/70 VUs  0m19.0s/1m05.0s

running (0m20.0s), 39/70 VUs, 3728 complete and 0 interrupted iterations
default   [  31% ] 39/70 VUs  0m20.0s/1m05.0s

running (0m21.0s), 40/70 VUs, 3982 complete and 0 interrupted iterations
default   [  32% ] 40/70 VUs  0m21.0s/1m05.0s

running (0m22.0s), 41/70 VUs, 4238 complete and 0 interrupted iterations
default   [  34% ] 41/70 VUs  0m22.0s/1m05.0s

running (0m23.0s), 42/70 VUs, 4498 complete and 0 interrupted iterations
default   [  35% ] 42/70 VUs  0m23.0s/1m05.0s

running (0m24.0s), 43/70 VUs, 4752 complete and 0 interrupted iterations
default   [  37% ] 43/70 VUs  0m24.0s/1m05.0s

running (0m25.0s), 44/70 VUs, 5017 complete and 0 interrupted iterations
default   [  38% ] 44/70 VUs  0m25.0s/1m05.0s

running (0m26.0s), 45/70 VUs, 5281 complete and 0 interrupted iterations
default   [  40% ] 45/70 VUs  0m26.0s/1m05.0s

running (0m27.0s), 45/70 VUs, 5553 complete and 0 interrupted iterations
default   [  41% ] 45/70 VUs  0m27.0s/1m05.0s

running (0m28.0s), 46/70 VUs, 5838 complete and 0 interrupted iterations
default   [  43% ] 46/70 VUs  0m28.0s/1m05.0s

running (0m29.0s), 47/70 VUs, 6107 complete and 0 interrupted iterations
default   [  45% ] 47/70 VUs  0m29.0s/1m05.0s

running (0m30.0s), 48/70 VUs, 6391 complete and 0 interrupted iterations
default   [  46% ] 48/70 VUs  0m30.0s/1m05.0s

running (0m31.0s), 49/70 VUs, 6669 complete and 0 interrupted iterations
default   [  48% ] 49/70 VUs  0m31.0s/1m05.0s

running (0m32.0s), 50/70 VUs, 6959 complete and 0 interrupted iterations
default   [  49% ] 50/70 VUs  0m32.0s/1m05.0s

running (0m33.0s), 51/70 VUs, 7237 complete and 0 interrupted iterations
default   [  51% ] 51/70 VUs  0m33.0s/1m05.0s

running (0m34.0s), 51/70 VUs, 7528 complete and 0 interrupted iterations
default   [  52% ] 51/70 VUs  0m34.0s/1m05.0s

running (0m35.0s), 52/70 VUs, 7823 complete and 0 interrupted iterations
default   [  54% ] 52/70 VUs  0m35.0s/1m05.0s

running (0m36.0s), 53/70 VUs, 8123 complete and 0 interrupted iterations
default   [  55% ] 53/70 VUs  0m36.0s/1m05.0s

running (0m37.0s), 54/70 VUs, 8428 complete and 0 interrupted iterations
default   [  57% ] 54/70 VUs  0m37.0s/1m05.0s

running (0m38.0s), 55/70 VUs, 8730 complete and 0 interrupted iterations
default   [  58% ] 55/70 VUs  0m38.0s/1m05.0s

running (0m39.0s), 56/70 VUs, 9038 complete and 0 interrupted iterations
default   [  60% ] 56/70 VUs  0m39.0s/1m05.0s

running (0m40.0s), 57/70 VUs, 9347 complete and 0 interrupted iterations
default   [  61% ] 57/70 VUs  0m40.0s/1m05.0s

running (0m41.0s), 57/70 VUs, 9652 complete and 0 interrupted iterations
default   [  63% ] 57/70 VUs  0m41.0s/1m05.0s

running (0m42.0s), 58/70 VUs, 9964 complete and 0 interrupted iterations
default   [  65% ] 58/70 VUs  0m42.0s/1m05.0s

running (0m43.0s), 59/70 VUs, 10263 complete and 0 interrupted iterations
default   [  66% ] 59/70 VUs  0m43.0s/1m05.0s

running (0m44.0s), 60/70 VUs, 10554 complete and 0 interrupted iterations
default   [  68% ] 60/70 VUs  0m44.0s/1m05.0s

running (0m45.0s), 61/70 VUs, 10869 complete and 0 interrupted iterations
default   [  69% ] 61/70 VUs  0m45.0s/1m05.0s

running (0m46.0s), 62/70 VUs, 11187 complete and 0 interrupted iterations
default   [  71% ] 62/70 VUs  0m46.0s/1m05.0s

running (0m47.0s), 63/70 VUs, 11504 complete and 0 interrupted iterations
default   [  72% ] 63/70 VUs  0m47.0s/1m05.0s

running (0m48.0s), 63/70 VUs, 11831 complete and 0 interrupted iterations
default   [  74% ] 63/70 VUs  0m48.0s/1m05.0s

running (0m49.0s), 64/70 VUs, 12156 complete and 0 interrupted iterations
default   [  75% ] 64/70 VUs  0m49.0s/1m05.0s

running (0m50.0s), 65/70 VUs, 12492 complete and 0 interrupted iterations
default   [  77% ] 65/70 VUs  0m50.0s/1m05.0s

running (0m51.0s), 66/70 VUs, 12835 complete and 0 interrupted iterations
default   [  78% ] 66/70 VUs  0m51.0s/1m05.0s

running (0m52.0s), 67/70 VUs, 13187 complete and 0 interrupted iterations
default   [  80% ] 67/70 VUs  0m52.0s/1m05.0s

running (0m53.0s), 68/70 VUs, 13537 complete and 0 interrupted iterations
default   [  81% ] 68/70 VUs  0m53.0s/1m05.0s

running (0m54.0s), 69/70 VUs, 13885 complete and 0 interrupted iterations
default   [  83% ] 69/70 VUs  0m54.0s/1m05.0s

running (0m55.0s), 69/70 VUs, 14243 complete and 0 interrupted iterations
default   [  85% ] 69/70 VUs  0m55.0s/1m05.0s

running (0m56.0s), 64/70 VUs, 14613 complete and 0 interrupted iterations
default   [  86% ] 64/70 VUs  0m56.0s/1m05.0s

running (0m57.0s), 57/70 VUs, 14980 complete and 0 interrupted iterations
default   [  88% ] 57/70 VUs  0m57.0s/1m05.0s

running (0m58.0s), 51/70 VUs, 15356 complete and 0 interrupted iterations
default   [  89% ] 51/70 VUs  0m58.0s/1m05.0s

running (0m59.0s), 43/70 VUs, 15726 complete and 0 interrupted iterations
default   [  91% ] 43/70 VUs  0m59.0s/1m05.0s

running (1m00.0s), 36/70 VUs, 16116 complete and 0 interrupted iterations
default   [  92% ] 36/70 VUs  1m00.0s/1m05.0s

running (1m01.0s), 29/70 VUs, 16506 complete and 0 interrupted iterations
default   [  94% ] 29/70 VUs  1m01.0s/1m05.0s

running (1m02.0s), 22/70 VUs, 16898 complete and 0 interrupted iterations
default   [  95% ] 22/70 VUs  1m02.0s/1m05.0s

running (1m03.0s), 15/70 VUs, 17272 complete and 0 interrupted iterations
default   [  97% ] 15/70 VUs  1m03.0s/1m05.0s

running (1m04.0s), 08/70 VUs, 17645 complete and 0 interrupted iterations
default   [  98% ] 08/70 VUs  1m04.0s/1m05.0s

running (1m05.0s), 01/70 VUs, 17936 complete and 0 interrupted iterations
default   [ 100% ] 01/70 VUs  1m05.0s/1m05.0s

running (1m05.0s), 00/70 VUs, 17943 complete and 0 interrupted iterations
default ✓ [ 100% ] 00/70 VUs  1m5s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 35886      ✗ 0    
     data_received..................: 13 MB   197 kB/s
     data_sent......................: 9.2 MB  142 kB/s
     http_req_blocked...............: avg=14.24µs  min=738ns   med=1.72µs   max=16.98ms  p(90)=2.57µs   p(95)=3.24µs  
     http_req_connecting............: avg=1.95µs   min=0s      med=0s       max=1.34ms   p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=74.14ms  min=2.93ms  med=71.12ms  max=764.94ms p(90)=129.2ms  p(95)=149.74ms
       { expected_response:true }...: avg=74.14ms  min=2.93ms  med=71.12ms  max=764.94ms p(90)=129.2ms  p(95)=149.74ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 35886
     http_req_receiving.............: avg=42.01µs  min=14.27µs med=35.52µs  max=5.46ms   p(90)=54.35µs  p(95)=69.77µs 
     http_req_sending...............: avg=18.12µs  min=4.98µs  med=11.65µs  max=6.12ms   p(90)=24.31µs  p(95)=31.48µs 
     http_req_tls_handshaking.......: avg=9.7µs    min=0s      med=0s       max=15.4ms   p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=74.08ms  min=2.89ms  med=71.05ms  max=764.81ms p(90)=129.15ms p(95)=149.68ms
     http_reqs......................: 35886   552.064453/s
     iteration_duration.............: avg=148.57ms min=6.96ms  med=150.02ms max=880.08ms p(90)=233.62ms p(95)=261.94ms
     iterations.....................: 17943   276.032227/s
     vus............................: 1       min=1        max=69 
     vus_max........................: 70      min=70       max=70 


```
