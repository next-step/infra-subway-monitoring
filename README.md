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
   * 3.36.115.85 (https://lkimilhol-subway.p-e.kr/) - lkimilhol-EC2-external  
        로그백을 이용한 애플리케이션 로깅: /home/ubuntu/infra-subway-monitoring/log
        nginx 로그: /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-lkimilhol
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    * 응답 시간 3초이내
    * webPage 성능 테스트 전체 등급 A
    * PageSpeed Insights 점수 90점 이상

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    * 보안 체크 (헤더에 아래 필드들을 점검)
        * X-Content-Type-Option
        * X-Frame-Option Check
        * X-XSS-Protection
    * 패킷 전송시 gzip 압축을 이용
    * 클라이언트 사이드에서 캐싱을 이용(데이터 캐시,  특히 메인 페이지의 캐싱 점수가 낮음)  
      *요청 수 대비 파일 전송 크기를 줄이는 효과 까지 획득 할 수 있음*
    * CDN을 이용하여 이미지 업로드
    * 클라이언트 사이드 레이지 로딩, 리소스 다운로드를 지연 다운로딩, 이미지 미리 로드

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
* Smoke
   > vus: 1, durations: 10s (1명의 사용자가 10초동안)<br>
   > thresholds: http_req_duration['p(99)<1500'] (모든 요청의 99%는 1500ms 시간 안에 처리가 되어야 함) 
   
* Load
   > 1차<br>
        stages: [<br>
        { duration: '1m', target: 100 } (1분동안 vus100)<br> 
        { duration: '2m', target: 300 } (2분동안 서서히 증가하여 vus300)<br>
        { duration: '10s', target: 0 } (10초동안 vus10)<br>
        ],<br>
         thresholds:<br> 
            http_req_duration: ['p(99)<1500'] (모든 요청의 99%는 1500ms 시간 안에 처리가 되어야 함)<br>,
            'logged in successfully': ['p(99)<1500'](모든 로그인의 99%는 1500ms 시간 안에 성공 되어야 함) <br>

  > 2차<br>
  stages: [<br>
  { duration: '1m', target: 100 } (1분동안 vus100)<br>
  { duration: '2m', target: 300 } (2분동안 서서히 증가하여 vus200)<br>
  > { duration: '2m', target: 450 } (2분동안 서서히 증가하여 vus300)<br>
  > { duration: '2m', target: 150 } (2분동안 서서히 감소하여 vus200)<br>
  > { duration: '2m', target: 100 } (2분동안 서서히 감소하여 vus100)<br>
  { duration: '10s', target: 0 } (10초동안 vus10)<br>
  ],<br>
  thresholds:<br>
  http_req_duration: ['p(99)<1500'] (모든 요청의 99%는 1500ms 시간 안에 처리가 되어야 함)<br>,
  'logged in successfully': ['p(99)<1500'](모든 로그인의 99%는 1500ms 시간 안에 성공 되어야 함) <br>

  > 3차<br>
  stages: [<br>
  { duration: '1m', target: 300 } (1분동안 vus300)<br>
  { duration: '1m', target: 400 } (1분동안 vus400)<br>
  > { duration: '1m', target: 500 } (1분동안 vus500)<br>
  > { duration: '1m', target: 400 } (1분동안 vus400)<br>
  { duration: '10s', target: 0 } (10초동안 vus10)<br>
  ],<br>
  thresholds:<br>
  http_req_duration: ['p(99)<1500'] (모든 요청의 99%는 1500ms 시간 안에 처리가 되어야 함)<br>,
  'logged in successfully': ['p(99)<1500'](모든 로그인의 99%는 1500ms 시간 안에 성공 되어야 함) <br>

* Stress
  >stages: [<br>
  { duration: '1m', target: 500 } (1분동안 증가하여 vus500)<br>
  > { duration: '5m', target: 500 } (5분동안 유지 vus500)<br>
  { duration: '10s', target: 0 } (10초동안 vus10)<br>
  ],<br>
  thresholds:<br>
  http_req_duration: ['p(99)<1500'] (모든 요청의 99%는 1500ms 시간 안에 처리가 되어야 함)<br>,
  'logged in successfully': ['p(99)<1500'](모든 로그인의 99%는 1500ms 시간 안에 성공 되어야 함) <br>

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

* Smoke



    scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
    * default: 1 looping VUs for 10s (gracefulStop: 30s)
    running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
    default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 12 kB   1.1 kB/s
     data_sent......................: 5.8 kB  564 B/s
     http_req_blocked...............: avg=1.64ms  min=4.1µs   med=7.98µs  max=32.72ms  p(90)=15.46µs p(95)=1.67ms
     http_req_connecting............: avg=66.47µs min=0s      med=0s      max=1.32ms   p(90)=0s      p(95)=66.47µs
    ✓ http_req_duration..............: avg=8.33ms  min=6.85ms  med=7.77ms  max=13.66ms  p(90)=9.75ms  p(95)=12.91ms
    { expected_response:true }...: avg=8.33ms  min=6.85ms  med=7.77ms  max=13.66ms  p(90)=9.75ms  p(95)=12.91ms
    http_req_failed................: 0.00%   ✓ 0        ✗ 20
    http_req_receiving.............: avg=73.61µs min=45.24µs med=74.8µs  max=108.94µs p(90)=92.05µs p(95)=102.26µs
    http_req_sending...............: avg=27.08µs min=12.35µs med=26.08µs max=93.35µs  p(90)=32.1µs  p(95)=35.45µs
    http_req_tls_handshaking.......: avg=1.53ms  min=0s      med=0s      max=30.71ms  p(90)=0s      p(95)=1.53ms
    http_req_waiting...............: avg=8.23ms  min=6.74ms  med=7.65ms  max=13.59ms  p(90)=9.65ms  p(95)=12.81ms
    http_reqs......................: 20      1.958369/s
    iteration_duration.............: avg=1.02s   min=1.01s   med=1.01s   max=1.05s    p(90)=1.02s   p(95)=1.04s
    iterations.....................: 10      0.979185/s
    vus............................: 1       min=1      max=1
    vus_max........................: 1       min=1      max=1

* Load

      
      1차
      scenarios: (100.00%) 1 scenario, 300 max VUs, 3m40s max duration (incl. graceful stop):
      * default: Up to 300 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      running (3m10.9s), 000/300 VUs, 28306 complete and 0 interrupted iterations
      default ✓ [======================================] 000/300 VUs  3m10s
      ✓ logged in successfully
      ✓ retrieved memberchecks.........................: 100.00% ✓ 56612      ✗ 0
     data_received..................: 21 MB   112 kB/s
     data_sent......................: 15 MB   80 kB/s
     http_req_blocked...............: avg=41.91µs min=3.29µs  med=4.82µs  max=41.43ms p(90)=6.82µs  p(95)=8.3µs
     http_req_connecting............: avg=7.36µs  min=0s      med=0s      max=14.68ms p(90)=0s      p(95)=0s
     ✓ http_req_duration..............: avg=4.58ms  min=2.75ms  med=3.99ms  max=47.22ms p(90)=6.56ms  p(95)=8.08ms
     { expected_response:true }...: avg=4.58ms  min=2.75ms  med=3.99ms  max=47.22ms p(90)=6.56ms  p(95)=8.08ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 56612
     http_req_receiving.............: avg=52.91µs min=20.34µs med=49.21µs max=18.31ms p(90)=65.34µs p(95)=74.39µs
     http_req_sending...............: avg=21.47µs min=8.18µs  med=16.85µs max=6.34ms  p(90)=30.44µs p(95)=39.36µs
     http_req_tls_handshaking.......: avg=28.47µs min=0s      med=0s      max=32.13ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=4.51ms  min=2.67ms  med=3.91ms  max=47.12ms p(90)=6.48ms  p(95)=8ms
     http_reqs......................: 56612   296.515597/s
     iteration_duration.............: avg=1.01s   min=1s      med=1s      max=1.05s   p(90)=1.01s   p(95)=1.01s
     iterations.....................: 28306   148.257799/s
     vus............................: 14      min=2        max=299
     vus_max........................: 300     min=300      max=300

      2차
      scenarios: (100.00%) 1 scenario, 450 max VUs, 7m40s max duration (incl. graceful stop):
           * default: Up to 450 looping VUs for 7m10s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)
      running (7m11.0s), 000/450 VUs, 107580 complete and 0 interrupted iterations
      default ✓ [======================================] 000/450 VUs  7m10s
     ✓ logged in successfully
     ✓ retrieved member
     checks.........................: 100.00% ✓ 215160     ✗ 0
     data_received..................: 78 MB   180 kB/s
     data_sent......................: 58 MB   134 kB/s
     http_req_blocked...............: avg=19.39µs min=2.95µs  med=4.69µs  max=33.11ms  p(90)=6.15µs  p(95)=7.12µs
     http_req_connecting............: avg=2.9µs   min=0s      med=0s      max=16.71ms  p(90)=0s      p(95)=0s
     ✓ http_req_duration..............: avg=5.69ms  min=2.66ms  med=4.32ms  max=243.4ms  p(90)=8.95ms  p(95)=12.62ms
     { expected_response:true }...: avg=5.69ms  min=2.66ms  med=4.32ms  max=243.4ms  p(90)=8.95ms  p(95)=12.62ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 215160
     http_req_receiving.............: avg=50.41µs min=19.95µs med=46.64µs max=16.45ms  p(90)=61.34µs p(95)=70.44µs
     http_req_sending...............: avg=20.97µs min=8.75µs  med=16.28µs max=10.85ms  p(90)=26.7µs  p(95)=34.31µs
     http_req_tls_handshaking.......: avg=11.11µs min=0s      med=0s      max=31.23ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=5.62ms  min=2.62ms  med=4.24ms  max=243.34ms p(90)=8.87ms  p(95)=12.54ms
     http_reqs......................: 215160  499.222624/s
     iteration_duration.............: avg=1.01s   min=1s      med=1s      max=1.37s    p(90)=1.01s   p(95)=1.02s
     iterations.....................: 107580  249.611312/s
     vus............................: 0       min=0        max=450
     vus_max........................: 450     min=450      max=450

      3차
      running (4m10.9s), 000/500 VUs, 82783 complete and 0 interrupted iterations
      default ✓ [======================================] 000/500 VUs  4m10s

     ✗ logged in successfully
      ↳  99% — ✓ 82115 / ✗ 668
     ✓ retrieved member

     checks.........................: 99.59% ✓ 164230     ✗ 668
     data_received..................: 161 MB 640 kB/s
     data_sent......................: 54 MB  214 kB/s
     http_req_blocked...............: avg=5.69ms   min=0s      med=4.74µs  max=224.37ms p(90)=18.21ms p(95)=42.43ms
     http_req_connecting............: avg=436.68µs min=0s      med=0s      max=76.27ms  p(90)=1.44ms  p(95)=2.36ms
     ✓ http_req_duration..............: avg=18.76ms  min=0s      med=6.16ms  max=467.38ms p(90)=50.26ms p(95)=82.82ms
     { expected_response:true }...: avg=18.8ms   min=2.79ms  med=6.17ms  max=467.38ms p(90)=50.41ms p(95)=82.98ms
     http_req_failed................: 0.40%  ✓ 668        ✗ 164230
     http_req_receiving.............: avg=56.8µs   min=0s      med=43.94µs max=38.65ms  p(90)=60.71µs p(95)=71.05µs
     http_req_sending...............: avg=101.16µs min=0s      med=16.63µs max=55.07ms  p(90)=51.42µs p(95)=145.66µs
     http_req_tls_handshaking.......: avg=5.23ms   min=0s      med=0s      max=220.52ms p(90)=15.62ms p(95)=38.87ms
     http_req_waiting...............: avg=18.6ms   min=0s      med=6.09ms  max=467.29ms p(90)=49.69ms p(95)=82.28ms
     http_reqs......................: 164898 657.271498/s
     iteration_duration.............: avg=1.04s    min=306.6µs med=1.01s   max=1.74s    p(90)=1.15s   p(95)=1.22s
     iterations.....................: 82783  329.967049/s
     vus............................: 21     min=5        max=500
     vus_max........................: 500    min=500      max=500

