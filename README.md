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

   |검사|네이버지도|subway-service| 목표  |
   |----|---|-----|---|
   |First Contentful Paint|2.3s|14.8s| 3s  |
   |Time to Interactive|7.4s|15.4s| 8s  |
   |Speed Index|5.5s|15.4s|6s|
   |Largest Contentful Paint|8.1s|15.4s|9s|  

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축 사용  
- 사용하지 않는 자바스크립트 줄이기


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 1일 사용자 수 (DAU)
  - 300,000
- 대상 시스템 범위
  - 접속 빈도 높은 기능: 메인 페이지
  - 갱신: 정보 수정
  - 조회 참조: 경로검사  
- 목표값  
  - latency: 2s
  - throughput: 1일 평균 14  ~ 1일 최대 : 140
    - 1일 총 접속수: 1,500,000 = 300,000 x 5  (1일 사용자 수 (DAU) x 1명당 1일 평균 접속수)
    - 1일 평균 rps: 14 = 1,500,000 / 86,400(1일 총 접속수 / 86,400(초/일))
    - 1일 최대 rps: 140 = 14 x 10 (1일 평균 rps x (최대 트래픽 / 평소 트래픽))
  - 부하 유지기간: 2분
- 부하 테스트 시 저장될 데이터 건수 및 크기
  - 노선 23개, 구간 340개, 역 616개

- VUser 설정
  - 시나리오 상 2번의 요청이 있고, 총 latency 목표값을 2s로 가정하면
  - T (VU iteration) = (요청수 * http_req_duration) + a 이므로,
  - T = (2 * 2) + 0 = 4s
- 목표 rps = (VUser * 요청수) / 목표 응답시간(T)
- VUser = (목표 rps * T) / 요청수
- VUser = (140 * 4) / 2 = 280

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요  

Smoke  
- VUser 1~2로 구성  
- 최소한의 부하로, 테스트 시나리오 오류를 검증  
- 최소 부하 상태에서 시스템 오류가 없는지 확인  

Load
- 서비스의 평소 트래픽과 최대 트래픽으로 구성
- 기능이 정상 동작하는지 검증
- 배포, 인프라 변경시 성능 변화 확인
- 우형: 피크타임시 3배로 테스트  

Stress
- 점진적으로 부하가 증가하도록 구성
- 최대 사용자, 최대 처리량 등 한계점을 확인
- 스트레스 테스트 이후 시스템이 수동 개입없이도 복구되는지 확인

부하테스트 도구 - k6
- 시나리오 기반 테스트
- 동시 접속자 수, 요청 간격, 최대 처리량 등 부하 조정이 가능
- 부하 테스트 서버 Scale out 지원  


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
- /home/ubuntu/infra-subway-monitoring/log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=saerang-dashboard