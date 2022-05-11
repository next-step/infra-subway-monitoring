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
   - LightHouse 성능 감사 점수 80점 이상
   - 경쟁사에 비해 많이 느린 FCP 2초 초반 대로 유지

   | 사이트          | FCP  | TTI  | SI   | TBT    | LCP  | CLS   |
   |------|------|------|--------|------|-------|-------|
   | infra-subway | 2.6초 | 2.7초 | 2.6초 | 70 밀리초 | 2.8초 | 0.004 |
   | 서울교통공사       | 1.6초 | 2.0초 | 3.5초 | 100밀리초 | 3.6초 | 0.013 |
   | 네이버맵         | 0.5초 | 0.6초 | 1.9초 | 0밀리초   | 1.6초 | 0.006 |
   | 카카오맵         | 0.5초 | 1.0초 | 2.3초 | 0밀리초   | 1.1초 | 0.003  |
3. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 텍스트 압축 사용(gzip, deflare 등)
   - 캐시 정책 사용
   - 이미지에 width, height 명시하기
     - 레이아웃 변경 횟수 줄이고, 누적 레이아웃 변경 개선


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - DAU : 100,000
   - 피크 타임 트래픽 : 2배
   - 1명당 1일 평균 접속 수 : 5회
   - Throughput(1일 평균 rps ~ 1일 최대 rps)
      - 1일 총 접속 수 : 50만
      - 1일 평균 rps : 5.8
      - 1일 최대 rps: 11.6
   - Latency: 100ms
   - 부하 유지 기간: 1시간
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - 접속 빈도가 높은 페이지 (메인페이지)
     - [load 테스트](./scripts/접속빈도가-높은-페이지/load.js)
     - [smoke 테스트](./scripts/접속빈도가-높은-페이지/smoke.js)
     - [stress 테스트](./scripts/접속빈도가-높은-페이지/stress.js)
   - 데이터 참조 조회하는 페이지
     - [load 테스트](./scripts/데이터-참조-조회하는-페이지/load.js)
     - [smoke 테스트](./scripts/데이터-참조-조회하는-페이지/smoke.js)
     - [stress 테스트](./scripts/데이터-참조-조회하는-페이지/stress.js)
   - 데이터 갱신하는 페이지
     - [load 테스트](./scripts/데이터-갱신하는-페이지/load.js)
     - [smoke 테스트](./scripts/데이터-갱신하는-페이지/smoke.js)
     - [stress 테스트](./scripts/데이터-갱신하는-페이지/stress.js)
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
