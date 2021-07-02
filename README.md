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

### 도메인 변경 : yzzzzun.p-e.kr

1. 각 서버내 로깅 경로를 알려주세요
   - Nginx : /var/log/nginx
   - application log : ~/infra-subway-monitoring/log
2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-yzzzzun

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

   우선 경쟁사 서비스를 비교했습니다. 

   👉 네이버 지하철 노선도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 2.3s      |
   | Time to Interactive      | 7.1s      |
   | Speed Index              | 6.8s      |
   | Total Blocking Time      | 560ms     |
   | Largest Contentful Paint | 7.9s      |

   👉카카오 맵 : https://m.map.kakao.com/

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 2.5s      |
   | Time to Interactive      | 5.3s      |
   | Speed Index              | 6.7s      |
   | Total Blocking Time      | 140ms     |
   | Largest Contentful Paint | 6.8s      |

   👉 내 서비스 

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 15.3s     |
   | Time to Interactive      | 15.9s     |
   | Speed Index              | 15.3s     |
   | Total Blocking Time      | 540ms     |
   | Largest Contentful Paint | 15.9s     |

   📄 예산 설정 경쟁사 서비스를 비교하여 가장 좋은 성능을 나타내는 서비스를 기준으로 +20%내의 시간 지표로 설정했습니다.

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 3s        |
   | Time to Interactive      | 6s        |
   | Speed Index              | 8s        |
   | Total Blocking Time      | 168ms     |
   | Largest Contentful Paint | 8s        |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   /js/vendor.js 와 /js/main.js 의 전송 크기가 커서 네트워크 자원을 압축하는게 가장 중요한 해결 방법인것 같습니다. 그에 따라 nginx.conf 에 gzip설정을 추가하고 nginx reload하여 아래와 같은 결과를 얻을 수 있었습니다.

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 6.5s      |
   | Time to Interactive      | 7.1s      |
   | Speed Index              | 7.2s      |
   | Total Blocking Time      | 540ms     |
   | Largest Contentful Paint | 7.1s      |

   추가적인 방법으로 캐시 설정과 불필요한 자원을 지연로딩 하는 방법들도 있을것 같습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

   - 1일 사용자수(DAU) 설정 : 카카오맵 기준 월 552만 -> 1일 약 18만 추정, 메이저 서비스임을 감안하여 해당서비스의 DAU는 10만으로 목표
   - 1일 피크시간 집중률 : 10
   - 1명당 1일 평균 접속 : 10
   - 1일 총 접속수 : 1000000
   - 1일 평균 rps : 1000000 / 86400 = 약 11
   - 1일 최대 rps : 11 * (100/10) = 약 110
   - Latency : 1500ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

   부하테스트는 1분간 사용자수 증가, 2분간 유지하는 식으로 100, 200, 250 명까지 늘려보았습니다.

   300, 400명 까지 늘려두고 테스트한 결과 너무 빠르게 실패결과가 나와서 줄여가면서 한계치를 찾아나갔습니다. 

   > 전체 성능 테스트 시나리오(조회, 갱신, 여러 데이터 참조 페이지 조회)
   >
   >  로그인 -> 내정보 확인 -> 내정보 수정 -> 내정보 확인 -> 경로 조회

   :point_right:smoke.js

   ```javascript
   import http from "k6/http";
   import { check, group, sleep, fail } from "k6";
   
   export let options = {
     vus: 1, // 1 user looping for 1 minute
     duration: "10s",
   
     thresholds: {
       http_req_duration: ["p(99)<1500"] // 99% of requests must complete below 1.5s
     }
   };
   
   const BASE_URL = "http://yzzzzun.p-e.kr";
   const USERNAME = "test";
   const PASSWORD = "test";
   
   export function requestMyInfo(loginRes) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`
       }
     };
     return http.get(`${BASE_URL}/members/me`, authHeaders).json();
   }
   export function requestLogin() {
     var payload = JSON.stringify({
       email: USERNAME,
       password: PASSWORD
     });
   
     var params = {
       headers: {
         "Content-Type": "application/json"
       }
     };
     return http.post(`${BASE_URL}/login/token`, payload, params);
   }
   export function updateMyInfo(loginRes) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`,
         "Content-Type": "application/json"
       }
     };
     var payload = JSON.stringify({
       email: USERNAME,
       password: PASSWORD,
       age: 29
     });
   
     return http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
   }
   export function findPath(loginRes, source, target) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`
       }
     };
     return http
       .get(
         `${BASE_URL}/paths/?source=` + source + `&target=` + target,
         authHeaders
       )
       .json();
   }
   
   export default function() {
     let loginRes = requestLogin();
     check(loginRes, {
       "logged in successfully": resp => resp.json("accessToken") !== ""
     });
   
     let myObjects = requestMyInfo(loginRes);
     check(myObjects, { "retrieved member": obj => obj.id != 0 });
   
     let updatedMyInfo = updateMyInfo(loginRes);
     check(updateMyInfo, { "updated info": obj => obj.id != 0 });
   
     let path = findPath(loginRes, 3, 7);
     check(path, { "path stations check": obj => obj.stations.length != 0 });
   
     sleep(1);
   }
   
   ```

   ```powershell
            /\      |‾‾| /‾‾/   /‾‾/
        /\  /  \     |  |/  /   /  /
       /  \/    \    |     (   /   ‾‾\
      /          \   |  |\  \ |  (‾)  |
     / __________ \  |__| \__\ \_____/ .io
   
     execution: local
        script: smoke.js
        output: -
   
     scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
              * default: 1 looping VUs for 10s (gracefulStop: 30s)
   
   
   running (10.6s), 0/1 VUs, 10 complete and 0 interrupted iterations
   default ✓ [======================================] 1 VUs  10s
   
        ✓ logged in successfully
        ✓ retrieved member
        ✓ updated info
        ✓ path stations check
   
        checks.........................: 100.00% ✓ 40       ✗ 0
        data_received..................: 40 kB   3.8 kB/s
        data_sent......................: 14 kB   1.4 kB/s
        http_req_blocked...............: avg=488.06µs min=3.77µs   med=4.76µs  max=27.54ms  p(90)=8.36µs  p(95)=8.9µs
        http_req_connecting............: avg=12.88µs  min=0s       med=0s      max=606.69µs p(90)=0s      p(95)=0s
      ✓ http_req_duration..............: avg=7.11ms   min=466.96µs med=1.94ms  max=54.37ms  p(90)=36.06ms p(95)=43.81ms
          { expected_response:true }...: avg=8.93ms   min=466.96µs med=548.6µs max=54.37ms  p(90)=39.5ms  p(95)=45.06ms
        http_req_failed................: 37.50%  ✓ 30       ✗ 50
        http_req_receiving.............: avg=68.21µs  min=42.47µs  med=63.5µs  max=197.98µs p(90)=89.19µs p(95)=103.31µs
        http_req_sending...............: avg=19.23µs  min=10.37µs  med=14.45µs max=76.64µs  p(90)=32.31µs p(95)=41.17µs
        http_req_tls_handshaking.......: avg=338.1µs  min=0s       med=0s      max=27.04ms  p(90)=0s      p(95)=0s
        http_req_waiting...............: avg=7.02ms   min=388.53µs med=1.79ms  max=54.27ms  p(90)=35.97ms p(95)=43.69ms
        http_reqs......................: 80      7.530221/s
        iteration_duration.............: avg=1.06s    min=1.05s    med=1.05s   max=1.09s    p(90)=1.07s   p(95)=1.08s
        iterations.....................: 10      0.941278/s
        vus............................: 1       min=1      max=1
        vus_max........................: 1       min=1      max=1
   ```

   :point_right:Load.js

   ```javascript
   import http from "k6/http";
   import { check, group, sleep, fail } from "k6";
   
   export let options = {
     stages: [
       { duration: "5m", target: 100 }, // 100명의 user가 5분간 ramp-up
       { duration: "2m", target: 100 }, // 100명의 user가 2분간 머물러있음
       { duration: "10s", target: 0 } // ramp-down to 0 users
     ],
     thresholds: {
       http_req_duration: ["p(99)<1500"] // 99% of requests must complete below 1.5s
     }
   };
   
   const BASE_URL = "http://yzzzzun.p-e.kr";
   const USERNAME = "test";
   const PASSWORD = "test";
   
   export function requestMyInfo(loginRes) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`
       }
     };
     return http.get(`${BASE_URL}/members/me`, authHeaders).json();
   }
   export function requestLogin() {
     var payload = JSON.stringify({
       email: USERNAME,
       password: PASSWORD
     });
   
     var params = {
       headers: {
         "Content-Type": "application/json"
       }
     };
     return http.post(`${BASE_URL}/login/token`, payload, params);
   }
   export function updateMyInfo(loginRes) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`,
         "Content-Type": "application/json"
       }
     };
     var payload = JSON.stringify({
       email: USERNAME,
       password: PASSWORD,
       age: 29
     });
   
     return http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
   }
   export function findPath(loginRes, source, target) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`
       }
     };
     return http
       .get(
         `${BASE_URL}/paths/?source=` + source + `&target=` + target,
         authHeaders
       )
       .json();
   }
   
   export default function() {
     let loginRes = requestLogin();
     check(loginRes, {
       "logged in successfully": resp => resp.json("accessToken") !== ""
     });
   
     let myObjects = requestMyInfo(loginRes);
     check(myObjects, { "retrieved member": obj => obj.id != 0 });
   
     let updatedMyInfo = updateMyInfo(loginRes);
     check(updateMyInfo, { "updated info": obj => obj.id != 0 });
   
     let path = findPath(loginRes, 3, 7);
     check(path, { "path stations check": obj => obj.stations.length != 0 });
   
     sleep(1);
   }
   
   ```

   ```powershell
             /\      |‾‾| /‾‾/   /‾‾/
        /\  /  \     |  |/  /   /  /
       /  \/    \    |     (   /   ‾‾\
      /          \   |  |\  \ |  (‾)  |
     / __________ \  |__| \__\ \_____/ .io
   
     execution: local
        script: load.js
        output: -
   
     scenarios: (100.00%) 1 scenario, 100 max VUs, 7m40s max duration (incl. graceful stop):
              * default: Up to 100 looping VUs for 7m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
   
   
   running (7m10.4s), 000/100 VUs, 25341 complete and 0 interrupted iterations
   default ✓ [======================================] 000/100 VUs  7m10s
   
        ✓ logged in successfully
        ✓ retrieved member
        ✓ updated info
        ✓ path stations check
   
        checks.........................: 100.00% ✓ 101364     ✗ 0
        data_received..................: 91 MB   212 kB/s
        data_sent......................: 36 MB   82 kB/s
        http_req_blocked...............: avg=8.62µs  min=2.8µs    med=4.51µs   max=28.17ms  p(90)=5.89µs  p(95)=6.91µs
        http_req_connecting............: avg=644ns   min=0s       med=0s       max=1.49ms   p(90)=0s      p(95)=0s
      ✓ http_req_duration..............: avg=10.75ms min=388µs    med=1.2ms    max=280.32ms p(90)=40.5ms  p(95)=73.46ms
          { expected_response:true }...: avg=13.92ms min=388µs    med=557.16µs max=280.32ms p(90)=65.68ms p(95)=85.58ms
        http_req_failed................: 37.50%  ✓ 76023      ✗ 126705
        http_req_receiving.............: avg=54.78µs min=21.52µs  med=53.87µs  max=9.4ms    p(90)=68.25µs p(95)=76.01µs
        http_req_sending...............: avg=16.72µs min=7.48µs   med=13.34µs  max=9.1ms    p(90)=23.43µs p(95)=29.06µs
        http_req_tls_handshaking.......: avg=2.8µs   min=0s       med=0s       max=27.67ms  p(90)=0s      p(95)=0s
        http_req_waiting...............: avg=10.68ms min=344.95µs med=1.13ms   max=280.09ms p(90)=40.43ms p(95)=73.39ms
        http_reqs......................: 202728  470.986939/s
        iteration_duration.............: avg=1.08s   min=1.03s    med=1.08s    max=1.39s    p(90)=1.12s   p(95)=1.13s
        iterations.....................: 25341   58.873367/s
        vus............................: 3       min=1        max=100
        vus_max........................: 100     min=100      max=100
   ```

   :point_right:Stress.js

   ```javascript
   import http from "k6/http";
   import { check, group, sleep, fail } from "k6";
   
   export let options = {
     stages: [
       { duration: "1m", target: 100 }, // below normal load
       { duration: "2m", target: 100 },
       { duration: "1m", target: 200 }, // normal load
       { duration: "2m", target: 200 },
       { duration: "1m", target: 250 }, // around the breaking point
       { duration: "2m", target: 250 },
       { duration: "3m", target: 0 } // scale down. Recovery stage.
     ],
     thresholds: {
       http_req_duration: ["p(99)<1500"] // 99% of requests must complete below 1.5s
     }
   };
   
   const BASE_URL = "http://yzzzzun.p-e.kr";
   const USERNAME = "test";
   const PASSWORD = "test";
   
   export function requestMyInfo(loginRes) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`
       }
     };
     return http.get(`${BASE_URL}/members/me`, authHeaders).json();
   }
   export function requestLogin() {
     var payload = JSON.stringify({
       email: USERNAME,
       password: PASSWORD
     });
   
     var params = {
       headers: {
         "Content-Type": "application/json"
       }
     };
     return http.post(`${BASE_URL}/login/token`, payload, params);
   }
   export function updateMyInfo(loginRes) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`,
         "Content-Type": "application/json"
       }
     };
     var payload = JSON.stringify({
       email: USERNAME,
       password: PASSWORD,
       age: 29
     });
   
     return http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
   }
   export function findPath(loginRes, source, target) {
     let authHeaders = {
       headers: {
         Authorization: `Bearer ${loginRes.json("accessToken")}`
       }
     };
     return http
       .get(
         `${BASE_URL}/paths/?source=` + source + `&target=` + target,
         authHeaders
       )
       .json();
   }
   
   export default function() {
     let loginRes = requestLogin();
     check(loginRes, {
       "logged in successfully": resp => resp.json("accessToken") !== ""
     })
   
     let myObjects = requestMyInfo(loginRes);
     check(myObjects, { "retrieved member": obj => obj.id != 0 });
   
     let updatedMyInfo = updateMyInfo(loginRes);
     check(updateMyInfo, { "updated info": obj => obj.id != 0 });
   
     let path = findPath(loginRes, 3, 7);
     check(path, { "path stations check": obj => obj.stations.length != 0 });
   
     sleep(1);
   }
   
   ```

   ```powershell
             /\      |‾‾| /‾‾/   /‾‾/
        /\  /  \     |  |/  /   /  /
       /  \/    \    |     (   /   ‾‾\
      /          \   |  |\  \ |  (‾)  |
     / __________ \  |__| \__\ \_____/ .io
   
     execution: local
        script: stress.js
        output: -
   
     scenarios: (100.00%) 1 scenario, 250 max VUs, 12m30s max duration (incl. graceful stop):
              * default: Up to 250 looping VUs for 12m0s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)
   
   WARN[0239] Request Failed                                error="Put \"http://yzzzzun.p-e.kr/members/me\": EOF"
   ERRO[0239] invalid type <nil>, expected string, []byte or ArrayBuffer
   running at reflect.methodValueCall (native)
   default at updateMyInfo (file:///home/ubuntu/stress.js:94:790(38))
   	at file:///home/ubuntu/stress.js:82:35(28)  executor=ramping-vus scenario=default source=stacktrace
   WARN[0596] Request Failed                                error="Post \"http://yzzzzun.p-e.kr/login/token\": read tcp 192.168.98.127:46120->3.35.176.212:80: read: connection reset by peer"
   ERRO[0596] invalid type <nil>, expected string, []byte or ArrayBuffer
   running at reflect.methodValueCall (native)
   default at loggedInSuccessfully (file:///home/ubuntu/stress.js:76:85(4))
   	at go.k6.io/k6/js/common.Bind.func1 (native)
   	at file:///home/ubuntu/stress.js:75:27(10)  executor=ramping-vus scenario=default source=stacktrace
   
   running (12m00.7s), 000/250 VUs, 33450 complete and 0 interrupted iterations
   default ✓ [======================================] 000/250 VUs  12m0s
   
        ✗ logged in successfully
         ↳  99% — ✓ 33449 / ✗ 1
        ✓ retrieved member
        ✓ updated info
        ✓ path stations check
   
        checks.........................: 99.99% ✓ 133794     ✗ 1
        data_received..................: 195 MB 271 kB/s
        data_sent......................: 54 MB  74 kB/s
        http_req_blocked...............: avg=378.4µs  min=3.03µs   med=5.13µs   max=30.02ms p(90)=573.11µs p(95)=3.93ms
        http_req_connecting............: avg=123.44µs min=0s       med=0s       max=17.04ms p(90)=469.65µs p(95)=510.49µs
      ✗ http_req_duration..............: avg=301.85ms min=397.93µs med=2.41ms   max=4.34s   p(90)=1.19s    p(95)=1.37s
          { expected_response:true }...: avg=181.98ms min=416.33µs med=614.82µs max=4.34s   p(90)=984.97ms p(95)=1.31s
        http_req_failed................: 37.50% ✓ 100348     ✗ 167242
        http_req_receiving.............: avg=58.44µs  min=0s       med=58.3µs   max=6.35ms  p(90)=70.96µs  p(95)=78.19µs
        http_req_sending...............: avg=26.93µs  min=8.15µs   med=15.61µs  max=12.31ms p(90)=55µs     p(95)=62.25µs
        http_req_tls_handshaking.......: avg=236.37µs min=0s       med=0s       max=29.55ms p(90)=0s       p(95)=3.43ms
        http_req_waiting...............: avg=301.77ms min=342.09µs med=2.32ms   max=4.34s   p(90)=1.19s    p(95)=1.37s
        http_reqs......................: 267590 371.286044/s
        iteration_duration.............: avg=3.41s    min=1.15ms   med=3.63s    max=9.46s   p(90)=5.27s    p(95)=5.38s
        iterations.....................: 33450  46.41249/s
        vus............................: 2      min=2        max=250
        vus_max........................: 250    min=250      max=250
   ```

## 요구사항 정리

### Step1 - 로깅과 모니터링

- [x] Logback 설정
- [x] Application Log 파일로 저장하기
  - [x] 회원가입 로깅
  - [x] 로그인 로깅
  - [x] 최단거리 조회 등 이벤트 로깅
  - [x] Logback 설정
- [x] Nginx Access Log 설정
- [x] Cloudwatch로 모니터링
  - [x] Cloudwatch 로그 수집
  - [x] Cloudwatch 메트릭 수집
