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
   - /home/ubuntu/logs/file.log

2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-codeleesh

#### 진행 사항
- [X] aop를 이용한 메소드 실행 전과 후 로그 설정
    - Service 파일의 대해서 로그 설정
        - 비즈니스 로직을 수행하기 때문에 설정
- [X] logback 설정
    - profile를 이용하여 local, prod 구분하여 진행
- [X] cloudwatch 설정 진행

---

### 2단계 - 성능 테스트
- 지난 미션 피드백 진행
  - logback appender별 xml 파일 분류
  - 경로찾기의 json 로그 남기는 부분 추가
- 성능 테스트 진행
  1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
     - PageSpeed 테스트 결과 
     - |  | 지하철노선도 | 경쟁사1 | 경쟁사2 |
         | --- | --- | --- | --- |
         | First Contentful Paint | 14.7s | 6.9s | 2.2s |
         | Speed Index | 14.7s | 12.4s | 6.7s |
         | Largest Contentful Paint | 15.4s | 6.9s | 8.2s |
         | Time to Interactive | 15.5s | 8.8s | 7.5s |
         | Total Blocking Time | 640ms | 500ms | 800ms |
         | Cumulative Layout Shift | 0.041 | - | 0.03 |
     - 예산 작성
       - 경쟁사 대비 20% 이상 성능 차이가 나는지 확인
       - First Contentful Paint 3.0s 미만
         - web.dev[[https://web.dev/i18n/ko/fcp/](https://web.dev/i18n/ko/fcp/)] 사이트에서는 우수한 사용자 경험을 제공하려면 사이트의 최초 콘텐츠풀 페인트가 1.8초 ****미만
       - Speed Index
         - 경쟁사 대비 7.0s
       - Lagrest Contentful Paint
         - 지하철에서 가장 큰 콘텐츠(이미지)는 필요 없어보임
         - 경쟁사만큼 줄일 필요있어서 8.0초 미만
       - Time to Interactive
         - 경쟁사 대비 9.0s 미만
     
  2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
     - 정적 리소스 gzip 압축
     - 사용하지 않는 자바스크립트 줄이기
     - 렌더링 차단 리소스 제거하기

  3. 부하테스트 전제조건은 어느정도로 설정하셨나요
     - Latency : 50 ~ 100ms
     - Throughput : 5.788
       - 1일 사용자 수 : 100000
       - 1일 평균 접속 수 : 5회
       - 1일 평균 총 접속 수 :  500,000
       - 1일 평균 rps : 5.8
       - 1일 최대 rps : 17.4
       - 최대 트래픽 : 3배
     - 부하 유지기간 :  1m

  4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
     - 진행 결과
       - 공통적으로 stress test 진행 시 VUS 1000까지는 테스트가 가능하지만 1000이상으로 진행 시 에러 발생
       - 에러는 `Too Many Open Files`
       - 시도한 부분
         - 네트워크 문제라고 판단하여 진행
           - sar -n DEV,TCP,ETCP 5
             - 증가된 부분은 확인하였지만 에러가 발생한 부분과 상관관계를 찾지 못하였음
           - netstat -an | wc -l
           - lsof -p [PID] | wc -l
             - 정리하면서 찾아보니 필터링을 좀 더 정확하게 줄 필요가 있었음
     - 접속 빈도가 높은 페이지 
       - 메인화면으로 진행
       - loadtest/frequently
     - 데이터를 갱신하는 페이지
       - 나의 정보 확인 화면으로 진행
       - loadtest/dataReload
     - 데이터를 조회하는데 여러 데이터를 참조하는 페이지
       - 경로 조회 화면으로 진행
       - loadtest/multiDataReference
    
#### 진행 사항
- [X] 웹 성능 테스트 
  - [X] 웹 성능 예산을 작성 
  - [X] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악

- [X] 부하 테스트 
  - [X] 테스트 전제조건 정리 
    - [X] 대상 시스템 범위 
    - [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [X] 부하 테스트 시 저장될 데이터 건수 및 크기 
  - [X] 각 시나리오에 맞춰 스크립트 작성
    - [X] 접속 빈도가 높은 페이지 
    - [X] 데이터를 갱신하는 페이지 
    - [X] 데이터를 조회하는데 여러 데이터를 참조하는 페이지 
    - [X] Smoke, Load, Stress 테스트 후 결과를 기록