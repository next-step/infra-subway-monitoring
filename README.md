<p align="center">
    <img width="200px;" src="https://raw.githubusercontent.com/woowacourse/atdd-subway-admin-frontend/master/images/main_logo.png"/>
</p>
<p align="center">
  <img alt="npm" src="https://img.shields.io/badge/npm-%3E%3D%205.5.0-blue">
  <img alt="node" src="https://img.shields.io/badge/node-%3E%3D%209.3.0-blue">
  <a href="https://edu.nextstep.camp/c/R89PYi5H" alt="nextstep atdd">
    <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fedu.nextstep.camp%2Fc%2FR89PYi5H">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/next-step/atdd-subway-service">
</p>

<br>

# 인프라공방 샘플 서비스 - 지하철 노선도

<br>

## 🚀 Getting Started

### Install
#### npm 설치
```
cd frontend
npm install
```
> `frontend` 디렉토리에서 수행해야 합니다.

### Usage
#### webpack server 구동
```
npm run dev
```
#### application 구동
```
./gradlew clean build
```
<br>

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
  - public 망 (192.130.0.124)
    - nginx : /home/ubuntu/logs/nginx_log
    - app : /home/ubuntu/logs/app_log
2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=ku-lee-dashboard

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 경쟁사(Naver 지하철) 와 비교, 경쟁사와 비슷하거나 20% 이상 성능 차이 나도록 개선.
- subway : 우리의 지하철 서비스 

    a. Quantity based Metric
      
|  | 경쟁사 | subway |
|:--:|:--:|:--:|
| 이미지 최대 크기 (Bytes)  | 862,749 | 4,954 |   
| 웹 글꼴 최대 크기 (Bytes) | 721,556	 | 132,380  |   
| 글꼴 최대 갯수  | 1 | 10 |   
| 스크립트 최대 크기(Bytes)  | 904,454 | 2,352,130	 |   
| 스크립트 최대 갯수  | 23 |2 |   


      b. Timing based Metric
    FCP, LCP, TTI, TBT, CLS 등 pagespeed에서 제공하는 데이터

    
    
|  | WebPageTest-경쟁사 | PageSpeed-경쟁사 | WebPageTest - subway | PageSpeed - subway |
|:--:|:--:|:--:|:--:|:--:|
| First Contentful Paint  | 1.819s | 0.5s | 6.343s| 14.8s |
| Time to Interactive  | | 3.4s | | 15.4s |          
| Speed Index | 6.884s | 2.7s | 3.031s | 6.410 s | 14.8s |
| Total Blocking Time | 0.419s | 590 ms | 0.000s | 0.000s | 570ms |  
| Largest Contentful Paint | 12.328s | 4.9s |  6.555s  |15.4s|
| Cumulative Layout Shift |0.025s |4.9s | 0.004s | 0.041 |

    c. Rule based Metric
    WebPageTest, pagespeed 등 웹 사이트에서 측정한 점수를 지표로 사용 
|  | WebPageTest-경쟁사 | subway|
|:--:|:--:|:--:|
| First Byte Time | A | A |
| Keep-alive Enabled | A | A|
| Compress Transfer | D |F|
| Compress Images | A |A|
| Cache static content | C | C|
| Effective use of CDN | X |





2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축 사용
- 불필요한 font 제거 및 통일 (현재 10개 사용!)
- js 스크립트 gzip 압축, 사용하지 않는 스크립트 줄이기
- 렌더링 차단 리소스 제거 (js/css를 인라인으로 전)
- 웹 정적 자원 캐시 사용하기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 전제 조건  :
  - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
  - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
 
