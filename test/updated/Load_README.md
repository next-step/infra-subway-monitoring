## 스크립트
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
  	{duration: '1m', target: 674},
  	{duration: '2m', target: 674},
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

  scenarios: (100.00%) 1 scenario, 674 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 674 looping VUs for 3m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m00.5s), 006/674 VUs, 89 complete and 0 interrupted iterations
default   [   0% ] 006/674 VUs  0m00.5s/3m00.0s

running (0m01.5s), 017/674 VUs, 119 complete and 0 interrupted iterations
default   [   1% ] 017/674 VUs  0m01.5s/3m00.0s

running (0m02.5s), 029/674 VUs, 201 complete and 0 interrupted iterations
default   [   1% ] 029/674 VUs  0m02.5s/3m00.0s

running (0m03.5s), 040/674 VUs, 288 complete and 0 interrupted iterations
default   [   2% ] 040/674 VUs  0m03.5s/3m00.0s

running (0m04.5s), 051/674 VUs, 386 complete and 0 interrupted iterations
default   [   3% ] 051/674 VUs  0m04.5s/3m00.0s

running (0m05.5s), 062/674 VUs, 495 complete and 0 interrupted iterations
default   [   3% ] 062/674 VUs  0m05.5s/3m00.0s

running (0m06.5s), 073/674 VUs, 590 complete and 0 interrupted iterations
default   [   4% ] 073/674 VUs  0m06.5s/3m00.0s

running (0m07.5s), 085/674 VUs, 706 complete and 0 interrupted iterations
default   [   4% ] 085/674 VUs  0m07.5s/3m00.0s

running (0m08.5s), 096/674 VUs, 811 complete and 0 interrupted iterations
default   [   5% ] 096/674 VUs  0m08.5s/3m00.0s

running (0m09.5s), 107/674 VUs, 914 complete and 0 interrupted iterations
default   [   5% ] 107/674 VUs  0m09.5s/3m00.0s

running (0m10.5s), 118/674 VUs, 1029 complete and 0 interrupted iterations
default   [   6% ] 118/674 VUs  0m10.5s/3m00.0s

running (0m11.5s), 129/674 VUs, 1154 complete and 0 interrupted iterations
default   [   6% ] 129/674 VUs  0m11.5s/3m00.0s

running (0m12.5s), 141/674 VUs, 1270 complete and 0 interrupted iterations
default   [   7% ] 141/674 VUs  0m12.5s/3m00.0s

running (0m13.5s), 152/674 VUs, 1395 complete and 0 interrupted iterations
default   [   7% ] 152/674 VUs  0m13.5s/3m00.0s

running (0m14.5s), 163/674 VUs, 1528 complete and 0 interrupted iterations
default   [   8% ] 163/674 VUs  0m14.5s/3m00.0s

running (0m15.5s), 174/674 VUs, 1634 complete and 0 interrupted iterations
default   [   9% ] 174/674 VUs  0m15.5s/3m00.0s

running (0m16.5s), 186/674 VUs, 1754 complete and 0 interrupted iterations
default   [   9% ] 186/674 VUs  0m16.5s/3m00.0s

running (0m17.5s), 197/674 VUs, 1919 complete and 0 interrupted iterations
default   [  10% ] 197/674 VUs  0m17.5s/3m00.0s

running (0m18.5s), 208/674 VUs, 2013 complete and 0 interrupted iterations
default   [  10% ] 208/674 VUs  0m18.5s/3m00.0s

running (0m19.5s), 219/674 VUs, 2161 complete and 0 interrupted iterations
default   [  11% ] 219/674 VUs  0m19.5s/3m00.0s

running (0m20.5s), 230/674 VUs, 2305 complete and 0 interrupted iterations
default   [  11% ] 230/674 VUs  0m20.5s/3m00.0s

running (0m21.5s), 242/674 VUs, 2449 complete and 0 interrupted iterations
default   [  12% ] 242/674 VUs  0m21.5s/3m00.0s

running (0m22.5s), 253/674 VUs, 2988 complete and 0 interrupted iterations
default   [  12% ] 253/674 VUs  0m22.5s/3m00.0s

