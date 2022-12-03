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


## 1단계 - 웹 성능 테스트

### 경쟁사 비교분석

> MyPage : https://sawooook-webservice.p-e.kr/  
> 서교공 : http://www.seoulmetro.co.kr/kr/cyberStation.do   
> 카카오맵 : https://m.map.kakao.com/  
> 네이버지도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000

#### MOBLIE
| mobile | 서교공 | 카카오맵  | 네이버지도 | MyPage |
|--------|--------|-------|-------|--------|
| FCP    | 6.6s   | 1.7s  | 2.2s  | 14.7s  |
| TTI    | 8.7s   | 4.7s  | 6.2s  | 15.3s  |
| SI     | 8.3s   | 7.3s  | 5.0s  | 14.7s  |
| TBT    | 1540ms | 100ms | 420ms | 580ms  |
| LCP    | 7.5s   | 5.6s  | 7.8s  | 15.3s  |
| CLS    | 0      | 0.005 | 0.03  | 0.042  |

#### DESKTOP
| desktop | 서교공   | 카카오맵  | 네이버지도 | MyPage |
|---------|-------|-------|-------|----------|
| FCP     | 1.4s  | 0.5s  | 0.5s  | 2.7s     |
| TTI     | 2.2s  | 0.7s  | 0.7s  | 2.8s     |
| SI      | 2.4s  | 2.7s  | 2.3s  | 2.7s     |
| TBT     | 690ms | 0ms   | 0ms   | 70ms     |
| LCP     | 2.7s  | 1.2s  | 1.4s  | 2.8s     |
| CLS     | 0     | 0.039 | 0.03  | 0.004    |


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
+ 경쟁사들 중을 가장 빠른 지표를 기준으로 목표를 설정하였습니다

  |     | mobile | desktop |
  |--------|---------|------- |
  | FCP | 1.7s   | 0.5s    |
  | TTI | 4.7s   | 0.7s    |
  | SI  | 5.0s   | 2.3s    |
  | TBT | 100ms  | 0ms     |
  | LCP | 5.6s   | 1.4s    |
  | CLS | 0      | 0.001   |

+ 지도찾기 앱 특성상 야외에서 길찾기를 하는데 많이 사용될 것이라고 판단하여 Mobile 성능개선에 초점을 맞추려고합니다.
+ TTI와 FCP의 경우 가장 빠른 경쟁사 대비 3~4배, 13~14배 가까이 느린상황인데 이를 개선하여 사용자가 느림(?)을 느끼지 않도록 하려고 합니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
+ 목표 개선점으로 잡은 FCP를 개선하기 위해 아래와 같은 작업을 해보려고 합니다.
  + 이미지 압축
  + 텍스트 압축
  + 이미지 크기 재조정
+ FCP를 어느정도 개선을 하면 TTI도 어느정도 빨라질것이라고 생각합니다 TTI를 좀더 빠르게 하기 위해 아래와 같은 작업을 해보려고합니다.
  + API 성능 개선

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
