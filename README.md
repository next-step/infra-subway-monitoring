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

- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] 로그 설정하기
  - [x] 로그인, 회원가입, 최단경로 api 로깅
  - [x] nginx access log 설정
```
# nginx.conf

events {}

http {
    log_format upstream_time '$remote_addr - $remote_user [$time_local] '
                             '"$request" $status $body_bytes_sent '
                             '"$http_referer" "$http_user_agent"'
                             'rt=$request_time uct="$upstream_connect_time" uht="$upstream_header_time" urt="$upstream_response_time"';
    
    upstream app {
        server 192.168.3.45:8080;
    }
    
    # Redirect all traffic to HTTPS
    server {
        listen 80;
        return 301 https://$host$request_uri;
    }
    
    server {
        access_log /var/log/nginx/access.log upstream_time;
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/nextstep.5minho.p-e.kr/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/nextstep.5minho.p-e.kr/privkey.pem;
    
        ...
    }
}
```
- [x] Cloudwatch 로 모니터링
  - [x] Cloudwatch 로 로그 수집하기
  - [x] Cloudwatch 로 메트릭 수집하기

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요

#### application
* ip : 3.34.196.155
* 로그 경로 : /home/ubuntu/app/infra-subway-monitoring/log (https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/5minho_was_sys_log)
#### reverse-proxy
* ip : 3.37.87.194
* 로그 경로 
  * /var/log/nginx/access.log (https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/5minho_reverse_proxy_access.log)
  * /var/log/nginx/error.log (https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/5minho_reverse_proxy_error.log)

2. Cloudwatch 대시보드 URL을 알려주세요

https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-5minho;start=PT1H

---
-[ ] 웹 성능 테스트
    -[ ] 예산 작성
    -[ ] 개선이 필요한 부분 파악
-[x] 부하테스트
    -[x] 목표치 설정
    -[x] 부하 테스트를 위한 네트워크 구성
    -[x] 부하 테스트 진행
    
### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
* 대상 시스템 범위
  * web server, application server, db server
* 목푯값 설정
  1. DAU : 5,000,000 명 (카카오맵, T맵의 DAU 를 참고)
  2. 1 명당 1일 요청 수 : 2 x 3 = 6 (접속 수 (출근, 퇴근) x 요청 수 (내 정보 조회 + 지하철 목록 조회 + 최단 경로 조회)) 
  3. 1일 총 요청 수 : 30,000,000 (1일 사용자 수(DAU) x 1명당 1일 평균 요청 수)
  4. 1일 평균 rps : 347,222 (1일 총 요청 수 / 86,400 (초/일))
  5. 1일 최대 rps : 1,736,110 (1일 평균 rps x (최대 트래픽 / 평소 트래픽), 5배 정도 예상했음) 
  6. latency : 100ms
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

## 접속 빈도가 높은 페이지 : 메인페이지 (로그인 api, 내 정보 조회 api)
### Smoke
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, 
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<100'], 
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

function 로그인() {
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

function 내_정보_조회(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
}

export default function ()  {
    const token = 로그인().json('accessToken');
    내_정보_조회(token);
}

```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: freq_smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 0/1 VUs, 437 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 874     ✗ 0
     data_received..................: 306 kB  31 kB/s
     data_sent......................: 229 kB  23 kB/s
     http_req_blocked...............: avg=58.87µs min=4.28µs  med=5.16µs  max=46.81ms  p(90)=5.79µs   p(95)=6.36µs
     http_req_connecting............: avg=1.51µs  min=0s      med=0s      max=1.32ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=11.18ms min=8.64ms  med=12ms    max=24.99ms  p(90)=13.02ms  p(95)=13.49ms
       { expected_response:true }...: avg=11.18ms min=8.64ms  med=12ms    max=24.99ms  p(90)=13.02ms  p(95)=13.49ms
     http_req_failed................: 0.00%   ✓ 0       ✗ 874
     http_req_receiving.............: avg=84.96µs min=53.69µs med=84.56µs max=157.89µs p(90)=100.65µs p(95)=104.88µs
     http_req_sending...............: avg=22.26µs min=13.61µs med=20.99µs max=110.06µs p(90)=32.88µs  p(95)=35.92µs
     http_req_tls_handshaking.......: avg=37.02µs min=0s      med=0s      max=32.35ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=11.07ms min=8.56ms  med=11.89ms max=24.87ms  p(90)=12.92ms  p(95)=13.37ms
     http_reqs......................: 874     87.2884/s
     iteration_duration.............: avg=22.89ms min=21.04ms med=22.46ms max=72.4ms   p(90)=23.77ms  p(95)=24.87ms
     iterations.....................: 437     43.6442/s
     vus............................: 1       min=1     max=1
     vus_max........................: 1       min=1     max=1

```
### Load
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 40},
        {duration: '35s', target: 70},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

