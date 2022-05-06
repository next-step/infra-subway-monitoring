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

  scenarios: (100.00%) 1 scenario, 694 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 694 looping VUs for 3m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.6s), 007/694 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 007/694 VUs  0m00.6s/3m00.0s

running (0m01.6s), 019/694 VUs, 0 complete and 0 interrupted iterations
default   [   1% ] 019/694 VUs  0m01.6s/3m00.0s

running (0m02.6s), 030/694 VUs, 0 complete and 0 interrupted iterations
default   [   1% ] 030/694 VUs  0m02.6s/3m00.0s

running (0m03.6s), 042/694 VUs, 6 complete and 0 interrupted iterations
default   [   2% ] 042/694 VUs  0m03.6s/3m00.0s

running (0m04.6s), 053/694 VUs, 12 complete and 0 interrupted iterations
default   [   3% ] 053/694 VUs  0m04.6s/3m00.0s

running (0m05.6s), 065/694 VUs, 19 complete and 0 interrupted iterations
default   [   3% ] 065/694 VUs  0m05.6s/3m00.0s

running (0m06.6s), 076/694 VUs, 24 complete and 0 interrupted iterations
default   [   4% ] 076/694 VUs  0m06.6s/3m00.0s

running (0m07.6s), 088/694 VUs, 30 complete and 0 interrupted iterations
default   [   4% ] 088/694 VUs  0m07.6s/3m00.0s

running (0m08.6s), 099/694 VUs, 38 complete and 0 interrupted iterations
default   [   5% ] 099/694 VUs  0m08.6s/3m00.0s

running (0m09.6s), 111/694 VUs, 536 complete and 0 interrupted iterations
default   [   5% ] 111/694 VUs  0m09.6s/3m00.0s

running (0m10.6s), 123/694 VUs, 2909 complete and 0 interrupted iterations
default   [   6% ] 123/694 VUs  0m10.6s/3m00.0s

running (0m11.6s), 134/694 VUs, 5221 complete and 0 interrupted iterations
default   [   6% ] 134/694 VUs  0m11.6s/3m00.0s

running (0m12.6s), 146/694 VUs, 6722 complete and 0 interrupted iterations
default   [   7% ] 146/694 VUs  0m12.6s/3m00.0s

running (0m13.6s), 157/694 VUs, 6795 complete and 0 interrupted iterations
default   [   8% ] 157/694 VUs  0m13.6s/3m00.0s

running (0m14.6s), 169/694 VUs, 6994 complete and 0 interrupted iterations
default   [   8% ] 169/694 VUs  0m14.6s/3m00.0s

running (0m15.6s), 180/694 VUs, 8075 complete and 0 interrupted iterations
default   [   9% ] 180/694 VUs  0m15.6s/3m00.0s

running (0m16.6s), 192/694 VUs, 10808 complete and 0 interrupted iterations
default   [   9% ] 192/694 VUs  0m16.6s/3m00.0s

running (0m17.6s), 203/694 VUs, 13356 complete and 0 interrupted iterations
default   [  10% ] 203/694 VUs  0m17.6s/3m00.0s

running (0m18.6s), 215/694 VUs, 16276 complete and 0 interrupted iterations
default   [  10% ] 215/694 VUs  0m18.6s/3m00.0s

running (0m19.6s), 226/694 VUs, 18667 complete and 0 interrupted iterations
default   [  11% ] 226/694 VUs  0m19.6s/3m00.0s

running (0m20.6s), 238/694 VUs, 21433 complete and 0 interrupted iterations
default   [  11% ] 238/694 VUs  0m20.6s/3m00.0s

running (0m21.6s), 250/694 VUs, 24488 complete and 0 interrupted iterations
default   [  12% ] 250/694 VUs  0m21.6s/3m00.0s

running (0m22.6s), 261/694 VUs, 27364 complete and 0 interrupted iterations
default   [  13% ] 261/694 VUs  0m22.6s/3m00.0s

running (0m23.6s), 273/694 VUs, 30289 complete and 0 interrupted iterations
default   [  13% ] 273/694 VUs  0m23.6s/3m00.0s

