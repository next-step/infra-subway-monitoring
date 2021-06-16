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
> 현재 주제에 집중하기 위해서 배스천 인스턴스를 없애고 바로 퍼블릭 인스턴스로 접속해서 진행 했습니다. (드라이브에서 admin 안붙은 키로 접속)
- file : /home/ubuntu/log/file.log
- json : /home/ubuntu/log/json.log
- 접속 로그 : /home/ubuntu/log/attostack-access.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=sarguments-dashboard

---

### 2단계 - 성능 테스트
1. 웹 성능 예산 작성
    - 페이지로드 : `3초 미만`
    - Time to Interactive : `3초 미만`
    - First Contentful Paint : `1.8초 미만`
    - Largest Contentful Paint : `4초 미만`
    - Speed Index : `5.8초 미만`
    - Time Blocking Time : `0.6초 미만`
2. 부하테스트 목푯값 설정
    - 1일 예상 사용자 수 : `170000명 (530만 / 30)`
    - 1일 사용자 평균 접속 수: `10 회`
    - 1일 총 접속 수 : `1700000 회`
    - 1일 평균 RPS: `20 rps`
    - 최대 트래픽 / 평균 트래픽(가정): `5`
    - 1일 최대 RPS: `100rps`
    - Latency: `100ms`
3. Smoke, Load, Stress 스크립트 및 부하테스트

### smoke

#### 접속 빈도가 높은 페이지(로그인)
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://subway.javajigi.p-e.kr';
const USERNAME = 'a@a';
const PASSWORD = '1234';

export default () => {

    let loginRes = http.post(`${BASE_URL}/login/token`, {
        email: USERNAME,
        password: PASSWORD,
    });

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
    sleep(1);
};
```

#### 결과
```javascript
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


running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.....................: 100.00% ✓ 20  ✗ 0
     data_received..............: 12 kB   1.2 kB/s
     data_sent..................: 4.2 kB  414 B/s
     http_req_blocked...........: avg=1.83ms  min=4.59µs  med=7.39µs  max=36.56ms  p(90)=8.64µs  p(95)=1.83ms
     http_req_connecting........: avg=24.42µs min=0s      med=0s      max=488.45µs p(90)=0s      p(95)=24.42µs
   ✓ http_req_duration..........: avg=5.31ms  min=4.2ms   med=5.07ms  max=8.73ms   p(90)=6.25ms  p(95)=6.44ms
     http_req_failed............: 100.00% ✓ 20  ✗ 0
     http_req_receiving.........: avg=72.8µs  min=51.42µs med=74.74µs max=89.19µs  p(90)=82.81µs p(95)=83.28µs
     http_req_sending...........: avg=29.92µs min=13.9µs  med=27.89µs max=105.88µs p(90)=38.85µs p(95)=45.63µs
     http_req_tls_handshaking...: avg=1.38ms  min=0s      med=0s      max=27.79ms  p(90)=0s      p(95)=1.38ms
     http_req_waiting...........: avg=5.21ms  min=4.11ms  med=4.98ms  max=8.65ms   p(90)=6.17ms  p(95)=6.35ms
     http_reqs..................: 20      1.968936/s
     iteration_duration.........: avg=1.01s   min=1.01s   med=1.01s   max=1.04s    p(90)=1.01s   p(95)=1.03s
     iterations.................: 10      0.984468/s
     vus........................: 1       min=1 max=1
     vus_max....................: 1       min=1 max=1
