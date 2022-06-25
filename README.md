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
   1. 모바일 기준 각 성능 지표 ([pageSpeed](https://pagespeed.web.dev/?utm_source=psi&utm_medium=redirect) 에서 참고)

| 구분     | FCP   | TTI   | SP    | TBT   | LCP  | CLS   |
|--------|-------|-------|-------|-------|------|-------|
| 서울교통공사 | 6.4s  | 9.2s  | 9s    | 1.83s | 6.6s | 0     |
| 네이버 지도 | 2.2s  | 5.7s  | 4.9s  | 0.25s | 8.0s | 0.03  |
| 카카오맵   | 1.7s  | 4.3s  | 6.5s  | 0.05s | 6.5s | 0.005 |
| 내 사이트  | 14.5s | 15.1s | 14.5s | 0.48s | 15s  | 0.042 |

FCP(First Contentful Print), TTI(Time to Interactive), SP(Speed Index), LCP(Largest Contentful Paint)의 수치가 타 사이트에 비해서 너무 낮은 수치를 가지고 있습니다.
우선적으로 초기 로딩 개선에 노력을 해야할 것으로 보입니다.

* FCP는 로딩관련된 내용이므로 서울교통공사와 비슷한 시간인 6초 이내로 할 수 있도록 개선한다.
* 해당 페이지를 사용할 수 있도록 TTI도 같이 개선하는데, TTI도 서울교통공사와 비슷한 9초 이내로 할 수 있도록 개선한다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   1. 텍스트 압축이 사용되지 않고 있는데, 텍스트 압축을 통해 데이터 전송크기를 줄인다.
   2. 캐싱정책을 추가하여 리소스를 빠르게 로딩할 수 있도록 한다.
   3. 사용되지 않는 자바스크립트 로딩되지 않도록 처리한다.

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
