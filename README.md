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
ec2 : dacapolife87-EC2-public (192.168.87.26)
application log : /home/ubuntu/service/infra-subway-monitoring/logs
   - file.log (전체적인 처리결과를 남기는 로그)
   - json.log (응답하는 결과를 남기는 로그)

nginx access log : /var/log/nginx

2. Cloudwatch 대시보드 URL을 알려주세요
URL : https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-dacapolife87
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

예산을 잡는데 기준을 어떻게 해야하는지 경험이 많이 부족하여 제 개인적인 생각과 Lighthouse Score를 기반으로 작성을 하게되었습니다.
일단 기준은 다음의 점수 입니다.
전체적으로 점수는 80점 이상이며 각항목의 최저값은 다음을 지켜야 한다고 기준을 잡았습니다.

- Lighthouse Score : 80
  - FCP : 1600ms
  - SI  : 2300ms
  - LCP : 2400ms
  - TTI : 4500ms
  - TBT : 350ms
  - CLS : 0.25

90점이상이라면 좋겠지만 환경에 따라서 성능이 안나올수도있기 때문에 라이트하우스 점수는 90점보다는 50~89점 구간에서 상위구간에 해당하는 80점을 기준으로 잡았습니다.

그리고 각 항목별로 최소기준은 각 항목별 지표에서 중간 기준범위인 50~89 구간에서의 최소값인 50%이상의 성능을 내야한다고 생각하였습니다.
각 항목의 수치는 Lighthouse Scoring Calculator에서 MetricScore값을 50으로 잡았을때의 기준값입니다.

- 경쟁사 비교

|내용|지하철서비스|카카오맵|서울메트로|네이버맵|
|---|---|---|---|---|
|Lighthouse Score|86|63|63|72|
|FCP|0.7|0.6|1.6|0.6|
|SI|1.8|2.9|2.3|2.6|
|LCP|1.4|0.6|3.6|2.4|
|TTI|1.4|3.0|2.1|3.1|
|TBT|0.210|0.960|0.220|0.230|
|CLS|0.004|0.017|0.014|0|

다른 경쟁사와 PageSpeedInsights 테스트를 비교해 보았습니다.
지금 현재 기준으로는 점수와 수치가 높은 편에 속하고 있습니다. 

이부분관련하여 왜 이럴까 생각을 해보았는데 타사와 비교를 해보니 메인화면의 ui와 이미지등이 심플하게 구성되어있고 그로인하여 스크립트와 이미지등 다양한 리소스가 적어서 점수가 높은것으로 생각됩니다.
이후에도 기능이 추가되거나 화면 ui가 개선되면서도 이러한 수치가 유지되도록 노력을 하면서 예산을 짜는것이 좋을듯합니다.

이후 기능개선이 됨에따라 
타사의 평균값기준으로 예산을 잡으면 될거같습니다.

3사 평균값
- FCP : 0.93
- SI  : 2.6
- LCP : 2.2
- TTI : 2.7
- TBT : 0.47
- CLS : 0.10

먼저 라이트 하우스 점수는 앞서 기준에 따라 80점으로 기준을 두고

각 세부 항목에 대한 점수는 평균값을 통하여 예산을 구하되 소수점이하 자리는 올림을 통하여 정하였습니다
그 이유는 사용자별 네트워크 상황에따라 성능이 안나올것을 감안하여 올림을 하였습니다.

- FCP : 1
- SI  : 3
- LCP : 3
- TTI : 3
- TBT : 1
- CLS : 0.5

그렇게 최종적으로 구한 예산은 다음과 같습니다.



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 컨텐츠 압축 사용
- 사용하지 않는 자바스크립트 줄이기
- 케싱 사용하기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

지하철 하루 이용자수 960만명 -> 약 1000만명으로 환산
-> 뉴스를 통하여 하루 이용자수 파악

동일사용자가 출퇴근 시간 이용할것으로 판단되어 1인으로 환산시 500만명
그중 앱이용자수를 50%로 잡았습니다  -> 약 250만명
1사람당 하루 4번 접속
1. 출근시 집에서 접속
2. 출근시 역도착해서 접속
3. 퇴근시 회사에서 출발할때 접속
4. 퇴근시 역도착해서 접속

