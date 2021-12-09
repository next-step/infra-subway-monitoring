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

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
- URL : https://tyranotyrano-subway.p-e.kr
- public-web1
    - public ip : 54.180.141.237
    - private ip : 198.168.100.14
    - app-file.log : /home/ubuntu/infra-subway-monitoring/log/app-file.log
    - app-access-file.log : /home/ubuntu/infra-subway-monitoring/log/app-access-file.log
- public-web2
    - public ip : 13.209.68.20
    - private ip : 198.168.100.115
    - app-file.log : /home/ubuntu/infra-subway-monitoring/log/app-file.log
    - app-access-file.log : /home/ubuntu/infra-subway-monitoring/log/app-access-file.log
- (공통) nginx
    - /var/log/nginx/access.log
    - /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- public-web1 : https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=tyranotyrano-public-web1-dashboard
- public-web2 : https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=tyranotyrano-public-web2-dashboard

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- Desktop 을 기준으로 경쟁사(카카오 맵) 과 비교하여설정
  - 내 사이트 : https://tyranotyrano-subway.p-e.kr
  - 경쟁사 : 카카오 맵(https://map.kakao.com/)

| |내 사이트|카카오맵|목표|결과|
|---|---|---|---|---|
|First Contentful Paint|2.8s|0.6s|2s 미만|0.7s
|Time to Interactive|2.9s|3.0s|2s 미만|1.3s
|Speed Index|2.8s|2.7s|2s 미만|1.8s
|Total Blocking Time|50ms|860ms|유지|220ms
|Largest Contentful Paint|2.9s|0.7s| 1s 미만|1.3s
|Cumulative Layout Shift|0.004|0.017|유지|0.004

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- [X] 텍스트 압축 사용
  - [X] server.compression 설정 추가
- [X] 렌더링 차단 리소스 제거하기
  - [X] 렌더링 차단 js 에 async 적용
  - [X] 렌더링 차단 css 에 Critical CSS 적용
- [X] 정적자원들에 캐싱 적용
  - [X] spring.web.resources.chain 설정 추가

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
(참고 : https://www.sedaily.com/NewsVIew/22OS78XL7P)
- DAU 설정
  - 경쟁사인 카카오맵의 MAU : 약 650만명
  - 내 사이트 MAU(카카오맵의 1/3 수준이라 가정) : 650만명 / 3 = 약 216만명
  - 내 사이트 DAU : 216만명 / 30 = 7.2만명
- 예상 피크 시간대 설정
  - 예상 피크 시간대 : 07:00 ~ 10:00, 17:00 ~ 20:00 (출/퇴근 시간대)
- 1명당 1일 평균 접속 혹은 요청수 설정
  - 1명당 1일 평균 요청수: 6번 (메인, 로그인, 즐겨찾기, 경로조회 등 평균 6번 요청한다고 예상)
- Throughput (1일 평균 rps ~ 1일 최대 rps)
  - 1일 총 접속 수 : 72000 * 6 = 432,000번
  - 최대 트래픽 / 평소 트래픽 : 10 (최대-최고 트래픽이 약 10배 차이 난다고 가정)
  - 1일 평균 rps : 432,000번 / 86,400 (초/일) = 5
  - 1일 최대 rps : 5 * 10 = 50
- 부하테스트 전제조건
  - DAU : 72000명
  - 1일 총 요청수 : 432,000건
  - 1일 평균 RPS : 5
  - 1일 최대 RPS : 50
  - Throughput : 5 ~ 50
  - Latency : 100ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
#### 1. 메인 페이지
<details><summary>smoke test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../common/common.js';

export let options = {
vus: 1,
duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

export default function ()  {
let 메인페이지_response = 메인페이지_접속_요청();

    메인페이지_결과_확인(메인페이지_response);
}

export function 메인페이지_접속_요청() {
return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
check(메인페이지_response, {
'메인페이지 응답 결과 ===> ': (response) => response.status === 200
});
}
```
</details>
<details><summary>smoke test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
    /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
    /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io

    execution: local
    script: smoke.js
    output: -

    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
    * default: 1 looping VUs for 10s (gracefulStop: 30s)


    running (10.0s), 0/1 VUs, 3367 complete and 0 interrupted iterations
    default ✓ [======================================] 1 VUs  10s

     ✓ 메인페이지 응답 결과 ===>

     checks.........................: 100.00% ✓ 3367       ✗ 0
     data_received..................: 5.5 MB  548 kB/s
     data_sent......................: 409 kB  41 kB/s
     http_req_blocked...............: avg=16.7µs  min=3.45µs  med=4.34µs  max=25.16ms  p(90)=4.84µs  p(95)=5.64µs
     http_req_connecting............: avg=965ns   min=0s      med=0s      max=1.21ms   p(90)=0s      p(95)=0s
     ✓ http_req_duration..............: avg=2.83ms  min=1.88ms  med=2.62ms  max=288.65ms p(90)=3.35ms  p(95)=3.62ms
     { expected_response:true }...: avg=2.83ms  min=1.88ms  med=2.62ms  max=288.65ms p(90)=3.35ms  p(95)=3.62ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 3367
     http_req_receiving.............: avg=57.03µs min=31.14µs med=49.92µs max=474.15µs p(90)=87.1µs  p(95)=103.69µs
     http_req_sending...............: avg=13.82µs min=9.75µs  med=12.21µs max=450.8µs  p(90)=15.31µs p(95)=21.61µs
     http_req_tls_handshaking.......: avg=8.23µs  min=0s      med=0s      max=15.35ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=2.76ms  min=1.83ms  med=2.55ms  max=288.46ms p(90)=3.29ms  p(95)=3.56ms
     http_reqs......................: 3367    336.649216/s
     iteration_duration.............: avg=2.96ms  min=1.99ms  med=2.74ms  max=314.19ms p(90)=3.47ms  p(95)=3.74ms
     iterations.....................: 3367    336.649216/s
     vus............................: 0       min=0        max=1
     vus_max........................: 1       min=1        max=1

```
</details>

<details><summary>load test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../common/common.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '25s', target: 50 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();

    메인페이지_결과_확인(메인페이지_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}
```
</details>


<details><summary>load test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 1m15s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 45.01s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


  running (0m45.0s), 00/50 VUs, 59226 complete and 0 interrupted iterations
  default ✓ [======================================] 00/50 VUs  45.01s

     ✓ 메인페이지 응답 결과 ===>

     checks.........................: 100.00% ✓ 59226       ✗ 0
     data_received..................: 96 MB   2.1 MB/s
     data_sent......................: 7.2 MB  160 kB/s
     http_req_blocked...............: avg=63.68µs  min=2.88µs  med=4.1µs   max=103.29ms p(90)=5.56µs   p(95)=9.5µs
     http_req_connecting............: avg=7.14µs   min=0s      med=0s      max=28.12ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=16.15ms  min=1.78ms  med=9.14ms  max=122.33ms p(90)=42.05ms  p(95)=47.38ms
       { expected_response:true }...: avg=16.15ms  min=1.78ms  med=9.14ms  max=122.33ms p(90)=42.05ms  p(95)=47.38ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 59226
     http_req_receiving.............: avg=137.07µs min=19.41µs med=37.73µs max=50.41ms  p(90)=106.84µs p(95)=284.98µs
     http_req_sending...............: avg=62.88µs  min=7.07µs  med=12.01µs max=31.78ms  p(90)=30.07µs  p(95)=62.93µs
     http_req_tls_handshaking.......: avg=39.7µs   min=0s      med=0s      max=101.75ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=15.95ms  min=1.72ms  med=8.89ms  max=122.28ms p(90)=41.89ms  p(95)=47.2ms
     http_reqs......................: 59226   1315.666292/s
     iteration_duration.............: avg=16.52ms  min=1.85ms  med=9.54ms  max=165.7ms  p(90)=42.4ms   p(95)=47.75ms
     iterations.....................: 59226   1315.666292/s
     vus............................: 6       min=1         max=49
     vus_max........................: 50      min=50        max=50

```
</details>

<details><summary>stress test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../common/common.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '15s', target: 25 },
        { duration: '20s', target: 40 },
        { duration: '25s', target: 50 },
        { duration: '20s', target: 40 },
        { duration: '15s', target: 25 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();

    메인페이지_결과_확인(메인페이지_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}
```
</details>


<details><summary>stress test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 2m25s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 1m55.01s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


  running (1m55.0s), 00/50 VUs, 171944 complete and 0 interrupted iterations
  default ✓ [======================================] 00/50 VUs  1m55.01s

     ✓ 메인페이지 응답 결과 ===>

     checks.........................: 100.00% ✓ 171944      ✗ 0
     data_received..................: 280 MB  2.4 MB/s
     data_sent......................: 21 MB   182 kB/s
     http_req_blocked...............: avg=50.81µs  min=2.67µs  med=3.98µs  max=93.27ms  p(90)=5.6µs    p(95)=12.82µs
     http_req_connecting............: avg=4.86µs   min=0s      med=0s      max=36.45ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=20.33ms  min=1.61ms  med=14.34ms max=148.49ms p(90)=49.33ms  p(95)=56.65ms
       { expected_response:true }...: avg=20.33ms  min=1.61ms  med=14.34ms max=148.49ms p(90)=49.33ms  p(95)=56.65ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 171944
     http_req_receiving.............: avg=131.21µs min=17.26µs med=36.56µs max=99.8ms   p(90)=127.51µs p(95)=265.96µs
     http_req_sending...............: avg=53.8µs   min=7.19µs  med=11.93µs max=44.72ms  p(90)=35.37µs  p(95)=73.2µs
     http_req_tls_handshaking.......: avg=31.9µs   min=0s      med=0s      max=92.75ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=20.14ms  min=1.54ms  med=14.15ms max=148.45ms p(90)=49.1ms   p(95)=56.47ms
     http_reqs......................: 171944  1494.972191/s
     iteration_duration.............: avg=20.65ms  min=1.72ms  med=14.67ms max=160.08ms p(90)=49.67ms  p(95)=56.99ms
     iterations.....................: 171944  1494.972191/s
     vus............................: 6       min=1         max=50
     vus_max........................: 50      min=50        max=50

```
</details>

#### 2. 회원 정보 수정 - 나이 수정 
<details><summary>smoke test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../common/common.js';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();
    메인페이지_결과_확인(메인페이지_response);

    let token_response = 로그인_요청();
    로그인_성공(token_response);

    let 나이변경_response = 로그인한_유저_나이_변경_요청(token_response, 30);
    로그인한_유저_나이_변경_성공(나이변경_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}

export function 로그인_요청() {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_성공(token_response) {
    check(token_response, {
        '로그인 요청 응답 결과 ===> ': (response) => response.status === 200,
        '로그인 성공': (response) => response.json('accessToken') !== '',
    });
}

export function 로그인한_유저_나이_변경_요청(token_response, updatedAge) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_response.json('accessToken')}`,
        },
    };

    const requestBody = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: updatedAge,
    });

    return http.put(`${BASE_URL}/members/me`, requestBody, params);
}

export function 로그인한_유저_나이_변경_성공(나이변경_response) {
    check(나이변경_response, {
        '로그인한 유저 나이 변경 요청 응답 결과 ===> ': (response) => response.status === 200
    });
}
```
</details>


<details><summary>smoke test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


  running (10.0s), 0/1 VUs, 411 complete and 0 interrupted iterations
  default ↓ [======================================] 1 VUs  10s

     ✓ 메인페이지 응답 결과 ===>
     ✓ 로그인 요청 응답 결과 ===>
     ✓ 로그인 성공
     ✓ 로그인한 유저 나이 변경 요청 응답 결과 ===>

     checks.........................: 100.00% ✓ 1644       ✗ 0
     data_received..................: 933 kB  93 kB/s
     data_sent......................: 322 kB  32 kB/s
     http_req_blocked...............: avg=30.79µs min=3.99µs  med=4.85µs  max=24.5ms   p(90)=5.78µs   p(95)=6.55µs
     http_req_connecting............: avg=2.42µs  min=0s      med=0s      max=2.45ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=7.9ms   min=2.08ms  med=8.86ms  max=61.5ms   p(90)=12.1ms   p(95)=13.32ms
       { expected_response:true }...: avg=7.9ms   min=2.08ms  med=8.86ms  max=61.5ms   p(90)=12.1ms   p(95)=13.32ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 1233
     http_req_receiving.............: avg=75.86µs min=36.54µs med=60.78µs max=9.11ms   p(90)=102.77µs p(95)=115.12µs
     http_req_sending...............: avg=20.49µs min=12.47µs med=18.58µs max=367.48µs p(90)=24.17µs  p(95)=28.87µs
     http_req_tls_handshaking.......: avg=18.43µs min=0s      med=0s      max=16.31ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=7.81ms  min=2.02ms  med=8.75ms  max=61.41ms  p(90)=11.97ms  p(95)=13.18ms
     http_reqs......................: 1233    123.019979/s
     iteration_duration.............: avg=24.35ms min=18.56ms med=23.19ms max=75.88ms  p(90)=28.03ms  p(95)=30.95ms
     iterations.....................: 411     41.00666/s
     vus............................: 1       min=1        max=1
     vus_max........................: 1       min=1        max=1

```
</details>

<details><summary>load test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../common/common.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '25s', target: 50 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();
    메인페이지_결과_확인(메인페이지_response);

    let token_response = 로그인_요청();
    로그인_성공(token_response);

    let 나이변경_response = 로그인한_유저_나이_변경_요청(token_response, 30);
    로그인한_유저_나이_변경_성공(나이변경_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}

export function 로그인_요청() {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_성공(token_response) {
    check(token_response, {
        '로그인 요청 응답 결과 ===> ': (response) => response.status === 200,
        '로그인 성공': (response) => response.json('accessToken') !== '',
    });
}

export function 로그인한_유저_나이_변경_요청(token_response, updatedAge) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_response.json('accessToken')}`,
        },
    };

    const requestBody = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: updatedAge,
    });

    return http.put(`${BASE_URL}/members/me`, requestBody, params);
}

