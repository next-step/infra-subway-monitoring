## 스크립트
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    {duration: '1m', target: 694},
    {duration: '2m', target: 694},
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

  scenarios: (100.00%) 1 scenario, 694 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 694 looping VUs for 3m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.6s), 007/694 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 007/694 VUs  0m00.6s/3m00.0s

running (0m01.6s), 019/694 VUs, 14 complete and 0 interrupted iterations
default   [   1% ] 019/694 VUs  0m01.6s/3m00.0s

running (0m02.6s), 030/694 VUs, 84 complete and 0 interrupted iterations
default   [   1% ] 030/694 VUs  0m02.6s/3m00.0s

running (0m03.6s), 042/694 VUs, 157 complete and 0 interrupted iterations
default   [   2% ] 042/694 VUs  0m03.6s/3m00.0s

running (0m04.6s), 053/694 VUs, 237 complete and 0 interrupted iterations
default   [   3% ] 053/694 VUs  0m04.6s/3m00.0s

running (0m05.6s), 065/694 VUs, 328 complete and 0 interrupted iterations
default   [   3% ] 065/694 VUs  0m05.6s/3m00.0s

running (0m06.6s), 076/694 VUs, 414 complete and 0 interrupted iterations
default   [   4% ] 076/694 VUs  0m06.6s/3m00.0s

running (0m07.6s), 088/694 VUs, 500 complete and 0 interrupted iterations
default   [   4% ] 088/694 VUs  0m07.6s/3m00.0s

running (0m08.6s), 100/694 VUs, 619 complete and 0 interrupted iterations
default   [   5% ] 100/694 VUs  0m08.6s/3m00.0s

running (0m09.6s), 111/694 VUs, 721 complete and 0 interrupted iterations
default   [   5% ] 111/694 VUs  0m09.6s/3m00.0s

running (0m10.6s), 123/694 VUs, 821 complete and 0 interrupted iterations
default   [   6% ] 123/694 VUs  0m10.6s/3m00.0s

running (0m11.6s), 134/694 VUs, 945 complete and 0 interrupted iterations
default   [   6% ] 134/694 VUs  0m11.6s/3m00.0s

running (0m12.6s), 146/694 VUs, 1042 complete and 0 interrupted iterations
default   [   7% ] 146/694 VUs  0m12.6s/3m00.0s

running (0m13.6s), 157/694 VUs, 1170 complete and 0 interrupted iterations
default   [   8% ] 157/694 VUs  0m13.6s/3m00.0s

running (0m14.6s), 169/694 VUs, 1260 complete and 0 interrupted iterations
default   [   8% ] 169/694 VUs  0m14.6s/3m00.0s

running (0m15.6s), 180/694 VUs, 1392 complete and 0 interrupted iterations
default   [   9% ] 180/694 VUs  0m15.6s/3m00.0s

running (0m16.6s), 192/694 VUs, 1474 complete and 0 interrupted iterations
default   [   9% ] 192/694 VUs  0m16.6s/3m00.0s

running (0m17.6s), 204/694 VUs, 1590 complete and 0 interrupted iterations
default   [  10% ] 204/694 VUs  0m17.6s/3m00.0s

running (0m18.6s), 215/694 VUs, 1730 complete and 0 interrupted iterations
default   [  10% ] 215/694 VUs  0m18.6s/3m00.0s

running (0m19.6s), 227/694 VUs, 1871 complete and 0 interrupted iterations
default   [  11% ] 227/694 VUs  0m19.6s/3m00.0s

running (0m20.6s), 238/694 VUs, 1981 complete and 0 interrupted iterations
default   [  11% ] 238/694 VUs  0m20.6s/3m00.0s

running (0m21.6s), 250/694 VUs, 2346 complete and 0 interrupted iterations
default   [  12% ] 250/694 VUs  0m21.6s/3m00.0s

running (0m22.6s), 261/694 VUs, 3234 complete and 0 interrupted iterations
default   [  13% ] 261/694 VUs  0m22.6s/3m00.0s

