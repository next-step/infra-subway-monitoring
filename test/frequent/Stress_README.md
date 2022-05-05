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
    {duration: '10s', target: 800},
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
     script: ./stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 800 max VUs, 1m50s max duration (incl. graceful stop):
           * default: Up to 800 looping VUs for 1m20s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.5s), 005/800 VUs, 0 complete and 0 interrupted iterations
default   [   1% ] 005/800 VUs  0m00.5s/1m20.0s

running (0m01.5s), 015/800 VUs, 35 complete and 0 interrupted iterations
default   [   2% ] 015/800 VUs  0m01.5s/1m20.0s

running (0m02.5s), 025/800 VUs, 132 complete and 0 interrupted iterations
default   [   3% ] 025/800 VUs  0m02.5s/1m20.0s

running (0m03.5s), 035/800 VUs, 241 complete and 0 interrupted iterations
default   [   4% ] 035/800 VUs  0m03.5s/1m20.0s

running (0m04.5s), 045/800 VUs, 351 complete and 0 interrupted iterations
default   [   6% ] 045/800 VUs  0m04.5s/1m20.0s

running (0m05.5s), 055/800 VUs, 480 complete and 0 interrupted iterations
default   [   7% ] 055/800 VUs  0m05.5s/1m20.0s

running (0m06.5s), 065/800 VUs, 609 complete and 0 interrupted iterations
default   [   8% ] 065/800 VUs  0m06.5s/1m20.0s

running (0m07.5s), 075/800 VUs, 746 complete and 0 interrupted iterations
default   [   9% ] 075/800 VUs  0m07.5s/1m20.0s

running (0m08.5s), 085/800 VUs, 896 complete and 0 interrupted iterations
default   [  11% ] 085/800 VUs  0m08.5s/1m20.0s

running (0m09.5s), 094/800 VUs, 1043 complete and 0 interrupted iterations
default   [  12% ] 094/800 VUs  0m09.5s/1m20.0s

running (0m10.5s), 104/800 VUs, 1201 complete and 0 interrupted iterations
default   [  13% ] 104/800 VUs  0m10.5s/1m20.0s

running (0m11.5s), 114/800 VUs, 1365 complete and 0 interrupted iterations
default   [  14% ] 114/800 VUs  0m11.5s/1m20.0s

running (0m12.5s), 124/800 VUs, 1516 complete and 0 interrupted iterations
default   [  16% ] 124/800 VUs  0m12.5s/1m20.0s

running (0m13.5s), 134/800 VUs, 1678 complete and 0 interrupted iterations
default   [  17% ] 134/800 VUs  0m13.5s/1m20.0s

running (0m14.5s), 144/800 VUs, 1842 complete and 0 interrupted iterations
default   [  18% ] 144/800 VUs  0m14.5s/1m20.0s

running (0m15.5s), 154/800 VUs, 2008 complete and 0 interrupted iterations
default   [  19% ] 154/800 VUs  0m15.5s/1m20.0s

running (0m16.5s), 164/800 VUs, 2177 complete and 0 interrupted iterations
default   [  21% ] 164/800 VUs  0m16.5s/1m20.0s

running (0m17.5s), 174/800 VUs, 2346 complete and 0 interrupted iterations
default   [  22% ] 174/800 VUs  0m17.5s/1m20.0s

running (0m18.5s), 184/800 VUs, 2510 complete and 0 interrupted iterations
default   [  23% ] 184/800 VUs  0m18.5s/1m20.0s

running (0m19.5s), 194/800 VUs, 2703 complete and 0 interrupted iterations
default   [  24% ] 194/800 VUs  0m19.5s/1m20.0s

running (0m20.5s), 204/800 VUs, 2872 complete and 0 interrupted iterations
default   [  26% ] 204/800 VUs  0m20.5s/1m20.0s

running (0m21.5s), 214/800 VUs, 3038 complete and 0 interrupted iterations
default   [  27% ] 214/800 VUs  0m21.5s/1m20.0s

