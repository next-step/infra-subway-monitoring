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
- was : /home/ubuntu/log
- nginx : /var/log/nginx
-
2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-ascii92der

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 성능예산 비교 사이트 : [네이버 지도](https://map.naver.com/v5/subway)

#### WebPageTest
| |지하철노선도|Naver 지도|
|---|:---:|:---:|
|First Contentful Paint|2.658s|0.803s|
|Speed Index|2.810s|3.993s|
|Largest Contentful Paint|2.837s|5.848s|
|Cumulative Layout Shift|0|0.025|
|Total Blocking Time|≥ 0.038s|≥ 0.555s|

||지하철노선도|Naver 지도|
|---|:---:|:---:|
|Security score|E|E|
|First Byte Time|A|A|
|Keep-alive Enabled|A|A|
|Compress Transfer|F|D|
|Compress Images|A|A|
|Cache static content|F|C|
|Effective use of CDN|X|X|

___

#### PageSpeed

| |지하철노선도|Naver 지도|
|---|:---:|:---:|
|First Contentful Paint|2.8 s|0.5 s|
|Speed Index|3.6 s|3.0 s|
|Largest Contentful Paint|2.9 s|4.3 s|
|Time to Interactive|2.9 s|4.3 s|
|Cumulative Layout Shift|0.004|0.019|
|Total Blocking Time|60 ms|1,150 ms|

#### Conclusion

- 랭크 기준

| |현재|목표 성능예산|결론|
|---|:---:|:---:|:---:|
|First Byte Time|A|A|유지|
|Keep-alive Enabled|A|A|유지|
|Compress Transfer|F|D|개선 필요|
|Compress Images|A|A|유지|
|Cache static content|F|C|개선 필요|
|Effective use of CDN|X|X|유지|

- 시간 기준

| |현재|목표 성능예산|결론|
|---|:---:|:---:|:---:|
|First Contentful Paint|2.8 s|3초 이하|개선 필요|
|Speed Index|3.6 s|3초 이하|개선 필요|
|Largest Contentful Paint|2.9 s|3초 이하|유지|
|Time to Interactive|2.9 s|3초 이하|유지|
|Cumulative Layout Shift|0.004| |유지|
|Total Blocking Time|60 ms| |유지|

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- JS/CSS 지연로딩
- 캐싱 설정
- 불필요한 파일 제거
- CDN 사용하기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 목표값 설정
    - 1일 사용자 수 (DAU) : 11,200,000 / 30 = 373,300 명 (2020.07 기사 기준)
    - 1명당 1일 평균 접속수 : 3회
    - 1일 총 접속 수 : 373,300 x 3 = 1,119,900 회
    - 1일 평균 rps : 1,119,900 / 86,400 = 13 rps
    - 예상 최대 트래픽 / 예상 평소 트래픽 : 700,000 / 370,000
    - 일일 최대 rps : 13 x 700,000 / 373,000 = 24 rps

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- smoke
    - script
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://ascii92der.n-e.kr';
const USERNAME = 'ascii92der@gmail.com';
const PASSWORD = '1234';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
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


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects1 = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  let myObjects2 = http.get(`${BASE_URL}/paths?source=1&target=3`, authHeaders).json();
  let myObjects3 = http.get(`${BASE_URL}/favorites`, authHeaders).json();
  check(myObjects1, { 'retrieved member': (obj) => obj.id != 0 });
  check(myObjects2, { 'find Paths': (obj) => obj.stations != null});
  check(myObjects3, { 'find Favorite Paths': (obj) => obj.size != 0});
  sleep(1);
};
```
- 결과
```shell
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


