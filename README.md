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

### 1단계 - 웹 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

**용어 정리**

| 용어 | 영문명                   | 설명                                                                                                   |
| ---- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| FCP  | First Contentful Paint   | 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.                                               |
| TTI  | Time to Interactive      | 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.                                        |
| SI   | Speed Index              | 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.                                                     |
| TBT  | Total Blocking Time      | FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다. |
| LCP  | Largest Contentful Paint | 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.                                                  |
| CLS  | Cumulative Layout Shift  | 표시 영역 안에 보이는 요소의 이동을 측정합니다.                                                        | 

**Desktop**

| NAME         | FCP     | TTI     | SI      | TBT     | LCP     | CLS      |
| ------------ | ------- | ------- | ------- | ------- | ------- | -------- |
| RUNNINGMAP   | 2.8s    | 2.9s    | 2.8s    | 50ms 🔼 | 2.9s    | 0.004    |
| 서울교통공사 | 1.5s    | 2.1s 🔼 | 2.2s 🔼 | 280ms   | 2.6s    | 0.001 🔼 |
| 네이버지도   | 0.5s 🔼 | 2.9s    | 2.2s 🔼 | 320ms   | 4.2s    | 0.032    |
| 카카오맵     | 0.6s    | 2.9s    | 2.7s    | 1090ms  | 0.8s 🔼 | 0.018    |

**Mobile**

