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
- 경쟁사 비교를 통한 웹 성능예산 측정
#### WebPageTest
|                               | 서울메트로  | 네이버 지도  | 카카오 지도  |
|-------------------------------|--------|---------|---------|
| First Byte                    | 2.588s | 1.331s  | 1.804s  |
| Start Render                  | 6.300s | 4.000s  | 3.100s  |
| FCP(First Contentful Paint)   | 6.229s | 4.245s  | 3.056s  |
| Speed Index                   | 9.567s | 7.249s  | 6.996s  |
| LCP(Largest Contentful Paint) | 6.229s | 11.085s | 9.152s  |
| TBT(Total Blocking Time)      | 7.633s | 0.494s  | 0.467s  |  
| Total Bytes                   | 1067kb | 942kb   | 1453kb  |

#### PageSpeed (데스크탑)
|                                | 서울메트로     | 네이버 지도   | 카카오 지도 |
|--------------------------------|-----------|----------|--------|
| TTFB(Time to First Byte)       | 1.5s      | 0.4s     | 0.7s   |
| FID(First Input Delay)         | 0.067s    | 0.015s   | 0.03s  |
| CLS(Cumulative Layout Shift)   | 0         | 0.03     | 0.05   |
| FCP(First Contentful Paint)    | 2.9s      | 0.9s     | 1.1s   |
| INP(Interaction to Next Paint) | 0.388s    | 0.337s   | 0.4s   |
| LCP(Largest Contentful Paint)  | 2.9s      | 2.7s     | 2.8s   |

- 같은 지표라도 WebPageTest와 PageSpeed 간의 결과 값 차이가 있음.

---

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
