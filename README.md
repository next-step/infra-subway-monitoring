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
#### LCP (Largest Contentful Paint)
- 페이지에서 가장 용량이 큰 컨텐츠가 표시되는 시점
- FCP의 경우 페이지에 스플래시 화면이 표시되거나 로딩중 아이콘이 표시되는 경우도 포함하기 때문에 사용자와 그다지 관련이 없음
- FMP를 측정하는 것이 복잡하기 때문에 가장 용량이 큰 컨텐츠가 렌더링 되는 시기인 LCP를 주요 컨텐츠가 로드되는 시기로 판단하는 것을 권장
#### CLS (Cumulative Layout Shift)
- 페이지가 로드되기 시작하는 시점과 lifecycle 상태가 숨김으로 변경되는 시점 사이에 발생하는 모든 예기치 않은 레이아웃 이동의 누적 점수를 측정
- 일반적으로 리소스가 비동기적으로 로드되거나 DOM 요소가 기존 컨텐츠가 있는 페이지에 동적으로 추가될 때 발생
#### FID (First Input Delay)
- 사용자가 페이지와 처음 상호작용한(클릭 또는 키 입력 등) 시간부터 브라우저가 실제로 이벤트 핸들러 처리를 시작할 수 있는 시간까지의 시간을 측정
- 일반적으로 입력 지연은 브라우저의 기본 스레드가 다른 작업 (예: 대용량 js 파일 파싱)을 실행 중일때 발생
- 메인 스레드에서 작업 중인데 타 작업이 발생하면 브라우저가 이에 대응하는데 FID만큼의 시간이 소요
#### TTFB (Time To First Byte)
- 페이지를 요청했을 때 서버에서 데이터의 첫 번째 바이트가 도착하는 시점
#### FCP (First Contentful Paint)
- FCP는 페이지가 로드되기 시작하고 컨텐츠의 일부가 화면에 렌더링 될 때 까지의 시간을 의미
#### FMP (First Meaningful Paint)
- 브라우저가 페이지의 주요 컨텐츠들을 화면에 렌더링하기 시작하는 순간
- FMP는 페이지 로드의 작은 차이에 지나치게 민감하기 때문에 일관성이 떨어져서 LCP를 측정하는 것을 권장
#### TTI (Time To Interactive)
- 웹 페이지가 완전히 상호작용이 가능(interactive)하게 되는 시점
#### TBT (Total Blocking Time)
- 스레드가 input 응답을 막을 정도로 오래 차단 되었을때 FCP와 TTI 사이의 총 시간
#### Speed Index
- 뷰 포트내의 콘텐츠가 눈에 띄게 채워지는 속도를 보여주는 페이지 로드 성능을 측정
<br>
---
### PageSpeed 테스트
#### - 모바일
|사이트| FCP (초) | TTI (초) | SI (초) | TBT (밀리초) |LCP (초)|CLS|성능 점수|
|-------|-------|------|---|---|---|---|------|
|현재 사이트|14.3|14.9|14.3|450|14.9|0.042|34|
|서울교통공사|7.2|8.5|7.8|120|7.5|0|51|
|네이버지도|2.1|6.5|5.9|240|7.9|0.03|60|
|카카오맵|1.7|4.2|6.4|80|6.4|0.005|69|

#### - 데스크탑
|사이트| FCP (초) | TTI (초) | SI (초) |TBT (밀리초)|LCP (초)|CLS|성능 점수|
|-------|-------|------|---|---|---|---|------|
|현재 사이트 |2.7|2.8|2.8|50|2.8|0.004|68|
|서울교통공사|1.6|2.1|2.3|120|3.6|0.014|68|
|네이버지도|0.5|0.7|2.1|10|1.5|0.006|90|
|카카오맵|0.5|0.6|2.2|0|1.3|0.039|92|

---
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 
   - 우선 순위 
     - TTI: 지하철 노선 기능을 빠르게 사용할 수 있도록
     - FCP: FCP가 느려지면 해당 속도 만큼 TTI 속도에도 영향을 줌
   - 경쟁사 대비 20% 이상 차이나지 않도록 설정 (가장 성능이 좋게 나온 카카오맵 기준으로 설정)
   - 희망 성능 예산
     - 압축된 리소스 최대 크기 200KB 미만
     - TTI: 5.04s 이하
     - FCP: 2.04s 이하
     

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 자바스크립트, CSS 리소스 압축 및 사용하지 않는 코드 제거
   - 정적 리소스 캐싱
   - 웹폰트가 로드되는 동안 사용자에게 텍스트가 표시되도록 글꼴 표시 CSS 기능을 사용
   - 이미지 크기 지정

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
