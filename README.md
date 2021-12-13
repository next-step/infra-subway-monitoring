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

2. Cloudwatch 대시보드 URL을 알려주세요

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   * 페이지 로드 시간 3초 이내
   * TTI 5초 이내
   * FCP 3초 이내

   => https://wp-rocket.me/blog/performance-budgets/#section-3 페이지를 참고


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   [PageSpeed Insights 사이트에서 진단]

   * 총 네트워크 바이트를 최소화하려면 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 제공해야 한다.
   * 사용하지 않는 자바스크립트를 줄여 로딩시간을 줄인다.
   * 렌더링 차단 리소스를 제거한다.


3. 부하테스트 전제조건은 어느정도로 설정하셨나요

   => 일 평균 사용자수 :  300,000 (지하철 종결자 앱 DAU : 100만 참고)

   => 일 평균 접속 수 : 3회

   => 일 평균 총 접속 수 : 900,000

   => 일 평균 RPS : 10.4

   => 일 최대 RPS : 10.4 * 10 = 104

   => 노선 추가 시에 2건의 데이터 INSERT, 10,000건 가량의 요청이 예상됨

   => 99퍼센트 이상의 요청에 대해서 http_req_duration이 1.5s 이하로 나오도록 한계점을 설정하였습니다.


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요


(1) /members/me  (내정보 조회)

* 스크립트 경로 : /home/ubuntu/test/login

* smoke test
```
   ubuntu@ip-192-168-201-105:~$  k6 run smoke.js

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


running (10.3s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0  
     data_received..................: 11 kB   1.1 kB/s
     data_sent......................: 5.5 kB  528 B/s
     http_req_blocked...............: avg=1.48ms   min=4.45µs  med=6.46µs  max=29.56ms  p(90)=13.03µs  p(95)=1.5ms   
     http_req_connecting............: avg=25.71µs  min=0s      med=0s      max=514.2µs  p(90)=0s       p(95)=25.71µs 
✓ http_req_duration..............: avg=13.9ms   min=11.74ms med=13.62ms max=21.06ms  p(90)=15.37ms  p(95)=15.85ms
{ expected_response:true }...: avg=13.9ms   min=11.74ms med=13.62ms max=21.06ms  p(90)=15.37ms  p(95)=15.85ms
http_req_failed................: 0.00%   ✓ 0        ✗ 20
http_req_receiving.............: avg=93.61µs  min=67.29µs med=94.58µs max=118.84µs p(90)=112.22µs p(95)=115.85µs
http_req_sending...............: avg=27.18µs  min=12.5µs  med=29.55µs max=71.51µs  p(90)=32.42µs  p(95)=34.82µs
http_req_tls_handshaking.......: avg=798.41µs min=0s      med=0s      max=15.96ms  p(90)=0s       p(95)=798.41µs
http_req_waiting...............: avg=13.78ms  min=11.63ms med=13.5ms  max=20.87ms  p(90)=15.27ms  p(95)=15.72ms
http_reqs......................: 20      1.937754/s
iteration_duration.............: avg=1.03s    min=1.02s   med=1.02s   max=1.06s    p(90)=1.03s    p(95)=1.05s   
iterations.....................: 10      0.968877/s
vus............................: 1       min=1      max=1
vus_max........................: 1       min=1      max=1
```

* load test

```
ubuntu@ip-192-168-201-105:~$ k6 run load.js 

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m30.8s), 000/100 VUs, 2483 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  30s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 4966       ✗ 0    
     data_received..................: 2.2 MB  70 kB/s
     data_sent......................: 1.3 MB  42 kB/s
     http_req_blocked...............: avg=94.88µs min=3.67µs  med=5.77µs  max=23.46ms  p(90)=9.03µs   p(95)=20.81µs 
     http_req_connecting............: avg=9.88µs  min=0s      med=0s      max=648.08µs p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=12.86ms min=5.58ms  med=10.17ms max=280.67ms p(90)=18.24ms  p(95)=24.57ms 
       { expected_response:true }...: avg=12.86ms min=5.58ms  med=10.17ms max=280.67ms p(90)=18.24ms  p(95)=24.57ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 4966 
     http_req_receiving.............: avg=96.42µs min=25.99µs med=72.71µs max=1.21ms   p(90)=158.69µs p(95)=233.29µs
     http_req_sending...............: avg=31.72µs min=10.59µs med=20.08µs max=9.94ms   p(90)=46.05µs  p(95)=69.13µs 
     http_req_tls_handshaking.......: avg=74.08µs min=0s      med=0s      max=16.96ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=12.74ms min=5.5ms   med=10.05ms max=280.49ms p(90)=18.12ms  p(95)=24.46ms 
     http_reqs......................: 4966    161.427515/s
     iteration_duration.............: avg=1.02s   min=1.01s   med=1.02s   max=1.33s    p(90)=1.03s    p(95)=1.04s   
     iterations.....................: 2483    80.713757/s
     vus............................: 13      min=13       max=100
     vus_max........................: 100     min=100      max=100
```

