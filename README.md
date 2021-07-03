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

bbbnam-EC2-public1 : 3.36.90.29  
  - /home/ubuntu/log/thread.dump   ->  thread.dump 분석 실습
  - /home/ubuntu/infra-subway-monitoring/log/path.log  -> 최단경로 조회에 로그 설정
  - /home/ubuntu/infra-subway-monitoring/log/member.log  -> 로그인, 회원가입 등에 로그 설정

bbbnam-EC2-reverseproxy : 13.125.241.78 
  - /var/log/nginx  -> Nginx log 설정 위치  
  
2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD_bbbnam

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
말씀해주신대로 가상의 경쟁사(?) 인 카카오 매트로를 기준으로 다시 구성해보았습니다.
PageSpeed Insights 기준으로
   -  페이지 로드 : 3초 미만
   -  FCP(First Contentful Paint) : 1초 미만 (카카오 매트로 : 0.5초)
   -  LCP(Largest Contentful Paint) : 1.5초 미만 (카카오 매트로 : 1.1초)
   -  TTI(Time to Interactive) : 3초 미만 (카카오 매트로 : 0.5초)
   -  Speed Index : 2초 미만 (카카오 매트로 : 1.4초)
   -  종합점수 : 95점 이상 (카카오 매트로 : 97점)
webpagetest 기준으로
   - FCP : 1초미만 (카카오 매트로 : 0.6초)
   - LCP : 2초 미만 (카카오 매트로 : 3.3초)
   - Speed Index : 2초 미만 (카카오 매트로 : 3.14초)
   - Fully Loaded : 3초 미만 (카카오 매트로 : 8.7초)
   
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - https://bbbnam-public.kro.kr/js/vendors.js 와 https://bbbnam-public.kro.kr/js/main.js 가 다른 리소스에 비해 먼저 
   호출이 되고 있는데 이 두 파일이 응답시간의 대부분을 차지하고 있는 것 같습니다.
   텍스트 압축, 지연로딩, 캐시 설정을 사용하여 개선할 수 있을 것 같습니다.
   
   - 텍스트 압축, 지연로딩, 캐시 설정을 통해
   기존 compress Transfer : F등급, Cache static content : C 등급 , Largest Contentful Paint 4.7초 
   변경후  compress Transfer : A등급, Cache static content : B 등급, Largest Contentful Paint 1.537초 
   로 개선하였습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   대상 시스템의 범위 : 경로 조회 API 테스트
   목표값 설정 : 
   > Latency -> 3초 룰에 의거 하여 지연시간 2000ms 이내  
   > Throughput ->   
    1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수 : 10,000  * 5 = 50,000 (1일 총 접속 수)      
    1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps : 50,000 / 86,400 = 0.6 (1일 평균rps)  
    페이지당 1Mb 정도 트래픽 발생   
        -> 최대 트래픽 : 1Mb * 7,000 (70% 사용자가 몰린다고 가정) = 7Gb
        -> 평소 트래픽 : 1Mb * 4,000 (40% 평균 사용자) = 4Gb
    1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps : 0.6 * (7000/4000) = 1.05  
   
   말씀해주신대로 가정하고 다시 구해보았습니다. (제대로 구한건지는 모르겠지만)
   
   - 테스트 시나리오 :     
     - 메인 페이지 접속
     - 로그인하기
     - 내 정보 확인하기
     - 최단경로 조회하기
                                                                                                   
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- smoke.js

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 사용자 1명
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% 성공률 2s 이내
  },
};

const BASE_URL = 'https://bbbnam-public.kro.kr/';
const USERNAME = 'jdrake@naver.com';
const PASSWORD = '12345';
const 노량진Id = 4;
const 영등포Id = 6;

export default function ()  {

  let 로딩된_페이지 = 메인_페이지_로딩();
  페이지_로딩_확인(로딩된_페이지);  

  let 발급된_토큰 = 로그인_요청();
  로그인_확인(발급된_토큰);
  
  let 내정보 = 내_정보_확인하기(발급된_토큰);  
  내정보_확인(내정보);

  let 조회된_경로 = 최단경로_조회하기(발급된_토큰, 노량진Id, 영등포Id);
  let 예상거리 = 3;
  let 예상된_첫번째_경로 = '노량진';
  let 예상된_마지막_경로 = '영등포';
  최단경로_확인(조회된_경로, 예상거리, 예상된_첫번째_경로, 예상된_마지막_경로);

  sleep(1);
};

