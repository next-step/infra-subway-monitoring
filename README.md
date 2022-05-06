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

> **Time Based Metric**
>
>[HTTP 아카이브](https://httparchive.org/reports/loading-speed) Top 1,000,000의 2022년 4월 모바일 환경 상위 10% 값을 기준으로
>* FCP 2.9초 이하
>* TTI 4.9초 이하
>* LCP 4초 이하 (HTTP 아카이브에는 없지만 [LightHouse](https://web.dev/lighthouse-largest-contentful-paint/?utm_source=lighthouse&utm_medium=lr)
   의 LCP Green Score에 맞춰서)
> 


> **Rule based Metric**
> 
> [LightHouse Score](https://pagespeed.web.dev/) 80점 이상

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- LCP, FCP를 낮추기 위해 리소스 압축 및 렌더링 차단 리소스 제거
- 리소스 캐싱, CDN 사용
- [TTI를 낮추기 위해 코드 분할](https://web.dev/apply-instant-loading-with-prpl/)

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
