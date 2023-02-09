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

> 경쟁사 대비 20% 이상의 성능차이를 나지 않게 한다.

#### 메인 페이지 접속 시 지표

- 경쟁사 지표(데스크탑 기준)

| 측정 지표       | 네이버 지도 | 카카오 맵 |
|-------------|--------|-------|
| FCP         | 0.6초   | 0.5초  |
| TTI         | 0.6초   | 0.7초  |
| Speed Index | 2.2초   | 2.4초  |
| TBT         | 0초     | 0초    |
| LCP         | 1.4초   | 1.2초  |

- Running Map(데스크탑 기준)

| 측정 지표 | 현재 지표 | **_`목표`_**  |
|-------|-------|-----|
| FCP         | 2.7초  | 0.7초|
| TTI         | 2.8초  | 0.7초|
| Speed Index | 2.9초  | 2.5초|
| TBT         | 50ms  | 0ms|
| LCP         | 2.8초  | 1.4초|



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
> 텍스트를 압축하고 캐시를 사용하면, 응답 시간을 줄일 수 있을 것으로 예상
- 텍스트 압축을 사용하여 응답 시간을 줄인다.(gzip, deflate, brotli) -> -1.48s
- 사용하지 않는 자바스크립트를 줄인다.-> - 0.56s
    - /js/vendors.js, /js/main.js
- 캐시를 사용한다.
    - /js/vendors.js(choizz.o-r.kr)
    - /js/main.js(choizz.o-r.kr)
    - /images/main_logo.png(choizz.o-r.kr)
    - /images/logo_small.png(choizz.o-r.kr)


---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
