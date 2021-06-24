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

file,json log: /home/ubuntu/nextstep/infra-subway-monitoring/log
nginx log: /var/log/nginx


2. Cloudwatch 대시보드 URL을 알려주세요

https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=pa324-dashboard

---

### 2단계 - 성능 테스트
## 부하테스트

1.웹 성능 예산은 어느정도가 적당하다고 생각하시나요

![](https://images.velog.io/images/seong-dodo/post/61237a37-2b1f-48c1-b682-f8e6bef58368/image.png)


- 페이지 로드
- Time to Interactive : 2s 미만 개선
- First Contentful Paint : 2s 미만 개선
- Large Contentful Paint : 2.5미만 개선
- Speed Index : 2.5s 미만 개선
- Total Blocking Time : 50ms 이하 유지
- Cumulative Layout Shift : 0.1ms이하 유지

</br>
</br>

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- gzip 압축 사용
- 사용하지 않는 자바스크립트 줄이기
- 렌더링 차단 리소스 제거하기

</br>
</br>

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 테스트 전제조건
	- 1일 예상 상용자 수 : 100,000
    	- 1개월 지하철 경로조회 앱 DAU / 30 
        - 30,000,00  / 30
    - 1명당 1일 평균 접속수 : 4
    - 1일 총 접속 수 : 400,000
    - 1일 평균 RPS : 4.6 rps
    - 1일 최대 RPS : 46 rps
    	- 1일 평균 RPS * (최대 트래픽 / 평소트래픽)
        - 최대트래픽 / 평소트래픽 : 10
    - Latency 
      - 100ms (홈페이지 조회)
      - 300ms (경로 조회)
- 시나리오
	- 접속 빈도가 높은 페이지 : 메인페이지
    - 많은 리소스를 조합하여 결과를 보여주는 페이지 : 경로검색
    
</br>
</br>



4. Smoke, Load, Stress 테스트 스크립트와 결과
---


## Smoke 테스트

최소한의 부하(VUser 1~2)로 구성하여 최소한의 부하를 주고 테스트 시나리오 및 시스템에 오류가 없는지 확인하는 테스트
      
  - Smoke Test 홈 화면스크립트

```javascript
import http from "k6/http";
import { check, group, sleep, fail } from 'k6';

const URL = "https://nextstep.n-e.kr/"

export let options = {
    vus: 1,
    duration: '10s',
    
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
 };

export default () => {

    const homeResponse = http.get(`${URL}`)

    check(homeResponse, {
        '홈화면 접속' : (res) => res.status === 200
    })
    sleep(1);
}
```

  - Smoke Test 홈화면 결과

```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: SmokeTest.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (11.0s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 홈화면 접속

     checks.........................: 100.00% ✓ 10  ✗ 0  
     data_received..................: 20 kB   1.8 kB/s
     data_sent......................: 1.5 kB  134 B/s
     http_req_blocked...............: avg=81.37ms min=3µs    med=5µs    max=813.65ms p(90)=81.37ms  p(95)=447.51ms
     http_req_connecting............: avg=970.9µs min=0s     med=0s     max=9.7ms    p(90)=970.89µs p(95)=5.33ms  
   ✓ http_req_duration..............: avg=12.33ms min=8.11ms med=9.71ms max=21.92ms  p(90)=19.22ms  p(95)=20.57ms 
       { expected_response:true }...: avg=12.33ms min=8.11ms med=9.71ms max=21.92ms  p(90)=19.22ms  p(95)=20.57ms 
     http_req_failed................: 0.00%   ✓ 0   ✗ 10 
     http_req_receiving.............: avg=125.5µs min=45µs   med=59.5µs max=559µs    p(90)=230.49µs p(95)=394.74µs
     http_req_sending...............: avg=28.09µs min=14µs   med=23µs   max=89µs     p(90)=34.09µs  p(95)=61.54µs 
     http_req_tls_handshaking.......: avg=32.16ms min=0s     med=0s     max=321.63ms p(90)=32.16ms  p(95)=176.9ms 
     http_req_waiting...............: avg=12.18ms min=8.03ms med=9.62ms max=21.85ms  p(90)=19.13ms  p(95)=20.49ms 
     http_reqs......................: 10      0.912109/s
     iteration_duration.............: avg=1.09s   min=1s     med=1.01s  max=1.82s    p(90)=1.1s     p(95)=1.46s   
     iterations.....................: 10      0.912109/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1

```

  - Smoke Test 경로조회 스크립트

```javascript
import http from "k6/http";
import { check, group, sleep, fail } from 'k6';

const URL = "https://nextstep.n-e.kr/"
const EMAIL = "test@test.com"
const PASSWORD = "test"

export let options = {
    vus: 1,
    duration: '10s',
    
    thresholds: {
        http_req_duration: ['p(99)<300'],
    },
 };

export default () => {

    let sectionsResponse = http.get(`${URL}/paths?source=1&target=5`).json();
    check(sectionsResponse, { '녹양역 -> 대방역 경로탐색 결과': (res) => res.length !== 0});
    sleep(1);
}
```

  - Smoke Test 경로조회 결과

```
 ~ k6 run FindPath.js                        

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: FindPath.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.4s), 0/1 VUs, 9 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 녹양역 -> 대방역 경로탐색 결과

     checks.........................: 100.00% ✓ 9   ✗ 0  
     data_received..................: 35 kB   3.4 kB/s
     data_sent......................: 1.6 kB  151 B/s
     http_req_blocked...............: avg=38.03ms  min=4µs      med=5µs      max=342.28ms p(90)=68.46ms  p(95)=205.37ms
     http_req_connecting............: avg=448µs    min=0s       med=0s       max=4.03ms   p(90)=806.4µs  p(95)=2.41ms  
   ✓ http_req_duration..............: avg=118.04ms min=112.31ms med=116.9ms  max=123.58ms p(90)=123.33ms p(95)=123.45ms
       { expected_response:true }...: avg=118.04ms min=112.31ms med=116.9ms  max=123.58ms p(90)=123.33ms p(95)=123.45ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 9  
     http_req_receiving.............: avg=73.33µs  min=50µs     med=71µs     max=107µs    p(90)=103µs    p(95)=105µs   
     http_req_sending...............: avg=34.55µs  min=17µs     med=24µs     max=132µs    p(90)=48µs     p(95)=89.99µs 
     http_req_tls_handshaking.......: avg=37.36ms  min=0s       med=0s       max=336.27ms p(90)=67.25ms  p(95)=201.76ms
     http_req_waiting...............: avg=117.93ms min=112.24ms med=116.81ms max=123.5ms  p(90)=123.14ms p(95)=123.32ms
     http_reqs......................: 9       0.861855/s
     iteration_duration.............: avg=1.15s    min=1.11s    med=1.12s    max=1.47s    p(90)=1.19s    p(95)=1.33s   
     iterations.....................: 9       0.861855/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```



</br>
</br>




##  Load 테스트

시스템에 평소 트래픽과 최대 트래픽이 유입되는 상황에서 성능이 어떻게 측정되는지 확인한다.

```
export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 }, 
        { duration: '10s', target: 0 },
     ],
    thresholds: {
        http_req_duration: ['p(99)<300'],
    },
 };

```

- 홈화면

홈화면의 경우 부하를 올려도 응답시간 저하가 발생하지 않고있다. 그리고 최대 트래픽으로 예상하는 46rps에서도 홈 화면은 트래픽을 잘 받아주고 있다.

```
export let options = {
    stages: [
        { duration: '1m', target: 10 }, 
        { duration: '10s', target: 0 },
     ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
 };
```


```
running (1m10.2s), 00/10 VUs, 354 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  1m10s

     ✓ 홈화면 접속

     checks.........................: 100.00% ✓ 354  ✗ 0   
     data_received..................: 589 kB  8.4 kB/s
     data_sent......................: 43 kB   608 B/s
     http_req_blocked...............: avg=1.51ms   min=2µs    med=5µs     max=336.18ms p(90)=8µs     p(95)=8.34µs 
     http_req_connecting............: avg=190.72µs min=0s     med=0s      max=16.13ms  p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=11.72ms  min=5.43ms med=10.77ms max=63.28ms  p(90)=17.13ms p(95)=19.74ms
       { expected_response:true }...: avg=11.72ms  min=5.43ms med=10.77ms max=63.28ms  p(90)=17.13ms p(95)=19.74ms
     http_req_failed................: 0.00%   ✓ 0    ✗ 354 
     http_req_receiving.............: avg=56.92µs  min=23µs   med=52µs    max=110µs    p(90)=87µs    p(95)=93µs   
     http_req_sending...............: avg=24.28µs  min=8µs    med=23µs    max=122µs    p(90)=35µs    p(95)=43.34µs
     http_req_tls_handshaking.......: avg=1.28ms   min=0s     med=0s      max=321.11ms p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=11.64ms  min=5.31ms med=10.71ms max=63.22ms  p(90)=17.06ms p(95)=19.65ms
     http_reqs......................: 354     5.045105/s
     iteration_duration.............: avg=1.01s    min=1s     med=1.01s   max=1.34s    p(90)=1.02s   p(95)=1.02s  
     iterations.....................: 354     5.045105/s
     vus............................: 1       min=1  max=10
     vus_max........................: 10      min=10 max=10
```

```
export let options = {
    stages: [
        { duration: '1m', target: 100 }, 
        { duration: '10s', target: 0 },
     ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
 };
```

```
running (1m10.6s), 000/100 VUs, 3516 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  1m10s

     ✓ 홈화면 접속

     checks.........................: 100.00% ✓ 3516  ✗ 0    
     data_received..................: 5.9 MB  83 kB/s
     data_sent......................: 425 kB  6.0 kB/s
     http_req_blocked...............: avg=787.56µs min=1µs    med=4µs    max=361.62ms p(90)=7µs     p(95)=10µs   
     http_req_connecting............: avg=237.42µs min=0s     med=0s     max=107.32ms p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=9.48ms   min=4.56ms med=8.43ms max=89.24ms  p(90)=13.82ms p(95)=15.77ms
       { expected_response:true }...: avg=9.48ms   min=4.56ms med=8.43ms max=89.24ms  p(90)=13.82ms p(95)=15.77ms
     http_req_failed................: 0.00%   ✓ 0     ✗ 3516 
     http_req_receiving.............: avg=46.32µs  min=16µs   med=41µs   max=380µs    p(90)=74µs    p(95)=88µs   
     http_req_sending...............: avg=19.31µs  min=5µs    med=15µs   max=810µs    p(90)=31µs    p(95)=37.25µs
     http_req_tls_handshaking.......: avg=543.04µs min=0s     med=0s     max=311.86ms p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=9.42ms   min=4.5ms  med=8.37ms max=89.13ms  p(90)=13.76ms p(95)=15.71ms
     http_reqs......................: 3516    49.80451/s
     iteration_duration.............: avg=1.01s    min=1s     med=1s     max=1.37s    p(90)=1.01s   p(95)=1.02s  
     iterations.....................: 3516    49.80451/s
     vus............................: 8       min=2   max=99 
     vus_max........................: 100     min=100 max=100
```


- 경로찾기

평소 트래픽으로 예측한 4.6rps에서도 응답속도가 저하되고 있는것을 확인할 수 있다. 평소 트래픽에서도 성능 저하가 발생하는것을 확인하고 ec2를 t2.micro에서 t2.medium,t2.large로 scale-out시켰을경우 평균트래픽에서 응답시간 지연이 없이 평소 트래픽을 잘 받아냈다. (부하테스트 완료후 t2.medium으로 다시 변경)

```
export let options = {
    rps : 46,
    stages: [
        { duration: '1m', target: 260 }, 
        { duration: '10s', target: 0 },
     ],
    thresholds: {
        http_req_duration: ['p(99)<300'],
    },
 };
```

```
     ✓ 녹양역 -> 대방역 경로탐색 결과

     checks.........................: 100.00% ✓ 458   ✗ 0    
     data_received..................: 2.6 MB  26 kB/s
     data_sent......................: 204 kB  2.0 kB/s
     http_req_blocked...............: avg=17.2ms  min=3µs    med=17.98ms max=345.31ms p(90)=29.61ms p(95)=34.75ms 
     http_req_connecting............: avg=5.82ms  min=0s     med=4.77ms  max=160.24ms p(90)=9.69ms  p(95)=13.19ms 
   ✗ http_req_duration..............: avg=26.07s  min=2.58ms med=30.01s  max=37.02s   p(90)=36.48s  p(95)=36.7s   
       { expected_response:true }...: avg=25.47s  min=1.32s  med=29.69s  max=37.02s   p(90)=36.66s  p(95)=36.8s   
     http_req_failed................: 43.54%  ✓ 209   ✗ 271  
     http_req_receiving.............: avg=83.13µs min=0s     med=78µs    max=203µs    p(90)=119.1µs p(95)=134.04µs
     http_req_sending...............: avg=58.93µs min=14µs   med=60µs    max=139µs    p(90)=96µs    p(95)=110µs   
     http_req_tls_handshaking.......: avg=11.24ms min=0s     med=11.82ms max=307.1ms  p(90)=19.55ms p(95)=22.97ms 
     http_req_waiting...............: avg=26.07s  min=2.53ms med=30.01s  max=37.02s   p(90)=36.48s  p(95)=36.7s   
     http_reqs......................: 480     4.803331/s
     iteration_duration.............: avg=26.78s  min=16.2ms med=31.02s  max=38.04s   p(90)=37.47s  p(95)=37.67s  
     iterations.....................: 464     4.64322/s
     vus............................: 8       min=5   max=260
     vus_max........................: 260     min=260 max=260
```

평균 트래픽에서도 응답지연이 발생하였기 때문에 최대 트래픽으로 테스트하는게 크게 의미가 없다고 생각했지만 일단 최대 트래픽으로 부하테스트를 돌렸다.

```
export let options = {
    rps : 46,
    stages: [
        { duration: '1m', target: 2660 }, 
        { duration: '10s', target: 0 },
     ],
    thresholds: {
        http_req_duration: ['p(99)<300'],
    },
 };
```

```
   ✓ 녹양역 -> 대방역 경로탐색 결과

     checks.........................: 100.00% ✓ 671    ✗ 0     
     data_received..................: 21 MB   210 kB/s
     data_sent......................: 2.3 MB  23 kB/s
     http_req_blocked...............: avg=22.32ms min=0s      med=21.25ms max=306.97ms p(90)=31.34ms p(95)=35.43ms
     http_req_connecting............: avg=7.21ms  min=2.58ms  med=5.8ms   max=1.17s    p(90)=11.84ms p(95)=14.36ms
   ✗ http_req_duration..............: avg=4.87s   min=0s      med=6.01ms  max=37.26s   p(90)=30.01s  p(95)=30.03s 
       { expected_response:true }...: avg=28.76s  min=6.45s   med=33.56s  max=37.26s   p(90)=36.08s  p(95)=36.75s 
     http_req_failed................: 93.30%  ✓ 3792   ✗ 272   
     http_req_receiving.............: avg=54.85µs min=0s      med=57µs    max=781µs    p(90)=96µs    p(95)=111µs  
     http_req_sending...............: avg=55.47µs min=0s      med=53µs    max=176µs    p(90)=79µs    p(95)=95µs   
     http_req_tls_handshaking.......: avg=15.6ms  min=0s      med=14.34ms max=300.15ms p(90)=22.35ms p(95)=25.73ms
     http_req_waiting...............: avg=4.87s   min=0s      med=5.9ms   max=37.26s   p(90)=30.01s  p(95)=30.03s 
     http_reqs......................: 4064    40.639582/s
     iteration_duration.............: avg=1.42s   min=12.41µs med=31.91µs max=1m2s     p(90)=70.03µs p(95)=7.06s  
     iterations.....................: 68356   683.552966/s
     vus............................: 0       min=0    max=2659
     vus_max........................: 2660    min=2660 max=2660
```




</br>
</br>


## Stress 테스트

Stress테스트 옵션

```javascript
export let options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '2m', target: 400 },
        { duration: '4m', target: 100 },
        { duration: '4m', target: 200 },
        { duration: '4m', target: 400 },
     ],
    thresholds: {
        http_req_duration: ['p(99)<150'],
    },
 };
```


- 홈화면

```
 k6 run SmokeTest.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: SmokeTest.js
     output: -

  scenarios: (100.00%) 1 scenario, 400 max VUs, 18m30s max duration (incl. graceful stop):
           * default: Up to 400 looping VUs for 18m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (18m01.0s), 000/400 VUs, 225183 complete and 0 interrupted iterations
default ✓ [======================================] 000/400 VUs  18m0s

     ✓ 홈화면 접속

     checks.........................: 100.00% ✓ 225183 ✗ 0     
     data_received..................: 350 MB  323 kB/s
     data_sent......................: 25 MB   23 kB/s
     http_req_blocked...............: avg=86.98µs min=1µs    med=3µs     max=327.33ms p(90)=5µs     p(95)=7µs    
     http_req_connecting............: avg=24.09µs min=0s     med=0s      max=135.41ms p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=12.33ms min=4.14ms med=10.5ms  max=266.07ms p(90)=18.88ms p(95)=23.49ms
       { expected_response:true }...: avg=12.33ms min=4.14ms med=10.5ms  max=266.07ms p(90)=18.88ms p(95)=23.49ms
     http_req_failed................: 0.00%   ✓ 0      ✗ 225183
     http_req_receiving.............: avg=39.53µs min=12µs   med=37µs    max=1.16ms   p(90)=55µs    p(95)=66µs   
     http_req_sending...............: avg=16.23µs min=5µs    med=14µs    max=1.09ms   p(90)=24µs    p(95)=29µs   
     http_req_tls_handshaking.......: avg=58.66µs min=0s     med=0s      max=301.6ms  p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=12.27ms min=4.08ms med=10.44ms max=266.01ms p(90)=18.82ms p(95)=23.43ms
     http_reqs......................: 225183  208.312482/s
     iteration_duration.............: avg=1.01s   min=1s     med=1.01s   max=1.34s    p(90)=1.02s   p(95)=1.02s  
     iterations.....................: 225183  208.312482/s
     vus............................: 400     min=1    max=400 
     vus_max........................: 400     min=400  max=400 
```

- 경로조회

부하를 400으로 올릴경우 nginx error log에서 `512 worker_connections are not enough`가 지속적으로 발생하고 cpu,memory,disk자원에 대한 사용률이 급격하게 올라가는것을 확인하였다. 테스트가 종료된후에는 별도의 조치 없이도 정상적으로 애플리케이션이 복구되었다.

![](https://images.velog.io/images/seong-dodo/post/e12c8929-adb9-4f3d-9ef9-3b2c893e4965/image.png)


```
running (18m30.0s), 000/400 VUs, 104255 complete and 45 interrupted iterations
default ✓ [======================================] 000/400 VUs  18m0s

     ✗ 로그인 성공
      ↳  12% — ✓ 13034 / ✗ 91266
     ✗ 녹양역 -> 대방역 경로탐색 결과
      ↳  0% — ✓ 0 / ✗ 8753

     checks.........................: 11.52% ✓ 13034  ✗ 100019
     data_received..................: 405 MB 365 kB/s
     data_sent......................: 61 MB  55 kB/s
     http_req_blocked...............: avg=114.59ms min=0s       med=56.81ms max=13.03s   p(90)=245.2ms  p(95)=331.36ms
     http_req_connecting............: avg=96.9ms   min=0s       med=16.67ms max=12.99s   p(90)=216.63ms p(95)=310.42ms
   ✗ http_req_duration..............: avg=1.65s    min=0s       med=8.23ms  max=46.42s   p(90)=85.06ms  p(95)=12.15s  
       { expected_response:true }...: avg=15.11s   min=101.77ms med=8.24s   max=46.42s   p(90)=39.41s   p(95)=39.73s  
     http_req_failed................: 95.82% ✓ 112396 ✗ 4901  
     http_req_receiving.............: avg=9.74µs   min=0s       med=0s      max=809µs    p(90)=47µs     p(95)=61µs    
     http_req_sending...............: avg=4.1ms    min=0s       med=33µs    max=10.26s   p(90)=57µs     p(95)=78µs    
     http_req_tls_handshaking.......: avg=36.18ms  min=0s       med=34.1ms  max=698.07ms p(90)=77.7ms   p(95)=97.58ms 
     http_req_waiting...............: avg=1.64s    min=0s       med=7.88ms  max=46.42s   p(90)=36.35ms  p(95)=12.15s  
     http_reqs......................: 117297 105.67323/s
     iteration_duration.............: avg=2.25s    min=864.39µs med=93.57ms max=52.57s   p(90)=1.15s    p(95)=31.02s  
     iterations.....................: 104255 93.923652/s
     vus............................: 21     min=1    max=400 
     vus_max........................: 400    min=400  max=400 
```