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

1. 부하테스트 전제조건은 어느정도로 설정하셨나요 <br>
####대상 시스템 범위 : 경로검색 페이지, 로그인 페이지, 경로 검색 <br>
### 목표값 설정<br>
#### DAU(1일 사용자 수)<br>
   - 2022년 11월 지하철 한달 승객 수 : 204268648<br>
   - 하루 사용자 수 = 한달 평균 승객 수 (204268648) / 왕복 (2) / 1개월 (30) = 3404477<br>
   - 340447 = 하루 사용자 수 중 10% 사용자만 사용한다고 가정<br>
#### 피크 시간대의 집중률<br>
   - 최대 트래픽(18-19시) : (1,019,132 / 6) = 약 170,000명<br>
   - 평소 트래픽(13-14시) : 86,929 / 6) = 약 15,000명<br>
   - 평균 트래픽 : (482,047 / 6) = 약 80,000명<br>
     (네이버맵과 카카오맵이 존재하므로 1/6 이라고 가정)
#### 1명 당 1일 평균 접속 수
   - 왕복 횟수 = 총 2회

#### throughput : 1일 평균 rps ~ 1일 최대 Rps
> 1일 사용자 수 x 1명당 1일 평균 접속 수 = 1일 총 접속 수<br>
> 1일 총 접속 수 / 86400 = 1일 평균 rps<br>
> 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps<br>
- 160,000 = 80,000 * 2 (1일 총 접속자 수)
- 14rps = 160,000 / 10,800 (1일 평균 rps)
- 30rps = 14 * (170,000/80,000) = 약 30rps (1일 최대 rps)
#### VUser
- R : 2.5
- 시나리오가 두개 있을 수 있다고 판단
- (메인 -> 로그인 -> 경로검색)
- (메인 -> 경로검색)
- http_req_duration : 0.3

T : (2.5 * 0.3) + 1s = 1.75 VUser = (30 * 1.75) / 3 = 약 17 (목표 RPS는 1일 최대 RPS로 가정)


2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
