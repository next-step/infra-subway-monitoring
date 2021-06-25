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
   - web 서버
       - `/var/logs/app` (spring.log, file.log, json.log)
       - `/var/logs/nginx` (access.log, error.log)
    
2. Cloudwatch 대시보드 URL을 알려주세요
    - [bgpark-dashboard](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=bgpark-dashboard)
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   > 현재 대비 5% 속도 개선

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    
    - 자바스크립트 gzip 압축
    - render block 스크립트 제거 
    - 캐시 설정

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

방법

1. 1일 사용자 수 x 1명당 1일 평균 접속 수 = 1일 총 접속 수
2. 1일 총 접속 수 / 86400 (초/일) = 1일 평균 rps
3. 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps

계산

1. 1일 사용자 수 (DAU) = 549만 / 30 = 183,000
2. 1명당 1일 평균 접속 수 = 5회
3. 1일 총 접속 수 = 915,000
4. 1일 평균 rps = 10rps
5. 최대 트래픽 / 평소 트래픽 : 10
6. 1일 최대 rps = 10 x 10 = 100 rps
7. latency : 100ms

접속 빈도가 높은 페이지
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://bgpark.p-e.kr/';
const USERNAME = 'bgpark82@gmail.com';
const PASSWORD = '1234';
const DATA = JSON.stringify({ email: USERNAME, password: PASSWORD });
const PARAMS = { headers: { 'Content-Type': 'application/json', }, };

export default () => {
    let loginRes = http.post(`${BASE_URL}/login/token`, DATA, PARAMS);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 200,
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
};
```
```
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

running (11.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

    ✓ retrieved member
    ✓ logged in successfully

    checks.....................: 100.00% ✓ 20  ✗ 0  
    data_received..............: 12 kB   1.0 kB/s
    data_sent..................: 5.5 kB  497 B/s
    http_req_blocked...........: avg=16.42ms min=3µs     med=6µs     max=328.37ms p(90)=9.1µs   p(95)=16.42ms 
    http_req_connecting........: avg=585.8µs min=0s      med=0s      max=11.71ms  p(90)=0s      p(95)=585.8µs 
  ✓ http_req_duration..........: avg=29.75ms min=23.28ms med=26.63ms max=72.91ms  p(90)=35.31ms p(95)=38.56ms 
    http_req_receiving.........: avg=89.85µs min=57µs    med=80µs    max=207µs    p(90)=119.5µs p(95)=145.25µs
    http_req_sending...........: avg=39.65µs min=15µs    med=30µs    max=187µs    p(90)=52.2µs  p(95)=69.2µs  
    http_req_tls_handshaking...: avg=15.03ms min=0s      med=0s      max=300.67ms p(90)=0s      p(95)=15.03ms 
    http_req_waiting...........: avg=29.62ms min=23.11ms med=26.53ms max=72.58ms  p(90)=35.21ms p(95)=38.46ms 
    http_reqs..................: 20      1.80923/s
    iteration_duration.........: avg=1.09s   min=1.05s   med=1.05s   max=1.43s    p(90)=1.1s    p(95)=1.27s   
    iterations.................: 10      0.904615/s
    vus........................: 1       min=1 max=1
    vus_max....................: 1       min=1 max=1
```

### 2. Load 테스트

```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
        { duration: '2m', target: 100 }, // stay at 100 users for 2 minutes
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://bgpark.p-e.kr/';
const USERNAME = 'bgpark82@gmail.com';
const PASSWORD = '1234';
const DATA = JSON.stringify({email: USERNAME, password: PASSWORD});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
    let loginRes = http.post(`${BASE_URL}/login/token`, DATA, PARAMS);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 200,
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
};
```
```
	      /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (3m10.8s), 000/100 VUs, 14893 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

    ✓ retrieved member
    ✓ logged in successfully

    checks.....................: 100.00% ✓ 29786 ✗ 0    
    data_received..............: 11 MB   57 kB/s
    data_sent..................: 7.7 MB  40 kB/s
    http_req_blocked...........: avg=215.81µs min=1µs     med=5µs     max=1.13s    p(90)=11µs    p(95)=18µs   
    http_req_connecting........: avg=86.96µs  min=0s      med=0s      max=1.1s     p(90)=0s      p(95)=0s     
  ✓ http_req_duration..........: avg=21.41ms  min=11.8ms  med=18.56ms max=622.35ms p(90)=28.48ms p(95)=39.57ms
    http_req_receiving.........: avg=109.29µs min=18µs    med=83µs    max=17.76ms  p(90)=169µs   p(95)=252µs  
    http_req_sending...........: avg=41.16µs  min=9µs     med=30µs    max=9.2ms    p(90)=64µs    p(95)=90µs   
    http_req_tls_handshaking...: avg=120.22µs min=0s      med=0s      max=239.8ms  p(90)=0s      p(95)=0s     
    http_req_waiting...........: avg=21.26ms  min=11.71ms med=18.41ms max=622.24ms p(90)=28.34ms p(95)=39.38ms
    http_reqs..................: 29786   156.151725/s
    iteration_duration.........: avg=1.04s    min=1.02s   med=1.03s   max=2.16s    p(90)=1.06s   p(95)=1.07s  
    iterations.................: 14893   78.075863/s
    vus........................: 8       min=2   max=100
    vus_max....................: 100     min=100 max=100
