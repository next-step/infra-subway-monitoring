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

내 사이트 (https://woo.subway-limwoobin.p-e.kr/)

- FCP : 14.9s
- LCP : 15.5s
- TTI : 15.5s
- TBT : 570ms
- CLS : 0.042

|     | Mobile | Desktop | 
|-----|--------|---------| 
| FCP | 14.9s  | 2.7s    |
| LCP | 15.5s  | 2.8s    |
| TTI | 15.5s  | 2.9s    |
| TBT | 570ms  | 70ms    |
| CLS | 0.042  | 0.004   |

<br />

Lighthouse

|     | Mobile | Desktop |
|-----|--------|---------|
| 점수| 31     | 67      |

<hr>

경쟁사 성능

카카오맵 (https://map.kakao.com/?REGION=01&target=subway)

|     | Mobile | Desktop | 
|-----|--------|---------| 
| FCP | 3.3s   | 0.6s    |
| LCP | 5.7s   | 0.7s    |
| TTI | 6.3s   | 1.6s    |
| TBT | 210ms  | 20ms    |
| CLS | 0.149  | 0.009   |

<br />

Lighthouse

|     | Mobile | Desktop |
|-----|--------|---------|
| 점수| 60     | 98      |

<hr>

네이버지도 (https://m.map.naver.com/subway/subwayLine.naver?region=1000)

|     | Mobile | Desktop | 
|-----|--------|---------| 
| FCP | 2.2s   | 0.5s    |
| LCP | 7.9s   | 1.6s    |
| TTI | 7.2s   | 0.7s    |
| TBT | 420ms  | 10ms    |
| CLS | 0.03   | 0.006   |

<br />

Lighthouse

|     | Mobile | Desktop |
|-----|--------|---------|
| 점수| 54     | 88      |

### 성능 목표

### Mobile
- __우선순위1__ : TTI: 5s 미만
- __우선순위2__ : FCP: 3s 미만
- 목표 Lighthouse 점수: 50점 이상 

### Desktop
- __우선순위1__ : TTI: 1s 미만
- __우선순위2__ : FCP: 1s 미만
- 목표 Lighthouse 점수: 75점 이상

목표 점수는 경쟁사 점수의 평균의 20% 이내로 산정  
이는 최종목표가 아닌 단계별 목표이기 때문에 최종목표는 80점 이상 

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 기반 리소스 압축하기(gzip, deflate, brotli)
- 사용하지 않는 js 줄이기
  - /js/vendors.js(2,125.4 KiB)
  - /js/main.js(172.3 KiB)
- 압축된 리소스 최대 크기 200KB 미만으로 유지하기
- 컨텐츠에 대해 CDN 서버 적용하기

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
