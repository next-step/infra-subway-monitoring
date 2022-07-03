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
- RunningMap (https://aws.coffee-con.xyz/)
- PageSpeed 기준

|     | Mobile | Desktop | 
|-----|--------|---------| 
| FCP | 14.3 초  | 2.6 초    |
| LCP | 14.9 초  | 2.7 초    |
| TTI | 14.8 초  | 2.7 초    |
| TBT | 340 밀리초  | 50 밀리초    |
| SI | 14.3 초  | 2.6 초   |
| 성능 | 38점 | 68점 |

---

경쟁사

- 네이버 (https://m.map.naver.com/subway/subwayLine.naver?region=1000)

|     | Mobile  | Desktop | 
|-----|---------|---------| 
| FCP | 2.2초 | 0.5초 |
| LCP | 7.8초 | 1.7초 |
| TTI | 5.8 초 | 0.5초 |
| TBT | 210 밀리초 | 0 밀리초 |
| SI  | 5.0 초 | 1.6초 |
| 성능 | 63점 | 92점 |

- 카카오맵 (https://map.kakao.com/?REGION=01&target=subway)

|     | Mobile | Desktop | 
|-----|--------|---------| 
| FCP | 3.3초   | 0.6초 |
| LCP | 5.8초   | 1.9초 |
| TTI | 5.4 초  | 3.5초 |
| TBT | 50 밀리초 | 740 밀리초 |
| SI  | 5.0 초  | 2.2초 |
| 성능 | 63점 | 43점 |

---
웹 성능 예산

1. 타사에 비하여 모바일과 Desktop 성능에 많은 지표가 저하로 보임
    - 모바일 기준 네이버 FCP(2.2초), 카카오 LCP(5.8초), TTI(5.4초) 기준으로 최소 성능 향상을 목표
    - 더 나아가 FCP(1.8)초, LCP(2.5)초, TTI(5초)를 기준으로 우수한 사용자 경험을 제공할 수 있어야함.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스를 압축(gzip, deflate, brotli)
- 사용하지 않는 자바스크립트를 제거
- 효율적인 캐시 정책 설정하기
    - CDN, 브라우저 캐시

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

트래픽 예측
- a. 초기 프로젝트 오픈시 예상 최대 DAU 50만으로 예측 (100만의 절반 수치)
- b. 지하철 이용자별 이용량 최대 트래픽수 (약 32만) / 평소 트래픽 (약 10만) = 피크시간대 집중률 (3.2)
- c. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
    - Throughput : 1일 평균 rps ~ 1일 최대 rps
        - 1일 평균 rps [DAU 50만 / 86400] = 약 최대 6rps (카카오는 평균 1명당 3번 접속)
        - 1일 평균 6rps * (32만 / 10만 = 3.2) = 1일 최대 RPS 3.2 * 6 = 약 19 RPS

- VUser [R(요청수) * http_req_duration) + 1s = T
- 6 * 0.1 + 1 = 1.6
- 1일 평균 목표 (평균 61prs * 시간 1.6) / 5(요청수) = 1.92(약 2rps)
- 1일 최대 목표 (최대 19*rps * 시간 1.6) / 5(요청수) = 6.08(약 6rps)

- 약 일일 사용자 예측 (카카오 지하철 기준 100~150만)
- 초기 프로젝트 오픈시 예상 DAU 50만으로 예측 (100만의 절반 수치)
- 참고 페이지 [https://www.mobiinside.co.kr/2016/09/28/kakao-app/]
- 참고 페이지 [https://data.seoul.go.kr/dataList/OA-12252/S/1/datasetView.do]

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
   - 

2. Cloudwatch 대시보드 URL을 알려주세요
   - 
