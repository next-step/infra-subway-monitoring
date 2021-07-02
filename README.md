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

## 요구사항 정리
### 1단계 요구사항

#### 로그 설정하기
*[x] Application Log 파일로 저장하기
    * 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
*[x] Nginx Access Log 설정하기

<br>

#### Cloudwatch로 모니터링
*[x] Cloudwatch로 로그 수집하기
*[x] Cloudwatch로 메트릭 수집하기

<br>

#### 웹 성능 테스트
*[x] 웹 성능 예산을 작성
*[x] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악

<br>

#### 부하 테스트

*[x] 테스트 전제조건 정리
    *[x] 대상 시스템 범위
    *[x] 목푯값 설정 (latency, throughput, 부하 유지기간)
    *[x] 부하 테스트 시 저장될 데이터 건수 및 크기

*[x] 각 시나리오에 맞춰 스크립트 작성
    *[x] 접속 빈도가 높은 페이지
    *[x] 데이터를 갱신하는 페이지
    *[x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    * Smoke, Load, Stress 테스트 후 결과를 기록
    



## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
    * 어플리케이션 로그: public, web(192.168.180.94) <br>
      => /home/ubuntu/app/logs/infra-subway-monitoring/app.log
      
      <br>
      
    * NGINX 로그: Reverse proxy(192.168.180.46) <br>
      => /var/log/nginx


2. Cloudwatch 대시보드 URL을 알려주세요
    * https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-joojimin


---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   > * PageSpeed Insights 총점 80이상 
   > * FCP 2초 미만
   > * Speed Index 2초 미만
   > * Largest Contentful Paint 2초 미만
   > * First Byte Time grade A
   > * Keep-alive Enabled grade A
   > * Compress Transfer grade A
   > * Compress Images grade A
   > * Cache static content greade A
   

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    > First Contentful Paint 시간 개선
    >> * Application Gzip 적용<br>
    >> * Nginx Gzip 및 캐싱 적용
   
    > Speed Index 시간 개선
    >> * JS/CSS 렌더링 차단 리소스 제거 
    
    > LargestContentful Paint 시간 개선
    >> * 용량이 큰 이미지에 preload 적용

    * 개선 결과
        > * First Contentful Paint 0.7 초
        > * Speed Index 1.6 초 
        > * Largest Contentful Paint 1.4 초
      

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    1. 대상 시스템 범위
       * Reverse Proxy 1대 + WAS 1대 + DB 1대

    2. 목푯값 설정
       1. DAU 설정(예상 1일 사용자 수): 현재 사용자를 끌어 들일 만한 컨텐츠가 없고, 경쟁사 비율의 10%정도로 산정했을 때 100,000명(넉넉히..)
       2. 1명당 1일 평균 접속(요청 수): 3건 정도 예상
       3. 1일 총 접속 수:  300,000 ( 100,000 x 3 )
       4. 1일 평균 rps: 3.5 ( 300,000 / 86,400 )
       5. 1일 최대 rps: 35 ( 3.46 * 10 )
            * 최대 트래픽은 10배정도로 예상
       
    3. 접속 빈도가 높은 기능
        * /member/me: 내 정보 조회
        

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

## 접속 빈도가 높은 페이지
### smoke
* 설명
    * 접속 빈도는 사용자 입장에서 아래 5가지가 케이스가 가장 많이 요청할 것으로 예상했습니다. 
        1. 로그인
        2. 내정보 조회
        3. 지하철 역 조회
        4. 경로 조회
        5. 즐겨찾기 조회
    * 스트레스 테스트는 99% 이상의 성공률까지 허용하는 최대치로 실행하였습니다.

<br>

* 스크립트 위치
> /script/stress/connectionfrequency/smoke.js

* 결과
```shell
ubuntu@ip-192-168-181-7:~/script/connectionfrequency$ k6 run smoke.js

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


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ↓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ get stations
     ✓ get shortestPath
     ✓ get favorites

     checks.........................: 100.00% ✓ 50       ✗ 0
     data_received..................: 53 kB   5.1 kB/s
     data_sent......................: 15 kB   1.4 kB/s
     http_req_blocked...............: avg=770.18µs min=4.36µs  med=5.3µs   max=38.2ms   p(90)=8.29µs  p(95)=8.66µs
     http_req_connecting............: avg=15.36µs  min=0s      med=0s      max=768.15µs p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=8.36ms   min=6.1ms   med=7.89ms  max=16.24ms  p(90)=10.76ms p(95)=11.61ms
       { expected_response:true }...: avg=8.36ms   min=6.1ms   med=7.89ms  max=16.24ms  p(90)=10.76ms p(95)=11.61ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 50
     http_req_receiving.............: avg=78.08µs  min=47.65µs med=76.51µs max=101.11µs p(90)=89.14µs p(95)=95.32µs
     http_req_sending...............: avg=22.77µs  min=13.07µs med=17.82µs max=82.47µs  p(90)=36.18µs p(95)=42.72µs
     http_req_tls_handshaking.......: avg=554.75µs min=0s      med=0s      max=27.73ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=8.26ms   min=6.01ms  med=7.77ms  max=16.13ms  p(90)=10.65ms p(95)=11.52ms
     http_reqs......................: 50      4.772899/s
     iteration_duration.............: avg=1.04s    min=1.03s   med=1.04s   max=1.08s    p(90)=1.05s   p(95)=1.07s
     iterations.....................: 10      0.95458/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

<br><br>

### load
* 스크립트 위치
> /script/stress/connectionfrequency/load.js

* 결과
```shell
ubuntu@ip-192-168-181-7:~/script/connectionfrequency$ k6 run load.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 35 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 35 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m11.0s), 00/35 VUs, 5172 complete and 0 interrupted iterations
default ✓ [======================================] 00/35 VUs  3m10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ get stations
     ✓ get shortestPath
     ✓ get favorites

     checks.........................: 100.00% ✓ 25860      ✗ 0
     data_received..................: 25 MB   132 kB/s
     data_sent......................: 7.3 MB  38 kB/s
     http_req_blocked...............: avg=12.15µs min=3.21µs  med=4.49µs  max=34.54ms  p(90)=6.38µs  p(95)=7.91µs
     http_req_connecting............: avg=786ns   min=0s      med=0s      max=836.83µs p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=10.41ms min=4.78ms  med=8.59ms  max=100.71ms p(90)=16.07ms p(95)=23.16ms
       { expected_response:true }...: avg=10.41ms min=4.78ms  med=8.59ms  max=100.71ms p(90)=16.07ms p(95)=23.16ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 25860
     http_req_receiving.............: avg=54.06µs min=23.38µs med=53.37µs max=946.65µs p(90)=68.4µs  p(95)=75.1µs
     http_req_sending...............: avg=18.23µs min=9.42µs  med=14.13µs max=840.68µs p(90)=27.25µs p(95)=35.23µs
     http_req_tls_handshaking.......: avg=5.96µs  min=0s      med=0s      max=27.44ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=10.33ms min=4.7ms   med=8.51ms  max=100.63ms p(90)=16ms    p(95)=23.09ms
     http_reqs......................: 25860   135.387971/s
     iteration_duration.............: avg=1.05s   min=1.03s   med=1.04s   max=1.26s    p(90)=1.07s   p(95)=1.08s
     iterations.....................: 5172    27.077594/s
     vus............................: 1       min=1        max=35
     vus_max........................: 35      min=35       max=35
