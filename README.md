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

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

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
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
