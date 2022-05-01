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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

목표 성능 (https://web.dev/lighthouse-performance/ 참고하여 작성)

| 경로            | FCP  | TTI  | SI   | LCP  | TBT    | CLS    |
|---------------|------|------|------|------|--------|--------|
| subway     | 1.8초 | 3.8초 | 3.4초 | 2.5초 | 200밀리초 | 0.1 이하 |

경쟁사와 성능 비교

| 사이트            | FCP  | TTI  | SI   | LCP  | TBT    | CLS   |
|----------------|------|------|------|------|--------|-------|
| Infra-Subway | 3.0초 | 3.0초 | 3.0초 | 3.0초 | 10 밀리초 | 0.000 |
| 서울교통공사    | 1.6초 | 2.2초 | 4.1초 | 3.5초 | 250밀리초 | 0.013 |
| 네이버맵      | 0.5초 | 0.5초 | 2.1초 | 1.6초 | 0밀리초   | 0.006 |
| 카카오맵      | 1.2초 | 1.4초 | 2.9초 | 1.2초 | 10밀리초  | 0.046 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

성능 분석툴 결과로 보자면
- 텍스트 압축(gzip 등)을 사용합니다.
- 사용안하는 자바스크립트를 줄입니다.
  - /js/vendors.js
  - /js/main.js
- 렌더링 차단 리소스를 제거합니다.
  - /css?family=Roboto:100,300,400,500,700,900
- 이미지 요소에 크기를 명시합니다.
  - 현재 logo_small 이미지를 크기를 명시하지 않아 레이아웃이 자동으로 조절하고 있는데 width & height를 명시하여 레이아웃 변경을 개선합니다. 


### 2단계 - 화면 응답 개선하기
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---
### 3단계 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
