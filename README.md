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
   - external-server
     - nginx
       - /var/log/nginx/ access.log , error.log
     - web-app 
       - /var/log/app/prod/error_log.log, prod_log
       - 
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=seunghoona-dashboard

#### 요구사항정의
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] 로그 설정하기
- [x] CloudWatch 모니터링

#### 로그 설정하기
- [x] Application Log 파일로 저장하기
    - [x] 회원가입
    - [x] 로그인
    - [x] 최단거리 조회 등의 이벤트에 로깅을 설정
- [x] Nginx Access Log 설정하기
- [x] Cloudwatch로 모니터링
    - [x] CloudWatch 로그 수집하기
    - [x] CloudWatch 메트릭 수집하기

---
- [ ] 웹 성능 테스트
    - [ ] 웹 성능 예산을 작성
    - [x] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악

- [x] 부하 테스트
    - [x] 테스트 전제조건 정리
        - [x] 대상 시스템 범위
        - [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
        - [x] 부하 테스트 시 저장될 데이터 건수 및 크기
    - [x] 각 시나리오에 맞춰 스크립트 작성
        - [x] 접속 빈도가 높은 페이지
        - [x] 데이터를 갱신하는 페이지
        - [x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    - [x] Smoke, Load, Stress 테스트 후 결과를 기록

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   경쟁사 네이버
   https://m.map.naver.com/subway/subwayLine.naver?region=1000


|1|N 경쟁사|우리제품|
|:---:|:---:|:---:|
|FCP| 2.2|14.9초|
|TTI|7.2초|15.6초|
|TBT|450ms|630ms|
|LCP|7.8초|15.6|
|점수|61점|29점|
### 성능 예산 
- FCP 3초 미만 
- TTI 5초 미만
- 글꼴 최대 2개까지 사용 
- 압축된 리소스 최대 크기 200KB 미만
- 이미지 확장자 avif사용 
  - 500px 30kb
  - 1000px 90kb
  - 1500px 160kb

- Lighthouse 성능 감사에서 80점이상을 목표로 한다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 사용하지 않는 CSS 삭제
   - 자바스크립트 gzip 사용
   - 웹 글꼴 미리로드
   - 이미지 파일 크기 제한
   - HTML 문서 파싱후에 실행되도록  defer 추가
   - CDN 사용하기
   - 이미지 캐싱
   - 스크립트 요청을 하나로 합쳐서 처리

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
-----------
###대상 시스템 범위
|시스템범위|was|db|
|:---:|:---:|:---:|
------------------
## 목푯값 설정
### latency
- 100m
### Throughput
1. 대조군 사이트 `네이버 지하철앱`
    - 1392만명의 월 활성 이용자가 존재한다.
    - 해당 유저의 10분의 1인 139만을 기준으로 근거를 제시한다 .
    - **일 평균 이용자 46000 = (139/30일)**
2. 평균 하루 유저가 접속할 페이지 수
    - 메인화면 - 경로찾기 - 로그인 -경로찾기화면 - 경로찾기  5회 호출
    - 하루 평균 3번정도 접속한다는 가정을한다.
```javascript
   5*3 = 15번
```

|총 접속 수(DAU) | 1인당 하루에 몇번 접속|
|:---:|:---:|
|46000|15번|

|이름|계산식| 결과|
|:---:|:---:|:---:|
|1일평균 rps|46000 * 15 / 86400 |8rps
|최대트래픽/최소트래픽|기준모르겠네요 ..|10|
|1일 최대 rps|8rps * 10|80rps|



4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

### 접속빈도가 높은 페이지
#### frequency_smoke_test.js [SMOKE-TEST]
```shell

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: frequency_smoke_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.3s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ mainpage

     checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 17 kB   1.6 kB/s
     data_sent......................: 1.0 kB  99 B/s
     http_req_blocked...............: avg=11.67ms  min=0s     med=0s      max=116.72ms p(90)=11.67ms  p(95)=64.19ms
     http_req_connecting............: avg=702.19µs min=0s     med=0s      max=7.02ms   p(90)=702.18µs p(95)=3.86ms
   ✓ http_req_duration..............: avg=10.82ms  min=8.78ms med=10ms    max=18.44ms  p(90)=11.6ms   p(95)=15.02ms
       { expected_response:true }...: avg=10.82ms  min=8.78ms med=10ms    max=18.44ms  p(90)=11.6ms   p(95)=15.02ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=243.85µs min=0s     med=135.9µs max=698µs    p(90)=595.22µs p(95)=646.6µs
     http_req_sending...............: avg=100.5µs  min=0s     med=0s      max=512.8µs  p(90)=494.26µs p(95)=503.53µs
     http_req_tls_handshaking.......: avg=9.52ms   min=0s     med=0s      max=95.2ms   p(90)=9.52ms   p(95)=52.36ms
     http_req_waiting...............: avg=10.48ms  min=8.78ms med=9.62ms  max=17.95ms  p(90)=11.06ms  p(95)=14.5ms
     http_reqs......................: 10      0.973883/s
     iteration_duration.............: avg=1.02s    min=1.01s  med=1.01s   max=1.14s    p(90)=1.03s    p(95)=1.08s
     iterations.....................: 10      0.973883/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

#### frequency_load_test.js [LOAD-TEST]
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: frequency_load_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 80 max VUs, 2m20s max duration (incl. graceful stop):
           * default: Up to 80 looping VUs for 1m50s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m50.9s), 00/80 VUs, 6355 complete and 0 interrupted iterations
default ✓ [======================================] 00/80 VUs  1m50s

     ✓ mainpage

     checks.........................: 100.00% ✓ 6355      ✗ 0
     data_received..................: 7.9 MB  71 kB/s
     data_sent......................: 320 kB  2.9 kB/s
     http_req_blocked...............: avg=338.47µs min=0s     med=0s     max=104.9ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=89.79µs  min=0s     med=0s     max=15.69ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=10.57ms  min=6.79ms med=9.94ms max=34.25ms p(90)=12.9ms   p(95)=14.84ms
       { expected_response:true }...: avg=10.57ms  min=6.79ms med=9.94ms max=34.25ms p(90)=12.9ms   p(95)=14.84ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 6355
     http_req_receiving.............: avg=215.23µs min=0s     med=0s     max=6.82ms  p(90)=749.22µs p(95)=925µs
     http_req_sending...............: avg=61.67µs  min=0s     med=0s     max=1.37ms  p(90)=277.6µs  p(95)=517.15µs
     http_req_tls_handshaking.......: avg=241.67µs min=0s     med=0s     max=89.04ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=10.3ms   min=6.38ms med=9.62ms max=34.25ms p(90)=12.62ms  p(95)=14.57ms
     http_reqs......................: 6355    57.311709/s
     iteration_duration.............: avg=1.01s    min=1s     med=1.01s  max=1.12s   p(90)=1.02s    p(95)=1.02s
     iterations.....................: 6355    57.311709/s
     vus............................: 2       min=2       max=80
     vus_max........................: 80      min=80      max=80
```
#### frequency_stress_test.js [STRESS-TEST]
```javascript
          /\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: frequency_stress_test.js
output: -

    scenarios: (100.00%) 1 scenario, 1500 max VUs, 6m55s max duration (incl. graceful stop):
* default: Up to 1500 looping VUs for 6m25s over 14 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0038] Request Failed                                error="Get \"https://www.subwayinfra.p-e.kr\": dial tcp 3.34.111.170:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."
WARN[0038] Request Failed                                error="Get \"https://www.subwayinfra.p-e.kr\": dial tcp 3.34.111.170:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."
WARN[0173] Request Failed                                error="Get \"https://www.subwayinfra.p-e.kr\": request timeout"
WARN[0197] Request Failed                                error="Get \"https://www.subwayinfra.p-e.kr\": request timeout"
WARN[0215] Request Failed                                error="Get \"https://www.subwayinfra.p-e.kr\": request timeout"
WARN[0277] Request Failed                                error="Get \"https://www.subwayinfra.p-e.kr\": request timeout"

running (6m25.7s), 0000/1500 VUs, 281832 complete and 3 interrupted iterations
default ✓ [======================================] 0000/1500 VUs  6m25s

data_received..................: 673 MB 1.7 MB/s
data_sent......................: 65 MB  168 kB/s
http_req_blocked...............: avg=69.49µs  min=0s     med=0s      max=507.69ms p(90)=0s      p(95)=0s
http_req_connecting............: avg=25.24µs  min=0s     med=0s      max=447.9ms  p(90)=0s      p(95)=0s
http_req_duration..............: avg=195.18ms min=0s     med=13.86ms max=1m0s     p(90)=24.8ms  p(95)=32.16ms
{ expected_response:true }...: avg=38.45ms  min=5.61ms med=13.76ms max=54.62s   p(90)=23.72ms p(95)=28.92ms
http_req_failed................: 1.56%  ✓ 8833       ✗ 554834
http_req_receiving.............: avg=130.83µs min=0s     med=0s      max=32.99ms  p(90)=514.7µs p(95)=816.1µs
http_req_sending...............: avg=94.97µs  min=0s     med=0s      max=33.99ms  p(90)=513µs   p(95)=545.4µs
http_req_tls_handshaking.......: avg=43.66µs  min=0s     med=0s      max=500.11ms p(90)=0s      p(95)=0s
http_req_waiting...............: avg=194.96ms min=0s     med=13.65ms max=1m0s     p(90)=24.55ms p(95)=31.9ms
http_reqs......................: 563667 1461.23232/s
iteration_duration.............: avg=1.33s    min=1s     med=1.01s   max=1m1s     p(90)=1.03s   p(95)=1.04s
iterations.....................: 281832 730.612272/s
vus............................: 4      min=4        max=1500
vus_max........................: 1500   min=1500     max=1500
```

### 데이터를 갱신하는 페이지 

#### update_smoke_test.js [SMOKE-TEST]
```javascript


/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: update_smoke_test.js
output: -

    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (11.1s), 0/1 VUs, 5 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ login is success
     ✓ update success

checks.........................: 100.00% ✓ 10      ✗ 0
data_received..................: 6.4 kB  578 B/s
data_sent......................: 2.6 kB  235 B/s
http_req_blocked...............: avg=34.07ms  min=0s      med=0s       max=340.78ms p(90)=34.07ms  p(95)=187.43ms
http_req_connecting............: avg=3.89ms   min=0s      med=0s       max=38.92ms  p(90)=3.89ms   p(95)=21.4ms
   ✓ http_req_duration..............: avg=73.35ms  min=61.97ms med=70.23ms  max=96.2ms   p(90)=85.88ms  p(95)=91.04ms
{ expected_response:true }...: avg=73.35ms  min=61.97ms med=70.23ms  max=96.2ms   p(90)=85.88ms  p(95)=91.04ms
http_req_failed................: 0.00%   ✓ 0       ✗ 10
http_req_receiving.............: avg=344.6µs  min=0s      med=227.64µs max=1.06ms   p(90)=846.62µs p(95)=953.86µs
http_req_sending...............: avg=279.68µs min=0s      med=104.7µs  max=1ms      p(90)=607.66µs p(95)=805.08µs
http_req_tls_handshaking.......: avg=21.71ms  min=0s      med=0s       max=217.15ms p(90)=21.71ms  p(95)=119.43ms
http_req_waiting...............: avg=72.73ms  min=61.81ms med=68.95ms  max=95.66ms  p(90)=85.82ms  p(95)=90.74ms
http_reqs......................: 10      0.89862/s
iteration_duration.............: avg=2.22s    min=2.14s   med=2.14s    max=2.53s    p(90)=2.38s    p(95)=2.46s
iterations.....................: 5       0.44931/s
vus............................: 1       min=1     max=1
vus_max........................: 1       min=1     max=1

```

#### update_load_test.js [LOAD-TEST]
```javascript

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: update_load_test.js
output: -

    scenarios: (100.00%) 1 scenario, 80 max VUs, 4m30s max duration (incl. graceful stop):
* default: Up to 80 looping VUs for 4m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (4m01.2s), 00/80 VUs, 6759 complete and 0 interrupted iterations
default ✓ [======================================] 00/80 VUs  4m0s

     ✓ login is success
     ✓ update success

checks.........................: 100.00% ✓ 13518     ✗ 0
data_received..................: 2.8 MB  12 kB/s
data_sent......................: 2.8 MB  11 kB/s
http_req_blocked...............: avg=810.9µs  min=0s      med=0s      max=263.92ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=252.42µs min=0s      med=0s      max=66.82ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=66.88ms  min=32.05ms med=63.66ms max=517.45ms p(90)=84.09ms  p(95)=92.32ms
{ expected_response:true }...: avg=66.88ms  min=32.05ms med=63.66ms max=517.45ms p(90)=84.09ms  p(95)=92.32ms
http_req_failed................: 0.00%   ✓ 0         ✗ 13518
http_req_receiving.............: avg=333.38µs min=0s      med=0s      max=85.94ms  p(90)=659.62µs p(95)=999µs
http_req_sending...............: avg=154.02µs min=0s      med=0s      max=9.51ms   p(90)=532.5µs  p(95)=599.4µs
http_req_tls_handshaking.......: avg=553.97µs min=0s      med=0s      max=185.32ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=66.39ms  min=31.42ms med=63.22ms max=517.45ms p(90)=83.37ms  p(95)=91.66ms
http_reqs......................: 13518   56.037846/s
iteration_duration.............: avg=2.14s    min=2.08s   med=2.14s   max=2.61s    p(90)=2.17s    p(95)=2.19s
iterations.....................: 6759    28.018923/s
vus............................: 1       min=1       max=80
vus_max........................: 80      min=80      max=80

```

#### update_load_test.js [STRESS-TEST]
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update_stress_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1500 max VUs, 6m55s max duration (incl. graceful stop):
           * default: Up to 1500 looping VUs for 6m25s over 14 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0032] Request Failed                                error="Post \"https://www.subwayinfra.p-e.kr/login/token\": dial tcp 3.34.111.170:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."
ERRO[0032] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
        at reflect.methodValueCall (native)
        at logged in successfully (file:///C:/Users/hoo/IdeaProjects/nextstep/infra-subway-monitoring/src/main/resources/k6test/update_stress_test.js:44:49(4))
        at go.k6.io/k6/js/common.Bind.func1 (native)
        at file:///C:/Users/hoo/IdeaProjects/nextstep/infra-subway-monitoring/src/main/resources/k6test/update_stress_test.js:43:27(35)  executor=ramping-vus scenario=default source=stacktrace
WARN[0102] Request Failed                                error="Post \"https://www.subwayinfra.p-e.kr/login/token\": dial tcp 3.34.111.170:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."
ERRO[0102] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
        at reflect.methodValueCall (native)
        at logged in successfully (file:///C:/Users/hoo/IdeaProjects/nextstep/infra-subway-monitoring/src/main/resources/k6test/update_stress_test.js:44:49(4))
        at go.k6.io/k6/js/common.Bind.func1 (native)
        at file:///C:/Users/hoo/IdeaProjects/nextstep/infra-subway-monitoring/src/main/resources/k6test/update_stress_test.js:43:27(35)  executor=ramping-vus scenario=default source=stacktrace

running (6m25.9s), 0000/1500 VUs, 190043 complete and 0 interrupted iterations
default ✓ [======================================] 0000/1500 VUs  6m25s

     ✗ logged in successfully
      ↳  99% — ✓ 190041 / ✗ 2
     ✓ response member

     checks.........................: 99.99% ✓ 380082     ✗ 2
     data_received..................: 108 MB 281 kB/s
     data_sent......................: 78 MB  202 kB/s
     http_req_blocked...............: avg=91.3µs   min=0s     med=0s       max=381.44ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=27.86µs  min=0s     med=0s       max=355.6ms  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=489.47ms min=0s     med=239.86ms max=4.57s    p(90)=1.36s   p(95)=1.79s
       { expected_response:true }...: avg=509.4ms  min=9.73ms med=239.15ms max=4.57s    p(90)=1.42s   p(95)=1.85s
     http_req_failed................: 50.00% ✓ 190043     ✗ 190041
     http_req_receiving.............: avg=1.47ms   min=0s     med=0s       max=893.17ms p(90)=1.03ms  p(95)=2.23ms
     http_req_sending...............: avg=54.93µs  min=0s     med=0s       max=70.26ms  p(90)=143.3µs p(95)=521.4µs
     http_req_tls_handshaking.......: avg=62.18µs  min=0s     med=0s       max=102.27ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=487.94ms min=0s     med=237.84ms max=4.57s    p(90)=1.36s   p(95)=1.79s
     http_reqs......................: 380084 984.897038/s
     iteration_duration.............: avg=1.98s    min=1.02s  med=1.74s    max=21.14s   p(90)=3.3s    p(95)=3.78s
     iterations.....................: 190043 492.45111/s
     vus............................: 6      min=6        max=1500
     vus_max........................: 1500   min=1500     max=1500

```


### 데이터를 조회하는데 여러 데이터를 참조하는 페이지 


#### multiple_data_smoke_test.js [SMOKE-TEST]
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: multiple_data_smoke_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.1s), 0/1 VUs, 8 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 경로찾기정상

     checks.........................: 100.00% ✓ 8        ✗ 0
     data_received..................: 7.7 kB  770 B/s
     data_sent......................: 954 B   95 B/s
     http_req_blocked...............: avg=13.53ms  min=0s      med=0s      max=108.27ms p(90)=32.48ms  p(95)=70.37ms
     http_req_connecting............: avg=884.78µs min=0s      med=0s      max=7.07ms   p(90)=2.12ms   p(95)=4.6ms
   ✓ http_req_duration..............: avg=232.07ms min=58.29ms med=90.51ms max=682.34ms p(90)=678.92ms p(95)=680.63ms
       { expected_response:true }...: avg=232.07ms min=58.29ms med=90.51ms max=682.34ms p(90)=678.92ms p(95)=680.63ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 8
     http_req_receiving.............: avg=789.12µs min=0s      med=296.1µs max=3ms      p(90)=2.37ms   p(95)=2.68ms
     http_req_sending...............: avg=136.47µs min=0s      med=0s      max=522.59µs p(90)=520.15µs p(95)=521.37µs
     http_req_tls_handshaking.......: avg=11.2ms   min=0s      med=0s      max=89.64ms  p(90)=26.89ms  p(95)=58.26ms
     http_req_waiting...............: avg=231.14ms min=58.22ms med=90.32ms max=678.83ms p(90)=676.02ms p(95)=677.42ms
     http_reqs......................: 8       0.795978/s
     iteration_duration.............: avg=1.25s    min=1.06s   med=1.1s    max=1.79s    p(90)=1.72s    p(95)=1.76s
     iterations.....................: 8       0.795978/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

#### multiple_data_load_test.js [LOAD-TEST]
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: multiple_data_load_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 80 max VUs, 4m30s max duration (incl. graceful stop):
           * default: Up to 80 looping VUs for 4m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)





running (4m00.2s), 00/80 VUs, 14012 complete and 0 interrupted iterations
default ✓ [===================================] 00/80 VUs  4m0s

     ✓ 경로찾기정상

     checks.........................: 100.00% ✓ 14012     ✗ 0
     data_received..................: 5.8 MB  24 kB/s
     data_sent......................: 651 kB  2.7 kB/s
     http_req_blocked...............: avg=151.79µs min=0s      med=0s      max=141.76ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=40.72µs  min=0s      med=0s      max=12.54ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=27.25ms  min=16.34ms med=24.94ms max=142.12ms p(90)=35.88ms  p(95)=42.33ms
       { expected_response:true }...: avg=27.25ms  min=16.34ms med=24.94ms max=142.12ms p(90)=35.88ms  p(95)=42.33ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 14012
     http_req_receiving.............: avg=454.64µs min=0s      med=32.85µs max=34.08ms  p(90)=1ms      p(95)=1.71ms
     http_req_sending...............: avg=61.73µs  min=0s      med=0s      max=1.52ms   p(90)=261.29µs p(95)=521.1µs
     http_req_tls_handshaking.......: avg=105.39µs min=0s      med=0s      max=93.35ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=26.73ms  min=16.34ms med=24.53ms max=140.85ms p(90)=35.03ms  p(95)=41.26ms
     http_reqs......................: 14012   58.338962/s
     iteration_duration.............: avg=1.03s    min=1.01s   med=1.03s   max=1.22s    p(90)=1.04s    p(95)=1.04s
     iterations.....................: 14012   58.338962/s
     vus............................: 1       min=1       max=80
     vus_max........................: 80      min=80      max=80
```

#### multiple_data_stress_test.js [STRESS-TEST]
```javascript
          /\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: multiple_data_stress_test.js
output: -

    scenarios: (100.00%) 1 scenario, 3050 max VUs, 14m5s max duration (incl. graceful stop):
* default: Up to 3050 looping VUs for 13m35s over 19 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (13m35.8s), 0000/3050 VUs, 106501 complete and 0 interrupted iterations
default ✓ [======================================] 0000/3050 VUs  13m35s

     ✓ 경로탐색 정상

checks.........................: 100.00% ✓ 319503     ✗ 0
data_received..................: 815 MB  999 kB/s
data_sent......................: 23 MB   28 kB/s
http_req_blocked...............: avg=227.62µs min=0s      med=0s      max=110.34ms p(90)=0s      p(95)=0s
http_req_connecting............: avg=72µs     min=0s      med=0s      max=50.51ms  p(90)=0s      p(95)=0s
http_req_duration..............: avg=11.41s   min=15.54ms med=11.39s  max=31.17s   p(90)=25.72s  p(95)=26.59s
  { expected_response:true }...: avg=11.41s   min=15.54ms med=11.39s  max=31.17s   p(90)=25.72s  p(95)=26.59s
http_req_failed................: 0.00%   ✓ 0          ✗ 319503
http_req_receiving.............: avg=3.32ms   min=0s      med=241.4µs max=1.24s    p(90)=4.62ms  p(95)=12.5ms
http_req_sending...............: avg=62.84µs  min=0s      med=0s      max=14ms     p(90)=504.8µs p(95)=529.69µs
http_req_tls_handshaking.......: avg=154.28µs min=0s      med=0s      max=93.32ms  p(90)=0s      p(95)=0s
http_req_waiting...............: avg=11.41s   min=15.54ms med=11.39s  max=31.17s   p(90)=25.71s  p(95)=26.59s
http_reqs......................: 319503  391.662109/s
iteration_duration.............: avg=17.81s   min=1.02s   med=18.47s  max=32.17s   p(90)=27.16s  p(95)=28.08s
iterations.....................: 106501  130.554036/s
vus............................: 24      min=16       max=3050
vus_max........................: 3050    min=3050     max=3050
```