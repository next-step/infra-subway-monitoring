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
#### 측정 결과
- 측정 사이트 : https://pagespeed.web.dev/
- 대상 URL
    - 서울교통공사 : http://www.seoulmetro.co.kr/kr/cyberStation.do
    - 네이버지도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000
    - 카카오맵 : https://m.map.kakao.com/
    - Running Map : https://shshon-infra.o-r.kr/

| 모바일 | 서울교통공사 | 네이버지도 | 카카오맵  | Running Map |
|-----|--------|-------|-------|-------------|
| FCP | 6.8s   | 2.2s  | 1.7s  | **14.8s**   |
| SI  | 10.8s  | 5.6s  | 6.2s  | **14.8s**   |
| LCP | 11.0s  | 7.2s  | 6.7s  | **15.3s**   |
| TTI | 8.3s   | 6.5s  | 4.5s  | **15.3s**   |
| TBT | 200ms  | 450ms | 60ms  | **480ms**   |
| CLS | 0.00   | 0.03  | 0.005 | **0.042**   |

| 데스크탑 | 서울교통공사 | 네이버지도 | 카카오맵  | Running Map |
|------|--------|-------|-------|-------------|
| FCP  | 1.6s   | 0.5s  | 0.5s  | **2.7s**    |
| SI   | 3.3s   | 1.3s  | 2.3s  | **3.5s**    |
| LCP  | 1.7s   | 1.0s  | 1.3s  | **2.8s**    |
| TTI  | 2.0s   | 0.6s  | 0.7s  | **2.8s**    |
| TBT  | 80ms   | 0ms   | 0ms   | **30ms**    |
| CLS  | 0.001  | 0.006 | 0.039 | **0.004**   |

#### 용어 정리
- FCP(First Contentful Paint)
    - 콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
- SI(Speed Index)
    - 속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.
- LCP(Largest Contentful Paint)
    - 콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
- TTI(Time to Interactive)
    - 사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.
- TBT(Total Blocking Time)
    - FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다.
- CLS(Cumulative Layout Shift)
    - 누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 각 지표에서 1순위에 해당 되는 수치로 목표 설정
  - 신규 서비스이기때문에 기존에 서비스되고 있는것과 차이가 없거나 빨라야 경쟁성이 있다고 판단
  
|     | 모바일(As-Is) | 모바일(To-Be) | 데스크탑(As-Is) | 데스크탑(To-Be) |
|-----|------------|------------|-------------|-------------|
| FCP | 14.8s      | **1.7s**   | 2.7s        | **0.5s**    |
| SI  | 14.8s      | **5.6s**   | 3.5s        | **1.3s**    |
| LCP | 15.3s      | **6.7s**   | 2.8s        | **1.0s**    |
| TTI | 15.3s      | **4.5s**   | 2.8s        | **0.6s**    |
| TBT | 480ms      | **60ms**   | 30ms        | **0ms**     |
| CLS | 0.042      | **0.00**   | 0.004       | **0.001**   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 텍스트 압축 사용
    - js/vendors.js
    - /js/main.js
- 사용하지 않는 자바스크립트 줄이기
    - js/vendors.js
    - /js/main.js
- 렌더링 차단 리소스 제거
- API 응답 속도 10ms 이하로 줄이기
  - GET/member/me
  - GET /stations

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
  - 대상 시스템 범위 : WEB(ngnix), WAS(tomcat), DB(MySQL)

  - 목표값 설정
    - DAU(1일 사용자 수)
      - 지하철 한달 평균 승객 수 125982860
      - 하루 사용자 수 = 한달 평균 승객 수 / 30 = 4,199,420
      - 420,000 = 하루 사용자 수 중 10% 사용자만 사용한다고 가정

  - 피크 시간대의 예상 집중률
    - 2배 정도로 설정했습니다.(https://www.bigdata-map.kr/datastory/traffic/seoul)

  - 1명당 1일 평균 예상 접속 혹은 요청수
    - 2번으로 설정했습니다.(https://news.mt.co.kr/mtview.php?no=2021090916014079809)

  - Throughput
    - 1일 총 접속 수 = DAU X 1명당 1일 평균 접속 수 = 840000
    - 1일 평균 rps = 1일 총 접속 수 / 86,400 (초/일) = 840000/86,400 = 9.7
    - 1일 최대 rps = 1일 평균 rps X (최대 트래픽 / 평소 트래픽) = 9.7*2 = 19.4

  - VUser
    - T = 4 * 0.1 (+1s) = 1.4
    - VUser(평균) = (9.7 X 1.4) / 4 = 3.39
    - VUser(최대) = (19.4 X 1.4) / 4 = 6.79

  - latency
    - 100ms
  - 
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
