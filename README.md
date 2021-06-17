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
- error : `/home/ubuntu/logs/prod/error.log`    
- file : `/home/ubuntu/logs/prod/prod.log`    
- json : `/home/ubuntu/logs/prod/json.log`   
- spring : `/home/ubuntu/logs/prod/spring.log`   

2. Cloudwatch 대시보드 URL을 알려주세요
[https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=kwj1270-dashboard](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=kwj1270-dashboard) 
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
> 경쟁사 평균 대비 20% 빠름을 기준으로 잡았습니다.

**시간**
> 경쟁사 : 네이버지도, 카카오지도  

* 페이지로드 : 3초 미만 
* Time to Interactive : 3초 미만 (네이버:3.2 / 카카오 2.8)
* First Contentful Paint : 0.6초 미만 (네이버 0.8 / 카카오 0.6) 
* Largest Contentful Paint : 1.2초 미만 (네이버 2.6 / 카카오 0.7)
* Speed Index : 2.1초 미만 (네이버 2.7초 / 카카오 2.5초)
* Time Blocking Time : 0.4초 미만 (네이버 : 0.2 / 카카오 : 0.7)

<img width="1094" alt="비교" src="https://user-images.githubusercontent.com/50267433/122315872-d81ed080-cf55-11eb-833e-c5fdbf8582a3.png">

**리소스**
> 경쟁사 : DuckDuckGo, 빙, 구글, 야후  

* 이미지 최대 크기 : 180kb
* 스크립트 최대 크기 : 611
* 스크립트 최대 갯수 : 12
* HTML, CSS 최대 크기 : 230kb
* 웹 글꼴 최대 크기, 글꼴 최대 갯수, 동영상 최대 크기 : 우선 미정으로 했습니다   
   
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

**개선 전**    
<img width="1094" alt="개선전" src="https://user-images.githubusercontent.com/50267433/122316006-13210400-cf56-11eb-91ea-b24419fc8f70.png">
   

* 페이지로드 : 3초 미만
* Time to Interactive : 15.7초 
* First Contentful Paint : 15.0초 
* Largest Contentful Paint : 15.6초 
* Speed Index : 15초 
* Time Blocking Time : 0.56초 

<img width="1094" alt="compress transfer" src="https://user-images.githubusercontent.com/50267433/122316107-3cda2b00-cf56-11eb-97b2-c4cb608cafa5.png">  
<img width="1094" alt="개선해야할점" src="https://user-images.githubusercontent.com/50267433/122316054-246a1080-cf56-11eb-9d5e-4bc7790548a3.png">  

**개선 후**   
<img width="1094" alt="개선완료" src="https://user-images.githubusercontent.com/50267433/122316157-511e2800-cf56-11eb-9f08-0e96e550d806.png">

* 페이지로드 : 3초 미만
* Time to Interactive : 1.4초
* First Contentful Paint : 0.8초
* Largest Contentful Paint : 1.4초
* Speed Index : 2.4초
* Time Blocking Time : 0.2초

**gzip 압축**   
[gzip참고 사이트](https://stackoverflow.com/questions/63788742/gzip-on-spring-server-or-nginx-reverse-proxy)   

이전)    
1. Apache 나 Nginx 등 Web서버에서 처리하기
2. Tomcat 이나 Weblogic 등 어플리케이션 서버(Was)에서 처리하기
3. Servlet Filter 를 등록하여 처리하기
4. 정적인 파일을 미리 gzip 으로 압축하여 올리기
   
현재)   
스프링부트 properties로 간단히 처리 가능   

