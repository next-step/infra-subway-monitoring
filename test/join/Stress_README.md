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

  scenarios: (100.00%) 1 scenario, 700 max VUs, 4m0s max duration (incl. graceful stop):
           * default: Up to 700 looping VUs for 3m30s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.5s), 002/700 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 002/700 VUs  0m00.5s/3m30.0s

running (0m01.5s), 006/700 VUs, 0 complete and 0 interrupted iterations
default   [   1% ] 006/700 VUs  0m01.5s/3m30.0s

running (0m02.5s), 009/700 VUs, 0 complete and 0 interrupted iterations
default   [   1% ] 009/700 VUs  0m02.5s/3m30.0s

running (0m03.5s), 012/700 VUs, 0 complete and 0 interrupted iterations
default   [   2% ] 012/700 VUs  0m03.5s/3m30.0s

running (0m04.5s), 015/700 VUs, 10 complete and 0 interrupted iterations
default   [   2% ] 015/700 VUs  0m04.5s/3m30.0s

running (0m05.5s), 019/700 VUs, 15 complete and 0 interrupted iterations
default   [   3% ] 019/700 VUs  0m05.5s/3m30.0s

running (0m06.5s), 022/700 VUs, 22 complete and 0 interrupted iterations
default   [   3% ] 022/700 VUs  0m06.5s/3m30.0s

running (0m07.5s), 025/700 VUs, 32 complete and 0 interrupted iterations
default   [   4% ] 025/700 VUs  0m07.5s/3m30.0s

running (0m08.5s), 029/700 VUs, 44 complete and 0 interrupted iterations
default   [   4% ] 029/700 VUs  0m08.5s/3m30.0s

running (0m09.5s), 032/700 VUs, 55 complete and 0 interrupted iterations
default   [   5% ] 032/700 VUs  0m09.5s/3m30.0s

running (0m10.5s), 035/700 VUs, 68 complete and 0 interrupted iterations
default   [   5% ] 035/700 VUs  0m10.5s/3m30.0s

running (0m11.5s), 039/700 VUs, 78 complete and 0 interrupted iterations
default   [   5% ] 039/700 VUs  0m11.5s/3m30.0s

running (0m12.5s), 042/700 VUs, 86 complete and 0 interrupted iterations
default   [   6% ] 042/700 VUs  0m12.5s/3m30.0s

running (0m13.5s), 045/700 VUs, 97 complete and 0 interrupted iterations
default   [   6% ] 045/700 VUs  0m13.5s/3m30.0s

running (0m14.5s), 048/700 VUs, 107 complete and 0 interrupted iterations
default   [   7% ] 048/700 VUs  0m14.5s/3m30.0s

running (0m15.5s), 052/700 VUs, 117 complete and 0 interrupted iterations
default   [   7% ] 052/700 VUs  0m15.5s/3m30.0s

running (0m16.5s), 055/700 VUs, 127 complete and 0 interrupted iterations
default   [   8% ] 055/700 VUs  0m16.5s/3m30.0s

running (0m17.5s), 058/700 VUs, 137 complete and 0 interrupted iterations
default   [   8% ] 058/700 VUs  0m17.5s/3m30.0s

running (0m18.5s), 062/700 VUs, 147 complete and 0 interrupted iterations
default   [   9% ] 062/700 VUs  0m18.5s/3m30.0s

running (0m19.5s), 065/700 VUs, 158 complete and 0 interrupted iterations
default   [   9% ] 065/700 VUs  0m19.5s/3m30.0s

running (0m20.5s), 068/700 VUs, 168 complete and 0 interrupted iterations
default   [  10% ] 068/700 VUs  0m20.5s/3m30.0s

running (0m21.5s), 072/700 VUs, 181 complete and 0 interrupted iterations
default   [  10% ] 072/700 VUs  0m21.5s/3m30.0s

running (0m22.5s), 075/700 VUs, 193 complete and 0 interrupted iterations
default   [  11% ] 075/700 VUs  0m22.5s/3m30.0s

running (0m23.5s), 078/700 VUs, 259 complete and 0 interrupted iterations
default   [  11% ] 078/700 VUs  0m23.5s/3m30.0s

running (0m24.5s), 081/700 VUs, 1253 complete and 0 interrupted iterations
default   [  12% ] 081/700 VUs  0m24.5s/3m30.0s

running (0m25.5s), 085/700 VUs, 3186 complete and 0 interrupted iterations
default   [  12% ] 085/700 VUs  0m25.5s/3m30.0s

running (0m26.5s), 088/700 VUs, 5427 complete and 0 interrupted iterations
default   [  13% ] 088/700 VUs  0m26.5s/3m30.0s

