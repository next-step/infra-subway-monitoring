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
  - jhh992000-ec2-public-web : reverse proxy
      * TLS 접속 주소 : https://jhh992000.ddns.net
    * PUBLIC IP : 3.37.36.221
    * PRIVATE IP : 192.168.100.109
    * NGINX 로그 경로 (access) : /var/log/nginx/access.log
    * NGINX 로그 경로 (error) : /var/log/nginx/error.log
      
  - jhh992000-ec2-public-was : webapp
    * PUBLIC IP : 3.35.220.241
    * PRIVATE IP : 192.168.100.157
    * WEBAPP1 로그 경로 (info) : /data/logs/infra-subway1/subway.log
    * WEBAPP1 로그 경로 (error) : /data/logs/infra-subway1/subway-error.log
    * WEBAPP2 로그 경로 (info) : /data/logs/infra-subway2/subway.log
    * WEBAPP2 로그 경로 (error) : /data/logs/infra-subway2/subway-error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-jhh992000

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

    - 웹 성능 예산
        ```
        우선 경쟁사의 성능을 조사한 후 경쟁사 성능 측정 결과 대비,
        우리의 서비스가 20% 이상(체감가능한)의 성능이 나오는 것이 가장 좋을 것 같습니다.
        경쟁사보다 나은 성능이 나오기 어렵다면 최소한 비슷한 성능(+- 5%차이 이내)이라도 나와야 할것 같습니다.
        
        성능 측정 대상
        - 첫페이지(main)
        
        성능 예산 목표치 (PageSpeed 측정 기준)
        - First Contentful Paint : 3초 미만
        - Time to Interactive : 6초 미만
        - Speed Index : 7초 미만
        - Total Blocking Time : 200 (ms) 미만
        - Largest Contentful Paint : 7초 미만
        - Cumulative Layout Shift : 0.02 미만
        ```

    - 웹 성능 측정

        - 측정에 사용된 도구 : [WebPageTest](https://www.webpagetest.org/)
        - 측정시 설정값
            - 테스트 위치 : Seoul - EC2
            - 브라우저 : Chrome
            - 그외 추가 Advanced Settings : 모바일 LTE 환경

          |지표 구분|지하철 노선도|N사 지도|K사 지도|
          |:---|:---:|:---:|:---:|
          |First Byte Time|A|A|A|
          |Keep-Alive Enabled|A|A|A|
          |Compress Transfer|F|F|A|
          |Compress Image|A|A|A|
          |Cache Static Content|C|B|F|

        * 측정에 사용된 도구 : [PageSpeed](https://developers.google.com/speed/pagespeed/insights/)

          |지표 구분|지하철 노선도|N사 지도|K사 지도|
          |:---|---:|---:|---:|
          |총점|32 점|67 점|70 점|
          |First Contentful Paint|14.8 s|2.9 s|1.7 s|
          |Time to Interactive|15.8 s|6.5 s|4.4 s|
          |Speed Index|14.8 s|7.7 s|6.5 s|
          |Total Blocking Time|960 ms|190 ms|110 ms|
          |Largest Contentful Paint|15.9 s|7.2 s|6.4 s|
          |Cumulative Layout Shift|0.04|0.017|0.005|

        * 측정에 사용된 도구 : [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=ko)

          |지표 구분|지하철 노선도|N사 지도 |K사 지도|
          |:---|---:|---:|---:|
          |총점|24 점|69 점|69 점|
          |First Contentful Paint|13.8 s|2.2 s|1.7 s|
          |Time to Interactive|5.0 s|5.1 s|5.2 s|
          |Speed Index|13.8 s|4.3 s|4.6 s|
          |Total Blocking Time|410 ms|50 ms|50 ms|
          |Largest Contentful Paint|14.0 s|6.9 s|6.3 s|
          |Cumulative Layout Shift|0.04|0.017|0.005|


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

    ```
    - 텍스트 압축 사용 (nginx gzip 압축 적용)
    - 캐시 설정 (nginx cache 적용)
    - 렌더링 차단 리소스 제거하기 (css body로 이동, js async 적용)
    - 사용하지 않는 자바스크립트 줄이기

    (위 3가지 적용후 측정한 테스트 값)
        - First Contentful Paint : 14.8 -> 2.5
        - Time to Interactive : 15.8 -> 5.5
        - Speed Index : 14.8 -> 5.6
        - Total Blocking Time : 960 -> 710
        - Largest Contentful Paint : 15.9 -> 5.6
    ```
   
3. 부하테스트 전제조건은 어느정도로 설정하셨나요

    ```
    - 1일 사용자 수(DAU) 예상
        - 예상 DAU : 50,000
        - 경쟁사의 MAU가 500만 일때 DAU는 약 167,000 (월 5,000,000 / 30일 = 약 16.7만)
        - 우리의 서비스는 현실상 경쟁사에 비해 메리트가 많이 떨어진다고 판단하여 1/4 수준으로 잡음
    - 피크 시간대의 집중률 예상
        - 5만명의 인원이 출근시 모두 접속한다고 가정했을때
        - 1명당 5번의 요청이 발생할것으로 예상
            - 메인페이지 -> 로그인페이지 -> 로그인시도 -> 즐겨찾기 -> 경로검색 (5페이지 경유) 
        - 최대 트래픽 : 50,000 x 5 = 250,000
        - 평소 트래픽 : 평소에는 DAU의 1/10 인원이 서비스에 접속한다고 가정할 때 (50,000 / 10) * 5 = 25,000
        - 집중률 (최대트래픽/평소트래픽): 250,000 / 25,000 = 10
    - 1명당 1일 평균 접속 혹은 요청수 예상
        - 출근시 접속 : 1
        - 퇴근시 접속 : 1
        - 기타 (외근등) : 1
        - 1명당 1일 3회의 접속이 예상되고 접속시마다 5회의 요청이 발생할것으로 예상됨
            - 메인페이지 -> 로그인페이지 -> 로그인시도 -> 즐겨찾기 -> 경로검색 (5페이지 경유)
        - 1명당 1일 요청수 예상 : 3 x 5 = 15
    - Throughput 산출
        - 1일 총 접속수 : 50,000 x 3 = 150,000
            - 공식 : 1일 사용자 수 (DAU) x 1명당 1일 평균 접속수 = 1일 총 접속수 
        - 1일 평균 RPS : 150,000 / 86,400 = 1.7
            - 공식 : 1일 총 접속수 / 86,400 (초/일)
        - 1일 최대 rps : 1.7 x (250,000 / 25,000) = 17
            - 공식 : 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
     ```
    - 목푯값 설정
   ```
    - 1일 총 접속수 : 150,000
    - 1일 평균 RPS : 1.7
    - 1일 최대 RPS : 17
   ```
   
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

    - nginx 설정값
        ```javascript
        - worker_processes : 1
        - worker_connections : 1024
        ```
        ```javascript
        $ ulimit -n
        1024   <- 최대로 열수 있는 소켓 수 (이 값을 넘기면 안됨)
            
        (worker_processes * worker_connections / 2) 의 값은 1024보다 작아야함
        ```
        - nginx 임의의 많은 소켓수(1024초과) 설정에 따른 오류메세지 확인
        ```javascript
        512 worker_connections are not enough
        ```
        ```javascript
        24: Too many open files
        ```

- 접속 빈도가 높은 페이지
    - 시나리오 : 로그인을 요청한다.
        - 메인페이지 요청
        - 로그인 요청

    - [x] Smoke
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">
            
        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          vus: 1, // 1 user looping for 1 minute
          duration: '10s',
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        const USERNAME = 'jhh992000@gmail.com';
        const PASSWORD = '1234';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 로그인_토큰 = 로그인_요청();
          로그인_확인(로그인_토큰);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 로그인_요청() {
          var payload = JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/login/token`, payload, params);
        }
        export function 로그인_확인(로그인_토큰) {
          check(로그인_토큰, {
            '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
          });
        }
        ```
        ```javascript
        p(90) = 12.98ms, p(95) = 13.86ms, avg = 10.63ms, min = 7.63ms, med = 10.90ms, max = 39.23msINFO[0010] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 로그인이 정상적으로 처리됨
        
             checks.........................: 100.00% ✓ 908       ✗ 0  
             data_received..................: 933 kB  93 kB/s
             data_sent......................: 158 kB  16 kB/s
             http_req_blocked...............: avg=251.94µs min=1µs     med=3µs     max=60.02ms p(90)=5µs     p(95)=5µs    
             http_req_connecting............: avg=58.91µs  min=0s      med=0s      max=6.2ms   p(90)=0s      p(95)=0s     
           ✓ http_req_duration..............: avg=10.63ms  min=7.62ms  med=10.89ms max=39.23ms p(90)=12.97ms p(95)=13.86ms
               { expected_response:true }...: avg=10.63ms  min=7.62ms  med=10.89ms max=39.23ms p(90)=12.97ms p(95)=13.86ms
             http_req_failed................: 0.00%   ✓ 0         ✗ 908
             http_req_receiving.............: avg=58.08µs  min=20µs    med=60µs    max=176µs   p(90)=75µs    p(95)=84µs   
             http_req_sending...............: avg=23.49µs  min=7µs     med=22µs    max=140µs   p(90)=33µs    p(95)=35µs   
             http_req_tls_handshaking.......: avg=143.13µs min=0s      med=0s      max=13.8ms  p(90)=0s      p(95)=0s     
             http_req_waiting...............: avg=10.55ms  min=7.56ms  med=10.81ms max=39.14ms p(90)=12.88ms p(95)=13.76ms
             http_reqs......................: 908     90.434149/s
             iteration_duration.............: avg=22.1ms   min=18.87ms med=21.18ms max=84.75ms p(90)=23.8ms  p(95)=25.48ms
             iterations.....................: 454     45.217074/s
             vus............................: 1       min=1       max=1
             vus_max........................: 1       min=1       max=1  source=console
        ```
               
        </div>
        </details>
                
    - [x] Load
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">

        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          stages: [
            { duration: '10s', target: 5 },
            { duration: '10s', target: 50 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 300 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 50 },
            { duration: '10s', target: 0 }
          ],
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        const USERNAME = 'jhh992000@gmail.com';
        const PASSWORD = '1234';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 로그인_토큰 = 로그인_요청();
          로그인_확인(로그인_토큰);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 로그인_요청() {
          var payload = JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/login/token`, payload, params);
        }
        export function 로그인_확인(로그인_토큰) {
          check(로그인_토큰, {
            '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
          });
        }
        ```
        ```javascript
        avg = 111.11ms, min = 6.55ms, med = 58.02ms, max = 2512.10ms, p(90) = 244.79ms, p(95) = 392.72msINFO[0071] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 로그인이 정상적으로 처리됨
        
             checks.........................: 100.00% ✓ 54788      ✗ 0    
             data_received..................: 57 MB   811 kB/s
             data_sent......................: 9.6 MB  137 kB/s
             http_req_blocked...............: avg=277.8µs  min=1µs     med=2µs      max=158.9ms  p(90)=3µs      p(95)=3µs     
             http_req_connecting............: avg=76.81µs  min=0s      med=0s       max=13.58ms  p(90)=0s       p(95)=0s      
           ✓ http_req_duration..............: avg=111.11ms min=6.55ms  med=58.02ms  max=2.51s    p(90)=244.78ms p(95)=392.72ms
               { expected_response:true }...: avg=111.11ms min=6.55ms  med=58.02ms  max=2.51s    p(90)=244.78ms p(95)=392.72ms
             http_req_failed................: 0.00%   ✓ 0          ✗ 54788
             http_req_receiving.............: avg=30.94µs  min=13µs    med=28µs     max=706µs    p(90)=43µs     p(95)=52µs    
             http_req_sending...............: avg=12.61µs  min=5µs     med=11µs     max=366µs    p(90)=17µs     p(95)=21µs    
             http_req_tls_handshaking.......: avg=197.72µs min=0s      med=0s       max=151.45ms p(90)=0s       p(95)=0s      
             http_req_waiting...............: avg=111.06ms min=6.52ms  med=57.97ms  max=2.51s    p(90)=244.73ms p(95)=392.68ms
             http_reqs......................: 54788   782.499379/s
             iteration_duration.............: avg=222.96ms min=16.75ms med=145.47ms max=2.67s    p(90)=493.73ms p(95)=715.76ms
             iterations.....................: 27394   391.249689/s
             vus............................: 1       min=1        max=300
             vus_max........................: 300     min=300      max=300  source=console
        ```

        </div>
        </details>
        
    - [x] Stress
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">

        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          stages: [
            { duration: '5s', target: 50 },
            { duration: '5s', target: 200 },
            { duration: '5s', target: 300 },
            { duration: '5s', target: 400 },
            { duration: '5s', target: 500 },
            { duration: '5s', target: 200 },
            { duration: '5s', target: 50 },
          ],
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        const USERNAME = 'jhh992000@gmail.com';
        const PASSWORD = '1234';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 로그인_토큰 = 로그인_요청();
          로그인_확인(로그인_토큰);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 로그인_요청() {
          var payload = JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/login/token`, payload, params);
        }
        export function 로그인_확인(로그인_토큰) {
          check(로그인_토큰, {
            '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
          });
        }
        ```
        ```javascript
        avg = 274.85ms, min = 6.84ms, med = 142.17ms, max = 3704.57ms, p(90) = 752.68ms, p(95) = 893.82msINFO[0056] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 로그인이 정상적으로 처리됨
        
        checks.........................: 100.00% ✓ 52456      ✗ 0
        data_received..................: 55 MB   997 kB/s
        data_sent......................: 9.2 MB  167 kB/s
        http_req_blocked...............: avg=307.11µs min=1µs    med=2µs      max=88.56ms p(90)=3µs      p(95)=4µs
        http_req_connecting............: avg=90.95µs  min=0s     med=0s       max=40.77ms p(90)=0s       p(95)=0s      
           ✓ http_req_duration..............: avg=274.85ms min=6.83ms med=142.16ms max=3.7s    p(90)=752.68ms p(95)=893.81ms
        { expected_response:true }...: avg=274.85ms min=6.83ms med=142.16ms max=3.7s    p(90)=752.68ms p(95)=893.81ms
        http_req_failed................: 0.00%   ✓ 0          ✗ 52456
        http_req_receiving.............: avg=32.34µs  min=15µs   med=29µs     max=566µs   p(90)=45µs     p(95)=55µs
        http_req_sending...............: avg=13.13µs  min=4µs    med=12µs     max=708µs   p(90)=18µs     p(95)=23µs
        http_req_tls_handshaking.......: avg=212.55µs min=0s     med=0s       max=60.98ms p(90)=0s       p(95)=0s
        http_req_waiting...............: avg=274.8ms  min=6.8ms  med=142.12ms max=3.7s    p(90)=752.63ms p(95)=893.77ms
        http_reqs......................: 52456   952.395979/s
        iteration_duration.............: avg=550.51ms min=19.1ms med=476.06ms max=4.74s   p(90)=1.04s    p(95)=1.25s
        iterations.....................: 26228   476.197989/s
        vus............................: 52      min=10       max=499
        vus_max........................: 500     min=500      max=500  source=console
        ```
                
        </div>
        </details>
  
- 데이터를 갱신하는 페이지
    - 시나리오 : 회원가입을 요청한다.
        - 메인페이지 요청
        - 회원 가입 요청
    - [x] Smoke
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">
                
        ```javascript
        등록된 회원수 : 400 명
        ```
        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          vus: 1, // 1 user looping for 1 minute
          duration: '10s',
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 회원가입_결과 = 회원가입_요청();
          회원가입_결과_확인(회원가입_결과);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 회원가입_요청() {
          var payload = JSON.stringify({
            email: guid() + "@gmail.com",
            age: "99",
            password: "1234"
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/members`, payload, params);
        }
        export function 회원가입_결과_확인(회원가입_결과) {
          check(회원가입_결과, {
            '회원가입이 정상적으로 처리됨': (response) => response.status === 201
          });
        }
        export function guid() {
          function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        ```
        ```javascript
        min = 7.74ms, med = 13.13ms, max = 25.55ms, p(90) = 15.56ms, p(95) = 16.34ms, avg = 12.13msINFO[0010] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 회원가입이 정상적으로 처리됨
        
             checks.........................: 100.00% ✓ 800       ✗ 0  
             data_received..................: 740 kB  74 kB/s
             data_sent......................: 153 kB  15 kB/s
             http_req_blocked...............: avg=227.22µs min=1µs     med=2µs     max=59.19ms p(90)=4µs     p(95)=5µs    
             http_req_connecting............: avg=48.52µs  min=0s      med=0s      max=5.33ms  p(90)=0s      p(95)=0s     
           ✓ http_req_duration..............: avg=12.12ms  min=7.74ms  med=13.13ms max=25.54ms p(90)=15.55ms p(95)=16.33ms
               { expected_response:true }...: avg=12.12ms  min=7.74ms  med=13.13ms max=25.54ms p(90)=15.55ms p(95)=16.33ms
             http_req_failed................: 0.00%   ✓ 0         ✗ 800
             http_req_receiving.............: avg=46.33µs  min=21µs    med=43µs    max=187µs   p(90)=69µs    p(95)=74µs   
             http_req_sending...............: avg=18.45µs  min=9µs     med=16µs    max=99µs    p(90)=29µs    p(95)=34µs   
             http_req_tls_handshaking.......: avg=122.84µs min=0s      med=0s      max=13.6ms  p(90)=0s      p(95)=0s     
             http_req_waiting...............: avg=12.06ms  min=7.7ms   med=13.07ms max=25.49ms p(90)=15.51ms p(95)=16.26ms
             http_reqs......................: 800     79.969739/s
             iteration_duration.............: avg=24.99ms  min=21.31ms med=24.25ms max=88.54ms p(90)=27.09ms p(95)=28.48ms
             iterations.....................: 400     39.98487/s
             vus............................: 1       min=1       max=1
             vus_max........................: 1       min=1       max=1  source=console
        ```
        </div>
        </details>
        
    - [x] Load
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">
            
        ```javascript
        등록된 회원수 : 24,306 명
        ```
        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          stages: [
            { duration: '10s', target: 5 },
            { duration: '10s', target: 50 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 300 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 50 },
            { duration: '10s', target: 0 }
          ],
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 회원가입_결과 = 회원가입_요청();
          회원가입_결과_확인(회원가입_결과);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 회원가입_요청() {
          var payload = JSON.stringify({
            email: guid() + "@gmail.com",
            age: "99",
            password: "1234"
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/members`, payload, params);
        }
        export function 회원가입_결과_확인(회원가입_결과) {
          check(회원가입_결과, {
            '회원가입이 정상적으로 처리됨': (response) => response.status === 201
          });
        }
        export function guid() {
          function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        ```
        ```javascript
        avg = 126.12ms, min = 6.51ms, med = 46.33ms, max = 3359.38ms, p(90) = 368.04ms, p(95) = 540.83msINFO[0071] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 회원가입이 정상적으로 처리됨
        
             checks.........................: 100.00% ✓ 48612      ✗ 0    
             data_received..................: 46 MB   654 kB/s
             data_sent......................: 9.3 MB  133 kB/s
             http_req_blocked...............: avg=296.01µs min=0s      med=2µs      max=240.36ms p(90)=3µs      p(95)=4µs     
             http_req_connecting............: avg=101.08µs min=0s      med=0s       max=153.78ms p(90)=0s       p(95)=0s      
           ✓ http_req_duration..............: avg=126.12ms min=6.5ms   med=46.32ms  max=3.35s    p(90)=368.04ms p(95)=540.83ms
               { expected_response:true }...: avg=126.12ms min=6.5ms   med=46.32ms  max=3.35s    p(90)=368.04ms p(95)=540.83ms
             http_req_failed................: 0.00%   ✓ 0          ✗ 48612
             http_req_receiving.............: avg=31.97µs  min=11µs    med=29µs     max=3.12ms   p(90)=47µs     p(95)=57µs    
             http_req_sending...............: avg=15.03µs  min=4µs     med=13µs     max=430µs    p(90)=22µs     p(95)=28µs    
             http_req_tls_handshaking.......: avg=191.18µs min=0s      med=0s       max=152.85ms p(90)=0s       p(95)=0s      
             http_req_waiting...............: avg=126.07ms min=6.47ms  med=46.28ms  max=3.35s    p(90)=367.99ms p(95)=540.78ms
             http_reqs......................: 48612   694.29085/s
             iteration_duration.............: avg=253.05ms min=18.27ms med=140.13ms max=3.42s    p(90)=623.19ms p(95)=875.4ms 
             iterations.....................: 24306   347.145425/s
             vus............................: 1       min=1        max=299
             vus_max........................: 300     min=300      max=300  source=console
        ```
                
        </div>
        </details>
                
    - [x] Stress
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">
                
        ```javascript
        등록된 회원 수 : 29,204 명
        ```
        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          stages: [
            { duration: '5s', target: 50 },
            { duration: '10s', target: 200 },
            { duration: '10s', target: 400 },
            { duration: '10s', target: 300 },
            { duration: '10s', target: 500 },
            { duration: '5s', target: 200 },
            { duration: '5s', target: 50 },
          ],
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 회원가입_결과 = 회원가입_요청();
          회원가입_결과_확인(회원가입_결과);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 회원가입_요청() {
          var payload = JSON.stringify({
            email: guid() + "@gmail.com",
            age: "99",
            password: "1234"
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/members`, payload, params);
        }
        export function 회원가입_결과_확인(회원가입_결과) {
          check(회원가입_결과, {
            '회원가입이 정상적으로 처리됨': (response) => response.status === 201
          });
        }
        export function guid() {
          function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        ```
        ```javascript
        p(95) = 359.37ms, avg = 104.56ms, min = 6.52ms, med = 54.11ms, max = 3735.69ms, p(90) = 227.20msINFO[0071] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 회원가입이 정상적으로 처리됨
        
             checks.........................: 100.00% ✓ 58406      ✗ 0    
             data_received..................: 55 MB   784 kB/s
             data_sent......................: 11 MB   160 kB/s
             http_req_blocked...............: avg=254.24µs min=0s      med=2µs      max=103ms   p(90)=3µs      p(95)=4µs     
             http_req_connecting............: avg=74.59µs  min=0s      med=0s       max=28.7ms  p(90)=0s       p(95)=0s      
           ✓ http_req_duration..............: avg=104.56ms min=6.52ms  med=54.11ms  max=3.73s   p(90)=227.2ms  p(95)=359.37ms
               { expected_response:true }...: avg=104.56ms min=6.52ms  med=54.11ms  max=3.73s   p(90)=227.2ms  p(95)=359.37ms
             http_req_failed................: 0.00%   ✓ 0          ✗ 58406
             http_req_receiving.............: avg=30.13µs  min=11µs    med=27µs     max=1.11ms  p(90)=43µs     p(95)=53µs    
             http_req_sending...............: avg=14.31µs  min=5µs     med=13µs     max=401µs   p(90)=21µs     p(95)=25µs    
             http_req_tls_handshaking.......: avg=175.47µs min=0s      med=0s       max=41.14ms p(90)=0s       p(95)=0s      
             http_req_waiting...............: avg=104.51ms min=6.49ms  med=54.07ms  max=3.73s   p(90)=227.15ms p(95)=359.3ms 
             http_reqs......................: 58406   834.299083/s
             iteration_duration.............: avg=209.84ms min=16.87ms med=138.81ms max=4.83s   p(90)=446.15ms p(95)=624.99ms
             iterations.....................: 29203   417.149541/s
             vus............................: 1       min=1        max=299
             vus_max........................: 300     min=300      max=300  source=console
        ```
        </div>
        </details>
  
- 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    - 시나리오 : 로그인 후 경로를 검색한다.
        - 메인페이지 요청
        - 로그인 요청
        - 나의 즐겨찾기 목록 조회 요청
        - 경로 검색 요청
    - [x] Smoke
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">
            
        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          vus: 1, // 1 user looping for 1 minute
          duration: '10s',
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        const USERNAME = 'jhh992000@gmail.com';
        const PASSWORD = '1234';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 로그인_토큰 = 로그인_요청();
          로그인_확인(로그인_토큰);
        
          let 나의_즐겨찾기_목록_조회_결과 = 나의_즐겨찾기_목록_조회_요청(로그인_토큰);
          let 나의_첫번째_즐겨찾기 = 나의_즐겨찾기_목록_조회_결과_확인(나의_즐겨찾기_목록_조회_결과);
        
          let 경로_검색_결과 = 경로_검색_요청(로그인_토큰, 나의_첫번째_즐겨찾기.source, 나의_첫번째_즐겨찾기.target);
          경로_검색_결과_확인(경로_검색_결과);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 로그인_요청() {
          var payload = JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/login/token`, payload, params);
        }
        export function 로그인_확인(로그인_토큰) {
          check(로그인_토큰, {
            '로그인이 정상적으로 처리됨': (resp) => resp.json('accessToken') !== '',
          });
        }
        export function 나의_즐겨찾기_목록_조회_요청(로그인_토큰) {
          let authHeaders = {
            headers: {
              Authorization: `Bearer ${로그인_토큰.json('accessToken')}`,
            },
          };
          return http.get(`${BASE_URL}/favorites`, authHeaders).json();
        }
        export function 나의_즐겨찾기_목록_조회_결과_확인(나의_즐겨찾기_목록_조회_결과) {
          check(나의_즐겨찾기_목록_조회_결과, {
            '나의 즐겨찾기 목록이 정상적으로 조회됨': (response) => response.length > 0
          });
          return 나의_즐겨찾기_목록_조회_결과[0];
        }
        export function 경로_검색_요청(로그인_토큰, 출발역, 도착역) {
          let authHeaders = {
            headers: {
              Authorization: `Bearer ${로그인_토큰.json('accessToken')}`,
            },
          };
          return http.get(`${BASE_URL}/paths?source=` + 출발역.id + `&target=` + 도착역.id, authHeaders);
        }
        export function 경로_검색_결과_확인(경로_검색_결과) {
          check(경로_검색_결과, {
            '경로가 정상적으로 검색됨': (response) => response.json('stations').length > 0
          });
        }
        ```
        ```javascript
        max = 295.42ms, p(90) = 69.47ms, p(95) = 81.31ms, avg = 28.46ms, min = 7.46ms, med = 16.44msINFO[0011] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 로그인이 정상적으로 처리됨
             ✓ 나의 즐겨찾기 목록이 정상적으로 조회됨
             ✓ 경로가 정상적으로 검색됨
        
             checks.........................: 100.00% ✓ 348       ✗ 0  
             data_received..................: 339 kB  34 kB/s
             data_sent......................: 84 kB   8.3 kB/s
             http_req_blocked...............: avg=321.37µs min=1µs     med=2µs     max=56.14ms  p(90)=5µs      p(95)=6µs     
             http_req_connecting............: avg=57.56µs  min=0s      med=0s      max=5.58ms   p(90)=0s       p(95)=0s      
           ✓ http_req_duration..............: avg=28.46ms  min=7.45ms  med=16.43ms max=295.42ms p(90)=69.46ms  p(95)=81.31ms 
               { expected_response:true }...: avg=28.46ms  min=7.45ms  med=16.43ms max=295.42ms p(90)=69.46ms  p(95)=81.31ms 
             http_req_failed................: 0.00%   ✓ 0         ✗ 348
             http_req_receiving.............: avg=54.76µs  min=25µs    med=49µs    max=194µs    p(90)=80µs     p(95)=88µs    
             http_req_sending...............: avg=18.58µs  min=10µs    med=15µs    max=129µs    p(90)=30µs     p(95)=33µs    
             http_req_tls_handshaking.......: avg=142.81µs min=0s      med=0s      max=13.49ms  p(90)=0s       p(95)=0s      
             http_req_waiting...............: avg=28.38ms  min=7.39ms  med=16.37ms max=295.35ms p(90)=69.36ms  p(95)=81.21ms 
             http_reqs......................: 348     34.538211/s
             iteration_duration.............: avg=115.78ms min=89.61ms med=108.8ms max=466.33ms p(90)=137.17ms p(95)=144.74ms
             iterations.....................: 87      8.634553/s
             vus............................: 1       min=1       max=1
             vus_max........................: 1       min=1       max=1  source=console
        ```
                
        </div>
        </details>
                
    - [x] Load
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">
                
        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          stages: [
            { duration: '10s', target: 5 },
            { duration: '10s', target: 50 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 300 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 50 },
            { duration: '10s', target: 0 }
          ],
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        const USERNAME = 'jhh992000@gmail.com';
        const PASSWORD = '1234';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 로그인_토큰 = 로그인_요청();
          로그인_확인(로그인_토큰);
        
          let 나의_즐겨찾기_목록_조회_결과 = 나의_즐겨찾기_목록_조회_요청(로그인_토큰);
          let 나의_첫번째_즐겨찾기 = 나의_즐겨찾기_목록_조회_결과_확인(나의_즐겨찾기_목록_조회_결과);
        
          let 경로_검색_결과 = 경로_검색_요청(로그인_토큰, 나의_첫번째_즐겨찾기.source, 나의_첫번째_즐겨찾기.target);
          경로_검색_결과_확인(경로_검색_결과);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 로그인_요청() {
          var payload = JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/login/token`, payload, params);
        }
        export function 로그인_확인(로그인_토큰) {
          check(로그인_토큰, {
            '로그인이 정상적으로 처리됨': (resp) => resp.json('accessToken') !== '',
          });
        }
        export function 나의_즐겨찾기_목록_조회_요청(로그인_토큰) {
          let authHeaders = {
            headers: {
              Authorization: `Bearer ${로그인_토큰.json('accessToken')}`,
            },
          };
          return http.get(`${BASE_URL}/favorites`, authHeaders).json();
        }
        export function 나의_즐겨찾기_목록_조회_결과_확인(나의_즐겨찾기_목록_조회_결과) {
          check(나의_즐겨찾기_목록_조회_결과, {
            '나의 즐겨찾기 목록이 정상적으로 조회됨': (response) => response.length > 0
          });
          return 나의_즐겨찾기_목록_조회_결과[0];
        }
        export function 경로_검색_요청(로그인_토큰, 출발역, 도착역) {
          let authHeaders = {
            headers: {
              Authorization: `Bearer ${로그인_토큰.json('accessToken')}`,
            },
          };
          return http.get(`${BASE_URL}/paths?source=` + 출발역.id + `&target=` + 도착역.id, authHeaders);
        }
        export function 경로_검색_결과_확인(경로_검색_결과) {
          check(경로_검색_결과, {
            '경로가 정상적으로 검색됨': (response) => response.json('stations').length > 0
          });
        }
        ```
        ```javascript
        max = 10687.48ms, p(90) = 2885.04ms, p(95) = 3502.30ms, avg = 954.40ms, min = 7.09ms, med = 369.16ms
        threshold failed: p(99)<1500
        INFO[0071] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 로그인이 정상적으로 처리됨
             ✓ 나의 즐겨찾기 목록이 정상적으로 조회됨
             ✓ 경로가 정상적으로 검색됨
        
             checks.........................: 100.00% ✓ 7544       ✗ 0    
             data_received..................: 8.4 MB  120 kB/s
             data_sent......................: 1.9 MB  27 kB/s
             http_req_blocked...............: avg=768.39µs min=1µs     med=3µs      max=29.78ms p(90)=5µs   p(95)=12µs   
             http_req_connecting............: avg=222.29µs min=0s      med=0s       max=17.85ms p(90)=0s    p(95)=0s     
           ✗ http_req_duration..............: avg=954.39ms min=7.09ms  med=369.16ms max=10.68s  p(90)=2.88s p(95)=3.5s   
               { expected_response:true }...: avg=954.39ms min=7.09ms  med=369.16ms max=10.68s  p(90)=2.88s p(95)=3.5s   
             http_req_failed................: 0.00%   ✓ 0          ✗ 7544 
             http_req_receiving.............: avg=49.73µs  min=20µs    med=45µs     max=299µs   p(90)=73µs  p(95)=83µs   
             http_req_sending...............: avg=19.24µs  min=6µs     med=16µs     max=426µs   p(90)=31µs  p(95)=37.84µs
             http_req_tls_handshaking.......: avg=540.48µs min=0s      med=0s       max=16.73ms p(90)=0s    p(95)=0s     
             http_req_waiting...............: avg=954.32ms min=7.06ms  med=369.1ms  max=10.68s  p(90)=2.88s p(95)=3.5s   
             http_reqs......................: 7544    107.590271/s
             iteration_duration.............: avg=3.82s    min=96.79ms med=2.5s     max=15.72s  p(90)=9.1s  p(95)=10.05s 
             iterations.....................: 1886    26.897568/s
             vus............................: 1       min=1        max=300
             vus_max........................: 300     min=300      max=300  source=console
        ERRO[0072] some thresholds have failed                  
        ```
                                     
        </div>
        </details>
    
    - [x] Stress
        <details>
        <summary>접기/펼치기 버튼</summary>
        <div markdown="1">
            
        ```javascript
        import http from 'k6/http';
        import { check, group, sleep, fail } from 'k6';
        
        export let options = {
          stages: [
            { duration: '5s', target: 50 },
            { duration: '10s', target: 200 },
            { duration: '10s', target: 400 },
            { duration: '10s', target: 300 },
            { duration: '10s', target: 500 },
            { duration: '5s', target: 200 },
            { duration: '5s', target: 50 },
          ],
        
          thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
          },
        };
        
        const BASE_URL = 'https://jhh992000.ddns.net';
        
        export default function ()  {
          let 메인페이지_접속_결과 = 메인페이지_접속_요청();
          메인페이지_접속_결과_확인(메인페이지_접속_결과);
        
          let 회원가입_결과 = 회원가입_요청();
          회원가입_결과_확인(회원가입_결과);
        };
        
        export function 메인페이지_접속_요청() {
          return http.get(`${BASE_URL}`);
        }
        export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
          check(메인페이지_접속_결과, {
            '메인페이지가 정상적으로 응답함': (response) => response.status === 200
          });
        }
        export function 회원가입_요청() {
          var payload = JSON.stringify({
            email: guid() + "@gmail.com",
            age: "99",
            password: "1234"
          });
        
          var params = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
          return http.post(`${BASE_URL}/members`, payload, params);
        }
        export function 회원가입_결과_확인(회원가입_결과) {
          check(회원가입_결과, {
            '회원가입이 정상적으로 처리됨': (response) => response.status === 201
          });
        }
        export function guid() {
          function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        ```
        ```javascript
        avg = 2392.73ms, min = 7.37ms, med = 2003.48ms, max = 15546.61ms, p(90) = 5233.70ms, p(95) = 5847.14ms
        threshold failed: p(99)<1500
        INFO[0065] 
             ✓ 메인페이지가 정상적으로 응답함
             ✓ 로그인이 정상적으로 처리됨
             ✓ 나의 즐겨찾기 목록이 정상적으로 조회됨
             ✓ 경로가 정상적으로 검색됨
        
             checks.........................: 100.00% ✓ 7764       ✗ 0    
             data_received..................: 9.4 MB  147 kB/s
             data_sent......................: 2.0 MB  32 kB/s
             http_req_blocked...............: avg=1.15ms   min=1µs      med=2µs    max=58.21ms p(90)=5µs    p(95)=16.51ms
             http_req_connecting............: avg=332.66µs min=0s       med=0s     max=11.29ms p(90)=0s     p(95)=4.64ms 
           ✗ http_req_duration..............: avg=2.39s    min=7.36ms   med=2s     max=15.54s  p(90)=5.23s  p(95)=5.84s  
               { expected_response:true }...: avg=2.39s    min=7.36ms   med=2s     max=15.54s  p(90)=5.23s  p(95)=5.84s  
             http_req_failed................: 0.00%   ✓ 0          ✗ 7764 
             http_req_receiving.............: avg=46.69µs  min=19µs     med=43µs   max=240µs   p(90)=70µs   p(95)=80µs   
             http_req_sending...............: avg=18.78µs  min=6µs      med=15µs   max=243µs   p(90)=31µs   p(95)=43µs   
             http_req_tls_handshaking.......: avg=813.4µs  min=0s       med=0s     max=20.63ms p(90)=0s     p(95)=11.63ms
             http_req_waiting...............: avg=2.39s    min=7.3ms    med=2s     max=15.54s  p(90)=5.23s  p(95)=5.84s  
             http_reqs......................: 7764    121.015313/s
             iteration_duration.............: avg=9.57s    min=132.94ms med=10.35s max=23.77s  p(90)=15.56s p(95)=17.25s 
             iterations.....................: 1941    30.253828/s
             vus............................: 10      min=10       max=500
             vus_max........................: 500     min=500      max=500  source=console
        ERRO[0066] some thresholds have failed                  
        ```
                
        </div>
        </details>
