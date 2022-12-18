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
#### 용어 정리
- FCP(First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- TTI(Time to Interactive) : 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- SI(Speed Index) : 페이지 콘텐츠가 보여지는 평균시간 (view port 사이즈에 의존)
- TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현
- LCP(Large Contentful Paint) : 최대 텍스트 또는 이미지가 표시되는 시간
- CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
### 성능비교 - PagesSpeed Mobile 기준
| 사이트    | FCP  | TTI  | SI   | TBT    | LCP  | CLS   |
|--------|------|------|------|--------|------|-------|
| 러닝맵    | 15.3초 | 16.0초 | 15.3초 | 700밀리초 | 15.9초 | 0.042 |
| 서울교통공사 | 6.8초 | 9.2초 | 10.5초 | 1580밀리초 | 7.0초 | 0     |
| 네이버지도  | 2.4초 | 6.9초 | 5.8초 | 670밀리초 | 7.9초 | 0.03  |
| 카카오맵   | 1.7초 | 4.5초 | 7.2초 | 80밀리초  | 5.5초 | 0.005 |
- FCP : 모바일 서비스는 빠른 응답이 중요하므로, 되도록이면 네이버 지도와 비슷한 응답속도를 낼수 있어야 합니다.
- TTI : js, css등 페이지가 로딩하는데 영향을 미치는 요소는 많지만, 아직 기능이 많지 않으므로 네이버의 TTI를 목표로 진행해야 합니다.
- LCP : 위의 추가적인 요소들을 반영하고, CDN+와 같은 캐시정책을 사용하여 응답시간을 마찬가지로 네이버와 유사하게 하는걸 목표로 진행해야 합니다.

러닝맵 사이트 : https://subwayrun.kro.kr


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
   PageSpeed에서는 다음과 같은 사항들을 추천하고 있습니다.
   1) 텍스트 압축 - 9.45초
   2) 사용하지 않는 자바스크립트 줄이기 - 3.6초
   3) 렌더링 차단 리소스 제거하기 - 0.75초
4) 사용하지 않는 CSS 줄이기 - 0.15초

위와 같은 사항들을 반영하여 최종적으로 목표는 다음과 같다.
선정 기준은 다음과 같다.
1. 위 요소들의 합계 : 13.95초
2. 위의 항목에 마진을 적용하여 13초로 가정.
3. LCP는 네트워크 속도나 위치에 기반해서 줄어들거라 예상하지만, 일단 위의 항목 수정에 적용을 받는다고 가정 ( 이건 추후 검증이 필요하다 )

최종 결과물

| 런닝맵  | FCP   | TTI   | SI    | TBT    | LCP   | CLS   |
|------|-------|-------|-------|--------|-------|-------|
| 현재   | 15.3초 | 16.0초 | 15.3초 | 700밀리초 | 15.9초 | 0.042 |
| 예상치  | 1.35초 | 2.05초 | 1.35초 | 700밀리초 | 1.95초 | 0.042 |
| 목표치  | 2.3초  | 3.0초  | 2.3초  | 700밀리초 | 2.9초  | 0.042 |

---

### 2단계 - 부하 테스트
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- a.예상 DAU :  
  1) 일평균 네이버지도는 DAU 516만명, 카카오맵은 219만명이다.
  2) 해당 서비스는 신규 서비스라고 가정하여 카카오맵의 10%인 20만으로 선정한다.
- b.집중률 : 
  1) 최대 트래픽을 80%로 가정하면, 16만이다. ( 임의로 잡은 트래픽 비율 )
  2) 평균 트래픽을 40%로 가정하면, 8만이다. ( 임의로 잡은 트래픽 비율 )
  3) 그러므로, ( 최대 트래픽 / 평균 트래픽 ) = 2 이므로, 집중률은 2이다. 
- c.1명당 1일 평균 접속 혹은 요청수 
  1) 출/퇴근길에 사용한다 가정하여 1일 평균접속수는 2로 가정한다. 
  2) 그러므로 하루 총 접속수는 20만 * 2 인 40만으로 가정합니다.
- e.1일 평균 RPS 
  1) 40만 / 86400 = 4.62 소수점 첫째 자리에서 반올림하여 5로 가정한다.
- f.1일 최대 RPS 
  1) 누군가는 퇴근할때 누군가는 출근할수 있으므로 2로 가정. 즉 5 * 2 = 10 으로 가정한다.
- g.Throughput ( 종합 )
  1) 1일 총 접속 수 = 40만
  2) 1일 평균 rps = 5
  3) 1일 최대 rps = 10
- h.VUser
  1) R : 4(접속 -> 경로 검색 페이지 -> 노선 목록 조회 - 경로 검색)
  2) T : ( 4 * 0.5 ) + 1 = 3초
  3) 평균 VUser : 5 * 3 / 3 = 5
  4) 최대 VUser : 10 * 3 / 3 = 10

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- Smoke Test Script
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 1},
        { duration: '1m', target: 2},
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://subwayrun.kro.kr';
const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function ()  {
    let main = http.get(`${BASE_URL}`);
    check(main, {'200 : main page': (res) => res.status === 200});

    let stations = http.get(`${BASE_URL}/stations`);
    check(stations, {'200 : stations': (res) => res.status === 200});

    let lines = http.get(`${BASE_URL}/lines`);
    check(lines, {'200 : lines': (res) => res.status === 200});

    let path = http.get(`${BASE_URL}/path`);
    check(path, {'200 : path': (res) => res.status === 200});
};
```
- Smoke Test Result
![smoke_dashboard.png](k6%2Fsmoke%2Fsmoke_dashboard.png)

- Load Test Script
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '10s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '10s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.0s
    }
};

const BASE_URL = 'https://subwayrun.kro.kr';

export default function ()  {
    let main = http.get(`${BASE_URL}`);
    check(main, {'200 : main page': (res) => res.status === 200});

    let stations = http.get(`${BASE_URL}/stations`);
    check(stations, {'200 : stations': (res) => res.status === 200});

    let lines = http.get(`${BASE_URL}/lines`);
    check(lines, {'200 : lines': (res) => res.status === 200});

    let path = http.get(`${BASE_URL}/path`);
    check(path, {'200 : path': (res) => res.status === 200});
};
```
- Load Test Result
![load_dashboard.png](k6%2Fload%2Fload_dashboard.png)
- Stress Test Script
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 5 },
        { duration: '2m', target: 10 },
        { duration: '2m', target: 20 },
        { duration: '2m', target: 40 },
        { duration: '2m', target: 80 },
        { duration: '2m', target: 150 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    }
};

const BASE_URL = 'https://subwayrun.kro.kr';

export default function ()  {
    let main = http.get(`${BASE_URL}`);
    check(main, {'200 : main page': (res) => res.status === 200});

    let stations = http.get(`${BASE_URL}/stations`);
    check(stations, {'200 : stations': (res) => res.status === 200});

    let lines = http.get(`${BASE_URL}/lines`);
    check(lines, {'200 : lines': (res) => res.status === 200});

    let path = http.get(`${BASE_URL}/path`);
    check(path, {'200 : path': (res) => res.status === 200});
};
```
- Stress Test Result
![stress_dashboard.png](k6%2Fstress%2Fstress_dashboard.png)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요