running (0m23.6s), 273/694 VUs, 4409 complete and 0 interrupted iterations
default   [  13% ] 273/694 VUs  0m23.6s/3m00.0s

running (0m24.6s), 284/694 VUs, 5458 complete and 0 interrupted iterations
default   [  14% ] 284/694 VUs  0m24.6s/3m00.0s

running (0m25.6s), 296/694 VUs, 6762 complete and 0 interrupted iterations
default   [  14% ] 296/694 VUs  0m25.6s/3m00.0s

running (0m26.6s), 307/694 VUs, 7602 complete and 0 interrupted iterations
default   [  15% ] 307/694 VUs  0m26.6s/3m00.0s

running (0m27.6s), 319/694 VUs, 8921 complete and 0 interrupted iterations
default   [  15% ] 319/694 VUs  0m27.6s/3m00.0s

running (0m28.6s), 331/694 VUs, 10432 complete and 0 interrupted iterations
default   [  16% ] 331/694 VUs  0m28.6s/3m00.0s

running (0m29.6s), 342/694 VUs, 11870 complete and 0 interrupted iterations
default   [  16% ] 342/694 VUs  0m29.6s/3m00.0s

running (0m30.6s), 354/694 VUs, 13372 complete and 0 interrupted iterations
default   [  17% ] 354/694 VUs  0m30.6s/3m00.0s

running (0m31.6s), 365/694 VUs, 14685 complete and 0 interrupted iterations
default   [  18% ] 365/694 VUs  0m31.6s/3m00.0s

running (0m32.6s), 377/694 VUs, 15811 complete and 0 interrupted iterations
default   [  18% ] 377/694 VUs  0m32.6s/3m00.0s

running (0m33.6s), 388/694 VUs, 16682 complete and 0 interrupted iterations
default   [  19% ] 388/694 VUs  0m33.6s/3m00.0s

running (0m34.6s), 400/694 VUs, 18043 complete and 0 interrupted iterations
default   [  19% ] 400/694 VUs  0m34.6s/3m00.0s

running (0m35.6s), 411/694 VUs, 19791 complete and 0 interrupted iterations
default   [  20% ] 411/694 VUs  0m35.6s/3m00.0s

running (0m36.6s), 423/694 VUs, 20986 complete and 0 interrupted iterations
default   [  20% ] 423/694 VUs  0m36.6s/3m00.0s

running (0m37.6s), 434/694 VUs, 22733 complete and 0 interrupted iterations
default   [  21% ] 434/694 VUs  0m37.6s/3m00.0s

running (0m38.6s), 446/694 VUs, 24425 complete and 0 interrupted iterations
default   [  21% ] 446/694 VUs  0m38.6s/3m00.0s

running (0m39.6s), 458/694 VUs, 26219 complete and 0 interrupted iterations
default   [  22% ] 458/694 VUs  0m39.6s/3m00.0s

running (0m40.6s), 469/694 VUs, 27642 complete and 0 interrupted iterations
default   [  23% ] 469/694 VUs  0m40.6s/3m00.0s

running (0m41.6s), 481/694 VUs, 29238 complete and 0 interrupted iterations
default   [  23% ] 481/694 VUs  0m41.6s/3m00.0s

running (0m42.6s), 492/694 VUs, 30281 complete and 0 interrupted iterations
default   [  24% ] 492/694 VUs  0m42.6s/3m00.0s

running (0m43.6s), 504/694 VUs, 32599 complete and 0 interrupted iterations
default   [  24% ] 504/694 VUs  0m43.6s/3m00.0s

running (0m44.6s), 515/694 VUs, 34036 complete and 0 interrupted iterations
default   [  25% ] 515/694 VUs  0m44.6s/3m00.0s

running (0m45.6s), 527/694 VUs, 36006 complete and 0 interrupted iterations
default   [  25% ] 527/694 VUs  0m45.6s/3m00.0s

running (0m46.6s), 538/694 VUs, 37331 complete and 0 interrupted iterations
default   [  26% ] 538/694 VUs  0m46.6s/3m00.0s

running (0m47.6s), 550/694 VUs, 39603 complete and 0 interrupted iterations
default   [  26% ] 550/694 VUs  0m47.6s/3m00.0s