running (0m23.5s), 264/674 VUs, 3824 complete and 0 interrupted iterations
default   [  13% ] 264/674 VUs  0m23.5s/3m00.0s

running (0m24.5s), 275/674 VUs, 4648 complete and 0 interrupted iterations
default   [  14% ] 275/674 VUs  0m24.5s/3m00.0s

running (0m25.5s), 287/674 VUs, 5681 complete and 0 interrupted iterations
default   [  14% ] 287/674 VUs  0m25.5s/3m00.0s

running (0m26.5s), 298/674 VUs, 6936 complete and 0 interrupted iterations
default   [  15% ] 298/674 VUs  0m26.5s/3m00.0s

running (0m27.5s), 309/674 VUs, 8168 complete and 0 interrupted iterations
default   [  15% ] 309/674 VUs  0m27.5s/3m00.0s

running (0m28.5s), 320/674 VUs, 9487 complete and 0 interrupted iterations
default   [  16% ] 320/674 VUs  0m28.5s/3m00.0s

running (0m29.5s), 331/674 VUs, 10942 complete and 0 interrupted iterations
default   [  16% ] 331/674 VUs  0m29.5s/3m00.0s

running (0m30.5s), 343/674 VUs, 11633 complete and 0 interrupted iterations
default   [  17% ] 343/674 VUs  0m30.5s/3m00.0s

running (0m31.5s), 354/674 VUs, 13276 complete and 0 interrupted iterations
default   [  17% ] 354/674 VUs  0m31.5s/3m00.0s

running (0m32.5s), 365/674 VUs, 14569 complete and 0 interrupted iterations
default   [  18% ] 365/674 VUs  0m32.5s/3m00.0s

running (0m33.5s), 376/674 VUs, 15937 complete and 0 interrupted iterations
default   [  19% ] 376/674 VUs  0m33.5s/3m00.0s

running (0m34.5s), 387/674 VUs, 17314 complete and 0 interrupted iterations
default   [  19% ] 387/674 VUs  0m34.5s/3m00.0s

running (0m35.5s), 399/674 VUs, 18802 complete and 0 interrupted iterations
default   [  20% ] 399/674 VUs  0m35.5s/3m00.0s

running (0m36.5s), 410/674 VUs, 20598 complete and 0 interrupted iterations
default   [  20% ] 410/674 VUs  0m36.5s/3m00.0s

running (0m37.5s), 421/674 VUs, 22564 complete and 0 interrupted iterations
default   [  21% ] 421/674 VUs  0m37.5s/3m00.0s

running (0m38.5s), 432/674 VUs, 24238 complete and 0 interrupted iterations
default   [  21% ] 432/674 VUs  0m38.5s/3m00.0s

running (0m39.5s), 444/674 VUs, 25950 complete and 0 interrupted iterations
default   [  22% ] 444/674 VUs  0m39.5s/3m00.0s

running (0m40.5s), 455/674 VUs, 26762 complete and 0 interrupted iterations
default   [  22% ] 455/674 VUs  0m40.5s/3m00.0s

running (0m41.5s), 466/674 VUs, 28680 complete and 0 interrupted iterations
default   [  23% ] 466/674 VUs  0m41.5s/3m00.0s

running (0m42.5s), 477/674 VUs, 30166 complete and 0 interrupted iterations
default   [  24% ] 477/674 VUs  0m42.5s/3m00.0s

running (0m43.5s), 488/674 VUs, 31552 complete and 0 interrupted iterations
default   [  24% ] 488/674 VUs  0m43.5s/3m00.0s

running (0m44.5s), 500/674 VUs, 33106 complete and 0 interrupted iterations
default   [  25% ] 500/674 VUs  0m44.5s/3m00.0s

running (0m45.5s), 511/674 VUs, 34624 complete and 0 interrupted iterations
default   [  25% ] 511/674 VUs  0m45.5s/3m00.0s

running (0m46.5s), 522/674 VUs, 35848 complete and 0 interrupted iterations
default   [  26% ] 522/674 VUs  0m46.5s/3m00.0s

