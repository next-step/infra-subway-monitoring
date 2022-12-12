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

# 1단계 - 웹 성능 테스트

## 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

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

# 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

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

# 2단계 - 부하 테스트

## 부하테스트 전제조건은 어느정도로 설정하셨나요

먼저 지하철 경로 탐색 관련 경쟁사의 특징을 정리했습니다

|경쟁사이름|                    특징                    |
|:---|:----------------------------------------:|
|네이버지도|                1392만 이용자                 |
|티맵|                1020만 이용자                 |
|카카오 지하철| 150만 MAU, 일 평균 3회 실행, 하루 요청 트래픽 : 약 450만 |

(위 서비스의 특징은 지하철 서비스에 국한되지 않은 자료이므로 참고 자료 정도로만 생각해 주시면 될 것 같습니다)


지하철 노선도 앱에 접근하는 유저는 보통 가고자 하는 경로를 `일회성으로 조회`하고 끝내는 경우가 대부분이라고 생각합니다

따라서 테스트 단위를 per request 보다 `per user` 로 테스트 시나리오를 구성하였습니다

결과적으로 per user 단위의 테스트 시나리오 구성을 위해 `user에 대한 전제조건 설정`이 필요한데,

전제조건 설정을 위해 서치스(주) 에서 제공하는 [데이터로 보는 서울시 대중교통 이용](https://www.bigdata-map.kr/datastory/traffic/seoul) 테이터셋을 기준으로 정리하였습니다

위 문서에 따르면

`하루 평균 지하철 승/하차 인원`은 약 `1500만 명 정도`이고
`팬데믹 기간 하루 평균 지하철 승/하차 인원`은 약 `900만 명 정도`입니다.

(현재는 팬데믹 기간 : 약 900만 명의 Active User가 있다고 전제,
팬데믹이 종료된 이후 Active User가 다시 1500만 명으로 증가하는 시점은 웹 성능예산의 수직적/수평적 확장이 필요할 수도 있다 정도로 코멘트 한 후 넘어가도록 하겠습니다)

먼저 정리한 특이점이 존재하는 전체 시간대 별 평균 지하철 승/하차 인원은 다음과 같습니다

| 시간대 (전체인원)          | 승/하차 인원 (명) |
|:--------------------|:--------------:|
| 출근시간 (07시 ~ 10시)    |   2,250,000    |
| 퇴근시간 (17시 ~ 20시)    |   2,250,000    |
| 출근 피크시간 (08시 ~ 09시) |   1,000,000    |
| 퇴근 피크시간 (18시 ~ 19시) |   1,000,000    |

출/퇴근 시간에 지하철 노선 앱을 이용하는 유저 중 약 50% 정도가 `우테켐 지하철 노선도 앱`을 이용한다고 가정하면 우리 쪽에서 `카운트 가능한 Active User`는 다음과 같습니다

| 시간대 (우테켐 지하철 노선도 앱 이용) | 전체 승/하차 인원 (명) |
|:-----------------------|:--------------:|
| 출근시간 (07시 ~ 10시)       |   1,125,000    |
| 퇴근시간 (17시 ~ 20시)       |   1,125,000    |
| 출근 피크시간 (08시 ~ 09시)    |    500,000     |
| 퇴근 피크시간 (18시 ~ 19시)    |    500,000     |

도출된 우테켐 지하철 노선도 앱 이용 User 데이터를 기준 으로

`하루 평균 트래픽` 및 `피크 타임 트래픽`을 계산 하면 다음과 같습니다

| 트래픽 종류        | RPS (User 단위) |
|:--------------|:-------------:|
| 하루 평균 트래픽     |      129      |
| 출/퇴근 피크시간 트래픽 |      141      |

위에서 도출 된 트래픽 데이터를 보면 하루에 트래픽이 가장 많은 시간 즉, `피크 타임에는 초당 141명의 VU 트래픽이 발생할 것`입니다

하지만 초당 평균을 가정 해도 `피크 타임 내`에서의 `특정 시간대에 유저가 몰릴 수 있는 상황`을 고려 해야 합니다

따라서, 피크 타임 테스트의 VU는 141명에 약 `30%를 가산`한 값인 `185명의 VU` 유입을 받을 수 있도록 테스트를 진행 해야 합니다

현재 하루 평균 트래픽 RPS는 출/퇴근 피크 시간 트래픽 테스트 내에서 유추 가능한 범위에 있기에

피크 테스트에서 의미 있는 결과를 도출 하여, 하루 평균 트래픽 대응에 적용 하는 방향 으로 진행 하는 것이 좋을 것 같습니다

## Smoke, Load, Stress 테스트 스크립트와 결과를 공유 해주세요

테스트 시나리오는 총 2가지를 준비 했습니다

```
1. 접속 빈도가 높은 페이지 : 메인 페이지
2. 데이터를 조회하는 데 여러 데이터를 참조하는 페이지 : 경로 조회 페이지
```

`(1) 메인 페이지`는 우리 서비스를 처음 만나는 페이지 이기도 하고, 다른 서비스에 비해 WAS, DB 리소스 이용률이 적어 Network(TCP) 리소스 부하 테스트에 용이 하겠다 싶어 채택 하였습니다

`(2) 경로 조회 페이지`는 `(1)번` Network 리소스 테스트 진행 이후에 실질적으로 Application, DB 리소스를 많이 사용 하는 api로, 응답 시간 도출 및 피드백을 위해 채택 하였습니다

`(2)` 테스트에 사용한 데이터는 13개의 지하철 역이 포함된 경로를 기준 으로 테스트를 진행 하였습니다

다음으로 `테스트 대상 시스템 범위`는 `WEB`, `WAS(+DB)` 두 가지 범위로 채택 하였습니다

smoke, load, stress 테스트의 목표 값은 다음과 같습니다

| 부하 테스트 종류          | VU (명) | 부하 유지기간 (s) | ramp-up 기간 (s) | ramp-down 기간(s) | threshold (ms) |
|:-------------------|:------:|:-----------:|:--------------:|:---------------:|:--------------:|
| smoke              |   2    |     30      |       5        |        5        |      1000      |
| load               |  185   |     30      |       5        |        5        |      1000      |
| stress             |  275   |     30      |       5        |        5        |      1000      |

### 테스트 스크립트

<details>
<summary>메인 페이지 - smoke</summary>

```
import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1000'],
  },
  stages: [
    {duration: '1s', target: 2},
    {duration: '30s', target: 2},
    {duration: '1s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr/';

export default function() {

  const mainRes = http.get(`${BASE_URL}`);

  check(mainRes, {
    'is success': (r) => r.status === 200,
  });
}

```

</details>

<details>
<summary>메인 페이지 - load</summary>

```
import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1000'],
  },
  stages: [
    {duration: '5s', target: 185},
    {duration: '30s', target: 185},
    {duration: '5s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr/';

export default function() {

  const mainRes = http.get(`${BASE_URL}`);

  check(mainRes, {
    'is success': (r) => r.status === 200,
  });
}

```

</details>

<details>
<summary>메인 페이지 - stress</summary>

```
import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1000'],
  },
  stages: [
    {duration: '5s', target: 185},
    {duration: '30s', target: 185},
    {duration: '5s', target: 230},
    {duration: '30s', target: 230},
    {duration: '5s', target: 275},
    {duration: '30s', target: 275},
    {duration: '5s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr/';

export default function() {

  const mainRes = http.get(`${BASE_URL}`);

  check(mainRes, {
    'is success': (r) => r.status === 200,
  });

  check(mainRes, {
    'is failed': (r) => r.status !== 200,
  });
} 

```

</details>

<details>
<summary>경로 조회 페이지 - smoke</summary>

``` 
import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1500'],
  },
  stages: [
    {duration: '1s', target: 2},
    {duration: '1m', target: 2},
    {duration: '1s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr';
const SOURCE_STATION_ID = '1';
const TARGET_STATION_ID = '16';

export default function() {

  let pathRes = http.get(
      `${BASE_URL}/paths?source=${SOURCE_STATION_ID}&target=${TARGET_STATION_ID}`);

  check(pathRes, {
    'is success': (r) => r.status === 200,
  });
}

```

</details>

<details>
<summary>경로 조회 페이지 - load</summary>

```
import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1000'],
  },
  stages: [
    {duration: '5s', target: 185},
    {duration: '1m', target: 185},
    {duration: '5s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr';
const SOURCE_STATION_ID = '1';
const TARGET_STATION_ID = '16';

export default function() {

  let pathRes = http.get(
      `${BASE_URL}/paths?source=${SOURCE_STATION_ID}&target=${TARGET_STATION_ID}`);

  check(pathRes, {
    'is success': (r) => r.status === 200,
  });
}

```

</details>

<details>
<summary>경로 조회 페이지 - stress</summary>

``` 
import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1000'],
  },
  stages: [
    {duration: '5s', target: 185},
    {duration: '30s', target: 185},
    {duration: '5s', target: 225},
    {duration: '30s', target: 225},
    {duration: '5s', target: 250},
    {duration: '30s', target: 250},
    {duration: '5s', target: 275},
    {duration: '30s', target: 275},
    {duration: '5s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr';
const SOURCE_STATION_ID = '1';
const TARGET_STATION_ID = '16';

export default function() {

  let pathRes = http.get(
      `${BASE_URL}/paths?source=${SOURCE_STATION_ID}&target=${TARGET_STATION_ID}`);

  check(pathRes, {
    'is success': (r) => r.status === 200,
  });

  check(pathRes, {
    'is failed': (r) => r.status !== 200,
  });
}

```

</details>

응답 시간에 대한 테스트 결과는 다음과 같습니다.

| 부하 테스트 종류          |        응답 시간 (s)        | WEB - cpu 사용률 (%) | WAS - cpu 사용률 (%) | 에러 발생 시작 VU 수 (명) |
|:-------------------|:-----------------------:|:-----------------:|:-----------------:|:-----------------:|
| 메인 페이지 - smoke     |          0.03           |        0.2        |      8 ~ 12       |       none        |
| 메인 페이지 - load      |          0.15           |        30         | 40 ~ 10 (점점 낮아짐)  |       none        |
| 메인 페이지 - stress    |           0.2           |        30         |      75 ~ 90      |        275        |
| 경로 조회 페이지 - smoke  | 0.1 (요청이 늘어날 수록 꾸준히 증가) |        0.4        |        60         |       none        |
| 경로 조회 페이지 - load   |            7            |        30         |      70 ~ 80      |       none        |
| 경로 조회 페이지 - stress |           12            |        30         |       90 이상       |        250        |

### 테스트를 통해서 얻을 수 있는 결론

테스트를 통해서 얻을 수 있는 결론은 다음과 같습니다

1. **메인 페이지**
    * 전체적으로 `준수한 응답 시간`을 보여주고 있어, 현재 `피크 타임`에도 `무리 없이 대응이 가능`한 상태입니다
    * 메인 페이지에 대한 전체적인 `응답 시간이 일정`한 것으로 보아 `WEB에서 트래픽 핸들링이 가능`하고, `WAS` 쪽 에서는 장애 위험이 `WEB에 비해 적은 편`입니다
    * stress 테스트 중 `장애`가 발생 하기 시작하는 포인트는 `VU가 약 275명` 정도 되었을 때입니다
        * "read: connection reset by peer" - TCP Connection(Network) 레이어에서 발생한 에러로 스트레스 상황에서 수평적 확장으로 에러 상황에 대응할 수 있을
          것으로 보입니다
        * 해당 TCP 에러는 서비스 흐름에 크리티컬한 에러는 아니므로 당장 개선이 필요한 부분은 아니지만, 해당 상황이 발생할 수 있음을 염두에 두어야 할 것 같습니다
2. **경로 탐색 페이지**
    * `서버의 물리적인 리소스를 준수하게 사용`하고 있으나, `응답 시간에 이슈 사항이 존재`합니다
    * `피크타임 기준 7s 이상의 응답 시간`을 보여주는데 이는 `고객이 이탈`하기애 충분한 시간이므로 `즉각적인 개선`이 필요합니다
    * 메인 페이지의 `WAS와 동일한 네트워크 사용률`을 보여주는 것으로 보아, 응답 지연은 더 안쪽 레이어에 있다는 것을 추측할 수 있습니다
    * WEB은 이상 현상이 없지만 `요청이 많아질 수록 응답 시간도 일정하게 증가`하는 것으로 볼 때, `WAS의 Application 로직` 혹은 `DB 쿼리`에 `지연 이슈`가 발생하고 있음을 유추할 수 있습니다
    * stress 테스트 중 `장애`가 발생하기 시작하는 포인트는 `VU가 약 250`명 정도 되었을 때입니다
      * "Request Failed error" 가 발생하기 시작합니다
      * 서비스 흐름에 크리티컬한 에러는 아니지만, 위에서 밝혀진 응답 지연과 연관이 깊은 에러입니다. 응답 지연 이슈를 해결하면 자연스럽게 정상화 되는 에러로 고객의 이탈을 막기 위해선 `즉각적인 대응이 필요`합니다

---

# 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