running (0m24.6s), 284/694 VUs, 33544 complete and 0 interrupted iterations
default   [  14% ] 284/694 VUs  0m24.6s/3m00.0s

running (0m25.6s), 296/694 VUs, 36361 complete and 0 interrupted iterations
default   [  14% ] 296/694 VUs  0m25.6s/3m00.0s

running (0m26.6s), 307/694 VUs, 38962 complete and 0 interrupted iterations
default   [  15% ] 307/694 VUs  0m26.6s/3m00.0s

running (0m27.6s), 319/694 VUs, 41828 complete and 0 interrupted iterations
default   [  15% ] 319/694 VUs  0m27.6s/3m00.0s

running (0m28.6s), 330/694 VUs, 44556 complete and 0 interrupted iterations
default   [  16% ] 330/694 VUs  0m28.6s/3m00.0s

running (0m29.6s), 342/694 VUs, 47025 complete and 0 interrupted iterations
default   [  16% ] 342/694 VUs  0m29.6s/3m00.0s

running (0m30.6s), 354/694 VUs, 49878 complete and 0 interrupted iterations
default   [  17% ] 354/694 VUs  0m30.6s/3m00.0s

running (0m31.6s), 365/694 VUs, 52486 complete and 0 interrupted iterations
default   [  18% ] 365/694 VUs  0m31.6s/3m00.0s

running (0m32.6s), 377/694 VUs, 55207 complete and 0 interrupted iterations
default   [  18% ] 377/694 VUs  0m32.6s/3m00.0s

running (0m33.6s), 388/694 VUs, 57993 complete and 0 interrupted iterations
default   [  19% ] 388/694 VUs  0m33.6s/3m00.0s

running (0m34.6s), 400/694 VUs, 60779 complete and 0 interrupted iterations
default   [  19% ] 400/694 VUs  0m34.6s/3m00.0s

running (0m35.6s), 411/694 VUs, 63445 complete and 0 interrupted iterations
default   [  20% ] 411/694 VUs  0m35.6s/3m00.0s

running (0m36.6s), 423/694 VUs, 66149 complete and 0 interrupted iterations
default   [  20% ] 423/694 VUs  0m36.6s/3m00.0s

running (0m37.6s), 434/694 VUs, 69438 complete and 0 interrupted iterations
default   [  21% ] 434/694 VUs  0m37.6s/3m00.0s

running (0m38.6s), 446/694 VUs, 71828 complete and 0 interrupted iterations
default   [  21% ] 446/694 VUs  0m38.6s/3m00.0s

running (0m39.6s), 457/694 VUs, 74246 complete and 0 interrupted iterations
default   [  22% ] 457/694 VUs  0m39.6s/3m00.0s

running (0m40.6s), 469/694 VUs, 77430 complete and 0 interrupted iterations
default   [  23% ] 469/694 VUs  0m40.6s/3m00.0s

running (0m41.6s), 481/694 VUs, 79167 complete and 0 interrupted iterations
default   [  23% ] 481/694 VUs  0m41.6s/3m00.0s

running (0m42.6s), 492/694 VUs, 80836 complete and 0 interrupted iterations
default   [  24% ] 492/694 VUs  0m42.6s/3m00.0s

running (0m43.6s), 504/694 VUs, 82274 complete and 0 interrupted iterations
default   [  24% ] 504/694 VUs  0m43.6s/3m00.0s

running (0m44.6s), 515/694 VUs, 83471 complete and 0 interrupted iterations
default   [  25% ] 515/694 VUs  0m44.6s/3m00.0s

running (0m45.6s), 527/694 VUs, 85855 complete and 0 interrupted iterations
default   [  25% ] 527/694 VUs  0m45.6s/3m00.0s

running (0m46.6s), 538/694 VUs, 88100 complete and 0 interrupted iterations
default   [  26% ] 538/694 VUs  0m46.6s/3m00.0s

running (0m47.6s), 550/694 VUs, 89298 complete and 0 interrupted iterations
default   [  26% ] 550/694 VUs  0m47.6s/3m00.0s

running (0m48.6s), 561/694 VUs, 91392 complete and 0 interrupted iterations
default   [  27% ] 561/694 VUs  0m48.6s/3m00.0s

