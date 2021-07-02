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
   /app/infra-subway-monitoring/log
   /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-ttuop
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
서비스 경쟁사와 동일한 수준이 적당하다고 생각했습니다.

* First Contentful Paint: 0.6s
    * 네이버 지도: 0.4s
    * 카카오 지도: 0.6s
* Time to Interactive: 2.9s
    * 네이버 지도: 2.9s
    * 카카오 지도: 2.8s
* Speed Index : 2.3s
    * 네이버 지도: 2.1s
    * 카카오 지도: 2.3s
* Time Blocking Time: 0.6s
    * 네이버 지도: 0.1s
    * 카카오 지도: 0.6s
* Largest Contentful Paint: 2.6s
    * 네이버 지도: 2.6s
    * 카카오 지도: 0.7s

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* 자바스크립트 파일 용량 최적화
    * 압축
    * 사용하지 않는 코드 정리
* 렌더링 차단 리소스 제거
 
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
* Latency: 100 ms
* Load Test: 70 VUs
    * 램프업 1분, 유지 2분, 램프다운 10초
* Stress Test: 700 VUs = Load Test * 10
    * 램프업 1분, 유지 5분, 램프다운 10초
* 산출 근거
    * 1일 사용자 수(DAU): 200,000
    * 집중률: 200,000 (최대), 20,000 (평균)
    * 1명당 평균 요청수: 3
    * 1일 총 접속 수: 600,000 = 200,000 x 3
    * 1일 평균 rps: 6.9 = 600,000 / 86,400
    * 1일 최대 rps: 69 = 6.9 * (200,000 / 20,000)

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* Case 1: 접속 빈도가 높은 페이지
    * k6/case1/smoke.js, load.js, stress.ks

smoke test
```shell
     checks.........................: 100.00% ✓ 20  ✗ 0
     data_received..................: 15 kB   1.4 kB/s
     data_sent......................: 4.3 kB  386 B/s
     http_req_blocked...............: avg=5.48ms  min=1.6µs  med=3.62ms  max=16.13ms  p(90)=14.29ms  p(95)=15.66ms
     http_req_connecting............: avg=5.45ms  min=0s     med=3.57ms  max=16.07ms  p(90)=14.23ms  p(95)=15.63ms
   ✗ http_req_duration..............: avg=50.71ms min=9.93ms med=29.74ms max=143.29ms p(90)=104.5ms  p(95)=134.52ms
       { expected_response:true }...: avg=50.71ms min=9.93ms med=29.74ms max=143.29ms p(90)=104.5ms  p(95)=134.52ms
   ✓ http_req_failed................: 0.00%   ✓ 0   ✗ 20
     http_req_receiving.............: avg=100.1µs min=50.1µs med=100.5µs max=191.6µs  p(90)=134.4µs  p(95)=166.33µs
     http_req_sending...............: avg=59.76µs min=7.9µs  med=59.2µs  max=141.3µs  p(90)=126.22µs p(95)=133.13µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=50.55ms min=9.87ms med=29.57ms max=143.09ms p(90)=104.24ms p(95)=134.35ms
     http_reqs......................: 20      1.796091/s
     iteration_duration.............: avg=1.11s   min=1.04s  med=1.11s   max=1.17s    p(90)=1.17s    p(95)=1.17s
     iterations.....................: 10      0.898045/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
``` 

load test 
* 문제점
    * 95% 사용자의 응답시간이 123ms 로 테스트 실패

```shell
     checks.........................: 99.97% ✓ 20448 ✗ 5
     data_received..................: 16 MB  81 kB/s
     data_sent......................: 4.4 MB 23 kB/s
     http_req_blocked...............: avg=2.27ms  min=800ns  med=2.7µs  max=1.02s   p(90)=9.65ms  p(95)=13.83ms
     http_req_connecting............: avg=2.24ms  min=0s     med=0s     max=1.02s   p(90)=9.52ms  p(95)=13.74ms
   ✗ http_req_duration..............: avg=29.91ms min=2.24ms med=9.65ms max=1.25s   p(90)=80.52ms p(95)=123.82ms
       { expected_response:true }...: avg=29.92ms min=3.47ms med=9.65ms max=1.25s   p(90)=80.61ms p(95)=123.83ms
     http_req_failed................: 0.02%  ✓ 5     ✗ 20448
     http_req_receiving.............: avg=75.78µs min=0s     med=71.2µs max=6.63ms  p(90)=116µs   p(95)=132.83µs
     http_req_sending...............: avg=55.36µs min=5.7µs  med=13.6µs max=39.41ms p(90)=73.2µs  p(95)=98.43µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=29.78ms min=2.22ms med=9.54ms max=1.25s   p(90)=80.17ms p(95)=123.68ms
     http_reqs......................: 20453  107.266915/s
     iteration_duration.............: avg=1.06s   min=3.12ms med=1.01s  max=3.19s   p(90)=1.17s   p(95)=1.22s
     iterations.....................: 10229  53.646569/s
     vus............................: 7      min=2   max=70
     vus_max........................: 70     min=70  max=70
```

