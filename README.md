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
- `경로검색 페이지` 기준 경쟁사(네이버지하철) 와의 성능차이 20% 이내
- 경로 검색 기능을 빠르게 사용할 수 있어야 하기 때문에 TTI 지표가 1순위
- 3초 안에 로딩되어야 하기 때문에 FCP 지표가 2순위
- [네이버지하철](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
  - FCP - 2.2s
  - LCP - 7.9s
  - TTI - 6.7s
  - TBT - 290ms
  - CLS - 0.03
- [자사 앱](https://subway.geunhwanlee.p-e.kr/path)
  - FCP - 16.3s
  - LCP - 16.3s
  - TTI - 17.1s
  - TBT - 260ms
  - CLS - 0.004
- 성능예산 목표
  - FCP - 2.64s 이내
  - TTI - 8.04s 이내

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 리소스 줄이기
  - 자바스크립트 압축
  - 자바스크립트 분할하여 사이즈 줄이기
  - 사용하지 않는 자바스크립트 지연 로딩
  - 사용하지 않는 css 지연로딩
- 리소스 캐싱하기
- 웹폰트가 로드되는 동안 텍스트 표시하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