running (0m47.5s), 533/674 VUs, 37152 complete and 0 interrupted iterations
default   [  26% ] 533/674 VUs  0m47.5s/3m00.0s

running (0m48.5s), 544/674 VUs, 38378 complete and 0 interrupted iterations
default   [  27% ] 544/674 VUs  0m48.5s/3m00.0s

running (0m49.5s), 556/674 VUs, 39737 complete and 0 interrupted iterations
default   [  27% ] 556/674 VUs  0m49.5s/3m00.0s

running (0m50.5s), 567/674 VUs, 41226 complete and 0 interrupted iterations
default   [  28% ] 567/674 VUs  0m50.5s/3m00.0s

running (0m51.5s), 578/674 VUs, 42784 complete and 0 interrupted iterations
default   [  29% ] 578/674 VUs  0m51.5s/3m00.0s

running (0m52.5s), 589/674 VUs, 44522 complete and 0 interrupted iterations
default   [  29% ] 589/674 VUs  0m52.5s/3m00.0s

running (0m53.5s), 601/674 VUs, 45622 complete and 0 interrupted iterations
default   [  30% ] 601/674 VUs  0m53.5s/3m00.0s

running (0m54.5s), 612/674 VUs, 47854 complete and 0 interrupted iterations
default   [  30% ] 612/674 VUs  0m54.5s/3m00.0s

running (0m55.5s), 623/674 VUs, 49227 complete and 0 interrupted iterations
default   [  31% ] 623/674 VUs  0m55.5s/3m00.0s

running (0m56.5s), 634/674 VUs, 50228 complete and 0 interrupted iterations
default   [  31% ] 634/674 VUs  0m56.5s/3m00.0s

running (0m57.5s), 645/674 VUs, 51593 complete and 0 interrupted iterations
default   [  32% ] 645/674 VUs  0m57.5s/3m00.0s

running (0m58.5s), 657/674 VUs, 53091 complete and 0 interrupted iterations
default   [  32% ] 657/674 VUs  0m58.5s/3m00.0s

running (0m59.5s), 668/674 VUs, 55097 complete and 0 interrupted iterations
default   [  33% ] 668/674 VUs  0m59.5s/3m00.0s

running (1m00.5s), 674/674 VUs, 56155 complete and 0 interrupted iterations
default   [  34% ] 674/674 VUs  1m00.5s/3m00.0s

running (1m01.5s), 674/674 VUs, 57378 complete and 0 interrupted iterations
default   [  34% ] 674/674 VUs  1m01.5s/3m00.0s

running (1m02.5s), 674/674 VUs, 59091 complete and 0 interrupted iterations
default   [  35% ] 674/674 VUs  1m02.5s/3m00.0s

running (1m03.5s), 674/674 VUs, 60596 complete and 0 interrupted iterations
default   [  35% ] 674/674 VUs  1m03.5s/3m00.0s

running (1m04.5s), 674/674 VUs, 61619 complete and 0 interrupted iterations
default   [  36% ] 674/674 VUs  1m04.5s/3m00.0s

running (1m05.5s), 674/674 VUs, 63582 complete and 0 interrupted iterations
default   [  36% ] 674/674 VUs  1m05.5s/3m00.0s

running (1m06.5s), 674/674 VUs, 64863 complete and 0 interrupted iterations
default   [  37% ] 674/674 VUs  1m06.5s/3m00.0s

running (1m07.5s), 674/674 VUs, 66036 complete and 0 interrupted iterations
default   [  38% ] 674/674 VUs  1m07.5s/3m00.0s

running (1m08.5s), 674/674 VUs, 67455 complete and 0 interrupted iterations
default   [  38% ] 674/674 VUs  1m08.5s/3m00.0s

running (1m09.5s), 674/674 VUs, 69417 complete and 0 interrupted iterations
default   [  39% ] 674/674 VUs  1m09.5s/3m00.0s

running (1m10.5s), 674/674 VUs, 70456 complete and 0 interrupted iterations
default   [  39% ] 674/674 VUs  1m10.5s/3m00.0s

running (1m11.5s), 674/674 VUs, 72772 complete and 0 interrupted iterations
default   [  40% ] 674/674 VUs  1m11.5s/3m00.0s