running (0m48.6s), 562/694 VUs, 41414 complete and 0 interrupted iterations
default   [  27% ] 562/694 VUs  0m48.6s/3m00.0s

running (0m49.6s), 573/694 VUs, 42327 complete and 0 interrupted iterations
default   [  28% ] 573/694 VUs  0m49.6s/3m00.0s

running (0m50.6s), 585/694 VUs, 43722 complete and 0 interrupted iterations
default   [  28% ] 585/694 VUs  0m50.6s/3m00.0s

running (0m51.6s), 596/694 VUs, 45875 complete and 0 interrupted iterations
default   [  29% ] 596/694 VUs  0m51.6s/3m00.0s

running (0m52.6s), 608/694 VUs, 47062 complete and 0 interrupted iterations
default   [  29% ] 608/694 VUs  0m52.6s/3m00.0s

running (0m53.6s), 619/694 VUs, 47912 complete and 0 interrupted iterations
default   [  30% ] 619/694 VUs  0m53.6s/3m00.0s

running (0m54.6s), 631/694 VUs, 49576 complete and 0 interrupted iterations
default   [  30% ] 631/694 VUs  0m54.6s/3m00.0s

running (0m55.6s), 642/694 VUs, 50177 complete and 0 interrupted iterations
default   [  31% ] 642/694 VUs  0m55.6s/3m00.0s

running (0m56.6s), 654/694 VUs, 51761 complete and 0 interrupted iterations
default   [  31% ] 654/694 VUs  0m56.6s/3m00.0s

running (0m57.6s), 665/694 VUs, 53138 complete and 0 interrupted iterations
default   [  32% ] 665/694 VUs  0m57.6s/3m00.0s

running (0m58.6s), 677/694 VUs, 55054 complete and 0 interrupted iterations
default   [  33% ] 677/694 VUs  0m58.6s/3m00.0s

running (0m59.6s), 689/694 VUs, 56343 complete and 0 interrupted iterations
default   [  33% ] 689/694 VUs  0m59.6s/3m00.0s

running (1m00.6s), 694/694 VUs, 57701 complete and 0 interrupted iterations
default   [  34% ] 694/694 VUs  1m00.6s/3m00.0s

running (1m01.6s), 694/694 VUs, 58957 complete and 0 interrupted iterations
default   [  34% ] 694/694 VUs  1m01.6s/3m00.0s

running (1m02.6s), 694/694 VUs, 59895 complete and 0 interrupted iterations
default   [  35% ] 694/694 VUs  1m02.6s/3m00.0s

running (1m03.6s), 694/694 VUs, 61036 complete and 0 interrupted iterations
default   [  35% ] 694/694 VUs  1m03.6s/3m00.0s

running (1m04.6s), 694/694 VUs, 62341 complete and 0 interrupted iterations
default   [  36% ] 694/694 VUs  1m04.6s/3m00.0s

running (1m05.6s), 694/694 VUs, 63417 complete and 0 interrupted iterations
default   [  36% ] 694/694 VUs  1m05.6s/3m00.0s

running (1m06.6s), 694/694 VUs, 64512 complete and 0 interrupted iterations
default   [  37% ] 694/694 VUs  1m06.6s/3m00.0s

running (1m07.6s), 694/694 VUs, 65759 complete and 0 interrupted iterations
default   [  38% ] 694/694 VUs  1m07.6s/3m00.0s

running (1m08.6s), 694/694 VUs, 67164 complete and 0 interrupted iterations
default   [  38% ] 694/694 VUs  1m08.6s/3m00.0s

running (1m09.6s), 694/694 VUs, 67775 complete and 0 interrupted iterations
default   [  39% ] 694/694 VUs  1m09.6s/3m00.0s

running (1m10.6s), 694/694 VUs, 68702 complete and 0 interrupted iterations
default   [  39% ] 694/694 VUs  1m10.6s/3m00.0s

running (1m11.6s), 694/694 VUs, 70696 complete and 0 interrupted iterations
default   [  40% ] 694/694 VUs  1m11.6s/3m00.0s

