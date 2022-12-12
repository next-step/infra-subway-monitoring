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


#### 성능 지표 참고
- FCP(First Contentful Paint) : 콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
- TTI(Time to Interactive) : 사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.
- SI(Speed Index) : 속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.
- TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다.
- LCP(Large Contentful Paint) : 콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다. 
- CLS(Cumulative Layout Shift) : 누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.

### 경쟁 사이트 비교 - https://pagespeed.web.dev/**

| 휴대전화  | FCP    | TTI   | Speed Index | TBT       | LCP  | CLS     | 성능 |
|-----------------------|------|------|-------|------|------|-------|:-----:|
| [네이버 지도](https://map.naver.com/subway/subwayLine.naver) | 2.4s | 6.2s | 6.0s | 360ms | 7.5s | 0.03 | 56 |
| [카카오 지도](https://map.kakao.com/) | 1.7s | 4.6s | 6.8s | 110ms | 7.0s | 0.005 | 67 |
| [서울 교통 공사](http://www.seoulmetro.co.kr/kr/cyberStation.do) | 6.4s | 8.4s | 7.9s | 510ms | 6.8s | 0 | 40 |
| [RUNNINGMAP](https://www.epicarts.o-r.kr/path) | 17.1s | 18.0s | 17.1s | 310ms | 17.1s | 0.004 | 39 |
| **경쟁3사 평균** | 3.5s | 6.4s | 6.9s | 326ms | 7.1s | 0.001 | 54.3 |

### 성능 테스트 요약
- 접근성, 권장사항, 검색엔진 최적화 점수는 준수하나, 성능면에서 특히, FCP가 17초가 경과하므로 사용자의 이탈률이 매우 높을 것으로 파악됨.

#### RUNNINGMAP 개선 방안
1. 텍스트 압축 사용 & 사용하지 않는 자바스크립트 줄이기
- venders.js (퍼포먼스탭 기준 약 *13.9초* 소요)
- main.js (퍼포먼스탭 기준 약 *2.7초* 소요)


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

### 서버 목표응답시간 가설 

| 휴대전화  | FCP    | TTI   | Speed Index | TBT       | LCP  | CLS     | 성능 |
|-----------------------|------|------|-------|------|------|-------|:-----:|
| [RUNNINGMAP](https://www.epicarts.o-r.kr/path) | 17.1s | 18.0s | 17.1s | 310ms | 17.1s | 0.004 | 39 |
| **경쟁3사 평균** | 3.5s | 6.4s | 6.9s | 326ms | 7.1s | 0.001 | 54.3 |
| **목표응답시간(경쟁3사 평균 대비 20% 향상)** | 2.8s | 5.12s | 6.9s | 260ms | 5.68s | 0.001 | 64.8 |

- 경쟁사 평균 대비 20% 이상의 향상을 목표로 설정
- FCP -14.3s, TTI -12.88, LCP -10s 만큼 감소시켜야, 경쟁사와의 제품에서 소비자의 체감 성능의 우위를 점할 수 있음.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

#### 대상시스템 범위
1. 사용자 서비스 화면 기준 (상위 5% 화면)
    - 경로 검색 페이지
    - 로그인 페이지
    - 메인 페이지
2. 아키텍쳐 기준
    - nginx - public Server
    - Web Application - public Server
    - DB - InternalServer

#### 목표값 설정
- 2022년 11월 지하철 승객 수 : 204,268만 명
- MAU 네이버 2129만 ⇒ DAU 2129 / 30 = 약 71만
- 카카오맵 MAU 950만명 ⇒ 약 32만
- 카카오맵 1인당 평균 접속 수 3.4회
- 피크 시간대 집중률: 약 2배

#### 1일 총 접속 수
- 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
- 51.5만 * 3.4회 = 175.1만

#### 1일 평균 rps
- 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
- 175.1만 / 86,400 (초/일) = 20.2 rps

#### 1일 최대 rps 
- 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
- 20.2 rps * 2 = 40rps

**Throughput : 20rps ~ 40 rps**

#### VUser
- T = 4회 요청 * 0.1 (+ 1s) = 1.4
- 평균 VUser = 20 * 1.4 / 4 = 7
- 최대 VUser = 40 * 1.4 / 4 = 14

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=epicarts-dashboard