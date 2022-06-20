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

- [handh.kro.kr](handh.kro.kr)
- [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)
- [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
- [카카오맵](https://m.map.kakao.com/)

| 사이트        | 구분     | FCP   | TTI   | SI    | TBT    | LCP   | CLS   |
|--------------|---------|-------|-------|-------|--------|-------|-------|
| handh.kro.kr | Mobile  | 14.5s | 15.1s | 14.5s | 0.560s | 15.1s | 0.042 |
|              | Desktop | 2.7s  | 2.8s  | 2.7s  | 0.050s | 2.8s  | 0.004 |
| 서울교통공사   | Mobile  | 6.8s  | 8.8s  | 11.0s | 0.500s | 6.9s  | 0.000 |
|              | Desktop | 1.6s  | 2.1s  | 3.3s  | 0.170s | 3.7s  | 0.014 |
| 네이버지도     | Mobile  | 2.1s  | 7.5s  | 4.9s  | 0.640s | 8.2s  | 0.030 |
|              | Desktop | 0.5s  | 0.7s  | 2.2s  | 0.000s | 1.5s  | 0.006 |
| 다음지도       | Mobile  | 1.7s | 4.2s  | 6.4s   | 0.090s | 5.1s   | 0.144 |
|              | Desktop | 0.5s  | 1.0s  | 2.3s  | 0.000s | 1.3s  | 0.039 |

| 목표          | 구분     | FCP   | TTI   | SI    | TBT    | LCP   | CLS   |
|--------------|---------|-------|-------|-------|--------|-------|-------|
| handh.kro.kr | Mobile  | 1.7s  | 6.0s  | 3.9s |  0.512s | 6.6s  | 0.024 |
|              | Desktop | 0.4s  | 0.6s  | 1.8s  | 0.000s | 1.2s  | 0.005 |

- 서비스가 정상적으로 동작하고 있다는 사실을 알리기 위해서 FCP를 중점적으로 개선 예정
- 사용자가 빠르게 최단 경로를 조회할 수 있도록 그 다음 우선순위로 TTI 개선 예정
- 경쟁사(네이버지도) 보다 20% 빠른 속도 목표

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 압축 사용 
    - gzip 설정을 통해 내용 압축
    - /js/vendors.js (가능한 절감 효과: 1,716.5 KiB) 
    - /js/main.js (가능한 절감 효과: 143.6 KiB)

- 사용하지 않는 자바스크립트 줄이기
    - /js/vendors.js (가능한 절감 효과: 637.3 KiB)
    - /js/main.js (가능한 절감 효과: 61.8 KiB)

#### 용어 정리
- *FCP(First Contentful Paint)*
    - 콘텐츠의 첫 번째 비트를 렌더링하여 유저에게 화면이 동작한다는 피드백을 전달하기까지 시간을 측정하는 단위
    - 브라우저가 처음으로 텍스트, 이미지(배경 포함), 흰색이 아닌 캔버스 또는 SVG를 렌더링하기까지 시간
    - 이때부터 유저는 페이지 콘텐츠를 이용 가능

- *TTI(Time To Interactive)*
    - 페이지가 로드된 시점부터 사용자 입력에 신속하게 안정적으로 응답하는 시간을 측정하는 단위
    - 조건1: 애플리케이션에 유용한 콘텐츠가 포함
    - 조건2: 메인 스레드가 유휴 상태
    - 조건3: 이벤트 핸들러 등록을 포함하여 사용자 상호 작용에 자유롭게 응답
    
- *SI(Speed Index)*
    - 페이지 콘텐츠가 시각적으로 채워지는 시간을 측정하는 페이지 로드 성능을 측정하는 단위
    - 즉, 페이지의 보이는 부분이 표시되는 평균 시간이며,
    - 밀리초 단위로 표시되며 뷰포트의 크기에 따라 점수가 낮을 수록 좋다
 
- *TBT(Total Blocking Time)*
    - 마우스 클릭, 화면 클릭, 키보드 입력 등 사용자의 입력에 응답하지 못하는 시간을 측정하는 단위
    - FCP ~ TTI 사이의 모든 `long tasks`의 `blocking portion`를 추가하여 계산
    - 50ms 이상 실행되는 모든 작업은 `long task`에 해당하며,
    - 70ms 길이의 작업을 감지하면 `blocking portion`은 20ms가 된다
    
- *LCP(Largest Contentful Paint)*
    - 페이지에서 가장 큰 콘텐츠 요소가 페이지의 뷰포트에 표시되기까지의 시간을 측정하는 단위
    - LCP는 Google의 Web Vitals를 구성하는 측정항목 중 하나이다
    
- *CLS(Cumulative Layout Shift)*
    - 유저가 이용하는 콘텐츠의 불안정성을 측정하는 사용자 경험 측정 단위
    - 페이지에 갑자기 발생하는 레이아웃 변경은 실망스러운 유저 경험으로 이어진다

---

### 2단계 - 부하 테스트 

### 1. 부하테스트 전제조건은 어느정도로 설정하셨나요

#### Target 시스템 범위
- Reverse Proxy → Spring Boot → MySQL

#### 목표 rps 구하기
- 예상 1일 사용자 수(DAU): 450,000명 (2021년 8월 네이버지도 1,392만명 이용)
    - DAU 참고 ([링크](https://moneys.mt.co.kr/news/mwView.php?no=2021091810258035737))
    
- 피크 시간대의 집중률: 2.2
    - 2022년 5월 승/하차 인원 피크 18~19시 평균: 1,332,176명
    - 2022년 5월 승/하차 인원 시간당 평균: 623,866명
    - 집중률 참고 ([링크](https://insfiler.com/detail/rt_subway_time-0003))
    
- 1명당 1일 평균 접속 수: 6회
    - 출근 3회, 퇴근 3회
    - 대중교통 환승 시 추가 사용 고려하여 선정 ([링크](https://www.sedaily.com/NewsView/265XF8LQW8))
    
- 1일 총 접속 수: 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수
    - 450,000 * 6 = 2,700,000
    
- 1일 평균 rps: 1일 총 접속 수 / 86,400
    - 2,700,000 / 86,400 = 32
    
- 1일 최대 rps: 1일 평균 rps x (최대 트래픽 / 평균 트래픽)
    - 32 * 2.2 = 71
    
- Latency: 일반적으로 50 ~ 100ms 이하로
    - 100ms
    
### VUser 구하기

- R(VUser가 1회 테스트 시 요청 보내는 수): 6 
    - 메인페이지 이동
    - 로그인 페이지 이동
    - 회원가입 페이지 이동
    - 로그인
    - 내 정보 조회
    - 최단 경로 조회
    
- T = (R * http_req_duration) (+ 1s)
    - (6 * 0.1) + 1 = 2s
    
- VUser = (목표 rps * T) / R
    - Min VUser = (32 * 2) / 6 = 10
    - Max VUser = (71 * 2) / 6 = 24  

### 2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
