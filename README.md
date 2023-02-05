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
- 경쟁사와 성능 비교 

| 사이트          | FCP  | TTI  | SI   | TBT  | LCP  | CLS   |
|--------------|------|------|------|------|------|-------|
| infra-subway | 2.6s | 2.7s | 2.6s | 50ms | 2.7s | 0.004 |
| 서울교통공사       | 1.5s | 2.0s | 1.9s | 40ms | 1.9s | 0.001 |
| 네이버지도        | 0.5s | 0.6s | 2.1s | 0ms  | 1.4s | 0.006 |
| 카카오맵         | 0.5s | 0.7s | 2.3s | 0ms  | 1.4s | 0.03  |

- 목표 성능(경쟁사와 비교하여 평균치를 목표로 설정)

|     | FCP   | TTI  | SI   | TBT  | LCP  | CLS   |
|-----|-------|------|------|------|------|-------|
| 목표치 | 0.83s | 1.1s | 2.1s | 13ms | 1.5s | 0.001 |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 텍스트 압축 사용하기 및 사용하지 않는 자바스크립트 줄이기
  - /js/vendor.js 
  - /js/main.js
- 렌더링 차단 리소스 제거하기
  - /css?family=Roboto:100,300,400,500,700,900
  - https://cdn.jsdelivr.net/npm/@mdi/font@5.0.45/css/materialdesignicons.min.css
- 효율적인 캐시 정책 설정하기
- 이미지 요소에 width 및 height 를 명시해서 레이아웃 변경 횟수를 줄인다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