export default function ()  {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    function 로그인() {
        let params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

        check(loginRes, {
            'logged in successfully': (resp) => resp.json('accessToken') !== '',
        });
        return loginRes;
    }

    function 내_정보_조회(accessToken) {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
        check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    }

    // 시나리오
    let token = 로그인().json('accessToken');
    내_정보_조회(token);
}
```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: freq_load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.0s), 00/70 VUs, 35245 complete and 0 interrupted iterations
default ✗ [======================================] 00/70 VUs  1m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 70490       ✗ 0
     data_received..................: 25 MB   414 kB/s
     data_sent......................: 18 MB   307 kB/s
     http_req_blocked...............: avg=16.15µs min=2.57µs  med=4.29µs  max=30.87ms  p(90)=4.91µs   p(95)=5.62µs
     http_req_connecting............: avg=2.13µs  min=0s      med=0s      max=4.18ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=35.11ms min=8.34ms  med=36.19ms max=246.3ms  p(90)=52.96ms  p(95)=62.42ms
       { expected_response:true }...: avg=35.11ms min=8.34ms  med=36.19ms max=246.3ms  p(90)=52.96ms  p(95)=62.42ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 70490
     http_req_receiving.............: avg=54.26µs min=23.55µs med=52.37µs max=15.14ms  p(90)=63.89µs  p(95)=70.73µs
     http_req_sending...............: avg=21.98µs min=9.42µs  med=15.38µs max=8.33ms   p(90)=25.46µs  p(95)=29.72µs
     http_req_tls_handshaking.......: avg=9.15µs  min=0s      med=0s      max=28.97ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=35.03ms min=8.26ms  med=36.1ms  max=246.22ms p(90)=52.88ms  p(95)=62.24ms
     http_reqs......................: 70490   1174.716564/s
     iteration_duration.............: avg=70.55ms min=20.27ms med=70.53ms max=293.07ms p(90)=105.63ms p(95)=122.34ms
     iterations.....................: 35245   587.358282/s
     vus............................: 1       min=1         max=69
     vus_max........................: 70      min=70        max=70

```

> 서비스가 원활한 상태 (응답 속도 100ms 이하) 를 유지하려면 vux 가 최대 70, rps 최대 1200 이하 정도여야 한다.  

### Stress
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 100},
        {duration: '10s', target: 200},
        {duration: '10s', target: 300},
        {duration: '10s', target: 400},
        {duration: '10s', target: 500},
        {duration: '10s', target: 600},
        {duration: '10s', target: 700},
        {duration: '10s', target: 800},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1000ms
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

function 로그인() {
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    return loginRes;
}

function 내_정보_조회(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
}

export default function ()  {
    const token = 로그인().json('accessToken');
    내_정보_조회(token);
}

```
> 어플리케이션이 견딜 수 있는 최대 트래픽을 찾기 위해 vux 100 부터 100 단위로 증가 시켜 부하를 줌

#### 결과
```javascript

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: freq_stress.js
output: -

    scenarios: (100.00%) 1 scenario, 800 max VUs, 1m50s max duration (incl. graceful stop):
* default: Up to 800 looping VUs for 1m20s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)

...

    running (1m20.7s), 000/800 VUs, 67217 complete and 0 interrupted iterations
default ✗ [======================================] 000/800 VUs  1m20s

     ✓ retrieved member

