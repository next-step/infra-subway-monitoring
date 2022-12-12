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
- `First Contentful Paint(FCP)`: 첫 번째 텍스트 또는 이미지가 표시되는 시간
- `Time to Interactive(TTI)`: 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- `Speed Index(SI)`: 페이지 콘텐츠가 얼마나 빨리 표시되는지
- `Total Blocking Time(TBT)`: FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현
- `Largest Contentful Paint(LCP)`: 최대 텍스트 또는 이미지가 표시되는 시간
- `Cumulative Layout Shift(누적 레이아웃 변경, CLS)`: 표시 영역 안에 보이는 요소의 이동을 측정한 값

|  |  | FCP | LCP | TTI | TBT | CLS | SI |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 서울교통공사 | Mobile | 6.1s | 6.2s | 8.2s | 1280ms | 0 | 9.7s |
|  | Web | 1.6s | 3.7s | 2.0s | 150ms | 0 | 2.7s |
| 네이버지도 | Mobile | 2.4s | 7.7s | 6.7s | 440ms | 0.03 | 6.3s |
|  | Web | 0.5s | 1.5s | 1.1s | 0ms | 0.006 | 2.3s |
| 카카오맵 | Mobile | 1.7s | 5.5s | 4.5s | 80ms | 0.005 | 6.7s |
|  | Web | 0.5s | 1.4s | 0.7s | 0ms | 0.039 | 2.4s |
| subway | Mobile | 14.9s | 15.4s | 15.4s | 480ms | 0.041 | 14.9s |
|  | Web | 2.7s | 2.8s | 2.8s | 30ms | 0.004 | 2.7s |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

경쟁 서비스 결과 기반 RUNNINGMAP 웹 성능예산 설정

|  | Mobile | Web |
| --- | --- | --- |
| FCP | 2s 이하 | 2s 이하 |
| LCP | 8s 이하 | 2s 이하 |
| TTI | 7s 이하 | 2s 이하 |
| TBT | 450ms 이하 | 1ms 이하 |
| CLS | 0.03 이하 | 0.01 이하 |
| SI | 7s 이하 | 3s 이하 |
| Lighthouse | 80점 이상 | 80점 이상 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

**지하철 노선도 서비스의 목표 응답 시간**
- TTI(Web 기준) 3s 이내로 응답
- FCP / 페이지 별 응답 시간은 3s 이내로 응답
    - 경쟁 서비스의 응답 시간이 1~6s로 응답
    - 3초의 법칙
- 경로 검색 기능의 경우 0.5s 이내로 응답
    - 경로 검색(춘천 → 신창)
        - 네이버지도 : 403.67ms
        - 카카오맵 : 267.35ms

**개선사항**
- 불필요 js 제거 및 축소
    - 예상 절감치: 0.56s
    - 대상 리소스(리소스 크기: 2.3MB)
        - /js/vendors.js
        - /js/main.js
- 텍스트 기반 리소스 압축(gzip, deflate, brotli)
    - 예상 절감치: 1.44s(모바일 기준: 9.15s)
    - 대상 리소스(리소스 크기: 2.3MB)
        - /js/vendors.js
        - /js/main.js
- 불필요 css, 폰트 제거 및 축소
    - 예상 절감치: 10ms
    - 웹폰트가 로드되는 동안 텍스트가 계속 표시됨
    - request 개수
        - font: 10개
        - css: 3개
    - 대상 리소스
        - /css?family=로보토:100,300,400,500,700,900
        - /npm/@mdi/font@5.0.45/css/materialdesignicons.min.css

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

- **시스템의 테스트 범위**: "경로 검색 기능"과 같은 접근 빈도가 높은 페이지 및 기능
- **사용 시간**: 출근, 퇴근 시간과 같은 서비스 이용이 집중되는 시간
- **DAU**: 4,320,000명
- **Throughput(rps)**: 100 ~ 1000
    - **1일 총 접속 수**: 8,640,000명
        - 4,320,000명 x 2(1일 2회 접속한다고 가정)
    - **1일 평균 rps**: 100
        - 8,640,000 / 864,000 = 100
    - **1일 최대 rps**: 1000
        - 100 x 10(최대 트래픽 / 평소 트래픽) = 1000
- **Latency**: 100ms
- **T**: (2 x 0.25) + 0 = 0.5s
- **VUser**: (100 x 0.5) / 2 = 25 ~ 250

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

#### Smoke

![smoke_k6](/images/smoke_k6.png)

![smoke_grafana1](/images/smoke_grafana.png)

![smoke_grafana2](/images/smoke_grafana_1.png)

```javascript
// smoke.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  'vus': 1, // 1 user looping for 1 minute
  'duration': '10m',
  'thresholds': {
    'http_req_duration': ['p(99)<500'], // 99% of requests must complete below 0.5s
  },
};

const BASE_URL = 'https://doorisopen.kro.kr';

export default function() {
  let loadPageStatus = http.get(`${BASE_URL}/path`).status;
  check(loadPageStatus, { 'move find path page': (obj) => obj === 200 });

  let source = Math.floor(Math.random() * 10 + 1);
  let target = Math.floor(Math.random() * 10 + 1);
  let findPath = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`);

  check(findPath, { 'find path successfully': (obj) => obj.status === 200 });
  sleep(1);
};
```

#### Load

![load_k6](/images/load_k6.png)

![load_grafana1](/images/load_grafana.png)

![load_grafana2](/images/load_grafana_1.png)

```javascript
// load.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  'stages': [
    { 'duration': '3m', 'target': 100 },
    { 'duration': '7m', 'target': 100 },
    { 'duration': '10m', 'target': 0 },
  ],
  'thresholds': {
    'http_req_duration': ['p(99)<500'], // 99% of requests must complete below 0.5s
  },
};

const BASE_URL = 'https://doorisopen.kro.kr';

export default function() {
  let loadPageStatus = http.get(`${BASE_URL}/path`).status;
  check(loadPageStatus, { 'move find path page': (obj) => obj === 200 });

  let source = Math.floor(Math.random() * 10 + 1);
  let target = Math.floor(Math.random() * 10 + 1);
  let findPath = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`);

  check(findPath, { 'find path successfully': (obj) => obj.status === 200 });
  sleep(1);
};
```

#### Stress

![stress_k6](/images/stress_k6.png)

![stress_grafana1](/images/stress_grafana.png)

![stress_grafana2](/images/stress_grafana_1.png)

```javascript
// stress.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  'stages': [
    { 'duration': '2m', 'target': 50 },
    { 'duration': '3m', 'target': 50 },
    { 'duration': '5m', 'target': 300 },
    { 'duration': '5m', 'target': 500 },
    { 'duration': '5m', 'target': 1000 },
  ],
  'thresholds': {
    'http_req_duration': ['p(99)<500'], // 99% of requests must complete below 0.5s
  },
};

const BASE_URL = 'https://doorisopen.kro.kr';

export default function() {
  let loadPageStatus = http.get(`${BASE_URL}/path`).status;
  check(loadPageStatus, { 'move find path page': (obj) => obj === 200 });

  let source = Math.floor(Math.random() * 10 + 1);
  let target = Math.floor(Math.random() * 10 + 1);
  let findPath = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`);

  check(findPath, { 'find path successfully': (obj) => obj.status === 200 });
  sleep(1);
};
```

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
