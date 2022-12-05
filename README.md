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

- Running Map : https://ilmare-cbk-subway.kro.kr/

#### 경쟁사 성능 비교분석 (Mobile)

| 측정항목 | Running Map | 서울교통공사 | 네이버지도 | 카카오맵  |
|------|-------------|--------|-------|-------|
| FCP  | 15.1s       | 6.3s   | 2.2s  | 1.7s  |
| TTI  | 15.6s       | 8.3s   | 6.1s  | 5.2s  |
| SI   | 15.1s       | 9.5s   | 6.2s  | 7.7s  |
| TBT  | 460ms       | 680ms  | 290ms | 120ms |
| LCP  | 15.6s       | 6.6s   | 7.4s  | 5.5s  |
| CLS  | 0.042       | 0      | 0.03  | 0.005 |

#### 경쟁사 성능 비교분석 (Desktop)

| 측정항목 | Running Map | 서울교통공사 | 네이버지도 | 카카오맵  |
|------|-------------|--------|-------|-------|
| FCP  | 2.7s        | 1.5s   | 0.5s  | 0.5s  |
| TTI  | 2.8s        | 2.1s   | 0.5s  | 0.7s  |
| SI   | 2.7s        | 2.8s   | 2.4s  | 2.6s  |
| TBT  | 50ms        | 320ms  | 0ms   | 0ms   |
| LCP  | 2.8s        | 2.2s   | 1.4s  | 1.1s  |
| CLS  | 0.004       | 0.001  | 0.006 | 0.039 |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- `CLS`는 성능 분석결과(Mobile, Desktop) 90~100점 (100점 기준) 사이의 결과값을 갖기 때문에 웹 성능예상 항목에서는 제외 했습니다.
- 사용자는 응답시간이 20% 이상일 때(유사 제품군과의 비교 시) 차이를 느끼므로 가장 빠른 경쟁사의 응답결과보다 20% 이상 차이나는 항목에 대해서 웹 성능예산 항목을 선정하였습니다.
- 3개의 경쟁사 중 `서울교통공사`가 전체적으로 가장 낮은 성능을 보여주고 있음으로 이를 제외한 `네이버지도`, `카카오맵` 두 결과값의 평균을 웹 성능예산으로 산정하였습니다.

#### CASE : Mobile

|       | FCP   | TTI   | SI    | TBT   | LCP   |
|-------|-------|-------|-------|-------|-------|
| AS-IS | 15.1s | 15.6s | 15.1s | 460ms | 15.6s |
| TO-BE | 1.95s | 5.65s | 6.95s | 205ms | 6.45s |

#### CASE : Desktop

|       | FCP  | TTI  | SI   | TBT  | LCP   |
|-------|------|------|------|------|-------|
| AS-IS | 2.7s | 2.8s | 2.7s | 50ms | 2.8s  |
| TO-BE | 0.5s | 0.6s | 2.5s | 0ms  | 1.25s |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- 텍스트 압축 사용
    - /js/vendors.js (전송크기: 2125kb -> 가능한 절감효과: 1716.5kb)
    - /js/main.js (전송크기: 172kb -> 가능한 절감효과: 143.6kb)
- 사용하지 않는 자바스크립트 줄이기
    - /js/vendors.js (전송크기: 2125kb -> 가능한 절감효과: 637.3kb)
    - /js/main.js (전송크기: 172kb -> 가능한 절감효과: 61.8kb)
- 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기
    - /js/vendors.js
    - /js/main.js
    - /images/main_logo.png
    - /images/logo_small.png
- 이미지 요소에 명시적인 너비 및 높이를 설정하여 레이아웃 변경 횟수를 줄이고 누적 레이아웃 변경을 개선

---

### 2단계 - 부하 테스트
```text
grafana url http://43.200.74.11:3000/ (자신의 공인 IP에 대해서만 3000 포트가 오픈된 상태)
계정 : 
- id : admin
- pw : admin1234
```
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

#### 대상 시스템 범위

- web server(nginx)
- web application server (tomcat)
- db (mysql)

#### 목표값 설정

