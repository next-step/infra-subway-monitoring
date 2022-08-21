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

|                     | Start Render | FCP    | LCP    | Total Bytes | DC Time | Requests |
|---------------------|--------------|--------|--------|-------------|---------|----------|
| infra-subway        | 4.7s         | 4.677s | 4.709s | 2493KB      | 5.227s  | 19       |
| 서울교통공사        | 2.3s         | 2.223s | 4.411s | 1373KB      | 4.377   | 87       |
| 네이버 지도(지하철) | 0.9s         | 0.732s | 2.814s | 779KB       | 1.196s  | 15       |
| 카카오맵            | 1.2s         | 1.130s | 2.406s | 1227KB      | 3.4s    | 40       |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
  - 렌더 시작시간 1초 이내
  - FCP 1초 이내
  - TTI 5초 미만
  - 압축된 리소스 최대 크기 200KB 미만
  - 전체 Byte 크기 1000KB 내외
  - LCP 2.5초 이내
    - 출처: https://web.dev/lcp/#what-is-a-good-lcp-score
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
  - 텍스트 기반의 데이터 압축
  - 사용하지 않는 자바스크립트 제거
  - JS, CSS로 block이 생기는 이슈 개선
  - 캐싱이 가능한 요소 캐싱
  - LCP 개선


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
