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


**ssonsh-next-step.p-e.kr**

**정량지표**

|JS|CSS|Img|Font|
|---|---|---|---|
|2.4mb|63.6kb|5.7kb|124kb|

**성능지표**

|라이트하우스 총점|FCP|TTI|SpeedIndex|TBT|LCP|CLS|
|---|---|---|---|---|---|---|
|45|13.6s|14.5s|13.6s|140ms|13.7s|0.039|

---

**경쟁사 정량지표 테스트**

|경쟁사|JS|CSS|Img|Font|
|---|---|---|---|---|
|서울교통공사|454kb|141kb|79.8kb|312kb|
|네이버|292kb|53.7kb|350kb|0|
|카카오|266kb|35.9kb|1.5mb|0|

**경쟁사 성능지표 테스트**

Mobile

|경쟁사|라이트하우스 총점|FCP|TTI|SpeedIndex|TBT|LCP|CLS|
|---|---|---|---|---|---|---|---|
|서울교통공사|49|8.4s|8.4|34.2|0ms|8.8s|0|
|네이버|68|2.4s|5.1s|5.7s|60ms|6.3s|0|
|카카오|75|1.7s|2.4s|4.4s|0ms|6.1s|0.005|


Desktop

|경쟁사|라이트하우스 총점|FCP|TTI|SpeedIndex|TBT|LCP|CLS|
|---|---|---|---|---|---|---|---|
|서울교통공사|95|1.1s|1.6s|1.2s|20ms|1.2s|0|
|네이버|94|0.4s|0.4s|0.8s|0ms|1.6s|0.029|
|카카오|92|0.4s|0.6s|0.9s|0ms|1.4s|0.16|


**1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요**

**정량**
- 리소스(이미지, 폰트, 스크립트) 200KB 이하 

**시간**
- FCP(First Contentful Paint) : 2.0s 이하
- TTI(Time to Interaction) : 5.0s 이하

**규칙**

Lighthouse 성능점수 80점 이상 목표 : 타사 대비 20%내외
- 타사 Mobile 점수 평균 : 64점
- 타사 Desktop 점수 평균 : 93.6점

**2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요**
- Unused 스크립트 및 리소스 압축을 통한 페이지 로딩 속도 개선
  - /js/vendors.js (2,125 KB), /js/main.js (172 KB)
- 프론트엔드 정적 리소스 캐싱
  - 브라우저 캐싱 (cache-control)
  - CDN 서버 활용
- 미사용 폰트 제거
  - 103KB, 22KB 
- 조회 기능에 대한 Query 수행 최적화를 통한 수행 시간 최소화

---

### 2단계 - 부하 테스트 
### 1. 부하테스트 전제조건은 어느정도로 설정하셨나요
**대상 시스템 범위**
- Reverse Proxy -> Tomcat -> MySQL (WEB - WAS - DB)

**1일 사용자 수(DAU) : 7.4만명**
- 참고 : https://biz.chosun.com/site/data/html_dir/2020/07/09/2020070901297.html
  - 경쟁사 네이버맵(지도) MAU : 약 1,112만명 
  - 러닝맵 서비스를 네이버맵(지도)의 1/5 수준이라 가정 : 1,112 / 5 = 약 222만명
  - 러닝맵 서비스 DAU : 222만명 / 30 = 7.4만명

**피크 시간대의 집중률 : 08:00 ~ 10:00, 17:00 ~ 19:00**
- 출퇴근 시간대를 예상 피크 시간대로 설정

**1명당 1일 평균 접속 혹은 요청수**
- 1명당 1일 평균 요청 수 : 메인 > 로그인 > 즐겨찾기 > 경로조회 x n = 약 6회로 예상

**Throughput(1일 평균 rps ~ 1일 최대 rps)**
- 1일 총 접속수 = 74000(명) * 6(회) = 444,000번
- 최대 트래픽 / 평소 트래픽 : 10 (최대와 평소의 차이는 약 10배 라고 가정)
- 1일 평균 RPS = 444,000(번) / 86,400(초/일) = 5.1388888... = 5
- 1일 최대 RPS = 5 * 10(배) = 50

**Latency(일반적으로 50~100ms이하)**
- 100ms 

**부하 테스트 시 저장될 데이터 건수 및 크기**
- 기준 : private subnet에 위치한 data-subway docker image 
- 총 지하철 노선 정보 : 23개
- 총 지하철 역 수 : 616개
- 총 구간 수 : 340개 

### 2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
