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
   - 예비 분석 [myService](https://nextsteptest.p-e.kr/path)
     - desktop
       - FCP : 3.0s
       - LCP : 3.0s
       - TTI : 3.0s
     - mobile
        - FCP : 16.4s
        - LCP : 16.4s
        - TTI : 17.1s
   - 경쟁사 분석
     - 서울교통공사 desktop 
       - FCP : 1.6s
       - LCP : 3.6s
       - TTI : 2.2s
     - 서울교통공사 mobile
        - FCP : 1.6s
        - LCP : 3.6s
        - TTI : 2.2s
     - 네이버지도 desktop
        - FCP : 0.5
        - LCP : 1.5
        - TTI : 0.7
     - 네이버지도 mobile
        - FCP : 2.2
        - LCP : 8.2
        - TTI : 6.8
   - 성능예산 목표
     - FCP 3.0 미만
     - TTI 5.0s 미만
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 자바스크립트 크기 축소
- 캐싱
- 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인 및 수정
- 이미지 사이즈 설정


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