```

<br><br>

### stress
* 스크립트 위치
> /script/stress/connectionfrequency/stress.js

* 결과
```shell
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 1m6s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 36s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m36.5s), 000/300 VUs, 3150 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  36s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ get stations
     ✓ get shortestPath
     ✓ get favorites

     checks.........................: 100.00% ✓ 15750      ✗ 0
     data_received..................: 17 MB   470 kB/s
     data_sent......................: 4.6 MB  126 kB/s
     http_req_blocked...............: avg=134.4µs  min=3.01µs  med=4.5µs   max=53.47ms  p(90)=6µs      p(95)=8.76µs
     http_req_connecting............: avg=15.67µs  min=0s      med=0s      max=15.84ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=113.42ms min=4.74ms  med=55.89ms max=845.14ms p(90)=276.03ms p(95)=323.72ms
       { expected_response:true }...: avg=113.42ms min=4.74ms  med=55.89ms max=845.14ms p(90)=276.03ms p(95)=323.72ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 15750
     http_req_receiving.............: avg=55.73µs  min=24.77µs med=54.78µs max=9.5ms    p(90)=66.68µs  p(95)=72.44µs
     http_req_sending...............: avg=20.93µs  min=9.92µs  med=14.14µs max=7.01ms   p(90)=25.26µs  p(95)=36.84µs
     http_req_tls_handshaking.......: avg=110.27µs min=0s      med=0s      max=29.98ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=113.34ms min=4.69ms  med=55.84ms max=845.06ms p(90)=275.94ms p(95)=323.67ms
     http_reqs......................: 15750   431.367076/s
     iteration_duration.............: avg=1.56s    min=1.03s   med=1.35s   max=3.42s    p(90)=2.31s    p(95)=2.41s
     iterations.....................: 3150    86.273415/s
     vus............................: 4       min=4        max=300
     vus_max........................: 300     min=300      max=300