running (0m49.6s), 573/694 VUs, 93533 complete and 0 interrupted iterations
default   [  28% ] 573/694 VUs  0m49.6s/3m00.0s

running (0m50.6s), 585/694 VUs, 95093 complete and 0 interrupted iterations
default   [  28% ] 585/694 VUs  0m50.6s/3m00.0s

running (0m51.6s), 596/694 VUs, 97206 complete and 0 interrupted iterations
default   [  29% ] 596/694 VUs  0m51.6s/3m00.0s

running (0m52.6s), 608/694 VUs, 98931 complete and 0 interrupted iterations
default   [  29% ] 608/694 VUs  0m52.6s/3m00.0s

running (0m53.6s), 619/694 VUs, 101321 complete and 0 interrupted iterations
default   [  30% ] 619/694 VUs  0m53.6s/3m00.0s

running (0m54.6s), 631/694 VUs, 103955 complete and 0 interrupted iterations
default   [  30% ] 631/694 VUs  0m54.6s/3m00.0s

running (0m55.6s), 642/694 VUs, 106002 complete and 0 interrupted iterations
default   [  31% ] 642/694 VUs  0m55.6s/3m00.0s

running (0m56.6s), 654/694 VUs, 108367 complete and 0 interrupted iterations
default   [  31% ] 654/694 VUs  0m56.6s/3m00.0s

running (0m57.6s), 665/694 VUs, 110559 complete and 0 interrupted iterations
default   [  32% ] 665/694 VUs  0m57.6s/3m00.0s

running (0m58.6s), 677/694 VUs, 112510 complete and 0 interrupted iterations
default   [  33% ] 677/694 VUs  0m58.6s/3m00.0s

running (0m59.6s), 688/694 VUs, 114529 complete and 0 interrupted iterations
default   [  33% ] 688/694 VUs  0m59.6s/3m00.0s

running (1m00.6s), 694/694 VUs, 116226 complete and 0 interrupted iterations
default   [  34% ] 694/694 VUs  1m00.6s/3m00.0s

running (1m01.6s), 694/694 VUs, 119119 complete and 0 interrupted iterations
default   [  34% ] 694/694 VUs  1m01.6s/3m00.0s

running (1m02.6s), 694/694 VUs, 120391 complete and 0 interrupted iterations
default   [  35% ] 694/694 VUs  1m02.6s/3m00.0s

running (1m03.6s), 694/694 VUs, 122423 complete and 0 interrupted iterations
default   [  35% ] 694/694 VUs  1m03.6s/3m00.0s

running (1m04.6s), 694/694 VUs, 124797 complete and 0 interrupted iterations
default   [  36% ] 694/694 VUs  1m04.6s/3m00.0s

running (1m05.6s), 694/694 VUs, 126254 complete and 0 interrupted iterations
default   [  36% ] 694/694 VUs  1m05.6s/3m00.0s

running (1m06.6s), 694/694 VUs, 127947 complete and 0 interrupted iterations
default   [  37% ] 694/694 VUs  1m06.6s/3m00.0s

running (1m07.6s), 694/694 VUs, 130294 complete and 0 interrupted iterations
default   [  38% ] 694/694 VUs  1m07.6s/3m00.0s

running (1m08.6s), 694/694 VUs, 131663 complete and 0 interrupted iterations
default   [  38% ] 694/694 VUs  1m08.6s/3m00.0s

running (1m09.6s), 694/694 VUs, 133645 complete and 0 interrupted iterations
default   [  39% ] 694/694 VUs  1m09.6s/3m00.0s

running (1m10.6s), 694/694 VUs, 135334 complete and 0 interrupted iterations
default   [  39% ] 694/694 VUs  1m10.6s/3m00.0s

running (1m11.6s), 694/694 VUs, 137314 complete and 0 interrupted iterations
default   [  40% ] 694/694 VUs  1m11.6s/3m00.0s

running (1m12.6s), 694/694 VUs, 139551 complete and 0 interrupted iterations
default   [  40% ] 694/694 VUs  1m12.6s/3m00.0s

