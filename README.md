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

- [참고] 용어 정리
  - FCP: First Contentful Paint
  - TTI: Time to Interactive
  - SI: Speed Index
  - TBT: Total Blocking Time
  - LCP: Largest Contentful Paint
  - CLS: Cumulative Layout Shift

- 경쟁사와 Running Map의 PageSpeed Insights 결과를 비교했습니다.

| Mobile                                                                | FCP   | TTI   | SI    | TBT   | LCP   | CLS    | 성능 점수 |
|-----------------------------------------------------------------------|-------|-------|-------|-------|-------|--------|-------|
| [Running Map](https://nextstep-ejolie.n-e.kr)                         | 14.8s | 15.3s | 14.8s | 460ms | 15.3s | 0.042s | 34    |
| [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)              | 6.6s  | 8.4s  | 7.5s  | 170ms | 8.7s  | 0      | 50    |
| [네이버 지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | 2.2s  | 5.6s  | 5.7s  | 110ms | 7.6s  | 0.03s  | 65    |
| [카카오맵](https://m.map.kakao.com)                                       | 1.7s  | 4.1s  | 5.8s  | 20ms  | 5.0s  | 0.005s | 74    |

| Desktop                                                               | FCP  | TTI  | SI   | TBT  | LCP  | CLS    | 성능 점수 |
|-----------------------------------------------------------------------|------|------|------|------|------|--------|-------|
| [Running Map](https://nextstep-ejolie.n-e.kr)                         | 2.7s | 2.8s | 2.7s | 70ms | 2.8s | 0.004s | 67    |
| [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)              | 1.5s | 2.0s | 2.1s | 0ms  | 3.6s | 0      | 71    |
| [네이버 지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | 0.5s | 0.6s | 1.5s | 0ms  | 1.7s | 0.006s | 91    |
| [카카오맵](https://m.map.kakao.com)                                       | 0.5s | 0.7s | 2.1s | 0ms  | 1.3s | 0.039s | 92    |

- 시간 기반으로 웹 성능 예산을 세웠습니다. 시간 지표 중에서도 FCP, TTI가 중요하다고 생각하여 아래와 같은 기준을 세웠습니다. FCP, TTI 기준 상위 두 사이트인 네이버 지도와 카카오 맵의 평균 수치를 목표로 합니다.
  - Mobile
    - FCP: 1.95s 이하
    - TTI: 4.85s 이하
  - Desktop
    - FCP: 0.5s 이하
    - TTI: 0.65s 이하

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 정적 자원 캐싱을 통해 불필요한 네트워크 요청을 없앤다.
- 응답 리소스 압축을 통해 전송 바이트 수를 줄인다.
- 불필요한 다운로드를 제거하고 불필요한 작업을 지연 로딩한다.
- 반복적으로 실행되는 쿼리는 캐싱해서 사용한다. (예: 경로 검색 결과)

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