```

<br><br>

## 데이터를 갱신하는 페이지
* 설명
    * 사용자 정보를 업데이트하는 방식으로 데이터 갱신 스크립터를 작성했습니다.
    * 스트레스 테스트는 99% 이상의 성공률까지 허용하는 최대치로 실행하였습니다.

<br>

### smoke
* 스크립트 위치
> /script/stress/dataupdate/smoke.js

* 결과
```shell

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 32s max duration (incl. graceful stop):
           * default: 1 looping VUs for 2s (gracefulStop: 30s)


running (02.1s), 0/1 VUs, 2 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  2s

     ✓ logged in successfully
     ✓ updated in  successfully

     checks.........................: 100.00% ✓ 4        ✗ 0
     data_received..................: 5.8 kB  2.8 kB/s
     data_sent......................: 1.3 kB  623 B/s
     http_req_blocked...............: avg=10.23ms  min=4.57µs  med=7.27µs  max=40.9ms   p(90)=28.63ms  p(95)=34.77ms
     http_req_connecting............: avg=146.94µs min=0s      med=0s      max=587.78µs p(90)=411.45µs p(95)=499.61µs
   ✓ http_req_duration..............: avg=6.2ms    min=5.04ms  med=6.34ms  max=7.06ms   p(90)=6.98ms   p(95)=7.02ms
       { expected_response:true }...: avg=6.2ms    min=5.04ms  med=6.34ms  max=7.06ms   p(90)=6.98ms   p(95)=7.02ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 4
     http_req_receiving.............: avg=64.13µs  min=41.57µs med=63.31µs max=88.34µs  p(90)=86.66µs  p(95)=87.5µs
     http_req_sending...............: avg=37.76µs  min=17.56µs med=24.59µs max=84.3µs   p(90)=68.38µs  p(95)=76.34µs
     http_req_tls_handshaking.......: avg=7.06ms   min=0s      med=0s      max=28.27ms  p(90)=19.79ms  p(95)=24.03ms
     http_req_waiting...............: avg=6.09ms   min=4.98ms  med=6.25ms  max=6.89ms   p(90)=6.82ms   p(95)=6.86ms
     http_reqs......................: 4       1.932914/s
     iteration_duration.............: avg=1.03s    min=1.01s   med=1.03s   max=1.05s    p(90)=1.05s    p(95)=1.05s
     iterations.....................: 2       0.966457/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

<br><br>

### load
* 스크립트 위치
> /script/stress/dataupdate/load.js

* 결과
```shell
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 35 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 35 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.6s), 00/35 VUs, 5375 complete and 0 interrupted iterations
default ✓ [======================================] 00/35 VUs  3m10s

     ✓ logged in successfully
     ✓ updated in  successfully

     checks.........................: 100.00% ✓ 10750     ✗ 0
     data_received..................: 3.5 MB  19 kB/s
     data_sent......................: 2.5 MB  13 kB/s
     http_req_blocked...............: avg=23.5µs  min=3.35µs  med=5.12µs  max=29.3ms   p(90)=8.2µs   p(95)=8.85µs
     http_req_connecting............: avg=2.15µs  min=0s      med=0s      max=1.56ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=6.27ms  min=4.64ms  med=6.06ms  max=23.38ms  p(90)=7.52ms  p(95)=8.11ms
       { expected_response:true }...: avg=6.27ms  min=4.64ms  med=6.06ms  max=23.38ms  p(90)=7.52ms  p(95)=8.11ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 10750
     http_req_receiving.............: avg=50.88µs min=17.12µs med=44.66µs max=615.87µs p(90)=77.59µs p(95)=84.23µs
     http_req_sending...............: avg=26.05µs min=10.86µs med=20.1µs  max=1.44ms   p(90)=40.27µs p(95)=43.39µs
     http_req_tls_handshaking.......: avg=14.9µs  min=0s      med=0s      max=28ms     p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=6.19ms  min=4.58ms  med=5.98ms  max=23.31ms  p(90)=7.43ms  p(95)=8.04ms
     http_reqs......................: 10750   56.397387/s
     iteration_duration.............: avg=1.01s   min=1.01s   med=1.01s   max=1.04s    p(90)=1.01s   p(95)=1.01s
     iterations.....................: 5375    28.198693/s
     vus............................: 2       min=1       max=35
     vus_max........................: 35      min=35      max=35
```

