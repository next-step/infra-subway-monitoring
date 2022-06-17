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

### 0단계 - 학습 
1. 웹 성능 최적화 요소
 - TTI(Time TO Interactive) : 상호 작용까지 시간
   - 사용자가 상호작용 가능할때 까지 걸리는 시간
   - ~3.8sec : Green, 3.9 ~ 7.3sec : Yellow
 - FCP(First Contentful Paint) : 페이지 콘텐츠의 일부가 렌더링 시작될때까지 걸리는 시간 
   - ~1.8sec : Green, 1.9~3sec : yellow 
 - LCP(Largest Contentful Pain) : 페이지 콘텐츠중 가장큰 이미지 혹은 텍스트 블록의 렌더링까지 걸리는 시간
   - ~2.5sec : Green, 2.6~5.4sec : yellow
 - TBT(Total Blocking Time) : FCP 와 상호작용 사이의 시간 
   - ~200ms : Green, 200~600ms : yellow


### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
