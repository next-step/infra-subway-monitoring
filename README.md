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

| 측정항목 | my subway | 서울교통공사 | 네이버지도 | 카카오맵  |
|------|-----------|--------|-------|-------|
| FCP  | 2.7       | 1.8    | 0.6   | 0.5   |
| SI   | 2.7       | 7.7    | 2.7   | 2.3   |
| LCP  | 2.8       | 4.3    | 2.5   | 1.4   |
| TTI  | 2.8       | 2.1    | 1.6   | 0.7   |
| TBT  | 50        | 60     | 80    | 0     |
| CLS  | 0.004     | 0.229  | 0.004 | 0.039 |

FCP, TTI 지표가 타 경쟁사 서비스에 비해 높습니다. 지하철 노선 서비스인 만큼 이동중에 사용하는 사용자가 많을것이라 예상되어
두가지 지표를 낮게 만드는것을 목표로 잡았습니다.
타 서비스와 20%의 속도차이가 날 경우 사용자들이 체감할 수 있으니 가장 좋은 지표를 가진 경쟁사와 20% 이내로 차이가 나도록 조절해야할것 같습니다.

| 측정항목 | 목표 |
|--------|-----|
| FCP | 0.6 |
| SI | 2.7 |
| LCP | 1.6 |
| TTI | 0.8 |
| TBT | 50 |
| CLS | 0.004 |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 역 관리 api의 응답시간이 400ms정도 지연되는 걸로 확인됩니다. 이 부분을 개선해야할것 같습니다. 다른 요청들은 100ms 이하로 문제없다고 생각됩니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