running (0m27.5s), 091/700 VUs, 7039 complete and 0 interrupted iterations
default   [  13% ] 091/700 VUs  0m27.5s/3m30.0s

running (0m28.5s), 095/700 VUs, 7071 complete and 0 interrupted iterations
default   [  14% ] 095/700 VUs  0m28.5s/3m30.0s

running (0m29.5s), 098/700 VUs, 7131 complete and 0 interrupted iterations
default   [  14% ] 098/700 VUs  0m29.5s/3m30.0s

running (0m30.5s), 101/700 VUs, 7167 complete and 0 interrupted iterations
default   [  15% ] 101/700 VUs  0m30.5s/3m30.0s

running (0m31.5s), 105/700 VUs, 7231 complete and 0 interrupted iterations
default   [  15% ] 105/700 VUs  0m31.5s/3m30.0s

running (0m32.5s), 108/700 VUs, 8288 complete and 0 interrupted iterations
default   [  15% ] 108/700 VUs  0m32.5s/3m30.0s

running (0m33.5s), 111/700 VUs, 10833 complete and 0 interrupted iterations
default   [  16% ] 111/700 VUs  0m33.5s/3m30.0s

running (0m34.5s), 115/700 VUs, 13374 complete and 0 interrupted iterations
default   [  16% ] 115/700 VUs  0m34.5s/3m30.0s

running (0m35.5s), 118/700 VUs, 16498 complete and 0 interrupted iterations
default   [  17% ] 118/700 VUs  0m35.5s/3m30.0s

running (0m36.5s), 121/700 VUs, 18827 complete and 0 interrupted iterations
default   [  17% ] 121/700 VUs  0m36.5s/3m30.0s

running (0m37.5s), 125/700 VUs, 21674 complete and 0 interrupted iterations
default   [  18% ] 125/700 VUs  0m37.5s/3m30.0s

running (0m38.5s), 128/700 VUs, 24570 complete and 0 interrupted iterations
default   [  18% ] 128/700 VUs  0m38.5s/3m30.0s

running (0m39.5s), 131/700 VUs, 27198 complete and 0 interrupted iterations
default   [  19% ] 131/700 VUs  0m39.5s/3m30.0s

running (0m40.5s), 135/700 VUs, 29981 complete and 0 interrupted iterations
default   [  19% ] 135/700 VUs  0m40.5s/3m30.0s

running (0m41.5s), 138/700 VUs, 32527 complete and 0 interrupted iterations
default   [  20% ] 138/700 VUs  0m41.5s/3m30.0s

running (0m42.5s), 141/700 VUs, 34944 complete and 0 interrupted iterations
default   [  20% ] 141/700 VUs  0m42.5s/3m30.0s

running (0m43.5s), 145/700 VUs, 37885 complete and 0 interrupted iterations
default   [  21% ] 145/700 VUs  0m43.5s/3m30.0s

running (0m44.5s), 148/700 VUs, 40220 complete and 0 interrupted iterations
default   [  21% ] 148/700 VUs  0m44.5s/3m30.0s

running (0m45.5s), 151/700 VUs, 42896 complete and 0 interrupted iterations
default   [  22% ] 151/700 VUs  0m45.5s/3m30.0s

running (0m46.5s), 155/700 VUs, 43252 complete and 0 interrupted iterations
default   [  22% ] 155/700 VUs  0m46.5s/3m30.0s

running (0m47.5s), 158/700 VUs, 43252 complete and 0 interrupted iterations
default   [  23% ] 158/700 VUs  0m47.5s/3m30.0s

running (0m48.5s), 161/700 VUs, 43252 complete and 0 interrupted iterations
default   [  23% ] 161/700 VUs  0m48.5s/3m30.0s

running (0m49.5s), 165/700 VUs, 43262 complete and 0 interrupted iterations
default   [  24% ] 165/700 VUs  0m49.5s/3m30.0s

running (0m50.5s), 168/700 VUs, 43272 complete and 0 interrupted iterations
default   [  24% ] 168/700 VUs  0m50.5s/3m30.0s

running (0m51.5s), 171/700 VUs, 43282 complete and 0 interrupted iterations
default   [  25% ] 171/700 VUs  0m51.5s/3m30.0s

running (0m52.5s), 175/700 VUs, 43292 complete and 0 interrupted iterations
default   [  25% ] 175/700 VUs  0m52.5s/3m30.0s

running (0m53.5s), 178/700 VUs, 43302 complete and 0 interrupted iterations
default   [  25% ] 178/700 VUs  0m53.5s/3m30.0s

running (0m54.5s), 181/700 VUs, 43306 complete and 0 interrupted iterations
default   [  26% ] 181/700 VUs  0m54.5s/3m30.0s

running (0m55.5s), 185/700 VUs, 43316 complete and 0 interrupted iterations
default   [  26% ] 185/700 VUs  0m55.5s/3m30.0s