```

---

#### 데이터를 갱신하는 페이지: 회원정보 수정
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
   vus: 1,
   duration: '10s',
   thresholds: {
      http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
   },
};

const BASE_URL = 'https://subway.javajigi.p-e.kr';
const USERNAME = 'a@a';
const PASSWORD = '1234';

export default () => {

   let loginRes = http.post(`${BASE_URL}/login/token`, {
      email: USERNAME,
      password: PASSWORD,
   });
   check(loginRes, {
      'logged in successfully': (resp) => resp.json('accessToken') !== '',
   });
   
   let authHeaders = {
      headers: {
         Authorization: `Bearer ${loginRes.json('accessToken')}`,
      },
   };
   let myObjects = http.put(`${BASE_URL}/members/${loginRes['id']}`,
     {
        email: USERNAME,
        password: PASSWORD,
        age: 999
     },
     authHeaders).json();
   check(myObjects, { 'modify member': (obj) => obj.id != 0 });
   sleep(1);
};
```
#### 결과
```javascript

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


running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ modify member

checks.....................: 100.00% ✓ 20  ✗ 0
data_received..............: 12 kB   1.2 kB/s
data_sent..................: 5.3 kB  524 B/s
http_req_blocked...........: avg=1.45ms  min=4.6µs   med=6.37µs  max=28.99ms p(90)=8.71µs  p(95)=1.45ms
http_req_connecting........: avg=25.19µs min=0s      med=0s      max=503.9µs p(90)=0s      p(95)=25.19µs
   ✓ http_req_duration..........: avg=3.66ms  min=2.02ms  med=2.65ms  max=16.66ms p(90)=4.01ms  p(95)=10.16ms
http_req_failed............: 100.00% ✓ 20  ✗ 0
http_req_receiving.........: avg=67.63µs min=43.64µs med=66.83µs max=98.58µs p(90)=85.33µs p(95)=91.61µs
http_req_sending...........: avg=29.68µs min=17.51µs med=28.92µs max=83.4µs  p(90)=39.45µs p(95)=46.09µs
http_req_tls_handshaking...: avg=1.39ms  min=0s      med=0s      max=27.88ms p(90)=0s      p(95)=1.39ms
http_req_waiting...........: avg=3.56ms  min=1.83ms  med=2.56ms  max=16.56ms p(90)=3.94ms  p(95)=10.08ms
http_reqs..................: 20      1.977557/s
iteration_duration.........: avg=1.01s   min=1s      med=1s      max=1.04s   p(90)=1.01s   p(95)=1.03s
iterations.................: 10      0.988779/s
vus........................: 1       min=1 max=1
vus_max....................: 1       min=1 max=1

```

---

#### 데이터를 조회하는데 여러 데이터를 참조하는 페이지: 경로 탐색
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
   vus: 1,
   duration: '10s',
   thresholds: {
     http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
   },
};

const BASE_URL = 'https://subway.javajigi.p-e.kr';
const QUERY_STRING = 'source=1&target=9';
const USERNAME = 'a@a';
const PASSWORD = '1234';

