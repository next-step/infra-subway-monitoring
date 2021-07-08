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

- 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기

1. 각 서버내 로깅 경로를 알려주세요

- 앱 로그 : /home/ubuntu/app/infra-subway-monitoring/log.out
- nginx 로그 : /var/log/nginx/access.log
- 서비스 url : http://www.insup.kro.kr/

2. Cloudwatch 대시보드 URL을 알려주세요

- https://ap-northeast-2.console.aws.amazon.com/systems-manager/resource-groups/cloudwatch?region=ap-northeast-2&dashboard=DASHBOARD-jis1218

---

### 2단계 - 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 정량 기반 지표
- 이미지 파일 최대 크기 : 3MB
- 웹 글꼴 최대 크기 : 0.1MB
- 웹 글꼴 최대 갯수 : 10개
- 스크립트 최대 크기 : 1MB
- 스크립트 갯수 : 2개

- 시간 지표
- FCP : 6초
- LCP : 6초

- 규칙 기반 지표
- WebPageTest
- First Byte Time : A
- Keep-alive Enabled : A
- Compress Transfer : A
- Compress Images : A
- Cache static Content : A

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- gzip 압축, 이미지 압축, 정적 컨텐츠 캐싱

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 대상 시스템 범위 : 지하철 역 관리
- 동시사용자수 : 4만명, Latency : 50ms, throughput : 1000TPS

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 데이터를 조회하는데 여러 데이터를 참조하는 페이지인 지하철 역 관리 페이지를 대상으로 테스트를 진행하였습니다.

##### Smoke Test

```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "10s",

  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = "https://insup.kro.kr";

export default function () {
  let stationsRes = http.get(`${BASE_URL}/stations`);

  check(stationsRes, {
    "get stations successfully": (response) => response.status === 200,
  });
}
```

```
  execution: local
    script: smokestations.js
    output: -

 scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
          * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.1s), 0/1 VUs, 166 complete and 0 interrupted iterations
default ↓ [======================================] 1 VUs  10s

    ✓ get stations successfully

    checks.........................: 100.00% ✓ 166       ✗ 0
    data_received..................: 12 MB   1.2 MB/s
    data_sent......................: 20 kB   1.9 kB/s
    http_req_blocked...............: avg=215.55µs min=5.2µs    med=5.82µs  max=34.75ms  p(90)=6.36µs  p(95)=6.81µs
    http_req_connecting............: avg=2.92µs   min=0s       med=0s      max=486.32µs p(90)=0s      p(95)=0s
  ✓ http_req_duration..............: avg=60.2ms   min=46.12ms  med=52.22ms max=133.39ms p(90)=86.53ms p(95)=95.2ms
      { expected_response:true }...: avg=60.2ms   min=46.12ms  med=52.22ms max=133.39ms p(90)=86.53ms p(95)=95.2ms
    http_req_failed................: 0.00%   ✓ 0         ✗ 166
    http_req_receiving.............: avg=2.79ms   min=491.79µs med=2.52ms  max=12.24ms  p(90)=3.53ms  p(95)=4.8ms
    http_req_sending...............: avg=23.27µs  min=17.11µs  med=19.23µs max=345.09µs p(90)=24.81µs p(95)=30.67µs
    http_req_tls_handshaking.......: avg=168.98µs min=0s       med=0s      max=28.05ms  p(90)=0s      p(95)=0s
    http_req_waiting...............: avg=57.39ms  min=44.5ms   med=49.22ms max=129.99ms p(90)=83.3ms  p(95)=92.65ms
    http_reqs......................: 166     16.490364/s
    iteration_duration.............: avg=60.61ms  min=46.3ms   med=52.41ms max=133.58ms p(90)=87.77ms p(95)=95.4ms
    iterations.....................: 166     16.490364/s
    vus............................: 1       min=1       max=1
    vus_max........................: 1       min=1       max=1
```

##### Load Test

```js
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "5s", target: 100 },
    { duration: "20s", target: 100 },
    { duration: "5s", target: 0 },
  ],

  thresholds: {
    http_req_duration: ["p(99)<5500"],
  },
};

const BASE_URL = "https://insup.kro.kr";

export default function () {
  let stationsRes = http.get(`${BASE_URL}/stations`);

  check(stationsRes, {
    "get stations successfully": (response) => response.status === 200,
  });
}
```

