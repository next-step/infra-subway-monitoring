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

**측정 서비스**  
https://pagespeed.web.dev/

**측정 항목 설명**  
- First Contentful Paint(FCP): 콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.  
- Speed Index(SI): 속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.  
- Largest Contentful Paint(LCP): 콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.  
- Time to Interactive(TTI): 사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.  
- Total Blocking Time(TBT): FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다.  
- Cumulative Layout Shift(CLS): 누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.

**성능 분석**  
_RUNNING MAP의 경우 경로 검색 페이지로 성능 측정_
- 휴대전화

  | 서비스 | FCP | SI | LCP | TTI | TBT | CLS | Total Score |
  |-------------|-------|-------|-------|-------|-------|-------|-------------|
  | 서울교통공사 | 6.3s | 7.8s | 6.5s | 8.5s | 780ms | 0 | 35 |
  | 네이버지도 | 2.2s | 5.6s | 7.0s | 6.0s | 340ms | 0.03 | 56 |
  | 카카오맵 | 1.7s | 6.1s | 7.8s | 4.6s | 100ms | 0.005 | 67 |
  | RUNNING MAP | 16.4s | 16.4s | 16.4s | 17.1s | 210ms | 0.004 | 42 |


- 데스크톱

  | 서비스 | FCP | SI | LCP | TTI | TBT | CLS | Total Score |
  |-------------|-------|-------|-------|-------|-------|-------|-------------|
  | 서울교통공사 | 1.5s | 2.1s | 1.9s | 2.0s | 270ms | 0.001 | 72 |
  | 네이버지도 | 0.6s | 2.5s | 1.6s | 1.2s | 10ms | 0.006 | 89 |
  | 카카오맵 | 0.5s | 2.3s | 1.3s | 0.7s | 0ms | 0.003 | 91 |
  | RUNNING MAP | 3.1s | 3.1s | 3.1s | 3.4s | 60ms | 0 | 63 |

**예상**
- 사용자의 체감이 큰 FCP, TTI의 지표가 경쟁 서비스(네이버지도, 카카오맵) 대비 많이 느립니다.
- 실질적 경쟁 서비스인 네이버지도, 카카오맵과 비슷한 수준의 성능을 가질수 있는것이 적당하다고 생각합니다.

<br/>
<br/>

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 사용자가 노선을 빠르게 검색할 수 있도록 FCP, TTI의 개선이 가장 중요하다고 생각합니다.
- FCP, TTI 성능을 경쟁 서비스인 네이버지도, 카카오맵과 비슷하도록 합니다.
- FCP: 모바일 2초, 데스크톱 1초 목표
- TTI: 모바일 5초, 데스크톱 1초 목표


**pagespeed의 추천 적용**
- 텍스트 압축 사용: 모바일 9.45s, 데스크톱 1.52s 절감 예상
  - /js/vendors.js (전송크기 2,125.0 KiB, 절감효과 1,716.5 KiB)
  - /js/main.js (전송크기 172.0 KiB , 절감효과 143.6 KiB)
- 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기
  - /js/vendors.js
  - /js/main.js

<br/>
<br/>
<br/>

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

#### 테스트 전제조건 정리
**대상 시스템 범위**  
nginx -> application -> db

**목표값 설정**
- latency: 50ms 이하
- throughput
  - MAU: 848만  (네이버지도 1392만 + 카카오맵 729만) / 2 * 0.8
  - DAU: 28.2만  (MAU / 30)
  - 1명당 1일 평균 접속 수: 2회 (출/퇴근)
  - 1일 총 접속 수: 56.4만 (DAU * 1명당 1일 평균 접속 수)
  - 1일 평균 RPS: 6.52 (1일 총 접속 수 / 86,400 초)
  - 1일 최대 RPS: 13.04 (6.52 * 2)
    - 피크 시간대 집중율: 2배 예상 (최대 트래픽 / 평소 트래픽)
- 부하 유지기간
  - Smoke: 1m
  - Load: 30m
  - Stress: 6m
- VUser
  - 용어
    - RPS: 초당 요청 수
    - VU: 가상 사용자 수
    - R: VU 반복당 요청 수
    - T: VU 반복을 완료하는 데 필요한 시간보다 큰 값
  - 계산식
```text
T = (R * http_req_duration) (+ 1s)
VUser = (목표 rps * T) / R
```

- R: 5
  - main, login, retrieveMember, path, pathFind
- T: 1.5
  - (5 * 0.1s) + 1s
- 평균 VUser: 1.956
  - (6.52 * 1.5) / 5
- 최대 VUser: 3.912
  - (13.04 * 1.5) / 5


**부하 테스트 시 저장될 데이터 건수 및 크기**  
그럴듯한 서비스 만들기의 DB 사용
- 노선: 23개
- 지하철역: 616개
- 구간: 340개
- 회원: 1개


2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- monitoring
  - smoke
    - smoke.js
    - smoke_grafana.png
    - smoke_k6.png
  - load
    - load.js
    - load_grafana.png
    - load_k6.png
  - stress
    - stress.js
    - stress_grafana.png
    - stress_k6.png


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