running (1m13.6s), 694/694 VUs, 141058 complete and 0 interrupted iterations
default   [  41% ] 694/694 VUs  1m13.6s/3m00.0s

running (1m14.6s), 694/694 VUs, 143037 complete and 0 interrupted iterations
default   [  41% ] 694/694 VUs  1m14.6s/3m00.0s

running (1m15.6s), 694/694 VUs, 144628 complete and 0 interrupted iterations
default   [  42% ] 694/694 VUs  1m15.6s/3m00.0s

running (1m16.6s), 694/694 VUs, 147550 complete and 0 interrupted iterations
default   [  43% ] 694/694 VUs  1m16.6s/3m00.0s

running (1m17.6s), 694/694 VUs, 149740 complete and 0 interrupted iterations
default   [  43% ] 694/694 VUs  1m17.6s/3m00.0s

running (1m18.6s), 694/694 VUs, 151458 complete and 0 interrupted iterations
default   [  44% ] 694/694 VUs  1m18.6s/3m00.0s

running (1m19.6s), 694/694 VUs, 152564 complete and 0 interrupted iterations
default   [  44% ] 694/694 VUs  1m19.6s/3m00.0s

running (1m20.6s), 694/694 VUs, 154338 complete and 0 interrupted iterations
default   [  45% ] 694/694 VUs  1m20.6s/3m00.0s

running (1m21.6s), 694/694 VUs, 155996 complete and 0 interrupted iterations
default   [  45% ] 694/694 VUs  1m21.6s/3m00.0s

running (1m22.6s), 694/694 VUs, 157875 complete and 0 interrupted iterations
default   [  46% ] 694/694 VUs  1m22.6s/3m00.0s

running (1m23.6s), 694/694 VUs, 159674 complete and 0 interrupted iterations
default   [  46% ] 694/694 VUs  1m23.6s/3m00.0s

running (1m24.6s), 694/694 VUs, 161730 complete and 0 interrupted iterations
default   [  47% ] 694/694 VUs  1m24.6s/3m00.0s

running (1m25.6s), 694/694 VUs, 163279 complete and 0 interrupted iterations
default   [  48% ] 694/694 VUs  1m25.6s/3m00.0s

running (1m26.6s), 694/694 VUs, 165329 complete and 0 interrupted iterations
default   [  48% ] 694/694 VUs  1m26.6s/3m00.0s

running (1m27.6s), 694/694 VUs, 166969 complete and 0 interrupted iterations
default   [  49% ] 694/694 VUs  1m27.6s/3m00.0s

running (1m28.6s), 694/694 VUs, 169984 complete and 0 interrupted iterations
default   [  49% ] 694/694 VUs  1m28.6s/3m00.0s

running (1m29.6s), 694/694 VUs, 172147 complete and 0 interrupted iterations
default   [  50% ] 694/694 VUs  1m29.6s/3m00.0s

running (1m30.6s), 694/694 VUs, 174446 complete and 0 interrupted iterations
default   [  50% ] 694/694 VUs  1m30.6s/3m00.0s

running (1m31.6s), 694/694 VUs, 177306 complete and 0 interrupted iterations
default   [  51% ] 694/694 VUs  1m31.6s/3m00.0s

running (1m32.6s), 694/694 VUs, 179358 complete and 0 interrupted iterations
default   [  51% ] 694/694 VUs  1m32.6s/3m00.0s

running (1m33.6s), 694/694 VUs, 182186 complete and 0 interrupted iterations
default   [  52% ] 694/694 VUs  1m33.6s/3m00.0s

running (1m34.6s), 694/694 VUs, 184627 complete and 0 interrupted iterations
default   [  53% ] 694/694 VUs  1m34.6s/3m00.0s

running (1m35.6s), 694/694 VUs, 186607 complete and 0 interrupted iterations
default   [  53% ] 694/694 VUs  1m35.6s/3m00.0s

running (1m36.6s), 694/694 VUs, 189477 complete and 0 interrupted iterations
default   [  54% ] 694/694 VUs  1m36.6s/3m00.0s

