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
<b> 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 </b>

#### 웹성능 관련 용어 정리

    1) LCP (Largest Contentful Page)
        - 화면을 가장 많이 차지하는 콘텐츠가 로딩되는 시간
        - 페이지가 얼마나 빨리 로딩되는지 측정
    2) FID (First Input Delay)
        - 사용자가 페이지와 처음 상호작용할 때 걸리는 시간
        - 페이지의 응답성을 측정
    3) CLS (Cumulative Layout Shift)
        - 페이지가 로딩되면서 이미지나 텍스트 위치가 바뀌는 정도
        - 페이지의 시각적 안정성 측정
    4) FCP (First Contentful Paint)
        - 처음 콘텐츠가 로딩되는 시간
        - FCP보다는 LCP가 더 유의미하다고 볼 수 있음
    5) INP (Interaction to Next Paint)
        - (가장) 오래 걸리는 상호작용이 걸리는 시간
        - 페이지의 응답성을 측정
    6) TTFB (Time to First Byte)
        - HTTP요청 후 첫 Byte가 응답되는 시간
        - 서버의 성능속도를 측정
    7) SI (Speed Index)
        - 웹 페이지를 불러올 때, 콘텐츠가 채워지는 속도
    8) TTI (Time to Interactive)
        - 페이지가 완전히 상호 작용 가능하게 되는 데 걸리는 시간
    9) TTB (Total Blocking Time)
        - 페이지가 안정적인 상호 작용 환경이 되기 전, 상호 작용이 불가능한 시간

#### 웹 성능 테스트
- 휴대전화

|사이트| FCP (초) | TTI (초) | SI (초) | TBT (밀리초) |LCP (초)|CLS|총점|
|-------|-------|------|---|---|---|---|------|
|개발 사이트|14.7|15.2|14.7|480|15.2|0.041|34|
|서울교통공사|6.7|9.3|8.7|1670|7.6|0|24|
|네이버지도|2.2|6.5|5.5|410|8.2|0.03|55|
|카카오맵|1.7|4.2|6.3|50|5.0|0.005|74|

- 데스크탑

|사이트| FCP (초) | TTI (초) | SI (초) | TBT (밀리초) |LCP (초)|CLS|총점|
|-------|-------|------|---|---|---|---|------|
|개발 사이트|2.7|2.8|2.7|30|2.8|0.04|68|
|서울교통공사|1.5|2.2|2.5|370|3.7|0|53|
|네이버지도|0.5|1.2|2.2|0|1.7|0.006|89|
|카카오맵|0.5|0.7|2.4|0|1.3|0.039|91|

####웹 성능 목표

> 가장 성능이 뛰어난 카카오맵 기준으로, 웹성능 지표가 20% 이내에 들어올 수 있도록 목표 설정
- 정량적 지표
    - 리소스 200KB 이하
- 시간적 지표
    - FCP 2초 이내 (카카오맵 1.7초)
    - TTI 5초 이내 (카카오맵 4.2초)
- 규칙 기반 지표
    - LightHouse 성능 점수 휴대전화 60점 이상, 데스크탑 73점 이상

<br>

<b>2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요</b>
> 시간지표(FCP, TTI)의 개선을 위해서는, 리소스의 용량과 요청을 줄이는 것이 중요
- 리소스 압축
    - /js/vendors.js
        - 전송 크기: 2,125.0 KB
        - 가능한 절감 효과: 1,716.5 KB
    - /js/main.js
        - 전송 크기: 172.0 KB
        - 가능한 절감 효과: 143.6 KB
- 사용하지 않는 자바스크립트 줄이기
    - /js/vendors.js
        - 전송 크기: 2,125.0 KB
        - 가능한 절감 효과: 637.3 KB
    - /js/main.js
        - 전송 크기: 172.0 KB
        - 가능한 절감 효과: 61.8 KB
- 사용하지 않는 CSS 줄이기
- 렌더링 차단 리소스 제거하기
- 리소스 캐싱 사용하기

---

### 2단계 - 부하 테스트
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- [X] 대상 시스템 범위 : WebServer, WAS, DB
- [X] 전제조건 및 목표값 정리

  |범주| 값 | 산출 기준 | 출처 |
  |-------|-------|------|---|
  |latency 목표|50ms 이하|목표값| |
  |하루평균 지하철 승차인원|440만|2021년 4월 서울 지하철 이용객수|https://www.bigdata-map.kr/datastory/traffic/seoul|
  |인당 1일평균 실행횟수|2.5|카카오지하철 기준 1일평균 실행횟수|https://ko.lab.appa.pe/2016-09/kakao-korea.html|
  |피크시간대 집중률|2.5|100만(피크시간대) / 38만(평균시간대)|https://www.bigdata-map.kr/datastory/traffic/seoul|
  |DAU|100만|지하철 종결자 기준 DAU|https://platum.kr/archives/61943|
  |1일 평균 rps|30|DAU * 1일평균 실행횟수 / 86,400|  |
  |1일 최대 rps|75|1일평균 rps * 피크시간대 집중률|  |
  |T|1.4|(4 * 0.1) + 1 (시나리오상 4번의 요청, Latency 목표 왕복 0.1sec, 지연시간 1sec)|  |
  |평균 VUser|10|(1일 평균 rps * T) / 요청 수|  |
  |최대 VUser|25|평균 VUser * 피크시간대 집중률|  |

- [X] Throughput 계산
  > Throughput : 1일 평균 rps ~ 1일 최대 rps
  >- 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
  >- 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
  >-  1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
  - 1일 평균 30 ~ 1일 최대 75
    - 100만 (DAU) * 2.5 (1명당 1일 평균 접속 수) = 250만 (1일 총 접속 수)
    - 250만 (1일 총 접속수) / 86,400 = 28.9 (1일 평균 rps)
    - 28.9 (1일 평균 rps) * (100만 (피크시간대 승객수) / 38만(평균시간대 승객수)) = 76 (1일 최대 rps) 
- [X] 부하 테스트 시 저장될 데이터 건수 및 크기
    - 지하철 노선: 23 개
    - 지하철 구간: 340 개
    - 지하철 역: 616 개

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - [X] 각 시나리오에 맞춰 스크립트 작성
        - 접속 빈도가 높은 페이지 : 메인화면
        - 데이터를 갱신하는 페이지 : 내 정보 수정
        - 데이터를 조회하는데 여러 데이터를 참조하는 페이지 : 경로 탐색
    - [X] Smoke Test : smoke.js, smoke_k6.png, smoke_grafana.png
    - [X] Load test : load.js, load_k6.png, load_grafana.png
    - [X] Stress Test : stress.js, stress_k6.png, stress_grafana.png

---

### 3단계 - 로깅, 모니터링
#### 미션 요구사항
- [ ] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [ ]  로그 설정하기
    - [ ] Application Log 파일로 저장하기
      - [ ] 회원가입, 로그인 등의 이벤트에 로깅을 설정
      - [ ] 경로찾기 등의 이벤트 로그를 JSON으로 수집
    - [ ] Nginx Access Log 설정하기
- [ ]  Cloudwatch로 모니터링
    -[ ] Cloudwatch로 로그 수집하기
    -[ ] Cloudwatch로 메트릭 수집하기
    -[ ] USE 방법론을 활용하기 용이하도록 대시보드 구성


1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
