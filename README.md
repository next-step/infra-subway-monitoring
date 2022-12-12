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

## PageSpeed Insights 측정 결과

| 데스크톱 기준                  | [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do) | [네이버맵](https://map.naver.com/v5/subway/1000/-/-/-?c=14155369.0055084,4501495.1385427,15,0,0,0,dh) | [카카오맵](https://map.kakao.com/) | [RunningMap](https://wu22e-subway.kro.kr/) |
|--------------------------|----------------------------------------------------------|---------------------------------------------------------------------------------------------------|--------------------------------|--------------------------------------------|
| 성능                       | 80                                                       | 91                                                                                                | 91                             | 67                                         |
| First Contentful Paint   | 1.5s                                                     | 0.5s                                                                                              | 0.5s                           | 2.7s                                       |
| Speed Index              | 2.9s                                                     | 2.2s                                                                                              | 2.4s                           | 2.7s                                       |
| Largest Contentful Paint | 1.7s                                                     | 1.5s                                                                                              | 1.4s                           | 2.8s                                       |
| Time to Interactive      | 2.0s                                                     | 1.1s                                                                                              | 0.7s                           | 2.8s                                       |
| Total Blocking Time      | 120s                                                     | 0ms                                                                                               | 0ms                            | 50ms                                       |
| Cumulative Layout Shift  | 0.001                                                    | 0.006                                                                                             | 0.029                          | 0.004                                      |
| 경로 검색 시간 (잠실 -> 강남)      | 339.71ms                                                 | 93ms                                                                                              | 198ms                          | 360ms                                      |



1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요


#### [PageSpeed 기준]
- 시간 관점 (main page)
  - FCP, LCP, TTI 에서 시간적으로 뒤쳐지는 부분이 보임. 
  - 3초 이내로 동작하고는 있지만 경쟁사 대비 평균적으로 약 1.5 초 정도 차이가 나고 있는 상황.
  - 최대한 텍스트 기반 리소스를 압축하여 네트워크 바이트를 최소화 하고 JS/CSS 지연 로딩이 필요한 부분을 적용한다.
  - 카카오 맵과 네이버 맵은 상당히 준수한 시간을 보여주고 있으므로 최소 목표는 서울교통공사와 동일한 수준의 시간을 목표로 잡는다.
    - FCP 1.7s, LCP 1.7s, TTI 2.0s
  - 최소 목표를 달성했다면 카카오, 네이버 맵 수준에서 20% 정도 차이 이내로 들어올 수있도록 최대 목표를 잡아본다.
    - FCP 0.6s (20% 이내), LCP 1.5s (동일한 수준), TTI 1.2s (20% 이내)


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- 웹 성능 지표 측정 결과를 바탕으로 문제가 되는 정적 리소스 제공 속도를 최소 2초 이내에 하는 것을 목표로 한다. (위의 상세 FCP, LCP, TTI 측정 시간을 맞추기 위함)

- 경로 검색 (잠실역 -> 강남역) API 요청 - 응답시간
  - 잠실역 -> 강남역 검색 기준 RunningMap 360ms 로 측정됨. (요청 마다 100ms +- 로 측정되지만 평균적으로 300ms 정도 나옴)
  - 최소목표로 서울교통공사 수준의 300ms 를 목표로 잡는다.
  - 최대목표로는 네이버 맵의 20% 이내인 120ms 정도를 목표로 잡는다.
  - 카카오의 20% 이내인 240ms 까지만 되도 좋을 것 같다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
