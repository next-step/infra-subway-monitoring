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

### 요소 개념 정리
- FCP(First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- TTI(Time to Interactive) : 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- SI(Speed Index) : 페이지 콘텐츠가 보여지는 평균시간 (view port 사이즈에 의존)
- TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현
- LCP(Large Contentful Paint) : 최대 텍스트 또는 이미지가 표시되는 시간
- CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정

### 성능비교 - PagesSpeed Mobile 기준
|   사이트   | FCP    | TTI    | SI     | TBT     | LCP    |  CLS  |
|----------|--------|--------|--------|---------|--------|-------|
|   러닝맵   | 14.9 초 | 15.5 초 | 14.9 초 | 600 밀리초 | 15.5 초 | 0.042 |
| 서울교통공사 | 6.4 초  | 8.4 초  | 11.1 초 | 670 밀리초 | 6.9 초  |   0   |
|  네이버지도 | 2.4 초  | 6.3 초  | 5.8 초  | 540 밀리초 | 8 초    |  0.03  |

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- (FCP)모바일에선 빠른 응답이 중요하기 때문에 서울 교통공사와 네이버의 평균치를 잡기 보단 네이버에 가까워질 수 있도록 한다.
- (TTI)사용자는 러닝맵 지하철 서비스에서 Viewing보단 실제 Action을 해야 하는 것들이 많고 아직 기능을 제공하는 js가 네이버보다 크지 않을 것이므로 네이버 보다 빠른 속도를 제공해야 한다.
- 
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- PagesSpeed의 제안에 따르면
  1) 텍스트 압축 - 9.3초
  2) 사용하지 않는 자바스크립트 줄이기 - 3.45초
  약 12.7초를 단축할 수 있다.

두 가지 단축으로 FCP, LCP가 줄어들게 되면 TTI/SI 또한 비례하여 증가할 것으로 예상되므로
제안 반영과 같이 감소할 것이라 가정하고, 마진을 적용하여 모든 지표가 3초 이하가 될 수 있도록 한다.

| 구분    | FCP    | TTI    | SI     | LCP    |
|-------|--------|--------|--------|--------|
| 러닝맵   | 14.9 초 | 15.5 초 | 14.9 초 | 15.5 초 |
| 제안 반영 | 2.2 초  | 2.8 초  | 2.2 초  | 2.8 초  |
| 목표치   | 2.2 초  | 3 초    | 3 초    | 3 초    |

추가로 렌더링 차단 리소스가 존재하는데, TTI를 중요 우선 순위로 선정하였으므로
PagesSpeed의 제안에 따라 반영하면 약 0.75초를 줄일 수 있다.
그래서 최종으로 TTI를 최소화 할 수 있도록 한다.

| 구분    | FCP    | TTI    | SI     | LCP    |
|-------|--------|--------|--------|--------|
| 러닝맵   | 14.9 초 | 15.5 초 | 14.9 초 | 15.5 초 |
| 제안 반영 | 2.2 초  | 2.05 초 | 2.2 초  | 2.8 초  |
| 목표치   | 2.2 초  | 2.1 초  | 3 초    | 3 초    |
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
