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
  - /log/file.log
- nginx 서버
  - /var/log/nginx/access.log
  - /var/log/nginx/error.log
    
2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-vvshinevv

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
```text
A. 예비 분석
 - 메인 페이지
  - 이유: 서비스의 진입점
   
B. 경쟁사 분석
 - 사이트 (https://xn--o26bo7nvya.xn--h32bi4v.xn--3e0b707e/) - webpagetest.org 분석 결과
    - First Contentful Paint    : 6106.667(ms) 
    - Largest Contentful Paint  : 6330.000(ms)
    - Load Time                 : 6458.667(ms)
    - Browser-reported Load Time: 6458.000(ms)
    - Speed Index               : 6121.667(ms)
    - Time to First Byte        : 1145.668(ms)
   
 - 네이버 지하철 (https://m.map.naver.com/subway/subwayLine.naver?region=1000) - webpagetest.org 분석 결과
    - First Contentful Paint    : 2179.667(ms) 
    - Largest Contentful Paint  : 7189.667(ms)
    - Load Time                 : 3217.000(ms)
    - Browser-reported Load Time: 3217.333(ms)
    - Speed Index               : 6139.000(ms)
    - Time to First Byte        :  828.333(ms)
 
    
C. 성능 기준 설정
  - 네이버 지하철과 동등한 기준으로 측정 설정
  - 네이버 지하철 (https://m.map.naver.com/subway/subwayLine.naver?region=1000) - webpagetest.org 분석 결과
    - First Contentful Paint    : 2179.667(ms) 
    - Largest Contentful Paint  : 7189.667(ms)
    - Load Time                 : 3217.000(ms)
    - Browser-reported Load Time: 3217.333(ms)
    - Speed Index               : 6139.000(ms)
    - Time to First Byte        :  828.333(ms)

```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
```text
A. 압축 기능 사용
 - properties
  - server.compression.enabled=true
  - server.compression.mime-types=text/html,text/css,application/javascript,application/json
  - server.compression.min-response-size=1024
  
 - webpagetest.org 결과
  - Largest Contentful Paint 6.369s -> 3.521s
  - Compress Transfer F -> A
  
 - pagespeed.web.dev 결과
  - Performance 30 -> 90    
```

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
```text
1. 예상 DAU
 - 네이버 MAU는 3016만명
 - 1/3 단위인 1000만명 기준으로 설정 -> 서버 사양때문인지 EOF가 발생하여서...
 - DAU = 1000만 / 30 = 333,333
 - 참고 사이트 : https://biz.chosun.com/site/data/html_dir/2020/07/09/2020070901297.html
 
2. 예상 피크 시간대
 - 07 ~ 10 AM
 - 06 ~ 09 PM
 
3. 1명당 1일 평균 접속 혹은 요청 수
 - 출퇴근 시간 1회
 
4. Throughput (1일 평균 RPS ~ 최대 RPS)
 - 1일 사용자 수(DAU) * 1명당 1일 평균 접속 수 = 333,333 * 10 = 3,333,330 (1일 총 접속수)
 - 1일 총 접속 수 / 86,400 (초/일) = 333,333 / 86,400 = 평균 38.58 (1일 평균 rps)
 - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 38.58 * 10(가정치) = 385.8 (1일 최대 rps)
```

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요 
 메인 페이지
```text
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1000, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://xn--o26bo7nvya.xn--h32bi4v.xn--3e0b707e';

export default function ()  {
    let mainPages = http.get(`${BASE_URL}`);
    sleep(1);
};
```
```text
$ k6 run main.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: main.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 40s max duration (incl. graceful stop):
           * default: 100 looping VUs for 10s (gracefulStop: 30s)


running (10.4s), 000/100 VUs, 1000 complete and 0 interrupted iterations
default ✓ [======================================] 100 VUs  10s

     data_received..................: 1.7 MB 165 kB/s
     data_sent......................: 174 kB 17 kB/s
     http_req_blocked...............: avg=18.56ms  min=3.41µs  med=5.59µs  max=271.02ms p(90)=5.34ms   p(95)=208.42ms
     http_req_connecting............: avg=794.64µs min=0s      med=0s      max=28.44ms  p(90)=75.81µs  p(95)=5.87ms  
   ✓ http_req_duration..............: avg=11.21ms  min=1.38ms  med=4.29ms  max=128.52ms p(90)=26.48ms  p(95)=44.21ms 
       { expected_response:true }...: avg=11.21ms  min=1.38ms  med=4.29ms  max=128.52ms p(90)=26.48ms  p(95)=44.21ms 
     http_req_failed................: 0.00%  ✓ 0         ✗ 1000 
     http_req_receiving.............: avg=126.06µs min=19.54µs med=43.17µs max=13.4ms   p(90)=119.63µs p(95)=219.35µs
     http_req_sending...............: avg=920.54µs min=9.06µs  med=14.87µs max=86.52ms  p(90)=332.85µs p(95)=2ms     
     http_req_tls_handshaking.......: avg=16.23ms  min=0s      med=0s      max=244.52ms p(90)=3.6ms    p(95)=191.46ms
     http_req_waiting...............: avg=10.17ms  min=1.32ms  med=4.09ms  max=128.42ms p(90)=24.98ms  p(95)=37.35ms 
     http_reqs......................: 1000   95.905973/s
     iteration_duration.............: avg=1.03s    min=1s      med=1s      max=1.31s    p(90)=1.06s    p(95)=1.25s   
     iterations.....................: 1000   95.905973/s
     vus............................: 100    min=100     max=100
     vus_max........................: 100    min=100     max=100
```
<br/><br/>
User 정보 수정
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 100, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://xn--o26bo7nvya.xn--h32bi4v.xn--3e0b707e';
const USERNAME = 'vvshinevv@naver.com';
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


  let requestBody = {
    email: "vvshinevv@naver.com",
    password: "1234",
    age: 30
  };

  let myObjects = http.put(`${BASE_URL}/members/me`, requestBody, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);
};
```
```
$ k6 run user_update.js 

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: user_update.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 40s max duration (incl. graceful stop):
           * default: 100 looping VUs for 10s (gracefulStop: 30s)


