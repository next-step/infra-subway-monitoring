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

#### 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

모바일 환경에서, 출퇴근시간대에, 메인페이지인 지하철노선도 표시페이지의 FCP가, 1.5초미만.

이유:

- 앱의 특성상, 출퇴근시 스마트폰을 통해, 지하철 노선을 확인하는 유스케이스가 가장 많다고 가정하였습니다.

- 또한, 지하철노선도를 확인 후, 유저들이 상호작용을 시작할 것이라고 가정하였기에 Timing based metrix중 FCP를 뽑았습니다.

- 경쟁사의 FCP가 다음과 같기에, 평균수치인 1.5초 미만으로 설정하였습니다. 

  - 서울교통공사 : 2.9초

  - 네이버맵(모바일): 0.9초

  - 카카오맵(모바일): 1.7초


#### 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

부하테스트를 실시하여 현재 앱의 ASIS 주요 수치를 측정하고, 다음과 같은 개선방법을 이용하여, 목표치를 달성 할 수 있을 거라 생각합니다.

  - TPS 증가를 통한 처리량 개선

  - 캐싱 설정

  - gzip 압축, 이미지 압축

---

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
