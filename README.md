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
    - file 로그: log/ (or /etc/nextstep/infra-subway-monitoring/log)
    - json 로그: log/ (or /etc/nextstep/infra-subway-monitoring/log)
    - nginx로그: /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=catsbi-cw

---

### 2단계 - 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

|항목|조건|   
|---|---|   
|페이지로드|3초 미만|
|Time to Interactive|3초 미만|
|First Contentful Paint| 1.8초 미만|
|Largest Contentful Paint|4초 미만|
|Speed Index|5.8초 미만|
|Time Blocking Time|0.6초 미만|

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - 텍스트 압축 : 텍스트 기반 리소스를 압축해서 제공해야 합니다.(ex: venders.js, main.js)
        - application.properties에 다음 내용 추가.<br>
           ````
          server.compression.enabled=true
          server.compression.mime-types=application/json,application/xml,text/html,text/xml,text/plain,application/javascript,text/css
          ````
    - 정적 자원 Cache-Controler 적용
        - application.properties에 다음 내용 추가.<br>
           ````
           spring.web.resources.cache.cachecontrol.max-age=365d
          ````
    - css 로드방식 변경(렌더링 차단 리소스 제거)
        ````
      <link rel="preload" as="style" onload="this.rel='stylesheet'"
              href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" />
      <noscript><link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"></noscript>
      ````
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 테스트 전제조건
        1. 1일 예상 사용자 수 : 170000명 (카카오맵 월간 사용자(530만) / 30)
        2. 1일 사용자 평균 접속 수: 10 회
        3. 1일 총 접속 수 : 1700000 회
        4. 1일 평균 RPS: 20 rps
        5. 최대 트래픽 / 평균 트래픽(가정): 5
        6. 1일 최대 RPS: 100rps
        7. Latency: 100ms
    - 테스트 시나리오
        1. 접속 빈도가 높은 페이지: 메인페이지
        2. 데이터를 갱신하는 페이지: 회원 가입
        3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지: 경로 검색

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - Smoke 테스트
        1. 접속 빈도가 높은 페이지
           - 스크립트
              ````
              import http from 'k6/http';
              import { check, group, sleep, fail } from 'k6';
              
              export let options = {
                  vus: 1,
                  duration: '10s',
                  thresholds: {
                      http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
                  },
              };
              
              const BASE_URL = 'https://catsbi-subway.kro.kr';
              const USERNAME = 'a@a';
              const PASSWORD = '1234';
              
              export default () => {
      
                  let loginRes = http.post(`${BASE_URL}/login/token`, {
                      email: USERNAME,
                      password: PASSWORD,
                  });
              
                  check(loginRes, {
                      'logged in successfully': (resp) => resp.json('accessToken') !== '',
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
              ```` 
           - 결과
              ````
                      
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
              
              
              running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
              default ✓ [======================================] 1 VUs  10s
              
                   ✓ logged in successfully
                   ✓ retrieved member
              
              checks.....................: 100.00% ✓ 20  ✗ 0  
              data_received..............: 12 kB   1.2 kB/s
              data_sent..................: 4.2 kB  408 B/s
              http_req_blocked...........: avg=1.4ms   min=4.42µs  med=7.78µs  max=27.94ms  p(90)=17µs     p(95)=1.42ms  
              http_req_connecting........: avg=8.01µs  min=0s      med=0s      max=160.34µs p(90)=0s       p(95)=8.01µs  
              ✓ http_req_duration..........: avg=8.18ms  min=4.76ms  med=8.54ms  max=15.89ms  p(90)=11.64ms  p(95)=12.3ms  
              http_req_failed............: 100.00% ✓ 20  ✗ 0  
              http_req_receiving.........: avg=84.62µs min=59.91µs med=81.23µs max=117.16µs p(90)=102.04µs p(95)=113.17µs
              http_req_sending...........: avg=41.1µs  min=14.35µs med=30.76µs max=192.03µs p(90)=52.99µs  p(95)=105.88µs
              http_req_tls_handshaking...: avg=1.38ms  min=0s      med=0s      max=27.69ms  p(90)=0s       p(95)=1.38ms  
              http_req_waiting...........: avg=8.05ms  min=4.6ms   med=8.42ms  max=15.8ms   p(90)=11.56ms  p(95)=12.2ms  
              http_reqs..................: 20      1.959452/s
              iteration_duration.........: avg=1.02s   min=1.01s   med=1.01s   max=1.05s    p(90)=1.02s    p(95)=1.03s   
              iterations.................: 10      0.979726/s
              vus........................: 1       min=1 max=1
              vus_max....................: 1       min=1 max=1
              ````
      2. 데이터를 갱신하는 페이지: 회원가입
         - 스크립트
           ````
           import http from 'k6/http';
           import { check, group, sleep, fail } from 'k6';
           
           export let options = {
           vus: 1,
           duration: '10s',
           thresholds: {
           http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
           },
           };
           
           const BASE_URL = 'https://catsbi-subway.kro.kr';
           const FORM = {"email":"b@b","age":"33","password":"1234"};
           const USERNAME = 'b@b';
           const PASSWORD = '1234';
           
           export default () => {
           
               http.post(`${BASE_URL}/members`, FORM);
           
               let loginRes = http.post(`${BASE_URL}/login/token`, {
                   email: USERNAME,
                   password: PASSWORD,
                 });
               check(loginRes, {
                   'logged in successfully': (resp) => resp.json('accessToken') !== '',
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
           ````
         - 결과
           ````
                   /\      |‾‾| /‾‾/   /‾‾/   
              /\  /  \     |  |/  /   /  /    
             /  \/    \    |     (   /   ‾‾\  
            /          \   |  |\  \ |  (‾)  |
           / __________ \  |__| \__\ \_____/ .io
         
           execution: local
           script: smoke_join.js
           output: -
         
           scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)
         
         
           running (10.3s), 0/1 VUs, 10 complete and 0 interrupted iterations
           default ✓ [======================================] 1 VUs  10s

           ✓ logged in successfully
           ✓ retrieved member
      
           checks.....................: 100.00% ✓ 20  ✗ 0  
           data_received..............: 16 kB   1.6 kB/s
           data_sent..................: 6.4 kB  623 B/s
           http_req_blocked...........: avg=1.99ms  min=4.21µs  med=5.43µs  max=59.59ms  p(90)=8.64µs   p(95)=8.77µs  
           http_req_connecting........: avg=14.8µs  min=0s      med=0s      max=444.13µs p(90)=0s       p(95)=0s      
           ✓ http_req_duration..........: avg=6.88ms  min=2.5ms   med=6ms     max=16.53ms  p(90)=11.93ms  p(95)=14.11ms
           http_req_failed............: 100.00% ✓ 30  ✗ 0  
           http_req_receiving.........: avg=82.04µs min=45.84µs med=75.55µs max=195.23µs p(90)=101.15µs p(95)=144.66µs
           http_req_sending...........: avg=28.59µs min=13.07µs med=24.9µs  max=111.08µs p(90)=42.49µs  p(95)=47.38µs
           http_req_tls_handshaking...: avg=1.96ms  min=0s      med=0s      max=59.03ms  p(90)=0s       p(95)=0s      
           http_req_waiting...........: avg=6.77ms  min=2.41ms  med=5.88ms  max=16.33ms  p(90)=11.82ms  p(95)=14.02ms
           http_reqs..................: 30      2.917848/s
           iteration_duration.........: avg=1.02s   min=1.01s   med=1.02s   max=1.09s    p(90)=1.03s    p(95)=1.06s   
           iterations.................: 10      0.972616/s
           vus........................: 1       min=1 max=1
           vus_max....................: 1       min=1 max=1
           ````
      3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지: 경로 검색
         - 스크립트
           ````
           import http from 'k6/http';
           import { check, group, sleep, fail } from 'k6';
           
           export let options = {
              vus: 1,
              duration: '10s',
              thresholds: {
                http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
              },
           };
           
           const BASE_URL = 'https://catsbi-subway.kro.kr';
           const QUERY_STRING = 'source=1&target=9';
           const USERNAME = 'a@a';
           const PASSWORD = '1234';
           
           export default () => {
               let loginRes = http.post(`${BASE_URL}/login/token`, {
                   email: USERNAME,
                   password: PASSWORD,
               });
           
               check(loginRes, {
                   'logged in successfully': (resp) => resp.json('accessToken') !== '',
               });
           
           
               let authHeaders = {
                   headers: {
                       Authorization: `Bearer ${loginRes.json('accessToken')}`,
                   },
               };
               let myObjects = http.get(`${BASE_URL}/paths?${QUERY_STRING}`, authHeaders).json();
               check(myObjects, { 'retrieved member': (obj) => obj.distance != 0 });
               sleep(1);
           };
           ````
         - 결과
           ````
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
           
           
           running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
           default ✓ [======================================] 1 VUs  10s
         
           ✓ logged in successfully
           ✓ retrieved member
         
           checks.........................: 100.00% ✓ 20  ✗ 0  
           data_received..................: 16 kB   1.6 kB/s
           data_sent......................: 4.3 kB  414 B/s
           http_req_blocked...............: avg=1.42ms  min=4.4µs   med=7.5µs   max=28.28ms  p(90)=14.11µs p(95)=1.44ms  
           http_req_connecting............: avg=22.73µs min=0s      med=0s      max=454.74µs p(90)=0s      p(95)=22.73µs 
           ✓ http_req_duration..............: avg=16.74ms min=3.63ms  med=14.89ms max=36.1ms   p(90)=32.49ms p(95)=32.83ms
           { expected_response:true }...: avg=29.07ms min=23.78ms med=27.47ms max=36.1ms   p(90)=33ms    p(95)=34.55ms
           http_req_failed................: 50.00%  ✓ 10  ✗ 10
           http_req_receiving.............: avg=90.31µs min=60.62µs med=82.67µs max=141.23µs p(90)=128µs   p(95)=138.88µs
           http_req_sending...............: avg=27.02µs min=13.56µs med=23.57µs max=101.18µs p(90)=34.39µs p(95)=43.7µs  
           http_req_tls_handshaking.......: avg=1.37ms  min=0s      med=0s      max=27.48ms  p(90)=0s      p(95)=1.37ms  
           http_req_waiting...............: avg=16.62ms min=3.53ms  med=14.76ms max=36ms     p(90)=32.35ms p(95)=32.69ms
           http_reqs......................: 20      1.927215/s
           iteration_duration.............: avg=1.03s   min=1.02s   med=1.03s   max=1.06s    p(90)=1.04s   p(95)=1.05s   
           iterations.....................: 10      0.963608/s
           vus............................: 1       min=1 max=1
           vus_max........................: 1  
           ````

   - Load 테스트
      1. 접속 빈도가 높은 페이지: 메인페이지
         - 스크립트
           ````
           export let options = {
              stages: [
                 { duration: '1m', target: 20 },
                 { duration: '2m', target: 100 },
                 { duration: '10s', target: 0 },
              ],
              thresholds: {
                  http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
              },
           };
           ````
         - 결과
           ````
                   /\      |‾‾| /‾‾/   /‾‾/   
              /\  /  \     |  |/  /   /  /    
             /  \/    \    |     (   /   ‾‾\  
            /          \   |  |\  \ |  (‾)  |
           / __________ \  |__| \__\ \_____/ .io
              
           execution: local
           script: smoke.js
           output: -
              
           scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
              
              
           running (3m10.5s), 000/100 VUs, 8211 complete and 0 interrupted iterations
           default ✓ [======================================] 000/100 VUs  3m10s
                       
           ✓ logged in successfully
           ✓ retrieved member
           checks.....................: 100.00% ✓ 16422 ✗ 0    
           data_received..............: 6.8 MB  36 kB/s
           data_sent..................: 3.2 MB  16 kB/s
           http_req_blocked...........: avg=36.06µs  min=3.28µs   med=5.44µs  max=28.18ms p(90)=8.97µs   p(95)=12.47µs
           http_req_connecting........: avg=2.14µs   min=0s       med=0s      max=2.23ms  p(90)=0s       p(95)=0s     
           ✓ http_req_duration..........: avg=4.4ms    min=997.3µs  med=4.79ms  max=33.28ms p(90)=6.95ms   p(95)=8.15ms
           http_req_failed............: 100.00% ✓ 16422 ✗ 0    
           http_req_receiving.........: avg=128.21µs min=21.24µs  med=60.18µs max=24.94ms p(90)=110.01µs p(95)=207.9µs
           http_req_sending...........: avg=45.93µs  min=9.82µs   med=19.55µs max=8.25ms  p(90)=43.67µs  p(95)=64.76µs
           http_req_tls_handshaking...: avg=22.44µs  min=0s       med=0s      max=27.66ms p(90)=0s       p(95)=0s     
           http_req_waiting...........: avg=4.23ms   min=880.01µs med=4.67ms  max=33.12ms p(90)=6.74ms   p(95)=7.86ms
           http_reqs..................: 16422   86.21822/s
           iteration_duration.........: avg=1.01s    min=1s       med=1s      max=1.04s   p(90)=1.01s    p(95)=1.01s  
           iterations.................: 8211    43.10911/s
           vus........................: 6       min=1   max=100
           vus_max....................: 100     min=100 max=100
           ````
           
      2. 데이터를 갱신하는 페이지: 회원 가입
         - 스크립트
           ````
           export let options = {
              stages: [
                 { duration: '1m', target: 20 },
                 { duration: '2m', target: 100 },
                 { duration: '10s', target: 0 },
              ],
              thresholds: {
                  http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
              },
           };
           ````
         - 결과
           ````
                   /\      |‾‾| /‾‾/   /‾‾/   
              /\  /  \     |  |/  /   /  /    
             /  \/    \    |     (   /   ‾‾\  
            /          \   |  |\  \ |  (‾)  |
           / __________ \  |__| \__\ \_____/ .io
            
           execution: local
           script: smoke_join.js
           output: -
            
           scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
            
            
           running (3m10.5s), 000/100 VUs, 8201 complete and 0 interrupted iterations
           default ✓ [======================================] 000/100 VUs  3m10s

           ✓ logged in successfully
           ✓ retrieved member

           checks.....................: 100.00% ✓ 16402 ✗ 0    
           data_received..............: 10 MB   53 kB/s
           data_sent..................: 5.0 MB  26 kB/s
           http_req_blocked...........: avg=28.43µs  min=3.07µs   med=4.78µs  max=28.98ms p(90)=8.57µs   p(95)=12.03µs 
           http_req_connecting........: avg=1.35µs   min=0s       med=0s      max=2.65ms  p(90)=0s       p(95)=0s      
           ✓ http_req_duration..........: avg=3.23ms   min=904.11µs med=2.07ms  max=45.12ms p(90)=5.77ms   p(95)=6.68ms  
           http_req_failed............: 100.00% ✓ 24603 ✗ 0    
           http_req_receiving.........: avg=143.95µs min=20.22µs  med=55.21µs max=38.62ms p(90)=104.96µs p(95)=244.38µs
           http_req_sending...........: avg=44.65µs  min=9.83µs   med=17.72µs max=19.82ms p(90)=42.46µs  p(95)=66.62µs
           http_req_tls_handshaking...: avg=15.43µs  min=0s       med=0s      max=28.47ms p(90)=0s       p(95)=0s      
           http_req_waiting...........: avg=3.04ms   min=857.66µs med=1.9ms   max=45.06ms p(90)=5.6ms    p(95)=6.38ms  
           http_reqs..................: 24603   129.12566/s
           iteration_duration.........: avg=1.01s    min=1s       med=1s      max=1.09s   p(90)=1.01s    p(95)=1.01s   
           iterations.................: 8201    43.041887/s
           vus........................: 5       min=1   max=99
           vus_max....................: 100     min=100 max=100
           ````
           
      3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지: 경로 검색
         - 스크립트
           ````
           export let options = {
              stages: [
                 { duration: '1m', target: 20 },
                 { duration: '2m', target: 100 },
                 { duration: '10s', target: 0 },
              ],
              thresholds: {
                  http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
              },
           };
           ````
         - 결과
           ````
                   /\      |‾‾| /‾‾/   /‾‾/   
              /\  /  \     |  |/  /   /  /    
             /  \/    \    |     (   /   ‾‾\  
            /          \   |  |\  \ |  (‾)  |
           / __________ \  |__| \__\ \_____/ .io
            
           execution: local
           script: smoke_paths.js
           output: -
            
           scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
            
            
           running (3m10.8s), 000/100 VUs, 8113 complete and 0 interrupted iterations
           default ✓ [======================================] 000/100 VUs  3m10s
            
           ✓ logged in successfully
           ✓ retrieved member
            
           checks.........................: 100.00% ✓ 16226 ✗ 0    
           data_received..................: 10 MB   53 kB/s
           data_sent......................: 3.2 MB  17 kB/s
           http_req_blocked...............: avg=34.69µs min=3.43µs   med=5.28µs  max=29ms     p(90)=8.55µs  p(95)=13.04µs 
           http_req_connecting............: avg=2.89µs  min=0s       med=0s      max=5.31ms   p(90)=0s      p(95)=0s      
           ✓ http_req_duration..............: avg=10.59ms min=959.92µs med=12.53ms max=120.88ms p(90)=21.92ms p(95)=26.8ms  
           { expected_response:true }...: avg=18.98ms min=12ms     med=16.77ms max=120.88ms p(90)=26.79ms p(95)=32.53ms
           http_req_failed................: 50.00%  ✓ 8113  ✗ 8113
           http_req_receiving.............: avg=78.1µs  min=23.76µs  med=58.96µs max=12.42ms  p(90)=95.36µs p(95)=123.04µs
           http_req_sending...............: avg=30.75µs min=9.95µs   med=18.67µs max=6.33ms   p(90)=41.2µs  p(95)=51.77µs
           http_req_tls_handshaking.......: avg=23.23µs min=0s       med=0s      max=28.46ms  p(90)=0s      p(95)=0s      
           http_req_waiting...............: avg=10.48ms min=897.84µs med=12.45ms max=120.3ms  p(90)=21.8ms  p(95)=26.67ms
           http_reqs......................: 16226   85.060906/s
           iteration_duration.............: avg=1.02s   min=1.01s    med=1.01s   max=1.12s    p(90)=1.03s   p(95)=1.03s   
           iterations.....................: 8113    42.530453/s
           vus............................: 6       min=1   max=100
           vus_max........................: 100     min=100 max=100
           ````
   - Stress 테스트
      1. 접속 빈도가 높은 페이지: 메인페이지
         - 스크립트
           ````
           export let options = {
               stages: [
                   { duration: '10s', target: 100 },
                   { duration: '10s', target: 200 },
                   { duration: '20s', target: 400 },
                   { duration: '20s', target: 800 },
                   { duration: '20s', target: 1000 },
                   { duration: '20s', target: 500 },
                   { duration: '10s', target: 100 },
                   { duration: '10s', target: 0 },
               ],
               thresholds: {
                   http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
               },
           }
           ````
         - 결과
           ````
           ✗ logged in successfully
           ↳  54% — ✓ 20739 / ✗ 17207
           ✓ retrieved member
        
           checks.....................: 70.09%  ✓ 40325  ✗ 17207
           data_received..............: 90 MB   746 kB/s
           data_sent..................: 18 MB   145 kB/s
           http_req_blocked...........: avg=287.95ms min=0s     med=5.29µs  max=2.47s    p(90)=1.2s     p(95)=1.46s   
           http_req_connecting........: avg=146.69ms min=0s     med=0s      max=1.22s    p(90)=450.88ms p(95)=535.43ms
           ✗ http_req_duration..........: avg=114.01ms min=0s     med=6.25ms  max=2.85s    p(90)=385.51ms p(95)=535.81ms
           http_req_failed............: 100.00% ✓ 58685  ✗ 0     
           http_req_receiving.........: avg=3.13ms   min=0s     med=35.39µs max=537.44ms p(90)=204.17µs p(95)=1.55ms  
           http_req_sending...........: avg=18.14ms  min=0s     med=17.31µs max=2.15s    p(90)=61.21ms  p(95)=109.48ms
           http_req_tls_handshaking...: avg=212.46ms min=0s     med=0s      max=2.21s    p(90)=891.54ms p(95)=1.14s   
           http_req_waiting...........: avg=92.72ms  min=0s     med=5.15ms  max=2.14s    p(90)=322.1ms  p(95)=442.42ms
           http_reqs..................: 58685   486.013542/s
           iteration_duration.........: avg=1.45s    min=5.02ms med=1.02s   max=5.56s    p(90)=2.83s    p(95)=3.25s   
           iterations.................: 37946   314.258667/s
           vus........................: 6       min=6    max=1000
           vus_max....................: 1000    min=1000 max=1000
           ````

      2. 데이터를 갱신하는 페이지: 회원 가입
         - 스크립트
           ```
           export let options = {
               stages: [
                   { duration: '10s', target: 100 },
                   { duration: '10s', target: 200 },
                   { duration: '20s', target: 400 },
                   { duration: '20s', target: 800 },
                   { duration: '20s', target: 1000 },
                   { duration: '20s', target: 500 },
                   { duration: '10s', target: 100 },
                   { duration: '10s', target: 0 },
               ],
               thresholds: {
                   http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
               },
           }
           ```
         - 결과
           ````
           running (2m00.8s), 0000/1000 VUs, 28187 complete and 0 interrupted iterations
           default ✓ [======================================] 0000/1000 VUs  2m0s
           
           ✗ logged in successfully
            ↳  60% — ✓ 17114 / ✗ 11073
           ✓ retrieved member
           
           checks.....................: 75.11%  ✓ 33428  ✗ 11073 
           data_received..............: 101 MB  834 kB/s
           data_sent..................: 21 MB   177 kB/s
           http_req_blocked...........: avg=278ms    min=0s      med=4.83µs  max=2.61s    p(90)=1.27s    p(95)=1.53s   
           http_req_connecting........: avg=143.45ms min=0s      med=0s      max=1.33s    p(90)=438.62ms p(95)=549.95ms
           ✗ http_req_duration..........: avg=93.46ms  min=0s      med=5.39ms  max=2.62s    p(90)=320.86ms p(95)=495.88ms
           http_req_failed............: 100.00% ✓ 73488  ✗ 0     
           http_req_receiving.........: avg=3.47ms   min=0s      med=34.74µs max=612.91ms p(90)=216.63µs p(95)=1.43ms  
           http_req_sending...........: avg=15.36ms  min=0s      med=16.37µs max=2.47s    p(90)=49.84ms  p(95)=99.9ms  
           http_req_tls_handshaking...: avg=213.16ms min=0s      med=0s      max=2.2s     p(90)=989.39ms p(95)=1.21s   
           http_req_waiting...........: avg=74.62ms  min=0s      med=3.63ms  max=1.82s    p(90)=284.79ms p(95)=421.5ms
           http_reqs..................: 73488   608.395679/s
           iteration_duration.........: avg=2.01s    min=535.1ms med=1.61s   max=10.84s   p(90)=3.72s    p(95)=4.42s   
           iterations.................: 28187   233.355772/s
           vus........................: 6       min=6    max=1000
           vus_max....................: 1000    min=1000 max=1000
           ````

      3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지: 경로 검색
         - 스크립트
           ```
           export let options = {
               stages: [
                   { duration: '10s', target: 100 },
                   { duration: '10s', target: 200 },
                   { duration: '20s', target: 400 },
                   { duration: '20s', target: 800 },
                   { duration: '20s', target: 1000 },
                   { duration: '20s', target: 500 },
                   { duration: '10s', target: 100 },
                   { duration: '10s', target: 0 },
               ],
               thresholds: {
                   http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
               },
           }
           ```
         - 결과
           ```
           running (2m00.6s), 0000/1000 VUs, 31643 complete and 0 interrupted iterations
           default ✓ [======================================] 0000/1000 VUs  2m0s
            
           ✗ logged in successfully
            ↳  38% — ✓ 12145 / ✗ 19498
           ✓ retrieved member
            
           checks.........................: 54.16% ✓ 23038  ✗ 19498 
           data_received..................: 91 MB  753 kB/s
           data_sent......................: 15 MB  125 kB/s
           http_req_blocked...............: avg=437.91ms min=0s      med=5.71µs   max=2.44s p(90)=1.47s    p(95)=1.64s   
           http_req_connecting............: avg=224.03ms min=0s      med=197.72ms max=1.3s  p(90)=544.08ms p(95)=619.31ms
           ✗ http_req_duration..............: avg=264.26ms min=0s      med=25.85ms  max=3.68s p(90)=834.69ms p(95)=1.1s    
           { expected_response:true }...: avg=592.76ms min=11.96ms med=493.92ms max=3.68s p(90)=1.42s    p(95)=1.65s   
           http_req_failed................: 75.12% ✓ 32895  ✗ 10893
           http_req_receiving.............: avg=6.51ms   min=0s      med=30.47µs  max=1.01s p(90)=294.47µs p(95)=43.07ms
           http_req_sending...............: avg=29.41ms  min=0s      med=15.97µs  max=2.6s  p(90)=100.38ms p(95)=148.17ms
           http_req_tls_handshaking.......: avg=322.14ms min=0s      med=0s       max=2.18s p(90)=1.12s    p(95)=1.32s   
           http_req_waiting...............: avg=228.32ms min=0s      med=3.43ms   max=3.68s p(90)=750.12ms p(95)=1.02s   
           http_reqs......................: 43788  363.154379/s
           iteration_duration.............: avg=1.74s    min=1.02ms  med=1.42s    max=7.07s p(90)=3.54s    p(95)=3.98s   
           iterations.....................: 31643  262.43021/s
           vus............................: 6      min=6    max=1000
           vus_max........................: 1000   min=1000 max=1000
           ```
