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
    - fdevjc-EC2-rp (nginx)
        - public ip : 52.78.185.113
        - private ip : 192.168.24.4
        - log (access) : /var/log/nginx/access.log
        - log (error) : /var/log/nginx/error.log
    - fdevjc-EC2-web
        - public ip : 13.209.11.247
        - private ip : 192.168.24.29
        - log : /home/ubuntu/subway/log
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-fdevjc
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
>###웹 성능 예산 목표
>- First Contentful Paint(FCP) : 3.0s 이내
>- Largest Contentful Paint(LCP) : 7.0s 이내
>- Cumulative Layout Shift(CLS) : 0.020 이내
>- Speed Index : 7.0s
>- Time to Interactive : 7.0s
>- Total Blocking Time : 300ms

###타사 성능 비교 측정
- 측정에 사용된 도구 : [PageSpeed](https://developers.google.com/speed/pagespeed/insights/)

>#### RunningMap
>- First Contentful Paint(FCP) : 15.4s
>- Largest Contentful Paint(LCP) : 16.0s
>- Cumulative Layout Shift(CLS) : 0.041
>- Speed Index : 15.4s
>- Time to Interactive : 16.0s
>- Total Blocking Time : 530ms
>- Score : 32

>#### N사 지도
>- First Contentful Paint(FCP) : 3.0s
>- Largest Contentful Paint(LCP) : 6.9s
>- Cumulative Layout Shift(CLS) : 0.017
>- Speed Index : 6.3s
>- Time to Interactive : 6.9s
>- Total Blocking Time : 290ms
>- Score : 56

>#### K사 지도
>- First Contentful Paint(FCP) : 2.5s
>- Largest Contentful Paint(LCP) : 5.8s
>- Cumulative Layout Shift(CLS) : 0.005
>- Speed Index : 6.4s
>- Time to Interactive : 5.3s
>- Total Blocking Time : 130ms
>- Score : 66

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축 사용
- 사용하지 않는 자바스크립트 줄이기
- 사용하지 않는 CSS 줄이기
- 웹 캐싱처리

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
>#### 예상 1일 사용자 수(DAU)
>- 지하철 하루 평균인원 약 746만명
>- RunningMap 이용자수 약 100분의 1 : 7만명
>- 예상 DAU : 70,000

>#### 피크 시간대 집중률(최대 트래픽/평소 트래픽)
>- 출퇴근 시간 (AM 07:00 ~ 09:00 , PM 18:00 ~ 20:00)
>- 1명당 1일 평균 접속 혹은 요청수를 예상
   >   - 출퇴근 : 2회
>   - 기타 : 1회
>   - 예상 요청수(메인 페이지-> 로그인 페이지-> 로그인-> 경로탐색or즐겨찾기 -> 경로확인) : 5회
>   - 3(1일평균접속) * 5(예상요청수) = 15
>   - 최대 트래픽 : 70,000 * 5 = 350,000
>   - 평소 트래픽 : 350,000 / 10 = 35,000

>#### Throughput계산
>* Throughput : 1일 평균 rps ~ 1일 최대 rps
>  - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
      
>     - 70,000 x 3 = 210,000
>  - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
      
>       - 210,000 / 86,400 = 2.43
>  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
>       - 2.43 x (350,000 / 35,000) = 24.3
>* Latency : 일반적으로 50~100ms이하로 잡는 것이 좋습니다.
>* 사용자가 검색하는 데이터의 양, 갱신하는 데이터의 양 등을 파악해둡니다.

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- ###접속 빈도가 높은 기능
  - ####메인 화면 (메인화면-로그인)
    - smoke
      - [Script](./k6-script/main-page/smoke.js)
      - ```renderscript
        checks.........................: 100.00% ✓ 1964       ✗ 0
        data_received..................: 1.6 MB  164 kB/s
        data_sent......................: 335 kB  34 kB/s
        http_req_blocked...............: avg=68.43µs min=3.61µs med=4.35µs  max=120.21ms p(90)=5.31µs  p(95)=6.38µs
        http_req_connecting............: avg=460ns   min=0s     med=0s      max=479.99µs p(90)=0s      p(95)=0s
        ✓ http_req_duration..............: avg=4.86ms  min=1.76ms med=5.16ms  max=106.44ms p(90)=8.19ms  p(95)=9.02ms
        { expected_response:true }...: avg=4.86ms  min=1.76ms med=5.16ms  max=106.44ms p(90)=8.19ms  p(95)=9.02ms
        http_req_failed................: 0.00%   ✓ 0          ✗ 1964
        http_req_receiving.............: avg=47.96µs min=29µs   med=38.04µs max=1.56ms   p(90)=67.36µs p(95)=77.58µs
        http_req_sending...............: avg=16.76µs min=9.95µs med=15.08µs max=459.43µs p(90)=18.77µs p(95)=26.75µs
        http_req_tls_handshaking.......: avg=23.5µs  min=0s     med=0s      max=42.37ms  p(90)=0s      p(95)=0s
        http_req_waiting...............: avg=4.8ms   min=1.72ms med=5.11ms  max=106.32ms p(90)=8.12ms  p(95)=8.97ms
        http_reqs......................: 1964    196.322615/s
        iteration_duration.............: avg=10.17ms min=7.34ms med=9.39ms  max=232.8ms  p(90)=12.15ms p(95)=13.44ms
        iterations.....................: 982     98.161307/s
        vus............................: 1       min=1        max=1
        vus_max........................: 1       min=1        max=1
        ```
      
    - load
      - [Script](./k6-script/main-page/load.js)
      - ```renderscript
        checks.........................: 100.00% ✓ 82068      ✗ 0
        data_received..................: 70 MB   997 kB/s
        data_sent......................: 14 MB   201 kB/s
        http_req_blocked...............: avg=1.27ms   min=3.12µs  med=4.38µs   max=876.94ms p(90)=9.39µs   p(95)=28.11µs
        http_req_connecting............: avg=429.45µs min=0s      med=0s       max=417.26ms p(90)=0s       p(95)=0s
        ✓ http_req_duration..............: avg=72.54ms  min=1.51ms  med=50.82ms  max=651.29ms p(90)=164.7ms  p(95)=219.2ms
        { expected_response:true }...: avg=72.54ms  min=1.51ms  med=50.82ms  max=651.29ms p(90)=164.7ms  p(95)=219.2ms
        http_req_failed................: 0.00%   ✓ 0          ✗ 82068
        http_req_receiving.............: avg=555.56µs min=22.38µs med=39.67µs  max=245.6ms  p(90)=274.59µs p(95)=440.06µs
        http_req_sending...............: avg=503.78µs min=9.26µs  med=16.03µs  max=215.25ms p(90)=131.25µs p(95)=229.03µs
        http_req_tls_handshaking.......: avg=827.09µs min=0s      med=0s       max=676.9ms  p(90)=0s       p(95)=0s
        http_req_waiting...............: avg=71.48ms  min=1.47ms  med=50.32ms  max=549.06ms p(90)=161.97ms p(95)=215.32ms
        http_reqs......................: 82068   1172.08292/s
        iteration_duration.............: avg=148.4ms  min=5.52ms  med=101.46ms max=1.46s    p(90)=340.26ms p(95)=452.55ms
        iterations.....................: 41034   586.04146/s
        vus............................: 1       min=1        max=300
        vus_max........................: 300     min=300      max=300
        ```

    - stress
      - [Script](./k6-script/main-page/stress.js)
      - ```renderscript
        checks.........................: 100.00% ✓ 70160       ✗ 0
        data_received..................: 60 MB   1.1 MB/s
        data_sent......................: 12 MB   219 kB/s
        http_req_blocked...............: avg=2.72ms   min=3.19µs  med=4.46µs   max=1.12s    p(90)=9.91µs   p(95)=33.03µs
        http_req_connecting............: avg=933.87µs min=0s      med=0s       max=607.87ms p(90)=0s       p(95)=0s
        ✓ http_req_duration..............: avg=179.6ms  min=1.43ms  med=177.13ms max=818.49ms p(90)=295.1ms  p(95)=339.65ms
        { expected_response:true }...: avg=179.6ms  min=1.43ms  med=177.13ms max=818.49ms p(90)=295.1ms  p(95)=339.65ms
        http_req_failed................: 0.00%   ✓ 0           ✗ 70160
        http_req_receiving.............: avg=983.89µs min=23.08µs med=40.64µs  max=252.5ms  p(90)=318.46µs p(95)=523.14µs
        http_req_sending...............: avg=874.67µs min=9.15µs  med=16.39µs  max=200.33ms p(90)=153.64µs p(95)=274.26µs
        http_req_tls_handshaking.......: avg=1.77ms   min=0s      med=0s       max=873.43ms p(90)=0s       p(95)=0s
        http_req_waiting...............: avg=177.74ms min=1.38ms  med=176.09ms max=722.96ms p(90)=291.23ms p(95)=334.69ms
        http_reqs......................: 70160   1274.410703/s
        iteration_duration.............: avg=365.48ms min=5.73ms  med=364.01ms max=1.72s    p(90)=606.18ms p(95)=717.77ms
        iterations.....................: 35080   637.205352/s
        vus............................: 42      min=10        max=400
        vus_max........................: 400     min=400       max=400
        ```


- ###서버 리소스 소비량이 높은 기능
  - ####경로 탐색 (메인화면-로그인-경로탐색-즐겨찾기추가-즐겨찾기목록)
    - ####smoke
      - [Script](./k6-script/path-page/smoke.js)
      - 
        ```renderscript   
        checks.........................: 100.00% ✓ 1266      ✗ 0
        data_received..................: 964 kB  96 kB/s
        data_sent......................: 276 kB  28 kB/s
        http_req_blocked...............: avg=95.48µs min=3.74µs  med=4.43µs  max=109.75ms p(90)=5.57µs  p(95)=6.89µs
        http_req_connecting............: avg=807ns   min=0s      med=0s      max=572.8µs  p(90)=0s      p(95)=0s
        ✓ http_req_duration..............: avg=7.63ms  min=1.69ms  med=5.04ms  max=58.53ms  p(90)=15.79ms p(95)=18.37ms
        { expected_response:true }...: avg=7.63ms  min=1.69ms  med=5.04ms  max=58.53ms  p(90)=15.79ms p(95)=18.37ms
        http_req_failed................: 0.00%   ✓ 0         ✗ 1266
        http_req_receiving.............: avg=54.43µs min=31.15µs med=46.53µs max=399.35µs p(90)=72.14µs p(95)=85.13µs
        http_req_sending...............: avg=17.71µs min=11.17µs med=16.01µs max=346.82µs p(90)=18.99µs p(95)=33.09µs
        http_req_tls_handshaking.......: avg=26.28µs min=0s      med=0s      max=29.29ms  p(90)=0s      p(95)=0s
        http_req_waiting...............: avg=7.56ms  min=1.64ms  med=4.97ms  max=58.4ms   p(90)=15.73ms p(95)=18.3ms
        http_reqs......................: 1266    126.3635/s
        iteration_duration.............: avg=23.71ms min=17.5ms  med=21.98ms max=207.58ms p(90)=28.54ms p(95)=32.44ms
        iterations.....................: 422     42.121167/s
        vus............................: 1       min=1       max=1
        vus_max........................: 1       min=1       max=1
        ```    
    - ####load
      - [Script](./k6-script/path-page/smoke.js)
      - ```renderscript
        checks.........................: 100.00% ✓ 57219      ✗ 0
        data_received..................: 42 MB   598 kB/s
        data_sent......................: 13 MB   179 kB/s
        http_req_blocked...............: avg=111.84µs min=3.16µs  med=4.38µs   max=384.82ms p(90)=7.5µs    p(95)=23.22µs
        http_req_connecting............: avg=32.13µs  min=0s      med=0s       max=160.39ms p(90)=0s       p(95)=0s
        ✓ http_req_duration..............: avg=88.41ms  min=1.53ms  med=48.35ms  max=1.16s    p(90)=240.59ms p(95)=287.88ms
        { expected_response:true }...: avg=88.41ms  min=1.53ms  med=48.35ms  max=1.16s    p(90)=240.59ms p(95)=287.88ms
        http_req_failed................: 0.00%   ✓ 0          ✗ 57219
        http_req_receiving.............: avg=140.62µs min=23.62µs med=42.1µs   max=130ms    p(90)=186.93µs p(95)=324.37µs
        http_req_sending...............: avg=99.98µs  min=9.23µs  med=15.17µs  max=96.3ms   p(90)=52.12µs  p(95)=155.19µs
        http_req_tls_handshaking.......: avg=68.75µs  min=0s      med=0s       max=264.75ms p(90)=0s       p(95)=0s
        http_req_waiting...............: avg=88.17ms  min=1.44ms  med=48.15ms  max=1.16s    p(90)=240.24ms p(95)=287.57ms
        http_reqs......................: 57219   817.275287/s
        iteration_duration.............: avg=266.59ms min=15.2ms  med=222.57ms max=2.22s    p(90)=569.34ms p(95)=638.1ms
        iterations.....................: 19073   272.425096/s
        vus............................: 1       min=1        max=200
        vus_max........................: 200     min=200      max=200
        ```
    - ####stress
      - [Script](./k6-script/path-page/smoke.js)    
      - ```renderscript
        checks.........................: 100.00% ✓ 50199      ✗ 0
        data_received..................: 37 MB   668 kB/s
        data_sent......................: 11 MB   199 kB/s
        http_req_blocked...............: avg=168.49µs min=3.25µs  med=4.45µs   max=407.21ms p(90)=8.89µs   p(95)=25.01µs
        http_req_connecting............: avg=49.89µs  min=0s      med=0s       max=171.53ms p(90)=0s       p(95)=0s
        ✓ http_req_duration..............: avg=139.9ms  min=1.51ms  med=104.59ms max=1.54s    p(90)=296.26ms p(95)=350.27ms
        { expected_response:true }...: avg=139.9ms  min=1.51ms  med=104.59ms max=1.54s    p(90)=296.26ms p(95)=350.27ms
        http_req_failed................: 0.00%   ✓ 0          ✗ 50199
        http_req_receiving.............: avg=175.67µs min=23.92µs med=42.9µs   max=132.54ms p(90)=211.23µs p(95)=353.07µs
        http_req_sending...............: avg=109.57µs min=9.57µs  med=15.46µs  max=120.76ms p(90)=64.66µs  p(95)=170.11µs
        http_req_tls_handshaking.......: avg=106.03µs min=0s      med=0s       max=296.15ms p(90)=0s       p(95)=0s
        http_req_waiting...............: avg=139.61ms min=1.44ms  med=104.27ms max=1.54s    p(90)=296.02ms p(95)=349.87ms
        http_reqs......................: 50199   910.533369/s
        iteration_duration.............: avg=421.28ms min=14.93ms med=387.12ms max=2.21s    p(90)=676.87ms p(95)=821.48ms
        iterations.....................: 16733   303.511123/s
        vus............................: 52      min=10       max=200
        vus_max........................: 200     min=200      max=200
        ```