* 개선 후
    * 95% 사용자의 응답시간이 30ms 로 테스트 성공
* 개선 사항
    * tomcat 서버에서 응답을 보낼 때 gzip 으로 압축하도록 설정

```shell
     checks.........................: 100.00% ✓ 20  ✗ 0
     data_received..................: 15 kB   1.4 kB/s
     data_sent......................: 3.0 kB  287 B/s
     http_req_blocked...............: avg=331.52µs min=2.4µs  med=4.65µs   max=6.54ms  p(90)=6.52µs   p(95)=333.62µs
     http_req_connecting............: avg=322.07µs min=0s     med=0s       max=6.44ms  p(90)=0s       p(95)=322.07µs
   ✓ http_req_duration..............: avg=17.86ms  min=8.01ms med=17.01ms  max=32.04ms p(90)=24.85ms  p(95)=30.56ms
       { expected_response:true }...: avg=14.07ms  min=8.01ms med=13.66ms  max=19.37ms p(90)=18.89ms  p(95)=19.13ms
     http_req_failed................: 50.00%  ✓ 10  ✗ 10
     http_req_receiving.............: avg=107.95µs min=64.8µs med=102.05µs max=160.3µs p(90)=150.48µs p(95)=151.65µs
     http_req_sending...............: avg=37.21µs  min=11.7µs med=29.45µs  max=189.7µs p(90)=61.25µs  p(95)=69.81µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=17.71ms  min=7.92ms med=16.85ms  max=31.87ms p(90)=24.73ms  p(95)=30.39ms
     http_reqs......................: 20      1.927734/s
     iteration_duration.............: avg=1.03s    min=1.02s  med=1.03s    max=1.05s   p(90)=1.04s    p(95)=1.04s
     iterations.....................: 10      0.963867/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

stress test

```shell
     checks.........................: 99.88% ✓ 424830 ✗ 475
     data_received..................: 317 MB 832 kB/s
     data_sent......................: 63 MB  166 kB/s
     http_req_blocked...............: avg=4.58ms  min=0s      med=3.7µs   max=1.03s   p(90)=13.08ms p(95)=17.85ms
     http_req_connecting............: avg=4.55ms  min=0s      med=0s      max=1.03s   p(90)=13.01ms p(95)=17.79ms
   ✓ http_req_duration..............: avg=46.58ms min=0s      med=26.74ms max=3.06s   p(90)=85.96ms p(95)=116.77ms
       { expected_response:true }...: avg=34.74ms min=3.18ms  med=19.16ms max=3.06s   p(90)=53.55ms p(95)=69.75ms
     http_req_failed................: 50.06% ✓ 212921 ✗ 212384
     http_req_receiving.............: avg=54.26µs min=0s      med=48.3µs  max=4.09ms  p(90)=90.9µs  p(95)=104.5µs
     http_req_sending...............: avg=53.54µs min=0s      med=31.39µs max=48.79ms p(90)=75.7µs  p(95)=93.1µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=46.47ms min=0s      med=26.64ms max=3.06s   p(90)=85.79ms p(95)=116.64ms
     http_reqs......................: 425305 1115.693599/s
     iteration_duration.............: avg=1.1s    min=567.3µs med=1.07s   max=21.06s  p(90)=1.16s   p(95)=1.21s
     iterations.....................: 212859 558.388507/s
     vus............................: 1      min=1    max=700
     vus_max........................: 700    min=700  max=700
