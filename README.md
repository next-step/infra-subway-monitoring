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
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- FCP : 첫 텍스트, 이미지 표시되는데 걸린 시간
- TTI : 사용자와 상호 작용할 수 있게 된 시간
- SI : 페이지 콘텐츠가 얼마나 빨리 표시되는지
- TBT : FCP와 TTI사이 모든 시간의 합
- LCP : 가장 큰 텍스트, 이미지 표시 시간
- CLS : 요소들이 얼마나 이동하는지에 대한 정보

https://toughchb.kro.kr/

|         | 성능점수 | FCP   | TTI   | SI    | TBT   | LCP   | CLS   |
|---------|------|-------|-------|-------|-------|-------|-------|
| 휴대전화|  33  | 14.6s | 15.5s | 14.6s | 490ms | 15.2s | 0.041 |
| 데스크탑    |68|2.6s|2.7s|2.6s| 50ms  |2.7s|0.004|

http://www.seoulmetro.co.kr/kr/cyberStation.do

|      | 성능점수 | FCP      | TTI | SI   | TBT   | LCP  | CLS   |
|---|------|----------|---|------|-------|------|-------|
|휴대전화| 45   | 7.1s     |8.8s| 8.9s | 280ms | 8.8s | 0     |
|데스크탑| 66   | 1.6s |2.1s| 2.6s | 160ms |3.6s| 0.014 |


https://m.map.naver.com/subway/subwayLine.naver?region=1000

|      | 성능점수 | FCP  | TTI  | SI   | TBT   | LCP  | CLS   |
|---|------|------|------|------|-------|------|-------|
|휴대전화| 61   | 2.1s | 6.5s | 5.8s | 200ms | 8.0s | 0.03  |
|데스크탑| 89   | 0.5s | 0.7s | 2.5s | 0ms | 1.6s | 0.006 |

https://m.map.kakao.com/

|      | 성능점수 | FCP  | TTI  | SI   | TBT  | LCP  | CLS   |
|---|------|------|------|------|------|------|-------|
|휴대전화| 68   | 1.7s | 4.1s | 7.0s | 60ms | 6.4s | 0.005 |
|데스크탑| 93   | 0.5s | 1.0s | 2.5s | 10ms | 1.0s | 0.003 |


지하철 노선도의 조회가 서비스의 주목적이므로 시간지표에 가장큰 영향을 주는 FCP, TTI 를 우선순위로 둠
경쟁사 대비 성능 20% 이상 차이나지 않도록 
* FCP **2.04s** 
* TTI **4.92s** 

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 총 네트워크 바이트를 최소화하려면 텍스트 기반 리소스를 압축 (/js/vendors.js, /js/main.js)
- 콘텐츠가 포함된 최대 페인트 이미지 미리 로드
  - HTTP 캐싱을 사용하여 정적 리소스를 캐시
  - CDN 서버 활용
- 렌더링 차단 리소스 제거하기
  - 중요한 JS/CSS를 인라인으로 전달
  - 중요하지 않은 모든 JS/Style을 지연
  
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
