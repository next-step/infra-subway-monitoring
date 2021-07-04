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
                                                                          
```   
    Throughput ->                                                                       
    1일 사용자 수(DAU) = 100,000 ('카카오 지하철' MAU 300 만 명 / 30일 = 약 10만)  
    1명당 1일 평균 접속 수 = 5 (출근, 퇴근, 외근)  
    1일 총 접속 수 = 500,000 (DAU * 1일 평균 접속 수)  
    1일 평균 RPS = 6 (1일 총 접속 수 / 86,400)  
    1일 최대 RPS = 1일 평균의 30배로 가정 => 180rps  
    
    T = (R * http_req_duration) + 1s
    T = (요청 갯수 4개 * 0.2(가정)) + 1s
    T = 약 2
  
    VU = (RPS * T ) / R
    VU = (180 * 2) / 4 -> 90 (가상 사용자수)
```    
   (말씀해주신대로 가정하고 다시 구해보았습니다.)
   
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
        'path info distance check success' : (response) => response['distance'] == 예상거리
    });
};
```

```js
      ✓ lending page running
      ✓ logged in successfully
      ✓ retrieved member
      ✓ path info distance check success
 
      checks.........................: 100.00% ✓ 24       ✗ 0  
      data_received..................: 21 kB   1.8 kB/s
      data_sent......................: 6.1 kB  521 B/s
      http_req_blocked...............: avg=1.5ms    min=4.29µs  med=4.6µs   max=35.94ms  p(90)=9.09µs   p(95)=9.36µs  
      http_req_connecting............: avg=18.1µs   min=0s      med=0s      max=434.45µs p(90)=0s       p(95)=0s      
    ✓ http_req_duration..............: avg=231.94ms min=3.74ms  med=14.25ms max=915.35ms p(90)=892.34ms p(95)=907.33ms
        { expected_response:true }...: avg=231.94ms min=3.74ms  med=14.25ms max=915.35ms p(90)=892.34ms p(95)=907.33ms
      http_req_failed................: 0.00%   ✓ 0        ✗ 24 
      http_req_receiving.............: avg=120.53µs min=45.03µs med=78.12µs max=1.02ms   p(90)=111.89µs p(95)=144.05µs
      http_req_sending...............: avg=24.22µs  min=12.42µs med=18.52µs max=97.7µs   p(90)=35.09µs  p(95)=44.56µs 
      http_req_tls_handshaking.......: avg=1.13ms   min=0s      med=0s      max=27.2ms   p(90)=0s       p(95)=0s      
      http_req_waiting...............: avg=231.79ms min=3.57ms  med=14.17ms max=915.24ms p(90)=892.19ms p(95)=907.21ms
      http_reqs......................: 24      2.066817/s
      iteration_duration.............: avg=1.93s    min=1.91s   med=1.92s   max=1.97s    p(90)=1.96s    p(95)=1.96s   
      iterations.....................: 6       0.516704/s
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
             {duration: '2s', target: 0},
             {duration: '5s', target: 50},
             {duration: '5s', target: 90},
             {duration: '10s', target: 0},
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
        'path info distance check success' : (response) => response['distance'] == 예상거리
    });
};

```
```js
     ✓ lending page running
     ✓ logged in successfully
     ✓ retrieved member
     ✓ path info distance check success

     checks.........................: 100.00% ✓ 372      ✗ 0   
     data_received..................: 670 kB  13 kB/s
     data_sent......................: 134 kB  2.6 kB/s
     http_req_blocked...............: avg=1.06ms   min=4.1µs   med=4.84µs   max=28.37ms  p(90)=4.02ms   p(95)=4.14ms  
     http_req_connecting............: avg=107.53µs min=0s      med=0s       max=864.57µs p(90)=435.89µs p(95)=477.42µs
   ✗ http_req_duration..............: avg=7.5s     min=3.05ms  med=899.26ms max=35.41s   p(90)=27.24s   p(95)=28.27s  
       { expected_response:true }...: avg=7.5s     min=3.05ms  med=899.26ms max=35.41s   p(90)=27.24s   p(95)=28.27s  
     http_req_failed................: 0.00%   ✓ 0        ✗ 372 
     http_req_receiving.............: avg=83.73µs  min=38.22µs med=80.66µs  max=210.06µs p(90)=118.01µs p(95)=130.98µs
     http_req_sending...............: avg=30.25µs  min=12.63µs med=20.17µs  max=193.15µs p(90)=64.83µs  p(95)=76.09µs 
     http_req_tls_handshaking.......: avg=926.99µs min=0s      med=0s       max=27.2ms   p(90)=3.49ms   p(95)=3.57ms  
     http_req_waiting...............: avg=7.5s     min=2.92ms  med=899.14ms max=35.41s   p(90)=27.24s   p(95)=28.27s  
     http_reqs......................: 372     7.153551/s
     iteration_duration.............: avg=21.68s   min=2s      med=20.57s   max=41.01s   p(90)=34.57s   p(95)=37.84s  
     iterations.....................: 57      1.096109/s
     vus............................: 0       min=0      max=90
     vus_max........................: 90      min=90     max=90

```
====================================================================

- stress.js
``` js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
         { duration: '2s', target: 0 },
         { duration: '3s', target: 50 },
         { duration: '3s', target: 70 },
         { duration: '3s', target: 90 },
         { duration: '1s', target: 50 },
         { duration: '5s', target: 120 },
         { duration: '1s', target: 0 }
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
        'path info distance check success' : (response) => response['distance'] == 예상거리
    });
};

```

``` js
     ✓ lending page running
     ✓ logged in successfully
     ✓ retrieved member
     ✗ path info distance check success
      ↳  87% — ✓ 61 / ✗ 9

     checks.........................: 98.08% ✓ 462      ✗ 9    
     data_received..................: 867 kB 18 kB/s
     data_sent......................: 169 kB 3.5 kB/s
     http_req_blocked...............: avg=1.12ms   min=3.97µs  med=4.9µs    max=45.65ms  p(90)=3.99ms   p(95)=4.18ms  
     http_req_connecting............: avg=110.09µs min=0s      med=0s       max=2.07ms   p(90)=410.63µs p(95)=441.3µs 
   ✗ http_req_duration..............: avg=7.97s    min=3.01ms  med=1.04s    max=35.42s   p(90)=28.77s   p(95)=30.01s  
       { expected_response:true }...: avg=6.51s    min=3.01ms  med=815.04ms max=35.42s   p(90)=27.99s   p(95)=28.55s  
     http_req_failed................: 10.82% ✓ 51       ✗ 420  
     http_req_receiving.............: avg=86.2µs   min=35.67µs med=82.1µs   max=297.53µs p(90)=120.19µs p(95)=136.25µs
     http_req_sending...............: avg=33.51µs  min=12.33µs med=20.54µs  max=171.2µs  p(90)=75.9µs   p(95)=83.5µs  
     http_req_tls_handshaking.......: avg=986.27µs min=0s      med=0s       max=44.59ms  p(90)=3.5ms    p(95)=3.61ms  
     http_req_waiting...............: avg=7.97s    min=2.9ms   med=1.04s    max=35.42s   p(90)=28.77s   p(95)=30.01s  
     http_reqs......................: 471    9.812179/s
     iteration_duration.............: avg=24.89s   min=2.01s   med=27.61s   max=40.68s   p(90)=39.6s    p(95)=40.1s   
     iterations.....................: 70     1.458286/s
     vus............................: 1      min=1      max=120
     vus_max........................: 120    min=120    max=120

```