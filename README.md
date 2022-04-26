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

경쟁사 : 네이버지도

모바일 환경 기준

| 비교                       | 경쟁사   | 내 서비스  | 목표치 |
|--------------------------|-------|--------|-----|
| First Contentful Paint   | 2.0 초 | 16.1 초 | 2초  |
| Time to Interactive      | 6.3 초 | 16.9 초 | 6초  |
| Speed Index              | 6.0 초 | 16.6 초 | 6초  |
| Largest Contentful Paint | 7.7 초 | 16.6 초 | 7초  |
| PageSpeed score          | 62 점  | 27 점   | 60점 |

데스크탑 환경 기준

| 비교                       | 경쟁사   | 내 서비스 | 목표치  |
|--------------------------|-------|-------|------|
| First Contentful Paint   | 0.6 초 | 3.0 초 | 0.5초 |
| Time to Interactive      | 0.8 초 | 2.9 초 | 0.5초 |
| Speed Index              | 2.4 초 | 3.1 초 | 2초   |
| Largest Contentful Paint | 1.6 초 | 2.9 초 | 1.6초 |
| PageSpeed score          | 92 점  | 67 점  | 90점  |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 모바일 성능이 너무 낮습니다. 사용하지 않는 자바스크립트를 제거하고, 자바스크립트 압축을 해야합니다.
- 텍스트 기반 리소스를 gzip 으로 압축해야 합니다. 
- 특히 webpagetest에서 compress transfer 등급이 좋지않은데 이를 gzip 으로 압축하여 전송이 필요합니다.



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