* Stress


    running (6m10.9s), 000/500 VUs, 143217 complete and 0 interrupted iterations
    default ↓ [======================================] 019/500 VUs  6m10s
     ✗ logged in successfully
      ↳  89% — ✓ 127963 / ✗ 15254
     ✓ retrieved member

     checks.........................: 94.37% ✓ 255796     ✗ 15254
     data_received..................: 607 MB 1.6 MB/s
     data_sent......................: 119 MB 322 kB/s
     http_req_blocked...............: avg=47.53ms  min=0s       med=5.39µs  max=792.17ms p(90)=166.7ms  p(95)=244.25ms
     http_req_connecting............: avg=10.33ms  min=0s       med=0s      max=323.27ms p(90)=33.32ms  p(95)=67.98ms
    ✓ http_req_duration..............: avg=94.75ms  min=0s       med=71.52ms max=1.34s    p(90)=209.25ms p(95)=260.05ms
    { expected_response:true }...: avg=97.13ms  min=2.83ms   med=73.97ms max=1.34s    p(90)=212.35ms p(95)=263.45ms
    http_req_failed................: 5.67%  ✓ 15384      ✗ 255796
    http_req_receiving.............: avg=299.13µs min=0s       med=35.4µs  max=243.11ms p(90)=60.26µs  p(95)=148.14µs
    http_req_sending...............: avg=3.76ms   min=0s       med=23.78µs max=396.22ms p(90)=9.93ms   p(95)=23.05ms
    http_req_tls_handshaking.......: avg=36.9ms   min=0s       med=0s      max=789.41ms p(90)=131.02ms p(95)=180.07ms
    http_req_waiting...............: avg=90.68ms  min=0s       med=68.49ms max=1.34s    p(90)=199.25ms p(95)=250.67ms
    http_reqs......................: 271180 731.084868/s
    iteration_duration.............: avg=1.17s    min=289.31µs med=1.21s   max=2.64s    p(90)=1.6s     p(95)=1.69s
    iterations.....................: 143217 386.104364/s
    vus............................: 19     min=9        max=500
    vus_max........................: 500    min=500      max=500