총 접속수 1000만번

1일 평균 10,000,000 / 86,400 = 115.74 rps

배차간격을 가지고 낮시간과 출퇴근시간을 확인하였을때 출퇴근시간이 50%정도 더 많다고 판단하였습니다. 최대 1.5배
1일 최대 173.61 rps


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

* 접속 빈도가 높은 페이지
    1. Smoke 테스트 Script : testscript/ConnectionFrequency_smoke.js
      
  - 결과


            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io

    execution: local
    script: ConnectionFrequency_smoke.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
    * default: 1 looping VUs for 10s (gracefulStop: 30s)
    
    
    running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
    default ↓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.....................: 100.00% ✓ 20  ✗ 0  
     data_received..............: 12 kB   1.2 kB/s
     data_sent..................: 4.4 kB  428 B/s
     http_req_blocked...........: avg=1.79ms   min=4.48µs  med=8.05µs  max=35.7ms   p(90)=8.89µs  p(95)=1.79ms  
     http_req_connecting........: avg=24.84µs  min=0s      med=0s      max=496.95µs p(90)=0s      p(95)=24.84µs 
    ✓ http_req_duration..........: avg=5.69ms   min=3.04ms  med=5.7ms   max=13.97ms  p(90)=7.11ms  p(95)=7.91ms  
    http_req_failed............: 100.00% ✓ 20  ✗ 0  
    http_req_receiving.........: avg=270.59µs min=46.98µs med=79.59µs max=3.96ms   p(90)=91.6µs  p(95)=289.95µs
    http_req_sending...........: avg=29.33µs  min=14.53µs med=30.41µs max=85.16µs  p(90)=37.99µs p(95)=51.18µs
    http_req_tls_handshaking...: avg=1.38ms   min=0s      med=0s      max=27.66ms  p(90)=0s      p(95)=1.38ms  
    http_req_waiting...........: avg=5.39ms   min=2.96ms  med=5.36ms  max=13.85ms  p(90)=6.9ms   p(95)=7.79ms  
    http_reqs..................: 20      1.968088/s
    iteration_duration.........: avg=1.01s    min=1.01s   med=1.01s   max=1.04s    p(90)=1.02s   p(95)=1.03s   
    iterations.................: 10      0.984044/s
    vus........................: 1       min=1 max=1
    vus_max....................: 1       min=1 max=1

---


   2. Load 테스트 Script : testscript/ConnectionFrequency_load.js
      - 결과
    

            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io

      execution: local
      script: ConnectionFrequency_smoke.js
      output: -
    
      scenarios: (100.00%) 1 scenario, 175 max VUs, 3m40s max duration (incl. graceful stop):
      * default: Up to 175 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
    
    
    running (3m10.9s), 000/175 VUs, 26557 complete and 0 interrupted iterations
    default ✓ [======================================] 000/175 VUs  3m10s

     ✓ logged in successfully
     ✓ retrieved member

    checks.....................: 100.00% ✓ 53114 ✗ 0    
    data_received..............: 21 MB   111 kB/s
    data_sent..................: 11 MB   56 kB/s
    http_req_blocked...........: avg=53.51µs  min=3µs     med=5.34µs  max=65.8ms   p(90)=8.65µs   p(95)=16.56µs 
    http_req_connecting........: avg=4.92µs   min=0s      med=0s      max=20.01ms  p(90)=0s       p(95)=0s      
    ✓ http_req_duration..........: avg=10.89ms  min=2.68ms  med=6.99ms  max=176.02ms p(90)=22.44ms  p(95)=32.07ms
    http_req_failed............: 100.00% ✓ 53114 ✗ 0    
    http_req_receiving.........: avg=179.52µs min=19.97µs med=47.61µs max=64.87ms  p(90)=137.66µs p(95)=430.37µs
    http_req_sending...........: avg=200.57µs min=9.55µs  med=19.58µs max=78.84ms  p(90)=68.98µs  p(95)=334.64µs
    http_req_tls_handshaking...: avg=20.08µs  min=0s      med=0s      max=45.19ms  p(90)=0s       p(95)=0s      
    http_req_waiting...........: avg=10.51ms  min=2.61ms  med=6.78ms  max=167.9ms  p(90)=21.54ms  p(95)=30.86ms
    http_reqs..................: 53114   278.156676/s
    iteration_duration.........: avg=1.02s    min=1s      med=1.01s   max=1.25s    p(90)=1.04s    p(95)=1.06s   
    iterations.................: 26557   139.078338/s
    vus........................: 9       min=3   max=175
    vus_max....................: 175     min=175 max=175
    