- 계산 결과 :
  - 지하철 하루 이용자가 719만명
    - 2020년 1월 기준 네이버 지도 순 이용자 약 1,380명 / 카카오맵 순이용자 약 840만명. (http://www.koreanclick.com/insights/newsletter_view.html?code=topic&id=563&page=2&utm_source=board&utm_medium=board&utm_campaign=topic&utm_content=20200220)
    - 우리 지하철 서비스는 pc/모바일 모두 지원한다고 가정.  500만명 사용자 가입 목표로 산정
  - 1일 사용자 수(DAU) : 500,000 명 (가입 회원 중 10%가 사용한다고 가정..) 
  - 1명당 1일 평균 접속 수: 5 회
  - 1일 총 접속 수 : 2,500,000 회
  - 1일 평균 rps: 20rps
  - 최대 트래픽 / 평소 트래픽 : 10
  - 1일 최대 rps: 200rps
  - Latency: 100ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

## 접속이 빈번한 페이지(메인 페이지)
-
<details>
<summary>
smoke 
</summary>
   
- script 
   
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let mainRes = http.get(`${BASE_URL}`);
  check(mainRes, { 'load main successfully ': (resp) => resp.status === 200});
  sleep(1);
};
```

- 결과

```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ load main successfully 

     checks.........................: 100.00% ✓ 10  ✗ 0  
     data_received..................: 17 kB   1.7 kB/s
     data_sent......................: 1.5 kB  146 B/s
     http_req_blocked...............: avg=6.41ms  min=3.96µs  med=4.79µs  max=64.1ms   p(90)=6.41ms  p(95)=35.25ms 
     http_req_connecting............: avg=33.16µs min=0s      med=0s      max=331.63µs p(90)=33.16µs p(95)=182.39µs
   ✓ http_req_duration..............: avg=2.61ms  min=1.88ms  med=2.13ms  max=4.37ms   p(90)=4.1ms   p(95)=4.24ms  
       { expected_response:true }...: avg=2.61ms  min=1.88ms  med=2.13ms  max=4.37ms   p(90)=4.1ms   p(95)=4.24ms  
     http_req_failed................: 0.00%   ✓ 0   ✗ 10 
     http_req_receiving.............: avg=81.78µs min=64.95µs med=79.87µs max=109.26µs p(90)=95.17µs p(95)=102.21µs
     http_req_sending...............: avg=29.61µs min=23.32µs med=26.18µs max=60.86µs  p(90)=31.77µs p(95)=46.32µs 
     http_req_tls_handshaking.......: avg=2.34ms  min=0s      med=0s      max=23.47ms  p(90)=2.34ms  p(95)=12.91ms 
     http_req_waiting...............: avg=2.5ms   min=1.71ms  med=2.03ms  max=4.25ms   p(90)=4ms     p(95)=4.12ms  
     http_reqs......................: 10      0.989932/s
     iteration_duration.............: avg=1s      min=1s      med=1s      max=1.06s    p(90)=1.01s   p(95)=1.03s   
     iterations.....................: 10      0.989932/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1


```

</details>


<details>
<summary>
load 
</summary>
   
- script
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';


export let options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
        { duration: '2m', target: 100 }, // stay at 100 users for 2 minutes
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let mainRes = http.get(`${BASE_URL}`);
  check(mainRes, { 'load main successfully ': (resp) => resp.status === 200});
  sleep(1);
};
```   

- 결과
```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.7s), 000/100 VUs, 15517 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

     ✓ load main successfully 

     checks.........................: 100.00% ✓ 15517 ✗ 0    
     data_received..................: 20 MB   105 kB/s
     data_sent......................: 1.7 MB  9.1 kB/s
     http_req_blocked...............: avg=28.7µs  min=1.87µs   med=4.57µs  max=26.01ms  p(90)=6.34µs  p(95)=7.22µs  
     http_req_connecting............: avg=1.69µs  min=0s       med=0s      max=536.14µs p(90)=0s      p(95)=0s      
   ✓ http_req_duration..............: avg=1.74ms  min=765.11µs med=1.55ms  max=19.88ms  p(90)=2.29ms  p(95)=2.87ms  
       { expected_response:true }...: avg=1.74ms  min=765.11µs med=1.55ms  max=19.88ms  p(90)=2.29ms  p(95)=2.87ms  
     http_req_failed................: 0.00%   ✓ 0     ✗ 15517
     http_req_receiving.............: avg=70.23µs min=14.3µs   med=62.93µs max=2.49ms   p(90)=90.66µs p(95)=120.64µs
     http_req_sending...............: avg=23.44µs min=7.07µs   med=20.76µs max=4.48ms   p(90)=29.27µs p(95)=37.91µs 
     http_req_tls_handshaking.......: avg=20.96µs min=0s       med=0s      max=25.14ms  p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=1.65ms  min=693.94µs med=1.45ms  max=19.72ms  p(90)=2.19ms  p(95)=2.77ms  
     http_reqs......................: 15517   81.368136/s
     iteration_duration.............: avg=1s      min=1s       med=1s      max=1.03s    p(90)=1s      p(95)=1s      
     iterations.....................: 15517   81.368136/s
     vus............................: 5       min=2   max=100
     vus_max........................: 100     min=100 max=100


```