- (참고) https://blog.naver.com/rkwkrhspm/222515422896
- 예상 1일 사용자 수 (DAU)
  - 경쟁사 (21년도 8월 기준, 간단하게 MAU/30일로 DAU 계산)
    - 네이버지도 MAU : 1,392만 -> 1,392만 / 30일 = 46.4만 (DAU)
    - 카카오맵 MAU : 729만 -> 729만 / 30일 = 24.3만 (DAU)
  - `예상 DAU = 10만명`
    - 네이버지도, 카카오맵 예상 DAU의 평균값에서 1/3 수준으로 가정
- 피크 시간대의 예상 집중률
  - 피크 시간대 : 07:00 ~ 10:00, 17:00 ~ 20:00 (출/퇴근 시간대로 가정)
  - 피크 시간대 집중률 = `2로 가정` (최대 트래픽 / 평소 트래픽)
- 1명당 1일 평균 접속 혹은 요청수를 예상
  - 1명당 1일 평균 요청수 : `6번`
    - 메인 페이지 접속 -> 경로검색 페이지 접속 -> 경로검색 기능을 이용한다고 가정
    - (메인 페이지 접속 횟수(1번) + 경로검색 페이지 접속 횟수(1번) + 경로검색(1번)) * 출/퇴근(2번) = `6번`
- Throughput : 1일 평균 rps ~ 1일 최대 rps
  - 1일 총 접속 수 = 100,000 * 6 = `600,000` (1일 사용자 수(DAU) x 1명당 1일 평균 접속 수)
  - 1일 평균 rps = 600,000 / 86,400 = `6.94` (1일 총 접속 수 / 86,400 (초/일))
  - 1일 최대 rps = 6.94 * 2 = `13.88` (1일 평균 rps x (최대 트래픽 / 평소 트래픽))
- VUser 구하기
  - T = (3 * 0.1(s)) + 1(s) = `1.3(s)` = (R * http_req_duration) (+ 1s)
    - T : a value larger than the time needed to complete a VU iteration
    - R : the number of requests per VU iteration
    - 사용자가 한 번 접속했을 때의 요청수를 3으로 설정 (1일 평균 요청수 = 6)
    - 내부망에서 테스트할 경우 예상 latency를 추가한다 (1s)
  - VUser(1일 평균 rps 기준) = (6.94 * 1.3) / 3 = `3(명)` = (목표 rps * T) / R

#### 부하 테스트 시 저장될 데이터 건수 및 크기

- 현재 구성된 데이터 건수
  - 지하철 노선 : 23개
  - 지하철 역 : 616개
  - 지하철 구간 : 340개
- 부하 테스트 시 메인페이지 및 경로 조회에 대해서 테스트를 진행할 예정이기 때문에 새롭게 저장될 데이터 건수 및 크기는 없음

#### 시나리오

- 메인 페이지 접속 -> 경로 검색 페이지 접속 -> 겅로 검색

#### Smoke 테스트

<details>
<summary>smoke.js</summary>

```javascript
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '60s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://ilmare-cbk-subway.kro.kr';

export function mainPage() {
  let response = http.get(`${BASE_URL}`);
  check(response, {'[Result] Main Page': (response) => response.status === 200});
}

export function pathPage() {
  let response = http.get(`${BASE_URL}/path`);
  check(response, {'[Result] Path Page': (response) => response.status === 200});
}

export function searchPath() {
  let response = http.get(`${BASE_URL}/paths/?source=1&target=178`);
  check(response, {'[Result] Search Path': (response) => response.status === 200});
}

export default function () {
  mainPage();
  pathPage();
  searchPath();
}
```

</details>

<details>
<summary>smoke 스크립트 실행 결과</summary>

