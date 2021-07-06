# 서비스 진단하기
## 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- WebPageTest 기준
  Compress Transfer : E등급 -> A등급
  Cache Static Content : C등급 -> A등급
- PageSpeed Insgihts 기준
  점수 : 67 -> 85~
  FCP : 2.8s -> 2s ↓
  TTI : 2.8s ->  2s ↓
  SpeedIndex : 2.8s ->  2s ↓
  LCP : 2.8s ->  2s ↓  

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 개선 포인트
    - verdor.js, main.js에 gzip을 통한 텍스트 압축, 지연 로딩 적용
      - 위 두 스크립트를 압축 및 지연 로딩, min.js로 최소화 했을 때 예상 되는 개선 효과가 높으므로 조치할 예정입니다.
    - 주요 정적 자원에 캐싱 적용
      - vendor.js와 main.js 외에 사진 등에 대해 캐시를 할 경우 불 필요한 재 요청이 사라지므로 성능 개선을 기대할 수 있습니다.

- 개선 결과
- WebPageTest 기준
  Compress Transfer : A등급
  Cache Static Content : A등급
- PageSpeed Insgihts 기준
  점수 : 85
  FCP : 0.7s
  TTI : 1.3s
  SpeedIndex : 1.8s
  LCP : 1.3s


3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   참고) 네이버 보다 카카오톡 더 오래 머문다... 포털⋅지도⋅웹툰은 네이버가 우위 (https://biz.chosun.com/site/data/html_dir/2020/07/09/2020070901297.html)
```
1. 예상 DAU
- 평소 사용자가 많다고 생각했던 카카오 맵의 MAU가 2020년 06월 기준 530만인 것을 확인함
- 카카오맵만큼의 사용자가 있는 상황이 아니므로, 카카오맵의 5분의 1인 106만을 목표로 함
- DAU는 106만 / 30일의 값을 조금 보정한 35,000으로 설정

2. 예상 피크 시간대
- 출·퇴근 시간에 가장 활발히 사용할 것으로 예상
- 06:30 ~ 09:00 AM, 05:00 ~ 08:00 PM

3. 1명당 1일 평균 접속 혹은 요청 수
- 출·퇴근 시간에 1번씩 접속(총 2회)
- 로그인, 즐겨찾기, 노선 조회, 경로 조회를 사용할 것으로 예상하며 플러스 알파로 총 6회를 요청한다고 가정

4. Throughput (1일 평균 RPS ~ 최대 RPS)
- DAU * 인당 일평균 접속 수 = 35,000 * 12 = 420,000 (1일 총 접속수)
- 1일 총 접속 수 / 86,400 (초/일) = 420,000 / 86,400 = 평균 4.86 (1일 평균 rps)
- 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 4.86 * 12 = 58.32 (1일 최대 rps)
```
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
###공통 테스트 내용 
Test 내용은 Smoke, Load, Stress 모두 동일하며, Option의 vus와 duration만 다릅니다.
- common script
```js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export var testBody = {
    "run" : () => {
        let loginRes = testBody.로그인();

        testBody.로그인_검증(loginRes);

        let myObjects = testBody.나의정보_조회(loginRes);

        testBody.나의정보_검증(myObjects);

        let lineRes = testBody.라인_정보_조회(loginRes, 1);

        testBody.라인_정보_조회_검증(lineRes, 1);

        let pathsRes = testBody.경로_조회(loginRes, 1, 3)

        testBody.경로_조회_검증(pathsRes, 24)

        sleep(1);
    },

    "로그인" : () => {
        var payload = JSON.stringify({
            email: {USERNAME},
            password: {PASSWORD},
        });

        var params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };


        return http.post(`${BASE_URL}/login/token`, payload, params);
    },

    "로그인_검증" : (loginRes) => {
        check(loginRes, {
            '로그인 성공': (resp) => resp.json('accessToken') !== '',
        });
    },

    "나의정보_조회" : (loginRes) => {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };

        return http.get(`${BASE_URL}/members/me`, authHeaders).json();
    },

    "나의정보_검증" : (myObjects) => {
        check(myObjects, { '나의 정보 조회 성공': (obj) => obj.id != 0 });
    },

    "라인_정보_조회" : (loginRes, lineNumber) => {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };

        return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
    },

    "라인_정보_조회_검증" : (lineRes, lineNumber) => {
        check(lineRes, {
            '라인 정보 조회 성공': (resp) => resp['id'] == lineNumber,
        });
    },

    "경로_조회" : (loginRes, source, target) => {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };

        return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
    },

    "경로_조회_검증" : (pathsRes, exceptDistance) => {
        check(pathsRes, {
            '최단 경로 조회 성공': (resp) => resp['distance'] == exceptDistance,
        });
    }
};
```
---
### Smoke
- script
```js
import {testBody} from './common-body.js';
export {testBody}

export default function() {
    testBody.run();
}

export let options = {
    /* 10 Users during 30 seconds */
    vus: 10,
    duration: '30s',
    thresholds: {
        checks: ['rate > 0.95'], // 95% of requests must complete below 1.5s
        http_req_duration: ['p(95)<1500'], // 95% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://jordy-torvalds.o-r.kr';
const USERNAME = 'jordy-torvalds@jordy.com';
const PASSWORD = 'jordy';
```
- result
```
running (0m30.6s), 00/10 VUs, 281 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  30s

     ✓ 로그인 성공
     ✓ 나의 정보 조회 성공
     ✓ 라인 정보 조회 성공
     ✓ 최단 경로 조회 성공

✓ checks.........................: 100.00% ✓ 1124      ✗ 0
data_received..................: 3.2 MB  106 kB/s
data_sent......................: 214 kB  7.0 kB/s
http_req_blocked...............: avg=495µs    min=3.41µs  med=4.61µs  max=58.75ms  p(90)=8.24µs  p(95)=9.59µs
http_req_connecting............: avg=23.89µs  min=0s      med=0s      max=3.02ms   p(90)=0s      p(95)=0s
✓ http_req_duration..............: avg=20.53ms  min=2.86ms  med=8.79ms  max=110.7ms  p(90)=56.38ms p(95)=66.33ms
{ expected_response:true }...: avg=34.28ms  min=7.3ms   med=31.12ms max=110.7ms  p(90)=66.25ms p(95)=75.23ms
http_req_failed................: 50.00%  ✓ 562       ✗ 562
http_req_receiving.............: avg=64.91µs  min=23.83µs med=54.49µs max=2.08ms   p(90)=87.01µs p(95)=98.73µs
http_req_sending...............: avg=37.2µs   min=9.96µs  med=14.54µs max=6.14ms   p(90)=40.22µs p(95)=49.28µs
http_req_tls_handshaking.......: avg=458.57µs min=0s      med=0s      max=55.18ms  p(90)=0s      p(95)=0s
http_req_waiting...............: avg=20.43ms  min=2.82ms  med=8.69ms  max=110.61ms p(90)=56.32ms p(95)=66.27ms
http_reqs......................: 1124    36.685383/s
iteration_duration.............: avg=1.08s    min=1.04s   med=1.08s   max=1.26s    p(90)=1.1s    p(95)=1.11s
iterations.....................: 281     9.171346/s
vus............................: 10      min=10      max=10
vus_max........................: 10      min=10      max=10
```
---
### Load
- script
```js
import {testBody} from './common-body.js';
export {testBody}

export default function() {
    testBody.run();
}

export let options = {
    /* 250 Users during 30 seconds */
    vus: 250,
    duration: '30s',
    thresholds: {
        checks: ['rate > 0.95'], // 95% of requests must complete below 1.5s
        http_req_duration: ['p(95)<1500'], // 95% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://jordy-torvalds.o-r.kr';
const USERNAME = 'jordy-torvalds@jordy.com';
const PASSWORD = 'jordy';
```
- result
```js
running (0m32.3s), 000/250 VUs, 3092 complete and 0 interrupted iterations
default ✓ [======================================] 250 VUs  30s

     ✗ 로그인 성공
      ↳  92% — ✓ 2869 / ✗ 223
     ✓ 나의 정보 조회 성공
     ✓ 라인 정보 조회 성공
     ✓ 최단 경로 조회 성공

   ✓ checks.........................: 98.07% ✓ 11341      ✗ 223
     data_received..................: 34 MB  1.1 MB/s
     data_sent......................: 2.4 MB 74 kB/s
     http_req_blocked...............: avg=7.01ms   min=0s     med=4.83µs   max=394.91ms p(90)=8.33µs   p(95)=899.17µs
     http_req_connecting............: avg=756.98µs min=0s     med=0s       max=81.13ms  p(90)=0s       p(95)=1.98ms
   ✓ http_req_duration..............: avg=421.81ms min=0s     med=510.69ms max=2.1s     p(90)=690.54ms p(95)=826.25ms
       { expected_response:true }...: avg=580.69ms min=7.72ms med=570.86ms max=2.07s    p(90)=761.48ms p(95)=906.83ms
     http_req_failed................: 51.56% ✓ 5992       ✗ 5629
     http_req_receiving.............: avg=245.9µs  min=0s     med=47.66µs  max=69.97ms  p(90)=86.6µs   p(95)=262.56µs
     http_req_sending...............: avg=798.33µs min=0s     med=15.11µs  max=250.43ms p(90)=52.52µs  p(95)=625.99µs
     http_req_tls_handshaking.......: avg=5.94ms   min=0s     med=0s       max=359.16ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=420.77ms min=0s     med=510.33ms max=2.1s     p(90)=689.84ms p(95)=826.04ms
     http_reqs......................: 11621  359.813977/s
     iteration_duration.............: avg=2.52s    min=5.03ms med=2.68s    max=5.17s    p(90)=3.19s    p(95)=3.47s
     iterations.....................: 3092   95.735721/s
     vus............................: 45     min=45       max=250
     vus_max........................: 250    min=250      max=250
```
---
### Stress
- script
```js
import {testBody} from './common-body.js';
export {testBody}

export default function() {
    testBody.run();
}

export let options = {
    stages: [ /* ex. duration: 10s, target 100 -> 10초간 100명의 가상 사용자가 테스트 진행*/
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
        checks: ['rate > 0.95'], // 95% of requests must complete below 1.5s
        http_req_duration: ['p(95)<1500'], // 95% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://jordy-torvalds.o-r.kr';
const USERNAME = 'jordy-torvalds@jordy.com';
const PASSWORD = 'jordy';
```
- result
```js
running (2m20.8s), 000/400 VUs, 12666 complete and 0 interrupted iterations
default ✓ [======================================] 000/400 VUs  2m20s

     ✗ 로그인 성공
      ↳  94% — ✓ 11962 / ✗ 704
     ✓ 나의 정보 조회 성공
     ✓ 라인 정보 조회 성공
     ✓ 최단 경로 조회 성공

   ✓ checks.........................: 98.54% ✓ 47731      ✗ 704
     data_received..................: 154 MB 1.1 MB/s
     data_sent......................: 11 MB  76 kB/s
     http_req_blocked...............: avg=28.92ms  min=0s     med=4.84µs   max=1.97s    p(90)=25.94µs  p(95)=121.24ms
     http_req_connecting............: avg=9.39ms   min=0s     med=0s       max=1.06s    p(90)=0s       p(95)=33.45ms
   ✓ http_req_duration..............: avg=349.07ms min=0s     med=274.27ms max=3.64s    p(90)=779.18ms p(95)=949.23ms
       { expected_response:true }...: avg=463.74ms min=7.09ms med=441.44ms max=3.41s    p(90)=859.74ms p(95)=1.03s
     http_req_failed................: 50.85% ✓ 24661      ✗ 23830
     http_req_receiving.............: avg=1.14ms   min=0s     med=47.35µs  max=696.68ms p(90)=147.51µs p(95)=737.05µs
     http_req_sending...............: avg=4.76ms   min=0s     med=15.88µs  max=2.16s    p(90)=279.4µs  p(95)=10.85ms
     http_req_tls_handshaking.......: avg=18.49ms  min=0s     med=0s       max=1.5s     p(90)=0s       p(95)=70.56ms
     http_req_waiting...............: avg=343.15ms min=0s     med=265.82ms max=3.64s    p(90)=771.73ms p(95)=933.75ms
     http_reqs......................: 48491  344.325667/s
     iteration_duration.............: avg=2.4s     min=1.44ms med=2.31s    max=7.68s    p(90)=4.05s    p(95)=4.48s
     iterations.....................: 12666  89.938935/s
     vus............................: 6      min=6        max=400
     vus_max........................: 400    min=400      max=400
```
---

## Step1. 로깅과 모니터링
### 작업 필요 목록
- [x] logback.xml 설정
- [x] build.gradle을 통한 특정 실행 환경에 대한 의존성 적용
- [x] 중요 로직에 요청과 응답에 로깅
  - [x] 로그인 로깅
  - [x] 회원 가입 로깅
  - [x] 경로 탐색 로깅
- [x] application.properties 설정
    - [x] Local profile 설정
    - [x] Test profile 설정
    - [x] Production profile 설정
- [x] Spring Actuator 설정
    - [x] prod 프로필인 경우만 dependency 적용

---
## 미션 수행 내용 제출

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
  - Nginx(10.10.10.179) log:
    - access.log: /var/log/nginx/access.log
    - error.log: /var/log/nginx/error.log
    - syslog: /var/log/syslog
  - Spring App(10.10.10.39) log : /home/ubuntu/workspace/log

2. Cloudwatch 대시보드 URL을 알려주세요
: https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-jordy-torvalds