</details>

<details>
<summary> stress </summary>
   
- script
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2s', target: 100 }, // below normal load
        { duration: '5s', target: 100 },
        { duration: '2s', target: 200 }, // normal load
        { duration: '5s', target: 200 },
        { duration: '2s', target: 300 }, // around the breaking point
        { duration: '5s', target: 300 },
        { duration: '2s', target: 400 }, // beyond the breaking point
        { duration: '5s', target: 400 },
        { duration: '10s', target: 0 }, // scale down. Recovery stage.
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let mainRes = http.get(`${BASE_URL}`);
  check(mainRes, { 'load main successfully ': (resp) => resp.status === 200});
  sleep(1);
};

```
   
- 결과
```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 400 max VUs, 1m8s max duration (incl. graceful stop):
           * default: Up to 400 looping VUs for 38s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m38.5s), 000/400 VUs, 8772 complete and 0 interrupted iterations
default ✓ [======================================] 000/400 VUs  38s

     ✓ load main successfully 

     checks.........................: 100.00% ✓ 8772  ✗ 0    
     data_received..................: 13 MB   334 kB/s
     data_sent......................: 1.1 MB  29 kB/s
     http_req_blocked...............: avg=207.52µs min=1.52µs   med=3.94µs  max=90.69ms p(90)=6.97µs   p(95)=34.35µs 
     http_req_connecting............: avg=17.04µs  min=0s       med=0s      max=19.44ms p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=2.19ms   min=714.46µs med=1.47ms  max=40.98ms p(90)=4.2ms    p(95)=6.31ms  
       { expected_response:true }...: avg=2.19ms   min=714.46µs med=1.47ms  max=40.98ms p(90)=4.2ms    p(95)=6.31ms  
     http_req_failed................: 0.00%   ✓ 0     ✗ 8772 
     http_req_receiving.............: avg=79µs     min=13.1µs   med=57.94µs max=4.03ms  p(90)=127.86µs p(95)=192.57µs
     http_req_sending...............: avg=26.5µs   min=6.75µs   med=16.3µs  max=4.57ms  p(90)=35.05µs  p(95)=54.8µs  
     http_req_tls_handshaking.......: avg=175.28µs min=0s       med=0s      max=58.17ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.08ms   min=661.27µs med=1.37ms  max=40.9ms  p(90)=4.05ms   p(95)=6.19ms  
     http_reqs......................: 8772    227.898831/s
     iteration_duration.............: avg=1s       min=1s       med=1s      max=1.09s   p(90)=1s       p(95)=1s      
     iterations.....................: 8772    227.898831/s
     vus............................: 20      min=20  max=400
     vus_max........................: 400     min=400 max=400
```
</details>


## 데이터를 갱신하는 페이지
- 로그인 & 회원 정보 수정 & 조회

<details>
<summary>
smoke 
</summary>
   
- script 
   
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';
const UPDATE_ID=13;
const UPDATE_DATA = JSON.stringify({
	email: USERNAME,
	password: PASSWORD,
	age: 1
});
export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  let updateRes = http.put(`${BASE_URL}/members/2`, UPDATE_DATA, params);
  check(updateRes, {'update in  sucessfully': (resp) => resp.status === 200});

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects = http.put(`${BASE_URL}/lines/${UPDATE_ID}`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);
};
```

- 결과

