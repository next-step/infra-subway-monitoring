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

## 1단계 - 인프라 운영하기
### PR 질문 문답
1. 각 서버내 로깅 경로를 알려주세요
- syslog : /var/log/syslog
- nginx access log : /var/log/nginx/access.log
- nginx error log : /var/log/nginx/error.log
- application log : /app/infra_monitoring/log/file_subway.log, /app/infra_monitoring/log/json_subway.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=lunechaser-publicA2-DASHBOARD

### 작업 리스트
- [x] Application Log에대한 로그파일 생성 및 저장
  - [x] Auth 항목에대한 Log 추가
  - [x] favorite 항목에대한 Log 추가
  - [x] line 항목에대한 Log 추가
  - [x] map 항목에대한 Log 추가
  - [x] member 항목에대한 Log 추가
  - [x] station 항목에대한 Log 추가
- [x] Nginx Access Log 설정
- [x] Docker 상태확인하기 (cAdvisor 설치)
- [x] Cloudwatch로 로그 수집하기
- [x] Cloudwatch로 메트릭 수집하기
---

## 2단계 - 성능 테스트
### 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 웹 성능예산(테스크톱 기준)
> 대조군에대한 성능을 비교한결과  
초기 컨텐츠과 가장 큰 컨텐츠 렌더링 시간을 제외한 다른 항목에대해서는 성능 이슈가 없다  
이로인해 렌더링 시간에대한 개선이 필요해보임  
개선 시간은 대조군 시간의 1.2배까지를 목표로하여  
기존 실험군의 측정결과를 하기 수준까지로 변경이 필요함
- 개선할 목표 성능
```
First Contentful Paint : 0.7 초      Time to Interactive : 2.2 초
Speed Index : 2.4 초                 Total Blocking Time : 80 밀리초
Largest Contentful Paint : 0.7 초    Cumulative Layout Shift : 0
```

**비교 측정툴 : PageSpeed**
- 실험군 (Subway-monitoring_경로조회페이지)
```
Performance Score : 77

First Contentful Paint : 2.0 초      Time to Interactive : 2.2 초
Speed Index : 2.4 초                 Total Blocking Time : 80 밀리초
Largest Contentful Paint : 2.0 초    Cumulative Layout Shift : 0
```

- 대조군 (카카오맵_초기진입페이지)
```
Performance Score : 64

First Contentful Paint : 0.6초       Time to Interactive : 3.0초
Speed Index : 2.5초                  Total Blocking Time : 930 밀리초
Largest Contentful Paint : 0.6 초    Cumulative Layout Shift : 0.017

```

### 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 모든 페이지에대한 기능을 1개의 js파일에 넣는게 아닌 분할하여  
  사용우선순위에따라 Lazy Loading이 되도록한다.
- 이미지요소에 width, height를 명시하여 레이아웃 변경횟수를 줄인다.
- 렌더링 차단 리소스를 제거한다.
- 반복하용하는 항목의 경우 캐시를 통해 제공되도록한다.

