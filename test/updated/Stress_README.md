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

  scenarios: (100.00%) 1 scenario, 700 max VUs, 4m0s max duration (incl. graceful stop):
           * default: Up to 700 looping VUs for 3m30s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.6s), 002/700 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 002/700 VUs  0m00.6s/3m30.0s

running (0m01.6s), 006/700 VUs, 31 complete and 0 interrupted iterations
default   [   1% ] 006/700 VUs  0m01.6s/3m30.0s

running (0m02.6s), 009/700 VUs, 115 complete and 0 interrupted iterations
default   [   1% ] 009/700 VUs  0m02.6s/3m30.0s

running (0m03.6s), 012/700 VUs, 202 complete and 0 interrupted iterations
default   [   2% ] 012/700 VUs  0m03.6s/3m30.0s

running (0m04.6s), 016/700 VUs, 308 complete and 0 interrupted iterations
default   [   2% ] 016/700 VUs  0m04.6s/3m30.0s

running (0m05.6s), 019/700 VUs, 424 complete and 0 interrupted iterations
default   [   3% ] 019/700 VUs  0m05.6s/3m30.0s

running (0m06.6s), 022/700 VUs, 535 complete and 0 interrupted iterations
default   [   3% ] 022/700 VUs  0m06.6s/3m30.0s

running (0m07.6s), 026/700 VUs, 660 complete and 0 interrupted iterations
default   [   4% ] 026/700 VUs  0m07.6s/3m30.0s

running (0m08.6s), 029/700 VUs, 785 complete and 0 interrupted iterations
default   [   4% ] 029/700 VUs  0m08.6s/3m30.0s

running (0m09.6s), 032/700 VUs, 920 complete and 0 interrupted iterations
default   [   5% ] 032/700 VUs  0m09.6s/3m30.0s

running (0m10.6s), 035/700 VUs, 1059 complete and 0 interrupted iterations
default   [   5% ] 035/700 VUs  0m10.6s/3m30.0s

running (0m11.6s), 039/700 VUs, 1193 complete and 0 interrupted iterations
default   [   6% ] 039/700 VUs  0m11.6s/3m30.0s

running (0m12.6s), 042/700 VUs, 1341 complete and 0 interrupted iterations
default   [   6% ] 042/700 VUs  0m12.6s/3m30.0s

running (0m13.6s), 045/700 VUs, 1485 complete and 0 interrupted iterations
default   [   6% ] 045/700 VUs  0m13.6s/3m30.0s

running (0m14.6s), 049/700 VUs, 1646 complete and 0 interrupted iterations
default   [   7% ] 049/700 VUs  0m14.6s/3m30.0s

running (0m15.6s), 052/700 VUs, 1803 complete and 0 interrupted iterations
default   [   7% ] 052/700 VUs  0m15.6s/3m30.0s

running (0m16.6s), 055/700 VUs, 1961 complete and 0 interrupted iterations
default   [   8% ] 055/700 VUs  0m16.6s/3m30.0s

running (0m17.6s), 059/700 VUs, 2139 complete and 0 interrupted iterations
default   [   8% ] 059/700 VUs  0m17.6s/3m30.0s

running (0m18.6s), 062/700 VUs, 2301 complete and 0 interrupted iterations
default   [   9% ] 062/700 VUs  0m18.6s/3m30.0s

running (0m19.6s), 065/700 VUs, 2477 complete and 0 interrupted iterations
default   [   9% ] 065/700 VUs  0m19.6s/3m30.0s

running (0m20.6s), 068/700 VUs, 2650 complete and 0 interrupted iterations
default   [  10% ] 068/700 VUs  0m20.6s/3m30.0s

running (0m21.6s), 072/700 VUs, 2824 complete and 0 interrupted iterations
default   [  10% ] 072/700 VUs  0m21.6s/3m30.0s

running (0m22.6s), 075/700 VUs, 3004 complete and 0 interrupted iterations
default   [  11% ] 075/700 VUs  0m22.6s/3m30.0s

running (0m23.6s), 078/700 VUs, 3175 complete and 0 interrupted iterations
default   [  11% ] 078/700 VUs  0m23.6s/3m30.0s

running (0m24.6s), 082/700 VUs, 3362 complete and 0 interrupted iterations
default   [  12% ] 082/700 VUs  0m24.6s/3m30.0s

running (0m25.6s), 085/700 VUs, 3541 complete and 0 interrupted iterations
default   [  12% ] 085/700 VUs  0m25.6s/3m30.0s

running (0m26.6s), 088/700 VUs, 3723 complete and 0 interrupted iterations
default   [  13% ] 088/700 VUs  0m26.6s/3m30.0s