```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke_update.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ update in  sucessfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 30  ✗ 0  
     data_received..................: 14 kB   1.4 kB/s
     data_sent......................: 8.5 kB  829 B/s
     http_req_blocked...............: avg=739.58µs min=2.43µs  med=3.88µs  max=22.04ms  p(90)=6.02µs  p(95)=23.37µs
     http_req_connecting............: avg=7.59µs   min=0s      med=0s      max=227.86µs p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=7.06ms   min=2.15ms  med=5.7ms   max=38.27ms  p(90)=10.92ms p(95)=15.43ms
       { expected_response:true }...: avg=9.21ms   min=5.28ms  med=6.89ms  max=38.27ms  p(90)=13.3ms  p(95)=18.6ms 
     http_req_failed................: 33.33%  ✓ 10  ✗ 20 
     http_req_receiving.............: avg=84.77µs  min=42.13µs med=77.29µs max=394.93µs p(90)=93.75µs p(95)=99.75µs
     http_req_sending...............: avg=30.14µs  min=18.02µs med=27.43µs max=70.21µs  p(90)=33.51µs p(95)=51.41µs
     http_req_tls_handshaking.......: avg=710.53µs min=0s      med=0s      max=21.31ms  p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=6.95ms   min=2.06ms  med=5.61ms  max=38.11ms  p(90)=10.84ms p(95)=15.31ms
     http_reqs......................: 30      2.926839/s
     iteration_duration.............: avg=1.02s    min=1.01s   med=1.01s   max=1.08s    p(90)=1.03s   p(95)=1.05s  
     iterations.....................: 10      0.975613/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1


```

</details>


<details>
<summary>
load 
</summary>
   
- script
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
        { duration: '2m', target: 100 }, // stay at 100 users for 2 minutes
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';
const UPDATE_ID=13;
const UPDATE_DATA = JSON.stringify({
	email: USERNAME,
	password: PASSWORD,
	age: 1
});
export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  let updateRes = http.put(`${BASE_URL}/members/2`, UPDATE_DATA, params);
  check(updateRes, {'update in  sucessfully': (resp) => resp.status === 200});

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects = http.put(`${BASE_URL}/lines/${UPDATE_ID}`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);
};

```   

- 결과
```
 
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load_update.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.5s), 000/100 VUs, 15273 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

     ✓ logged in successfully
     ✓ update in  sucessfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 45819 ✗ 0    
     data_received..................: 15 MB   80 kB/s
     data_sent......................: 12 MB   65 kB/s
     http_req_blocked...............: avg=12.06µs min=1.22µs  med=2.98µs  max=43.4ms   p(90)=4.63µs  p(95)=5.54µs 
     http_req_connecting............: avg=578ns   min=0s      med=0s      max=667.14µs p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=5.79ms  min=1.11ms  med=5.64ms  max=60.72ms  p(90)=9.38ms  p(95)=11.71ms
       { expected_response:true }...: avg=7.28ms  min=4.32ms  med=6.31ms  max=60.72ms  p(90)=10.54ms p(95)=12.87ms
     http_req_failed................: 33.33%  ✓ 15273 ✗ 30546
     http_req_receiving.............: avg=56.27µs min=13.41µs med=48.36µs max=11.14ms  p(90)=74.88µs p(95)=85.17µs
     http_req_sending...............: avg=24.27µs min=8.5µs   med=19.31µs max=8.83ms   p(90)=32.15µs p(95)=38.32µs
     http_req_tls_handshaking.......: avg=7.18µs  min=0s      med=0s      max=22.19ms  p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=5.71ms  min=1.06ms  med=5.56ms  max=60.67ms  p(90)=9.3ms   p(95)=11.62ms
     http_reqs......................: 45819   240.560727/s
     iteration_duration.............: avg=1.01s   min=1.01s   med=1.01s   max=1.1s     p(90)=1.02s   p(95)=1.03s  
     iterations.....................: 15273   80.186909/s
     vus............................: 6       min=2   max=100
     vus_max........................: 100     min=100 max=100


```

</details>

<details>
<summary> stress </summary>
   
- script
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';


export let options = {
    stages: [
        { duration: '2s', target: 100 }, // below normal load
        { duration: '5s', target: 100 },
        { duration: '2s', target: 200 }, // normal load
        { duration: '5s', target: 200 },
        { duration: '2s', target: 300 }, // around the breaking point
        { duration: '5s', target: 300 },
        { duration: '2s', target: 400 }, // beyond the breaking point
        { duration: '5s', target: 400 },
        { duration: '10s', target: 0 }, // scale down. Recovery stage.
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};



const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';
const UPDATE_ID=13;
const UPDATE_DATA = JSON.stringify({
	email: USERNAME,
	password: PASSWORD,
	age: 1
});
export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  let updateRes = http.put(`${BASE_URL}/members/2`, UPDATE_DATA, params);
  check(updateRes, {'update in  sucessfully': (resp) => resp.status === 200});

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects = http.put(`${BASE_URL}/lines/${UPDATE_ID}`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);
};

```
   