running (0m56.5s), 188/700 VUs, 43326 complete and 0 interrupted iterations
default   [  27% ] 188/700 VUs  0m56.5s/3m30.0s

running (0m57.5s), 191/700 VUs, 43335 complete and 0 interrupted iterations
default   [  27% ] 191/700 VUs  0m57.5s/3m30.0s

running (0m58.5s), 195/700 VUs, 43349 complete and 0 interrupted iterations
default   [  28% ] 195/700 VUs  0m58.5s/3m30.0s

running (0m59.5s), 198/700 VUs, 43363 complete and 0 interrupted iterations
default   [  28% ] 198/700 VUs  0m59.5s/3m30.0s

running (1m00.5s), 201/700 VUs, 43376 complete and 0 interrupted iterations
default   [  29% ] 201/700 VUs  1m00.5s/3m30.0s

running (1m01.5s), 205/700 VUs, 43389 complete and 0 interrupted iterations
default   [  29% ] 205/700 VUs  1m01.5s/3m30.0s

running (1m02.5s), 208/700 VUs, 43401 complete and 0 interrupted iterations
default   [  30% ] 208/700 VUs  1m02.5s/3m30.0s

running (1m03.5s), 211/700 VUs, 43418 complete and 0 interrupted iterations
default   [  30% ] 211/700 VUs  1m03.5s/3m30.0s

running (1m04.5s), 215/700 VUs, 43429 complete and 0 interrupted iterations
default   [  31% ] 215/700 VUs  1m04.5s/3m30.0s

running (1m05.5s), 218/700 VUs, 43444 complete and 0 interrupted iterations
default   [  31% ] 218/700 VUs  1m05.5s/3m30.0s

running (1m06.5s), 221/700 VUs, 43459 complete and 0 interrupted iterations
default   [  32% ] 221/700 VUs  1m06.5s/3m30.0s

running (1m07.5s), 225/700 VUs, 43477 complete and 0 interrupted iterations
default   [  32% ] 225/700 VUs  1m07.5s/3m30.0s

running (1m08.5s), 228/700 VUs, 43488 complete and 0 interrupted iterations
default   [  33% ] 228/700 VUs  1m08.5s/3m30.0s

running (1m09.5s), 231/700 VUs, 43497 complete and 0 interrupted iterations
default   [  33% ] 231/700 VUs  1m09.5s/3m30.0s

running (1m10.5s), 235/700 VUs, 43509 complete and 0 interrupted iterations
default   [  34% ] 235/700 VUs  1m10.5s/3m30.0s

running (1m11.5s), 238/700 VUs, 43521 complete and 0 interrupted iterations
default   [  34% ] 238/700 VUs  1m11.5s/3m30.0s

running (1m12.5s), 241/700 VUs, 43532 complete and 0 interrupted iterations
default   [  35% ] 241/700 VUs  1m12.5s/3m30.0s

running (1m13.5s), 245/700 VUs, 43549 complete and 0 interrupted iterations
default   [  35% ] 245/700 VUs  1m13.5s/3m30.0s

running (1m14.5s), 248/700 VUs, 43560 complete and 0 interrupted iterations
default   [  35% ] 248/700 VUs  1m14.5s/3m30.0s

running (1m15.5s), 251/700 VUs, 43571 complete and 0 interrupted iterations
default   [  36% ] 251/700 VUs  1m15.5s/3m30.0s

running (1m16.5s), 255/700 VUs, 43585 complete and 0 interrupted iterations
default   [  36% ] 255/700 VUs  1m16.5s/3m30.0s

running (1m17.5s), 258/700 VUs, 43940 complete and 0 interrupted iterations
default   [  37% ] 258/700 VUs  1m17.5s/3m30.0s

running (1m18.5s), 261/700 VUs, 44740 complete and 0 interrupted iterations
default   [  37% ] 261/700 VUs  1m18.5s/3m30.0s

running (1m19.5s), 265/700 VUs, 45932 complete and 0 interrupted iterations
default   [  38% ] 265/700 VUs  1m19.5s/3m30.0s

running (1m20.5s), 268/700 VUs, 46811 complete and 0 interrupted iterations
default   [  38% ] 268/700 VUs  1m20.5s/3m30.0s

running (1m21.5s), 271/700 VUs, 47950 complete and 0 interrupted iterations
default   [  39% ] 271/700 VUs  1m21.5s/3m30.0s

running (1m22.5s), 275/700 VUs, 49317 complete and 0 interrupted iterations
default   [  39% ] 275/700 VUs  1m22.5s/3m30.0s

running (1m23.5s), 278/700 VUs, 50943 complete and 0 interrupted iterations
default   [  40% ] 278/700 VUs  1m23.5s/3m30.0s