---

3. Stress 테스트 Script : testscript/ConnectionFrequency_stress.js
    - 결과


            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io

    execution: local
    script: ConnectionFrequency_stress.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 300 max VUs, 12m40s max duration (incl. graceful stop):
    * default: Up to 300 looping VUs for 12m10s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)
    
    
    running (12m10.9s), 000/300 VUs, 147754 complete and 0 interrupted iterations
    default ✓ [======================================] 000/300 VUs  12m10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.....................: 100.00% ✓ 295508 ✗ 0    
     data_received..............: 116 MB  158 kB/s
     data_sent..................: 59 MB   80 kB/s
     http_req_blocked...........: avg=64.64µs  min=2.9µs   med=5.29µs  max=249.52ms p(90)=8.62µs   p(95)=20.76µs 
     http_req_connecting........: avg=7.94µs   min=0s      med=0s      max=88.51ms  p(90)=0s       p(95)=0s      
    ✗ http_req_duration..........: avg=20.11ms  min=2.63ms  med=9.12ms  max=1.04s    p(90)=50.17ms  p(95)=76.47ms
    http_req_failed............: 100.00% ✓ 295508 ✗ 0    
    http_req_receiving.........: avg=323.92µs min=19.38µs med=45.91µs max=195.08ms p(90)=231.38µs p(95)=715.07µs
    http_req_sending...........: avg=518.76µs min=9.15µs  med=19.58µs max=181.98ms p(90)=162.12µs p(95)=902.26µs
    http_req_tls_handshaking...: avg=20.65µs  min=0s      med=0s      max=247.87ms p(90)=0s       p(95)=0s      
    http_req_waiting...........: avg=19.27ms  min=2.54ms  med=8.81ms  max=1.04s    p(90)=48.01ms  p(95)=73.04ms
    http_reqs..................: 295508  404.300487/s
    iteration_duration.........: avg=1.04s    min=1s      med=1.02s   max=2.17s    p(90)=1.11s    p(95)=1.16s   
    iterations.................: 147754  202.150244/s
    vus........................: 12      min=3    max=300
    vus_max....................: 300     min=300  max=300

---

* 데이터를 갱신하는 페이지
    1. Smoke 테스트 Script : testscript/DateUpdate_smoke.js

    - 결과


            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io
    
    execution: local
    script: DataUpdate_smoke.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
    * default: 1 looping VUs for 10s (gracefulStop: 30s)
    
    
    running (10.3s), 0/1 VUs, 10 complete and 0 interrupted iterations
    default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20  ✗ 0  
     data_received..................: 13 kB   1.2 kB/s
     data_sent......................: 6.8 kB  663 B/s
     http_req_blocked...............: avg=1.95ms  min=4.23µs  med=6.44µs  max=38.87ms  p(90)=9.1µs   p(95)=1.95ms  
     http_req_connecting............: avg=66.77µs min=0s      med=0s      max=1.33ms   p(90)=0s      p(95)=66.77µs 
    ✓ http_req_duration..............: avg=12.7ms  min=6.83ms  med=8.28ms  max=55.26ms  p(90)=15.51ms p(95)=48.92ms
    { expected_response:true }...: avg=12.46ms min=7.77ms  med=8.36ms  max=48.59ms  p(90)=13.39ms p(95)=30.99ms
    http_req_failed................: 50.00%  ✓ 10  ✗ 10
    http_req_receiving.............: avg=71.66µs min=53.82µs med=66.94µs max=115.25µs p(90)=93.38µs p(95)=104.01µs
    http_req_sending...............: avg=31.43µs min=17.1µs  med=29.87µs max=103.85µs p(90)=36.26µs p(95)=44.43µs
    http_req_tls_handshaking.......: avg=1.46ms  min=0s      med=0s      max=29.29ms  p(90)=0s      p(95)=1.46ms  
    http_req_waiting...............: avg=12.6ms  min=6.76ms  med=8.19ms  max=55.13ms  p(90)=15.4ms  p(95)=48.71ms
    http_reqs......................: 20      1.940456/s
    iteration_duration.............: avg=1.03s   min=1.01s   med=1.01s   max=1.14s    p(90)=1.03s   p(95)=1.08s   
    iterations.....................: 10      0.970228/s
    vus............................: 1       min=1 max=1
    vus_max........................: 1       min=1 max=1



    
