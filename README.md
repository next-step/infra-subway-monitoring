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
    - 경쟁사들의 수치를 비교하여 중간값 정도로 정하면 적당할 것이라 생각합니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
    - 경쟁사들의 성능예산을 보고 해당 값들의 중간값 정도로 목표 응답시간을 정할 생각입니다.
    - 성능예산을 보면 TBT, LCP, CLS 의 수치는 비슷합니다.  
      경쟁사와 수치 차이가 큰 FCP, TTI, SI의 목표 응답시간을 개선하는게 사용자 경험 측면에서 긍정적이라 생각합니다.

#### 요구사항

- [x] 웹 성능 예산 작성 후 서버 목표 응답시간 도출

#### 용어 정의

- First Contentful Paint : 콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냄
- Time to Interactive : 사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될 때 까지 걸리는 시간
- Speed Index : 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여주는 시간
- Total Blocking Time : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간
- Largest Contentful Paint : 최대 텍스트 또는 이미지가 표시되는 시간
- Cumulative Layout Shift : 표시 영역 안에 보이는 요소의 이동을 측정한 시간

#### 경쟁사 비교분석

- 모바일(Mobile)

|         | Running Map | 서울교통공사 | 네이버지도  | 카카오맵   |
|---------|-------------|--------|--------|--------|
| FCP(s)  | 15.0s       | 7.9s   | 2.2s   | 1.7s   |
| TTI(s)  | 15.5s       | 9.8s   | 6.9s   | 4.7s   |
| SI(s)   | 15.0s       | 11.8s  | 7.0s   | 7.8s   |
| TBT(ms) | 470ms       | 400ms  | 520ms  | 120ms  |
| LCP(s)  | 15.5s       | 14.7s  | 9.9s   | 5.6s   |
| CLS(s)  | 0.042s      | 0s     | 0.017s | 0.005s |

- 데스크탑(Desktop)

|         | Running Map | 서울교통공사 | 네이버지도  | 카카오맵   |
|---------|-------------|--------|--------|--------|
| FCP(s)  | 2.7s        | 2.0s   | 0.6s   | 0.5s   |
| TTI(s)  | 2.8s        | 2.5s   | 1.2s   | 1.4s   |
| SI(s)   | 2.7s        | 3.3s   | 2.2s   | 2.4s   |
| TBT(ms) | 80ms        | 50ms   | 70ms   | 60ms   |
| LCP(s)  | 2.8s        | 5.0s   | 2.4s   | 1.2s   |
| CLS(s)  | 0.004s      | 0.232s | 0.004s | 0.004s |

#### 웹 성능예산

- 모바일(Mobile)

|       | FCP(s) | TTI(s) | SI(s) | TBT(ms) | LCP(s) | CLS(s) |
|-------|--------|--------|-------|---------|--------|--------|
| AS-IS | 15.0s  | 15.5s  | 15.0s | 470ms   | 15.5s  | 0.042s | 
| TO-BE | 4s     | 7s     | 6.5s  | 450ms   | 12s    | 0.035s | 

- 데스크탑(Desktop)

|       | FCP(s) | TTI(s) | SI(s) | TBT(ms) | LCP(s) | CLS(s) |
|-------|--------|--------|-------|---------|--------|--------|
| AS-IS | 2.7s   | 2.8s   | 2.7s  | 80ms    | 2.8s   | 0.004s | 
| TO-BE | 1.5s   | 1.5s   | 2s    | 70ms    | 2.0s   | 0.004s |

#### 참조

- [TTI 개선 방법](https://web.dev/i18n/ko/tti/)

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
