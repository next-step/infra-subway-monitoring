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
![](img/diagnosis.png)
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요  
일반적으로 지하철 노선 조회는 데스크탑보다는 모바일에서 더 자주 일어난다고 생각하기 때문에, 모바일을 기준으로 성능 향상
- Quantity-based
  - 200KB 미만
- Timing-based
  - FCP ≤ 2.9 sec: 랜딩페이지에서 메인으로 사용되는 경로검색 페이지로 넘어가는 것이 잘 이루어지고 있는 것을 보여주기 위하여 경로검색 페이지를 우선으로 성능 개선 (서울교통공사 모바일 기준)
  - TTI  ≤ 8.76 sec: 빠르게 기능을 사용할 수 있는 다른 페이지로 넘어갈 수 있도록 랜딩페이지를 우선으로 성능 개선 (네이버지도 모바일 시간 120% 기준)
  - SI ≤ 6.96 sec: 메인으로 사용되는 경로 검색 페이지를 우선으로 성능 개선 (네이버지도 모바일 120% 기준)
  - TBT ≤ 0.450 sec: (네이버 모바일 기준)
  - LCP ≤ 9 sec: TTI와 같은 이유로 랜딩페이지를 우선으로 성능 개선 (네이버지도 모바일 120% 기준)
  - CLS ≤ 0.1 sec: (PageSpeed 측정 사이트 양호 기준)
- Rule-based
  - 60점
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- Quantity-based
  - 200KB 미만: PageSpeedInsight를 통해 평가해본 결과 텍스트 압축을 통해 200KB 미만으로 축소 가능
  ![](img/compresstext.png)
- Timing-based
  - FCP ≤ 3 sec
  - TTI  ≤ 8.76 sec
  - SI ≤ 6.96 sec
  - LCP ≤ 9 sec
- Rule-based
  - 60점: 현재보다 50% 성능 향상 필요

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