```text

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 1 max VUs, 1m30s max duration (incl. graceful stop):
           * default: 1 looping VUs for 1m0s (gracefulStop: 30s)


running (1m00.0s), 0/1 VUs, 1063 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  1m0s

     ✓ [Result] Main Page
     ✓ [Result] Path Page
     ✓ [Result] Search Path

     checks.........................: 100.00% ✓ 3189      ✗ 0
     data_received..................: 5.8 MB  97 kB/s
     data_sent......................: 413 kB  6.9 kB/s
     http_req_blocked...............: avg=13.51µs min=1.27µs  med=2.4µs   max=15.61ms  p(90)=3.72µs  p(95)=4.29µs
     http_req_connecting............: avg=2.48µs  min=0s      med=0s      max=5.37ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=18.67ms min=1.28ms  med=1.65ms  max=321.02ms p(90)=51.36ms p(95)=56.74ms
       { expected_response:true }...: avg=18.67ms min=1.28ms  med=1.65ms  max=321.02ms p(90)=51.36ms p(95)=56.74ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 3189
     http_req_receiving.............: avg=64.83µs min=19.9µs  med=56.13µs max=6.03ms   p(90)=89.99µs p(95)=110.94µs
     http_req_sending...............: avg=15.49µs min=5.67µs  med=11.65µs max=631.06µs p(90)=24.09µs p(95)=26.34µs
     http_req_tls_handshaking.......: avg=7.82µs  min=0s      med=0s      max=14.09ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=18.59ms min=1.24ms  med=1.56ms  max=320.92ms p(90)=51.2ms  p(95)=56.63ms
     http_reqs......................: 3189    53.135497/s
     iteration_duration.............: avg=56.44ms min=50.12ms med=53.29ms max=342.15ms p(90)=65.81ms p(95)=75.51ms
     iterations.....................: 1063    17.711832/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1
```

</details>

<details>
<summary>smoke grafana 결과</summary>

![smoke_grafana](./monitoring/smoke_grafana.png)

</details>

#### Load 테스트

<details>
<summary>load.js</summary>

```javascript
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  stages: [
    {duration: '1m', target: 1},
    {duration: '2m', target: 3},
    {duration: '4m', target: 6},
    {durtaion: '2m', target: 3},
    {durtaion: '1m', target: 1},
    {duration: '10s', target: 0}, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://ilmare-cbk-subway.kro.kr';

export function mainPage() {
  let response = http.get(`${BASE_URL}`);
  check(response, {'[Result] Main Page': (response) => response.status === 200});
}

export function pathPage() {
  let response = http.get(`${BASE_URL}/path`);
  check(response, {'[Result] Path Page': (response) => response.status === 200});
}

export function searchPath() {
  let response = http.get(`${BASE_URL}/paths/?source=1&target=178`);
  check(response, {'[Result] Search Path': (response) => response.status === 200});
}

export default function () {
  mainPage();
  pathPage();
  searchPath();
}
```

</details>

<details>
<summary>load 스크립트 실행 결과</summary>

```text

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 6 max VUs, 7m40s max duration (incl. graceful stop):
           * default: Up to 6 looping VUs for 7m10s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (7m10.1s), 0/6 VUs, 10079 complete and 0 interrupted iterations
default ✓ [======================================] 0/6 VUs  7m10s

     ✓ [Result] Main Page
     ✓ [Result] Path Page
     ✓ [Result] Search Path

     checks.........................: 100.00% ✓ 30237     ✗ 0
     data_received..................: 55 MB   128 kB/s
     data_sent......................: 3.9 MB  9.1 kB/s
     http_req_blocked...............: avg=11.28µs  min=975ns    med=2.29µs  max=26.6ms   p(90)=3.7µs    p(95)=4.36µs
     http_req_connecting............: avg=1.19µs   min=0s       med=0s      max=7.33ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=40.71ms  min=745.22µs med=1.45ms  max=947.7ms  p(90)=104.51ms p(95)=122.9ms
       { expected_response:true }...: avg=40.71ms  min=745.22µs med=1.45ms  max=947.7ms  p(90)=104.51ms p(95)=122.9ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 30237
     http_req_receiving.............: avg=65.23µs  min=15.41µs  med=51.29µs max=16.47ms  p(90)=93.16µs  p(95)=115.95µs
     http_req_sending...............: avg=16.09µs  min=4.49µs   med=11.32µs max=14.63ms  p(90)=24.71µs  p(95)=29.18µs
     http_req_tls_handshaking.......: avg=6.03µs   min=0s       med=0s      max=23.69ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=40.63ms  min=699.47µs med=1.38ms  max=947.6ms  p(90)=104.4ms  p(95)=122.79ms
     http_reqs......................: 30237   70.301251/s
     iteration_duration.............: avg=122.56ms min=48.72ms  med=91.33ms max=950.72ms p(90)=145.27ms p(95)=434.99ms
     iterations.....................: 10079   23.43375/s
     vus............................: 1       min=1       max=6
     vus_max........................: 6       min=6       max=6

```