running (1m24.5s), 281/700 VUs, 52162 complete and 0 interrupted iterations
default   [  40% ] 281/700 VUs  1m24.5s/3m30.0s

running (1m25.5s), 285/700 VUs, 54332 complete and 0 interrupted iterations
default   [  41% ] 285/700 VUs  1m25.5s/3m30.0s

running (1m26.5s), 288/700 VUs, 55889 complete and 0 interrupted iterations
default   [  41% ] 288/700 VUs  1m26.5s/3m30.0s

running (1m27.5s), 291/700 VUs, 57937 complete and 0 interrupted iterations
default   [  42% ] 291/700 VUs  1m27.5s/3m30.0s

running (1m28.5s), 295/700 VUs, 59763 complete and 0 interrupted iterations
default   [  42% ] 295/700 VUs  1m28.5s/3m30.0s

running (1m29.5s), 298/700 VUs, 62239 complete and 0 interrupted iterations
default   [  43% ] 298/700 VUs  1m29.5s/3m30.0s

running (1m30.5s), 301/700 VUs, 64367 complete and 0 interrupted iterations
default   [  43% ] 301/700 VUs  1m30.5s/3m30.0s

running (1m31.5s), 305/700 VUs, 66574 complete and 0 interrupted iterations
default   [  44% ] 305/700 VUs  1m31.5s/3m30.0s

running (1m32.5s), 308/700 VUs, 68522 complete and 0 interrupted iterations
default   [  44% ] 308/700 VUs  1m32.5s/3m30.0s

running (1m33.5s), 311/700 VUs, 70368 complete and 0 interrupted iterations
default   [  45% ] 311/700 VUs  1m33.5s/3m30.0s

running (1m34.5s), 315/700 VUs, 71694 complete and 0 interrupted iterations
default   [  45% ] 315/700 VUs  1m34.5s/3m30.0s

running (1m35.5s), 318/700 VUs, 74315 complete and 0 interrupted iterations
default   [  45% ] 318/700 VUs  1m35.5s/3m30.0s

running (1m36.5s), 321/700 VUs, 76900 complete and 0 interrupted iterations
default   [  46% ] 321/700 VUs  1m36.5s/3m30.0s

running (1m37.5s), 325/700 VUs, 79267 complete and 0 interrupted iterations
default   [  46% ] 325/700 VUs  1m37.5s/3m30.0s

running (1m38.5s), 328/700 VUs, 82266 complete and 0 interrupted iterations
default   [  47% ] 328/700 VUs  1m38.5s/3m30.0s

running (1m39.5s), 331/700 VUs, 84684 complete and 0 interrupted iterations
default   [  47% ] 331/700 VUs  1m39.5s/3m30.0s

running (1m40.5s), 335/700 VUs, 87187 complete and 0 interrupted iterations
default   [  48% ] 335/700 VUs  1m40.5s/3m30.0s

running (1m41.5s), 338/700 VUs, 90092 complete and 0 interrupted iterations
default   [  48% ] 338/700 VUs  1m41.5s/3m30.0s

running (1m42.5s), 341/700 VUs, 92399 complete and 0 interrupted iterations
default   [  49% ] 341/700 VUs  1m42.5s/3m30.0s

running (1m43.5s), 345/700 VUs, 95373 complete and 0 interrupted iterations
default   [  49% ] 345/700 VUs  1m43.5s/3m30.0s

running (1m44.5s), 348/700 VUs, 97976 complete and 0 interrupted iterations
default   [  50% ] 348/700 VUs  1m44.5s/3m30.0s

running (1m45.5s), 351/700 VUs, 100827 complete and 0 interrupted iterations
default   [  50% ] 351/700 VUs  1m45.5s/3m30.0s

running (1m46.5s), 355/700 VUs, 103526 complete and 0 interrupted iterations
default   [  51% ] 355/700 VUs  1m46.5s/3m30.0s

running (1m47.5s), 358/700 VUs, 106366 complete and 0 interrupted iterations
default   [  51% ] 358/700 VUs  1m47.5s/3m30.0s

running (1m48.5s), 361/700 VUs, 108830 complete and 0 interrupted iterations
default   [  52% ] 361/700 VUs  1m48.5s/3m30.0s

running (1m49.5s), 365/700 VUs, 111899 complete and 0 interrupted iterations
default   [  52% ] 365/700 VUs  1m49.5s/3m30.0s

running (1m50.5s), 368/700 VUs, 114227 complete and 0 interrupted iterations
default   [  53% ] 368/700 VUs  1m50.5s/3m30.0s

running (1m51.5s), 371/700 VUs, 116998 complete and 0 interrupted iterations
default   [  53% ] 371/700 VUs  1m51.5s/3m30.0s