running (10.2s), 0/1 VUs, 8 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find Paths
     ✓ find Favorite Paths

     checks.........................: 100.00% ✓ 32       ✗ 0  
     data_received..................: 37 kB   3.7 kB/s
     data_sent......................: 9.4 kB  923 B/s
     http_req_blocked...............: avg=6.49ms   min=2µs    med=5µs     max=204.91ms p(90)=11.7µs  p(95)=1.29ms  
     http_req_connecting............: avg=221.28µs min=0s     med=0s      max=7.08ms   p(90)=0s      p(95)=0s      
   ✓ http_req_duration..............: avg=61.28ms  min=12.3ms med=20.01ms max=248.8ms  p(90)=181.2ms p(95)=203.39ms
     { expected_response:true }...: avg=61.28ms  min=12.3ms med=20.01ms max=248.8ms  p(90)=181.2ms p(95)=203.39ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 32
     http_req_receiving.............: avg=93.37µs  min=51µs   med=82µs    max=210µs    p(90)=144.8µs p(95)=191.8µs
     http_req_sending...............: avg=59.09µs  min=16µs   med=28.5µs  max=1.01ms   p(90)=38.9µs  p(95)=50.95µs
     http_req_tls_handshaking.......: avg=5.75ms   min=0s     med=0s      max=184.18ms p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=61.12ms  min=12.2ms med=19.89ms max=248.56ms p(90)=181.1ms p(95)=203.3ms
     http_reqs......................: 32      3.136275/s
     iteration_duration.............: avg=1.27s    min=1.18s  med=1.23s   max=1.56s    p(90)=1.37s   p(95)=1.47s   
     iterations.....................: 8       0.784069/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
- load
    - script
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 130 },
    { duration: '20s', target: 130 },
    { duration: '10s', target: 0 }, 
  ],
  thresholds: {
    http_req_duration: ['p(99)<5000'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<5000'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://ascii92der.n-e.kr';
const USERNAME = 'ascii92der@gmail.com';
const PASSWORD = '1234';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
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


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects1 = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  let myObjects2 = http.get(`${BASE_URL}/paths?source=1&target=3`, authHeaders).json();
  let myObjects3 = http.get(`${BASE_URL}/favorites`, authHeaders).json();
  check(myObjects1, { 'retrieved member': (obj) => obj.id != 0 });
  check(myObjects2, { 'find Paths': (obj) => obj.stations != null});
  check(myObjects3, { 'find Favorite Paths': (obj) => obj.size != 0});
  sleep(1);
};
```
- 결과
```shell

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 130 max VUs, 1m10s max duration (incl. graceful stop):
           * default: Up to 130 looping VUs for 40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m42.7s), 000/130 VUs, 529 complete and 0 interrupted iterations
default ✓ [======================================] 000/130 VUs  40s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find Paths
     ✓ find Favorite Paths

     checks.........................: 100.00% ✓ 2116      ✗ 0    
     data_received..................: 2.8 MB  65 kB/s
     data_sent......................: 647 kB  15 kB/s
     http_req_blocked...............: avg=4.86ms  min=1µs    med=3µs   max=411.4ms  p(90)=9µs    p(95)=19.73ms 
     http_req_connecting............: avg=1.64ms  min=0s     med=0s    max=174.41ms p(90)=0s     p(95)=5.26ms  
   ✓ http_req_duration..............: avg=1.82s   min=7.63ms med=1.82s max=5.65s    p(90)=3.07s  p(95)=3.45s   
       { expected_response:true }...: avg=1.82s   min=7.63ms med=1.82s max=5.65s    p(90)=3.07s  p(95)=3.45s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 2116 
     http_req_receiving.............: avg=68.68µs min=19µs   med=56µs  max=1.62ms   p(90)=110µs  p(95)=142.25µs
     http_req_sending...............: avg=27.04µs min=7µs    med=19µs  max=1.99ms   p(90)=47µs   p(95)=66µs    
     http_req_tls_handshaking.......: avg=3.21ms  min=0s     med=0s    max=295.76ms p(90)=0s     p(95)=13.36ms 
     http_req_waiting...............: avg=1.82s   min=7.49ms med=1.82s max=5.65s    p(90)=3.07s  p(95)=3.45s   
     http_reqs......................: 2116    49.601284/s
     iteration_duration.............: avg=8.34s   min=1.4s   med=9.51s max=12.83s   p(90)=10.81s p(95)=11.36s  
     iterations.....................: 529     12.400321/s
     vus............................: 29      min=13      max=130
     vus_max........................: 130     min=130     max=130