<br><br>

### stress
* 스크립트 위치
> /script/stress/dataupdate/stress.js

* 결과
```shell
running (0m36.4s), 000/600 VUs, 9800 complete and 0 interrupted iterations
default ✓ [======================================] 000/600 VUs  36s

     ✗ logged in successfully
      ↳  99% — ✓ 9749 / ✗ 51
     ✓ updated in  successfully

     checks.........................: 99.73% ✓ 19498      ✗ 51
     data_received..................: 34 MB  923 kB/s
     data_sent......................: 6.9 MB 190 kB/s
     http_req_blocked...............: avg=42.32ms  min=3.28µs   med=5.07µs  max=284.5ms  p(90)=208.74ms p(95)=218.1ms
     http_req_connecting............: avg=806.69µs min=0s       med=0s      max=66.27ms  p(90)=1.45ms   p(95)=2.35ms
   ✓ http_req_duration..............: avg=15.77ms  min=114.91µs med=14.88ms max=257.59ms p(90)=26.67ms  p(95)=41.31ms
       { expected_response:true }...: avg=15.79ms  min=4.57ms   med=14.89ms max=257.59ms p(90)=26.72ms  p(95)=41.34ms
     http_req_failed................: 0.26%  ✓ 51         ✗ 19498
     http_req_receiving.............: avg=53.45µs  min=0s       med=36.7µs  max=28.94ms  p(90)=61.05µs  p(95)=70.96µs
     http_req_sending...............: avg=271.82µs min=10.77µs  med=19.41µs max=34.57ms  p(90)=207.56µs p(95)=457.19µs
     http_req_tls_handshaking.......: avg=41.46ms  min=0s       med=0s      max=283.91ms p(90)=205.63ms p(95)=216.35ms
     http_req_waiting...............: avg=15.45ms  min=100.12µs med=14.77ms max=257.48ms p(90)=25.83ms  p(95)=39.01ms
     http_reqs......................: 19549  537.402134/s
     iteration_duration.............: avg=1.11s    min=620.15µs med=1.08s   max=1.37s    p(90)=1.25s    p(95)=1.27s
     iterations.....................: 9800   269.402062/s
     vus............................: 7      min=7        max=600
     vus_max........................: 600    min=600      max=600
```

<br><br>

## 데이터를 조회하는데 여러 데이터를 참조하는 페이지
* 설명
    * 가장 데이터 참조를 많이 하는 경로 조회 서비스로 테스트했습니다.
    * 스트레스 테스트는 99% 이상의 성공률까지 허용하는 최대치로 실행하였습니다.

<br>

### smoke
* 스크립트 위치
> /script/stress/refertomultiplepage/smoke.js

* 결과
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


running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ get shortestPath

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 18 kB   1.7 kB/s
     data_sent......................: 5.7 kB  557 B/s
     http_req_blocked...............: avg=1.84ms  min=4.25µs  med=6.62µs  max=36.85ms  p(90)=10.07µs p(95)=1.86ms
     http_req_connecting............: avg=31.62µs min=0s      med=0s      max=632.42µs p(90)=0s      p(95)=31.62µs
   ✓ http_req_duration..............: avg=9.01ms  min=6.8ms   med=9.66ms  max=12.27ms  p(90)=10.67ms p(95)=10.96ms
       { expected_response:true }...: avg=9.01ms  min=6.8ms   med=9.66ms  max=12.27ms  p(90)=10.67ms p(95)=10.96ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 20
     http_req_receiving.............: avg=80.42µs min=60.43µs med=76.46µs max=123.72µs p(90)=88.5µs  p(95)=98.23µs
     http_req_sending...............: avg=28.45µs min=13.77µs med=28.41µs max=85.58µs  p(90)=39.89µs p(95)=43.08µs
     http_req_tls_handshaking.......: avg=1.41ms  min=0s      med=0s      max=28.28ms  p(90)=0s      p(95)=1.41ms
     http_req_waiting...............: avg=8.9ms   min=6.68ms  med=9.55ms  max=12.17ms  p(90)=10.57ms p(95)=10.86ms
     http_reqs......................: 20      1.955259/s
     iteration_duration.............: avg=1.02s   min=1.01s   med=1.01s   max=1.05s    p(90)=1.02s   p(95)=1.04s
     iterations.....................: 10      0.97763/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

