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
- **애플리케이션**
  - /home/ubuntu/logs/file.log
  - /home/ubuntu/logs/json.log
- **NGINX**
  - /var/log/nginx/access.log
  - /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
  - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=seondongpyo-dashboard 

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="1">
   
    - WebPageTest, PageSpeed 에서의 측정 결과를 바탕으로 하여  
      Desktop 환경에서 Timing-based, Rule-based Metric으로 예산을 설정했습니다.
      ![webpagetest_result](https://user-images.githubusercontent.com/64854054/122420720-d9d4ac80-cfc6-11eb-82b8-c7947d0a6d21.png)
      ![pagespeed_result](https://user-images.githubusercontent.com/64854054/122420399-a003a600-cfc6-11eb-97f1-cf8281a17ae2.png)
  
      |항목|기준|
      |---|---|
      |페이지 로드 시간|3초 미만|
      |Time to Interactive (TTI)|2초 미만|
      |First Contentful Paint (FCP)|1.8초 미만|
      |Large Contentful Paint (LCP)|2.5초 미만|
      |Speed Index |3.4초 미만|
      |Total Blocking Time(TBT)|50ms 이하|
      |Cumulative Layout Shift(CLS)|0.1 미만|
    </div>
    </details>


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="2">
   
      - **gzip을 이용한 텍스트 압축 사용**
        ![image](https://user-images.githubusercontent.com/64854054/122421840-a2b2cb00-cfc7-11eb-918a-d40aaa909619.png)

      - **사용하지 않는 자바스크립트 줄이기**
        ![image](https://user-images.githubusercontent.com/64854054/122422446-1d7be600-cfc8-11eb-877f-6463f3c37b3b.png)
        
      - **정적 리소스 캐싱**
        ![image](https://user-images.githubusercontent.com/64854054/122422773-62a01800-cfc8-11eb-98cc-607417db1180.png)
        
    </div>
    </details>


3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="3">
   
      - **테스트 전제조건 정리**
        
        |항목|기준|비고|
        |---|---|---|
        |1일 사용자 수(DAU)|100,000|2017년 기준 '지하철 종결자' MAU 335만 명 / 30일 ≒ 약 10만|
        |1명당 1일 평균 접속 수|5|출·퇴근 및 외근 정도?|
        |1일 총 접속 수|500,000|DAU * 1일 평균 접속 수|        
        |1일 평균 RPS|6|1일 총 접속 수 / 86,400|        
        |1일 최대 RPS|60 |1일 평균 RPS * (최대 트래픽) / 평소 트래픽))|        
        |Latency|50ms |50 ~ 100ms 이하|

      - **시나리오**
    
        |기준|항목|
        |---|---|
        |접속 빈도가 높은 페이지|로그인|
        |데이터를 갱신하는 페이지|회원 정보 수정|
        |데이터를 조회하는데 여러 데이터를 참조하는 페이지|경로 검색|
    </div>
    </details>
  

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="1">

    - **Smoke**
      - 로그인
        -   <details>
            <summary>테스트 스크립트 (접기/펼치기)</summary>
            <div markdown="1">
        
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
            
            const BASE_URL = 'http://seondongpyo.kro.kr';
            const USERNAME = 'abc@gmail.com';
            const PASSWORD = '1234';
            
            var payload = JSON.stringify({
                email: USERNAME,
                password: PASSWORD
            });
            
            var params = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            export default () => {
                let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
                
                check(loginRes, {
                    'HTTP status OK?': (resp) => resp.status === 200,
                    'logged in successfully': (resp) => resp.json('accessToken') !== ''
                });
                            
                let authHeaders = {
                    headers: {
                        Authorization: `Bearer ${loginRes.json('accessToken')}`,
                    },
                };
            
                let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
            
                check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
            
                sleep(1);
            };
            ```
            </div>
            </details>
          
        -   <details>
            <summary>결과 (접기/펼치기)</summary>
            <div markdown="1">

            ```
                    /\      |‾‾| /‾‾/   /‾‾/
               /\  /  \     |  |/  /   /  /
              /  \/    \    |     (   /   ‾‾\
             /          \   |  |\  \ |  (‾)  |
            / __________ \  |__| \__\ \_____/ .io
            
            execution: local
                script: smoke_login.js
                output: -
            
            scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
                    * default: 1 looping VUs for 10s (gracefulStop: 30s)
            
            
            running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
            default ✓ [======================================] 1 VUs  10s
            
                 ✓ HTTP status OK
                 ✓ logged in successfully
                 ✓ retrieved member
            
                 checks.....................: 100.00% ✓ 20  ✗ 0
                 data_received..............: 5.8 kB  576 B/s
                 data_sent..................: 3.3 kB  323 B/s
                 http_req_blocked...........: avg=66.44µs min=4.24µs  med=6.99µs max=1.2ms    p(90)=9.64µs  p(95)=70.23µs
                 http_req_connecting........: avg=20.8µs  min=0s      med=0s     max=416.18µs p(90)=0s      p(95)=20.8µs
               ✓ http_req_duration..........: avg=4.5ms   min=3.36ms  med=4.51ms max=8.7ms    p(90)=5.35ms  p(95)=5.6ms
                 { expected_response:true }...: avg=9.29ms  min=7.84ms  med=8.55ms  max=19.4ms   p(90)=10.58ms  p(95)=11.62ms
                 http_req_failed............: 100.00% ✓ 20  ✗ 0
                 http_req_receiving.........: avg=68.77µs min=48.24µs med=67.7µs max=108.85µs p(90)=83.62µs p(95)=85.65µs
                 http_req_sending...........: avg=28.29µs min=13.34µs med=24.2µs max=113.35µs p(90)=36.43µs p(95)=53.3µs
                 http_req_tls_handshaking...: avg=0s      min=0s      med=0s     max=0s       p(90)=0s      p(95)=0s
                 http_req_waiting...........: avg=4.4ms   min=3.27ms  med=4.43ms max=8.57ms   p(90)=5.26ms  p(95)=5.5ms
                 http_reqs..................: 20      1.979345/s
                 iteration_duration.........: avg=1.01s   min=1s      med=1s     max=1.01s    p(90)=1.01s   p(95)=1.01s
                 iterations.................: 10      0.989672/s
                 vus........................: 1       min=1 max=1
                 vus_max....................: 1       min=1 max=1
            ```
            </div>
            </details>
        
      - 회원 정보 수정
        -   <details>
            <summary>테스트 스크립트 (접기/펼치기)</summary>
            <div markdown="1">
            
            ```js
            import http from 'k6/http';
            import { check, group, sleep, fail } from 'k6';
            
            export let options = {
                vus: 1,
                duration: '10s',
            
                thresholds: {
                    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
                },
            };
            
            const BASE_URL = 'http://seondongpyo.kro.kr';
            const USERNAME = 'abc@gmail.com'
            const PASSWORD = '1234'
            
            var loginPayload = JSON.stringify({
                email: USERNAME,
                password: PASSWORD
            });
            
            var contentTypeHeader = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            export default () => {
                // login
                let loginRes = http.post(`${BASE_URL}/login/token`, loginPayload, contentTypeHeader);
                
                check(loginRes, {
                    'HTTP status OK': (resp) => resp.status === 200,
                    'logged in successfully': (resp) => resp.json('accessToken') !== '',
                });
                
                let authHeaders = {
                    headers: {
                        'Authorization': `Bearer ${loginRes.json('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                };
                
                // edit user info
                let updatePayload = JSON.stringify({
                    email: USERNAME,
                    password: PASSWORD,
                    age: Math.floor(Math.random() * (Math.floor(100) - Math.ceil(1)) + Math.ceil(1)) // random age per request
                });
                
                let updateUserRes = http.put(`${BASE_URL}/members/me`, updatePayload, authHeaders);
                
                check(updateUserRes, {
                    'update successfully': (resp) => resp.status === 200
                });
                
                sleep(1);
            };
            ```
            </div>
            </details>
            
        -   <details>
            <summary>결과 (접기/펼치기)</summary>
            <div markdown="1">
            
            ```
                    /\      |‾‾| /‾‾/   /‾‾/
               /\  /  \     |  |/  /   /  /
              /  \/    \    |     (   /   ‾‾\
             /          \   |  |\  \ |  (‾)  |
            / __________ \  |__| \__\ \_____/ .io
            
            execution: local
                script: smoke_mypage_edit.js
                output: -
            
            scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
                    * default: 1 looping VUs for 10s (gracefulStop: 30s)
            
            
            running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
            default ✓ [======================================] 1 VUs  10s
            
                 ✓ HTTP status OK
                 ✓ logged in successfully
                 ✓ update successfully
            
                 checks.........................: 100.00% ✓ 30  ✗ 0
                 data_received..................: 4.5 kB  439 B/s
                 data_sent......................: 5.5 kB  542 B/s
                 http_req_blocked...............: avg=469.03µs min=4.25µs  med=6.25µs  max=9.25ms   p(90)=10.91µs p(95)=475.5µs
                 http_req_connecting............: avg=26.36µs  min=0s      med=0s      max=527.29µs p(90)=0s      p(95)=26.36µs
               ✓ http_req_duration..............: avg=9.16ms   min=6.45ms  med=9.23ms  max=12.28ms  p(90)=12ms    p(95)=12.15ms
                   { expected_response:true }...: avg=9.16ms   min=6.45ms  med=9.23ms  max=12.28ms  p(90)=12ms    p(95)=12.15ms
                 http_req_failed................: 0.00%   ✓ 0   ✗ 20
                 http_req_receiving.............: avg=67.37µs  min=35.55µs med=62.68µs max=122.73µs p(90)=88.47µs p(95)=107.41µs
                 http_req_sending...............: avg=33.19µs  min=18.97µs med=29.55µs max=103.04µs p(90)=41.03µs p(95)=59.09µs
                 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
                 http_req_waiting...............: avg=9.06ms   min=6.35ms  med=9.12ms  max=12.19ms  p(90)=11.92ms p(95)=12.08ms
                 http_reqs......................: 20      1.95952/s
                 iteration_duration.............: avg=1.02s    min=1.01s   med=1.01s   max=1.03s    p(90)=1.02s   p(95)=1.02s
                 iterations.....................: 10      0.97976/s
                 vus............................: 1       min=1 max=1
                 vus_max........................: 1       min=1 max=1
            ```
            </div>
            </details>
      - 경로 탐색
        -   <details>
            <summary>테스트 스크립트 (접기/펼치기)</summary>
            <div markdown="1">
            
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
            
            const BASE_URL = 'http://seondongpyo.kro.kr';
            const USERNAME = 'abc@gmail.com'
            const PASSWORD = '1234'
            const SOURCE = 1;
            const TARGET = 10;
            
            var payload = JSON.stringify({
                email: USERNAME,
                password: PASSWORD
            });
            
            var contentTypeHeader = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            export default () => {
                let loginRes = http.post(`${BASE_URL}/login/token`, payload, contentTypeHeader);
                
                check(loginRes, {
                    'HTTP status OK': (resp) => resp.status === 200,
                    'logged in successfully': (resp) => resp.json('accessToken') !== ''
                });
                
                let authHeaders = {
                    headers: {
                        'Authorization': `Bearer ${loginRes.json('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                };
                
                let pathRes = http.get(`${BASE_URL}/paths?source=${SOURCE}&target=${TARGET}`);
                
                check(pathRes, {
                    'found path successfully': (resp) => resp.status === 200
                });
                
                sleep(1);
            };
            
            ```
            </div>
            </details>
    
        -   <details>
            <summary>결과 (접기/펼치기)</summary>
            <div markdown="1">
            
            ```
                    /\      |‾‾| /‾‾/   /‾‾/
               /\  /  \     |  |/  /   /  /
              /  \/    \    |     (   /   ‾‾\
             /          \   |  |\  \ |  (‾)  |
            / __________ \  |__| \__\ \_____/ .io
            
            execution: local
                script: smoke_paths.js
                output: -
            
            scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
                    * default: 1 looping VUs for 10s (gracefulStop: 30s)
            
            
            running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
            default ✓ [======================================] 1 VUs  10s
            
                 ✓ HTTP status OK
                 ✓ logged in successfully
                 ✓ found path successfully
            
                 checks.........................: 100.00% ✓ 30  ✗ 0
                 data_received..................: 21 kB   2.0 kB/s
                 data_sent......................: 3.0 kB  285 B/s
                 http_req_blocked...............: avg=533.49µs min=4.57µs  med=6.11µs  max=10.55ms  p(90)=7.61µs   p(95)=535.02µs
                 http_req_connecting............: avg=20.61µs  min=0s      med=0s      max=412.26µs p(90)=0s       p(95)=20.61µs
               ✓ http_req_duration..............: avg=22ms     min=6.15ms  med=21.73ms max=43.1ms   p(90)=38.61ms  p(95)=42.02ms
                   { expected_response:true }...: avg=22ms     min=6.15ms  med=21.73ms max=43.1ms   p(90)=38.61ms  p(95)=42.02ms
                 http_req_failed................: 0.00%   ✓ 0   ✗ 20
                 http_req_receiving.............: avg=81.76µs  min=63.6µs  med=77.6µs  max=117.93µs p(90)=103.63µs p(95)=114.6µs
                 http_req_sending...............: avg=27.65µs  min=13.45µs med=22.8µs  max=96.08µs  p(90)=36.28µs  p(95)=54.68µs
                 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
                 http_req_waiting...............: avg=21.89ms  min=6.05ms  med=21.64ms max=42.97ms  p(90)=38.52ms  p(95)=41.89ms
                 http_reqs......................: 20      1.911561/s
                 iteration_duration.............: avg=1.04s    min=1.04s   med=1.04s   max=1.06s    p(90)=1.05s    p(95)=1.05s
                 iterations.....................: 10      0.95578/s
                 vus............................: 1       min=1 max=1
                 vus_max........................: 1       min=1 max=1
            ```
            </div>
            </details>
    </div>
    </details>
   
    - **Load**
        - **(공통) 부하 테스트 옵션**
            ```js
            export let options = {
                stages: [
                    { duration: '5m', target: 60 }, // 1일 최대 RPS
                    { duration: '10m', target: 60 },
                    { duration: '5m', target: 0 }
                ],
                thresholds: {
                    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
                    // 'logged in successfully': ['p(99)<1500'] // 로그인 시
                    // 'update successfully': ['p(99)<1500'] // 회원 정보 수정 시
                    // 'found path successfully': ['p(99)<1500'] // 경로 탐색 시
                },
            };        
            ```
            
        - 로그인
            -   <details>
                <summary>결과 (접기/펼치기)</summary>
                <div markdown="1">

                ```
                        /\      |‾‾| /‾‾/   /‾‾/
                   /\  /  \     |  |/  /   /  /
                  /  \/    \    |     (   /   ‾‾\
                 /          \   |  |\  \ |  (‾)  |
                / __________ \  |__| \__\ \_____/ .io
                
                execution: local
                    script: load_login.js
                    output: -
                
                scenarios: (100.00%) 1 scenario, 60 max VUs, 20m30s max duration (incl. graceful stop):
                        * default: Up to 60 looping VUs for 20m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                
                
                running (20m00.2s), 00/60 VUs, 53533 complete and 0 interrupted iterations
                default ✓ [======================================] 00/60 VUs  20m0s
                
                     ✓ HTTP status OK
                     ✓ logged in successfully
                     ✓ retrieved member
                
                     checks.........................: 100.00% ✓ 160599 ✗ 0
                     data_received..................: 29 MB   24 kB/s
                     data_sent......................: 24 MB   20 kB/s
                     http_req_blocked...............: avg=15µs    min=3.15µs  med=4.85µs  max=12.77ms p(90)=8.05µs  p(95)=15.63µs
                     http_req_connecting............: avg=890ns   min=0s      med=0s      max=4.23ms  p(90)=0s      p(95)=0s
                   ✓ http_req_duration..............: avg=5.38ms  min=2.81ms  med=4.9ms   max=68.65ms p(90)=7.21ms  p(95)=8.63ms
                       { expected_response:true }...: avg=5.38ms  min=2.81ms  med=4.9ms   max=68.65ms p(90)=7.21ms  p(95)=8.63ms
                     http_req_failed................: 0.00%   ✓ 0      ✗ 107066
                     http_req_receiving.............: avg=90.59µs min=20.03µs med=45.08µs max=10.1ms  p(90)=108µs   p(95)=246.47µs
                     http_req_sending...............: avg=46.6µs  min=8.81µs  med=17.84µs max=12.2ms  p(90)=44.79µs p(95)=106.59µs
                     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
                     http_req_waiting...............: avg=5.24ms  min=2.75ms  med=4.79ms  max=68.56ms p(90)=7ms     p(95)=8.39ms
                     http_reqs......................: 107066  89.207475/s
                     iteration_duration.............: avg=1.01s   min=1s      med=1.01s   max=1.07s   p(90)=1.01s   p(95)=1.01s
                     iterations.....................: 53533   44.603737/s
                     vus............................: 1       min=1    max=60
                     vus_max........................: 60      min=60   max=60
                ```
                </div>
                </details>
        - 회원 정보 수정
            -   <details>
                <summary>결과 (접기/펼치기)</summary>
                <div markdown="1">

                ```
                        /\      |‾‾| /‾‾/   /‾‾/
                   /\  /  \     |  |/  /   /  /
                  /  \/    \    |     (   /   ‾‾\
                 /          \   |  |\  \ |  (‾)  |
                / __________ \  |__| \__\ \_____/ .io
                
                execution: local
                    script: load_mypage_edit.js
                    output: -
                
                scenarios: (100.00%) 1 scenario, 60 max VUs, 20m30s max duration (incl. graceful stop):
                        * default: Up to 60 looping VUs for 20m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                
                
                running (20m00.2s), 00/60 VUs, 53350 complete and 0 interrupted iterations
                default ✓ [======================================] 00/60 VUs  20m0s
                
                     ✓ HTTP status OK
                     ✓ logged in successfully
                     ✓ update successfully
                
                     checks.........................: 100.00% ✓ 160050 ✗ 0
                     data_received..................: 24 MB   20 kB/s
                     data_sent......................: 30 MB   25 kB/s
                     http_req_blocked...............: avg=17.15µs min=2.95µs  med=4.82µs  max=21.63ms p(90)=8.03µs   p(95)=18.19µs
                     http_req_connecting............: avg=897ns   min=0s      med=0s      max=4.82ms  p(90)=0s       p(95)=0s
                   ✓ http_req_duration..............: avg=6.96ms  min=2.83ms  med=6.92ms  max=85.79ms p(90)=10.34ms  p(95)=11.91ms
                       { expected_response:true }...: avg=6.96ms  min=2.83ms  med=6.92ms  max=85.79ms p(90)=10.34ms  p(95)=11.91ms
                     http_req_failed................: 0.00%   ✓ 0      ✗ 106700
                     http_req_receiving.............: avg=92.57µs min=13.06µs med=38.78µs max=19.77ms p(90)=108.15µs p(95)=263.31µs
                     http_req_sending...............: avg=63.21µs min=10.48µs med=18.72µs max=49.3ms  p(90)=53.92µs  p(95)=169.3µs
                     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
                     http_req_waiting...............: avg=6.81ms  min=2.77ms  med=6.79ms  max=79.59ms p(90)=10.15ms  p(95)=11.66ms
                     http_reqs......................: 106700  88.904457/s
                     iteration_duration.............: avg=1.01s   min=1s      med=1.01s   max=1.11s   p(90)=1.02s    p(95)=1.02s
                     iterations.....................: 53350   44.452228/s
                     vus............................: 1       min=1    max=60
                     vus_max........................: 60      min=60   max=60
                ```
                </div>
                </details>
        - 경로 탐색
            -   <details>
                <summary>결과 (접기/펼치기)</summary>
                <div markdown="1">

                ```
                        /\      |‾‾| /‾‾/   /‾‾/
                   /\  /  \     |  |/  /   /  /
                  /  \/    \    |     (   /   ‾‾\
                 /          \   |  |\  \ |  (‾)  |
                / __________ \  |__| \__\ \_____/ .io
                
                execution: local
                    script: load_paths.js
                    output: -
                
                scenarios: (100.00%) 1 scenario, 60 max VUs, 20m30s max duration (incl. graceful stop):
                        * default: Up to 60 looping VUs for 20m0s over 3 stages (gracefulRampDown: 30s, gracefulS                                                                                                                                         top: 30s)
                                
                running (20m00.4s), 00/60 VUs, 50241 complete and 0 interrupted iterations
                default ✓ [======================================] 00/60 VUs  20m0s
                
                     ✓ HTTP status OK
                     ✓ logged in successfully
                     ✓ found path successfully
                
                     checks.........................: 100.00% ✓ 150723 ✗ 0
                     data_received..................: 107 MB  89 kB/s
                     data_sent......................: 15 MB   12 kB/s
                     http_req_blocked...............: avg=11.11µs min=3.2µs  med=4.93µs  max=24.58ms  p(90)=7.72µs                                                                                                                                            p(95)=9.59µs
                     http_req_connecting............: avg=748ns   min=0s     med=0s      max=3.61ms   p(90)=0s                                                                                                                                                p(95)=0s
                   ✓ http_req_duration..............: avg=38.54ms min=2.88ms med=29.45ms max=341.47ms p(90)=97.43ms                                                                                                                                           p(95)=113.52ms
                       { expected_response:true }...: avg=38.54ms min=2.88ms med=29.45ms max=341.47ms p(90)=97.43ms                                                                                                                                           p(95)=113.52ms
                     http_req_failed................: 0.00%   ✓ 0      ✗ 100482
                     http_req_receiving.............: avg=81.03µs min=22µs   med=55.15µs max=51.83ms  p(90)=109.92µs                                                                                                                                          p(95)=142.06µs
                     http_req_sending...............: avg=34.79µs min=8.72µs med=17.43µs max=47.2ms   p(90)=36.19µs                                                                                                                                           p(95)=48.44µs
                     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s                                                                                                                                                p(95)=0s
                     http_req_waiting...............: avg=38.43ms min=2.82ms med=29.34ms max=341.41ms p(90)=97.31ms                                                                                                                                           p(95)=113.38ms
                     http_reqs......................: 100482  83.705459/s
                     iteration_duration.............: avg=1.07s   min=1.03s  med=1.07s   max=1.39s    p(90)=1.12s                                                                                                                                             p(95)=1.13s
                     iterations.....................: 50241   41.852729/s
                     vus............................: 1       min=1    max=60
                     vus_max........................: 60      min=60   max=60
                ```
                </div>
                </details>

   - **Stress**
       - **(공통) 부하 테스트 옵션**
           ```js
           export let options = {
               stages: [
                   { duration: '1m', target: 100 },
                   { duration: '2m', target: 100 },
                   { duration: '1m', target: 200 },
                   { duration: '2m', target: 200 },
                   { duration: '1m', target: 400 },
                   { duration: '2m', target: 400 },
                   { duration: '1m', target: 600 },
                   { duration: '2m', target: 600 },
                   { duration: '1m', target: 800 },
                   { duration: '2m', target: 800 },
                   { duration: '5m', target: 0 },
               ],
               thresholds: {
                   http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
                   // 'logged in successfully': ['p(99)<1500'] // 로그인 시
                   // 'update successfully': ['p(99)<1500'] // 회원 정보 수정 시
                   // 'found path successfully': ['p(99)<1500'] // 경로 탐색 시
               },
           };        
           ```

       - 로그인
           -   <details>
               <summary>결과 (접기/펼치기)</summary>
               <div markdown="1">
               
               ```
               running (15m00.9s), 000/800 VUs, 275787 complete and 0 interrupted iterations
               default ✓ [======================================] 000/800 VUs  15m0s
                
                     ✗ HTTP status OK
                      ↳  98% — ✓ 271263 / ✗ 4524
                     ✗ logged in successfully
                      ↳  98% — ✓ 271263 / ✗ 4524
                     ✓ retrieved member
                
                     checks.........................: 98.90% ✓ 813617 ✗ 9048
                     data_received..................: 147 MB 163 kB/s
                     data_sent......................: 123 MB 136 kB/s
                     http_req_blocked...............: avg=17.75ms  min=2.9µs    med=5.18µs  max=593.2ms  p(90)=67.9ms   p(95)=116.6ms
                     http_req_connecting............: avg=16.06ms  min=0s       med=0s      max=506.04ms p(90)=61.12ms  p(95)=107.06ms
                   ✓ http_req_duration..............: avg=64.77ms  min=0s       med=31.79ms max=1.72s    p(90)=170.3ms  p(95)=221.41ms
                       { expected_response:true }...: avg=64.86ms  min=2.69ms   med=31.91ms max=1.72s    p(90)=170.37ms p(95)=221.41ms
                     http_req_failed................: 0.85%  ✓ 4696   ✗ 542354
                     http_req_receiving.............: avg=726.38µs min=0s       med=34.12µs max=324.31ms p(90)=270.6µs  p(95)=883.85µs
                     http_req_sending...............: avg=6.36ms   min=0s       med=19.2µs  max=741.47ms p(90)=18.21ms  p(95)=38.74ms
                     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s
                     http_req_waiting...............: avg=57.67ms  min=0s       med=29.02ms max=1.72s    p(90)=150.67ms p(95)=195.7ms
                     http_reqs......................: 547050 607.246713/s
                     iteration_duration.............: avg=1.17s    min=576.18µs med=1.08s   max=3.95s    p(90)=1.5s     p(95)=1.62s
                     iterations.....................: 275787 306.134264/s
                     vus............................: 2      min=1    max=800
                     vus_max........................: 800    min=800  max=800
               ``` 
               </div>
               </details>
       - 회원 정보 수정
           -   <details>
               <summary>결과 (접기/펼치기)</summary>
               <div markdown="1">

               ```
               running (15m00.7s), 000/800 VUs, 270948 complete and 0 interrupted iterations
               default ✓ [======================================] 000/800 VUs  15m0s
               
                    ✗ HTTP status OK
                     ↳  97% — ✓ 264451 / ✗ 6497
                    ✗ logged in successfully
                     ↳  97% — ✓ 264451 / ✗ 6497
                    ✗ update successfully
                     ↳  99% — ✓ 262890 / ✗ 1561
               
                    checks.........................: 98.19% ✓ 791792 ✗ 14555
                    data_received..................: 119 MB 132 kB/s
                    data_sent......................: 147 MB 163 kB/s
                    http_req_blocked...............: avg=17.79ms  min=2.93µs   med=5.13µs  max=620.4ms  p(90)=68.38ms  p(95)=114.89ms
                    http_req_connecting............: avg=16.34ms  min=0s       med=0s      max=564.84ms p(90)=63.32ms  p(95)=106.96ms
                  ✓ http_req_duration..............: avg=78.52ms  min=0s       med=46.11ms max=1.5s     p(90)=193.53ms p(95)=245.51ms
                      { expected_response:true }...: avg=78.62ms  min=2.72ms   med=46.03ms max=1.5s     p(90)=193.71ms p(95)=245.86ms
                    http_req_failed................: 1.50%  ✓ 8058   ✗ 527341
                    http_req_receiving.............: avg=721.89µs min=0s       med=31.48µs max=319.19ms p(90)=244.16µs p(95)=898.53µs
                    http_req_sending...............: avg=6.19ms   min=0s       med=22.66µs max=486.04ms p(90)=20.06ms  p(95)=40.02ms
                    http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s
                    http_req_waiting...............: avg=71.6ms   min=0s       med=42.02ms max=1.5s     p(90)=174.54ms p(95)=221.97ms
                    http_reqs......................: 535399 594.394719/s
                    iteration_duration.............: avg=1.19s    min=594.92µs med=1.12s   max=3.05s    p(90)=1.53s    p(95)=1.65s
                    iterations.....................: 270948 300.803812/s
                    vus............................: 3      min=1    max=800
                    vus_max........................: 800    min=800  max=800
               ```
               </div>
               </details>
       - 경로 탐색
           -   <details>
               <summary>결과 (접기/펼치기)</summary>
               <div markdown="1">
               
               ```
               running (15m00.6s), 000/800 VUs, 310553 complete and 0 interrupted iterations
               default ✓ [======================================] 000/800 VUs  15m0s
               
                   ✗ HTTP status OK
                   ↳  29% — ✓ 92204 / ✗ 218349
                   ✗ logged in successfully
                   ↳  29% — ✓ 92204 / ✗ 218349
                   ✗ found path successfully
                   ↳  85% — ✓ 78804 / ✗ 13400
                   
                   checks.........................: 36.90% ✓ 263212 ✗ 450098
                   data_received..................: 172 MB 191 kB/s
                   data_sent......................: 33 MB  37 kB/s
                   http_req_blocked...............: avg=24.29ms  min=3.17µs   med=3.03ms   max=1.21s    p(90)=65.66ms  p(95)=114.86ms
                   http_req_connecting............: avg=22.04ms  min=0s       med=2.59ms   max=968.57ms p(90)=61.22ms  p(95)=105.79ms
                 ✗ http_req_duration..............: avg=341.13ms min=0s       med=6.56ms   max=7.6s     p(90)=1.27s    p(95)=1.48s
                     { expected_response:true }...: avg=793.23ms min=2.7ms    med=693.22ms max=7.6s     p(90)=1.54s    p(95)=2.1s
                   http_req_failed................: 57.54% ✓ 231749 ✗ 171008
                   http_req_receiving.............: avg=1.4ms    min=0s       med=0s       max=629.94ms p(90)=167.31µs p(95)=1.9ms
                   http_req_sending...............: avg=4.84ms   min=0s       med=41.25µs  max=1.14s    p(90)=8.17ms   p(95)=24.73ms
                   http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
                   http_req_waiting...............: avg=334.89ms min=0s       med=429.43µs max=7.6s     p(90)=1.26s    p(95)=1.47s
                   http_reqs......................: 402757 447.223832/s
                   iteration_duration.............: avg=935.41ms min=841.01µs med=283.65ms max=10.3s    p(90)=3.02s    p(95)=3.67s
                   iterations.....................: 310553 344.839948/s
                   vus............................: 2      min=1    max=800
                   vus_max........................: 800    min=800  max=800
               ```
               </div>
               </details>