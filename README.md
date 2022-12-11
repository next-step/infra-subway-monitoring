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
- 측정 사이트: https://pagespeed.web.dev
- 미션 측정 페이지: https://www.aws-nextstep-deokmoo.kro.kr/path
- 측정 항목
    - First Contentful Paint
    - Speed Index
    - Largest Contentful Paint
    - Time to Interactive
    - Total Blocking Time
    - Cumulative Layout Shift
#### 휴대전화 (단위: 초(seconds), CLS는 제외)
| 서비스          | FCP   | SI    | LCP   | TTI   | TBT    | CLS    |
|---------------|-------|--------|-------|------|--------|---------|
|서울교통공사     | 7.1 | 8.3      | 7.3   |  8.38| 0.320  | 0      |
|네이버지도       | 2.2  | 5.7    |   7.1 | 5.8   | 0.180  | 0.03   | 
|카카오맵         | 1.7  | 6.3    |  6.7   | 4.5  | 0.040  | 0.005 |
|RunningMap(미션)| 16.3  | 16.3  | 16.3   | 16.3  | 20     | 0.004|

#### PC(데스크톱) (단위: 초(seconds), CLS는 제외)
| 서비스          | FCP   | SI    | LCP   | TTI   | TBT    | CLS    |
|---------------|-------|--------|-------|------|--------|---------|
|서울교통공사     | 1.5 | 2.2      | 3.6   |  2.0 | 0.020  | 0      |
|네이버지도       | 0.5  | 2.1     | 1.4   | 0.5  | 0      | 0.006  |
|카카오맵         | 0.5  | 2.2     | 1.2   | 0.7  | 0      | 0.039  |
|RunningMap(미션)| 3     | 3       | 3    | 3     | 0      | 0     |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 목적
    - 사용자에게 1위와 같은 성능 혹은 더 나은 체감의 서비스를 제공
        - 성능: 1위의 성능보다 10%정도 높은 성능
        - FCP: 최소 1.7, 목표치 1.1 미만
        - TTI: 최소 4.5  목표치 4.1 미만
- 전략
    - 텍스트 압축 사용
      - js/vendors.js
      - /js/main.js
    - 사용하지 않는 JS 정리
      - js/vendors.js
      - /js/main.js

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