<br><br>

### load
* 스크립트 위치
> /script/stress/refertomultiplepage/load.js

* 결과
```shell

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 35 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 35 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.3s), 00/35 VUs, 5335 complete and 0 interrupted iterations
default ✓ [======================================] 00/35 VUs  3m10s

     ✓ logged in successfully
     ✓ get shortestPath

     checks.........................: 100.00% ✓ 10670     ✗ 0
     data_received..................: 7.2 MB  38 kB/s
     data_sent......................: 2.9 MB  15 kB/s
     http_req_blocked...............: avg=23.36µs min=3.23µs  med=4.96µs max=27.98ms  p(90)=8.06µs  p(95)=8.6µs
     http_req_connecting............: avg=2.69µs  min=0s      med=0s     max=7.06ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=9.97ms  min=4.77ms  med=9.74ms max=140.57ms p(90)=15.1ms  p(95)=18.32ms
       { expected_response:true }...: avg=9.97ms  min=4.77ms  med=9.74ms max=140.57ms p(90)=15.1ms  p(95)=18.32ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 10670
     http_req_receiving.............: avg=58.5µs  min=24.17µs med=57.1µs max=724.33µs p(90)=77.7µs  p(95)=84.95µs
     http_req_sending...............: avg=22.84µs min=10.08µs med=17.4µs max=3.58ms   p(90)=37.91µs p(95)=41.8µs
     http_req_tls_handshaking.......: avg=14.52µs min=0s      med=0s     max=26.75ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=9.88ms  min=4.71ms  med=9.66ms max=140.5ms  p(90)=15.02ms p(95)=18.25ms
     http_reqs......................: 10670   56.072661/s
     iteration_duration.............: avg=1.02s   min=1.01s   med=1.01s  max=1.14s    p(90)=1.02s   p(95)=1.03s
     iterations.....................: 5335    28.03633/s
     vus............................: 3       min=1       max=35
     vus_max........................: 35      min=35      max=35
```

<br><br>

### stress
* 스크립트 위치
> /script/stress/refertomultiplepage/stress.js

* 결과
```shell

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 450 max VUs, 1m6s max duration (incl. graceful stop):
           * default: Up to 450 looping VUs for 36s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m36.2s), 000/450 VUs, 6702 complete and 0 interrupted iterations
default ✓ [======================================] 000/450 VUs  36s

     ✓ logged in successfully
     ✓ get shortestPath

     checks.........................: 100.00% ✓ 13404      ✗ 0
     data_received..................: 25 MB   689 kB/s
     data_sent......................: 5.0 MB  138 kB/s
     http_req_blocked...............: avg=3.85ms   min=3.24µs  med=4.99µs   max=117.84ms p(90)=9.85ms   p(95)=21.16ms
     http_req_connecting............: avg=319.24µs min=0s      med=0s       max=29.35ms  p(90)=649.77µs p(95)=1.46ms
   ✓ http_req_duration..............: avg=145.41ms min=4.81ms  med=133.67ms max=739.15ms p(90)=316.21ms p(95)=362.74ms
       { expected_response:true }...: avg=145.41ms min=4.81ms  med=133.67ms max=739.15ms p(90)=316.21ms p(95)=362.74ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 13404
     http_req_receiving.............: avg=61.2µs   min=22.46µs med=50.89µs  max=11.67ms  p(90)=67.92µs  p(95)=76.98µs
     http_req_sending...............: avg=82.95µs  min=9.82µs  med=17.64µs  max=20.19ms  p(90)=66.16µs  p(95)=181.49µs
     http_req_tls_handshaking.......: avg=3.5ms    min=0s      med=0s       max=114.84ms p(90)=8.76ms   p(95)=19.22ms
     http_req_waiting...............: avg=145.27ms min=4.73ms  med=133.61ms max=739.1ms  p(90)=316.08ms p(95)=362.63ms
     http_reqs......................: 13404   369.801142/s
     iteration_duration.............: avg=1.29s    min=1.01s   med=1.29s    max=2.25s    p(90)=1.6s     p(95)=1.67s
     iterations.....................: 6702    184.900571/s
     vus............................: 6       min=6        max=450
     vus_max........................: 450     min=450      max=450
```