running (1m37.6s), 694/694 VUs, 191530 complete and 0 interrupted iterations
default   [  54% ] 694/694 VUs  1m37.6s/3m00.0s

running (1m38.6s), 694/694 VUs, 193847 complete and 0 interrupted iterations
default   [  55% ] 694/694 VUs  1m38.6s/3m00.0s

running (1m39.6s), 694/694 VUs, 196946 complete and 0 interrupted iterations
default   [  55% ] 694/694 VUs  1m39.6s/3m00.0s

running (1m40.6s), 694/694 VUs, 198845 complete and 0 interrupted iterations
default   [  56% ] 694/694 VUs  1m40.6s/3m00.0s

running (1m41.6s), 694/694 VUs, 201780 complete and 0 interrupted iterations
default   [  56% ] 694/694 VUs  1m41.6s/3m00.0s

running (1m42.6s), 694/694 VUs, 203954 complete and 0 interrupted iterations
default   [  57% ] 694/694 VUs  1m42.6s/3m00.0s

running (1m43.6s), 694/694 VUs, 206139 complete and 0 interrupted iterations
default   [  58% ] 694/694 VUs  1m43.6s/3m00.0s

running (1m44.6s), 694/694 VUs, 208968 complete and 0 interrupted iterations
default   [  58% ] 694/694 VUs  1m44.6s/3m00.0s

running (1m45.6s), 694/694 VUs, 211022 complete and 0 interrupted iterations
default   [  59% ] 694/694 VUs  1m45.6s/3m00.0s

running (1m46.6s), 694/694 VUs, 213847 complete and 0 interrupted iterations
default   [  59% ] 694/694 VUs  1m46.6s/3m00.0s

running (1m47.6s), 694/694 VUs, 216410 complete and 0 interrupted iterations
default   [  60% ] 694/694 VUs  1m47.6s/3m00.0s

running (1m48.6s), 694/694 VUs, 218455 complete and 0 interrupted iterations
default   [  60% ] 694/694 VUs  1m48.6s/3m00.0s

running (1m49.6s), 694/694 VUs, 221750 complete and 0 interrupted iterations
default   [  61% ] 694/694 VUs  1m49.6s/3m00.0s

running (1m50.6s), 694/694 VUs, 223441 complete and 0 interrupted iterations
default   [  61% ] 694/694 VUs  1m50.6s/3m00.0s

running (1m51.6s), 694/694 VUs, 226043 complete and 0 interrupted iterations
default   [  62% ] 694/694 VUs  1m51.6s/3m00.0s

running (1m52.6s), 694/694 VUs, 228369 complete and 0 interrupted iterations
default   [  63% ] 694/694 VUs  1m52.6s/3m00.0s

running (1m53.6s), 694/694 VUs, 230693 complete and 0 interrupted iterations
default   [  63% ] 694/694 VUs  1m53.6s/3m00.0s

running (1m54.6s), 694/694 VUs, 232017 complete and 0 interrupted iterations
default   [  64% ] 694/694 VUs  1m54.6s/3m00.0s

running (1m55.6s), 694/694 VUs, 234305 complete and 0 interrupted iterations
default   [  64% ] 694/694 VUs  1m55.6s/3m00.0s

running (1m56.6s), 694/694 VUs, 236174 complete and 0 interrupted iterations
default   [  65% ] 694/694 VUs  1m56.6s/3m00.0s

running (1m57.6s), 694/694 VUs, 238066 complete and 0 interrupted iterations
default   [  65% ] 694/694 VUs  1m57.6s/3m00.0s

running (1m58.6s), 694/694 VUs, 240546 complete and 0 interrupted iterations
default   [  66% ] 694/694 VUs  1m58.6s/3m00.0s

running (1m59.6s), 694/694 VUs, 242950 complete and 0 interrupted iterations
default   [  66% ] 694/694 VUs  1m59.6s/3m00.0s

running (2m00.6s), 694/694 VUs, 244999 complete and 0 interrupted iterations
default   [  67% ] 694/694 VUs  2m00.6s/3m00.0s

running (2m01.6s), 694/694 VUs, 245484 complete and 0 interrupted iterations
default   [  68% ] 694/694 VUs  2m01.6s/3m00.0s

