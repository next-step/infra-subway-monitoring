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
  - APPLICATION :/home/ubuntu/infra-subway-monitoring/log
  - 요구사항이 변경되어서 ALB(WAF) 적용 후 nginx는 종료하였습니다.

2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-steadyjin
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

```text
A. 예비 분석
    1. 지하철 노선도 서비스에서 가장 중요한 페이지
        - 경로 조회 페이지 
          사용자가 가장 많이 사용할 페이지이기 때문에 중요하다. 
          또한 다른 페이지에 비해서 DB에서 많은 데이터를 조회를 해야하는 페이지이기 때문에 로딩 속도가 느릴 가능성이 높다.
          느린 로딩 속도는 사용자의 이탈률을 증가시키는 원인이 되므로 중요한 페이지라고 할 수 있겠다. 
          (참고) 3초 안에 로딩되지 않으면 53% 사용자가 떠난다는 룰이 있음

B. 경쟁사 분석
    경쟁사 대비 20% 이상 성능 차이가 나고 있음.
    1. 현재 내 사이트 상태(http://3.35.48.111/path)
       - First Contentful Paint    : 3.0 s
       - Time to Interactive       : 3.1 s
       - Speed Index               : 3.0 s
       - Total Blocking Time       : 10 ms
       - Largest Contentful Paint  : 3.0 s
       - Cumulative Layout Shift   : 0 
    2. 서울교통공사 사이버 스테이션(http://www.seoulmetro.co.kr/kr/cyberStation.do)
       - First Contentful Paint    : 1.6 s
       - Time to Interactive       : 2.2 s
       - Speed Index               : 3.1 s
       - Total Blocking Time       : 360 ms
       - Largest Contentful Paint  : 3.6 s
       - Cumulative Layout Shift   : 0.013      
    3. 네이버 지하철(https://m.map.naver.com/subway/subwayLine.naver?region=1000)
       - First Contentful Paint    : 0.5 s
       - Time to Interactive       : 0.5 s
       - Speed Index               : 3.2 s
       - Total Blocking Time       : 0 ms
       - Largest Contentful Paint  : 1.6 s
       - Cumulative Layout Shift   : 0.006 
         
(참고) PageSpeed의 데스크톱 항목 기준 측정된 결과 

C. 웹 성능 예산 설정
    1. 우수 경쟁사 대비 최소 20% 차이를 기준으로 예산 설정함
    (차이가 20% 이상일 경우 사용자는 차이를 인식함.) 
    
       - First Contentful Paint    : 0.6 s
       - Time to Interactive       : 0.6 s
       - Speed Index               : 3.0 s
       - Total Blocking Time       : 10 ms
       - Largest Contentful Paint  : 1.92 s
       - Cumulative Layout Shift   : 0 

```   

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

```text
   1. Gzip 압축 기능을 추가
     -> property에 적용
     -> FCP는 3.0s -> 1.5s, TTI는 3.1s -> 1.5s, SI는 3.0s -> 1.5s, LCP는 3.0s -> 1.5s 개선
     
   2. 정적 리소스에 대해서는 캐싱 설정 적용
     -> property에 적용
     -> pageSpeed FCP, LCP 등 시간 지표에서는 시간 차이 없음.
     
   3. 렌더링 차단 리소스 제거하기
     -> 렌더링 차단 js에 defer 적용
     -> FCP는 1.5s -> 0.9s, TTI는 1.5s -> 1.5s, SI는 1.5s -> 1.2s, LCP는 1.5s -> 1.4s로 개선 (최종 개선)  
```

5. 부하테스트 전제조건은 어느정도로 설정하셨나요