### 3. 부하테스트 전제조건은 어느정도로 설정하셨나요
> 카카오 맵은 2021.5기준 MAU는 649만명이다 (근거 : https://www.sedaily.com/NewsVIew/22OS78XL7P)  
  이를 근거로 개발할 프로그램은 1/3수준인 MAU 216만명을 기준으로 개발한다.  
    
> 지하철 이용 피크시간은  7~10시, 17~19시이며  
  해당 시간의 트래픽은 평균 트래픽의 4배가된다.  

#### 1명당 1일 평균 접속 혹은 요청수
```
- 평균 접속 : 3회
- API 호츌 : 메인페이지 -> 로그인 -> 구간 조회 ( 3회 )
=> 총 1인당 API 호출 수 : 9회
```
#### 전제조건 계산
- DAU
  - 216,000 / 30 = 72,000
- 1일 평균 RPS
  - 72,000 * 9 / 86,400 = `7.5 rps`
- 1일 최대 RPS
  - 7.5 rps x 4 = `30 rps`

> VU계산 상수는 **http_req_duration =  0.1**
- mainPage시나리오(접속 빈도가 높은 페이지) 평균 부하 VU
  - 7.5 * (1 * 0.1 + 1) / 1 = `8.25 UV`
- mainPage시나리오 최대 부하 VU
  - 30 * (1 * 0.1 + 1) / 1 = `33 UV`

- map시나리오(데이터를 조회하는데 여러 데이터를 참조하는 페이지) 평균 부하 VU
  - 7.5 * (2 * 0.1 + 1) / 2 = `4.5 UV`
- map시나리오 최대 부하 VU
  - 30 * (2 * 0.1 + 1) / 2 = `18 UV`
  
- updateUserInfo시나리오(데이터를 갱신하는 페이지) 평균 부하 VU
  - 7.5 * (3 * 0.1 + 1) / 3 = `3.25 UV`
- map시나리오 최대 부하 VU
  - 30 * (3 * 0.1 + 1) / 3 = `13 UV`

#### 부하테스트 스크립트 제작 전제조건
```
- DAU : 72000
- 1일 총 요청수 : 648,000
- 1일 평균 RPS : 7.5
- 1일 최대 RPS : 30
- Throughput : 7.5 ~ 30
- Latency : 100ms
- 등록된 역수 : 616
- 등록된 구간 : 340
```

### 4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
#### 접속 빈도가 높은 페이지
##### Smoke

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

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


running (10.0s), 0/1 VUs, 857 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 메인페이지가 정상적으로 응답함

     checks.........................: 100.00% ✓ 857       ✗ 0
     data_received..................: 1.2 MB  116 kB/s
     data_sent......................: 31 kB   3.1 kB/s
     http_req_blocked...............: avg=70.02µs min=2.54µs  med=2.95µs  max=56.98ms  p(90)=3.15µs  p(95)=3.3µs
     http_req_connecting............: avg=1.2µs   min=0s      med=0s      max=1.03ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=11.38ms min=8.82ms  med=10.42ms max=37.92ms  p(90)=14.06ms p(95)=16.59ms
       { expected_response:true }...: avg=11.38ms min=8.82ms  med=10.42ms max=37.92ms  p(90)=14.06ms p(95)=16.59ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 857
     http_req_receiving.............: avg=60.96µs min=39.1µs  med=53.45µs max=2.7ms    p(90)=72.83µs p(95)=82.06µs
     http_req_sending...............: avg=59.81µs min=43.51µs med=56.29µs max=210.81µs p(90)=75µs    p(95)=79.33µs
     http_req_tls_handshaking.......: avg=20.77µs min=0s      med=0s      max=17.8ms   p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=11.26ms min=8.7ms   med=10.29ms max=37.77ms  p(90)=13.95ms p(95)=16.47ms
     http_reqs......................: 857     85.636847/s
     iteration_duration.............: avg=11.66ms min=9ms     med=10.62ms max=79.36ms  p(90)=14.32ms p(95)=16.79ms
     iterations.....................: 857     85.636847/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1
```
</details>

##### Load

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '10s', target: 1 },
    { duration: '10s', target: 9 },
    { duration: '20s', target: 33 },
    { duration: '10s', target: 9 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 33 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 33 looping VUs for 1m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.0s), 00/33 VUs, 26060 complete and 0 interrupted iterations
default ✓ [======================================] 00/33 VUs  1m0s

     ✓ 메인페이지가 정상적으로 응답함

     checks.........................: 100.00% ✓ 26060      ✗ 0
     data_received..................: 36 MB   591 kB/s
     data_sent......................: 955 kB  16 kB/s
     http_req_blocked...............: avg=17.66µs  min=1.99µs  med=2.81µs  max=25.29ms  p(90)=3.01µs   p(95)=3.13µs
     http_req_connecting............: avg=2.93µs   min=0s      med=0s      max=6.77ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=27.74ms  min=6.27ms  med=14.21ms max=141.26ms p(90)=62.83ms  p(95)=68.75ms
       { expected_response:true }...: avg=27.74ms  min=6.27ms  med=14.21ms max=141.26ms p(90)=62.83ms  p(95)=68.75ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 26060
     http_req_receiving.............: avg=381.59µs min=25.7µs  med=63.84µs max=27.81ms  p(90)=904.92µs p(95)=1.6ms
     http_req_sending...............: avg=93.63µs  min=27.28µs med=46.59µs max=17.2ms   p(90)=80.52µs  p(95)=149.81µs
     http_req_tls_handshaking.......: avg=9.09µs   min=0s      med=0s      max=20.01ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=27.26ms  min=0s      med=13.81ms max=140.46ms p(90)=61.72ms  p(95)=67.36ms
     http_reqs......................: 26060   434.214117/s
     iteration_duration.............: avg=28.02ms  min=6.44ms  med=14.55ms max=141.4ms  p(90)=63.08ms  p(95)=68.98ms
     iterations.....................: 26060   434.214117/s
     vus............................: 1       min=1        max=32
     vus_max........................: 33      min=33       max=33
```
</details>

##### Stress

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 9 },
    { duration: '10s', target: 33 },
    { duration: '10s', target: 40 },
    { duration: '10s', target: 20 },
    { duration: '5s', target: 10 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 40 max VUs, 1m25s max duration (incl. graceful stop):
           * default: Up to 40 looping VUs for 55s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m55.0s), 00/40 VUs, 30483 complete and 0 interrupted iterations
