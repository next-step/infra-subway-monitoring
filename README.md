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
   * public (3.35.221.168 , https://cupeanimus.r-e.kr/)
      * front : /monitoring/infra-subway-mornitoring/frontend/web.log
      * back(logback) :  /home/ubuntu/logs/subway.log
      * back(nohup) :  /home/ubuntu/logs/nohup.log
      * nginx : /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=cupeanimus-dashboard
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

    항목 | 현재 | 목표 | 최종 | 배민
    --- | --- | --- | --- | ---
   First Contentful |  14.8s | 3s | ㅁ | 2.5
   Speed Index |  14.8s | 10s | ㅁ | 8.6
   Largest Contentful Paint |  15.4s | 5s | ㅁ | 4.2
   Time to Interactive |  15.42 | 5s | ㅁ | 4.5 
   Total Blocking Time |  0.55s | 0.5s | ㅁ | 0.28s 
   Cumulative Layout Shift |  0.041s | 0.5s | ㅁ | 0.066 


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
 - gzip을 사용하여 데이터 압축 
 - 사용하지 않는 자바스크립트 줄이기
 - 렌더링 리소스 제거하기
 - cache를 사용하여 초기 응답 시간 단축
 - 사용하지 않는 css줄이기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
