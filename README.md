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

### 로그 설정하기

- [X] Application Log 파일로 저장하기
  - 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
- [X] Nginx Access Log 설정하기


### Cloudwatch로 모니터링

- [X] Cloudwatch로 로그 수집하기
  - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/etff-sys
  - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/etff-error
  - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/etff-access

- [X] Cloudwatch로 메트릭 수집하기

1. 각 서버내 로깅 경로를 알려주세요

- 3.36.90.145 : public1 배포서버
  - /home/ubuntu/infra-subway-monitor/logs
- 13.124.202.83 : Nginx 서버
  - /var/log/nginx/

2. Cloudwatch 대시보드 URL을 알려주세요

- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-etff

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 지도서비스를 서비스중인 국내 N사와 비교
---   
### 성능지표
|   | 지하철노선도 | N사 |
|---|:---:|---:|
|First Contentful Paint|14.8초|  2.9 초  |
|Time to Interactive|15.5초|  6.5 초  | 
|Speed Index|14.8초|  7.5 초  |
|Total Blocking Time|650 밀리초|  240 밀리초  |
|Largest Contentful Paint|15.5초|  7.6 초  |
|Cumulative Layout Shift|0.047|  0.017  |

---
|   | 지하철노선도 | N사 |
|---|:---:|---:|
| First Byte Time | A | B |
| Keep-alive Enabled | A | A|
| Compress Transfer | F |F|
| Compress Images | A |A|
| Cache static content | C | B|
| Effective use of CDN | X | X
---
### 예산설정 (데스크탑 기준)
#### Lighthouse 점수항목 90점이상으로 설정
| 항목  | 수치 |
|---|:---:|
| First Contentful Paint | 880 ms |
| Keep-alive Enabled | 1200 ms |
| Compress Transfer | 1200 ms |
| Time to Interactive | 2400 ms |
| Total Blocking Time | 150 ms |
| Effective use of CDN | 0.05 |



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축기능 제공 : gzip 
- 사용하지 않는 자바스크립트 제거 : vendors.js, main.js
- 정적 자원에 캐시적용
- 웹폰트 로드 되는 동안 텍스트 표시하기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- Throughput
  - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
  - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
