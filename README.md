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
- 3초의 법칙의 설명과 같이 로딩이 지연될 수록 사용자 이탈률이 늘어남에 따라 3초의 시간을 기준으로 설정했습니다.
  - 페이지로드 : 모바일 3초 미만 / 데스크탑 2초 미만
  - TTI : 모바일 3초 미만 / 데스크탑 2초 미만
  - 압축된 리소스 최대 크기 200KB 미만

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 페이지 로딩 속도 개선
  - 텍스트 압축 사용
  - 사용하지 않는 자바스크립트 줄이기
  - 리소스에 대한 캐시 정책 사용

#### 웹 성능 측정 결과
* Running Map(실습 Application)

| 지표   | 수치(모바일) | 수치(데스크탑) |
|------|---------|----------|
| FCP  | 14.7s   | 2.7s     |
| TTI  | 15.2s   | 2.8s     |
| SI   | 14.7s   | 2.7s     |
| TBT  | 0.48s   | 0.07s    |
| LCP  | 15.2s   | 2.8s     |
| CLS  | 0.042s  | 0.004s   |

* seoulmetro(경쟁사1)

| 지표   | 수치(모바일) | 수치(데스크탑) |
|------|-------|----------|
| FCP  | 6.4s  | 1.5s     |
| TTI  | 8.4s  | 2.0s     |
| SI   | 7.7s  | 1.9s     |
| TBT  | 0.47s | 0.07s    |
| LCP  | 6.6s  | 3.7s     |
| CLS  | 0s    | 0s       |

* 네이버지도(경쟁사2)

| 지표   | 수치(모바일) | 수치(데스크탑) |
|------|---------|----------|
| FCP  | 2.2s    | 0.5s     |
| TTI  | 6.0s    | 0.5s     |
| SI   | 4.5s    | 1.8s     |
| TBT  | 0.31s   | 0s       |
| LCP  | 8.3s    | 1.7s     |
| CLS  | 0.03s   | 0.006s   |

* 카카오맵(경쟁사3)

| 지표   | 수치(모바일) | 수치(데스크탑) |
|------|---------|----------|
| FCP  | 1.7s    | 0.5s     |
| TTI  | 4.1s    | 0.6s     |
| SI   | 6.4s    | 2.0s     |
| TBT  | 0.03s   | 0s       |
| LCP  | 6.4s    | 1.1s     |
| CLS  | 0.005s  | 0.039s   |

* 용어
    * FCP(First Contentful Paint) : 콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
    * TTI(Time to Interactive) : 사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.
    * SI(Speed Index) : 속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.
    * TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다.
    * LCP(Largest Contentful Paint) : 콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
    * CLS(Cumulative Layout Shift) : 누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