export function 메인_페이지_로딩() {
    return http.get(`${BASE_URL}`);
}

export function 페이지_로딩_확인(로딩된_페이지) {
    check(로딩된_페이지, {
        'lending page running': (response) => response.status === 200
    });
}

export function 로그인_요청() {
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
};

export function 로그인_확인(발급된_토큰) {
  check(발급된_토큰, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });
};

export function 내_정보_확인하기(발급된_토큰) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${발급된_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/members/me`, authHeaders).json();
};

export function 내정보_확인(내정보) {
    check(내정보, { 'retrieved member': (obj) => obj.id != 0 });
};

export function 최단경로_조회하기(발급된_토큰, souceId, targetId) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${발급된_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/paths?source=` + souceId + `&target=` + targetId, authHeaders).json();
};

export function 최단경로_확인(조회된경로, 예상거리, 예상된_첫번째_경로, 예상된_마지막_경로) {
    check(조회된경로, {
        'path info distance check success' : (response) => response['distance'] == 예상거리,
        'source station check success' : (response) => response.stations[0].name == 예상된_첫번째_경로,
        'target station check success' : (response) => response.stations[response.stations.length - 1].name == 예상된_마지막_경로
    });
};
```

```js
 ✓ lending page running
     ✓ logged in successfully
     ✓ retrieved member
     ✓ path info distance check success
     ✓ source station check success
     ✓ target station check success

     checks.........................: 100.00% ✓ 54       ✗ 0  
     data_received..................: 29 kB   2.8 kB/s
     data_sent......................: 8.9 kB  842 B/s
     http_req_blocked...............: avg=1.12ms   min=4.46µs  med=5.61µs  max=40.38ms  p(90)=8.5µs    p(95)=8.6µs   
     http_req_connecting............: avg=10.78µs  min=0s      med=0s      max=388.34µs p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=41.6ms   min=4.26ms  med=13.73ms max=146.31ms p(90)=130.73ms p(95)=135.28ms
       { expected_response:true }...: avg=41.6ms   min=4.26ms  med=13.73ms max=146.31ms p(90)=130.73ms p(95)=135.28ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 36 
     http_req_receiving.............: avg=97.49µs  min=53.93µs med=95.7µs  max=137.18µs p(90)=119.77µs p(95)=134.1µs 
     http_req_sending...............: avg=24.8µs   min=13.77µs med=22.2µs  max=82.92µs  p(90)=34.24µs  p(95)=42.37µs 
     http_req_tls_handshaking.......: avg=750.24µs min=0s      med=0s      max=27ms     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=41.48ms  min=4.15ms  med=13.62ms max=146.21ms p(90)=130.59ms p(95)=135.17ms
     http_reqs......................: 36      3.411247/s
     iteration_duration.............: avg=1.17s    min=1.15s   med=1.16s   max=1.22s    p(90)=1.19s    p(95)=1.21s   
     iterations.....................: 9       0.852812/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

====================================================================

- load.js

```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
   stages: [
            { duration: '3s', target: 0 },
            { duration: '5s', target: 80 },
            { duration: '5s', target: 160 },
            { duration: '10s', target: 200 },
            { duration: '10s', target: 160 },
            { duration: '10s', target: 80 },
            { duration: '5s', target: 0 }
          ],

  
  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% 성공률 2s 이내
  },
};

const BASE_URL = 'https://bbbnam-public.kro.kr/';
const USERNAME = 'jdrake@naver.com';
const PASSWORD = '12345';
const 노량진Id = 4;
const 영등포Id = 6;

export default function ()  {

  let 로딩된_페이지 = 메인_페이지_로딩();
  페이지_로딩_확인(로딩된_페이지);  

  let 발급된_토큰 = 로그인_요청();
  로그인_확인(발급된_토큰);
  
  let 내정보 = 내_정보_확인하기(발급된_토큰);  
  내정보_확인(내정보);

  let 조회된_경로 = 최단경로_조회하기(발급된_토큰, 노량진Id, 영등포Id);
  let 예상거리 = 3;
  let 예상된_첫번째_경로 = '노량진';
  let 예상된_마지막_경로 = '영등포';
  최단경로_확인(조회된_경로, 예상거리, 예상된_첫번째_경로, 예상된_마지막_경로);

  sleep(1);
};

export function 메인_페이지_로딩() {
    return http.get(`${BASE_URL}`);
}

export function 페이지_로딩_확인(로딩된_페이지) {
    check(로딩된_페이지, {
        'lending page running': (response) => response.status === 200
    });
}

export function 로그인_요청() {
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
};

export function 로그인_확인(발급된_토큰) {
  check(발급된_토큰, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });
};

export function 내_정보_확인하기(발급된_토큰) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${발급된_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/members/me`, authHeaders).json();
};

