## 2단계 - 부하테스트
### 부하테스트 시나리오
1. 메인 페이지 접속: GET https://earth-h.tk
2. 로그인 페이지 접속: GET https://earth-h.tk/login
3. 로그인 요청: POST https://earth-h.tk/login/token
4. 로그인 완료: GET https://earth-h.tk/members/me
5. 경로 검색 페이지 접속: GET https://earth-h.tk/path
6. 경로 검색 요청: GET https://earth-h.tk/paths?source={}&target={}

### 개념 정리
[ Smoke Test ]
- 최소한의 부하로 구성된 테스트
    - 테스트 시나리오에 오류가 없는지 확인 가능
    - VUser: 1

[ Load Test ]
- 서비스의 평소 트래픽과 최대 트래픽 상황의 성능 테스트
  - 평균 VUser: 3
  - 최대 VUser: 6
- 기능 정상 동작 검증
- 배포, 인프라 변경(scale out, DB failover) 시, 성능 변화 체크할 수 있도록

[ Stress Test ]
- 점진적으로 부하를 증가시켜 한계점 확인 테스트
  - 무조건 문제가 발생할 수 밖에 없는 테스트
  - 한계점은 변곡점이라고 생각할 수도 있고, 실제 에러가 발생한 지점이라고 볼 수도 있음
  - 1차 테스트
    - 최소 VUser: 1
    - 최대 VUser: 96
    - 1차의 경우, K6 로그로 Request Failed가 뜨지 않아 제대로된 stress 테스트가 아니라 판단되어 2차 테스트 진행
  - 2차 테스트
    - 최소 VUser: 6
    - 최대 VUser: 298
    - 2차 테스트 시, 244 VUser 즈음부터 Request Failed 에러가 발생하며 http_req_duration의 min 수치가 바닥을 찍음
      <br>그러다가, 최대 VUser를 지나 248 VUser 즈음으로 내려왔을 때부터 정상 응답 받기 시작함

[ K6 부하테스트 툴 ]
- K6 설치
```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
$ echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
$ sudo apt-get update
$ sudo apt-get install k6
```

- Smoke Test 예시
```bash
$ k6 run smoke.js
```

```bash
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

- load/stress Test에서 사용할 stages 예시
```bash
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

### 참고사항
**[ RUNNINGMAP ]**
- URL
  - https://earth-h.tk
- 계정 정보
    - ID: earth.h.183@gmail.com
    - PW: 123456

**[ 그라파나 ]**
- URL
  - 54.180.107.199:3000
- 그라파나 접근
    - 현재 제 IP에 대해서만 3000 포트를 오픈해두었습니다.
    - 그라파나를 보고 싶으시다면, AWS의 보안그룹 설정에 IP 추가 또는 DM으로 IP 정보 주시면 추가해두겠습니다.
    - BASTION 서버를 통해 Web Server 부하테스트를 하고자 BASTION 서버에 모니터링을 설치했으며, 이에 도메인은 연결하지 않았습니다.
- 계정 정보
    - ID: admin
    - PW: admin123
