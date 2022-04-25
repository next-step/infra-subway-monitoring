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

#### 성능 예산 시간 기반 비표 ( Time Based Metric)
> - FCP (First Contentful Paint)  - 텍스트 또는 이미지와 같이 DOM 의 첫 번째 비트를 표시하는 시점
> - TTI (Time To Interactive ) - 페이지가 사용자 입력에 안정적으로 응답하는데 걸리는 시간을 측정
> - Speed Index - 웹 페이지를 불러올 때 콘텐츠가 시각적으로 표시되는 데 까지 걸리는 시간
> - LCP (Largest Contentful Paint) - 가장 큰 이미지 또는 비디오가 렌더링을 시작할 떄까지 걸리는 시간
> - TBT (Total Blocking Time)  - FCP 와 TTI 사이 모든 시간의 합
> - CLS ( Cumulative Layout Shift ) - 콘텐츠가 동적으로 크기 조정을 할 때 엔드유저가 어떻게 예기치 않은 갑작스러운 변화를 경험하는지 측정


### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요


#### 경쟁사 비교
| MOBILE      | 넥스트스탭 | 네이버   | 카카오  | 서울교통공사 |
|-------------|-------|-------|------|--------|
| FCP         | 14.7s | 2.3s  | 1.7s | 6.4s   |
| TTI         | 6.5s  | 7.5s  | 4.4s | 8.5s   |
| Speed Index | 5.7s  | 6.0s  | 5.2s | 10.8   |
| LCP         | 7.9s  | 8.1s  | 4.9s | 6.7s   |


| DESKTOP     | 넥스트스탭 | 네이버  | 카카오   | 서울교통공사 |
|-------------|-------|------|-------|--------|
| FCP         | 2.7s  | 0.5s | 0.5s  | 1.6s   |
| TTI         | 2.8s  | 0.5s | 1.0s  | 2.0s   |
| Speed Index | 2.7s  | 2.3s | 1.9s  | 2.3s   |
| LCP         | 2.8s  | 1.5s | 1.3s  | 3.5s   |


#### 웹 성능 에산
| 목표          | MOBILE | DESKTOP |
|-------------|--------|---------|
| FCP         | 2.3s   | 0.8s    |
| TTI         | 4.5s   | 1.2s    |
| Speed Index | 5.0s   | 2.3s    |
| LCP         | 5.0s   | 1.0s    |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

#### 파악
DESKTOP, MOBILE 환경에서 다운로드하는 파일 종류들은 똑같은 걸로 확인했습니다.
그런데 DESKTOP, MOBILE 환경에서 FCP 차이는 네트워크 환경에 의해 차이 나는 걸로 보입니다.
제일 큰 문제로 확인되는 vendors.js 파일은 전송되는 용량이 2.2MB 가 넘어가고 있습니다.

#### 개선사항
콘텐츠 압축 (gzip) 을 통해 전송되는 데이터양을 줄이고,
정적인 콘텐츠들은 캐싱해서 제공해주고 추가로 CDN 을 사용해서 FCP 를 개선할 수 있을 것 같습니다. 

폰튼 관련 css 는 지연 로딩이 돼도 서비스에 문제없다고 판단해서 지연로드 하게되면 TTI 를 조금은 줄일 수 있을거 같고 

/images/main_logo.png 이미지 원본 사이즈는 250x250 이고 
렌더링 할 때는 150x150x 입니다. 가능하다면 이미지도 150x150 으로 맞춰서 이미지 용량을 줄인다면
LCP 도 조금은 줄일 수 있을 거 같습니다.


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
