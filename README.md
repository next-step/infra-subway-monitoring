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
- /var/log/nginx/access.log
- /var/log/nginx/error.log
- /home/ubuntu/infra-subway-monitoring/log/file.log
- /home/ubuntu/infra-subway-monitoring/log/json.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-chapitak

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
 - 경쟁 사이트: 서울교통공사 사이버 스테이션 [http://www.seoulmetro.co.kr/kr/cyberStation.do](http://www.seoulmetro.co.kr/kr/cyberStation.do)
   - 모바일 FCP 7.2초 TTI 9.0초
   - 데스크톱 FCP 1.6초 TTI 2.1초
 - 메인 페이지에 대한 웹 성능예산 산정
   - FCP를 3초 미만으로 유지한다
   - TTI를  5초 미만으로 유지한다
   - 압축된 리소스의 최대 크기는 200KB를 넘지 말아야 한다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
 
- gziop 리소스 압축을 통해 성능을 가장 많이 향상시킬 수 있습니다. Lighthouse의 에뮬레이션 결과에 따르면 모바일의 경우 FCP를 9.3s, 데스크톱의 경우 1.44s까지 줄일 수 있습니다.
- js/vendors.js, js/main.js의 경우 사용하지 않는 자바스크립트라면 제외해주는 경우 속도를 개선할 수 있습니다.
- 자바스크립트 파일과 로고 이미지 파일에  대해 CDN을 제공할 수 있습니다.
 
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
   - 웹서버, DB
- 목푯값 설정
   - Throughtput: 23 ~ 230
   - Latency: Vu가 요청의 숫자와 동일하다고 가정
   - 테스트 기간:  20초
    
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- /k6test 경로 이하에 저장했습니다. 
