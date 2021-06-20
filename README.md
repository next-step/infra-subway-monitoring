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
- [X] file: /home/ubuntu/logs/app.log
- [X] json: /home/ubuntu/logs/app-json.log

2. Cloudwatch 대시보드 URL을 알려주세요
- [X] 경로: https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=realizeme-dashboard)

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- [X] Desktop FCP 2초 이하(결과 0.8s)
- [X] Desktop TTI 2초 이하(결과 1.3s)
- [X] Lighthouse 성능 감사에서 85점 이상(94점)
- [X] Largest Contentful Paint: 1.502s
- [X] Security Score: A

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- [X] GZIP 적용
- [X] HTTP/2 적용
- [X] JS Lazy loading

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 테스트 전제조건 정리
    - [X] 대상 시스템 범위: Subway API 서버(로그인, 경로, 패스, 라인 API)
    - [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [X] 부하 테스트 시 저장될 데이터 건수 및 크기: station 616개, line 22개

- 각 시나리오에 맞춰 스크립트 작성
    - [X]  접속 빈도가 높은 페이지
        - 로그인, 경로, 패스, 라인 접속 API
    - [X]  데이터를 갱신하는 페이지
        - 즐겨 찾기 추가
        - 노선 등록
        - 구간 등록
    - [X] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
        - 경로 조회

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- Smoke 테스트 후 결과를 기록

    | Page | Pass / Fail | Duration Percentage | 
    |:---- |: ----------- :|:------------------- |
    | 로그인 |   Pass     | avg=21.07ms  min=12.57ms med=21.07ms  max=29.56ms  p(90)=27.86ms  p(95)=28.71ms |
    | 노선조회 |   Pass    | avg=191.95ms min=191.95ms med=191.95ms max=191.95ms p(90)=191.95ms p(95)=191.95ms |
    | 경로조회 |   Pass    | avg=47.61ms min=7.43ms  med=47.61ms max=87.79ms  p(90)=79.76ms  p(95)=83.77ms |
    | 역 조회 |   Pass    | avg=85.53ms  min=85.53ms  med=85.53ms  max=85.53ms  p(90)=85.53ms  p(95)=85.53ms |
    | 즐겨찾기 추가 | Pass   | avg=14.34ms  min=11.89ms  med=14.34ms  max=16.8ms   p(90)=16.31ms  p(95)=16.55ms |

- Load 테스트 후 결과를 기록
  
- Stress 테스트 후 결과를 기록

