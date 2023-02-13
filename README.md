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
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 네이버 지도
![image](https://user-images.githubusercontent.com/24540286/217856611-eee1157f-21a1-4a53-9e94-5f70afb3663d.png)
- 카카오맵
![image](https://user-images.githubusercontent.com/24540286/217857171-464b4e1b-4368-4c59-bd85-a5fd69580496.png)
- 서울 교통공사
![image](https://user-images.githubusercontent.com/24540286/217857505-2e3dc4f9-97c6-4b46-a651-5293e5d11f49.png)

- 예산
  - 예산은 3개 경쟁사의 중간수준
    - fcp 4초이내
    - speed index 6초
    - lcp 4.5초

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 데이터 압축
- 정적 리소스 캐싱

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 시스템
  - Webserver
  - WAS
  - DB

- 전제 조건
  - 목표 rps 구하기
    -  우선 예상 1일 사용자 수(DAU)를 정해봅니다.
      - 100만
    - 피크 시간대 집중률
      - 1명당 1일 평균 접속수 : 2회(출퇴근 2회)
      - 1일 총 접속수 : 200만 (100만 * 2회)
      - 1일 평균 rps : 20 (=1일 총 접속 수 / 86,400)
      - 1일 최대 rps : 40 (=1일 평균 rps * 피크시간대 집중률(2배))
  - vuser
    - R : 3
    - http_req_duration : 0.2
    - T : 2.5 (=3 * 0.2 + 1)
    - 평균 VUser : 10 (20 * 2.5 / 5)
    - 최대 VUser : 20 (40 * 2.5 / 5)

  - 시나리오
    - 로그인
    - 경로 검색

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- smoke
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '2m', target: 500 }, // stay at 100 users for 10 minutes
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};
const BASE_URL = 'https://tndyd5390.kro.kr';
const USERNAME = 'tndyd5390@naver.com';
const PASSWORD = '1541';

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

  let obj = http.get(`${BASE_URL}/paths/?source=1&target=7`, authHeaders).json();
  check(obj, {'path search': (obj) => obj.stations != null});
  sleep(1);
};
```
 ![image](https://user-images.githubusercontent.com/24540286/218134482-d1a1924f-8268-429f-bdcf-ac63a16b84f4.png)
- load
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    {duration: '10s', target: 10},
    {duration: '1m', target: 10},
    {duration: '10s', target: 20},
    {duration: '1m', target: 20},
    {duration: '10s', target: 20},
  ],
  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
  }
};
const BASE_URL = 'https://tndyd5390.kro.kr';
const USERNAME = 'tndyd5390@naver.com';
const PASSWORD = '1541';

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

  let obj = http.get(`${BASE_URL}/paths/?source=1&target=7`, authHeaders).json();
  check(obj, {'path search': (obj) => obj.stations != null});
  sleep(1);
};
```
![image](https://user-images.githubusercontent.com/24540286/218502038-fc215f36-d85d-468d-b46a-db57441ea79b.png)
- stress
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    {duration: '10s', target: 50},
    {duration: '2m', target: 50},
    {duration: '10s', target: 100},
    {duration: '30s', target: 300},
    {duration: '10s', target: 500},
    {duration: '2m', target: 100}
  ],
  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
  }
};
const BASE_URL = 'https://tndyd5390.kro.kr';
const USERNAME = 'tndyd5390@naver.com';
const PASSWORD = '1541';

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

  let obj = http.get(`${BASE_URL}/paths/?source=1&target=7`, authHeaders).json();
  check(obj, {'path search': (obj) => obj.stations != null});
  sleep(1);
};
```
![image](https://user-images.githubusercontent.com/24540286/218488417-c3f4de42-1752-4798-a9cf-58540bf19770.png)


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