---


2. Load 테스트 Script : testscript/DateUpdate_load.js
    - 결과


            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io
    
    execution: local
    script: DataUpdate_load.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 300 max VUs, 12m40s max duration (incl. graceful stop):
    * default: Up to 300 looping VUs for 12m10s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)
    
    
    running (12m10.9s), 000/300 VUs, 124343 complete and 0 interrupted iterations
    default ✓ [======================================] 000/300 VUs  12m10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 248686 ✗ 0     
     data_received..................: 104 MB  143 kB/s
     data_sent......................: 80 MB   110 kB/s
     http_req_blocked...............: avg=17.99µs  min=2.93µs  med=4.92µs  max=59.91ms  p(90)=6.26µs   p(95)=6.95µs  
     http_req_connecting............: avg=2.6µs    min=0s      med=0s      max=17.55ms  p(90)=0s       p(95)=0s      
    ✓ http_req_duration..............: avg=121.15ms min=4.41ms  med=88.76ms max=833.3ms  p(90)=289.75ms p(95)=301.5ms
    { expected_response:true }...: avg=121.99ms min=4.41ms  med=89.57ms max=833.3ms  p(90)=290.91ms p(95)=302.7ms
    http_req_failed................: 50.00%  ✓ 124343 ✗ 124343
    http_req_receiving.............: avg=57.61µs  min=21.94µs med=56.78µs max=11.93ms  p(90)=67.52µs  p(95)=74.75µs
    http_req_sending...............: avg=22.26µs  min=12.18µs med=18.46µs max=10.48ms  p(90)=29.5µs   p(95)=34.7µs  
    http_req_tls_handshaking.......: avg=9.85µs   min=0s      med=0s      max=42.25ms  p(90)=0s       p(95)=0s      
    http_req_waiting...............: avg=121.07ms min=4.33ms  med=88.68ms max=833.17ms p(90)=289.67ms p(95)=301.42ms
    http_reqs......................: 248686  340.23402/s
    iteration_duration.............: avg=1.24s    min=1s      med=1.19s   max=2.15s    p(90)=1.57s    p(95)=1.59s   
    iterations.....................: 124343  170.11701/s
    vus............................: 17      min=3    max=300
    vus_max........................: 300     min=300  max=300


---


3. Stress 테스트 Script : testscript/DateUpdate_stress.js
    - 결과


            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io
    
    execution: local
    script: DataUpdate_stress.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 300 max VUs, 12m40s max duration (incl. graceful stop):
    * default: Up to 300 looping VUs for 12m10s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)
    
    
    running (12m10.6s), 000/300 VUs, 123486 complete and 0 interrupted iterations
    default ✓ [======================================] 000/300 VUs  12m10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 246972 ✗ 0     
     data_received..................: 104 MB  142 kB/s
     data_sent......................: 80 MB   109 kB/s
     http_req_blocked...............: avg=17.81µs  min=2.97µs  med=4.99µs  max=46.55ms  p(90)=6.3µs    p(95)=6.96µs  
     http_req_connecting............: avg=2.48µs   min=0s      med=0s      max=16.47ms  p(90)=0s       p(95)=0s      
    ✓ http_req_duration..............: avg=125.43ms min=6.38ms  med=88.9ms  max=829.19ms p(90)=293.33ms p(95)=305.9ms
    { expected_response:true }...: avg=126.44ms min=6.58ms  med=90.38ms max=829.19ms p(90)=294.69ms p(95)=307.14ms
    http_req_failed................: 50.00%  ✓ 123486 ✗ 123486
    http_req_receiving.............: avg=58.16µs  min=22.46µs med=57.13µs max=11.96ms  p(90)=67.87µs  p(95)=75.21µs
    http_req_sending...............: avg=22.24µs  min=10.89µs med=18.42µs max=12.14ms  p(90)=29.55µs  p(95)=34.69µs
    http_req_tls_handshaking.......: avg=9.74µs   min=0s      med=0s      max=30.57ms  p(90)=0s       p(95)=0s      
    http_req_waiting...............: avg=125.35ms min=6.3ms   med=88.82ms max=829.11ms p(90)=293.25ms p(95)=305.82ms
    http_reqs......................: 246972  338.027327/s
    iteration_duration.............: avg=1.25s    min=1.01s   med=1.19s   max=2.2s     p(90)=1.58s    p(95)=1.6s    
    iterations.....................: 123486  169.013663/s
    vus............................: 15      min=3    max=300
    vus_max........................: 300     min=300  max=300
    


