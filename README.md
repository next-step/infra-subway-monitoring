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
- 경쟁사 성능 대비 20% 향상된 수준(목표 최대치) ~ 경쟁사 수준(목표 최소치)

  | 환경     | FCP(현재) | TTI(현재)    | SpeedIndex(현재) | TBT(현재)        | LCP(현재)      | CLS(현재)      |
    |---------|------------|----------------|----------------|--------------|--------------|--------------|
  | Desktop | 0.4초(2.7초) | 0.56초(2.8초) | 1.76초( 2.7초)   | 8밀리초(50밀리초)    | 1.28초(2.8초)  | 좋음 (0.004)   |
  | Mobile  | 1.84초(14.9초) | 5.84초(15.5초) | 5.04초(14.9초 )  | 432밀리초(600밀리초) | 6.16초(15.5초) | 0.024(0.041) |


(참고용: pagespeed 경쟁사와의 성능비교 )
- 데스크톱

  | 비교 사이트    | FCP  | TTI  | SpeedIndex | TBT   | LCP  | CLS   | 성능점수 |
     |-----------|------|------|------|-------|------|------|------|
  | 내 웹(madini) | 2.7초 | 2.8초 | 2.7초 | 50밀리초 | 2.8초 | 0.004 | 67   |
  | 경쟁사(N사)   | 0.5초 | 0.7초 | 2.2초 | 10밀리초 | 1.6초 | 0.006 | 90   |

- 모바일

  | 비교 사이트    | FCP   | TTI   | SpeedIndex | TBT    | LCP   | CLS   | 성능점수 |
     |-----------|-------|-------|------------|--------|-------|------|-----|
  | 내 웹(madini) | 14.9초 | 15.5초 | 14.9초      | 600밀리초 | 15.5초 | 0.041 | 37   |
  | 경쟁사(N사)   | 2.3초  | 7.3초  | 6.3초       | 540밀리초 | 7.7초  | 0.03  | 49   |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    1. 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 제공
    2. 사용하지 않는 자바스크립트를 줄이고 스크립트가 필요할 때까지 로딩을 지연시켜 네트워크 활동에 소비되는 바이트를 줄이기
    3. 캐시를 사용하여 정적 애셋 제공

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    1. 우선 예상 1일 사용자 수(DAU) : 450만
    2. 피크 시간대의 집중률 (최대 트래픽 / 평소 트래픽) : 100만/50만 = 2
    3. 1명당 1일 평균 접속(요청수): 3
    4. Throughput: 156 ~ 312
    5. 1일 최대 rps: 312
    6. 1일 평균 rps: 156


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    1. 메인 페이지 결과 (T:1.5, R=3, http_req_duration=0.5)
        - smokeTest: [테스트 스크립트](/src/test/java/perfomance/mainSmokeTest.js), [테스트 결과](/src/test/java/performance/images/mainSmokeTest.png)
        - loadTest: [테스트 스크립트](/src/test/java/perfomance/mainLoadTest.js), [테스트 결과](/src/test/java/performance/images/mainLoadTest.png)
        - stressTest: [테스트 스크립트](/src/test/java/perfomance/mainStressTest.js), [테스트 결과](/src/test/java/performance/images/mainStressTest.png)
    2. 로그인 페이지 결과(T:1.5, R=1, http_req_duration=0.5)
        - smokeTest: [테스트 스크립트](/src/test/java/perfomance/loginSmokeTest.js), [테스트 결과](/src/test/java/performance/images/loginSmokeTest.png)
        - loadTest: [테스트 스크립트](/src/test/java/perfomance/loginLoadTest.js), [테스트 결과](/src/test/java/performance/images/loginLoadTest.png)
        - stressTest: [테스트 스크립트](/src/test/java/perfomance/loginStressTest.js), [테스트 결과](/src/test/java/performance/images/loginStressTest.png)

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
   1. nginx에서 zip 압축 활성화하여 파일이 경량화되는 것 확인 (1.2KB -> 750B)
   2. http2 적용
   3. cache
   4. 부하분산(8080, 8081포트 사용)
   5. 레디스 적용
- 디비를 조회하는 /lines 기능으로 스트레스 테스트를 개전 전 후로  비교해봤습니다.(98% -> 99% 향상...)
    - [개선전 line Stress](/src/test/java/performance/images/lineStress_개선전.png)
    - [개선후 line Stress](/src/test/java/performance/images/lineStress_개선후.png)

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
