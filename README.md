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
    - application: /home/ubuntu/log/infra-subway-monitoring.log
    - system: /var/log/syslog
    - access: /var/log/nginx/access.log
    - error: /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=dhmin5693-dashboard

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

```text
A. 예비 분석
  1. 가장 중요한 페이지
    - 메인페이지: 서비스의 진입점이므로, 이 페이지 로딩이 느리면 사용자가 이탈할 가능성이 높다.

B. 경쟁사 분석
  1. 현재 내 사이트 상태 (https://my-subway.r-e.kr)
    - First Contentful Paint    : 14.7 s
    - Time to Interactive       : 15.3 s
    - Speed Index               : 14.7 s
    - Total Blocking Time       : 550 ms
    - Largest Contentful Paint  : 15.3 s
    
  2. 서울교통공사 사이버스테이션
    - First Contentful Paint    : 7.0 s
    - Time to Interactive       : 9.5 s
    - Speed Index               : 11.5 s
    - Total Blocking Time       : 1,470 ms
    - Largest Contentful Paint  : 7.1 s
    
  3. 카카오맵
    - First Contentful Paint    : 2.5 s
    - Time to Interactive       : 5.3 s
    - Speed Index               : 6.9 s
    - Total Blocking Time       : 60 ms
    - Largest Contentful Paint  : 5.5 s    

C. 성능 목표: 경쟁사 대비 최소 동등한 성능 (카카오맵은 이미 충분히 빠른 서비스라고 판단)
  - First Contentful Paint    : 2.5초 미만
  - Time to Interactive       : 5초 미만
  - Speed Index               : 6.5초 미만
  - Total Blocking Time       : 0.06초 미만
  - Largest Contentful Paint  : 5초 미만

```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

```text
1. 텍스트 압축 기능 사용 (적용 후 FCP 14.7s -> 5.3s 로 개선)
  - Spring boot properties 추가
    - server.compression.enabled=true
    - server.compression.mime-types=text/html,text/css,application/javascript,application/json

2. 렌더링 차단 리소스 제거 (적용 후 TTI 5.9s -> 5.8s, SI 6.3s -> 5.5s, TBI 590ms -> 450ms 로 개선)
  - 일부 css의 로드 방식 변경
  - <link href={HREF} rel="preload" as="style" onload="this.rel='stylesheet'"><noscript><link rel="stylesheet" href={HREF}></noscript>
```

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

```text
참고) 경쟁사 카카오맵의 MAU 530만 (https://biz.chosun.com/site/data/html_dir/2020/07/09/2020070901297.html)

1. 예상 DAU
  - 카카오맵을 경쟁사로 삼았으나 현실적으로 카카오맵의 아성을 단번에 따라잡기는 어렵다고 판단
  - 카카오맵의 절반 수준 MAU인 250만을 기준으로 선정
  - DAU는 250만 / 30일의 값을 조금 보정한 85,000으로 설정

2. 예상 피크 시간대
  - 출퇴근 시간에 피크 예상
  - 07:00 ~ 10:00 AM, 06:00 ~ 09:00 PM

3. 1명당 1일 평균 접속 혹은 요청 수
  - 출/퇴근 시간에 1번씩 접속(총 2회)
  - 메인 페이지, 로그인, 메인 페이지, 즐겨찾기 페이지, +@로 평균 5번 요청한다고 가정

4. Throughput (1일 평균 RPS ~ 최대 RPS)
  - 1일 사용자 수(DAU) * 1명당 1일 평균 접속 수 = 85,000 * 10 = 850,000 (1일 총 접속수)
  - 1일 총 접속 수 / 86,400 (초/일) = 850,000 / 86,400 = 평균 9.83 (1일 평균 rps)
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 9.83 * 10(가정치) = 98.3 (1일 최대 rps)
```

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 접속빈도가 높은 기능(비로그인, 메인 페이지)

    ```javascript
    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    export let options = {
        vus: 100, // 1 user looping for 1 minute
        duration: '10s',
        
        thresholds: {
            http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
        },
    };
    
    const BASE_URL = 'https://my-subway.r-e.kr';
    
    export default function ()  {
        let mainPages = http.get(`${BASE_URL}`);
        sleep(1);
    };
    ```

    ```text
              /\      |‾‾| /‾‾/   /‾‾/
         /\  /  \     |  |/  /   /  /
        /  \/    \    |     (   /   ‾‾\
       /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io
    
      execution: local
         script: main_page.js
         output: -
    
      scenarios: (100.00%) 1 scenario, 100 max VUs, 40s max duration (incl. graceful stop):
               * default: 100 looping VUs for 10s (gracefulStop: 30s)
    
    
    running (10.5s), 000/100 VUs, 1000 complete and 0 interrupted iterations
    default ✓ [======================================] 100 VUs  10s
    
         data_received..................: 2.0 MB 192 kB/s
         data_sent......................: 149 kB 14 kB/s
         http_req_blocked...............: avg=17.97ms  min=3.41µs  med=5.47µs  max=222.11ms p(90)=24ms     p(95)=189.55ms
         http_req_connecting............: avg=2.32ms   min=0s      med=0s      max=38.1ms   p(90)=216.93µs p(95)=27.32ms
       ✓ http_req_duration..............: avg=13.47ms  min=1.7ms   med=7.21ms  max=90.18ms  p(90)=37.56ms  p(95)=50.33ms
           { expected_response:true }...: avg=13.47ms  min=1.7ms   med=7.21ms  max=90.18ms  p(90)=37.56ms  p(95)=50.33ms
         http_req_failed................: 0.00%  ✓ 0     ✗ 1000
         http_req_receiving.............: avg=190.37µs min=20.87µs med=39.64µs max=13.19ms  p(90)=188.75µs p(95)=472.32µs
         http_req_sending...............: avg=1.11ms   min=9.23µs  med=16.46µs max=51.19ms  p(90)=1.7ms    p(95)=5.31ms
         http_req_tls_handshaking.......: avg=15.13ms  min=0s      med=0s      max=192.88ms p(90)=8.14ms   p(95)=157.59ms
         http_req_waiting...............: avg=12.17ms  min=1.64ms  med=6.61ms  max=68.16ms  p(90)=34.42ms  p(95)=46.27ms
         http_reqs......................: 1000   95.521454/s
         iteration_duration.............: avg=1.03s    min=1s      med=1s      max=1.3s     p(90)=1.08s    p(95)=1.23s
         iterations.....................: 1000   95.521454/s
         vus............................: 100    min=100 max=100
         vus_max........................: 100    min=100 max=100
    ```

