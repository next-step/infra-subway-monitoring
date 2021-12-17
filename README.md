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

# 서버 구성
- 관리망
  - `Name : EC2-wooobo-bastion`
- 외부망
  - `Name : EC2-wooobo-web-service`
- 프록시
  - `Name : EC2-wooobo-proxy`
- 데이터베이스(내부망)
  - `Name : EC2-wooobo-database`

## 접속 
1. `EC2-wooobo-bastion` 관리방 접속
2. 웹서비스 접속 : `ssh ubuntu@webservice`
2. 프록시 접속 : `ssh ubuntu@proxy`
2. 데이터베이스 접속 : `ssh ubuntu@database`

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
   - 외부망 : `Name : EC2-wooobo-web-service`
     - log 위치
       - /home/ubuntu/infra-monitoring/application.log
       - /var/log/subway/json.log
       - /var/log/subway/file.log
     - 로그 그룹 : [wooobo-webservice](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/wooobo-webservice)
   - 프록시 서버 : `Name : EC2-wooobo-proxy`
     - log 위치
       -  /var/log/nginx
     - 로그 그룹 : [wooobo-proxy](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/wooobo-proxy)

2. Cloudwatch 대시보드 URL을 알려주세요
 - [대쉬보드](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-wooobo)

#### 1단계 작업 내용

- [X] Application Log 파일로 저장하기
    - [X] 회원가입 이벤트 로깅
    - [X] 로그인 이벤트 로깅
    - [X] 최단거리 조회 이벤트 로깅
- [X] Nginx Access Log 설정하기
- [X] Cloudwatch로 로그 수집하기
- [X] Cloudwatch로 메트릭 수집하기
- [X]  EC2 Metric 수집
- [X] Cloudwatch 대쉬보드 구성
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

