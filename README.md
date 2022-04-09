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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
 > 경쟁사 중 하나인 카카오맵의 측정 지표와 최대한 동일하게 하려 합니다.

* 카카오맵 (Mobile-4G BASE)
  
| First Byte | Start Render | FCP | Speed Index | LCP | CLS | TBT | Total Bytes | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1.858S | 3.428S | 3.273S | 6.922S | 9.070S | .004 | .377S | 1,400KB | 70점 |

* Running Map (Mobile-4G BASE)

| First Byte | Start Render | FCP | Speed Index | LCP | CLS | TBT | Total Bytes | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| 1.671S | 9.200S | 9.171S | 9.241S | 9.460S | .058 | ≥.000S | 2,462KB | 31점 |

* 카카오맵 (PC)
  
| First Byte | Start Render | FCP | Speed Index | LCP | CLS | TBT | Total Bytes | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1.184S | 2.100S | 1.991S | 5.889S | 2.691S | .019 | ≥.932S | 3,641KB | 66점 |

* Running Map (PC)

| First Byte | Start Render | FCP | Speed Index | LCP | CLS | TBT | Total Bytes | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| 1.125S | 6.300S | 6.216S | 6.312S | 6.435S | .004 | ≥.000S | 2,493KB | 68점 |


<h5>참고. 지표 용어 설명</h4>
---
| 축어 | 용어 | 설명 |
| --- | --- | --- |
| FCP | First Contentful Paint | 화면에 텍스트나 이미지가 출력되기 시작하는 시점 |
| LCP | Largest Contentful Paint | 가장 큰 콘텐츠가 렌더링이 완료되는 시점 |
| CLS | Cumulative Layout Shift | 페이지의 전체 수명 동안 발생하는 모든 예기치 않은 레이아웃 이동이 발생한 것에 대한 사용자 경험 측정 항목 |
| TBT | Total Blocking Time | FCP와 TTI 사이 총 시간 |
| TTI | Time to Interactive | 페이지가 로드되기 시작한 시점부터 주요 하위 리소스가 로드되고 사용자 입력에 신속하게 안정적으로 응답할 수 있는 시점까지의 시간 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
> 기사에 따르면 출퇴근 시간에 모바일로 이용하는 사람이 많으므로
> 모바일 환경에 대해 최대한 최적화하려 합니다.
> PageSpeed Insights Test 결과에 따라 아래 내용을 개선하려 합니다.
> 1. 텍스트 리소스 압축(gzip, deflate, brotli)
> 2. 사용하지 않는 자바스크립트 줄이기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- Throughput : 1일 평균 rps ~ 1일 최대 rps
    - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1,500,000 (2016년 기사 기준)
    - 1일 평균 rps : 69 = 1,500,000 * 4(=출/+퇴근 + 기다림) / 86,400(초/일)
    - 1일 최대 rps : 700
- 내부망에서 테스트할 경우 예상 Latency : 1s

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   
   | 테스트 단위 | 테스트 스크립트 | 결과 |
   | --- | --- | --- |
   | Smoke | .\k6\script\smoke.js | .\k6\images\smoke_result.png |
   | Load | .\k6\script\load.js | .\k6\images\load_result.png |
   | Stress | .\k6\script\stress.js | .\k6\images\stress_result_1.png, stress_result_2.png |
 * smoke.js
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://hk0305.n-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';

export default function() {
    function login() {
        var payload = JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
        });

        var params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

        check(loginRes, {
            'logged in successfully': (resp) => resp.json('accessToken') !== '',
        });


        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
        check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
        sleep(1);

        return authHeaders;
    };

    function accessStationPage(authHeaders) {
        let stationPageObjects = http.get(`${BASE_URL}/station`, authHeaders).json();
        check(stationPageObjects, { 'access Station Page': (obj) => obj.id != 0 });
        sleep(0.5);
    }

    const authHeaders = login();
    accessStationPage(authHeaders);
}

```

* load.js
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
    ],
    thresholds: {
        http_req_duration: ["p(99)<100"], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://hk0305.n-e.kr/';

export default function() {
    let stationPageObjects = http.get(`${BASE_URL}/station`);
    check(stationPageObjects, { 'access Station Page': (obj) => obj.id != 0 });
    sleep(1);
}


```

* stress.js
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
    ],
    thresholds: {
        http_req_duration: ["p(99)<100"], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://hk0305.n-e.kr/';

export default function() {
    let stationPageObjects = http.get(`${BASE_URL}/station`);
    check(stationPageObjects, { 'access Station Page': (obj) => obj.id != 0 });
    sleep(1);
}

```

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)
   - k6\image\after_notScaleOut\
    - smoke_notScaleOut.png
    - load_notScaleOut.png
    - stress_notScaleOut.png

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
    - Redis를 사용한 Cache를 적용하였습니다.
    - Revers Proxy를 사용하여 gzip 압축을 활성화하여 화면 응답속도를 개선하였습니다.
    - Scale Out을 진행하였지만 적용이 잘 되지 않았습니다.

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