**리소스 지연 로딩**      
[리소스 지연로딩 참고 사이트](https://web.dev/render-blocking-resources/?utm_source=lighthouse&utm_medium=unknown)      
[리소스 지연로딩 참고 사이트2](https://web.dev/defer-non-critical-css/)   
       
**캐시 적용**       
이 부분은 다음 미션에서 해야 할 것 같아서 설정하지 않았다가    
다른 분들이 적용하시는 방법을 보고 새롭게 깨달아서 뒤늦게 추가했습니다.     
       
참고로 인터넷에 나온 캐시 방법은 2가지가 있기에 이 둘을 비교한 글을 올립니다.         
정리 : `cache.cachecontrol.max-age` 사용하자       
[spring-boot-cache.period VS cache.cachecontrol.max-age](https://pythonq.com/so/spring-boot/1901153)

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
> [참고 사이트](https://biz.chosun.com/site/data/html_dir/2020/07/09/2020070901297.html)   
> 필자 : 구글지도 

* 전제조건
* 방법 :
    * 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수    
    * 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps    
    * 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps   
* 계산 결과 :
    * 1일 사용자 수(DAU) : 180000명 (549만 / 30)
    * 1명당 1일 평균 접속 수: 10 회
    * 1일 총 접속 수 : 1800000 회
    * 1일 평균 rps: 20rps  
    * 최대 트래픽 / 평소 트래픽 : 10
    * 1일 최대 rps: 200rps 
    * Latency: 100ms
    
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
#### Smoke
**접속 빈도가 높은 페이지**
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
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
----------------------------------------------
    /\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: login-smoke.js
output: -

    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.7s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 20  ✗ 0
data_received..................: 12 kB   1.1 kB/s
data_sent......................: 5.5 kB  515 B/s
http_req_blocked...............: avg=18.51ms min=2.85µs  med=4.61µs  max=370.13ms p(90)=6.98µs   p(95)=18.51ms
http_req_connecting............: avg=14.4µs  min=0s      med=0s      max=288.11µs p(90)=0s       p(95)=14.4µs
   ✓ http_req_duration..............: avg=17.1ms  min=12.08ms med=15.37ms max=26.62ms  p(90)=23.84ms  p(95)=24.04ms
{ expected_response:true }...: avg=17.1ms  min=12.08ms med=15.37ms max=26.62ms  p(90)=23.84ms  p(95)=24.04ms
http_req_failed................: 0.00%   ✓ 0   ✗ 20
http_req_receiving.............: avg=91.53µs min=75.97µs med=85.75µs max=135.11µs p(90)=106.96µs p(95)=112.12µs
http_req_sending...............: avg=31.47µs min=14.36µs med=31.09µs max=102.35µs p(90)=36.02µs  p(95)=40.11µs
http_req_tls_handshaking.......: avg=1.2ms   min=0s      med=0s      max=24.03ms  p(90)=0s       p(95)=1.2ms
http_req_waiting...............: avg=16.97ms min=11.94ms med=15.27ms max=26.47ms  p(90)=23.73ms  p(95)=23.94ms
http_reqs......................: 20      1.864379/s
iteration_duration.............: avg=1.07s   min=1.02s   med=1.03s   max=1.4s     p(90)=1.08s    p(95)=1.24s
iterations.....................: 10      0.93219/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```
**데이터를 갱신하는 페이지**
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
const AGE = 20;
const LOGIN_DATA = JSON.stringify({email: USERNAME, password: PASSWORD,});
const UPDATE_DATA = JSON.stringify({email: USERNAME, password: PASSWORD, age:AGE});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
    let updateRes = http.put(`${BASE_URL}/members/1`, UPDATE_DATA, PARAMS);

    check(updateRes, {
        'update successfully': (resp) => resp.status === 200,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, LOGIN_DATA, PARAMS);

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
----------------------------------------------
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


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ update successfully
     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 30  ✗ 0
     data_received..................: 14 kB   1.3 kB/s
     data_sent......................: 7.8 kB  748 B/s
     http_req_blocked...............: avg=744.24µs min=2.58µs  med=4.22µs  max=22.2ms   p(90)=5.63µs   p(95)=5.94µs
     http_req_connecting............: avg=8.24µs   min=0s      med=0s      max=247.3µs  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=14.53ms  min=10.41ms med=12.48ms max=25.85ms  p(90)=20.65ms  p(95)=22.62ms
       { expected_response:true }...: avg=14.53ms  min=10.41ms med=12.48ms max=25.85ms  p(90)=20.65ms  p(95)=22.62ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 30
     http_req_receiving.............: avg=89.31µs  min=53.9µs  med=79.68µs max=240.94µs p(90)=134.62µs p(95)=143.75µs
     http_req_sending...............: avg=121.97µs min=16.02µs med=27.79µs max=1.39ms   p(90)=163.03µs p(95)=707.93µs
     http_req_tls_handshaking.......: avg=714.11µs min=0s      med=0s      max=21.42ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=14.32ms  min=10.32ms med=12.34ms max=25.74ms  p(90)=19.59ms  p(95)=22.5ms
     http_reqs......................: 30      2.864549/s
     iteration_duration.............: avg=1.04s    min=1.03s   med=1.04s   max=1.08s    p(90)=1.05s    p(95)=1.06s
     iterations.....................: 10      0.95485/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

**데이터를 조회하는데 여러 데이터를 참조하는 페이지**  
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

const BASE_URL = 'https://kwj1270.ga';

export default function () {
    const res = http.get(`${BASE_URL}/stations`);
    check(res, {
        'page load successfully': (resp) => resp.status === 200,
    });


    sleep(1);
}
----------------------------------------------

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: page-smoke.js
output: -

    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (11.0s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ page load successfully

checks.........................: 100.00% ✓ 10  ✗ 0
data_received..................: 725 kB  66 kB/s
data_sent......................: 1.5 kB  136 B/s
http_req_blocked...............: avg=33.71ms min=4.18µs  med=4.64µs  max=337.06ms p(90)=33.71ms p(95)=185.38ms
http_req_connecting............: avg=28.28µs min=0s      med=0s      max=282.82µs p(90)=28.28µs p(95)=155.55µs
   ✓ http_req_duration..............: avg=64.33ms min=50.7ms  med=62.72ms max=89.46ms  p(90)=73.7ms  p(95)=81.58ms
{ expected_response:true }...: avg=64.33ms min=50.7ms  med=62.72ms max=89.46ms  p(90)=73.7ms  p(95)=81.58ms
http_req_failed................: 0.00%   ✓ 0   ✗ 10
http_req_receiving.............: avg=5.16ms  min=3.62ms  med=5.09ms  max=7.63ms   p(90)=6.27ms  p(95)=6.95ms
http_req_sending...............: avg=30.83µs min=24.9µs  med=25.88µs max=68.89µs  p(90)=34.02µs p(95)=51.45µs
http_req_tls_handshaking.......: avg=2.25ms  min=0s      med=0s      max=22.55ms  p(90)=2.25ms  p(95)=12.4ms
http_req_waiting...............: avg=59.13ms min=47.05ms med=57.04ms max=84.19ms  p(90)=67.64ms p(95)=75.91ms
http_reqs......................: 10      0.909936/s
iteration_duration.............: avg=1.09s   min=1.05s   med=1.06s   max=1.4s     p(90)=1.12s   p(95)=1.26s
iterations.....................: 10      0.909936/s
vus............................: 1       min=1 max=1
vus_max........................: 1       min=1 max=1
```

#### load 

**접속 빈도가 높은 페이지**
```javascript
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
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

----------------------------------------------

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: login-load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.6s), 000/100 VUs, 15243 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 30486 ✗ 0
     data_received..................: 11 MB   59 kB/s
     data_sent......................: 7.9 MB  42 kB/s
     http_req_blocked...............: avg=35.82µs  min=1.29µs  med=3.52µs  max=337.96ms p(90)=5.97µs   p(95)=7.36µs
     http_req_connecting............: avg=1.19µs   min=0s      med=0s      max=2.1ms    p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=9.21ms   min=4.71ms  med=8.43ms  max=56.26ms  p(90)=12.9ms   p(95)=16.07ms
       { expected_response:true }...: avg=9.21ms   min=4.71ms  med=8.43ms  max=56.26ms  p(90)=12.9ms   p(95)=16.07ms
     http_req_failed................: 0.00%   ✓ 0     ✗ 30486
     http_req_receiving.............: avg=136.87µs min=13.31µs med=57.17µs max=26.21ms  p(90)=153.05µs p(95)=431.79µs
     http_req_sending...............: avg=72.92µs  min=7.12µs  med=19.93µs max=16.65ms  p(90)=48.2µs   p(95)=151.16µs
     http_req_tls_handshaking.......: avg=13.49µs  min=0s      med=0s      max=22.65ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=9ms      min=4.65ms  med=8.29ms  max=55.86ms  p(90)=12.55ms  p(95)=15.48ms
     http_reqs......................: 30486   159.909104/s
     iteration_duration.............: avg=1.02s    min=1.01s   med=1.01s   max=1.36s    p(90)=1.02s    p(95)=1.03s
     iterations.....................: 15243   79.954552/s
     vus............................: 6       min=2   max=100
     vus_max........................: 100     min=100 max=100
```

**데이터를 갱신하는 페이지**
```javascript
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
const AGE = 20;
const LOGIN_DATA = JSON.stringify({email: USERNAME, password: PASSWORD,});
const UPDATE_DATA = JSON.stringify({email: USERNAME, password: PASSWORD, age:AGE});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
    let updateRes = http.put(`${BASE_URL}/members/1`, UPDATE_DATA, PARAMS);

    check(updateRes, {
        'update successfully': (resp) => resp.status === 200,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, LOGIN_DATA, PARAMS);

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
----------------------------------------------

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: update-load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.8s), 000/100 VUs, 15183 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

     ✓ update successfully
     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 45549 ✗ 0
     data_received..................: 14 MB   74 kB/s
     data_sent......................: 11 MB   60 kB/s
     http_req_blocked...............: avg=24.14µs min=1.28µs  med=3.18µs  max=345.24ms p(90)=5.35µs   p(95)=6.83µs
     http_req_connecting............: avg=745ns   min=0s      med=0s      max=2.07ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=7.56ms  min=4.5ms   med=6.88ms  max=78.35ms  p(90)=10.25ms  p(95)=12.41ms
       { expected_response:true }...: avg=7.56ms  min=4.5ms   med=6.88ms  max=78.35ms  p(90)=10.25ms  p(95)=12.41ms
     http_req_failed................: 0.00%   ✓ 0     ✗ 45549
     http_req_receiving.............: avg=125.6µs min=13.96µs med=48.41µs max=28.63ms  p(90)=129.99µs p(95)=370.84µs
     http_req_sending...............: avg=64.19µs min=7.63µs  med=19.48µs max=26.12ms  p(90)=42.72µs  p(95)=129.13µs
     http_req_tls_handshaking.......: avg=7.8µs   min=0s      med=0s      max=25.81ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=7.37ms  min=4.46ms  med=6.67ms  max=73.13ms  p(90)=9.97ms   p(95)=11.96ms
     http_reqs......................: 45549   238.746161/s
     iteration_duration.............: avg=1.02s   min=1.01s   med=1.02s   max=1.37s    p(90)=1.03s    p(95)=1.03s
     iterations.....................: 15183   79.582054/s
     vus............................: 6       min=2   max=100
     vus_max........................: 100     min=100 max=100
```
**데이터를 조회하는데 여러 데이터를 참조하는 페이지**
```javascript
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

const BASE_URL = 'https://kwj1270.ga';

export default function () {
    const res = http.get(`${BASE_URL}/stations`);
    check(res, {
        'page load successfully': (resp) => resp.status === 200,
    });


    sleep(1);
}
----------------------------------------------

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: page-load.js
output: -

    scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
* default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m10.7s), 000/100 VUs, 8158 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m10s

     ✓ page load successfully

checks.........................: 100.00% ✓ 8158  ✗ 0
data_received..................: 588 MB  3.1 MB/s
data_sent......................: 959 kB  5.0 kB/s
http_req_blocked...............: avg=120.63µs min=2.14µs  med=6.18µs   max=339.74ms p(90)=7.43µs  p(95)=8.56µs
http_req_connecting............: avg=7.36µs   min=0s      med=0s       max=11.71ms  p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=908.03ms min=33.68ms med=951.02ms max=5.07s    p(90)=1.12s   p(95)=1.84s
{ expected_response:true }...: avg=908.03ms min=33.68ms med=951.02ms max=5.07s    p(90)=1.12s   p(95)=1.84s
http_req_failed................: 0.00%   ✓ 0     ✗ 8158
http_req_receiving.............: avg=13.53ms  min=95.9µs  med=10.61ms  max=316.72ms p(90)=27.71ms p(95)=35.77ms
http_req_sending...............: avg=33.14µs  min=8.79µs  med=21.79µs  max=14.65ms  p(90)=27.93µs p(95)=38.01µs
http_req_tls_handshaking.......: avg=65.58µs  min=0s      med=0s       max=37.61ms  p(90)=0s      p(95)=0s
http_req_waiting...............: avg=894.46ms min=32.04ms med=937.79ms max=5.05s    p(90)=1.11s   p(95)=1.82s
http_reqs......................: 8158    42.777149/s
iteration_duration.............: avg=1.9s     min=1.03s   med=1.95s    max=6.07s    p(90)=2.13s   p(95)=2.84s
iterations.....................: 8158    42.777149/s
vus............................: 9       min=2   max=100
vus_max........................: 100     min=100 max=100
```
```
이때부터 성공하지 못하네요 ㅠㅡㅠ
```

#### Stress
**접속 빈도가 높은 페이지**
```javascript
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
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
----------------------------------------------

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: login-stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 400 max VUs, 1m8s max duration (incl. graceful stop):
           * default: Up to 400 looping VUs for 38s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m38.7s), 000/400 VUs, 8579 complete and 0 interrupted iterations
default ✓ [======================================] 000/400 VUs  38s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 17158 ✗ 0
     data_received..................: 7.9 MB  204 kB/s
     data_sent......................: 4.6 MB  118 kB/s
     http_req_blocked...............: avg=527.07µs min=1.39µs  med=3.43µs  max=433.44ms p(90)=5.81µs   p(95)=18.57µs
     http_req_connecting............: avg=42.63µs  min=0s      med=0s      max=46.33ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=12.05ms  min=4.57ms  med=8.34ms  max=175.61ms p(90)=23.78ms  p(95)=35.24ms
       { expected_response:true }...: avg=12.05ms  min=4.57ms  med=8.34ms  max=175.61ms p(90)=23.78ms  p(95)=35.24ms
     http_req_failed................: 0.00%   ✓ 0     ✗ 17158
     http_req_receiving.............: avg=244.61µs min=14.18µs med=49.02µs max=43.99ms  p(90)=288.91µs p(95)=791.19µs
     http_req_sending...............: avg=255.05µs min=6.66µs  med=18.65µs max=37.63ms  p(90)=120.26µs p(95)=587.79µs
     http_req_tls_handshaking.......: avg=282.4µs  min=0s      med=0s      max=155.35ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=11.55ms  min=4.51ms  med=8.19ms  max=175.23ms p(90)=22.43ms  p(95)=32.71ms
     http_reqs......................: 17158   443.889739/s
     iteration_duration.............: avg=1.02s    min=1.01s   med=1.01s   max=1.51s    p(90)=1.05s    p(95)=1.07s
     iterations.....................: 8579    221.944869/s
     vus............................: 22      min=22  max=400
     vus_max........................: 400     min=400 max=400
```
**데이터를 갱신하는 페이지**
```javascript
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

const BASE_URL = 'https://kwj1270.ga';
const USERNAME = 'kwj12705014@gmail.com';
const PASSWORD = 'test1234!';
const AGE = 20;
const LOGIN_DATA = JSON.stringify({email: USERNAME, password: PASSWORD,});
const UPDATE_DATA = JSON.stringify({email: USERNAME, password: PASSWORD, age:AGE});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
    let updateRes = http.put(`${BASE_URL}/members/1`, UPDATE_DATA, PARAMS);

    check(updateRes, {
        'update successfully': (resp) => resp.status === 200,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, LOGIN_DATA, PARAMS);

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
----------------------------------------------

/\      |‾‾| /‾‾/   /‾‾/
/\  /  \     |  |/  /   /  /
/  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: update-stress.js
output: -

    scenarios: (100.00%) 1 scenario, 400 max VUs, 1m8s max duration (incl. graceful stop):
* default: Up to 400 looping VUs for 38s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m39.0s), 000/400 VUs, 7886 complete and 0 interrupted iterations
default ✗ [======================================] 000/400 VUs  38s

     ✓ update successfully
     ✓ logged in successfully
     ✓ retrieved member

checks.........................: 100.00% ✓ 23658 ✗ 0
data_received..................: 9.1 MB  233 kB/s
data_sent......................: 6.1 MB  155 kB/s
http_req_blocked...............: avg=1.61ms   min=1.2µs   med=3.28µs  max=803.99ms p(90)=5.27µs   p(95)=12.7µs
http_req_connecting............: avg=377.41µs min=0s      med=0s      max=417.83ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=36.16ms  min=4.48ms  med=10.33ms max=466.37ms p(90)=104.78ms p(95)=137.09ms
{ expected_response:true }...: avg=36.16ms  min=4.48ms  med=10.33ms max=466.37ms p(90)=104.78ms p(95)=137.09ms
http_req_failed................: 0.00%   ✓ 0     ✗ 23658
http_req_receiving.............: avg=731.24µs min=12.87µs med=40.66µs max=240.52ms p(90)=414.9µs  p(95)=1.25ms
http_req_sending...............: avg=1.31ms   min=7.59µs  med=18.24µs max=219.92ms p(90)=300.73µs p(95)=3.18ms
http_req_tls_handshaking.......: avg=1.18ms   min=0s      med=0s      max=495.6ms  p(90)=0s       p(95)=0s
http_req_waiting...............: avg=34.11ms  min=4.41ms  med=9.97ms  max=336.36ms p(90)=99.82ms  p(95)=128.54ms
http_reqs......................: 23658   607.252546/s
iteration_duration.............: avg=1.11s    min=1.01s   med=1.03s   max=2.1s     p(90)=1.32s    p(95)=1.4s
iterations.....................: 7886    202.417515/s
vus............................: 17      min=17  max=400
vus_max........................: 400     min=400 max=400
```

**데이터를 조회하는데 여러 데이터를 참조하는 페이지**
```javascript
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

const BASE_URL = 'https://kwj1270.ga';

export default function () {
    const res = http.get(`${BASE_URL}/stations`);
    check(res, {
        'page load successfully': (resp) => resp.status === 200,
    });


    sleep(1);
}

----------------------------------------------

running (0m41.9s), 000/400 VUs, 2843 complete and 0 interrupted iterations
default ✓ [======================================] 000/400 VUs  38s

     ✗ page load successfully
      ↳  59% — ✓ 1693 / ✗ 1150

checks.........................: 59.54% ✓ 1693  ✗ 1150
data_received..................: 128 MB 3.1 MB/s
data_sent......................: 989 kB 24 kB/s
http_req_blocked...............: avg=10.61ms  min=0s       med=3.37ms   max=365.97ms p(90)=27.29ms  p(95)=53.84ms
http_req_connecting............: avg=4.17ms   min=0s       med=327.42µs max=92.63ms  p(90)=11.78ms  p(95)=25.35ms
   ✗ http_req_duration..............: avg=2.56s    min=0s       med=970.03ms max=14.35s   p(90)=7.14s    p(95)=8.94s
{ expected_response:true }...: avg=4.3s     min=190.94ms med=3.65s    max=14.35s   p(90)=8.75s    p(95)=9.2s
http_req_failed................: 40.45% ✓ 1150  ✗ 1693
http_req_receiving.............: avg=10.29ms  min=0s       med=4.05ms   max=179.46ms p(90)=28.88ms  p(95)=40.82ms
http_req_sending...............: avg=519.33µs min=0s       med=29.6µs   max=65.23ms  p(90)=218.52µs p(95)=1.14ms
http_req_tls_handshaking.......: avg=7.93ms   min=0s       med=0s       max=154.18ms p(90)=21.67ms  p(95)=43.4ms
http_req_waiting...............: avg=2.55s    min=0s       med=958.64ms max=14.34s   p(90)=7.1s     p(95)=8.91s
http_reqs......................: 2843   67.782921/s
iteration_duration.............: avg=3.58s    min=1s       med=1.97s    max=15.36s   p(90)=8.15s    p(95)=10s
iterations.....................: 2843   67.782921/s
vus............................: 53     min=50  max=400
vus_max........................: 400    min=400 max=400
```