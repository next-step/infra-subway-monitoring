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
   lewisseo91 public-a 서버
   /home/ubuntu/infra-subway-monitoring/log

2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-lewisseo91
   
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 
- 예비 분석  
    - 가장 중요한 페이지가 무엇인지    
        - 경로 조회 페이지    
            지하철 노선을 검색해 보는 유저 입장에서 생각해보면 경로 조회 페이지를 가장 많이 검색 할 것같습니다.
            메인 페이지와 경로 조회 페이지 사이에서 고민했지만 지하철 노선을 검색하는 사람들은 메인 페이지를 거치지 않고도
            바로 경로 조회 페이지에 접속할 수도 있다고 생각하여 조회 페이지로 선정하였습니다.
- 경쟁사 분석  
    - 내 사이트 분석 (webPageTest 이용)  
        FCP : 3.0 s  
        LCP : 3.0 s  
        TTI : 3.2 s   
        TBT : 30 ms  
        CLS : 0  
    - 서울교통공사 사이버 스테이션  
        FCP : 1.6 s  
        LCP : 3.6 s  
        TTI : 2.0 s   
        TBT : 140 ms  
        CLS : 0.013  
    - 네이버 웹 검색 (지하철 노선도)
        FCP : 0.9 s  
        LCP : 1.2 s  
        TTI : 3.9 s   
        TBT : 510 ms  
        CLS : 0
- 성능 기준
    - FCP : 0.9s 이내 = 1순위로 생각하고 있기에 가장 빠른 사이트를 기준으로
    - TTI : 2.5s 미만 = ((2.0 + 3.9->3.0)) / 2
    - LCP : 2.4s 이내 = ((3.6 + 1.2)) / 2

우선 순위 : 
개인적으로 노선 페이지가 빠르게 노출되는 것이 중요하다고 생각한다.  
1위 FCP, 2위 LCP, 3위 TTI

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- text 압축 사용 (gzip과 같은 압축형태 사용)
- static 컨텐츠들에 대해서 cache 적용하기 (이미지, js파일들)

3. 부하테스트 전제조건은 어느정도로 설정하셨나요  
   
   시스템 범위 : 메인 페이지 -> 멤버 조회 -> 노선 조회 페이지  
   목푯값 설정  
    - 예상 DAU : 100_000  
    - 집중률 예상 : 150%  
    - 1명당 1일 요청 수 예상 : 20  
    Throughput   
      1일 총 접속 수 2_000_000  
      1일 평균 rps 23.14  
      1일 최대 rps 34.72  
    Latency 50ms
    부하유지 기간 30분 목표
    데이터량 계산 : 메인 (3.3MB) + 회원 조회(1~2kb) + 노선 조회 페이지(3.6MB)
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
smoke 테스트

## todo list
- [x] Application Log 파일로 저장하기
    - [x] 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
- [x] Nginx Access Log 설정하기
- [x] Cloudwatch로 로그 수집하기
- [x] Cloudwatch로 메트릭 수집하기

## todo list - 2단계

- 웹 성능 테스트
    - [x] 웹 성능 예산을 작성
    - [x] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
- 부하 테스트
    - 테스트 전제조건 정리
        - [x] 대상 시스템 범위
        - [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
        - [x] 부하 테스트 시 저장될 데이터 건수 및 크기
    - 각 시나리오에 맞춰 스크립트 작성
        - [x] 접속 빈도가 높은 페이지
        - [x] 데이터를 갱신하는 페이지
        - [x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
- [x] Smoke, Load, Stress 테스트 후 결과를 기록
/loadTest/main/logs, /loadTest/member/logs, /loadTest/path/logs