checks.........................: 100.00% ✓ 67200       ✗ 0
data_received..................: 50 MB   621 kB/s
data_sent......................: 35 MB   439 kB/s
http_req_blocked...............: avg=58.59µs  min=0s       med=4.21µs   max=81.6ms  p(90)=5.01µs   p(95)=6.53µs
http_req_connecting............: avg=10.77µs  min=0s       med=0s       max=27.1ms  p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=240.01ms min=220.08µs med=189.16ms max=3.97s   p(90)=492.5ms  p(95)=618.63ms
{ expected_response:true }...: avg=240.04ms min=8.45ms   med=189.19ms max=3.97s   p(90)=492.56ms p(95)=618.65ms
http_req_failed................: 0.01%   ✓ 17          ✗ 134402
http_req_receiving.............: avg=56.8µs   min=0s       med=51.31µs  max=23.3ms  p(90)=66.42µs  p(95)=74.78µs
http_req_sending...............: avg=25.08µs  min=9.51µs   med=15.39µs  max=17.92ms p(90)=27.25µs  p(95)=35.4µs
http_req_tls_handshaking.......: avg=41.85µs  min=0s       med=0s       max=56.31ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=239.92ms min=204.32µs med=189.06ms max=3.97s   p(90)=492.44ms p(95)=618.56ms
http_reqs......................: 134419  1665.471065/s
iteration_duration.............: avg=480.34ms min=401.87µs med=406.4ms  max=4.37s   p(90)=950.3ms  p(95)=1.16s
iterations.....................: 67217   832.828458/s
vus............................: 799     min=10        max=799
vus_max........................: 800     min=800       max=800

ERRO[0082] some thresholds have failed
```
> vux 770 정도 부터 요청이 실패하기 시작했다.

## 데이터를 갱신하는 페이지 : 내 정보 수정 페이지 (로그인 api, 내 정보 수정 api)
### Smoke
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

function 로그인() {
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

function 내_정보_수정(accessToken) {
    let authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 20
    });

    let updateRes = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
    check(updateRes, {
        'update member': (res) => res.status === 200
    });
}

export default function ()  {
    const token = 로그인().json('accessToken');
    내_정보_수정(token);
}
```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update-smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 0/1 VUs, 451 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ update member

     checks.........................: 100.00% ✓ 902       ✗ 0
     data_received..................: 274 kB  27 kB/s
     data_sent......................: 285 kB  28 kB/s
     http_req_blocked...............: avg=76.04µs min=3.65µs  med=4.74µs  max=64.06ms  p(90)=5.37µs  p(95)=6.37µs
     http_req_connecting............: avg=1.37µs  min=0s      med=0s      max=1.24ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=10.84ms min=8.58ms  med=11.8ms  max=18.73ms  p(90)=12.73ms p(95)=12.93ms
       { expected_response:true }...: avg=10.84ms min=8.58ms  med=11.8ms  max=18.73ms  p(90)=12.73ms p(95)=12.93ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 902
     http_req_receiving.............: avg=56.17µs min=31.83µs med=55.15µs max=330.22µs p(90)=70.94µs p(95)=75.6µs
     http_req_sending...............: avg=24.01µs min=14.87µs med=21.7µs  max=349.27µs p(90)=31.13µs p(95)=32.7µs
     http_req_tls_handshaking.......: avg=32.7µs  min=0s      med=0s      max=29.49ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=10.76ms min=8.48ms  med=11.53ms max=18.65ms  p(90)=12.66ms p(95)=12.86ms
     http_reqs......................: 902     90.128719/s
     iteration_duration.............: avg=22.17ms min=20.87ms med=21.88ms max=95.07ms  p(90)=22.84ms p(95)=23.22ms
     iterations.....................: 451     45.064359/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1

```
### Load
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 40},
        {duration: '35s', target: 70},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

function 로그인() {
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

function 내_정보_수정(accessToken) {
    let authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 20
    });

    let updateRes = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
    check(updateRes, {
        'update member': (res) => res.status === 200
    });
}

export default function ()  {
    const token = 로그인().json('accessToken');
    내_정보_수정(token);
}
```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update-load.js
     output: -

  scenarios: (100.00%) 1 scenario, 70 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 70 looping VUs for 1m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.0s), 00/70 VUs, 44459 complete and 0 interrupted iterations