## 1단계 요구사항

* logback 설정 하기
* 로직에 로그를 심기
* 배포하여 로그가 파일로 제대로 남는지 체크
* Nginx Log 도커 마운트
* 클라우드 왓치 롤설정
* 클라우드 왓치 로그 에어전트 설치
* 로그 수집
* EC2 메트릭 수집
* 클라우드 메트릭스 대시보드 생성

## 1단계 질문

Q.  file 로깅에서 모든 파라메터를 남기는것은 파일 로깅을 하는 모든 메서드의 파라메터를 모두 조회하기 때문에 로그가 너무 광범위해지고 많은 메서드에 대해 많은 로그가 남는다는것이고

이번 PathLogging의 경우에는 경로 조회에 한하여 남기는 로기이기 때문에 이 로그의 경우에는 모든 argument까지 확인을 하여 의미 있는 로깅을 하도록 하자.

라고 이해해도 괜찮을까요?!

A. 
FileLogging 이든 PathLogging이든 적당한 단위로 제대로된 정보를 모두 남기고 있는지를 말씀드렸습니다.

1. log 분산
```
pathLogger.info("{}", joinPoint.getSignature().getName());
for (Object arg : joinPoint.getArgs()) {
pathLogger.info("{}, {}", REQUEST_PARAM, arg);
}
```
하나의 요청을 여러개의 로그로 분산해서 작성하고 있습니다. 분산 어플리케이션 멀티 스레드 환경에서 하나의 메서드에 대한 호출에서 무수히 많은 로그가 작성될 것이며, 이 로그는 가독도 충분하지도 않습니다.

