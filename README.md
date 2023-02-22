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

|비교 지표|sample-subway|서울시 교통공사|네이버 지도|카카오 지도|
|---||---|---|---|---|
|FCP|2.7s|1.6s|0.5s|0.5s|
|LCP|2.8s|2.2s|1.5s|1.3s|
|TTI|2.8s|2.0s|0.5s|0.7s|
- 비교 기준 사이트 : https://pagespeed.web.dev

-> FCP 2.0s, TTI 0.9s까지는 속도가 나와야 할 것 같습니다

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
![image](https://user-images.githubusercontent.com/40608930/220341515-24a4b25d-e558-4155-aa23-cdd7827b6b8e.png)
![image](https://user-images.githubusercontent.com/40608930/220341646-1e38774d-a3cf-4e08-85ab-b950de8d9665.png)
- vendor.js에 대한 다운로드가 오래 걸리는 편입니다. 해당 데이터에 대해 압축하여 크기를 줄이는 것을 통해 TTI의 값을 개선할 수 있을 것 같습니다

![image](https://user-images.githubusercontent.com/40608930/220343264-370699b3-714c-45be-9e3e-4e1a0e3f045a.png)
- DB로부터 노션목록 조회기능이 서버 응답시간이 200ms 존재합니다 해당 시간을 줄여야 할 것 같습니다

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
