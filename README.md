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
   * public (3.35.221.168 , https://cupeanimus.r-e.kr/)
      * front : /home/ubuntu/logs/web.log
      * back(logback) :  /home/ubuntu/logs/subway.log
      * back(logback) :  /home/ubuntu/logs/json.log
      * back(nohup) :  /home/ubuntu/logs/nohup.log
      * nginx : /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=cupeanimus-dashboard
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

    항목 | 현재 | 목표 | 최종 | 배민
    --- | --- | --- | --- | ---
   First Contentful |  14.8s | 3s | ㅁ | 2.5
   Speed Index |  14.8s | 10s | ㅁ | 8.6
   Largest Contentful Paint |  15.4s | 5s | ㅁ | 4.2
   Time to Interactive |  15.42 | 5s | ㅁ | 4.5 
   Total Blocking Time |  0.55s | 0.5s | ㅁ | 0.28s 
   Cumulative Layout Shift |  0.041s | 0.5s | ㅁ | 0.066 


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
 - gzip을 사용하여 데이터 압축 
 - 사용하지 않는 자바스크립트 줄이기 (/js/vendors.js, /js/main.js)
 - 렌더링 리소스 제거하기
 - cache를 사용하여 초기 응답 시간 단축
 - 사용하지 않는 css줄이기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 500명이 30초동안 접속
    - 테스트 범위 : API 테스트
    - 시나리오 
        - 로그인 하기
        - 내 정보 확인
        - 역 조회
        - 노선 조회
        - 경로 조회
    

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   
- Smoke


    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    export let options = {
    vus: 1, 
    duration: '10s',
    
        thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        },
    };
    
    const BASE_URL = 'https://cupeanimus.r-e.kr';
    const USERNAME = 'cupeanimus@naver.com';
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
    
        //login 요청
        let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    
        check(loginRes, {
            'logged in successfully': (resp) => resp.json('accessToken') !== '',
        });
    
    
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        //정보확인
        let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
        check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    
        //역 조회
        let stationObjects = http.get(`${BASE_URL}/stations`, authHeaders).json();
    
        //노선 조회
        let lineObjects = http.get(`${BASE_URL}/lines`, authHeaders).json();
    
        //경로 조회
        let pathObjects = http.get(`${BASE_URL}/paths/?source=1&target=4`, authHeaders).json();
    
    
        sleep(1);
    }

---

     execution: local
     script: smoke.js
     output: -
     
     scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
     * default: 1 looping VUs for 10s (gracefulStop: 30s)
      
     running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
     default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0  
     data_received..................: 46 kB   4.4 kB/s
     data_sent......................: 15 kB   1.4 kB/s
     http_req_blocked...............: avg=973.23µs min=4.19µs  med=4.7µs   max=48.4ms   p(90)=7.72µs  p(95)=7.99µs 
     http_req_connecting............: avg=10.63µs  min=0s      med=0s      max=531.55µs p(90)=0s      p(95)=0s     
     ✓ http_req_duration..............: avg=6.43ms   min=4.51ms  med=5.71ms  max=12.77ms  p(90)=8.32ms  p(95)=9.15ms
     { expected_response:true }...: avg=6.21ms   min=4.51ms  med=5.63ms  max=9.57ms   p(90)=8.23ms  p(95)=8.43ms
     http_req_failed................: 20.00%  ✓ 10       ✗ 40
     http_req_receiving.............: avg=60.31µs  min=41.23µs med=58.23µs max=116.67µs p(90)=77.64µs p(95)=80.45µs
     http_req_sending...............: avg=20.82µs  min=12.43µs med=15.06µs max=142.35µs p(90)=30.88µs p(95)=36.42µs
     http_req_tls_handshaking.......: avg=778.98µs min=0s      med=0s      max=38.94ms  p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=6.35ms   min=4.42ms  med=5.63ms  max=12.69ms  p(90)=8.25ms  p(95)=8.96ms
     http_reqs......................: 50      4.813851/s
     iteration_duration.............: avg=1.03s    min=1.03s   med=1.03s   max=1.08s    p(90)=1.04s   p(95)=1.06s  
     iterations.....................: 10      0.96277/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
---
- load


    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    export let options = {
    stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '10s', target: 150 },
    { duration: '30s', target: 50 },
    ],
    thresholds: {
    http_req_duration: ['p(95)<1500'], // 95% of requests must complete below 1.5s
    'logged in successfully': ['p(95)<1500'], // 95% of requests must complete below 1.5s
    },
    };
    
    const BASE_URL = 'https://cupeanimus.r-e.kr';
    const USERNAME = 'cupeanimus@naver.com';
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
    
        //login 요청
        let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    
        check(loginRes, {
            'logged in successfully': (resp) => resp.json('accessToken') !== '',
        });
    
    
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        //정보확인
        let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
        check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    
        //역 조회
        let stationObjects = http.get(`${BASE_URL}/stations`, authHeaders).json();
    
        //노선 조회
        let lineObjects = http.get(`${BASE_URL}/lines`, authHeaders).json();
    
        //경로 조회
        let pathObjects = http.get(`${BASE_URL}/paths/?source=1&target=4`, authHeaders).json();
    
    
        sleep(1);
    }

