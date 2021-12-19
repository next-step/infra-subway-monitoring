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
* Application Log
  * /home/ubuntu/infra-subway-monitoring/build/libs/log/file.log
* System Log
  * /var/log/syslog

2. Cloudwatch 대시보드 URL을 알려주세요
* https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-smpark1020
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
### 카카오맵(https://map.kakao.com/)
* FCP: 0.6s
* TTI: 2.7s
* Largest Contentful Paint: 0.7s
* Total Blocking Time: 720ms

### 지하철 노선 관리(https://smpark1020.o-r.kr/)
* FCP: 2.8s
* TTI: 2.9s
* Largest Contentful Paint: 2.9s
* Total Blocking Time: 50ms

### 성능 예산
* 경쟁사에 비해 FCP, Largest Contentful Paint가 많이 차이가 나서 이 두 가지를 우선 2.0s ~ 2.2s 안으로 들어오게 하는 것이 목표입니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* 텍스트 및 이미지 압축
* 사용하지 않는 자바 스크립트 줄이기
* JS/CSS 지연 로딩

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
* 대상 시스템 범위: application
* Throughput
  * 예상 DAU: 10만
  * 피크 시간대 집중률: 3
  * 1명당 1일 평균 접속 혹은 요청수: 2회
  * 1일 총 접속수: 10만 * 2 = 20만
  * 1일 평균 rps: 20만 / 86400 = 2.31
  * 1일 최대 rps: 2.31 * 3 = 6.94
* Latency
  * 100ms 이하
* 부하 유지 기간
  * 30분

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요   

접속 빈도가 높은 페이지: 메인 페이지
* smoke.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';
const USERNAME = 'smpark911020@gmail.com';
const PASSWORD = 'smpark';

export default function () {

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
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
};
```
```
➜  main git:(step2) ✗ k6 run smoke.js

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


