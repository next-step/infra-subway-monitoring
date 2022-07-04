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

### 성능 측정 용어 정리
- FCP(First Meaningful Paint): 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간을 측정
- SI(Speed Index): 웹 페이지를 불러올 때, 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줌
- LCP(Largest Contentful Paint): 뷰포트에서 가장 큰 콘텐츠 요소가 화면에 렌더링 될 때까지 걸리는 시간
- TTI(Time to Interactive): 사용할 수 있을 때까지 걸리는 시간 (완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간)
- TBT(Total Blocking Time): FCP와 TTI 사이에 발생하는 긴 작업에 대한 차단 시간의 합으로, 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됨
- CLS(Comulative Layout Shift): 표시 영역 안에 보이는 요소의 이동을 측정 (낮을수록 좋다.)



### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

   | web | 서울교통공사 | 네이버지도 | 카카오맵 |
   |-----|--------------|------------|----------|
   | FCP | 1.5s          | 0.5s        | 0.5s      |
   | SI  | 2.0s          | 2.5s        | 2.3s      |
   | LCP | 3.6s          | 1.6s        | 1.3s      |
   | TTI | 2.0s          | 0.5s        | 0.7s      |
   | TBT | 70ms          | 0ms         | 0ms       |
   | CLS | 0s            | 0.006s      | 0.039s    |

   | mobile | 서울교통공사 | 네이버지도 | 카카오맵 |
   |-----|--------------|------------|----------|
   | FCP | 6.4s          | 2.1s        | 1.7s      |
   | SI  | 7.9s          | 4.7s        | 6.5s      |
   | LCP | 6.6s          | 8.2s        | 5.0s      |
   | TTI | 8.4s          | 5.8s        | 4.1s      |
   | TBT | 570ms         | 240ms       | 20ms      |
   | CLS | 0s            | 0.03s       | 0.139s    |

   - FCP: web 기준 1.89s (네이버 지도 기준 10% 향상)
   - TTI: web 기준 5.22s (네이버 지도 기준 10% 향상)


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 텍스트 기반 리소스를 압축하여 FCP 성능 향상 (gzip, deflate, brotli)
   - JS/CSS 지연로딩하여 렌더링 차단 리소스를 제거
   - 불필요한 js 제거
   - 효율적인 캐싱 정책 사용
   - LCP 이미지를 미리 로드하거나 압축하여 네트워크 비용을 줄인다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