running (2m02.6s), 694/694 VUs, 247061 complete and 0 interrupted iterations
default   [  68% ] 694/694 VUs  2m02.6s/3m00.0s

running (2m03.6s), 694/694 VUs, 247538 complete and 0 interrupted iterations
default   [  69% ] 694/694 VUs  2m03.6s/3m00.0s

running (2m04.6s), 694/694 VUs, 249262 complete and 0 interrupted iterations
default   [  69% ] 694/694 VUs  2m04.6s/3m00.0s

running (2m05.6s), 694/694 VUs, 251316 complete and 0 interrupted iterations
default   [  70% ] 694/694 VUs  2m05.6s/3m00.0s

running (2m06.6s), 694/694 VUs, 252450 complete and 0 interrupted iterations
default   [  70% ] 694/694 VUs  2m06.6s/3m00.0s

running (2m07.6s), 694/694 VUs, 253990 complete and 0 interrupted iterations
default   [  71% ] 694/694 VUs  2m07.6s/3m00.0s

running (2m08.6s), 694/694 VUs, 255952 complete and 0 interrupted iterations
default   [  71% ] 694/694 VUs  2m08.6s/3m00.0s

running (2m09.6s), 694/694 VUs, 258033 complete and 0 interrupted iterations
default   [  72% ] 694/694 VUs  2m09.6s/3m00.0s

running (2m10.6s), 694/694 VUs, 259378 complete and 0 interrupted iterations
default   [  73% ] 694/694 VUs  2m10.6s/3m00.0s

running (2m11.6s), 694/694 VUs, 260962 complete and 0 interrupted iterations
default   [  73% ] 694/694 VUs  2m11.6s/3m00.0s

running (2m12.6s), 694/694 VUs, 262045 complete and 0 interrupted iterations
default   [  74% ] 694/694 VUs  2m12.6s/3m00.0s

running (2m13.6s), 694/694 VUs, 264006 complete and 0 interrupted iterations
default   [  74% ] 694/694 VUs  2m13.6s/3m00.0s

running (2m14.6s), 694/694 VUs, 265585 complete and 0 interrupted iterations
default   [  75% ] 694/694 VUs  2m14.6s/3m00.0s

running (2m15.6s), 694/694 VUs, 267914 complete and 0 interrupted iterations
default   [  75% ] 694/694 VUs  2m15.6s/3m00.0s

running (2m16.6s), 694/694 VUs, 269918 complete and 0 interrupted iterations
default   [  76% ] 694/694 VUs  2m16.6s/3m00.0s

running (2m17.6s), 694/694 VUs, 271832 complete and 0 interrupted iterations
default   [  76% ] 694/694 VUs  2m17.6s/3m00.0s

running (2m18.6s), 694/694 VUs, 273240 complete and 0 interrupted iterations
default   [  77% ] 694/694 VUs  2m18.6s/3m00.0s

running (2m19.6s), 694/694 VUs, 274697 complete and 0 interrupted iterations
default   [  78% ] 694/694 VUs  2m19.6s/3m00.0s

running (2m20.6s), 694/694 VUs, 276976 complete and 0 interrupted iterations
default   [  78% ] 694/694 VUs  2m20.6s/3m00.0s

running (2m21.6s), 694/694 VUs, 278420 complete and 0 interrupted iterations
default   [  79% ] 694/694 VUs  2m21.6s/3m00.0s

running (2m22.6s), 694/694 VUs, 280662 complete and 0 interrupted iterations
default   [  79% ] 694/694 VUs  2m22.6s/3m00.0s

running (2m23.6s), 694/694 VUs, 282240 complete and 0 interrupted iterations
default   [  80% ] 694/694 VUs  2m23.6s/3m00.0s

running (2m24.6s), 694/694 VUs, 284717 complete and 0 interrupted iterations
default   [  80% ] 694/694 VUs  2m24.6s/3m00.0s

running (2m25.6s), 694/694 VUs, 286307 complete and 0 interrupted iterations
default   [  81% ] 694/694 VUs  2m25.6s/3m00.0s