```

3. Stress 테스트
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2s', target: 100 }, // below normal load
        { duration: '5s', target: 100 },
        { duration: '2s', target: 200 }, // normal load
        { duration: '5s', target: 200 },
        { duration: '2s', target: 300 }, // around the breaking point
        { duration: '5s', target: 300 },
        { duration: '2s', target: 400 }, // beyond the breaking point
        { duration: '5s', target: 400 },
        { duration: '10s', target: 0 }, // scale down. Recovery stage.
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://bgpark.p-e.kr/';
const USERNAME = 'bgpark82@gmail.com';
const PASSWORD = '1234';
const DATA = JSON.stringify({email: USERNAME, password: PASSWORD});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
    let loginRes = http.post(`${BASE_URL}/login/token`, DATA, PARAMS);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 200,
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
};
```
```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 400 max VUs, 1m8s max duration (incl. graceful stop):
           * default: Up to 400 looping VUs for 38s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (0m39.0s), 000/400 VUs, 8200 complete and 0 interrupted iterations
default ✓ [======================================] 000/400 VUs  38s

    ✓ logged in successfully
    ✓ retrieved member

    checks.....................: 100.00% ✓ 16400 ✗ 0    
    data_received..............: 7.6 MB  194 kB/s
    data_sent..................: 4.3 MB  112 kB/s
    http_req_blocked...........: avg=2ms      min=1µs     med=5µs     max=1.29s    p(90)=14µs    p(95)=26µs    
    http_req_connecting........: avg=974.63µs min=0s      med=0s      max=1.26s    p(90)=0s      p(95)=0s      
  ✓ http_req_duration..........: avg=34.37ms  min=12.56ms med=26.52ms max=590.77ms p(90)=58.8ms  p(95)=74.5ms  
    http_req_receiving.........: avg=105.45µs min=17µs    med=73µs    max=11.55ms  p(90)=159µs   p(95)=232.04µs
    http_req_sending...........: avg=54.02µs  min=9µs     med=28µs    max=25.99ms  p(90)=71µs    p(95)=104µs   
    http_req_tls_handshaking...: avg=1.01ms   min=0s      med=0s      max=279.43ms p(90)=0s      p(95)=0s      
    http_req_waiting...........: avg=34.21ms  min=12.26ms med=26.34ms max=590.67ms p(90)=58.67ms p(95)=74.26ms 
    http_reqs..................: 16400   420.386424/s
    iteration_duration.........: avg=1.07s    min=1.02s   med=1.06s   max=2.42s    p(90)=1.12s   p(95)=1.15s   
    iterations.................: 8200    210.193212/s
    vus........................: 0       min=0   max=400
    vus_max....................: 400     min=400 max=400
```