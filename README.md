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


### 1단계 - 웹 성능 테스트

- Running Map : https://yeojiin-subway.o-r.kr/

#### 경쟁사 성능 비교분석 (Mobile)

| 측정항목 | Running Map | 서울교통공사 | 네이버지도 | 카카오맵  |
|------|-------------|--------|-------|-------|
| FCP  | 8.540s      | 6.3s   | 2.2s  | 1.7s  |
| TTI  | 9.1s        | 8.3s   | 6.1s  | 5.2s  |
| SI   | 8.617s      | 9.5s   | 6.2s  | 7.7s  |
| TBT  | 8679ms      | 680ms  | 290ms | 120ms |
| LCP  | 8.679s      | 6.6s   | 7.4s  | 5.5s  |
| CLS  | 0.058       | 0      | 0.03  | 0.005 |

#### 경쟁사 성능 비교분석 (Desktop)

| 측정항목 | Running Map | 서울교통공사 | 네이버지도 | 카카오맵  |
|------|-------------|--------|-------|-------|
| FCP  | 5.935s      | 3.895s | 2.6s  | 1.7s  |
| TTI  | 6.2s        | 8.8s   | 6.1s  | 6.9s  |
| SI   | 5.9s        | 4.625s | 2.4s  | 4.4s  |
| TBT  | 60ms        | 1129ms | 0ms   | 0ms   |
| LCP  | 6.1s        | 5.824s | 6.9s  | 3.45s |
| CLS  | 0.004       | 0.001  | 0.006 | 0.04  |


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- `CLS`는 성능 분석결과(Mobile, Desktop) 90~100점 사이의 결과값이 나와 웹 성능 개선 대상에서는 제외했습니다. 
- TBT는 각각의 수치 편차가 크지 않을 경우 값이 작아져 성능과 큰 연관이 없다고 판단해 제외했습니다.
- 사용자는 비교 경쟁사와 20% 이상이 차이 날 경우 성능차이를 느끼기 때문에 이를 기준으로 개선 대상 항목을 정했습니다.
- 경장사 중 성능이 전테적으로 낮은 `서울교통공사`보다 높게, `네이버지도`와 `카카오맵`의 평군과 대비하여 20%로 목표를 설정합니다.
- 메인 페이지 진입 시 3초 안에 로딩을 목표로 한다 -> 사용자는 3초안에 로딩되지 않으면 떠난다

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
* 대상:  메인 페이지 기준
* 예상 방법: 텍스트 압축 사용
  - /js/vendors.js (전송크기: 2125kb -> 가능한 절감효과: 1716.5kb)
  - /js/main.js (전송크기: 172kb -> 가능한 절감효과: 143.6kb)
* 따라서 gzip 압축, 사용하지 않는 자바스크립트를 줄여 개선할 수 있을 것 같습니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

#### 대상 시스템 범위
- web server(nginx)
- web application server (tomcat)
- db (mysql)

#### 목표값 설정
- **예상 DAU: 10만명** -> 경쟁사 평균의 1/3 수준으로 설정
- DAU(예상 1일 사용자 수: MAU/30일)
  - 경쟁사 분석
    - 네이버지도 
      - MAU : 1,392만
      - DAU: 약 46.4만 
    - 카카오맵 
      - MAU : 729만 
      - DAU:  약 24.3만
      
- 사용률이 많은 시간의 예상 집중률
  - 사용률이 많은 시간대 : 07:00 ~ 9:00, 18:00 ~ 20:00
  - 피크 시간대 집중률: `2로 가정` (최대 트래픽 / 평소 트래픽)

- 1명당 1일 평균 접속 혹은 요청수를 예상
  - 1명당 1일 평균 요청수 : `6번`
    - 메인 페이지 접속 -> 경로검색 페이지 접속 -> 경로검색 기능
    - (메인 페이지 접속 횟수(1번) + 경로검색 페이지 접속 횟수(1번) + 경로검색(1번)) * 사용률이 많은 시간대(2번) = `6번`

- Throughput : 1일 평균 rps ~ 1일 최대 rps
  - 1일 총 접속 수 = 100,000 * 6 = `600,000` (1일 사용자 수(DAU) x 1명당 1일 평균 접속 수)
  - 1일 평균 rps = 600,000 / 86,400 = `6.94` (1일 총 접속 수 / 86,400 (초/일))
  - 1일 최대 rps = 6.94 * 2 = `13.88` (1일 평균 rps x (최대 트래픽 / 평소 트래픽))

- VUser 구하기
  - T = (3 * 0.1(s)) + 1(s) = `1.3(s)` = (R * http_req_duration) (+ 1s)
    - T : a value larger than the time needed to complete a VU iteration
    - R : the number of requests per VU iteration
    - 사용자가 한 번 접속했을 때의 요청수를 3으로 설정 (1일 평균 요청수 = 6)
    - 내부망에서 테스트할 경우 예상 latency를 추가한다 (1s)
  - VUser(1일 평균 rps 기준) = (6.94 * 1.3) / 3 = `3(명)` = (목표 rps * T) / R


