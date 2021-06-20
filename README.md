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
- file: /home/ubuntu/logs/app.log
- json: /home/ubuntu/logs/app-json.log

2. Cloudwatch 대시보드 URL을 알려주세요
- 경로: https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=realizeme-dashboard)


### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- Desktop FCP 2초 이하(결과 0.8s)
- Desktop TTI 2초 이하(결과 1.3s)
- Lighthouse 성능 감사에서 85점 이상(94점)
- Largest Contentful Paint: 1.502s
- Security Score: A

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- GZIP 적용
- HTTP/2 적용
- JS Lazy loading
- Nginx MicroCaching(Dynamic Content Caching)

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 테스트 전제조건 정리
  
  |항목|기준|
  |---|---|
  |예상 1일 사용자 수(DAU)|100,000|
  |피크 시간대의 집중률|출근 시간 70%|        
  |1명당 1일 평균 접속|5| 
  |1일 최대 RPS| 49 |  
  |Latency|100ms |

- 각 시나리오에 맞춰 스크립트 작성
    - 접속 빈도가 높은 페이지: 로그인, 즐겨 찾기, 라인 가져오기
    - 데이터를 갱신하는 페이지: 회원 정보 수정
    - 데이터를 조회하는데 여러 데이터를 참조하는 페이지: 경로 조회

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- Smoke 테스트 후 결과를 기록

  - **로그인**
    ```text
        
              /\      |‾‾| /‾‾/   /‾‾/   
         /\  /  \     |  |/  /   /  /    
        /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io
    
      execution: local
      script: smoke/sign_in.js
      output: -
    
      scenarios: (100.00%) 1 scenario, 1 max VUs, 31s max duration (incl. graceful stop):
      * default: 1 looping VUs for 1s (gracefulStop: 30s)
    
    
    running (01.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
    default ✓ [======================================] 1 VUs  1s

     █ 로그인

       ✓ 로그인 성공
       ✓ retrieved member

    checks.........................: 100.00% ✓ 2   ✗ 0  
    data_received..................: 5.3 kB  4.1 kB/s
    data_sent......................: 952 B   735 B/s
    group_duration.................: avg=1.29s    min=1.29s   med=1.29s    max=1.29s    p(90)=1.29s    p(95)=1.29s   
    http_req_blocked...............: avg=125.69ms min=0s      med=125.69ms max=251.38ms p(90)=226.24ms p(95)=238.81ms
    http_req_connecting............: avg=4.51ms   min=0s      med=4.51ms   max=9.03ms   p(90)=8.12ms   p(95)=8.58ms  
    ✓ http_req_duration..............: avg=18.42ms  min=11.52ms med=18.42ms  max=25.32ms  p(90)=23.94ms  p(95)=24.63ms
    { expected_response:true }...: avg=18.42ms  min=11.52ms med=18.42ms  max=25.32ms  p(90)=23.94ms  p(95)=24.63ms
    http_req_failed................: 0.00%   ✓ 0   ✗ 2  
    http_req_receiving.............: avg=32µs     min=18µs    med=32µs     max=46µs     p(90)=43.2µs   p(95)=44.6µs  
    http_req_sending...............: avg=485µs    min=19µs    med=485µs    max=951µs    p(90)=857.8µs  p(95)=904.39µs
    http_req_tls_handshaking.......: avg=97.34ms  min=0s      med=97.34ms  max=194.68ms p(90)=175.21ms p(95)=184.95ms
    http_req_waiting...............: avg=17.91ms  min=11.49ms med=17.91ms  max=24.33ms  p(90)=23.04ms  p(95)=23.68ms
    http_reqs......................: 2       1.544659/s
    iteration_duration.............: avg=1.29s    min=1.29s   med=1.29s    max=1.29s    p(90)=1.29s    p(95)=1.29s   
    iterations.....................: 1       0.77233/s
    vus............................: 1       min=1 max=1
    vus_max........................: 1       min=1 max=1
    ```
    
  - **나의 정보 업데이트**
    ```js
        
              /\      |‾‾| /‾‾/   /‾‾/   
         /\  /  \     |  |/  /   /  /    
        /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io
    
      execution: local
      script: smoke/update_me.js
      output: -
    
      scenarios: (100.00%) 1 scenario, 1 max VUs, 31s max duration (incl. graceful stop):
      * default: 1 looping VUs for 1s (gracefulStop: 30s)
      
      
      running (01.2s), 0/1 VUs, 1 complete and 0 interrupted iterations
      default ✓ [======================================] 1 VUs  1s
      
      █ 나의 정보 업데이트
      
       ✓ 로그인 성공
       ✓ 나의 정보 업데이트
      
      checks.........................: 100.00% ✓ 2   ✗ 0  
      data_received..................: 5.2 kB  4.3 kB/s
      data_sent......................: 1.0 kB  834 B/s
      group_duration.................: avg=1.19s   min=1.19s   med=1.19s   max=1.19s    p(90)=1.19s    p(95)=1.19s   
      http_req_blocked...............: avg=86.12ms min=0s      med=86.12ms max=172.24ms p(90)=155.02ms p(95)=163.63ms
      http_req_connecting............: avg=4.77ms  min=0s      med=4.77ms  max=9.54ms   p(90)=8.58ms   p(95)=9.06ms  
      ✓ http_req_duration..............: avg=13.22ms min=13.18ms med=13.22ms max=13.27ms  p(90)=13.26ms  p(95)=13.26ms
      { expected_response:true }...: avg=13.22ms min=13.18ms med=13.22ms max=13.27ms  p(90)=13.26ms  p(95)=13.26ms
      http_req_failed................: 0.00%   ✓ 0   ✗ 2  
      http_req_receiving.............: avg=27.99µs min=13µs    med=27.99µs max=43µs     p(90)=40µs     p(95)=41.49µs
      http_req_sending...............: avg=74µs    min=38µs    med=74µs    max=110µs    p(90)=102.8µs  p(95)=106.4µs
      http_req_tls_handshaking.......: avg=80.65ms min=0s      med=80.65ms max=161.31ms p(90)=145.17ms p(95)=153.24ms
      http_req_waiting...............: avg=13.12ms min=13.02ms med=13.12ms max=13.22ms  p(90)=13.2ms   p(95)=13.21ms
      http_reqs......................: 2       1.665703/s
      iteration_duration.............: avg=1.19s   min=1.19s   med=1.19s   max=1.19s    p(90)=1.19s    p(95)=1.19s   
      iterations.....................: 1       0.832852/s
      vus............................: 1       min=1 max=1
      vus_max........................: 1       min=1 max=1
    ```
  - **노선 정보얻기**
    ```js
          
          /\      |‾‾| /‾‾/   /‾‾/   
      /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io
      
      execution: local
      script: smoke/get_lines.js
      output: -
      
      scenarios: (100.00%) 1 scenario, 1 max VUs, 31s max duration (incl. graceful stop):
      * default: 1 looping VUs for 1s (gracefulStop: 30s)
      
      
      running (01.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
      default ✓ [======================================] 1 VUs  1s
      
      ✓ 노선 불러오기
      
      checks.........................: 100.00% ✓ 1   ✗ 0  
      data_received..................: 49 kB   36 kB/s
      data_sent......................: 865 B   641 B/s
      http_req_blocked...............: avg=174.43ms min=174.43ms med=174.43ms max=174.43ms p(90)=174.43ms p(95)=174.43ms
      http_req_connecting............: avg=15.56ms  min=15.56ms  med=15.56ms  max=15.56ms  p(90)=15.56ms  p(95)=15.56ms 
      ✓ http_req_duration..............: avg=170.4ms  min=170.4ms  med=170.4ms  max=170.4ms  p(90)=170.4ms  p(95)=170.4ms
      { expected_response:true }...: avg=170.4ms  min=170.4ms  med=170.4ms  max=170.4ms  p(90)=170.4ms  p(95)=170.4ms
      http_req_failed................: 0.00%   ✓ 0   ✗ 1  
      http_req_receiving.............: avg=17.04ms  min=17.04ms  med=17.04ms  max=17.04ms  p(90)=17.04ms  p(95)=17.04ms
      http_req_sending...............: avg=447µs    min=447µs    med=447µs    max=447µs    p(90)=447µs    p(95)=447µs   
      http_req_tls_handshaking.......: avg=157.62ms min=157.62ms med=157.62ms max=157.62ms p(90)=157.62ms p(95)=157.62ms
      http_req_waiting...............: avg=152.91ms min=152.91ms med=152.91ms max=152.91ms p(90)=152.91ms p(95)=152.91ms
      http_reqs......................: 1       0.741949/s
      iteration_duration.............: avg=1.34s    min=1.34s    med=1.34s    max=1.34s    p(90)=1.34s    p(95)=1.34s   
      iterations.....................: 1       0.741949/s
      vus............................: 1       min=1 max=1
      vus_max........................: 1       min=1 max=1
    ```

  - **즐겨 찾기**
    ```js
          
              /\      |‾‾| /‾‾/   /‾‾/   
         /\  /  \     |  |/  /   /  /    
        /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io
      
      execution: local
      script: smoke/save_favorite.js
      output: -
      
      scenarios: (100.00%) 1 scenario, 1 max VUs, 31s max duration (incl. graceful stop):
      * default: 1 looping VUs for 1s (gracefulStop: 30s)
      
      
      running (01.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
      default ✓ [======================================] 1 VUs  1s
      
      ✓ 즐겨 찾기 성공
      
      █ setup
      
       ✓ 로그인 성공
      
      checks.........................: 100.00% ✓ 2   ✗ 0  
      data_received..................: 9.9 kB  7.7 kB/s
      data_sent......................: 1.5 kB  1.2 kB/s
      http_req_blocked...............: avg=110.21ms min=20.47ms med=110.21ms max=199.95ms p(90)=182.01ms p(95)=190.98ms
      http_req_connecting............: avg=14.95ms  min=6.47ms  med=14.95ms  max=23.43ms  p(90)=21.73ms  p(95)=22.58ms 
      ✓ http_req_duration..............: avg=28.81ms  min=16.09ms med=28.81ms  max=41.53ms  p(90)=38.98ms  p(95)=40.25ms
      { expected_response:true }...: avg=28.81ms  min=16.09ms med=28.81ms  max=41.53ms  p(90)=38.98ms  p(95)=40.25ms
      http_req_failed................: 0.00%   ✓ 0   ✗ 2  
      http_req_receiving.............: avg=285.5µs  min=15µs    med=285.5µs  max=556µs    p(90)=501.9µs  p(95)=528.95µs
      http_req_sending...............: avg=1.1ms    min=74µs    med=1.1ms    max=2.13ms   p(90)=1.92ms   p(95)=2.03ms  
      http_req_tls_handshaking.......: avg=93.77ms  min=13.92ms med=93.77ms  max=173.62ms p(90)=157.65ms p(95)=165.63ms
      http_req_waiting...............: avg=27.42ms  min=16ms    med=27.42ms  max=38.83ms  p(90)=36.55ms  p(95)=37.69ms
      http_reqs......................: 2       1.55639/s
      iteration_duration.............: avg=640.85ms min=240.7ms med=640.85ms max=1.04s    p(90)=960.97ms p(95)=1s      
      iterations.....................: 1       0.778195/s
      vus............................: 1       min=1 max=1
      vus_max........................: 1       min=1 max=1
    ```

  - **역 정보얻기**
    ```js
              /\      |‾‾| /‾‾/   /‾‾/   
         /\  /  \     |  |/  /   /  /    
        /  \/    \    |     (   /   ‾‾\  
       /          \   |  |\  \ |  (‾)  | 
      / __________ \  |__| \__\ \_____/ .io
  
      execution: local
         script: smoke/get_stations.js
         output: -
    
      scenarios: (100.00%) 1 scenario, 1 max VUs, 31s max duration (incl. graceful stop):
               * default: 1 looping VUs for 1s (gracefulStop: 30s)
  
  
      running (01.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
      default ✓ [======================================] 1 VUs  1s
      
      ✓ 역 불러오기
      
      checks.........................: 100.00% ✓ 1   ✗ 0  
      data_received..................: 77 kB   60 kB/s
      data_sent......................: 992 B   768 B/s
      http_req_blocked...............: avg=170.92ms min=170.92ms med=170.92ms max=170.92ms p(90)=170.92ms p(95)=170.92ms
      http_req_connecting............: avg=14.04ms  min=14.04ms  med=14.04ms  max=14.04ms  p(90)=14.04ms  p(95)=14.04ms 
      ✓ http_req_duration..............: avg=113.96ms min=113.96ms med=113.96ms max=113.96ms p(90)=113.96ms p(95)=113.96ms
      { expected_response:true }...: avg=113.96ms min=113.96ms med=113.96ms max=113.96ms p(90)=113.96ms p(95)=113.96ms
      http_req_failed................: 0.00%   ✓ 0   ✗ 1  
      http_req_receiving.............: avg=14.03ms  min=14.03ms  med=14.03ms  max=14.03ms  p(90)=14.03ms  p(95)=14.03ms
      http_req_sending...............: avg=661µs    min=661µs    med=661µs    max=661µs    p(90)=661µs    p(95)=661µs   
      http_req_tls_handshaking.......: avg=155.29ms min=155.29ms med=155.29ms max=155.29ms p(90)=155.29ms p(95)=155.29ms
      http_req_waiting...............: avg=99.26ms  min=99.26ms  med=99.26ms  max=99.26ms  p(90)=99.26ms  p(95)=99.26ms
      http_reqs......................: 1       0.775014/s
      iteration_duration.............: avg=1.28s    min=1.28s    med=1.28s    max=1.28s    p(90)=1.28s    p(95)=1.28s   
      iterations.....................: 1       0.775014/s
      vus............................: 1       min=1 max=1
      vus_max........................: 1       min=1 max=1
    ```
  - **경로 찾기**
    ```js
        
            /\      |‾‾| /‾‾/   /‾‾/   
      /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io

    execution: local
    script: smoke/find_path.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 1 max VUs, 31s max duration (incl. graceful stop):
    * default: 1 looping VUs for 1s (gracefulStop: 30s)
      
    INFO[0000] source:178, target:429                        source=console
    
    running (01.4s), 0/1 VUs, 1 complete and 0 interrupted iterations
    default ✓ [======================================] 1 VUs  1s

    ✓ id
    ✓ 경로 찾기
    
    checks.........................: 100.00% ✓ 2   ✗ 0  
    data_received..................: 79 kB   55 kB/s
    data_sent......................: 1.1 kB  743 B/s
    http_req_blocked...............: avg=92.89ms  min=0s       med=92.89ms  max=185.78ms p(90)=167.2ms  p(95)=176.49ms
    http_req_connecting............: avg=3.13ms   min=0s       med=3.13ms   max=6.27ms   p(90)=5.64ms   p(95)=5.96ms  
    ✓ http_req_duration..............: avg=115.98ms min=110.92ms med=115.98ms max=121.05ms p(90)=120.03ms p(95)=120.54ms
    { expected_response:true }...: avg=115.98ms min=110.92ms med=115.98ms max=121.05ms p(90)=120.03ms p(95)=120.54ms
    http_req_failed................: 0.00%   ✓ 0   ✗ 2  
    http_req_receiving.............: avg=6.53ms   min=93µs     med=6.53ms   max=12.97ms  p(90)=11.68ms  p(95)=12.32ms
    http_req_sending...............: avg=324.5µs  min=23µs     med=324.5µs  max=626µs    p(90)=565.7µs  p(95)=595.85µs
    http_req_tls_handshaking.......: avg=80.01ms  min=0s       med=80.01ms  max=160.03ms p(90)=144.03ms p(95)=152.03ms
    http_req_waiting...............: avg=109.13ms min=97.33ms  med=109.13ms max=120.93ms p(90)=118.57ms p(95)=119.75ms
    http_reqs......................: 2       1.404892/s
    iteration_duration.............: avg=1.42s    min=1.42s    med=1.42s    max=1.42s    p(90)=1.42s    p(95)=1.42s   
    iterations.....................: 1       0.702446/s
    vus............................: 1       min=1 max=1
    vus_max........................: 1       min=1 max=1
      ```