```

* Case 2: 데이터를 갱신하는 페이지
    * k6/case2/smoke.js, load.js, stress.ks

smoke test

```shell
     checks.........................: 100.00% ✓ 20  ✗ 0
     data_received..................: 4.7 kB  460 B/s
     data_sent......................: 5.3 kB  512 B/s
     http_req_blocked...............: avg=481.41µs min=2µs     med=4.65µs  max=9.54ms  p(90)=6.76µs   p(95)=484µs
     http_req_connecting............: avg=472.31µs min=0s      med=0s      max=9.44ms  p(90)=0s       p(95)=472.31µs
   ✓ http_req_duration..............: avg=11.56ms  min=8.13ms  med=11.39ms max=14.26ms p(90)=13.87ms  p(95)=14.22ms
       { expected_response:true }...: avg=11.56ms  min=8.13ms  med=11.39ms max=14.26ms p(90)=13.87ms  p(95)=14.22ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 20
     http_req_receiving.............: avg=89.35µs  min=48.7µs  med=83.24µs max=176.8µs p(90)=142.56µs p(95)=154.19µs
     http_req_sending...............: avg=34.93µs  min=16.29µs med=29.15µs max=138.5µs p(90)=55.45µs  p(95)=61.74µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=11.44ms  min=8.05ms  med=11.26ms max=14.15ms p(90)=13.76ms  p(95)=14.09ms
     http_reqs......................: 20      1.950708/s
     iteration_duration.............: avg=1.02s    min=1.02s   med=1.02s   max=1.03s   p(90)=1.02s    p(95)=1.03s
     iterations.....................: 10      0.975354/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

load test

```shell
     checks.........................: 100.00% ✓ 21354 ✗ 0
     data_received..................: 5.0 MB  26 kB/s
     data_sent......................: 5.6 MB  29 kB/s
     http_req_blocked...............: avg=17.84µs min=1µs    med=2.5µs  max=8.19ms   p(90)=4.5µs   p(95)=5.3µs
     http_req_connecting............: avg=14.57µs min=0s     med=0s     max=8.13ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=9.06ms  min=5.61ms med=8.42ms max=244.48ms p(90)=11.36ms p(95)=13.5ms
       { expected_response:true }...: avg=9.06ms  min=5.61ms med=8.42ms max=244.48ms p(90)=11.36ms p(95)=13.5ms
     http_req_failed................: 0.00%   ✓ 0     ✗ 21354
     http_req_receiving.............: avg=59.9µs  min=8µs    med=54µs   max=1.32ms   p(90)=94.87µs p(95)=106.83µs
     http_req_sending...............: avg=19.24µs min=6.3µs  med=13.2µs max=9.64ms   p(90)=40.8µs  p(95)=47.3µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=8.98ms  min=5.56ms med=8.34ms max=244.45ms p(90)=11.27ms p(95)=13.4ms
     http_reqs......................: 21354   111.814411/s
     iteration_duration.............: avg=1.01s   min=1.01s  med=1.01s  max=1.27s    p(90)=1.02s   p(95)=1.02s
     iterations.....................: 10677   55.907206/s
     vus............................: 4       min=2   max=70
     vus_max........................: 70      min=70  max=70
```

stress test
```shell
     checks.........................: 99.07% ✓ 391944 ✗ 3646
     data_received..................: 93 MB  241 kB/s
     data_sent......................: 104 MB 269 kB/s
     http_req_blocked...............: avg=2.72ms  min=0s      med=3.6µs   max=1.02s   p(90)=5.3ms    p(95)=6.3ms
     http_req_connecting............: avg=2.69ms  min=0s      med=0s      max=1.02s   p(90)=5.26ms   p(95)=6.26ms
   ✓ http_req_duration..............: avg=91.83ms min=0s      med=70.62ms max=3.27s   p(90)=178.19ms p(95)=231.62ms
       { expected_response:true }...: avg=92.55ms min=5.21ms  med=71.3ms  max=3.27s   p(90)=178.84ms p(95)=232.43ms
     http_req_failed................: 0.92%  ✓ 3646   ✗ 391944
     http_req_receiving.............: avg=52.2µs  min=0s      med=48.2µs  max=15.34ms p(90)=87.7µs   p(95)=100.7µs
     http_req_sending...............: avg=38.71µs min=0s      med=33.3µs  max=6.47ms  p(90)=84µs     p(95)=98.2µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=91.74ms min=0s      med=70.53ms max=3.27s   p(90)=178.09ms p(95)=231.54ms
     http_reqs......................: 395590 1027.956466/s
     iteration_duration.............: avg=1.18s   min=408.8µs med=1.15s   max=21.05s  p(90)=1.35s    p(95)=1.44s
     iterations.....................: 198764 516.496218/s
     vus............................: 1      min=1    max=700
     vus_max........................: 700    min=700  max=700
```