running (1m12.6s), 694/694 VUs, 71643 complete and 0 interrupted iterations
default   [  40% ] 694/694 VUs  1m12.6s/3m00.0s

running (1m13.6s), 694/694 VUs, 73148 complete and 0 interrupted iterations
default   [  41% ] 694/694 VUs  1m13.6s/3m00.0s

running (1m14.6s), 694/694 VUs, 74691 complete and 0 interrupted iterations
default   [  41% ] 694/694 VUs  1m14.6s/3m00.0s

running (1m15.6s), 694/694 VUs, 76162 complete and 0 interrupted iterations
default   [  42% ] 694/694 VUs  1m15.6s/3m00.0s

running (1m16.6s), 694/694 VUs, 76515 complete and 0 interrupted iterations
default   [  43% ] 694/694 VUs  1m16.6s/3m00.0s

running (1m17.6s), 694/694 VUs, 78772 complete and 0 interrupted iterations
default   [  43% ] 694/694 VUs  1m17.6s/3m00.0s

running (1m18.6s), 694/694 VUs, 79850 complete and 0 interrupted iterations
default   [  44% ] 694/694 VUs  1m18.6s/3m00.0s

running (1m19.6s), 694/694 VUs, 81461 complete and 0 interrupted iterations
default   [  44% ] 694/694 VUs  1m19.6s/3m00.0s

running (1m20.6s), 694/694 VUs, 82031 complete and 0 interrupted iterations
default   [  45% ] 694/694 VUs  1m20.6s/3m00.0s

running (1m21.6s), 694/694 VUs, 83750 complete and 0 interrupted iterations
default   [  45% ] 694/694 VUs  1m21.6s/3m00.0s

running (1m22.6s), 694/694 VUs, 85309 complete and 0 interrupted iterations
default   [  46% ] 694/694 VUs  1m22.6s/3m00.0s

running (1m23.6s), 694/694 VUs, 86883 complete and 0 interrupted iterations
default   [  46% ] 694/694 VUs  1m23.6s/3m00.0s

running (1m24.6s), 694/694 VUs, 88246 complete and 0 interrupted iterations
default   [  47% ] 694/694 VUs  1m24.6s/3m00.0s

running (1m25.6s), 694/694 VUs, 90276 complete and 0 interrupted iterations
default   [  48% ] 694/694 VUs  1m25.6s/3m00.0s

running (1m26.6s), 694/694 VUs, 90688 complete and 0 interrupted iterations
default   [  48% ] 694/694 VUs  1m26.6s/3m00.0s

running (1m27.9s), 694/694 VUs, 90689 complete and 0 interrupted iterations
default   [  49% ] 694/694 VUs  1m27.9s/3m00.0s

running (1m28.6s), 694/694 VUs, 92136 complete and 0 interrupted iterations
default   [  49% ] 694/694 VUs  1m28.6s/3m00.0s

running (1m29.6s), 694/694 VUs, 93491 complete and 0 interrupted iterations
default   [  50% ] 694/694 VUs  1m29.6s/3m00.0s

running (1m30.6s), 694/694 VUs, 95155 complete and 0 interrupted iterations
default   [  50% ] 694/694 VUs  1m30.6s/3m00.0s

running (1m31.6s), 694/694 VUs, 97778 complete and 0 interrupted iterations
default   [  51% ] 694/694 VUs  1m31.6s/3m00.0s

running (1m32.6s), 694/694 VUs, 99715 complete and 0 interrupted iterations
default   [  51% ] 694/694 VUs  1m32.6s/3m00.0s

running (1m33.6s), 694/694 VUs, 101101 complete and 0 interrupted iterations
default   [  52% ] 694/694 VUs  1m33.6s/3m00.0s

running (1m34.6s), 694/694 VUs, 103347 complete and 0 interrupted iterations
default   [  53% ] 694/694 VUs  1m34.6s/3m00.0s

running (1m35.6s), 694/694 VUs, 104482 complete and 0 interrupted iterations
default   [  53% ] 694/694 VUs  1m35.6s/3m00.0s

