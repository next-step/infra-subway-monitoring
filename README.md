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

FILE : [moonjuhyeon-manage-key-pair.pem](https://drive.google.com/file/d/1NVC7AWCaGsdhXbAhkfxk5mUpzGisCIGH/view?usp=sharing)

 - moonjuhyeon-public-a
    - application log = /home/ubuntu/logs.log
    - syslog: /var/log/syslog
 - moonjuhyeon-private
    - syslog: /var/log/syslog
 - moonjuhyeon-manage
    - syslog: /var/log/syslog

2. Cloudwatch 대시보드 URL을 알려주세요

- [링크](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-moonjuhyeon)

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 
   
   - 지하철 최단 경로 찾기는 카카오 지도, 네이버 지도를 이용하는 사람이 많을 것이라 판단
   - https://pagespeed.web.dev/ 의 데스크톱 기준으로 성능지표를 비교함
   - 카카오, 네이버 3초 미만의 속도를 보여주고 있으며, 약간의 개선을 통해 경쟁사와 비슷한 속도를 내는 것이 목표
   - 경쟁사와 비교하여 First Contentful Paint, Largest Contentful Paint 시간이 매우 느리기 때문에, 정적 리소스들의 압축 또는 제거가 필요하다 판단

|구분|본인|카카오|네이버|
|---|---|---|---|
|First Contentful Paint| 2.9s | 0.6s |  0.3s|
|Time to Interactive|3.0s|2.5s|2.8s|
|Speed Index|2.9s|2.4s|2.8s|
|Total Blocking Time|50ms|530ms|290ms|
|Largest Contentful Paint|3.0s|0.7s|2.6s|
|Cumulative Layout Shift|0.004|0.017|0|
   


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   
   - 정적 리소스 gzip 압축 사용
   - 사용하지 않는 자바스크립트 줄이기
   - 렌더링 차단 리소스 제거하기

    - ###개선 후 성능 측정 
        - First Contentful Paint : 1.2s
        - Time to Interactive : 1.3s
        - Speed Index : 1.7s
        - Total Blocking Time : 70ms
        - Largest Contentful Paint : 1.3s
        - Cumulative Layout Shift : 0.004


<br/>
3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 경쟁사 사용 인원 분석
   - 하루 평균 서울 지하철 이용 인원 : 11,865,285 명
   - 네이버 지도 이용 인원 : 13,920,000 명
   - 카카오 맵 이용 인원 : 7,290,000 명
   - 티맵 대중 교통 이용 인원 : 710,000 명
   
- 전제조건
   - 1일 사용자 수 : 500,000 명
   - 1명당 일 평균 서버 요청 수 : 5 건
   - 1일 평균 rps : 29rps
   - 최대 트래픽 : 145rps
   - Latency : 외부에서 요청하기 때문에 설정하지 않음

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   
   - 메인페이지
     - smoke
       - [스크립트](./k6/main/smoke.js)
       - [결과](./k6/main/smoke.md)
     - load
       - [스크립트](./k6/main/load.js)
       - [결과](./k6/main/load.md) 
     - stress
       - [스크립트](./k6/main/stress.js)
       - [결과](./k6/main/stress.md)
   - 로그인
     - smoke
       - [스크립트](./k6/login/smoke.js)
       - [결과](./k6/login/smoke.md)
     - load
       - [스크립트](./k6/login/load.js)
       - [결과](./k6/login/load.md)
     - stress
        - [스크립트](./k6/login/stress.js)
        - [결과](./k6/login/stress.md)
   - 로그인 -> 마이페이지 -> 내정보 수정
        - smoke
           - [스크립트](./k6/member/smoke.js)
           - [결과](./k6/member/smoke.md)
       - load
           - [스크립트](./k6/member/load.js)
           - [결과](./k6/member/load.md)
       - stress
           - [스크립트](./k6/member/stress.js)
           - [결과](./k6/member/stress.md)
   - 경로 검색 페이지 -> 경로 검색
       - smoke
         - [스크립트](./k6/path/smoke.js)
         - [결과](./k6/path/smoke.md)
       - load
           - [스크립트](./k6/path/load.js)
           - [결과](./k6/path/load.md)
       - stress
           - [스크립트](./k6/path/stress.js)
           - [결과](./k6/path/stress.md)


