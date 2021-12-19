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

- webServer
    - `~/logs/json.log`
- awslogs
    - `/var/log/syslog`
    - `/var/logs/nginx/access.log`
    - `/var/logs/nginx/error.log`

2. Cloudwatch 대시보드 URL을 알려주세요

- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-arasia

---

### 2단계 - 성능 테스트

#### 웹 성능예산은 어느정도가 적당하다고 생각하시나요

> 지하철 이동 특성상 모바일 기준으로 측정  
> 가장 많이 이용될 메인 페이지를 테스트 기준으로 측정

##### 사이트별 비교

1. 지하철 노선 관리 (http://infra.arasia.kro.kr:9080)
    1. First Contentful Paint: 15.1s
    2. Time to Interactive: 15.8s
    3. Speed Index: 15.1s
    4. Total Blocking Time: 650ms
    5. Largest Contentful Paint: 15.7s
2. 서울 교통 공사 사이버 스테이션 (http://www.seoulmetro.co.kr/kr/cyberStation.do)
    1. First Contentful Paint: 6.9s
    2. Time to Interactive: 8.7s
    3. Speed Index: 8.7s
    4. Total Blocking Time: 620ms
    5. Largest Contentful Paint: 7.0s
3. 네이버 지도 (https://map.naver.com)
    1. First Contentful Paint: 3.0s
    2. Time to Interactive: 6.5s
    3. Speed Index: 6.8s
    4. Total Blocking Time: 300ms
    5. Largest Contentful Paint: 7.3s

##### 성능 예산 목표

> 경쟁 사이트 기준 10% 성능차이 이내로 목표 지정

1. First Contentful Paint: 3.3s 이내
2. Time to Interactive: 7.1s 이내
3. Speed Index: 7.4s 이내
4. Total Blocking Time: 330ms 이내
5. Largest Contentful Paint: 8.0s 이내

#### 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

1. 전달 리소스의 텍스트 압축이 필요함
2. 자주 사용되는 화면에 대한 캐싱 기능이 필요함
3. 로딩 시간 감소를 위한 스크립트 최적화
4. 지연로딩을 통하여 초기 반응 시간 감소

#### 부하테스트 전제조건은 어느정도로 설정하셨나요

##### 경쟁 사이트 조사

> 참조 기사 (https://www.sedaily.com/NewsVIew/22RH3PUBN6)

1. 지하철 종결자: 197만 MAU
2. 네이버 지도: 1392만 MAU

##### 부하테스트 전재 조건

> 네이버의 수치는 최정상 기업답게 너무 높고 지하철 종결자보단 잘 나와야한다 생각함  
> 따라서 300만 MAU를 기준으로 테스트 진행

1. 예상 DAU: 300만(MAU) / 30(D) = 10만(DAU)
2. 1명당 1일 평균 접속 수 : 6회
    - 출근(1회)
    - 퇴근(1회)
    - 중간 이동 왕복 (2회)
    - 퇴근 후 이동 왕복 (2회)
3. 1일 총 접속수: 10만(DAU) * 6회 = 60만
4. 1일 평균 rps: 60만 / 86400(s/D) = 약 7 rps
5. 1일 최대 rps: 7 * 2(추정치) = 14 rps
6. 에상 지연시간 :  100ms 이하

#### Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

##### 메인 페이지

> 스크립트 경로: k6/main

1. Smoke

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


running (10.0s), 0/1 VUs, 1164 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ main Page Http Response Code 200

     checks.........................: 100.00% ✓ 1164       ✗ 0   
     data_received..................: 1.3 MB  132 kB/s
     data_sent......................: 105 kB  11 kB/s
     http_req_blocked...............: avg=100.87µs min=0s     med=2µs    max=35.22ms p(90)=5µs     p(95)=7µs    
     http_req_connecting............: avg=75.78µs  min=0s     med=0s     max=10.19ms p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=8.37ms   min=5.51ms med=8.09ms max=21.27ms p(90)=10.26ms p(95)=10.88ms
       { expected_response:true }...: avg=8.37ms   min=5.51ms med=8.09ms max=21.27ms p(90)=10.26ms p(95)=10.88ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 1164
     http_req_receiving.............: avg=43.46µs  min=8µs    med=30µs   max=461µs   p(90)=78µs    p(95)=84µs   
     http_req_sending...............: avg=14.48µs  min=2µs    med=11µs   max=132µs   p(90)=27µs    p(95)=29µs   
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s     max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=8.32ms   min=5.36ms med=8.05ms max=21.14ms p(90)=10.18ms p(95)=10.79ms
     http_reqs......................: 1164    116.306315/s
     iteration_duration.............: avg=8.58ms   min=5.64ms med=8.22ms max=42.84ms p(90)=10.48ms p(95)=11.18ms
     iterations.....................: 1164    116.306315/s
     vus............................: 1       min=1        max=1 
     vus_max........................: 1       min=1        max=1 
```

2. Load

```text
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 50s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (20.0s), 000/300 VUs, 89781 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  20s

     ✓ main Page Http Response Code 200

     checks.........................: 100.00% ✓ 89781      ✗ 0    
     data_received..................: 102 MB  5.1 MB/s
     data_sent......................: 8.1 MB  404 kB/s
     http_req_blocked...............: avg=130.17µs min=0s     med=1µs     max=27.76ms  p(90)=2µs      p(95)=3µs     
     http_req_connecting............: avg=127.8µs  min=0s     med=0s      max=27.67ms  p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=50.05ms  min=3.66ms med=24.67ms max=331.79ms p(90)=182.57ms p(95)=250.7ms 
       { expected_response:true }...: avg=50.05ms  min=3.66ms med=24.67ms max=331.79ms p(90)=182.57ms p(95)=250.7ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 89781
     http_req_receiving.............: avg=30.74µs  min=4µs    med=21µs    max=19.06ms  p(90)=46µs     p(95)=65µs    
     http_req_sending...............: avg=10.84µs  min=1µs    med=6µs     max=18.51ms  p(90)=12µs     p(95)=17µs    
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=50.01ms  min=3.64ms med=24.63ms max=331.76ms p(90)=182.55ms p(95)=250.66ms
     http_reqs......................: 89781   4486.00871/s
     iteration_duration.............: avg=50.25ms  min=3.88ms med=24.84ms max=331.85ms p(90)=182.64ms p(95)=250.77ms
     iterations.....................: 89781   4486.00871/s
     vus............................: 1       min=1        max=300
     vus_max........................: 300     min=300      max=300
```

3. Stress

```text
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 900 max VUs, 1m10s max duration (incl. graceful stop):
           * default: Up to 900 looping VUs for 40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m40.0s), 000/900 VUs, 178853 complete and 0 interrupted iterations
default ✓ [======================================] 000/900 VUs  40s

     ✓ main Page Http Response Code 200

     checks.........................: 100.00% ✓ 178853      ✗ 0     
     data_received..................: 203 MB  5.1 MB/s
     data_sent......................: 16 MB   402 kB/s
     http_req_blocked...............: avg=241.42µs min=0s     med=1µs      max=370.37ms p(90)=2µs      p(95)=3µs     
     http_req_connecting............: avg=238.84µs min=0s     med=0s       max=370.27ms p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=113.24ms min=4.13ms med=108.23ms max=669.32ms p(90)=240.09ms p(95)=265.21ms
       { expected_response:true }...: avg=113.24ms min=4.13ms med=108.23ms max=669.32ms p(90)=240.09ms p(95)=265.21ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 178853
     http_req_receiving.............: avg=32.79µs  min=5µs    med=23µs     max=13.39ms  p(90)=47µs     p(95)=65µs    
     http_req_sending...............: avg=11.58µs  min=1µs    med=7µs      max=13.41ms  p(90)=12µs     p(95)=17µs    
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=113.19ms min=4.12ms med=108.19ms max=669.29ms p(90)=240.06ms p(95)=265.16ms
     http_reqs......................: 178853  4470.460413/s
     iteration_duration.............: avg=113.56ms min=4.18ms med=108.42ms max=669.38ms p(90)=240.22ms p(95)=265.33ms
     iterations.....................: 178853  4470.460413/s
     vus............................: 1       min=1         max=900 
     vus_max........................: 900     min=900       max=900 
```

##### 마이페이지

> 스크립트 경로: k6/maPage

1. Smoke

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


running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0  
     data_received..................: 4.5 kB  431 B/s
     data_sent......................: 4.6 kB  442 B/s
     http_req_blocked...............: avg=798.9µs min=1µs     med=3.5µs   max=15.91ms p(90)=6.1µs   p(95)=802.49µs
     http_req_connecting............: avg=755.9µs min=0s      med=0s      max=15.11ms p(90)=0s      p(95)=755.89µs
   ✓ http_req_duration..............: avg=20.76ms min=15.98ms med=19.71ms max=25.59ms p(90)=24.15ms p(95)=24.85ms 
       { expected_response:true }...: avg=20.76ms min=15.98ms med=19.71ms max=25.59ms p(90)=24.15ms p(95)=24.85ms 
     http_req_failed................: 0.00%   ✓ 0        ✗ 20 
     http_req_receiving.............: avg=50.4µs  min=21µs    med=42.49µs max=103µs   p(90)=84.2µs  p(95)=95.4µs  
     http_req_sending...............: avg=20.45µs min=6µs     med=18.5µs  max=62µs    p(90)=29.3µs  p(95)=33.49µs 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=20.69ms min=15.92ms med=19.67ms max=25.53ms p(90)=24.04ms p(95)=24.77ms 
     http_reqs......................: 20      1.91475/s
     iteration_duration.............: avg=1.04s   min=1.03s   med=1.04s   max=1.05s   p(90)=1.04s   p(95)=1.05s   
     iterations.....................: 10      0.957375/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

2. Load

```text
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 50s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (20.8s), 000/300 VUs, 4516 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  20s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 9032       ✗ 0    
     data_received..................: 2.0 MB  98 kB/s
     data_sent......................: 2.1 MB  100 kB/s
     http_req_blocked...............: avg=240.53µs min=0s     med=2µs     max=17.16ms p(90)=7µs     p(95)=9µs     
     http_req_connecting............: avg=234.61µs min=0s     med=0s      max=17.03ms p(90)=0s      p(95)=0s      
   ✓ http_req_duration..............: avg=15.46ms  min=8.42ms med=14.99ms max=75.35ms p(90)=19.01ms p(95)=21.17ms 
       { expected_response:true }...: avg=15.46ms  min=8.42ms med=14.99ms max=75.35ms p(90)=19.01ms p(95)=21.17ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 9032 
     http_req_receiving.............: avg=113.21µs min=7µs    med=28µs    max=34.08ms p(90)=69µs    p(95)=315.44µs
     http_req_sending...............: avg=17.65µs  min=2µs    med=13µs    max=3.19ms  p(90)=29µs    p(95)=36µs    
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s      p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=15.33ms  min=8.38ms med=14.87ms max=75.3ms  p(90)=18.85ms p(95)=20.88ms 
     http_reqs......................: 9032    434.292677/s
     iteration_duration.............: avg=1.03s    min=1.02s  med=1.03s   max=1.1s    p(90)=1.03s   p(95)=1.04s   
     iterations.....................: 4516    217.146338/s
     vus............................: 34      min=34       max=300
     vus_max........................: 300     min=300      max=300
```

3. Stress

```text
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 900 max VUs, 1m10s max duration (incl. graceful stop):
           * default: Up to 900 looping VUs for 40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m41.0s), 000/900 VUs, 15968 complete and 0 interrupted iterations
default ✓ [======================================] 000/900 VUs  40s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 31936     ✗ 0    
     data_received..................: 7.2 MB  175 kB/s
     data_sent......................: 7.4 MB  180 kB/s
     http_req_blocked...............: avg=204.01µs min=0s     med=2µs     max=44.9ms  p(90)=5µs      p(95)=8µs     
     http_req_connecting............: avg=199.93µs min=0s     med=0s      max=44.87ms p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=150.92ms min=8.28ms med=68.52ms max=1.98s   p(90)=379.95ms p(95)=530.57ms
       { expected_response:true }...: avg=150.92ms min=8.28ms med=68.52ms max=1.98s   p(90)=379.95ms p(95)=530.57ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 31936
     http_req_receiving.............: avg=167.81µs min=6µs    med=24µs    max=23.64ms p(90)=75µs     p(95)=868.24µs
     http_req_sending...............: avg=13.74µs  min=2µs    med=11µs    max=453µs   p(90)=23µs     p(95)=30µs    
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=150.74ms min=8.24ms med=68.3ms  max=1.98s   p(90)=379.69ms p(95)=530.43ms
     http_reqs......................: 31936   779.73214/s
     iteration_duration.............: avg=1.3s     min=1.02s  med=1.16s   max=3.68s   p(90)=1.75s    p(95)=1.91s   
     iterations.....................: 15968   389.86607/s
     vus............................: 49      min=49      max=900
     vus_max........................: 900     min=900     max=900
```

##### 경로 탐색 페이지

> 스크립트 경로: k6/path

1. Smoke

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


running (10.7s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ Http Response Code 200
     ✓ Success Path Distance 39

     checks.........................: 100.00% ✓ 20       ✗ 0  
     data_received..................: 48 kB   4.5 kB/s
     data_sent......................: 1.5 kB  138 B/s
     http_req_blocked...............: avg=1.19ms   min=5µs     med=9µs     max=11.88ms p(90)=1.19ms  p(95)=6.54ms 
     http_req_connecting............: avg=1.11ms   min=0s      med=0s      max=11.11ms p(90)=1.11ms  p(95)=6.11ms 
   ✓ http_req_duration..............: avg=63.36ms  min=57.12ms med=61.58ms max=73.64ms p(90)=73.21ms p(95)=73.42ms
       { expected_response:true }...: avg=63.36ms  min=57.12ms med=61.58ms max=73.64ms p(90)=73.21ms p(95)=73.42ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10 
     http_req_receiving.............: avg=414.79µs min=76µs    med=154.5µs max=1.63ms  p(90)=1.46ms  p(95)=1.55ms 
     http_req_sending...............: avg=49µs     min=22µs    med=41µs    max=123µs   p(90)=70.8µs  p(95)=96.89µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=62.9ms   min=56.94ms med=60.65ms max=72.97ms p(90)=72.16ms p(95)=72.57ms
     http_reqs......................: 10      0.937911/s
     iteration_duration.............: avg=1.06s    min=1.05s   med=1.06s   max=1.07s   p(90)=1.07s   p(95)=1.07s  
     iterations.....................: 10      0.937911/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

2. Load

```text
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 50s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (20.7s), 000/300 VUs, 2393 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  20s

     ✓ Http Response Code 200
     ✓ Success Path Distance 39

     checks.........................: 100.00% ✓ 4786       ✗ 0    
     data_received..................: 12 MB   555 kB/s
     data_sent......................: 352 kB  17 kB/s
     http_req_blocked...............: avg=1.59ms   min=0s      med=3µs   max=167.54ms p(90)=6.46ms p(95)=7.88ms 
     http_req_connecting............: avg=1.58ms   min=0s      med=0s    max=167.5ms  p(90)=6.38ms p(95)=7.81ms 
   ✓ http_req_duration..............: avg=981.6ms  min=51.83ms med=1.23s max=2.65s    p(90)=1.36s  p(95)=1.4s   
       { expected_response:true }...: avg=981.6ms  min=51.83ms med=1.23s max=2.65s    p(90)=1.36s  p(95)=1.4s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 2393 
     http_req_receiving.............: avg=1.14ms   min=17µs    med=92µs  max=48.8ms   p(90)=2.77ms p(95)=6.11ms 
     http_req_sending...............: avg=20.95µs  min=3µs     med=15µs  max=329µs    p(90)=38µs   p(95)=51.39µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s    max=0s       p(90)=0s     p(95)=0s     
     http_req_waiting...............: avg=980.43ms min=51.62ms med=1.23s max=2.65s    p(90)=1.36s  p(95)=1.39s  
     http_reqs......................: 2393    115.468103/s
     iteration_duration.............: avg=1.98s    min=1.05s   med=2.23s max=3.65s    p(90)=2.37s  p(95)=2.4s   
     iterations.....................: 2393    115.468103/s
     vus............................: 29      min=29       max=300
     vus_max........................: 300     min=300      max=300
```

3. Stress

```text
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 900 max VUs, 1m10s max duration (incl. graceful stop):
           * default: Up to 900 looping VUs for 40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m41.8s), 000/900 VUs, 5226 complete and 0 interrupted iterations
default ✓ [======================================] 000/900 VUs  40s

     ✓ Http Response Code 200
     ✓ Success Path Distance 39

     checks.........................: 100.00% ✓ 10452      ✗ 0    
     data_received..................: 25 MB   600 kB/s
     data_sent......................: 768 kB  18 kB/s
     http_req_blocked...............: avg=1.44ms  min=1µs     med=5µs   max=157.3ms  p(90)=6.85ms p(95)=7.8ms 
     http_req_connecting............: avg=1.42ms  min=0s      med=0s    max=157.21ms p(90)=6.76ms p(95)=7.73ms
   ✗ http_req_duration..............: avg=3.35s   min=51.82ms med=3.59s max=8.26s    p(90)=5.83s  p(95)=5.86s 
       { expected_response:true }...: avg=3.35s   min=51.82ms med=3.59s max=8.26s    p(90)=5.83s  p(95)=5.86s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 5226 
     http_req_receiving.............: avg=1.05ms  min=15µs    med=98µs  max=38.75ms  p(90)=2.63ms p(95)=5.43ms
     http_req_sending...............: avg=29.06µs min=4µs     med=23µs  max=1.17ms   p(90)=52µs   p(95)=82µs  
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s    max=0s       p(90)=0s     p(95)=0s    
     http_req_waiting...............: avg=3.35s   min=51.68ms med=3.59s max=8.26s    p(90)=5.83s  p(95)=5.86s 
     http_reqs......................: 5226    124.953379/s
     iteration_duration.............: avg=4.35s   min=1.05s   med=4.6s  max=9.26s    p(90)=6.84s  p(95)=6.86s 
     iterations.....................: 5226    124.953379/s
     vus............................: 114     min=60       max=900
     vus_max........................: 900     min=900      max=900
```