#### 부하 테스트 시 저장될 데이터 건수 및 크기
- 현재 구성된 데이터 건수
  - 지하철 노선 : 23개
  - 지하철 역 : 616개
  - 지하철 구간 : 340개
- 부하 테스트 시 메인페이지 및 경로 조회에 대해서 테스트를 진행할 예정이기 때문에 새롭게 저장될 데이터 건수 및 크기는 없음

#### 시나리오
- 메인 페이지 접속 -> 경로 검색 페이지 접속 -> 겅로 검색 

#### Smoke Test
<details>
<summary> smoke.js </summary>

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '60s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://yeojiin-subway.o-r.kr/';

export function mainPage() {
  let response = http.get(`${BASE_URL}`);
  check(response, {'[Result] Main Page': (response) => response.status === 200});
}

export function pathPage() {
  let response = http.get(`${BASE_URL}/path`);
  check(response, {'[Result] Path Page': (response) => response.status === 200});
}

export function searchPath() {
  let response = http.get(`${BASE_URL}/paths/?source=1&target=178`);
  check(response, {'[Result] Search Path': (response) => response.status === 200});
}

export default function () {
  mainPage();
  pathPage();
  searchPath();
}
```

</details>


<details>
<summary> smoke 테스트 결과 </summary>

```
$ k6 run smoke.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 1m30s max duration (incl. graceful stop):
           * default: 1 looping VUs for 1m0s (gracefulStop: 30s)


running (1m00.0s), 0/1 VUs, 634 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  1m0s

     ✓ [Result] Main Page
     ✓ [Result] Path Page
     ✓ [Result] Search Path

     checks.........................: 100.00% ✓ 1902      ✗ 0
     data_received..................: 3.5 MB  58 kB/s
     data_sent......................: 242 kB  4.0 kB/s
     http_req_blocked...............: avg=26.74µs min=1.7µs    med=2.92µs  max=42.48ms  p(90)=3.99µs   p(95)=4.37µs
     http_req_connecting............: avg=284ns   min=0s       med=0s      max=284.62µs p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=31.4ms  min=738.31µs med=1.28ms  max=642.32ms p(90)=90.69ms  p(95)=104.53ms
       { expected_response:true }...: avg=31.4ms  min=738.31µs med=1.28ms  max=642.32ms p(90)=90.69ms  p(95)=104.53ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 1902
     http_req_receiving.............: avg=85.89µs min=29.13µs  med=76.96µs max=8.01ms   p(90)=120.37µs p(95)=140.8µs
     http_req_sending...............: avg=16.25µs min=7.3µs    med=14.13µs max=1.12ms   p(90)=22.68µs  p(95)=24.09µs
     http_req_tls_handshaking.......: avg=15.27µs min=0s       med=0s      max=27.16ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=31.3ms  min=667.42µs med=1.19ms  max=642.19ms p(90)=90.57ms  p(95)=104.42ms
     http_reqs......................: 1902    31.674521/s
     iteration_duration.............: avg=94.69ms min=77.15ms  med=84.68ms max=690.32ms p(90)=115.88ms p(95)=134.91ms
     iterations.....................: 634     10.558174/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1
