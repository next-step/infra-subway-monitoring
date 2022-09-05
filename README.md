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

다음과 같이 웹 성능 예산을 작성해 보았습니다. 
처음 작성해 보는 것이라, 제대로 작성했는지 모르겠습니다.
이상하거나, 핀트를 잘못 잡고 있는거 같은 부분이 있으면 
피드백 부탁드립니다.
감사합니다. 


```text

웹 성능 예산 작성

대상 페이지)
웹 성능 측정 대상이 되는 페이지는 경로 검색 페이지입니다.
강의의 예제 소스 RUNNINGMAP은 역관리, 노선관리, 구간관리, 로그인 기능을 제공하지만,
이는 모두 부수적인 기능으로, 
사용자가 해당 서비스에서 가장 많이 사용할 기능은 경로검색 기능일 것으로 판단했습니다.

https://hoanstore-subway.p-e.kr/path

```

```text
a. Quantity based Metric

* Pagespeed 테스트 결과 진단 및 추천된 방법을 기준으로 기술했습니다.

- 텍스트 압축 사용합니다. 총 네트워크 바이트를 최소화하려면 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 제공해야 합니다.
- 사용하지 않는 자바스크립트를 줄입니다.
- 렌더링 차단 리소스 제거합니다.
- 효율적인 캐시 정책을 사용하여 정적인 애셋을 제공합니다. 
- 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인합니다. 
- 이미지 요소에 width 및 height가 명시합니다.


- 페이지로드 : 모바일 3초 미만 / 데스크탑 2초 미만
- TTI : 모바일 3초 미만 / 데스크탑 2초 미만
- 압축된 리소스 최대 크기 200KB 미만

```

```text
b. Timing based Metric

- FCP, LCP, TTI, TBT, CLS 등 pagespeed에서 제공하는 데이터

- FCP는 현재 16.2초입니다. 목표치는 2.1초입니다.
- LCP는 현재 16.2초입니다. 목표치는 6.8초입니다.
- TTI는 현재 17.0초입니다. 목표치는 5.4초입니다. 
- TBT는 현재 290밀리초입니다. 목표치는 255밀리초입니다.
- CLS는 현재 0.004점으로 개선이 필요하지 않습니다.

```

```text
c. Rule based Metric

RUNNINGMAP의 pagespeed 3회 테스트 결과 평균은 41점입니다. 
경쟁사 사이트인 서울교통공사는 27점, 네이버지도는 56점, 카카오지도는 75점으로 측정됩니다.

서울교통공사는 테스트 대상이 되는 페이지가 다른 것들과 사뭇 달라 목표 점수값 계산에서 제외했습니다. 
  
테스트 결과 RUNNINGMAP은 현재 성능 개선이 필요한 상태이고, 
목표 점수값은 경쟁사 사이트인 네이버지도, 카카오지도의 테스트 결과 평균인 65점입니다. 

cf) 경쟁사 사이트 테스트 페이지

네이버지도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000

카카오지도 : https://m.map.kakao.com/actions/routeView
```


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

타겟으로 삼은 페이지는 위에서도 언급했지만,경로 검색 페이지입니다.
pagespeed의 진단을 유념하여 하나하나 조치할 생각입니다.
성능 개선은 목표 점수값이 65점이 될 때까지 시도할 것입니다. 



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

1) 대상 시스템 범위
   Prox Server(nginx), WAS(Tomcat), DB(MySQL)

2)
- 목푯값 설정 (latency, throughput, 부하 유지기간)
   (1) latency
    100ms

   (2) throughput (1일 평균 rps~ 1일 최대 rps) : 1.04 ~ 3.12
   - DAU(1일 사용자 수) :  3 만명 (산정근거 : 1일 평균 rps를 1로 맞추기 위해 DAU를 3만으로 잡음) 
   - 피크 시간대의 집중률을 예상 (최대 트개픽 / 평소 트래픽) : 3배로 가정하였음.
   - 1명당 1일 평균 접속 혹은 요청수를 예상 : 3으로 가정
   - Throughput(1일 평균 rps ~ 1일 최대 rps): 1.04 ~ 3.12 rps
     1일 총 접속 수: 90,000
     30000(DAU) * 3 (인당 평균 접속 수) = 90,000
     1일 평균 rps: 1.04 rps
     90,000(1일 총 접속 수) / 86400(초/일) = 1.04 rps
     1일 최대 rps: 3.12 rps
     1.04(1일 평균 rps) * 3(최대 트래픽/최소 트래픽) = 3.12 rps

   (3) 부하 테스트 시 저장될 데이터 건수 및 크기 
    - 저장되는 데이터 없음.

- VUser

    T = (R * http_req_duration)
    VUser = (목표 rps * T) / R

R = 2
T = (2 * 0.5) + 1 = 2s

평균 RPS VUser: 
VU = (1.04 * 2) / 2 = 1.5

최대 RPS Vuser: 13
VU = (3.12 * 2) / 2 = 2.5

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
./k6/scripts
./k6/results
에 있습니다~~!

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
