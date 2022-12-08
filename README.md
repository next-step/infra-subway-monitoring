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

## 서비스 진단하기 강의 내용 간단 정리
> 이번 미션 목표
> 1. webpagetest, pagespeed를 활용하여 _**웹 성능 예산 고민**_
> 2. 목표치를 정하고 _**부하 테스트**_ 를 직접 수행
> 3. _**USE 방법론**_ 을 활용하여 _**서버 진단 & Thread 덤프**_ 를 확인 가능

### 웹 성능 진단하기

#### 문제 인식) 주로 _인터넷 구간 성능 테스트_ 를 _어떤 기준_ 으로 _어떻게_ _무엇을_ 개선 할 것 인가?

#### 어떻게 확인?
- webpagetest, pagespeed 등의 도구를 활용

#### 무엇을 개선?
A) 정답은 없다 ; 서비스 특성마다 다른 기준을 가지고 개선  
크게 **정량** / **시간** / **규칙** 기반으로 산정하여 개선 가능 하다.

- 정량 기반(`Quantity Based Metric`) 예시
  - 메인 페이지의 모든 오브젝트 파일 크기는 `10mb 미만`으로 제한한다
  - 모든 웹 페이지의 각 페이지 내 포함된 자바스크립트 크기는 `1mb 미만` 이어야 한다.
  - 검색 페이지에는 `2mb 미만`의 이미지가 포함되어야 합니다.
- 시간 기반(`Timing Based Metric`) 예시
  - LTE 환경에서의 모바일 기기의 `TTI:Time To Interactive`는 `5초 미만`이어야 한다
  - `DCL:Dom Content Loaded`는 `10초`, `FMP: First Meaningful Paint`는 `15초 미만`이어야 한다
- 규칙 기반(`Rule Based Metric`) 예시
  - Lighthouse 성능 검사에서 `80점 이상`이어야 한다.

대표적으로 활용되는 가장 중요한 기준
- 사용자 _**트래픽이 많은 페이지**_ , _**가장 중요한 페이지**_ 기준
    - 경쟁사 대비 20% 차이
    - 3초 안에 로딩

> 참고)성능 관련 용어들의 의미 파악
> - FCP(First Contentful Paint) : 가장 첫번째 유의미한 콘텐츠(텍스트 or 이미지)가 표시되는 시간 
> - LCP(Large Contentful Paint) : 유의미한 콘텐츠(텍스트 or 이미지) 중 가장 큰 콘텐츠가 표시되는 시간 
> - TTI(Time To Interactive) : 사용자가 사이트와 완전히 상호작용 할 수 있을 때까지 걸리는 시간
> - TBT(Total Blocking Time) : 상호작용이 불가능 했을 때의 시간(TTI - FCP)
> - CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정
> - Speed Index : 페이지의 보이는 부분이 표시되는 평균 시간

#### 성능 예산 이란?
`예산`이란 단어 때문에 헷갈릴 여지가 있는 부분이 있으나, 금전적인것과는 연관 없는  
**_순수하게 페이지에 대한 초과할 수 없는 어떤 기준이나 제한을 의미_**

### 부하 테스트 하기
2단계 진행 시 정리 예정
### 서버 진단하기
2단계 진행 시 정리 예정
### 애플리케이션 진단하기
2단계 진행 시 정리 예정

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

#### 1단계 기능 목록
- [x] AWS에 서버 띄우기(연계되는 미션이 있는 줄 모르고 세미 보이스카웃 규칙 적용(지울수 있는 만큼 지우기))
  - [x] 현재 소스코드 기준으로 운영 환경 구성(환경설정 파일 분리, 배포 스크립트 적용 등등..)
- [ ] 경쟁사 부하 테스트 성능 확인
  - 서울 교통 공사
  - 네이버 지도
  - 카카오 맵
- [ ] RunningMap 부하 테스트 성능 확인
  - [ ] 성능 예산 선정 ; 목표 응답시간 설정
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