멀티 스레드 환경에서 요청을 동시에 처리한다고 해봅니다.
```
AClassName
RequestParam, a
AClassName
RequestParam, a
RequestParam, b
RequestParam, c
AClassName
RequestParam, b
RequestParam, b
RequestParam, c
RequestParam, c
```
어떤 로그가 어떤 요청으로부터의 로그인지 확인이 어려우며, 트랜잭션 아이디를 로그에 부여한다고 하여도 가독이 매우 떨어집니다.

하나의 요청은 하나의 라인으로 작성하는 것이 좋습니다.
```
AClassName. a=a, b=b, c=c
AClassName. a=a, b=b, c=c
AClassName. a=a, b=b, c=c
```
2. 일반화 로그
PathLogging, FileLogging 을 언제 어느 곳에 적용해야할지 알기 어렵습니다. 또한 이 로그가 몇번째 argument 까지 로깅을 하는지도 매번 메서드를 작성할 때마다 그 순서와 중요한 매개변수가 무엇인지 확인해야합니다. 일반화를 할 것이라면, 메서드에 대한 모든 실행 정보를 하나의 라인에 충분하게 작성해야합니다.
   

Q. FileLogging 애노테이션을 사용하다보니, 말씀하신대로 이 애노티에션을 어떻게 어디에 써야 할지 조금 찜찜한 구석이 많아 컨트롤러에서 직접 로그를 찍게 하였습니다. (원래 애노테이션을 사용해서 한줄에 요청 응답을 남기도록 하였는데요. 다시 수정했습니다.)