경쟁사 : 카카오맵 경쟁사 MAU : 카카오맵 : 729만명 (https://www.sedaily.com/NewsVIew/22RH3PUBN6)

**[https://pagespeed.web.dev/ 통계]**

1. 카카오맵

- First Contentful Paint    : 0.6 s
- Time to Interactive       : 2.9 s
- Speed Index               : 2.5 s
- Total Blocking Time       : 850 ms
- Largest Contentful Paint  : 0.7 s

2. 나의 지하철 노선도 서비스

- First Contentful Paint    : 14.9 s
- Time to Interactive       : 15.6 s
- Speed Index               : 14.9 s
- Total Blocking Time       : 600 ms
- Largest Contentful Paint  : 15.5 s

나의 지하철 서비스 목표치

- First Contentful Paint    : 1.5s 미만
- Time to Interactive       : 1.5s 미만
- Speed Index               : 1.5s 미만
- Total Blocking Time       : 150 ms 미만
- Largest Contentful Paint  : 1.5s 미만

> 카카오맵에 대비 30% 이상의 빠른 속도로 목표로 합니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- `text/html,text/xml,text/plain,text/css,text/javascript,application/javascript` 압축 사용 
- vue 라우터 지연로딩 적용
- 폰트 로딩 수정 


3. 부하테스트 전제조건은 어느정도로 설정하셨나요

> 카카오맵 : 729만명 (https://www.sedaily.com/NewsVIew/22RH3PUBN6)

- 목표
    - MAU : 365만명 (카카오맵 MAU 절반으로 산정)
    - 예상 DAU : 12만명
    - 1일 평균 접속 수 : 2회 (출,퇴근때 사용을 가정으로 2회 산정)
    - 평균 요청 가정 (메인, 로그인, 즐겨찾기, 경로검색 * 2) : 5회
    - 1일 평균 요청수 : 2*6 = 12회
    - 1일 총 요청수 : DAU x 1명당 1일 평균 접속수 = 1440000
    - 1일 평균 RPS : 17 (1440000 / 86400)
    - 1일 최대 RPS : 340 (2.8 * 20)
        - 평소 트래픽의 20배로 산정
    - 목표 RPS : **340**


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

##### 접속빈도가 높은 페이지

- 테스트 파일 경로 : `k6/mainpage/`
- 페이지 : 메인페이지 (`/`)
- 시나리오 :
    - `/` 접속 요청
- VUser
```text
# 요청 수 : 1 
# http_req_duration : 0.5
T = (1 * 0.5) + 1 = 1.5
VUser = (340 * 1.5) / 1 = 510
```

##### 데이터를 갱신하는 페이지

- 테스트 파일 경로 : `k6/mypageedit/`
- 페이지 : 프로필 정보 수정
- 시나리오 :
    1. 로그인페이지 접속
       1. GET : `https://wooobo.kro.kr/login`
    2. 로그인요청
       1. POST : `https://wooobo.kro.kr/login/token`
       2. 파라미터 : {"email":"test20@email.com","password":"11"}
    3. 수정페이지 접속
       1. GET : `https://wooobo.kro.kr/mypage/edit`
    4. 내정보 수정 요청
       1. PUT : `https://wooobo.kro.kr/members/me`
       2. 파라미터 : {"email":"test20@email.com","age":"25","password":"11"}
- VUser
```text
# 요청 수 : 4
# http_req_duration : 0.5
T = (4 * 0.5) + 1 = 3
VUser = (340 * 3) / 4 = 255
```

#### 데이터를 조회하는데 여러 데이터를 참조하는 페이지

- 테스트 파일 경로 : `k6/pathsearch/`
- 페이지 : 경로검색
- 시나리오 :
    1. 로그인페이지 접속
       1. GET : `https://wooobo.kro.kr/login`
    2. 로그인요청
       1. POST : `https://wooobo.kro.kr/login/token`
       2. 파라미터 : {"email":"test20@email.com","password":"11"}
    3. 경로검색 페이지 접속
       1. GET : `https://wooobo.kro.kr/path`
    4. 경로 검색
       1. GET : `https://wooobo.kro.kr/paths/?source=2&target=6`
       2. 파라미터 : {"source":2,"target":6}
    5. 경로 좋아요
       1. POST : `https://wooobo.kro.kr/favorites`
       2. 파라미터 : {"source":2,"target":6}
- VUser
```text
# 요청 수 : 5
# http_req_duration : 0.5
T = (5 * 0.5) + 1 = 3.5
VUser = (340 * 3.5) / 5 = 238
```

### K6 테스트 결과 

- `VUser` 2000에서 서버의 부하가 심해져 400 에러가 발생하기 시작
- 현 서버 사양으로 동시 유저 max `2000`유저이므로 `1000`의 유저가 넘어가면 서버 사양을 증가시켜야 될듯합니다.  

### ALB,WAF,ACM
- [ACM](https://ap-northeast-2.console.aws.amazon.com/acm/home?region=ap-northeast-2#/certificates/164a3186-e637-49b4-9dfd-9fc282ecb2de)
    - 도메인 이름 : `wooobo.r-e.kr`
- [Target Group](https://ap-northeast-2.console.aws.amazon.com/ec2/v2/home?region=ap-northeast-2#TargetGroup:targetGroupArn=arn:aws:elasticloadbalancing:ap-northeast-2:843255971531:targetgroup/wooobo-webservice/b0af8fa04d7b0f64)
    - Name : `wooobo-webservice`
- [ALB](https://ap-northeast-2.console.aws.amazon.com/ec2/v2/home?region=ap-northeast-2#LoadBalancers:search=wooobo;sort=loadBalancerName)
    - Name : `wooobo-abl`
- [WAF]
    - NAME = `wooobo-abl`

---

#### 2단계 작업 내용

- [X] 웹 성능 예산 작성
- 테스트 전제조건정리
    - [X] 대상 시스템 범위
    - [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [X] 부하 테스트 시 저장될 데이터 건수 및 크기
- 각 시나리오에 맞춰 스크립트 작성
    - [X] 접속 빈도가 높은 페이지
        - 메인 페이지 : `/`
    - [X] 데이터를 갱신하는 페이지
        - 나의정보 수정 페이지 : `/mypage/edit`
    - [X] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
        - 경로 검색 페이지 : `/path`
- [X] Smoke, Load, Stress 테스트 후 결과를 기록

### 환경세팅

```
# DB 도커
$ docker run -d -p 13306:3306 brainbackdoor/data-subway:0.0.1

# k6
docker run -i loadimpact/k6 run - < {NAME}.js
```

#### 참고

[VUE Lazy Loading Routes](https://next.router.vuejs.org/guide/advanced/lazy-loading.html)  
[Spring Boot Compression](https://gunju-ko.github.io/spring/spring-boot/2018/06/16/SpringBootCompression.html)  
[Web Font 지연로딩](https://d2.naver.com/helloworld/4969726)  
