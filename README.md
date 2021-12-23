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
- public1(192.168.33.10) /home/ubuntu/log/subway.log
- public2(192.168.33.92) /home/ubuntu/log/subway.log


2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-koola97620
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

#### 지하철 노선도 vs 경쟁사 지하철 노선도 

페이지 : http://15.164.72.205:8080/path
경쟁사 : https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%A7%80%ED%95%98%EC%B2%A0%EB%85%B8%EC%84%A0%EB%8F%84&oquery=%EC%A7%80%ED%95%98%EC%B2%A0%EB%85%B8%EC%84%A0+%EA%B2%80%EC%83%89&tqi=hNLQ3wprvxsssL3qWIlssssstDK-025299

####PageSpeed (데스크탑 기준)

**지하철** : FCP : 2.9 TTI : 2.9 SI  : 2.9 TBT : 10  LCP : 2.9 CLS : 0

**경쟁사** : FCP : 0.8 TTI : 2.7 SI  : 1.6 TBT : 100 LCP : 1.1 CLS : 0

####WebPageTest

**지하철노선도**
![image](https://user-images.githubusercontent.com/10750614/147131366-46782dd7-a618-4861-8ba1-2f624c628514.png)
![image](https://user-images.githubusercontent.com/10750614/147243690-78362f1d-9c22-4e66-a7c5-99935a0c7cf4.png)

**경쟁사 지하철 노선도**
![image](https://user-images.githubusercontent.com/10750614/147132211-01fbe5ed-d62f-437b-818a-8fdbf0dcbfbc.png)
![image](https://user-images.githubusercontent.com/10750614/147243642-cb56e964-d4ff-46a2-bde5-a449062ecd24.png)


성능 예산 (경쟁사의 -20% ~ +20%)
 - FCP : 0.64 ~ 0.96  
 - TTI : 2.16 ~ 3.24
 - SI  : 1.28 ~ 1.92
 - TBT : 80 ~ 120
 - LCP : 0.88 ~ 1.32
 - CLS : 0


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

사용자 입장에선 페이지가 화면에 빨리 나타나는게 중요하다고 생각합니다. PageSpeed 와 WebPageTest 의 결과를 봤을 때,

- WebPageTest 결과에서 Compress Transfer, Cache statice content 가 F 
- 경쟁사 대비 전반적인 성능이 좋지 않지만 특히 FCP 와 LCP 의 성능이 좋지 않습니다 

 그래서 FCP 와 LCP 의 수치를 낮출 수 있는 방향으로 개선해보려 합니다.

### 개선방향

- 정적인 애셋 제공 - 캐시 사용 
- 텍스트 압축 사용 - 네트워크 바이트 최소화하려면 텍스트 기반 리소르를 압축(gzip)하여 제공해야 함.




3. 부하테스트 전제조건은 어느정도로 설정하셨나요

DAU
rps



4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요 

접속빈도 높은 페이지

데이터 갱신하는 페이지

데이터 조회하는에 여러 데이터를 참조하는 페이지





