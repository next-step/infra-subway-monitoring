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
   - syslog: `/var/log/syslog`
   - nginx-access: `/var/log/nginx/access.log`
   - nginx-error: `/var/log/nginx/error.log`
   - app-log: `/home/ubuntu/log/file.log`

2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD_wrallee

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   - 주요 페이지 정량/시간/규칙 기반 산정
   - 예산은 경쟁사 대비 최대 120% 전후 성능으로 예산을 산정합니다.
   - 시간 기반 규칙의 경우 1초 이내의 항목에 대해선 120%를 초과해도 허용합니다.
   - 각 항목에 경쟁 사이트 점수 괄호로 표기(⇔ `subwayLine.naver`)
     - Quantity based Metric
       - 리소스 합계 최대 `1MB`(⇔ `773KB`)
     - Timing based Metric
       - FCP `1.0s`(⇔ `0.641s`)
       - TTI `1.2s`(⇔ `1.003s`)
       - LCP `3s`(⇔ `2.885s`)
     - Rule based Metric
       - Lighthouse `80점` 이상(⇔ `89점`)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 응답에 gzip 압축 적용
      - 응답을 압축하여 네트워크 전송 시간을 줄입니다.
   - 자바스크립트 실행 시간 단축
      - vendors.js 코드를 분할하여 파싱, 컴파일, 실행 소요시간을 줄입니다.
      - 분할 된 js 중 필수적이지 않은 코드를 지연로딩합니다.
   - 캐시 컨트롤 적용
      - 캐시 정책을 적용하여 재방문에 대한 속도를 높입니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - 예상 서비스 규모 ⇔ (네이버 지도 MAU `1,112만`)
      - 내 서비스 DAU `200,000`
      - 피크시간대 집중율 `10`
      - 1일 요청 수 `5`
      - 1일 총 접속 수 `1,000,000`
      - 1일 평균 rps `11.57`
      - 1일 최대 rps `57.87`
      - Latency `100ms`
   - 대상 메뉴
      - `메인 페이지`
      - `로그인 페이지`
      - `경로 검색 페이지`
      - `내 정보 수정 페이지`
   - 테스트 방식
      - 각 테스트 당 일정 시간 부하 유지
         - smoke `10초`
         - load `2분`
         - stress `4분`
   
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- ### smoke 테스트
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

const BASE_URL = 'https://xn--vo5bi4h.xn--yq5b.xn--3e0b707e';
const USERNAME = 'abc@gmail.com';
const PASSWORD = '123456';

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
    check(myObjects, {
        'retrieved member': (obj) => obj.id != 0
    });

    sleep(1);
}
```

- ### 테스트 결과
```shell script
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


running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20  ✗ 0
     data_received..................: 11 kB   1.1 kB/s
     data_sent......................: 5.8 kB  556 B/s
     http_req_blocked...............: avg=3.1ms    min=3.2µs   med=9.64µs  max=61.84ms p(90)=14.38µs  p(95)=3.11ms
     http_req_connecting............: avg=191.19µs min=0s      med=0s      max=3.82ms  p(90)=0s       p(95)=191.19µs
   ✓ http_req_duration..............: avg=16.23ms  min=10.79ms med=11.66ms max=62.51ms p(90)=22.06ms  p(95)=38.94ms
       { expected_response:true }...: avg=16.23ms  min=10.79ms med=11.66ms max=62.51ms p(90)=22.06ms  p(95)=38.94ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 20
     http_req_receiving.............: avg=141.32µs min=57.1µs  med=130.1µs max=421.6µs p(90)=178.42µs p(95)=230.08µs
     http_req_sending...............: avg=47.61µs  min=12.3µs  med=41µs    max=165.6µs p(90)=69.72µs  p(95)=136.24µs
     http_req_tls_handshaking.......: avg=1.93ms   min=0s      med=0s      max=38.72ms p(90)=0s       p(95)=1.93ms
     http_req_waiting...............: avg=16.04ms  min=10.71ms med=11.49ms max=62.25ms p(90)=21.98ms  p(95)=38.77ms
     http_reqs......................: 20      1.921829/s
     iteration_duration.............: avg=1.04s    min=1.02s   med=1.02s   max=1.14s   p(90)=1.05s    p(95)=1.1s
     iterations.....................: 10      0.960915/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