default ✓ [======================================] 00/40 VUs  55s

     ✓ 메인페이지가 정상적으로 응답함

     checks.........................: 100.00% ✓ 30483      ✗ 0
     data_received..................: 42 MB   754 kB/s
     data_sent......................: 1.1 MB  20 kB/s
     http_req_blocked...............: avg=22.86µs  min=2.07µs  med=2.76µs   max=41.11ms  p(90)=2.95µs  p(95)=3.07µs
     http_req_connecting............: avg=4.15µs   min=0s      med=0s       max=14.69ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=33.49ms  min=6.71ms  med=17.88ms  max=157.11ms p(90)=77.34ms p(95)=82.46ms
       { expected_response:true }...: avg=33.49ms  min=6.71ms  med=17.88ms  max=157.11ms p(90)=77.34ms p(95)=82.46ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 30483
     http_req_receiving.............: avg=793.22µs min=23.93µs med=144.33µs max=37.43ms  p(90)=2.11ms  p(95)=3.31ms
     http_req_sending...............: avg=108.54µs min=26.65µs med=44.52µs  max=27.03ms  p(90)=83.55µs p(95)=184.48µs
     http_req_tls_handshaking.......: avg=11.58µs  min=0s      med=0s       max=36.54ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=32.58ms  min=0s      med=16.66ms  max=154.85ms p(90)=75.78ms p(95)=80.68ms
     http_reqs......................: 30483   554.133998/s
     iteration_duration.............: avg=33.8ms   min=6.92ms  med=18.25ms  max=157.42ms p(90)=77.62ms p(95)=82.73ms
     iterations.....................: 30483   554.133998/s
     vus............................: 1       min=1        max=40
     vus_max........................: 40      min=40       max=40
```
</details>

#### 데이터를 갱신하는 페이지
##### Smoke

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
  http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 로그인_토큰 = 로그인_요청();
  로그인_확인(로그인_토큰);

  let 유저정보_변경_결과 = 유저정보_변경_요청(로그인_토큰, 30);
  유저정보_변경_결과확인(유저정보_변경_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

export function 로그인_요청() {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_확인(로그인_토큰) {
  check(로그인_토큰, {
    '로그인페이지가 정상적으로 응답함': (response) => response.status === 200,
    '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
  });
}

export function 유저정보_변경_요청(로그인_토큰, 변경된나이) {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${로그인_토큰.json('accessToken')}`,
    },
  };

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: 변경된나이,
  });

  return http.put(`${BASE_URL}//members/me`, payload, params);
}

