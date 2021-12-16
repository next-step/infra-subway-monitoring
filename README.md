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

- key: wangkdk-admin.pem
- bastion server: 13.125.123.16
- application server: ssh public01
- application log: /home/ubuntu/infra-subway-monitoring/build/libs/log/file.log
- nginx: nginx 가 alb 로 대체 되었습니다.

2. Cloudwatch 대시보드 URL을 알려주세요

- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=wangki-dashboard

### 요구사항

- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] 로그 설정하기
    - [x] Application Log 파일로 저장하기
        - [x] 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
    - [x] Nginx Access Log 설정하기 (설정 x)
        - [x] ALB 로 대체
- [x] Cloudwatch 로 모니터링
    - [x] Cloudwatch 로 로그 수집하기
    - [x] Cloudwatch 로 메트릭 수집하기

---

### 2단계 - 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 시간 기반 지표
    - First Contentful Paint : 2초 미만 (네이버 지하철 0.5초)
        - **전체 페이지는 아니더라도 페이지가 로딩되고 있음을 사용자에게 시각적으로 보여주는 편이 좋다고 생각합니다.**
    - Time to Interactive : 3초 미만
        - **서비스 특성상 3초 미만이면 크게 불편함을 느끼지 않을 것으로 예상 됩니다.**
- 정량 기반 지표
    - 이미지는 2MB 미만으로 제한
        - **용량이 큰 이미지를 필요로 하는 서비스가 아니라고 판단 됩니다.**

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 정적 리소스 gzip 압축
- 사용하지 않는 자바스크립트 줄이기
- 랜더링 차단 리소스 제거하기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 대상 시스템 범위
    - 애플리케이션(was)
- 목표값 설정
    - 1일 사용자수 : 250,000
    - 1일 평균 접속 수 : 2회
    - 1일 평균 총 접속 수 : 500,000
    - 1일 평균 rps : 5.7
    - 1일 최대 rps : 17.1
    - 최대 트래픽 3배
    - VUser 평균 : (5.7 * (3 * 1.5) / 3) = 약 9
    - VUser 최대 : (17.1 * (3 * 1.5) / 3) = 약 26

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 접속 빈도가 높은 페이지(메인페이지)
  - Smoke
    - [Smoke 스크립트](/k6/frequency/smoke.js)
    - [Smoke 결과](/k6/frequency/smoke.log)
  - Load
    - [Load 스크립트](/k6/frequency/load.js)
    - [Load 결과](/k6/frequency/load.log)
  - Stress
    - [Stress 스크립트](/k6/frequency/stress.js)
    - [Stress 결과](/k6/frequency/stress.log)
- 데이터를 갱신하는 페이지(내 정보 수정 페이지)
  - Smoke
    - [Smoke 스크립트](/k6/update/smoke.js)
    - [Smoke 결과](/k6/update/smoke.log)
  - Load
    - [Load 스크립트](/k6/update/load.js)
    - [Load 결과](/k6/update/load.log)
  - Stress
    - [Stress 스크립트](/k6/update/stress.js)
    - [Stress 결과](/k6/update/stress.log)
- 데이터를 조회하는데 여러 데이터를 참조하는 페이지(경로 찾기 페이지)
  - Smoke
    - [Smoke 스크립트](/k6/complex/smoke.js)
    - [Smoke 결과](/k6/complex/smoke.log)
  - Load
    - [Load 스크립트](/k6/complex/load.js)
    - [Load 결과](/k6/complex/load.log)
  - Stress
    - [Stress 스크립트](/k6/complex/stress.js)
    - [Stress 결과](/k6/complex/stress.log)