* stress test

```
ubuntu@ip-192-168-201-105:~$ k6 run stress.js 

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 1m20s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 50s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m50.7s), 000/300 VUs, 8960 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  50s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 17920      ✗ 0    
     data_received..................: 7.5 MB  149 kB/s
     data_sent......................: 4.7 MB  92 kB/s
     http_req_blocked...............: avg=85.92µs min=3.44µs  med=5.39µs  max=46.62ms  p(90)=8.35µs   p(95)=28.16µs 
     http_req_connecting............: avg=10.51µs min=0s      med=0s      max=19.16ms  p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=9.83ms  min=5.05ms  med=8.18ms  max=100.61ms p(90)=15.01ms  p(95)=18.81ms 
       { expected_response:true }...: avg=9.83ms  min=5.05ms  med=8.18ms  max=100.61ms p(90)=15.01ms  p(95)=18.81ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 17920
     http_req_receiving.............: avg=91.01µs min=25.65µs med=59.44µs max=11.73ms  p(90)=154.67µs p(95)=237.12µs
     http_req_sending...............: avg=37.05µs min=9.72µs  med=18.3µs  max=11.96ms  p(90)=52.07µs  p(95)=90.76µs 
     http_req_tls_handshaking.......: avg=64.23µs min=0s      med=0s      max=32.87ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=9.7ms   min=4.97ms  med=8.06ms  max=100.56ms p(90)=14.89ms  p(95)=18.65ms 
     http_reqs......................: 17920   353.210565/s
     iteration_duration.............: avg=1.02s   min=1.01s   med=1.01s   max=1.12s    p(90)=1.02s    p(95)=1.03s   
     iterations.....................: 8960    176.605283/s
     vus............................: 33      min=20       max=300
     vus_max........................: 300     min=300      max=300
```

(2) paths (경로찾기)