running (1m52.5s), 375/700 VUs, 120637 complete and 0 interrupted iterations
default   [  54% ] 375/700 VUs  1m52.5s/3m30.0s

running (1m53.5s), 378/700 VUs, 123335 complete and 0 interrupted iterations
default   [  54% ] 378/700 VUs  1m53.5s/3m30.0s

running (1m54.5s), 381/700 VUs, 125929 complete and 0 interrupted iterations
default   [  55% ] 381/700 VUs  1m54.5s/3m30.0s

running (1m55.5s), 385/700 VUs, 128408 complete and 0 interrupted iterations
default   [  55% ] 385/700 VUs  1m55.5s/3m30.0s

running (1m56.5s), 388/700 VUs, 131267 complete and 0 interrupted iterations
default   [  55% ] 388/700 VUs  1m56.5s/3m30.0s

running (1m57.5s), 391/700 VUs, 133500 complete and 0 interrupted iterations
default   [  56% ] 391/700 VUs  1m57.5s/3m30.0s

running (1m58.5s), 395/700 VUs, 136349 complete and 0 interrupted iterations
default   [  56% ] 395/700 VUs  1m58.5s/3m30.0s

running (1m59.5s), 398/700 VUs, 138565 complete and 0 interrupted iterations
default   [  57% ] 398/700 VUs  1m59.5s/3m30.0s

running (2m00.5s), 401/700 VUs, 141436 complete and 0 interrupted iterations
default   [  57% ] 401/700 VUs  2m00.5s/3m30.0s

running (2m01.5s), 405/700 VUs, 143672 complete and 0 interrupted iterations
default   [  58% ] 405/700 VUs  2m01.5s/3m30.0s

running (2m02.5s), 408/700 VUs, 145981 complete and 0 interrupted iterations
default   [  58% ] 408/700 VUs  2m02.5s/3m30.0s

running (2m03.5s), 411/700 VUs, 148534 complete and 0 interrupted iterations
default   [  59% ] 411/700 VUs  2m03.5s/3m30.0s

running (2m04.5s), 415/700 VUs, 151017 complete and 0 interrupted iterations
default   [  59% ] 415/700 VUs  2m04.5s/3m30.0s

running (2m05.5s), 418/700 VUs, 153680 complete and 0 interrupted iterations
default   [  60% ] 418/700 VUs  2m05.5s/3m30.0s

running (2m06.5s), 421/700 VUs, 155332 complete and 0 interrupted iterations
default   [  60% ] 421/700 VUs  2m06.5s/3m30.0s

running (2m07.5s), 425/700 VUs, 157962 complete and 0 interrupted iterations
default   [  61% ] 425/700 VUs  2m07.5s/3m30.0s

running (2m08.5s), 428/700 VUs, 159985 complete and 0 interrupted iterations
default   [  61% ] 428/700 VUs  2m08.5s/3m30.0s

running (2m09.5s), 431/700 VUs, 162927 complete and 0 interrupted iterations
default   [  62% ] 431/700 VUs  2m09.5s/3m30.0s

running (2m10.5s), 435/700 VUs, 165128 complete and 0 interrupted iterations
default   [  62% ] 435/700 VUs  2m10.5s/3m30.0s

running (2m11.5s), 438/700 VUs, 167828 complete and 0 interrupted iterations
default   [  63% ] 438/700 VUs  2m11.5s/3m30.0s

running (2m12.5s), 441/700 VUs, 169305 complete and 0 interrupted iterations
default   [  63% ] 441/700 VUs  2m12.5s/3m30.0s

running (2m13.5s), 445/700 VUs, 170578 complete and 0 interrupted iterations
default   [  64% ] 445/700 VUs  2m13.5s/3m30.0s

running (2m14.5s), 448/700 VUs, 172432 complete and 0 interrupted iterations
default   [  64% ] 448/700 VUs  2m14.5s/3m30.0s

running (2m15.5s), 451/700 VUs, 174645 complete and 0 interrupted iterations
default   [  65% ] 451/700 VUs  2m15.5s/3m30.0s

running (2m16.5s), 455/700 VUs, 176116 complete and 0 interrupted iterations
default   [  65% ] 455/700 VUs  2m16.5s/3m30.0s

running (2m17.5s), 458/700 VUs, 178358 complete and 0 interrupted iterations
default   [  65% ] 458/700 VUs  2m17.5s/3m30.0s

running (2m18.5s), 461/700 VUs, 179960 complete and 0 interrupted iterations
default   [  66% ] 461/700 VUs  2m18.5s/3m30.0s

running (2m19.5s), 465/700 VUs, 182887 complete and 0 interrupted iterations
default   [  66% ] 465/700 VUs  2m19.5s/3m30.0s

