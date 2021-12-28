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
EC2-lights93-public(/home/ubuntu/logs/subway)

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-lights93

#### 기능 요구사항
- [X] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [X] 로그 설정하기
    - [X] Application Log 파일로 저장하기
        - [X] 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
    - ~~Nginx Access Log 설정하기~~
- [x] Cloudwatch로 모니터링
    - [X] Cloudwatch로 로그 수집하기
    - [X] Cloudwatch로 메트릭 수집하기
    
#### 코드 리뷰사항
- [X] SubwayNotFoundException 로그 레벨 변경
- [X] badRequest일 때 어떠한 문제인지 전달
- [X] 불필요한 주석 제거
- [X] gradle 컨벤션
- [X] request 로그 제대로 남기도록 수정
- [ ] 시스템 에러 로그를 노출하면 안 되는 이융
- [ ] AOP를 사용하지 않은 이유?
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요


#### 기능 요구사항
- [ ] 웹 성능 테스트
    - [ ] 웹 성능 예산을 작성
    - [ ] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
- [ ] 부하 테스트
    - [ ] 테스트 전제조건 정리
        - [ ] 대상 시스템 범위
        - [ ] 목푯값 설정 (latency, throughput, 부하 유지기간)
        - [ ] 부하 테스트 시 저장될 데이터 건수 및 크기
    - [ ] 각 시나리오에 맞춰 스크립트 작성
        - [ ] 접속 빈도가 높은 페이지
        - [ ] 데이터를 갱신하는 페이지
        - [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
Smoke, Load, Stress 테스트 후 결과를 기록