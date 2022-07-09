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
1. **웹 성능예산은 어느정도가 적당하다고 생각하시나요**
* 먼저 타 사이트와 함께 성능테스트를 통해 데이터 비교
 #### 성능테스트 비교 (모바일)
|서비스|FCP|TTI|SI|TBT|LCP|CLS|
|---|---|---|---|---|---|---|
|지하철노선도|14.4초|14.9초|14.4초|0.38초|14.9초|0.042|
|서울교통공사|6.4초|8.4초|11.1초|0.57초|6.6초|0|
|네이버지도|2.2초|6초|5.8초|0.28초|8초|0.03|
|카카오맵|1.7초|4.3초|6.4초|0.05초|3.4초|0.005|
* 타 사이트 대비하여, 상당히 떨어지는 성능이 보여진다.
* 가장 중요하게 성능 개선이 필요한 부분 : FCP, TTI
  * 지하철노선도를 사용자가 보고, 길을 찾는 것이 주요 목적인 서비스에서 사용자가 빠르게 컨텐츠를 보고 인터랙션하는 것이 제일 중요
* 개선 필요 지표 예산
  * 기준 : 대규모 트래픽에도 안정적인 성능을 보여주고 있는 네이버지도, 카카오맵의 평균값으로 잡으면 의미있는 성능 개선이라 판단
  * FCP : 14.4초 -> 1.95초
  * TTI : 14.9초 -> 5.15초


2. **웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요**
* 텍스트 압축
  * /js/vendors.js, /js/main.js 두 개의 압축이 필요
  * gzip 으로 압축하여 제공하면 네트워크 바이트를 최소화 가능
* 사용하지 않는 자바스크립트 줄이기
  * 지연로딩
* 캐시 설정
  * 브라우저 캐시
  * CDN 사용

***
* [용어 정리]
    * FCP (First Contentful Paint) - FCP는 페이지가 로드되기 시작하고 컨텐츠의 일부가 화면에 렌더링 될 때 까지의 시간을 의미한다.
    * TTI (Time to Interactive) - 웹 페이지가 완전히 상호작용이 가능(interactive)하게 되는 시점을 나타낸다. 컨텐츠를 볼 수 있지만 스크롤 할 수 없거나 항목을 클릭해도 효과가 없으면 interactive 하지 않은 것이다.
    * SI (Speed Index) - Speed Index는 뷰포트내의 콘텐츠가 눈에 띄게 채워지는 속도를 보여주는 페이지 로드 성능을 측정합니다
    * TBT (Total Blocking Time) - TBT는 주 스레드가 input 응답을 막을 정도로 오래 차단 되었을때 FCP와 TTI 사이의 총 시간을 나타낸다.
    * LCP (Largest Contentful Paint) - 페이지에서 가장 용량이 큰 컨텐츠가 표시되는 시점을 나타낸다.
    * CLS (Cumulative Layout Shift) - 페이지가 로드되기 시작하는 시점과 lifecycle 상태가 숨김으로 변경되는 시점 사이에 발생하는 모든 예기치 않은 레이아웃 이동의 누적 점수를 측정한다.
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
* 대상 시스템 범위
  * 메인 페이지
  * 로그인
  * 경로 조회

* DAU 
  * 지하철 종결자 라는 앱의 DAU 가 100~130만
  * 후발주자로 40%의 DAU를 먼저 가져간다고 생각하여 40만의 DAU를 생각한다.

* 평균 요청
  * 아침 저녁으로 하루에 두 번정도 접속을 할 것이라고 예상
  * 시나리오
    * 메인페이지 접속
    * 경로 검색 페이지 접속
    * 경로 검색
  * 하루에 두 번 접속 * 3번의 요청 = 하루에 총 6번 요청

* Throughput
  * 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
    * 400,000 * 6 = 2,400,000 
  * 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
    * 2,400,000 / 86,400 = 28
  * 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
    * 최대 트래픽은 평소보다 3배정도 몰린다고 가정 
    * 28 * 3 = 84

* Latency 
  * 250ms

* 부하 테스트 시 저장될 데이터 건수 및 크기
  * 조회 데이터 ( 추가 저장 데이터는 없음 )
    * 노선 : 23 건
    * 역 : 616 건
    * 지하철 구간 : 340 건

* T = (R * http_req_duration) (+ 1s)
  * T = ( 6 * 0.5 ) + 1 = 4

* VUser = (목표 rps * T) / R
  * 평균 VUser = ( 28 * 4 ) / 6 = 18
  * 최대 VUser = ( 84 * 4 ) / 6 = 56


### 용어 정리
* DAU
  * 예상 1일 사용자 수
  * Daily Active User

* RPS
  * Request Per Second

* Smoke Test
  * 최소한의 부하를 견딜 수 있는 지 테스트

* Load Test
  * 평균 트래픽일 경우와 최대 트래픽을 경우를 나눠서 테스트

* Stress Test
  * 최대 사용자, 최대 처리량 등 한계점을 확인
  * 점진적으로 부하가 증가하도록 구성

* R: the number of requests per VU iteration


2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* 테스트 패키지에 각 테스트 별로 스크립트와 이미지 첨부하였습니다.
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
* nginx : /var/log/nginx
* Application file log : /home/ubuntu/nextstep/infra-subway-monitoring/log/file.log
* Application json log : /home/ubuntu/nextstep/infra-subway-monitoring/log/json.log


2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=bgc8214