running (0m27.6s), 092/700 VUs, 3903 complete and 0 interrupted iterations
default   [  13% ] 092/700 VUs  0m27.6s/3m30.0s

running (0m28.6s), 095/700 VUs, 4080 complete and 0 interrupted iterations
default   [  14% ] 095/700 VUs  0m28.6s/3m30.0s

running (0m29.6s), 098/700 VUs, 4281 complete and 0 interrupted iterations
default   [  14% ] 098/700 VUs  0m29.6s/3m30.0s

running (0m30.6s), 101/700 VUs, 4459 complete and 0 interrupted iterations
default   [  15% ] 101/700 VUs  0m30.6s/3m30.0s

running (0m31.6s), 105/700 VUs, 4653 complete and 0 interrupted iterations
default   [  15% ] 105/700 VUs  0m31.6s/3m30.0s

running (0m32.6s), 108/700 VUs, 4838 complete and 0 interrupted iterations
default   [  16% ] 108/700 VUs  0m32.6s/3m30.0s

running (0m33.6s), 111/700 VUs, 5015 complete and 0 interrupted iterations
default   [  16% ] 111/700 VUs  0m33.6s/3m30.0s

running (0m34.6s), 115/700 VUs, 5219 complete and 0 interrupted iterations
default   [  16% ] 115/700 VUs  0m34.6s/3m30.0s

running (0m35.6s), 118/700 VUs, 5384 complete and 0 interrupted iterations
default   [  17% ] 118/700 VUs  0m35.6s/3m30.0s

running (0m36.6s), 121/700 VUs, 5594 complete and 0 interrupted iterations
default   [  17% ] 121/700 VUs  0m36.6s/3m30.0s

running (0m37.6s), 125/700 VUs, 5802 complete and 0 interrupted iterations
default   [  18% ] 125/700 VUs  0m37.6s/3m30.0s

running (0m38.6s), 128/700 VUs, 6001 complete and 0 interrupted iterations
default   [  18% ] 128/700 VUs  0m38.6s/3m30.0s

running (0m39.6s), 131/700 VUs, 6198 complete and 0 interrupted iterations
default   [  19% ] 131/700 VUs  0m39.6s/3m30.0s

running (0m40.6s), 135/700 VUs, 6397 complete and 0 interrupted iterations
default   [  19% ] 135/700 VUs  0m40.6s/3m30.0s

running (0m41.6s), 138/700 VUs, 6604 complete and 0 interrupted iterations
default   [  20% ] 138/700 VUs  0m41.6s/3m30.0s

running (0m42.6s), 141/700 VUs, 6785 complete and 0 interrupted iterations
default   [  20% ] 141/700 VUs  0m42.6s/3m30.0s

running (0m43.6s), 145/700 VUs, 6987 complete and 0 interrupted iterations
default   [  21% ] 145/700 VUs  0m43.6s/3m30.0s

running (0m44.6s), 148/700 VUs, 7172 complete and 0 interrupted iterations
default   [  21% ] 148/700 VUs  0m44.6s/3m30.0s

running (0m45.6s), 151/700 VUs, 7362 complete and 0 interrupted iterations
default   [  22% ] 151/700 VUs  0m45.6s/3m30.0s

running (0m46.6s), 155/700 VUs, 7569 complete and 0 interrupted iterations
default   [  22% ] 155/700 VUs  0m46.6s/3m30.0s

running (0m47.6s), 158/700 VUs, 7777 complete and 0 interrupted iterations
default   [  23% ] 158/700 VUs  0m47.6s/3m30.0s

running (0m48.6s), 161/700 VUs, 7972 complete and 0 interrupted iterations
default   [  23% ] 161/700 VUs  0m48.6s/3m30.0s

running (0m49.6s), 165/700 VUs, 8190 complete and 0 interrupted iterations
default   [  24% ] 165/700 VUs  0m49.6s/3m30.0s

running (0m50.6s), 168/700 VUs, 8394 complete and 0 interrupted iterations
default   [  24% ] 168/700 VUs  0m50.6s/3m30.0s

running (0m51.6s), 171/700 VUs, 8605 complete and 0 interrupted iterations
default   [  25% ] 171/700 VUs  0m51.6s/3m30.0s

running (0m52.6s), 175/700 VUs, 8815 complete and 0 interrupted iterations
default   [  25% ] 175/700 VUs  0m52.6s/3m30.0s

running (0m53.6s), 178/700 VUs, 9022 complete and 0 interrupted iterations
default   [  26% ] 178/700 VUs  0m53.6s/3m30.0s

running (0m54.6s), 181/700 VUs, 9234 complete and 0 interrupted iterations
default   [  26% ] 181/700 VUs  0m54.6s/3m30.0s