running (0m22.5s), 224/800 VUs, 3214 complete and 0 interrupted iterations
default   [  28% ] 224/800 VUs  0m22.5s/1m20.0s

running (0m23.5s), 234/800 VUs, 3381 complete and 0 interrupted iterations
default   [  29% ] 234/800 VUs  0m23.5s/1m20.0s

running (0m24.5s), 244/800 VUs, 3657 complete and 0 interrupted iterations
default   [  31% ] 244/800 VUs  0m24.5s/1m20.0s

running (0m25.5s), 254/800 VUs, 4420 complete and 0 interrupted iterations
default   [  32% ] 254/800 VUs  0m25.5s/1m20.0s

running (0m26.5s), 264/800 VUs, 5078 complete and 0 interrupted iterations
default   [  33% ] 264/800 VUs  0m26.5s/1m20.0s

running (0m27.5s), 274/800 VUs, 5719 complete and 0 interrupted iterations
default   [  34% ] 274/800 VUs  0m27.5s/1m20.0s

running (0m28.5s), 284/800 VUs, 6307 complete and 0 interrupted iterations
default   [  36% ] 284/800 VUs  0m28.5s/1m20.0s

running (0m29.5s), 294/800 VUs, 7059 complete and 0 interrupted iterations
default   [  37% ] 294/800 VUs  0m29.5s/1m20.0s

running (0m30.5s), 304/800 VUs, 8241 complete and 0 interrupted iterations
default   [  38% ] 304/800 VUs  0m30.5s/1m20.0s

running (0m31.5s), 314/800 VUs, 9492 complete and 0 interrupted iterations
default   [  39% ] 314/800 VUs  0m31.5s/1m20.0s

running (0m32.5s), 324/800 VUs, 10266 complete and 0 interrupted iterations
default   [  41% ] 324/800 VUs  0m32.5s/1m20.0s

running (0m33.5s), 334/800 VUs, 11137 complete and 0 interrupted iterations
default   [  42% ] 334/800 VUs  0m33.5s/1m20.0s

running (0m34.5s), 344/800 VUs, 12025 complete and 0 interrupted iterations
default   [  43% ] 344/800 VUs  0m34.5s/1m20.0s

running (0m35.5s), 354/800 VUs, 12872 complete and 0 interrupted iterations
default   [  44% ] 354/800 VUs  0m35.5s/1m20.0s

running (0m36.5s), 364/800 VUs, 13692 complete and 0 interrupted iterations
default   [  46% ] 364/800 VUs  0m36.5s/1m20.0s

running (0m37.5s), 374/800 VUs, 14774 complete and 0 interrupted iterations
default   [  47% ] 374/800 VUs  0m37.5s/1m20.0s

running (0m38.5s), 384/800 VUs, 15858 complete and 0 interrupted iterations
default   [  48% ] 384/800 VUs  0m38.5s/1m20.0s

running (0m39.5s), 394/800 VUs, 17407 complete and 0 interrupted iterations
default   [  49% ] 394/800 VUs  0m39.5s/1m20.0s

running (0m40.5s), 404/800 VUs, 18518 complete and 0 interrupted iterations
default   [  51% ] 404/800 VUs  0m40.5s/1m20.0s

running (0m41.5s), 414/800 VUs, 19712 complete and 0 interrupted iterations
default   [  52% ] 414/800 VUs  0m41.5s/1m20.0s

running (0m42.5s), 424/800 VUs, 20514 complete and 0 interrupted iterations
default   [  53% ] 424/800 VUs  0m42.5s/1m20.0s

running (0m43.5s), 434/800 VUs, 21414 complete and 0 interrupted iterations
default   [  54% ] 434/800 VUs  0m43.5s/1m20.0s

running (0m44.5s), 444/800 VUs, 22816 complete and 0 interrupted iterations
default   [  56% ] 444/800 VUs  0m44.5s/1m20.0s

running (0m45.5s), 454/800 VUs, 23845 complete and 0 interrupted iterations
default   [  57% ] 454/800 VUs  0m45.5s/1m20.0s

