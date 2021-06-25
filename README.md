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
WEB : /home/ubuntu/infra-subway-deploy-main/logs  
WAS : /home/ubuntu/nginx/logs  
   
WEB : 52.78.141.177  
WAS : 3.35.231.219  
BASTION : 15.164.251.51  
URL : https://sooragenius.com  
2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD_ohgillwhan
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
과거에 https://www.sancheong.go.kr/www/index.do를 개선했던 경험이 있습니다.  
나라에서 안내를 받은 기준으로 개선을 했는데 그 결과보다 더 좋은결과를 내려고 노력해보겠습니다.
- PageSpeed Insgihts 기준
  점수 : 31 -> 90~
  FCP : 2초 이내
  TTI : 2초 이내
  SpeedIndex : 2초 이내
  LCP : 2초 이내
- WebPageTest 기준
  Compress Transfer : A등급
  Cache Static Content : A등급

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요  
가장 큰 문제는 vendors.js와 main.js 가 가장 큰 문제라고 생각이 듭니다.  
NGINX 에 압축과 캐시를 추가하였고, javascript는 async로 load하도록 수정하였습니다.  
   
그 결과 원했던 WebPageTest에서 SecurityScore를 제외한 나머지는 모두 A등급으로 되었습니다.  
그리고 PageSpeed Insights에서 Desktop은 토탈 93점 FCP : 0.7 초 TTI : 1.2초 Speed Index :1.3초를 달성했습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상시스템 범위  
API 테스트
- 목푯값 설정 ( load test 기준 )
지연시간 : 1500ms 미만  
처리량 : 가상유저 300명이 1초의 ThinkTime을 가지며 30초간 요청 및 95% 이상 성공률
ThinkTime : 1초  
부하유지시간 : 30초  
- 시나리오
  - 로그인 하기
  - 내 정보 가져오기
  - 구간에서 1호선 가져오기 
  - 로그인 후 녹양 - 용산 거리 가져오기 (24km)
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- smoke
```js

    ✓ get shortest line success
    ✓ logged in successfully
    ✓ retrieved member
    ✓ lines success!!

  ✓ checks.....................: 100.00% ✓ 216 ✗ 0
  data_received..............: 620 kB  20 kB/s
  data_sent..................: 60 kB   2.0 kB/s
  http_req_blocked...........: avg=1.57ms   min=1µs     med=3µs     max=170.29ms p(90)=5µs     p(95)=6µs
  http_req_connecting........: avg=102.36µs min=0s      med=0s      max=11.05ms  p(90)=0s      p(95)=0s     
  ✓ http_req_duration..........: avg=27.63ms  min=13.5ms  med=17.73ms max=63.09ms  p(90)=59.13ms p(95)=60.75ms
  http_req_receiving.........: avg=54.07µs  min=26µs    med=50µs    max=123µs    p(90)=79.5µs  p(95)=92.25µs
  http_req_sending...........: avg=18.96µs  min=8µs     med=17µs    max=89µs     p(90)=28µs    p(95)=37µs
  http_req_tls_handshaking...: avg=1.46ms   min=0s      med=0s      max=157.95ms p(90)=0s      p(95)=0s
  http_req_waiting...........: avg=27.55ms  min=13.43ms med=17.66ms max=63.03ms  p(90)=59.05ms p(95)=60.66ms
  http_reqs..................: 216     7.140259/s
  iteration_duration.........: avg=1.11s    min=1.1s    med=1.11s   max=1.27s    p(90)=1.12s   p(95)=1.12s
  iterations.................: 54      1.785065/s
  vus........................: 2       min=2 max=2
  vus_max....................: 2       min=2 max=2


```
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 2, // 1 user looping for 1 minute
  duration: '30s',

  thresholds: {
    checks: ['rate > 0.95'],
    http_req_duration: ['p(95)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://sooragenius.com';
const USERNAME = 'kyoing@naver.com';
const PASSWORD = 'qwe123';

export default function ()  {
  let loginRes = 로그인()
  로그인_검증하기(loginRes)

  let myObjects = 나의정보_조회하기(loginRes)

  나의정보_검증하기(myObjects)

  let lineRes = 라인_정보_가저오기(loginRes, 1);

  라인_정보_확인하기(lineRes, 1);

  let pathsRes = 경로_조회하기(loginRes, 1, 3)

  경로_조회하기_확인하기(pathsRes, 24)

  sleep(1);
};

export function 로그인() {
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

export function 로그인_검증하기(loginRes) {
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });
}

export function 나의정보_조회하기(loginRes) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  return http.get(`${BASE_URL}/members/me`, authHeaders).json();
}

