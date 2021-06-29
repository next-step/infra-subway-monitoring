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
   - logback.log: /home/ubuntu/log/subway.log
   - access.log: /var/log/nginx/access.log
   - error.log: /var/log/nginx/error.log
   
2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-likelen

---
TODO
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정

로그 설정하기
 - [x] Application Log 파일로 저장하기
    - 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
 - [x] Nginx Access Log 설정하기
    - access.log: /var/log/nginx/access.log
    - error.log: /var/log/nginx/error.log

Cloudwatch
 - [x] Cloudwatch로 로그 수집하기
 - [x] Cloudwatch로 메트릭 수집하기

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

   ```
   - First Centenful Paint 는 '3초 미만'까지 허용가능하다.
   - Largest Contentful Paint 는 '5초 미만'까지 허용 가능하다.
   - Time to Interactive 는 '3초 미만' 까지 허용 가능하다.
   - Speed Index 는 '3초 미만'까지 허용 가능하다
   - Lighthouse 는 85점까지 허용 가능하다.
   ```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   ```
   1. SSL 적용
   2. gzip 압축 실행
   3. JS, CSS, 이미지, 웹 폰트 등 정적 컨텐츠를 캐싱
   ```

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

   ```
   - 1일 사용자 수(DAU) - 10000명
   - 피크 시간대에는 집중률 - 10배
   - 1명당 1일 평균 접속 혹은 요청수 - 30000(1명은 한 화면에 3번정도 누른다고 가정하면)
   - Throughput
     - 9,000,000(DAU) * 3 (1명당 1일 평균 접속수) = 27,000,000(1일 총 접속 수)
     - 27,000,000 / 86,400 = **312.5**(1일 평균 RPS)
     - **3125**(1일 최대 RPS)
   - Latency - 100ms
   ```

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

테스트는 총 3가지 시나리오로 smoke, load, stress 테스트를 진행했습니다.

**로그인화면(접속 빈도가 높은 페이지)**  - Path: script/Connectionfrequency 

1. smoke 테스트

```
checks.........................: 100.00% ✓ 188 ✗ 0
 data_received..................: 42 kB   419 B/s
 data_sent......................: 42 kB   417 B/s
 http_req_blocked...............: avg=1.9ms    min=1µs     med=4µs     max=309.52ms p(90)=8µs     p(95)=8µs
 http_req_connecting............: avg=1.9ms    min=0s      med=0s      max=309.48ms p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=33.85ms  min=20.76ms med=28.34ms max=148.9ms  p(90)=47.19ms p(95)=73.56ms
 { expected_response:true }...: avg=33.85ms  min=20.76ms med=28.34ms max=148.9ms  p(90)=47.19ms p(95)=73.56ms
 http_req_failed................: 0.00%   ✓ 0   ✗ 188
 http_req_receiving.............: avg=259.01µs min=39µs    med=64.5µs  max=5.94ms   p(90)=673.8µs p(95)=1.02ms
 http_req_sending...............: avg=28.34µs  min=11µs    med=22µs    max=112µs    p(90)=46µs    p(95)=50µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=33.56ms  min=20.64ms med=27.93ms max=148.67ms p(90)=47.11ms p(95)=73.48ms
 http_reqs......................: 188     1.861869/s
 iteration_duration.............: avg=1.07s    min=1.04s   med=1.05s   max=1.58s    p(90)=1.1s    p(95)=1.14s
 iterations.....................: 94      0.930934/s
 vus............................: 1       min=1 max=1
 vus_max........................: 1       min=1 max=1
```

2. load.js