running (10.8s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 12 kB   1.1 kB/s
     data_sent......................: 5.7 kB  526 B/s
     http_req_blocked...............: avg=16.96ms min=3µs     med=4µs     max=339.14ms p(90)=8.3µs   p(95)=16.96ms
     http_req_connecting............: avg=346.9µs min=0s      med=0s      max=6.93ms   p(90)=0s      p(95)=346.9µs
   ✓ http_req_duration..............: avg=22.62ms min=18.98ms med=21.37ms max=30.35ms  p(90)=26.17ms p(95)=26.39ms
       { expected_response:true }...: avg=22.62ms min=18.98ms med=21.37ms max=30.35ms  p(90)=26.17ms p(95)=26.39ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 20
     http_req_receiving.............: avg=74.55µs min=50µs    med=73µs    max=128µs    p(90)=90.9µs  p(95)=100.45µs
     http_req_sending...............: avg=35.85µs min=17µs    med=24µs    max=174µs    p(90)=51.6µs  p(95)=62.85µs
     http_req_tls_handshaking.......: avg=16.06ms min=0s      med=0s      max=321.27ms p(90)=0s      p(95)=16.06ms
     http_req_waiting...............: avg=22.51ms min=18.87ms med=21.28ms max=30.27ms  p(90)=26.02ms p(95)=26.31ms
     http_reqs......................: 20      1.850133/s
     iteration_duration.............: avg=1.08s   min=1.04s   med=1.04s   max=1.38s    p(90)=1.08s   p(95)=1.23s
     iterations.....................: 10      0.925067/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```
* load.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';
const USERNAME = 'smpark911020@gmail.com';
const PASSWORD = 'smpark';

export default function () {

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
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
};
```
```
➜  main git:(step2) ✗ k6 run load.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m30.9s), 000/100 VUs, 2410 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  30s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 4820       ✗ 0
     data_received..................: 2.2 MB  70 kB/s
     data_sent......................: 1.3 MB  43 kB/s
     http_req_blocked...............: avg=2.49ms   min=1µs     med=3µs     max=320.53ms p(90)=5µs     p(95)=7µs
     http_req_connecting............: avg=1.81ms   min=0s      med=0s      max=288.47ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=23.61ms  min=11.56ms med=21.42ms max=322.32ms p(90)=31.67ms p(95)=35.27ms
       { expected_response:true }...: avg=23.61ms  min=11.56ms med=21.42ms max=322.32ms p(90)=31.67ms p(95)=35.27ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 4820
     http_req_receiving.............: avg=38.76µs  min=16µs    med=32µs    max=251µs    p(90)=61µs    p(95)=76µs
     http_req_sending...............: avg=17.88µs  min=6µs     med=14µs    max=850µs    p(90)=28µs    p(95)=37µs
     http_req_tls_handshaking.......: avg=671.14µs min=0s      med=0s      max=311.01ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=23.55ms  min=11.49ms med=21.35ms max=322.23ms p(90)=31.61ms p(95)=35.22ms
     http_reqs......................: 4820    156.092349/s
     iteration_duration.............: avg=1.05s    min=1.02s   med=1.04s   max=1.51s    p(90)=1.06s   p(95)=1.06s
     iterations.....................: 2410    78.046175/s
     vus............................: 5       min=5        max=100
     vus_max........................: 100     min=100      max=100
```

* stress.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '5s', target: 300 },
        { duration: '10s', target: 300 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';
const USERNAME = 'smpark911020@gmail.com';
const PASSWORD = 'smpark';

export default function () {

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
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
};
```
```
...

running (0m50.7s), 000/300 VUs, 68607 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  50s

     ✗ logged in successfully
      ↳  11% — ✓ 8002 / ✗ 60605
     ✓ retrieved member

     checks.........................: 20.89% ✓ 16004       ✗ 60605
     data_received..................: 6.8 MB 134 kB/s
     data_sent......................: 4.3 MB 86 kB/s
     http_req_blocked...............: avg=378.44µs min=0s       med=0s      max=405.53ms p(90)=3µs     p(95)=4µs
     http_req_connecting............: avg=269.39µs min=0s       med=0s      max=285.79ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=5.59ms   min=0s       med=0s      max=399.57ms p(90)=23.51ms p(95)=29.2ms
       { expected_response:true }...: avg=26.76ms  min=11.04ms  med=23.08ms max=399.57ms p(90)=36.6ms  p(95)=44.38ms
     http_req_failed................: 79.10% ✓ 60605       ✗ 16004
     http_req_receiving.............: avg=9.59µs   min=0s       med=0s      max=2.2ms    p(90)=37µs    p(95)=52µs
     http_req_sending...............: avg=3.97µs   min=0s       med=0s      max=1.11ms   p(90)=15µs    p(95)=21µs
     http_req_tls_handshaking.......: avg=108.01µs min=0s       med=0s      max=298.58ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=5.57ms   min=0s       med=0s      max=399.52ms p(90)=23.45ms p(95)=29.14ms
     http_reqs......................: 76609  1511.352654/s
     iteration_duration.............: avg=128.28ms min=111.02µs med=5.65ms  max=1.45s    p(90)=1.03s   p(95)=1.05s
     iterations.....................: 68607  1353.488122/s
     vus............................: 42     min=20        max=300
     vus_max........................: 300    min=300       max=300
```

데이터를 갱싱하는 페이지
* smoke.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';
const USERNAME = 'smpark911020@gmail.com';
const PASSWORD = 'smpark';
const AGE = 32;

export default function () {

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

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: AGE,
    });

    let myObjects = http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
};
```
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://mnonm-subway.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = 'hi';
const AGE = 20;

export default function () {

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

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: AGE,
  });

  let myObjects = http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
  check(myObjects, {'retrieved member': (obj) => obj.id != 0});
  sleep(1);
};
```

* load.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';
const USERNAME = 'smpark911020@gmail.com';
const PASSWORD = 'smpark';
const AGE = 32;

export default function () {

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

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: AGE,
    });

    let myObjects = http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
};
```
```
➜  update git:(step2) ✗ k6 run load.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m30.9s), 000/100 VUs, 2429 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  30s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 4858       ✗ 0
     data_received..................: 2.4 MB  77 kB/s
     data_sent......................: 1.5 MB  50 kB/s
     http_req_blocked...............: avg=2.52ms   min=1µs     med=3µs     max=332.44ms p(90)=6µs     p(95)=9µs
     http_req_connecting............: avg=1.8ms    min=0s      med=0s      max=285.02ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=24.23ms  min=11.68ms med=20.8ms  max=296.61ms p(90)=36.05ms p(95)=43.94ms
       { expected_response:true }...: avg=24.63ms  min=11.68ms med=21.82ms max=284.41ms p(90)=36.27ms p(95)=42.66ms
     http_req_failed................: 50.00%  ✓ 2429       ✗ 2429
     http_req_receiving.............: avg=44.28µs  min=16µs    med=35µs    max=475µs    p(90)=73µs    p(95)=98µs
     http_req_sending...............: avg=20.73µs  min=7µs     med=16µs    max=476µs    p(90)=34µs    p(95)=44µs
     http_req_tls_handshaking.......: avg=708.84µs min=0s      med=0s      max=323.09ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=24.16ms  min=11.6ms  med=20.75ms max=296.54ms p(90)=36ms    p(95)=43.88ms
     http_reqs......................: 4858    157.325989/s
     iteration_duration.............: avg=1.05s    min=1.02s   med=1.04s   max=1.37s    p(90)=1.07s   p(95)=1.08s
     iterations.....................: 2429    78.662995/s
     vus............................: 13      min=13       max=100
     vus_max........................: 100     min=100      max=100
```