running (2m26.6s), 694/694 VUs, 288710 complete and 0 interrupted iterations
default   [  81% ] 694/694 VUs  2m26.6s/3m00.0s

running (2m27.6s), 694/694 VUs, 291220 complete and 0 interrupted iterations
default   [  82% ] 694/694 VUs  2m27.6s/3m00.0s

running (2m28.6s), 694/694 VUs, 293219 complete and 0 interrupted iterations
default   [  83% ] 694/694 VUs  2m28.6s/3m00.0s

running (2m29.6s), 694/694 VUs, 296269 complete and 0 interrupted iterations
default   [  83% ] 694/694 VUs  2m29.6s/3m00.0s

running (2m30.6s), 694/694 VUs, 298471 complete and 0 interrupted iterations
default   [  84% ] 694/694 VUs  2m30.6s/3m00.0s

running (2m31.6s), 694/694 VUs, 300898 complete and 0 interrupted iterations
default   [  84% ] 694/694 VUs  2m31.6s/3m00.0s

running (2m32.6s), 694/694 VUs, 303254 complete and 0 interrupted iterations
default   [  85% ] 694/694 VUs  2m32.6s/3m00.0s

running (2m33.6s), 694/694 VUs, 305292 complete and 0 interrupted iterations
default   [  85% ] 694/694 VUs  2m33.6s/3m00.0s

running (2m34.6s), 694/694 VUs, 308114 complete and 0 interrupted iterations
default   [  86% ] 694/694 VUs  2m34.6s/3m00.0s

running (2m35.6s), 694/694 VUs, 310032 complete and 0 interrupted iterations
default   [  86% ] 694/694 VUs  2m35.6s/3m00.0s

running (2m36.6s), 694/694 VUs, 312834 complete and 0 interrupted iterations
default   [  87% ] 694/694 VUs  2m36.6s/3m00.0s

running (2m37.6s), 694/694 VUs, 315112 complete and 0 interrupted iterations
default   [  88% ] 694/694 VUs  2m37.6s/3m00.0s

running (2m38.6s), 694/694 VUs, 317400 complete and 0 interrupted iterations
default   [  88% ] 694/694 VUs  2m38.6s/3m00.0s

running (2m39.6s), 694/694 VUs, 318929 complete and 0 interrupted iterations
default   [  89% ] 694/694 VUs  2m39.6s/3m00.0s

running (2m40.6s), 694/694 VUs, 320939 complete and 0 interrupted iterations
default   [  89% ] 694/694 VUs  2m40.6s/3m00.0s

running (2m41.6s), 694/694 VUs, 322446 complete and 0 interrupted iterations
default   [  90% ] 694/694 VUs  2m41.6s/3m00.0s

running (2m42.6s), 694/694 VUs, 324688 complete and 0 interrupted iterations
default   [  90% ] 694/694 VUs  2m42.6s/3m00.0s

running (2m43.6s), 694/694 VUs, 326125 complete and 0 interrupted iterations
default   [  91% ] 694/694 VUs  2m43.6s/3m00.0s

running (2m44.6s), 694/694 VUs, 328352 complete and 0 interrupted iterations
default   [  91% ] 694/694 VUs  2m44.6s/3m00.0s

running (2m45.6s), 694/694 VUs, 329789 complete and 0 interrupted iterations
default   [  92% ] 694/694 VUs  2m45.6s/3m00.0s

running (2m46.6s), 694/694 VUs, 331992 complete and 0 interrupted iterations
default   [  93% ] 694/694 VUs  2m46.6s/3m00.0s

running (2m47.6s), 694/694 VUs, 333435 complete and 0 interrupted iterations
default   [  93% ] 694/694 VUs  2m47.6s/3m00.0s

running (2m48.6s), 694/694 VUs, 335598 complete and 0 interrupted iterations
default   [  94% ] 694/694 VUs  2m48.6s/3m00.0s

running (2m49.6s), 694/694 VUs, 336882 complete and 0 interrupted iterations
default   [  94% ] 694/694 VUs  2m49.6s/3m00.0s

running (2m50.6s), 694/694 VUs, 338791 complete and 0 interrupted iterations
default   [  95% ] 694/694 VUs  2m50.6s/3m00.0s

