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


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   [PageSpeed Insights 사이트에서 진단]

   * 총 네트워크 바이트를 최소화하려면 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 제공해야 한다.
   * 사용하지 않는 자바스크립트를 줄여 로딩시간을 줄인다.
   * 렌더링 차단 리소스를 제거한다.


3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   * 99퍼센트 이상의 요청에 대해서 http_req_duration이 1.5s 이하로 나오도록 한계점을 설정하였습니다.


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

   
(1) smoke test
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

(2) load test

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

(3) stress test

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