```
</details>



---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요


---

### 🚀 1단계 - 웹 성능 테스트
<details>
<summary> </summary>

#### 요구사항
* 저장소를 활용하여 아래 요구사항을 해결합니다.
* README 에 있는 질문에 답을 추가한 후 PR을 보내고 리뷰요청을 합니다.

* [x] 웹 성능 예산 작성 후 서버 목표 응답시간 도출
  * 가설을 세우는 단계이므로, 정답은 없습니다. 주어진 정보를 바탕으로 나름의 논리만 세우면 됩니다. 서비스 오픈 등 여러 상황에선 주어진 정보가 제한적이라, 가설을 세우고 테스트하고 운영환경에서 검증해볼 수 밖에 없어요.

#### 힌트
1. 웹 성능 예산 작성하기
   WebPageTest, PageSpeed 등에서 테스트를 진행한 후, 웹 성능 예산을 작성합니다.
* 경쟁사 관련 자료   
  * 아래 자료를 참고하여 웹 성능 예산, 부하테스트 목푯값 등을 설계해보세요.
* 경쟁사   
  * 서울교통공사
  * 네이버지도
  * 카카오맵
* 언론보도
  * 데이터로보는 서울시 대중교통 이용
  * 카카오 모바일 APP 현황
  * 길찾기만 하루 1억건
  * 네이버 지도 MAU

2. 퍼포먼스 탭 활용하기
![img.png](image/img.png)
* 크롬 브라우저 도구를 활용하면, 퍼포먼스 탭에서 각 api별 요청 응답시간을 확인할 수 있어요. 웹 성능 예산에 영향을 주는 api 를 확인해보고, 가설을 세워보세요.

* 정량 기반(Quantity Based Metric) 예시
  * 메인 페이지의 모든 오브젝트 파일 크기는 10mb 미만으로 제한한다
  * 모든 웹 페이지의 각 페이지 내 포함된 자바스크립트 크기는 1mb 미만 이어야 한다.
  * 검색 페이지에는 2mb 미만의 이미지가 포함되어야 합니다.
* 시간 기반(Timing Based Metric) 예시
  * LTE 환경에서의 모바일 기기의 TTI:Time To Interactive는 5초 미만이어야 한다
  * DCL:Dom Content Loaded는 10초, FMP: First Meaningful Paint는 15초 미만이어야 한다
* 규칙 기반(Rule Based Metric) 예시
  * Lighthouse 성능 검사에서 80점 이상이어야 한다.


* FCP(First Contentful Paint) : 가장 첫번째 유의미한 콘텐츠(텍스트 or 이미지)가 표시되는 시간
* LCP(Large Contentful Paint) : 유의미한 콘텐츠(텍스트 or 이미지) 중 가장 큰 콘텐츠가 표시되는 시간
* TTI(Time To Interactive) : 사용자가 사이트와 완전히 상호작용 할 수 있을 때까지 걸리는 시간
* TBT(Total Blocking Time) : 상호작용이 불가능 했을 때의 시간
* CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정
* Speed Index : 페이지의 보이는 부분이 표시되는 평균 시간

</details>



---


### 🚀 2단계 - 부하테스트
<details>
<summary> </summary>

#### 요구사항
* [ ] 부하 테스트
  * [ ] 테스트 전제조건 정리
    * [ ] 대상 시스템 범위
    * [ ] 목푯값 설정 (latency, throughput, 부하 유지기간)
    * [ ] 부하 테스트 시 저장될 데이터 건수 및 크기
  * [ ] 아래 시나리오 중 하나를 선택하여 스크립트 작성
    * [ ] 접속 빈도가 높은 페이지
    * [ ] 데이터를 갱신하는 페이지
    * [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
  * [ ] Smoke, Load, Stress 테스트 후 결과를 기록

#### 힌트
부하테스트 소개
* k6 설치
```
  $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
  $ echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
  $ sudo apt-get update
  $ sudo apt-get install k6
 ```

* Smoke Test
```
  $ k6 run smoke.js
```

```
  # smoke.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = '[Target URL]';
const USERNAME = 'test id';
const PASSWORD = 'test password';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);
};
```

```
xport let options = {
  stages: [
    { duration: '1m', target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '2m', target: 500 }, // stay at 100 users for 10 minutes
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

```

** 테스트 설정값 구하기**   
**1. 목표 rps 구하기**
   a. 우선 예상 1일 사용자 수(DAU)를 정해봅니다.   
   b. 피크 시간대의 집중률을 예상해봅니다. (최대 트개픽 / 평소 트래픽)  
   c. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.   
   d. 이를 바탕으로 Throughput을 계산합니다.   
* Throughput : 1일 평균 rps ~ 1일 최대 rps
  * 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
  * 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
  * 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps


** 2. VUser 구하기 **
 * Request Rate: measured by the number of requests per second (RPS)
 * VU: the number of virtual users
 * R: the number of requests per VU iteration
 * T: a value larger than the time needed to complete a VU iteration

```
T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency를 추가한다

VUser = (목표 rps * T) / R
```
가령, 두개의 요청 (R=2)이 있고, 왕복시간이 0.5s, 지연시간이 1초라고 가정할 때 (T=2), 계산식은 아래와 같다.   
VU = (300 * 2) / 2 = 300

** 3. 테스트 기간**
* 일반적으로 Load Test는 보통 30분 ~ 2시간 사이로 권장합니다. 부하가 주어진 상황에서 DB Failover, 배포 등 여러 상황을 부여하며 서비스의 성능을 확인합니다.

** 4.결과 화면 **
![img.png](image/img2.png)


* 대시보드 구성
1. influx db 설치
   * influx db 는 8086 포트를 점유합니다.
```
$ sudo apt install influxdb
```   
2. grafana 설치
* grafana 는 3000 포트를 점유합니다.
* 따라서 보안그룹에서 자신의 IP 에 대해 3000 포트 open 정책을 추가합니다.
* 초기 비밀번호 : admin / admin
```
$ sudo apt install grafana
```

* ubuntu 20.04 인 경우
```
$ wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
$ echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
$ sudo apt update
$ sudo apt install grafana
$ sudo service grafana-server start
```

3. grafana 설정
   configuration > datasource 메뉴에서 datasource 를 추가합니다.
![img.png](image/img3.png)
* Dashboards > Import > Grafana.com Dashboard 항목에 2587을 입력하고, datasource 로 influxdb 를 설정한 후 import 합니다.
* https://grafana.com/grafana/dashboards/2587

![img.png](image/img4.png)

4. 부하테스트
```
$ k6 run --out influxdb=http://localhost:8086/myk6db smoke.js
```

![img.png](image/img5.png)

</details>
