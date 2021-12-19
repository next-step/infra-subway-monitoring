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

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요

cd /home/ubuntu/log

2. Cloudwatch 대시보드 URL을 알려주세요

https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=jennie267-dashboard


### 2단계 - 성능 테스트
#### 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    * 경쟁사 : 네이버지하철(https://m.map.naver.com/subway/subwayLine.naver?region=1000)
    
    * 네이버지하철 / 자사
    - First Contentful Paint : 2.2s / 14.6s
    - Speed Index : 6.5s / 14.6s
    - Largest Contentful Paint : 7.8s / 16s
    - Time to Interactive : 6.6s / 16.8s
    - Total Blocking Time : 340ms / 920ms
    - Cumulative Layout Shift : 0.03 / 0.004
    
    * 네이버와 비슷한 성능이 나와야 할 것으로 보입니다.

#### 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    * 용량이 큰 리소스를 줄여야 함. (vendor.js, main.js 등)
    * 텍스트 압축 사용
    * 사용하지 않는 자바스크립트 줄이기
    * 효율적인 캐시 정책 사용

#### 3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    * DAU : 2,000,000 (참고자료 : https://www.sedaily.com/NewsView/22RH3PUBN6 -> 지하철경로앱 참고)
    * 피크 시간대의 집중률 : 10
    * 1명당 1일 평균 요청수 : 2 (출근, 퇴근)
    * Throughtput
        * 1일 총 접속 수 : 4,000,000
        * 1일 평균 rps : 약 46.3
        * 1일 최대 rps : 463
    * 목표 rps : 463
    * 2초 이내로 응답이 오지 않는 요청은 실패로 간주함.

#### 4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    * 메인페이지 : k6/main
        - Smoke : k6/main/smoke-main.js
        - Load : k6/main/load-main.js
        - Stress : k6/main/stress-main.js
    * 경로찾기 : k6/path
        - Smoke : k6/path/smoke-path.js
        - Load : k6/path/load-path.js
        - Stress : k6/path/stress-path.js
    * 내정보수정 : k6/update
        - Smoke : k6/update/smoke-update.js
        - Load : k6/update/load-update.js
        - Stress : k6/update/stress-update.js
    
    * Smoke 테스트 결과
        - 메인페이지 : ok (k6/main/smoke-main.log)
        - 경로찾기 : ok (k6/path/smoke-path.log)
        - 내정보수정 : ok (k6/update/smoke-update.log)
    
    * Load 테스트 결과
        - 메인페이지 : ok (k6/main/load-main.log)
        - 경로찾기 : ok (k6/path/load-path.log)
        - 내정보수정 : ok (k6/update/load-update.log)
    
    * Stress 테스트 결과
        - 메인페이지 : 4500~5000 rps가 넘어가면서 2초동안 응답이 없는 요청이 발생함. (k6/main/stress-main.log)
        - 경로찾기 : 5500~6000 rps가 넘어가면서 2초동안 응답이 없는 요청이 발생함. (k6/path/stress-path.log)
        - 내정보수정 : 550~600 rps가 넘어가면서 2초동안 응답이 없는 요청이 발생함. (k6/update/stress-update.log)