running (0m55.6s), 185/700 VUs, 9453 complete and 0 interrupted iterations
default   [  26% ] 185/700 VUs  0m55.6s/3m30.0s

running (0m56.6s), 188/700 VUs, 9640 complete and 0 interrupted iterations
default   [  27% ] 188/700 VUs  0m56.6s/3m30.0s

running (0m57.6s), 191/700 VUs, 9864 complete and 0 interrupted iterations
default   [  27% ] 191/700 VUs  0m57.6s/3m30.0s

running (0m58.6s), 195/700 VUs, 10070 complete and 0 interrupted iterations
default   [  28% ] 195/700 VUs  0m58.6s/3m30.0s

running (0m59.6s), 198/700 VUs, 10296 complete and 0 interrupted iterations
default   [  28% ] 198/700 VUs  0m59.6s/3m30.0s

running (1m00.6s), 201/700 VUs, 10516 complete and 0 interrupted iterations
default   [  29% ] 201/700 VUs  1m00.6s/3m30.0s

running (1m01.6s), 205/700 VUs, 10752 complete and 0 interrupted iterations
default   [  29% ] 205/700 VUs  1m01.6s/3m30.0s

running (1m02.6s), 208/700 VUs, 10969 complete and 0 interrupted iterations
default   [  30% ] 208/700 VUs  1m02.6s/3m30.0s

running (1m03.6s), 211/700 VUs, 11177 complete and 0 interrupted iterations
default   [  30% ] 211/700 VUs  1m03.6s/3m30.0s

running (1m04.6s), 215/700 VUs, 11448 complete and 0 interrupted iterations
default   [  31% ] 215/700 VUs  1m04.6s/3m30.0s

running (1m05.6s), 218/700 VUs, 11668 complete and 0 interrupted iterations
default   [  31% ] 218/700 VUs  1m05.6s/3m30.0s

running (1m06.6s), 221/700 VUs, 11920 complete and 0 interrupted iterations
default   [  32% ] 221/700 VUs  1m06.6s/3m30.0s

running (1m07.6s), 225/700 VUs, 12163 complete and 0 interrupted iterations
default   [  32% ] 225/700 VUs  1m07.6s/3m30.0s

running (1m08.6s), 228/700 VUs, 12396 complete and 0 interrupted iterations
default   [  33% ] 228/700 VUs  1m08.6s/3m30.0s

running (1m09.6s), 231/700 VUs, 12651 complete and 0 interrupted iterations
default   [  33% ] 231/700 VUs  1m09.6s/3m30.0s

running (1m10.6s), 235/700 VUs, 12908 complete and 0 interrupted iterations
default   [  34% ] 235/700 VUs  1m10.6s/3m30.0s

running (1m11.6s), 238/700 VUs, 13155 complete and 0 interrupted iterations
default   [  34% ] 238/700 VUs  1m11.6s/3m30.0s

running (1m12.6s), 241/700 VUs, 13412 complete and 0 interrupted iterations
default   [  35% ] 241/700 VUs  1m12.6s/3m30.0s

running (1m13.6s), 245/700 VUs, 13946 complete and 0 interrupted iterations
default   [  35% ] 245/700 VUs  1m13.6s/3m30.0s

running (1m14.6s), 248/700 VUs, 14610 complete and 0 interrupted iterations
default   [  36% ] 248/700 VUs  1m14.6s/3m30.0s

running (1m15.6s), 251/700 VUs, 15416 complete and 0 interrupted iterations
default   [  36% ] 251/700 VUs  1m15.6s/3m30.0s

running (1m16.6s), 255/700 VUs, 16319 complete and 0 interrupted iterations
default   [  36% ] 255/700 VUs  1m16.6s/3m30.0s

running (1m17.6s), 258/700 VUs, 17224 complete and 0 interrupted iterations
default   [  37% ] 258/700 VUs  1m17.6s/3m30.0s

running (1m18.6s), 261/700 VUs, 17904 complete and 0 interrupted iterations
default   [  37% ] 261/700 VUs  1m18.6s/3m30.0s

running (1m19.6s), 265/700 VUs, 18876 complete and 0 interrupted iterations
default   [  38% ] 265/700 VUs  1m19.6s/3m30.0s

running (1m20.6s), 268/700 VUs, 19948 complete and 0 interrupted iterations
default   [  38% ] 268/700 VUs  1m20.6s/3m30.0s

running (1m21.6s), 271/700 VUs, 20968 complete and 0 interrupted iterations
default   [  39% ] 271/700 VUs  1m21.6s/3m30.0s

running (1m22.6s), 275/700 VUs, 21900 complete and 0 interrupted iterations
default   [  39% ] 275/700 VUs  1m22.6s/3m30.0s

running (1m23.6s), 278/700 VUs, 22729 complete and 0 interrupted iterations
default   [  40% ] 278/700 VUs  1m23.6s/3m30.0s

