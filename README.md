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

#### 예비 분석

|                          | PC     | Mobile |
|--------------------------|--------|--------|
| First Contentful Paint   | 2.7 s  | 14.8 s |
| Time to Interactive      | 2.8 s  | 15.3 s |


#### 경쟁사 분석
- 네이버 지도

|                          | PC    | Mobile |
|--------------------------|-------|--------|
| First Contentful Paint   | 0.3 s | 2.3 s  |
| Time to Interactive      | 3.4 s | 6.9 s  |

- 카카오 지도

|                          | PC    | Mobile |
|--------------------------|-------|--------|
| First Contentful Paint   | 0.6 s | 1.7 s  |
| Time to Interactive      | 3.0 s | 6.2 s  |


#### 성능 기준 설정
- FCP 3s 미만
- TTI 5s 미만


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 텍스트 기반 리소스를 압축(gzip, deflate, brotli)
  - /js/vendors.js
  - /js/main.js
- 사용하지 않는 자바스크립트 줄이기
  - /js/vendors.js
  - /js/main.js
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
