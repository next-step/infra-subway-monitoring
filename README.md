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
WEB : /home/ubuntu/infra-subway-deploy-main/logs  
WAS : /home/ubuntu/nginx/logs  
   
WEB : 52.78.141.177  
WAS : 3.35.231.219  
BASTION : 15.164.251.51  
URL : https://sooragenius.com  
2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD_ohgillwhan
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
과거에 https://www.sancheong.go.kr/www/index.do를 개선했던 경험이 있습니다.  
나라에서 안내를 받은 기준으로 개선을 했는데 그 결과보다 더 좋은결과를 내려고 노력해보겠습니다.
- PageSpeed Insgihts 기준
  점수 : 31 -> 90~
  FCP : 2초 이내
  TTI : 2초 이내
  SpeedIndex : 2초 이내
  LCP : 2초 이내
- WebPageTest 기준
  Compress Transfer : A등급
  Cache Static Content : A등급

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
가장 큰 문제는 vendors.js와 main.js 가 가장 큰 문제라고 생각이 듭니다.
압축을 우선으로 넣어야 할것 같고, NGINX에 캐시까지 적용을 해야할것 같습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