running (1m24.6s), 281/700 VUs, 24030 complete and 0 interrupted iterations
default   [  40% ] 281/700 VUs  1m24.6s/3m30.0s

running (1m25.6s), 285/700 VUs, 24599 complete and 0 interrupted iterations
default   [  41% ] 285/700 VUs  1m25.6s/3m30.0s

running (1m26.6s), 288/700 VUs, 25507 complete and 0 interrupted iterations
default   [  41% ] 288/700 VUs  1m26.6s/3m30.0s

running (1m27.6s), 291/700 VUs, 26716 complete and 0 interrupted iterations
default   [  42% ] 291/700 VUs  1m27.6s/3m30.0s

running (1m28.6s), 295/700 VUs, 27862 complete and 0 interrupted iterations
default   [  42% ] 295/700 VUs  1m28.6s/3m30.0s

running (1m29.6s), 298/700 VUs, 29074 complete and 0 interrupted iterations
default   [  43% ] 298/700 VUs  1m29.6s/3m30.0s

running (1m30.6s), 301/700 VUs, 30004 complete and 0 interrupted iterations
default   [  43% ] 301/700 VUs  1m30.6s/3m30.0s

running (1m31.6s), 305/700 VUs, 31097 complete and 0 interrupted iterations
default   [  44% ] 305/700 VUs  1m31.6s/3m30.0s

running (1m32.6s), 308/700 VUs, 33078 complete and 0 interrupted iterations
default   [  44% ] 308/700 VUs  1m32.6s/3m30.0s

running (1m33.6s), 311/700 VUs, 33867 complete and 0 interrupted iterations
default   [  45% ] 311/700 VUs  1m33.6s/3m30.0s

running (1m34.6s), 315/700 VUs, 35002 complete and 0 interrupted iterations
default   [  45% ] 315/700 VUs  1m34.6s/3m30.0s

running (1m35.6s), 318/700 VUs, 35708 complete and 0 interrupted iterations
default   [  46% ] 318/700 VUs  1m35.6s/3m30.0s

running (1m36.6s), 321/700 VUs, 37072 complete and 0 interrupted iterations
default   [  46% ] 321/700 VUs  1m36.6s/3m30.0s

running (1m37.6s), 325/700 VUs, 38029 complete and 0 interrupted iterations
default   [  46% ] 325/700 VUs  1m37.6s/3m30.0s

running (1m38.6s), 328/700 VUs, 39118 complete and 0 interrupted iterations
default   [  47% ] 328/700 VUs  1m38.6s/3m30.0s

running (1m39.6s), 331/700 VUs, 40390 complete and 0 interrupted iterations
default   [  47% ] 331/700 VUs  1m39.6s/3m30.0s

running (1m40.6s), 335/700 VUs, 41728 complete and 0 interrupted iterations
default   [  48% ] 335/700 VUs  1m40.6s/3m30.0s

running (1m41.6s), 338/700 VUs, 43007 complete and 0 interrupted iterations
default   [  48% ] 338/700 VUs  1m41.6s/3m30.0s

running (1m42.6s), 341/700 VUs, 44320 complete and 0 interrupted iterations
default   [  49% ] 341/700 VUs  1m42.6s/3m30.0s

running (1m43.6s), 345/700 VUs, 44917 complete and 0 interrupted iterations
default   [  49% ] 345/700 VUs  1m43.6s/3m30.0s

running (1m44.6s), 348/700 VUs, 46229 complete and 0 interrupted iterations
default   [  50% ] 348/700 VUs  1m44.6s/3m30.0s

running (1m45.6s), 351/700 VUs, 47268 complete and 0 interrupted iterations
default   [  50% ] 351/700 VUs  1m45.6s/3m30.0s

running (1m46.6s), 355/700 VUs, 47911 complete and 0 interrupted iterations
default   [  51% ] 355/700 VUs  1m46.6s/3m30.0s

running (1m47.6s), 358/700 VUs, 49119 complete and 0 interrupted iterations
default   [  51% ] 358/700 VUs  1m47.6s/3m30.0s

running (1m48.6s), 361/700 VUs, 50290 complete and 0 interrupted iterations
default   [  52% ] 361/700 VUs  1m48.6s/3m30.0s

running (1m49.6s), 365/700 VUs, 51466 complete and 0 interrupted iterations
default   [  52% ] 365/700 VUs  1m49.6s/3m30.0s

running (1m50.6s), 368/700 VUs, 52723 complete and 0 interrupted iterations
default   [  53% ] 368/700 VUs  1m50.6s/3m30.0s

running (1m51.6s), 371/700 VUs, 54086 complete and 0 interrupted iterations
default   [  53% ] 371/700 VUs  1m51.6s/3m30.0s

