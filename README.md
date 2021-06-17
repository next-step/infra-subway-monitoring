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
- **애플리케이션**
  - /home/ubuntu/logs/file.log
  - /home/ubuntu/logs/json.log
- **NGINX**
  - /var/log/nginx/access.log
  - /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
  - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=seondongpyo-dashboard 

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="1">
   
    - WebPageTest, PageSpeed 에서의 측정 결과를 바탕으로 하여  
      Desktop 환경에서 Timing-based, Rule-based Metric으로 예산을 설정했습니다.
      ![webpagetest_result](https://user-images.githubusercontent.com/64854054/122420720-d9d4ac80-cfc6-11eb-82b8-c7947d0a6d21.png)
      ![pagespeed_result](https://user-images.githubusercontent.com/64854054/122420399-a003a600-cfc6-11eb-97f1-cf8281a17ae2.png)
  
      |항목|기준|
      |---|---|
      |페이지 로드 시간|3초 미만|
      |Time to Interactive (TTI)|2초 미만|
      |First Contentful Paint (FCP)|1.8초 미만|
      |Large Contentful Paint (LCP)|2.5초 미만|
      |Speed Index |3.4초 미만|
      |Total Blocking Time(TBT)|50ms 이하|
      |Cumulative Layout Shift(CLS)|0.1 미만|
    </div>
    </details>


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="2">
   
      - **gzip을 이용한 텍스트 압축 사용**
        ![image](https://user-images.githubusercontent.com/64854054/122421840-a2b2cb00-cfc7-11eb-918a-d40aaa909619.png)

      - **사용하지 않는 자바스크립트 줄이기**
        ![image](https://user-images.githubusercontent.com/64854054/122422446-1d7be600-cfc8-11eb-877f-6463f3c37b3b.png)
        
      - **정적 리소스 캐싱**
        ![image](https://user-images.githubusercontent.com/64854054/122422773-62a01800-cfc8-11eb-98cc-607417db1180.png)
        
    </div>
    </details>


3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    <details>
    <summary>접기/펼치기</summary>
    <div markdown="3">
   
      - **테스트 전제조건 정리**
        
        |항목|기준|비고|
        |---|---|---|
        |1일 사용자 수(DAU)|100,000|2017년 기준 '지하철 종결자' MAU 335만 명 / 30일 ≒ 약 10만|
        |1명당 1일 평균 접속 수|5|출·퇴근 및 외근 정도?|
        |1일 총 접속 수|500,000|DAU * 1일 평균 접속 수|        
        |1일 평균 RPS|6|1일 총 접속 수 / 86,400|        
        |1일 최대 RPS|60 |1일 평균 RPS * (최대 트래픽) / 평소 트래픽))|        
        |Latency|50ms |50 ~ 100ms 이하|

      - **시나리오**
    
        |기준|항목|
        |---|---|
        |접속 빈도가 높은 페이지|메인|
        |데이터를 갱신하는 페이지|역 관리|
        |데이터를 조회하는데 여러 데이터를 참조하는 페이지|경로 검색|
    </div>
    </details>
  

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