running (0m46.5s), 464/800 VUs, 25589 complete and 0 interrupted iterations
default   [  58% ] 464/800 VUs  0m46.5s/1m20.0s

running (0m47.5s), 474/800 VUs, 26639 complete and 0 interrupted iterations
default   [  59% ] 474/800 VUs  0m47.5s/1m20.0s

running (0m48.5s), 484/800 VUs, 28069 complete and 0 interrupted iterations
default   [  61% ] 484/800 VUs  0m48.5s/1m20.0s

running (0m49.5s), 494/800 VUs, 29038 complete and 0 interrupted iterations
default   [  62% ] 494/800 VUs  0m49.5s/1m20.0s

running (0m50.5s), 504/800 VUs, 29907 complete and 0 interrupted iterations
default   [  63% ] 504/800 VUs  0m50.5s/1m20.0s

running (0m51.5s), 514/800 VUs, 30960 complete and 0 interrupted iterations
default   [  64% ] 514/800 VUs  0m51.5s/1m20.0s

running (0m52.5s), 524/800 VUs, 31474 complete and 0 interrupted iterations
default   [  66% ] 524/800 VUs  0m52.5s/1m20.0s

running (0m53.5s), 534/800 VUs, 33112 complete and 0 interrupted iterations
default   [  67% ] 534/800 VUs  0m53.5s/1m20.0s

running (0m54.5s), 544/800 VUs, 33766 complete and 0 interrupted iterations
default   [  68% ] 544/800 VUs  0m54.5s/1m20.0s

running (0m55.5s), 554/800 VUs, 34624 complete and 0 interrupted iterations
default   [  69% ] 554/800 VUs  0m55.5s/1m20.0s

running (0m56.5s), 564/800 VUs, 35589 complete and 0 interrupted iterations
default   [  71% ] 564/800 VUs  0m56.5s/1m20.0s

running (0m57.5s), 574/800 VUs, 36439 complete and 0 interrupted iterations
default   [  72% ] 574/800 VUs  0m57.5s/1m20.0s

running (0m58.5s), 584/800 VUs, 37533 complete and 0 interrupted iterations
default   [  73% ] 584/800 VUs  0m58.5s/1m20.0s

running (0m59.5s), 594/800 VUs, 39550 complete and 0 interrupted iterations
default   [  74% ] 594/800 VUs  0m59.5s/1m20.0s

running (1m00.5s), 604/800 VUs, 40301 complete and 0 interrupted iterations
default   [  76% ] 604/800 VUs  1m00.5s/1m20.0s

running (1m01.5s), 614/800 VUs, 41211 complete and 0 interrupted iterations
default   [  77% ] 614/800 VUs  1m01.5s/1m20.0s

running (1m02.5s), 624/800 VUs, 42912 complete and 0 interrupted iterations
default   [  78% ] 624/800 VUs  1m02.5s/1m20.0s

running (1m03.5s), 634/800 VUs, 45068 complete and 0 interrupted iterations
default   [  79% ] 634/800 VUs  1m03.5s/1m20.0s

running (1m04.5s), 644/800 VUs, 45926 complete and 0 interrupted iterations
default   [  81% ] 644/800 VUs  1m04.5s/1m20.0s

running (1m05.5s), 654/800 VUs, 47143 complete and 0 interrupted iterations
default   [  82% ] 654/800 VUs  1m05.5s/1m20.0s

running (1m06.5s), 664/800 VUs, 48371 complete and 0 interrupted iterations
default   [  83% ] 664/800 VUs  1m06.5s/1m20.0s

running (1m07.5s), 674/800 VUs, 49149 complete and 0 interrupted iterations
default   [  84% ] 674/800 VUs  1m07.5s/1m20.0s

running (1m08.5s), 684/800 VUs, 49703 complete and 0 interrupted iterations
default   [  86% ] 684/800 VUs  1m08.5s/1m20.0s

running (1m09.5s), 694/800 VUs, 50628 complete and 0 interrupted iterations
default   [  87% ] 694/800 VUs  1m09.5s/1m20.0s