default ✓ [======================================] 00/70 VUs  1m0s

     ✓ logged in successfully
     ✓ update member

     checks.........................: 100.00% ✓ 88918       ✗ 0
     data_received..................: 27 MB   452 kB/s
     data_sent......................: 28 MB   468 kB/s
     http_req_blocked...............: avg=15.81µs min=2.72µs  med=4.2µs   max=31.12ms  p(90)=4.82µs  p(95)=5.52µs
     http_req_connecting............: avg=2µs     min=0s      med=0s      max=2.7ms    p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=27.8ms  min=8.31ms  med=25.03ms max=264.13ms p(90)=46.03ms p(95)=55.55ms
       { expected_response:true }...: avg=27.8ms  min=8.31ms  med=25.03ms max=264.13ms p(90)=46.03ms p(95)=55.55ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 88918
     http_req_receiving.............: avg=47.02µs min=17.66µs med=39.62µs max=11.64ms  p(90)=59.62µs p(95)=66.03µs
     http_req_sending...............: avg=25.35µs min=11.41µs med=16.19µs max=13.37ms  p(90)=27.82µs p(95)=33.07µs
     http_req_tls_handshaking.......: avg=9.07µs  min=0s      med=0s      max=29.28ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=27.72ms min=8.24ms  med=24.96ms max=264.09ms p(90)=45.96ms p(95)=55.48ms
     http_reqs......................: 88918   1481.451841/s
     iteration_duration.............: avg=55.92ms min=20.24ms med=52.87ms max=287.39ms p(90)=86.89ms p(95)=100.35ms
     iterations.....................: 44459   740.725921/s
     vus............................: 1       min=1         max=69
     vus_max........................: 70      min=70        max=70

```
> 내 정보 수정 페이지는 vux 70 정도 이하에서 원활하게 (응답속도 100ms) 작동함

### Stress
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 100},
        {duration: '10s', target: 200},
        {duration: '10s', target: 300},
        {duration: '10s', target: 400},
        {duration: '10s', target: 500},
        {duration: '10s', target: 600}
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

function 로그인() {
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

function 내_정보_수정(accessToken) {
    let authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 20
    });

    let updateRes = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
    check(updateRes, {
        'update member': (res) => res.status === 200
    });
}

export default function ()  {
    const token = 로그인().json('accessToken');
    내_정보_수정(token);
}
```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update-stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 780 max VUs, 1m50s max duration (incl. graceful stop):
           * default: Up to 780 looping VUs for 1m20s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)

	
running (1m21.0s), 000/780 VUs, 66735 complete and 0 interrupted iterations
default ✗ [======================================] 000/780 VUs  1m20s

     ✗ logged in successfully
      ↳  99% — ✓ 66730 / ✗ 5
     ✗ update member
      ↳  99% — ✓ 66729 / ✗ 1

     checks.........................: 99.99% ✓ 133459      ✗ 6
     data_received..................: 43 MB  536 kB/s
     data_sent......................: 42 MB  523 kB/s
     http_req_blocked...............: avg=56.22µs  min=2.79µs   med=4.2µs    max=116.65ms p(90)=4.88µs   p(95)=5.86µs
     http_req_connecting............: avg=10.33µs  min=0s       med=0s       max=43.31ms  p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=240.9ms  min=476.1µs  med=197.42ms max=3.59s    p(90)=493.32ms p(95)=607.85ms
       { expected_response:true }...: avg=240.91ms min=8.51ms   med=197.42ms max=3.59s    p(90)=493.33ms p(95)=607.85ms
     http_req_failed................: 0.00%  ✓ 6           ✗ 133459
     http_req_receiving.............: avg=51.51µs  min=0s       med=40.52µs  max=29.29ms  p(90)=61.54µs  p(95)=69.82µs
     http_req_sending...............: avg=28.38µs  min=11.53µs  med=16.57µs  max=24.65ms  p(90)=29.08µs  p(95)=37.78µs
     http_req_tls_handshaking.......: avg=40.7µs   min=0s       med=0s       max=95.84ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=240.82ms min=459.31µs med=197.31ms max=3.59s    p(90)=493.23ms p(95)=607.76ms
     http_reqs......................: 133465 1647.843306/s
     iteration_duration.............: avg=482.2ms  min=1.25ms   med=427.88ms max=4.03s    p(90)=939.29ms p(95)=1.12s
     iterations.....................: 66735  823.95252/s
     vus............................: 0      min=0         max=779
     vus_max........................: 780    min=780       max=780

