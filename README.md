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

### 웹 성능 용어 및 분석

#### 용어
    - FCP (First Contentful Paint) : 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간
    - TTI (Time to Interactive) : 페이지가 완전히 상호 작용 가능하게 되는 데 걸리는 시간
    - SI (Speed Index) : 페이지 로드 중에 콘텐츠가 시각적으로 표시되는 속도
    - TBT (Total Blocking Time) : 페이지가 안정적인 상호 작용 환경이 되기 전, 상호 작용이 불가능한 시간
    - LCP (Largest Contentful Paint) : 초기 DOM 콘텐츠가 렌더링되는 데 걸리는 시간을 측정
    - CLS (Cumulative Layout Shift) :  사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도

#### 분석

- 휴대전화

| 사이트       | FCP (초) | TTI (초) | SI (초) | TBT (밀리초) | LCP (초) | CLS | 총점 |
|-------------|---------|---------|---------|-------------|----------|------|-----|
| Running Map | 15.1    | 15.7    | 15.1    | 560         | 15.6     | 0.042 | 31 |
| 서울교통공사  | 6.5     | 8.6     | 12.6    | 780         | 7.0      | 0    | 32  |
| 네이버지도    | 2.1     | 5.9     | 6.2     | 260         | 8.3      | 0.03 | 59  |
| 카카오맵     | 1.7     | 4.3     | 7.3     | 60          | 5.0      | 0.005 | 72  |

- 데스크탑

| 사이트       | FCP (초) | TTI (초) | SI (초) | TBT (밀리초) | LCP (초) | CLS | 총점 |
|-------------|---------|---------|---------|-------------|----------|------|-----|
| Running Map | 2.7     | 2.8     | 2.7     | 80          | 2.8      | 0.004 | 67 |
| 서울교통공사  | 1.5     | 2.0     | 3.4     | 100         | 3.7      | 0     | 66 |
| 네이버지도    | 0.5     | 1.1     | 2.3     | 0           | 1.7      | 0.006 | 88 |
| 카카오맵     | 0.5     | 0.7     | 2.4     | 0           | 1.3      | 0.04  | 91  |

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 서비스의 규모가 상대적으로 작기 때문에 경쟁사 1등 카카오맵과 20% 이내의 성능 차이를 목표로 설정

| 디바이스 | FCP (초) | TTI (초) | LCP (초) |
|---------|---------|---------|----------|
| 휴대전화 | 2.0     | 5.0     | 6.0       |
| 데스크탑 | 0.6     | 0.8     | 1.5       |


3. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 제공
    - 사용하지 않는 자바스크립트 줄이기
    - 사용하지 않는 CSS 줄이기
    - 렌더링을 블록하는 리소스를 제거
    - 브라우저 캐시 사용


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
  - 메인, 로그인, 즐겨찾기
- 예상 수치 설정
   - 1일 사용자 수(DAU): 5,000,000
      - 카카오맵 MAU의 70% 수준, 카카오맵 MAU: 7,290,000
        (참고: [길찾기만 하루 1억건](https://blog.naver.com/rkwkrhspm/222515422896))
   - 피크 시간대의 집중률(최대 트래픽 / 평소 트래픽): 4.0
      - 피크 시간대: 오전 8 ~ 9시, 오후 6 ~ 7시
      - 최대 트래픽(지역별 평균): 1,000,000
      - 평소 트래픽(지역별 평균): 250,000 
        (참고: [데이터로보는 서울시 대중교통 이용](https://www.bigdata-map.kr/datastory/traffic/seoul))
   - 1명당 1일 평균 접속 혹은 요청수
      - 1일 평균 접속: 즐겨찾기 확인(출/퇴근), 경로 검색 총 3회
      - 1회 접속시 요청: 메인 페이지, 로그인 페이지, 로그인, 즐겨찾기 조회 총 4회
- 목푯값 설정
  - throughput
     - 1일 총 접속 수 = 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 =  194,000 x 3 = 15,000,000
     - 1일 평균 rps = 1일 총 접속 수 / 86,400 (초/일) = 15,000,000 / 86,400 = 174
     - 1일 최대 rps = 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 174 x 4.0 = 696
  - latency
     - 100ms
  - VUser
    - R(요청수) = 4
    - http_req_duration = latency x R = 0.1 x 4 = 0.4s
    - T = (R x http_req_duration) + a = (4 x 0.2) + 0 = 0.8s
    - VUser = (목표 rps x T) / R = (174 x 0.8) / 4 = 35
  - 부하 유지기간
     - smoke test : 1 m
     - stress test : 20 m
     - load test : 46 m

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
