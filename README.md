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

- 베스천 서버 접속 : `ssh -i y2o2u2n-RSA.pem ubuntu@52.79.198.129`
- 서비스 서버 접속 : `ssh service-b`
- 로깅 경로 이동 : `cd infra-subway-monitoring/docker/logs/`
- 각각 `nginx`, `spring-boot` 내 파일 로그

2. Cloudwatch 대시보드 URL을 알려주세요

---

### 2단계 - 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

## 요구사항

### 1단계

- [x] 로그 설정하기
    - [x] Application Log
        - [x] Phase 별
            - [x] `local | test` : 스프링 부트 로그백 기본값
            - [x] `prod` : 콘솔 출력 및 파일 저장 (`INFO` 레벨 이상)
        - [x] Log
            - [x] 컨트롤러의 요청, 응답에 대한 `INFO`, `ERROR` 로깅
            - [x] 글로벌 예외 처리시 `ERROR` 로깅
    - [x] 문제가 되는 코드 수정하기
    - [x] Nginx Access Log 설정하기
- [ ] CloudWatch 로 모니터링
    - [x] cAdvisor 설치 
    - [ ] 로그 수집하기
    - [ ] 메트릭 수집하기

### 2단계

TBD