ERRO[0082] some thresholds have failed
```
## 데이터를 조회하는데 여러 데이터를 참조하는 페이지 : 경로 검색 페이지 (지하철 api, 경로 검색 api)
### Smoke
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';

function 경로_검색(source, target) {
    let pathRes = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);
    check(pathRes, {'find path': (res) => res.status === 200});
}

function 지하철_조회() {
    let stationsRes = http.get(`${BASE_URL}/stations`);
    check(stationsRes, {'find stations': (res) => res.status === 200});
}

export default function ()  {
    지하철_조회();
    경로_검색(103, 102);
}

```
#### 결과
```javascript
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: multi-select-smoke.js
output: -

scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 0/1 VUs, 128 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ find stations
     ✓ find path

     checks.........................: 100.00% ✓ 256       ✗ 0
     data_received..................: 9.3 MB  929 kB/s
     data_sent......................: 35 kB   3.5 kB/s
     http_req_blocked...............: avg=155.76µs min=4.58µs  med=5.72µs   max=38.36ms  p(90)=6.38µs  p(95)=7.95µs
     http_req_connecting............: avg=9.16µs   min=0s      med=0s       max=2.34ms   p(90)=0s      p(95)=0s
✓ http_req_duration..............: avg=38.73ms  min=17.87ms med=41.67ms  max=279.29ms p(90)=57.98ms p(95)=63.36ms
{ expected_response:true }...: avg=38.73ms  min=17.87ms med=41.67ms  max=279.29ms p(90)=57.98ms p(95)=63.36ms
http_req_failed................: 0.00%   ✓ 0         ✗ 256
http_req_receiving.............: avg=1.22ms   min=78.97µs med=732.04µs max=7ms      p(90)=2.43ms  p(95)=2.65ms
http_req_sending...............: avg=20.12µs  min=15.92µs med=18.47µs  max=79.61µs  p(90)=26.53µs p(95)=29.63µs
http_req_tls_handshaking.......: avg=135.6µs  min=0s      med=0s       max=34.71ms  p(90)=0s      p(95)=0s
http_req_waiting...............: avg=37.48ms  min=15.75ms med=38.21ms  max=279.15ms p(90)=57.86ms p(95)=63.24ms
http_reqs......................: 256     25.582461/s
iteration_duration.............: avg=78.14ms  min=70.53ms med=73.79ms  max=343.18ms p(90)=84.98ms p(95)=89.39ms
iterations.....................: 128     12.791231/s
vus............................: 1       min=1       max=1
vus_max........................: 1       min=1       max=1
```
### Load
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 5},
        {duration: '35s', target: 10},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';

function 경로_검색(source, target) {
    let pathRes = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);
    check(pathRes, {'find path': (res) => res.status === 200});
}

function 지하철_조회() {
    let stationsRes = http.get(`${BASE_URL}/stations`);
    check(stationsRes, {'find stations': (res) => res.status === 200});
}

export default function ()  {
    지하철_조회();
    경로_검색(103, 102);
}
```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: multi-select-load.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 10 looping VUs for 1m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.1s), 00/10 VUs, 3661 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  1m0s

     ✓ find stations
     ✓ find path

     checks.........................: 100.00% ✓ 7322       ✗ 0
     data_received..................: 266 MB  4.4 MB/s
     data_sent......................: 997 kB  17 kB/s
     http_req_blocked...............: avg=20.89µs min=3.31µs  med=4.75µs   max=33.95ms  p(90)=5.72µs   p(95)=6.17µs
     http_req_connecting............: avg=2.23µs  min=0s      med=0s       max=1.58ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=43.93ms min=17.24ms med=50.03ms  max=126.59ms p(90)=74.2ms   p(95)=79.48ms
       { expected_response:true }...: avg=43.93ms min=17.24ms med=50.03ms  max=126.59ms p(90)=74.2ms   p(95)=79.48ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7322
     http_req_receiving.............: avg=1.47ms  min=28.48µs med=579.71µs max=21.53ms  p(90)=3.06ms   p(95)=3.92ms
     http_req_sending...............: avg=18.89µs min=10.5µs  med=15.42µs  max=3.87ms   p(90)=23.76µs  p(95)=26.61µs
     http_req_tls_handshaking.......: avg=13.22µs min=0s      med=0s       max=30.97ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=42.44ms min=14.81ms med=47.01ms  max=126.51ms p(90)=74.12ms  p(95)=79.4ms
     http_reqs......................: 7322    121.915312/s
     iteration_duration.............: avg=88.19ms min=68.08ms med=87.23ms  max=149.26ms p(90)=103.44ms p(95)=108.48ms
     iterations.....................: 3661    60.957656/s
     vus............................: 1       min=1        max=10
     vus_max........................: 10      min=10       max=10
```
>    

