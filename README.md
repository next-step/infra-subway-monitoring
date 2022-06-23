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
<b> 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 </b>

#### 웹성능 관련 용어 정리
    
    1) LCP (Largest Contentful Page)
        - 화면을 가장 많이 차지하는 콘텐츠가 로딩되는 시간
        - 페이지가 얼마나 빨리 로딩되는지 측정
    2) FID (First Input Delay)
        - 사용자가 페이지와 처음 상호작용할 때 걸리는 시간
        - 페이지의 응답성을 측정
    3) CLS (Cumulative Layout Shift)
        - 페이지가 로딩되면서 이미지나 텍스트 위치가 바뀌는 정도
        - 페이지의 시각적 안정성 측정
    4) FCP (First Contentful Paint)
        - 처음 콘텐츠가 로딩되는 시간
        - FCP보다는 LCP가 더 유의미하다고 볼 수 있음
    5) INP (Interaction to Next Paint)
        - (가장) 오래 걸리는 상호작용이 걸리는 시간
        - 페이지의 응답성을 측정
    6) TTFB (Time to First Byte)
        - HTTP요청 후 첫 Byte가 응답되는 시간
        - 서버의 성능속도를 측정
    7) SI (Speed Index)
        - 웹 페이지를 불러올 때, 콘텐츠가 채워지는 속도
    8) TTI (Time to Interactive)
        - 페이지가 완전히 상호 작용 가능하게 되는 데 걸리는 시간
    9) TTB (Total Blocking Time)
        - 페이지가 안정적인 상호 작용 환경이 되기 전, 상호 작용이 불가능한 시간

#### 웹 성능 테스트
- 휴대전화

|사이트| FCP (초) | TTI (초) | SI (초) | TBT (밀리초) |LCP (초)|CLS|총점|
|-------|-------|------|---|---|---|---|------|
|개발 사이트|14.7|15.2|14.7|480|15.2|0.041|34|
|서울교통공사|6.7|9.3|8.7|1670|7.6|0|24|
|네이버지도|2.2|6.5|5.5|410|8.2|0.03|55|
|카카오맵|1.7|4.2|6.3|50|5.0|0.005|74|

- 데스크탑

|사이트| FCP (초) | TTI (초) | SI (초) | TBT (밀리초) |LCP (초)|CLS|총점|
|-------|-------|------|---|---|---|---|------|
|개발 사이트|2.7|2.8|2.7|30|2.8|0.04|68|
|서울교통공사|1.5|2.2|2.5|370|3.7|0|53|
|네이버지도|0.5|1.2|2.2|0|1.7|0.006|89|
|카카오맵|0.5|0.7|2.4|0|1.3|0.039|91|

####웹 성능 목표

> 가장 성능이 뛰어난 카카오맵 기준으로, 웹성능 지표가 20% 이내에 들어올 수 있도록 목표 설정
  - 정량적 지표
    - 리소스 200KB 이하
  - 시간적 지표
    - FCP 2초 이내 (카카오맵 1.7초)
    - TTI 5초 이내 (카카오맵 4.2초)
  - 규칙 기반 지표
    - LightHouse 성능 점수 휴대전화 60점 이상, 데스크탑 73점 이상
  
<br>
    
<b>2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요</b>
> 시간지표(FCP, TTI)의 개선을 위해서는, 리소스의 용량과 요청을 줄이는 것이 중요
- 리소스 압축
  - /js/vendors.js
    - 전송 크기: 2,125.0 KB
    - 가능한 절감 효과: 1,716.5 KB
  - /js/main.js
      - 전송 크기: 172.0 KB
      - 가능한 절감 효과: 143.6 KB
- 사용하지 않는 자바스크립트 줄이기
  - /js/vendors.js
      - 전송 크기: 2,125.0 KB
      - 가능한 절감 효과: 637.3 KB
  - /js/main.js
      - 전송 크기: 172.0 KB
      - 가능한 절감 효과: 61.8 KB
- 사용하지 않는 CSS 줄이기
- 렌더링 차단 리소스 제거하기
- 리소스 캐싱 사용하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
