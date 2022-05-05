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
     script: ./load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m35s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m01.0s), 02/70 VUs, 2 complete and 0 interrupted iterations
default   [   1% ] 02/70 VUs  0m01.0s/1m05.0s

running (0m02.0s), 04/70 VUs, 94 complete and 0 interrupted iterations
default   [   3% ] 04/70 VUs  0m02.0s/1m05.0s

running (0m03.0s), 06/70 VUs, 222 complete and 0 interrupted iterations
default   [   5% ] 06/70 VUs  0m03.0s/1m05.0s

running (0m04.0s), 08/70 VUs, 359 complete and 0 interrupted iterations
default   [   6% ] 08/70 VUs  0m04.0s/1m05.0s

running (0m05.0s), 10/70 VUs, 511 complete and 0 interrupted iterations
default   [   8% ] 10/70 VUs  0m05.0s/1m05.0s

running (0m06.0s), 12/70 VUs, 683 complete and 0 interrupted iterations
default   [   9% ] 12/70 VUs  0m06.0s/1m05.0s

running (0m07.0s), 14/70 VUs, 867 complete and 0 interrupted iterations
default   [  11% ] 14/70 VUs  0m07.0s/1m05.0s

running (0m08.0s), 16/70 VUs, 1059 complete and 0 interrupted iterations
default   [  12% ] 16/70 VUs  0m08.0s/1m05.0s

running (0m09.0s), 18/70 VUs, 1256 complete and 0 interrupted iterations
default   [  14% ] 18/70 VUs  0m09.0s/1m05.0s

running (0m10.0s), 20/70 VUs, 1468 complete and 0 interrupted iterations
default   [  15% ] 20/70 VUs  0m10.0s/1m05.0s

running (0m11.0s), 22/70 VUs, 1686 complete and 0 interrupted iterations
default   [  17% ] 22/70 VUs  0m11.0s/1m05.0s

running (0m12.0s), 24/70 VUs, 1922 complete and 0 interrupted iterations
default   [  18% ] 24/70 VUs  0m12.0s/1m05.0s

running (0m13.0s), 26/70 VUs, 2154 complete and 0 interrupted iterations
default   [  20% ] 26/70 VUs  0m13.0s/1m05.0s

running (0m14.0s), 28/70 VUs, 2400 complete and 0 interrupted iterations
default   [  21% ] 28/70 VUs  0m14.0s/1m05.0s

running (0m15.0s), 30/70 VUs, 2640 complete and 0 interrupted iterations
default   [  23% ] 30/70 VUs  0m15.0s/1m05.0s

running (0m16.0s), 32/70 VUs, 2883 complete and 0 interrupted iterations
default   [  25% ] 32/70 VUs  0m16.0s/1m05.0s

running (0m17.0s), 34/70 VUs, 3117 complete and 0 interrupted iterations
default   [  26% ] 34/70 VUs  0m17.0s/1m05.0s

running (0m18.0s), 36/70 VUs, 3354 complete and 0 interrupted iterations
default   [  28% ] 36/70 VUs  0m18.0s/1m05.0s

running (0m19.0s), 37/70 VUs, 3611 complete and 0 interrupted iterations
default   [  29% ] 37/70 VUs  0m19.0s/1m05.0s

running (0m20.0s), 39/70 VUs, 3853 complete and 0 interrupted iterations
default   [  31% ] 39/70 VUs  0m20.0s/1m05.0s

running (0m21.0s), 40/70 VUs, 4113 complete and 0 interrupted iterations
default   [  32% ] 40/70 VUs  0m21.0s/1m05.0s

running (0m22.0s), 41/70 VUs, 4381 complete and 0 interrupted iterations
default   [  34% ] 41/70 VUs  0m22.0s/1m05.0s

running (0m23.0s), 42/70 VUs, 4639 complete and 0 interrupted iterations
default   [  35% ] 42/70 VUs  0m23.0s/1m05.0s

running (0m24.0s), 43/70 VUs, 4909 complete and 0 interrupted iterations
default   [  37% ] 43/70 VUs  0m24.0s/1m05.0s

running (0m25.0s), 44/70 VUs, 5167 complete and 0 interrupted iterations
default   [  38% ] 44/70 VUs  0m25.0s/1m05.0s