| NAME         | FCP     | TTI     | SI      | TBT      | LCP     | CLS    |
| ------------ | ------- | ------- | ------- | -------- | ------- | ------ |
| RUNNINGMAP   | 14.8s   | 15.3s   | 14.8s   | 490ms    | 15.3s   | 0.042  |
| 서울교통공사 | 6.9s    | 9.0s    | 8.6s    | 1120ms   | 7.7s    | 0 🔼 |
| 네이버지도   | 3.5s    | 3.7s 🔼 | 3.6s 🔼 | 40ms 🔼 | 5.1s 🔼 | 0 🔼 | 
| 카카오맵     | 1.7s 🔼 | 4.5s    | 7.0s    | 70ms     | 6.7s    | 0.005  |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
  - 현재 제공하는 서비스는 `지하철 환승 정보를 제공`하는 서비스이기 때문에 가장 흡사한  [서울 도로 교통 공사](http://www.seoulmetro.co.kr/kr/cyberStation.do) 에서 제공하는 서비스와 비교했습니다.
  - Desktop 목표 응답시간
    - FCP : 2.8s -> 1.5s
    - TTI : 2.9s -> 2.1s
    - SI : 2.8s -> 2.2s
    - LCP 2.9s -> 2.6s
  - Mobile 목표 응답시간
    - FCP : 14.9s -> 6.9s
    - TTI : 15.3s -> 9.0s
    - SI : 14.8s -> 8.6s
    - LCP : 15.3s -> 7.7s


- 현재 제공하는 서비스는 `지하철 환승 정보를 제공`하는 서비스이기 때문에 가장
  흡사한  [서울 도로 교통 공사](http://www.seoulmetro.co.kr/kr/cyberStation.do) 에서 제공하는 서비스와 비교했습니다.
- Desktop 목표 응답시간
    - FCP : 2.8s -> 1.5s
    - TTI : 2.9s -> 2.1s
    - SI : 2.8s -> 2.2s
    - LCP 2.9s -> 2.6s
- Mobile 목표 응답시간
    - FCP : 14.9s -> 6.9s
    - TTI : 15.3s -> 9.0s
    - SI : 14.8s -> 8.6s
    - LCP : 15.3s -> 7.7s

- Desktop에서 FCP를 1.3초 줄인다면, TTI 목표인 2.1초 중 API 처리 시간은 0.6초이다.
- Mobuild에서 FCP를 8초 줄인다면, TTI 목표인 9.0 초 중 API 처리 시간은 2.1초이다.

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

### 2021년 11월 [서울시 지하철 시간대별 승하차 인원](https://data.seoul.go.kr/dataList/OA-12252/S/1/datasetView.do)

평균 트래픽과 최대 트래픽을 고려하기 위해 서울시 지하철을 이용하는 이용자들의 사용 시간대를 통해 비율을 산정했다.

| 분류                          | 건수            | 비율   |
|-----------------------------|---------------|------|
| 한 달간 총 이용 건                 | 410,000,000   | 100% |
| 한 달간 시간 단위 평균 이용 건          | 18,000,000건   | 4%   |
| 한 달간 피크 시간 대 이용 건           | 42,000,000건   | 10%  |

### RUNNINGMAP 예상 DAU

위에 산정한 비율표와 [카카오 지하철의 MAU](https://ko.lab.appa.pe/2016-09/kakao-korea.html)는 대략 140만명이니 DAU는 대략
4.7만명을 기준으로 일일 평균 트래픽과 최대 트래픽을 산정했다.

| 분류                           | 건수     | 비율    |
|------------------------------|--------|-------|
| 일일 총 이용 건                    | 47000  | 100%  |
| 일일 시간 단위 평균 이용 건             | 1800   | 4%    |
| 일일 피크 시간 대 이용 건              | 4700   | 10%   |


### Throughput

사회인의 특성상 출근 과 퇴근을 해야하기 때문에 1일 평균 요청수는 2로 볼 수 있다.
이를 바탕으로 계산하면, `1일 평균 rps는 2`, `1일 최대 rps는 3`으로 볼 수 있다.


### VUser
테스트 환경이 Cable 이여서 요청 응답 시간은 2.1초로 설정했다.

```
T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency를 추가한다
VUser = (목표 rps * T) / R
```

> 따라서 VUser 평균 값은 4이고, 최대 값은 6이다.

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

### Smoke

```
execution: local
   script: second_smoke.js
   output: -

scenarios: (100.00%) 1 scenario, 2 max VUs, 2m30s max duration (incl. graceful stop):
         * default: Up to 2 looping VUs for 2m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m00.0s), 0/2 VUs, 2550 complete and 0 interrupted iterations
default ✓ [======================================] 0/2 VUs  2m0s

   ✓ Randing page status check
   ✓ Paths Page status check
   ✓ Path api status check

   checks.........................: 100.00% ✓ 7650      ✗ 0
   data_received..................: 9.7 MB  81 kB/s
   data_sent......................: 1.3 MB  11 kB/s
   http_req_blocked...............: avg=60.17µs  min=0s      med=5µs     max=56.95ms  p(90)=8µs     p(95)=10µs
   http_req_connecting............: avg=14.62µs  min=0s      med=0s      max=15.25ms  p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=15.36ms  min=11.38ms med=15.03ms max=56.22ms  p(90)=17.36ms p(95)=18.76ms
     { expected_response:true }...: avg=15.36ms  min=11.38ms med=15.03ms max=56.22ms  p(90)=17.36ms p(95)=18.76ms
   http_req_failed................: 0.00%   ✓ 0         ✗ 7650
   http_req_receiving.............: avg=113.08µs min=12µs    med=91µs    max=7.75ms   p(90)=176.1µs p(95)=236.54µs
   http_req_sending...............: avg=28.33µs  min=2µs     med=21µs    max=14.82ms  p(90)=38µs    p(95)=47µs
   http_req_tls_handshaking.......: avg=39.29µs  min=0s      med=0s      max=42.26ms  p(90)=0s      p(95)=0s
   http_req_waiting...............: avg=15.21ms  min=11.3ms  med=14.86ms max=56.17ms  p(90)=17.22ms p(95)=18.5ms
   http_reqs......................: 7650    63.746414/s
   iteration_duration.............: avg=47.03ms  min=37.06ms med=46.4ms  max=103.19ms p(90)=52.39ms p(95)=56.9ms
   iterations.....................: 2550    21.248805/s
   vus............................: 1       min=1       max=1
   vus_max........................: 2       min=2       max=2
```
---

### Load

```
execution: local
   script: load.js
   output: -

scenarios: (100.00%) 1 scenario, 6 max VUs, 30m30s max duration (incl. graceful stop):
         * default: Up to 6 looping VUs for 30m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (30m00.0s), 0/6 VUs, 153465 complete and 0 interrupted iterations
default ✓ [======================================] 0/6 VUs  30m0s

   ✓ Randing page status check
   ✓ Paths Page status check
   ✓ Path api status check

   checks.........................: 100.00% ✓ 460395     ✗ 0
   data_received..................: 582 MB  323 kB/s
   data_sent......................: 77 MB   43 kB/s
   http_req_blocked...............: avg=51.83µs min=0s      med=2µs     max=79.41ms  p(90)=5µs     p(95)=7µs
   http_req_connecting............: avg=13.91µs min=0s      med=0s      max=27.46ms  p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=14.8ms  min=10.25ms med=14.08ms max=447.64ms p(90)=16.66ms p(95)=18.44ms
     { expected_response:true }...: avg=14.8ms  min=10.25ms med=14.08ms max=447.64ms p(90)=16.66ms p(95)=18.44ms
   http_req_failed................: 0.00%   ✓ 0          ✗ 460395
   http_req_receiving.............: avg=50.69µs min=6µs     med=29µs    max=18.29ms  p(90)=95µs    p(95)=120µs
   http_req_sending...............: avg=15.41µs min=1µs     med=10µs    max=24.26ms  p(90)=25µs    p(95)=30µs
   http_req_tls_handshaking.......: avg=34.55µs min=0s      med=0s      max=64.48ms  p(90)=0s      p(95)=0s
   http_req_waiting...............: avg=14.74ms min=10.23ms med=14.02ms max=447.52ms p(90)=16.59ms p(95)=18.35ms
   http_reqs......................: 460395  255.773081/s
   iteration_duration.............: avg=44.94ms min=33.19ms med=42.72ms max=548.56ms p(90)=50.4ms  p(95)=54.63ms
   iterations.....................: 153465  85.257694/s
   vus............................: 3       min=1        max=6
   vus_max........................: 6       min=6        max=6
```
---

### Stress

```
execution: local
   script: stress.js
   output: -

scenarios: (100.00%) 1 scenario, 120 max VUs, 23m30s max duration (incl. graceful stop):
         * default: Up to 120 looping VUs for 23m0s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (30m10.8s), 000/120 VUs, 206014 complete and 0 interrupted iterations
default ✓ [======================================] 000/120 VUs  23m0s

   ✓ Randing page status check
   ✓ Paths Page status check
   ✓ Path api status check

   checks.........................: 100.00% ✓ 618042     ✗ 0
   data_received..................: 782 MB  432 kB/s
   data_sent......................: 103 MB  57 kB/s
   http_req_blocked...............: avg=71.85µs  min=0s      med=1µs     max=427.82ms p(90)=3µs      p(95)=4µs
   http_req_connecting............: avg=17.28µs  min=0s      med=0s      max=36.54ms  p(90)=0s       p(95)=0s
 ✓ http_req_duration..............: avg=87.03ms  min=10.22ms med=22.64ms max=7m40s    p(90)=64.12ms  p(95)=90.67ms
     { expected_response:true }...: avg=87.03ms  min=10.22ms med=22.64ms max=7m40s    p(90)=64.12ms  p(95)=90.67ms
   http_req_failed................: 0.00%   ✓ 0          ✗ 618042
   http_req_receiving.............: avg=35.5µs   min=5µs     med=22µs    max=23.01ms  p(90)=53µs     p(95)=77µs
   http_req_sending...............: avg=24.6ms   min=1µs     med=6µs     max=7m40s    p(90)=15µs     p(95)=20µs
   http_req_tls_handshaking.......: avg=49.69µs  min=0s      med=0s      max=398.92ms p(90)=0s       p(95)=0s
   http_req_waiting...............: avg=62.39ms  min=10.16ms med=22.59ms max=5.93s    p(90)=64.06ms  p(95)=90.58ms
   http_reqs......................: 618042  341.310472/s
   iteration_duration.............: avg=192.61ms min=34.47ms med=70.98ms max=30.38s   p(90)=201.35ms p(95)=305.39ms
   iterations.....................: 206014  113.770157/s
   vus............................: 119     min=1        max=119
   vus_max........................: 120     min=120      max=120
```

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