컨트롤러에서 직접 파일로거의 이름을 명시해서 로거를 생상하였는데요. 보통은 LoggerFactory.getLogger(클래스.class) 식으로 로거를 생성하여 로거를 남기는 것으로 알고있는데요. 이렇게 하니 로그 파일에 제가 logger.info(로그 내용) 로 명시한 부분외로도 많은 로그들이 (같은 레벨의) 남게 되더라구요. 그래서 원하는 정보만 찍기 위해 LoggerFactory.getLogger("file") 식으로 로거를 생성하였습니다.

그런데 제가 한 방법이 옳은지를 잘 모르겠네요... LoggerFactory.getLogger(클래스.class) 식으로 생성하면 xml에서 패키지명을 지정할 순 있지만 그래도 다른 로그들이 찍혀버리고(스프링 부트의 로깅들...), xml 파일에 로거 설정에서 클래스명까지 명시하면 클래스마다 로거 설정을 새로 등록해야 하니 이 방법은 잘못된거 같았구요...! 아니면 LoggerFactory.getLogger(클래스.class) 내용들은 콘솔로만 출력하는것이 맞을지...
혹시 관련하여 피드백 한번 부탁드려도 될까요...?!

큰 수정 내용이 별로 없어야 했는데, 고민을 너무 깊게한거 같네요 ㅠㅠ 오랜시간이 걸렸습니다...!
피드벡 부탁드리겠습니다! 감사합니다!

ps. 혹시 실무에서는 애노테이션으로 서비스레이어에 로깅을 하는 방법은 사용하지 않나요?

A. 

1. 스프링의 로그가 함께 남는 것이 잘못된 일이라고 생각되지는 않습니다. 다만 지나치게 불필요한 다른 레벨의 로그들이 남을 수 있으니, 스프링 패키지에 대해 로그레벨을 별도로 지정해주어 해소될 수 있습니다. 서비스를 구성하면서 로그가 어디에 남을지를 고민하지는 않고 있으며, 필요한 경우 로그레벨에 대한 분리 정도는 하고 있습니다. 이것은 xml 의 설정만으로 구성이 가능합니다.

2. 애노테이션으로 서비스레이어에 로깅을 하는 방법은 거의 사용되지 않습니다. 각 서비스에 의미있는 로그 구성이 도움이 되기 때문에 일반화하여 작성하지 않고 있습니다. 대신 우리가 제어할 수 없는 특정 구간(http, event listener 등)에 대해서는 AOP나 Filter 를 사용하여 일반화된 로그를 남기고 있고, 이 때에는 모든 정보를 로그를 남기고 있습니다. 