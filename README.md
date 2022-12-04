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

- [X] 웹 성능 예산 작성 후 서버 목표 응답시간 도출


#### 경쟁사 비교분석(MOBILE)

|     | RUNNINGMAP | 서울교통공사  | 네이버지도 | 카카오맵  |
|-----|------------|---------|-------|-------|
| FCP | 14.8s      | 6.6s    | 2.2s  | 1.7s  |
| TTI | 15.4s      | 9.2s    | 5.9s  | 4.6s  |
| SI  | 14.8s      | 10.5s   | 6.1s  | 6.6s  |
| TBT | 490ms      | 2,230ms | 350ms | 100ms |
| LCP | 15.3s      | 11.6s   | 7.6s  | 5.5s  |
| CLS | 0.042      | 0       | 0.03  | 0.005 |

#### 경쟁사 비교분석(PC)

|     | RUNNINGMAP | 서울교통공사 | 네이버지도 | 카카오맵  |
|-----|------------|--------|-------|-------|
| FCP | 2.7s       | 1.6s   | 0.6s  | 0.5s  |
| TTI | 2.8s       | 2.1s   | 1.5s  | 0.7s  |
| SI  | 2.7s       | 2.9s   | 2.1s  | 2.3s  |
| TBT | 70ms       | 170ms  | 30ms  | 0ms   |
| LCP | 2.8s       | 1.8s   | 1.6s  | 1.4s  |
| CLS | 0.004      | 0.001  | 0.006 | 0.029 |

#### 용어
- FCP(First Contentful Paint): 첫 번째 텍스트 또는 이미지가 표시되는 시간.
- TTI(Time to Interactive): 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간.
- SI(Speed Index): 페이지 콘텐츠가 얼마나 빨리 표시되는지.
- TBT(Total Blocking Time): FCP와 상호작용 시간 사이의 모든 시간의 합.
- LCP(Largest Contentful Paint): 최대 텍스트 또는 이미지가 표시되는 시간.
- CLS(Cumulative Layout Shift): 표시 영역 안에 보이는 요소의 이동.

#### 참고
- [3초의 법칙](https://www.thinkwithgoogle.com/intl/en-ca/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/)
- [20% 법칙](https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/#the-need-for-performance-optimization-the-20-rule)

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 경쟁사인 카카오맵과 네이버지도와 비슷한 수준의 성능 예산을 목표로 설정.
- TBT, CLS 예산은 현재로서도 양호하다고 판단.

#### 웹 성능예산(MOBILE)

| *     | FCP   | TTI   | SI     | TBT   | LCP   | CLS   |
|-------|-------|-------|--------|-------|-------|-------|
| AS-IS | 14.8s | 15.4s | 14.8s  | 490ms | 15.3s | 0.042 | 
| TO-BE | 2s    | 5s    | 6.5s   | 200ms | 5s    | 0.042 | 

#### 웹 성능예산(PC)

| *     | FCP  | TTI  | SI   | TBT  | LCP  | CLS   |
|-------|------|------|------|------|------|-------|
| AS-IS | 2.7s | 2.8s | 2.7s | 70ms | 2.8s | 0.004 | 
| TO-BE | 1s   | 1s   | 2s   | 70ms | 1.5s | 0.004 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

####PageSpeed에서 가이드해주는 사항 우선 적용
- 텍스트 압축 사용(`/js/vendors.js`, `/js/main.js`)
- 사용하지 않는 자바스크립트 줄이기(`/js/vendors.js`, `/js/main.js`)
- 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기(`/js/vendors.js`, `/js/main.js`, `/images/main_logo.png`, `/images/logo_small.png`)
- 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인하기
- 이미지 요소에 명시적인 너비 및 높이를 설정
- 초기 서버 응답 시간 단축

####xhr API 속도 주시(현재 100ms~300ms로 양호)

---


### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

#### 대상 시스템 범위
- WEB(nginx)
- WAS(tomcat)
- DB(MySQL)

#### 목푯값 설정 (latency, throughput, 부하 유지기간)
- 예상 1일 사용자 수(DAU): 10만명
  - 네이버 지도(34만명), 카카오맵(24만명)
  - 신규 서비스인점을 감안하여 경쟁사 서비스보다는 약간 낮게 설정
- 피크 시간대 집중률: 2
  - 평시의 2배로 가정
- 1명당 1일 평균 요청수: (5 + 5) * 2 = 20
  - 로그인 제외 기능 페이지: 5개
  - 로그인 수행 시 수행 request + 알파: 5개
  - 출퇴근 반복 * 2
- Throughput
  - 1일 총 접속 수: 10만 * 20 = 200만
  - 1일 평균 rps = 200만 / 86,400 = 23.14rps
  - 1일 최대 rps = 23.14 * 2 = 46.28rps
- VUser 
  - R: 5 
  - http_req_duration: 0.2
  - T = (R * http_req_duration) (+ 1s) : 2
  - 평균 VUser = (목표 rps * T) / R : 10
  - 최대 VUser = (목표 rps * T) / R : 20
- latency
  - 200ms
  

#### 부하 테스트 시 저장될 데이터 건수 및 크기
- 노선: 23건
- 역: 616건
- 구간: 340건



2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- `/k6` 디렉토리 이하에 정리
- 테스트 결과
  - load테스트에서 `http_req_duration`가 목표치인 200ms를 초과, 개선 필요
  - stress테스트에서 VUser 200까지는 latency가 늘어지긴 하지만 request가 fail하지는 않음(stress1.js). VUser 300부터 request failed 발생(stress2.js)
  

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