export function 유저정보_변경_결과확인(유저정보_변경_결과) {
  check(유저정보_변경_결과, {
    '유저정보가 정상적으로 변경됨': (response) => response.status === 200
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

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


running (10.1s), 0/1 VUs, 96 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 메인페이지가 정상적으로 응답함
     ✓ 로그인페이지가 정상적으로 응답함
     ✓ 로그인이 정상적으로 처리됨
     ✓ 유저정보가 정상적으로 변경됨

     checks.........................: 100.00% ✓ 384       ✗ 0
     data_received..................: 213 kB  21 kB/s
     data_sent......................: 26 kB   2.6 kB/s
     http_req_blocked...............: avg=71.68µs  min=2.58µs  med=2.99µs   max=19.77ms  p(90)=3.17µs   p(95)=3.26µs
     http_req_connecting............: avg=3.36µs   min=0s      med=0s       max=968.7µs  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=34.59ms  min=7.96ms  med=44.27ms  max=65.02ms  p(90)=49.09ms  p(95)=51.64ms
       { expected_response:true }...: avg=34.59ms  min=7.96ms  med=44.27ms  max=65.02ms  p(90)=49.09ms  p(95)=51.64ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 288
     http_req_receiving.............: avg=72.79µs  min=46.49µs med=66.64µs  max=861.97µs p(90)=82.42µs  p(95)=85.02µs
     http_req_sending...............: avg=79.11µs  min=57.52µs med=76.97µs  max=175.57µs p(90)=92.49µs  p(95)=96.43µs
     http_req_tls_handshaking.......: avg=62.81µs  min=0s      med=0s       max=18.09ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=34.43ms  min=7.84ms  med=44.12ms  max=64.85ms  p(90)=48.93ms  p(95)=51.47ms
     http_reqs......................: 288     28.599525/s
     iteration_duration.............: avg=104.84ms min=96.64ms med=103.11ms max=132.08ms p(90)=112.13ms p(95)=114.52ms
     iterations.....................: 96      9.533175/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1
```
</details>

##### Load

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '10s', target: 1 },
    { duration: '10s', target: 4 },
    { duration: '20s', target: 13 },
    { duration: '10s', target: 4 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 로그인_토큰 = 로그인_요청();
  로그인_확인(로그인_토큰);

  let 유저정보_변경_결과 = 유저정보_변경_요청(로그인_토큰, 30);
  유저정보_변경_결과확인(유저정보_변경_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

export function 로그인_요청() {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_확인(로그인_토큰) {
  check(로그인_토큰, {
    '로그인페이지가 정상적으로 응답함': (response) => response.status === 200,
    '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
  });
}

export function 유저정보_변경_요청(로그인_토큰, 변경된나이) {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${로그인_토큰.json('accessToken')}`,
    },
  };

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: 변경된나이,
  });

  return http.put(`${BASE_URL}//members/me`, payload, params);
}

