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
- 카카오맵
  - FCP 0.5s
  - TTI 0.7s
  - SI 2.3s
  - TBT 0ms
  - LCP 1.2s
  - CLS 0.006


- 네이버 지도
  - FCP 0.5s
  - TTI 0.7s
  - Si 2.1s
  - TBT 0ms
  - LCP 1.1s
  - CLS 0.006


- RUNNINGMAP
  - FCP 2.7s
  - TTI 2.8s
  - SI 2.7s
  - TBT 10ms
  - LCP 2.8s
  - CLS 0.004


- 목표
  - FCP 0.5s
  - TTI 0.7s
  - SI 2.1s
  - TBT 10ms
  - LCP 1.1s
  - CLS 0.004

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

경로 검색 페이지 성능을 개선하는 것이 제일 효과가 좋을 것 같음.

   1. /path 현재 50ms -> 40ms
   2. /stations 현재 300ms -> 150ms
   3. /paths 현재 580ms -> 200ms



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 목표 rps 구하기
  - DAU: 1,000,000
  - 피크 시간대 집중률: 10
  - 1명당 1일 평균 접속수: 2
  - 1일 평균 rps: 1,000,000 * 2 / 86,400 = 23.148
  - 1일 최대 rps: 231.48
  - Throughput: 23.148 ~ 231.48

- api 응답 시간
  - /stations -> 60ms
  - /paths -> 105ms
  - 1단계에서 측정했던 것보다 훨씬 적게 나와서 기준을 새로 잡아봐야할 것 같습니다. (스토리지가 부족해서 늘려줬는데 이부분 때문인지 모르겠습니다..)  

- VUser
  - (231.48 * (1 + 0.165)) / 1 = 269.9

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- Smoke testing
![](2023-02-12_19-36-32.png)

- Load testing
![](2023-02-12_19-44-35.png)

- Stress testing
![](2023-02-12_21-51-43.png)



질문있습니다!

1. /stations, /paths 응답 시간을 볼 때 해당 페이지 전체 렌더링 시간을 기준으로 해야할까요? 아니면 딱 api만 응답 받는데 걸린 시간을 기준으로 하면 되나요?
2. BASE_URL을 내부망으로 하는건 localhost로 하는 경우를 말하는건가요? https://로 하면 외부로 나가긴 하는데 서버 자체가 가까운 네트워크에 있어서 내부망으로 치는건지 궁금합니다!
2. smoke.js에서 1초 sleep을 했는데 VUser 구할때 1초를 더하면 안되는게 맞을까요? 
3. 이용자들이 한 번 사용할 때 /stations, /paths 한 번씩만 호출한다고 생각해서 R을 구할 때 1 * (0.06 + 0.105)로 구했는데 이렇게 하는게 맞나요? 




---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
