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

### Step1. 요구사항
#### 1. 로그 설정하기
- [X] Application Log 파일로 저장하기
    + 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
- [X] Nginx Access Log 설정하기

#### 2. Cloudwatch로 모니터링
- [X] Cloudwatch로 로그 수집하기
- [X] Cloudwatch로 메트릭 수집하기

### Step2. 요구사항
- [X] 웹 성능 테스트
    + [X] 웹 성능 예산을 작성
    + [X] [WebPageTest](https://www.webpagetest.org/), [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) 등 테스트해보고 개선이 필요한 부분을 파악


- [X] 부하 테스트
    + [X] 테스트 전제조건 정리
        * [X] 대상 시스템 범위
        * [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
        * [X] 부하 테스트 시 저장될 데이터 건수 및 크기
    + [X] 각 시나리오에 맞춰 스크립트 작성
        * [X] 접속 빈도가 높은 페이지
        * [X] 데이터를 갱신하는 페이지
        * [X] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    + [X] Smoke, Load, Stress 테스트 후 결과를 기록


### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
- byunghakjang1230-EC2-public-2 : 13.125.246.89
    - file log : /home/ubuntu/logs/applications/subway/file_info.log
    - json log : /home/ubuntu/logs/applications/subway/json_error.log
    - nginx log
        + /var/log/nginx/access.log
        + /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-byunghakjang1230
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    * 예산선정 기준 비교대상 사이트 - [네이버지도 지하철](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
        - **WebPageTest**
            * Security score
                + 비교 사이트 : F
                + 목표 점수 : E -> B
            * First Byte Time
                + 비교 사이트 : A
                + 목표 점수 : A -> 유지
            * Keep-alive Enabled
                + 비교 사이트 : A
                + 목표 점수 : A -> 유지
            * Compress Transfer
                + 비교 사이트 : A
                + 목표 점수 : F -> A
            * Compress Images
                + 비교 사이트 : A
                + 목표 점수 : A -> 유지
            * Cache static content
                + 비교 사이트 : C
                + 목표 점수 : C -> B
            * Effective use of CDN
                + 비교 사이트 : X
                + 목표 점수 : X
        - **Pagespeed** 
            * 점수
                + 비교 사이트 : 89
                + 목표 점수 : 68 -> 90
            * First Contentful Paint (FCP)
                + 비교 사이트 : 0.5초
                + 목표 시간 : 2.7초 -> 0.5초
            * Time to Interactive (TTI)
                + 비교 사이트 : 1.7초
                + 목표 시간 : 2.8초 -> 1.5초
            * Speed Index
                + 비교 사이트 : 2.4초
                + 목표 시간 : 2.7초 -> 2초
            * Total Blocking Time (TBT)
                + 비교 사이트 : 20ms
                + 목표 시간 : 60ms -> 20ms
            * Large Contentful Paint (LCP)
                + 비교 사이트 : 1.6초
                + 목표 시간 : 2.8초 -> 2초
            * Cumulative Layout Shift (CLS)
                + 비교 사이트 : 0.006
                + 목표 점수 : 0.004 -> 유지
        - Lighthouse : 평균 85점 이상

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - 텍스트 기반 리소스 압축
    - 자바스크립트, CSS 코드에서 즉시 필요한 코드와 나중에 필요한 코드를 분리하여 즉시로딩, 지연로딩 적용.
    - 빠른 렌더링을 위해 html속성 수정
    - 보안부분 개선
    - 정적자원 케싱

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 예상 1일 사용자 수(DAU): 11,125,260 / 31 = 358,879 명
        + 2020년 06월 기준 월간 네이버 지도 어플 사용자수 : 11,125,260 명
            * 월간 이용자수 참고 데이터 : https://www.sedaily.com/NewsVIew/1Z58J6MCL1
    - 최대 트래픽 : 70만명 / 평소 트래픽 : 358,879 명
    - 1명당 1일 평균 접속 혹은 요청수(예상치) : 2.5회 (일반적으로 2회와 약속이 생길 경우 3회의 중간 수치)
    - Throughput : 1일 평균 rps ~ 1일 최대 rps
        + 1일 총 접속 수 : 358,879 * 2.5 = 897,198 회
        + 1일 평균 rps : 897,198 / 86,400 = 10.38
        + 1일 최대 rps : 10.38 x (700,000 / 358,879) = 20.25 
    - Latency : 100ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- Smoke test : [smoke.js](k6/smoke.js)
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


running (10.6s), 0/1 VUs, 7 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find Paths
     ✓ find Favorite Paths

     checks.........................: 100.00% ✓ 28       ✗ 0
     data_received..................: 39 kB   3.7 kB/s
     data_sent......................: 8.4 kB  797 B/s
     http_req_blocked...............: avg=11.79ms  min=4.06µs  med=7.37µs   max=329.72ms p(90)=50.04µs  p(95)=76.6µs
     http_req_connecting............: avg=1.56ms   min=0s      med=0s       max=43.95ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=113.89ms min=52.07ms med=82.6ms   max=273.01ms p(90)=223.36ms p(95)=259.33ms
       { expected_response:true }...: avg=113.89ms min=52.07ms med=82.6ms   max=273.01ms p(90)=223.36ms p(95)=259.33ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 28
     http_req_receiving.............: avg=364.37µs min=82.04µs med=183.13µs max=2.5ms    p(90)=642.37µs p(95)=1.29ms
     http_req_sending...............: avg=78.46µs  min=19.64µs med=64.26µs  max=298.05µs p(90)=196.11µs p(95)=223.89µs
     http_req_tls_handshaking.......: avg=6ms      min=0s      med=0s       max=168.18ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=113.45ms min=51.87ms med=82.17ms  max=272.55ms p(90)=222.81ms p(95)=257.61ms
     http_reqs......................: 28      2.653185/s
     iteration_duration.............: avg=1.5s     min=1.41s   med=1.49s    max=1.75s    p(90)=1.61s    p(95)=1.68s
     iterations.....................: 7       0.663296/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

---
- Load test : [load.js](k6/load.js)
```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 35 max VUs, 2m0s max duration (incl. graceful stop):
           * default: Up to 35 looping VUs for 1m30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m30.3s), 00/35 VUs, 1092 complete and 0 interrupted iterations
default ↓ [======================================] 02/35 VUs  1m30s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find Paths
     ✓ find Favorite Paths

     checks.........................: 100.00% ✓ 4368      ✗ 0
     data_received..................: 5.5 MB  61 kB/s
     data_sent......................: 1.3 MB  14 kB/s
     http_req_blocked...............: avg=1.29ms   min=1.66µs  med=4.85µs   max=464.11ms p(90)=12.33µs  p(95)=32.89µs
     http_req_connecting............: avg=421.87µs min=0s      med=0s       max=355.95ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=237.15ms min=27.28ms med=94.41ms  max=1.26s    p(90)=678.06ms p(95)=791ms
       { expected_response:true }...: avg=237.15ms min=27.28ms med=94.41ms  max=1.26s    p(90)=678.06ms p(95)=791ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 4368
     http_req_receiving.............: avg=208.7µs  min=21.61µs med=112.98µs max=43.03ms  p(90)=331.29µs p(95)=547µs
     http_req_sending...............: avg=87.34µs  min=9.21µs  med=27.26µs  max=107.43ms p(90)=126.52µs p(95)=168.79µs
     http_req_tls_handshaking.......: avg=864.86µs min=0s      med=0s       max=396.79ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=236.85ms min=27.13ms med=94.11ms  max=1.25s    p(90)=677.94ms p(95)=789.57ms
     http_reqs......................: 4368    48.368841/s
     iteration_duration.............: avg=1.95s    min=1.25s   med=1.98s    max=2.91s    p(90)=2.54s    p(95)=2.64s
     iterations.....................: 1092    12.09221/s
     vus............................: 2       min=2       max=35
     vus_max........................: 35      min=35      max=35
```
- Stress test - 경로조회 : [stress_paths.js](k6/stress_paths.js)
```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress_paths.js
     output: -

  scenarios: (100.00%) 1 scenario, 240 max VUs, 2m30s max duration (incl. graceful stop):
           * default: Up to 240 looping VUs for 2m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m10.2s), 000/240 VUs, 1928 complete and 0 interrupted iterations
default ↓ [======================================] 163/240 VUs  2m0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find Paths

     checks.........................: 100.00% ✓ 5784      ✗ 0
     data_received..................: 9.4 MB  72 kB/s
     data_sent......................: 1.7 MB  13 kB/s
     http_req_blocked...............: avg=1.55ms   min=24.5µs      med=37.79µs  max=229.01ms p(90)=166.17µs p(95)=701.29µs
     http_req_connecting............: avg=414.01µs min=0s          med=0s       max=106.38ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=3.63s    min=7.44ms      med=4.06s    max=19.98s   p(90)=5.91s    p(95)=8.88s
       { expected_response:true }...: avg=3.63s    min=7.44ms      med=4.06s    max=19.98s   p(90)=5.91s    p(95)=8.88s
     http_req_failed................: 0.00%   ✓ 0         ✗ 5784
     http_req_receiving.............: avg=477.53µs min=91.3µs      med=249.35µs max=43.13ms  p(90)=778.65µs p(95)=1.24ms
     http_req_sending...............: avg=235.43µs min=-28762300ns med=79.69µs  max=72.26ms  p(90)=295.03µs p(95)=505.17µs
     http_req_tls_handshaking.......: avg=1.01ms   min=0s          med=0s       max=209.04ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=3.63s    min=7.19ms      med=4.06s    max=19.98s   p(90)=5.91s    p(95)=8.88s
     http_reqs......................: 5784    44.407424/s
     iteration_duration.............: avg=11.91s   min=1.11s       med=11.77s   max=35.95s   p(90)=19.9s    p(95)=20.9s
     iterations.....................: 1928    14.802475/s
     vus............................: 11      min=4       max=240
     vus_max........................: 240     min=240     max=240
```
- Stress test - 즐겨찾기 조회 : [stress_favorite.js](k6/stress_favorite.js)
```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress_favorite.js
     output: -

  scenarios: (100.00%) 1 scenario, 250 max VUs, 2m35s max duration (incl. graceful stop):
           * default: Up to 250 looping VUs for 2m5s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m05.6s), 000/250 VUs, 19298 complete and 0 interrupted iterations
default ✓ [======================================] 000/250 VUs  2m5s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find Favorite Paths

     checks.........................: 100.00% ✓ 57894      ✗ 0
     data_received..................: 29 MB   230 kB/s
     data_sent......................: 16 MB   129 kB/s
     http_req_blocked...............: avg=814.53µs min=23.2µs      med=36.7µs  max=1.4s     p(90)=139.19µs p(95)=237.83µs
     http_req_connecting............: avg=256.21µs min=0s          med=0s      max=648.75ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=48.86ms  min=-11224900ns med=25.08ms max=1.04s    p(90)=107.96ms p(95)=159.94ms
       { expected_response:true }...: avg=48.86ms  min=-11224900ns med=25.08ms max=1.04s    p(90)=107.96ms p(95)=159.94ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 57894
     http_req_receiving.............: avg=1.04ms   min=-29654000ns med=208µs   max=524.91ms p(90)=859.64µs p(95)=1.94ms
     http_req_sending...............: avg=1.47ms   min=-33483300ns med=66.6µs  max=415.32ms p(90)=819.97µs p(95)=3.74ms
     http_req_tls_handshaking.......: avg=419.33µs min=0s          med=0s      max=1.03s    p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=46.34ms  min=0s          med=23.89ms max=787.8ms  p(90)=103.07ms p(95)=150.1ms
     http_reqs......................: 57894   460.946389/s
     iteration_duration.............: avg=1.15s    min=1.02s       med=1.08s   max=2.99s    p(90)=1.35s    p(95)=1.52s
     iterations.....................: 19298   153.648796/s
     vus............................: 17      min=4        max=250
     vus_max........................: 250     min=250      max=250
```