- DB를 사용하는 기능 

    ```javascript
    import http from 'k6/http';
    import { check, group, sleep, fail } from 'k6';
    
    export let options = {
      vus: 100, // 1 user looping for 1 minute
      duration: '10s',
    
      thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
      },
    };
    
    const BASE_URL = 'https://my-subway.r-e.kr';
    
    export default function ()  {
    
      var params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      let path = http.get(`${BASE_URL}/paths?source=1&target=21`, params);
    
      check(path, {
        'logged in successfully': (path) => path.json('stations') !== '',
      });
    
      sleep(1);
    };
    ```

    ```text
              /\      |‾‾| /‾‾/   /‾‾/
         /\  /  \     |  |/  /   /  /
        /  \/    \    |     (   /   ‾‾\
       /          \   |  |\  \ |  (‾)  |
      / __________ \  |__| \__\ \_____/ .io
    
      execution: local
         script: find_path.js
         output: -
    
      scenarios: (100.00%) 1 scenario, 100 max VUs, 40s max duration (incl. graceful stop):
               * default: 100 looping VUs for 10s (gracefulStop: 30s)
    
    
    running (11.0s), 000/100 VUs, 945 complete and 0 interrupted iterations
    default ✓ [======================================] 100 VUs  10s
    
         ✓ logged in successfully
    
         checks.........................: 100.00% ✓ 945   ✗ 0
         data_received..................: 1.5 MB  136 kB/s
         data_sent......................: 196 kB  18 kB/s
         http_req_blocked...............: avg=24.02ms  min=3.58µs  med=6.08µs  max=347.99ms p(90)=149.66ms p(95)=222.47ms
         http_req_connecting............: avg=1.91ms   min=0s      med=0s      max=43.84ms  p(90)=7.56ms   p(95)=17.75ms
       ✓ http_req_duration..............: avg=82.34ms  min=15.07ms med=59.3ms  max=352.59ms p(90)=166.48ms p(95)=237.94ms
           { expected_response:true }...: avg=82.34ms  min=15.07ms med=59.3ms  max=352.59ms p(90)=166.48ms p(95)=237.94ms
         http_req_failed................: 0.00%   ✓ 0     ✗ 945
         http_req_receiving.............: avg=191.79µs min=27.17µs med=57.3µs  max=18.77ms  p(90)=148.59µs p(95)=300.5µs
         http_req_sending...............: avg=1.3ms    min=11µs    med=18.82µs max=62.07ms  p(90)=2.31ms   p(95)=8.97ms
         http_req_tls_handshaking.......: avg=22.07ms  min=0s      med=0s      max=315.05ms p(90)=127.48ms p(95)=204.26ms
         http_req_waiting...............: avg=80.84ms  min=14.93ms med=58.88ms max=331.15ms p(90)=163.64ms p(95)=234.88ms
         http_reqs......................: 945     85.798576/s
         iteration_duration.............: avg=1.11s    min=1.01s   med=1.06s   max=1.64s    p(90)=1.3s     p(95)=1.45s
         iterations.....................: 945     85.798576/s
         vus............................: 2       min=2   max=100
         vus_max........................: 100     min=100 max=100
    ```