running (0m26.0s), 45/70 VUs, 5432 complete and 0 interrupted iterations
default   [  40% ] 45/70 VUs  0m26.0s/1m05.0s

running (0m27.0s), 45/70 VUs, 5712 complete and 0 interrupted iterations
default   [  41% ] 45/70 VUs  0m27.0s/1m05.0s

running (0m28.0s), 46/70 VUs, 5978 complete and 0 interrupted iterations
default   [  43% ] 46/70 VUs  0m28.0s/1m05.0s

running (0m29.0s), 47/70 VUs, 6253 complete and 0 interrupted iterations
default   [  45% ] 47/70 VUs  0m29.0s/1m05.0s

running (0m30.0s), 48/70 VUs, 6516 complete and 0 interrupted iterations
default   [  46% ] 48/70 VUs  0m30.0s/1m05.0s

running (0m31.0s), 49/70 VUs, 6798 complete and 0 interrupted iterations
default   [  48% ] 49/70 VUs  0m31.0s/1m05.0s

running (0m32.0s), 50/70 VUs, 7085 complete and 0 interrupted iterations
default   [  49% ] 50/70 VUs  0m32.0s/1m05.0s

running (0m33.0s), 51/70 VUs, 7372 complete and 0 interrupted iterations
default   [  51% ] 51/70 VUs  0m33.0s/1m05.0s

running (0m34.0s), 51/70 VUs, 7669 complete and 0 interrupted iterations
default   [  52% ] 51/70 VUs  0m34.0s/1m05.0s

running (0m35.0s), 52/70 VUs, 7955 complete and 0 interrupted iterations
default   [  54% ] 52/70 VUs  0m35.0s/1m05.0s

running (0m36.0s), 53/70 VUs, 8266 complete and 0 interrupted iterations
default   [  55% ] 53/70 VUs  0m36.0s/1m05.0s

running (0m37.0s), 54/70 VUs, 8585 complete and 0 interrupted iterations
default   [  57% ] 54/70 VUs  0m37.0s/1m05.0s

running (0m38.0s), 55/70 VUs, 8898 complete and 0 interrupted iterations
default   [  58% ] 55/70 VUs  0m38.0s/1m05.0s

running (0m39.0s), 56/70 VUs, 9193 complete and 0 interrupted iterations
default   [  60% ] 56/70 VUs  0m39.0s/1m05.0s

running (0m40.0s), 57/70 VUs, 9510 complete and 0 interrupted iterations
default   [  61% ] 57/70 VUs  0m40.0s/1m05.0s

running (0m41.0s), 57/70 VUs, 9839 complete and 0 interrupted iterations
default   [  63% ] 57/70 VUs  0m41.0s/1m05.0s

running (0m42.0s), 58/70 VUs, 10158 complete and 0 interrupted iterations
default   [  65% ] 58/70 VUs  0m42.0s/1m05.0s

running (0m43.0s), 59/70 VUs, 10461 complete and 0 interrupted iterations
default   [  66% ] 59/70 VUs  0m43.0s/1m05.0s

running (0m44.0s), 60/70 VUs, 10782 complete and 0 interrupted iterations
default   [  68% ] 60/70 VUs  0m44.0s/1m05.0s

running (0m45.0s), 61/70 VUs, 11105 complete and 0 interrupted iterations
default   [  69% ] 61/70 VUs  0m45.0s/1m05.0s

running (0m46.0s), 62/70 VUs, 11422 complete and 0 interrupted iterations
default   [  71% ] 62/70 VUs  0m46.0s/1m05.0s

running (0m47.0s), 63/70 VUs, 11767 complete and 0 interrupted iterations
default   [  72% ] 63/70 VUs  0m47.0s/1m05.0s

running (0m48.0s), 63/70 VUs, 12108 complete and 0 interrupted iterations
default   [  74% ] 63/70 VUs  0m48.0s/1m05.0s

running (0m49.0s), 64/70 VUs, 12457 complete and 0 interrupted iterations
default   [  75% ] 64/70 VUs  0m49.0s/1m05.0s

running (0m50.0s), 65/70 VUs, 12817 complete and 0 interrupted iterations
default   [  77% ] 65/70 VUs  0m50.0s/1m05.0s

