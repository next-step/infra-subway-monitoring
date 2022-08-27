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

* 타 서비스 분석 및 비교   

|  | FCP | TTI | Speed Index | TBT | LCP | CLS | total byte (kb) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 서울교통공사 | 1.5 | 2 | 3.4 | 0.2 | 3.4 | 0 | 1,125 |
| 네이버지도 | 0.5 | 2.1 | 1.8 | 0.2 | 1.2 | 0.007 | 8,803 |
| 카카오맵 | 0.5 | 0.5 | 1.3 | 0.2 | 1.1 | 0 | 638 |
| 타 서비스 평균값 | 0.8 | 1.5 | 2.2 | 0.2 | 1.9 | 0.002 | 3,522 |
| **Running Map 현재상태** | 3 | 3 | 3 | 0.0 | 3 | 0 | 2,740 |
| **Running Map 예산설정** | 1.5 | 2 | 2.5 | 유지 | 1.2 | 0 | 1,200 |



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   [1] Enable text compression) - 텍스트리소스를 압축
   * target
     - /js/vendors.js
     - /js/main.js
     - /stations
   * 예상 효과   
     - LCP 1.48초 감소 예상
     - LCP 감소에 따른 FCP 감소 효과 예상

   [2] Reduce unused JavaScript) - 사용되지 않는 리소스 제거
   * target
     - /js/vendors.js
     - /js/main.js
   * 예상 효과 : 총 byte 감소 및 LCP 0.52초 감소효과 예상

   [3] 웹폰트 font-display CSS 기능을 활용, 웹폰트가 로드되는 동안 텍스트가 사용자에게 표시되도록
   * 예상 효과 : Speed Index 감소 및 총 byte 감소

   [4] 이미지요소에 명시적인 wiod, hei 값으로 불필요한 CLS측정이 없도록
   * target
     - /images/logo_small.png
   * 예상효과 : CLS 감소에 따른 TTI 감소

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