running (1m36.6s), 694/694 VUs, 106059 complete and 0 interrupted iterations
default   [  54% ] 694/694 VUs  1m36.6s/3m00.0s

running (1m37.6s), 694/694 VUs, 107670 complete and 0 interrupted iterations
default   [  54% ] 694/694 VUs  1m37.6s/3m00.0s

running (1m38.6s), 694/694 VUs, 109130 complete and 0 interrupted iterations
default   [  55% ] 694/694 VUs  1m38.6s/3m00.0s

running (1m39.6s), 694/694 VUs, 110647 complete and 0 interrupted iterations
default   [  55% ] 694/694 VUs  1m39.6s/3m00.0s

running (1m40.6s), 694/694 VUs, 111048 complete and 0 interrupted iterations
default   [  56% ] 694/694 VUs  1m40.6s/3m00.0s

running (1m41.6s), 694/694 VUs, 112690 complete and 0 interrupted iterations
default   [  56% ] 694/694 VUs  1m41.6s/3m00.0s

running (1m42.6s), 694/694 VUs, 114233 complete and 0 interrupted iterations
default   [  57% ] 694/694 VUs  1m42.6s/3m00.0s

running (1m43.6s), 694/694 VUs, 115149 complete and 0 interrupted iterations
default   [  58% ] 694/694 VUs  1m43.6s/3m00.0s

running (1m44.6s), 694/694 VUs, 116543 complete and 0 interrupted iterations
default   [  58% ] 694/694 VUs  1m44.6s/3m00.0s

running (1m46.3s), 694/694 VUs, 116755 complete and 0 interrupted iterations
default   [  59% ] 694/694 VUs  1m46.3s/3m00.0s

running (1m46.6s), 694/694 VUs, 117560 complete and 0 interrupted iterations
default   [  59% ] 694/694 VUs  1m46.6s/3m00.0s

running (1m47.6s), 694/694 VUs, 118406 complete and 0 interrupted iterations
default   [  60% ] 694/694 VUs  1m47.6s/3m00.0s

running (1m48.6s), 694/694 VUs, 119784 complete and 0 interrupted iterations
default   [  60% ] 694/694 VUs  1m48.6s/3m00.0s

running (1m49.6s), 694/694 VUs, 120847 complete and 0 interrupted iterations
default   [  61% ] 694/694 VUs  1m49.6s/3m00.0s

running (1m50.6s), 694/694 VUs, 121213 complete and 0 interrupted iterations
default   [  61% ] 694/694 VUs  1m50.6s/3m00.0s

running (1m51.6s), 694/694 VUs, 122679 complete and 0 interrupted iterations
default   [  62% ] 694/694 VUs  1m51.6s/3m00.0s

running (1m52.6s), 694/694 VUs, 123452 complete and 0 interrupted iterations
default   [  63% ] 694/694 VUs  1m52.6s/3m00.0s

running (1m53.6s), 694/694 VUs, 124756 complete and 0 interrupted iterations
default   [  63% ] 694/694 VUs  1m53.6s/3m00.0s

running (1m55.2s), 694/694 VUs, 124960 complete and 0 interrupted iterations
default   [  64% ] 694/694 VUs  1m55.2s/3m00.0s

running (1m55.6s), 694/694 VUs, 125844 complete and 0 interrupted iterations
default   [  64% ] 694/694 VUs  1m55.6s/3m00.0s

running (1m56.6s), 694/694 VUs, 128072 complete and 0 interrupted iterations
default   [  65% ] 694/694 VUs  1m56.6s/3m00.0s

running (1m57.6s), 694/694 VUs, 129463 complete and 0 interrupted iterations
default   [  65% ] 694/694 VUs  1m57.6s/3m00.0s

running (1m58.6s), 694/694 VUs, 130375 complete and 0 interrupted iterations
default   [  66% ] 694/694 VUs  1m58.6s/3m00.0s

running (1m59.6s), 694/694 VUs, 131719 complete and 0 interrupted iterations
default   [  66% ] 694/694 VUs  1m59.6s/3m00.0s

