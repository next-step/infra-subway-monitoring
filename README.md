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

* 측정사이트 : PageSpeed
#### 경쟁사 비교분석(MOBILE)

|     | RUNNINGMAP | 서울교통공사  | 네이버지도 | 카카오맵  |
|-----|------------|---------|-------|-------|
| FCP | 14.8s      | 6.4s    | 2.3s  | 1.7s  |
| TTI | 15.3s      | 8.8s    | 6.1s  | 4.6s  |
| SI  | 14.8s      | 15.5s   | 6.7s  | 6.4s  |
| TBT | 580ms      | 610ms   | 450ms | 120ms |
| LCP | 15.4s      | 11.6s   | 7.8s  | 5.5s  |
| CLS | 0.042      | 0       | 0.03  | 0.005 |

#### 경쟁사 비교분석(PC)

|     | RUNNINGMAP | 서울교통공사 | 네이버지도 | 카카오맵  |
|-----|------------|--------|-------|-------|
| FCP | 2.7s       | 1.6s   | 0.6s  | 0.5s  |
| TTI | 2.8s       | 2.0s   | 1.2s  | 0.7s  |
| SI  | 2.7s       | 5.7s   | 1.9s  | 2.3s  |
| TBT | 50ms       | 130ms  | 10ms  | 0ms   |
| LCP | 2.8s       | 2.1s   | 1.5s  | 1.2s  |
| CLS | 0.004      | 0.001  | 0.006 | 0.039 |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
* 서울교통공사, 카카오맵, 네이버지도에서 중 가장 빠른 속도를 지표로 결정

  |         | Mobile | Desktop |
  |---------|--------|---------|
  | FCP     | 1.7s   | 0.5s  |
  | SI      | 6.4s   | 1.9s  |
  | LCP     | 5.5s   | 1.2s  |
  | TTI     | 4.6s   | 0.7s  |
  | TBT     | 120ms  | 0ms   |
  | CLS     | 0      | 0.001 |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

* PageSpeed의 추천 가이드 우선 적용
  * 텍스트 압축 사용
  * 사용하지 않는 자바스크립트 줄이기
  * 렌더링 차단 리소스 제거하기
  * 콘텐츠가 포함된 최대 페인트 이미지 미리 로드
  * 사용하지 않는 CSS 줄이기 



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
