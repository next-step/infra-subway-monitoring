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
- nginx 서버
  - `/var/log/syslog` 
  - `/var/logs/nginx/access.log`
  - `/var/logs/nginx/error.log`
- web 서버
  - `/log/file.log`

3. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=bgpark82-dashboard


### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 성능 퍼포먼스 점수 30% 개선 (pagespeed.web.dev 기준)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 정적 리소스 gzip 압축
  - 스프링부트의 compression 사용
  ```properties
  # 압축 사용
  server.compression.enabled=true 
  # 압축 적용할 mime 타입 지정
  server.compression.mime-types=application/json,application/xml,text/html,text/xml,text/plain,application/javascript,text/css
  # 응답의 크기가 1024를 넘어가면 gzip 압축 (기본값 2048)
  server.compression.min-response-size=1024
  ```
  - 출처 : https://gunju-ko.github.io/spring/spring-boot/2018/06/16/SpringBootCompression.html
- 정적 리소스 캐싱
  - 200, 203, 206 응답코드에 대한 브라우저 캐싱 적용
  ```properties
  spring.web.resources.cache.cachecontrol.max-age=31536000
  ```
  - 출처 : https://adunhansa.tistory.com/259
- render-blocking 리소스 제거
  - script
    - `defer` element 적용
    - HTML이 파싱되는 동안 백그라운드에서 script 파일을 다운로드
    ```javascript
    <script defer src="/js/main.js"></script>
    ```
  - style
    - css 파일 비동기적 다운로드
    ```javascript
    <link rel="stylesheet" href="/path/to/my.css" media="print" onload="this.media='all'">
    ```
  - 출처 : https://www.filamentgroup.com/lab/load-css-simpler/
- 결과
  - 67점 -> 89점 (약 30% 개선)
  ![](./images/webpage-speed.png)
  ![](./images/webpage-test.png)

3. 부하테스트 전제조건은 어느정도로 설정하셨나요


- **1일 사용자 수** (DAU) = 549만 / 30 = 183,000
- **1명당 1일 평균 접속 수** = 5회
- **1일 총 접속 수** = 183,000 * 5 = 915,000
- **1일 평균 rps** = 915,000 / 86,400 = 10rps
- **피크 시간대 집중률** (최대 트래픽 / 평소 트래픽) : 10
- **1일 최대 rps** = 10 x 10 = 100 rps

5. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