export function 로그인한_유저_나이_변경_성공(나이변경_response) {
    check(나이변경_response, {
        '로그인한 유저 나이 변경 요청 응답 결과 ===> ': (response) => response.status === 200
    });
}
```
</details>

<details><summary>load test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 1m15s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 45.01s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


  running (0m45.0s), 00/50 VUs, 13614 complete and 0 interrupted iterations
  default ✓ [======================================] 00/50 VUs  45.01s

     ✓ 메인페이지 응답 결과 ===>
     ✓ 로그인 요청 응답 결과 ===>
     ✓ 로그인 성공
     ✓ 로그인한 유저 나이 변경 요청 응답 결과 ===>

     checks.........................: 100.00% ✓ 54456      ✗ 0
     data_received..................: 31 MB   687 kB/s
     data_sent......................: 11 MB   237 kB/s
     http_req_blocked...............: avg=76.7µs   min=2.82µs  med=4.26µs  max=113.98ms p(90)=5.45µs   p(95)=8.51µs
     http_req_connecting............: avg=10.93µs  min=0s      med=0s      max=39.57ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=23.24ms  min=1.64ms  med=17.85ms max=327.1ms  p(90)=47.01ms  p(95)=60.39ms
       { expected_response:true }...: avg=23.24ms  min=1.64ms  med=17.85ms max=327.1ms  p(90)=47.01ms  p(95)=60.39ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 40842
     http_req_receiving.............: avg=220.31µs min=15.94µs med=35.19µs max=90.98ms  p(90)=84.74µs  p(95)=351.77µs
     http_req_sending...............: avg=120.32µs min=8.24µs  med=15.14µs max=97.86ms  p(90)=27.96µs  p(95)=71.11µs
     http_req_tls_handshaking.......: avg=36.48µs  min=0s      med=0s      max=99.32ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=22.9ms   min=1.55ms  med=17.56ms max=327.06ms p(90)=46.38ms  p(95)=59.8ms
     http_reqs......................: 40842   907.009129/s
     iteration_duration.............: avg=72.07ms  min=14.71ms med=65.5ms  max=413.04ms p(90)=124.64ms p(95)=147.27ms
     iterations.....................: 13614   302.336376/s
     vus............................: 6       min=1        max=49
     vus_max........................: 50      min=50       max=50

```
</details>

