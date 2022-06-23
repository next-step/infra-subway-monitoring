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
- 웹 성능예산을 정량적으로 산정하기 위한 좋은 기준(경쟁사)이 존재해서 아래의 3개의 경쟁사 대비 20% 이상 좋은 성능을 목표로 합니다.
  - 서울교통공사 (http://www.seoulmetro.co.kr/kr/cyberStation.do)
  - 네이버지도 (https://m.map.naver.com/subway/subwayLine.naver?region=1000)
  - 카카오맵 (https://m.map.kakao.com/)

### 들어가기 전에
[라이트 하우스 성능지표]
- FCP (First Contentful Paint)
  - 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간
- TTI (Time to Interactive)
  - 페이지가 완전히 상호 작용 가능하게 되는 데 걸리는 시간
- SI (Speed Index)
  - 뷰포트내의 콘텐츠가 눈에 띄게 채워지는 속도를 보여주는 페이지 로드 성능
- TBT (Total Blocking Time)
  - 메인 스레드가 입력 응답을 막을 만큼 오래 차단되었을 때 FCP와 TTI 사이 총 시간
- LCP (Largest Contentful Paint)
  - 뷰포트에서 가장 큰 콘텐츠 요소가 표시되는 시점
- CLS (Cumulative Layout Shift)
  - 페이지의 전체 수명 동안 발생하는 모든 예기치 않은 레이아웃 이동 중에서 가장 큰 레이아웃 이동 점수

## 각 사이트별 성능 지표

### 내 사이트 (https://kmmin78-infra-subway.p-e.kr)

    [모바일]
    FCP (First Contentful Paint) - 14.6 초
    TTI (Time to Interactive) - 15.3 초
    SI (Speed Index) - 14.6초
    TBT (Total Blocking Time) - 570 밀리초
    LCP (Largest Contentful Paint) - 15.2 초
    CLS (Cumulative Layout Shift) - 0.042
    성능점수 : 31

    [데스크톱]
    FCP (First Contentful Paint) - 2.7 초
    TTI (Time to Interactive) - 2.8 초
    SI (Speed Index) - 2.7 초
    TBT (Total Blocking Time) - 50 밀리초
    LCP (Largest Contentful Paint) - 2.8 초
    CLS (Cumulative Layout Shift) - 0.004
    성능점수 : 67

### 서울교통공사 (http://www.seoulmetro.co.kr/kr/cyberStation.do)

    [모바일]
    FCP (First Contentful Paint) - 7.1 초
    TTI (Time to Interactive) - 9.4 초
    SI (Speed Index) - 8.7 초
    TBT (Total Blocking Time) - 1,120 밀리초
    LCP (Largest Contentful Paint) - 7.9 초
    CLS (Cumulative Layout Shift) - 0
    성능점수 : 27    

    [데스크톱]
    FCP (First Contentful Paint) - 1.6 초
    TTI (Time to Interactive) - 2.1 초
    SI (Speed Index) - 2.4 초
    TBT (Total Blocking Time) - 200 밀리초
    LCP (Largest Contentful Paint) - 3.6 초
    CLS (Cumulative Layout Shift) - 0.014
    성능점수 : 64

### 네이버지도 (https://m.map.naver.com/subway/subwayLine.naver?region=1000)

    [모바일]
    FCP (First Contentful Paint) - 2.0 초
    TTI (Time to Interactive) - 7.1 초
    SI (Speed Index) - 5.2 초
    TBT (Total Blocking Time) - 340 밀리초
    LCP (Largest Contentful Paint) - 7.6 초
    CLS (Cumulative Layout Shift) - 0.03
    성능점수 : 57    

    [데스크톱]
    FCP (First Contentful Paint) - 0.5 초
    TTI (Time to Interactive) - 0.5 초
    SI (Speed Index) - 2.1 초
    TBT (Total Blocking Time) - 0 밀리초
    LCP (Largest Contentful Paint) - 1.6 초
    CLS (Cumulative Layout Shift) - 0.006
    성능점수 : 91

### 카카오맵 (https://m.map.kakao.com/)

    [모바일]
    FCP (First Contentful Paint) - 1.7 초
    TTI (Time to Interactive) - 4.5 초
    SI (Speed Index) - 5.5 초
    TBT (Total Blocking Time) - 110 밀리초
    LCP (Largest Contentful Paint) - 6.4 초
    CLS (Cumulative Layout Shift) - 0.139
    성능점수 : 66    

    [데스크톱]
    FCP (First Contentful Paint) - 0.5 초
    TTI (Time to Interactive) - 0.6 초
    SI (Speed Index) - 2.4 초
    TBT (Total Blocking Time) - 0 밀리초
    LCP (Largest Contentful Paint) - 1.3 초
    CLS (Cumulative Layout Shift) - 0.039
    성능점수 : 91

### 목표 성능 지표
각 경쟁사의 성능 지표 중 가장 성능이 뛰어난 것을 목표로 하며, 그보다 20% 이상 개선되면 베스트.

    [모바일]
    FCP (First Contentful Paint) - 1.7 초
    TTI (Time to Interactive) - 4.5 초
    SI (Speed Index) - 5.2 초
    TBT (Total Blocking Time) - 110 밀리초
    LCP (Largest Contentful Paint) - 6.4 초
    CLS (Cumulative Layout Shift) - 0
    성능 점수 : 66

    [데스크톱]
    FCP (First Contentful Paint) - 0.5 초
    TTI (Time to Interactive) - 0.5 초
    SI (Speed Index) - 2.1 초
    TBT (Total Blocking Time) - 0 밀리초
    LCP (Largest Contentful Paint) - 1.3 초
    CLS (Cumulative Layout Shift) - 0.006
    성능 점수 : 91

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 압축 사용
  - /js/vendors.js
  - /js/main.js
  - 위 2개 파일을 압축하여 제공 (gzip, deflate, brotli)
- 사용하지 않는 자바스크립트 줄이기
  - /js/vendors.js
  - /js/main.js
  - 마찬가지로 위 2개 스크립트를 필요할 때까지 지연로딩하여 네트워크 비용을 절감
- FCP를 방해하는 리소스 인라인으로 전달하거나 지연로딩
  - /css?family=Roboto:100,300,400,500,700,900(fonts.googleapis.com)
  - …css/materialdesignicons.min.css(cdn.jsdelivr.net)
- 캐시 정책을 사용하여 정적 리소스 제공
  - /js/vendors.js
  - /js/main.js
  - /images/main_logo.png
  - /images/logo_small.png
  - Cache-Control 헤더를 통한 브라우저 캐시 이용
  - CDN 서비스를 이용
- 이미지 요소에 width 및 height를 명시해서 CLS 방지

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 테스트 전제조건 정리
  - 대상 시스템 범위
    - reverse proxy, was, db
  - 목푯값 설정 (latency, throughput, 부하 유지기간)
    - latency : 200ms 이하
    - throughput :
      - 1일 총 접속 수 = 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1,200,000 (21년 4월 수도권 지하철 일일 이용 인원) x 2 (출근/퇴근) = 2,400,000
      - 1일 평균 rps = 1일 총 접속 수 / 86,400 (초/일) = 2,400,000 / 86,400 = 27.77
      - 1일 최대 rps = 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 27.77 x (1,200,000 / 200,000) = 166.62
      - 평소 트래픽은 최대 트래픽의 6분의 1이라고 가정
      - 참고 : https://www.bigdata-map.kr/datastory/traffic/seoul
    - T = (R * http_req_duration) + 1 = (2 * 0.2) + 1 = 1.4
    - 평균 VUser = (1일 평균 rps * T) / R = (27.77 * 1.4) / 2 = 19.44
    - 최대 VUser = (1일 최대 rps * T) / R = (166.62 * 1.4) / 2 = 116.63
    - 부하 유지기간 : 1시간
  - 부하 테스트 시 저장될 데이터 건수 및 크기
    - 즐겨찾기 데이터 크기 = 즐겨찾기 id byte 수 + 회원 id byte 수 + (지하철역 id byte 수 * 2) = 36 + 36 + (36 * 2) = 144 bytes
    - id는 uuid라고 가정하고, uuid는 36개의 문자로 이루어져 있다. (https://ko.wikipedia.org/wiki/%EB%B2%94%EC%9A%A9_%EA%B3%A0%EC%9C%A0_%EC%8B%9D%EB%B3%84%EC%9E%90)
    - 부하 테스트 동안 저장될 데이터 총 크기 = 1일 평균 rps의 4분의 1 (crud 중 c) * (3,600초) * 즐겨찾기 데이터 크기 = (19.44 / 4) * 3,600 * 144 = 2,519,424 bytes = 2,460 kilo bytes = 2 mega bytes
    - #### 실제 부하테스트는 login 및 회원정보 조회 api 테스트를 진행할 예정.

3. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- Grafana 
  - url : http://3.34.200.8:3000/login
  - id/pwd : admin/admin (default)
- /monitor/script에 각 테스트별 스크립트가 존재
- /monitor/results/{테스트종류}에 각 테스트별 결과 이미지 존재
- #### load test에서 VUser가 30이 넘어가는 순간부터 http_req_duration이 threshold를 넘어가는 현상이 포착됨
- #### stress test에서도 비슷하게 VUser가 35이상일 때부터 threshold가 넘어감

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