* stress.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '5s', target: 300 },
        { duration: '10s', target: 300 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';
const USERNAME = 'smpark911020@gmail.com';
const PASSWORD = 'smpark';
const AGE = 32;

export default function () {

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

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: AGE,
    });

    let myObjects = http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
};
```
```
...

running (0m50.9s), 000/300 VUs, 89366 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  50s

     ✗ logged in successfully
      ↳  8% — ✓ 7979 / ✗ 81387
     ✓ retrieved member

     checks.........................: 16.39% ✓ 15958       ✗ 81387
     data_received..................: 7.4 MB 145 kB/s
     data_sent......................: 5.0 MB 98 kB/s
     http_req_blocked...............: avg=294.92µs min=0s      med=0s      max=334.83ms p(90)=2µs     p(95)=3µs
     http_req_connecting............: avg=210.54µs min=0s      med=0s      max=287.59ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=4.54ms   min=0s      med=0s      max=416.76ms p(90)=20.08ms p(95)=27.36ms
       { expected_response:true }...: avg=27.84ms  min=11.58ms med=22.55ms max=416.76ms p(90)=40.21ms p(95)=51.13ms
     http_req_failed................: 91.80% ✓ 89366       ✗ 7979
     http_req_receiving.............: avg=6.37µs   min=0s      med=0s      max=1.33ms   p(90)=27µs    p(95)=37µs
     http_req_sending...............: avg=2.83µs   min=0s      med=0s      max=459µs    p(90)=12µs    p(95)=17µs
     http_req_tls_handshaking.......: avg=83.65µs  min=0s      med=0s      max=300.85ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=4.53ms   min=0s      med=0s      max=416.73ms p(90)=20.02ms p(95)=27.31ms
     http_reqs......................: 97345  1911.274681/s
     iteration_duration.............: avg=98.42ms  min=84.18µs med=4.2ms   max=1.53s    p(90)=14.98ms p(95)=1.04s
     iterations.....................: 89366  1754.614753/s
     vus............................: 24     min=20        max=300
     vus_max........................: 300    min=300       max=300