- 예상치 도출
  - 모바일&PC 국내 N사 지도의 6개월간 사용자 수 통계 [링크](https://www.similarweb.com/website/map.naver.com/?competitors=maps.google.co.kr)
  - 통계수치를 바탕으로 N사 하루 사용량 예상: 22만명 가량으로 예상
  - 경쟁업체를 기준으로 선정  
  - 사용자가 보통 5번씩 사용한다고 가정  
  - 1일 총 접속수: 22만명 * 5 = 110만회
  - 110,0000 / 86400 = 12rps
  - 1일 최대 rps: 12 * 100 / 10 = 120 rps
  - 사용자가 1분 내외로 사용한다고 가정.
  
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
---
### main, login, path으로 나눠 smoke, load, stress 테스트 진행 
- smoke (main)
```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "10s",

  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1s
  },
};

const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let main = http.get(`${BASE_URL}`);

  check(main, { "load main successfully ": (resp) => resp.status === 200 });
}


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


running (10.0s), 0/1 VUs, 1114 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ load main successfully

checks.........................: 100.00% ✓ 1114 ✗ 0
data_received..................: 1.3 MB  132 kB/s
data_sent......................: 88 kB   8.8 kB/s
http_req_blocked...............: avg=34.67µs min=1µs    med=3µs    max=17.9ms  p(90)=5µs    p(95)=6µs
http_req_connecting............: avg=28.77µs min=0s     med=0s     max=16.51ms p(90)=0s     p(95)=0s     
   ✓ http_req_duration..............: avg=8.76ms  min=6.81ms med=7.89ms max=20.62ms p(90)=9.97ms p(95)=17.68ms
{ expected_response:true }...: avg=8.76ms  min=6.81ms med=7.89ms max=20.62ms p(90)=9.97ms p(95)=17.68ms
http_req_failed................: 0.00%   ✓ 0    ✗ 1114
http_req_receiving.............: avg=67.23µs min=31µs   med=63µs   max=205µs   p(90)=94µs   p(95)=107µs
http_req_sending...............: avg=22.77µs min=10µs   med=18µs   max=2.4ms   p(90)=30µs   p(95)=33µs
http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s      p(90)=0s     p(95)=0s
http_req_waiting...............: avg=8.67ms  min=6.73ms med=7.8ms  max=20.54ms p(90)=9.87ms p(95)=17.51ms
http_reqs......................: 1114    111.377223/s
iteration_duration.............: avg=8.96ms  min=6.99ms med=8.05ms max=34.71ms p(90)=10.2ms p(95)=17.86ms
iterations.....................: 1114    111.377223/s
vus............................: 1       min=1  max=1
vus_max........................: 1       min=1  max=1 
```  
---
main(load)

```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";
export let options = {
  stages: [
    { duration: "30s", target: 120 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: "1m", target: 120 }, // stay at 100 users for 10 minutes
    { duration: "10s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.0s
  },
};
const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let main = http.get(`${BASE_URL}`);

  check(main, { "load main successfully ": (resp) => resp.status === 200 });
  sleep(1);
}


/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load1.js
output: -

        scenarios: (100.00%) 1 scenario, 120 max VUs, 2m10s max duration (incl. graceful stop):
* default: Up to 120 looping VUs for 1m40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m41.0s), 000/120 VUs, 9486 complete and 0 interrupted iterations
default ✓ [======================================] 000/120 VUs  1m40s

     ✓ load main successfully

checks.........................: 100.00% ✓ 9486  ✗ 0
data_received..................: 11 MB   111 kB/s
data_sent......................: 749 kB  7.4 kB/s
http_req_blocked...............: avg=90.64µs min=1µs    med=3µs     max=13.96ms  p(90)=6µs     p(95)=8µs
http_req_connecting............: avg=85.53µs min=0s     med=0s      max=13.37ms  p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=18.46ms min=6.7ms  med=11.17ms max=471.24ms p(90)=17.28ms p(95)=53.6ms
{ expected_response:true }...: avg=18.46ms min=6.7ms  med=11.17ms max=471.24ms p(90)=17.28ms p(95)=53.6ms
http_req_failed................: 0.00%   ✓ 0     ✗ 9486
http_req_receiving.............: avg=43.3µs  min=14µs   med=37µs    max=881µs    p(90)=67µs    p(95)=79µs
http_req_sending...............: avg=18.34µs min=5µs    med=14µs    max=1.29ms   p(90)=28µs    p(95)=40µs
http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
http_req_waiting...............: avg=18.4ms  min=6.63ms med=11.11ms max=471.13ms p(90)=17.22ms p(95)=53.52ms
http_reqs......................: 9486    93.945427/s
iteration_duration.............: avg=1.01s   min=1s     med=1.01s   max=1.47s    p(90)=1.01s   p(95)=1.05s
iterations.....................: 9486    93.945427/s
vus............................: 8       min=4   max=120
vus_max........................: 120     min=120 max=120


```
-main(stress)

```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";
export let options = {
  stages: [
    { duration: "30s", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "15s", target: 0 },
    { duration: "30s", target: 270 },
    { duration: "1m", target: 270 },
    { duration: "15s", target: 0 },
    { duration: "30", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};
const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";
export default function () {
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let mainRes = http.get(`${BASE_URL}`);
  check(mainRes, { "load main successfully ": (resp) => resp.status === 200 });
  sleep(1);
}

/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress.js
output: -

        scenarios: (100.00%) 1 scenario, 270 max VUs, 5m15s max duration (incl. graceful stop):
* default: Up to 270 looping VUs for 4m45.03s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (4m45.9s), 000/270 VUs, 39905 complete and 0 interrupted iterations
default ✓ [======================================] 000/270 VUs  4m45.03s

     ✓ load main successfully

checks.........................: 100.00% ✓ 39905 ✗ 0
data_received..................: 47 MB   165 kB/s
data_sent......................: 3.2 MB  11 kB/s
http_req_blocked...............: avg=63.94µs min=1µs    med=3µs     max=133.46ms p(90)=6µs     p(95)=7µs
http_req_connecting............: avg=59.4µs  min=0s     med=0s      max=133.37ms p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=15.24ms min=6.47ms med=10.93ms max=269.87ms p(90)=17.65ms p(95)=46.28ms
{ expected_response:true }...: avg=15.24ms min=6.47ms med=10.93ms max=269.87ms p(90)=17.65ms p(95)=46.28ms
http_req_failed................: 0.00%   ✓ 0     ✗ 39905
http_req_receiving.............: avg=43.53µs min=11µs   med=37µs    max=2.88ms   p(90)=67µs    p(95)=81µs
http_req_sending...............: avg=17.34µs min=5µs    med=13µs    max=1.2ms    p(90)=27µs    p(95)=36µs
http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
http_req_waiting...............: avg=15.18ms min=6.42ms med=10.86ms max=269.8ms  p(90)=17.6ms  p(95)=46.2ms
http_reqs......................: 39905   139.594383/s
iteration_duration.............: avg=1.01s   min=1s     med=1.01s   max=1.27s    p(90)=1.01s   p(95)=1.04s
iterations.....................: 39905   139.594383/s
vus............................: 6       min=4   max=270
vus_max........................: 270     min=270 max=270
```
login(smoke)
```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "10s",

  thresholds: {
    http_req_duration: ["p(99)< 1500"], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    "logged in successfully": (resp) => resp.json("accessToken") !== "",
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json("accessToken")}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { "retrieved member": (obj) => obj.id != 0 });
  sleep(1);
}

/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: smoke2.js
output: -

        scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 20  ✗ 0
data_received..................: 5.5 kB  518 B/s
data_sent......................: 4.4 kB  421 B/s
http_req_blocked...............: avg=660.3µs  min=2µs     med=4.5µs   max=13.1ms  p(90)=10.3µs  p(95)=667.75µs
http_req_connecting............: avg=628.65µs min=0s      med=0s      max=12.57ms p(90)=0s      p(95)=628.65µs
   ✓ http_req_duration..............: avg=23.44ms  min=11.61ms med=15.19ms max=83.31ms p(90)=43.72ms p(95)=82.88ms
{ expected_response:true }...: avg=23.44ms  min=11.61ms med=15.19ms max=83.31ms p(90)=43.72ms p(95)=82.88ms
http_req_failed................: 0.00%   ✓ 0   ✗ 20
http_req_receiving.............: avg=108.24µs min=44µs    med=66µs    max=690µs   p(90)=172.1µs p(95)=233.05µs
http_req_sending...............: avg=82.19µs  min=15µs    med=24.5µs  max=1.07ms  p(90)=62.2µs  p(95)=114.3µs
http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
http_req_waiting...............: avg=23.25ms  min=11.55ms med=15.08ms max=83.22ms p(90)=43.63ms p(95)=82.67ms
http_reqs......................: 20      1.903798/s
iteration_duration.............: avg=1.05s    min=1.02s   med=1.03s   max=1.09s   p(90)=1.09s   p(95)=1.09s
iterations.....................: 10      0.951899/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```
login(load)
```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.0s
  },
};
const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    "logged in successfully": (resp) => resp.json("accessToken") !== "",
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json("accessToken")}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { "retrieved member": (obj) => obj.id != 0 });
  sleep(1);
}

/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load2.js
output: -

        scenarios: (100.00%) 1 scenario, 120 max VUs, 2m10s max duration (incl. graceful stop):
* default: Up to 120 looping VUs for 1m40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m40.7s), 000/120 VUs, 9311 complete and 0 interrupted iterations
default ✓ [======================================] 000/120 VUs  1m40s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 18622 ✗ 0
data_received..................: 5.1 MB  50 kB/s
data_sent......................: 4.1 MB  41 kB/s
http_req_blocked...............: avg=41.17µs min=1µs    med=3µs     max=10.64ms  p(90)=5µs     p(95)=6µs
http_req_connecting............: avg=37.16µs min=0s     med=0s      max=10.57ms  p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=18.93ms min=8.54ms med=13.55ms max=265.03ms p(90)=26.83ms p(95)=40.18ms
{ expected_response:true }...: avg=18.93ms min=8.54ms med=13.55ms max=265.03ms p(90)=26.83ms p(95)=40.18ms
http_req_failed................: 0.00%   ✓ 0     ✗ 18622
http_req_receiving.............: avg=46.23µs min=16µs   med=40µs    max=3.11ms   p(90)=72µs    p(95)=86µs
http_req_sending...............: avg=19.55µs min=6µs    med=16µs    max=922µs    p(90)=30µs    p(95)=36µs
http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
http_req_waiting...............: avg=18.87ms min=8.46ms med=13.49ms max=264.98ms p(90)=26.77ms p(95)=40.09ms
http_reqs......................: 18622   184.861807/s
iteration_duration.............: avg=1.03s   min=1.01s  med=1.02s   max=1.38s    p(90)=1.05s   p(95)=1.08s
iterations.....................: 9311    92.430904/s
vus............................: 6       min=4   max=120
vus_max........................: 120     min=120 max=120

```
login(stress)
```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "15s", target: 0 },
    { duration: "30s", target: 270 },
    { duration: "1m", target: 270 },
    { duration: "15s", target: 0 },
    { duration: "30", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    "logged in successfully": (resp) => resp.json("accessToken") !== "",
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json("accessToken")}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { "retrieved member": (obj) => obj.id != 0 });
  sleep(1);
}


/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress2.js
output: -

        scenarios: (100.00%) 1 scenario, 270 max VUs, 5m15s max duration (incl. graceful stop):
* default: Up to 270 looping VUs for 4m45.03s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (4m45.3s), 000/270 VUs, 38942 complete and 0 interrupted iterations
default ✓ [======================================] 000/270 VUs  4m45.03s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 77884 ✗ 0
data_received..................: 21 MB   74 kB/s
data_sent......................: 17 MB   60 kB/s
http_req_blocked...............: avg=32.31µs min=1µs    med=3µs     max=137.77ms p(90)=5µs     p(95)=6µs
http_req_connecting............: avg=28.88µs min=0s     med=0s      max=137.7ms  p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=20.04ms min=8.22ms med=13.93ms max=565.07ms p(90)=26.31ms p(95)=41.33ms
{ expected_response:true }...: avg=20.04ms min=8.22ms med=13.93ms max=565.07ms p(90)=26.31ms p(95)=41.33ms
http_req_failed................: 0.00%   ✓ 0     ✗ 77884
http_req_receiving.............: avg=42.19µs min=12µs   med=36µs    max=2.17ms   p(90)=66µs    p(95)=78µs
http_req_sending...............: avg=18.51µs min=5µs    med=15µs    max=10.06ms  p(90)=28µs    p(95)=35µs
http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
http_req_waiting...............: avg=19.98ms min=8.15ms med=13.87ms max=565.01ms p(90)=26.24ms p(95)=41.25ms
http_reqs......................: 77884   272.969553/s
iteration_duration.............: avg=1.04s   min=1.01s  med=1.02s   max=1.75s    p(90)=1.05s   p(95)=1.09s
iterations.....................: 38942   136.484777/s
vus............................: 6       min=2   max=270
vus_max........................: 270     min=270 max=270
```
path(stress)
```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";
export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "10s",

  thresholds: {
    http_req_duration: ["p(99)< 1500"], // 99% of requests must complete below 1.5s
  },
};
const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let pathRes = http.get(`${BASE_URL}/paths/?source=1&target=3`);

  check(pathRes, { "path successfully ": (resp) => resp.status === 200 });
  sleep(1);
}

/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: smoke3.js
output: -

        scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ path successfully

checks.........................: 100.00% ✓ 10  ✗ 0
data_received..................: 5.4 kB  509 B/s
data_sent......................: 1.0 kB  98 B/s
http_req_blocked...............: avg=1.25ms  min=3µs     med=4µs     max=12.48ms p(90)=1.25ms   p(95)=6.86ms
http_req_connecting............: avg=1.21ms  min=0s      med=0s      max=12.17ms p(90)=1.21ms   p(95)=6.69ms  
   ✓ http_req_duration..............: avg=46.2ms  min=38.51ms med=44.27ms max=62.28ms p(90)=54.76ms  p(95)=58.52ms
{ expected_response:true }...: avg=46.2ms  min=38.51ms med=44.27ms max=62.28ms p(90)=54.76ms  p(95)=58.52ms
http_req_failed................: 0.00%   ✓ 0   ✗ 10
http_req_receiving.............: avg=157.9µs min=46µs    med=80.49µs max=863µs   p(90)=199.69µs p(95)=531.34µs
http_req_sending...............: avg=64.9µs  min=17µs    med=21.5µs  max=443µs   p(90)=78.49µs  p(95)=260.74µs
http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
http_req_waiting...............: avg=45.98ms min=38.38ms med=44.14ms max=62.2ms  p(90)=54.6ms   p(95)=58.4ms
http_reqs......................: 10      0.95187/s
iteration_duration.............: avg=1.05s   min=1.03s   med=1.04s   max=1.06s   p(90)=1.06s    p(95)=1.06s
iterations.....................: 10      0.95187/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```
path(load)
```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";
export let options = {
  stages: [
    { duration: "30s", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.0s
  },
};
const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let pathRes = http.get(`${BASE_URL}/paths/?source=1&target=3`);

  check(pathRes, { "path successfully ": (resp) => resp.status === 200 });
  sleep(1);
}

/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load3.js
output: -

        scenarios: (100.00%) 1 scenario, 120 max VUs, 2m10s max duration (incl. graceful stop):
* default: Up to 120 looping VUs for 1m40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m40.5s), 000/120 VUs, 9011 complete and 0 interrupted iterations
default ✓ [======================================] 000/120 VUs  1m40s

     ✓ path successfully

checks.........................: 100.00% ✓ 9011  ✗ 0
data_received..................: 4.8 MB  48 kB/s
data_sent......................: 928 kB  9.2 kB/s
http_req_blocked...............: avg=85.51µs min=1µs     med=4µs     max=13.49ms  p(90)=7µs     p(95)=8µs
http_req_connecting............: avg=79.81µs min=0s      med=0s      max=13.15ms  p(90)=0s      p(95)=0s      
   ✓ http_req_duration..............: avg=71.85ms min=33.13ms med=63.5ms  max=407.37ms p(90)=99.05ms p(95)=137.4ms
{ expected_response:true }...: avg=71.85ms min=33.13ms med=63.5ms  max=407.37ms p(90)=99.05ms p(95)=137.4ms
http_req_failed................: 0.00%   ✓ 0     ✗ 9011
http_req_receiving.............: avg=57.12µs min=17µs    med=51µs    max=8.26ms   p(90)=86µs    p(95)=98µs
http_req_sending...............: avg=21.13µs min=5µs     med=18µs    max=929µs    p(90)=32µs    p(95)=39µs
http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
http_req_waiting...............: avg=71.78ms min=33.07ms med=63.42ms max=407.31ms p(90)=98.97ms p(95)=137.31ms
http_reqs......................: 9011    89.672494/s
iteration_duration.............: avg=1.07s   min=1.03s   med=1.06s   max=1.4s     p(90)=1.09s   p(95)=1.13s
iterations.....................: 9011    89.672494/s
vus............................: 5       min=4   max=120
vus_max........................: 120     min=120 max=120
```
path(stress)
```javascript
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "15s", target: 0 },
    { duration: "30s", target: 270 },
    { duration: "1m", target: 270 },
    { duration: "15s", target: 0 },
    { duration: "30", target: 120 },
    { duration: "1m", target: 120 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = "http://13.124.202.83";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let pathRes = http.get(`${BASE_URL}/paths/?source=1&target=3`);

  check(pathRes, { "path successfully ": (resp) => resp.status === 200 });
  sleep(1);
}

/\      |‾‾| /‾‾/   /‾‾/   
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress3.js
output: -

        scenarios: (100.00%) 1 scenario, 270 max VUs, 5m15s max duration (incl. graceful stop):
* default: Up to 270 looping VUs for 4m45.03s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (4m46.1s), 000/270 VUs, 31285 complete and 0 interrupted iterations
default ✓ [======================================] 000/270 VUs  4m45.03s

     ✓ path successfully

checks.........................: 100.00% ✓ 31285 ✗ 0
data_received..................: 17 MB   58 kB/s
data_sent......................: 3.2 MB  11 kB/s
http_req_blocked...............: avg=88.33µs  min=1µs     med=4µs      max=152.84ms p(90)=6µs      p(95)=8µs
http_req_connecting............: avg=83.12µs  min=0s      med=0s       max=152.78ms p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=296.27ms min=32.58ms med=102.16ms max=1.89s    p(90)=694.28ms p(95)=728.47ms
{ expected_response:true }...: avg=296.27ms min=32.58ms med=102.16ms max=1.89s    p(90)=694.28ms p(95)=728.47ms
http_req_failed................: 0.00%   ✓ 0     ✗ 31285
http_req_receiving.............: avg=55.34µs  min=15µs    med=50µs     max=1.42ms   p(90)=83µs     p(95)=95µs
http_req_sending...............: avg=20.61µs  min=6µs     med=18µs     max=1.34ms   p(90)=30µs     p(95)=37µs
http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...............: avg=296.19ms min=32.5ms  med=102.08ms max=1.89s    p(90)=694.21ms p(95)=728.42ms
http_reqs......................: 31285   109.339632/s
iteration_duration.............: avg=1.29s    min=1.03s   med=1.1s     max=2.89s    p(90)=1.69s    p(95)=1.72s
iterations.....................: 31285   109.339632/s
vus............................: 1       min=1   max=270
vus_max........................: 270     min=270 max=270
```