export function 내정보_확인(내정보) {
    check(내정보, { 'retrieved member': (obj) => obj.id != 0 });
};

export function 최단경로_조회하기(발급된_토큰, souceId, targetId) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${발급된_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/paths?source=` + souceId + `&target=` + targetId, authHeaders).json();
};

export function 최단경로_확인(조회된경로, 예상거리, 예상된_첫번째_경로, 예상된_마지막_경로) {
    check(조회된경로, {
        'path info distance check success' : (response) => response['distance'] == 예상거리,
        'source station check success' : (response) => response.stations[0].name == 예상된_첫번째_경로,
        'target station check success' : (response) => response.stations[response.stations.length - 1].name == 예상된_마지막_경로
    });
};

```
```js
     ✓ lending page running
     ✓ logged in successfully
     ✓ retrieved member
     ✗ path info distance check success
      ↳  68% — ✓ 91 / ✗ 42
     ✗ source station check success
      ↳  68% — ✓ 91 / ✗ 42
     ✓ target station check success

     checks.........................: 93.11% ✓ 1136      ✗ 84   
     data_received..................: 1.6 MB 20 kB/s
     data_sent......................: 339 kB 4.3 kB/s
     http_req_blocked...............: avg=920.34µs min=3.68µs  med=4.74µs   max=82.25ms  p(90)=4.09ms   p(95)=4.19ms  
     http_req_connecting............: avg=95.39µs  min=0s      med=0s       max=1.66ms   p(90)=458.39µs p(95)=487.46µs
   ✗ http_req_duration..............: avg=9.14s    min=2.84ms  med=4.76s    max=35.54s   p(90)=30s      p(95)=30.01s  
       { expected_response:true }...: avg=6.42s    min=2.84ms  med=972.87ms max=35.54s   p(90)=21s      p(95)=27.19s  
     http_req_failed................: 15.86% ✓ 158       ✗ 838  
     http_req_receiving.............: avg=83.55µs  min=26.84µs med=79.88µs  max=250.96µs p(90)=120.25µs p(95)=136.08µs
     http_req_sending...............: avg=37.89µs  min=11.41µs med=20.71µs  max=8.4ms    p(90)=57.61µs  p(95)=72.71µs 
     http_req_tls_handshaking.......: avg=749.01µs min=0s      med=0s       max=28.14ms  p(90)=3.53ms   p(95)=3.61ms  
     http_req_waiting...............: avg=9.14s    min=2.75ms  med=4.76s    max=35.54s   p(90)=30s      p(95)=30.01s  
     http_reqs......................: 996    12.768885/s
     iteration_duration.............: avg=31.72s   min=1.92s   med=32.76s   max=1m3s     p(90)=50.24s   p(95)=51.76s  
     iterations.....................: 131    1.679442/s
     vus............................: 1      min=1       max=200
     vus_max........................: 200    min=200     max=200

```
====================================================================

- stress.js
``` js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
       { duration: '2s', target: 0 },
       { duration: '2s', target: 50 },
       { duration: '10s', target: 100 },
       { duration: '4s', target: 160 },
       { duration: '10s', target: 180 },
       { duration: '5s', target: 200 },
       { duration: '7s', target: 220 },
       { duration: '2s', target: 180 },
       { duration: '2s', target: 150 },
       { duration: '2s', target: 100 },
       { duration: '2s', target: 50 },
       { duration: '3s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% 성공률 2s 이내
  },
};

const BASE_URL = 'https://bbbnam-public.kro.kr/';
const USERNAME = 'jdrake@naver.com';
const PASSWORD = '12345';
const 노량진Id = 4;
const 영등포Id = 6;

export default function ()  {

  let 로딩된_페이지 = 메인_페이지_로딩();
  페이지_로딩_확인(로딩된_페이지);  

  let 발급된_토큰 = 로그인_요청();
  로그인_확인(발급된_토큰);
  
  let 내정보 = 내_정보_확인하기(발급된_토큰);  
  내정보_확인(내정보);

  let 조회된_경로 = 최단경로_조회하기(발급된_토큰, 노량진Id, 영등포Id);
  let 예상거리 = 3;
  let 예상된_첫번째_경로 = '노량진';
  let 예상된_마지막_경로 = '영등포';
  최단경로_확인(조회된_경로, 예상거리, 예상된_첫번째_경로, 예상된_마지막_경로);

  sleep(1);
};

export function 메인_페이지_로딩() {
    return http.get(`${BASE_URL}`);
}

export function 페이지_로딩_확인(로딩된_페이지) {
    check(로딩된_페이지, {
        'lending page running': (response) => response.status === 200
    });
}

export function 로그인_요청() {
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
};

export function 로그인_확인(발급된_토큰) {
  check(발급된_토큰, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });
};

export function 내_정보_확인하기(발급된_토큰) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${발급된_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/members/me`, authHeaders).json();
};

