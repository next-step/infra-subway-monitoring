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

- https://pagespeed.web.dev/ 이용하여 성능 측정

- 경쟁사 성능 비교 

Desktop
|             | FCP  | TTI  | SI   | TBT   | LCP  | CLS   | Performance |
|-------------|------|------|------|-------|------|-------|-------------|
| 서울교통공사      | 1.4s | 1.9s | 2.1  | 190ms | 3.7s | 0     | 66          |
| 네이버맵        | 0.5s | 0.5s | 2.4s | 0ms   | 1.6s | 0.006 | 89          |
| 카카오맵        | 0.5s | 0.7s | 2.6s | 0ms   | 1.1s | 0.003 | 99          |
| running map | 2.6s | 2.7s | 2.6s | 50ms  | 2.7s | 0.004 | 68          |

Mobile
|             | FCP   | TTI   | SI    | TBT   | LCP   | CLS   | Performance |
|-------------|-------|-------|-------|-------|-------|-------|-------------|
| 서울교통공사      | 6.4s  | 8.4s  | 7.8s  | 460ms | 6.6s  | 0     | 42          |
| 네이버맵        | 2.2s  | 5.9s  | 5.8s  | 250ms | 7.7s  | 0.03  | 60          |
| 카카오맵        | 1.7s  | 4.1s  | 6.5s  | 40ms  | 5.0s  | 0.005 | 73          |
| running map | 14.9s | 15.4s | 14.9s | 450ms | 15.4s | 0.042 | 35          |

- 목표 
    - 맵의 경우 사용자에게 컨텐츠가 빠르게 노출되고 렌더링하는 것이 중요하다고 판단되므로 FCP 최우선 개선 필요
    - 경쟁사 중 성능이 제일 좋게 나온 카카오맵을 기준은 20% 미만으로 기준을 잡음

- Desktop : 
    
|      | FCP  | TTI  | SI   | LCP  | 
|------|------|------|------|------|
| 현재  | 2.6s | 2.7s | 2.6s | 2.7s |
| 목표  | 0.6s | 0.84s | 2.6s | 1.32s |

- Mobile : 
    
|      | FCP  | TTI  | SI   | LCP  |
|------|------|------|------|------|
| 현재  | 14.9s | 15.4s | 14.9s | 15.4s |
| 목표  | 2.04s | 4.92s | 7.8s | 6.0s |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 리소스 압축
- 정적 리소스 캐시
- 사용하지 않는 스크립트 제거
- 렌더링 차단 리소스 제거

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
