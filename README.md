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

사용자 입장에선 페이지가 화면에 빨리 나타나는게 중요하다고 생각합니다. 그래서 화면에 빨리 나타나게 하기 위한 개선이 필요하다고 생각합니다.
PageSpeed 와 WebPageTest 의 결과를 봤을 때,

- WebPageTest 결과에서 Compress Transfer, Cache statice content 가 F. 
- 경쟁사 대비 전반적인 성능이 좋지 않지만 특히 FCP 와 LCP 의 성능이 좋지 않습니다. 

결론 : FCP 와 LCP 의 수치를 낮출 수 있는 방향으로 개선해보려 합니다.

## 개선사향
  - 정적인 애셋 제공 - 캐시 사용 
  - 텍스트 압축 사용 - 네트워크 바이트 최소화하려면 텍스트 기반 리소르를 압축(gzip)하여 제공해야 함.

### 캐시 적용
- 캐시 적용 전
  - ![image](https://user-images.githubusercontent.com/10750614/147263723-d3c580e2-66d7-40f9-adca-3ebd719d119a.png)
  - FCP : 2.9 TTI : 2.9 SI  : 2.9 TBT : 10  LCP : 2.9 CLS : 0
- 캐시 적용 후
  - FCP : 3.0 TTI : 3.2 SI  : 3.0 TBT : 20  LCP : 3.0 CLS : 0
  - WebPageTest, PageSpeed 의 결과를 보면 캐시가 적용됨을 확인할 수 있으나 적용 직후의 성능 수치는 안좋아짐...
    ![image](https://user-images.githubusercontent.com/10750614/147264375-26fa054c-5de1-424f-b956-6d460b3aa1c7.png)
  - ![image](https://user-images.githubusercontent.com/10750614/147264436-1c91e750-1660-4e15-99fb-abcd25531e70.png)

### 텍스트 압축

- 텍스트 압축 사용 전
  - ![image](https://user-images.githubusercontent.com/10750614/147265673-d38abacd-959b-462a-932e-38a5ac00dd3c.png)
  - ![image](https://user-images.githubusercontent.com/10750614/147267876-a472f6db-bbc1-4ec3-afce-1c9dad283935.png)
  - FCP : 3.0 TTI : 3.2 SI  : 3.0 TBT : 20  LCP : 3.0 CLS : 0
- 텍스트 압축 사용 후
  - FCP : 1.5 TTI : 1.7 SI  : 1.5 TBT : 50  LCP : 1.5 CLS : 0
  - 성능이 개선된 것을 확인할 수 있다
  - WebPageTest, PageSpeed 의 결과를 보면 텍스트 압축이 적용된 것을 확인할 수 있다.
  - ![image](https://user-images.githubusercontent.com/10750614/147267406-2beb92f0-4513-4ce5-8a4b-40f8e0332cc5.png)
  - ![image](https://user-images.githubusercontent.com/10750614/147267291-c874295b-e638-409d-a1cd-7f87fb8588f2.png)
  - ![image](https://user-images.githubusercontent.com/10750614/147267922-1e132992-c46e-46ce-a366-f9635226e1a4.png)



3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 시스템 범위
  - 접속 빈도 높은 페이지 : 메인 페이지
  - 데이터 갱신 페이지 : 로그인 -> 회원정보 변경 페이지
  - 데이터 조회시 여러 데이터 참조하는 페이지 : 경로 조회 페이지

![image](https://user-images.githubusercontent.com/10750614/147276269-65888706-54da-4f77-b4a1-d9e382406eb8.png)
![image](https://user-images.githubusercontent.com/10750614/147276493-02b27796-c469-48e9-9a5a-8cd94f35e1bb.png)
http://www.koreanclick.com/insights/newsletter_view.html?id=563

경쟁사인 네이버와 카카오의 평균 월 이용자수 1,110만명 보다 조금 더 이용하는 것을 목표로 해서 MAU 를 1,200만명으로 잡는다.


- DAU : 1200만 / 30 = 400,000   
- 1일 총 접속수 : 400,000 (DAU) * 2 (1명당 1일 평균 접속수) = 800,000   (출퇴근에 한번씩)
- 1일 평균 rps : 800,000 / 86,400= 9.25
- 1일 최대 rps : 9.25 * 10(최대트래픽/평소트래픽) = 92.5

- Latency : 50ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요 

- 접속 빈도 높은 페이지 : 메인 페이지 (main)
- 데이터 갱신 페이지 : 로그인 -> 회원정보 변경 페이지 (update)
- 데이터 조회시 여러 데이터 참조하는 페이지 : 경로 조회 페이지 (path)