running (1m12.5s), 674/674 VUs, 73711 complete and 0 interrupted iterations
default   [  40% ] 674/674 VUs  1m12.5s/3m00.0s

running (1m13.5s), 674/674 VUs, 76174 complete and 0 interrupted iterations
default   [  41% ] 674/674 VUs  1m13.5s/3m00.0s

running (1m14.5s), 674/674 VUs, 76651 complete and 0 interrupted iterations
default   [  41% ] 674/674 VUs  1m14.5s/3m00.0s

running (1m15.5s), 674/674 VUs, 78479 complete and 0 interrupted iterations
default   [  42% ] 674/674 VUs  1m15.5s/3m00.0s

running (1m16.5s), 674/674 VUs, 80133 complete and 0 interrupted iterations
default   [  42% ] 674/674 VUs  1m16.5s/3m00.0s

running (1m17.5s), 674/674 VUs, 82163 complete and 0 interrupted iterations
default   [  43% ] 674/674 VUs  1m17.5s/3m00.0s

running (1m18.5s), 674/674 VUs, 84020 complete and 0 interrupted iterations
default   [  44% ] 674/674 VUs  1m18.5s/3m00.0s

running (1m19.5s), 674/674 VUs, 85514 complete and 0 interrupted iterations
default   [  44% ] 674/674 VUs  1m19.5s/3m00.0s

running (1m21.1s), 674/674 VUs, 85515 complete and 0 interrupted iterations
default   [  45% ] 674/674 VUs  1m21.1s/3m00.0s

running (1m21.5s), 674/674 VUs, 86315 complete and 0 interrupted iterations
default   [  45% ] 674/674 VUs  1m21.5s/3m00.0s

running (1m22.5s), 674/674 VUs, 87524 complete and 0 interrupted iterations
default   [  46% ] 674/674 VUs  1m22.5s/3m00.0s

running (1m23.5s), 674/674 VUs, 88300 complete and 0 interrupted iterations
default   [  46% ] 674/674 VUs  1m23.5s/3m00.0s

running (1m24.5s), 674/674 VUs, 88882 complete and 0 interrupted iterations
default   [  47% ] 674/674 VUs  1m24.5s/3m00.0s

running (1m25.5s), 674/674 VUs, 90019 complete and 0 interrupted iterations
default   [  47% ] 674/674 VUs  1m25.5s/3m00.0s

running (1m26.5s), 674/674 VUs, 91080 complete and 0 interrupted iterations
default   [  48% ] 674/674 VUs  1m26.5s/3m00.0s

running (1m27.7s), 674/674 VUs, 91153 complete and 0 interrupted iterations
default   [  49% ] 674/674 VUs  1m27.7s/3m00.0s

running (1m28.5s), 674/674 VUs, 92752 complete and 0 interrupted iterations
default   [  49% ] 674/674 VUs  1m28.5s/3m00.0s

running (1m29.5s), 674/674 VUs, 93261 complete and 0 interrupted iterations
default   [  50% ] 674/674 VUs  1m29.5s/3m00.0s

running (1m30.5s), 674/674 VUs, 93951 complete and 0 interrupted iterations
default   [  50% ] 674/674 VUs  1m30.5s/3m00.0s

running (1m31.5s), 674/674 VUs, 95738 complete and 0 interrupted iterations
default   [  51% ] 674/674 VUs  1m31.5s/3m00.0s

running (1m32.5s), 674/674 VUs, 96744 complete and 0 interrupted iterations
default   [  51% ] 674/674 VUs  1m32.5s/3m00.0s

running (1m33.7s), 674/674 VUs, 96888 complete and 0 interrupted iterations
default   [  52% ] 674/674 VUs  1m33.7s/3m00.0s

running (1m34.5s), 674/674 VUs, 97955 complete and 0 interrupted iterations
default   [  52% ] 674/674 VUs  1m34.5s/3m00.0s

running (1m35.5s), 674/674 VUs, 99284 complete and 0 interrupted iterations
default   [  53% ] 674/674 VUs  1m35.5s/3m00.0s