```text
1. 예상 1일 사용자 수(DAU)
 - 경쟁사 네이버지도 월간 사용자 수는 1112만명(https://news.mt.co.kr/mtview.php?no=2021090916014079809)
 - 네이버지도의 MAU를 바로 따라가긴 현실적으로 어려움. 
 - 200만명을 예상 MAU로 선정
 - DAU는 [30일/1달]로 계산하여 66,666명으로 설정

2. 예상 피크 시간대
 - 출퇴근 시간대 피크 예상
 - 07:00 ~ 10:00 AM, 06:00 ~ 09:00 PM
 
3. 1명당 1일 평균 접속 혹은 요청 수
 - 출/퇴근 시간에 1번씩 접속(총 2회) 요청한다고 가정
 - 메인페이지, 경로 조회 페이지, 최단 거리 조회 등 평균 3회 요청한다고 가정
 - 1명당 1일 평균 요청수 = 2 * 3 = 6회
  
4. Throughput (1일 평균 RPS ~ 최대 RPS)
  - 1일 사용자 수(DAU) * 1명당 1일 평균 접속 수 = 66,666 * 6 = 399,996 (1일 총 접속수)
  - 1일 총 접속 수 / 86,400 (초/일) = 399,996 / 86,400 = 평균 4.62 (1일 평균 rps)
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 4.62 * 10(가정치) = 46.2 (1일 최대 rps)

```

6. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

