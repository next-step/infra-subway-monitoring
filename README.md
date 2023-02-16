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
- Subway 웹은 경로 찾기 기능인 path 페이지를 가장 많이 사용한다고 생각했습니다.
- 각 경쟁사 별 PageSpeed Insights의 데스크톱 지표입니다.
| 사이트         | FCP  | TTI  | SI   | LCP  | TBT    | CLS  |
|--------------|------|------|------|------|--------|------|
| *My Subway*  | 2.9s | 3.1s | 3.0s | 2.9s | 180ms | 0.000 |
| 서울교통공사    | 1.5s | 2.2s | 2.7s | 2.5s | 490ms | 0.001 |
| 네이버맵       | 0.5s | 1.2s | 2.0s | 1.6s | 10ms  | 0.006 |
| 카카오맵       | 0.5s | 0.7s | 2.4s | 1.2s | 0ms   | 0.039 |

타 사이트의 평균:
| FCP  | TTI  | SI   | LCP  | TBT    | CLS  |
| 0.8s | 1.4s | 2.4s | 1.8s | 166ms  | 0.015 |

우리의 사이트는 db가 비어있고, 네이버맵과 카카오맵의 성능에 가중치를 두어 고려했을때
평균보다 20% 높은 성능예산이 적당하다고 생각합니다.

목표:
| FCP  | TTI  | SI   | LCP  | TBT    | CLS  |
| 0.6s | 1.1s | 1.9s | 1.5s | 133ms  | 0.012 |

추가로 PageSpeed Insights 진단을 토대로
- 텍스트 압축 사용 (2,125KiB -> 1,717KiB)
- 사용하지 않는 자바스크립트 줄이기(2,125KiB -> 600KiB)
- 렌더링 차단 리소스 제거하기
- 캐시 정책 사용
을 통해 성능을 개선 할 수 있습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

![webpagetest 결과](https://user-images.githubusercontent.com/57060164/219348956-e6a8484f-a49c-4a4a-8815-632ed0f8405a.png)
https://ggam-nyang.o-r.kr/path 에 대하여 webpagetest의 waterfall View입니다.
Seoul, Korea / Galaxy S8 환경에서 진행했습니다.
FCP는 5.725s이고 js파일 렌더링에 4900ms 정도 소요되었습니다.

js 파일이 캐싱된 2차 시기에는 FCP가 1.871s로 줄었습니다.
목표인 FCP 0.6s를 위해서는 
js 파일 렌더링 시간이 100ms 미만으로 줄여야 합니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
