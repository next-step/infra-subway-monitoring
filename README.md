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
   * 용어 정리
     - FCP : 첫 번째 텍스트 또는 이미지가 표시되는 시간
     - TTI : 완전한 페이지와 상호작용할 수 있게 될때 까지 걸리는 시간
     - SI  : 콘텐츠가 얼마나 빨리 표시
     - TBT : FCP와 상호작용시간 사이의 모든 시간의 합
     - LCP : 최대 텍스트 또는 이미지가 표시되는 시간
     - CLS : 표시 영역 안에 보이는 요소의 이동을 측정

   - 타사 성능 비교
     | 사이트                   | FCP  |  TTI |  SI  |  TBT  |  LCP   |   CLS   |   Score  |
     |------------------------|------|------|------|-------|--------| ------- |  :-----: |
     | june2-nextstep.kro.kr  |2.7s  | 2.8  | 2.7s | 70ms |  2.8s   |  0.004  |    67    |
     | 서울교통공사              | 1.6s | 2.0s | 2.6s |  80ms |  3.6s  |  0.014  |    69    |
     | 네이버맵                 | 0.5s | 0.5s | 2.2s |  0ms  |  1.5s  |  0.006  |    90    |
     | 카카오맵                 | 0.5s | 1.0s | 2.5s |  0ms  |  1.1s  |  0.039  |    92    |
   
   - 웹 성능예산
       - 타사 성능 차이 20% 미만 줄이기
       - FCP 줄이기 (사용자에게 컨텐츠가 빠르게 노출되고 렌더링하는 것이 중요)
           - FCP 타사평균: 0.87
           - 목표 값: 1.04
       - TTI 줄이기 
           - TTI 타사평균: 1.17
           - 목표 값: 0.93

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - vendors.js / main.js 파일 압축 (gzip)
   - 정적 파일 캐싱 (브라우저 캐싱 cache-control)


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - 
   - 대상 시스템 범위
     - web, was, db
   
   - 목푯값 설정 (latency, throughput, 부하 유지기간)
     - a. 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
       - 50만
     - b. 피크 시간대의 집중률을 예상해봅니다. (최대 트래픽 / 평소 트래픽)
       -  2배로 설정
     - c. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
       - 5번
       
     - Throughput : 1일 평균 rps ~ 1일 최대 rps => 28.9 ~ 57.8
       - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
         - 500,000 * 5 = 2,500,000
       - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
         - 2,500,000 / 86,400 = 28.9 rps
       - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
         - 28.9 * 2배 = 57.8

   - 부하 테스트 시 저장될 데이터 건수 및 크기
     - line : 23
     - station : 617
     - section : 340

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - smoke 
      - 스크립트  : docs/smoke.js
      - K6      : docs/smoke.png
      - grafana : docs/smoke-grafana.png
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