<details><summary>stress test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../common/common.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '15s', target: 25 },
        { duration: '20s', target: 40 },
        { duration: '25s', target: 50 },
        { duration: '20s', target: 40 },
        { duration: '15s', target: 25 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();
    메인페이지_결과_확인(메인페이지_response);

    let token_response = 로그인_요청();
    로그인_성공(token_response);

    let 나이변경_response = 로그인한_유저_나이_변경_요청(token_response, 30);
    로그인한_유저_나이_변경_성공(나이변경_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}

export function 로그인_요청() {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_성공(token_response) {
    check(token_response, {
        '로그인 요청 응답 결과 ===> ': (response) => response.status === 200,
        '로그인 성공': (response) => response.json('accessToken') !== '',
    });
}

export function 로그인한_유저_나이_변경_요청(token_response, updatedAge) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_response.json('accessToken')}`,
        },
    };

    const requestBody = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: updatedAge,
    });

    return http.put(`${BASE_URL}/members/me`, requestBody, params);
}

export function 로그인한_유저_나이_변경_성공(나이변경_response) {
    check(나이변경_response, {
        '로그인한 유저 나이 변경 요청 응답 결과 ===> ': (response) => response.status === 200
    });
}
```
</details>

<details><summary>stress test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 2m25s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 1m55.01s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


  running (1m55.0s), 00/50 VUs, 35151 complete and 0 interrupted iterations
  default ✓ [======================================] 00/50 VUs  1m55.01s

     ✓ 메인페이지 응답 결과 ===>
     ✓ 로그인 요청 응답 결과 ===>
     ✓ 로그인 성공
     ✓ 로그인한 유저 나이 변경 요청 응답 결과 ===>

     checks.........................: 100.00% ✓ 140604     ✗ 0
     data_received..................: 80 MB   692 kB/s
     data_sent......................: 28 MB   240 kB/s
     http_req_blocked...............: avg=91.81µs  min=2.73µs  med=4.2µs   max=190.04ms p(90)=5.48µs   p(95)=8.07µs
     http_req_connecting............: avg=15.59µs  min=0s      med=0s      max=100.98ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=32.68ms  min=1.65ms  med=26.01ms max=374.14ms p(90)=66.29ms  p(95)=84.83ms
       { expected_response:true }...: avg=32.68ms  min=1.65ms  med=26.01ms max=374.14ms p(90)=66.29ms  p(95)=84.83ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 105453
     http_req_receiving.............: avg=331.24µs min=14.83µs med=34.1µs  max=136.37ms p(90)=93.02µs  p(95)=592.12µs
     http_req_sending...............: avg=158.97µs min=7.52µs  med=15.09µs max=105.56ms p(90)=26.35µs  p(95)=77.61µs
     http_req_tls_handshaking.......: avg=33.73µs  min=0s      med=0s      max=151.85ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=32.19ms  min=1.58ms  med=25.56ms max=374.1ms  p(90)=65.49ms  p(95)=83.86ms
     http_reqs......................: 105453  916.774192/s
     iteration_duration.............: avg=101.11ms min=14.38ms med=92.34ms max=470.18ms p(90)=175.09ms p(95)=210.02ms
     iterations.....................: 35151   305.591397/s
     vus............................: 6       min=1        max=50
     vus_max........................: 50      min=50       max=50

```
</details>

#### 3. 경로(Map) 조회
<details><summary>smoke test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../common/common.js';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();
    메인페이지_결과_확인(메인페이지_response);

    let 경로탐색_response = 최단경로_조회_요청(106, 567) // 106: 강남, 567: 태평
    최단경로_조회_성공(경로탐색_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}

export function 최단경로_조회_요청(sourceId, targetId) {
    return http.get(`${BASE_URL}/paths?source=` + sourceId + `&target=` + targetId );
}

export function 최단경로_조회_성공(경로탐색_response) {
    check(경로탐색_response, {
        '최단경로 조회 응답 결과 ===>': (response) => response.json('stations').length > 0
    });
}
```
</details>


<details><summary>smoke test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


  running (10.0s), 0/1 VUs, 13 complete and 0 interrupted iterations
  default ✓ [======================================] 1 VUs  10s

     ✓ 메인페이지 응답 결과 ===>
     ✓ 최단경로 조회 응답 결과 ===>

     checks.........................: 100.00% ✓ 26       ✗ 0
     data_received..................: 32 kB   3.2 kB/s
     data_sent......................: 3.9 kB  388 B/s
     http_req_blocked...............: avg=894.37µs min=4.23µs   med=5.14µs   max=23.12ms  p(90)=6.82µs   p(95)=8.73µs
     http_req_connecting............: avg=19.27µs  min=0s       med=0s       max=501.27µs p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=384.44ms min=3.5ms    med=492.17ms max=1.5s     p(90)=732.95ms p(95)=806.3ms
       { expected_response:true }...: avg=384.44ms min=3.5ms    med=492.17ms max=1.5s     p(90)=732.95ms p(95)=806.3ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 26
     http_req_receiving.............: avg=85.68µs  min=48.93µs  med=82.76µs  max=139.71µs p(90)=125.05µs p(95)=135.7µs
     http_req_sending...............: avg=20.41µs  min=12.03µs  med=17.06µs  max=66.86µs  p(90)=29.4µs   p(95)=30.02µs
     http_req_tls_handshaking.......: avg=586.33µs min=0s       med=0s       max=15.24ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=384.34ms min=3.43ms   med=492ms    max=1.5s     p(90)=732.83ms p(95)=806.21ms
     http_reqs......................: 26      2.593506/s
     iteration_duration.............: avg=771.04ms min=627.79ms med=664.97ms max=1.88s    p(90)=814.44ms p(95)=1.24s
     iterations.....................: 13      1.296753/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
</details>

<details><summary>load test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../common/common.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '25s', target: 50 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();
    메인페이지_결과_확인(메인페이지_response);

    let 경로탐색_response = 최단경로_조회_요청(106, 567) // 106: 강남, 567: 태평
    최단경로_조회_성공(경로탐색_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}

export function 최단경로_조회_요청(sourceId, targetId) {
    return http.get(`${BASE_URL}/paths?source=` + sourceId + `&target=` + targetId );
}

export function 최단경로_조회_성공(경로탐색_response) {
    check(경로탐색_response, {
        '최단경로 조회 응답 결과 ===>': (response) => response.json('stations').length > 0
    });
}
```
</details>

<details><summary>load test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 1m15s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 45.01s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


  running (0m48.3s), 00/50 VUs, 255 complete and 0 interrupted iterations
  default ✓ [======================================] 00/50 VUs  45.01s

     ✓ 메인페이지 응답 결과 ===>
     ✓ 최단경로 조회 응답 결과 ===>

     checks.........................: 100.00% ✓ 510       ✗ 0
     data_received..................: 773 kB  16 kB/s
     data_sent......................: 88 kB   1.8 kB/s
     http_req_blocked...............: avg=615.16µs min=3.91µs   med=5.13µs   max=27.95ms  p(90)=12.99µs  p(95)=5.82ms
     http_req_connecting............: avg=91.51µs  min=0s       med=0s       max=2.71ms   p(90)=0s       p(95)=1.05ms
   ✗ http_req_duration..............: avg=2.27s    min=2.56ms   med=308.12ms max=9.71s    p(90)=7.62s    p(95)=8.21s
       { expected_response:true }...: avg=2.27s    min=2.56ms   med=308.12ms max=9.71s    p(90)=7.62s    p(95)=8.21s
     http_req_failed................: 0.00%   ✓ 0         ✗ 510
     http_req_receiving.............: avg=72.2µs   min=33.86µs  med=72.94µs  max=148.11µs p(90)=103.45µs p(95)=114.43µs
     http_req_sending...............: avg=21µs     min=11.18µs  med=16.81µs  max=125.68µs p(90)=50.29µs  p(95)=56.9µs
     http_req_tls_handshaking.......: avg=488.3µs  min=0s       med=0s       max=16.12ms  p(90)=0s       p(95)=4.58ms
     http_req_waiting...............: avg=2.27s    min=2.47ms   med=307.99ms max=9.71s    p(90)=7.62s    p(95)=8.21s
     http_reqs......................: 510     10.561863/s
     iteration_duration.............: avg=4.54s    min=588.32ms med=4.43s    max=9.71s    p(90)=8.21s    p(95)=8.64s
     iterations.....................: 255     5.280932/s
     vus............................: 4       min=1       max=50
     vus_max........................: 50      min=50      max=50

ERRO[0049] some thresholds have failed


```
</details>

<details><summary>stress test 스크립트 </summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../common/common.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '25s', target: 50 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();
    메인페이지_결과_확인(메인페이지_response);

    let 경로탐색_response = 최단경로_조회_요청(106, 567) // 106: 강남, 567: 태평
    최단경로_조회_성공(경로탐색_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}

export function 최단경로_조회_요청(sourceId, targetId) {
    return http.get(`${BASE_URL}/paths?source=` + sourceId + `&target=` + targetId );
}

export function 최단경로_조회_성공(경로탐색_response) {
    check(경로탐색_response, {
        '최단경로 조회 응답 결과 ===>': (response) => response.json('stations').length > 0
    });
}
```
</details>


<details><summary>stress test 스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 150 max VUs, 1m50s max duration (incl. graceful stop):
           * default: Up to 150 looping VUs for 1m20s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


  running (1m38.5s), 000/150 VUs, 519 complete and 0 interrupted iterations
  default ✓ [======================================] 000/150 VUs  1m20s

     ✓ 메인페이지 응답 결과 ===>
     ✓ 최단경로 조회 응답 결과 ===>

     checks.........................: 100.00% ✓ 1038      ✗ 0
     data_received..................: 1.8 MB  18 kB/s
     data_sent......................: 198 kB  2.0 kB/s
     http_req_blocked...............: avg=970.68µs min=3.53µs   med=5.08µs   max=38.02ms  p(90)=5.64ms   p(95)=6.36ms
     http_req_connecting............: avg=178.76µs min=0s       med=0s       max=11.23ms  p(90)=596.64µs p(95)=1.22ms
   ✗ http_req_duration..............: avg=8.45s    min=2.62ms   med=362.36ms max=27.85s   p(90)=24.82s   p(95)=26.01s
       { expected_response:true }...: avg=8.45s    min=2.62ms   med=362.36ms max=27.85s   p(90)=24.82s   p(95)=26.01s
     http_req_failed................: 0.00%   ✓ 0         ✗ 1038
     http_req_receiving.............: avg=79.92µs  min=29.81µs  med=74.13µs  max=1.06ms   p(90)=110.03µs p(95)=126.89µs
     http_req_sending...............: avg=24.64µs  min=10.57µs  med=17.41µs  max=380.96µs p(90)=59.68µs  p(95)=65.98µs
     http_req_tls_handshaking.......: avg=747.7µs  min=0s       med=0s       max=17.36ms  p(90)=4.43ms   p(95)=5ms
     http_req_waiting...............: avg=8.45s    min=2.56ms   med=362.25ms max=27.85s   p(90)=24.82s   p(95)=26.01s
     http_reqs......................: 1038    10.538233/s
     iteration_duration.............: avg=16.9s    min=661.29ms med=19.57s   max=27.87s   p(90)=26.03s   p(95)=26.47s
     iterations.....................: 519     5.269117/s
     vus............................: 4       min=1       max=150
     vus_max........................: 150     min=150     max=150

```
</details>

#### 4. 부하테스트 요약
- 메인 페이지(임계값 : 100ms)
  - smoke test : 통과
  - load test : 통과
  - stress test : 통과
- 회원정보 페이지(임계값 : 500ms)
  - smoke test : 통과
  - load test : 통과
  - stress test : 통과
- 최단경로 조회 페이지(임계값 : 1500ms)
  - smoke test : 통과
  - load test : 실패
  - stress test : 실패
  - ※경로조회 API 는 다소 무거워 http_req_duration 결과에서 fail 이 발생했는데, @Cacheable 등을 통해 성능개선을 하거나 API 내부 구현 자체를 개선할 필요성이 대두댐
  
#### 5. 추가 설정
- nginx
  - [x] 텍스트 압축
      - [x] nginx.conf 에 gzip 설정을 추가
  - [x] 정적 자원 캐싱
      - [x] /etc/nginx/tmp 디렉토리 생성 -> proxy_cache_path 로 사용
      - [x] nginx.conf 에 proxy_cache 속성 추가
      - [x] 정적자원 Response Header 에 X-Proxy-Cache 추가 -> MISS 에서 HIT 로 캐싱 확인