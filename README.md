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


### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요  
분석 결과 Desktop 기준 Running Map 보다 성능 지표가 좋은 서울교통공사 지표와의 차이를 20% 내외로 조정하는 방향으로 생각해보았습니다.
그 결과, FCP 는 1.6s 와 약 20% 차이인 2s 로, TTI 도 현재 2.8s 에서 2.4s 로 개선하는 방향으로 고민해보았습니다.


pagespeed.web.dev 를 통한 분석
```
(Desktop)
              FCP       TTI       SI       TBT       LCP       CLS
---------------------------------------------------------------------
서울교통공사  1.6s      2s       2.2s      130ms     3.6s      0.014
네이버지도    0.5s      0.7s     1.5s      0ms       1.6s      0.006
카카오맵      0.5s      1.0s     2.4s      0ms       1.1s      0.039
Running Map   2.7s      2.8s     2.7s      50ms      2.8s      0.004
```
```
(Mobile)
              FCP       TTI       SI       TBT       LCP       CLS
---------------------------------------------------------------------
서울교통공사  6.8s      8.6s     8.1s      360ms     6.8s      0
네이버지도    2.1s      6.7s     4.4s      330ms     8.0s      0.03
카카오맵      1.7s      4.3s     6.4s      50ms      4.9s      0.005
Running Map   14.6s     15.2s    14.6s     550ms     15.2s     0.042  
```


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스 압축 사용
- 사용하지 않는 자바스크립트 줄이기
- JS/CSS 지연로딩을 통한 랜더링 차단 리소스 제거


---

### 2단계 - 부하 테스트
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - Target 시스템의 범위: WAS, DB
    - Throughput: 10.42 (1일 평균 rps) ~ 23.16 (1일 최대 rps)
      ※ 테스트 설정값을 구하기 위한 가정
   ```
       - 1일 사용자 수(DAU): 45만 (하루 평균 지하철 승차 인원의 약 10%)
       - 1일 총 접속 수 = DAU * 1명당 1일 평균 접속 수
                        = 45만(DAU) * 2 = 90만
       - 1일 평균 rps = 1일 총 접속 수 / 86,400 (초/일)
                      = 90만 / 86,400 = 10.42
       - 1일 최대 rps = 1일 평균 rps * (최대 트래픽 / 평소 트래픽)
                      = 10.42 * (10만 / 4.5만) = 2.22
       - 피크 시간대의 예상 최대 트래픽: 10만 (시간대별 평균 지하철 승/하차 인원 최대값의 약 10%)
       - 평소 트래픽: 4.5만 (시간대별 승차인원 평균치의 약 10%)
   ```
    - VUser 구하기
   ```
     * R: 6
       1) 메인페이지 호출
       2) 로그인페이지 호출
       3) 로그인
       4) 내 정보 조회
       5) 경로 검색 화면 호출
       6) 경로 검색
     * http_req_duration: 2.4s
     * 예상 latency: 1s 추가
     * T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency 를 추가한다
         = (6 * 2.4s) + 1 = 15.4s
     * VUser = (목표 rps * T / R) 
       - (10.42 (평균 rps) * 15.4) / 6 = 26.74
       - (23.16 (최대 rps) * 15.4) / 6 = 59.44
   ```
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - step2 directory 하단 result, script 에 추가하였습니다 

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
   /var/log/nginx/access.log
   /var/log/nginx/error.log
   /home/ubuntu/nextstep/infra-subway-monitoring/log/

2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=breezeunn-dashboard
