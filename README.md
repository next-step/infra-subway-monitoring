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
- `경로검색 페이지` 기준 경쟁사(네이버지하철) 와의 성능차이 20% 이내
- 경로 검색 기능을 빠르게 사용할 수 있어야 하기 때문에 TTI 지표가 1순위
- 3초 안에 로딩되어야 하기 때문에 FCP 지표가 2순위
- [네이버지하철](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
  - FCP - 2.2s
  - LCP - 7.9s
  - TTI - 6.7s
  - TBT - 290ms
  - CLS - 0.03
- [자사 앱](https://subway.geunhwanlee.p-e.kr/path)
  - FCP - 16.3s
  - LCP - 16.3s
  - TTI - 17.1s
  - TBT - 260ms
  - CLS - 0.004
- 성능예산 목표
  - FCP - 2.64s 이내
  - TTI - 5s 이내

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 리소스 줄이기
  - 자바스크립트 압축
  - 자바스크립트 분할하여 사이즈 줄이기
  - 사용하지 않는 자바스크립트 지연 로딩
  - 사용하지 않는 css 지연로딩
- 리소스 캐싱하기
- 웹폰트가 로드되는 동안 텍스트 표시하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
  - 접속 빈도가 높은 페이지 -> 메인페이지
  - 데이터를 갱신하는 페이지 -> 나의 정보 수정 기능
  - 데이터를 조회하는데 여러 데이터를 참조하는 페이지 -> 지하철 경로 검색 기능
- 부하테스트 목표
  - Throughput
    - 지하철종결자 DAU 200만
    - 출퇴근 시간 2시간 안에 하루 지하철 이용자의 1/4(50만)이 이용
    - 지하철 운행시간 대략 19시간
    - 1일 평균 23rps
    - 운행시간 평균 29rps
    - 1일 최대 70rps
  - Latency
    - 50ms 이하 (왕복 100ms 이하)
  - 저장 데이터
    - 지하철역 616건
    - 노선 23건
    - 구간 340건
  

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- 메인페이지

|-|smoke test|load test|stress test| 
|---|---|---|---|
|스크립트|k6/main/main_page_smoke.js|k6/main/main_page_load.js|k6/main/main_page_stress.js|
|결과|k6/main/main_page_smoke.log|k6/main/main_page_load.log|k6/main/main_page_stress.log|
|설명|rps 1로 10초간 실행|평균 rps인 29와 최대 rps인 70으로 실행|rps가 245를 넘어가면서 socket: too many open files 발생. rps가 낮아지면서 정상화.|

- 나의 정보 수정 기능

|-|smoke test|load test|stress test| 
|---|---|---|---|
|스크립트|k6/member/put_members_smoke.js|k6/member/put_members_load.js|k6/member/put_members_stress.js|
|결과|k6/member/put_members_smoke.log|k6/member/put_members_load.log|k6/member/put_members_stress.log|
|설명|rps 1로 10초간 실행|평균 rps인 29와 최대 rps인 70으로 실행|rps가 245를 넘어가면서 socket: too many open files 발생. rps가 낮아지면서 정상화.|

- 지하철 경로 검색 기능

|-|smoke test|load test|stress test| 
|---|---|---|---|
|스크립트|k6/path/get_paths_smoke.js|k6/path/get_paths_load.js|k6/path/get_paths_stress.js|
|결과|k6/path/get_paths_smoke.log|k6/path/get_paths_load.log|k6/path/get_paths_stress.log|
|설명|rps 1로 10초간 실행|평균 rps인 29와 최대 rps인 70으로 실행. latency 목표보다 조금 미달.|rps가 245를 넘어가면서 socket: too many open files 발생. rps가 낮아지면서 정상화.|

- 대시보드 구성
  - [k6 Load Testing Results](http://3.39.80.206:3000/d/Y-ZnJ1Cnk/k6-load-testing-results?orgId=1&refresh=5s&from=1655276137289&to=1655279737289)
  - id / pw = admin / admin

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