running (2m00.6s), 694/694 VUs, 133446 complete and 0 interrupted iterations
default   [  67% ] 694/694 VUs  2m00.6s/3m00.0s

running (2m01.6s), 694/694 VUs, 134578 complete and 0 interrupted iterations
default   [  68% ] 694/694 VUs  2m01.6s/3m00.0s

running (2m02.6s), 694/694 VUs, 136599 complete and 0 interrupted iterations
default   [  68% ] 694/694 VUs  2m02.6s/3m00.0s

running (2m03.6s), 694/694 VUs, 138387 complete and 0 interrupted iterations
default   [  69% ] 694/694 VUs  2m03.6s/3m00.0s

running (2m04.6s), 694/694 VUs, 139365 complete and 0 interrupted iterations
default   [  69% ] 694/694 VUs  2m04.6s/3m00.0s

running (2m05.6s), 694/694 VUs, 141399 complete and 0 interrupted iterations
default   [  70% ] 694/694 VUs  2m05.6s/3m00.0s

running (2m06.6s), 694/694 VUs, 142419 complete and 0 interrupted iterations
default   [  70% ] 694/694 VUs  2m06.6s/3m00.0s

running (2m07.6s), 694/694 VUs, 144807 complete and 0 interrupted iterations
default   [  71% ] 694/694 VUs  2m07.6s/3m00.0s

running (2m08.6s), 694/694 VUs, 146371 complete and 0 interrupted iterations
default   [  71% ] 694/694 VUs  2m08.6s/3m00.0s

running (2m09.6s), 694/694 VUs, 147982 complete and 0 interrupted iterations
default   [  72% ] 694/694 VUs  2m09.6s/3m00.0s

running (2m10.6s), 694/694 VUs, 149771 complete and 0 interrupted iterations
default   [  73% ] 694/694 VUs  2m10.6s/3m00.0s

running (2m11.6s), 694/694 VUs, 150839 complete and 0 interrupted iterations
default   [  73% ] 694/694 VUs  2m11.6s/3m00.0s

running (2m12.6s), 694/694 VUs, 151703 complete and 0 interrupted iterations
default   [  74% ] 694/694 VUs  2m12.6s/3m00.0s

running (2m13.8s), 694/694 VUs, 151911 complete and 0 interrupted iterations
default   [  74% ] 694/694 VUs  2m13.8s/3m00.0s

running (2m14.6s), 694/694 VUs, 153499 complete and 0 interrupted iterations
default   [  75% ] 694/694 VUs  2m14.6s/3m00.0s

running (2m15.6s), 694/694 VUs, 154727 complete and 0 interrupted iterations
default   [  75% ] 694/694 VUs  2m15.6s/3m00.0s

running (2m16.6s), 694/694 VUs, 156058 complete and 0 interrupted iterations
default   [  76% ] 694/694 VUs  2m16.6s/3m00.0s

running (2m17.6s), 694/694 VUs, 158019 complete and 0 interrupted iterations
default   [  76% ] 694/694 VUs  2m17.6s/3m00.0s

running (2m18.6s), 694/694 VUs, 158974 complete and 0 interrupted iterations
default   [  77% ] 694/694 VUs  2m18.6s/3m00.0s

running (2m19.6s), 694/694 VUs, 160920 complete and 0 interrupted iterations
default   [  78% ] 694/694 VUs  2m19.6s/3m00.0s

running (2m20.6s), 694/694 VUs, 162092 complete and 0 interrupted iterations
default   [  78% ] 694/694 VUs  2m20.6s/3m00.0s

running (2m21.6s), 694/694 VUs, 163028 complete and 0 interrupted iterations
default   [  79% ] 694/694 VUs  2m21.6s/3m00.0s

running (2m22.6s), 694/694 VUs, 163899 complete and 0 interrupted iterations
default   [  79% ] 694/694 VUs  2m22.6s/3m00.0s

running (2m23.6s), 694/694 VUs, 165333 complete and 0 interrupted iterations
default   [  80% ] 694/694 VUs  2m23.6s/3m00.0s

