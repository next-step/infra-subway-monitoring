## 스크립트
```

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    {duration: '30s', target: 100},
    {duration: '30s', target: 200},
    {duration: '30s', target: 300},
    {duration: '30s', target: 400},
    {duration: '30s', target: 500},
    {duration: '30s', target: 600},
    {duration: '30s', target: 700},
    {duration: '30s', target: 800},
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
     script: ./stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 800 max VUs, 4m30s max duration (incl. graceful stop):
           * default: Up to 800 looping VUs for 4m0s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.4s), 002/800 VUs, 70 complete and 0 interrupted iterations
default   [   0% ] 002/800 VUs  0m00.4s/4m00.0s

running (0m01.4s), 005/800 VUs, 1268 complete and 0 interrupted iterations
default   [   1% ] 005/800 VUs  0m01.4s/4m00.0s

running (0m02.4s), 009/800 VUs, 1842 complete and 0 interrupted iterations
default   [   1% ] 009/800 VUs  0m02.4s/4m00.0s

running (0m03.4s), 012/800 VUs, 1900 complete and 0 interrupted iterations
default   [   1% ] 012/800 VUs  0m03.4s/4m00.0s

running (0m04.4s), 015/800 VUs, 1992 complete and 0 interrupted iterations
default   [   2% ] 015/800 VUs  0m04.4s/4m00.0s

running (0m05.4s), 018/800 VUs, 2078 complete and 0 interrupted iterations
default   [   2% ] 018/800 VUs  0m05.4s/4m00.0s

running (0m06.4s), 022/800 VUs, 2184 complete and 0 interrupted iterations
default   [   3% ] 022/800 VUs  0m06.4s/4m00.0s

running (0m07.4s), 025/800 VUs, 2295 complete and 0 interrupted iterations
default   [   3% ] 025/800 VUs  0m07.4s/4m00.0s

running (0m08.4s), 028/800 VUs, 2407 complete and 0 interrupted iterations
default   [   4% ] 028/800 VUs  0m08.4s/4m00.0s

running (0m09.4s), 032/800 VUs, 2529 complete and 0 interrupted iterations
default   [   4% ] 032/800 VUs  0m09.4s/4m00.0s

running (0m10.4s), 035/800 VUs, 2657 complete and 0 interrupted iterations
default   [   4% ] 035/800 VUs  0m10.4s/4m00.0s

running (0m11.4s), 038/800 VUs, 2773 complete and 0 interrupted iterations
default   [   5% ] 038/800 VUs  0m11.4s/4m00.0s

running (0m12.4s), 042/800 VUs, 2907 complete and 0 interrupted iterations
default   [   5% ] 042/800 VUs  0m12.4s/4m00.0s

running (0m13.4s), 045/800 VUs, 3036 complete and 0 interrupted iterations
default   [   6% ] 045/800 VUs  0m13.4s/4m00.0s

running (0m14.4s), 048/800 VUs, 3173 complete and 0 interrupted iterations
default   [   6% ] 048/800 VUs  0m14.4s/4m00.0s

running (0m15.4s), 051/800 VUs, 3317 complete and 0 interrupted iterations
default   [   6% ] 051/800 VUs  0m15.4s/4m00.0s

running (0m16.4s), 055/800 VUs, 3464 complete and 0 interrupted iterations
default   [   7% ] 055/800 VUs  0m16.4s/4m00.0s

running (0m17.4s), 058/800 VUs, 3608 complete and 0 interrupted iterations
default   [   7% ] 058/800 VUs  0m17.4s/4m00.0s

running (0m18.4s), 061/800 VUs, 3747 complete and 0 interrupted iterations
default   [   8% ] 061/800 VUs  0m18.4s/4m00.0s

running (0m19.4s), 065/800 VUs, 3905 complete and 0 interrupted iterations
default   [   8% ] 065/800 VUs  0m19.4s/4m00.0s

running (0m20.4s), 068/800 VUs, 4069 complete and 0 interrupted iterations
default   [   9% ] 068/800 VUs  0m20.4s/4m00.0s

running (0m21.4s), 071/800 VUs, 4231 complete and 0 interrupted iterations
default   [   9% ] 071/800 VUs  0m21.4s/4m00.0s

running (0m22.5s), 075/800 VUs, 4368 complete and 0 interrupted iterations
default   [   9% ] 075/800 VUs  0m22.4s/4m00.0s

running (0m23.4s), 078/800 VUs, 4531 complete and 0 interrupted iterations
default   [  10% ] 078/800 VUs  0m23.4s/4m00.0s

running (0m24.4s), 081/800 VUs, 4689 complete and 0 interrupted iterations
default   [  10% ] 081/800 VUs  0m24.4s/4m00.0s

running (0m25.4s), 084/800 VUs, 4858 complete and 0 interrupted iterations
default   [  11% ] 084/800 VUs  0m25.4s/4m00.0s

running (0m26.4s), 088/800 VUs, 5019 complete and 0 interrupted iterations
default   [  11% ] 088/800 VUs  0m26.4s/4m00.0s

running (0m27.4s), 091/800 VUs, 5173 complete and 0 interrupted iterations
default   [  11% ] 091/800 VUs  0m27.4s/4m00.0s

running (0m28.4s), 094/800 VUs, 5342 complete and 0 interrupted iterations
default   [  12% ] 094/800 VUs  0m28.4s/4m00.0s

running (0m29.4s), 098/800 VUs, 5516 complete and 0 interrupted iterations
default   [  12% ] 098/800 VUs  0m29.4s/4m00.0s

running (0m30.4s), 101/800 VUs, 5690 complete and 0 interrupted iterations
default   [  13% ] 101/800 VUs  0m30.4s/4m00.0s

running (0m31.4s), 104/800 VUs, 5861 complete and 0 interrupted iterations
default   [  13% ] 104/800 VUs  0m31.4s/4m00.0s

running (0m32.4s), 108/800 VUs, 6049 complete and 0 interrupted iterations
default   [  14% ] 108/800 VUs  0m32.4s/4m00.0s

running (0m33.4s), 111/800 VUs, 6227 complete and 0 interrupted iterations
default   [  14% ] 111/800 VUs  0m33.4s/4m00.0s

running (0m34.4s), 114/800 VUs, 6400 complete and 0 interrupted iterations
default   [  14% ] 114/800 VUs  0m34.4s/4m00.0s

running (0m35.4s), 118/800 VUs, 6575 complete and 0 interrupted iterations
default   [  15% ] 118/800 VUs  0m35.4s/4m00.0s

running (0m36.4s), 121/800 VUs, 6763 complete and 0 interrupted iterations
default   [  15% ] 121/800 VUs  0m36.4s/4m00.0s

running (0m37.4s), 124/800 VUs, 6938 complete and 0 interrupted iterations
default   [  16% ] 124/800 VUs  0m37.4s/4m00.0s

running (0m38.4s), 128/800 VUs, 7121 complete and 0 interrupted iterations
default   [  16% ] 128/800 VUs  0m38.4s/4m00.0s

running (0m39.4s), 131/800 VUs, 7301 complete and 0 interrupted iterations
default   [  16% ] 131/800 VUs  0m39.4s/4m00.0s

running (0m40.4s), 134/800 VUs, 7465 complete and 0 interrupted iterations
default   [  17% ] 134/800 VUs  0m40.4s/4m00.0s

running (0m41.4s), 138/800 VUs, 7645 complete and 0 interrupted iterations
default   [  17% ] 138/800 VUs  0m41.4s/4m00.0s

running (0m42.4s), 141/800 VUs, 7808 complete and 0 interrupted iterations
default   [  18% ] 141/800 VUs  0m42.4s/4m00.0s

running (0m43.4s), 144/800 VUs, 8042 complete and 0 interrupted iterations
default   [  18% ] 144/800 VUs  0m43.4s/4m00.0s

running (0m44.4s), 148/800 VUs, 8226 complete and 0 interrupted iterations
default   [  19% ] 148/800 VUs  0m44.4s/4m00.0s

running (0m45.4s), 151/800 VUs, 8407 complete and 0 interrupted iterations
default   [  19% ] 151/800 VUs  0m45.4s/4m00.0s

running (0m46.4s), 154/800 VUs, 8574 complete and 0 interrupted iterations
default   [  19% ] 154/800 VUs  0m46.4s/4m00.0s

running (0m47.4s), 158/800 VUs, 8712 complete and 0 interrupted iterations
default   [  20% ] 158/800 VUs  0m47.4s/4m00.0s

running (0m48.4s), 161/800 VUs, 8848 complete and 0 interrupted iterations
default   [  20% ] 161/800 VUs  0m48.4s/4m00.0s

running (0m49.4s), 164/800 VUs, 8923 complete and 0 interrupted iterations
default   [  21% ] 164/800 VUs  0m49.4s/4m00.0s

running (0m50.4s), 168/800 VUs, 9060 complete and 0 interrupted iterations
default   [  21% ] 168/800 VUs  0m50.4s/4m00.0s

running (0m51.4s), 171/800 VUs, 9243 complete and 0 interrupted iterations
default   [  21% ] 171/800 VUs  0m51.4s/4m00.0s

running (0m52.4s), 174/800 VUs, 9429 complete and 0 interrupted iterations
default   [  22% ] 174/800 VUs  0m52.4s/4m00.0s

running (0m53.4s), 178/800 VUs, 9622 complete and 0 interrupted iterations
default   [  22% ] 178/800 VUs  0m53.4s/4m00.0s

running (0m54.4s), 181/800 VUs, 9819 complete and 0 interrupted iterations
default   [  23% ] 181/800 VUs  0m54.4s/4m00.0s

running (0m55.4s), 184/800 VUs, 10004 complete and 0 interrupted iterations
default   [  23% ] 184/800 VUs  0m55.4s/4m00.0s

running (0m56.4s), 188/800 VUs, 10207 complete and 0 interrupted iterations
default   [  24% ] 188/800 VUs  0m56.4s/4m00.0s

running (0m57.4s), 191/800 VUs, 10374 complete and 0 interrupted iterations
default   [  24% ] 191/800 VUs  0m57.4s/4m00.0s

running (0m58.4s), 194/800 VUs, 10590 complete and 0 interrupted iterations
default   [  24% ] 194/800 VUs  0m58.4s/4m00.0s

running (0m59.4s), 198/800 VUs, 10781 complete and 0 interrupted iterations
default   [  25% ] 198/800 VUs  0m59.4s/4m00.0s

running (1m00.4s), 201/800 VUs, 10985 complete and 0 interrupted iterations
default   [  25% ] 201/800 VUs  1m00.4s/4m00.0s

running (1m01.5s), 204/800 VUs, 11188 complete and 0 interrupted iterations
default   [  26% ] 204/800 VUs  1m01.5s/4m00.0s

running (1m02.4s), 208/800 VUs, 11389 complete and 0 interrupted iterations
default   [  26% ] 208/800 VUs  1m02.4s/4m00.0s

running (1m03.4s), 211/800 VUs, 11580 complete and 0 interrupted iterations
default   [  26% ] 211/800 VUs  1m03.4s/4m00.0s

running (1m04.4s), 214/800 VUs, 11724 complete and 0 interrupted iterations
default   [  27% ] 214/800 VUs  1m04.4s/4m00.0s

running (1m05.4s), 218/800 VUs, 11910 complete and 0 interrupted iterations
default   [  27% ] 218/800 VUs  1m05.4s/4m00.0s

running (1m06.4s), 221/800 VUs, 12119 complete and 0 interrupted iterations
default   [  28% ] 221/800 VUs  1m06.4s/4m00.0s

running (1m07.4s), 224/800 VUs, 12336 complete and 0 interrupted iterations
default   [  28% ] 224/800 VUs  1m07.4s/4m00.0s

running (1m08.4s), 228/800 VUs, 12519 complete and 0 interrupted iterations
default   [  29% ] 228/800 VUs  1m08.4s/4m00.0s

running (1m09.4s), 231/800 VUs, 12732 complete and 0 interrupted iterations
default   [  29% ] 231/800 VUs  1m09.4s/4m00.0s

running (1m10.4s), 234/800 VUs, 12930 complete and 0 interrupted iterations
default   [  29% ] 234/800 VUs  1m10.4s/4m00.0s

running (1m11.4s), 238/800 VUs, 13153 complete and 0 interrupted iterations
default   [  30% ] 238/800 VUs  1m11.4s/4m00.0s

running (1m12.4s), 241/800 VUs, 13364 complete and 0 interrupted iterations
default   [  30% ] 241/800 VUs  1m12.4s/4m00.0s

running (1m13.4s), 244/800 VUs, 13661 complete and 0 interrupted iterations
default   [  31% ] 244/800 VUs  1m13.4s/4m00.0s

running (1m14.5s), 248/800 VUs, 14276 complete and 0 interrupted iterations
default   [  31% ] 248/800 VUs  1m14.5s/4m00.0s

running (1m15.4s), 251/800 VUs, 15023 complete and 0 interrupted iterations
default   [  31% ] 251/800 VUs  1m15.4s/4m00.0s

running (1m16.4s), 254/800 VUs, 16013 complete and 0 interrupted iterations
default   [  32% ] 254/800 VUs  1m16.4s/4m00.0s

running (1m17.4s), 258/800 VUs, 16753 complete and 0 interrupted iterations
default   [  32% ] 258/800 VUs  1m17.4s/4m00.0s

running (1m18.4s), 261/800 VUs, 17791 complete and 0 interrupted iterations
default   [  33% ] 261/800 VUs  1m18.4s/4m00.0s

running (1m19.4s), 264/800 VUs, 18746 complete and 0 interrupted iterations
default   [  33% ] 264/800 VUs  1m19.4s/4m00.0s

running (1m20.4s), 268/800 VUs, 19594 complete and 0 interrupted iterations
default   [  34% ] 268/800 VUs  1m20.4s/4m00.0s

running (1m21.5s), 271/800 VUs, 20561 complete and 0 interrupted iterations
default   [  34% ] 271/800 VUs  1m21.4s/4m00.0s

running (1m22.4s), 274/800 VUs, 21509 complete and 0 interrupted iterations
default   [  34% ] 274/800 VUs  1m22.4s/4m00.0s

running (1m23.5s), 278/800 VUs, 22591 complete and 0 interrupted iterations
default   [  35% ] 278/800 VUs  1m23.5s/4m00.0s

running (1m24.5s), 281/800 VUs, 23308 complete and 0 interrupted iterations
default   [  35% ] 281/800 VUs  1m24.5s/4m00.0s

running (1m25.4s), 284/800 VUs, 24275 complete and 0 interrupted iterations
default   [  36% ] 284/800 VUs  1m25.4s/4m00.0s

running (1m26.4s), 288/800 VUs, 25036 complete and 0 interrupted iterations
default   [  36% ] 288/800 VUs  1m26.4s/4m00.0s

running (1m27.4s), 291/800 VUs, 26328 complete and 0 interrupted iterations
default   [  36% ] 291/800 VUs  1m27.4s/4m00.0s

running (1m28.4s), 294/800 VUs, 27460 complete and 0 interrupted iterations
default   [  37% ] 294/800 VUs  1m28.4s/4m00.0s

running (1m29.4s), 298/800 VUs, 28556 complete and 0 interrupted iterations
default   [  37% ] 298/800 VUs  1m29.4s/4m00.0s

running (1m30.4s), 301/800 VUs, 29452 complete and 0 interrupted iterations
default   [  38% ] 301/800 VUs  1m30.4s/4m00.0s

running (1m31.4s), 304/800 VUs, 30237 complete and 0 interrupted iterations
default   [  38% ] 304/800 VUs  1m31.4s/4m00.0s

running (1m32.4s), 308/800 VUs, 31478 complete and 0 interrupted iterations
default   [  39% ] 308/800 VUs  1m32.4s/4m00.0s

running (1m33.4s), 311/800 VUs, 32400 complete and 0 interrupted iterations
default   [  39% ] 311/800 VUs  1m33.4s/4m00.0s

running (1m34.5s), 314/800 VUs, 33363 complete and 0 interrupted iterations
default   [  39% ] 314/800 VUs  1m34.5s/4m00.0s

running (1m35.4s), 318/800 VUs, 34798 complete and 0 interrupted iterations
default   [  40% ] 318/800 VUs  1m35.4s/4m00.0s

running (1m36.4s), 321/800 VUs, 36040 complete and 0 interrupted iterations
default   [  40% ] 321/800 VUs  1m36.4s/4m00.0s

running (1m37.4s), 324/800 VUs, 37088 complete and 0 interrupted iterations
default   [  41% ] 324/800 VUs  1m37.4s/4m00.0s

running (1m38.4s), 328/800 VUs, 37901 complete and 0 interrupted iterations
default   [  41% ] 328/800 VUs  1m38.4s/4m00.0s

running (1m39.4s), 331/800 VUs, 39015 complete and 0 interrupted iterations
default   [  41% ] 331/800 VUs  1m39.4s/4m00.0s

running (1m40.4s), 334/800 VUs, 39885 complete and 0 interrupted iterations
default   [  42% ] 334/800 VUs  1m40.4s/4m00.0s

running (1m41.4s), 338/800 VUs, 41436 complete and 0 interrupted iterations
default   [  42% ] 338/800 VUs  1m41.4s/4m00.0s

running (1m42.4s), 341/800 VUs, 42816 complete and 0 interrupted iterations
default   [  43% ] 341/800 VUs  1m42.4s/4m00.0s

running (1m43.4s), 344/800 VUs, 44071 complete and 0 interrupted iterations
default   [  43% ] 344/800 VUs  1m43.4s/4m00.0s

running (1m44.4s), 348/800 VUs, 45313 complete and 0 interrupted iterations
default   [  44% ] 348/800 VUs  1m44.4s/4m00.0s

running (1m45.4s), 351/800 VUs, 46751 complete and 0 interrupted iterations
default   [  44% ] 351/800 VUs  1m45.4s/4m00.0s

running (1m46.4s), 354/800 VUs, 48003 complete and 0 interrupted iterations
default   [  44% ] 354/800 VUs  1m46.4s/4m00.0s

running (1m47.4s), 358/800 VUs, 48736 complete and 0 interrupted iterations
default   [  45% ] 358/800 VUs  1m47.4s/4m00.0s

running (1m48.4s), 361/800 VUs, 50028 complete and 0 interrupted iterations
default   [  45% ] 361/800 VUs  1m48.4s/4m00.0s

running (1m49.4s), 364/800 VUs, 51054 complete and 0 interrupted iterations
default   [  46% ] 364/800 VUs  1m49.4s/4m00.0s

running (1m50.4s), 368/800 VUs, 52492 complete and 0 interrupted iterations
default   [  46% ] 368/800 VUs  1m50.4s/4m00.0s

running (1m51.5s), 371/800 VUs, 53229 complete and 0 interrupted iterations
default   [  46% ] 371/800 VUs  1m51.5s/4m00.0s

running (1m52.4s), 374/800 VUs, 54067 complete and 0 interrupted iterations
default   [  47% ] 374/800 VUs  1m52.4s/4m00.0s

running (1m53.4s), 378/800 VUs, 55637 complete and 0 interrupted iterations
default   [  47% ] 378/800 VUs  1m53.4s/4m00.0s

running (1m54.4s), 381/800 VUs, 56567 complete and 0 interrupted iterations
default   [  48% ] 381/800 VUs  1m54.4s/4m00.0s

running (1m55.4s), 384/800 VUs, 57877 complete and 0 interrupted iterations
default   [  48% ] 384/800 VUs  1m55.4s/4m00.0s

running (1m56.4s), 388/800 VUs, 59078 complete and 0 interrupted iterations
default   [  49% ] 388/800 VUs  1m56.4s/4m00.0s

running (1m57.4s), 391/800 VUs, 60348 complete and 0 interrupted iterations
default   [  49% ] 391/800 VUs  1m57.4s/4m00.0s

running (1m58.4s), 394/800 VUs, 61944 complete and 0 interrupted iterations
default   [  49% ] 394/800 VUs  1m58.4s/4m00.0s

running (1m59.5s), 398/800 VUs, 63042 complete and 0 interrupted iterations
default   [  50% ] 398/800 VUs  1m59.5s/4m00.0s

running (2m00.4s), 401/800 VUs, 63747 complete and 0 interrupted iterations
default   [  50% ] 401/800 VUs  2m00.4s/4m00.0s

running (2m01.4s), 404/800 VUs, 65080 complete and 0 interrupted iterations
default   [  51% ] 404/800 VUs  2m01.4s/4m00.0s

running (2m02.4s), 408/800 VUs, 66520 complete and 0 interrupted iterations
default   [  51% ] 408/800 VUs  2m02.4s/4m00.0s

running (2m03.4s), 411/800 VUs, 67499 complete and 0 interrupted iterations
default   [  51% ] 411/800 VUs  2m03.4s/4m00.0s

running (2m04.4s), 414/800 VUs, 68688 complete and 0 interrupted iterations
default   [  52% ] 414/800 VUs  2m04.4s/4m00.0s

running (2m05.4s), 418/800 VUs, 69933 complete and 0 interrupted iterations
default   [  52% ] 418/800 VUs  2m05.4s/4m00.0s

running (2m06.4s), 421/800 VUs, 71192 complete and 0 interrupted iterations
default   [  53% ] 421/800 VUs  2m06.4s/4m00.0s

running (2m07.4s), 424/800 VUs, 71775 complete and 0 interrupted iterations
default   [  53% ] 424/800 VUs  2m07.4s/4m00.0s

running (2m08.9s), 429/800 VUs, 72301 complete and 0 interrupted iterations
default   [  54% ] 429/800 VUs  2m08.9s/4m00.0s

running (2m09.4s), 431/800 VUs, 73019 complete and 0 interrupted iterations
default   [  54% ] 431/800 VUs  2m09.4s/4m00.0s

running (2m10.5s), 434/800 VUs, 73974 complete and 0 interrupted iterations
default   [  54% ] 434/800 VUs  2m10.5s/4m00.0s

running (2m11.5s), 438/800 VUs, 74861 complete and 0 interrupted iterations
default   [  55% ] 438/800 VUs  2m11.4s/4m00.0s

running (2m12.4s), 441/800 VUs, 75748 complete and 0 interrupted iterations
default   [  55% ] 441/800 VUs  2m12.4s/4m00.0s

running (2m13.4s), 444/800 VUs, 76789 complete and 0 interrupted iterations
default   [  56% ] 444/800 VUs  2m13.4s/4m00.0s

running (2m14.4s), 448/800 VUs, 77666 complete and 0 interrupted iterations
default   [  56% ] 448/800 VUs  2m14.4s/4m00.0s

running (2m15.4s), 451/800 VUs, 78578 complete and 0 interrupted iterations
default   [  56% ] 451/800 VUs  2m15.4s/4m00.0s

running (2m16.4s), 454/800 VUs, 79730 complete and 0 interrupted iterations
default   [  57% ] 454/800 VUs  2m16.4s/4m00.0s

running (2m17.4s), 458/800 VUs, 80721 complete and 0 interrupted iterations
default   [  57% ] 458/800 VUs  2m17.4s/4m00.0s

running (2m18.4s), 461/800 VUs, 81171 complete and 0 interrupted iterations
default   [  58% ] 461/800 VUs  2m18.4s/4m00.0s

running (2m20.5s), 468/800 VUs, 81912 complete and 0 interrupted iterations
default   [  59% ] 468/800 VUs  2m20.5s/4m00.0s

running (2m21.4s), 471/800 VUs, 82689 complete and 0 interrupted iterations
default   [  59% ] 471/800 VUs  2m21.4s/4m00.0s

running (2m22.4s), 474/800 VUs, 83047 complete and 0 interrupted iterations
default   [  59% ] 474/800 VUs  2m22.4s/4m00.0s

running (2m25.8s), 485/800 VUs, 84311 complete and 0 interrupted iterations
default   [  61% ] 485/800 VUs  2m25.8s/4m00.0s

running (2m26.4s), 488/800 VUs, 85052 complete and 0 interrupted iterations
default   [  61% ] 488/800 VUs  2m26.4s/4m00.0s

running (2m27.4s), 491/800 VUs, 86022 complete and 0 interrupted iterations
default   [  61% ] 491/800 VUs  2m27.4s/4m00.0s

running (2m28.4s), 494/800 VUs, 86730 complete and 0 interrupted iterations
default   [  62% ] 494/800 VUs  2m28.4s/4m00.0s

running (2m29.4s), 498/800 VUs, 87710 complete and 0 interrupted iterations
default   [  62% ] 498/800 VUs  2m29.4s/4m00.0s

running (2m30.4s), 501/800 VUs, 88498 complete and 0 interrupted iterations
default   [  63% ] 501/800 VUs  2m30.4s/4m00.0s

running (2m31.4s), 504/800 VUs, 89452 complete and 0 interrupted iterations
default   [  63% ] 504/800 VUs  2m31.4s/4m00.0s

running (2m32.4s), 508/800 VUs, 91006 complete and 0 interrupted iterations
default   [  64% ] 508/800 VUs  2m32.4s/4m00.0s

running (2m33.5s), 511/800 VUs, 91960 complete and 0 interrupted iterations
default   [  64% ] 511/800 VUs  2m33.4s/4m00.0s

running (2m34.4s), 514/800 VUs, 92910 complete and 0 interrupted iterations
default   [  64% ] 514/800 VUs  2m34.4s/4m00.0s

running (2m35.4s), 518/800 VUs, 94154 complete and 0 interrupted iterations
default   [  65% ] 518/800 VUs  2m35.4s/4m00.0s

running (2m36.4s), 521/800 VUs, 95136 complete and 0 interrupted iterations
default   [  65% ] 521/800 VUs  2m36.4s/4m00.0s

running (2m37.4s), 524/800 VUs, 96317 complete and 0 interrupted iterations
default   [  66% ] 524/800 VUs  2m37.4s/4m00.0s

running (2m38.4s), 528/800 VUs, 96914 complete and 0 interrupted iterations
default   [  66% ] 528/800 VUs  2m38.4s/4m00.0s

running (2m39.4s), 531/800 VUs, 97538 complete and 0 interrupted iterations
default   [  66% ] 531/800 VUs  2m39.4s/4m00.0s

running (2m40.4s), 534/800 VUs, 98900 complete and 0 interrupted iterations
default   [  67% ] 534/800 VUs  2m40.4s/4m00.0s

running (2m41.4s), 538/800 VUs, 99600 complete and 0 interrupted iterations
default   [  67% ] 538/800 VUs  2m41.4s/4m00.0s

running (2m42.4s), 541/800 VUs, 100885 complete and 0 interrupted iterations
default   [  68% ] 541/800 VUs  2m42.4s/4m00.0s

running (2m43.5s), 544/800 VUs, 102073 complete and 0 interrupted iterations
default   [  68% ] 544/800 VUs  2m43.5s/4m00.0s

running (2m44.4s), 548/800 VUs, 102979 complete and 0 interrupted iterations
default   [  69% ] 548/800 VUs  2m44.4s/4m00.0s

running (2m45.4s), 551/800 VUs, 103831 complete and 0 interrupted iterations
default   [  69% ] 551/800 VUs  2m45.4s/4m00.0s

running (2m46.4s), 554/800 VUs, 104756 complete and 0 interrupted iterations
default   [  69% ] 554/800 VUs  2m46.4s/4m00.0s

running (2m47.4s), 558/800 VUs, 105296 complete and 0 interrupted iterations
default   [  70% ] 558/800 VUs  2m47.4s/4m00.0s

running (2m48.4s), 561/800 VUs, 106603 complete and 0 interrupted iterations
default   [  70% ] 561/800 VUs  2m48.4s/4m00.0s

running (2m49.4s), 564/800 VUs, 107289 complete and 0 interrupted iterations
default   [  71% ] 564/800 VUs  2m49.4s/4m00.0s

running (2m50.4s), 568/800 VUs, 108549 complete and 0 interrupted iterations
default   [  71% ] 568/800 VUs  2m50.4s/4m00.0s

running (2m51.5s), 571/800 VUs, 109209 complete and 0 interrupted iterations
default   [  71% ] 571/800 VUs  2m51.4s/4m00.0s

running (2m52.4s), 574/800 VUs, 109822 complete and 0 interrupted iterations
default   [  72% ] 574/800 VUs  2m52.4s/4m00.0s

running (2m53.4s), 578/800 VUs, 110800 complete and 0 interrupted iterations
default   [  72% ] 578/800 VUs  2m53.4s/4m00.0s

running (2m54.4s), 581/800 VUs, 112057 complete and 0 interrupted iterations
default   [  73% ] 581/800 VUs  2m54.4s/4m00.0s

running (2m55.4s), 584/800 VUs, 113246 complete and 0 interrupted iterations
default   [  73% ] 584/800 VUs  2m55.4s/4m00.0s

running (2m56.4s), 588/800 VUs, 115010 complete and 0 interrupted iterations
default   [  74% ] 588/800 VUs  2m56.4s/4m00.0s

running (2m57.4s), 591/800 VUs, 116674 complete and 0 interrupted iterations
default   [  74% ] 591/800 VUs  2m57.4s/4m00.0s

running (2m58.5s), 594/800 VUs, 117735 complete and 0 interrupted iterations
default   [  74% ] 594/800 VUs  2m58.5s/4m00.0s

running (2m59.4s), 598/800 VUs, 120644 complete and 0 interrupted iterations
default   [  75% ] 598/800 VUs  2m59.4s/4m00.0s

running (3m00.4s), 601/800 VUs, 121784 complete and 0 interrupted iterations
default   [  75% ] 601/800 VUs  3m00.4s/4m00.0s

running (3m01.5s), 604/800 VUs, 124198 complete and 0 interrupted iterations
default   [  76% ] 604/800 VUs  3m01.4s/4m00.0s

running (3m02.5s), 608/800 VUs, 125324 complete and 0 interrupted iterations
default   [  76% ] 608/800 VUs  3m02.5s/4m00.0s

running (3m03.4s), 611/800 VUs, 127562 complete and 0 interrupted iterations
default   [  76% ] 611/800 VUs  3m03.4s/4m00.0s

running (3m04.5s), 614/800 VUs, 129356 complete and 0 interrupted iterations
default   [  77% ] 614/800 VUs  3m04.4s/4m00.0s

running (3m05.4s), 618/800 VUs, 131418 complete and 0 interrupted iterations
default   [  77% ] 618/800 VUs  3m05.4s/4m00.0s

running (3m06.4s), 621/800 VUs, 132484 complete and 0 interrupted iterations
default   [  78% ] 621/800 VUs  3m06.4s/4m00.0s

running (3m07.4s), 624/800 VUs, 134709 complete and 0 interrupted iterations
default   [  78% ] 624/800 VUs  3m07.4s/4m00.0s

running (3m08.4s), 628/800 VUs, 136269 complete and 0 interrupted iterations
default   [  79% ] 628/800 VUs  3m08.4s/4m00.0s

running (3m09.4s), 631/800 VUs, 138273 complete and 0 interrupted iterations
default   [  79% ] 631/800 VUs  3m09.4s/4m00.0s

running (3m10.5s), 634/800 VUs, 140252 complete and 0 interrupted iterations
default   [  79% ] 634/800 VUs  3m10.5s/4m00.0s

running (3m11.4s), 638/800 VUs, 141099 complete and 0 interrupted iterations
default   [  80% ] 638/800 VUs  3m11.4s/4m00.0s

running (3m12.4s), 641/800 VUs, 142303 complete and 0 interrupted iterations
default   [  80% ] 641/800 VUs  3m12.4s/4m00.0s

running (3m13.4s), 644/800 VUs, 144403 complete and 0 interrupted iterations
default   [  81% ] 644/800 VUs  3m13.4s/4m00.0s

running (3m14.4s), 648/800 VUs, 145847 complete and 0 interrupted iterations
default   [  81% ] 648/800 VUs  3m14.4s/4m00.0s

running (3m15.5s), 651/800 VUs, 147294 complete and 0 interrupted iterations
default   [  81% ] 651/800 VUs  3m15.4s/4m00.0s

running (3m16.5s), 654/800 VUs, 149350 complete and 0 interrupted iterations
default   [  82% ] 654/800 VUs  3m16.4s/4m00.0s

running (3m17.4s), 658/800 VUs, 150960 complete and 0 interrupted iterations
default   [  82% ] 658/800 VUs  3m17.4s/4m00.0s

running (3m18.4s), 661/800 VUs, 152225 complete and 0 interrupted iterations
default   [  83% ] 661/800 VUs  3m18.4s/4m00.0s

running (3m19.4s), 664/800 VUs, 152822 complete and 0 interrupted iterations
default   [  83% ] 664/800 VUs  3m19.4s/4m00.0s

running (3m20.4s), 668/800 VUs, 153511 complete and 0 interrupted iterations
default   [  84% ] 668/800 VUs  3m20.4s/4m00.0s

running (3m21.4s), 671/800 VUs, 155476 complete and 0 interrupted iterations
default   [  84% ] 671/800 VUs  3m21.4s/4m00.0s

running (3m22.4s), 674/800 VUs, 155920 complete and 0 interrupted iterations
default   [  84% ] 674/800 VUs  3m22.4s/4m00.0s

running (3m23.4s), 678/800 VUs, 156694 complete and 0 interrupted iterations
default   [  85% ] 678/800 VUs  3m23.4s/4m00.0s

running (3m24.4s), 681/800 VUs, 158540 complete and 0 interrupted iterations
default   [  85% ] 681/800 VUs  3m24.4s/4m00.0s

running (3m25.4s), 684/800 VUs, 158648 complete and 0 interrupted iterations
default   [  86% ] 684/800 VUs  3m25.4s/4m00.0s

running (3m26.4s), 688/800 VUs, 160092 complete and 0 interrupted iterations
default   [  86% ] 688/800 VUs  3m26.4s/4m00.0s

running (3m27.4s), 691/800 VUs, 161312 complete and 0 interrupted iterations
default   [  86% ] 691/800 VUs  3m27.4s/4m00.0s

running (3m28.4s), 694/800 VUs, 162100 complete and 0 interrupted iterations
default   [  87% ] 694/800 VUs  3m28.4s/4m00.0s

running (3m29.4s), 698/800 VUs, 162792 complete and 0 interrupted iterations
default   [  87% ] 698/800 VUs  3m29.4s/4m00.0s

running (3m30.5s), 701/800 VUs, 163895 complete and 0 interrupted iterations
default   [  88% ] 701/800 VUs  3m30.5s/4m00.0s

running (3m31.4s), 704/800 VUs, 164991 complete and 0 interrupted iterations
default   [  88% ] 704/800 VUs  3m31.4s/4m00.0s

running (3m32.5s), 708/800 VUs, 166328 complete and 0 interrupted iterations
default   [  89% ] 708/800 VUs  3m32.4s/4m00.0s

running (3m33.4s), 711/800 VUs, 167603 complete and 0 interrupted iterations
default   [  89% ] 711/800 VUs  3m33.4s/4m00.0s

running (3m34.4s), 714/800 VUs, 168951 complete and 0 interrupted iterations
default   [  89% ] 714/800 VUs  3m34.4s/4m00.0s

running (3m35.4s), 718/800 VUs, 170326 complete and 0 interrupted iterations
default   [  90% ] 718/800 VUs  3m35.4s/4m00.0s

running (3m36.4s), 721/800 VUs, 172040 complete and 0 interrupted iterations
default   [  90% ] 721/800 VUs  3m36.4s/4m00.0s

running (3m37.4s), 724/800 VUs, 173359 complete and 0 interrupted iterations
default   [  91% ] 724/800 VUs  3m37.4s/4m00.0s

running (3m38.5s), 728/800 VUs, 175247 complete and 0 interrupted iterations
default   [  91% ] 728/800 VUs  3m38.4s/4m00.0s

running (3m39.4s), 731/800 VUs, 175946 complete and 0 interrupted iterations
default   [  91% ] 731/800 VUs  3m39.4s/4m00.0s

running (3m40.4s), 734/800 VUs, 177534 complete and 0 interrupted iterations
default   [  92% ] 734/800 VUs  3m40.4s/4m00.0s

running (3m41.4s), 738/800 VUs, 177946 complete and 0 interrupted iterations
default   [  92% ] 738/800 VUs  3m41.4s/4m00.0s

running (3m42.4s), 741/800 VUs, 179864 complete and 0 interrupted iterations
default   [  93% ] 741/800 VUs  3m42.4s/4m00.0s

running (3m43.4s), 744/800 VUs, 180240 complete and 0 interrupted iterations
default   [  93% ] 744/800 VUs  3m43.4s/4m00.0s

running (3m44.4s), 748/800 VUs, 182031 complete and 0 interrupted iterations
default   [  94% ] 748/800 VUs  3m44.4s/4m00.0s

running (3m45.4s), 751/800 VUs, 182774 complete and 0 interrupted iterations
default   [  94% ] 751/800 VUs  3m45.4s/4m00.0s

running (3m46.4s), 754/800 VUs, 183753 complete and 0 interrupted iterations
default   [  94% ] 754/800 VUs  3m46.4s/4m00.0s

running (3m47.5s), 758/800 VUs, 183854 complete and 0 interrupted iterations
default   [  95% ] 758/800 VUs  3m47.5s/4m00.0s

running (3m48.4s), 761/800 VUs, 185457 complete and 0 interrupted iterations
default   [  95% ] 761/800 VUs  3m48.4s/4m00.0s

running (3m49.4s), 764/800 VUs, 186852 complete and 0 interrupted iterations
default   [  96% ] 764/800 VUs  3m49.4s/4m00.0s

running (3m50.4s), 768/800 VUs, 187089 complete and 0 interrupted iterations
default   [  96% ] 768/800 VUs  3m50.4s/4m00.0s

running (3m51.4s), 771/800 VUs, 188418 complete and 0 interrupted iterations
default   [  96% ] 771/800 VUs  3m51.4s/4m00.0s

running (3m52.4s), 774/800 VUs, 189518 complete and 0 interrupted iterations
default   [  97% ] 774/800 VUs  3m52.4s/4m00.0s

running (3m53.4s), 778/800 VUs, 190804 complete and 0 interrupted iterations
default   [  97% ] 778/800 VUs  3m53.4s/4m00.0s

running (3m54.4s), 781/800 VUs, 191268 complete and 0 interrupted iterations
default   [  98% ] 781/800 VUs  3m54.4s/4m00.0s

running (3m55.4s), 784/800 VUs, 191732 complete and 0 interrupted iterations
default   [  98% ] 784/800 VUs  3m55.4s/4m00.0s

running (3m56.4s), 788/800 VUs, 193332 complete and 0 interrupted iterations
default   [  99% ] 788/800 VUs  3m56.4s/4m00.0s

running (3m57.4s), 791/800 VUs, 194610 complete and 0 interrupted iterations
default   [  99% ] 791/800 VUs  3m57.4s/4m00.0s

running (3m58.4s), 794/800 VUs, 194872 complete and 0 interrupted iterations
default   [  99% ] 794/800 VUs  3m58.4s/4m00.0s

running (3m59.8s), 799/800 VUs, 195063 complete and 0 interrupted iterations
default   [ 100% ] 799/800 VUs  3m59.8s/4m00.0s

running (4m00.4s), 220/800 VUs, 196349 complete and 0 interrupted iterations
default ↓ [ 100% ] 799/800 VUs  4m0s

running (4m01.4s), 021/800 VUs, 196548 complete and 0 interrupted iterations
default ↓ [ 100% ] 799/800 VUs  4m0s

running (4m01.5s), 000/800 VUs, 196569 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/800 VUs  4m0s

     ✗ logged in successfully
      ↳  21% — ✓ 42343 / ✗ 154226
     ✓ retrieved member

     checks.........................: 31.66% ✓ 71475      ✗ 154226
     data_received..................: 236 MB 976 kB/s
     data_sent......................: 81 MB  335 kB/s
     http_req_blocked...............: avg=52.6ms   min=0s       med=0s       max=1.4s     p(90)=221.44ms p(95)=401.24ms
     http_req_connecting............: avg=40.84ms  min=0s       med=11.64ms  max=1.03s    p(90)=125.99ms p(95)=154.68ms
   ✓ http_req_duration..............: avg=199.95ms min=0s       med=0s       max=4.43s    p(90)=743.46ms p(95)=1.1s    
       { expected_response:true }...: avg=574.1ms  min=11.91ms  med=454.47ms max=4.43s    p(90)=1.14s    p(95)=1.38s   
     http_req_failed................: 72.74% ✓ 173801     ✗ 65111 
     http_req_receiving.............: avg=619.04µs min=0s       med=0s       max=202.29ms p(90)=46.47µs  p(95)=73.67µs 
     http_req_sending...............: avg=3.07ms   min=0s       med=0s       max=998.87ms p(90)=97.46µs  p(95)=790.25µs
     http_req_tls_handshaking.......: avg=43.85ms  min=0s       med=0s       max=885.54ms p(90)=175.31ms p(95)=341.11ms
     http_req_waiting...............: avg=196.26ms min=0s       med=0s       max=4.42s    p(90)=733.33ms p(95)=1.09s   
     http_reqs......................: 238912 989.295341/s
     iteration_duration.............: avg=471.68ms min=379.77µs med=187.53ms max=6.83s    p(90)=1.32s    p(95)=1.96s   
     iterations.....................: 196569 813.959934/s
     vus............................: 124    min=4        max=799 
     vus_max........................: 800    min=800      max=800 


```