running (1m52.6s), 375/700 VUs, 55473 complete and 0 interrupted iterations
default   [  54% ] 375/700 VUs  1m52.6s/3m30.0s

running (1m53.6s), 378/700 VUs, 56683 complete and 0 interrupted iterations
default   [  54% ] 378/700 VUs  1m53.6s/3m30.0s

running (1m54.6s), 381/700 VUs, 58461 complete and 0 interrupted iterations
default   [  55% ] 381/700 VUs  1m54.6s/3m30.0s

running (1m55.6s), 385/700 VUs, 59357 complete and 0 interrupted iterations
default   [  55% ] 385/700 VUs  1m55.6s/3m30.0s

running (1m56.6s), 388/700 VUs, 60119 complete and 0 interrupted iterations
default   [  56% ] 388/700 VUs  1m56.6s/3m30.0s

running (1m57.6s), 391/700 VUs, 61132 complete and 0 interrupted iterations
default   [  56% ] 391/700 VUs  1m57.6s/3m30.0s

running (1m58.6s), 395/700 VUs, 62637 complete and 0 interrupted iterations
default   [  56% ] 395/700 VUs  1m58.6s/3m30.0s

running (1m59.6s), 398/700 VUs, 63812 complete and 0 interrupted iterations
default   [  57% ] 398/700 VUs  1m59.6s/3m30.0s

running (2m00.6s), 401/700 VUs, 64844 complete and 0 interrupted iterations
default   [  57% ] 401/700 VUs  2m00.6s/3m30.0s

running (2m01.6s), 405/700 VUs, 66082 complete and 0 interrupted iterations
default   [  58% ] 405/700 VUs  2m01.6s/3m30.0s

running (2m02.6s), 408/700 VUs, 67616 complete and 0 interrupted iterations
default   [  58% ] 408/700 VUs  2m02.6s/3m30.0s

running (2m03.6s), 411/700 VUs, 68713 complete and 0 interrupted iterations
default   [  59% ] 411/700 VUs  2m03.6s/3m30.0s

running (2m04.6s), 415/700 VUs, 69923 complete and 0 interrupted iterations
default   [  59% ] 415/700 VUs  2m04.6s/3m30.0s

running (2m05.6s), 418/700 VUs, 71228 complete and 0 interrupted iterations
default   [  60% ] 418/700 VUs  2m05.6s/3m30.0s

running (2m06.6s), 421/700 VUs, 72843 complete and 0 interrupted iterations
default   [  60% ] 421/700 VUs  2m06.6s/3m30.0s

running (2m07.6s), 425/700 VUs, 74424 complete and 0 interrupted iterations
default   [  61% ] 425/700 VUs  2m07.6s/3m30.0s

running (2m08.6s), 428/700 VUs, 76735 complete and 0 interrupted iterations
default   [  61% ] 428/700 VUs  2m08.6s/3m30.0s

running (2m09.6s), 431/700 VUs, 78804 complete and 0 interrupted iterations
default   [  62% ] 431/700 VUs  2m09.6s/3m30.0s

running (2m10.6s), 435/700 VUs, 81075 complete and 0 interrupted iterations
default   [  62% ] 435/700 VUs  2m10.6s/3m30.0s

running (2m11.6s), 438/700 VUs, 83029 complete and 0 interrupted iterations
default   [  63% ] 438/700 VUs  2m11.6s/3m30.0s

running (2m12.6s), 441/700 VUs, 84881 complete and 0 interrupted iterations
default   [  63% ] 441/700 VUs  2m12.6s/3m30.0s

running (2m13.6s), 445/700 VUs, 86456 complete and 0 interrupted iterations
default   [  64% ] 445/700 VUs  2m13.6s/3m30.0s

running (2m14.6s), 448/700 VUs, 88790 complete and 0 interrupted iterations
default   [  64% ] 448/700 VUs  2m14.6s/3m30.0s

running (2m15.6s), 451/700 VUs, 90784 complete and 0 interrupted iterations
default   [  65% ] 451/700 VUs  2m15.6s/3m30.0s

running (2m16.6s), 455/700 VUs, 92448 complete and 0 interrupted iterations
default   [  65% ] 455/700 VUs  2m16.6s/3m30.0s

running (2m17.6s), 458/700 VUs, 94449 complete and 0 interrupted iterations
default   [  66% ] 458/700 VUs  2m17.6s/3m30.0s

running (2m18.6s), 461/700 VUs, 96273 complete and 0 interrupted iterations
default   [  66% ] 461/700 VUs  2m18.6s/3m30.0s

running (2m19.6s), 465/700 VUs, 98431 complete and 0 interrupted iterations
default   [  66% ] 465/700 VUs  2m19.6s/3m30.0s

