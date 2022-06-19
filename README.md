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

#### 내 사이트(https://chj1768.p-e.kr/) 데스크톱

| 지표  | 수치    | 설명  |
|-----|-------|-----|
| FCP | 2.7s  | 콘텐츠가 포함된 첫 번째 텍스트 또는 이미지가 표시되는 시간   |
| TTI | 2.8s  | 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간   |
| SI  | 2.7s  | 페이지 콘텐츠가 얼마나 빨리 표시되는지    |
| TBT | 50ms  | 마우스 클릭, 화면 탭 또는 키보드 누름과 같은 사용자 입력으로부터 페이지가 응답하지 못하도록 차단된 총 시간을 측정    |
| LCP | 2.8s  | 최대 텍스트 또는 이미지가 표시되는 시간    |
| CLS | 0.004 | 표시 영역 안에 보이는 요소의 이동을 측정    |

#### 경쟁사 1(네이버 지도 - https://map.naver.com/) 데스크톱
| 지표  | 수치 | 설명  |
|-----|---|-----|
| FCP | 0.8s |     |
| TTI | 4.1s |     |
| SI  | 3.1s |     |
| TBT | 830ms |     |
| LCP | 10.5s |     |
| CLS | 0 |     |

#### 경쟁사 2(카카오맵 - https://map.kakao.com/) 데스크톱
| 지표  | 수치    | 설명  |
|-----|-------|-----|
| FCP | 0.6s  |     |
| TTI | 2.5s  |     |
| SI  | 2.3s  |     |
| TBT | 320ms |     |
| LCP | 0.6s  |     |
| CLS | 0.018 |     |


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 지하철 정보 컨텐츠를 제공하는 서비스다 보니, 컨텐츠를 빠르게 노출하고(FCP) 바로 사용할 수 있도록(TTI) 하는 지표가 경쟁사 보다 강화되어야 사용률을 높일 수 있을 것으로 보입니다.
     - FCP 1s 이내
     - TTI 2s 이내

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 제공. 네트워크 전송비용을 절감하여 전체적인 TTI, FCP를 개선할 수 있다.  
  - /js/vendors.js : 2,125.0 KiB (예상 절감 효과 - 1,716.5 KiB)
  - /js/main.js(chj1768.p-e.kr) : 172.0 KiB (예상 절감 효과 - 143.6 KiB)
- 메인 페이지에서 사용하지 않는 스크립트나 리소스 Lazy loading 처리 

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