running (1m36.5s), 674/674 VUs, 100087 complete and 0 interrupted iterations
default   [  54% ] 674/674 VUs  1m36.5s/3m00.0s

running (1m37.5s), 674/674 VUs, 100931 complete and 0 interrupted iterations
default   [  54% ] 674/674 VUs  1m37.5s/3m00.0s

running (1m38.5s), 674/674 VUs, 102139 complete and 0 interrupted iterations
default   [  55% ] 674/674 VUs  1m38.5s/3m00.0s

running (1m39.5s), 674/674 VUs, 102268 complete and 0 interrupted iterations
default   [  55% ] 674/674 VUs  1m39.5s/3m00.0s

running (1m40.5s), 674/674 VUs, 104131 complete and 0 interrupted iterations
default   [  56% ] 674/674 VUs  1m40.5s/3m00.0s

running (1m41.5s), 674/674 VUs, 106027 complete and 0 interrupted iterations
default   [  56% ] 674/674 VUs  1m41.5s/3m00.0s

running (1m42.5s), 674/674 VUs, 107203 complete and 0 interrupted iterations
default   [  57% ] 674/674 VUs  1m42.5s/3m00.0s

running (1m43.5s), 674/674 VUs, 108508 complete and 0 interrupted iterations
default   [  57% ] 674/674 VUs  1m43.5s/3m00.0s

running (1m44.5s), 674/674 VUs, 109986 complete and 0 interrupted iterations
default   [  58% ] 674/674 VUs  1m44.5s/3m00.0s

running (1m45.5s), 674/674 VUs, 111821 complete and 0 interrupted iterations
default   [  59% ] 674/674 VUs  1m45.5s/3m00.0s

running (1m46.5s), 674/674 VUs, 114681 complete and 0 interrupted iterations
default   [  59% ] 674/674 VUs  1m46.5s/3m00.0s

running (1m47.5s), 674/674 VUs, 116902 complete and 0 interrupted iterations
default   [  60% ] 674/674 VUs  1m47.5s/3m00.0s

running (1m48.5s), 674/674 VUs, 119560 complete and 0 interrupted iterations
default   [  60% ] 674/674 VUs  1m48.5s/3m00.0s

running (1m49.5s), 674/674 VUs, 120101 complete and 0 interrupted iterations
default   [  61% ] 674/674 VUs  1m49.5s/3m00.0s

running (1m50.5s), 674/674 VUs, 122379 complete and 0 interrupted iterations
default   [  61% ] 674/674 VUs  1m50.5s/3m00.0s

running (1m51.5s), 674/674 VUs, 123965 complete and 0 interrupted iterations
default   [  62% ] 674/674 VUs  1m51.5s/3m00.0s

running (1m52.5s), 674/674 VUs, 125258 complete and 0 interrupted iterations
default   [  62% ] 674/674 VUs  1m52.5s/3m00.0s

running (1m53.5s), 674/674 VUs, 126240 complete and 0 interrupted iterations
default   [  63% ] 674/674 VUs  1m53.5s/3m00.0s

running (1m54.5s), 674/674 VUs, 127527 complete and 0 interrupted iterations
default   [  64% ] 674/674 VUs  1m54.5s/3m00.0s

running (1m55.5s), 674/674 VUs, 129036 complete and 0 interrupted iterations
default   [  64% ] 674/674 VUs  1m55.5s/3m00.0s

running (1m56.5s), 674/674 VUs, 130768 complete and 0 interrupted iterations
default   [  65% ] 674/674 VUs  1m56.5s/3m00.0s

running (1m57.5s), 674/674 VUs, 133248 complete and 0 interrupted iterations
default   [  65% ] 674/674 VUs  1m57.5s/3m00.0s

running (1m58.5s), 674/674 VUs, 134771 complete and 0 interrupted iterations
default   [  66% ] 674/674 VUs  1m58.5s/3m00.0s

running (1m59.5s), 674/674 VUs, 135890 complete and 0 interrupted iterations
default   [  66% ] 674/674 VUs  1m59.5s/3m00.0s

running (2m00.5s), 674/674 VUs, 137715 complete and 0 interrupted iterations
default   [  67% ] 674/674 VUs  2m00.5s/3m00.0s

