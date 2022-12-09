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
  + FCP를 빠르게하여 화면이 뜨고 있다고 유저에게 알려줘 이탈을 방지 하려고 합니다.
  + TTI를 개선함으로써 유저가 빠르게 앱을 사용할 수 있도록 하려합니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
+ 목표 개선점으로 잡은 FCP를 개선하기 위해 아래와 같은 작업을 해보려고 합니다.
  + 이미지 압축
  + 텍스트 압축
  + 이미지 크기 재조정
+ FCP를 어느정도 개선을 하면 TTI도 어느정도 빨라질것이라고 생각합니다 TTI를 좀더 빠르게 하기 위해 아래와 같은 작업을 해보려고합니다.
  + API 성능 개선

---

## 2단계 - 부하 테스트
####  대상 시스템 범위
+ 경로검색 페이지
+ 로그인 페이지
+ 경로 검색

#### 목표 RPS 구하기
1. 예상 1일 사용자수 (DAU)
+ 2022년 11월 지하철 총 승차 승객 수 204,268,648명
  + ( 204,268,648 / 2) / 30 = 3,404,477
    + ( 11월 지하철 총 승차 승객수 / 출근 + 퇴근 ) / 한달 = 3,404,477
> 예상 1일 사용자수 DAU : 60만명 (네이버맵과 카카오맵이 이미 시장을 장악하고 있으므로 1/6 이라고 가정)

2. 피크시간대 집중률 (최대 트래픽, 최소 트래픽)
+ 피크시간대 지하철 사용자 수 
  + 퇴근시간 (18시 ~ 19시)
    + 1,019,132명
+ 제일 적은 시간대 지하철 사용자 수 
  + 새벽시간 (05시 ~ 06시)
    + 86,929명
+ 평범한 시간대 지하철 사용 자 수
  + 오후시간 (11시 ~ 16시)
    + 482,047명

> 우리 사이트에 들어오는 트래픽 최대와 최소  
> 최대 트래픽 : (1,019,132 / 6) = 약 170,000명
> 최소 트래픽 : (86,929 / 6) = 약 15,000명
> 평균 트래픽 : (482,047 / 6) = 약 80,000명
> 
> (네이버맵과 카카오맵이 존재하므로 1/6 이라고 가정)

( https://insfiler.com/detail/rt_transit_time-0002?category=life 지하철 승객수 비교 이용 )

4. 1명당 1일 평균 접속 수
+ (출근 시간 + 퇴근 시간) = 2번

5. Throughput 계산

```
Throughput 게산 공식

(1일 총 접속 수) = 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 
(1일  평균 rps) = 1일 총 접속 수 / 86,400 (초/일)
(1일  최대 rps) = 1일 평균 rps x (최대 트래픽 / 평소 트래픽)
```

+ 160,000 = 80,000 * 2 (1일 총 접속자 수)
+ 14rps = 160,000 / 10,800 (1일 평균 rps)
+ 30rps = 14 * (170,000/80,000) = 약 30rps (1일 최대 rps)

6. VUser 구하기
+ R : 2.5
  + 시나리오가 두개 있을 수 있다고 판단
    + (메인 -> 로그인 -> 경로검색)
    + (메인 -> 경로검색)
+ http_req_duration : 0.3
> T : (2.5 * 0.3) + 1s = 1.75
> VUser = (30 * 1.75) / 3 = 약 17   (목표 RPS는 1일 최대 RPS로 가정)



2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
각 폴더 파일에 첨부하였습니다 😎

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
