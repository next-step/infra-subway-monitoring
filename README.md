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
- SUBWAYWEB (192.168.170.39) - \[접속 도메인 주소 : https://jerry92k-subway.n-e.kr/]
  - 애플리케이션 로그 : /home/ubuntu/infra-subway-monitoring/log/*
  - syslog : /var/log/syslog
- SUBWAYWAS (192.168.170.155)
  - syslog : /var/log/syslog
- BASTION (192.168.170.190)
    - syslog : /var/log/syslog
    
2. Cloudwatch 대시보드 URL을 알려주세요 
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-jerry92k

---
### 추가 - log4j 이슈에 따라 nginx를 걷어내고 WAF를 추가적으로 적용
1. nginx 인스턴스 중단
  - nginx 도커 컨테이너 중단
  - cloudwatch 수집 대상에서 access log 제외
2. ALB, ACM, WAF 구성하기
  - ACM에 SSL 인증서 가져오기
  - ALB를 통해 1)443 포트로 들어오는 요청을 자바 애플리케이션 포트인 8070으로 포워딩, 2)생성한 ACM을 이용하여 SSL 통신 적용
  - ALB 앞단에 WAF 적용

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
