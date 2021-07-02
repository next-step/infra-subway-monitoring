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
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [X] 로그 설정하기
- [X] Cloudwatch로 모니터링

1. 각 서버내 로깅 경로를 알려주세요
- nginx server
    - ec2 name : oper912-reverse-proxy
    - 접속 : (bastion 서버에서) ssh ubuntu@nginx
    - 로깅 경로
        - /var/log/nginx/access.log
        - /var/log/nginx/error.log

- application server
    - ec2 name : oper912-was
    - 접속 : (basion 서버에서) ssh ubuntu@was
    - 로깅 경로 : /home/ubuntu/log/app.log
    
- bastion server 정보
    - ec2 name : oper912-Bastion
    - ip : 52.79.239.230
    
2. Cloudwatch 대시보드 URL을 알려주세요
- [DASHBOARD-oper912](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-oper912)
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

A. 사전 분석 

    1. 가장 중요한 페이지
        - 메인 페이지: 가장 접속 빈도가 높은곳이므로 사용자가 성능에 가장 민감한 곳으로 판단 

B. 경쟁사와 현재 내 사이트 성능 비교 (PageSpeed 데스크톱 기준)
    
    1. 내 사이트 (https://oper912-infra-subway.p-e.kr/)
        - 68점
        - FCP (First Contentful Paint)   : 2.7 s
        - SI  (Speed Index)              : 2.7 s
        - LCP (Largest Contentful Paint) : 2.8 s
        - TTI (Time to Interactive)      : 2.8 s
        - TBT (Total Blocking Time)      : 50ms
        - CLS (Cumulative Layout Shift)  : 0.004 s

    2. 서울교통공사 사이버스테이션 (http://www.seoulmetro.co.kr/kr/cyberStation.do)
        - 68점
        - FCP (First Contentful Paint)   : 1.6 s
        - SI  (Speed Index)              : 2.7 s
        - LCP (Largest Contentful Paint) : 3.6 s
        - TTI (Time to Interactive)      : 2.0 s
        - TBT (Total Blocking Time)      : 90ms
        - CLS (Cumulative Layout Shift)  : 0.013 s

    3. 카카오맵 (https://map.kakao.com)
        - 64점
        - FCP (First Contentful Paint)   : 0.6 s
        - SI  (Speed Index)              : 2.6 s
        - LCP (Largest Contentful Paint) : 0.6 s
        - TTI (Time to Interactive)      : 3.0 s
        - TBT (Total Blocking Time)      : 920ms
        - CLS (Cumulative Layout Shift)  : 0.017 s

C. 허용 가능한 목표를 정한다

    1. 아직 예산을 잡는 경험이 없어서 기준을 잡기가 애매하여 Lighthouse 성능 감사가 80 이상이어야 한다는 가정 하에 
      PageSpeed에서 데스크톱 기준으로 분석 후에 Lighthouse Scoring Calculator 통해서 기준을 잡았습니다. 
      Desktop, v8 기준이며 상대적으로 경쟁사에 비해 부족하지 않은 TTI, TBT, CLS 제외 Metric Score를 모두 61로 주었을떄 81점이 되길래 해당 Value를 기준으로 잡았습니다.
        - FCP (First Contentful Paint)   : 1.4 s
        - SI  (Speed Index)              : 2 s
        - LCP (Largest Contentful Paint) : 2 s
        - TTI (Time to Interactive)      : 2.8 s
        - TBT (Total Blocking Time)      : 50ms
        - CLS (Cumulative Layout Shift)  : 0.004 s


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

A. 개선 가능 목록

    - 텍스트 압축 사용
    - 사용하지 않는 자바스크립트 줄이기
    - 렌더링 차단 리소스 제거하기
    - 효율적인 캐싱 정책을 사용하여 정적인 애셋 제공하기


3. 부하테스트 전제조건은 어느정도로 설정하셨나요

A. DAU 가정

    - 지하철 하루 이용 객수 1000만명, 동일한 사람이 출퇴근 시간 이용한다고 가정하에 500만 중 30%정도 서비스를 이용한다고 가정

B. 1일 요청수 가정

    - 서비스 이용자는 출근전, 출근시, 퇴근전, 퇴근시 하루 4번 요청한다고 가정
    
C. 피크시간대 집중율 가정

    - 대중교통 출근시간에 하루 이용객의 20%가 몰린다는 기사 확인 후 지하철 운용 시간을 하루 18시간으로 추정하고 출근시간을 2시간으로 잡았을때
      일평균 이용객보다 출근시간에 2배 정도 많다고 가정
    - ex) 하루 100명 이용시 / 2시간동안 20명 이용 - 시간 평균 10명 / 16시간 동안 80명 이용 - 시간 평균 5명

D. 목푯값 설정 (1일 총 접속수 / 1일 평균 rps / 1일 최대 rps 계산)

    - DAU = 150만
    - 피크시간대 집중율 = 2
    - 1일 요청수 = 4
    - 1일 총 수접속수 = 1,500,000(DAU) X 4(1일 요청수) = 6,000,000
    - 1일 평균 rps = 6,000,000(1일 총 접속수) / 86,400(초/일) = 69.45
    - 1일 최대 rps = 69.45(1일 평균 rps) X 2(피크시간대 집중율) = 138.9


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

   > 전체 성능 테스트 시나리오 (조회, 갱신, 여러 데이터 참조 페이지 조회)
   > 로그인 -> 내정보 확인 -> 내정보 수정 -> 경로 조회

A. smoke 테스트 : script/smoke.js

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

const BASE_URL = 'https://oper912-infra-subway.p-e.kr';
const USERNAME = 'test@gmail.com';
const PASSWORD = 'password';

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

export function requestMyInfo(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json("accessToken")}`
        }
    };
    return http.get(`${BASE_URL}/members/me`, authHeaders).json();
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

```shell

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: ./smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (11.0s), 0/1 VUs, 9 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ updated info
     ✓ path stations check

    
     checks.........................: 100.00% ✓ 36       ✗ 0  
     data_received..................: 23 kB   2.1 kB/s
     data_sent......................: 8.1 kB  729 B/s
     http_req_blocked...............: avg=4.29ms   min=2µs      med=7µs      max=154.3ms  p(90)=9.99µs   p(95)=22.75µs 
     http_req_connecting............: avg=114.86µs min=0s       med=0s       max=4.13ms   p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=51.55ms  min=10.05ms  med=13.62ms  max=237.03ms p(90)=160.28ms p(95)=185.76ms
       { expected_response:true }...: avg=166.73ms min=125.09ms med=159.93ms max=237.03ms p(90)=217.08ms p(95)=227.05ms
     http_req_failed................: 75.00%  ✓ 27       ✗ 9  
     http_req_receiving.............: avg=108.61µs min=38µs     med=98.5µs   max=644µs    p(90)=120.5µs  p(95)=153µs   
     http_req_sending...............: avg=38.05µs  min=12µs     med=36µs     max=107µs    p(90)=54µs     p(95)=63µs    
     http_req_tls_handshaking.......: avg=3.96ms   min=0s       med=0s       max=142.81ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=51.4ms   min=9.94ms   med=13.54ms  max=236.91ms p(90)=160.17ms p(95)=185.62ms
     http_reqs......................: 36      3.258378/s
     iteration_duration.............: avg=1.22s    min=1.16s    med=1.19s    max=1.45s    p(90)=1.29s    p(95)=1.37s   
     iterations.....................: 9       0.814594/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
