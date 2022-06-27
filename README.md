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

* Infra-Subway/stations 모바일 기준

| 사이트          | FCP  |  TTI  |  SI  |  TBT  |   LCP  |   CLS   |   Score  |
|----------------|------|------|------|--------|--------| ------- |  :-----: |
| 서울교통공사     | 7.2s | 8.9s | 9.8s |  310ms |  11.4s  |  0.0  |   43    |
| 네이버맵        | 2.0s | 6.6s | 5.2s |   300ms  |  7.2s  |  0.03  |    60    |
| 카카오 지하철 노선도 | 3.5s | 6.2s | 5.1s |  200ms  |  6.3s  |  0.135  |    57    |
| Infra-Subway(목표)   | 2.5s | 6.0s | 5.0s | 250ms |  6.0s  |   0.0   |    60    |

- `https://songsimo.kro.kr/stations` PageSpeed 검사 결과 FCP, TTI, SI, TBT LCP 모두 낮게 나옴

- 이미지에 대한 랜더링이 없기에 js, css를 최적화하면 성능 향상이 기대됨 <br>
 
- 진단상에도 FCP와 LCP의 개선이 필요하다 나옴


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

```text
* 텍스트 압축(gzip, deflate, brotli 등)을 사용 : FCP, LCP 개선
  - /js/vendors.js
  - /js/main.js
  - /stations
  
* 사용하지 않는 자바스크립트 줄이기 : LCP 개선
  - /js/vendors.js
  - /js/main.js

* 과도한 DOM 크기 지양하기 : TBT 개선

* 캐시를 활용하여 정적 속성 제공
```

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

* 목표 rps 구하기

- [x] 1일 사용자 수(DAU): 15,000 명

(경쟁사) 카카오 지하철(피드백 반영): 1,500,000(MAU) * 0.3(목표 점유율) / 30(일)

참고링크: [카카오 모바일 APP 현황](https://ko.lab.appa.pe/2016-09/kakao-korea.html)

- [x] 피크 시간대의 집중률(최대 트래픽 / 평소 트래픽)

출근시간(피크) : 10,00,000 명
서울 하루 평균: (대략) 5,000,000 명

집중률 : 2

참고링크: [데이터로 보는 서울시 대중교통 이용](https://www.bigdata-map.kr/datastory/traffic/seoul)

- [x] 1명당 1일 평균 접속 혹은 요청수

실행 횟수: 2회

참고링크: [카카오 모바일 APP 현황](https://ko.lab.appa.pe/2016-09/kakao-korea.html)

- [x] Throughput (1일 평균 rps ~ 1일 최대 rps)

0.35 ~ 0.7

```text
1일 총 접속 수 = 15,000 (DAU) * 2 (1인 1일 평균 접속 수) = 30,000

1일 평균 rps = 30,000 / 86,400 (초/일) = (대략) 0.35

1일 최대 rps = 0.35 * 2 (집중률) = 0.7

Latency = 100ms
```

* VUser 구하기
```text
Request Rate: measured by the number of requests per second (RPS)
VU: the number of virtual users
R: the number of requests per VU iteration
T: a value larger than the time needed to complete a VU iteration
```
- [x] T = 2 (R) * 0.2 (http_req_duration) + 1 (s, 지연시간) = 1.4

```text
VUser = (목표 rps * T) / R
```

- [x] VUser = (0.5 * 1.4) / 2 = 0.35

* 접속 빈도가 높은 기능
```text
1. 회원 로그인
2. 즐겨찾기
3. 경로 조회
```

* 현재 데이터 건수

```text
1. 노선 : 23개
2. 구간 : 340개
3. 역 : 616개
```

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
```text
/var/log/nginx/access.log
/var/log/nginx/error.log
/var/log/syslog
/home/ubuntu/nextstep/infra-subway-monitoring/log/*.log
```

2. Cloudwatch 대시보드 URL을 알려주세요

```text
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=songsimo-dashboard;expand=false
```