running (2m20.5s), 468/700 VUs, 184557 complete and 0 interrupted iterations
default   [  67% ] 468/700 VUs  2m20.5s/3m30.0s

running (2m21.5s), 471/700 VUs, 186312 complete and 0 interrupted iterations
default   [  67% ] 471/700 VUs  2m21.5s/3m30.0s

running (2m22.5s), 475/700 VUs, 187734 complete and 0 interrupted iterations
default   [  68% ] 475/700 VUs  2m22.5s/3m30.0s

running (2m23.5s), 478/700 VUs, 190243 complete and 0 interrupted iterations
default   [  68% ] 478/700 VUs  2m23.5s/3m30.0s

running (2m24.5s), 481/700 VUs, 192094 complete and 0 interrupted iterations
default   [  69% ] 481/700 VUs  2m24.5s/3m30.0s

running (2m25.5s), 485/700 VUs, 195032 complete and 0 interrupted iterations
default   [  69% ] 485/700 VUs  2m25.5s/3m30.0s

running (2m26.5s), 488/700 VUs, 197162 complete and 0 interrupted iterations
default   [  70% ] 488/700 VUs  2m26.5s/3m30.0s

running (2m27.5s), 491/700 VUs, 200103 complete and 0 interrupted iterations
default   [  70% ] 491/700 VUs  2m27.5s/3m30.0s

running (2m28.5s), 495/700 VUs, 202080 complete and 0 interrupted iterations
default   [  71% ] 495/700 VUs  2m28.5s/3m30.0s

running (2m29.5s), 498/700 VUs, 204887 complete and 0 interrupted iterations
default   [  71% ] 498/700 VUs  2m29.5s/3m30.0s

running (2m30.5s), 501/700 VUs, 206840 complete and 0 interrupted iterations
default   [  72% ] 501/700 VUs  2m30.5s/3m30.0s

running (2m31.5s), 505/700 VUs, 209705 complete and 0 interrupted iterations
default   [  72% ] 505/700 VUs  2m31.5s/3m30.0s

running (2m32.5s), 508/700 VUs, 212022 complete and 0 interrupted iterations
default   [  73% ] 508/700 VUs  2m32.5s/3m30.0s

running (2m33.5s), 511/700 VUs, 214276 complete and 0 interrupted iterations
default   [  73% ] 511/700 VUs  2m33.5s/3m30.0s

running (2m34.5s), 515/700 VUs, 215773 complete and 0 interrupted iterations
default   [  74% ] 515/700 VUs  2m34.5s/3m30.0s

running (2m35.5s), 518/700 VUs, 218342 complete and 0 interrupted iterations
default   [  74% ] 518/700 VUs  2m35.5s/3m30.0s

running (2m36.5s), 521/700 VUs, 220675 complete and 0 interrupted iterations
default   [  75% ] 521/700 VUs  2m36.5s/3m30.0s

running (2m37.5s), 525/700 VUs, 223077 complete and 0 interrupted iterations
default   [  75% ] 525/700 VUs  2m37.5s/3m30.0s

running (2m38.5s), 528/700 VUs, 224508 complete and 0 interrupted iterations
default   [  75% ] 528/700 VUs  2m38.5s/3m30.0s

running (2m39.5s), 531/700 VUs, 226215 complete and 0 interrupted iterations
default   [  76% ] 531/700 VUs  2m39.5s/3m30.0s

running (2m40.5s), 535/700 VUs, 227773 complete and 0 interrupted iterations
default   [  76% ] 535/700 VUs  2m40.5s/3m30.0s

running (2m41.5s), 538/700 VUs, 229978 complete and 0 interrupted iterations
default   [  77% ] 538/700 VUs  2m41.5s/3m30.0s

running (2m42.5s), 541/700 VUs, 231729 complete and 0 interrupted iterations
default   [  77% ] 541/700 VUs  2m42.5s/3m30.0s

running (2m43.5s), 545/700 VUs, 233670 complete and 0 interrupted iterations
default   [  78% ] 545/700 VUs  2m43.5s/3m30.0s

running (2m44.5s), 548/700 VUs, 236429 complete and 0 interrupted iterations
default   [  78% ] 548/700 VUs  2m44.5s/3m30.0s

running (2m45.5s), 551/700 VUs, 239113 complete and 0 interrupted iterations
default   [  79% ] 551/700 VUs  2m45.5s/3m30.0s

running (2m46.5s), 555/700 VUs, 241113 complete and 0 interrupted iterations
default   [  79% ] 555/700 VUs  2m46.5s/3m30.0s

running (2m47.5s), 558/700 VUs, 244156 complete and 0 interrupted iterations
default   [  80% ] 558/700 VUs  2m47.5s/3m30.0s

