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
- 우리 RUNNINGMAP에서 사용자에게 제공할 수 있는 가장 큰 가치는 빠르게 경로검색 결과를 제공하는 것이라고 생각했습니다.
- 그렇기에 경로검색 페이지를 띄우는 URL인 (https://didrlgus-subway.p-e.kr/path) 를 웹 성능예산 테스트 대상으로 지정하였습니다.
    - 웹 성능예산 테스트 기준 URL
        - RUNNINGMAP (https://didrlgus-subway.p-e.kr/path)
        - 서울교통공사 (http://www.seoulmetro.co.kr/kr/cyberStation.do)
        - 네이버지도 (https://m.map.naver.com/subway/subwayLine.naver?region=1000)
        - 카카오맵 (https://m.map.kakao.com/actions/routeView)
- 경쟁사 웹 성능 비교
    - 웹 성능 비교는 [pagespeed](https://pagespeed.web.dev/) 를 기준으로 수행하였습니다.
    - 해당 서비스는 모바일 환경에서 많이 사용될것으로 예상되어 휴대전화를 기준으로 측정했습니다.

| 측정 지표        | RUNNINGMAP | 서울 교통 공사 | 네이버 지도 | 카카오 맵 |
|--------------|------------|----------|--------|-------|
| FCP          | 16.1s      | 6.8s     | 2.3s   | 1.7s  |
| Speed Index  | 16.1s      | 8.7s     | 6.3s   | 4.3s  |
| LCP          | 16.1s      | 7.7s     | 7.9s   | 5.9s  |
| TTI          | 16.8s      | 9.2s     | 6.8s   | 4.4s  |
| TBT          | 0.12s      | 1.4s     | 0.65s  | 0.05s |
| CLS          | 0.004      | 0        | 0.03   | 0     |

- 목표치 설정
  ```
  1. 사용자는 응답시간이 20% 이상일때 차이를 인식해요.
  2. 3초안에 로딩되지 않으면 53%의 사용자가 떠난다.
  ```
    - 위 지표를 기준으로 목표치를 설정하였습니다.
    - 사용자가 웹브라우저에서 인터렉션 할 수 있는 지점인 TTI (Time To Interacive) 지표로 목표치를 설정하였습니다.
    - 다른 서비스의 TTI 지표는 전부 3초를 넘어지만 1,2번 기준에 근거하여 `TTI 3초`를 목표치로 설정하였습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 경로검색 결과를 제공하는 API를 기준으로 목표 응답시간을 설정하였습니다.
    - ex) https://didrlgus-subway.p-e.kr/paths/?source=2&target=3
- chrome의 perfomance 탭을 이용해 해당 API의 응답시간을 측정하였습니다.
- source와 target 파라미터를 바꾸면서 총 10번의 API 호출을 하였습니다.
    - https://didrlgus-subway.p-e.kr/paths/?source=1&target=3 (363.63ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=278&target=161 (233.79ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=3&target=1 (232.03ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=161&target=278 (230.84ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=50&target=100 (222.26ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=359&target=81 (223.86ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=100&target=50 (202.51ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=81&target=359 (305.08ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=1&target=438 (277.11ms)
    - https://didrlgus-subway.p-e.kr/paths/?source=438&target=1 (275.70ms)
- 위 10번의 API 호출 결과 응답시간을 평균으로 계산하였습니다.
    - 256.681ms
- 평균치에서 20% 성능향상 수치인 `205.344ms`를 경로탐색 결과 제공 API의 목표 응답시간으로 설정하였습니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요