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

**용어 정리**

| 용어 | 영문명                   | 설명                                                                                                   |
| ---- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| FCP  | First Contentful Paint   | 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.                                               |
| TTI  | Time to Interactive      | 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.                                        |
| SI   | Speed Index              | 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.                                                     |
| TBT  | Total Blocking Time      | FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다. |
| LCP  | Largest Contentful Paint | 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.                                                  |
| CLS  | Cumulative Layout Shift  | 표시 영역 안에 보이는 요소의 이동을 측정합니다.                                                        | 

**Desktop**

| NAME         | FCP     | TTI     | SI      | TBT     | LCP     | CLS      |
| ------------ | ------- | ------- | ------- | ------- | ------- | -------- |
| RUNNINGMAP   | 2.8s    | 2.9s    | 2.8s    | 50ms 🔼 | 2.9s    | 0.004    |
| 서울교통공사 | 1.5s    | 2.1s 🔼 | 2.2s 🔼 | 280ms   | 2.6s    | 0.001 🔼 |
| 네이버지도   | 0.5s 🔼 | 2.9s    | 2.2s 🔼 | 320ms   | 4.2s    | 0.032    |
| 카카오맵     | 0.6s    | 2.9s    | 2.7s    | 1090ms  | 0.8s 🔼 | 0.018    |

**Mobile**

| NAME         | FCP     | TTI     | SI      | TBT      | LCP     | CLS    |
| ------------ | ------- | ------- | ------- | -------- | ------- | ------ |
| RUNNINGMAP   | 14.8s   | 15.3s   | 14.8s   | 490ms    | 15.3s   | 0.042  |
| 서울교통공사 | 6.9s    | 9.0s    | 8.6s    | 1120ms   | 7.7s    | 0   🔼 |
| 네이버지도   | 3.5s    | 3.7s 🔼 | 3.6s 🔼 | 40ms  🔼 | 5.1s 🔼 | 0   🔼 | 
| 카카오맵     | 1.7s 🔼 | 4.5s    | 7.0s    | 70ms     | 6.7s    | 0.005  |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
  - 현재 제공하는 서비스는 `지하철 환승 정보를 제공`하는 서비스이기 때문에 가장 흡사한  [서울 도로 교통 공사](http://www.seoulmetro.co.kr/kr/cyberStation.do) 에서 제공하는 서비스와 비교했습니다.
  - Desktop 목표 응답시간
    - FCP : 2.8s -> 1.5s
    - TTI : 2.9s -> 2.1s
    - SI : 2.8s -> 2.2s
    - LCP 2.9s -> 2.6s
  - Mobile 목표 응답시간
    - FCP : 14.9s -> 6.9s
    - TTI : 15.3s -> 9.0s
    - SI : 14.8s -> 8.6s
    - LCP : 15.3s -> 7.7s



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