* Case 3: 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    * k6/case3/smoke.js, load.js, stress.ks

smoke test

```shell
     checks.........................: 100.00% ✓ 40  ✗ 0
     data_received..................: 10 kB   1.0 kB/s
     data_sent......................: 4.5 kB  437 B/s
     http_req_blocked...............: avg=208.61µs min=2.6µs  med=4.35µs  max=4.09ms  p(90)=6.22µs   p(95)=210.6µs
     http_req_connecting............: avg=199.04µs min=0s     med=0s      max=3.98ms  p(90)=0s       p(95)=199.04µs
   ✓ http_req_duration..............: avg=13.95ms  min=8.71ms med=15.41ms max=23.37ms p(90)=17.53ms  p(95)=20.98ms
       { expected_response:true }...: avg=13.95ms  min=8.71ms med=15.41ms max=23.37ms p(90)=17.53ms  p(95)=20.98ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 20
     http_req_receiving.............: avg=111.67µs min=66.1µs med=100.7µs max=215.7µs p(90)=150.11µs p(95)=160.31µs
     http_req_sending...............: avg=39.55µs  min=12.7µs med=29.55µs max=205µs   p(90)=56.13µs  p(95)=65.54µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=13.79ms  min=8.6ms  med=15.3ms  max=23.24ms p(90)=17.41ms  p(95)=20.82ms
     http_reqs......................: 20      1.942407/s
     iteration_duration.............: avg=1.02s    min=1.02s  med=1.02s   max=1.04s   p(90)=1.03s    p(95)=1.03s
     iterations.....................: 10      0.971203/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

load test
```shell
     checks.........................: 100.00% ✓ 42344 ✗ 0
     data_received..................: 11 MB   58 kB/s
     data_sent......................: 4.8 MB  25 kB/s
     http_req_blocked...............: avg=19.79µs min=900ns  med=2.7µs   max=9.03ms   p(90)=5.2µs   p(95)=6.1µs
     http_req_connecting............: avg=16.16µs min=0s     med=0s      max=8.93ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=13.91ms min=5.78ms med=13.49ms max=112.53ms p(90)=21.41ms p(95)=25.52ms
       { expected_response:true }...: avg=13.91ms min=5.78ms med=13.49ms max=112.53ms p(90)=21.41ms p(95)=25.52ms
     http_req_failed................: 0.00%   ✓ 0     ✗ 21172
     http_req_receiving.............: avg=85.3µs  min=17.1µs med=84.4µs  max=1.13ms   p(90)=127.9µs p(95)=144.5µs
     http_req_sending...............: avg=20.98µs min=5.9µs  med=13.6µs  max=9.21ms   p(90)=43.99µs p(95)=51.6µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=13.81ms min=5.72ms med=13.38ms max=112.5ms  p(90)=21.32ms p(95)=25.43ms
     http_reqs......................: 21172   111.119171/s
     iteration_duration.............: avg=1.02s   min=1.01s  med=1.02s   max=1.12s    p(90)=1.03s   p(95)=1.04s
     iterations.....................: 10586   55.559585/s
     vus............................: 5       min=2   max=70
     vus_max........................: 70      min=70  max=70