- Load 테스트 후 결과를 기록
  
  - **로그인**
    ```js
                /\      |‾‾| /‾‾/   /‾‾/   
         /\  /  \     |  |/  /   /  /    
        /  \/    \    |     (   /   ‾‾\  
       /          \   |  |\  \ |  (‾)  | 
      / __________ \  |__| \__\ \_____/ .io
  
      execution: local
      script: load/sign_in.js
      output: -
      
      scenarios: (100.00%) 1 scenario, 100 max VUs, 15m30s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 15m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      default ✓ [======================================] 000/100 VUs  15m0s
      
      █ 로그인
      
       ✓ logged in successfully
       ✓ retrieved member
      
      checks.........................: 100.00% ✓ 87740 ✗ 0    
      data_received..................: 30 MB   33 kB/s
      data_sent......................: 16 MB   18 kB/s
      group_duration.................: avg=1.03s    min=1.01s  med=1.02s   max=4.63s    p(90)=1.04s   p(95)=1.05s   
      http_req_blocked...............: avg=51.36µs  min=0s     med=1µs     max=184.53ms p(90)=1µs     p(95)=1µs     
      http_req_connecting............: avg=16.86µs  min=0s     med=0s      max=20.94ms  p(90)=0s      p(95)=0s      
      ✓ http_req_duration..............: avg=14.31ms  min=3.48ms med=10.79ms max=3.6s     p(90)=25.3ms  p(95)=33.4ms  
      { expected_response:true }...: avg=14.31ms  min=3.48ms med=10.79ms max=3.6s     p(90)=25.3ms  p(95)=33.4ms  
      http_req_failed................: 0.00%   ✓ 0     ✗ 87740
      http_req_receiving.............: avg=68.35µs  min=7µs    med=55µs    max=32.74ms  p(90)=106µs   p(95)=127µs   
      http_req_sending...............: avg=81.4µs   min=7µs    med=59µs    max=6.23ms   p(90)=160µs   p(95)=207µs   
      http_req_tls_handshaking.......: avg=33.17µs  min=0s     med=0s      max=172.47ms p(90)=0s      p(95)=0s      
      http_req_waiting...............: avg=14.16ms  min=3.42ms med=10.62ms max=3.6s     p(90)=25.14ms p(95)=33.22ms
      http_reqs......................: 87740   97.183974/s
      iteration_duration.............: avg=1.03s    min=1.01s  med=1.02s   max=4.63s    p(90)=1.04s   p(95)=1.05s   
      iterations.....................: 43870   48.591987/s
      vus............................: 1       min=1   max=100
      vus_max........................: 100     min=100 max=100
      waiting_time...................: avg=9.126097 min=3.423  med=7.1825  max=3600.984 p(90)=10.8671 p(95)=19.86065
    ```
  - **노선 불러오기**
    ```js
        
              /\      |‾‾| /‾‾/   /‾‾/   
         /\  /  \     |  |/  /   /  /    
        /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io

      execution: local
      script: load/get_lines.js
      output: -
      
      scenarios: (100.00%) 1 scenario, 100 max VUs, 10m30s max duration (incl. graceful stop):
      * default: Up to 100 looping VUs for 10m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      
      
      running (10m00.4s), 000/100 VUs, 22398 complete and 0 interrupted iterations
      default ✓ [======================================] 000/100 VUs  10m0s
      
       █ 노선 정보 불러오기
      
         ✓ Status OK
      
       checks.........................: 100.00% ✓ 22398 ✗ 0    
       data_received..................: 988 MB  1.6 MB/s
       data_sent......................: 4.7 MB  7.8 kB/s
       group_duration.................: avg=1.34s    min=1.01s   med=1.03s   max=7.34s    p(90)=2.18s   p(95)=3.43s   
       http_req_blocked...............: avg=209.54µs min=0s      med=1µs     max=266.75ms p(90)=1µs     p(95)=2µs     
       http_req_connecting............: avg=66.91µs  min=0s      med=0s      max=56.61ms  p(90)=0s      p(95)=0s      
      ✗ http_req_duration..............: avg=348.01ms min=14.36ms med=29.49ms max=6.34s    p(90)=1.18s   p(95)=2.43s   
      { expected_response:true }...: avg=348.01ms min=14.36ms med=29.49ms max=6.34s    p(90)=1.18s   p(95)=2.43s   
      http_req_failed................: 0.00%   ✓ 0     ✗ 22398
      http_req_receiving.............: avg=12.78ms  min=123µs   med=10.73ms max=127.18ms p(90)=20.74ms p(95)=25.95ms
      http_req_sending...............: avg=66.13µs  min=8µs     med=60µs    max=2.27ms   p(90)=106µs   p(95)=127.14µs
      http_req_tls_handshaking.......: avg=138.45µs min=0s      med=0s      max=191.54ms p(90)=0s      p(95)=0s      
      http_req_waiting...............: avg=335.15ms min=6.03ms  med=18.34ms max=6.33s    p(90)=1.16s   p(95)=2.41s   
      http_reqs......................: 22398   37.30579/s
      iteration_duration.............: avg=1.34s    min=1.01s   med=1.03s   max=7.34s    p(90)=2.18s   p(95)=3.43s   
      iterations.....................: 22398   37.30579/s
      vus............................: 1       min=1   max=100
      vus_max........................: 100     min=100 max=100
    ```
  - **경로 찾기**
    ```js
             /\      |‾‾| /‾‾/   /‾‾/   
      /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io
      
      execution: local
      script: load/find_path.js
      output: -
      
      scenarios: (100.00%) 1 scenario, 100 max VUs, 10m30s max duration (incl. graceful stop):
      * default: Up to 100 looping VUs for 10m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      
      
      running (10m02.2s), 000/100 VUs, 24812 complete and 0 interrupted iterations
      default ✓ [======================================] 000/100 VUs  10m0s
      
      █ setup
      
       ✓ status OK
      
      █ 경로 찾기
      
       ✓ Status OK
      
      checks.........................: 100.00% ✓ 24813 ✗ 0    
      data_received..................: 12 MB   20 kB/s
      data_sent......................: 2.2 MB  3.6 kB/s
      group_duration.................: avg=1.21s    min=1s     med=1s     max=7.26s    p(90)=1.76s    p(95)=2.71s
      http_req_blocked...............: avg=126.65µs min=0s     med=1µs    max=182.12ms p(90)=1µs      p(95)=2µs  
      http_req_connecting............: avg=40.33µs  min=0s     med=0s     max=26.52ms  p(90)=0s       p(95)=0s   
      ✗ http_req_duration..............: avg=216.64ms min=3.34ms med=7.86ms max=6.26s    p(90)=764.89ms p(95)=1.71s
      { expected_response:true }...: avg=216.64ms min=3.34ms med=7.86ms max=6.26s    p(90)=764.89ms p(95)=1.71s
      http_req_failed................: 0.00%   ✓ 0     ✗ 24813
      http_req_receiving.............: avg=281.01µs min=9µs    med=74µs   max=93.16ms  p(90)=131µs    p(95)=158µs
      http_req_sending...............: avg=73.91µs  min=7µs    med=61µs   max=1.11ms   p(90)=128µs    p(95)=156µs
      http_req_tls_handshaking.......: avg=83.39µs  min=0s     med=0s     max=166.76ms p(90)=0s       p(95)=0s   
      http_req_waiting...............: avg=216.28ms min=3.26ms med=7.69ms max=6.26s    p(90)=764.71ms p(95)=1.7s
      http_reqs......................: 24813   41.200744/s
      iteration_duration.............: avg=1.21s    min=1s     med=1s     max=7.26s    p(90)=1.76s    p(95)=2.71s
      iterations.....................: 24812   41.199084/s
      vus............................: 1       min=0   max=100
      vus_max........................: 100     min=100 max=100
    ```
  - **역 정보 얻기**  
    ```js
            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
      /          \   |  |\  \ |  (‾)  | 
      / __________ \  |__| \__\ \_____/ .io
      
      execution: local
       script: load/get_stations.js
       output: -
      
      scenarios: (100.00%) 1 scenario, 100 max VUs, 10m30s max duration (incl. graceful stop):
             * default: Up to 100 looping VUs for 10m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      
      
      running (10m00.4s), 000/100 VUs, 27205 complete and 0 interrupted iterations
      default ✓ [======================================] 000/100 VUs  10m0s
      
       █ 역 관리 - 역 정보 불러오기
      
         ✓ Status OK
      
       checks.........................: 100.00% ✓ 27205 ✗ 0    
       data_received..................: 2.0 GB  3.3 MB/s
       data_sent......................: 7.3 MB  12 kB/s
       group_duration.................: avg=1.11s    min=1.02s   med=1.03s   max=3.04s    p(90)=1.23s    p(95)=1.6s    
       http_req_blocked...............: avg=168.56µs min=0s      med=1µs     max=182.21ms p(90)=1µs      p(95)=2µs     
       http_req_connecting............: avg=49.71µs  min=0s      med=0s      max=38.08ms  p(90)=0s       p(95)=0s      
      ✓ http_req_duration..............: avg=108.91ms min=18.95ms med=33.03ms max=2.04s    p(90)=228.92ms p(95)=599.32ms
      { expected_response:true }...: avg=108.91ms min=18.95ms med=33.03ms max=2.04s    p(90)=228.92ms p(95)=599.32ms
      http_req_failed................: 0.00%   ✓ 0     ✗ 27205
      http_req_receiving.............: avg=16.33ms  min=145µs   med=13.98ms max=348.79ms p(90)=24.92ms  p(95)=31.54ms
      http_req_sending...............: avg=64.21µs  min=9µs     med=60µs    max=2.01ms   p(90)=97µs     p(95)=121µs   
      http_req_tls_handshaking.......: avg=116.88µs min=0s      med=0s      max=167.58ms p(90)=0s       p(95)=0s      
      http_req_waiting...............: avg=92.51ms  min=6.03ms  med=19.11ms max=2.02s    p(90)=203.79ms p(95)=570.82ms
      http_reqs......................: 27205   45.307867/s
      iteration_duration.............: avg=1.11s    min=1.02s   med=1.03s   max=3.04s    p(90)=1.23s    p(95)=1.6s    
      iterations.....................: 27205   45.307867/s
      vus............................: 1       min=1   max=100
      vus_max........................: 100     min=100 max=100
    ```