running (1m10.5s), 704/800 VUs, 51449 complete and 0 interrupted iterations
default   [  88% ] 704/800 VUs  1m10.5s/1m20.0s

running (1m11.5s), 714/800 VUs, 52675 complete and 0 interrupted iterations
default   [  89% ] 714/800 VUs  1m11.5s/1m20.0s

running (1m12.5s), 724/800 VUs, 53380 complete and 0 interrupted iterations
default   [  91% ] 724/800 VUs  1m12.5s/1m20.0s

running (1m13.5s), 734/800 VUs, 55474 complete and 0 interrupted iterations
default   [  92% ] 734/800 VUs  1m13.5s/1m20.0s

running (1m14.5s), 744/800 VUs, 57499 complete and 0 interrupted iterations
default   [  93% ] 744/800 VUs  1m14.5s/1m20.0s

running (1m15.5s), 754/800 VUs, 60408 complete and 0 interrupted iterations
default   [  94% ] 754/800 VUs  1m15.5s/1m20.0s

running (1m16.5s), 764/800 VUs, 62554 complete and 0 interrupted iterations
default   [  96% ] 764/800 VUs  1m16.5s/1m20.0s

running (1m17.5s), 774/800 VUs, 65052 complete and 0 interrupted iterations
default   [  97% ] 774/800 VUs  1m17.5s/1m20.0s

running (1m18.5s), 785/800 VUs, 65844 complete and 0 interrupted iterations
default   [  98% ] 785/800 VUs  1m18.5s/1m20.0s

running (1m19.5s), 794/800 VUs, 67628 complete and 0 interrupted iterations
default   [  99% ] 794/800 VUs  1m19.5s/1m20.0s

running (1m20.5s), 283/800 VUs, 68859 complete and 0 interrupted iterations
default ↓ [ 100% ] 747/800 VUs  1m20s

running (1m21.5s), 113/800 VUs, 69029 complete and 0 interrupted iterations
default ↓ [ 100% ] 747/800 VUs  1m20s

running (1m21.8s), 000/800 VUs, 69142 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/800 VUs  1m20s

     ✗ logged in successfully
      ↳  16% — ✓ 11719 / ✗ 57423
     ✓ retrieved member

     checks.........................: 24.72% ✓ 18857      ✗ 57423
     data_received..................: 101 MB 1.2 MB/s
     data_sent......................: 29 MB  359 kB/s
     http_req_blocked...............: avg=84.26ms  min=0s       med=0s       max=1.33s    p(90)=335.9ms  p(95)=584.17ms
     http_req_connecting............: avg=68.63ms  min=0s       med=15.46ms  max=1.05s    p(90)=233.82ms p(95)=269.8ms 
   ✗ http_req_duration..............: avg=186.36ms min=0s       med=0s       max=8.31s    p(90)=755.33ms p(95)=1.04s   
       { expected_response:true }...: avg=751.27ms min=21.18ms  med=650.74ms max=8.31s    p(90)=1.39s    p(95)=1.72s   
     http_req_failed................: 77.77% ✓ 62890      ✗ 17971
     http_req_receiving.............: avg=976.22µs min=0s       med=0s       max=180.38ms p(90)=41.96µs  p(95)=69.05µs 
     http_req_sending...............: avg=4.88ms   min=0s       med=0s       max=1.34s    p(90)=254.54µs p(95)=2.17ms  
     http_req_tls_handshaking.......: avg=71.47ms  min=0s       med=0s       max=1.15s    p(90)=282.22ms p(95)=552.35ms
     http_req_waiting...............: avg=180.5ms  min=0s       med=0s       max=8.24s    p(90)=736.67ms p(95)=1.03s   
     http_reqs......................: 80861  988.456595/s
     iteration_duration.............: avg=460.11ms min=256.56µs med=237.41ms max=9.94s    p(90)=1.19s    p(95)=1.91s   
     iterations.....................: 69142  845.201839/s
     vus............................: 118    min=10       max=789
     vus_max........................: 800    min=800      max=800

```
