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

#### 경쟁사 성능 진단 (모바일)
|             | 서울교통공사 |  네이버지도   | 카카오맵  | 내 서브웨이 |
|-------------|----------|-------------|---------|----------|
| FCP         | 7.1s     | 2.2s        | 1.7s    | 14.8s  |
| Speed Index | 10.9s    | 6.0s        | 7.4s    | 14.8s  |
| LCP         | 8.8s     | 8.0s        | 6.4s    | 15.4s  |
| TTI         | 8.8s     | 6.6s        | 4.5s    | 15.5s  |
| TBT         | 190ms    | 380ms       | 110ms   | 600ms  |
| CLS         | 0        | 0.03        | 0.005   | 0.042  |

#### 웹 성능예산(목표)
|             | 내 서브웨이 |
|-------------|----------|
| FCP         | 3.67s    |
| Speed Index | 8.1s     |
| LCP         | 8.8s     | 
| TTI         | 7.73s    | 
| TBT         | 226ms    | 
| CLS         | 0.012    | 



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
FCP, Speed Index, LCP 등 콘텐츠를 제공해줄 때 성능이 안 좋음 

- 텍스트 압축 사용하기
    - 리소스를 압축(gzip 등)하여 제공
- 정적인 콘텐츠들 캐싱하고 캐싱 수명 길게하기
- 이미지 요소 명시하기


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
