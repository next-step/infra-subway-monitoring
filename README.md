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
  - APPLICATION :/home/ubuntu/infra-subway-monitoring/log
  - 요구사항이 변경되어서 ALB(WAF) 적용 후 nginx는 종료하였습니다.

2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-steadyjin
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

```text
A. 예비 분석
    1. 지하철 노선도 서비스에서 가장 중요한 페이지
        - 경로 조회 페이지 
          사용자가 가장 많이 사용할 페이지이기 때문에 중요하다. 
          또한 다른 페이지에 비해서 DB에서 많은 데이터를 조회를 해야하는 페이지이기 때문에 로딩 속도가 느릴 가능성이 높다.
          느린 로딩 속도는 사용자의 이탈률을 증가시키는 원인이 되므로 중요한 페이지라고 할 수 있겠다. 
          (참고) 3초 안에 로딩되지 않으면 53% 사용자가 떠난다는 룰이 있음

B. 경쟁사 분석
    경쟁사 대비 20% 이상 성능 차이가 나고 있음.
    1. 현재 내 사이트 상태(http://3.35.48.111/path)
       - First Contentful Paint    : 3.0 s
       - Time to Interactive       : 3.1 s
       - Speed Index               : 3.0 s
       - Total Blocking Time       : 10 ms
       - Largest Contentful Paint  : 3.0 s
       - Cumulative Layout Shift   : 0 
    2. 서울교통공사 사이버 스테이션(http://www.seoulmetro.co.kr/kr/cyberStation.do)
       - First Contentful Paint    : 1.6 s
       - Time to Interactive       : 2.2 s
       - Speed Index               : 3.1 s
       - Total Blocking Time       : 360 ms
       - Largest Contentful Paint  : 3.6 s
       - Cumulative Layout Shift   : 0.013      
    3. 네이버 지하철(https://m.map.naver.com/subway/subwayLine.naver?region=1000)
       - First Contentful Paint    : 0.5 s
       - Time to Interactive       : 0.5 s
       - Speed Index               : 3.2 s
       - Total Blocking Time       : 0 ms
       - Largest Contentful Paint  : 1.6 s
       - Cumulative Layout Shift   : 0.006 
         
(참고) PageSpeed의 데스크톱 항목 기준 측정된 결과 

C. 웹 성능 예산 설정
    1. 우수 경쟁사 대비 최소 20% 차이를 기준으로 예산 설정함
    (차이가 20% 이상일 경우 사용자는 차이를 인식함.) 
    
       - First Contentful Paint    : 0.6 s
       - Time to Interactive       : 0.6 s
       - Speed Index               : 3.0 s
       - Total Blocking Time       : 10 ms
       - Largest Contentful Paint  : 1.92 s
       - Cumulative Layout Shift   : 0 

```   

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

```text
   1. Gzip 압축 기능을 추가
     -> property에 적용
     -> FCP는 3.0s -> 1.5s, TTI는 3.1s -> 1.5s, SI는 3.0s -> 1.5s, LCP는 3.0s -> 1.5s 개선
     
   2. 정적 리소스에 대해서는 캐싱 설정 적용
     -> property에 적용
     -> pageSpeed FCP, LCP 등 시간 지표에서는 시간 차이 없음.
     
   3. 렌더링 차단 리소스 제거하기
     -> 렌더링 차단 js에 defer 적용
     -> FCP는 1.5s -> 0.9s, TTI는 1.5s -> 1.5s, SI는 1.5s -> 1.2s, LCP는 1.5s -> 1.4s로 개선 (최종 개선)  
```

5. 부하테스트 전제조건은 어느정도로 설정하셨나요

6. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
