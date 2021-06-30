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
https://thread.honbabzone.com/

1. 7271kim-proxy-ec2 ( 54.180.2.142 )
- /home/ubuntu/nginx/logs

2. 7271kim-thread-ec2 ( 3.36.85.114 )
- /home/logs/nextstep.honbabzone_error.log
- /home/logs/nextstep.honbabzone_info.log
- /home/logs/nextstep.honbabzone_sql_error.log
- /home/logs/nextstep.honbabzone_sql_info.log


2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-7271kim

---

### 2단계 - 성능 테스트
#### 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
 - 아직 웹 성능 예산을 작성하거나, 성능 테스트를 진행 해본 적이 없어 3초의 법칙에 기반하여, 수업시간데 배운대로 정량적 지표를 사용하여 예산을 짠다면
```
 # WebPageTest : 최소 B 이상 
 # PageSpeed : 80점 이상 , SpeedIndex 3초 이내 
 # 메인 페이지의 모든 오브젝트 파일 크기는 10MB 미만으로 제한한다.
 # 모든 웹 페이지의 각 페이지 내 포함된 자바스크립트 크기는 1MB를 넘지 않아야 한다.
```
 정도로 생각해볼 수 있을 것 같습니다. 

#### 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
```
 # Security score : E >> HTTP 헤더 보안성을 확보합니다.
 # Compress Transfer : F >> Gzip 압축을 통해 전달하는 패킷의 양을 줄입니다.
 # Cache static content : C >> 캐싱을 통해 불필요한 요청 수를 줄입니다. 
 # 사용하지 않는 자바스크립트 줄이기 >> 지연 로딩을 통해 네트워크 활동 줄이기
```
 정도 개선할 수 있지 않을까 싶습니다. 

#### 3. 부하테스트 전제조건은 어느정도로 설정하셨나요
```
# 대상 시스템 범위 
: API 검색
  
# 목푯값 설정
:latency : 90%가 400ms 이하, 95% 800ms 이하, 99.9% 1.5s 이하 응답 ( load test 기준 )
:throughput : TPS
 - 1일 총 접속수 = 10000 * 10
 - 1일 평균 rps = 1.16
 - 1일 최대 rps = 10.16
 - 부하 유지기간 : 30s 

# 시나리오 대상 
  - 접속 빈도가 높은 기능 
   >> 경로검색 
   >> 즐겨찾기 
```

####  4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
 - smoke test
```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, 
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 1500'],
    checks: ['rate > 0.99'],
  },
};

const BASE_URL = 'https://thread.honbabzone.com';
const USERNAME = 'user@test.com';
const PASSWORD = '1234';

export default function ()  {
  let loginResponse = 로그인();
  

  즐겨찾기_조회하기(loginResponse);

  경로_조회하기(loginResponse)

  sleep(1);
};

export function 로그인() {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(`${BASE_URL}/login/token`, payload, params);
  
   check(response, {
    'logged in successfully': (response) => response.json('accessToken') !== '',
  });

  return response;
}

export function 즐겨찾기_조회하기(loginResponse) {
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginResponse.json('accessToken')}`,
    },
  };

  const favorites = http.get(`${BASE_URL}/favorites`, authHeaders).json();

  check(favorites, { 'retrieved favorites': (obj) => obj.length > 0 });
}


export function 경로_조회하기(loginRes) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  const favorites = http.get(`${BASE_URL}/paths/?source=1&target=11`, authHeaders).json();
  check(favorites, { 'retrieved favorites': (obj) => obj.distance === 222 });
}
```

 - load test

```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 190, 
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 1500'],
    checks: ['rate > 0.99'],
  },
};

const BASE_URL = 'https://thread.honbabzone.com';
const USERNAME = 'user@test.com';
const PASSWORD = '1234';

export default function ()  {
  let loginResponse = 로그인();
  

  즐겨찾기_조회하기(loginResponse);

  경로_조회하기(loginResponse)

  sleep(1);
};

export function 로그인() {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(`${BASE_URL}/login/token`, payload, params);
  
   check(response, {
    'logged in successfully': (response) => response.json('accessToken') !== '',
  });

  return response;
}

export function 즐겨찾기_조회하기(loginResponse) {
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginResponse.json('accessToken')}`,
    },
  };

  const favorites = http.get(`${BASE_URL}/favorites`, authHeaders).json();

  check(favorites, { 'retrieved favorites': (obj) => obj.length > 0 });
}


export function 경로_조회하기(loginRes) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  const favorites = http.get(`${BASE_URL}/paths/?source=1&target=11`, authHeaders).json();
  check(favorites, { 'retrieved favorites': (obj) => obj.distance === 222 });
}

```

 - stress test

```
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 0 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 180 },
    { duration: '20s', target: 0 },
    { duration: '20s', target: 100 },
    { duration: '20s', target: 180 },
    { duration: '30s', target: 0 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 180 },
  ],
  thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 1500'],
    checks: ['rate > 0.99'],
  },
};

const BASE_URL = 'https://thread.honbabzone.com';
const USERNAME = 'user@test.com';
const PASSWORD = '1234';

export default function ()  {
  let loginResponse = 로그인();
  

  즐겨찾기_조회하기(loginResponse);

  경로_조회하기(loginResponse)

  sleep(1);
};

export function 로그인() {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(`${BASE_URL}/login/token`, payload, params);
  
   check(response, {
    'logged in successfully': (response) => response.json('accessToken') !== '',
  });

  return response;
}

export function 즐겨찾기_조회하기(loginResponse) {
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginResponse.json('accessToken')}`,
    },
  };

  const favorites = http.get(`${BASE_URL}/favorites`, authHeaders).json();

  check(favorites, { 'retrieved favorites': (obj) => obj.length > 0 });
}


export function 경로_조회하기(loginRes) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  const favorites = http.get(`${BASE_URL}/paths/?source=1&target=11`, authHeaders).json();
  check(favorites, { 'retrieved favorites': (obj) => obj.distance === 222 });
}

대략 180명 이상부터 실패 케이스 발생
```