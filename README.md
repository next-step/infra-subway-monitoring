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

#### 용어 정리
- FCP: 첫번째 텍스트 혹은 이미지가 표시되는 시간
- TTI: 사용할 수 있을때까지 걸리는 시간으로 완전히 페이지와 상호작용하는 시점
- SI: 페이지의 컨텐츠가 얼마나 빨리 표시되는지 보여준다
- TBT: FCP와 상호작용 시간 사이의 모든 시간의 합
- LCP: 최대 텍스트 혹은 이미지가 표시되는 시간
- CLS: 표시 영역 안에 보이는 요소의 이동을 측정

#### 경쟁사 분석

| mobile | 서울교통공사 | 네이버지도 | 카카오맵 | Running Map |
|--------|----|-------|------|------|
| FCP    | 6.8s | 2.3s  | 1.7s | 16.4s |
| TTI    | 8.5s | 6.8s  | 4.9s | 17.2s |
| SI     | 9.6s | 5.3s  | 6.3s | 16.4s |
| TBT    | 360ms | 580ms | 220ms | 260ms |
| LCP    | 7.3s | 7.6s  | 6.9s | 16.4s |
| CLS    | 0  | 0.03  | 0.005 | 0.004 |

| desktop | 서울교통공사 | 네이버지도 | 카카오맵  | Running Map |
|---------|-------|-------|-------|------|
| FCP     | 1.5s  | 0.5s  | 0.5s  | 3.0s |
| TTI     | 2.2s  | 0.6s  | 0.7s  | 3.3s |
| SI      | 3.2s  | 2.3s  | 2.4s  | 3.0s |
| TBT     | 430ms | 0ms   | 0ms   | 40ms |
| LCP     | 2.6s  | 1.5s  | 1.4s  | 3.0s |
| CLS     | 0.001 | 0.006 | 0.039 | 0    |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 경쟁사 지표 중, 가장 빠른 성능들을 기준으로 잡았습니다.

   |     | mobile | desktop |
   |----|---------|-------  |
   | FCP | 1.7s | 0.5s    |
   | TTI | 4.9s | 0.6s    |
   | SI  | 5.3s | 2.3s    |
   | TBT | 220ms | 0ms     |
   | LCP | 6.9s | 1.4s    |
   | CLS | 0  | 0.001   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- RunninMap에서 경로 조회했을 때 api응답 속도와 경쟁사중 제일 빠른 카카오맵에서 api 응답속도를
비교헀을 떄 카카오처럼 경로 검색 시 120ms는 나와야 웹 성능 예산을 맞출 수 있을 것 같습니다.

120ms 

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
