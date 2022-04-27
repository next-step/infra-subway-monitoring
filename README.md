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

||네이버지도|카카오맵|running map|성능 예산|
|-|-|-|-|-|
|score|49|69|45|50|
|fcp|2.2|1.7|16.1|2.6|
|tti|7.3|4.6|16.2|8.7|
|lcp|8.1|6.4|16.2|9.7|
|speed index|6.2|5.5|16.1|7.4|
|total bytes|979|1,403|2,629|1,680|

> 모든 성능예산은 경쟁사 중 더 낮은 곳을 기준으로 + 20% 한 수치로 결정. 다만 score 예산은 이미 해당 수치를 충족하여, lighthouse medium 기준인 50점으로 결정

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 우선 이미지도 별로 없는데 total bytes 가 이상하게 큰 부분을 개선 : 분석결과를 보니 대부분 js 로 보여서, 아마도 js 파일 최적화 필요할듯.
- 시간 관련 응답치가 이상하리만치 높게 나오고 있는데(심지어 db가 비어있는데도), 분석 결과로는 대부분 css 요청 관련인듯 하여 css 파일 최적화 역시 필요할듯.
- 아마도 정적파일 요청 최적화만 되어도 위 성능 예산을 충분히 만족시킬 것으로 생각됨.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
