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

#### [stevejkang.kro.kr](https://stevejkang.kro.kr/)
| 구분      | FCP   | TTI   | SI    | TBT    | LCP   | CLS   |
|---------|-------|-------|-------|--------|-------|-------|
| Mobile  | 14.6s | 15.3s | 14.6s | 0.590s | 15.2s | 0.047 |
| Desktop | 2.7s  | 2.8s  | 2.7s  | 0.050s | 2.8s  | 0.004 |

#### [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)
| 구분      | FCP  | TTI  | SI    | TBT    | LCP   | CLS   |
|---------|------|------|-------|--------|-------|-------|
| Mobile  | 6.9s | 8.9s | 10.9s | 0.620s | 11.1s | 0     |
| Desktop | 1.6s | 2.1s | 3.5s  | 0.220s | 3.6s  | 0.014 |

#### [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
| 구분      | FCP  | TTI  | SI   | TBT    | LCP  | CLS   |
|---------|------|------|------|--------|------|-------|
| Mobile  | 2.0s | 6.7s | 6.4s | 0.330s | 7.9s | 0.03  |
| Desktop | 0.5s | 0.7s | 2.2s | 0.010s | 1.6s | 0.006 |

#### [카카오맵](https://m.map.kakao.com/)
| 구분      | FCP  | TTI  | SI   | TBT    | LCP  | CLS   |
|---------|------|------|------|--------|------|-------|
| Mobile  | 1.7s | 4.5s | 5.7s | 0.090s | 6.1s | 0.139 |
| Desktop | 0.5s | 1.0s | 2.1s | 0.010s | 1.3s | 0.039 |

* FCP: Mobile - 2s 이내 / Desktop - 0.5s 이내
* TTI: Mobile - 4s 이내 / Desktop - 0.6s 이내
* SI: Mobile - 6s 아내 / Desktop - 2.2s 이내
* TBT: Mobile - 0.2s 이내 / Desktop - 0.01s 이내
* LCP: Mobile - 8s 이내 / Desktop - 1.5s 이내
* CLS: Mobile - 0.06 이내 / Desktop - 0.01 이내
> **우선순위**  
> 지하철 노선 조회/검색을 빠르게 사용할 수 있어야 하기 때문에 TTI 지표가 1순위  
> 3초 안에 로딩되어야 하기 때문에 FCP 지표가 2순위

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 리소스 줄이기
  - 압축 (gzip)
  - vendor.js, main.js 사이즈 줄이기
  - 사용하지 않는 자바스크립트 lazy load
  - 사용하지 않는 css lazy load
  - 200KB 이하의 파일크기
- 리소스 캐싱하기
  - `cache-control`을 이용한 client-side caching
  - CDN을 이용한 server-side caching
- 웹폰트가 로드되는 동안 텍스트 표시하기

#### 용어정리
- FCP(First Contentful Paint)
  - 콘텐츠가 포함된 첫 페인트
  - 첫 번째 텍스트 또는 이미지가 표시되는 시간
- SI(Speed Index)
  - 속도 색인
  - 페이지 콘텐츠가 얼마나 빨리 표시되는가
- LCP(Largest Contentful Paint)
  - 콘텐츠가 포함된 최대 페인트
  - 최대 텍스트 또는 이미지가 표시되는 시간
- TTI(Time to Interactive)
  - 사용할 수 있을 때까지 걸리는 시간
  - 완전히 페이지와 상호작용을 할 수 있게 될 때까지의 시간
- TBT(Total Blocking Time)
  - FCP와 상호작용 시간 사이의 모든 시간의 합
- CLS(Cumulative Layout Shift)
  - 누적 레이아웃 변경
  - 표시 영역 안에 보이는 요소의 이동을 측정

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
