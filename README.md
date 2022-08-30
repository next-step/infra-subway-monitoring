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

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

목표 설정
- latency : 100ms 이하
- throughput
    - MAU : 583만 ( 카카오맵 MAU(729만) 대비 80%로 설정 )
    - DAU : 19.4만
    - 1명당 1일 평균 접속 수 : 2회 (출/퇴근시 접속으로 가정)
    - 1일 총 접속 수 : 38.8만
    - 1일 평균 rps : 38.8만/86400 = 4.49
    - 1일 최대 rps : 4.49 * 6 = 26.94
- 부하 유지기간
    - smoke : 1m
    - load : 25m
    - stress : 4.2m
- VUser
    - 요청수 : 4회 (메인, 로그인페이지, 로그인 요청, 검색)
    - T : 4 * 0.5s + 1s =  4.0s
    - 최대 VUser : (26.94 * 3.0) / 4 = 20.2
    - 최소 VUser : (4.49 * 3.0) / 4 = 3.36
- 부하 테스트 시 저장될 데이터 건수 및 크기
    - 조회
        - 노선 : 23개
        - 구간 : 340개
    - 역 : 616개
    - 사용자 : 1개

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- 스크립트  
  - scenario/load.js
  - scenario/smoke.js
  - scenario/stress.js
- 결과
  - scenario/test
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
