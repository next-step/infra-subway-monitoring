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

- 웹 성능 지표

|     | 서울교통공사  | 네이버지도  | 카카오맵    | Running Map |
|-----|---------|--------|---------|-------------|
| FCP | 2.204s  | 0.951s | 1.093s  | 4.648s      |
| SI  | 2.942s  | 2.367s | 1.726s  | 4.620s      |
| LCP | 4.052s  | 2.780s | 2.503s  | 4.682s      |
| TBT | 1.073s  | 0.006s | 0.002s  | 0s          |
| TB  | 1,377kb | 772kb  | 1,169kb | 2,493kb     |

> FCP: First Contentful Paint, 첫번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.   
> SI: Speed Index, 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.   
> LCP: Largest Content Paint, 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.   
> TBT: Total Blocking Time, FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다.
> TB: Total Bytes, 

- Running Map 의 성능 예산은 개선이 필요해보입니다.
  - FCP 값이 4.648s로 3초가 넘어가고 있어 3초의 법칙을 충족하고 있지 않습니다.
    > 3초의 법칙: 3안에 로딩되지 않으면 53%의 사용자가 떠나고 로딩 시간이 길어질수록 사용자의 이탈률이 늘어남.
  - 최소 경쟁사 최저 SPEC 보다는 개선이 되어야하는데 경쟁사 최저 SPEC보다 부족한 부분이 있습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- 현재 자바스크립트 파일이 2,352kb 로 많은 용량이 차지하고 있어서 자바스크립트 파일을 압축하는 방법으로 개선을 진행합니다.
- CDN을 이용해 js, css, image 등 정적 리소스들을 더 빠르게 제공하도록 개선합니다.

|     | Running Map |
|-----|-------------|
| FCP | 2.000s      |
| SI  | 2.500s      |
| LCP | 3.000s      |
| TBT | 0s          |
| TB  | 1,000kb     |

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
