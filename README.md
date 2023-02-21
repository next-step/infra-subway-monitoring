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

Subway 웹은 path 페이지 지표입니다.
- 각 경쟁사 별 PageSpeed Insights의 데스크톱 지표입니다.
| 사이트         | FCP  | TTI  | SI   | LCP  | TBT    | CLS  |
Contributor

|--------------|------|------|------|------|--------|------|
| *My Subway*  | 16.5s | 16.5s | 16.5s | 16.6s | 120ms | 0.004 |
| 서울교통공사    | 6.4s | 8.6s | 8.1s | 6.6s | 880ms | 0 |
| 네이버맵       | 2.2s | 6.6s | 5.8s | 7.6s | 400ms  | 0.03 |
| 카카오맵       | 1.7s | 5.0s | 6.8s | 7.0s | 140ms   | 0.005 |

타 사이트의 평균:
| FCP  | TTI  | SI   | LCP  | TBT    | CLS  |
| 0.8s | 1.4s | 2.4s | 1.8s | 166ms  | 0.015 |

```
3초의법칙 : 구글 리서치 조사결과에 따르면 웹페이지가 3초이내로 로딩되지 않으면 사용자의 53%가 떠난다.
```

이러한 3초의 법칙을 근거로
1) TTI를 3초 이내로 하는 것을 목표
2) 가장 성능이 좋은 경쟁사와의 성능 차이를 20% 이내로 하는 것을 목표

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 1차적으로 가장 TTI가 낮은 경쟁사인 카카오맵과의 차이를 20% 이내(즉, 6초)로 하는 것을 목표로 하고,
  그 다음에, TTI를 3초 이내로 하는 것을 목표로 해봄

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