export function 나의정보_검증하기(myObjects) {
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

export function 라인_정보_가저오기(loginRes, lineNumber) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
}

export function 라인_정보_확인하기(lineRes, lineNumber) {
  check(lineRes, {
    'lines success!!': (resp) => resp['id'] == lineNumber,
  });
}

export function 경로_조회하기(loginRes, source, target) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
}

export function 경로_조회하기_확인하기(pathsRes, exceptDistance) {
  check(pathsRes, {
    'get shortest line success': (resp) => resp['distance'] == exceptDistance,
  });
}
```
- load
```js
    ✗ logged in successfully
     ↳  95% — ✓ 3229 / ✗ 143
    ✓ retrieved member
    ✓ lines success!!
    ✓ get shortest line success

  ✓ checks.....................: 98.88% ✓ 12655 ✗ 143
  data_received..............: 52 MB  1.6 MB/s
  data_sent..................: 5.1 MB 156 kB/s
  http_req_blocked...........: avg=13.34ms  min=1µs     med=2µs      max=501.81ms p(90)=20.35ms  p(95)=43.53ms
  http_req_connecting........: avg=1.92ms   min=0s      med=0s       max=40.16ms  p(90)=5.53ms   p(95)=6.86ms  
  ✓ http_req_duration..........: avg=476.2ms  min=1.37ms  med=488.5ms  max=2.24s    p(90)=662.76ms p(95)=979.41ms
  http_req_receiving.........: avg=37.42µs  min=0s      med=34µs     max=533µs    p(90)=55µs     p(95)=67µs
  http_req_sending...........: avg=1.53ms   min=6µs     med=14µs     max=130.56ms p(90)=45µs     p(95)=57µs
  http_req_tls_handshaking...: avg=9.25ms   min=0s      med=0s       max=427.89ms p(90)=14.12ms  p(95)=16.85ms
  http_req_waiting...........: avg=474.63ms min=888µs   med=488.07ms max=2.24s    p(90)=662.61ms p(95)=979.26ms
  http_reqs..................: 12925  395.813133/s
  iteration_duration.........: avg=2.79s    min=19.17ms med=2.97s    max=5.5s     p(90)=3.55s    p(95)=3.9s
  iterations.................: 3372   103.263589/s
  vus........................: 88     min=88  max=300
  vus_max....................: 300    min=300 max=300
```

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 300, // 1 user looping for 1 minute
    duration: '30s',

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://sooragenius.com';
const USERNAME = 'kyoing@naver.com';
const PASSWORD = 'qwe123';

export default function ()  {
    let loginRes = 로그인()
    로그인_검증하기(loginRes)

    let myObjects = 나의정보_조회하기(loginRes)

    나의정보_검증하기(myObjects)

    let lineRes = 라인_정보_가저오기(loginRes, 1);

    라인_정보_확인하기(lineRes, 1);

    let pathsRes = 경로_조회하기(loginRes, 1, 3)

    경로_조회하기_확인하기(pathsRes, 24)

    sleep(1);
};

export function 로그인() {
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

export function 로그인_검증하기(loginRes) {
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
}

export function 나의정보_조회하기(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/members/me`, authHeaders).json();
}

