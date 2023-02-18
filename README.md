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
- 우리 RUNNINGMAP에서 사용자에게 제공할 수 있는 가장 큰 가치는 빠르게 경로검색 결과를 제공하는 것이라고 생각했습니다.
- 그렇기에 경로검색 페이지를 띄우는 URL인 (https://didrlgus-subway.p-e.kr/path) 를 웹 성능예산 테스트 대상으로 지정하였습니다.
    - 웹 성능예산 테스트 기준 URL
        - RUNNINGMAP (https://didrlgus-subway.p-e.kr/path)
        - 서울교통공사 (http://www.seoulmetro.co.kr/kr/cyberStation.do)
        - 네이버지도 (https://m.map.naver.com/subway/subwayLine.naver?region=1000)
        - 카카오맵 (https://m.map.kakao.com/actions/routeView)
- 경쟁사 웹 성능 비교
    - 웹 성능 비교는 [pagespeed](https://pagespeed.web.dev/) 를 기준으로 수행하였습니다.
    - 해당 서비스는 모바일 환경에서 많이 사용될것으로 예상되어 휴대전화를 기준으로 측정했습니다.

| 측정 지표        | RUNNINGMAP | 서울 교통 공사 | 네이버 지도 | 카카오 맵 |
|--------------|------------|----------|--------|-------|
| FCP          | 16.1s      | 6.8s     | 2.3s   | 1.7s  |
| Speed Index  | 16.1s      | 8.7s     | 6.3s   | 4.3s  |
| LCP          | 16.1s      | 7.7s     | 7.9s   | 5.9s  |
| TTI          | 16.8s      | 9.2s     | 6.8s   | 4.4s  |
| TBT          | 0.12s      | 1.4s     | 0.65s  | 0.05s |
| CLS          | 0.004      | 0        | 0.03   | 0     |

- 목표치 설정
  ```
  1. 사용자는 응답시간이 20% 이상일때 차이를 인식해요.
  2. 3초안에 로딩되지 않으면 53%의 사용자가 떠난다.
  ```
    - 위 지표를 기준으로 목표치를 설정하였습니다.
    - 사용자가 웹브라우저에서 인터렉션 할 수 있는 지점인 TTI (Time To Interacive) 지표로 목표치를 설정하였습니다.
    - 다른 서비스의 TTI 지표는 전부 3초를 넘어지만 1,2번 기준에 근거하여 `TTI 3초`를 목표치로 설정하였습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 경로검색 결과를 제공하는 API를 기준으로 목표 응답시간을 설정하였습니다.
    - ex) https://didrlgus-subway.p-e.kr/paths/?source=2&target=3
- chrome의 perfomance 탭을 이용해 해당 API의 응답시간을 측정하였습니다.
- source와 target 파라미터를 바꾸면서 총 10번의 API 호출을 하였습니다.
    - https://didrlgus-subway.p-e.kr/paths/?source=1&target=3 (363.63ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=278&target=161 (233.79ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=3&target=1 (232.03ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=161&target=278 (230.84ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=50&target=100 (222.26ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=359&target=81 (223.86ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=100&target=50 (202.51ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=81&target=359 (305.08ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=1&target=438 (277.11ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=438&target=1 (275.70ms)
- 위 10번의 API 호출 결과 응답시간을 평균으로 계산하였습니다.
    - `256.681ms`
- 네이버 지도의 경로검색 URL 호출 결과 응답시간 다음과 같습니다.
  - https://m.map.naver.com/subway/subwayPath.naver?region=1000&departureId=1915&arrivalId=161&pathType=1
  - 위 요청을 대상으로 10번의 호출 결과 응답시간을 평균으로 계산하였습니다. (정적 리소스를 응답하는 시간은 제외했습니다.)
    - `201.914ms`
- 네이버지도의 경로검색 응답시간과 비교해서 성능 개선 포인트가 있고 네이버지도 보다 20% 빠른 응답시간을 목표 응답시간으로 설정하였습니다.
  - 목표 응답시간: `161.53ms`

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
  - 경로검색 API를 대상으로 테스트 진행 예정입니다. (WebServer > Application Host > DB)
- 목푯값 설정
  - latency: `161ms`
  - throughput
    - 네이버 지도의 MAU를 기준으로 처리량을 계산하였습니다.
      - MAU: 1,392만, DAU: 464,000, 1일 총접수: 2,320,000
        - 1명당 1일 평균 접속 수는 2로 가정
      - 1일 평균 rps: `53.7rps`, 1일 최대 rps: `268.5rps`
        - 최대 트래픽이 평소 트래픽보다 5배 많다고 가정
  - vUser
    - 평균 vUser: 8.6 (53.7 * 0.161)
    - 최대 vUser: 43.2 (268.5 * 0.161)

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요 
#### Smoke
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  vus: 1,
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<161']
  },
};

const BASE_URL = 'https://didrlgus-subway.p-e.kr/';
const STATION_ID_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 23, 24, 29, 48, 49, 50, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 96,
  97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 118, 119, 122, 123, 124, 125,
  126, 127, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 142, 143, 144, 145, 150, 151, 152, 153, 154, 155, 156, 157,
  158, 159, 160, 161, 162, 163, 164, 166, 167, 168, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185,
  186, 187, 188, 189, 190, 191, 192, 193, 194, 196, 197, 198, 200, 201, 202, 203, 204, 205, 206, 207, 211, 212, 213, 214, 215,
  216, 217, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 239, 240, 242, 243,
  246, 247, 248, 249, 250, 251, 252, 253, 256, 257, 258, 260, 261, 262, 263, 265, 267, 268, 269, 270, 272, 273, 274, 275, 276,
  277, 278, 279, 280, 281, 289, 290, 293, 329, 334, 335, 336, 337, 339, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351,
  352, 353, 354, 355, 357, 359, 360, 361, 364, 365, 366, 368, 369, 371, 372, 374, 375, 376, 378, 379, 380, 381, 382, 383, 386,
  387, 389, 390, 391, 392, 393, 395, 396, 397, 398, 399, 400, 401, 403, 404, 406, 407, 408, 409, 411, 413, 415, 416, 417, 418,
  419, 420, 421, 422, 424, 425, 426, 427, 428, 429, 431, 433, 436, 437, 438]


export default () => {
  let source = randomArray(STATION_ID_LIST);
  let target = randomArray(STATION_ID_LIST);
  const res = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`).json();
  // Verify response
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
};

function randomArray(array) {
  var rand = Math.random() * array.length | 0;
  var rValue = array[rand];
  return rValue;
}

```
#### 결과
![smoke test](https://user-images.githubusercontent.com/40568894/219377724-3c8f6a54-3462-4e76-bf3d-93a37d1d2f0d.png)
---

#### load
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  stages: [
      { duration: '10s', target: 10 },
      { duration: '5m', target: 10 },
      { duration: '10s', target: 45 },
      { duration: '20m', target: 45 },
      { duration: '10s', target: 10 },
      { duration: '5m', target: 10 }
  ],
  thresholds: {
      http_req_duration: ['p(99)<161']
  },
};

const BASE_URL = 'https://didrlgus-subway.p-e.kr/';
const STATION_ID_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 23, 24, 29, 48, 49, 50, 54, 55, 56, 57, 58, 59, 60, 
    61, 62, 63, 64, 65, 66, 67, 68, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 96, 
    97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 118, 119, 122, 123, 124, 125, 
    126, 127, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 142, 143, 144, 145, 150, 151, 152, 153, 154, 155, 156, 157, 
    158, 159, 160, 161, 162, 163, 164, 166, 167, 168, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 
    186, 187, 188, 189, 190, 191, 192, 193, 194, 196, 197, 198, 200, 201, 202, 203, 204, 205, 206, 207, 211, 212, 213, 214, 215, 
    216, 217, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 239, 240, 242, 243, 
    246, 247, 248, 249, 250, 251, 252, 253, 256, 257, 258, 260, 261, 262, 263, 265, 267, 268, 269, 270, 272, 273, 274, 275, 276, 
    277, 278, 279, 280, 281, 289, 290, 293, 329, 334, 335, 336, 337, 339, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 
    352, 353, 354, 355, 357, 359, 360, 361, 364, 365, 366, 368, 369, 371, 372, 374, 375, 376, 378, 379, 380, 381, 382, 383, 386, 
    387, 389, 390, 391, 392, 393, 395, 396, 397, 398, 399, 400, 401, 403, 404, 406, 407, 408, 409, 411, 413, 415, 416, 417, 418, 
    419, 420, 421, 422, 424, 425, 426, 427, 428, 429, 431, 433, 436, 437, 438]


export default () => {
    let source = randomArray(STATION_ID_LIST);
    let target = randomArray(STATION_ID_LIST);
    const res = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`).json();
    // Verify response
    check(res, {
      'status is 200': (r) => r.status === 200,
    });
};

function randomArray(array) {
    var rand = Math.random() * array.length | 0;
    var rValue = array[rand];
    return rValue;
}
```

#### 결과
<img width="1068" alt="load test" src="https://user-images.githubusercontent.com/40568894/219520514-9cce67b6-56c3-4406-97a3-86149a65253a.png">

#### stress
```js
import http from "k6/http";
import { check, group, sleep, fail } from 'k6';

export const options = {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "5m", target: 100 },
    { duration: "10s", target: 200 },
    { duration: "5m", target: 200 },
    { duration: "10s", target: 300 },
    { duration: "5m", target: 300 },
    { duration: "10s", target: 400 },
    { duration: "5m", target: 400 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<161']
  }
};

const BASE_URL = 'https://didrlgus-subway.p-e.kr/';
const STATION_ID_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 23, 24, 29, 48, 49, 50, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 96,
  97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 118, 119, 122, 123, 124, 125,
  126, 127, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 142, 143, 144, 145, 150, 151, 152, 153, 154, 155, 156, 157,
  158, 159, 160, 161, 162, 163, 164, 166, 167, 168, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185,
  186, 187, 188, 189, 190, 191, 192, 193, 194, 196, 197, 198, 200, 201, 202, 203, 204, 205, 206, 207, 211, 212, 213, 214, 215,
  216, 217, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 239, 240, 242, 243,
  246, 247, 248, 249, 250, 251, 252, 253, 256, 257, 258, 260, 261, 262, 263, 265, 267, 268, 269, 270, 272, 273, 274, 275, 276,
  277, 278, 279, 280, 281, 289, 290, 293, 329, 334, 335, 336, 337, 339, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351,
  352, 353, 354, 355, 357, 359, 360, 361, 364, 365, 366, 368, 369, 371, 372, 374, 375, 376, 378, 379, 380, 381, 382, 383, 386,
  387, 389, 390, 391, 392, 393, 395, 396, 397, 398, 399, 400, 401, 403, 404, 406, 407, 408, 409, 411, 413, 415, 416, 417, 418,
  419, 420, 421, 422, 424, 425, 426, 427, 428, 429, 431, 433, 436, 437, 438]


export default () => {
  let source = randomArray(STATION_ID_LIST);
  let target = randomArray(STATION_ID_LIST);
  const res = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`).json();
  // Verify response
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
};

function randomArray(array) {
  var rand = Math.random() * array.length | 0;
  var rValue = array[rand];
  return rValue;
}
```

#### 결과
<img width="1502" alt="스크린샷 2023-02-17 오전 9 32 09" src="https://user-images.githubusercontent.com/40568894/219520667-ca7d6972-1ce4-42e8-b39d-7adf1c73eaf5.png">

- 위 스크립트 실행 시, vUser가 200에서 300으로 올라가는 시점에 아래와 같은 에러가 발생하기 시작했고, 이후 성능테스트 서버에 과부하가 생겨서 테스트가 멈췄습니다.
  - <img width="694" alt="스크린샷 2023-02-17 오전 9 35 54" src="https://user-images.githubusercontent.com/40568894/219523745-0f3f20a3-1b5e-401a-8afc-d95c03b500cd.png">
- 위 stress test 스크립트 실행결과에 대한 그라파나 대시보드 현황인데요. 해당 시점의 대시보드를 노출시키려는데 위 이미지처럼 일부분만 노출되고 아무리 대기해도 influxdb에서 데이터를 읽어는데 부하가 생기는건지 나머지 부분은 계속 로딩중 상태로 남다가 결국 ec2 서버가 중지됩니다.
  - 대시보드 노출 요청 URL
    - http://15.165.142.212:3000/d/R6MxiA1Vk/k6-load-testing-results?orgId=1&from=1676560910517&to=1676561583182
  - 대시보드 노출을 시도하는 동안 그라파나가 설치된 대상 ec2(didrlgus-k6-ec2)의 터미널 입력도 급격히 느려져서 다른 작업을 아예 수행할 수 없는 상황이 발생합니다.
- 성능테스트를 수행한 ec2를 재부팅한 후 그라파나 대시보드를 다시 노출시켜도 위와 같은 상황이 반복돼서, 어떤 문제인지 파악하기 어려움을 겪고 있는 상황입니다.
- 혹시, 이럴경우 어느 부분을 중점적으로 확인해봐야할지 여쭙고 싶습니다.

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요