* 스크립트 경로 : /home/ubuntu/test/paths
* smoke test
```
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


running (10.0s), 0/1 VUs, 596 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ paths

     checks.........................: 100.00% ✓ 1192       ✗ 0   
     data_received..................: 546 kB  55 kB/s
     data_sent......................: 330 kB  33 kB/s
     http_req_blocked...............: avg=22.67µs min=4µs     med=4.75µs  max=16.97ms  p(90)=5.6µs    p(95)=6.71µs  
     http_req_connecting............: avg=810ns   min=0s      med=0s      max=505.47µs p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=8.19ms  min=5.41ms  med=8.48ms  max=17.03ms  p(90)=10.49ms  p(95)=12.06ms 
       { expected_response:true }...: avg=8.19ms  min=5.41ms  med=8.48ms  max=17.03ms  p(90)=10.49ms  p(95)=12.06ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 1192
     http_req_receiving.............: avg=84.46µs min=42.95µs med=81.36µs max=168.76µs p(90)=114.88µs p(95)=125.02µs
     http_req_sending...............: avg=20.79µs min=12.99µs med=18.57µs max=439.5µs  p(90)=29.63µs  p(95)=32.41µs 
     http_req_tls_handshaking.......: avg=16.13µs min=0s      med=0s      max=15.81ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=8.08ms  min=5.32ms  med=8.39ms  max=16.92ms  p(90)=10.38ms  p(95)=11.92ms 
     http_reqs......................: 1192    119.053996/s
     iteration_duration.............: avg=16.78ms min=13.81ms med=16.09ms max=44.86ms  p(90)=19.66ms  p(95)=20.89ms 
     iterations.....................: 596     59.526998/s
     vus............................: 1       min=1        max=1 
     vus_max........................: 1       min=1        max=1 

```
* load test
```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m30.0s), 000/100 VUs, 13278 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  30s

     ✓ logged in successfully
     ✓ paths

     checks.........................: 100.00% ✓ 26556      ✗ 0    
     data_received..................: 12 MB   414 kB/s
     data_sent......................: 7.4 MB  246 kB/s
     http_req_blocked...............: avg=29.64µs  min=3.34µs  med=4.64µs   max=31ms     p(90)=6.36µs   p(95)=11.18µs 
     http_req_connecting............: avg=2.71µs   min=0s      med=0s       max=6.57ms   p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=94.21ms  min=5.34ms  med=97.14ms  max=458.48ms p(90)=156.01ms p(95)=190.31ms
       { expected_response:true }...: avg=94.21ms  min=5.34ms  med=97.14ms  max=458.48ms p(90)=156.01ms p(95)=190.31ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 26556
     http_req_receiving.............: avg=97.45µs  min=27.29µs med=58.56µs  max=15.9ms   p(90)=147.71µs p(95)=231.41µs
     http_req_sending...............: avg=37.17µs  min=10.79µs med=16.54µs  max=12.32ms  p(90)=42.79µs  p(95)=75.01µs 
     http_req_tls_handshaking.......: avg=17.71µs  min=0s      med=0s       max=16.64ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=94.07ms  min=5.25ms  med=97.01ms  max=455.24ms p(90)=155.9ms  p(95)=190.23ms
     http_reqs......................: 26556   885.041388/s
     iteration_duration.............: avg=188.95ms min=13.66ms med=197.49ms max=600.94ms p(90)=292.59ms p(95)=324.88ms
     iterations.....................: 13278   442.520694/s
     vus............................: 1       min=1        max=100
     vus_max........................: 100     min=100      max=100


```
* stress test
```

running (0m50.0s), 000/300 VUs, 25072 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  50s

     ✗ logged in successfully
      ↳  88% — ✓ 22223 / ✗ 2849
     ✗ paths
      ↳  96% — ✓ 21546 / ✗ 677

     checks.........................: 92.54% ✓ 43769      ✗ 3526 
     data_received..................: 40 MB  804 kB/s
     data_sent......................: 15 MB  297 kB/s
     http_req_blocked...............: avg=12.9ms   min=0s       med=4.57µs   max=384.93ms p(90)=168.52µs p(95)=142.15ms
     http_req_connecting............: avg=1.17ms   min=0s       med=0s       max=176.61ms p(90)=0s       p(95)=3.48ms  
   ✓ http_req_duration..............: avg=179.22ms min=0s       med=139.46ms max=1.96s    p(90)=338.9ms  p(95)=477.55ms
       { expected_response:true }...: avg=191.32ms min=5.22ms   med=152.93ms max=1.96s    p(90)=356.35ms p(95)=487.29ms
     http_req_failed................: 7.45%  ✓ 3526       ✗ 43769
     http_req_receiving.............: avg=330.53µs min=0s       med=50.64µs  max=100.18ms p(90)=160.7µs  p(95)=307.4µs 
     http_req_sending...............: avg=2.93ms   min=0s       med=16.52µs  max=400.41ms p(90)=140.94µs p(95)=1.36ms  
     http_req_tls_handshaking.......: avg=9.38ms   min=0s       med=0s       max=384.21ms p(90)=0s       p(95)=92.1ms  
     http_req_waiting...............: avg=175.95ms min=0s       med=136.26ms max=1.96s    p(90)=327.51ms p(95)=472.25ms
     http_reqs......................: 47295  945.764341/s
     iteration_duration.............: avg=361.17ms min=448.74µs med=286.62ms max=2.42s    p(90)=705.38ms p(95)=868.49ms
     iterations.....................: 25072  501.368085/s
     vus............................: 1      min=1        max=300
     vus_max........................: 300    min=300      max=300

```
(3) add lines (노선 추가)
* 스크립트 경로 : /home/ubuntu/test/lines
* smoke test

```

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


running (10.0s), 0/1 VUs, 501 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ add lines

     checks.........................: 100.00% ✓ 1002       ✗ 0   
     data_received..................: 534 kB  53 kB/s
     data_sent......................: 326 kB  33 kB/s
     http_req_blocked...............: avg=32.54µs min=4.06µs  med=4.76µs  max=23.53ms  p(90)=5.66µs   p(95)=6.74µs  
     http_req_connecting............: avg=885ns   min=0s      med=0s      max=463.57µs p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=9.76ms  min=5.31ms  med=10.45ms max=23.65ms  p(90)=14.43ms  p(95)=15.63ms 
       { expected_response:true }...: avg=9.76ms  min=5.31ms  med=10.45ms max=23.65ms  p(90)=14.43ms  p(95)=15.63ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 1002
     http_req_receiving.............: avg=85.44µs min=45.79µs med=85.83µs max=209.22µs p(90)=114.18µs p(95)=124.05µs
     http_req_sending...............: avg=21.92µs min=13.87µs med=18.75µs max=496.15µs p(90)=30.99µs  p(95)=33.39µs 
     http_req_tls_handshaking.......: avg=18.95µs min=0s      med=0s      max=15.51ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=9.65ms  min=5.22ms  med=10.34ms max=23.52ms  p(90)=14.29ms  p(95)=15.52ms 
     http_reqs......................: 1002    100.118807/s
     iteration_duration.............: avg=19.95ms min=15.78ms med=19.37ms max=44.54ms  p(90)=23.37ms  p(95)=24.89ms 
     iterations.....................: 501     50.059403/s
     vus............................: 1       min=1        max=1 
     vus_max........................: 1       min=1        max=1 
```


