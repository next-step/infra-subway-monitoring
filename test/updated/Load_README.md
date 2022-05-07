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

   function 내정보수정(token) {
	
	let addHeaders = {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}

	let obj = JSON.stringify({
	    age: 32,
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
     script: ./load.js
     output: -

  scenarios: (100.00%) 1 scenario, 694 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 694 looping VUs for 3m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.6s), 007/694 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 007/694 VUs  0m00.6s/3m00.0s

running (0m01.6s), 019/694 VUs, 37 complete and 0 interrupted iterations
default   [   1% ] 019/694 VUs  0m01.6s/3m00.0s

running (0m02.6s), 030/694 VUs, 122 complete and 0 interrupted iterations
default   [   1% ] 030/694 VUs  0m02.6s/3m00.0s

running (0m03.6s), 042/694 VUs, 222 complete and 0 interrupted iterations
default   [   2% ] 042/694 VUs  0m03.6s/3m00.0s

running (0m04.6s), 054/694 VUs, 331 complete and 0 interrupted iterations
default   [   3% ] 054/694 VUs  0m04.6s/3m00.0s

running (0m05.6s), 065/694 VUs, 447 complete and 0 interrupted iterations
default   [   3% ] 065/694 VUs  0m05.6s/3m00.0s

running (0m06.6s), 077/694 VUs, 547 complete and 0 interrupted iterations
default   [   4% ] 077/694 VUs  0m06.6s/3m00.0s

running (0m07.6s), 088/694 VUs, 646 complete and 0 interrupted iterations
default   [   4% ] 088/694 VUs  0m07.6s/3m00.0s

running (0m08.6s), 100/694 VUs, 752 complete and 0 interrupted iterations
default   [   5% ] 100/694 VUs  0m08.6s/3m00.0s

running (0m09.6s), 111/694 VUs, 852 complete and 0 interrupted iterations
default   [   5% ] 111/694 VUs  0m09.6s/3m00.0s

running (0m10.6s), 123/694 VUs, 972 complete and 0 interrupted iterations
default   [   6% ] 123/694 VUs  0m10.6s/3m00.0s

running (0m11.6s), 134/694 VUs, 1086 complete and 0 interrupted iterations
default   [   6% ] 134/694 VUs  0m11.6s/3m00.0s

running (0m12.6s), 146/694 VUs, 1174 complete and 0 interrupted iterations
default   [   7% ] 146/694 VUs  0m12.6s/3m00.0s

running (0m13.6s), 157/694 VUs, 1294 complete and 0 interrupted iterations
default   [   8% ] 157/694 VUs  0m13.6s/3m00.0s

running (0m14.6s), 169/694 VUs, 1439 complete and 0 interrupted iterations
default   [   8% ] 169/694 VUs  0m14.6s/3m00.0s

running (0m15.6s), 181/694 VUs, 1572 complete and 0 interrupted iterations
default   [   9% ] 181/694 VUs  0m15.6s/3m00.0s

running (0m16.6s), 192/694 VUs, 1674 complete and 0 interrupted iterations
default   [   9% ] 192/694 VUs  0m16.6s/3m00.0s

running (0m17.6s), 204/694 VUs, 1803 complete and 0 interrupted iterations
default   [  10% ] 204/694 VUs  0m17.6s/3m00.0s

running (0m18.6s), 215/694 VUs, 1938 complete and 0 interrupted iterations
default   [  10% ] 215/694 VUs  0m18.6s/3m00.0s

running (0m19.6s), 227/694 VUs, 2069 complete and 0 interrupted iterations
default   [  11% ] 227/694 VUs  0m19.6s/3m00.0s

running (0m20.6s), 238/694 VUs, 2223 complete and 0 interrupted iterations
default   [  11% ] 238/694 VUs  0m20.6s/3m00.0s

running (0m21.6s), 250/694 VUs, 2655 complete and 0 interrupted iterations
default   [  12% ] 250/694 VUs  0m21.6s/3m00.0s

running (0m22.6s), 261/694 VUs, 3523 complete and 0 interrupted iterations
default   [  13% ] 261/694 VUs  0m22.6s/3m00.0s

running (0m23.6s), 273/694 VUs, 4643 complete and 0 interrupted iterations
default   [  13% ] 273/694 VUs  0m23.6s/3m00.0s

running (0m24.6s), 285/694 VUs, 5458 complete and 0 interrupted iterations
default   [  14% ] 285/694 VUs  0m24.6s/3m00.0s

running (0m25.6s), 296/694 VUs, 6514 complete and 0 interrupted iterations
default   [  14% ] 296/694 VUs  0m25.6s/3m00.0s

running (0m26.6s), 308/694 VUs, 7480 complete and 0 interrupted iterations
default   [  15% ] 308/694 VUs  0m26.6s/3m00.0s

running (0m27.6s), 319/694 VUs, 8837 complete and 0 interrupted iterations
default   [  15% ] 319/694 VUs  0m27.6s/3m00.0s

running (0m28.6s), 331/694 VUs, 9545 complete and 0 interrupted iterations
default   [  16% ] 331/694 VUs  0m28.6s/3m00.0s

running (0m29.6s), 342/694 VUs, 11070 complete and 0 interrupted iterations
default   [  16% ] 342/694 VUs  0m29.6s/3m00.0s

running (0m30.6s), 354/694 VUs, 11940 complete and 0 interrupted iterations
default   [  17% ] 354/694 VUs  0m30.6s/3m00.0s

running (0m31.6s), 365/694 VUs, 13133 complete and 0 interrupted iterations
default   [  18% ] 365/694 VUs  0m31.6s/3m00.0s

running (0m32.6s), 377/694 VUs, 14490 complete and 0 interrupted iterations
default   [  18% ] 377/694 VUs  0m32.6s/3m00.0s

running (0m33.6s), 388/694 VUs, 15986 complete and 0 interrupted iterations
default   [  19% ] 388/694 VUs  0m33.6s/3m00.0s

running (0m34.6s), 400/694 VUs, 17280 complete and 0 interrupted iterations
default   [  19% ] 400/694 VUs  0m34.6s/3m00.0s

running (0m35.6s), 412/694 VUs, 18312 complete and 0 interrupted iterations
default   [  20% ] 412/694 VUs  0m35.6s/3m00.0s

running (0m36.6s), 423/694 VUs, 19893 complete and 0 interrupted iterations
default   [  20% ] 423/694 VUs  0m36.6s/3m00.0s

running (0m37.6s), 435/694 VUs, 21682 complete and 0 interrupted iterations
default   [  21% ] 435/694 VUs  0m37.6s/3m00.0s

running (0m38.6s), 446/694 VUs, 23064 complete and 0 interrupted iterations
default   [  21% ] 446/694 VUs  0m38.6s/3m00.0s

running (0m39.6s), 458/694 VUs, 24909 complete and 0 interrupted iterations
default   [  22% ] 458/694 VUs  0m39.6s/3m00.0s

running (0m40.6s), 469/694 VUs, 26067 complete and 0 interrupted iterations
default   [  23% ] 469/694 VUs  0m40.6s/3m00.0s

running (0m41.6s), 481/694 VUs, 27243 complete and 0 interrupted iterations
default   [  23% ] 481/694 VUs  0m41.6s/3m00.0s

running (0m42.6s), 492/694 VUs, 29239 complete and 0 interrupted iterations
default   [  24% ] 492/694 VUs  0m42.6s/3m00.0s

running (0m43.6s), 504/694 VUs, 30516 complete and 0 interrupted iterations
default   [  24% ] 504/694 VUs  0m43.6s/3m00.0s

running (0m44.6s), 516/694 VUs, 32248 complete and 0 interrupted iterations
default   [  25% ] 516/694 VUs  0m44.6s/3m00.0s

running (0m45.6s), 527/694 VUs, 33433 complete and 0 interrupted iterations
default   [  25% ] 527/694 VUs  0m45.6s/3m00.0s

running (0m46.6s), 539/694 VUs, 34817 complete and 0 interrupted iterations
default   [  26% ] 539/694 VUs  0m46.6s/3m00.0s

running (0m47.6s), 550/694 VUs, 36401 complete and 0 interrupted iterations
default   [  26% ] 550/694 VUs  0m47.6s/3m00.0s

running (0m48.6s), 562/694 VUs, 37180 complete and 0 interrupted iterations
default   [  27% ] 562/694 VUs  0m48.6s/3m00.0s

running (0m49.6s), 573/694 VUs, 38718 complete and 0 interrupted iterations
default   [  28% ] 573/694 VUs  0m49.6s/3m00.0s

running (0m50.6s), 585/694 VUs, 39870 complete and 0 interrupted iterations
default   [  28% ] 585/694 VUs  0m50.6s/3m00.0s

running (0m51.6s), 596/694 VUs, 41067 complete and 0 interrupted iterations
default   [  29% ] 596/694 VUs  0m51.6s/3m00.0s

running (0m52.6s), 608/694 VUs, 42438 complete and 0 interrupted iterations
default   [  29% ] 608/694 VUs  0m52.6s/3m00.0s

running (0m53.6s), 619/694 VUs, 43813 complete and 0 interrupted iterations
default   [  30% ] 619/694 VUs  0m53.6s/3m00.0s

running (0m54.6s), 631/694 VUs, 45173 complete and 0 interrupted iterations
default   [  30% ] 631/694 VUs  0m54.6s/3m00.0s

running (0m55.6s), 643/694 VUs, 45852 complete and 0 interrupted iterations
default   [  31% ] 643/694 VUs  0m55.6s/3m00.0s

running (0m56.6s), 654/694 VUs, 48647 complete and 0 interrupted iterations
default   [  31% ] 654/694 VUs  0m56.6s/3m00.0s

running (0m57.6s), 666/694 VUs, 49575 complete and 0 interrupted iterations
default   [  32% ] 666/694 VUs  0m57.6s/3m00.0s

running (0m58.6s), 677/694 VUs, 50853 complete and 0 interrupted iterations
default   [  33% ] 677/694 VUs  0m58.6s/3m00.0s

running (0m59.6s), 689/694 VUs, 51867 complete and 0 interrupted iterations
default   [  33% ] 689/694 VUs  0m59.6s/3m00.0s

running (1m00.6s), 694/694 VUs, 52353 complete and 0 interrupted iterations
default   [  34% ] 694/694 VUs  1m00.6s/3m00.0s

running (1m01.6s), 694/694 VUs, 54146 complete and 0 interrupted iterations
default   [  34% ] 694/694 VUs  1m01.6s/3m00.0s

running (1m02.6s), 694/694 VUs, 55723 complete and 0 interrupted iterations
default   [  35% ] 694/694 VUs  1m02.6s/3m00.0s

running (1m03.6s), 694/694 VUs, 56857 complete and 0 interrupted iterations
default   [  35% ] 694/694 VUs  1m03.6s/3m00.0s

running (1m04.6s), 694/694 VUs, 58239 complete and 0 interrupted iterations
default   [  36% ] 694/694 VUs  1m04.6s/3m00.0s

running (1m05.6s), 694/694 VUs, 60955 complete and 0 interrupted iterations
default   [  36% ] 694/694 VUs  1m05.6s/3m00.0s

running (1m06.6s), 694/694 VUs, 62359 complete and 0 interrupted iterations
default   [  37% ] 694/694 VUs  1m06.6s/3m00.0s

running (1m07.6s), 694/694 VUs, 65358 complete and 0 interrupted iterations
default   [  38% ] 694/694 VUs  1m07.6s/3m00.0s

running (1m08.6s), 694/694 VUs, 67483 complete and 0 interrupted iterations
default   [  38% ] 694/694 VUs  1m08.6s/3m00.0s

running (1m09.6s), 694/694 VUs, 69882 complete and 0 interrupted iterations
default   [  39% ] 694/694 VUs  1m09.6s/3m00.0s

running (1m10.6s), 694/694 VUs, 70705 complete and 0 interrupted iterations
default   [  39% ] 694/694 VUs  1m10.6s/3m00.0s

running (1m11.6s), 694/694 VUs, 72951 complete and 0 interrupted iterations
default   [  40% ] 694/694 VUs  1m11.6s/3m00.0s

running (1m12.6s), 694/694 VUs, 74569 complete and 0 interrupted iterations
default   [  40% ] 694/694 VUs  1m12.6s/3m00.0s

running (1m13.6s), 694/694 VUs, 76501 complete and 0 interrupted iterations
default   [  41% ] 694/694 VUs  1m13.6s/3m00.0s

running (1m14.6s), 694/694 VUs, 78237 complete and 0 interrupted iterations
default   [  41% ] 694/694 VUs  1m14.6s/3m00.0s

running (1m15.6s), 694/694 VUs, 79944 complete and 0 interrupted iterations
default   [  42% ] 694/694 VUs  1m15.6s/3m00.0s

running (1m16.6s), 694/694 VUs, 82524 complete and 0 interrupted iterations
default   [  43% ] 694/694 VUs  1m16.6s/3m00.0s

running (1m17.6s), 694/694 VUs, 85096 complete and 0 interrupted iterations
default   [  43% ] 694/694 VUs  1m17.6s/3m00.0s

running (1m18.6s), 694/694 VUs, 85776 complete and 0 interrupted iterations
default   [  44% ] 694/694 VUs  1m18.6s/3m00.0s

running (1m19.6s), 694/694 VUs, 87811 complete and 0 interrupted iterations
default   [  44% ] 694/694 VUs  1m19.6s/3m00.0s

running (1m20.6s), 694/694 VUs, 90690 complete and 0 interrupted iterations
default   [  45% ] 694/694 VUs  1m20.6s/3m00.0s

running (1m21.6s), 694/694 VUs, 92440 complete and 0 interrupted iterations
default   [  45% ] 694/694 VUs  1m21.6s/3m00.0s

running (1m22.6s), 694/694 VUs, 94484 complete and 0 interrupted iterations
default   [  46% ] 694/694 VUs  1m22.6s/3m00.0s

running (1m23.6s), 694/694 VUs, 95734 complete and 0 interrupted iterations
default   [  46% ] 694/694 VUs  1m23.6s/3m00.0s

running (1m24.6s), 694/694 VUs, 97561 complete and 0 interrupted iterations
default   [  47% ] 694/694 VUs  1m24.6s/3m00.0s

running (1m25.6s), 694/694 VUs, 99036 complete and 0 interrupted iterations
default   [  48% ] 694/694 VUs  1m25.6s/3m00.0s

running (1m26.6s), 694/694 VUs, 101822 complete and 0 interrupted iterations
default   [  48% ] 694/694 VUs  1m26.6s/3m00.0s

running (1m27.6s), 694/694 VUs, 102847 complete and 0 interrupted iterations
default   [  49% ] 694/694 VUs  1m27.6s/3m00.0s

running (1m28.6s), 694/694 VUs, 104231 complete and 0 interrupted iterations
default   [  49% ] 694/694 VUs  1m28.6s/3m00.0s

running (1m29.6s), 694/694 VUs, 106248 complete and 0 interrupted iterations
default   [  50% ] 694/694 VUs  1m29.6s/3m00.0s

running (1m30.6s), 694/694 VUs, 107777 complete and 0 interrupted iterations
default   [  50% ] 694/694 VUs  1m30.6s/3m00.0s

running (1m31.6s), 694/694 VUs, 109103 complete and 0 interrupted iterations
default   [  51% ] 694/694 VUs  1m31.6s/3m00.0s

running (1m32.6s), 694/694 VUs, 111350 complete and 0 interrupted iterations
default   [  51% ] 694/694 VUs  1m32.6s/3m00.0s

running (1m33.6s), 694/694 VUs, 113278 complete and 0 interrupted iterations
default   [  52% ] 694/694 VUs  1m33.6s/3m00.0s

running (1m34.6s), 694/694 VUs, 115262 complete and 0 interrupted iterations
default   [  53% ] 694/694 VUs  1m34.6s/3m00.0s

running (1m35.6s), 694/694 VUs, 116538 complete and 0 interrupted iterations
default   [  53% ] 694/694 VUs  1m35.6s/3m00.0s

running (1m36.6s), 694/694 VUs, 119482 complete and 0 interrupted iterations
default   [  54% ] 694/694 VUs  1m36.6s/3m00.0s

running (1m37.6s), 694/694 VUs, 121634 complete and 0 interrupted iterations
default   [  54% ] 694/694 VUs  1m37.6s/3m00.0s

running (1m38.6s), 694/694 VUs, 123756 complete and 0 interrupted iterations
default   [  55% ] 694/694 VUs  1m38.6s/3m00.0s

running (1m39.6s), 694/694 VUs, 125320 complete and 0 interrupted iterations
default   [  55% ] 694/694 VUs  1m39.6s/3m00.0s

running (1m40.6s), 694/694 VUs, 125622 complete and 0 interrupted iterations
default   [  56% ] 694/694 VUs  1m40.6s/3m00.0s

running (1m41.6s), 694/694 VUs, 126945 complete and 0 interrupted iterations
default   [  56% ] 694/694 VUs  1m41.6s/3m00.0s

running (1m42.6s), 694/694 VUs, 128196 complete and 0 interrupted iterations
default   [  57% ] 694/694 VUs  1m42.6s/3m00.0s

running (1m43.6s), 694/694 VUs, 129290 complete and 0 interrupted iterations
default   [  58% ] 694/694 VUs  1m43.6s/3m00.0s

running (1m44.6s), 694/694 VUs, 131788 complete and 0 interrupted iterations
default   [  58% ] 694/694 VUs  1m44.6s/3m00.0s

running (1m45.6s), 694/694 VUs, 133341 complete and 0 interrupted iterations
default   [  59% ] 694/694 VUs  1m45.6s/3m00.0s

running (1m46.6s), 694/694 VUs, 134357 complete and 0 interrupted iterations
default   [  59% ] 694/694 VUs  1m46.6s/3m00.0s

running (1m47.6s), 694/694 VUs, 135655 complete and 0 interrupted iterations
default   [  60% ] 694/694 VUs  1m47.6s/3m00.0s

running (1m48.6s), 694/694 VUs, 136809 complete and 0 interrupted iterations
default   [  60% ] 694/694 VUs  1m48.6s/3m00.0s

running (1m49.6s), 694/694 VUs, 138933 complete and 0 interrupted iterations
default   [  61% ] 694/694 VUs  1m49.6s/3m00.0s

running (1m50.6s), 694/694 VUs, 140362 complete and 0 interrupted iterations
default   [  61% ] 694/694 VUs  1m50.6s/3m00.0s

running (1m51.6s), 694/694 VUs, 142575 complete and 0 interrupted iterations
default   [  62% ] 694/694 VUs  1m51.6s/3m00.0s

running (1m52.6s), 694/694 VUs, 145339 complete and 0 interrupted iterations
default   [  63% ] 694/694 VUs  1m52.6s/3m00.0s

running (1m53.6s), 694/694 VUs, 147665 complete and 0 interrupted iterations
default   [  63% ] 694/694 VUs  1m53.6s/3m00.0s

running (1m54.6s), 694/694 VUs, 148122 complete and 0 interrupted iterations
default   [  64% ] 694/694 VUs  1m54.6s/3m00.0s

running (1m55.6s), 694/694 VUs, 150046 complete and 0 interrupted iterations
default   [  64% ] 694/694 VUs  1m55.6s/3m00.0s

running (1m56.6s), 694/694 VUs, 152217 complete and 0 interrupted iterations
default   [  65% ] 694/694 VUs  1m56.6s/3m00.0s

running (1m57.6s), 694/694 VUs, 154524 complete and 0 interrupted iterations
default   [  65% ] 694/694 VUs  1m57.6s/3m00.0s

running (1m58.6s), 694/694 VUs, 155411 complete and 0 interrupted iterations
default   [  66% ] 694/694 VUs  1m58.6s/3m00.0s

running (1m59.6s), 694/694 VUs, 157885 complete and 0 interrupted iterations
default   [  66% ] 694/694 VUs  1m59.6s/3m00.0s

running (2m00.6s), 694/694 VUs, 160491 complete and 0 interrupted iterations
default   [  67% ] 694/694 VUs  2m00.6s/3m00.0s

running (2m01.6s), 694/694 VUs, 162975 complete and 0 interrupted iterations
default   [  68% ] 694/694 VUs  2m01.6s/3m00.0s

running (2m02.6s), 694/694 VUs, 164359 complete and 0 interrupted iterations
default   [  68% ] 694/694 VUs  2m02.6s/3m00.0s

running (2m03.6s), 694/694 VUs, 165903 complete and 0 interrupted iterations
default   [  69% ] 694/694 VUs  2m03.6s/3m00.0s

running (2m04.6s), 694/694 VUs, 168059 complete and 0 interrupted iterations
default   [  69% ] 694/694 VUs  2m04.6s/3m00.0s

running (2m05.6s), 694/694 VUs, 170950 complete and 0 interrupted iterations
default   [  70% ] 694/694 VUs  2m05.6s/3m00.0s

running (2m06.6s), 694/694 VUs, 173146 complete and 0 interrupted iterations
default   [  70% ] 694/694 VUs  2m06.6s/3m00.0s

running (2m07.6s), 694/694 VUs, 174369 complete and 0 interrupted iterations
default   [  71% ] 694/694 VUs  2m07.6s/3m00.0s

running (2m08.6s), 694/694 VUs, 176509 complete and 0 interrupted iterations
default   [  71% ] 694/694 VUs  2m08.6s/3m00.0s

running (2m09.6s), 694/694 VUs, 178785 complete and 0 interrupted iterations
default   [  72% ] 694/694 VUs  2m09.6s/3m00.0s

running (2m10.6s), 694/694 VUs, 180255 complete and 0 interrupted iterations
default   [  73% ] 694/694 VUs  2m10.6s/3m00.0s

running (2m11.6s), 694/694 VUs, 182091 complete and 0 interrupted iterations
default   [  73% ] 694/694 VUs  2m11.6s/3m00.0s

running (2m12.6s), 694/694 VUs, 184125 complete and 0 interrupted iterations
default   [  74% ] 694/694 VUs  2m12.6s/3m00.0s

running (2m13.6s), 694/694 VUs, 185918 complete and 0 interrupted iterations
default   [  74% ] 694/694 VUs  2m13.6s/3m00.0s

running (2m14.6s), 694/694 VUs, 188168 complete and 0 interrupted iterations
default   [  75% ] 694/694 VUs  2m14.6s/3m00.0s

running (2m15.6s), 694/694 VUs, 190979 complete and 0 interrupted iterations
default   [  75% ] 694/694 VUs  2m15.6s/3m00.0s

running (2m16.6s), 694/694 VUs, 192851 complete and 0 interrupted iterations
default   [  76% ] 694/694 VUs  2m16.6s/3m00.0s

running (2m17.6s), 694/694 VUs, 193889 complete and 0 interrupted iterations
default   [  76% ] 694/694 VUs  2m17.6s/3m00.0s

running (2m18.6s), 694/694 VUs, 195200 complete and 0 interrupted iterations
default   [  77% ] 694/694 VUs  2m18.6s/3m00.0s

running (2m19.6s), 694/694 VUs, 197177 complete and 0 interrupted iterations
default   [  78% ] 694/694 VUs  2m19.6s/3m00.0s

running (2m20.6s), 694/694 VUs, 199130 complete and 0 interrupted iterations
default   [  78% ] 694/694 VUs  2m20.6s/3m00.0s

running (2m21.6s), 694/694 VUs, 200806 complete and 0 interrupted iterations
default   [  79% ] 694/694 VUs  2m21.6s/3m00.0s

running (2m22.6s), 694/694 VUs, 202744 complete and 0 interrupted iterations
default   [  79% ] 694/694 VUs  2m22.6s/3m00.0s

running (2m23.6s), 694/694 VUs, 203783 complete and 0 interrupted iterations
default   [  80% ] 694/694 VUs  2m23.6s/3m00.0s

running (2m24.6s), 694/694 VUs, 205846 complete and 0 interrupted iterations
default   [  80% ] 694/694 VUs  2m24.6s/3m00.0s

running (2m25.6s), 694/694 VUs, 206973 complete and 0 interrupted iterations
default   [  81% ] 694/694 VUs  2m25.6s/3m00.0s

running (2m26.6s), 694/694 VUs, 208627 complete and 0 interrupted iterations
default   [  81% ] 694/694 VUs  2m26.6s/3m00.0s

running (2m27.6s), 694/694 VUs, 210799 complete and 0 interrupted iterations
default   [  82% ] 694/694 VUs  2m27.6s/3m00.0s

running (2m28.6s), 694/694 VUs, 212447 complete and 0 interrupted iterations
default   [  83% ] 694/694 VUs  2m28.6s/3m00.0s

running (2m29.6s), 694/694 VUs, 214358 complete and 0 interrupted iterations
default   [  83% ] 694/694 VUs  2m29.6s/3m00.0s

running (2m30.6s), 694/694 VUs, 215797 complete and 0 interrupted iterations
default   [  84% ] 694/694 VUs  2m30.6s/3m00.0s

running (2m31.6s), 694/694 VUs, 218270 complete and 0 interrupted iterations
default   [  84% ] 694/694 VUs  2m31.6s/3m00.0s

running (2m32.6s), 694/694 VUs, 219583 complete and 0 interrupted iterations
default   [  85% ] 694/694 VUs  2m32.6s/3m00.0s

running (2m33.6s), 694/694 VUs, 221878 complete and 0 interrupted iterations
default   [  85% ] 694/694 VUs  2m33.6s/3m00.0s

running (2m34.6s), 694/694 VUs, 222607 complete and 0 interrupted iterations
default   [  86% ] 694/694 VUs  2m34.6s/3m00.0s

running (2m35.6s), 694/694 VUs, 225421 complete and 0 interrupted iterations
default   [  86% ] 694/694 VUs  2m35.6s/3m00.0s

running (2m36.6s), 694/694 VUs, 227713 complete and 0 interrupted iterations
default   [  87% ] 694/694 VUs  2m36.6s/3m00.0s

running (2m37.6s), 694/694 VUs, 228734 complete and 0 interrupted iterations
default   [  88% ] 694/694 VUs  2m37.6s/3m00.0s

running (2m38.6s), 694/694 VUs, 230079 complete and 0 interrupted iterations
default   [  88% ] 694/694 VUs  2m38.6s/3m00.0s

running (2m39.6s), 694/694 VUs, 230091 complete and 0 interrupted iterations
default   [  89% ] 694/694 VUs  2m39.6s/3m00.0s

running (2m40.6s), 694/694 VUs, 231654 complete and 0 interrupted iterations
default   [  89% ] 694/694 VUs  2m40.6s/3m00.0s

running (2m41.6s), 694/694 VUs, 233995 complete and 0 interrupted iterations
default   [  90% ] 694/694 VUs  2m41.6s/3m00.0s

running (2m42.6s), 694/694 VUs, 235504 complete and 0 interrupted iterations
default   [  90% ] 694/694 VUs  2m42.6s/3m00.0s

running (2m43.6s), 694/694 VUs, 237387 complete and 0 interrupted iterations
default   [  91% ] 694/694 VUs  2m43.6s/3m00.0s

running (2m44.6s), 694/694 VUs, 238177 complete and 0 interrupted iterations
default   [  91% ] 694/694 VUs  2m44.6s/3m00.0s

running (2m45.6s), 694/694 VUs, 240938 complete and 0 interrupted iterations
default   [  92% ] 694/694 VUs  2m45.6s/3m00.0s

running (2m46.6s), 694/694 VUs, 242324 complete and 0 interrupted iterations
default   [  93% ] 694/694 VUs  2m46.6s/3m00.0s

running (2m47.6s), 694/694 VUs, 243373 complete and 0 interrupted iterations
default   [  93% ] 694/694 VUs  2m47.6s/3m00.0s

running (2m48.6s), 694/694 VUs, 244937 complete and 0 interrupted iterations
default   [  94% ] 694/694 VUs  2m48.6s/3m00.0s

running (2m49.6s), 694/694 VUs, 245862 complete and 0 interrupted iterations
default   [  94% ] 694/694 VUs  2m49.6s/3m00.0s

running (2m50.6s), 694/694 VUs, 247692 complete and 0 interrupted iterations
default   [  95% ] 694/694 VUs  2m50.6s/3m00.0s

running (2m51.6s), 694/694 VUs, 249099 complete and 0 interrupted iterations
default   [  95% ] 694/694 VUs  2m51.6s/3m00.0s

running (2m52.6s), 694/694 VUs, 249889 complete and 0 interrupted iterations
default   [  96% ] 694/694 VUs  2m52.6s/3m00.0s

running (2m53.6s), 694/694 VUs, 251354 complete and 0 interrupted iterations
default   [  96% ] 694/694 VUs  2m53.6s/3m00.0s

running (2m54.6s), 694/694 VUs, 252426 complete and 0 interrupted iterations
default   [  97% ] 694/694 VUs  2m54.6s/3m00.0s

running (2m55.6s), 694/694 VUs, 254596 complete and 0 interrupted iterations
default   [  98% ] 694/694 VUs  2m55.6s/3m00.0s

running (2m56.6s), 694/694 VUs, 256785 complete and 0 interrupted iterations
default   [  98% ] 694/694 VUs  2m56.6s/3m00.0s

running (2m57.6s), 694/694 VUs, 257457 complete and 0 interrupted iterations
default   [  99% ] 694/694 VUs  2m57.6s/3m00.0s

running (2m58.6s), 694/694 VUs, 259604 complete and 0 interrupted iterations
default   [  99% ] 694/694 VUs  2m58.6s/3m00.0s

running (2m59.6s), 694/694 VUs, 262696 complete and 0 interrupted iterations
default   [ 100% ] 694/694 VUs  2m59.6s/3m00.0s

running (3m00.6s), 134/694 VUs, 264137 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m01.6s), 011/694 VUs, 264260 complete and 0 interrupted iterations
default ↓ [ 100% ] 694/694 VUs  3m0s

running (3m02.3s), 000/694 VUs, 264271 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/694 VUs  3m0s

     ✗ logged in successfully
      ↳  9% — ✓ 25416 / ✗ 238855
     ✓ retrieved member

     checks.........................: 12.18% ✓ 33154       ✗ 238855
     data_received..................: 188 MB 1.0 MB/s
     data_sent......................: 93 MB  512 kB/s
     http_req_blocked...............: avg=66.31ms  min=0s       med=0s       max=2.01s    p(90)=201.7ms  p(95)=605.27ms
     http_req_connecting............: avg=120.58ms min=0s       med=116.3ms  max=1.03s    p(90)=254.56ms p(95)=305.05ms
   ✓ http_req_duration..............: avg=98.29ms  min=0s       med=0s       max=5.13s    p(90)=131.94ms p(95)=915.61ms
       { expected_response:true }...: avg=984.07ms min=44.72ms  med=916.71ms max=5.13s    p(90)=1.5s     p(95)=1.84s   
     http_req_failed................: 94.55% ✓ 273916      ✗ 15771 
     http_req_receiving.............: avg=1.51ms   min=0s       med=0s       max=269.39ms p(90)=30.8µs   p(95)=69.6µs  
     http_req_sending...............: avg=457.37µs min=0s       med=0s       max=260.07ms p(90)=29.41µs  p(95)=124.26µs
     http_req_tls_handshaking.......: avg=54.65ms  min=0s       med=0s       max=1.96s    p(90)=173.7ms  p(95)=480.12ms
     http_req_waiting...............: avg=96.31ms  min=0s       med=0s       max=5.13s    p(90)=129.16ms p(95)=895.81ms
     http_reqs......................: 289687 1588.804308/s
     iteration_duration.............: avg=383.58ms min=551.66µs med=217.12ms max=8.02s    p(90)=838.21ms p(95)=1.53s   
     iterations.....................: 264271 1449.408856/s
     vus............................: 11     min=11        max=694 
     vus_max........................: 694    min=694       max=694 



```