smoke.js 스크립트
```text
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://3.35.48.111';
const USERNAME = 'test@email.com';
const PASSWORD = 'test';

export default function ()  {
  let 경로조회페이지_response = http.get(`${BASE_URL}/path`);

  check(경로조회페이지_response, {
    '경로조회페이지 응답 결과': (response) => response.status === 200
  });

  let 경로탐색_response = http.get(`${BASE_URL}/paths?source=106&target=107`); // 106:강남역 107:교대역

  check(경로탐색_response, {
      '최단경로 조회 응답 결과': (response) => response.json('distance') > 0
  });
}
```
smoke 테스트 결과
```text
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


running (10.0s), 0/1 VUs, 218 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 경로조회페이지 응답 결과
     ✓ 최단경로 조회 응답 결과

     checks.........................: 100.00% ✓ 436       ✗ 0
     data_received..................: 331 kB  33 kB/s
     data_sent......................: 40 kB   4.0 kB/s
     http_req_blocked...............: avg=11.15µs min=3.7µs    med=4.83µs  max=592.56µs p(90)=5.9µs    p(95)=6.75µs
     http_req_connecting............: avg=5.16µs  min=0s       med=0s      max=480.13µs p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=22.76ms min=626.02µs med=24.8ms  max=68.82ms  p(90)=45.27ms  p(95)=45.6ms
       { expected_response:true }...: avg=22.76ms min=626.02µs med=24.8ms  max=68.82ms  p(90)=45.27ms  p(95)=45.6ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 436
     http_req_receiving.............: avg=93.59µs min=35.04µs  med=73.53µs max=319.96µs p(90)=161.97µs p(95)=183.14µs
     http_req_sending...............: avg=19.03µs min=10.31µs  med=14.95µs max=270.24µs p(90)=29.56µs  p(95)=30.79µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=22.65ms min=570.75µs med=24.58ms max=68.73ms  p(90)=45.12ms  p(95)=45.42ms
     http_reqs......................: 436     43.593308/s
     iteration_duration.............: avg=45.85ms min=43.48ms  med=45.74ms max=70.73ms  p(90)=46.77ms  p(95)=47.22ms
     iterations.....................: 218     21.796654/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1
```
load.js 스크립트
```text
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '5s', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<500']
  },
};

const BASE_URL = 'http://3.35.48.111';
const USERNAME = 'test@email.com';
const PASSWORD = 'test';

export default function ()  {
  let 경로조회페이지_response = http.get(`${BASE_URL}/path`);

  check(경로조회페이지_response, {
    '경로조회페이지 응답 결과': (response) => response.status === 200
  });

  let 경로탐색_response = http.get(`${BASE_URL}/paths?source=106&target=107`); // 106:강남역 107:교대역

  check(경로탐색_response, {
      '최단경로 조회 응답 결과': (response) => response.json('distance') > 0
  });
}
```
load 테스트 결과
```text

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 55s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 25s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (25.0s), 00/50 VUs, 3636 complete and 0 interrupted iterations
default ✓ [======================================] 00/50 VUs  25s

     ✓ 경로조회페이지 응답 결과
     ✓ 최단경로 조회 응답 결과

     checks.........................: 100.00% ✓ 7272       ✗ 0
     data_received..................: 5.5 MB  220 kB/s
     data_sent......................: 673 kB  27 kB/s
     http_req_blocked...............: avg=14.5µs   min=3.25µs   med=4.2µs   max=8.54ms   p(90)=5.4µs    p(95)=7.71µs
     http_req_connecting............: avg=8.38µs   min=0s       med=0s      max=8.45ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=104.37ms min=539.64µs med=37.09ms max=483.13ms p(90)=312.57ms p(95)=323.68ms
       { expected_response:true }...: avg=104.37ms min=539.64µs med=37.09ms max=483.13ms p(90)=312.57ms p(95)=323.68ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7272
     http_req_receiving.............: avg=348.99µs min=17.63µs  med=59.67µs max=19.44ms  p(90)=683.79µs p(95)=1.43ms
     http_req_sending...............: avg=19.37µs  min=9.04µs   med=12.3µs  max=7.34ms   p(90)=18.8µs   p(95)=32.06µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=104ms    min=492.12µs med=36.99ms max=483.01ms p(90)=311.84ms p(95)=323.14ms
     http_reqs......................: 7272    290.425818/s
     iteration_duration.............: avg=209.02ms min=44.27ms  med=218.4ms max=484.06ms p(90)=325.57ms p(95)=333.24ms
     iterations.....................: 3636    145.212909/s
     vus............................: 1       min=1        max=50
     vus_max........................: 50      min=50       max=50
```
stress.js 스크립트
```text
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '2s', target: 50 },
    { duration: '5s', target: 50 },
    { duration: '2s', target: 100 },
    { duration: '5s', target: 100 },
    { duration: '2s', target: 150 },
    { duration: '5s', target: 150 },
    { duration: '2s', target: 200 },
    { duration: '5s', target: 200 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99)<500']
  },
};

const BASE_URL = 'http://3.35.48.111';
const USERNAME = 'test@email.com';
const PASSWORD = 'test';

export default function ()  {
  let 경로조회페이지_response = http.get(`${BASE_URL}/path`);

  check(경로조회페이지_response, {
    '경로조회페이지 응답 결과': (response) => response.status === 200
  });

  let 경로탐색_response = http.get(`${BASE_URL}/paths?source=106&target=107`); // 106:강남역 107:교대역

  check(경로탐색_response, {
      '최단경로 조회 응답 결과': (response) => response.json('distance') > 0
  });
}

```
stress 테스트 결과
```text

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m8s max duration (incl. graceful stop):
           * default: Up to 200 looping VUs for 38s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m38.0s), 000/200 VUs, 5643 complete and 0 interrupted iterations
default ↓ [======================================] 001/200 VUs  38s

     ✓ 경로조회페이지 응답 결과
     ✓ 최단경로 조회 응답 결과

     checks.........................: 100.00% ✓ 11286      ✗ 0
     data_received..................: 8.6 MB  225 kB/s
     data_sent......................: 1.0 MB  27 kB/s
     http_req_blocked...............: avg=23.81µs  min=3.25µs   med=4.17µs  max=13.28ms p(90)=5.8µs    p(95)=9.9µs
     http_req_connecting............: avg=15.95µs  min=0s       med=0s      max=13.17ms p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=387.73ms min=514.02µs med=42.05ms max=2.65s   p(90)=1.18s    p(95)=1.33s
       { expected_response:true }...: avg=387.73ms min=514.02µs med=42.05ms max=2.65s   p(90)=1.18s    p(95)=1.33s
     http_req_failed................: 0.00%   ✓ 0          ✗ 11286
     http_req_receiving.............: avg=407.39µs min=20.32µs  med=61.5µs  max=25.05ms p(90)=835.36µs p(95)=1.64ms
     http_req_sending...............: avg=19.7µs   min=8.89µs   med=12.38µs max=8.42ms  p(90)=20.13µs  p(95)=36.56µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=387.31ms min=469.56µs med=41.95ms max=2.65s   p(90)=1.18s    p(95)=1.32s
     http_reqs......................: 11286   296.687166/s
     iteration_duration.............: avg=775.78ms min=44.92ms  med=736.2ms max=2.65s   p(90)=1.33s    p(95)=1.35s
     iterations.....................: 5643    148.343583/s
     vus............................: 1       min=1        max=200
     vus_max........................: 200     min=200      max=200

ERRO[0039] some thresholds have failed

```