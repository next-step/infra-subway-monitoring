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

* Infra-Subway/stations 모바일 기준

| 사이트          | FCP  |  TTI  |  SI  |  TBT  |   LCP  |   CLS   |   Score  |
|----------------|------|------|------|--------|--------| ------- |  :-----: |
| 서울교통공사     | 7.2s | 8.9s | 9.8s |  310ms |  11.4s  |  0.0  |   43    |
| 네이버맵        | 2.0s | 6.6s | 5.2s |   300ms  |  7.2s  |  0.03  |    60    |
| 카카오맵        | 1.7s | 4.4s | 6.5s |  60ms  |  4.7s  |  0.005  |    75    |
| Infra-Subway(목표)   | 3.0s | 6s | 6s | 250ms |  6s  |   0.0   |    60    |

- `https://songsimo.kro.kr/stations` PageSpeed 검사 결과 FCP, TTI, SI, TBT LCP 모두 낮게 나옴

- 이미지에 대한 랜더링이 없기에 js, css를 최적화하면 성능 향상이 기대됨 <br>
 
- 진단상에도 FCP와 LCP의 개선이 필요하다 나옴


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

```text
* 텍스트 압축(gzip, deflate, brotli 등)을 사용 : FCP, LCP 개선
  - /js/vendors.js
  - /js/main.js
  - /stations
  
* 사용하지 않는 자바스크립트 줄이기 : LCP 개선
  - /js/vendors.js
  - /js/main.js

* 과도한 DOM 크기 지양하기 : TBT 개선

* 캐시를 활용하여 정적 속성 제공
```

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