export function 유저정보_변경_결과확인(유저정보_변경_결과) {
  check(유저정보_변경_결과, {
    '유저정보가 정상적으로 변경됨': (response) => response.status === 200
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 13 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 13 looping VUs for 1m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.1s), 00/13 VUs, 1376 complete and 0 interrupted iterations
default ✓ [======================================] 00/13 VUs  1m0s

     ✓ 메인페이지가 정상적으로 응답함
     ✓ 로그인페이지가 정상적으로 응답함
     ✓ 로그인이 정상적으로 처리됨
     ✓ 유저정보가 정상적으로 변경됨

     checks.........................: 100.00% ✓ 5504      ✗ 0
     data_received..................: 3.1 MB  51 kB/s
     data_sent......................: 393 kB  6.5 kB/s
     http_req_blocked...............: avg=37.42µs  min=1.56µs  med=2.93µs   max=30.5ms   p(90)=3.14µs   p(95)=3.25µs
     http_req_connecting............: avg=7.48µs   min=0s      med=0s       max=3.28ms   p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=73.95ms  min=6.94ms  med=53.86ms  max=333.59ms p(90)=167.62ms p(95)=188.83ms
       { expected_response:true }...: avg=73.95ms  min=6.94ms  med=53.86ms  max=333.59ms p(90)=167.62ms p(95)=188.83ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 4128
     http_req_receiving.............: avg=64.75µs  min=23.72µs med=57.23µs  max=2.29ms   p(90)=80.3µs   p(95)=91.42µs
     http_req_sending...............: avg=78.89µs  min=34.75µs med=71.71µs  max=3.34ms   p(90)=90.5µs   p(95)=100.79µs
     http_req_tls_handshaking.......: avg=23.53µs  min=0s      med=0s       max=20.11ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=73.8ms   min=6.8ms   med=53.65ms  max=333.48ms p(90)=167.49ms p(95)=188.67ms
     http_reqs......................: 4128    68.740045/s
     iteration_duration.............: avg=222.77ms min=99.43ms med=199.71ms max=542.18ms p(90)=369.07ms p(95)=404.9ms
     iterations.....................: 1376    22.913348/s
     vus............................: 1       min=1       max=13
     vus_max........................: 13      min=13      max=13

ERRO[0061] some thresholds have failed
```
</details>

##### Stress

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 4 },
    { duration: '10s', target: 13 },
    { duration: '10s', target: 20 },
    { duration: '10s', target: 13 },
    { duration: '5s', target: 8 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
  http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 로그인_토큰 = 로그인_요청();
  로그인_확인(로그인_토큰);

  let 유저정보_변경_결과 = 유저정보_변경_요청(로그인_토큰, 30);
  유저정보_변경_결과확인(유저정보_변경_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

export function 로그인_요청() {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_확인(로그인_토큰) {
  check(로그인_토큰, {
    '로그인페이지가 정상적으로 응답함': (response) => response.status === 200,
    '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
  });
}

export function 유저정보_변경_요청(로그인_토큰, 변경된나이) {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${로그인_토큰.json('accessToken')}`,
    },
  };

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: 변경된나이,
  });

  return http.put(`${BASE_URL}//members/me`, payload, params);
}