running (2m24.6s), 694/694 VUs, 166179 complete and 0 interrupted iterations
default   [  80% ] 694/694 VUs  2m24.6s/3m00.0s

running (2m25.6s), 694/694 VUs, 166857 complete and 0 interrupted iterations
default   [  81% ] 694/694 VUs  2m25.6s/3m00.0s

running (2m26.7s), 694/694 VUs, 167012 complete and 0 interrupted iterations
default   [  82% ] 694/694 VUs  2m26.7s/3m00.0s

running (2m27.6s), 694/694 VUs, 169003 complete and 0 interrupted iterations
default   [  82% ] 694/694 VUs  2m27.6s/3m00.0s

running (2m28.6s), 694/694 VUs, 170213 complete and 0 interrupted iterations
default   [  83% ] 694/694 VUs  2m28.6s/3m00.0s

running (2m29.6s), 694/694 VUs, 171008 complete and 0 interrupted iterations
default   [  83% ] 694/694 VUs  2m29.6s/3m00.0s

running (2m30.6s), 694/694 VUs, 171805 complete and 0 interrupted iterations
default   [  84% ] 694/694 VUs  2m30.6s/3m00.0s

running (2m31.6s), 694/694 VUs, 173145 complete and 0 interrupted iterations
default   [  84% ] 694/694 VUs  2m31.6s/3m00.0s

running (2m32.6s), 694/694 VUs, 173779 complete and 0 interrupted iterations
default   [  85% ] 694/694 VUs  2m32.6s/3m00.0s

running (2m33.6s), 694/694 VUs, 176047 complete and 0 interrupted iterations
default   [  85% ] 694/694 VUs  2m33.6s/3m00.0s

running (2m34.6s), 694/694 VUs, 176417 complete and 0 interrupted iterations
default   [  86% ] 694/694 VUs  2m34.6s/3m00.0s

running (2m35.6s), 694/694 VUs, 177989 complete and 0 interrupted iterations
default   [  86% ] 694/694 VUs  2m35.6s/3m00.0s

running (2m36.6s), 694/694 VUs, 179105 complete and 0 interrupted iterations
default   [  87% ] 694/694 VUs  2m36.6s/3m00.0s

running (2m37.6s), 694/694 VUs, 179518 complete and 0 interrupted iterations
default   [  88% ] 694/694 VUs  2m37.6s/3m00.0s

running (2m38.6s), 694/694 VUs, 181055 complete and 0 interrupted iterations
default   [  88% ] 694/694 VUs  2m38.6s/3m00.0s

running (2m39.6s), 694/694 VUs, 182224 complete and 0 interrupted iterations
default   [  89% ] 694/694 VUs  2m39.6s/3m00.0s

running (2m40.8s), 694/694 VUs, 182225 complete and 0 interrupted iterations
default   [  89% ] 694/694 VUs  2m40.8s/3m00.0s

running (2m41.6s), 694/694 VUs, 183840 complete and 0 interrupted iterations
default   [  90% ] 694/694 VUs  2m41.6s/3m00.0s

running (2m42.6s), 694/694 VUs, 184470 complete and 0 interrupted iterations
default   [  90% ] 694/694 VUs  2m42.6s/3m00.0s

running (2m43.6s), 694/694 VUs, 185747 complete and 0 interrupted iterations
default   [  91% ] 694/694 VUs  2m43.6s/3m00.0s

running (2m44.6s), 694/694 VUs, 186921 complete and 0 interrupted iterations
default   [  91% ] 694/694 VUs  2m44.6s/3m00.0s

running (2m45.6s), 694/694 VUs, 188358 complete and 0 interrupted iterations
default   [  92% ] 694/694 VUs  2m45.6s/3m00.0s

running (2m46.6s), 694/694 VUs, 188781 complete and 0 interrupted iterations
default   [  93% ] 694/694 VUs  2m46.6s/3m00.0s

running (2m47.6s), 694/694 VUs, 190423 complete and 0 interrupted iterations
default   [  93% ] 694/694 VUs  2m47.6s/3m00.0s

