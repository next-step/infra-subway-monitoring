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

---

## 요구사항

- [x] 웹 성능 예산 작성 후 서버 목표 응답시간 도출


### 웹 성능 측정

| Desktop | Running Map | 서울교통공사 | 네이버지도  | 카카오맵   |
|---------|-------------|--------|--------|--------|
| FCP     | 2.7s        | 1.5s   | 0.5s   | 0.6s   |
| SI      | 2.7s        | 2.1s   | 3.8s   | 2.0s   |
| LCP     | 2.8s        | 2.2s   | 4.8s   | 2.0s   |
| TTI     | 2.8s        | 2.0s   | 3.8s   | 3.5s   |
| TBT     | 0.05s       | 0.25s  | 1.190s | 1.02s  |
| CLS     | 0.004s      | 0.001s | 0.019s | 0.721s |

| Mobile | Running Map | 서울교통공사 | 네이버지도 | 카카오맵 |
|--------|-------------|--------|-------|------|
| FCP    | 15.1s       | 6.3s   | 2.2s  | -    |
| SI     | 15.1s       | 7.4s   | 5.7s  | -    |
| LCP    | 15.6s       | 6.5s   | 7.0s  | -    |
| TTI    | 15.6s       | 8.3s   | 6.0s  | -    |
| TBT    | 0.4s        | 0.49s  | 0.31s | -    |
| CLS    | 0.42s       | 0s     | 0.03s | -    |
`* 카카오맵은 모바일은 카카오지하철 앱으로만 지원하여 제외`

### 용어 정리

* FCP(First Contentful Paint) : 초기 DOM 콘텐츠를 렌더링하는데 걸리는 시간으로 첫번째 텍스트 또는 이미지가 표시되는 시간
* LCP(Largest Contentful Paint) : 가장 큰 콘텐츠를 페이지에 렌더링하는데 걸리는 시간 (이미지, 동영상, 배경화면 등)
* SI(Speed Index) : 콘텐츠가 시각적으로 표시되는 진행 속도를 측정
* TTI(Time to Interactive) : 사용자가 페이지와 완전하게 상호작용할 수 있을 때까지 걸리는 시간
* TBT(Time Blocking Time) : 마우스 클릭, 화면 탭 또는 키보드 누름과 같은 사용자 입력에 페이지가 응답하지 못하도록 차단된 총 시간을 의미합니다
* CLS(Cumulative Layout Shift) : 사용자가 예상치 못한 레이아웃 이동을 경험하는 것에 대한 점수로 레이아웃 불안정이 사용자에게 미치는 부정적인 영향에 대해 검사

---

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 경쟁사들과 비교했을때 성능이 현저히 낮아 경쟁사들과 비슷한 수준 이상으로 성능예산 설정
  - 서울교통공사의 경우 네이버, 카카오에 비해 성능이 낮아 제외
  - Desktop의 경우 네이버지도와 카카오맵의 평균 값을 측정하여 목표로 설정
  - Mobile의 경우 네이버지도를 목표로 설정

|         | FCP  | SI   | LCP  | TTI   | TBT   | CLS    |
|---------|------|------|------|-------|-------|--------|
| Desktop | 0.5s | 2.9s | 3.4s | 3.65s | 0.05s | 0.004s |
| Mobile  | 2.2s | 5.7s | 7.0s | 6.0s  | 0.31s | 0.03s  |

---

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- `Lighthouse`의 6가지 지표중 가중치가 높은 LCP, TBT를 가장 높은 우선순위로 개선
- 현재 페이지 로딩시 자바스크립트, 이미지 등의 비중이 너무 커서 우선적으로 개선이 필요

```text
* 개선방법 *
1. 사용하지 않는 자바스크립트 줄이기
     - /js/vendor.js, /js/main.js
2. 텍스트 압축(gzip)을 사용
     - /js/vendor.js, /js/main.js
3. 렌더링 차단 리소스 제거하기
     - Font, CSS
4. 캐시 설정을 통해 페이지 로딩 개선
   - /js/vendors.js, /js/main.js, /images/main_logo.png
5. 웹폰트가 로드되는 동안 텍스트를 표시
6. 이미지 요소에 width, height 설정
   - /images/main_logo.png, /images/logo_small.png
```

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