export function 유저정보_변경_결과확인(유저정보_변경_결과) {
  check(유저정보_변경_결과, {
    '유저정보가 정상적으로 변경됨': (response) => response.status === 200
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 20 max VUs, 1m25s max duration (incl. graceful stop):
           * default: Up to 20 looping VUs for 55s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m55.1s), 00/20 VUs, 1459 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  55s

     ✓ 메인페이지가 정상적으로 응답함
     ✓ 로그인페이지가 정상적으로 응답함
     ✓ 로그인이 정상적으로 처리됨
     ✓ 유저정보가 정상적으로 변경됨

     checks.........................: 100.00% ✓ 5836      ✗ 0
     data_received..................: 3.3 MB  59 kB/s
     data_sent......................: 444 kB  8.1 kB/s
     http_req_blocked...............: avg=50.65µs  min=0s      med=2.9µs    max=25.32ms  p(90)=3.09µs   p(95)=3.2µs
     http_req_connecting............: avg=9.77µs   min=0s      med=0s       max=3.14ms   p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=120.41ms min=7.37ms  med=89.5ms   max=468.64ms p(90)=285.71ms p(95)=306.15ms
       { expected_response:true }...: avg=120.41ms min=7.37ms  med=89.5ms   max=468.64ms p(90)=285.71ms p(95)=306.15ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 4377
     http_req_receiving.............: avg=63.69µs  min=23.34µs med=53.94µs  max=3.42ms   p(90)=78.02µs  p(95)=90.29µs
     http_req_sending...............: avg=75.7µs   min=35.21µs med=69.12µs  max=1.7ms    p(90)=89.18µs  p(95)=100.8µs
     http_req_tls_handshaking.......: avg=36.51µs  min=0s      med=0s       max=24.18ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=120.27ms min=7.28ms  med=89.36ms  max=468.47ms p(90)=285.59ms p(95)=305.97ms
     http_reqs......................: 4377    79.471014/s
     iteration_duration.............: avg=362.18ms min=94.78ms med=360.67ms max=816.27ms p(90)=603.77ms p(95)=640.43ms
     iterations.....................: 1459    26.490338/s
     vus............................: 1       min=1       max=20
     vus_max........................: 20      min=20      max=20

ERRO[0056] some thresholds have failed
```
</details>

#### 데이터를 조회하는데 여러 데이터를 참조하는 페이지
##### Smoke

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../config/TestInfo.js';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 경로탐색_요청_결과 = 경로탐색_요청(150, 250)
  경로탐색_결과_확인(경로탐색_요청_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

export function 경로탐색_요청(출발역, 도착역) {

  return http.get(`${BASE_URL}/paths?source=` + 출발역 + `&target=` + 도착역 );
}

export function 경로탐색_결과_확인(경로_검색_결과) {
  check(경로_검색_결과, {
    '경로가 정상적으로 검색됨': (response) => response.json('stations').length > 0
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

```base

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


running (10.1s), 0/1 VUs, 71 complete and 0 interrupted iterations
default ↓ [======================================] 1 VUs  10s

     ✓ 메인페이지가 정상적으로 응답함
     ✓ 경로가 정상적으로 검색됨

     checks.........................: 100.00% ✓ 142       ✗ 0
     data_received..................: 317 kB  32 kB/s
     data_sent......................: 5.7 kB  562 B/s
     http_req_blocked...............: avg=147.61µs min=2.79µs   med=2.96µs   max=20.54ms  p(90)=3.07µs   p(95)=3.15µs
     http_req_connecting............: avg=14.23µs  min=0s       med=0s       max=2.02ms   p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=70.35ms  min=10.49ms  med=85.69ms  max=475.38ms p(90)=131.47ms p(95)=151.2ms
       { expected_response:true }...: avg=70.35ms  min=10.49ms  med=85.69ms  max=475.38ms p(90)=131.47ms p(95)=151.2ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 142
     http_req_receiving.............: avg=70.71µs  min=43.62µs  med=73.51µs  max=104.16µs p(90)=85.19µs  p(95)=86.94µs
     http_req_sending...............: avg=63.48µs  min=46.46µs  med=58.88µs  max=474.6µs  p(90)=67.53µs  p(95)=74.35µs
     http_req_tls_handshaking.......: avg=125.34µs min=0s       med=0s       max=17.79ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=70.22ms  min=10.38ms  med=85.54ms  max=475.23ms p(90)=131.34ms p(95)=151.03ms
     http_reqs......................: 142     14.125366/s
     iteration_duration.............: avg=141.55ms min=115.92ms med=127.51ms max=519.64ms p(90)=168.52ms p(95)=196.73ms
     iterations.....................: 71      7.062683/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1

ERRO[0011] some thresholds have failed
```
</details>

##### Load

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '10s', target: 1 },
    { duration: '10s', target: 5 },
    { duration: '20s', target: 18 },
    { duration: '10s', target: 5 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 경로탐색_요청_결과 = 경로탐색_요청(150, 250)
  경로탐색_결과_확인(경로탐색_요청_결과);
};

function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

function 경로탐색_요청(출발역, 도착역) {
  return http.get(`${BASE_URL}/paths?source=` + 출발역 + `&target=` + 도착역 );
}

function 경로탐색_결과_확인(경로_검색_결과) {
  check(경로_검색_결과, {
    '경로가 정상적으로 검색됨': (response) => response.json('stations').length > 0
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 18 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 18 looping VUs for 1m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.1s), 00/18 VUs, 729 complete and 0 interrupted iterations
default ✓ [======================================] 00/18 VUs  1m0s

     ✓ 메인페이지가 정상적으로 응답함
     ✓ 경로가 정상적으로 검색됨

     checks.........................: 100.00% ✓ 1458      ✗ 0
     data_received..................: 3.3 MB  55 kB/s
     data_sent......................: 62 kB   1.0 kB/s
     http_req_blocked...............: avg=134.75µs min=2.17µs   med=2.99µs   max=56.42ms p(90)=3.16µs   p(95)=3.25µs
     http_req_connecting............: avg=24.2µs   min=0s       med=0s       max=5.32ms  p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=282.27ms min=7.25ms   med=103.35ms max=1.58s   p(90)=963.67ms p(95)=1.14s
       { expected_response:true }...: avg=282.27ms min=7.25ms   med=103.35ms max=1.58s   p(90)=963.67ms p(95)=1.14s
     http_req_failed................: 0.00%   ✓ 0         ✗ 1458
     http_req_receiving.............: avg=75.07µs  min=35.07µs  med=72.63µs  max=1.34ms  p(90)=88.28µs  p(95)=100.96µs
     http_req_sending...............: avg=64.63µs  min=37.03µs  med=59.51µs  max=2.21ms  p(90)=70.04µs  p(95)=75.68µs
     http_req_tls_handshaking.......: avg=79.4µs   min=0s       med=0s       max=17.34ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=282.13ms min=7.14ms   med=103.2ms  max=1.58s   p(90)=963.55ms p(95)=1.14s
     http_reqs......................: 1458    24.264627/s
     iteration_duration.............: avg=565.38ms min=111.15ms med=482.31ms max=1.59s   p(90)=1.16s    p(95)=1.28s
     iterations.....................: 729     12.132314/s
     vus............................: 1       min=1       max=18
     vus_max........................: 18      min=18      max=18

ERRO[0061] some thresholds have failed
```
</details>

##### Stress

<details><summary>스크립트 보기</summary>

```bash
import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 5 },
    { duration: '10s', target: 18 },
    { duration: '10s', target: 25 },
    { duration: '10s', target: 18 },
    { duration: '5s', target: 5 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 경로탐색_요청_결과 = 경로탐색_요청(150, 250)
  경로탐색_결과_확인(경로탐색_요청_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

export function 경로탐색_요청(출발역, 도착역) {
  return http.get(`${BASE_URL}/paths?source=` + 출발역 + `&target=` + 도착역);
}

export function 경로탐색_결과_확인(경로_검색_결과) {
  check(경로_검색_결과, {
    '경로가 정상적으로 검색됨': (response) => response.json('stations').length > 0
  });
}
```
</details>

<details><summary>스크립트 실행 결과 보기</summary>

```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 25 max VUs, 1m25s max duration (incl. graceful stop):
           * default: Up to 25 looping VUs for 55s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m55.1s), 00/25 VUs, 712 complete and 0 interrupted iterations
default ✓ [======================================] 00/25 VUs  55s

     ✓ 메인페이지가 정상적으로 응답함
     ✓ 경로가 정상적으로 검색됨

     checks.........................: 100.00% ✓ 1424     ✗ 0
     data_received..................: 3.2 MB  59 kB/s
     data_sent......................: 65 kB   1.2 kB/s
     http_req_blocked...............: avg=152.89µs min=2.47µs   med=3.04µs   max=26.75ms p(90)=3.23µs  p(95)=3.32µs
     http_req_connecting............: avg=34.73µs  min=0s       med=0s       max=4.72ms  p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=462.04ms min=7.35ms   med=67.82ms  max=2.13s   p(90)=1.53s   p(95)=1.71s
       { expected_response:true }...: avg=462.04ms min=7.35ms   med=67.82ms  max=2.13s   p(90)=1.53s   p(95)=1.71s
     http_req_failed................: 0.00%   ✓ 0        ✗ 1424
     http_req_receiving.............: avg=74.39µs  min=31.76µs  med=68.53µs  max=1.81ms  p(90)=89.78µs p(95)=100.2µs
     http_req_sending...............: avg=63.22µs  min=39.71µs  med=58.54µs  max=1.48ms  p(90)=69.75µs p(95)=78.53µs
     http_req_tls_handshaking.......: avg=110.73µs min=0s       med=0s       max=19.87ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=461.9ms  min=7.25ms   med=67.58ms  max=2.13s   p(90)=1.53s   p(95)=1.71s
     http_reqs......................: 1424    25.84538/s
     iteration_duration.............: avg=924.92ms min=109.36ms med=963.34ms max=2.14s   p(90)=1.72s   p(95)=1.85s
     iterations.....................: 712     12.92269/s
     vus............................: 1       min=1      max=25
     vus_max........................: 25      min=25     max=25

ERRO[0056] some thresholds have failed
```
</details>

