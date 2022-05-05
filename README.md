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

   * Infra-Subway/stations 데스크톱 기준

   | 사이트          | FCP  |  TTI  |  SI  |  TBT  |   LCP  |   CLS   |   Score  |
   |----------------|------|------|------|--------|--------| ------- |  :-----: |
   | Infra-Subway   | 2.9s | 4.7s | 2.9s | 1560ms |  2.9s  |   0.0   |    30    |
   | 서울교통공사     | 1.6s | 2.0s | 3.6s |  140ms |  3.6s  |  0.013  |    64    |
   | 네이버맵        | 0.5s | 0.7s | 2.1s |   0ms  |  1.6s  |  0.006  |    90    |
   | 카카오맵        | 1.7s | 4.3s | 7.7s |  90ms  |  5.0s  |  0.005  |    71    |
   | 목표치          | 1.5s | 2.7s | 4.0s |  90ms  |  3.0s  |  0.005  |    80    |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

WebpageTest, PageSpeed 로 확인 결과 전체적으로 타사 제품보다 성능이 떨어짐.

![성능 테스트](infra-webpagetest-stations.png)

확인 결과, js, css, font 가 지연의 원인으로 보임

```
    * 텍스트 압축(gzip, deflate, brotli 등)을 사용
    * 사용하지 않는 자바스크립트 줄이기
        - /js/vendors.js
        - /js/main.js
```

---

### 2단계 - 부하 테스트
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

`` 목푯값 설정 ``
* 예상 1일 사용자 수(DAU) : 1,000,000명(1백만명)
   - 지하철 종결자(약 197만명), 카카오지하철(약 164만명)
   - 비주류 프로그램이라 생각하여 그보다 약간 적은 수치로 잡았습니다.

* 피크 시간대 집중률 예상 (최대 트래픽 / 평소 트래픽) : 5.4

* 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다 : 3회
   - 카카오지하철 평균 실행(3회)

`` Throughput 1일 평균 rps ~ 1일 최대 rps ``

ㅁ 1일 평균 rps <br>
1,000,000 * 3 / 86,400 = 약 34.7

ㅁ 1일 최대 rps <br>
34.7 * 5.4 = 187.38

`` Latency : 일반적으로 50 ~ 100ms 이하 ``

ㅁ 100ms

```
T = (R * http_req_duration) (+ 1s)
VUser = (목표 rps * T) / R

R = 2
T = 2 * 0.4 + 1 = 1.8
VU = 100 * 1.8 / 2 = 90
```

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

``로그인``

처음에 크게 잡아 실패를 하고 조금씩 수치를 낮추면서 빨간색이 안 뜰때까지 반복해보았습니다.

* [smoke.js](/k6/smoke.js)

![smoke](./k6/smoke.png)

---

* [load.js](/k6/load.js)

![load](./k6/load.png)

---

* [stress.js](/k6/stress.js)

![stress](./k6/stress.png)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