```
/\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: load.js
 output: -

 scenarios: (100.00%) 1 scenario, 300 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 300 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m41.6s), 000/300 VUs, 26672 complete and 0 interrupted iterations
 default ✓ [======================================] 300 VUs  1m40s

 ✓ logged in successfully
 ✓ retrieved member

 checks.....................: 100.00% ✓ 53344 ✗ 0
 data_received..............: 14 MB   134 kB/s
 data_sent..................: 8.6 MB  84 kB/s
 http_req_blocked...........: avg=21.12ms  min=1µs     med=19.33ms max=2.44s    p(90)=39.87ms p(95)=49.03ms
 http_req_connecting........: avg=21.1ms   min=0s      med=19.28ms max=2.44s    p(90)=39.82ms p(95)=48.99ms
 ✓ http_req_duration..........: avg=43.93ms  min=15.99ms med=34.89ms max=921.36ms p(90)=63.09ms p(95)=79.85ms
 http_req_failed............: 100.00% ✓ 53344 ✗ 0
 http_req_receiving.........: avg=245.75µs min=13µs    med=45µs    max=285.23ms p(90)=117µs   p(95)=429µs
 http_req_sending...........: avg=37.54µs  min=6µs     med=31µs    max=1.12ms   p(90)=72µs    p(95)=89µs
 http_req_tls_handshaking...: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...........: avg=43.65ms  min=15.92ms med=34.7ms  max=921.25ms p(90)=62.75ms p(95)=79.26ms
 http_reqs..................: 53344   524.825576/s
 iteration_duration.........: avg=1.13s    min=1.06s   med=1.1s    max=3.53s    p(90)=1.17s   p(95)=1.21s
 iterations.................: 26672   262.412788/s
 vus........................: 28      min=28  max=300
 vus_max....................: 300     min=300 max=300
```

3. stress.js

```
 ↳ k6 run stress.js

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: stress.js
 output: -

 scenarios: (100.00%) 1 scenario, 1100 max VUs, 1m57s max duration (incl. graceful stop):
 * default: Up to 1100 looping VUs for 1m27s over 23 stages (gracefulRampDown: 30s, gracefulStop: 30s)


 running (1m57.0s), 0000/1100 VUs, 957 complete and 856 interrupted iterations
 default ✓ [======================================] 0000/1100 VUs  1m27s

 ✓ logged in successfully
 ✓ retrieved member

 checks.........................: 100.00% ✓ 2564   ✗ 0
 data_received..................: 617 kB  5.3 kB/s
 data_sent......................: 761 kB  6.5 kB/s
 http_req_blocked...............: avg=11.98ms  min=1µs      med=5µs    max=1.11s   p(90)=22.53ms p(95)=25.56ms
 http_req_connecting............: avg=11.95ms  min=0s       med=0s     max=1.11s   p(90)=22.46ms p(95)=25.47ms
 ✗ http_req_duration..............: avg=22.29s   min=180.43ms med=21.75s max=55.27s  p(90)=39s     p(95)=42.63s
 { expected_response:true }...: avg=22.21s   min=180.43ms med=21.69s max=55.27s  p(90)=38.97s  p(95)=42.58s
 http_req_failed................: 0.27%   ✓ 7      ✗ 2557
 http_req_receiving.............: avg=295.09µs min=22µs     med=66µs   max=280.3ms p(90)=270.7µs p(95)=673.54µs
 http_req_sending...............: avg=50.85µs  min=7µs      med=32µs   max=277µs   p(90)=106.7µs p(95)=126µs
 http_req_tls_handshaking.......: avg=0s       min=0s       med=0s     max=0s      p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=22.29s   min=180.23ms med=21.75s max=55.27s  p(90)=39s     p(95)=42.63s
 http_reqs......................: 2564    21.913086/s
 iteration_duration.............: avg=36.7s    min=1.64s    med=35.75s max=1m20s   p(90)=1m4s    p(95)=1m8s
 iterations.....................: 957     8.178948/s
 vus............................: 1       min=1    max=1100
 vus_max........................: 1100    min=1100 max=1100

```

**패스워드를 갱신하는 페이지** - Path: script/DataUpdate

1. smoke.js

