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


#### 성능 예산 시간 기반 비표 ( Time Based Metric)
> - FCP (First Contentful Paint)  - 텍스트 또는 이미지와 같이 DOM 의 첫 번째 비트를 표시하는 시점
> - TTI (Time To Interactive ) - 페이지가 사용자 입력에 안정적으로 응답하는데 걸리는 시간을 측정
> - Speed Index - 웹 페이지를 불러올 때 콘텐츠가 시각적으로 표시되는 데 까지 걸리는 시간
> - LCP (Largest Contentful Paint) - 가장 큰 이미지 또는 비디오가 렌더링을 시작할 떄까지 걸리는 시간
> - TBT (Total Blocking Time)  - FCP 와 TTI 사이 모든 시간의 합
> - CLS ( Cumulative Layout Shift ) - 콘텐츠가 동적으로 크기 조정을 할 때 엔드유저가 어떻게 예기치 않은 갑작스러운 변화를 경험하는지 측정

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 성능 예산을 산정하기 위한 타 서비스들과의 경로 검색 페이지 비교

  | MOBILE      | 넥스트스탭 | 네이버   | 카카오   | 서울교통공사 |
  |-------|-------|-------|--------|--------|
  | FCP         | 14.6s | 2.0s  | 1.7s  | 6.9s   |
  | TTI         | 15.2s | 6.5s  | 4.4s  | 9.0s   |
  | Speed Index | 14.6s | 5.9s  | 7.6s  | 11.8   |
  | LCP         | 15.2s | 7.9s  | 5.0s  | 6.9s   |
  | TBT         | 600ms | 290ms | 100ms | 980ms  |
  | CLS         | 0.042 | 0.03  | 0.005 | 0      |

  | DESKTOP     | 넥스트스탭 | 네이버   | 카카오   | 서울교통공사 |
  |-------|-------|-------|--------|--------|
  | FCP         | 2.7s  | 0.5s  | 0.5s  | 1.6s   |
  | TTI         | 2.8s  | 0.6s  | 0.6s  | 2.0s   |
  | Speed Index | 2.7s  | 2.3s  | 2.6s  | 3.9s   |
  | LCP         | 2.8s  | 1.5s  | 1.1s  | 3.5s   |
  | TBT         | 05ms  | 0     | 0     | 170ms  |
  | CLS         | 0.004 | 0.006 | 0.003 | 0.013  |

#### 웹 성능 예산
  - 페이지로드 3초미만
  - TTL 5초 미만
  - 압축된 리소스 최대 크기 200KB 미만
  - 자바스크립트 크기 1MB 미만
  - 성능 감사 80점 이상
  - 2MB 미만 이미지 사용

타 경쟁서비스들과 비교하여 20%이내로 줄이는 것으로 목표로 하는 것이 맞지만
현재는 학습하는 단계이고 배워가는 가정으로 목표치를 정해 학습해보겠습니다!

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* vendors.js 파일이 2.1MB 크기로 전송 진행 중 압축 또는 다른 형태로 파일 크기 줄이기
* 정적 파일 캐싱을 통해서 반복적인 호출 방지
* 이미지 표기 시 명시적인 너비 및 높이를 설정하여 불필요한 리소스 제거
* 전반적인 JS, CSS 사용하지 않을 경우 지연 로딩

등이 있을 것으로 보여집니다

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
