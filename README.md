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

Quantity Based Metric

- 이미지, 동영상 최대 크기 제한
- 웹 글꼴 경량화, 개수 최소화
- js 스크립트 경량화, 개수 최소화
- HTML, CSS 스크립트 경량화, 개수 최소화

Timing based Metric

- FCP(First Contentful Paint)
  - 페이지 로딩을 시작해서 첫번째 byte 가 화면에 나타나기까지 걸리는 시간
  - https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/
  - https://web.dev/fcp/
- LCP(Largest Contentful Paint)
  - 가장 큰 이미지 또는 가장 큰 텍스트 블록(`<div>`)을 로드하는데 걸리는 시간
  - https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/
  - https://web.dev/lcp/
- TTI(Time To Interactive)
  - 페이지 로딩을 시작한 순간부터 사용자가 어떠한 제한도 없이 완전히 상호작용해지기까지 걸리는 시간
  - https://developer.chrome.com/docs/lighthouse/performance/interactive/
  - https://web.dev/tti/
- TBT(Total Blocking Time)
  - 어떤 작업이든 50ms 이상 걸리는 경우 `Long Task` 라고 정의하며 성능 측정 과정에서 사용자 상호작용이 제대로 동작하지 않던 시간의 총 합
  - https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/
  - https://web.dev/tbt/
- CLS(Cumulative Layout Shift)
  - 한 페이지에서 갑작스런 레이아웃 변경이 나타나는 비율
  - https://web.dev/cls/

Rule based Metric

먼저 `WebPageTest` 결과 참고 시

[webpagetest-01](./photo/webpagetest-capture-01.jpg)

[webpagetest-02](./photo/webpagetest-capture-02.jpg)

Basic Analysis

- HTTP Request 개수 최소화 (font 로드할 때 요청 많음)
- assert 크기 경량화 (js 스크립트 용량 많음)

Is it Quick?

- js 로드 작업이 페이지 렌더링 정체됨
- 외부 css 파일 로그하는 경우 페이지 렌더링 정체됨
- LCP 낮게 유지하기
- render-critical 한 경우에는 레이지로딩 사용하지 않기
- font-display="block" 사용하지 않기
- javascript 스크립트에 렌더링 로직이 너무 많은건 바람직하지 않다

Is it Usable?

- 이미지, 동영상 엘레멘트에 aspect-ratio 제대로 설정하기
- main event loop 는 어떤 경우에도 블록킹 되지 않도록 주의하자
- meta viewport 설정 올바르게 하기
- 이미지를 올바르게 로드할 수 없는 경우에 대비해서 alt 애트리뷰트 설정하기

Is it Resilient?

- asset 다운로드 시에 HTTPS 통신하기

한편 `PageSpeed` 결과 참고 시

[pagespeed-00](./photo/pagespeed-capture.jpg)

- FCP(First Contentful Paint)
- LCP(Largest Contentful Paint)
- TTI(Time To Interactive)
- TBT(Total Blocking Time)
- CLS(Cumulative Layout Shift)

Opportunity

- 텍스트 압축 전송
- 렌더링을 블록킹하는 자원 제거하기
- 사용하지 않는 js 모듈 제거하기
- 사용하지 않는 css 모듈 제거하기

Diagnostics

- 적절한 캐시 정책 수립
- 웹 글꼴 다운로드 중에 텍스트 보이도록 설정
- 이미지 엘레멘트에 width, height 반드시 설정하기
- js 스크립트 실행시간 최소화
- 메인 스레드에서 실행하는 작업 최소화
- HTTP 요청 개수 최소화
- LCP(Largest Contentful Paint)
- CLS(Cumulative Layout Shift)
- 메인 스레드에서 Long Task(수행하는 데 50ms 이상 걸리는 작업) 실행하지 않기

Names and Labels

- 이미지에 alt 설정하기

Trust and Safety

- HTTPS 통신하기

General

- 대용량 js 스크립트에는 source map 보존하기

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- FCP(First Contentful Paint) : 3초 이내
- LCP(Largest Contentful Paint) : 7초 이내
- TTI(Time To Interactive) : 10초 이내
- TBT(Total Blocking Time) : 350ms 이내
- CLS(Cumulative Layout Shift) : 0.5 이하

- js 스크립트
  - 최종 크기 최대한 작게 유지 (webpack 기본 설정값: 245 KiB)
  - 사용하지 않는 모듈 import 제거
  - tree-shaking 적용하기
- 이미지 파일
  - 용량은 10 MB 이하로 유지
  - width, height, aspect-ratio 설정하기
  - alt 반드시 설정하기
- 동영상 파일
  - width, height, aspect-ratio 설정하기
  - alt 반드시 설정하기
- TTI 측정값 WiFi 환경에서는 8초, LTE 환경에서는 5초 이하로 유지
- LightHouse 성능평가 80점 이상 유지
- 텍스트 압축 알고리즘 사용하기
- 웹 글꼴
  - font-display="fallback" 설정하기
  - 최소 개수만 사용하기
- HTTPS 사용하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