* load test
```
        /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m30.0s), 000/100 VUs, 12428 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  30s

     ✓ logged in successfully
     ✓ add lines

     checks.........................: 100.00% ✓ 24856      ✗ 0    
     data_received..................: 14 MB   450 kB/s
     data_sent......................: 8.1 MB  270 kB/s
     http_req_blocked...............: avg=30.8µs   min=3.41µs  med=4.62µs   max=30.3ms   p(90)=6.06µs   p(95)=10.97µs 
     http_req_connecting............: avg=2.83µs   min=0s      med=0s       max=8.42ms   p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=100.64ms min=5.57ms  med=105.45ms max=769.73ms p(90)=174.49ms p(95)=215.26ms
       { expected_response:true }...: avg=100.64ms min=5.57ms  med=105.45ms max=769.73ms p(90)=174.49ms p(95)=215.26ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 24856
     http_req_receiving.............: avg=92.56µs  min=27.94µs med=57.05µs  max=20.35ms  p(90)=139.61µs p(95)=220.77µs
     http_req_sending...............: avg=36.89µs  min=11.78µs med=17.2µs   max=8.12ms   p(90)=45.47µs  p(95)=78.82µs 
     http_req_tls_handshaking.......: avg=19.13µs  min=0s      med=0s       max=27.03ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=100.51ms min=5.47ms  med=105.3ms  max=769.59ms p(90)=174.38ms p(95)=215.17ms
     http_reqs......................: 24856   828.272372/s
     iteration_duration.............: avg=201.85ms min=16.77ms med=212.13ms max=891.09ms p(90)=326.15ms p(95)=363.61ms
     iterations.....................: 12428   414.136186/s
     vus............................: 1       min=1        max=100
     vus_max........................: 100     min=100      max=100

```

* stress test

```
     ✗ logged in successfully
      ↳  90% — ✓ 23104 / ✗ 2289
     ✗ add lines
      ↳  95% — ✓ 22052 / ✗ 1052

     checks.........................: 93.11% ✓ 45156      ✗ 3341 
     data_received..................: 43 MB  865 kB/s
     data_sent......................: 17 MB  340 kB/s
     http_req_blocked...............: avg=12.29ms  min=0s       med=4.66µs   max=397.6ms  p(90)=70.93µs  p(95)=139.51ms
     http_req_connecting............: avg=1.95ms   min=0s       med=0s       max=196.33ms p(90)=0s       p(95)=11.55ms 
   ✓ http_req_duration..............: avg=172.72ms min=0s       med=147.26ms max=2.18s    p(90)=349.69ms p(95)=451.88ms
       { expected_response:true }...: avg=184.25ms min=5.46ms   med=175.91ms max=2.18s    p(90)=368.07ms p(95)=458.29ms
     http_req_failed................: 6.88%  ✓ 3341       ✗ 45156
     http_req_receiving.............: avg=412.29µs min=0s       med=51.96µs  max=170.26ms p(90)=174.75µs p(95)=345.3µs 
     http_req_sending...............: avg=622.77µs min=0s       med=17.8µs   max=136.73ms p(90)=149.48µs p(95)=1.86ms  
     http_req_tls_handshaking.......: avg=10.46ms  min=0s       med=0s       max=381.35ms p(90)=0s       p(95)=107.5ms 
     http_req_waiting...............: avg=171.69ms min=0s       med=146.8ms  max=2.18s    p(90)=347.97ms p(95)=450.59ms
     http_reqs......................: 48497  969.842204/s
     iteration_duration.............: avg=356.2ms  min=457.08µs med=304.85ms max=2.45s    p(90)=686.34ms p(95)=818.05ms
     iterations.....................: 25393  507.808794/s
     vus............................: 1      min=1        max=300
     vus_max........................: 300    min=300      max=300

```