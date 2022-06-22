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
- 모바일 기준.
- 경쟁사 평균의 120% 이내가 목표.
- **조회** 위주의 웹 어플리케이션으로 성능예산 기준 지표는 FCP, TTI, SI를 선정.
  - FCP : 최대 4.24s
  - TTI : 최대 5s
  - SI : 최대 7.8s

https://piopoi.kro.kr 

| Device | FCP   | TTI | SI | TBT | LCP | CLS | Score |
|--------|-------|-----|----|-----|-----|-----|-------|
| Mobile | 14.6s | 15.2s | 14.6s | 550ms | 15.2s | 0.042 | 32    |
| PC     | 2.7s  | 2.8s | 2.8s | 50ms | 2.8s | 0.004 | 68    |

서울교통공사 : http://www.seoulmetro.co.kr/kr/cyberStation.do

| Device | FCP  | TTI  | SI   | TBT   | LCP  | CLS   | Score |
|--------|------|------|------|-------|------|-------|-------|
| Mobile | 6.9s | 8.7s | 8.2s | 320ms | 6.9s | 0     | 45    |
| PC | 1.6s | 2.0s | 2.4s | 100ms | 3.6s | 0.014 | 69    |

네이버지도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000

| Device | FCP  | TTI  | SI   | TBT | LCP  | CLS   | Score |
|--------|------|------|------|-----|------|-------|-------|
| Mobile | 2.0s | 6.6s | 5.3s | 320ms | 7.7s | 0.03  | 58    |
| PC | 0.5s | 0.7s | 2.4s | 0ms | 1.6s | 0.006 | 89    |

카카오맵 : https://m.map.kakao.com/

| Device | FCP  | TTI  | SI   | TBT | LCP  | CLS   | Score |
|--------|------|------|------|-----|------|-------|-------|
| Mobile | 1.7s | 4.4s | 6.0s | 70ms | 5.0s | 0.005 | 74    |
| PC | 0.5s | 1.0s | 2.2s | 0ms | 0.8s | 0.039 | 95    |

- 용어설명
  - FCP(First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
  - TTI(Time to Interactive) : 완전히 페이지와 상호작용할 수 있게 될 때까지의 시간
  - SI(Speed Index) : 페이지 콘텐츠가 표시되는 시간
  - TBT(Total Blocking Time) : FCP와 TTI 사이의 시간
  - LCP(Largest Contentful Paint) : 가장 큰 크기의 텍스트나 이미지가 표시되는 시간
  - CLP(Cumulative Layout Shift) : 사용자에게 발생하는 레이아웃 이동 빈도


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 제공
  - /js/vendors.js, /js/main.js
- 자바스크립트를 필요할 때까지 지연로딩
  - /js/vendors.js, /js/main.js
- 미사용 자바스크립트 및 CSS 제거
- 중요한 JS/CSS를 인라인으로 변경
- 이미지 요소에 width, height 명시
  - /images/main_logo.png, /images/logo_small.png
- 이미지 등 리소스 캐싱
---

### 2단계 - 부하 테스트 
#### 1. 부하테스트 전제조건은 어느정도로 설정하셨나요

   - 대상 시스템 범위
     - Reverse-Proxy(Nginx), WAS(Subway App), DB(MySQL)
     
   - 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
     - `예상 1일 사용자 수(DAU) : 50만`
       - 네이버지도는 2020년 여름 휴가 성수기 기간 평균 322만 DAU 기록.
       - 여름 휴가 성수기임과 동시에 업계 1위 앱이라는 점을 감안.
       - 참고 : https://www.greened.kr/news/articleView.html?idxno=72469
       
   - 피크 시간대의 집중률을 예상해봅니다. (최대 트개픽 / 평소 트래픽)
     - `피크 시간대 집중률 예상 : 10배`
       - 최대 트개픽 / 평소 트래픽
       
   - 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
     - `1명당 1일 평균 접속 혹은 요청수 예상 : 2회`
     
   - 이를 바탕으로 Throughput을 계산합니다.
     - `Throughput : 11.6 rps ~ 115.7 rps`
       - 1일 평균 rps ~ 1일 최대 rps
       - 50만 x 2회 = 100만회 (1일 총 접속 수)
       - 100만회 / 86,400 = 11.6 (1일 평균 rps)
       - 11.57 x 10 = 115.7 (1일 최대 rps)
       
     - `Latency : 100ms`
     
     - `VUser : 69.4`
       - 목표 rps : 115.7
       - (2 x 0.1) + 1 = 1.2
       - (115.7 * 1.2) / 2 = 69.4
#### 2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
  - Smoke
    - script : /docs/smoke/smoke.js
    - k6 : /docs/smoke/smoke_k6.js
    - grafana : /docs/smoke/smoke_grafana.js  
  - Load
    - script : /docs/load/load.js
    - k6 : /docs/load/load_k6.js
    - grafana : /docs/load/load_grafana.js
  - Stress
    - script : /docs/stress/stress.js
    - k6 : /docs/stress/stress_k6.js
    - grafana : /docs/stress/stress_grafana.js  
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
