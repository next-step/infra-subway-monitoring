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
key: mnonm-aws-key.pem
bastion: 3.34.191.156
EC2: ssh web (alias 적용)
로그: /home/ubuntu/log/file.log

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-mnonm

---

# kakao
- First Contentful Paint(FCP): 2.5s
- Time to Interactive(TTI): 5.3s
- Largest Contentful Paint(LCP): 5.9s
- Total Blocking Time(TBT): 130ms
- 
# nextstep
- First Contentful Paint(FCP): 2.7s
- Time to Interactive(TTI): 2.8s
- Largest Contentful Paint(LCP): 5.9s
- Total Blocking Time(TBT): 70ms

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- FCP: 2.5s
  - 경쟁사 대비 20% 차이는 나지 않아 경쟁사와 동일한 수치를 목표로 했습니다.
  
- TTI: 2.6s
  - 현재는 FCP랑 큰 차이가 없어 비슷한 수치를 목표로 했습니다.
  
- 압축된 리소스 최대 크기: 200kb 미만

- Lighthouse 성능 감사: 75점 이상(개선 이전 대비 10% 증가)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스 압축
- 이미지 압축
- 사용하지 않는 자바스크립트 삭제
- 글꼴 표시 CSS
- 이미지 너비, 높이 설정
- JS, CSS, 이미지, 웹 폰트 등 정적 컨텐츠 캐시 적용
- CDN 사용
- JS/CSS 지연 로딩
- 스크립트 병합하여 요청 최소화

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
  nginx, application, mysql

- 목푯값 설정
  - Throughput (23.15 ~ 231.5)
    - DAU: 100만
    - 피크 시간대 집중률: 10
    - 1명당 1일 평균 접속수: 2회
    - 100만 * 2 = 200만 (1일 총 접속수)
    - 200만/86400 = 23.15 (1일 평균 rps)
    - 23.15 * 10 = 231.5 (1일 최대 rps)

  - Latency
    100ms 이하

  - 부하 유지기간
    30분

- 부하 테스트시 저장될 데이터 건수 및 크기

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요



### step2 요구사항
- [X] 웹 성능 테스트
  - [X] 웹 성능 예산을 작성
  - [X] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
  
