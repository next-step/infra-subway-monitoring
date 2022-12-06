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

#### 요구사항

- [x] 웹 성능 예산 작성 후 서버 목표 응답시간 도출
    - [x] 경쟁사 성능 분석
    - [x] 웹 성능예산 산출
    - [x] 서버 목표 응답시간 가설

#### 경쟁사 성능 분석

- 용어 정리
    - FCP(First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
    - TTI(Time to Interactive) : 사용자와 상호 작용할 수 있게 된 시간
    - SI(Speed Index) : 페이지 콘텐츠가 얼마나 빨리 표시되는지
    - TBT(Total Blocking Time) : FCP와 TTI사이 모든 시간의 합
    - LCP(Large Contentful Paint) : 가장 큰 텍스트, 이미지 표시 시간
    - CLS(Cumulative Layout Shift) : 요소들이 얼마나 이동하는지에 대한 정보
- 분석 대상
    - 러닝 맵(모바일, 데스크톱 동일) : https://velcronicity.kro.kr
    - 카카오맵
        - 모바일: https://m.map.kakao.com/actions/routeView
        - 데스크톱: https://map.kakao.com/
    - 네이버지도
        - 모바일: https://map.naver.com/v5/subway
        - 데스크톱: https://map.naver.com/v5/subway
    - 서울교통공사(모바일, 데스크톱 동일): http://www.seoulmetro.co.kr/kr/cyberStation.do
- 분석 결과

| mobile | 러닝 맵 | 카카오맵 | 네이버지도 | 서울교통공사 |
|--------|---|----|------|------|
| FCP    | 14.7s | 1.7s  | 2.1s | 6.4s |
| TTI    | 15.2s | 5.1s  | 2.4s | 9.2s |
| SI     | 14.7s | 4.8s  | 2.2s | 6.4s |
| TBT    | 440ms | 170ms | 20ms | 1,780ms |
| LCP    | 15.2s | 6.0s  | 3.0s | 6.6s |
| CLS    | 0.042  | 0  | 0 | 0 |

| 데스크 | 러닝 맵 | 카카오맵 | 네이버지도 | 서울교통공사 |
|--------|---|----|------|------|
| FCP    | 2.7s| 0.6s  | 0.5s | 1.5s |
| TTI    | 2.8s| 3.1s  | 4.1s | 2.0s |
| SI     | 2.8s| 2.8s  | 3.1s | 2.4s |
| TBT    | 30ms | 1,230ms | 1,180ms | 270ms |
| LCP    | 2.8s| 0.9s  | 4.4s | 3.7s |
| CLS    | 0.004|0.018  | 0.019 | 0.001 |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 경쟁사의 지표를 기준으로 중간값 정도면 적당할 것 같습니다.

|    | mobile | desktop |
|----|---------|-------  |
| FCP | 3.4s | 0.9s    |
| TTI | 5.6s | 3.1s    |
| SI  | 4.5s | 2.8s    |
| TBT | 656ms | 893ms     |
| LCP | 5.2s | 3.0s    |
| CLS | 0  | 0.013   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- 경쟁사들의 성능예산 기준 중간값 정도를 목표 응답시간으로 설정하겠습니다.
- 데스크탑 기준 다른 수치들은 엇비슷한 수준이지만 FCP 의 경우 특히 부족하므로 이 목표 응답시간을 개선하는 것이 사용자 측면에서 가장 긍정적일 것 같습니다.
- [FCP 개선 방법](https://web.dev/i18n/ko/fcp/)

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
