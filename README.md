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

- 타 경쟁사의 20% (최대치) ~ 타 경쟁사와 비슷 (최소)

a. 경쟁사 분석: 서울교통공사 분석

|                        | First Contentful Pain(FCP) | Speed Index | Largest Contentful Paint(3.5) | Time to Interactive | Total Blocking Time | Cumulative Layout Shift |
| :--------------------: | :------------------------: | :---------: | :---------------------------: | :-----------------: | :-----------------: | :---------------------: |
| 서울 교통공사 데스트톱 |            1.6s            |    2.4s     |             3.5s              |        2.0s         |        150ms        |          0.013          |
|  서울 교통공사 모바일  |            6.4s            |    8.1s     |             6.8s              |        8.6s         |        790ms        |            0            |
|   네이버 지도 모바일   |            2.0s            |    5.9s     |             7.8s              |        6.4s         |        270ms        |          0.03           |
|  네이버 지도 데스크톱  |            0.5s            |    2.0s     |             1.5s              |        0.5s         |         0ms         |          0.006          |
|    카카오 맵 모바일    |            1.7s            |    6.1s     |             6.4s              |        4.2s         |        100ms        |          0.005          |
|   카카오 맵 데스크톱   |            0.5s            |    2.2s     |             1.1s              |        1.0s         |         0ms         |          0.039          |
|    내 서비스 모바일    |           16.2s            |    16.2s    |             16.3s             |        23.8s        |       6960ms        |            0            |
|   내 서비스 데스크톱   |            3.1s            |    3.1s     |             3.1s              |        5.6s         |       2380ms        |            0            |

++ 지하철 노선도 서비스 Lighthouse 

Desktop 59점





2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- FCP를 3초 미만으로 줄인다
  - 이미지, 텍스트 압축 진행하기 -> FCP 줄이기
- 데스크톱 TBT, TTI 1초 미만으로 줄일기 , 모바일 TTI 5초 미만으로 줄ㅇ리기
  - DOM 크기 줄이기 
  - js 최적화 
  - 참고 자료 : https://web.dev/mainthread-work-breakdown/?utm_source=lighthouse&utm_medium=lr
- 캐싱 정책 활용하기
- Light House 80점 이상



3. 부하테스트 전제조건은 어느정도로 설정하셨나요

경쟁사: 카카오지하철

일 평균 접속 수 = 3

1일 평균 접속자수(DAU) =  3,000,000 명

1일 총 접속자 수 = 9,000,000 명

예상 latency = 0.1s

1일 평균 rps = 104 rps

1일 최대 rps =  150rps

R(시나리오 요청) =4, 예상 latency = 0.1s  T = 6.1

VUser = (125rps * 6.1) / 4 =  188

최대 VUser = 223



4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요



- smoke test

smoke.js

```javascript
import http from 'k6/http';

export let options = {
    stages: [
        { duration: '1m', target: 1 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
        http_req_failed: ['rate<0.01'],
    },
};

const BASE_URL = 'https://gracegoose.kro.kr';

export default function ()  {

    // 메인페이지 접근
    http.get(`${BASE_URL}`);

    //경로 검색 페이지 접근
    http.get(`${BASE_URL}/path`);

    //등록된 역정보 조회
    http.get(`${BASE_URL}/stations`)

    //최단 경로 조회
    http.get(`${BASE_URL}/paths?source=1&target=2`);

};

```



<img src="https://raw.githubusercontent.com/ChoiEungi/git-blog-image/upload/2022-03-30-23%3A33%3A13.png">



- load test

load.js

```javascript
import http from 'k6/http';

export let options = {
    stages: [
        { duration: '5m', target: 50 },
        { duration: '5m', target: 100 },
        { duration: '5m', target: 150 },
        { duration: '5m', target: 188 },
        { duration: '5m', target: 188 },
        { duration: '5m', target: 150 },
        { duration: '5m', target: 100 },
        { duration: '5m', target: 50 },
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
        http_req_failed: ['rate<0.01'],
    },
};

const BASE_URL = 'https://gracegoose.kro.kr';

export default function ()  {

    // 메인페이지 접근
    http.get(`${BASE_URL}`);

    //경로 검색 페이지 접근
    http.get(`${BASE_URL}/path`);

    //등록된 역정보 조회
    http.get(`${BASE_URL}/stations`)

    //최단 경로 조회
    http.get(`${BASE_URL}/paths?source=1&target=2`);

};
```



<img src="https://raw.githubusercontent.com/ChoiEungi/git-blog-image/upload/2022-04-10-16%3A01%3A38.png">







### Stress Test

```javascript
import http from 'k6/http';

export let options = {
    stages: [
        { duration: '5m', target: 50 },
        { duration: '5m', target: 100 },
        { duration: '5m', target: 150 },
        { duration: '5m', target: 188 },
        { duration: '5m', target: 223 },
        { duration: '5m', target: 200 },
        { duration: '5m', target: 188 },
        { duration: '5m', target: 50 },
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
        http_req_failed: ['rate<0.01'],
    },
};

const BASE_URL = 'https://gracegoose.kro.kr';

export default function ()  {

    // 메인페이지 접근
    http.get(`${BASE_URL}`);

    //경로 검색 페이지 접근
    http.get(`${BASE_URL}/path`);

    //등록된 역정보 조회
    http.get(`${BASE_URL}/stations`)

    //최단 경로 조회
    http.get(`${BASE_URL}/paths?source=1&target=2`);

};

```



<img src="https://raw.githubusercontent.com/ChoiEungi/git-blog-image/upload/2022-04-10-23%3A32%3A50.png">



---

### 2단계 - 화면 응답 개선하기
1. ## 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