- 결과
  - request오류가 발생
```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress_update.js
     output: -

  scenarios: (100.00%) 1 scenario, 400 max VUs, 1m8s max duration (incl. graceful stop):
           * default: Up to 400 looping VUs for 38s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0022] Request Failed                                error="Post \"https://mysubway.kro.kr/login/token\": EOF"
ERRO[0022] GoError: invalid type <nil>, expected string, []byte or ArrayBuffer
running at reflect.methodValueCall (native)
default at loggedInSuccessfully (file:///home/ubuntu/stress_update.js:51:85(4))
	at go.k6.io/k6/js/common.Bind.func1 (native)
	at file:///home/ubuntu/stress_update.js:50:27(34)  executor=ramping-vus scenario=default source=stacktrace
WARN[0022] Request Failed                                error="Post \"https://mysubway.kro.kr/login/token\": EOF"
...
WARN[0031] Request Failed                                error="Put \"https://mysubway.kro.kr/lines/13\": read tcp 192.130.0.124:47614->3.37.14.163:443: read: connection reset by peer"
ERRO[0031] GoError: invalid type <nil>, expected string, []byte or ArrayBuffer
running at reflect.methodValueCall (native)
default at file:///home/ubuntu/stress_update.js:62:37(81)  executor=ramping-vus scenario=default source=stacktrace

running (0m39.0s), 000/400 VUs, 6788 complete and 0 interrupted iterations
default ✓ [======================================] 000/400 VUs  38s

     ✗ logged in successfully
      ↳  82% — ✓ 5579 / ✗ 1209
     ✗ update in  sucessfully
      ↳  98% — ✓ 5512 / ✗ 67
     ✓ retrieved member

     checks.........................: 92.84% ✓ 16550 ✗ 1276 
     data_received..................: 14 MB  358 kB/s
     data_sent......................: 5.6 MB 143 kB/s
     http_req_blocked...............: avg=19.77ms  min=0s     med=3.2µs   max=887.73ms p(90)=3.99ms   p(95)=112.39ms
     http_req_connecting............: avg=5.76ms   min=0s     med=0s      max=546.74ms p(90)=1.64ms   p(95)=23.3ms  
   ✓ http_req_duration..............: avg=162.82ms min=0s     med=45.24ms max=2.47s    p(90)=542.82ms p(95)=757.67ms
       { expected_response:true }...: avg=218.77ms min=4.37ms med=85.61ms max=2.47s    p(90)=707.63ms p(95)=860.55ms
     http_req_failed................: 38.19% ✓ 6855  ✗ 11091
     http_req_receiving.............: avg=298.57µs min=0s     med=44.59µs max=187.06ms p(90)=81.28µs  p(95)=151.21µs
     http_req_sending...............: avg=897.25µs min=0s     med=18.04µs max=238.85ms p(90)=87.73µs  p(95)=682.24µs
     http_req_tls_handshaking.......: avg=15.58ms  min=0s     med=0s      max=734.12ms p(90)=3.61ms   p(95)=103.4ms 
     http_req_waiting...............: avg=161.62ms min=0s     med=44.89ms max=2.47s    p(90)=538.9ms  p(95)=744.83ms
     http_reqs......................: 17946  460.561494/s
     iteration_duration.............: avg=1.31s    min=1.32ms med=1.1s    max=4.75s    p(90)=2.73s    p(95)=3.13s   
     iterations.....................: 6788   174.205473/s
     vus............................: 16     min=16  max=400
     vus_max........................: 400    min=400 max=400
```
</details>



## 데이터를 조회하는데 여러 데이터를 참조하는 페이지
- 경로 조회 (적당히 복잡 해 보이는 정도의 거리 경로 조회)
```json
{"stations":[{"id":1,"name":"녹양","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":79,"name":"가능","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":78,"name":"의정부","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":77,"name":"회룡","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":76,"name":"망월사","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":75,"name":"도봉산","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":371,"name":"수락산","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":372,"name":"마들","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":198,"name":"노원","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":374,"name":"중계","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":375,"name":"하계","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":376,"name":"공릉","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":329,"name":"태릉입구","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":378,"name":"먹골","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":364,"name":"중화","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":365,"name":"상봉","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":366,"name":"면목","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":345,"name":"사가정","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":346,"name":"용마산","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":347,"name":"중곡","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":277,"name":"군자","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":278,"name":"아차산","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":279,"name":"광나루","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":280,"name":"천호","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":386,"name":"강동구청","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":387,"name":"몽촌토성","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"},{"id":100,"name":"잠실","createdDate":"2021-01-06T18:32:00.901126","modifiedDate":"2021-01-06T18:32:00.901126"}],"distance":26}
```
<details>
<summary>
smoke 
</summary>
   
