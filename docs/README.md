## Step2 부하 테스트

### 요구사항
#### 부하 테스트
- [x] 테스트 전제조건 정리
- [x] 대상 시스템 범위
- [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
- [x] 부하 테스트 시 저장될 데이터 건수 및 크기
- [x] 각 시나리오에 맞춰 스크립트 작성
- [x] 접속 빈도가 높은 페이지
- [x] 데이터를 갱신하는 페이지
- [x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
- [x] Smoke, Load, Stress 테스트 후 결과를 기록

#### 부하테스트 소개
* k6 설치
```shell
  $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
  $ echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
  $ sudo apt-get update
  $ sudo apt-get install k6
```
* Smoke Test
```
  $ k6 run smoke.js
```

#### smoke.js
```java
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
export let options = {
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

* 테스트 설정값 구하기
1. 목표 rps 구하기
   - a. 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
   - b. 피크 시간대의 집중률을 예상해봅니다. (최대 트개픽 / 평소 트래픽)
   - c. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
   - d. 이를 바탕으로 Throughput을 계산합니다.

- Throughput : 1일 평균 rps ~ 1일 최대 rps
- 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
- 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
- 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps


2. VUser 구하기
   - Request Rate: measured by the number of requests per second (RPS)
   - VU: the number of virtual users
   - R: the number of requests per VU iteration
   - T: a value larger than the time needed to complete a VU iteration
   - T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency를 추가한다

- VUser = (목표 rps * T) / R
- 가령, 두개의 요청 (R=2)이 있고, 왕복시간이 0.5s, 지연시간이 1초라고 가정할 때 (T=2), 계산식은 아래와 같다.
- VU = (300 * 2) / 2 = 300

3. 테스트 기간
   - 일반적으로 Load Test는 보통 30분 ~ 2시간 사이로 권장합니다. 부하가 주어진 상황에서 DB Failover, 배포 등 여러 상황을 부여하며 서비스의 성능을 확인합니다.

4. 부하테스트
```shell
   $ k6 run --out influxdb=http://localhost:8086/myk6db smoke.js
```