running (2m20.6s), 468/700 VUs, 100341 complete and 0 interrupted iterations
default   [  67% ] 468/700 VUs  2m20.6s/3m30.0s

running (2m21.6s), 471/700 VUs, 102940 complete and 0 interrupted iterations
default   [  67% ] 471/700 VUs  2m21.6s/3m30.0s

running (2m22.6s), 475/700 VUs, 104593 complete and 0 interrupted iterations
default   [  68% ] 475/700 VUs  2m22.6s/3m30.0s

running (2m23.6s), 478/700 VUs, 106450 complete and 0 interrupted iterations
default   [  68% ] 478/700 VUs  2m23.6s/3m30.0s

running (2m24.6s), 481/700 VUs, 108489 complete and 0 interrupted iterations
default   [  69% ] 481/700 VUs  2m24.6s/3m30.0s

running (2m25.6s), 485/700 VUs, 111289 complete and 0 interrupted iterations
default   [  69% ] 485/700 VUs  2m25.6s/3m30.0s

running (2m26.6s), 488/700 VUs, 113548 complete and 0 interrupted iterations
default   [  70% ] 488/700 VUs  2m26.6s/3m30.0s

running (2m27.6s), 491/700 VUs, 116046 complete and 0 interrupted iterations
default   [  70% ] 491/700 VUs  2m27.6s/3m30.0s

running (2m28.6s), 495/700 VUs, 117452 complete and 0 interrupted iterations
default   [  71% ] 495/700 VUs  2m28.6s/3m30.0s

running (2m29.6s), 498/700 VUs, 119309 complete and 0 interrupted iterations
default   [  71% ] 498/700 VUs  2m29.6s/3m30.0s

running (2m30.6s), 501/700 VUs, 121463 complete and 0 interrupted iterations
default   [  72% ] 501/700 VUs  2m30.6s/3m30.0s

running (2m31.6s), 505/700 VUs, 123399 complete and 0 interrupted iterations
default   [  72% ] 505/700 VUs  2m31.6s/3m30.0s

running (2m32.6s), 508/700 VUs, 125097 complete and 0 interrupted iterations
default   [  73% ] 508/700 VUs  2m32.6s/3m30.0s

running (2m33.6s), 511/700 VUs, 126505 complete and 0 interrupted iterations
default   [  73% ] 511/700 VUs  2m33.6s/3m30.0s

running (2m34.6s), 515/700 VUs, 128269 complete and 0 interrupted iterations
default   [  74% ] 515/700 VUs  2m34.6s/3m30.0s

running (2m35.6s), 518/700 VUs, 129763 complete and 0 interrupted iterations
default   [  74% ] 518/700 VUs  2m35.6s/3m30.0s

running (2m36.6s), 521/700 VUs, 131958 complete and 0 interrupted iterations
default   [  75% ] 521/700 VUs  2m36.6s/3m30.0s

running (2m37.6s), 525/700 VUs, 134403 complete and 0 interrupted iterations
default   [  75% ] 525/700 VUs  2m37.6s/3m30.0s

running (2m38.6s), 528/700 VUs, 135645 complete and 0 interrupted iterations
default   [  76% ] 528/700 VUs  2m38.6s/3m30.0s

running (2m39.6s), 531/700 VUs, 137113 complete and 0 interrupted iterations
default   [  76% ] 531/700 VUs  2m39.6s/3m30.0s

running (2m40.6s), 535/700 VUs, 138768 complete and 0 interrupted iterations
default   [  76% ] 535/700 VUs  2m40.6s/3m30.0s

running (2m41.6s), 538/700 VUs, 140273 complete and 0 interrupted iterations
default   [  77% ] 538/700 VUs  2m41.6s/3m30.0s

running (2m42.6s), 541/700 VUs, 141943 complete and 0 interrupted iterations
default   [  77% ] 541/700 VUs  2m42.6s/3m30.0s

running (2m43.6s), 545/700 VUs, 143645 complete and 0 interrupted iterations
default   [  78% ] 545/700 VUs  2m43.6s/3m30.0s

running (2m44.6s), 548/700 VUs, 144257 complete and 0 interrupted iterations
default   [  78% ] 548/700 VUs  2m44.6s/3m30.0s

running (2m45.6s), 551/700 VUs, 144857 complete and 0 interrupted iterations
default   [  79% ] 551/700 VUs  2m45.6s/3m30.0s

running (2m46.6s), 555/700 VUs, 146957 complete and 0 interrupted iterations
default   [  79% ] 555/700 VUs  2m46.6s/3m30.0s

running (2m47.6s), 558/700 VUs, 149249 complete and 0 interrupted iterations
default   [  80% ] 558/700 VUs  2m47.6s/3m30.0s

