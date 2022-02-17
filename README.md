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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 

* [내 subway](https://pagespeed.web.dev/report?url=https%3A%2F%2Fparkeeseul.kro.kr%2F) 서비스
![test](./image/webpageBefore.png)

* [naver subway](https://pagespeed.web.dev/report?url=https%3A%2F%2Fmap.naver.com%2Fv5%2Fsubway%2F1000%2F-%2F-%2F-%3Fc%3D14146635.9803238%2C4519514.4759440%2C15%2C0%2C0%2C0%2Cdh) 서비스
![test](./image/naverSubway.png)
- 성능 점수를 70 점 까지 높여보자!
- 페이지 로드 3초 미만
- TTI 5초 미만
- 압축된 리소스 최대 크기 200KB 미만

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
  - gzip 압축 : vendors.js, main.js
  - 사용하지 않는 자바스크립트 제거
  - 사용하지 않는 CSS 제거
  - 캐싱 설정
  - keep-alive 설정

3. 부하테스트 전제조건은 어느정도로 설정하셨나요([기사](https://platum.kr/archives/61943) 를 참고해 보았습니다)
- 목표 rps 구하기
  * 1일 사용자 수(DAU) : 1000000
  * 피크 시간대의 집중률 : 10 배
  * 1일 평균 접속 수 = 2

- 1일 총 접속 수 = DAU x 1명당 1일 평균 접속 수
  * 1000000 x 2 = 2000000
- 1일 평균 rps = 1일 총 접속 수 / 86,400 (초/일)  
  * (1000000 x 2) /  86,400 = 23.148
- 1일 최대 rps = 1일 평균 rps x (최대 트래픽 / 평소 트래픽)
  * 23 x ((1.5 * 10) / 1.5) = 230
  * 질문) 평소 트래픽 (1.5를 다음과 같은 기준으로 잡았는데 괜찮을까요?)
  * ![test](./image/traffic.png)
  
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
 - smoke test
   ![test](./image/smoke.png)

 - load test
   - VUser 구하기
     * T = (2 * 0.1) + 0 = 0.2 
     * (230 * 0.2) / 2 = 23 (VUser)  
 - 
   ![test](./image/load.png)
 - stress test
 - ![test](./image/stress.png)

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