- [X] 부하 테스트 
  - [X] 테스트 전제조건 정리
    - [X] 대상 시스템 범위
    - [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [X] 부하 테스트 시 저장될 데이터 건수 및 크기 
  - [X] 각 시나리오에 맞춰 스크립트 작성 
    - [X] 접속 빈도가 높은 페이지
      - 메인
    - [X] 데이터를 갱신하는 페이지
      - 내 정보 수정
    - [X] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
      - 노선 조회
  - [X] Smoke, Load, Stress 테스트 후 결과를 기록
  


####접속 빈도가 높은 페이지 - 메인
<details>
  <summary> smoke.log </summary>

  ```  
  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (10.6s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 9.3 kB  885 B/s
     data_sent......................: 5.5 kB  517 B/s
     http_req_blocked...............: avg=5.95ms  min=0s     med=0s      max=119.02ms p(90)=0s      p(95)=5.95ms
     http_req_connecting............: avg=45.51µs min=0s     med=0s      max=910.3µs  p(90)=0s      p(95)=45.51µs
   ✓ http_req_duration..............: avg=21.12ms min=15.5ms med=18.85ms max=60.2ms   p(90)=22.39ms p(95)=26.23ms
       { expected_response:true }...: avg=21.12ms min=15.5ms med=18.85ms max=60.2ms   p(90)=22.39ms p(95)=26.23ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 20
     http_req_receiving.............: avg=49.01µs min=0s     med=0s      max=980.2µs  p(90)=0s      p(95)=49.01µs
     http_req_sending...............: avg=10.91µs min=0s     med=0s      max=163.6µs  p(90)=5.46µs  p(95)=60.05µs
     http_req_tls_handshaking.......: avg=5.44ms  min=0s     med=0s      max=108.99ms p(90)=0s      p(95)=5.44ms
     http_req_waiting...............: avg=21.06ms min=15.5ms med=18.85ms max=60.2ms   p(90)=22.39ms p(95)=26.23ms
     http_reqs......................: 20      1.89331/s
     iteration_duration.............: avg=1.05s   min=1.03s  med=1.03s   max=1.2s     p(90)=1.06s   p(95)=1.13s
     iterations.....................: 10      0.946655/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

  
</details>

<details>
  <summary> load.log </summary>

```  
  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 150 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 150 looping VUs for 3m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (3m00.9s), 000/150 VUs, 13948 complete and 0 interrupted iterations
default ✓ [======================================] 000/150 VUs  3m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 27896      ✗ 0
     data_received..................: 10 MB   55 kB/s
     data_sent......................: 7.1 MB  40 kB/s
     http_req_blocked...............: avg=79.56µs min=0s     med=0s      max=28.65ms  p(90)=0s      p(95)=0s
     http_req_connecting............: avg=5µs     min=0s     med=0s      max=5.61ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=12.71ms min=7.25ms med=12.4ms  max=213.67ms p(90)=14.98ms p(95)=16.13ms
       { expected_response:true }...: avg=12.71ms min=7.25ms med=12.4ms  max=213.67ms p(90)=14.98ms p(95)=16.13ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 27896
     http_req_receiving.............: avg=56.02µs min=0s     med=0s      max=1.99ms   p(90)=0s      p(95)=560.07µs
     http_req_sending...............: avg=6.55µs  min=0s     med=0s      max=2ms      p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=72.52µs min=0s     med=0s      max=26.66ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=12.65ms min=7.25ms med=12.33ms max=213.67ms p(90)=14.91ms p(95)=16.06ms
     http_reqs......................: 27896   154.230441/s
     iteration_duration.............: avg=1.02s   min=1.01s  med=1.02s   max=1.23s    p(90)=1.03s   p(95)=1.03s
     iterations.....................: 13948   77.115221/s
     vus............................: 6       min=1        max=150
     vus_max........................: 150     min=150      max=150

```
</details>

<details>
  <summary> stress.log </summary>

```  
  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 30m30s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 30m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (30m00.7s), 000/300 VUs, 515004 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  30m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 1030008    ✗ 0
     data_received..................: 358 MB  199 kB/s
     data_sent......................: 262 MB  146 kB/s
     http_req_blocked...............: avg=19.81µs min=0s     med=0s      max=668.06ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=1.01µs  min=0s     med=0s      max=11.25ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=15.07ms min=6.3ms  med=13.68ms max=1.42s    p(90)=19.27ms p(95)=22.87ms
       { expected_response:true }...: avg=15.07ms min=6.3ms  med=13.68ms max=1.42s    p(90)=19.27ms p(95)=22.87ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 1030008
     http_req_receiving.............: avg=50.03µs min=0s     med=0s      max=39.98ms  p(90)=0s      p(95)=504.29µs
     http_req_sending...............: avg=7.16µs  min=0s     med=0s      max=6.99ms   p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=17.26µs min=0s     med=0s      max=666.97ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=15.01ms min=5.99ms med=13.62ms max=1.42s    p(90)=19.21ms p(95)=22.8ms
     http_reqs......................: 1030008 572.002933/s
     iteration_duration.............: avg=1.03s   min=1.01s  med=1.02s   max=2.44s    p(90)=1.03s   p(95)=1.04s
     iterations.....................: 515004  286.001467/s
     vus............................: 7       min=7        max=300
     vus_max........................: 300     min=300      max=300
 
```


</details>


#### 데이터를 갱신하는 페이지 - 나의 정보 수정
<details>
  <summary> smoke.log </summary>

```  
  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 10 kB   984 B/s
     data_sent......................: 6.2 kB  595 B/s
     http_req_blocked...............: avg=1.96ms  min=0s      med=0s      max=39.32ms p(90)=0s      p(95)=1.96ms
     http_req_connecting............: avg=44.35µs min=0s      med=0s      max=887µs   p(90)=0s      p(95)=44.35µs
   ✓ http_req_duration..............: avg=14.63ms min=11.18ms med=14.35ms max=23.78ms p(90)=16.64ms p(95)=17.99ms
       { expected_response:true }...: avg=13.5ms  min=11.18ms med=13.71ms max=15.71ms p(90)=15.53ms p(95)=15.62ms
     http_req_failed................: 50.00%  ✓ 10       ✗ 10
     http_req_receiving.............: avg=7.63µs  min=0s      med=0s      max=152.6µs p(90)=0s      p(95)=7.63µs
     http_req_sending...............: avg=15.83µs min=0s      med=0s      max=188.5µs p(90)=12.81µs p(95)=131.12µs
     http_req_tls_handshaking.......: avg=1.51ms  min=0s      med=0s      max=30.31ms p(90)=0s      p(95)=1.51ms
     http_req_waiting...............: avg=14.61ms min=11.18ms med=14.3ms  max=23.78ms p(90)=16.64ms p(95)=17.99ms
     http_reqs......................: 20      1.932171/s
     iteration_duration.............: avg=1.03s   min=1.02s   med=1.02s   max=1.08s   p(90)=1.04s   p(95)=1.06s
     iterations.....................: 10      0.966085/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

</details>

<details>
  <summary> load.log </summary>

```  

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 150 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 150 looping VUs for 3m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (3m00.8s), 000/150 VUs, 13927 complete and 0 interrupted iterations
default ✓ [======================================] 000/150 VUs  3m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 27854      ✗ 0
     data_received..................: 11 MB   62 kB/s
     data_sent......................: 8.1 MB  45 kB/s
     http_req_blocked...............: avg=83.11µs min=0s     med=0s      max=30.25ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=6.04µs  min=0s     med=0s      max=6.94ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=13.53ms min=7.36ms med=12.68ms max=1.6s    p(90)=15.69ms p(95)=17.31ms
       { expected_response:true }...: avg=13.31ms min=7.36ms med=12.2ms  max=1.6s    p(90)=15.2ms  p(95)=16.68ms
     http_req_failed................: 50.00%  ✓ 13927      ✗ 13927
     http_req_receiving.............: avg=59.34µs min=0s     med=0s      max=5.17ms  p(90)=0s      p(95)=631.74µs
     http_req_sending...............: avg=7.7µs   min=0s     med=0s      max=11.72ms p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=74.63µs min=0s     med=0s      max=27.25ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=13.46ms min=7.36ms med=12.62ms max=1.6s    p(90)=15.62ms p(95)=17.22ms
     http_reqs......................: 27854   154.045521/s
     iteration_duration.............: avg=1.02s   min=1.01s  med=1.02s   max=2.62s   p(90)=1.03s   p(95)=1.03s
     iterations.....................: 13927   77.022761/s
     vus............................: 3       min=1        max=150
     vus_max........................: 150     min=150      max=150

```

</details>

<details>
  <summary> stress.log </summary>

```  
  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 30m30s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 30m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (30m01.0s), 000/300 VUs, 515896 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  30m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 1031792    ✗ 0
     data_received..................: 402 MB  223 kB/s
     data_sent......................: 299 MB  166 kB/s
     http_req_blocked...............: avg=19.23µs min=0s     med=0s      max=78.81ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=927ns   min=0s     med=0s      max=9.3ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=14.2ms  min=6.33ms med=13.2ms  max=3.11s   p(90)=17.49ms p(95)=20.09ms
       { expected_response:true }...: avg=13.9ms  min=6.33ms med=12.78ms max=3.11s   p(90)=17.11ms p(95)=19.77ms
     http_req_failed................: 50.00%  ✓ 515896     ✗ 515896
     http_req_receiving.............: avg=41.98µs min=0s     med=0s      max=16.51ms p(90)=0s      p(95)=321.1µs
     http_req_sending...............: avg=9.12µs  min=0s     med=0s      max=3.6ms   p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=15.7µs  min=0s     med=0s      max=68.81ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=14.15ms min=6.33ms med=13.15ms max=3.11s   p(90)=17.43ms p(95)=20.03ms
     http_reqs......................: 1031792 572.903229/s
     iteration_duration.............: avg=1.02s   min=1.01s  med=1.02s   max=4.13s   p(90)=1.03s   p(95)=1.03s
     iterations.....................: 515896  286.451614/s
     vus............................: 0       min=0        max=300
     vus_max........................: 300     min=300      max=300

```

</details>

#### 데이터를 조회하는데 여러 데이터를 참조 - 노선 조회
<details>
  <summary> smoke.log </summary>

```
  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ retrieved path

     checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 22 kB   2.1 kB/s
     data_sent......................: 1.8 kB  172 B/s
     http_req_blocked...............: avg=4.28ms   min=0s      med=0s      max=42.84ms p(90)=4.28ms   p(95)=23.56ms
     http_req_connecting............: avg=100.15µs min=0s      med=0s      max=1ms     p(90)=100.14µs p(95)=550.82µs
   ✓ http_req_duration..............: avg=35.3ms   min=32.35ms med=34.88ms max=40.08ms p(90)=38.83ms  p(95)=39.45ms
       { expected_response:true }...: avg=35.3ms   min=32.35ms med=34.88ms max=40.08ms p(90)=38.83ms  p(95)=39.45ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=145.44µs min=0s      med=0s      max=1ms     p(90)=507.44µs p(95)=754.72µs
     http_req_sending...............: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=3.38ms   min=0s      med=0s      max=33.86ms p(90)=3.38ms   p(95)=18.62ms
     http_req_waiting...............: avg=35.15ms  min=32.35ms med=34.88ms max=39.63ms p(90)=38.78ms  p(95)=39.21ms
     http_reqs......................: 10      0.961091/s
     iteration_duration.............: avg=1.04s    min=1.03s   med=1.03s   max=1.08s   p(90)=1.04s    p(95)=1.06s
     iterations.....................: 10      0.961091/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1


```

</details>

<details>
  <summary> load.log </summary>

```
  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 150 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 150 looping VUs for 3m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] error getting terminal size                   error="The handle is invalid."

running (3m00.5s), 000/150 VUs, 13082 complete and 0 interrupted iterations
default ✓ [======================================] 000/150 VUs  3m0s

     ✓ retrieved path

     checks.........................: 100.00% ✓ 13082    ✗ 0
     data_received..................: 26 MB   141 kB/s
     data_sent......................: 1.9 MB  11 kB/s
     http_req_blocked...............: avg=179.83µs min=0s      med=0s      max=30.63ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=13.73µs  min=0s      med=0s      max=6.08ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=94.05ms  min=28.51ms med=78.06ms max=3.69s   p(90)=113.42ms p(95)=163.17ms
       { expected_response:true }...: avg=94.05ms  min=28.51ms med=78.06ms max=3.69s   p(90)=113.42ms p(95)=163.17ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 13082
     http_req_receiving.............: avg=78.14µs  min=0s      med=0s      max=1.29ms  p(90)=148.54µs p(95)=913.15µs
     http_req_sending...............: avg=9.63µs   min=0s      med=0s      max=1.05ms  p(90)=0s       p(95)=78.98µs
     http_req_tls_handshaking.......: avg=162.25µs min=0s      med=0s      max=29.84ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=93.96ms  min=28.51ms med=77.96ms max=3.69s   p(90)=113.34ms p(95)=162.87ms
     http_reqs......................: 13082   72.47002/s
     iteration_duration.............: avg=1.09s    min=1.02s   med=1.07s   max=4.69s   p(90)=1.11s    p(95)=1.16s
     iterations.....................: 13082   72.47002/s
     vus............................: 4       min=1      max=150
     vus_max........................: 150     min=150    max=150

  
```

</details>

<details>
  <summary> stress.log </summary>

```
  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 30m30s max duration (incl. graceful stop):
           * default: Up to 200 looping VUs for 30m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (30m00.8s), 000/200 VUs, 238667 complete and 0 interrupted iterations
default ✓ [======================================] 000/200 VUs  30m0s

     ✓ retrieved path

     checks.........................: 100.00% ✓ 238667     ✗ 0
     data_received..................: 460 MB  255 kB/s
     data_sent......................: 34 MB   19 kB/s
     http_req_blocked...............: avg=26.66µs  min=0s      med=0s       max=45.79ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=1.78µs   min=0s      med=0s       max=31.27ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=482.55ms min=30.78ms med=433.36ms max=3.6s    p(90)=502.94ms p(95)=1.03s
       { expected_response:true }...: avg=482.55ms min=30.78ms med=433.36ms max=3.6s    p(90)=502.94ms p(95)=1.03s
     http_req_failed................: 0.00%   ✓ 0          ✗ 238667
     http_req_receiving.............: avg=61.27µs  min=0s      med=0s       max=4ms     p(90)=0s       p(95)=690.1µs
     http_req_sending...............: avg=6.36µs   min=0s      med=0s       max=3ms     p(90)=0s       p(95)=41.5µs
     http_req_tls_handshaking.......: avg=22.94µs  min=0s      med=0s       max=27.45ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=482.48ms min=30.78ms med=433.29ms max=3.6s    p(90)=502.88ms p(95)=1.03s
     http_reqs......................: 238667  132.533336/s
     iteration_duration.............: avg=1.48s    min=1.03s   med=1.43s    max=4.6s    p(90)=1.5s     p(95)=2.03s
     iterations.....................: 238667  132.533336/s
     vus............................: 5       min=5        max=200
     vus_max........................: 200     min=200      max=200

  
```

</details>

### step1 요구사항
- [X] 로그 설정하기
  - [X] 로그 추가
  - [X] Nginx Access Log 설정하기
- [X] Cloudwatch 모니터링
  - [X] Cloudwatch 로그 수집
  - [X] Cloudwatch 메트릭 수집