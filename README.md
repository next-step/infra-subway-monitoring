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

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

[1] 타겟 설정
- 테스트대상 : 경로탐색페이지
  - 지하철 노선도 길찾기 서비스의 특성상 경로탐색 페이지를 가장 많이 이용할 것으로 판단

- 예상 1일 사용자 수(DAU) : 700만 예상
  - 경로탐색 API 요청량이 가장 많을 것으로 예상되는 출근시간대 기준 이용자 수 : 300만 예상 
  - [출처:일평균 전체 이용객 700만이상, 출퇴근시간대 이용객 약 300만](http://www.redaily.co.kr/news/articleView.html?idxno=3569) 
   

[2] Throughput : 162 ~ 278
```plain text
Throughput : 1일 평균 rps ~ 1일 최대 rps
    1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
    1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
    1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
```
- 피크시간대 집중률 :  
  - 출퇴근시간대를 300만으로 잡고, 나머지 400만을 24시간으로
  - 최대트래픽 : 출퇴근시간이용객수/1일출퇴근시간(6시간)을 초로환산 = 300만/(6*60*60) =  약 139 
  - 평소트래픽 : DAU/24시간을 초로 환산 = 700만/(24*60*60) = 약 81
  - 1명당 1일 평균 접속 수 : 2 예상
- **1일 총 접속 수** = 700만 * 2 = 1400만
- **1일 평균 rps** = 1400만 / 86,400 = 약 162
- **1일 최대 rps** = 162 * (139/81) = 278


[3] 목표치 설정
- 요청 수 : 2번 (탑메뉴 경로탐색 > 검색버튼)
- Latency : 0.1s 
- T : 요청수 * http_req_duration + 0  = 2 * 0.1 = 0.2  
- 목표 VUSER  
  - 평균 : (1일 평균 rps * T) / 요청수 = ( 162 * 0.2 ) / 2 = 16.2
  - 최대 : (1일 최대 rps * T ) / 요청수 = ( 278 * 0.2 ) / 2 = 27.8


3. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
3-1. Smoke 테스트 (k6/smoke/smoke.log)
  - [x] 최소한의 부하로 구성된 테스트 : VUser를 1로 구성하여 테스트 
  - [x] 테스트 시나리오에 오류가 없는지 확인 : 메인 -> 경로탐색(2번의요청) 정상접속됨 
  - [x] 최소 부하 상태에서 시스템에 오류가 발생하지 않는지 확인 : 오류발생하지 않음 

3-2. Load 테스트 (k6/load/load.log)
  - [x] 서비스의 평소 트래픽과 최대 트래픽 상황에서 성능이 어떤지 확인 : 
    - 총 30분진행
    - min 1 ~ max값 **1일평균rps**(162) 로 설정
  - [x] 이 때 기능이 정상 동작하는지도 확인 : 실패율 5.52%

3-3. Stress 테스트 (k6/stress/stress.log)
  - [x] 서비스가 극한의 상황에서 어떻게 동작하는지 확인 : 
    - 총 32분간진행
    - **예상 1일 최대 rps**(278)보다 많은 부하를 주도록 테스트
  - [x] 장기간 부하 발생에 대한 한계치를 확인하고 기능이 정상 동작하는지 확인 : 서비스 중단, 실패율  77.34%
  - [x] 최대 사용자 또는 최대 처리량을 확인
  - [x] 스트레스 테스트 이후 시스템이 수동 개입없이 복구되는지 확인 : 수동개입없이 복구되지 않음 
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