```
- stress
    - script
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 200 },
    { duration: '30s', target: 200 },
    { duration: '15s', target: 240 },
    { duration: '30s', target: 240 },
    { duration: '10s', target: 0 }, 
  ],
  thresholds: {
    http_req_duration: ['p(90)<10000','p(95)<15000','p(99)<30000'],
  },
};

const BASE_URL = 'https://ascii92der.n-e.kr';
const USERNAME = 'ascii92der@gmail.com';
const PASSWORD = '1234';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
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


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects1 = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  let myObjects2 = http.get(`${BASE_URL}/paths?source=1&target=3`, authHeaders).json();
  let myObjects3 = http.get(`${BASE_URL}/favorites`, authHeaders).json();
  check(myObjects1, { 'retrieved member': (obj) => obj.id != 0 });
  check(myObjects2, { 'find Paths': (obj) => obj.stations != null});
  check(myObjects3, { 'find Favorite Paths': (obj) => obj.size != 0});
  sleep(1);
};
```
- 결과
```shell

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 240 max VUs, 2m55s max duration (incl. graceful stop):
           * default: Up to 240 looping VUs for 2m25s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0118] Request Failed                                error="Post \"https://ascii92der.n-e.kr/login/token\": EOF"
ERRO[0118] invalid type <nil>, expected string, []byte or ArrayBuffer
running at reflect.methodValueCall (native)
default at loggedInSuccessfully (file:///Users/ascii92der/WooTeCam_Pro2/stress.js:40:85(4))
	at go.k6.io/k6/js/common.Bind.func1 (native)
	at file:///Users/ascii92der/WooTeCam_Pro2/stress.js:39:27(34)  executor=ramping-vus scenario=default source=stacktrace

running (2m36.3s), 000/240 VUs, 1503 complete and 0 interrupted iterations
default ✓ [======================================] 000/240 VUs  2m25s

     ✗ logged in successfully
      ↳  99% — ✓ 1502 / ✗ 1
     ✓ retrieved member
     ✓ find Paths
     ✓ find Favorite Paths

     checks.........................: 99.98% ✓ 6008      ✗ 1    
     data_received..................: 7.3 MB 47 kB/s
     data_sent......................: 1.8 MB 12 kB/s
     http_req_blocked...............: avg=39.25ms  min=1µs      med=3µs   max=1.35s    p(90)=6µs    p(95)=17µs   
     http_req_connecting............: avg=12.86ms  min=0s       med=0s    max=472.79ms p(90)=0s     p(95)=0s     
   ✓ http_req_duration..............: avg=4.04s    min=30.79ms  med=3.32s max=14.53s   p(90)=8.65s  p(95)=10.05s 
       { expected_response:true }...: avg=4.04s    min=30.79ms  med=3.32s max=14.53s   p(90)=8.65s  p(95)=10.05s 
     http_req_failed................: 0.01%  ✓ 1         ✗ 6008 
     http_req_receiving.............: avg=53.33µs  min=0s       med=48µs  max=1.43ms   p(90)=84µs   p(95)=104µs  
     http_req_sending...............: avg=461.65µs min=6µs      med=16µs  max=1.33s    p(90)=32µs   p(95)=48.59µs
     http_req_tls_handshaking.......: avg=26.01ms  min=0s       med=0s    max=949.62ms p(90)=0s     p(95)=0s     
     http_req_waiting...............: avg=4.04s    min=30.65ms  med=3.31s max=14.53s   p(90)=8.65s  p(95)=10.05s 
     http_reqs......................: 6009   38.434583/s
     iteration_duration.............: avg=17.32s   min=337.94ms med=18.1s max=35.3s    p(90)=23.18s p(95)=24.15s 
     iterations.....................: 1503   9.613443/s
     vus............................: 8      min=7       max=240
     vus_max........................: 240    min=240     max=240


```