```

데이터를 조회하는데 여러 데이터를 참조하는 페이지
* smoke.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';

export default function () {

    let pathObject = http.get(`${BASE_URL}/paths?source=89&target=276`).json();
    check(pathObject, {'retrieved path': (obj) => obj.id != 0});
    sleep(1);
};
```
```
➜  path git:(step2) ✗ k6 run smoke.js

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


running (10.1s), 0/1 VUs, 8 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ retrieved path

     checks.........................: 100.00% ✓ 8        ✗ 0
     data_received..................: 14 kB   1.4 kB/s
     data_sent......................: 1.5 kB  147 B/s
     http_req_blocked...............: avg=33.77ms  min=4µs      med=5.5µs    max=270.15ms p(90)=81.05ms  p(95)=175.6ms
     http_req_connecting............: avg=1.07ms   min=0s       med=0s       max=8.6ms    p(90)=2.58ms   p(95)=5.59ms
   ✓ http_req_duration..............: avg=229.17ms min=124.13ms med=184.61ms max=362.41ms p(90)=353.63ms p(95)=358.02ms
       { expected_response:true }...: avg=229.17ms min=124.13ms med=184.61ms max=362.41ms p(90)=353.63ms p(95)=358.02ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 8
     http_req_receiving.............: avg=122.12µs min=52µs     med=91.5µs   max=258µs    p(90)=206.2µs  p(95)=232.09µs
     http_req_sending...............: avg=31.75µs  min=20µs     med=28.49µs  max=60µs     p(90)=44.59µs  p(95)=52.29µs
     http_req_tls_handshaking.......: avg=22.04ms  min=0s       med=0s       max=176.35ms p(90)=52.9ms   p(95)=114.62ms
     http_req_waiting...............: avg=229.02ms min=123.91ms med=184.51ms max=362.3ms  p(90)=353.4ms  p(95)=357.85ms
     http_reqs......................: 8       0.790185/s
     iteration_duration.............: avg=1.26s    min=1.12s    med=1.18s    max=1.59s    p(90)=1.43s    p(95)=1.51s
     iterations.....................: 8       0.790185/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

* load.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';

export default function () {

    let pathObject = http.get(`${BASE_URL}/paths?source=89&target=276`).json();
    check(pathObject, {'retrieved path': (obj) => obj.id != 0});
    sleep(1);
};
```
```
➜  path git:(step2) ✗ k6 run load.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m34.7s), 000/100 VUs, 416 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  30s

     ✓ retrieved path

     checks.........................: 100.00% ✓ 416       ✗ 0
     data_received..................: 960 kB  28 kB/s
     data_sent......................: 96 kB   2.8 kB/s
     http_req_blocked...............: avg=28.25ms min=2µs      med=5µs   max=311.29ms p(90)=118.8ms p(95)=224.12ms
     http_req_connecting............: avg=20.71ms min=0s       med=0s    max=287.08ms p(90)=68.64ms p(95)=187.11ms
   ✗ http_req_duration..............: avg=5.83s   min=324.49ms med=6.86s max=13.43s   p(90)=7.3s    p(95)=7.38s
       { expected_response:true }...: avg=5.83s   min=324.49ms med=6.86s max=13.43s   p(90)=7.3s    p(95)=7.38s
     http_req_failed................: 0.00%   ✓ 0         ✗ 416
     http_req_receiving.............: avg=72.54µs min=28µs     med=66µs  max=442µs    p(90)=105.5µs p(95)=120µs
     http_req_sending...............: avg=28.71µs min=7µs      med=23µs  max=110µs    p(90)=49µs    p(95)=62.25µs
     http_req_tls_handshaking.......: avg=7.5ms   min=0s       med=0s    max=296.01ms p(90)=20.54ms p(95)=22.32ms
     http_req_waiting...............: avg=5.83s   min=324.38ms med=6.86s max=13.43s   p(90)=7.3s    p(95)=7.38s
     http_reqs......................: 416     11.991815/s
     iteration_duration.............: avg=6.86s   min=1.35s    med=7.86s max=14.43s   p(90)=8.3s    p(95)=8.38s
     iterations.....................: 416     11.991815/s
     vus............................: 18      min=18      max=100
     vus_max........................: 100     min=100     max=100
```

* stress.js
```
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '5s', target: 300 },
        { duration: '10s', target: 300 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';

export default function () {

    let pathObject = http.get(`${BASE_URL}/paths?source=89&target=276`).json();
    check(pathObject, {'retrieved path': (obj) => obj.id != 0});
    sleep(1);
};
```
```
...

running (1m06.1s), 000/300 VUs, 72332 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  50s

     ✓ retrieved path

     checks.........................: 100.00% ✓ 793         ✗ 0
     data_received..................: 2.8 MB  42 kB/s
     data_sent......................: 283 kB  4.3 kB/s
     http_req_blocked...............: avg=524.48µs min=0s       med=0s     max=322.79ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=340.58µs min=0s       med=0s     max=293.52ms p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=134.95ms min=0s       med=0s     max=32.03s   p(90)=0s      p(95)=0s
       { expected_response:true }...: avg=12.03s   min=572.05ms med=12.95s max=30.97s   p(90)=18.92s  p(95)=19.23s
     http_req_failed................: 98.92%  ✓ 71551       ✗ 781
     http_req_receiving.............: avg=780ns    min=0s       med=0s     max=540µs    p(90)=0s      p(95)=0s
     http_req_sending...............: avg=521ns    min=0s       med=0s     max=331µs    p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=184.92µs min=0s       med=0s     max=306.85ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=134.95ms min=0s       med=0s     max=32.03s   p(90)=0s      p(95)=0s
     http_reqs......................: 72332   1095.106897/s
     iteration_duration.............: avg=151.79ms min=85.24µs  med=4.6ms  max=33.03s   p(90)=10.38ms p(95)=17.39ms
     iterations.....................: 72332   1095.106897/s
     vus............................: 8       min=8         max=300
     vus_max........................: 300     min=300       max=300
```
