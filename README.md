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
EC2-lights93-public(/home/ubuntu/logs/subway)

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-lights93

#### 기능 요구사항
- [X] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [X] 로그 설정하기
    - [X] Application Log 파일로 저장하기
        - [X] 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
    - ~~Nginx Access Log 설정하기~~
- [x] Cloudwatch로 모니터링
    - [X] Cloudwatch로 로그 수집하기
    - [X] Cloudwatch로 메트릭 수집하기
    
#### 코드 리뷰사항
- [X] SubwayNotFoundException 로그 레벨 변경
- [X] badRequest일 때 어떠한 문제인지 전달
- [X] 불필요한 주석 제거
- [X] gradle 컨벤션
- [X] request 로그 제대로 남기도록 수정
- [X] 시스템 에러 로그를 노출하면 안 되는 이유
- [X] AOP를 사용하지 않은 이유? -> 취향 차이, AOP를 사용하면 좀 더 유연하게 사용 가능
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    - 웹 성능 측정(pagespeed)
        - 현재 내 페이지 성능(https://lights93.o-r.kr/)
            - FCP: 2.7 초
            - LCP: 2.8 초
            - TTI: 2.8 초
            - TBT: 50 밀리초
            - CLS: 0.003
        - 경쟁사 페이지 성능(http://www.seoulmetro.co.kr/kr/cyberStation.do)
            - FCP: 1.6 초
            - LCP: 3.5 초
            - TTI: 2.0 초
            - TBT: 40 밀리초
            - CLS: 0.013
        - 경쟁사 페이지 성능(https://map.naver.com/v5/subway/)
            - FCP: 0.4 초
            - LCP: 7.7 초
            - TTI: 3.6 초
            - TBT: 570 밀리초
            - CLS: 0.019
    - 목표 웹성능예산
        - FCP: 0.48 초 (가장 빠른 네이버와 20% 이내 차이)
        - TTI: 2.0 초 (가장 빠른 서울지하철 사이트와 동일)
        - TBT: 40 밀리초 (가장 빠른 서울지하철 사이트와 동일)
        이 외에는 가장 빠르므로 목표롤 설정 X
    - 우선순위
        - FCP: 화면이 보이는 초기 렌더링이므로 제일 높음
        - TTI: 사용자가 노선 검색을 빠르게 클릭해야 하기 때문에 2번째로 중요
        - TBT: 사용자가 버벅임을 느끼는 현상, 3번째로 중요
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - 개선사항
        - 텍스트 압축 사용(gzip, deflate, brotli)
        - 정적 리소스 캐시 적용 또는 CDN 적용
    - 개선사항 적용 후 성능 (FCP 외에는 목표 성능예산 달성)
        - FCP: 1.2 초
        - LCP: 1.3 초
        - TTI: 1.3 초
        - TBT: 40 밀리초
        - CLS: 0.004
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 대상 시스템 범위
        application, mysql
    - 목푯값 설정
        - 예상 1일 사용자 수(DAU): 23만 (네이버지도 MAU 1392만, 1392/30 => 46 의 절반)
        - 피크 시간대의 집중률을 예상: 5배
        - 1명당 1일 평균 접속 혹은 요청수 예상: 8회 = 2(출근, 퇴근) * 4(메인, 로그인, 경로 검색페이지, 검색요청)
        - Throughput(1일 평균 rps ~ 1일 최대 rps)
            - 1일 총 접속 수(1일 사용자 수(DAU) x 1명당 1일 평균 접속 수): 184만 
            - 1일 평균 tps(1일 총 접속 수 / 86,400): 21
            - 1일 최대 rps(1일 평균 rps x (최대 트래픽 / 평소 트래픽)): 105
        - Latency: 50ms
        - 부하 유지 기간: 30
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - 접속 빈도가 높은 페이지(메인 페이지)
        - [smoke.js](./performance/main/smoke.js)
        - [smoke 결과](./performance/main/smoke.txt)
        - [load.js](./performance/main/load.js)
        - [load 결과](./performance/main/load.txt)
        - [stress.js](./performance/main/stress.js)
        - [stress 결과](./performance/main/stress.txt)
    - 데이터를 갱신하는 페이지(내 정보 수정)
        - [smoke.js](./performance/me/smoke.js)
        - [smoke 결과](./performance/me/smoke.txt)
        - [load.js](./performance/me/load.js)
        - [load 결과](./performance/me/load.txt)
        - [stress.js](./performance/me/stress.js)
        - [stress 결과](./performance/me/stress.txt)
    - 데이터를 조회하는데 여러 데이터를 참조하는 페이지(경로 조회)        
        - [smoke.js](./performance/path/smoke.js)
        - [smoke 결과](./performance/path/smoke.txt)
        - [load.js](./performance/path/load.js)
        - [load 결과](./performance/path/load.txt)
        - [stress.js](./performance/path/stress.js)
        - [stress 결과](./performance/path/stress.txt)
#### 기능 요구사항
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
Smoke, Load, Stress 테스트 후 결과를 기록