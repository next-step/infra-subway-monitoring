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

###### 네이버 지하철 찾기 페이지를 기준으로 설정하였습니다.

##### 정량 기반 지표
- 이미지 파일 최대 크기 : 5MB
- 웹 글꼴 최대 크기 : 1MB
- 웹 글꼴 최대 갯수 : 3개
- 스크립트 최대 크기 : 1MB
- 스크립트 갯수 : 10개

##### 시간 지표
- FCP : 3초
- LCP : 6초

##### 규칙 기반 지표
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
- 최대 동시사용자수 : 3500명 -> 하루평균 지하철 수송 인원 500만명이라 가정(https://www.edaily.co.kr/news/read?newsId=02958566629111568&mediaCodeNo=257&OutLnkChk=Y)하였을 때 러시아워인 출퇴근 시간대의 이용객이 전체의 1/3이므로(http://www.job-post.co.kr/news/articleView.html?idxno=27248) 출근시간대에는 약 90만명이 지하철을 이용한다고 가정할 수 있다. 출근시간이 6~9시라고 가정을 하면 1시간 동안 평균 30만명이므로 최대 40만명이라고 잡을 수 있고 앱 이용시간을 30초로 잡았을 때 40만명/60분/2인 3500명 정도가 동시에 이용한다고 가정할 수 있다.
- Latency : 50ms
- throughput : 500TPS -> 3500명이 분산해서 사용하므로 TPS는 500로 잡았다.

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 데이터를 조회하는데 여러 데이터를 참조하는 페이지인 지하철 역 관리 페이지를 대상으로 테스트를 진행하였습니다.

##### Smoke Test

```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  vus: 1, 
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
    { duration: "5s", target: 20 },
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


running (0m33.3s), 000/100 VUs, 566 complete and 0 interrupted iterations
default ↓ [======================================] 061/100 VUs  30s

     ✓ get stations successfully

     checks.........................: 100.00% ✓ 566       ✗ 0    
     data_received..................: 41 MB   1.2 MB/s
     data_sent......................: 103 kB  3.1 kB/s
     http_req_blocked...............: avg=1.56ms   min=4.06µs   med=6.25µs max=37.02ms p(90)=5.61ms   p(95)=8.95ms  
     http_req_connecting............: avg=212.86µs min=0s       med=0s     max=9.35ms  p(90)=697.26µs p(95)=948.76µs
   ✗ http_req_duration..............: avg=4.94s    min=101.43ms med=5.71s  max=10.98s  p(90)=5.94s    p(95)=5.98s   
       { expected_response:true }...: avg=4.94s    min=101.43ms med=5.71s  max=10.98s  p(90)=5.94s    p(95)=5.98s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 566  
     http_req_receiving.............: avg=14.89ms  min=141.35µs med=11.2ms max=92.68ms p(90)=31.45ms  p(95)=38.91ms 
     http_req_sending...............: avg=41.73µs  min=12.43µs  med=23.7µs max=2.62ms  p(90)=79.65µs  p(95)=103.74µs
     http_req_tls_handshaking.......: avg=1.3ms    min=0s       med=0s     max=29.27ms p(90)=4.78ms   p(95)=7.06ms  
     http_req_waiting...............: avg=4.92s    min=96.06ms  med=5.69s  max=10.97s  p(90)=5.92s    p(95)=5.97s   
     http_reqs......................: 566     16.994446/s
     iteration_duration.............: avg=4.94s    min=115.08ms med=5.71s  max=10.98s  p(90)=5.94s    p(95)=5.98s   
     iterations.....................: 566     16.994446/s
     vus............................: 11      min=11      max=100
     vus_max........................: 100     min=100     max=100

ERRO[0034] some thresholds have failed 
```

##### Stress Test

```js
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 200 },
    { duration: "10s", target: 100 },
    { duration: "15s", target: 300 },
    { duration: "10s", target: 150 },
    { duration: "5s", target: 100 },
    { duration: "10s", target: 200 },
    { duration: "5s", target: 100 },
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

running (1m35.0s), 000/300 VUs, 19018 complete and 75 interrupted iterations
default ✓ [======================================] 033/300 VUs  1m5s

     ✗ get stations successfully
      ↳  1% — ✓ 301 / ✗ 18717

     checks.........................: 1.58%  ✓ 301        ✗ 18717
     data_received..................: 39 MB  414 kB/s
     data_sent......................: 6.0 MB 64 kB/s
     http_req_blocked...............: avg=5.68ms   min=0s       med=0s      max=315.8ms  p(90)=10.03ms p(95)=28.05ms 
     http_req_connecting............: avg=10.9ms   min=0s       med=4ms     max=154.47ms p(90)=30.02ms p(95)=40.36ms 
   ✗ http_req_duration..............: avg=729.89ms min=0s       med=0s      max=50.69s   p(90)=1.76ms  p(95)=5.99ms  
       { expected_response:true }...: avg=16.18s   min=274.04ms med=6.25s   max=50.69s   p(90)=40.71s  p(95)=45.69s  
     http_req_failed................: 98.41% ✓ 18717      ✗ 301  
     http_req_receiving.............: avg=346.05µs min=0s       med=0s      max=102.77ms p(90)=87.79µs p(95)=236.28µs
     http_req_sending...............: avg=285.81µs min=0s       med=0s      max=53.82ms  p(90)=70.13µs p(95)=163.21µs
     http_req_tls_handshaking.......: avg=4.44ms   min=0s       med=0s      max=288.15ms p(90)=8.37ms  p(95)=23.46ms 
     http_req_waiting...............: avg=729.25ms min=0s       med=0s      max=50.68s   p(90)=1.16ms  p(95)=2.09ms  
     http_reqs......................: 19018  200.150926/s
     iteration_duration.............: avg=752.08ms min=1.08ms   med=13.54ms max=50.69s   p(90)=60.17ms p(95)=109.42ms
     iterations.....................: 19018  200.150926/s
     vus............................: 33     min=20       max=300
     vus_max........................: 300    min=300      max=300

ERRO[0097] some thresholds have failed  
```