running (0m51.0s), 66/70 VUs, 13170 complete and 0 interrupted iterations
default   [  78% ] 66/70 VUs  0m51.0s/1m05.0s

running (0m52.0s), 67/70 VUs, 13542 complete and 0 interrupted iterations
default   [  80% ] 67/70 VUs  0m52.0s/1m05.0s

running (0m53.0s), 68/70 VUs, 13915 complete and 0 interrupted iterations
default   [  81% ] 68/70 VUs  0m53.0s/1m05.0s

running (0m54.0s), 69/70 VUs, 14298 complete and 0 interrupted iterations
default   [  83% ] 69/70 VUs  0m54.0s/1m05.0s

running (0m55.0s), 69/70 VUs, 14640 complete and 0 interrupted iterations
default   [  85% ] 69/70 VUs  0m55.0s/1m05.0s

running (0m56.0s), 64/70 VUs, 15055 complete and 0 interrupted iterations
default   [  86% ] 64/70 VUs  0m56.0s/1m05.0s

running (0m57.0s), 57/70 VUs, 15455 complete and 0 interrupted iterations
default   [  88% ] 57/70 VUs  0m57.0s/1m05.0s

running (0m58.0s), 51/70 VUs, 15851 complete and 0 interrupted iterations
default   [  89% ] 51/70 VUs  0m58.0s/1m05.0s

running (0m59.0s), 43/70 VUs, 16257 complete and 0 interrupted iterations
default   [  91% ] 43/70 VUs  0m59.0s/1m05.0s

running (1m00.0s), 36/70 VUs, 16648 complete and 0 interrupted iterations
default   [  92% ] 36/70 VUs  1m00.0s/1m05.0s

running (1m01.0s), 29/70 VUs, 17054 complete and 0 interrupted iterations
default   [  94% ] 29/70 VUs  1m01.0s/1m05.0s

running (1m02.0s), 22/70 VUs, 17474 complete and 0 interrupted iterations
default   [  95% ] 22/70 VUs  1m02.0s/1m05.0s

running (1m03.0s), 15/70 VUs, 17867 complete and 0 interrupted iterations
default   [  97% ] 15/70 VUs  1m03.0s/1m05.0s

running (1m04.0s), 08/70 VUs, 18255 complete and 0 interrupted iterations
default   [  98% ] 08/70 VUs  1m04.0s/1m05.0s

running (1m05.0s), 01/70 VUs, 18531 complete and 0 interrupted iterations
default   [ 100% ] 01/70 VUs  1m05.0s/1m05.0s

running (1m05.0s), 00/70 VUs, 18535 complete and 0 interrupted iterations
default ✗ [ 100% ] 00/70 VUs  1m5s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 37070      ✗ 0    
     data_received..................: 13 MB   204 kB/s
     data_sent......................: 9.5 MB  146 kB/s
     http_req_blocked...............: avg=15.42µs min=819ns   med=1.76µs   max=15.47ms  p(90)=2.64µs   p(95)=3.32µs  
     http_req_connecting............: avg=2.33µs  min=0s      med=0s       max=2.45ms   p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=71.75ms min=4.02ms  med=68.03ms  max=837.87ms p(90)=124.02ms p(95)=146.64ms
       { expected_response:true }...: avg=71.75ms min=4.02ms  med=68.03ms  max=837.87ms p(90)=124.02ms p(95)=146.64ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 37070
     http_req_receiving.............: avg=43.75µs min=15.77µs med=36.52µs  max=7.05ms   p(90)=58.82µs  p(95)=74.21µs 
     http_req_sending...............: avg=18.38µs min=5.23µs  med=12.34µs  max=6.01ms   p(90)=25.72µs  p(95)=32.45µs 
     http_req_tls_handshaking.......: avg=10.56µs min=0s      med=0s       max=13.82ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=71.69ms min=3.99ms  med=67.96ms  max=837.73ms p(90)=123.97ms p(95)=146.59ms
     http_reqs......................: 37070   570.273925/s
     iteration_duration.............: avg=143.8ms min=10.49ms med=142.79ms max=952.98ms p(90)=226.68ms p(95)=257.1ms 
     iterations.....................: 18535   285.136962/s
     vus............................: 1       min=1        max=70 
     vus_max........................: 70      min=70       max=70 




```
