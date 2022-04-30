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

주요 페이지 : 경로 검색 페이지 https://infra-subway.o-r.kr/path



1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 (데스크톱 기준)

| 지표                         | 경쟁사 (네이버 지도)<br />[데스크톱] | 내 서비스<br />[데스크톱] | 경쟁사 (네이버 지도)<br />[모바일] | 내 서비스<br />[모바일] |
| ---------------------------- | ------------------------------------ | ------------------------- | ---------------------------------- | ----------------------- |
| **First Contentful Paint**   | 0.5s                                 | **3.0s**                  | 2.1s                               | **16.6s**               |
| **Time to Interactive**      | 0.7s                                 | **3.0s**                  | 6.6s                               | **16.7s**               |
| **Speed Index**              | 2.4s                                 | 3.0s                      | 6.4s                               | **16.6s**               |
| Total Blocking Time          | 0                                    | 10ms                      | 300ms                              | 10ms                    |
| **Largest Contentful Paint** | 1.5s                                 | 3.0s                      | 7.9s                               | **16.6s**               |
| Cumulative Layout Shift      | 0.006                                | 0                         | 0.03                               | 0.004                   |

경쟁사와 비슷한 수준, 그리고 20% 이상 차이나는 지표에 대해서 개선이 반드시 필요합니다.



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

모바일 페이지의 경우 성능이 특히 안좋은 것을 볼 수 있습니다. 

- 컨텐츠 크기를 줄이기 위해서 gzip 압축 등 텍스트 압축하여 제공
  - 네트워크 바이트를 최소화할 수 있습니다.
- 사용하지 않는 js 를 제거합니다. 



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
