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

**가장 중요한 페이지**
- 경로 검색

**Mobile(Chrome, LTE)**
| 항목 | 현재 평균값 | 목표값 |
|--|--|--|
| FCP | 5.753s | < 3s |
| TTI | 6.229s | < 5s |

**Desktop(Chrome, Cable)**
| 항목 | 현재 평균값 | 목표값 |
|--|--|--|
| FCP | 4.918s | < 3s |
| TTI | 5.064s | < 5s |

> [webpagetest.org](https://www.webpagetest.org/) 테스트 결과를 참조하여 작성했습니다.<br>
> 현재 평균값은 Mean 값을 사용했습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기
- 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인하기
- 이미지 요소에 `width` 및 `height` 명시하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