running (2m48.6s), 561/700 VUs, 151073 complete and 0 interrupted iterations
default   [  80% ] 561/700 VUs  2m48.6s/3m30.0s

running (2m49.6s), 565/700 VUs, 153036 complete and 0 interrupted iterations
default   [  81% ] 565/700 VUs  2m49.6s/3m30.0s

running (2m50.6s), 568/700 VUs, 154683 complete and 0 interrupted iterations
default   [  81% ] 568/700 VUs  2m50.6s/3m30.0s

running (2m51.6s), 572/700 VUs, 156866 complete and 0 interrupted iterations
default   [  82% ] 572/700 VUs  2m51.6s/3m30.0s

running (2m52.6s), 575/700 VUs, 158188 complete and 0 interrupted iterations
default   [  82% ] 575/700 VUs  2m52.6s/3m30.0s

running (2m53.6s), 578/700 VUs, 158984 complete and 0 interrupted iterations
default   [  83% ] 578/700 VUs  2m53.6s/3m30.0s

running (2m55.0s), 583/700 VUs, 159189 complete and 0 interrupted iterations
default   [  83% ] 583/700 VUs  2m55.0s/3m30.0s

running (2m55.6s), 585/700 VUs, 159745 complete and 0 interrupted iterations
default   [  84% ] 585/700 VUs  2m55.6s/3m30.0s

running (2m56.6s), 588/700 VUs, 160821 complete and 0 interrupted iterations
default   [  84% ] 588/700 VUs  2m56.6s/3m30.0s

running (2m57.6s), 591/700 VUs, 163452 complete and 0 interrupted iterations
default   [  85% ] 591/700 VUs  2m57.6s/3m30.0s

running (2m58.6s), 595/700 VUs, 164173 complete and 0 interrupted iterations
default   [  85% ] 595/700 VUs  2m58.6s/3m30.0s

running (2m59.6s), 598/700 VUs, 166834 complete and 0 interrupted iterations
default   [  86% ] 598/700 VUs  2m59.6s/3m30.0s

running (3m00.6s), 601/700 VUs, 168278 complete and 0 interrupted iterations
default   [  86% ] 601/700 VUs  3m00.6s/3m30.0s

running (3m01.6s), 605/700 VUs, 169981 complete and 0 interrupted iterations
default   [  86% ] 605/700 VUs  3m01.6s/3m30.0s

running (3m02.6s), 608/700 VUs, 171338 complete and 0 interrupted iterations
default   [  87% ] 608/700 VUs  3m02.6s/3m30.0s

running (3m03.6s), 611/700 VUs, 173618 complete and 0 interrupted iterations
default   [  87% ] 611/700 VUs  3m03.6s/3m30.0s

running (3m04.6s), 615/700 VUs, 174603 complete and 0 interrupted iterations
default   [  88% ] 615/700 VUs  3m04.6s/3m30.0s

running (3m05.6s), 618/700 VUs, 177287 complete and 0 interrupted iterations
default   [  88% ] 618/700 VUs  3m05.6s/3m30.0s

running (3m06.6s), 621/700 VUs, 177719 complete and 0 interrupted iterations
default   [  89% ] 621/700 VUs  3m06.6s/3m30.0s

running (3m07.6s), 625/700 VUs, 179623 complete and 0 interrupted iterations
default   [  89% ] 625/700 VUs  3m07.6s/3m30.0s

running (3m08.6s), 628/700 VUs, 182282 complete and 0 interrupted iterations
default   [  90% ] 628/700 VUs  3m08.6s/3m30.0s

running (3m09.6s), 631/700 VUs, 184787 complete and 0 interrupted iterations
default   [  90% ] 631/700 VUs  3m09.6s/3m30.0s

running (3m10.6s), 635/700 VUs, 186385 complete and 0 interrupted iterations
default   [  91% ] 635/700 VUs  3m10.6s/3m30.0s

running (3m11.6s), 638/700 VUs, 187702 complete and 0 interrupted iterations
default   [  91% ] 638/700 VUs  3m11.6s/3m30.0s

running (3m12.6s), 641/700 VUs, 189613 complete and 0 interrupted iterations
default   [  92% ] 641/700 VUs  3m12.6s/3m30.0s

running (3m13.6s), 645/700 VUs, 191269 complete and 0 interrupted iterations
default   [  92% ] 645/700 VUs  3m13.6s/3m30.0s

running (3m14.6s), 648/700 VUs, 193494 complete and 0 interrupted iterations
default   [  93% ] 648/700 VUs  3m14.6s/3m30.0s

running (3m15.6s), 651/700 VUs, 194165 complete and 0 interrupted iterations
default   [  93% ] 651/700 VUs  3m15.6s/3m30.0s