홈페이지 기준 (https://bgpark82.p-e.kr)

smoke 테스트
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


running (10.9s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 20      ✗ 0
data_received..................: 11 kB   1.0 kB/s
data_sent......................: 5.4 kB  499 B/s
http_req_blocked...............: avg=11.05ms  min=3µs     med=6µs     max=221.06ms p(90)=9.1µs   p(95)=11.06ms
http_req_connecting............: avg=537.5µs  min=0s      med=0s      max=10.75ms  p(90)=0s      p(95)=537.5µs
   ✓ http_req_duration..............: avg=30.32ms  min=16.61ms med=26.3ms  max=81.73ms  p(90)=52.83ms p(95)=70.91ms
{ expected_response:true }...: avg=30.32ms  min=16.61ms med=26.3ms  max=81.73ms  p(90)=52.83ms p(95)=70.91ms
http_req_failed................: 0.00%   ✓ 0       ✗ 20
http_req_receiving.............: avg=92.15µs  min=45µs    med=74.5µs  max=190µs    p(90)=159.2µs p(95)=162.45µs
http_req_sending...............: avg=113.44µs min=18µs    med=36µs    max=1.45ms   p(90)=89.1µs  p(95)=166.95µs
http_req_tls_handshaking.......: avg=9.48ms   min=0s      med=0s      max=189.6ms  p(90)=0s      p(95)=9.48ms
http_req_waiting...............: avg=30.11ms  min=16.52ms med=26.15ms max=81.5ms   p(90)=52.58ms p(95)=69.37ms
http_reqs......................: 20      1.84048/s
iteration_duration.............: avg=1.08s    min=1.04s   med=1.05s   max=1.38s    p(90)=1.1s    p(95)=1.24s
iterations.....................: 10      0.92024/s
vus............................: 1       min=1     max=1
vus_max........................: 1       min=1     max=1
```

Load 테스트
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


  running (3m10.8s), 000/100 VUs, 14853 complete and 0 interrupted iterations
  default ✓ [======================================] 000/100 VUs  3m10s
  
       ✓ logged in successfully
       ✓ retrieved member
  
       checks.........................: 100.00% ✓ 29706      ✗ 0
       data_received..................: 11 MB   56 kB/s
       data_sent......................: 7.5 MB  39 kB/s
       http_req_blocked...............: avg=172.93µs min=1µs     med=5µs     max=246.2ms  p(90)=8µs     p(95)=9µs
       http_req_connecting............: avg=55.81µs  min=0s      med=0s      max=214.95ms p(90)=0s      p(95)=0s
     ✓ http_req_duration..............: avg=22.8ms   min=13.18ms med=21.09ms max=157.54ms p(90)=29.19ms p(95)=36.46ms
         { expected_response:true }...: avg=22.8ms   min=13.18ms med=21.09ms max=157.54ms p(90)=29.19ms p(95)=36.46ms
       http_req_failed................: 0.00%   ✓ 0          ✗ 29706
       http_req_receiving.............: avg=80.08µs  min=17µs    med=78µs    max=2.69ms   p(90)=116µs   p(95)=133µs
       http_req_sending...............: avg=32.27µs  min=6µs     med=31µs    max=10.88ms  p(90)=47µs    p(95)=53µs
       http_req_tls_handshaking.......: avg=110.95µs min=0s      med=0s      max=163.99ms p(90)=0s      p(95)=0s
       http_req_waiting...............: avg=22.69ms  min=13.1ms  med=20.98ms max=157.41ms p(90)=29.08ms p(95)=36.35ms
       http_reqs......................: 29706   155.701368/s
       iteration_duration.............: avg=1.04s    min=1.02s   med=1.04s   max=1.29s    p(90)=1.06s   p(95)=1.06s
       iterations.....................: 14853   77.850684/s
       vus............................: 7       min=2        max=100
       vus_max........................: 100     min=100      max=100
```
stress 테스트
```
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 250 max VUs, 1m1s max duration (incl. graceful stop):
           * default: Up to 250 looping VUs for 31s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)
           
  running (0m31.7s), 000/250 VUs, 49736 complete and 0 interrupted iterations
  default ✓ [======================================] 000/250 VUs  31s
  
       ✗ logged in successfully
        ↳  9% — ✓ 4713 / ✗ 45023
       ✓ retrieved member
  
       checks.........................: 17.31% ✓ 9426        ✗ 45023
       data_received..................: 4.4 MB 137 kB/s
       data_sent......................: 2.5 MB 77 kB/s
       http_req_blocked...............: avg=233.22µs min=0s      med=0s       max=1.2s     p(90)=3µs     p(95)=4µs
       http_req_connecting............: avg=81.85µs  min=0s      med=0s       max=1.17s    p(90)=0s      p(95)=0s
     ✓ http_req_duration..............: avg=4.04ms   min=0s      med=0s       max=124.31ms p(90)=20.56ms p(95)=24.61ms
         { expected_response:true }...: avg=23.36ms  min=12.97ms med=21.53ms  max=124.31ms p(90)=30.04ms p(95)=39.03ms
       http_req_failed................: 82.68% ✓ 45023       ✗ 9426
       http_req_receiving.............: avg=8.11µs   min=0s      med=0s       max=1.47ms   p(90)=36µs    p(95)=50µs
       http_req_sending...............: avg=3.53µs   min=0s      med=0s       max=468µs    p(90)=15µs    p(95)=21µs
       http_req_tls_handshaking.......: avg=150.32µs min=0s      med=0s       max=154.47ms p(90)=0s      p(95)=0s
       http_req_waiting...............: avg=4.03ms   min=0s      med=0s       max=124.24ms p(90)=20.49ms p(95)=24.54ms
       http_reqs......................: 54449  1715.197137/s
       iteration_duration.............: avg=99.88ms  min=83.19µs med=312.54µs max=2.24s    p(90)=2.67ms  p(95)=1.04s
       iterations.....................: 49736  1566.732994/s
       vus............................: 10     min=10        max=250
       vus_max........................: 250    min=250       max=250
```