```
/**
 *
 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: smoke.js
 output: -

 scenarios: (100.00%) 1 scenario, 1 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 1 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m40.0s), 0/1 VUs, 95 complete and 0 interrupted iterations
 default ✓ [======================================] 1 VUs  1m40s

 ✓ created in successfully

 checks.........................: 100.00% ✓ 95  ✗ 0
 data_received..................: 9.1 kB  91 B/s
 data_sent......................: 19 kB   188 B/s
 http_req_blocked...............: avg=275.58µs min=3µs     med=5µs     max=25.62ms  p(90)=8µs     p(95)=8µs
 http_req_connecting............: avg=268.64µs min=0s      med=0s      max=25.52ms  p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=50.21ms  min=25.56ms med=35.76ms max=310.82ms p(90)=59.34ms p(95)=195.58ms
 { expected_response:true }...: avg=50.21ms  min=25.56ms med=35.76ms max=310.82ms p(90)=59.34ms p(95)=195.58ms
 http_req_failed................: 0.00%   ✓ 0   ✗ 95
 http_req_receiving.............: avg=57.02µs  min=31µs    med=51µs    max=142µs    p(90)=87.8µs  p(95)=93.9µs
 http_req_sending...............: avg=36.8µs   min=16µs    med=31µs    max=252µs    p(90)=47µs    p(95)=50.59µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=50.11ms  min=25.47ms med=35.64ms max=310.51ms p(90)=59.24ms p(95)=195.48ms
 http_reqs......................: 95      0.949636/s
 iteration_duration.............: avg=1.05s    min=1.02s   med=1.03s   max=1.34s    p(90)=1.06s   p(95)=1.19s
 iterations.....................: 95      0.949636/s
 vus............................: 1       min=1 max=1
 vus_max........................: 1       min=1 max=1


 58.140.210.244 - - [29/Jun/2021:16:33:33 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:34.396  INFO 2417 --- [nio-8080-exec-2] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=92, email='zxc@naver.com0', age=30}
 58.140.210.244 - - [29/Jun/2021:16:33:34 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:35.431  INFO 2417 --- [nio-8080-exec-3] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=93, email='zxc@naver.com0', age=30}
 58.140.210.244 - - [29/Jun/2021:16:33:35 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:36.469  INFO 2417 --- [nio-8080-exec-4] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=94, email='zxc@naver.com0', age=30}
 58.140.210.244 - - [29/Jun/2021:16:33:36 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:37.509  INFO 2417 --- [nio-8080-exec-5] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=95, email='zxc@naver.com0', age=30}

 성공적으로 생성되는 것을 확인함
 */
```

2. load.js

```
/**
 * ↳ k6 run load.js

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: load.js
 output: -

 scenarios: (100.00%) 1 scenario, 300 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 300 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m41.0s), 000/300 VUs, 23631 complete and 0 interrupted iterations
 default ✓ [======================================] 300 VUs  1m40s

 ✓ created in successfully

 checks.........................: 100.00% ✓ 23631 ✗ 0
 data_received..................: 2.3 MB  23 kB/s
 data_sent......................: 4.7 MB  46 kB/s
 http_req_blocked...............: avg=4.9ms    min=1µs     med=3µs     max=19.18s p(90)=5µs     p(95)=7µs
 http_req_connecting............: avg=4.89ms   min=0s      med=0s      max=19.18s p(90)=0s      p(95)=0s
 ✗ http_req_duration..............: avg=270.8ms  min=17.06ms med=28.22ms max=25.22s p(90)=42.16ms p(95)=69.04ms
 { expected_response:true }...: avg=270.8ms  min=17.06ms med=28.22ms max=25.22s p(90)=42.16ms p(95)=69.04ms
 http_req_failed................: 0.00%   ✓ 0     ✗ 23631
 http_req_receiving.............: avg=30.5µs   min=8µs     med=27µs    max=598µs  p(90)=48µs    p(95)=56µs
 http_req_sending...............: avg=20.76µs  min=6µs     med=18µs    max=1.19ms p(90)=29µs    p(95)=36µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=270.75ms min=17ms    med=28.17ms max=25.22s p(90)=42.09ms p(95)=69ms
 http_reqs......................: 23631   233.907309/s
 iteration_duration.............: avg=1.27s    min=1.01s   med=1.02s   max=26.22s p(90)=1.04s   p(95)=1.07s
 iterations.....................: 23631   233.907309/s
 vus............................: 7       min=7   max=300
 vus_max........................: 300     min=300 max=300

 ERRO[0102] some thresholds have failed
 *
```