running (2m01.5s), 674/674 VUs, 138622 complete and 0 interrupted iterations
default   [  67% ] 674/674 VUs  2m01.5s/3m00.0s

running (2m02.5s), 674/674 VUs, 140191 complete and 0 interrupted iterations
default   [  68% ] 674/674 VUs  2m02.5s/3m00.0s

running (2m03.5s), 674/674 VUs, 141183 complete and 0 interrupted iterations
default   [  69% ] 674/674 VUs  2m03.5s/3m00.0s

running (2m04.5s), 674/674 VUs, 143039 complete and 0 interrupted iterations
default   [  69% ] 674/674 VUs  2m04.5s/3m00.0s

running (2m05.5s), 674/674 VUs, 144394 complete and 0 interrupted iterations
default   [  70% ] 674/674 VUs  2m05.5s/3m00.0s

running (2m06.5s), 674/674 VUs, 145544 complete and 0 interrupted iterations
default   [  70% ] 674/674 VUs  2m06.5s/3m00.0s

running (2m07.5s), 674/674 VUs, 148087 complete and 0 interrupted iterations
default   [  71% ] 674/674 VUs  2m07.5s/3m00.0s

running (2m08.5s), 674/674 VUs, 149015 complete and 0 interrupted iterations
default   [  71% ] 674/674 VUs  2m08.5s/3m00.0s

running (2m09.5s), 674/674 VUs, 150488 complete and 0 interrupted iterations
default   [  72% ] 674/674 VUs  2m09.5s/3m00.0s

running (2m10.5s), 674/674 VUs, 152228 complete and 0 interrupted iterations
default   [  73% ] 674/674 VUs  2m10.5s/3m00.0s

running (2m11.5s), 674/674 VUs, 153552 complete and 0 interrupted iterations
default   [  73% ] 674/674 VUs  2m11.5s/3m00.0s

running (2m12.5s), 674/674 VUs, 154665 complete and 0 interrupted iterations
default   [  74% ] 674/674 VUs  2m12.5s/3m00.0s

running (2m13.5s), 674/674 VUs, 155927 complete and 0 interrupted iterations
default   [  74% ] 674/674 VUs  2m13.5s/3m00.0s

running (2m14.5s), 674/674 VUs, 158127 complete and 0 interrupted iterations
default   [  75% ] 674/674 VUs  2m14.5s/3m00.0s

running (2m15.5s), 674/674 VUs, 160450 complete and 0 interrupted iterations
default   [  75% ] 674/674 VUs  2m15.5s/3m00.0s

running (2m16.5s), 674/674 VUs, 162996 complete and 0 interrupted iterations
default   [  76% ] 674/674 VUs  2m16.5s/3m00.0s

running (2m17.5s), 674/674 VUs, 164097 complete and 0 interrupted iterations
default   [  76% ] 674/674 VUs  2m17.5s/3m00.0s

running (2m18.5s), 674/674 VUs, 165572 complete and 0 interrupted iterations
default   [  77% ] 674/674 VUs  2m18.5s/3m00.0s

running (2m19.5s), 674/674 VUs, 167664 complete and 0 interrupted iterations
default   [  77% ] 674/674 VUs  2m19.5s/3m00.0s

running (2m20.5s), 674/674 VUs, 170510 complete and 0 interrupted iterations
default   [  78% ] 674/674 VUs  2m20.5s/3m00.0s

running (2m21.5s), 674/674 VUs, 172322 complete and 0 interrupted iterations
default   [  79% ] 674/674 VUs  2m21.5s/3m00.0s

running (2m22.5s), 674/674 VUs, 174805 complete and 0 interrupted iterations
default   [  79% ] 674/674 VUs  2m22.5s/3m00.0s

running (2m23.5s), 674/674 VUs, 175790 complete and 0 interrupted iterations
default   [  80% ] 674/674 VUs  2m23.5s/3m00.0s

running (2m24.5s), 674/674 VUs, 178193 complete and 0 interrupted iterations
default   [  80% ] 674/674 VUs  2m24.5s/3m00.0s

