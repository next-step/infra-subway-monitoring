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

#### Desktop

|  | FCP | LCP | Speed Index | TTI | TBT | CLS | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 서울교통공사 | 1.5s | 3.7s | 3.3s | 2.0s | 130ms | 0 | 65 |
| 네이버지도 | 0.5s | 1.6s | 2.2s | 0.5s | 0ms | 0.006 | 89 |
| 카카오맵 | 0.5s | 1.3s | 2.2s | 0.7s | 0ms | 0.039 | 92 |
| 인프라 공방 | 2.6s | 2.7s | 2.6s | 2.7s | 50ms | 0.004 | 68 |

#### Mobile

|  | FCP | LCP | Speed Index | TTI | TBT | CLS | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 서울교통공사 | 6.5s | 6.9s | 10.4s | 8.5s | 220ms | 0 | 48 |
| 네이버지도 | 2.1s | 7.8s | 5.4s | 6.2s | 290ms | 0.03 | 59 |
| 카카오맵 | 1.7s | 4.7s | 6.4s | 4.1s | 40ms | 0.005 | 75 |
| 인프라 공방 | 14.8s | 15.3s | 14.8s | 15.4s | 510ms | 0.042 | 33 |

#### 우선순위

- 사용자 경험을 위해 컨텐츠가 빠르게 노출되고 렌더링 되는 것
    - FCP(페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간)를 단축해야 합니다.
- 출/퇴근 시간 시간이 촉박한 사용자가 빠르게 사용할 수 있도록 하는 것
    - TTI(자바스크립트 초기 실행이 완료되고, 사용자가 인터랙션할 수 있는 시점)을 단축해야 합니다.

#### 웹 성능 예산

- **Quantity based Metric**
    - 이미지 최대 크기: 경쟁사와 비교하여 이미지 최대 전송량을 235KB로 설정
        - 경쟁사 Total image weight: 서울교통공사 - 95.9KB, 네이버지도 - 147.4KB, 카카오맵 - 234.2KB
    - HTML, CSS 최대 크기: 경쟁사와 비교하여 HTML, CSS 최대 크기를 각각 5KB, 52KB로 설정 (경쟁사 중 서울교통공사와 나머지 두 곳의 차이가 커서 서울교통공사를 제외한 나머지 두 곳중 더
      큰 용량을 기준으로 설정했습니다.)
        - 경쟁사 HTML 크기: 서울교통공사 - 123.8KB, 네이버지도 - 4.9KB, 카카오맵 - 4.0KB
        - 경쟁사 CSS 크기: 서울교통공사 - 136.8KB, 네이버지도 - 52KB, 카카오맵 - 34.8KB


- **Timing based Metric**
    - FCP:
        - Desktop - 0.6s, Mobile - 2.04s
        - 경쟁사 중 가장 빠른 FCP를 기준으로 20% 미만으로 차이가 나도록 설정
    - TTI:
        - Desktop - 0.6, Mobile - 4.92s
        - 경쟁사 중 가장 빠른 TTI를 기준으로 20% 미만으로 차이가 나도록 설정


- **Rule based Metric**
    - 성능: Desktop - 77, Mobile - 63
        - 경쟁사 중 가장 높은 성능 점수를 기준으로 20% 미만으로 차이가 나도록 설정


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- gzip 압축을 통해 각 리소스의 전송 인코딩을 최적화

  <img width="920" alt="스크린샷 2022-07-01 오전 9 26 42" src="https://user-images.githubusercontent.com/49121847/176803588-82ed36f6-bd56-4cbe-a9ef-2a1a5e474665.png">

- 효율적인 캐시 정책으로 정적 자산 제공

  <img width="775" alt="스크린샷 2022-07-01 오전 9 28 25" src="https://user-images.githubusercontent.com/49121847/176803641-c03a7880-c2d4-4440-becc-d7a10c3df700.png">
- JS 축소 및 실행 시간 단축 (JS파일의 크기를 보면 다른 경쟁사에 비해 큰 것을 알 수 있습니다.)

  <img width="1064" alt="스크린샷 2022-07-01 오전 10 19 14" src="https://user-images.githubusercontent.com/49121847/176803753-e3213ef0-7d55-4a97-bffd-451448c5422a.png">
- 요청 수를 낮게 유지하고 전송 크기를 작게 유지 (스크립트 병합)
- CDN 사용하기

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 대상 시스템 범위
    - 예상 시나리오: 출, 퇴근 시간에 로그인 후 즐겨찾기에 저장한 출/퇴근 경로 조회 ⇒ 따라서 로그인, 즐겨찾기 조회를 하나의 시나리오로 하여 성능 테스트
