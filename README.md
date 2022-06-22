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

- 먼저, [PageSpeed Insights](https://pagespeed.web.dev/) 툴을 사용해 제가 배포한 서비스와 경쟁사 서비스 성능을 측정한 지표입니다.


**[나의 서비스 분석]**

| Device | FCP(First Contentful Paint) | TTI(Time to Interactive) | SI(Speed Index) | TBT(Total Blocking Time) | LCP(Largest Contentful Paint) | CLS(Cumulative Layout Shift) | Score |
|--------|-----------------------------|--------------------------|-----------------|--------------------------|-------------------------------|------------------------------|-------|
| Mobile | 14.6s                       | 15.1s                    | 14.6s           | 490ms                    | 15.1s                         | 0.042                        |       |
| PC     | 2.8s                        | 2.9s                     | 2.8s            | 70ms                     | 2.9s                          | 0.004                        |       |


**[경쟁사 서비스 분석]**

| Service | Device | FCP(First Contentful Paint) | TTI(Time to Interactive) | SI(Speed Index) | TBT(Total Blocking Time) | LCP(Largest Contentful Paint) | CLS(Cumulative Layout Shift) | Score |
|---------|--------|-----------------------------|--------------------------|-----------------|--------------------------|-------------------------------|------------------------------|-------|
| 서울교통공사  | Mobile | 7.1s                        | 10.5s                    | 7.9s            | 630ms                    | 15.0s                         | 0.281                        | 25    |
|         | PC     | 1.7s                        | 2.3s                     | 2.3s            | 50ms                     | 4.9s                          | 0.054                        | 65    |
| 네이버지도   | Mobile | 2.2s                        | 5.0s                     | 6.8s            | 150ms                    | 6.5s                          | 0.017                        | 64    |
|         | PC     | 0.8s                        | 4.5s                     | 3.4s            | 1060ms                   | 10.6s                         | 0                            | 33    |
| 카카오맵    | Mobile | 1.7s                        | 4.1s                     | 7.2s            | 40ms                     | 5.1s                          | 0.005                        | 72    |
|         | PC     | 0.6s                        | 2.7s                     | 2.2s            | 690ms                    | 0.7s                          | 0.018                        | 68    |


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 여러 지표 중, 서비스의 특성 고려 및 사용자의 서비스 이탈률을 낮추기 위해 **FCP와 TTI를 개선**하는 것으로 결정했습니다.
  - 서비스 특성 고려 관점: 현재 개선하고자 하는 서비스가 지하철 노선도라는 특성 상, 사용자가 'a to b 길찾기'라는 명확한 목적을 갖고 방문할 확률이 클 것이라고 생각했습니다. 이것은 사용자가 빠르게 interaction하는 것이 중요하다는 의미이기 때문에 TTI 지표를 개선하고자 합니다.
  - 서비스 이탈률 최소화 관점: 사용자는 3초의 법칙에 따라 해당 시간이 지나면 서비스를 이탈해버린다고 합니다. 따라서 FCP 지표를 개선하고자 합니다.
  - 또한, 아직 다른 경쟁사 서비스에 비해 기능적인 측면에서 부족한 부분이 많기때문에 성능적인 부분에서라도 부족한 점을 최소화하기 위해 개선하고자 하는 지표가 가장 빠른 서비스의 20% 이내로 개선하고자 합니다. 
    - 사용자는 응답시간이 20% 이상일 때 차이를 인식하기 때문에 이와 같이 설정했습니다.  


- 저의 서비스, 경쟁사 서비스 별 FCP, TTI 지표는 다음과 같습니다. 
  - [Mobile]
    - FCP: 나의 서비스(14.6s) < 서울교통공사(7.1s) < 네이버지도(2.2s) < 카카오맵(1.7s)
    - TTI: 나의 서비스(15.1s) < 서울교통공사(10.5s) < 네이버지도(5.0s) < 카카오맵(4.1s)
  - [PC]
    - FCP: 나의 서비스(2.8s) < 서울교통공사(1.7s) < 네이버지도(0.8s) < 카카오맵(0.6s)
    - TTI: 네이버지도(4.5s) < 나의 서비스(2.9s) < 카카오맵(2.7s) < 서울교통공사(2.3s)

- 따라서 저의 성능예산 & 개선 목표는 다음과 같습니다. 
  - [Mobile]
    - FCP: 14.6s → 2.04s 로 개선 (86.03% 개선 효과)
    - TTI: 15.1s → 4.92s 로 개선 (67.42% 개선 효과)
  - [PC]
    - FCP: 2.8s → 0.72s 로 개선 (74.29% 개선 효과)
    - TTI: 2.9s → 2.76s 로 개선 (4.83% 개선 효과)


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 리소스 압축(ex. gzip)
- 정적 리소스 캐시
- 사용하지 않는 스크립트 제거 및 지연로딩
- 렌더링 차단 리소스 제거

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