---

* 여러데이터를 참조하는 페이지
    1. Smoke 테스트 Script : testscript/MultipleData_smoke.js

    - 결과
    

            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io
    
    execution: local
    script: MultipleData_smoke.js
    output: -
    
    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
    * default: 1 looping VUs for 10s (gracefulStop: 30s)
    
    
    running (10.2s), 0/1 VUs, 9 complete and 0 interrupted iterations
    default ↓ [======================================] 1 VUs  10s

     ✓ find path in successfully
     ✓ distance

     checks.........................: 100.00% ✓ 18  ✗ 0  
     data_received..................: 39 kB   3.8 kB/s
     data_sent......................: 2.0 kB  194 B/s
     http_req_blocked...............: avg=5.02ms   min=7.39µs   med=7.8µs    max=45.16ms  p(90)=9.03ms   p(95)=27.1ms  
     http_req_connecting............: avg=66.28µs  min=0s       med=0s       max=596.58µs p(90)=119.31µs p(95)=357.95µs
    ✓ http_req_duration..............: avg=129.99ms min=115.01ms med=118.17ms max=192.71ms p(90)=159.52ms p(95)=176.11ms
    { expected_response:true }...: avg=129.99ms min=115.01ms med=118.17ms max=192.71ms p(90)=159.52ms p(95)=176.11ms
    http_req_failed................: 0.00%   ✓ 0   ✗ 9  
    http_req_receiving.............: avg=100.16µs min=76.87µs  med=101.79µs max=130.68µs p(90)=123.72µs p(95)=127.2µs
    http_req_sending...............: avg=35.51µs  min=23.51µs  med=25.31µs  max=117.35µs p(90)=45.48µs  p(95)=81.42µs
    http_req_tls_handshaking.......: avg=3.66ms   min=0s       med=0s       max=32.94ms  p(90)=6.58ms   p(95)=19.76ms
    http_req_waiting...............: avg=129.85ms min=114.91ms med=118.04ms max=192.47ms p(90)=159.36ms p(95)=175.91ms
    http_reqs......................: 9       0.880169/s
    iteration_duration.............: avg=1.13s    min=1.11s    med=1.11s    max=1.23s    p(90)=1.16s    p(95)=1.2s    
    iterations.....................: 9       0.880169/s
    vus............................: 1       min=1 max=1
    vus_max........................: 1       min=1 max=1


    
---


