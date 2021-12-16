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
   - SYSLOG         : /var/log/syslog
   - NGINX'S ACCESS : /var/log/nginx/access.log
   - NGINX'S ERROR  : /var/log/nginx/error.log
   - APPLICATION    : /home/ubuntu/program/infra-subway-monitoring/log/file.log /home/ubuntu/program/infra-subway-monitoring/log/YYYYMMDD.log


2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-changsubkwak

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요    
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="1">
   
    - 경쟁사와 비교하여 비슷한 수준으로 맞추는 것을 생각하고 진행하였습니다.

    - 경쟁사 : 네이버 지하철(https://m.map.naver.com/subway/subwayLine.naver?region=1000)     
      
    - 나의 회사 : RUNNINGMAP 지하철(http://3.36.72.116:8888/)    
   
    - Quantity Based Metric
      |  | 네이버 | RUNNINGMAP |   
      |:--:|:--:|:--:|   
      | 이미지 최대 크기 (Bytes)  | 286,345 | 4,954 |   
      | 웹 글꼴 최대 크기 (Bytes) | 0 | 128,892 |      
      | 글꼴 최대 갯수  | 0 | 10 |   
      | 스크립트 최대 크기(Bytes) | 252,756 | 2,352,130 |   
      | 스크립트 최대 갯수  | 12 | 2 |   

    - Timing based Metric    
      |  | WebPageTest - 네이버 | PageSpeed - 네이버 | WebPageTest - RUNNINGMAP | PageSpeed - RUNNINGMAP |    
      |:--:|:--:|:--:|:--:|:--:|    
      | First Contentful Paint  | 0.679s | 0.5s | 4.501s| 2.7s |    
      | Time to Interactive  | - | 1.2s | - | 2.8s |    
      | Speed Index | 2.357s | 2.5s | 4.521s | 2.7s |    
      | Total Blocking Time | 0.003s | 30ms | 0.000s | 70ms |         
      | Largest Contentful Paint | 2.818s | 1.6s | 4.561s | 2.8s |    
      | Cumulative Layout Shift | 0.041 | 0.006 | 0.004 | 0.003 |    

    - Rule based Metric    
      |  | 네이버 | RUNNINGMAP |    
      |:--:|:--:|:--:|    
      | First Byte Time | A | A |    
      | Keep-alive Enabled | A | A |    
      | Compress Transfer | A | F |    
      | Compress Images | A | A |    
      | Cache static content | C | C |    
      | Effective use of CDN | X | X |
    </div>
    </details>


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="2">
    - 텍스트 압축(application/javascript,text/css)압축 (application.properties에 다음 항목 추가)
      - server.compression.enabled=true
      - server.compression.mime-types=application/javascript,text/css
    - 렌더링 차단 리소스 제거 (index.html 파일 변경)
      - AS-IS : `<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" />` 
      - TO-BE : `<link rel="preload" as="style" onload="this.rel='stylesheet'" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" />`
    - 정적 자원 캐시 사용하기 (application.properties에 다음 항목 추가)    
      - spring.web.resources.cache.cachecontrol.max-age=365d
    </div>
    </details>


3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="3">
   - 전제 조건    
     - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
     - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
     - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
   - 계산 결과    
     - 2021.04.20 기사 기준 지하철 이용자수 일평균 565만명 (https://www.edaily.co.kr/news/read?newsId=01170966629018088&mediaCodeNo=257)
     - 지하철 웹(앱)서비스를 이용하는 대상을 일반시민의 40%라고 가정(40%는 직장인 또는 학생으로 추정) (https://news.seoul.go.kr/traffic/archives/36446)
     - 일평균 이용자수는 지하철 이용자 수 중 직장인과 학생으로 한정하고 그중에서 80% 사용한다고 가정
       - 5,650,000 * 0.4 * 0.8 = `1,808,000` 명임
     - 일인당 평균 접속 수를 2회라고 한다면 1일 총 접속수는 2 * 1,808,000 = `3,616,000` 회임
     - 1일 평균 rps: 3,616,000 / 86,400 = 62.7 = `41`rps 
     - 최대 트래픽 / 평소 트래픽 : 1.5
       - 모든 계산은 일반시민을 기준으로 계산하였음 
       - 지하철 서비스를 이용하는 대상을 정하기 위해 참조한 URL에서 `시간대열 이용 현황`그래프를 이용하여 계산
       - 5시 ~ 23시까지를 지하철 사용 시간 대역으로 본다면, 20시간동안 100%로 볼 수 있으며, 1시간을 5%로 볼 수 있음
       - 7시 ~ 9시 대역이 최대 트래픽이라고 가정할 경우, 해당 시간대 평균이 7.6%이며 이는 평소(5%)보다 1.5배의 트래픽을 가짐 
     - 1일 최대 rps: 63 * 10 = `60`rps
     - Latency: 1500ms
    </div>
    </details>


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - smoke 테스트(로그인, 나의 정보 찾기, 라인 찾기, 최소경로 찾기)
     -   <details>
           <summary>테스트 스크립트(접기/펼치기)</summary>
           <div markdown="1">
    
           ```js
           import http from 'k6/http';
           import { check, group, sleep, fail } from 'k6';
           
           export let options = {
             vus: 2, // 1 user looping for 1 minute
             duration: '30s',
             thresholds: {
               http_req_duration: ['p(99) < 1500'], // 99% of requests must complete below 1.5s
             },
           };
           
           const BASE_URL = 'http://3.36.72.116:8888';
           const USERNAME = 'a@a';
           const PASSWORD = 'a';
           
           export default function() {
             const line_number = 1;
             const source = 1;
             const target = 2;
             const source_to_target_distance = 23;
             const loginRes = attempt_login();
           
             verify_login(loginRes);
             verify_find_me(find_me(loginRes));
             verify_find_line(find_line(loginRes, line_number), line_number);
             verify_find_paths(find_paths(loginRes, source, target), source_to_target_distance);
             sleep(1);
           }
           
           export function attempt_login() {
             var payload = JSON.stringify({
               email: USERNAME,
               password: PASSWORD,
             });
              
             var params = {
               headers: {
                 'Content-Type': 'application/json',
               },
             };
           
             return http.post(`${BASE_URL}/login/token`, payload, params);
           }
           
           export function verify_login(loginRes) {
             check(loginRes, {
               'logged in successfully': (resp) => resp.json('accessToken') !== '',
             });
           }
           
           export function find_me(loginRes) {
             let authHeaders = {
               headers: {
           	  Authorization: `Bearer ${loginRes.json('accessToken')}`,
               },
             };
           
             return http.get(`${BASE_URL}/members/me`, authHeaders).json();
           }
           
           export function verify_find_me(myObjects) {
             check(myObjects, { 'found member': (obj) => obj.id != 0 });
           }
           
           export function find_line(loginRes, lineNumber) {
             let authHeaders = {
               headers: {
                 Authorization: `Bearer ${loginRes.json('accessToken')}`,
               },
             };
           
             return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
           }
           
           export function verify_find_line(lineRes, expected) {
             check(lineRes, {
               'found line': (resp) => resp['id'] == expected,
             });
           }
           
           export function find_paths(loginRes, source, target) {
             let authHeaders = {
               headers: {
                 Authorization: `Bearer ${loginRes.json('accessToken')}`,
               },
             };
           
             return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
           }
           
           export function verify_find_paths(pathsRes, excepted) {
             check(pathsRes, {
               'found path': (resp) => resp['distance'] == excepted,
             });
           }
           ```
           </div>
           </details>

     -   <details>
         <summary>결과(접기/펼치기)</summary>
         <div markdown="1">
         
         ```text
         
                   /\      |‾‾| /‾‾/   /‾‾/   
              /\  /  \     |  |/  /   /  /    
             /  \/    \    |     (   /   ‾‾\  
            /          \   |  |\  \ |  (‾)  | 
           / __________ \  |__| \__\ \_____/ .io
         
           execution: local
              script: smoke.js
              output: -
         
           scenarios: (100.00%) 1 scenario, 2 max VUs, 1m0s max duration (incl. graceful stop):
                    * default: 2 looping VUs for 30s (gracefulStop: 30s)
         
         
         running (0m31.0s), 0/2 VUs, 54 complete and 0 interrupted iterations
         default ✓ [======================================] 2 VUs  30s
         
              ✓ logged in successfully
              ✓ found member
              ✓ found line
              ✓ found path
         
              checks.........................: 100.00% ✓ 216      ✗ 0  
              data_received..................: 577 kB  19 kB/s
              data_sent......................: 50 kB   1.6 kB/s
              http_req_blocked...............: avg=15.62µs min=3.96µs  med=4.98µs  max=655.58µs p(90)=7.29µs  p(95)=7.76µs 
              http_req_connecting............: avg=8.82µs  min=0s      med=0s      max=568.72µs p(90)=0s      p(95)=0s     
            ✓ http_req_duration..............: avg=36.61ms min=4.86ms  med=13.91ms max=629.66ms p(90)=72.71ms p(95)=87.67ms
                { expected_response:true }...: avg=36.61ms min=4.86ms  med=13.91ms max=629.66ms p(90)=72.71ms p(95)=87.67ms
              http_req_failed................: 0.00%   ✓ 0        ✗ 216
              http_req_receiving.............: avg=1.2ms   min=29.75µs med=724.4µs max=11.28ms  p(90)=2.67ms  p(95)=4.22ms 
              http_req_sending...............: avg=20.14µs min=10.57µs med=17.16µs max=107.55µs p(90)=28.94µs p(95)=37.41µs
              http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s     
              http_req_waiting...............: avg=35.39ms min=4.76ms  med=12.98ms max=629.44ms p(90)=72.04ms p(95)=87.13ms
              http_reqs......................: 216     6.965779/s
              iteration_duration.............: avg=1.14s   min=1.07s   med=1.09s   max=2.27s    p(90)=1.16s   p(95)=1.2s   
              iterations.....................: 54      1.741445/s
              vus............................: 1       min=1      max=2
              vus_max........................: 2       min=2      max=2
         
         ```
         </div>
         </details>

   - load 테스트(로그인, 나의 정보 찾기, 라인 찾기, 최소경로 찾기)
     -   <details>
         <summary>테스트 스크립트(접기/펼치기)</summary>
         <div markdown="1">
         
         ```js
         import http from 'k6/http';
         import { check, group, sleep, fail } from 'k6';
         
         export let options = {
           stages: [
             { duration: '5s', target: 205 },
             { duration: '5s', target: 300 },
             { duration: '5s', target: 0 },
           ],
           thresholds: {
             checks: ['rate > 0.95'],
             http_req_duration: ['p(95) < 1500'],
           },
         };
         
         const BASE_URL = 'http://3.36.72.116:8888';
         const USERNAME = 'a@a';
         const PASSWORD = 'a';
         
         export default function() {
           const line_number = 1;
           const source = 1;
           const target = 2;
           const source_to_target_distance = 23;
           const loginRes = attempt_login();
         
           verify_login(loginRes);
           verify_find_me(find_me(loginRes));
           verify_find_line(find_line(loginRes, line_number), line_number);
           verify_find_paths(find_paths(loginRes, source, target), source_to_target_distance);
           sleep(1);
         }
         
         export function attempt_login() {
           var payload = JSON.stringify({
             email: USERNAME,
             password: PASSWORD,
           });
            
           var params = {
             headers: {
               'Content-Type': 'application/json',
             },
           };
         
           return http.post(`${BASE_URL}/login/token`, payload, params);
         }
         
         export function verify_login(loginRes) {
           check(loginRes, {
             'logged in successfully': (resp) => resp.json('accessToken') !== '',
           });
         }
         
         export function find_me(loginRes) {
           let authHeaders = {
             headers: {
         	  Authorization: `Bearer ${loginRes.json('accessToken')}`,
             },
           };
         
           return http.get(`${BASE_URL}/members/me`, authHeaders).json();
         }
         
         export function verify_find_me(myObjects) {
           check(myObjects, { 'found member': (obj) => obj.id != 0 });
         }
         
         export function find_line(loginRes, lineNumber) {
           let authHeaders = {
             headers: {
               Authorization: `Bearer ${loginRes.json('accessToken')}`,
             },
           };
         
           return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
         }
         
         export function verify_find_line(lineRes, expected) {
           check(lineRes, {
             'found line': (resp) => resp['id'] == expected,
           });
         }
         
         export function find_paths(loginRes, source, target) {
           let authHeaders = {
             headers: {
               Authorization: `Bearer ${loginRes.json('accessToken')}`,
             },
           };
         
           return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
         }
         
         export function verify_find_paths(pathsRes, excepted) {
           check(pathsRes, {
             'found path': (resp) => resp['distance'] == excepted,
           });
         }
         ```
         </div>
         </details>
         
     -   <details>
         <summary>결과(접기/펼치기)</summary>
         <div markdown="1">
         
         ```text
         
                   /\      |‾‾| /‾‾/   /‾‾/   
              /\  /  \     |  |/  /   /  /    
             /  \/    \    |     (   /   ‾‾\  
            /          \   |  |\  \ |  (‾)  | 
           / __________ \  |__| \__\ \_____/ .io
         
           execution: local
              script: load.js
              output: -
         
           scenarios: (100.00%) 1 scenario, 300 max VUs, 45s max duration (incl. graceful stop):
                    * default: Up to 300 looping VUs for 15s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
         
         
         running (16.0s), 000/300 VUs, 1074 complete and 0 interrupted iterations
         default ✓ [======================================] 000/300 VUs  15s
         
              ✓ logged in successfully
              ✓ found member
              ✓ found line
              ✓ found path
         
            ✓ checks.........................: 100.00% ✓ 4296       ✗ 0    
              data_received..................: 12 MB   720 kB/s
              data_sent......................: 987 kB  62 kB/s
              http_req_blocked...............: avg=1.35ms   min=3.44µs  med=4.57µs   max=288.58ms p(90)=11.39µs  p(95)=545.1µs 
              http_req_connecting............: avg=1.27ms   min=0s      med=0s       max=220.66ms p(90)=0s       p(95)=456.6µs 
            ✓ http_req_duration..............: avg=449.02ms min=2.79ms  med=456.45ms max=3s       p(90)=804.48ms p(95)=1.17s   
                { expected_response:true }...: avg=449.02ms min=2.79ms  med=456.45ms max=3s       p(90)=804.48ms p(95)=1.17s   
              http_req_failed................: 0.00%   ✓ 0          ✗ 4296 
              http_req_receiving.............: avg=1.94ms   min=21.38µs med=90.27µs  max=148.81ms p(90)=3.12ms   p(95)=9.84ms  
              http_req_sending...............: avg=1.05ms   min=9.67µs  med=15.7µs   max=194.97ms p(90)=71.77µs  p(95)=181.59µs
              http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
              http_req_waiting...............: avg=446.02ms min=2.61ms  med=454.46ms max=3s       p(90)=800.72ms p(95)=1.17s   
              http_reqs......................: 4296    269.257876/s
              iteration_duration.............: avg=2.8s     min=1.04s   med=2.83s    max=6.82s    p(90)=4.28s    p(95)=4.64s   
              iterations.....................: 1074    67.314469/s
              vus............................: 98      min=41       max=299
              vus_max........................: 300     min=300      max=300
         
         ```
         </div>
         </details>

   - stress 테스트(로그인, 나의 정보 찾기, 라인 찾기, 최소경로 찾기)

     -   <details>
         <summary>테스트 스크립트(접기/펼치기)</summary>
         <div markdown="1">

         ```js
         import http from 'k6/http';
         import { check, group, sleep, fail } from 'k6';
         
         export let options = {
           stages: [
             { duration: '10s', target: 100 },
             { duration: '10s', target: 200 },
             { duration: '30s', target: 300 },
             { duration: '20s', target: 400 },
             { duration: '10s', target: 300 },
             { duration: '20s', target: 200 },
             { duration: '30s', target: 100 },
             { duration: '10s', target: 0 },
           ],
           thresholds: {
             checks: ['rate > 0.95'],
             http_req_duration: ['p(95) < 1500'],
           },
         };
         
         const BASE_URL = 'http://3.36.72.116:8888';
         const USERNAME = 'a@a';
         const PASSWORD = 'a';
         
         export default function() {
           const line_number = 1;
           const source = 1;
           const target = 2;
           const source_to_target_distance = 23;
           const loginRes = attempt_login();
         
           verify_login(loginRes);
           verify_find_me(find_me(loginRes));
           verify_find_line(find_line(loginRes, line_number), line_number);
           verify_find_paths(find_paths(loginRes, source, target), source_to_target_distance);
           sleep(1);
         }
         
         export function attempt_login() {
           var payload = JSON.stringify({
             email: USERNAME,
             password: PASSWORD,
           });
            
           var params = {
             headers: {
               'Content-Type': 'application/json',
             },
           };
         
           return http.post(`${BASE_URL}/login/token`, payload, params);
         }
         
         export function verify_login(loginRes) {
           check(loginRes, {
             'logged in successfully': (resp) => resp.json('accessToken') !== '',
           });
         }
         
         export function find_me(loginRes) {
           let authHeaders = {
             headers: {
         	  Authorization: `Bearer ${loginRes.json('accessToken')}`,
             },
           };
         
           return http.get(`${BASE_URL}/members/me`, authHeaders).json();
         }
         
         export function verify_find_me(myObjects) {
           check(myObjects, { 'found member': (obj) => obj.id != 0 });
         }
         
         export function find_line(loginRes, lineNumber) {
           let authHeaders = {
             headers: {
               Authorization: `Bearer ${loginRes.json('accessToken')}`,
             },
           };
         
           return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
         }
         
         export function verify_find_line(lineRes, expected) {
           check(lineRes, {
             'found line': (resp) => resp['id'] == expected,
           });
         }
         
         export function find_paths(loginRes, source, target) {
           let authHeaders = {
             headers: {
               Authorization: `Bearer ${loginRes.json('accessToken')}`,
             },
           };
         
           return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
         }
         
         export function verify_find_paths(pathsRes, excepted) {
           check(pathsRes, {
             'found path': (resp) => resp['distance'] == excepted,
           });
         }
         ```
         </div>
         </details>
      
     -   <details>
         <summary>결과(접기/펼치기)</summary>
         <div markdown="1">
  
          ```text
          
                    /\      |‾‾| /‾‾/   /‾‾/   
               /\  /  \     |  |/  /   /  /    
              /  \/    \    |     (   /   ‾‾\  
             /          \   |  |\  \ |  (‾)  | 
            / __________ \  |__| \__\ \_____/ .io
          
            execution: local
               script: stress.js
               output: -
          
            scenarios: (100.00%) 1 scenario, 400 max VUs, 2m50s max duration (incl. graceful stop):
                     * default: Up to 400 looping VUs for 2m20s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)
          
          
          running (2m20.8s), 000/400 VUs, 10679 complete and 0 interrupted iterations
          default ✓ [======================================] 000/400 VUs  2m20s
          
               ✓ logged in successfully
               ✓ found member
               ✓ found line
               ✓ found path
          
             ✓ checks.........................: 100.00% ✓ 42716      ✗ 0    
               data_received..................: 114 MB  811 kB/s
               data_sent......................: 9.8 MB  70 kB/s
               http_req_blocked...............: avg=124.28µs min=3.23µs  med=4.43µs   max=270.19ms p(90)=6.38µs   p(95)=9.04µs  
               http_req_connecting............: avg=96.32µs  min=0s      med=0s       max=232.31ms p(90)=0s       p(95)=0s      
             ✓ http_req_duration..............: avg=464.52ms min=2.56ms  med=398.65ms max=4.61s    p(90)=911.49ms p(95)=1.24s   
                 { expected_response:true }...: avg=464.52ms min=2.56ms  med=398.65ms max=4.61s    p(90)=911.49ms p(95)=1.24s   
               http_req_failed................: 0.00%   ✓ 0          ✗ 42716
               http_req_receiving.............: avg=1.53ms   min=20.06µs med=89.59µs  max=263.05ms p(90)=2.32ms   p(95)=6.02ms  
               http_req_sending...............: avg=319.04µs min=9.27µs  med=14.73µs  max=233.75ms p(90)=34.23µs  p(95)=126.64µs
               http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
               http_req_waiting...............: avg=462.66ms min=2.45ms  med=396.58ms max=4.61s    p(90)=909.76ms p(95)=1.24s   
               http_reqs......................: 42716   303.349989/s
               iteration_duration.............: avg=2.86s    min=1.04s   med=2.77s    max=8.66s    p(90)=4.52s    p(95)=5.06s   
               iterations.....................: 10679   75.837497/s
               vus............................: 6       min=6        max=400
               vus_max........................: 400     min=400      max=400
          ``` 
          </div>
          </details>

