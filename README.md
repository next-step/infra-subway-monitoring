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

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비슨느 어떤 부분을 개선하면 좋을까요

- gzip 압축 사용
- 사용하지 않는 자바스크립트 줄이기
- 렌더링 차단 리소스 제거하기

</br>
</br>

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 테스트 전제조건
	- 1일 예상 상용자 수 : 100,000
    	- 1개월 지하철 경로조회 앱 DAU / 30 
        - 30,000,000  / 30
    - 1명당 1일 평균 접속수 : 4
    - 1일 총 접속 수 : 400,000
    - 1일 평균 RPS : 4.62 rps
    - 1일 최대 RPS : 115 rps
    	- 1일 평균 RPS * (최대 트래픽 / 평소트래픽)
        - 최대트래픽 / 평소트래픽 : 25
    - Latency : 100ms
- 시나리오
	- 접속 빈도가 높은 페이지 : 메인페이지
    - 많은 리소스를 조합하여 결과를 보여주는 페이지 : 경로검색
    
</br>
</br>

4. Smoke, Load, Stress 테스트 스크립트와 결과

#### Smoke 테스트

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
        http_req_duration: ['p(99)<150'],
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
 k6 run SmokeTest.js

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


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 홈화면 접속

     checks.........................: 100.00% ✓ 10  ✗ 0  
     data_received..................: 20 kB   1.9 kB/s
     data_sent......................: 1.5 kB  140 B/s
     http_req_blocked...............: avg=30.83ms min=4µs    med=5µs     max=308.25ms p(90)=30.83ms p(95)=169.54ms
     http_req_connecting............: avg=1.37ms  min=0s     med=0s      max=13.74ms  p(90)=1.37ms  p(95)=7.55ms  
   ✓ http_req_duration..............: avg=15.37ms min=7.34ms med=13.47ms max=28.43ms  p(90)=21.02ms p(95)=24.73ms 
       { expected_response:true }...: avg=15.37ms min=7.34ms med=13.47ms max=28.43ms  p(90)=21.02ms p(95)=24.73ms 
     http_req_failed................: 0.00%   ✓ 0   ✗ 10 
     http_req_receiving.............: avg=63.4µs  min=48µs   med=52µs    max=109µs    p(90)=108.1µs p(95)=108.55µs
     http_req_sending...............: avg=30.1µs  min=18µs   med=24µs    max=80µs     p(90)=42.19µs p(95)=61.09µs 
     http_req_tls_handshaking.......: avg=29.2ms  min=0s     med=0s      max=292.08ms p(90)=29.2ms  p(95)=160.64ms
     http_req_waiting...............: avg=15.28ms min=7.26ms med=13.34ms max=28.35ms  p(90)=20.9ms  p(95)=24.62ms 
     http_reqs......................: 10      0.953763/s
     iteration_duration.............: avg=1.04s   min=1s     med=1.01s   max=1.32s    p(90)=1.05s   p(95)=1.19s   
     iterations.....................: 10      0.953763/s
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
        http_req_duration: ['p(99)<250'],
    },
 };