export function 내정보_확인(내정보) {
    check(내정보, { 'retrieved member': (obj) => obj.id != 0 });
};

export function 최단경로_조회하기(발급된_토큰, souceId, targetId) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${발급된_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/paths?source=` + souceId + `&target=` + targetId, authHeaders).json();
};

export function 최단경로_확인(조회된경로, 예상거리, 예상된_첫번째_경로, 예상된_마지막_경로) {
    check(조회된경로, {
        'path info distance check success' : (response) => response['distance'] == 예상거리,
        'source station check success' : (response) => response.stations[0].name == 예상된_첫번째_경로,
        'target station check success' : (response) => response.stations[response.stations.length - 1].name == 예상된_마지막_경로
    });
};

```

``` js
     ✓ lending page running
     ✓ logged in successfully
     ✓ retrieved member
     ✗ path info distance check success
      ↳  74% — ✓ 104 / ✗ 36
     ✗ source station check success
      ↳  74% — ✓ 104 / ✗ 36
     ✓ target station check success

     checks.........................: 94.06% ✓ 1142      ✗ 72   
     data_received..................: 1.7 MB 21 kB/s
     data_sent......................: 341 kB 4.2 kB/s
     http_req_blocked...............: avg=1.01ms   min=3.66µs  med=4.87µs  max=46.17ms  p(90)=4.15ms   p(95)=4.28ms  
     http_req_connecting............: avg=111.05µs min=0s      med=0s      max=1.28ms   p(90)=475.46µs p(95)=500.14µs
   ✗ http_req_duration..............: avg=10.23s   min=3.01ms  med=5.11s   max=35.68s   p(90)=30s      p(95)=30.05s  
       { expected_response:true }...: avg=8.38s    min=3.01ms  med=2.27s   max=35.68s   p(90)=27.57s   p(95)=28.84s  
     http_req_failed................: 11.85% ✓ 115       ✗ 855  
     http_req_receiving.............: avg=85.58µs  min=30.69µs med=81.19µs max=381.82µs p(90)=123.05µs p(95)=135.18µs
     http_req_sending...............: avg=32.07µs  min=12.07µs med=21.38µs max=1.35ms   p(90)=64.15µs  p(95)=76.57µs 
     http_req_tls_handshaking.......: avg=881.11µs min=0s      med=0s      max=45.18ms  p(90)=3.58ms   p(95)=3.66ms  
     http_req_waiting...............: avg=10.23s   min=2.86ms  med=5.1s    max=35.68s   p(90)=30s      p(95)=30.05s  
     http_reqs......................: 970    12.010589/s
     iteration_duration.............: avg=38.21s   min=1.98s   med=39.05s  max=1m10s    p(90)=1m2s     p(95)=1m4s    
     iterations.....................: 137    1.696341/s
     vus............................: 10     min=1       max=220
     vus_max........................: 220    min=220     max=220

```