3. stress.js

```
/**
 *
 ↳ k6 run stress.js

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: stress.js
 output: -

 scenarios: (100.00%) 1 scenario, 1100 max VUs, 1m57s max duration (incl. graceful stop):
 * default: Up to 1100 looping VUs for 1m27s over 23 stages (gracefulRampDown: 30s, gracefulStop: 30s)


 running (1m28.0s), 0000/1100 VUs, 48335 complete and 0 interrupted iterations
 default ✓ [======================================] 0000/1100 VUs  1m27s

 ✓ created in successfully

 checks.........................: 100.00% ✓ 48335  ✗ 0
 data_received..................: 4.8 MB  55 kB/s
 data_sent......................: 9.6 MB  109 kB/s
 http_req_blocked...............: avg=867.26µs min=1µs     med=3µs     max=1.45s  p(90)=5µs     p(95)=6µs
 http_req_connecting............: avg=862.98µs min=0s      med=0s      max=1.45s  p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=57.5ms   min=17.39ms med=30.91ms max=6.58s  p(90)=44.89ms p(95)=54.25ms
 { expected_response:true }...: avg=57.5ms   min=17.39ms med=30.91ms max=6.58s  p(90)=44.89ms p(95)=54.25ms
 http_req_failed................: 0.00%   ✓ 0      ✗ 48335
 http_req_receiving.............: avg=25.54µs  min=10µs    med=22µs    max=1.28ms p(90)=39µs    p(95)=47µs
 http_req_sending...............: avg=17.07µs  min=6µs     med=14µs    max=629µs  p(90)=25µs    p(95)=33µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=57.46ms  min=17.35ms med=30.87ms max=6.58s  p(90)=44.85ms p(95)=54.21ms
 http_reqs......................: 48335   549.509261/s
 iteration_duration.............: avg=1.05s    min=1.01s   med=1.03s   max=7.91s  p(90)=1.04s   p(95)=1.05s
 iterations.....................: 48335   549.509261/s
 vus............................: 57      min=50   max=1100
 vus_max........................: 1100    min=1100 max=1100

 */
```

**여러 데이터를 참조하는 페이지** - Path: script/MultipleDataLoad

1. smoke.js

```

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: smoke.js
 output: -

 scenarios: (100.00%) 1 scenario, 1 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 1 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m40.5s), 0/1 VUs, 97 complete and 0 interrupted iterations
 default ✓ [======================================] 1 VUs  1m40s

 ✓ find path in successfully
 ✓ distance

 checks.........................: 100.00% ✓ 194 ✗ 0
 data_received..................: 49 kB   483 B/s
 data_sent......................: 14 kB   135 B/s
 http_req_blocked...............: avg=172.47µs min=2µs     med=5µs     max=16.26ms p(90)=7µs     p(95)=8µs
 http_req_connecting............: avg=166.51µs min=0s      med=0s      max=16.15ms p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=32.9ms   min=22.41ms med=32.58ms max=60.87ms p(90)=37.65ms p(95)=40.16ms
 { expected_response:true }...: avg=32.9ms   min=22.41ms med=32.58ms max=60.87ms p(90)=37.65ms p(95)=40.16ms
 http_req_failed................: 0.00%   ✓ 0   ✗ 97
 http_req_receiving.............: avg=297.02µs min=36µs    med=62µs    max=8.4ms   p(90)=291.6µs p(95)=1.57ms
 http_req_sending...............: avg=27.4µs   min=14µs    med=25µs    max=165µs   p(90)=39µs    p(95)=41.59µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=32.58ms  min=22.32ms med=32.26ms max=60.8ms  p(90)=37.21ms p(95)=40.01ms
 http_reqs......................: 97      0.965366/s
 iteration_duration.............: avg=1.03s    min=1.02s   med=1.03s   max=1.06s   p(90)=1.04s   p(95)=1.04s
 iterations.....................: 97      0.965366/s
 vus............................: 1       min=1 max=1
 vus_max........................: 1       min=1 max=1
```