```
  execution: local
     script: loadstations.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m32.5s), 000/100 VUs, 590 complete and 0 interrupted iterations
default ↓ [======================================] 054/100 VUs  30s

     ✓ get stations successfully

     checks.........................: 100.00% ✓ 590       ✗ 0
     data_received..................: 43 MB   1.3 MB/s
     data_sent......................: 105 kB  3.2 kB/s
     http_req_blocked...............: avg=2.41ms   min=4.07µs   med=5.89µs  max=114.94ms p(90)=5.75ms   p(95)=11.46ms
     http_req_connecting............: avg=567.38µs min=0s       med=0s      max=42.56ms  p(90)=550.51µs p(95)=802.95µs
   ✗ http_req_duration..............: avg=4.64s    min=164.18ms med=5.25s   max=10.42s   p(90)=5.54s    p(95)=5.64s
       { expected_response:true }...: avg=4.64s    min=164.18ms med=5.25s   max=10.42s   p(90)=5.54s    p(95)=5.64s
     http_req_failed................: 0.00%   ✓ 0         ✗ 590
     http_req_receiving.............: avg=13.85ms  min=171.61µs med=9.89ms  max=91.78ms  p(90)=27.87ms  p(95)=39.64ms
     http_req_sending...............: avg=215.45µs min=11.47µs  med=20.63µs max=48.23ms  p(90)=65.61µs  p(95)=81.01µs
     http_req_tls_handshaking.......: avg=1.79ms   min=0s       med=0s      max=79.95ms  p(90)=4.46ms   p(95)=9.15ms
     http_req_waiting...............: avg=4.63s    min=145.67ms med=5.23s   max=10.41s   p(90)=5.53s    p(95)=5.61s
     http_reqs......................: 590     18.154633/s
     iteration_duration.............: avg=4.64s    min=168.69ms med=5.25s   max=10.42s   p(90)=5.54s    p(95)=5.64s
     iterations.....................: 590     18.154633/s
     vus............................: 17      min=17      max=100
     vus_max........................: 100     min=100     max=100

ERRO[0034] some thresholds have failed
```

##### Stress Test

```js
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "5s", target: 100 },
    { duration: "10s", target: 100 },
    { duration: "5s", target: 200 },
    { duration: "10s", target: 200 },
    { duration: "5s", target: 300 },
    { duration: "10s", target: 300 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<7500"],
  },
};

const BASE_URL = "https://insup.kro.kr";

export default function () {
  let stationsRes = http.get(`${BASE_URL}/stations`);

  check(stationsRes, {
    "get stations successfully": (response) => response.status === 200,
  });
}
```
```
  execution: local
     script: stressstations.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 1m20s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 50s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (1m01.7s), 000/300 VUs, 5136 complete and 0 interrupted iterations
default ✗ [======================================] 000/300 VUs  50s

     ✗ get stations successfully
      ↳  19% — ✓ 1027 / ✗ 4109

     checks.........................: 19.99% ✓ 1027      ✗ 4109 
     data_received..................: 78 MB  1.3 MB/s
     data_sent......................: 1.5 MB 24 kB/s
     http_req_blocked...............: avg=8.66ms   min=0s       med=0s       max=550.43ms p(90)=19.59ms p(95)=59.96ms 
     http_req_connecting............: avg=33.15ms  min=0s       med=19.97ms  max=307.5ms  p(90)=82.86ms p(95)=116.87ms
   ✗ http_req_duration..............: avg=2s       min=0s       med=0s       max=27.75s   p(90)=9.89s   p(95)=14.76s  
       { expected_response:true }...: avg=10s      min=116.04ms med=9.91s    max=27.75s   p(90)=16.74s  p(95)=17.59s  
     http_req_failed................: 80.00% ✓ 4109      ✗ 1027 
     http_req_receiving.............: avg=4.22ms   min=0s       med=0s       max=456.24ms p(90)=11.71ms p(95)=24.05ms 
     http_req_sending...............: avg=438.25µs min=0s       med=0s       max=183.27ms p(90)=61.31µs p(95)=149.08µs
     http_req_tls_handshaking.......: avg=6.74ms   min=0s       med=0s       max=430.02ms p(90)=12.35ms p(95)=43.91ms 
     http_req_waiting...............: avg=1.99s    min=0s       med=0s       max=27.74s   p(90)=9.86s   p(95)=14.76s  
     http_reqs......................: 5136   83.289462/s
     iteration_duration.............: avg=2.13s    min=1.19ms   med=182.99ms max=27.76s   p(90)=9.9s    p(95)=14.8s   
     iterations.....................: 5136   83.289462/s
     vus............................: 16     min=16      max=300
     vus_max........................: 300    min=300     max=300

ERRO[0063] some thresholds have failed   
