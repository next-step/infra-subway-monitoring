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
#### A. 예비 분석
+ First Contentful Paint(최초 콘텐츠풀 페인트, FCP) : 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간을 측정
+ Time to Interactive(상호 작용까지의 시간, TTI): 페이지가 로드되기 시작한 시점부터 시각적으로 렌더링되고, 있는 경우 초기 스크립트가 로드되고, 사용자 입력에 신속하게 안정적으로 응답할 수 있는 시점까지의 시간을 측정
+ Speed Index(속도 지수, SI) : 페이지 로드 중에 페이지 콘텐츠가 시각적으로 얼마나 빨리 표시되는지 시간을 측정
+ Total blocking time(총 차단 시간, TBT): 메인 스레드가 입력 응답을 막을 만큼 오래 차단되었을 때 FCP와 TTI 사이 총 시간을 측정
+ Largest contentful paint(최대 콘텐츠풀 페인트, LCP): 페이지가 로드되기 시작한 시점부터 가장 큰 텍스트 블록 또는 이미지 요소가 화면에 렌더링될 때까지의 시간을 측정
+ Cumulative layout shift(누적 레이아웃 이동, CLS): 페이지 로드가 시작될 때와 해당 수명 주기 상태가 숨김으로 변경될 때 사이에 발생하는 모든 예기치 않은 레이아웃 이동의 누적 점수를 측정

1. [메인 페이지](https://mins99-subway.kro.kr/)

|  | FCP  | TTI  |  SI  |  TBT  | LCP  |  CLS  | 성능 |
|:---:|:----:|:----:|:----:|:-----:|:----:|:-----:|:---:|
|Desktop| 2.6s | 2.7s | 2.7s | 50ms | 2.7s | 0.004 |  68 |
|Mobile| 14.5s | 15.1s | 14.5s | 560ms | 15.1s | 0.042 |  32 |

2. [경로 탐색 페이지](https://mins99-subway.kro.kr/path)

|  |  FCP  |  TTI  |  SI   |  TBT  |  LCP  |  CLS  | 성능 |
|:---:|:----:|:----:|:----:|:-----:|:----:|:-----:|:---:|
|Desktop| 3.0s  | 3.1s  | 3.0s  | 10ms  | 3.0s  | 0.000 |  65 |
|Mobile| 16.4s | 17.1s | 16.4s | 180ms | 16.4s | 0.004 |  43 |

#### B. 경쟁사 분석
1. [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)

|  | FCP  | TTI  |  SI  |  TBT  | LCP  |  CLS  | 성능 |
|:---:|:----:|:----:|:----:|:-----:|:----:|:-----:|:---:|
|Desktop| 1.6s | 2.1s | 2.4s | 180ms | 3.6s | 0.014 |  65 |
|Mobile| 7.1s | 8.7s | 8.3s | 290ms | 7.7s | 0.000 |  45 |

2. [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)

|  | FCP  | TTI  |  SI  |  TBT  | LCP  |  CLS  | 성능 |
|:---:|:----:|:----:|:----:|:-----:|:----:|:-----:|:---:|
|Desktop| 0.5s | 1.3s | 2.1s | 20ms  | 1.6s | 0.006 | 90 |
|Mobile| 2.2s | 7.4s | 6.0s | 420ms | 7.7s | 0.030 | 53 |

3. [카카오맵](https://m.map.kakao.com/)

|  | FCP  | TTI  |  SI  |  TBT  | LCP  |  CLS  | 성능 |
|:---:|:----:|:----:|:----:|:-----:|:----:|:-----:|:---:|
|Desktop| 0.5s | 1.0s | 2.4s | 10ms  | 1.3s | 0.029 | 91 |
|Mobile| 1.7s | 4.4s | 6.0s | 90ms | 4.9s | 0.005 | 74 |

-> 성능 비교 결과 서울교통공사와는 유사하고, 네이버지도와 카카오맵과는 20% 이상의 성능 점수 차이를 보임

--- 

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
+ pagespeed 데이터 기준 경쟁사(카카오맵 모바일) 대비 최소 80% 이상
  + FCP 2.04s 미만
  + TTI 5s 미만(80% + 보정치)
  + SI 7.2s 미만
  + TBT 108ms 미만
  + LCP 5.88s 미만
  + CLS 0.000ms
  + 성능 점수 67이상

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
+ /js/main.js, /js/vendors.js 등 텍스트 압축 사용 - FCP 개선
+ 사용하지 않는 javascript, css 줄이기 - LCP, FCP 개선
+ javascript 파싱, 컴파일, 실행에 소요되는 시간 단축 - TBT 개선

---

### 2단계 - 부하 테스트 
### 요구사항
- [ ] 부하 테스트
  - [ ] 테스트 전제조건 정리
    - [ ] 대상 시스템 범위 
    - [ ] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [ ] 부하 테스트 시 저장될 데이터 건수 및 크기 
  - [ ] 각 시나리오에 맞춰 스크립트 작성 
    - [ ] 접속 빈도가 높은 페이지 
    - [ ] 데이터를 갱신하는 페이지 
    - [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지 
  - [ ] Smoke, Load, Stress 테스트 후 결과를 기록

---

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
