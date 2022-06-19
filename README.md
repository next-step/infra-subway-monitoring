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

#### 성능 테스트 결과 (모바일 기준)

|             |지하철 노선도| 서울교통공사 | 네이버지도 | 카카오맵 |
|-------------|------------|-------------|-----------|---------|
| FCP         | 14.7s      | 7.1s        | 2.2s      | 1.7s    |
| Speed Index | 14.7s      | 8.3s        | 5.2s      | 6.8s    | 
| LCP         | 15.3s      | 11.3s       | 7.8s      | 5.1s    |
| TTI         | 15.4s      | 9.0s        | 6.4s      | 4.5s    | 
| TBT         | 580ms      | 650ms       | 220ms     | 70ms    |
| CLS         | 0.042      | 0           | 0.03      | 0.005   | 

#### 중요 지표 순서

- 첫 응답 속도가 중요하고, 인터액션을 빠르게 할 수 있도록 하는 것이 중요하기 때문에, 아래의 지표를 중요하게 잡음
- FCP : 2.65s (경쟁사 평균 3.3s이므로 이보다 20% 성능을 개선한 수치를 목표로 함)
- TTI : 5.3s (경쟁사 평균 6.3s이므로 이보다 20% 성능을 개선한 수치를 목표로 함)


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

![image](https://user-images.githubusercontent.com/34637627/174485879-cffd5e93-2763-48a3-92ad-a62e8c75c282.png)

- 위의 스크린샷을 보면, 해당 두 파일 다운로드 시간이 오래걸리는 것을 알 수 있다.
  - 해당 두 파일(vendor.js, main.js) 을 gzip압축하여 리소스를 응답한다.
- 이미지들을 압축하여 응답한다
- 정적 파일 (css, js, 이미지, 폰트) 등을 cdn에 캐싱하여 응답시간을 줄임


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