export default () => {

    const loginResponse = http.post(`${URL}/login/token`, {
        email : EMAIL,
        password : PASSWORD
    })

    check(loginResponse, {
        '로그인 성공' : (res) => res.json('accessToken') !== ''
    })

    const authorizationHeader = {
        headers : {
            Authorization : `Bearer ${loginResponse.json('accessToken')}`
        }
    }

    let sectionsResponse = http.get(`${URL}/paths?source=1&target=5`, authorizationHeader).json();
    check(sectionsResponse, { '녹양역 -> 대방역 경로탐색 결과': (res) => res.stations.length != 0 });
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


running (10.6s), 0/1 VUs, 9 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 로그인 성공
     ✓ 녹양역 -> 대방역 경로탐색 결과

     checks.........................: 100.00% ✓ 18  ✗ 0  
     data_received..................: 39 kB   3.7 kB/s
     data_sent......................: 3.9 kB  369 B/s
     http_req_blocked...............: avg=16.99ms  min=2µs      med=5µs      max=305.83ms p(90)=6µs      p(95)=45.88ms 
     http_req_connecting............: avg=795.61µs min=0s       med=0s       max=14.32ms  p(90)=0s       p(95)=2.14ms  
   ✓ http_req_duration..............: avg=71.79ms  min=11.25ms  med=72.76ms  max=171.44ms p(90)=122.55ms p(95)=130.32ms
       { expected_response:true }...: avg=124.26ms min=111.02ms med=121.73ms max=171.44ms p(90)=132.74ms p(95)=152.09ms
     http_req_failed................: 50.00%  ✓ 9   ✗ 9  
     http_req_receiving.............: avg=71.44µs  min=44µs     med=66.5µs   max=119µs    p(90)=92.5µs   p(95)=99.44µs 
     http_req_sending...............: avg=28.55µs  min=10µs     med=29µs     max=81µs     p(90)=36µs     p(95)=42.74µs 
     http_req_tls_handshaking.......: avg=16.04ms  min=0s       med=0s       max=288.8ms  p(90)=0s       p(95)=43.32ms 
     http_req_waiting...............: avg=71.69ms  min=11.15ms  med=72.67ms  max=171.35ms p(90)=122.45ms p(95)=130.23ms
     http_reqs......................: 18      1.69685/s
     iteration_duration.............: avg=1.17s    min=1.12s    med=1.14s    max=1.49s    p(90)=1.22s    p(95)=1.36s   
     iterations.....................: 9       0.848425/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```




####  Load 테스트

시스템에 평소 트래픽과 최대 트래픽이 유입되는 상황에서 성능이 어떻게 측정되는지 확인한다.

- 홈화면

홈화면의 경우 부하를 올려도 응답시간 저하가 발생하지 않고있다.

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

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 3m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m01.0s), 000/100 VUs, 7695 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m0s

     ✓ 홈화면 접속

     checks.........................: 100.00% ✓ 7695  ✗ 0    
     data_received..................: 12 MB   68 kB/s
     data_sent......................: 884 kB  4.9 kB/s
     http_req_blocked...............: avg=355.38µs min=1µs    med=4µs    max=312.36ms p(90)=7µs     p(95)=7µs    
     http_req_connecting............: avg=94.22µs  min=0s     med=0s     max=46.77ms  p(90)=0s      p(95)=0s     
   ✓ http_req_duration..............: avg=10.96ms  min=4.74ms med=9.3ms  max=87.59ms  p(90)=16.28ms p(95)=21.05ms
       { expected_response:true }...: avg=10.96ms  min=4.74ms med=9.3ms  max=87.59ms  p(90)=16.28ms p(95)=21.05ms
     http_req_failed................: 0.00%   ✓ 0     ✗ 7695 
     http_req_receiving.............: avg=50.04µs  min=19µs   med=45µs   max=921µs    p(90)=70µs    p(95)=86µs   
     http_req_sending...............: avg=20.29µs  min=7µs    med=18µs   max=745µs    p(90)=29µs    p(95)=36µs   
     http_req_tls_handshaking.......: avg=255.52µs min=0s     med=0s     max=300.87ms p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=10.89ms  min=4.67ms med=9.23ms max=87.51ms  p(90)=16.21ms p(95)=20.98ms
     http_reqs......................: 7695    42.512804/s
     iteration_duration.............: avg=1.01s    min=1s     med=1.01s  max=1.32s    p(90)=1.01s   p(95)=1.02s  
     iterations.....................: 7695    42.512804/s
     vus............................: 2       min=1   max=99 
     vus_max........................: 100     min=100 max=100
```

- 경로찾기

부하를 올리면 smoke test와 다르게 경로찾기 조회에서 응답이 250ms 이상이 걸린다. 

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

  scenarios: (100.00%) 1 scenario, 100 max VUs, 2m30s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 2m0s over 1 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m05.9s), 000/100 VUs, 2034 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  2m0s

     ✓ 로그인 성공
     ✓ 녹양역 -> 대방역 경로탐색 결과

     checks.........................: 100.00% ✓ 4068  ✗ 0    
     data_received..................: 8.2 MB  65 kB/s
     data_sent......................: 839 kB  6.7 kB/s
     http_req_blocked...............: avg=630.19µs min=1µs      med=3µs     max=307.53ms p(90)=6µs   p(95)=8µs  
     http_req_connecting............: avg=159.7µs  min=0s       med=0s      max=16.25ms  p(90)=0s    p(95)=0s   
   ✗ http_req_duration..............: avg=1.04s    min=4.18ms   med=77.19ms max=5.48s    p(90)=3.84s p(95)=4.52s
       { expected_response:true }...: avg=2.08s    min=103.75ms med=1.81s   max=5.48s    p(90)=4.52s p(95)=5.05s
     http_req_failed................: 50.00%  ✓ 2034  ✗ 2034 
     http_req_receiving.............: avg=52.64µs  min=19µs     med=49µs    max=173µs    p(90)=73µs  p(95)=89µs 
     http_req_sending...............: avg=22.24µs  min=7µs      med=19µs    max=341µs    p(90)=31µs  p(95)=43µs 
     http_req_tls_handshaking.......: avg=464.77µs min=0s       med=0s      max=295.59ms p(90)=0s    p(95)=0s   
     http_req_waiting...............: avg=1.04s    min=4.13ms   med=77.09ms max=5.48s    p(90)=3.84s p(95)=4.52s
     http_reqs......................: 4068    32.303409/s
     iteration_duration.............: avg=3.09s    min=1.11s    med=2.82s   max=6.49s    p(90)=5.53s p(95)=6.06s
     iterations.....................: 2034    16.151704/s
     vus............................: 20      min=1   max=99 
     vus_max........................: 100     min=100 max=100

```

#### Stress 테스트

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