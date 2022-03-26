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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

#### webpagetest
##### 네이버 지도 - https://m.map.naver.com/subway/subwayLine.naver?region=1000

|              | desktop | mobile  |
|--------------|---------|---------|
| First Byte   | .190S   | .202S   |
| Start Render | .700S   | .700S   |
| FCP          | .649S   | .688S   |
| Speed Index  | 2.380S  | 2.363S  |
| LCP          | 2.870S  | 3.225S  |
| CLS          | .041    | .009    |
| TBT          | ≥ .013S | ≥ .010S |
| Total Bytes  | 774KB   | 963KB   |

##### RUNNING MAP - https://mirrors89.p-e.kr/

|              | desktop | mobile  |
|--------------|---------|---------|
| First Byte   | .160S   | .152S   |
| Start Render | 4.800S  | 4.800S  |
| FCP          | 4.883S  | 4.813S  |
| Speed Index  | 4.804S  | 4.804S  |
| LCP          | 4.923S  | 4.833S  |
| CLS          | .004    | .048    |
| TBT          | ≥ .011S | ≥ .000S |
| Total Bytes  | 2,493KB | 2,484KB |


#### pagespeed
##### 네이버 지도 - https://m.map.naver.com/subway/subwayLine.naver?region=1000
|                          | desktop | mobile  |
|--------------------------|---------|---------|
| First Contentful Paint   | 0.5 초   | 2.2 초   |
| Time to Interactive      | 0.5 초   | 7.2 초   |
| Speed Index              | 2.3 초   | 6.3 초   |
| Total Blocking Time      | 0 밀리초   | 410 밀리초 |
| Largest Contentful Paint | 1.6 초   | 7.8 초   |
| Cumulative Layout Shift  | 0.006   | 0.03    |
| Lighthouse 성능 점수         | 89 점    | 53 점    |


##### RUNNING MAP - https://mirrors89.p-e.kr/
|                          | desktop | mobile  |
|--------------------------|---------|---------|
| First Contentful Paint   | 2.7 초   | 14.6 초  |
| Time to Interactive      | 2.8 초   | 15.2 초  |
| Speed Index              | 2.8 초   | 14.6 초  |
| Total Blocking Time      | 50 밀리초  | 570 밀리초 |
| Largest Contentful Paint | 2.8 초   | 15.2 초  |
| Cumulative Layout Shift  | 0.004   | 0.042   |
| Lighthouse 성능 점수         | 67 점    | 31 점    |


**웹 성능예산 측정**
- FCP(First Contentful Paint) 
  - 데스크탑 기준 1초 이내로 줄이기 
  - 모바일 기준 3초 이내로 줄이기
- TTI(Time to Interactive) 
  - 데스크탑 기준 1초 이내로 줄이기
  - 모바일 기준 7초 이내로 줄이기
- Lighthouse 성능 점수 
  - 데스크탑 기준 80점 이상 올리기
  - 모바일 기준 50점 이상 올리기
- Total Bytes 1,500KB 이내로 줄이기

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축 사용 (gzip)
- 사용하지 않는 자바스크립트 줄이기 (코드 스플릿팅)
- 정적 파일 캐시 적용
- 웹폰트 로드 중에 텍스트가 계속 표시되도록 하기
- HTTP2 적용

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