running (2m48.5s), 561/700 VUs, 246351 complete and 0 interrupted iterations
default   [  80% ] 561/700 VUs  2m48.5s/3m30.0s

running (2m49.5s), 565/700 VUs, 248234 complete and 0 interrupted iterations
default   [  81% ] 565/700 VUs  2m49.5s/3m30.0s

running (2m50.5s), 568/700 VUs, 250564 complete and 0 interrupted iterations
default   [  81% ] 568/700 VUs  2m50.5s/3m30.0s

running (2m51.5s), 571/700 VUs, 252225 complete and 0 interrupted iterations
default   [  82% ] 571/700 VUs  2m51.5s/3m30.0s

running (2m52.6s), 575/700 VUs, 254392 complete and 0 interrupted iterations
default   [  82% ] 575/700 VUs  2m52.6s/3m30.0s

running (2m53.5s), 578/700 VUs, 255788 complete and 0 interrupted iterations
default   [  83% ] 578/700 VUs  2m53.5s/3m30.0s

running (2m54.5s), 581/700 VUs, 258166 complete and 0 interrupted iterations
default   [  83% ] 581/700 VUs  2m54.5s/3m30.0s

running (2m55.5s), 585/700 VUs, 259629 complete and 0 interrupted iterations
default   [  84% ] 585/700 VUs  2m55.5s/3m30.0s

running (2m56.5s), 588/700 VUs, 262051 complete and 0 interrupted iterations
default   [  84% ] 588/700 VUs  2m56.5s/3m30.0s

running (2m57.5s), 591/700 VUs, 263183 complete and 0 interrupted iterations
default   [  85% ] 591/700 VUs  2m57.5s/3m30.0s

running (2m58.5s), 595/700 VUs, 265893 complete and 0 interrupted iterations
default   [  85% ] 595/700 VUs  2m58.5s/3m30.0s

running (2m59.5s), 598/700 VUs, 268095 complete and 0 interrupted iterations
default   [  85% ] 598/700 VUs  2m59.5s/3m30.0s

running (3m00.5s), 601/700 VUs, 270962 complete and 0 interrupted iterations
default   [  86% ] 601/700 VUs  3m00.5s/3m30.0s

running (3m01.5s), 605/700 VUs, 273345 complete and 0 interrupted iterations
default   [  86% ] 605/700 VUs  3m01.5s/3m30.0s

running (3m02.5s), 608/700 VUs, 276059 complete and 0 interrupted iterations
default   [  87% ] 608/700 VUs  3m02.5s/3m30.0s

running (3m03.5s), 611/700 VUs, 278565 complete and 0 interrupted iterations
default   [  87% ] 611/700 VUs  3m03.5s/3m30.0s

running (3m04.5s), 615/700 VUs, 280683 complete and 0 interrupted iterations
default   [  88% ] 615/700 VUs  3m04.5s/3m30.0s

running (3m05.5s), 618/700 VUs, 283639 complete and 0 interrupted iterations
default   [  88% ] 618/700 VUs  3m05.5s/3m30.0s

running (3m06.5s), 621/700 VUs, 285548 complete and 0 interrupted iterations
default   [  89% ] 621/700 VUs  3m06.5s/3m30.0s

running (3m07.5s), 625/700 VUs, 288511 complete and 0 interrupted iterations
default   [  89% ] 625/700 VUs  3m07.5s/3m30.0s

running (3m08.5s), 628/700 VUs, 290655 complete and 0 interrupted iterations
default   [  90% ] 628/700 VUs  3m08.5s/3m30.0s

running (3m09.5s), 631/700 VUs, 293570 complete and 0 interrupted iterations
default   [  90% ] 631/700 VUs  3m09.5s/3m30.0s

running (3m10.5s), 635/700 VUs, 295719 complete and 0 interrupted iterations
default   [  91% ] 635/700 VUs  3m10.5s/3m30.0s

running (3m11.5s), 638/700 VUs, 297915 complete and 0 interrupted iterations
default   [  91% ] 638/700 VUs  3m11.5s/3m30.0s

running (3m12.5s), 641/700 VUs, 299809 complete and 0 interrupted iterations
default   [  92% ] 641/700 VUs  3m12.5s/3m30.0s

running (3m13.5s), 645/700 VUs, 301557 complete and 0 interrupted iterations
default   [  92% ] 645/700 VUs  3m13.5s/3m30.0s

running (3m14.5s), 648/700 VUs, 304083 complete and 0 interrupted iterations
default   [  93% ] 648/700 VUs  3m14.5s/3m30.0s

running (3m15.5s), 651/700 VUs, 306419 complete and 0 interrupted iterations
default   [  93% ] 651/700 VUs  3m15.5s/3m30.0s

