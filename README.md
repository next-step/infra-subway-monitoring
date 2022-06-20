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
- 성능예산 목표
    - 카카맵 수준인 FCP 0.6초
    - 페이지로드 2초 미만
    - TTI 3초 미만
- 측정결과
    - kakao map 메인
    <img width="990" alt="image" src="https://user-images.githubusercontent.com/6476469/174578361-2c350920-7821-4935-98bf-db07c15de529.png">

    - 실습 경로 페이지
    <img width="973" alt="image" src="https://user-images.githubusercontent.com/6476469/174578576-a62ae2ed-5afe-49bd-a36a-dfef47183f95.png">


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- gzip 압축 
    <img width="960" alt="image" src="https://user-images.githubusercontent.com/6476469/174582018-fc047481-3f56-4c72-9086-945d1b7d0113.png">
    - 성능에 가장 많이 영향을 미치는 것으로 예측됨
- 캐시설정, 불필요한 파일 제거

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 목푯값
```
DAU = 2,000,000 (1,000,000 X 2)
평균 rps = 23.1 (2,000,000 / 86,400)
최대 rps = 231 (23.1 x (100/10))
```
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