running (2m51.6s), 694/694 VUs, 340119 complete and 0 interrupted iterations
default   [  95% ] 694/694 VUs  2m51.6s/3m00.0s

running (2m52.6s), 694/694 VUs, 341319 complete and 0 interrupted iterations
default   [  96% ] 694/694 VUs  2m52.6s/3m00.0s

running (2m53.6s), 694/694 VUs, 343774 complete and 0 interrupted iterations
default   [  96% ] 694/694 VUs  2m53.6s/3m00.0s

running (2m54.6s), 694/694 VUs, 344773 complete and 0 interrupted iterations
default   [  97% ] 694/694 VUs  2m54.6s/3m00.0s

running (2m55.6s), 694/694 VUs, 346579 complete and 0 interrupted iterations
default   [  98% ] 694/694 VUs  2m55.6s/3m00.0s

running (2m56.6s), 694/694 VUs, 347960 complete and 0 interrupted iterations
default   [  98% ] 694/694 VUs  2m56.6s/3m00.0s

running (2m57.6s), 694/694 VUs, 348947 complete and 0 interrupted iterations
default   [  99% ] 694/694 VUs  2m57.6s/3m00.0s

running (2m58.6s), 694/694 VUs, 351020 complete and 0 interrupted iterations
default   [  99% ] 694/694 VUs  2m58.6s/3m00.0s

running (2m59.6s), 694/694 VUs, 352388 complete and 0 interrupted iterations
default   [ 100% ] 694/694 VUs  2m59.6s/3m00.0s

running (3m00.6s), 246/694 VUs, 354036 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m01.6s), 237/694 VUs, 354045 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m02.6s), 232/694 VUs, 354050 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m03.6s), 226/694 VUs, 354056 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m04.6s), 222/694 VUs, 354060 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m05.6s), 216/694 VUs, 354066 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m06.6s), 214/694 VUs, 354068 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m07.6s), 206/694 VUs, 354076 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m08.6s), 200/694 VUs, 354082 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m09.6s), 198/694 VUs, 354084 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m10.6s), 198/694 VUs, 354084 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m11.6s), 118/694 VUs, 354164 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m11.7s), 000/694 VUs, 354282 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/694 VUs  3m0s

     ✗ logged in successfully
      ↳  60% — ✓ 214442 / ✗ 139840
     ✓ retrieved member

     checks.........................: 60.57% ✓ 214896      ✗ 139840
     data_received..................: 277 MB 1.4 MB/s
     data_sent......................: 132 MB 691 kB/s
     http_req_blocked...............: avg=42.6ms   min=0s     med=2.01µs   max=2.56s    p(90)=3.55µs   p(95)=15.33µs 
     http_req_connecting............: avg=21.12ms  min=0s     med=0s       max=412.57ms p(90)=95.5ms   p(95)=128.18ms
   ✓ http_req_duration..............: avg=97.2ms   min=0s     med=46.2ms   max=27.2s    p(90)=103.63ms p(95)=153.2ms 
       { expected_response:true }...: avg=8.93s    min=6.84ms med=9.45s    max=25.21s   p(90)=14.49s   p(95)=16.2s   
     http_req_failed................: 99.89% ✓ 568119      ✗ 605   
     http_req_receiving.............: avg=452.15µs min=0s     med=25.29µs  max=266ms    p(90)=45.26µs  p(95)=100.25µs
     http_req_sending...............: avg=9.25ms   min=0s     med=11.34µs  max=2.61s    p(90)=25.67µs  p(95)=173.72µs
     http_req_tls_handshaking.......: avg=31.6ms   min=0s     med=0s       max=2.55s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=87.49ms  min=0s     med=45.68ms  max=27.2s    p(90)=98.02ms  p(95)=140.95ms
     http_reqs......................: 568724 2966.208242/s
     iteration_duration.............: avg=286.83ms min=1.3ms  med=123.12ms max=35.31s   p(90)=419.86ms p(95)=1.07s   
     iterations.....................: 354282 1847.775351/s
     vus............................: 118    min=12        max=694 
     vus_max........................: 694    min=694       max=694 
```