- ### load 테스트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    scenarios: {
        averageTest: {
            executor: 'constant-vus',
            vus: 20,
            duration: '60s',
        },
        peakTimeTest: {
            executor: 'constant-vus',
            startTime: '80s',
            vus: 100,
            duration: '60s',
        }
    },

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://xn--vo5bi4h.xn--yq5b.xn--3e0b707e';
const USERNAME = 'abc@gmail.com';
const PASSWORD = '123456';

export default function ()  {

    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
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
            'Authorization': `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myInfoObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myInfoObjects, {
        'retrieved member': (obj) => obj.id !== 0,
    });


    const updatePayload = JSON.stringify({
        'age': '32',
        'email': USERNAME,
        'password': PASSWORD,
    });

    let updateHeaders = {
        headers: {
            'Authorization': `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    let updateRes = http.put(`${BASE_URL}/members/me`, updatePayload, updateHeaders);
    check(updateRes, {
        'information updated': (res) => res.status === 200
    });


    let pathObjects = http.get(`${BASE_URL}/paths/?source=7&target=29`).json();
    check(pathObjects, {
        'retrieved path': (obj) => obj.stations !== undefined
    });

    sleep(1);
}
```

- ### 테스트 결과
```shell script
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 2 scenarios, 120 max VUs, 2m50s max duration (incl. graceful stop):
           * averageTest: 20 looping VUs for 1m0s (gracefulStop: 30s)
           * peakTimeTest: 100 looping VUs for 1m0s (startTime: 1m20s, gracefulStop: 30s)


running (2m26.2s), 000/120 VUs, 1799 complete and 0 interrupted iterations
averageTest  ✓ [======================================] 20 VUs   1m0s
peakTimeTest ✓ [======================================] 100 VUs  1m0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ information updated
     ✓ retrieved path

     checks.........................: 100.00% ✓ 7196  ✗ 0
     data_received..................: 6.6 MB  45 kB/s
     data_sent......................: 2.0 MB  14 kB/s
     http_req_blocked...............: avg=4.07ms   min=1.6µs  med=5.8µs    max=867.16ms p(90)=12.3µs  p(95)=18µs
     http_req_connecting............: avg=362.29µs min=0s     med=0s       max=30.22ms  p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=792.61ms min=6.49ms med=559.8ms  max=5.01s    p(90)=1.89s   p(95)=2.14s
       { expected_response:true }...: avg=792.61ms min=6.49ms med=559.8ms  max=5.01s    p(90)=1.89s   p(95)=2.14s
     http_req_failed................: 0.00%   ✓ 0     ✗ 7196
     http_req_receiving.............: avg=104.51µs min=11.4µs med=84.3µs   max=18.77ms  p(90)=161.8µs p(95)=221.27µs
     http_req_sending...............: avg=30.21µs  min=5.1µs  med=23.9µs   max=614µs    p(90)=52.1µs  p(95)=66.4µs
     http_req_tls_handshaking.......: avg=1.43ms   min=0s     med=0s       max=164.76ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=792.48ms min=6.42ms med=559.65ms max=5.01s    p(90)=1.89s   p(95)=2.14s
     http_reqs......................: 7196    49.229095/s
     iteration_duration.............: avg=4.18s    min=1.12s  med=5.21s    max=10.07s   p(90)=6.86s   p(95)=7.09s
     iterations.....................: 1799    12.307274/s
     vus............................: 7       min=0   max=100
     vus_max........................: 120     min=120 max=120

