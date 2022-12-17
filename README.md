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

### 경쟁사 비교분석

> MyPage : https://web.iamsojung-webservice.o-r.kr
#### MOBLIE
| mobile | 서교공   | 카카오맵  | 네이버지도 | MyPage |
|--------|-------|-------|-------|--------|
| FCP    | 6.6s  | 1.7s  | 2.4s  | 14.1s  |
| TTI    | 8.3s  | 5.0s  | 6.1s  | 15.0s  |
| SI     | 7.8s  | 6.7s  | 5.4s  | 14.5s  |
| TBT    | 100ms | 40ms  | 430ms | 450ms  |
| LCP    | 8.6s  | 5.0s  | 7.8s  | 15.0s  |
| CLS    | 0     | 0.005 | 0.03  | 0.042  |

#### DESKTOP
| desktop | 서교공   | 카카오맵 | 네이버지도 | MyPage |
|---------|-------|------|-------|--------|
| FCP     | 1.4s  | 0.5s | 0.6s  | 2.7s   |
| TTI     | 2.0s  | 0.7s | 1.2s  | 2.8s   |
| SI      | 2.0s  | 2.5s | 2.3s  | 2.7s   |
| TBT     | 110ms | 0ms  | 0ms   | 50ms   |
| LCP     | 2.2s  | 1.2s | 1.4s  | 2.8s   |
| CLS     | 0.001 | 0.04 | 0.03  | 0.004  |


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

|     | mobile | desktop |
|--------|---------|------- |
| FCP | 1.7s   | 0.5s    |
| TTI | 5.0s   | 0.7s    |
| SI  | 5.4s   | 2.0s    |
| TBT | 40ms  | 0ms     |
| LCP | 5.0s   | 1.2s    |
| CLS | 0      | 0.001   |



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
