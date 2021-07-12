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
    * web server(nginx) : /var/log/nginx -> chae-yh-cloudwatch-loggroup 으로 로그 수집 (private ip : 192.168.123.202)
    * was(springboot) : /home/log -> chae-yh-cloudwatch-loggroup 으로 로그 수집 (private ip : 192.168.123.104)
2. Cloudwatch 대시보드 URL을 알려주세요
    * https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=chae-yh-dashboard
        * web server - was server 로 구성 / db 는 was server 내 docker 로 구성
        * 각 서버 metric + was server 의 application metric(error count / blocked count) 으로 구성
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    * 정량
        * 압축된 리소스 최대 크기 : 200KB 미만
    * 시간
        * FCP : 3초 미만
        * TTI : 5초 미만
    * 규칙
        * pagespeed : 60점 이상(PC / MOBILE)
2. 웹 성능 예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    * PC :
        * 정량 :
            * 압축된 리소스 최대 크기 :
                                 
                | MIME Type | Bytes | Uncompressed |
                | --- | --- | --- |
                | js | 2,352,130 | 2,352,130 |
                | font | 132,380 | 132,380 |
                | css | 60,018 | 337,080 |
                | image | 4,954 | 4,954 |
                | html | 1,000 | 1,000 |
                | flash | 0 | 0 |
                | other | 0 | 0 |
                | video | 0 | 0 |
        * 시간 : 
            * FCP : 2.7초
            * TTI : 2.8초
        * 규칙 : 67점
    * MOBILE :
        * 정량 :
            * 압축된 리소스 최대 크기 :
                                 
                | MIME Type | Bytes | Uncompressed |
                | --- | --- | --- |
                | js | 2,352,130 | 2,352,130 |
                | font | 132,380 | 132,380 |
                | css | 60,018 | 337,080 |
                | image | 4,954 | 4,954 |
                | html | 1,000 | 1,000 |
                | flash | 0 | 0 |
                | other | 0 | 0 |
                | video | 0 | 0 |                 
        * 시간 : 
            * FCP : 14.9초
            * TTI : 15.5초
        * 규칙 : 32점
    * 문제점 : 공통 개선 사항으로 압축된 리소스 최대 크기가 2MB로 이 부분을 200KB로 줄이는 부분이 필요.
        * PC : FCP / TTI / PageSpeed 테스트 점수의 웹 성능 예산을 충족함 
        * MOBILE : FCP와 TTI가 약 15초대로, 웹 성능 예산인 3초, 5초 수준으로 성능 개선 필요. 
        PageSpeed 점수도 32점으로 목표치인 60점이상으로 올려야함
    * 개선점 : 
        * 공통적으로 나오는 텍스트 압축 사용부분 개선 필요 : MOBILE의 경우 9초 정도 시간 절감 효과가 있고, 
        리소스 크기의 경우도 400KB 정도 절감 효과가 있음
        * 미사용 자바스크립트 제거 : MOBILE의 경우 약 3초 정도의 시간 절감 효과가 있고, 
        리소스 크기 1500KB 정도 절감 효과가 있음
        * 상기 두 가지 개선이 가능할 경우, MOBILE의 경우 12초 정도 시간 절감 효과로 인해 FCP / TTI가 웹 성능 예산에 충족하고,
        리소스도 1900KB 절감가능하므로, 기존 2,125KB에서 약 200KB 정도까지 리소스 절감 가능하여 웹 성능 예산 충족 가능할 것으로 예상
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    * 대상 시스템 범위 : 
        * https://chae-yh-domain.kro.kr/
        * https://chae-yh-domain.kro.kr/stations
        * https://chae-yh-domain.kro.kr/path
    * 목푯값 설정 (latency, throughput, 부하 유지기간)
        * latency : 100ms 미만
        * througput : 
            * 1일 평균 rps : 10000(DAU) X 10(1명당 1일 평균 접속 수) / 86400(초/일) = 1.16(2번째 자리 반올림)
            * 1일 최대 rps : 1.16(1일 평균 rps) X 2(최대 트래픽 / 평소 트래픽) = 3.32
        * 부하 유지기간 : 
            * Smoke : 30s
            * Load : 3m
            * Stress : 1m
    * 부하 테스트 시 저장될 데이터 건수 및 크기 : 조회 페이지이기 때문에 저장 데이터 미존재
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요       
    * 접속 빈도가 높은 페이지 : https://chae-yh-domain.kro.kr/
        * Smoke : 
            * 스크립트 : /k6/script/landing_smoke_test.js
            * 결과 : /k6/script/landing_smoke_test_result.md
        * Load : 
            * 스크립트 : /k6/script/landing_load_test.js
            * 결과 : /k6/script/landing_load_test_result.md
        * Stress : 
            * 스크립트 : /k6/script/landing_stress_test.js
            * 결과 : /k6/script/landing_stress_test_result.md                       
    * 데이터를 갱신하는 페이지 : https://chae-yh-domain.kro.kr/stations
        * Smoke : 
            * 스크립트 : /k6/script/create_station_smoke_test.js
            * 결과 : /k6/script/create_station_smoke_test_result.md
        * Load : 
            * 스크립트 : /k6/script/create_station_load_test.js
            * 결과 : /k6/script/create_station_load_test_result.md
        * Stress : 
            * 스크립트 : /k6/script/create_station_stress_test.js
            * 결과 : /k6/script/create_station_stress_test_result.md
    * 데이터를 조회하는데 여러 데이터를 참조하는 페이지 : https://chae-yh-domain.kro.kr/path
        * Smoke : 
            * 스크립트 : /k6/script/find_path_smoke_test.js
            * 결과 : /k6/script/find_path_smoke_test_result.md
        * Load : 
            * 스크립트 : /k6/script/find_path_load_test.js
            * 결과 : /k6/script/find_path_load_test_result.md
        * Stress : 
            * 스크립트 : /k6/script/find_path_stress_test.js
            * 결과 : /k6/script/find_path_stress_test_result.md
          
***

## 기능 요구 사항
### step1
* 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
    * case 1 : /lines 로 호출 시 쿼리 내 SLEEP 삭제 [O]
    * case 2 : 서로를 synchronize 로 동기화하여 데드락 거는 부분 삭제 [O]
    * case 3 : while의 무한 루프 삭제 [O]
* 로그 설정하기
    * Application Log 파일로 저장하기
        * 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정 [O] : AOP 활용하여 controller 에 접근하는 요청에 대한 로그 설정
    * Nginx Access Log 설정하기 [O] : docker로 nginx 띄우고 로그 설정 및 Cloudwatch 에 로그 그룹 설정
* Cloudwatch로 모니터링
    * Cloudwatch로 로그 수집하기 [O] : chae-yh-cloudwatch-loggroup
    * Cloudwatch로 메트릭 수집하기 [O] : 대시보드 구성 및 application metric 추가

### step2
* 웹 성능 테스트
    * 웹 성능 예산을 작성 [O]
    * WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악 [O]
* 부하 테스트
    * 테스트 전제조건 정리 
        * 대상 시스템 범위 [O]
        * 목푯값 설정 (latency, throughput, 부하 유지기간) [O]
        * 부하 테스트 시 저장될 데이터 건수 및 크기 [O]
    * 각 시나리오에 맞춰 스크립트 작성 
        * 접속 빈도가 높은 페이지 [O]
        * 데이터를 갱신하는 페이지 [O]
        * 데이터를 조회하는데 여러 데이터를 참조하는 페이지 [O]
    * Smoke, Load, Stress 테스트 후 결과를 기록 