ERRO[0147] some thresholds have failed
```

- ### stress 테스트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    scenarios: {
        testWithVUs10: {
            executor: 'constant-vus', vus: 10, duration: '30s',
        },
        testWithVUs30: {
            executor: 'constant-vus', startTime: '30s', vus: 30, duration: '30s',
        },
        testWithVUs50: {
            executor: 'constant-vus', startTime: '60s', vus: 50, duration: '30s',
        },
        testWithVUs70: {
            executor: 'constant-vus', startTime: '90s', vus: 70, duration: '30s',
        },
        testWithVUs90: {
            executor: 'constant-vus', startTime: '120s', vus: 90, duration: '30s',
        },
        testWithVUs110: {
            executor: 'constant-vus', startTime: '150s', vus: 110, duration: '30s',
        },
        testWithVUs130: {
            executor: 'constant-vus', startTime: '180s', vus: 130, duration: '30s',
        },
        testWithVUs150: {
            executor: 'constant-vus', startTime: '210s', vus: 150, duration: '30s',
        },
    },

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://xn--vo5bi4h.xn--yq5b.xn--3e0b707e';
const USERNAME = 'abc@gmail.com';
const PASSWORD = '123456';

export default function ()  {

    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
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
            'Authorization': `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myInfoObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myInfoObjects, {
        'retrieved member': (obj) => obj.id !== 0,
    });


    const updatePayload = JSON.stringify({
        'age': '32',
        'email': USERNAME,
        'password': PASSWORD,
    });

    let updateHeaders = {
        headers: {
            'Authorization': `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    let updateRes = http.put(`${BASE_URL}/members/me`, updatePayload, updateHeaders);
    check(updateRes, {
        'information updated': (res) => res.status === 200
    });


    let pathObjects = http.get(`${BASE_URL}/paths/?source=7&target=29`).json();
    check(pathObjects, {
        'retrieved path': (obj) => obj.stations !== undefined
    });

    sleep(1);
}
```

- ### 테스트 결과
```shell script
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 8 scenarios, 280 max VUs, 4m30s max duration (incl. graceful stop):
           * testWithVUs10: 10 looping VUs for 30s (gracefulStop: 30s)
           * testWithVUs30: 30 looping VUs for 30s (startTime: 30s, gracefulStop: 30s)
           * testWithVUs50: 50 looping VUs for 30s (startTime: 1m0s, gracefulStop: 30s)
           * testWithVUs70: 70 looping VUs for 30s (startTime: 1m30s, gracefulStop: 30s)
           * testWithVUs90: 90 looping VUs for 30s (startTime: 2m0s, gracefulStop: 30s)
           * testWithVUs110: 110 looping VUs for 30s (startTime: 2m30s, gracefulStop: 30s)
           * testWithVUs130: 130 looping VUs for 30s (startTime: 3m0s, gracefulStop: 30s)
           * testWithVUs150: 150 looping VUs for 30s (startTime: 3m30s, gracefulStop: 30s)


running (4m09.5s), 000/280 VUs, 3564 complete and 0 interrupted iterations
testWithVUs10  ✓ [======================================] 10 VUs   30s
testWithVUs30  ✓ [======================================] 30 VUs   30s
testWithVUs50  ✓ [======================================] 50 VUs   30s
testWithVUs70  ✓ [======================================] 70 VUs   30s
testWithVUs90  ✓ [======================================] 90 VUs   30s
testWithVUs110 ✓ [======================================] 110 VUs  30s
testWithVUs130 ✓ [======================================] 130 VUs  30s
testWithVUs150 ✓ [======================================] 150 VUs  30s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ information updated
     ✓ retrieved path

     checks.........................: 100.00% ✓ 14256 ✗ 0
     data_received..................: 14 MB   54 kB/s
     data_sent......................: 4.1 MB  16 kB/s
     http_req_blocked...............: avg=1.99ms   min=1.4µs  med=4.9µs    max=340.8ms  p(90)=11µs    p(95)=15µs
     http_req_connecting............: avg=327.64µs min=0s     med=0s       max=23.88ms  p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=1.25s    min=6.6ms  med=770.53ms max=9.29s    p(90)=3.25s   p(95)=4.16s
       { expected_response:true }...: avg=1.25s    min=6.6ms  med=770.53ms max=9.29s    p(90)=3.25s   p(95)=4.16s
     http_req_failed................: 0.00%   ✓ 0     ✗ 14256
     http_req_receiving.............: avg=83.51µs  min=12.5µs med=71.8µs   max=2.27ms   p(90)=138.9µs p(95)=162.5µs
     http_req_sending...............: avg=25.44µs  min=4.7µs  med=20.2µs   max=1.54ms   p(90)=44.2µs  p(95)=54.6µs
     http_req_tls_handshaking.......: avg=1.65ms   min=0s     med=0s       max=328.71ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1.25s    min=6.52ms med=770.42ms max=9.29s    p(90)=3.25s   p(95)=4.16s
     http_reqs......................: 14256   57.141964/s
     iteration_duration.............: avg=6.03s    min=1.11s  med=5.75s    max=18.92s   p(90)=10.5s   p(95)=12.39s
     iterations.....................: 3564    14.285491/s
     vus............................: 11      min=10  max=264
     vus_max........................: 280     min=280 max=280

ERRO[0250] some thresholds have failed
```
