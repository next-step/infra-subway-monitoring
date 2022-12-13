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

#### 개념
- FCP(first Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- SI(Speed Index) : 화면에 얼마나 빨리 컨테츠가 그려지는지를 나타내는 지표
- LCP(Largest Contentful Paint) : 가장 사이즈가 큰 컨텐츠가 화면에 그려지는데 걸리는 시간.
- TBT(Total Blocking time) : 메인  쓰레드가 중단된 전체 시간을 의미 (50ms 이상이면 중단으로 판단)
- TB(Total Bytes) : 화면에서 사용되는 전체 컨텐츠의 사이즈


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

[Running Map] http://90mansik.kro.kr
데스크톱 기준

| 측정항목 | 서울교통공사 | 네이버지도 | 카카오맵  | Runing Map |
|------|--------|-------|-------|------------|
| FCP  | 1.6s   | 0.5s  | 0.5s  | 2.7s       |
| TTI  | 2.1s   | 1.2s  | 0.7s  | 2.8s       |
| SI   | 3.6s   | 2.3s  | 2.5s  | 2.7        |
| TBT  | 100ms  | 40ms  | 0ms   | 90ms       |
| LCP  | 3.7s   | 1.5s  | 1.2s  | 2.8s       |
| CLS  | 0      | 0.006 | 0.029 | 0.005      |

- 사용자는 비교 경쟁사와 20% 이상이 차이 날 경우 성능차이를 느끼기 때문에 이를 기준으로 개선 대상 항목을 정했습니다.
- 경쟁사 중 성능이 전체적으로 낮은 `서울교통공사`보다 높게, `네이버지도`와 `카카오맵`의 평군과 대비하여 20%로 목표를 설정합니다.
- 그 중 우선순위를 FCP(First Contentful Paint)에 높게 두어 해당 항목은 경쟁사의 최고 성능을 기준으로 한다.
  경험에 의거하여 판단한다면 사용자 입장에서 특정 서비스를 시작할 때 처음 서비스가 기동되며 정상적으로 작동하는지에 대한 이미지가 그 서비스에 대한 첫 인상이 되기 때문입니다.


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- 텍스트 압축 사용( 1.44s 절감 예상)
    - /js/vendors.js ( 2,125.0 KiB -> 1,716.5 KiB 절감 가능 )
    - /js/main.js ( 172.0 KiB -> 143.6 KiB 절감 가능)
    - gzip 압축 사용 시 시간 절감 예상
- 사용하지 않는 자바 스크립트 줄이기 ( 0.56s 절감 예상)
    - /js/vendors.js ( 2,125.4 KiB -> 637.2 KiB 절감 가능 )
    - /js/main.js ( 172.3 KiB  -> 61.8 KiB 절감 가능)
    - 사용하지 않는 자바 스크립트를 제거 함으로 시간 절감 예상
- 효율적인 캐싱 정을 사용하여 정적인 애셋 제공
    - /js/vendors.js, /js/main.js ,/images/main_logo.png ,/images/logo_small.png



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
