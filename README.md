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
   - ip : 172.30.0.122
   - nginx : /var/log/nginx
   - syslog : /var/log/syslog
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2&state=hashArgs%23alarmsV2%3A%3F~(alarmStateFilter~%27ALARM)#dashboards:name=ungseokchoi-dashboard;start=PT1H
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 경쟁사 분석

|지표|First Contentful Paint|Speed Index|Largest Contentful Paint|Cumulative Layout Shift|Total Blocking Time|  
|:------:|:------:|:------:|:------:|:------:|:------:|
|내 사이트|2.404s|2.424s|2.601s|0.004|≥ 0.000s|
|네이버지도|2.117s|4.971s|9.532s|0|≥0.290s|
|카카오맵|2.445s|6.071s|3.111s|0.019|≥ 0.920s|

- 예상 예산 (경쟁사중 최고 지표 기준으로 20프로 차이까지 허용)
  - First Contentful Paint : 2.8s
  - Speed Index : 6s
  - Largest Contentful Paint : 3.7s
  - Cumulative Layout Shift : 0.01
  - Total Blocking Time : 0.4s

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 전반적으로 모든 페이지에 자바 스크립트 실행 시간을 단축
- 미사용 스크립트 제거
- Keep-Alive 설정(nginx 설정 잘못해서 설정값이 포함이 안됐음.)

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - smoke 
   > 기능 정상 작동하는지를 확인하기 위해 1 유저가 10초 동안 테스트 
   - load
   > 조회 로드 속도를 확인하기 위해 1초당 10유저
   - stress
   > 과부하 테스트를 위해  5~10초 동안 100유저 -> 200유저 -> 300유저 -> 400유저 로 증가하며 테스트
   
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - 모든 유저가 필수로 거쳐가야하는 메인 페이지
     - [smoke js](/k6/main/smoke.js)
     - [smoke 결과](/k6/main/main_load.PNG)
     - [load js](/k6/main/load.js)
     - [load 결과](/k6/main/main_load.PNG)
     - [stress js](/k6/main/stress.js)
     - [stress 결과](/k6/main/main_stress.PNG)
   - 리소스 부하가 큰 경로 페이지
       - [smoke js](/k6/path/smoke.js)
       - [smoke 결과](/k6/path/path_load.PNG)
       - [load js](/k6/path/load.js)
       - [load 결과](/k6/path/path_load.PNG)
       - [stress js](/k6/path/stress.js)
       - [stress 결과](/k6/path/path_stress.PNG)