2. load.js

```

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: load.js
 output: -

 scenarios: (100.00%) 1 scenario, 300 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 300 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m41.0s), 000/300 VUs, 27075 complete and 0 interrupted iterations
 default ✓ [======================================] 300 VUs  1m40s

 ✓ find path in successfully
 ✓ distance

 checks.........................: 100.00% ✓ 54150 ✗ 0
 data_received..................: 14 MB   134 kB/s
 data_sent......................: 3.8 MB  38 kB/s
 http_req_blocked...............: avg=1.26ms   min=1µs     med=3µs     max=403.05ms p(90)=5µs     p(95)=6µs
 http_req_connecting............: avg=1.25ms   min=0s      med=0s      max=402.97ms p(90)=0s      p(95)=0s
 ✗ http_req_duration..............: avg=111.01ms min=18.55ms med=33.07ms max=9.88s    p(90)=74.01ms p(95)=209.35ms
 { expected_response:true }...: avg=111.01ms min=18.55ms med=33.07ms max=9.88s    p(90)=74.01ms p(95)=209.35ms
 http_req_failed................: 0.00%   ✓ 0     ✗ 27075
 http_req_receiving.............: avg=762.36µs min=12µs    med=34µs    max=9.66s    p(90)=87µs    p(95)=543µs
 http_req_sending...............: avg=15.97µs  min=5µs     med=13µs    max=738µs    p(90)=23µs    p(95)=29µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=110.23ms min=18.08ms med=32.88ms max=9.59s    p(90)=73.51ms p(95)=205.59ms
 http_reqs......................: 27075   267.974598/s
 iteration_duration.............: avg=1.11s    min=1.01s   med=1.03s   max=10.89s   p(90)=1.07s   p(95)=1.21s
 iterations.....................: 27075   267.974598/s
 vus............................: 17      min=17  max=300
 vus_max........................: 300     min=300 max=300

 ERRO[0102] some thresholds have failed
```

3. stress.js

```
/**
 * ↳ k6 run stress.js

 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: stress.js
 output: -

 scenarios: (100.00%) 1 scenario, 1100 max VUs, 1m57s max duration (incl. graceful stop):
 * default: Up to 1100 looping VUs for 1m27s over 23 stages (gracefulRampDown: 30s, gracefulStop: 30s)


 running (1m27.9s), 0000/1100 VUs, 49151 complete and 0 interrupted iterations
 default ✓ [======================================] 0000/1100 VUs  1m27s

 ✓ find path in successfully
 ✓ distance

 checks.........................: 100.00% ✓ 98302  ✗ 0
 data_received..................: 25 MB   280 kB/s
 data_sent......................: 6.9 MB  78 kB/s
 http_req_blocked...............: avg=692.8µs  min=1µs     med=3µs     max=1.31s    p(90)=5µs     p(95)=6µs
 http_req_connecting............: avg=688.46µs min=0s      med=0s      max=1.31s    p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=39.96ms  min=17.67ms med=34.71ms max=646.45ms p(90)=60.03ms p(95)=74.1ms
 { expected_response:true }...: avg=39.96ms  min=17.67ms med=34.71ms max=646.45ms p(90)=60.03ms p(95)=74.1ms
 http_req_failed................: 0.00%   ✓ 0      ✗ 49151
 http_req_receiving.............: avg=321.87µs min=11µs    med=32µs    max=485.69ms p(90)=91µs    p(95)=646.5µs
 http_req_sending...............: avg=14.61µs  min=5µs     med=12µs    max=343µs    p(90)=21µs    p(95)=28µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=39.62ms  min=17.61ms med=34.55ms max=646.42ms p(90)=59.66ms p(95)=73.65ms
 http_reqs......................: 49151   559.045688/s
 iteration_duration.............: avg=1.04s    min=1.01s   med=1.03s   max=2.36s    p(90)=1.06s   p(95)=1.07s
 iterations.....................: 49151   559.045688/s
 vus............................: 51      min=50   max=1100
 vus_max........................: 1100    min=1100 max=1100

```

