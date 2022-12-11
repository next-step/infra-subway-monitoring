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

### 경쟁사 성능 분석 (MOBILE)
| MOBILE | Running Map | Kakao Map | Naver Map |
|--------|-------------|-----------|-----------|
| FCP    | 14.2s       | 2.6s      | 3.5s      |
| TTI    | 19.8s       | 12.4s     | 5.8s      |
| SI     | 14.5s       | 9.4s      | 4.9s      |
| TBT    | 700ms       | 80ms      | 20ms      |
| LCP    | 14.8s       | 9.0s      | 3.6s      |
| CLS    | 0           | 0.005     | 0.03      |

### 경쟁사 성능 분석 (DESKTOP)
| DESKTOP | Running Map | Kakao Map | Naver Map |
|---------|-------------|-----------|-----------|
| FCP     | 2.6s        | 0.6s      | 0.3s      |
| TTI     | 3.4s        | 3.1s      | 4.4s      |
| SI      | 2.6s        | 1.7s      | 2.9s      |
| TBT     | 100ms       | 560ms     | 400ms     |
| LCP     | 3.3s        | 1.0s      | 4.4s      |
| CLS     | 0.001       | 0.03      | 0.013     |

- 용어
  - FCP(First Contentful Paint) : 콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
  - TTI(Time to Interactive) : 사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.
  - SI(Speed Index) : 속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.
  - TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다.
  - LCP(Largest Contentful Paint) : 콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
  - CLS(Cumulative Layout Shift) : 누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.
  
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

|         | FCP  | TTI  | SI   | TBT   | LCP  | CLS   |
|---------|------|------|------|-------|------|-------|
| MOBILE  | 2.0s | 5.0s | 6.0s | 200ms | 5.0s | 0.03  | 
| DESKTOP | 0.3s | 3.1s | 1.7s | 560ms | 1.0s | 0.013 | 

- 경쟁사(카카오맵, 네이버지도)와 비슷한 수준의 웹 성능예산을 목표로 설정
- 3초의 법칙을 완전히 충족하지는 못하더라도, FCP 3초 미만을 목표로 설정

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- Pagespeed 테스트 결과 진단 및 추천된 방법을 기준으로 작성
  - 텍스트 압축 사용(/js/vendors.js, /js/main.js)
  - 사용하지 않는 자바스크립트 줄이기(/js/vendors.js, /js/main.js)
  - 렌더링 차단 리소스 제거하기(css)
  - 콘텐츠가 포함된 최대 페인트 이미지 미리 로드
  - 사용하지 않는 CSS 줄이기
   

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

- [X] 대상 시스템 범위 
  - WEB → WAS → DB
- [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
  - latency : 100ms
  - throughput
    - 집중률 = 최대트래픽 / 평소트래픽 = 5.00 (5배 가정)   
    - 예상 1일 사용자 수(DAU): 100,000명 가정 
    - 1명당 1일 평균 접속 수 = 5
      - 메인 페이지 ➝ 로그인 -> 내 정보 요청 -> 경로 검색 페이지 -> 경로 검색
    - 1일 총 접속 수 = DAU(100,000) * 1명당 1일 평균 접속 수(5) = 500,000
    - 1일 평균 rps = 1일 총 접속 수(500,000) / 1일 초단위 시간(86400) = 5.78 rps
    - 1일 최대 rps = 5.78 * 피크 시간대의 집중률(5.00) = 28.9 rps
  - 부하 유지기간
    - Smoke: 1m
    - Load: 30m
    - Stress: 30m 
- [X] 부하 테스트 시 저장될 데이터 건수 및 크기
    - 데이터 조회 테스트이기 때문에 저장될 데이터 없음   

### VUser 구하는 공식 이해하기
- Request Rate: measured by the number of requests per second (RPS)
  - 요청 속도: 초당 요청 수로 측정됨
- VU: the number of virtual users
  - 가상 사용자 수
- R: the number of requests per VU iteration
  - VU 반복당 요청 수
- T: a value larger than the time needed to complete a VU iteration
  - VU 반복을 완료하는 데 필요한 시간
  
```
T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency를 추가한다
VUser = (목표 rps * T) / R
```
- VU 반복을 완료하는 데 필요한 시간 = (VU 반복당 요청 수 x http 요청지속시간) + Latency
- 가상 사용자 수 = (목표 RPS * VU 반복을 완료하는 데 필요한 시간) / 요청 개수
- 목표 RPS = (가상 사용자 수 * 요청 개수) / VU 반복을 완료하는 데 필요한 시간


### 목표 / 평균 VUser 값 구하기
- R = 5
- T = (5 * 0.1s) + 1s = 1.5s
- 평균 VUser = (5.78 * 1.5s) / 5 = 1.734 (2명)
- 목표 VUser = (28.9 * 1.5s) / 5 = 8.67 (9명)


2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

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

#### 요구사항 체크리스트
- [X] 부하 테스트
  - [X] 테스트 전제조건 정리
    - [X] 대상 시스템 범위
    - [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [X] 부하 테스트 시 저장될 데이터 건수 및 크기
  - [X] 아래 시나리오 중 하나를 선택하여 스크립트 작성
    - [X] 접속 빈도가 높은 페이지
    - [ ] 데이터를 갱신하는 페이지
    - [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
  - [X] Smoke, Load, Stress 테스트 후 결과를 기록

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
- [X] syslog
  - /var/log/syslog  
- [X] nginx log
  - [X] access log
    - /var/log/nginx/access.log
  - [X] error log
    - /var/log/nginx/error.log
- [X] application log
  - [X] file log 
    - /home/ubuntu/nextstep/infra-subway-monitoring/log/file.log
  - [X] json log 
    - /home/ubuntu/nextstep/infra-subway-monitoring/log/json.log
  - [X] spring log 
    - /home/ubuntu/nextstep/infra-subway-monitoring/log/spring.log
2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-gyeom

#### 요구사항 체크리스트
- [X] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [X] 로그 설정하기
  - [X] Application Log 파일로 저장하기
    - [X] 회원가입, 로그인 등의 이벤트에 로깅을 설정
    - [X] 경로찾기 등의 이벤트 로그를 JSON으로 수집
  - [X] Nginx Access Log 설정하기
- [X] Cloudwatch로 모니터링
  - [X] Cloudwatch로 로그 수집하기
  - [X] Cloudwatch로 메트릭 수집하기
  - [X] USE 방법론을 활용하기 용이하도록 대시보드 구성
