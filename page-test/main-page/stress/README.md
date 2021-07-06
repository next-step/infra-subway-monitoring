# 접속 빈도가 높은 페이지 Stress Test
## 스크립트
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
## 결과
```javascript

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress.js
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

어플리케이션이 견딜 수 있는 최대 트래픽을 찾기 위해 vux 100 부터 100 단위로 증가 시켜 부하를 줌. <br> 
vux 770 정도 부터 실패하는 요청이 등장.
