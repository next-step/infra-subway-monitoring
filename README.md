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
- FCP(First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- TTI(Time to Interactive) : 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- SI(Speed Index) : 페이지 콘텐츠가 보여지는 평균시간 (view port 사이즈에 의존)
- TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현
- LCP(Large Contentful Paint) : 최대 텍스트 또는 이미지가 표시되는 시간
- CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
### 성능비교 - PagesSpeed Mobile 기준
| 사이트    | FCP  | TTI  | SI   | TBT    | LCP  | CLS   |
|--------|------|------|------|--------|------|-------|
| 러닝맵    | 15.3초 | 16.0초 | 15.3초 | 700밀리초 | 15.9초 | 0.042 |
| 서울교통공사 | 6.8초 | 9.2초 | 10.5초 | 1580밀리초 | 7.0초 | 0     |
| 네이버지도  | 2.4초 | 6.9초 | 5.8초 | 670밀리초 | 7.9초 | 0.03  |
| 카카오맵   | 1.7초 | 4.5초 | 7.2초 | 80밀리초  | 5.5초 | 0.005 |
- FCP : 모바일 서비스는 빠른 응답이 중요하므로, 되도록이면 네이버 지도와 비슷한 응답속도를 낼수 있어야 합니다.
- TTI : js, css등 페이지가 로딩하는데 영향을 미치는 요소는 많지만, 아직 기능이 많지 않으므로 네이버의 TTI를 목표로 진행해야 합니다.
- LCP : 위의 추가적인 요소들을 반영하고, CDN+와 같은 캐시정책을 사용하여 응답시간을 마찬가지로 네이버와 유사하게 하는걸 목표로 진행해야 합니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
   PageSpeed에서는 다음과 같은 사항들을 추천하고 있습니다.
   1) 텍스트 압축 - 9.45초
   2) 사용하지 않는 자바스크립트 줄이기 - 3.6초
   3) 렌더링 차단 리소스 제거하기 - 0.75초
4) 사용하지 않는 CSS 줄이기 - 0.15초

위와 같은 사항들을 반영하여 최종적으로 목표는 다음과 같다.
선정 기준은 다음과 같다.
1. 위 요소들의 합계 : 13.95초
2. 위의 항목에 마진을 적용하여 13초로 가정.
3. LCP는 네트워크 속도나 위치에 기반해서 줄어들거라 예상하지만, 일단 위의 항목 수정에 적용을 받는다고 가정 ( 이건 추후 검증이 필요하다 )

최종 결과물

| 런닝맵  | FCP   | TTI   | SI    | TBT    | LCP   | CLS   |
|------|-------|-------|-------|--------|-------|-------|
| 현재   | 15.3초 | 16.0초 | 15.3초 | 700밀리초 | 15.9초 | 0.042 |
| 예상치  | 1.35초 | 2.05초 | 1.35초 | 1580밀리초 | 1.95초 | 0.042 |
| 목표치  | 2.3초  | 3.0초  | 2.3초  | 670밀리초 | 2.9초  | 0.042 |

---

### 2단계 - 부하 테스트
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요