running (2m25.5s), 674/674 VUs, 180410 complete and 0 interrupted iterations
default   [  81% ] 674/674 VUs  2m25.5s/3m00.0s

running (2m26.5s), 674/674 VUs, 182285 complete and 0 interrupted iterations
default   [  81% ] 674/674 VUs  2m26.5s/3m00.0s

running (2m27.5s), 674/674 VUs, 183519 complete and 0 interrupted iterations
default   [  82% ] 674/674 VUs  2m27.5s/3m00.0s

running (2m28.5s), 674/674 VUs, 185597 complete and 0 interrupted iterations
default   [  82% ] 674/674 VUs  2m28.5s/3m00.0s

running (2m29.5s), 674/674 VUs, 187851 complete and 0 interrupted iterations
default   [  83% ] 674/674 VUs  2m29.5s/3m00.0s

running (2m30.5s), 674/674 VUs, 189878 complete and 0 interrupted iterations
default   [  84% ] 674/674 VUs  2m30.5s/3m00.0s

running (2m31.5s), 674/674 VUs, 191010 complete and 0 interrupted iterations
default   [  84% ] 674/674 VUs  2m31.5s/3m00.0s

running (2m32.5s), 674/674 VUs, 193490 complete and 0 interrupted iterations
default   [  85% ] 674/674 VUs  2m32.5s/3m00.0s

running (2m33.5s), 674/674 VUs, 194437 complete and 0 interrupted iterations
default   [  85% ] 674/674 VUs  2m33.5s/3m00.0s

running (2m34.5s), 674/674 VUs, 195987 complete and 0 interrupted iterations
default   [  86% ] 674/674 VUs  2m34.5s/3m00.0s

running (2m35.5s), 674/674 VUs, 197673 complete and 0 interrupted iterations
default   [  86% ] 674/674 VUs  2m35.5s/3m00.0s

running (2m36.5s), 674/674 VUs, 198739 complete and 0 interrupted iterations
default   [  87% ] 674/674 VUs  2m36.5s/3m00.0s

running (2m37.5s), 674/674 VUs, 200306 complete and 0 interrupted iterations
default   [  88% ] 674/674 VUs  2m37.5s/3m00.0s

running (2m38.5s), 674/674 VUs, 201268 complete and 0 interrupted iterations
default   [  88% ] 674/674 VUs  2m38.5s/3m00.0s

running (2m39.5s), 674/674 VUs, 202845 complete and 0 interrupted iterations
default   [  89% ] 674/674 VUs  2m39.5s/3m00.0s

running (2m40.5s), 674/674 VUs, 204699 complete and 0 interrupted iterations
default   [  89% ] 674/674 VUs  2m40.5s/3m00.0s

running (2m41.5s), 674/674 VUs, 205199 complete and 0 interrupted iterations
default   [  90% ] 674/674 VUs  2m41.5s/3m00.0s

running (2m42.5s), 674/674 VUs, 206617 complete and 0 interrupted iterations
default   [  90% ] 674/674 VUs  2m42.5s/3m00.0s

running (2m43.5s), 674/674 VUs, 207842 complete and 0 interrupted iterations
default   [  91% ] 674/674 VUs  2m43.5s/3m00.0s

running (2m44.5s), 674/674 VUs, 209001 complete and 0 interrupted iterations
default   [  91% ] 674/674 VUs  2m44.5s/3m00.0s

running (2m45.5s), 674/674 VUs, 211248 complete and 0 interrupted iterations
default   [  92% ] 674/674 VUs  2m45.5s/3m00.0s

running (2m46.5s), 674/674 VUs, 213223 complete and 0 interrupted iterations
default   [  92% ] 674/674 VUs  2m46.5s/3m00.0s

running (2m47.5s), 674/674 VUs, 214465 complete and 0 interrupted iterations
default   [  93% ] 674/674 VUs  2m47.5s/3m00.0s

running (2m48.5s), 674/674 VUs, 215250 complete and 0 interrupted iterations
default   [  94% ] 674/674 VUs  2m48.5s/3m00.0s

running (2m49.5s), 674/674 VUs, 217309 complete and 0 interrupted iterations
default   [  94% ] 674/674 VUs  2m49.5s/3m00.0s