```

stress test
* 문제점
    * 성공률이 45% 로 낮음

```shell
     checks.........................: 45.46% ✓ 340379 ✗ 408347
     data_received..................: 95 MB  249 kB/s
     data_sent......................: 139 MB 366 kB/s
     http_req_blocked...............: avg=104.28ms min=0s     med=108.85ms max=226.68ms p(90)=137.88ms p(95)=143.57ms
     http_req_connecting............: avg=82.55ms  min=0s     med=103.89ms max=226.63ms p(90)=135.95ms p(95)=141.92ms
   ✓ http_req_duration..............: avg=225.04ms min=0s     med=141.2ms  max=21.27s   p(90)=383.61ms p(95)=519.9ms
       { expected_response:true }...: avg=337.72ms min=5.89ms med=316.02ms max=1.6s     p(90)=543.62ms p(95)=595.21ms
     http_req_failed................: 62.00% ✓ 336448 ✗ 206139
     http_req_receiving.............: avg=23.51µs  min=0s     med=0s       max=21.73ms  p(90)=70.8µs   p(95)=92.9µs
     http_req_sending...............: avg=42.35ms  min=0s     med=60.7µs   max=419.06ms p(90)=218.29ms p(95)=239.48ms
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=182.67ms min=0s     med=124.09ms max=21.27s   p(90)=344.95ms p(95)=379.83ms
     http_reqs......................: 542587 1423.799312/s
     iteration_duration.............: avg=582.1ms  min=6.18ms med=245.61ms max=21.66s   p(90)=1.79s    p(95)=1.96s
     iterations.....................: 403568 1059.000383/s
     vus............................: 1      min=1    max=700
     vus_max........................: 700    min=700  max=700
```

* 개선 후
    * 성공률이 100% 로 상승
* 조치사항
    * worker_connections 2000
    * nginx worker 부족 에러가 발생하여 옵션 조정

```shell
     checks.........................: 100.00% ✓ 359376 ✗ 0
     data_received..................: 91 MB   245 kB/s
     data_sent......................: 40 MB   109 kB/s
     http_req_blocked...............: avg=20.36µs  min=700ns  med=2.5µs   max=28.51ms p(90)=4.1µs   p(95)=4.9µs
     http_req_connecting............: avg=17.15µs  min=0s     med=0s      max=28.39ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=808.17ms min=5.87ms med=865.4ms max=4.92s   p(90)=1.38s   p(95)=1.47s
       { expected_response:true }...: avg=808.17ms min=5.87ms med=865.4ms max=4.92s   p(90)=1.38s   p(95)=1.47s
     http_req_failed................: 0.00%   ✓ 0      ✗ 179688
     http_req_receiving.............: avg=77.67µs  min=14.5µs med=74.9µs  max=7.42ms  p(90)=114.9µs p(95)=130.5µs
     http_req_sending...............: avg=16.41µs  min=5.3µs  med=11.7µs  max=1.6ms   p(90)=35.3µs  p(95)=43.7µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=808.07ms min=5.79ms med=865.3ms max=4.92s   p(90)=1.38s   p(95)=1.47s
     http_reqs......................: 179688  484.468208/s
     iteration_duration.............: avg=2.61s    min=1.01s  med=2.72s   max=6.73s   p(90)=3.34s   p(95)=3.57s
     iterations.....................: 89844   242.234104/s
     vus............................: 39      min=12   max=700
     vus_max........................: 700     min=700  max=700