running (2m48.6s), 694/694 VUs, 191658 complete and 0 interrupted iterations
default   [  94% ] 694/694 VUs  2m48.6s/3m00.0s

running (2m49.6s), 694/694 VUs, 193036 complete and 0 interrupted iterations
default   [  94% ] 694/694 VUs  2m49.6s/3m00.0s

running (2m50.6s), 694/694 VUs, 193636 complete and 0 interrupted iterations
default   [  95% ] 694/694 VUs  2m50.6s/3m00.0s

running (2m51.6s), 694/694 VUs, 195523 complete and 0 interrupted iterations
default   [  95% ] 694/694 VUs  2m51.6s/3m00.0s

running (2m52.6s), 694/694 VUs, 196709 complete and 0 interrupted iterations
default   [  96% ] 694/694 VUs  2m52.6s/3m00.0s

running (2m53.6s), 694/694 VUs, 199198 complete and 0 interrupted iterations
default   [  96% ] 694/694 VUs  2m53.6s/3m00.0s

running (2m54.6s), 694/694 VUs, 200342 complete and 0 interrupted iterations
default   [  97% ] 694/694 VUs  2m54.6s/3m00.0s

running (2m55.6s), 694/694 VUs, 201983 complete and 0 interrupted iterations
default   [  98% ] 694/694 VUs  2m55.6s/3m00.0s

running (2m56.6s), 694/694 VUs, 203655 complete and 0 interrupted iterations
default   [  98% ] 694/694 VUs  2m56.6s/3m00.0s

running (2m57.6s), 694/694 VUs, 204685 complete and 0 interrupted iterations
default   [  99% ] 694/694 VUs  2m57.6s/3m00.0s

running (2m58.7s), 694/694 VUs, 206600 complete and 0 interrupted iterations
default   [  99% ] 694/694 VUs  2m58.7s/3m00.0s

running (2m59.6s), 694/694 VUs, 206790 complete and 0 interrupted iterations
default   [ 100% ] 694/694 VUs  2m59.6s/3m00.0s

running (3m00.6s), 219/694 VUs, 207935 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m01.3s), 000/694 VUs, 208154 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/694 VUs  3m0s

     ✗ logged in successfully
      ↳  10% — ✓ 22676 / ✗ 185478
     ✓ retrieved member

     checks.........................: 15.31% ✓ 33537       ✗ 185478
     data_received..................: 166 MB 917 kB/s
     data_sent......................: 75 MB  413 kB/s
     http_req_blocked...............: avg=57.3ms   min=0s       med=0s       max=1.83s    p(90)=239.68ms p(95)=489.42ms
     http_req_connecting............: avg=80.76ms  min=0s       med=65.78ms  max=1.13s    p(90)=180.72ms p(95)=227ms   
   ✗ http_req_duration..............: avg=151.85ms min=0s       med=0s       max=4.67s    p(90)=805.55ms p(95)=1.12s   
       { expected_response:true }...: avg=1.03s    min=55.01ms  med=982.97ms max=4.67s    p(90)=1.6s     p(95)=1.85s   
     http_req_failed................: 87.90% ✓ 202903      ✗ 27927 
     http_req_receiving.............: avg=1.22ms   min=0s       med=0s       max=211.26ms p(90)=35.4µs   p(95)=76.09µs 
     http_req_sending...............: avg=685.35µs min=0s       med=0s       max=1.33s    p(90)=31.93µs  p(95)=211.23µs
     http_req_tls_handshaking.......: avg=47.47ms  min=0s       med=0s       max=1.78s    p(90)=195.63ms p(95)=395.59ms
     http_req_waiting...............: avg=149.95ms min=0s       med=0s       max=4.67s    p(90)=796.11ms p(95)=1.11s   
     http_reqs......................: 230830 1273.459586/s
     iteration_duration.............: avg=477.67ms min=426.62µs med=207.84ms max=6.59s    p(90)=1.32s    p(95)=2.11s   
     iterations.....................: 208154 1148.358994/s
     vus............................: 142    min=12        max=694 
     vus_max........................: 694    min=694       max=694 

```