running (2m50.5s), 674/674 VUs, 218165 complete and 0 interrupted iterations
default   [  95% ] 674/674 VUs  2m50.5s/3m00.0s

running (2m51.5s), 674/674 VUs, 220307 complete and 0 interrupted iterations
default   [  95% ] 674/674 VUs  2m51.5s/3m00.0s

running (2m52.5s), 674/674 VUs, 222057 complete and 0 interrupted iterations
default   [  96% ] 674/674 VUs  2m52.5s/3m00.0s

running (2m53.5s), 674/674 VUs, 223103 complete and 0 interrupted iterations
default   [  96% ] 674/674 VUs  2m53.5s/3m00.0s

running (2m54.5s), 674/674 VUs, 224917 complete and 0 interrupted iterations
default   [  97% ] 674/674 VUs  2m54.5s/3m00.0s

running (2m55.5s), 674/674 VUs, 226581 complete and 0 interrupted iterations
default   [  97% ] 674/674 VUs  2m55.5s/3m00.0s

running (2m56.5s), 674/674 VUs, 228367 complete and 0 interrupted iterations
default   [  98% ] 674/674 VUs  2m56.5s/3m00.0s

running (2m57.5s), 674/674 VUs, 230327 complete and 0 interrupted iterations
default   [  99% ] 674/674 VUs  2m57.5s/3m00.0s

running (2m58.5s), 674/674 VUs, 232655 complete and 0 interrupted iterations
default   [  99% ] 674/674 VUs  2m58.5s/3m00.0s

running (2m59.5s), 674/674 VUs, 233568 complete and 0 interrupted iterations
default   [ 100% ] 674/674 VUs  2m59.5s/3m00.0s

running (3m00.5s), 232/674 VUs, 235234 complete and 0 interrupted iterations
default ↓ [ 100% ] 674/674 VUs  3m0s

running (3m01.5s), 184/674 VUs, 235282 complete and 0 interrupted iterations
default ↓ [ 100% ] 674/674 VUs  3m0s

running (3m02.2s), 000/674 VUs, 235466 complete and 0 interrupted iterations
default ✗ [ 100% ] 000/674 VUs  3m0s

     ✗ logged in successfully
      ↳  10% — ✓ 25876 / ✗ 209590
     ✓ retrieved member

     checks.........................: 14.06% ✓ 34310       ✗ 209590
     data_received..................: 200 MB 1.1 MB/s
     data_sent......................: 85 MB  468 kB/s
     http_req_blocked...............: avg=68.8ms   min=0s       med=0s       max=1.9s     p(90)=276.75ms p(95)=589.63ms
     http_req_connecting............: avg=85.8ms   min=0s       med=56.28ms  max=1.33s    p(90)=213ms    p(95)=248.7ms 
   ✗ http_req_duration..............: avg=122.59ms min=0s       med=0s       max=4.56s    p(90)=447.47ms p(95)=1.06s   
       { expected_response:true }...: avg=1.04s    min=31.76ms  med=961.93ms max=4.56s    p(90)=1.64s    p(95)=2s      
     http_req_failed................: 94.19% ✓ 246181      ✗ 15161 
     http_req_receiving.............: avg=1.34ms   min=0s       med=0s       max=257.81ms p(90)=34.63µs  p(95)=70.27µs 
     http_req_sending...............: avg=597.65µs min=0s       med=0s       max=235.81ms p(90)=37.71µs  p(95)=1.03ms  
     http_req_tls_handshaking.......: avg=57.53ms  min=0s       med=0s       max=1.73s    p(90)=233.59ms p(95)=490.62ms
     http_req_waiting...............: avg=120.65ms min=0s       med=0s       max=4.53s    p(90)=441.26ms p(95)=1.05s   
     http_reqs......................: 261342 1434.64666/s
     iteration_duration.............: avg=412.41ms min=351.89µs med=209.98ms max=6.73s    p(90)=1s       p(95)=1.78s   
     iterations.....................: 235466 1292.599392/s
     vus............................: 1      min=1         max=674 
     vus_max........................: 674    min=674       max=674 

```