running (11.0s), 000/100 VUs, 842 complete and 0 interrupted iterations
default ↓ [======================================] 100 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.....................: 100.00% ✓ 1684       ✗ 0    
     data_received..............: 1.1 MB  101 kB/s
     data_sent..................: 496 kB  45 kB/s
     http_req_blocked...........: avg=12.52ms  min=3.58µs  med=5.01µs  max=247.55ms p(90)=10.57µs  p(95)=156.44ms
     http_req_connecting........: avg=508.21µs min=0s      med=0s      max=54.28ms  p(90)=0s       p(95)=2.62ms  
   ✓ http_req_duration..........: avg=108.88ms min=3.16ms  med=30.89ms max=944.87ms p(90)=276.03ms p(95)=636.63ms
     http_req_failed............: 100.00% ✓ 1684       ✗ 0    
     http_req_receiving.........: avg=543.24µs min=23.24µs med=43.51µs max=116.19ms p(90)=83.98µs  p(95)=437.86µs
     http_req_sending...........: avg=603.63µs min=10.91µs med=17.84µs max=46.47ms  p(90)=163.18µs p(95)=1.64ms  
     http_req_tls_handshaking...: avg=10.14ms  min=0s      med=0s      max=236.22ms p(90)=0s       p(95)=148.68ms
     http_req_waiting...........: avg=107.73ms min=3.1ms   med=30.48ms max=915.06ms p(90)=275.54ms p(95)=633.1ms 
     http_reqs..................: 1684    153.337037/s
     iteration_duration.........: avg=1.24s    min=1s      med=1.09s   max=2.19s    p(90)=2.1s     p(95)=2.11s   
     iterations.................: 842     76.668518/s
     vus........................: 100     min=100      max=100
     vus_max....................: 100     min=100      max=100
```
<br/><br/>
경로조회
```text
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 100, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://xn--o26bo7nvya.xn--h32bi4v.xn--3e0b707e';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let path = http.get(`${BASE_URL}/paths?source=1&target=21`, params);

  check(path, {
    'logged in successfully': (path) => path.json('stations') !== '',
  });

  sleep(1);
};
```
```
$ k6 run path.js 

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: path.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 40s max duration (incl. graceful stop):
           * default: 100 looping VUs for 10s (gracefulStop: 30s)


running (17.2s), 000/100 VUs, 173 complete and 0 interrupted iterations
default ✓ [======================================] 100 VUs  10s

     ✓ logged in successfully

     checks.....................: 100.00% ✓ 173       ✗ 0    
     data_received..............: 522 kB  30 kB/s
     data_sent..................: 73 kB   4.2 kB/s
     http_req_blocked...........: avg=92.47ms min=4.13µs  med=59.49ms  max=247.83ms p(90)=234.59ms p(95)=236.85ms
     http_req_connecting........: avg=5.87ms  min=0s      med=3.74ms   max=33.63ms  p(90)=18.37ms  p(95)=19.4ms  
   ✗ http_req_duration..........: avg=6.88s   min=1.65s   med=7.17s    max=10.83s   p(90)=9.43s    p(95)=10.25s  
     http_req_failed............: 100.00% ✓ 173       ✗ 0    
     http_req_receiving.........: avg=86.69µs min=37.66µs med=82.08µs  max=217.41µs p(90)=114.71µs p(95)=133.42µs
     http_req_sending...........: avg=2.95ms  min=14.1µs  med=191.94µs max=47.05ms  p(90)=15.44ms  p(95)=17.23ms 
     http_req_tls_handshaking...: avg=79.28ms min=0s      med=48.97ms  max=225.72ms p(90)=202.1ms  p(95)=205.19ms
     http_req_waiting...........: avg=6.88s   min=1.64s   med=7.17s    max=10.82s   p(90)=9.43s    p(95)=10.25s  
     http_reqs..................: 173     10.040979/s
     iteration_duration.........: avg=7.97s   min=2.72s   med=8.28s    max=11.95s   p(90)=10.67s   p(95)=11.47s  
     iterations.................: 173     10.040979/s
     vus........................: 7       min=7       max=100
     vus_max....................: 100     min=100     max=100

```