export default () => {
    let loginRes = http.post(`${BASE_URL}/login/token`, {
        email: USERNAME,
        password: PASSWORD,
    });

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/paths?${QUERY_STRING}`, authHeaders).json();
    check(myObjects, { 'path search complete': (obj) => obj.distance != 0 });
    sleep(1);
};
```
#### 결과
```javascript

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


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ path search complete

     checks.........................: 100.00% ✓ 20  ✗ 0
     data_received..................: 28 kB   2.7 kB/s
     data_sent......................: 4.3 kB  412 B/s
     http_req_blocked...............: avg=1.47ms  min=4.46µs  med=6.64µs  max=29.35ms  p(90)=8.75µs   p(95)=1.47ms
     http_req_connecting............: avg=22.85µs min=0s      med=0s      max=457.01µs p(90)=0s       p(95)=22.85µs
   ✓ http_req_duration..............: avg=24.52ms min=4.04ms  med=22.12ms max=50.73ms  p(90)=48.07ms  p(95)=50.21ms
       { expected_response:true }...: avg=44.76ms min=39.65ms med=44.64ms max=50.73ms  p(90)=50.24ms  p(95)=50.48ms
     http_req_failed................: 50.00%  ✓ 10  ✗ 10
     http_req_receiving.............: avg=94.78µs min=63.79µs med=80.77µs max=160.49µs p(90)=139.98µs p(95)=153.74µs
     http_req_sending...............: avg=31.11µs min=15.01µs med=30.39µs max=102.73µs p(90)=38.89µs  p(95)=50.68µs
     http_req_tls_handshaking.......: avg=1.41ms  min=0s      med=0s      max=28.29ms  p(90)=0s       p(95)=1.41ms
     http_req_waiting...............: avg=24.39ms min=3.93ms  med=21.99ms max=50.63ms  p(90)=47.97ms  p(95)=50.08ms
     http_reqs......................: 20      1.898688/s
     iteration_duration.............: avg=1.05s   min=1.04s   med=1.05s   max=1.08s    p(90)=1.05s    p(95)=1.06s
     iterations.....................: 10      0.949344/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

---

### load
```javascript
export let options = {
   stages: [
      { duration: '1m', target: 20 },
      { duration: '2m', target: 100 },
      { duration: '10s', target: 0 },
   ],
   thresholds: {
       http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
   },
};
```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.8s), 000/100 VUs, 7759 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

     ✓ logged in successfully
     ✓ path search complete

     checks.........................: 100.00% ✓ 15518 ✗ 0
     data_received..................: 19 MB   98 kB/s
     data_sent......................: 3.1 MB  16 kB/s
     http_req_blocked...............: avg=51.04µs min=3.16µs  med=5.25µs  max=44.22ms  p(90)=8.36µs  p(95)=10.67µs
     http_req_connecting............: avg=4.83µs  min=0s      med=0s      max=11.35ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=33.78ms min=1.34ms  med=27.45ms max=198.98ms p(90)=83.7ms  p(95)=96.84ms
       { expected_response:true }...: avg=63.72ms min=26.43ms med=61.64ms max=198.98ms p(90)=96.84ms p(95)=109.78ms
     http_req_failed................: 50.00%  ✓ 7759  ✗ 7759
     http_req_receiving.............: avg=89.72µs min=21.79µs med=57.21µs max=17.18ms  p(90)=97.77µs p(95)=129.6µs
     http_req_sending...............: avg=42.19µs min=9.47µs  med=18.62µs max=11.02ms  p(90)=40.56µs p(95)=56.92µs
     http_req_tls_handshaking.......: avg=33.27µs min=0s      med=0s      max=31.62ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=33.65ms min=1.26ms  med=27.31ms max=198.76ms p(90)=83.57ms p(95)=96.64ms
     http_reqs......................: 15518   81.346836/s
     iteration_duration.............: avg=1.06s   min=1.02s   med=1.06s   max=1.21s    p(90)=1.1s    p(95)=1.11s
     iterations.....................: 7759    40.673418/s
     vus............................: 5       min=1   max=100
     vus_max........................: 100     min=100 max=100
```

---

### stress
```javascript
export let options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '20s', target: 400 },
        { duration: '20s', target: 800 },
        { duration: '20s', target: 1000 },
        { duration: '20s', target: 500 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<100'], // 99% of requests must complete below 100ms
    },
}
```
#### 결과
```javascript

running (2m00.7s), 0000/1000 VUs, 25131 complete and 0 interrupted iterations
default ✓ [======================================] 0000/1000 VUs  2m0s

     ✗ logged in successfully
      ↳  42% — ✓ 10642 / ✗ 14489
     ✓ path search complete

     checks.........................: 58.31% ✓ 20266  ✗ 14489
     data_received..................: 94 MB  775 kB/s
     data_sent......................: 13 MB  107 kB/s
     http_req_blocked...............: avg=474.26ms min=0s      med=6.68µs   max=3.05s p(90)=1.42s    p(95)=1.61s
     http_req_connecting............: avg=196.54ms min=0s      med=149.39ms max=1.53s p(90)=477.04ms p(95)=566.27ms
   ✗ http_req_duration..............: avg=399.63ms min=0s      med=66.02ms  max=4.48s p(90)=1.24s    p(95)=1.79s
       { expected_response:true }...: avg=1.04s    min=26.09ms med=989.64ms max=4.48s p(90)=2.05s    p(95)=2.28s
     http_req_failed................: 73.09% ✓ 26149  ✗ 9624
     http_req_receiving.............: avg=7.46ms   min=0s      med=33.41µs  max=1.15s p(90)=330.9µs  p(95)=35.11ms
     http_req_sending...............: avg=32.12ms  min=0s      med=18.99µs  max=2.74s p(90)=89.95ms  p(95)=167.33ms
     http_req_tls_handshaking.......: avg=359.22ms min=0s      med=0s       max=2.52s p(90)=1.1s     p(95)=1.32s
     http_req_waiting...............: avg=360.04ms min=0s      med=27.53ms  max=4.48s p(90)=1.18s    p(95)=1.75s
     http_reqs......................: 35773  296.381486/s
     iteration_duration.............: avg=2.15s    min=6.37ms  med=1.78s    max=8.22s p(90)=4.15s    p(95)=4.58s
     iterations.....................: 25131  208.211867/s
     vus............................: 6      min=6    max=1000
     vus_max........................: 1000   min=1000 max=1000

ERRO[0122] some thresholds have failed

```