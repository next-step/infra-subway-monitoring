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
   * 웹 서버
        - 애플리케이션 로그 : /home/ubungu/subway-infra-monitoring/log 
   * 프록시 서버 (웹 서버내의 Docker 통해 띄움)
        - access 로그 : /var/log/nginx/access.log
        - error 로그 : /var/log/nginx/error.log
    
   ``` 
   📍 바스티온 서버 IP : 3.35.149.248
   📍 웹 서버 IP : 3.34.50.96 (private : 192.168.77.45 )
   ```
2. Cloudwatch 대시보드 URL을 알려주세요
    * https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-applemango2021
---
### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   A. 경쟁사 선정
    * 후보군 :  카카오 지하철, 지하철 종결자, 네이버 지도

   → 이 중에서 웹으로 접근이 가능한 `네이버 지도` 선택

   B. 경쟁사 성능도 조사
    * 대상 URL : https://m.map.naver.com/subway/subwayLine.naver?region=1000
    * PageSpeed 결과

      |항목|데스크탑 환경 결과|모바일 환경 결과|
                    |:---------|-------|------|
      |First Contentful Paint|0.5초|2.1초
      |Speed Index|2.2초|5.6초
      |Largest Contentful Paint|1.6초|8.0초
      |Time to Interactive|1.5초|7.2초
      |Total Blocking Time|30밀리초|520밀리초
      |Cumulative Layout Shift|0.005|0.03
      |총 점수(100점 만점)|90점|51점

   C. 예산 설정
    - 강의 시간에 다루었던 `Performance Budget Metrics`과 경쟁사의 결과값을 위주로 하여 예산을 잡았습니다
        * Timing-based : 데스크탑 환경 기준 FCP 1초 이내
        * Rule-based : Pagespeed 총점 80점 이상

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - 개선전 성능

      |항목|데스크탑 환경 결과|모바일 환경 결과|
                  |:---------|-------|------|
      |First Contentful Paint|2.8초|15.4초
      |Speed Index|2.8초|15.4초
      |Largest Contentful Paint|2.9초|16.0초
      |Time to Interactive|2.9초|16.0초
      |Total Blocking Time|50밀리초|530밀리초
      |Cumulative Layout Shift|0.004|0.041
      |총 점수(100점 만점)|67점|32점
    - 개선 방향
        - 주요 자바스크립트 로딩 속도 변경 : vendor.js, main.js에 async 추가
        - Gzip을 통한 텍스트 압축 : application.properties 설정 추가
        - 정적 컨텐츠 캐시 : nginx.conf 설정 추가([참고](https://jojoldu.tistory.com/60))

    - 개선후 성능

      → 데스크탑뿐만 아니라, 모바일 환경에서의 FCP 속도가 상당히 개선됨

      |항목|데스크탑 환경 결과|모바일 환경 결과|
           |:---------|-------|------|
      |First Contentful Paint|0.7초|2.5초
      |Speed Index|1.6초|5.6초
      |Largest Contentful Paint|1.3초|5.6초
      |Time to Interactive|1.3초|5.7초
      |Total Blocking Time|190밀리초|720밀리초
      |Cumulative Layout Shift|0.004|0.041
      |총 점수(100점 만점)|89점|51점

3. 부하테스트 전제조건은 어느정도로 설정하셨나요


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