export function 나의정보_검증하기(myObjects) {
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

export function 라인_정보_가저오기(loginRes, lineNumber) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
}

export function 라인_정보_확인하기(lineRes, lineNumber) {
    check(lineRes, {
        'lines success!!': (resp) => resp['id'] == lineNumber,
    });
}

export function 경로_조회하기(loginRes, source, target) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
}

export function 경로_조회하기_확인하기(pathsRes, exceptDistance) {
    check(pathsRes, {
        'get shortest line success': (resp) => resp['distance'] == exceptDistance,
    });
}
```

- stress
```js
    ✓ retrieved member
    ✓ lines success!!
    ✓ get shortest line success
    ✗ logged in successfully
     ↳  77% — ✓ 15106 / ✗ 4426

  ✗ checks.....................: 92.54% ✓ 54939 ✗ 4426 
    data_received..............: 219 MB 1.6 MB/s
    data_sent..................: 24 MB  172 kB/s
    http_req_blocked...........: avg=15.74ms  min=0s     med=3µs      max=201.6ms  p(90)=76.49ms  p(95)=92.71ms 
    http_req_connecting........: avg=1.39ms   min=0s     med=0s       max=32.51ms  p(90)=7.39ms   p(95)=9.24ms  
  ✓ http_req_duration..........: avg=276.79ms min=0s     med=202.09ms max=3.86s    p(90)=547.45ms p(95)=796.16ms
    http_req_receiving.........: avg=37.23µs  min=0s     med=35µs     max=6.01ms   p(90)=60µs     p(95)=71µs    
    http_req_sending...........: avg=6.2ms    min=0s     med=15µs     max=142.04ms p(90)=59µs     p(95)=68.66ms 
    http_req_tls_handshaking...: avg=8.86ms   min=0s     med=0s       max=158.51ms p(90)=42.52ms  p(95)=73.88ms 
    http_req_waiting...........: avg=270.54ms min=0s     med=199.89ms max=3.86s    p(90)=543.46ms p(95)=777.92ms
    http_reqs..................: 61935  440.607001/s
    iteration_duration.........: avg=1.55s    min=2.34ms med=1.52s    max=7.29s    p(90)=2.94s    p(95)=3.33s   
    iterations.................: 19532  138.951093/s
    vus........................: 6      min=6   max=399
    vus_max....................: 400    min=400 max=400

```

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '30s', target: 300 },
        { duration: '20s', target: 400 },
        { duration: '10s', target: 300 },
        { duration: '20s', target: 200 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://sooragenius.com';
const USERNAME = 'kyoing@naver.com';
const PASSWORD = 'qwe123';

export default function ()  {
    let loginRes = 로그인()
    로그인_검증하기(loginRes)

    let myObjects = 나의정보_조회하기(loginRes)

    나의정보_검증하기(myObjects)

    let lineRes = 라인_정보_가저오기(loginRes, 1);

    라인_정보_확인하기(lineRes, 1);

    let pathsRes = 경로_조회하기(loginRes, 1, 3)

    경로_조회하기_확인하기(pathsRes, 24)

    sleep(1);
};

export function 로그인() {
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

export function 로그인_검증하기(loginRes) {
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
}

export function 나의정보_조회하기(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/members/me`, authHeaders).json();
}

export function 나의정보_검증하기(myObjects) {
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

export function 라인_정보_가저오기(loginRes, lineNumber) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
}

export function 라인_정보_확인하기(lineRes, lineNumber) {
    check(lineRes, {
        'lines success!!': (resp) => resp['id'] == lineNumber,
    });
}

export function 경로_조회하기(loginRes, source, target) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
}

export function 경로_조회하기_확인하기(pathsRes, exceptDistance) {
    check(pathsRes, {
        'get shortest line success': (resp) => resp['distance'] == exceptDistance,
    });
}
```

해당 테스트를 통해 350명 이상이 넘어가면 실패하는 케이스가 많이 늘기 시작함.