2. Load 테스트 Script : testscript/MultipleData_load.js
    - 결과


            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io
    
     execution: local
     script: MultipleData_load.js
     output: -

    scenarios: (100.00%) 1 scenario, 175 max VUs, 3m40s max duration (incl. graceful stop):
    * default: Up to 175 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
    
    
    running (3m10.7s), 000/175 VUs, 26980 complete and 0 interrupted iterations
    default ✓ [======================================] 000/175 VUs  3m10s

     ✓ find path in successfully
     ✓ distance

     checks.........................: 100.00% ✓ 53960 ✗ 0
     data_received..................: 109 MB  573 kB/s
     data_sent......................: 4.9 MB  26 kB/s
     http_req_blocked...............: avg=45.41µs min=3.38µs  med=5.92µs  max=54.08ms  p(90)=8.79µs   p(95)=17.64µs
     http_req_connecting............: avg=4.17µs  min=0s      med=0s      max=9.68ms   p(90)=0s       p(95)=0s
    ✓ http_req_duration..............: avg=7.58ms  min=4.63ms  med=6.66ms  max=353.16ms p(90)=10.11ms  p(95)=12.29ms
    { expected_response:true }...: avg=7.58ms  min=4.63ms  med=6.66ms  max=353.16ms p(90)=10.11ms  p(95)=12.29ms
    http_req_failed................: 0.00%   ✓ 0     ✗ 26980
    http_req_receiving.............: avg=102.5µs min=23.1µs  med=57.7µs  max=18.81ms  p(90)=137.43µs p(95)=267.9µs
    http_req_sending...............: avg=53.16µs min=10.41µs med=18.24µs max=12.59ms  p(90)=50.57µs  p(95)=135.85µs
    http_req_tls_handshaking.......: avg=28.84µs min=0s      med=0s      max=52.98ms  p(90)=0s       p(95)=0s
    http_req_waiting...............: avg=7.43ms  min=4.55ms  med=6.52ms  max=352.91ms p(90)=9.9ms    p(95)=12.07ms
    http_reqs......................: 26980   141.511952/s
    iteration_duration.............: avg=1s      min=1s      med=1s      max=1.4s     p(90)=1.01s    p(95)=1.01s
    iterations.....................: 26980   141.511952/s
    vus............................: 12      min=3   max=175
    vus_max........................: 175     min=175 max=175




---


3. Stress 테스트 Script : testscript/MultipleData_stress.js
    - 결과


            /\      |‾‾| /‾‾/   /‾‾/   
       /\  /  \     |  |/  /   /  /    
      /  \/    \    |     (   /   ‾‾\  
     /          \   |  |\  \ |  (‾)  |
    / __________ \  |__| \__\ \_____/ .io
    
    execution: local
     script: MultipleData_stress.js
     output: -

    scenarios: (100.00%) 1 scenario, 900 max VUs, 12m40s max duration (incl. graceful stop):
    * default: Up to 900 looping VUs for 12m10s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)
    
    
    running (12m10.8s), 000/900 VUs, 406803 complete and 0 interrupted iterations
    default ✓ [======================================] 000/900 VUs  12m10s

     ✓ find path in successfully
     ✓ distance

     checks.........................: 100.00% ✓ 813606 ✗ 0
     data_received..................: 1.6 GB  2.2 MB/s
     data_sent......................: 73 MB   100 kB/s
     http_req_blocked...............: avg=313.29µs min=3.38µs  med=5.62µs  max=663.55ms p(90)=8.43µs   p(95)=28.5µs
     http_req_connecting............: avg=35.93µs  min=0s      med=0s      max=402.99ms p(90)=0s       p(95)=0s
    ✓ http_req_duration..............: avg=23.94ms  min=4.51ms  med=8.38ms  max=1.45s    p(90)=58.9ms   p(95)=104.63ms
    { expected_response:true }...: avg=23.94ms  min=4.51ms  med=8.38ms  max=1.45s    p(90)=58.9ms   p(95)=104.63ms
    http_req_failed................: 0.00%   ✓ 0      ✗ 406803
    http_req_receiving.............: avg=392.46µs min=20.38µs med=44.45µs max=237.01ms p(90)=258.7µs  p(95)=706.3µs
    http_req_sending...............: avg=1.3ms    min=10.03µs med=16.76µs max=942.78ms p(90)=385.32µs p(95)=2.53ms
    http_req_tls_handshaking.......: avg=101.71µs min=0s      med=0s      max=464.82ms p(90)=0s       p(95)=0s
    http_req_waiting...............: avg=22.24ms  min=4.43ms  med=8.1ms   max=1.24s    p(90)=53.95ms  p(95)=95.8ms
    http_reqs......................: 406803  556.629287/s
    iteration_duration.............: avg=1.02s    min=1s      med=1.01s   max=2.45s    p(90)=1.07s    p(95)=1.12s
    iterations.....................: 406803  556.629287/s
    vus............................: 39      min=5    max=900
    vus_max........................: 900     min=900  max=900




