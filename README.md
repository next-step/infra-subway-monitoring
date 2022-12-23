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

- 유독 느린 경쟁사는 제외
- 기본적으로 경쟁사들의 평균치 수준을 기준으로 하되,
- 20% 이상 차이가 나지 않고
- 가능한 한 FCP 3초, TTI 5초를 초과 하지 않는 수준

![네이버지도](src/main/resources/static/images/네이버지도_성능예산.png)
![서울교통공사](src/main/resources/static/images/서울교통공사_성능예산.png)
![카카오맵](src/main/resources/static/images/카카오맵_성능예산.png)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

서울교통공사 기준 웹성능 지표에 따르면 개선 방안은 다음과 같습니다.

- 텍스트 압축
- 렌더링 차단 리소스
- 초기 서버 응답 시간 단축

위 사상을 개선한다면 속도는 적어도 아래 목표시간을 충족 할 수 있다고 보입니다.

![성능목표](src/main/resources/static/images/성능목표.png)

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