- script 
   
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let pathRes = http.get(`${BASE_URL}/paths?source=1&target=100`);
  check(pathRes, { 'load path successfully ': (resp) => resp.status === 200});
  sleep(1);
};

```

- 결과

```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke_data.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.6s), 0/1 VUs, 9 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ load path successfully 

     checks.........................: 100.00% ✓ 9   ✗ 0  
     data_received..................: 35 kB   3.3 kB/s
     data_sent......................: 1.6 kB  149 B/s
     http_req_blocked...............: avg=2.47ms   min=3.85µs   med=4.23µs   max=22.2ms   p(90)=4.44ms   p(95)=13.32ms 
     http_req_connecting............: avg=21.34µs  min=0s       med=0s       max=192.12µs p(90)=38.42µs  p(95)=115.27µs
   ✓ http_req_duration..............: avg=177.5ms  min=130.42ms med=157.01ms max=240.89ms p(90)=239.47ms p(95)=240.18ms
       { expected_response:true }...: avg=177.5ms  min=130.42ms med=157.01ms max=240.89ms p(90)=239.47ms p(95)=240.18ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 9  
     http_req_receiving.............: avg=90.47µs  min=75.45µs  med=89.54µs  max=106.82µs p(90)=105.94µs p(95)=106.38µs
     http_req_sending...............: avg=31.78µs  min=21.14µs  med=26.13µs  max=66.46µs  p(90)=46.8µs   p(95)=56.63µs 
     http_req_tls_handshaking.......: avg=2.39ms   min=0s       med=0s       max=21.52ms  p(90)=4.3ms    p(95)=12.91ms 
     http_req_waiting...............: avg=177.38ms min=130.29ms med=156.91ms max=240.76ms p(90)=239.36ms p(95)=240.06ms
     http_reqs......................: 9       0.846713/s
     iteration_duration.............: avg=1.18s    min=1.13s    med=1.16s    max=1.24s    p(90)=1.24s    p(95)=1.24s   
     iterations.....................: 9       0.846713/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1



```

</details>


<details>
<summary>
load 
</summary>
   
- script
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
        { duration: '2m', target: 100 }, // stay at 100 users for 2 minutes
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let pathRes = http.get(`${BASE_URL}/paths?source=1&target=100`);
  check(pathRes, { 'load path successfully ': (resp) => resp.status === 200});
  sleep(1);
};

```   

- 결과
  - `ERRO[0196] some thresholds have failed`   이라는 결과가 출력
```
 
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load_data.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m14.6s), 000/100 VUs, 1803 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

     ✓ load path successfully 

     checks.........................: 100.00% ✓ 1803  ✗ 0    
     data_received..................: 6.6 MB  34 kB/s
     data_sent......................: 281 kB  1.4 kB/s
     http_req_blocked...............: avg=307.3µs  min=2.18µs   med=6.57µs  max=35.71ms  p(90)=9.88µs   p(95)=3.8ms   
     http_req_connecting............: avg=18.74µs  min=0s       med=0s      max=3.92ms   p(90)=0s       p(95)=221.06µs
   ✗ http_req_duration..............: avg=7.85s    min=140.79ms med=9.31s   max=18.54s   p(90)=9.91s    p(95)=10.04s  
       { expected_response:true }...: avg=7.85s    min=140.79ms med=9.31s   max=18.54s   p(90)=9.91s    p(95)=10.04s  
     http_req_failed................: 0.00%   ✓ 0     ✗ 1803 
     http_req_receiving.............: avg=90.46µs  min=30.94µs  med=86.06µs max=461.57µs p(90)=113.41µs p(95)=128.54µs
     http_req_sending...............: avg=29.43µs  min=10.58µs  med=24.49µs max=179.1µs  p(90)=40.51µs  p(95)=66.98µs 
     http_req_tls_handshaking.......: avg=269.72µs min=0s       med=0s      max=22.14ms  p(90)=0s       p(95)=3.45ms  
     http_req_waiting...............: avg=7.85s    min=140.63ms med=9.31s   max=18.54s   p(90)=9.91s    p(95)=10.04s  
     http_reqs......................: 1803    9.265701/s
     iteration_duration.............: avg=8.85s    min=1.14s    med=10.31s  max=19.55s   p(90)=10.91s   p(95)=11.04s  
     iterations.....................: 1803    9.265701/s
     vus............................: 10      min=2   max=100
     vus_max........................: 100     min=100 max=100

ERRO[0196] some thresholds have failed  
```