```

### 이슈

스트레스 테스트 종료 후 CPU 가 50~60% 를 유지하는 현상이 발견됨\
원인은 nextstep.subway.line.domain.Line.findFirstStation 메소드 내\
isPresentPreSection, findPreSection 2개 메소드가 무한 로프를 실행하면서 CPU를 계속 점유하는 문제가 발생했습니다.\
현상은 그 이후로 재현되지 않고 있지만 동일한 증상이 발생하지 않도록 방어로직이 필요하겠습니다.

```aidl
top - 17:05:47 up 2 days, 10:06,  3 users,  load average: 1.12, 1.13, 1.37
Threads: 388 total,   2 running, 375 sleeping,  11 stopped,   0 zombie
%Cpu(s): 51.2 us,  0.7 sy,  0.0 ni, 47.8 id,  0.0 wa,  0.0 hi,  0.2 si,  0.2 st
MiB Mem :   3933.7 total,    113.0 free,   2198.7 used,   1622.0 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1444.6 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  89345 ubuntu    20   0 3905844   1.2g  22924 R  95.7  31.6  56:48.38 java -jar -Dspring.profiles.active=prod ./build/libs/subway-0.0.1-SNAPSHOT.jar
  89012 ubuntu    20   0 3905844   1.2g  22924 S   2.7  31.6   1:49.29 java -jar -Dspring.profiles.active=prod ./build/libs/subway-0.0.1-SNAPSHOT.jar
  89027 ubuntu    20   0 3905844   1.2g  22924 S   2.7  31.6   1:49.29 java -jar -Dspring.profiles.active=prod ./build/libs/subway-0.0.1-SNAPSHOT.jar
  89017 ubuntu    20   0 3905844   1.2g  22924 S   1.3  31.6   0:43.33 java -jar -Dspring.profiles.active=prod ./build/libs/subway-0.0.1-SNAPSHOT.jar
  89021 ubuntu    20   0 3905844   1.2g  22924 S   0.7  31.6   0:11.23 java -jar -Dspring.profiles.active=prod ./build/libs/subway-0.0.1-SNAPSHOT.jar
  90482 ubuntu    20   0 3576140  65316  27848 S   0.7   1.6   0:06.57 jstat -gcutil 89010 1s
  43839 root      24   4  669992  95412   5988 S   0.3   2.4   1:38.09 /var/awslogs/bin/python /var/awslogs/bin/aws logs push --config-file /var/awslogs/etc/awslogs.conf --additional-confi+
  84855 ubuntu    20   0 2397172 507260  18512 S   0.3  12.6   0:07.20 /usr/lib/jvm/java-11-openjdk-amd64/bin/java --add-opens java.base/java.util=ALL-UNNAMED --add-opens java.base/java.la+
  91987 root      20   0       0      0      0 I   0.3   0.0   0:00.02 [kworker/u30:0-events_power_efficient]
      1 root      20   0  170788  10816   6236 S   0.0   0.3   0:26.09 /lib/systemd/systemd --system --deserialize 17
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.02 [kthreadd]
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 [rcu_gp]
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 [rcu_par_gp]
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 [kworker/0:0H-kblockd]
      9 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 [mm_percpu_wq]
     10 root      20   0       0      0      0 S   0.0   0.0   0:58.98 [ksoftirqd/0]
     11 root      20   0       0      0      0 I   0.0   0.0   0:53.65 [rcu_sched]
```

Thread Dump 1

```aidl
http-nio-8080-exec-290" #324 daemon prio=5 os_prio=0 cpu=2898966.81ms elapsed=4096.01s tid=0x00007f447827a000 nid=0x15d01 runnable  [0x00007f4449db0000]
   java.lang.Thread.State: RUNNABLE
        at java.util.stream.AbstractPipeline.evaluate(java.base@11.0.11/AbstractPipeline.java:234)
        at java.util.stream.ReferencePipeline.anyMatch(java.base@11.0.11/ReferencePipeline.java:528)
        at nextstep.subway.line.domain.Line.isPresentPreSection(Line.java:126)
        at nextstep.subway.line.domain.Line.findFirstStation(Line.java:116)
        at nextstep.subway.line.domain.Line.orderBySection(Line.java:102)
        at nextstep.subway.line.domain.Line.getStations(Line.java:81)
        at nextstep.subway.line.dto.LineResponse.isEmpty(LineResponse.java:39)
        at nextstep.subway.line.dto.LineResponse.of(LineResponse.java:32)
        at nextstep.subway.line.application.LineService.saveLine(LineService.java:31)
        at nextstep.subway.line.application.LineService$$FastClassBySpringCGLIB$$c48cb19.invoke(<generated>
```
Thread Dump 2 (일정 간격을 두고 다시 수집)

```aidl
http-nio-8080-exec-290" #324 daemon prio=5 os_prio=0 cpu=4025530.35ms elapsed=5284.62s tid=0x00007f447827a000 nid=0x15d01 runnable  [0x00007f4449db0000]
   java.lang.Thread.State: RUNNABLE
        at java.util.stream.StreamOpFlag.fromCharacteristics(java.base@11.0.11/StreamOpFlag.java:733)
        at java.util.stream.StreamSupport.stream(java.base@11.0.11/StreamSupport.java:70)
        at java.util.Collection.stream(java.base@11.0.11/Collection.java:711)
        at nextstep.subway.line.domain.Line.findPreSection(Line.java:136)
        at nextstep.subway.line.domain.Line.findFirstStation(Line.java:117)
        at nextstep.subway.line.domain.Line.orderBySection(Line.java:102)
        at nextstep.subway.line.domain.Line.getStations(Line.java:81)
        at nextstep.subway.line.dto.LineResponse.isEmpty(LineResponse.java:39)
        at nextstep.subway.line.dto.LineResponse.of(LineResponse.java:32)
        at nextstep.subway.line.application.LineService.saveLine(LineService.java:31)
```