</details>

<details>
<summary>load grafana 결과</summary>

![load_grafana](./monitoring/load_grafana.png)

</details>

#### Stress 테스트

<details>
<summary>stress.js</summary>

```javascript
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  stages: [
    {duration: '1m', target: 6},
    {duration: '2m', target: 12},
    {duration: '2m', target: 24},
    {duration: '2m', target: 48},
    {duration: '2m', target: 96},
    {duration: '2m', target: 144},
    {duration: '2m', target: 288},
    {duration: '2m', target: 336},
    {duration: '2m', target: 384},
    {duration: '2m', target: 288},
    {duration: '2m', target: 192},
    {duration: '2m', target: 96},
    {duration: '2m', target: 48},
    {duration: '2m', target: 24},
    {duration: '1m', target: 6},
    {duration: '10s', target: 0}, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://ilmare-cbk-subway.kro.kr';

export function mainPage() {
  let response = http.get(`${BASE_URL}`);
  check(response, {'[Result] Main Page': (response) => response.status === 200});
}

export function pathPage() {
  let response = http.get(`${BASE_URL}/path`);
  check(response, {'[Result] Path Page': (response) => response.status === 200});
}

export function searchPath() {
  let response = http.get(`${BASE_URL}/paths/?source=1&target=178`);
  check(response, {'[Result] Search Path': (response) => response.status === 200});
}

export default function () {
  mainPage();
  pathPage();
  searchPath();
}
```

</details>

<details>
<summary>stress 스크립트 실행 결과</summary>

```text

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 384 max VUs, 28m40s max duration (incl. graceful stop):
           * default: Up to 384 looping VUs for 28m10s over 16 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (28m10.1s), 000/384 VUs, 44569 complete and 10 interrupted iterations
default ✓ [======================================] 000/384 VUs  28m10s

     ✓ [Result] Main Page
     ✓ [Result] Path Page
     ✗ [Result] Search Path
      ↳  98% — ✓ 44112 / ✗ 457

     checks.........................: 99.65% ✓ 133270    ✗ 457
     data_received..................: 244 MB 144 kB/s
     data_sent......................: 17 MB  10 kB/s
     http_req_blocked...............: avg=22.54µs min=965ns    med=2.36µs  max=64.56ms p(90)=3.66µs  p(95)=4.26µs
     http_req_connecting............: avg=3.02µs  min=0s       med=0s      max=15.24ms p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=1.8s    min=756.08µs med=1.75ms  max=35.16s  p(90)=6.14s   p(95)=9.47s
       { expected_response:true }...: avg=1.7s    min=756.08µs med=1.74ms  max=35.16s  p(90)=5.86s   p(95)=9.24s
     http_req_failed................: 0.34%  ✓ 457       ✗ 133270
     http_req_receiving.............: avg=65.39µs min=15.45µs  med=53.33µs max=13.99ms p(90)=93.35µs p(95)=115µs
     http_req_sending...............: avg=16.32µs min=4.57µs   med=11.57µs max=6.85ms  p(90)=24.29µs p(95)=29.85µs
     http_req_tls_handshaking.......: avg=15.54µs min=0s       med=0s      max=41.92ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1.8s    min=706.46µs med=1.67ms  max=35.16s  p(90)=6.14s   p(95)=9.47s
     http_reqs......................: 133727 79.122152/s
     iteration_duration.............: avg=5.41s   min=57.2ms   med=2.45s   max=35.16s  p(90)=11.01s  p(95)=28.75s
     iterations.....................: 44569  26.370106/s
     vus............................: 1      min=1       max=384
     vus_max........................: 384    min=384     max=384

```

</details>

<details>
<summary>stress grafana 결과</summary>

![stress_grafana](./monitoring/stress_grafana.png)

- Active VUser 144 ~ 287에서 http_req_blocked max 값이 떨어지지 않고 있음.
- 이 부분에서 http request failed 를 추정해볼 수 있음.

</details>

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
