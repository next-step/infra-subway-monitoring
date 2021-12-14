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
   - ALB적용으로 nginx를 종료하고 nginx서버에 was를 구동중입니다.
   - keepbang-web-service
        - tomcat 로그 : /home/ubuntu/log/server.log
        - api 로그 : /home/ubuntu/log/json.log
        - system 로그 : /var/log/syslog
   - keepbang-nginx
       - tomcat 로그 : /home/ubuntu/log/server.log
       - api 로그 : /home/ubuntu/log/json.log
       - system 로그 : /var/log/syslog
2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-keepbang

### 요구사항
- [X] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [X] 로그 설정하기
    - [X] Application Log 파일로 저장하기
    - [X] 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
    - [X] Nginx Access Log 설정하기(x)
- [X] Cloudwatch로 모니터링
    - [X] Cloudwatch로 로그 수집하기
    - [X] Cloudwatch로 메트릭 수집하기

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 경쟁사 성능 조사
    - [PageSpeed에서 조사함](https://pagespeed.web.dev/)
    - 테스크톱 기준

|사이트 명|First Contentful Paint|Time to Interactive|Speed Index|Total Blocking Time|Largest Contentful Paint|Cumulative Layout Shift|
|---|---|---|---|---|---|---|
|subway|2.7s|2.8s|2.7s|70ms|2.8s|0.004|
|서울 메트로|1.6s|2.0s|2.6s|50ms|3.6s|0.013|
|카카오 지도|0.6s|3.0s|2.5s|1000ms|0.7s|0.018|
|네이버 지도|0.4s|2.8s|2.8s|380ms|2.8s|0|

- 웹 성능 예산
    - 각 사이트의 진단결과 평균치
    
|First Contentful Paint|Time to Interactive|Speed Index|Total Blocking Time|Largest Contentful Paint|Cumulative Layout Shift|    
|---|---|---|---|---|---|
|1.3s|2.6s|2.6s|375ms|2.4s|0.008|
___

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - 텍스트 압축 사용
    - 사용하지 않는 자바스크립트 줄이기
    - keep-alive 사용

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
    - 접속 빈도가 높은 페이지
    - DB를 사용하는 기능
- 목푯값
    - 예상 1일 사용자 수(DAU) : 40,000
    - 피크 시간대의 집중률 : 4
    - 1명당 1일 평균 접속 혹은 요청수 : 10
    - Throughput
        - 1일 총 접속 수 : 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 40,000 * 10 = 400,000
        - 1일 평균 rps : 1일 총 접속 수 / 86,400 (초/일) = 40,000 / 86,400 = 4.6
        - 1일 최대 rps : 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 4.6 * 4 = 18.4 
    - Latency
        - 50 ~ 100ms
    - 부하 유지기간
        - 30분 ~ 1시간
    - 부하 테스트 시 저장될 데이터 건수 및 크기
        - 테스트 데이터 1 ~ 2건
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- 접속 빈도가 높은 페이지
    - load
        - [스크립트](./k6/main/load-main.js)
        - [결과](./k6/main/load_main_output.log)
    - smoke
        - [스크립트](./k6/main/smoke-main.js)
        - [결과](./k6/main/smoke_main_output.log)
    - stress
        - [스크립트](./k6/main/stress-main.js)
        - [결과](./k6/main/stress_main_output.log)
- 데이터를 갱신하는 페이지
    - load
        - [스크립트](./k6/update/load-update.js)
        - [결과](./k6/update/load_update_output.log)
    - smoke
        - [스크립트](./k6/update/smoke-update.js)
        - [결과](./k6/update/smoke_update_output.log)
    - stress
        - [스크립트](./k6/update/stress-update.js)
        - [결과](./k6/update/stress_update_output.log)
- 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    - load
        - [스크립트](./k6/path/load-path.js)
        - [결과](./k6/path/load_path_output.log)
    - smoke
        - [스크립트](./k6/path/smoke-path.js)
        - [결과](./k6/path/smoke_path_output.log)
    - stress
        - [스크립트](./k6/path/stress-path.js)
        - [결과](./k6/path/stress_path_output.log)

### 요구사항
- [X] 웹 성능 테스트
    - [X] 웹 성능 예산을 작성
    - [X] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
- [X] 부하 테스트
    - [X] 테스트 전제조건 정리
        - [X] 대상 시스템 범위
        - [X] 목푯값 설정(latency, throughput, 부하 유지기간)
        - [X] 부하 테스트 시 저장될 데이터 건수 및 크기
    - [X] 각 시나리오에 맞춰 스트립트 작성
        - [X] 접속 빈도가 높은 페이지
        - [X] 데이터를 갱신하는 페이지
        - [X] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    - [X] Smoke, Load, Stress 테스트 후 결과를 기록