---

**TODO**

접근 페이지 - http://13.124.137.208:8080/

- [x] 웹 성능 테스트
  - [x] 웹 성능 예산을 작성

    - First Centenful Paint 는 '3초 미만'까지 허용가능하다.
    - Largest Contentful Paint 는 '5초 미만'까지 허용 가능하다.
    - Time to Interactive 는 '3초 미만' 까지 허용 가능하다.
    - Speed Index 는 '3초 미만'까지 허용 가능하다

    - Lighthouse 는 85점까지 허용 가능하다.

  - [x] [WebPageTest](https://www.webpagetest.org/), [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) 등 테스트해보고 개선이 필요한 부분을 파악

    - **PageSpeed**

      |                          | Mobile   | Desktop  | 내용 |
      | ------------------------ | -------- | -------- | ---- |
      | First Contentful Paint   | 14.9s    | 2.6s     |      |
      | Time to Interactive      | 15.6s    | 2.7s     |      |
      | Speed Index              | 14.9s    | 2.6s     |      |
      | Total Blocking Time      | 650ms    | 50ms     |      |
      | Largest Contentful Paint | 15.5s    | 2.7s     |      |
      | Cumulative Layout Shift  | 0.047    | 0.003    |      |
      | Total Score              | 29 score | 69 score |      |

      개선해야 될 부분(Desktop 기준)

      - 텍스트 압축 활성화(Enable Text compression) -1.44s  
      - 사용하지 않는 자바 스크립트 줄이기(Reduce unused JavaScript) - 0.56s

    - **webpagetest** (https://www.webpagetest.org/result/210629_BiDcTB_4bc02a8ddcd76150bea0c8e552345427/1/details/)

      ![image-20210629162400921](https://tva1.sinaimg.cn/large/008i3skNgy1grz602f1y5j30xe07et9c.jpg)

      |                      | Score | 문제점                                              |
      | -------------------- | ----- | --------------------------------------------------- |
      | Security Score       | F     | TLS및 HTTP 헤더 비용                                |
      | Fist Byte Time       | A     |                                                     |
      | Keep-alive Enabled   | A     |                                                     |
      | Compress Transfer    | F     | gzip 압축을 하지 않아 발생함.                       |
      | Compress Images      | A     |                                                     |
      | Cache static content | C     | JS, CSS, 이미지, 웹 폰트 등 정적 컨텐츠를 캐싱 문제 |

      

- [x] 부하 테스트

  - [x] 테스트 전제조건 정리
    - [x] 대상 시스템 범위

      https://3.36.116.216/ 서버 1대

    - [x] 목푯값 설정 (latency, throughput, 부하 유지기간)

      - 1일 사용자 수(DAU) - 10000명
      - 피크 시간대에는 집중률 - 10배
      - 1명당 1일 평균 접속 혹은 요청수 - 30000(1명은 한 화면에 3번정도 누른다고 가정하면)
      - Throughput
        - 9,000,000(DAU) * 3 (1명당 1일 평균 접속수) = 27,000,000(1일 총 접속 수)
        - 27,000,000 / 86,400 = **312.5**(1일 평균 RPS)
        - **3125**(1일 최대 RPS)
      - Latency - 100ms

    - [x] 부하 테스트 시 저장될 데이터 건수 및 크기

      - 10,000,000 건의 데이터 활용
  - [x] 각 시나리오에 맞춰 스크립트 작성
    - [x] 접속 빈도가 높은 페이지
      - 로그인 화면
    - [x] 데이터를 갱신하는 페이지
      - 패스워드를 갱신하는 페이지
    - [x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
      - 경로 조회하는 페이지
  - [x] Smoke, Load, Stress 테스트 후 결과를 기록

