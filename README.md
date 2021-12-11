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
- web
  - /home/ubuntu/infra-subway-monitoring/log/file.log
- proxy
  - /var/log/nginx/access.log
  - /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=jsyang-dev-dashboard

---

### 2단계 - 성능 테스트

#### 웹 성능예산은 어느정도가 적당하다고 생각하시나요

1. 예비 분석
   - 가장 중요한 페이지
     - 메인 페이지: 서비스의 진입점

2. 경쟁사 분석

| 성능 지표 | 네이버지도 | 카카오맵 | 서울교통공사 사이버스테이션 | 내 사이트 | 성능 차이 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| First Contentful Paint | 3.7s | 2.5s | 7.1s | 14.7s | 12.2s |
| Time to Interactive | 8.8s | 5.6s | 9.2s | 15.4s | 9.8s |
| Speed Index | 9.1s | 6.8s | 11.9s | 14.7s | 7.9s |
| Total Blocking Time | 520ms | 140ms | 890ms | 590ms | 450ms |
| Largest Contentful Paint | 9.6s | 5.9s | 7.2s | 15.3s | 8.4s |

3. 성능 기준 설정
   - 기준: 경쟁사 중 최고 성능 대비 20% 성능 차이 허용
   - First Contentful Paint: 3s 미만
   - Time to Interactive: 6.5s 미만
   - Speed Index: 8s 미만
   - Total Blocking Time: 170ms 미만
   - Largest Contentful Paint: 7s 미만

4. 우선순위
   - First Contentful Paint를 가장 높게 설정: 성능 차이가 가장 큰 지표

#### 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

1. 텍스트 압축 사용
2. 렌더링 차단 리소스 제거하기
3. 정적 리소스 캐싱 사용

#### 부하테스트 전제조건은 어느정도로 설정하셨나요

1. 대상 시스템 범위 
   - Proxy 서버, WAS 서버, DB 서버

2. 목푯값 설정
   - 전제 조건
     - 피크 시간대: 07:00 ~ 09:00, 18:00 ~ 20:00
     - 1일 사용자 수(DAU) = 2,160,000
     - 1일 요청 수 = 2 (출근 1회, 퇴근 1회)
     - 피크 시간대 집중률 = 4
   - Throughput
     - 1일 총 접속수 = 2,160,000 * 2 = 4,320,000
     - 1일 평균 rps = 4,320,000 / 86,400 = 50
     - 1일 최대 rps = 50 * 4 = 200
   - Latency: 100ms 미만

#### Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

1. 접속 빈도가 높은 페이지
   - 시나리오: 메인 페이지
   - 스크립트
     - Smoke 테스트: [smoke.js](/k6/frequent/smoke.js)
     - Load 테스트: [load.js](/k6/frequent/load.js)
     - Stress 테스트: [stress.js](/k6/frequent/stress.js)
   - 결과
       - Smoke 테스트: [smoke.log](/k6/frequent/smoke.log)
       - Load 테스트: [load.log](/k6/frequent/load.log)
       - Stress 테스트: [stress.log](/k6/frequent/stress.log)

2. 데이터를 갱신하는 페이지
    - 시나리오: 로그인 -> 나의 정보 수정
    - 스크립트
        - Smoke 테스트: [smoke.js](/k6/modifying/smoke.js)
        - Load 테스트: [load.js](/k6/modifying/load.js)
        - Stress 테스트: [stress.js](/k6/modifying/stress.js)
    - 결과
        - Smoke 테스트: [smoke.log](/k6/modifying/smoke.log)
        - Load 테스트: [load.log](/k6/modifying/load.log)
        - Stress 테스트: [stress.log](/k6/modifying/stress.log)

3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    - 시나리오: 경로 조회
    - 스크립트
        - Smoke 테스트: [smoke.js](/k6/multi/smoke.js)
        - Load 테스트: [load.js](/k6/multi/load.js)
        - Stress 테스트: [stress.js](/k6/multi/stress.js)
    - 결과
        - Smoke 테스트: [smoke.log](/k6/multi/smoke.log)
        - Load 테스트: [load.log](/k6/multi/load.log)
        - Stress 테스트: [stress.log](/k6/multi/stress.log)
