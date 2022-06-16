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

```지하철 경로검색이 주 서비스이기때문에 빠른 상호작용을 확보하는데 유리하도록 웹 성능 예산을 세운다.```
#### Core Web Vitals별 우선순위와 기준 값 
- FID(First Input Delay) : 100ms - 상호작용이 중요하기 때문에 1순위로 고려
- LCP(Largest Contentful Paint) : 2.5s 
- CLS(Cumulative Layout Shift) : 0.1 

#### 정량 기준
  - 이미지 최대크기 300KB 미만
  - 글꼴 개수 2개 미만
  - 번들링된 JS파일 크기 500KB 미만
  - CSS 크기 100KB 미만 

#### 시간 기준
  - TTI(Time To Interactive) : 3.0s  
  - TBT(Total Blocking Time) : 300ms
  - FCP(First Contentful paint) : 1.8s (이탈 방지)

#### 규칙 기준
  - light house 점수 70점 이상 (네이버 지도의 light house 결과 78점 + 20% 고려)
  - page speed 점수 60점 이상 (네이버 지도의 page speed 결과 78점 + 20% 고려)

---
  
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

#### 빠른 상호작용 시간 확보하기
  - 중요하지 않은 웹 리소스들은 TTI 기준 달성 이후 지연 로딩
  - 코드 스플리팅을 통해 필수적인 js 파일만을 우선적으로 로드
    - 요청 수가 증가할수 있지만 빠른 상호작용을 위해 용인함
  - SSR을 통해 CSR에 소비되는 js 실행시간 감소
    - client가 받는 payload가 커지고, server 자원도 더 사용하겠지만 빠른 상호 작용을 위해 용인함 
#### 네트워크 부담 줄이기
  - 이미지 압축, 메시지 gzip 압축을 통해 payload의 용량 감소
  - 이미지, 폰트 캐싱을 통한 요청 수 감소
  
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