- Stress 테스트 후 결과를 기록

  - **경로 찾기**
    ```js
    
                /\      |‾‾| /‾‾/   /‾‾/   
           /\  /  \     |  |/  /   /  /    
          /  \/    \    |     (   /   ‾‾\  
         /          \   |  |\  \ |  (‾)  | 
        / __________ \  |__| \__\ \_____/ .io
      
        execution: local
           script: stress/find_path.js
           output: -
      
        scenarios: (100.00%) 1 scenario, 800 max VUs, 5m30s max duration (incl. graceful stop):
                 * default: Up to 800 looping VUs for 5m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      
      running (5m31.4s), 000/800 VUs, 68544 complete and 27 interrupted iterations
      default ✓ [======================================] 000/800 VUs  5m0s
          
      █ setup
      
       ✓ status OK
      
      █ 경로 찾기
      
       ✗ Status OK
        ↳  99% — ✓ 68413 / ✗ 144
      
      checks.........................: 99.78% ✓ 68414 ✗ 144  
      data_received..................: 39 MB  119 kB/s
      data_sent......................: 6.9 MB 21 kB/s
      group_duration.................: avg=1.54s    min=1s     med=1s     max=37.83s  p(90)=1.01s   p(95)=1.17s  
      http_req_blocked...............: avg=44.47ms  min=0s     med=1µs    max=15.51s  p(90)=1µs     p(95)=1µs    
      http_req_connecting............: avg=28.16ms  min=0s     med=0s     max=7.98s   p(90)=0s      p(95)=0s     
      ✗ http_req_duration..............: avg=512.48ms min=0s     med=7.41ms max=36.83s  p(90)=12.63ms p(95)=68.16ms
      { expected_response:true }...: avg=457.61ms min=3.18ms med=7.41ms max=36.83s  p(90)=12.44ms p(95)=56.71ms
      http_req_failed................: 0.21%  ✓ 144   ✗ 68414
      http_req_receiving.............: avg=166.17µs min=0s     med=60µs   max=94.09ms p(90)=113µs   p(95)=142µs  
      http_req_sending...............: avg=8.65ms   min=0s     med=51µs   max=15.51s  p(90)=97µs    p(95)=123µs  
      http_req_tls_handshaking.......: avg=7.73ms   min=0s     med=0s     max=12.17s  p(90)=0s      p(95)=0s     
      http_req_waiting...............: avg=503.66ms min=0s     med=7.28ms max=36.79s  p(90)=12.29ms p(95)=56.51ms
      http_reqs......................: 68558  206.896746/s
      iteration_duration.............: avg=1.54s    min=1s     med=1s     max=37.83s  p(90)=1.01s   p(95)=1.17s  
      iterations.....................: 68544  206.854496/s
      vus............................: 2      min=0   max=798
      vus_max........................: 800    min=800 max=800
    ```

  - **역 찾기**
    ```js
        
                /\      |‾‾| /‾‾/   /‾‾/   
           /\  /  \     |  |/  /   /  /    
          /  \/    \    |     (   /   ‾‾\  
         /          \   |  |\  \ |  (‾)  | 
        / __________ \  |__| \__\ \_____/ .io
      
        execution: local
           script: stress/get_stations.js
           output: -
      
        scenarios: (100.00%) 1 scenario, 800 max VUs, 5m30s max duration (incl. graceful stop):
                 * default: Up to 800 looping VUs for 5m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      
      WARN[0276] Request Failed                                error="context deadline exceeded"
      WARN[0276] Request Failed                                error="context deadline exceeded"
      WARN[0276] Request Failed                                error="context deadline exceeded"
      WARN[0284] Request Failed                                error="context deadline exceeded"
      WARN[0284] Request Failed                                error="context deadline exceeded"
      WARN[0284] Request Failed                                error="context deadline exceeded"
      WARN[0286] Request Failed                                error="context deadline exceeded"
      WARN[0286] Request Failed                                error="context deadline exceeded"
  
      running (5m01.0s), 000/800 VUs, 36992 complete and 1 interrupted iterations
      default ✓ [======================================] 000/800 VUs  5m0s
  
      █ 역 관리 - 역 정보 불러오기
      
       ✗ Status OK
        ↳  99% — ✓ 36984 / ✗ 8
      
      checks.........................: 99.97% ✓ 36984 ✗ 8    
      data_received..................: 2.7 GB 8.9 MB/s
      data_sent......................: 12 MB  38 kB/s
      group_duration.................: avg=2.79s    min=1.02s   med=2.28s    max=1m1s     p(90)=4.96s p(95)=6.38s
      http_req_blocked...............: avg=4.04ms   min=0s      med=1µs      max=1.35s    p(90)=1µs   p(95)=1µs  
      http_req_connecting............: avg=228.23µs min=0s      med=0s       max=187.83ms p(90)=0s    p(95)=0s   
      ✗ http_req_duration..............: avg=1.79s    min=20.59ms med=1.27s    max=1m0s     p(90)=3.95s p(95)=5.38s
      { expected_response:true }...: avg=1.78s    min=20.59ms med=1.27s    max=43.94s   p(90)=3.95s p(95)=5.37s
      http_req_failed................: 0.02%  ✓ 8     ✗ 36984
      http_req_receiving.............: avg=1.16s    min=141µs   med=784.85ms max=59.78s   p(90)=2.58s p(95)=3.45s
      http_req_sending...............: avg=43.95µs  min=7µs     med=41µs     max=1.03ms   p(90)=66µs  p(95)=86µs
      http_req_tls_handshaking.......: avg=3.81ms   min=0s      med=0s       max=1.34s    p(90)=0s    p(95)=0s   
      http_req_waiting...............: avg=626.2ms  min=5.79ms  med=288.09ms max=41.28s   p(90)=1.45s p(95)=2.57s
      http_reqs......................: 36992  122.894763/s
      iteration_duration.............: avg=2.79s    min=1.02s   med=2.28s    max=1m1s     p(90)=4.96s p(95)=6.38s
      iterations.....................: 36992  122.894763/s
      vus............................: 0      min=0   max=800
      vus_max........................: 800    min=800 max=800
    ```
