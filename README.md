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
* nginx access log 경로: /home/ubuntu/nginx/log
* application log 경로: /home/ubuntu/logs/infra-subway-monitoring

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-mwkwon-service-monitoring
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
* 경쟁 사이트 - 서울 교통 공사 사이버 스테이션(http://www.seoulmetro.co.kr/kr/cyberStation.do)
* 경쟁 사이트 웹 성능 테스트 결과
    * WebPage Test
        * Security score: F
        * First Byte Time: B
        * Keep-Alive Enabled: A
        * Compress Transfer: F
        * Compress Image: A
        * Cache Static Content: F
    * PageSpeed Test
        * 총점: 62점
* nextstep(https://mwkwon-service.kro.kr/) 지하철 노선 웹 성능 테스트 결과
    * WebPage Test
        * Security score: F
        * First Byte Time: A
        * Keep-Alive Enabled: A
        * Compress Transfer: F
        * Compress Image: A
        * Cache Static Content: C
    * PageSpeed Test
        * 총점: 67점
* 웹 성능 예산
    * Compress Transfer A
    * Cache static Content A
    * PageSpeed Test 총점 80점 이상

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* Compress Transfer: gzip 압축을 통해 전달되는 데이터 용량을 줄여 성능을 개선 한다.(예상 절감치 1.44s)
* 사용하지 않는 자바 스트립트 줄이기
    * /js/vendors.js 지연 로딩
    * /js/main.js 지연 로딩
    * 정적 파일 캐싱을 통한 불필요한 요청을 줄인다.
* 렌더링 차단 리소스 제거하기
    * 중요한 js/css는 인라인으로 전달하고 중요하지 않은 모든 js/style는 지연 로딩하기
* Security score: HTTP 헤더 보안성 확보

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
* 목표값 설정
    * throughput: TPS
        * 1일 예상 사용자수(DAU): 100,000명
        * 1명당 평균 접속 수: 1일 2회
        * 1명당 평균 요청 수: 8회(메인 페이지, 로그인, 회원 가입, 경로 조회)
        * 최대 트래픽: 100
        * 평소 트래픽: 20
        * 1일 총 접속 수: 200,000회
        * 1일 평균 rps: 2.4
        * 1일 최대 rps: 12
    * latency
        * 90% 50ms 이하
        * 95: 80ms 이하
        * 99.9%: 100ms 이하

* 시나리오 대상
    * 접속 빈도가 높은 기능
        * main 페이지
        * 경로 찾기
        * 로그인 
        * 회원 가입
    * DB를 사용하는 기능
        * 경로 찾기

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* performance-test/test-result/ 디렉토리에 결과 파일 넣어두었습니다. 
---

### 1단계 - 로깅과 모니터링
요구사항
* 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
* 로그 설정하기
* Cloudwatch로 모니터링

### 작업 진행 순서
* [x] 애플리케이션 진단하기 실습 및 문제가 되는 코드 수정
* [x] 로그 설정하기
    * [x] logback.xml 설정하기
    * [x] 회원가입, 로그인, 최단거리 조회등의 이벤트에 로깅 설정
    * [x] Nginx Access Log 설정
* [x] Cloudwatch로 모니터링
    * [x] Cloudwatch로 로그 수집하기
    * [x] Cloudwatch로 메트링 수집하기

### 2단계 - 웹 성능 테스트
* 웹 성능 예산 작성
    * WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악

* 부하 테스트
    * 테스트 전제조건 정리
        * 대상 시스템 범위
        * 목표값 설정(latency, throughput, 부하 유지기간)
        * 부하 테스트 시 저장될 데이터 건수 및 크기
    * 각 시나리오에 맞춰 스크립트 작성
        * 접속 빈도가 높은 페이지
        * 데이터를 갱신하는 페이지
        * 데이터를 조회하는데 여러 데이터를 참조하는 페이지

* Smoke, Load, Stress 테스트 후 결과를 기록

### 작업 진행 순서
* [x] 웹 성능 예산 작성
    * 경쟁사 선정
    * 경재사 사이트 확인
    * 경쟁사와 비교하여 웹 성능 예산 책정 
* [x] 웹 성능 예산을 바탕으로 웹 성능 테스트 진행 및 개선 부분 찾기
* [X] 부하 테스트 전제 조건 작성
* [ ] Somke, Load, Stress 테스트 진행 및 결과 저장