running (3m16.5s), 655/700 VUs, 309059 complete and 0 interrupted iterations
default   [  94% ] 655/700 VUs  3m16.5s/3m30.0s

running (3m17.6s), 658/700 VUs, 311427 complete and 0 interrupted iterations
default   [  94% ] 658/700 VUs  3m17.5s/3m30.0s

running (3m18.5s), 661/700 VUs, 313107 complete and 0 interrupted iterations
default   [  95% ] 661/700 VUs  3m18.5s/3m30.0s

running (3m19.5s), 665/700 VUs, 315106 complete and 0 interrupted iterations
default   [  95% ] 665/700 VUs  3m19.5s/3m30.0s

running (3m20.5s), 668/700 VUs, 316724 complete and 0 interrupted iterations
default   [  95% ] 668/700 VUs  3m20.5s/3m30.0s

running (3m21.5s), 671/700 VUs, 318857 complete and 0 interrupted iterations
default   [  96% ] 671/700 VUs  3m21.5s/3m30.0s

running (3m22.5s), 675/700 VUs, 320397 complete and 0 interrupted iterations
default   [  96% ] 675/700 VUs  3m22.5s/3m30.0s

running (3m23.5s), 678/700 VUs, 322141 complete and 0 interrupted iterations
default   [  97% ] 678/700 VUs  3m23.5s/3m30.0s

running (3m24.5s), 681/700 VUs, 324341 complete and 0 interrupted iterations
default   [  97% ] 681/700 VUs  3m24.5s/3m30.0s

running (3m25.5s), 685/700 VUs, 326440 complete and 0 interrupted iterations
default   [  98% ] 685/700 VUs  3m25.5s/3m30.0s

running (3m26.5s), 688/700 VUs, 328723 complete and 0 interrupted iterations
default   [  98% ] 688/700 VUs  3m26.5s/3m30.0s

running (3m27.5s), 691/700 VUs, 330285 complete and 0 interrupted iterations
default   [  99% ] 691/700 VUs  3m27.5s/3m30.0s

running (3m28.5s), 695/700 VUs, 332619 complete and 0 interrupted iterations
default   [  99% ] 695/700 VUs  3m28.5s/3m30.0s

running (3m29.5s), 698/700 VUs, 334346 complete and 0 interrupted iterations
default   [ 100% ] 698/700 VUs  3m29.5s/3m30.0s

running (3m30.5s), 194/700 VUs, 335756 complete and 0 interrupted iterations
default ↓ [ 100% ] 699/700 VUs  3m30s

running (3m31.5s), 194/700 VUs, 335756 complete and 0 interrupted iterations
default ↓ [ 100% ] 699/700 VUs  3m30s

running (3m32.5s), 123/700 VUs, 335827 complete and 0 interrupted iterations
default ↓ [ 100% ] 699/700 VUs  3m30s

running (3m33.4s), 000/700 VUs, 335950 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/700 VUs  3m30s

     ✗ logged in successfully
      ↳  41% — ✓ 139857 / ✗ 196093
     ✓ retrieved member

     checks.........................: 41.80% ✓ 140879      ✗ 196093
     data_received..................: 186 MB 873 kB/s
     data_sent......................: 116 MB 545 kB/s
     http_req_blocked...............: avg=12.1ms   min=0s       med=1.74µs  max=2.19s    p(90)=3.17µs   p(95)=10.2µs  
     http_req_connecting............: avg=29.76ms  min=0s       med=0s      max=1.07s    p(90)=103.27ms p(95)=130.61ms
   ✓ http_req_duration..............: avg=93.09ms  min=0s       med=15.48ms max=22.37s   p(90)=71.83ms  p(95)=106.41ms
       { expected_response:true }...: avg=6.9s     min=25.72ms  med=6.48s   max=20.65s   p(90)=12.31s   p(95)=13.86s  
     http_req_failed................: 99.55% ✓ 473674      ✗ 2133  
     http_req_receiving.............: avg=359.39µs min=0s       med=23.02µs max=274.51ms p(90)=41.23µs  p(95)=56.17µs 
     http_req_sending...............: avg=1.77ms   min=0s       med=9.7µs   max=1.69s    p(90)=22.75µs  p(95)=44.88µs 
     http_req_tls_handshaking.......: avg=9.13ms   min=0s       med=0s      max=1.64s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=90.96ms  min=0s       med=15.11ms max=22.35s   p(90)=70.18ms  p(95)=100.81ms
     http_reqs......................: 475807 2229.607395/s
     iteration_duration.............: avg=211.25ms min=369.09µs med=91.84ms max=30.42s   p(90)=238.52ms p(95)=362.34ms
     iterations.....................: 335950 1574.244608/s
     vus............................: 110    min=4         max=699 
     vus_max........................: 700    min=700       max=700 

```
