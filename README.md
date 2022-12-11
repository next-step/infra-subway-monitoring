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

### 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

지하철 노선도 서비스는 어느정도의 웹 성능 예산이 필요한지 검토하기 위해 현재 개발중인 우테켐 지하철 노선도 앱과
이미 실제로 서비스 중인 경쟁 서비스에 대한 웹 성능예산 사전조사를 수행하였습니다.

현재는 데스크탑을 기준으로 미션을 수행하고 있기에, 성능예산 측정 타겟을 데스크탑으로 한정하였습니다

성능예산 측정 툴은 google에서 제공하는 [LightHouse](https://developer.chrome.com/docs/lighthouse/overview/)를 사용하였고, 측정 대상은 가장 중요하고,
리소스가 많은 `지하철 노선도 메인 화면` 을 기준으로 잡았습니다

먼저 측정 된 지하철 노선도 앱의 성능 예산은 다음과 같습니다

`우테켐 지하철 노선도 앱`

| 화면 기능        | FCP(s) | TTI(s) | Speed Index(s) | LCP(s) | TBT(ms) |  CLS  | 성능 점수 |
|:-------------|:------:|:------:|:--------------:|:------:|:-------:|:-----:|:-----:|
| 메인 페이지       |  2.7   |  2.8   |      2.7       |  2.8   |   50    | 0.004 |  67   |
| 노선 조회        |  2.9   |  3.5   |      2.9       |  3.0   |   340   | 0.116 |  47   |


다음으로 측정 된 `경쟁사 앱 메인페이지` 성능 예산입니다

|경쟁사이름| FCP(s) | TTI(s) | Speed Index(s) | LCP(s) | TBT(ms) |CLS|성능 점수|
|:---|:------:|:------:|:--------------:|:------:|:-------:|:---:|:---:|
|서울교통공사 지하철 노선도|  1.5  |  2.0   |      2.1      |  3.7  |  50   |0|71|
|네이버지도 지하철 노선도|  0.5  |  1.2  |      2.3      |  1.5  |  10   |0.006|90|
|카카오맵 지하철 노선도|  6.1  |  8.7  |      8.7      |  8.3  |  170  |0.135|46|

Akamai 조사 결과에 따르면 웹 페이지 로딩 시(앞으로 웹 페이지 로딩 완료를 TTI 기준으로 하겠습니다)

1s 지연 시 18.4%의 고객 이탈률을 보이고,

2s 지연 시 62.1%의 고객 이탈률을 보인다고 합니다

따라서 우리 앱을 사용하는 고객의 이탈률을 막으려면 최소 응답시간은 2s 이내여야 하고

다른 서비스로부터 고객을 유입시키려면 TTI 수치가 가장 낮은 네이버지도 지하철 노선도 보다 작은 즉 1.2s 이하를 유지해야 합니다

위 내용을 종합해 볼 때 적당한 웹 성능 예산은 다음과 같습니다 (대부분의 값은 최고 성능인 네이버 지도 와 현재 앱 간의 중간 값)

* `적당한 성능예산`
    * **FCP** : 1s
    * **TTI** : 1.2s
    * **Speed Index** : 2.0s
    * **LCP** : 1.5s
    * **TBT** : 30ms
    * **CLS** : 0.002
    * **성능점수** : 80점 이상

### 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

지하철 노선도를 이용하는 고객은 대부분 (출발역 -> 도착역 검색)이라는 단순한 목적으로 접근하기에 `FCP 수치가 낮아야하고`, `TTI 수치 또한 낮아야합니다`

위 내용을 기반으로 작성한 성능 목표는 다음과 같습니다.

* `FCP 수치는 1s 이내여야 한다`
* `LCP, TTI 수치는 1.5s 이내여야 한다`
    * `피크 타임`에도 `2s 이내를 유지`해야 한다
* `light house 성능 점수`는 `80점 이상`이어야 한다

현재 앱의 frontend javascript 코드를 텍스트 기반 리소스 압축하여 총 네트워크 바이트를 최소화한다면

`약 1.4s 정도의 FCP 절감 효과`를 기대할 수 있고,

추가로 vendor.js, main.js 내부에 포함되어 있는 사용하지 않는 자바 스크립트를 줄이면 약 `0.5s 의 LCP 절감 효과`를 얻을 수 있을 것으로 예상됩니다.

위 내용을 종합해볼 때,

현재 2.7s 인 `FCP 수치`를 `60% 개선 된 수준인 1s 까지 낮추고`

`TTI 수치` 또한 2.8s -> 1.5s으로 `50% 정도 개선 된 수준을 목표`로 잡으면

`lightHouse 성능 점수` 또한 결과적으로 `80점 근처에 도달`할 수 있을 것으로 예상되어

서비스 이용 **고객의 이탈을 방지**하고

**신규 고객의 유입을 기대**할 수 있을 것으로 추정됩니다


---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
