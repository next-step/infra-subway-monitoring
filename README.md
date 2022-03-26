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
0. 참고 자료
- https://docs.google.com/spreadsheets/d/1W8s0nOR1V_gQTRg_lvffinkRIX2yqHnre8wTRJGqgBU/edit?usp=sharing

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- FCP가 2초를 넘기면 안된다
- Lighthouse 75점이상
- TTI는 5초를 넘기면 안된다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 의도적인 sleep을 걷어내고, 이미지의 크기를 지정해서 로드하게 하여 이미지 로드 시간을 줄이고,
- 글씨체를 압축해서 보내서 로드시간을 줄인다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 카카오맵==다음맵 하루 이용현황 https://ko.lab.appa.pe/2016-09/kakao-korea.html 를 참고하여 진행했습니다.  
  => 하루에 250만번이상이 카카오맵을 접속한다고 가정
  https://m.map.kakao.com/

- 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수    
  2500000


- 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps  
  2500000 / 86400 = 28.9


- 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps  
  28.9 * 3 = 86.7

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
