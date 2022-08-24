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

### 웹 성능 용어 및 분석

- 용어정리
  - FCP (First Contentful Paint) : 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간
  - TTI (Time to Interactive) : 페이지가 완전히 상호 작용 가능하게 되는 데 걸리는 시간
  - SI (Speed Index) : 페이지 로드 중에 콘텐츠가 시각적으로 표시되는 속도
  - TBT (Total Blocking Time) : 페이지가 안정적인 상호 작용 환경이 되기 전, 상호 작용이 불가능한 시간
  - LCP (Largest Contentful Paint) : 초기 DOM 콘텐츠가 렌더링되는 데 걸리는 시간을 측정
  - CLS (Cumulative Layout Shift) :  사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도

- 데스크탑

| 사이트    | FCP (초) | TTI (초) | SI (초) | TBT (밀리초) | LCP (초) | CLS | 총점 |
|--------|-------|-------|---|-------|-----|-----|---|
| 내 사이트  |2.7|2.8|2.7|50|2.8|0.004|68|
| 서울교통공사 |1.5|2.0|3.5|200|3.6|0|61 |
| 네이버지도  |0.5|0.5|2.6|0|1.7|0.006|88 |
| 카카오맵   |0.5|0.7|2.6|0|1.3|0.039|91 |

- 휴대전화

| 사이트    | FCP (초) | TTI (초) | SI (초) | TBT (밀리초) | LCP (초) | CLS | 총점 |
|--------|---|---|---|------|-----|---|---|
| 내 사이트  |14.7|15.2|14.7|490|15.2|0.042|33 |
| 서울교통공사 |6.4|8.4|10.3 |450| 6.6 | 0 | 41 |
| 네이버지도  |2.3|6.7|6.3|600|8.0| 0.03 |48 |
| 카카오맵   |1.7|4.1|7.9|30|5.1|0.005 | 71 |

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- FCP: ~ 2초 
- LCP: 1.5 ~ 2초
- TTI: ~ 1초
- Lighthouse 휴대 전화: 50점 이상, 데스크탑: 75점 이상

3. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 압축
  - /js/vendors.js
    - 전송 크기: 2,125.0 KB
    - 가능한 절감 효과: 1,716.5 KB
  - /js/main.js
      - 전송 크기: 172.0 KB
      - 가능한 절감 효과: 143.6 KB
- 사용하지 않는 js 파일 줄이기
  - /js/vendors.js
  - /js/main.js
- 렌더링 차단 리소스 제거
- 사용하지 않는 css 제거
- 캐시 설정
  - 브라우저, CDN


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