</details>

<details>
<summary> stress </summary>
   
- script
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2s', target: 100 }, // below normal load
        { duration: '5s', target: 100 },
        { duration: '2s', target: 200 }, // normal load
        { duration: '5s', target: 200 },
        { duration: '2s', target: 300 }, // around the breaking point
        { duration: '5s', target: 300 },
        { duration: '2s', target: 400 }, // beyond the breaking point
        { duration: '5s', target: 400 },
        { duration: '10s', target: 0 }, // scale down. Recovery stage.
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};



const BASE_URL = 'https://mysubway.kro.kr';
const USERNAME = 'koun@kakao.com';
const PASSWORD = '1234';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let pathRes = http.get(`${BASE_URL}/paths?source=1&target=100`);
  check(pathRes, { 'load path successfully ': (resp) => resp.status === 200});
  sleep(1);
};

```
   
- 결과
  - reques t오류가 발생
``` 
WARN[0033] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0033] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0033] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0034] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0034] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0034] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0034] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0034] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": EOF"
WARN[0034] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": read tcp 192.130.0.124:47666->3.37.14.163:443: read: connection reset by peer"
WARN[0034] Request Failed                                error="Get \"https://mysubway.kro.kr/paths?source=1&target=100\": read tcp 192.130.0.124:47714->3.37.14.163:443: read: connection reset by peer"

running (1m07.7s), 000/400 VUs, 2125 complete and 32 interrupted iterations
default ↓ [======================================] 249/400 VUs  38s

     ✗ load path successfully 
      ↳  22% — ✓ 487 / ✗ 1638

     checks.........................: 22.91% ✓ 487   ✗ 1638 
     data_received..................: 9.4 MB 139 kB/s
     data_sent......................: 992 kB 15 kB/s
     http_req_blocked...............: avg=4.63ms   min=0s       med=4.52ms   max=93.53ms p(90)=7.97ms   p(95)=10.31ms 
     http_req_connecting............: avg=426.46µs min=0s       med=258.51µs max=16.48ms p(90)=563.06µs p(95)=1.22ms  
   ✗ http_req_duration..............: avg=4.61s    min=0s       med=526.75µs max=32.4s   p(90)=25.85s   p(95)=29.68s  
       { expected_response:true }...: avg=19.03s   min=966.21ms med=22.58s   max=32.4s   p(90)=30.69s   p(95)=31.37s  
     http_req_failed................: 77.08% ✓ 1638  ✗ 487  
     http_req_receiving.............: avg=77.41µs  min=0s       med=84.29µs  max=2.68ms  p(90)=134.55µs p(95)=163.6µs 
     http_req_sending...............: avg=73.16µs  min=0s       med=65.81µs  max=6.73ms  p(90)=109.4µs  p(95)=139.29µs
     http_req_tls_handshaking.......: avg=4.27ms   min=0s       med=4.15ms   max=68.32ms p(90)=7.55ms   p(95)=9.59ms  
     http_req_waiting...............: avg=4.61s    min=0s       med=343.96µs max=32.4s   p(90)=25.85s   p(95)=29.68s  
     http_reqs......................: 2125   31.374923/s
     iteration_duration.............: avg=5.62s    min=1s       med=1s       max=33.41s  p(90)=26.85s   p(95)=30.69s  
     iterations.....................: 2125   31.374923/s
     vus............................: 9      min=9   max=400
     vus_max........................: 400    min=400 max=400

ERRO[0069] some thresholds have failed    
```
</details>