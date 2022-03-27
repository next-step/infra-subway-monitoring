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

![pagespeed](/images/before/page-speed.png)
![pagespeed](/images/before/page-speed-seoul.png)
![pagespeed](/images/before/webpage-test.png)
![pagespeed](/images/before/webpage-test-seoul.png)
First Contentful Paint 1초 이내로 줄이기
성능점수 60점까지 올리기 (현재 31점 / 서울 지하철 21점)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
텍스트 압축 사용
이미지 캐싱 사용

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
지하철을 이용하며 실제로 어플을 사용해 경로를 탐색하는 경우는 처음가는 곳의 경로를 찾을때 왕복으로 2회로 
전체 지하철 이용자수 440만명 중 10프로가 2번 사용한다 가정
- 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
440,000 * 2 = 880,000
- 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
880,000 / 86400 = 약 10
- 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
10 * 3 = 30

5. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
![test](/images/before/smoke.png)
![test](/images/before/smoke-grafana.png)
![test](/images/before/load.png)
![test](/images/before/load-grafana.png)
![test](/images/before/stress.png)
![test](/images/before/stress-grafana.png)

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
