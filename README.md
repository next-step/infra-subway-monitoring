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
nginx : 15.164.169.22
logPath : /home/ubuntu/nginx/logs
WAS : https://prodo-subway.r-e.kr/
logPath : /home/ubuntu/infra-subway-deploy-main/logs

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-prodo-developer
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 투어 쇼핑몰을 서비스중인 국내 I사와 비교
---   
### 성능지표
|   | 지하철노선도 | I사 |
|---|:---:|---:|
|First Contentful Paint|14.6초|  4.2 초  |
|Time to Interactive|15.2초|  37.3 초  |
|Speed Index|14.6초|  13.5 초  |
|Total Blocking Time|560 밀리초|  2,450 밀리초  |
|Largest Contentful Paint|15.2초|  13.8 초  |
|Cumulative Layout Shift|0.041|  0.779  |

---
|   | 지하철노선도 | I사 |
|---|:---:|---:|
| First Byte Time | A | F |
| Keep-alive Enabled | A | A|
| Compress Transfer | F |F|
| Compress Images | A |B|
| Cache static content | C | F|
| Effective use of CDN | X | X
---
### 예산설정 (데스크탑 기준)
#### Lighthouse 점수항목 90점이상으로 설정
| 항목  | 수치 |
|---|:---:|
| First Contentful Paint | 1780 ms |
| Keep-alive Enabled | 3410 ms |
| Compress Transfer | 2500 ms |
| Time to Interactive | 3700 ms |
| Total Blocking Time | 200 ms |
| Effective use of CDN | 0.04 |



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
    - 국내 투어 I사 쇼핑몰의 6개월간 사용자 수 통계 [링크](https://www.similarweb.com/website/tour.tmon.co.kr/?competitors=tour.interpark.com)
    - 통계수치를 바탕으로 I사 하루 사용량 예상: 3만명 가량으로 예상
    - 경쟁업체를 기준으로 선정
    - 사용자가 보통 5번씩 사용한다고 가정
    - 1일 총 접속수: 3만명 * 5 = 15만회
    - 150,000 / 86400 = 2rps
    - 1일 최대 rps: 2 * 100 / 10 = 20 rps
    - 사용자가 1분 내외로 사용한다고 가정.

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
---
### smoke, load, stress 테스트 진행 
- smoke

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

const BASE_URL = 'https://prodo-subway.r-e.kr/';
const USERNAME = 'wjdals300@gmail.com';
const PASSWORD = '1234';

export default function ()  {

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

    let line = 라인조회(loginRes, 1);

    구간조회(loginRes, 1);
    경로조회(loginRes, 1, 5);

    sleep(1);
};

export function 라인조회(loginRes, lineId) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/lines/lineId`, authHeaders).json();
};

export function 구간조회(loginRes, lineId){
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/lines/lineId/sections`, authHeaders).json();
};

export function 경로조회(loginRes, start, end){
    var path = JSON.stringify({
        source: start,
        target: end,
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/paths`, path, authHeaders).json();
};

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

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (10.7s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 20  ✗ 0
data_received..................: 23 kB   2.1 kB/s
data_sent......................: 13 kB   1.2 kB/s
http_req_blocked...............: avg=3ms      min=0s      med=0s      max=150.05ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=152.28µs min=0s      med=0s      max=7.61ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=11.07ms  min=5.51ms  med=12.57ms max=18.62ms  p(90)=15.63ms  p(95)=16.16ms
{ expected_response:true }...: avg=14.9ms   min=13.17ms med=14.53ms max=18.62ms  p(90)=16.56ms  p(95)=16.84ms
http_req_failed................: 60.00%  ✓ 30  ✗ 20
http_req_receiving.............: avg=145.88µs min=0s      med=0s      max=1.07ms   p(90)=997.78µs p(95)=1ms
http_req_sending...............: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
http_req_tls_handshaking.......: avg=2.56ms   min=0s      med=0s      max=128.19ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=10.93ms  min=5ms     med=12.53ms max=18.62ms  p(90)=15.53ms  p(95)=15.69ms
http_reqs......................: 50      4.659034/s
iteration_duration.............: avg=1.07s    min=1.05s   med=1.05s   max=1.2s     p(90)=1.07s    p(95)=1.14s
iterations.....................: 10      0.931807/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```


- load
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    }
};

const BASE_URL = 'https://prodo-subway.r-e.kr/';
const USERNAME = 'wjdals300@gmail.com';
const PASSWORD = '1234';

export default function ()  {

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

    let line = 라인조회(loginRes, 1);

    구간조회(loginRes, 1);
    경로조회(loginRes, 1, 5);

    sleep(1);
};

export function 라인조회(loginRes, lineId) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/lines/lineId`, authHeaders).json();
};

export function 구간조회(loginRes, lineId){
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/lines/lineId/sections`, authHeaders).json();
};

