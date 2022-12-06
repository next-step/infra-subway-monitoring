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

- 네이버지도와 카카오맵은 지하철을 제외하고도 다양한 서비스를 포함하고 있어서 경쟁 사이트에서 제외. 서울교통공사와 비교
- pagespeed에서 성능을 측정한 결과 서울교통공사의 성능 82, subway의 성능 68로 성능 부분에서 가장 큰 차이를 보임

| 항목  |subway|서울교통공사|
|-----|---|---|
|FCP|2.7s|1.5s|
|SI|2.7s|2.0s|
|LCP|2.8s|1.8s|
|TTI|2.8s|1.9s|

- 주로 정적 콘텐츠를 응답하는 부분에서 느린 것으로 확인됨으로 위의 항목에 대해 서울교통공사의 정적 콘텐츠 서빙 속도를 목표 기준으로 삼는게 좋아보임
  - 텍스트 압축 사용, 사용하지 않는 자바스크립트 줄이기, 효율적인 캐시 정책 사용


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