### Stress
#### 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
	{duration: '10s', target: 100},
        {duration: '10s', target: 200},
        {duration: '10s', target: 300},
        {duration: '10s', target: 400},
        {duration: '10s', target: 500},
	{duration: '10s', target: 600},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';

function 경로_검색(source, target) {
    let pathRes = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);
    check(pathRes, {'find path': (res) => res.status === 200});
}

function 지하철_조회() {
    let stationsRes = http.get(`${BASE_URL}/stations`);
    check(stationsRes, {'find stations': (res) => res.status === 200});
}

export default function ()  {
    지하철_조회();
    경로_검색(103, 102);
}
```
#### 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: multi-select-stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 600 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 600 looping VUs for 1m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (1m04.5s), 000/600 VUs, 6926 complete and 0 interrupted iterations
default ✗ [======================================] 000/600 VUs  1m0s

     ✗ find stations
      ↳  99% — ✓ 6887 / ✗ 39
     ✗ find path
      ↳  99% — ✓ 6906 / ✗ 20

     checks.........................: 99.57% ✓ 13793      ✗ 59
     data_received..................: 504 MB 7.8 MB/s
     data_sent......................: 2.2 MB 34 kB/s
     http_req_blocked...............: avg=410.71µs min=0s      med=4.64µs   max=81.35ms p(90)=6.42µs  p(95)=6.22ms
     http_req_connecting............: avg=68µs     min=0s      med=0s       max=22.24ms p(90)=0s      p(95)=489.31µs
   ✗ http_req_duration..............: avg=1.4s     min=0s      med=1.35s    max=5.1s    p(90)=2.6s    p(95)=2.78s
       { expected_response:true }...: avg=1.41s    min=18.93ms med=1.36s    max=5.1s    p(90)=2.6s    p(95)=2.78s
     http_req_failed................: 0.42%  ✓ 59         ✗ 13793
     http_req_receiving.............: avg=4.05ms   min=0s      med=123.54µs max=129.7ms p(90)=10.74ms p(95)=24.08ms
     http_req_sending...............: avg=87.51µs  min=0s      med=14.99µs  max=14.48ms p(90)=27.7µs  p(95)=49.72µs
     http_req_tls_handshaking.......: avg=272.86µs min=0s      med=0s       max=51.31ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1.4s     min=0s      med=1.34s    max=5.1s    p(90)=2.59s   p(95)=2.78s
     http_reqs......................: 13852  214.682461/s
     iteration_duration.............: avg=2.81s    min=12.63ms med=2.77s    max=8.66s   p(90)=5.08s   p(95)=5.43s
     iterations.....................: 6926   107.34123/s
     vus............................: 99     min=10       max=599
     vus_max........................: 600    min=600      max=600

ERRO[0066] some thresholds have failed
```

>경로 검색 페이지는 vux 550 ~ 600 사이에서 요청이 실패했다. <br>
>경로 검색 페이지의 API 가 많이 무거워 다른 페이지에 비해 rps 적게 나온다 <br>
>하지만 경로 검색 페이지의 데이터들은 한번 추가되면 잘 안바뀌는 데이터이고, 많은 유저들이 조회하는 데이터이기 때문에 캐시를 통해 큰 개선을 얻을 수 있을 것