export function 경로조회(loginRes, start, end){
    var path = JSON.stringify({
        source: start,
        target: end,
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/paths`, path, authHeaders).json();
};

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load.js
output: -

    scenarios: (100.00%) 1 scenario, 20 max VUs, 2m10s max duration (incl. graceful stop):
* default: Up to 20 looping VUs for 1m40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (1m41.0s), 00/20 VUs, 1508 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  1m40s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 3016 ✗ 0
data_received..................: 2.8 MB  28 kB/s
data_sent......................: 1.9 MB  19 kB/s
http_req_blocked...............: avg=74.07µs  min=0s     med=0s      max=129.71ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=16.12µs  min=0s     med=0s      max=9.43ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=13.28ms  min=4.89ms med=12.37ms max=546.15ms p(90)=16.44ms  p(95)=17.65ms
{ expected_response:true }...: avg=16.63ms  min=9.82ms med=14.67ms max=368.85ms p(90)=17.45ms  p(95)=18.91ms
http_req_failed................: 60.00%  ✓ 4524 ✗ 3016
http_req_receiving.............: avg=202.85µs min=0s     med=0s      max=330ms    p(90)=426.86µs p(95)=963.9µs
http_req_sending...............: avg=7.06µs   min=0s     med=0s      max=1.01ms   p(90)=0s       p(95)=0s
http_req_tls_handshaking.......: avg=54.02µs  min=0s     med=0s      max=106.85ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=13.07ms  min=4.85ms med=12.25ms max=450ms    p(90)=16.32ms  p(95)=17.57ms
http_reqs......................: 7540    74.672389/s
iteration_duration.............: avg=1.07s    min=1.05s  med=1.05s   max=2.42s    p(90)=1.06s    p(95)=1.08s
iterations.....................: 1508    14.934478/s
vus............................: 2       min=1  max=20
vus_max........................: 20      min=20 max=20

```
- stress
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '15s', target: 20 },
        { duration: '30s', target: 20 },
        { duration: '15s', target: 0 },
        { duration: '30s', target: 360 },
        { duration: '60s', target: 360 },
        { duration: '30s', target: 0 },
        { duration: '15s', target: 20 },
        { duration: '30s', target: 20 },
        { duration: '15s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    }
};

const BASE_URL = 'https://prodo-subway.r-e.kr/';
const USERNAME = 'wjdals300@gmail.com';
const PASSWORD = '1234';

export default function ()  {

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

    let line = 라인조회(loginRes, 1);

    구간조회(loginRes, 1);
    경로조회(loginRes, 1, 5);

    sleep(1);
};

export function 라인조회(loginRes, lineId) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/lines/lineId`, authHeaders).json();
};

export function 구간조회(loginRes, lineId){
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/lines/lineId/sections`, authHeaders).json();
};

export function 경로조회(loginRes, start, end){
    var path = JSON.stringify({
        source: start,
        target: end,
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/paths`, path, authHeaders).json();
};

    /\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress.js
output: -

    scenarios: (100.00%) 1 scenario, 360 max VUs, 4m30s max duration (incl. graceful stop):
* default: Up to 360 looping VUs for 4m0s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (4m00.3s), 000/360 VUs, 29252 complete and 0 interrupted iterations
default ✓ [======================================] 000/360 VUs  4m0s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 58504 ✗ 0
data_received..................: 55 MB   230 kB/s
data_sent......................: 37 MB   153 kB/s
http_req_blocked...............: avg=83.15µs  min=0s     med=0s      max=161.05ms p(90)=0s      p(95)=0s
http_req_connecting............: avg=26.05µs  min=0s     med=0s      max=67.72ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=34.79ms  min=4.81ms med=20.32ms max=1.04s    p(90)=77.32ms p(95)=99.23ms
{ expected_response:true }...: avg=48.44ms  min=9.7ms  med=38.69ms max=1.04s    p(90)=92.36ms p(95)=117.48ms
http_req_failed................: 60.00%  ✓ 87756 ✗ 58504
http_req_receiving.............: avg=102.37µs min=0s     med=0s      max=33ms     p(90)=505.2µs p(95)=900.2µs
http_req_sending...............: avg=20.48µs  min=0s     med=0s      max=36.99ms  p(90)=0s      p(95)=0s
http_req_tls_handshaking.......: avg=53.7µs   min=0s     med=0s      max=118.4ms  p(90)=0s      p(95)=0s
http_req_waiting...............: avg=34.66ms  min=4.81ms med=20.2ms  max=1.04s    p(90)=77.21ms p(95)=99.09ms
http_reqs......................: 146260  608.775419/s
iteration_duration.............: avg=1.17s    min=1.04s  med=1.17s   max=2.09s    p(90)=1.29s   p(95)=1.34s
iterations.....................: 29252   121.755084/s
vus............................: 1       min=1   max=360
vus_max........................: 360     min=360 max=360

```
