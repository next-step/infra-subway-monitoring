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
 - EC2-eedys1234-tomcat : /home/ubuntu/infra-subway-monitoring/log/

2. Cloudwatch 대시보드 URL을 알려주세요
 - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-eedys1234
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요.  
경쟁사(카카오맵)과 비교하여 결정  

항목 | 경쟁사(카카오맵) | 지하철노선도 | 목표치  
---- | ---- | ---- | ---- |  
First ContentFul Paint |  0.6s | 12.2s | 0.7s  
Speed Index | 2.3s | 12.2s | 3.0s |  
Large ContentFul Paint | 0.6s | 12.2s | 0.7s  
Cumulative Layout Shift | 0.018 | 0.004 | 0.004  
Total Blocking Time | 640ms | 130ms | 130ms  

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
  - gzip으로 transfer-encoding 적용
  - 코드 스플릿팅을 통해 js/css 지연로딩
  - 이미지 압축
  - css/js/image 등 정적파일등 캐싱 처리
  - 불필요한 api 요청 최소화(프론트 내부에서 캐싱처리)

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

 - 3.1. 대상시스템  
   - web server
   - application server
   - db server
 
 - 3.2. 목푯값 설정  
   - 1일 사용자 수 :  카카오맵의 MAU를 참고하여 1일 DAU를 800만으로 산출(MAU 약 800만)  
   - 1명 당 1일 요청 수 : (출근/퇴근) x (지하철 목록 조회 / 최단경로 조회) = 4
   - 1일 총 요청 수 : 800 x 4 = 3200만
   - 1일 평균 rps : 370.37
   - 1일 최대 rps : 1일 평균 rps x 5 = 1851(약 트래픽 5배가량 예상)
   - 처리량 : 370 ~ 1850 rps
 
 - 3.3. 부하 테스트 시 저장될 데이터의 건수 및 크기  

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

   - 4.1. 접속빈도가 높은 페이지(로그인, 내정보조회)
     - [smoke](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/frequent/smoke_result.md)
     - [load](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/frequent/load_result.md)
     - [stress](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/frequent/stress_result.md)

   - 4.2. 데이터를 갱신하는 페이지(로그인, 내정보수정)
      - [smoke](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/update/smoke_result.md)
      - [load](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/update/load_result.md)
      - [stress](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/update/stress_result.md)
 
   - 4.3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지(지하철 노선목록 조회, 경로찾기)   
      - [smoke](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/join/smoke_result.md)
      - [load](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/join/load_result.md)
      - [stress](https://github.com/eedys1234/infra-subway-monitoring/blob/step2/load-test/join/stress_result.md)
 
 