- 목푯값 설정 (latency, throughput, 부하 유지기간)부하 테스트 시 저장될 데이터 건수 및 크기
    - 목표 rps 구하기
        - [https://www.bigdata-map.kr/datastory/traffic/seoul](https://www.bigdata-map.kr/datastory/traffic/seoul)
        - DAU : 9,000,000 ⇒ 1일 총 접속 수 (로그인, 즐겨찾기) : 18,000,000
        - 1일 평균 rps : 18,000,000 / 72,000 = 250 (1시 ~ 05시는 운행을 안하므로)
            - 차이 : 시간별 최대 승하차 인원 / 평균 승하차 인원 = 1,000,000 / 450,000 = 2.2배
        - 1일 최대 rps: 250 * 2.2 = 550
    - VUser 구하기
        - 총 응답 시간 목표값: 경쟁사의 First Byte Time과 20%이상 차이나지 않도록 설정: 190ms * 1.2 = 230ms
        - T = 2 * 0.23 = 0.46s (외부 망에서 테스트하므로 추가적인 지연시간을 더하지 않았습니다.)
        - 평균 VUser = (250 * 0.46s) / 2 = 58
        - 최대 VUser = (550 * 0.46s) / 2 = 127
    - 부하 유지 기간
        - smoke: 10초
        - load: 40분
        - stress: 40분
    - 저장될 데이터 건수 및 크기
        - 원래라면 운영환경과 동일한 환경을 만들고 테스트 해야하지만 부하테스트 학습을 하는 것이 목표이므로 운영 환경(운영 DB)를 그대로 사용

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- smoke.js
    ```bash
    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    export let options = {
        vus: 1,
        duration: '10s',
    
        thresholds: {
            http_req_duration: ['p(99)<230'],
        },
    };
    
    const BASE_URL = 'https://chkim-infra-workshop.kro.kr/';
    const USERNAME = 'test@test.com';
    const PASSWORD = 'test';
    
    export default function ()  {
        let loginRes = login();
        favorite(loginRes);
        sleep(1);
    };
    
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
    
        return loginRes;
    }
    
    function favorite(loginRes) {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        let myObjects = http.get(`${BASE_URL}/favorites`, authHeaders).json();
        check(myObjects, { 'search favorite lines successfully': (obj) => obj !== null });
    }
    ```
  <img width="707" alt="smoke" src="https://user-images.githubusercontent.com/49121847/177321742-58dfb4d2-f2f1-43ae-845e-3381c5d0177c.png">
  <img width="1726" alt="smoke-grafana" src="https://user-images.githubusercontent.com/49121847/177321740-c6d6cf65-b2aa-4fc7-9db2-65aa8a6265ae.png">

- load.js

    ```bash
    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    const aveTraffic = 58;
    const maxTraffic = 127;
    
    export let options = {
        stages: [
            { duration: '10m', target: aveTraffic },
            { duration: '20m', target: maxTraffic },
            { duration: '10m', target: aveTraffic },
        ],
        thresholds: {
            http_req_duration: ['p(99)<230'],
        },
    };
    
    const BASE_URL = 'https://chkim-infra-workshop.kro.kr/';
    const USERNAME = 'test@test.com';
    const PASSWORD = 'test';
    
    export default function ()  {
        let loginRes = login();
        favorite(loginRes);
        sleep(1);
    };
    
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
    
        return loginRes;
    }
    
    function favorite(loginRes) {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        let myObjects = http.get(`${BASE_URL}/favorites`, authHeaders).json();
        check(myObjects, { 'search favorite lines successfully': (obj) => obj !== null });
    }
    ```
    <img width="693" alt="load" src="https://user-images.githubusercontent.com/49121847/177321738-88ad0325-bb41-44a1-a196-1d5b82dfd133.png">
    <img width="1724" alt="load-grafana" src="https://user-images.githubusercontent.com/49121847/177321728-2a784331-3761-4b11-b8fc-bcce358a8250.png">

- stress.js

    ```bash
    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    export let options = {
        stages: [
            { duration: '5m', target: 100 },
            { duration: '5m', target: 200 },
            { duration: '5m', target: 300 },
            { duration: '5m', target: 400 },
            { duration: '5m', target: 500 },
            { duration: '10m', target: 600 },
            { duration: '5m', target: 0 },
        ],
        thresholds: {
            http_req_duration: ['p(99)<230'], // 99% of requests must complete below 1.5s
        },
    };
    
    const BASE_URL = 'https://chkim-infra-workshop.kro.kr/';
    const USERNAME = 'test@test.com';
    const PASSWORD = 'test';
    
    export default function ()  {
        let loginRes = login();
        favorite(loginRes);
        sleep(1);
    };
    
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
    
        return loginRes;
    }
    
    function favorite(loginRes) {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        let myObjects = http.get(`${BASE_URL}/favorites`, authHeaders).json();
        check(myObjects, { 'search favorite lines successfully': (obj) => obj !== null });
    }
    ```
    <img width="718" alt="stress" src="https://user-images.githubusercontent.com/49121847/177321732-9c4af764-7fb0-44bd-91b9-f71895cb326f.png">
    <img width="1719" alt="stress-grafana" src="https://user-images.githubusercontent.com/49121847/177321720-2c7cd456-9eb7-434d-a9b5-24414d8651b3.png">
---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요
- /home/ubuntu/nextstep/infra-subway-monitoring/log/file.log
- /home/ubuntu/nextstep/infra-subway-monitoring/log/json.log
- /var/log/nginx/access.log
- /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=ch0213-dashboard
