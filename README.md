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

**1-1. 내 사이트 분석**   
1-1-1. [내 사이트](https://ttungga.r-e.kr/)

| Device | FCP   | TTI   | SI    | TBT   | LCP   | CLS   | Score |
|--------|-------|-------|-------|-------|-------|-------|-------|
| Mobile | 14.6s | 15.2s | 14.6s | 590ms | 15.2s | 0.041 | 31    |
| PC     | 2.7s  | 2.8s  | 2.7s  | 50ms  | 2.8s  | 0.004 | 68    |

**1-2. 경쟁사 분석**   
1-2-1. [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)

| Device | FCP  | TTI  | SI   | TBT   | LCP  | CLS   | Score |
|--------|------|------|------|-------|------|-------|-------|
| Mobile | 7.2s | 8.7s | 9.1s | 400ms | 7.7s | 0     | 41    |
| PC     | 1.6s | 2.0s | 2.5s | 150ms | 3.6s | 0.014 | 66    |

1-2-2. [네이버 지도](https://map.naver.com/v5/subway)

| Device | FCP  | TTI  | SI   | TBT    | LCP  | CLS   | Score |
|--------|------|------|------|--------|------|-------|-------|
| Mobile | 2.1s | 2.4s | 2.8s | 40ms   | 3.8s | 0     | 86    |
| PC     | 0.5s | 4.7s | 4.1s | 1040ms | 2.4s | 0.019 | 44    |

1-2-3. [카카오맵](https://map.kakao.com/)

| Device | FCP  | TTI  | SI   | TBT   | LCP  | CLS   | Score |
|--------|------|------|------|-------|------|-------|-------|
| Mobile | 1.7s | 4.4s | 6.8s | 60ms  | 4.6s | 0.005 | 75    |
| PC     | 0.6s | 2.5s | 3.1s | 430ms | 0.7s | 0.018 | 72    |

**1-3. 성능예산**
* FCP
  * Mobile: 2.0s 이하
  * PC: 1.0s 이하
* TTI
  * Mobile: 2.0s 이하 (네이버 지도 대비 20% 향상)
  * PC: 1.8s 이하 (서울교통공사 대비 20% 향상)

#### 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* 정적 리소스 압축
  * /js/vendors.js (2,125.0 KiB)
  * /js/main.js (172.0 KiB)
* 캐싱 정책 설정하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