running (3m16.6s), 655/700 VUs, 197175 complete and 0 interrupted iterations
default   [  94% ] 655/700 VUs  3m16.6s/3m30.0s

running (3m17.6s), 658/700 VUs, 197585 complete and 0 interrupted iterations
default   [  94% ] 658/700 VUs  3m17.6s/3m30.0s

running (3m18.6s), 661/700 VUs, 200569 complete and 0 interrupted iterations
default   [  95% ] 661/700 VUs  3m18.6s/3m30.0s

running (3m19.6s), 665/700 VUs, 201269 complete and 0 interrupted iterations
default   [  95% ] 665/700 VUs  3m19.6s/3m30.0s

running (3m20.6s), 668/700 VUs, 203681 complete and 0 interrupted iterations
default   [  96% ] 668/700 VUs  3m20.6s/3m30.0s

running (3m21.6s), 671/700 VUs, 205171 complete and 0 interrupted iterations
default   [  96% ] 671/700 VUs  3m21.6s/3m30.0s

running (3m22.6s), 675/700 VUs, 207521 complete and 0 interrupted iterations
default   [  96% ] 675/700 VUs  3m22.6s/3m30.0s

running (3m23.6s), 678/700 VUs, 209755 complete and 0 interrupted iterations
default   [  97% ] 678/700 VUs  3m23.6s/3m30.0s

running (3m24.6s), 681/700 VUs, 211493 complete and 0 interrupted iterations
default   [  97% ] 681/700 VUs  3m24.6s/3m30.0s

running (3m25.6s), 685/700 VUs, 213081 complete and 0 interrupted iterations
default   [  98% ] 685/700 VUs  3m25.6s/3m30.0s

running (3m26.6s), 688/700 VUs, 215937 complete and 0 interrupted iterations
default   [  98% ] 688/700 VUs  3m26.6s/3m30.0s

running (3m27.6s), 691/700 VUs, 218386 complete and 0 interrupted iterations
default   [  99% ] 691/700 VUs  3m27.6s/3m30.0s

running (3m28.6s), 695/700 VUs, 219772 complete and 0 interrupted iterations
default   [  99% ] 695/700 VUs  3m28.6s/3m30.0s

running (3m29.6s), 698/700 VUs, 221408 complete and 0 interrupted iterations
default   [ 100% ] 698/700 VUs  3m29.6s/3m30.0s

running (3m30.6s), 233/700 VUs, 222512 complete and 0 interrupted iterations
default ↓ [ 100% ] 699/700 VUs  3m30s

running (3m31.6s), 068/700 VUs, 222677 complete and 0 interrupted iterations
default ↓ [ 100% ] 699/700 VUs  3m30s

running (3m31.8s), 000/700 VUs, 222745 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/700 VUs  3m30s

     ✗ logged in successfully
      ↳  16% — ✓ 35878 / ✗ 186867
     ✓ retrieved member

     checks.........................: 23.80% ✓ 58397       ✗ 186867
     data_received..................: 176 MB 833 kB/s
     data_sent......................: 84 MB  395 kB/s
     http_req_blocked...............: avg=40.21ms  min=0s       med=0s       max=1.79s    p(90)=73.08ms  p(95)=302.4ms 
     http_req_connecting............: avg=61.4ms   min=0s       med=39.15ms  max=1.06s    p(90)=155.6ms  p(95)=200.54ms
   ✓ http_req_duration..............: avg=143.96ms min=0s       med=0s       max=6.59s    p(90)=545.82ms p(95)=874.33ms
       { expected_response:true }...: avg=629.46ms min=8.8ms    med=491.11ms max=6.59s    p(90)=1.1s     p(95)=1.48s   
     http_req_failed................: 89.00% ✓ 230175      ✗ 28448 
     http_req_receiving.............: avg=1ms      min=0s       med=0s       max=294.17ms p(90)=41.9µs   p(95)=69.76µs 
     http_req_sending...............: avg=246.03µs min=0s       med=0s       max=183.42ms p(90)=33.26µs  p(95)=142.33µs
     http_req_tls_handshaking.......: avg=33.68ms  min=0s       med=0s       max=1.74s    p(90)=64.53ms  p(95)=253.83ms
     http_req_waiting...............: avg=142.71ms min=0s       med=0s       max=6.59s    p(90)=544.41ms p(95)=866.31ms
     http_reqs......................: 258623 1221.182876/s
     iteration_duration.............: avg=325.16ms min=248.91µs med=128.53ms max=8.5s     p(90)=858.59ms p(95)=1.46s   
     iterations.....................: 222745 1051.771805/s
     vus............................: 188    min=4         max=699 
     vus_max........................: 700    min=700       max=700 


```