---
    execution: local
    script: load.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 150 max VUs, 4m10s max duration (incl. graceful stop):
    * default: Up to 150 looping VUs for 3m40s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)
    
    
    running (3m41.0s), 000/150 VUs, 14248 complete and 0 interrupted iterations
    default ✓ [======================================] 000/150 VUs  3m40s
    
         ✓ logged in successfully
         ✓ retrieved member
    
         checks.........................: 100.00% ✓ 28496      ✗ 0    
         data_received..................: 59 MB   268 kB/s
         data_sent......................: 20 MB   92 kB/s
         http_req_blocked...............: avg=30.75µs  min=3.1µs   med=4.6µs   max=58.46ms p(90)=6.89µs   p(95)=11.2µs  
         http_req_connecting............: avg=2.56µs   min=0s      med=0s      max=15.92ms p(90)=0s       p(95)=0s      
    ✓ http_req_duration..............: avg=6.98ms   min=2.81ms  med=5.65ms  max=93.56ms p(90)=11.3ms   p(95)=15ms    
    { expected_response:true }...: avg=6.9ms    min=2.81ms  med=5.59ms  max=93.56ms p(90)=11.27ms  p(95)=14.94ms
    http_req_failed................: 20.00%  ✓ 14248      ✗ 56992
    http_req_receiving.............: avg=111.32µs min=21.63µs med=46.77µs max=43.33ms p(90)=118.24µs p(95)=303.87µs
    http_req_sending...............: avg=61.72µs  min=8.49µs  med=14.7µs  max=54.28ms p(90)=40.69µs  p(95)=131.26µs
    http_req_tls_handshaking.......: avg=12.89µs  min=0s      med=0s      max=46.94ms p(90)=0s       p(95)=0s      
    http_req_waiting...............: avg=6.81ms   min=2.73ms  med=5.54ms  max=93.49ms p(90)=11.01ms  p(95)=14.57ms
    http_reqs......................: 71240   322.326426/s
    iteration_duration.............: avg=1.03s    min=1.01s   med=1.03s   max=1.19s   p(90)=1.05s    p(95)=1.07s   
    iterations.....................: 14248   64.465285/s
    vus............................: 4       min=1        max=149
    vus_max........................: 150     min=150      max=150
---
- Stress


    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    export let options = {
    stages: [
    { duration: '1m', target: 100 },
    { duration: '20s', target: 300 },
    { duration: '10s', target: 400 },
    { duration: '30s', target: 300 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 500 },
    { duration: '10s', target: 0 },
    ],
    thresholds: {
    http_req_duration: ['p(90)<1500','p(95)<3000'], // 95% of requests must complete below 1.5s
    'logged in successfully': ['p(95)<1500'], // 95% of requests must complete below 1.5s
    },
    };
    
    const BASE_URL = 'https://cupeanimus.r-e.kr';
    const USERNAME = 'cupeanimus@naver.com';
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
    
        //login 요청
        let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    
        check(loginRes, {
            'logged in successfully': (resp) => resp.json('accessToken') !== '',
        });
    
    
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        //정보확인
        let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
        check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    
        //역 조회
        let stationObjects = http.get(`${BASE_URL}/stations`, authHeaders).json();
    
        //노선 조회
        let lineObjects = http.get(`${BASE_URL}/lines`, authHeaders).json();
    
        //경로 조회
        let pathObjects = http.get(`${BASE_URL}/paths/?source=1&target=4`, authHeaders).json();
    
    
        sleep(1);
    }
---
    running (2m30.9s), 000/500 VUs, 19437 complete and 0 interrupted iterations
    default ✓ [======================================] 000/500 VUs  2m30s
    
         ✗ logged in successfully
          ↳  96% — ✓ 18850 / ✗ 587
         ✓ retrieved member
    
         checks.........................: 98.46% ✓ 37700      ✗ 587  
         data_received..................: 90 MB  596 kB/s
         data_sent......................: 28 MB  186 kB/s
         http_req_blocked...............: avg=10.65ms min=0s     med=4.69µs  max=1.2s     p(90)=9.5µs    p(95)=256.28µs
         http_req_connecting............: avg=3.18ms  min=0s     med=0s      max=679.85ms p(90)=0s       p(95)=0s      
    ✓ http_req_duration..............: avg=94.09ms min=0s     med=65.55ms max=1.63s    p(90)=229.69ms p(95)=280.16ms
    { expected_response:true }...: avg=93.78ms min=2.78ms med=64.68ms max=1.63s    p(90)=230.25ms p(95)=280.91ms
    http_req_failed................: 20.49% ✓ 19437      ✗ 75400
    http_req_receiving.............: avg=1.38ms  min=0s     med=40.43µs max=443.2ms  p(90)=487.47µs p(95)=1.46ms  
    http_req_sending...............: avg=2.97ms  min=0s     med=15.58µs max=1.32s    p(90)=419.79µs p(95)=8.82ms  
    http_req_tls_handshaking.......: avg=7.22ms  min=0s     med=0s      max=993.38ms p(90)=0s       p(95)=0s      
    http_req_waiting...............: avg=89.74ms min=0s     med=63.52ms max=1.44s    p(90)=219.11ms p(95)=263.68ms
    http_reqs......................: 94837  628.425164/s
    iteration_duration.............: avg=1.5s    min=1.48ms med=1.39s   max=4.55s    p(90)=2.24s    p(95)=2.56s   
    iterations.....................: 19437  128.796777/s
    vus............................: 20     min=2        max=499
    vus_max........................: 500    min=500      max=500
    
    
