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

### 용어정리

- FCP (First Contentful Paint) : 페이지가 로드되기 시작하고 컨텐츠의 일부가 화면에 렌더링 될 때 까지의 시간을 의미
- TTI (Time To Interactive) : 웹 페이지가 완전히 상호작용이 가능(interactive)하게 되는 시점

### 우선순위 측정

- FCP를 1순위, TTI를 2순위
- 첫 화면의 응답이 오래걸린다면 사용자는 이탈한다
- 사용자와의 인터렉션이 중요한 서비스이다

### 경쟁사 비교

- [weno-nextstep.p-e.kr](http://weno-nextstep.p-e.kr/)
    - 모바일 : 14.5, 15.1 (FCP, TTI)
    - 데스크톱 : 2.7, 2.8
- 서울교통공사
    - 모바일 : 7.2, 8.6
    - 데스크톱 : 1.6, 2.2
- 네이버지도
    - 모바일 : 2.1, 6.8
    - 데스크톱 : 0.5, .05
- 카카오맵
    - 모바일 : 1.7, 4.5
    - 데스크톱 : 0.5, 0.6

## 예산측정

- 경쟁사 중에 가장 빠르도록 예산을 편성한다. 다른 서비스의 비해 비지니스 로직이 덜 복잡하기 때문에 돈이 덜들기 때문에 경쟁력으로 가져갈 수 있다.
- FCP는 1.6이하, TTI는 4.5가 되도록 예산을 편성한다

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

### 텍스트 기반 리소스 압축

- /js/vendors.js(weno-nextstep.p-e.kr)
  2,125.0 KiB -> 1,716.5 KiB
- /js/main.js(weno-nextstep.p-e.kr)
  172.0 KiB -> 143.6 KiB
- 해결방법 : HTTP 요청 헤더에 Accept-Encoding: gzip, compress, br 를 추가한다

### 사용하지 않는 javascript 줄이기

- /js/vendors.js(weno-nextstep.p-e.kr)
  2,125.4 KiB -> 637.3 KiB
- /js/main.js(weno-nextstep.p-e.kr)
  172.3 KiB -> 61.8 KiB
- 해결방법 : Code Splitting, Unused Code Elimination, Unused Imported Code

### 정적 리소스 캐싱

- 브라우저 캐싱 (cache-control)
- CDN 서버 활용

### 미사용 폰트 제거

### 조회 성능 최적화

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요
2.
3. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
