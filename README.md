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

모바일 환경 기준

경쟁사 : 네이버지도 (https://m.map.naver.com/subway/subwayLine.naver?region=1000)

| 비교                       | 경쟁사   | 내 서비스  | 목표치 |
|--------------------------|-------|--------|-----|
| First Contentful Paint   | 2.2 초 | 15.1 초 | 2초  |
| Time to Interactive      | 2.6 초 | 15.9 초 | 2초  |
| Speed Index              | 6.1 초 | 15.6 초 | 6초  |
| Largest Contentful Paint | 8.7 초 | 15.6 초 | 8초  |
| PageSpeed score          | 41 점  | 27 점   | 50점 |

데스크탑 환경 기준

| 비교                       | 경쟁사   | 내 서비스 | 목표치  |
|--------------------------|-------|-------|------|
| First Contentful Paint   | 0.5 초 | 2.8 초 | 0.5초 |
| Time to Interactive      | 0.7 초 | 2.9 초 | 0.5초 |
| Speed Index              | 2.3 초 | 2.8 초 | 2초   |
| Largest Contentful Paint | 1.6 초 | 2.9 초 | 1.5초 |
| PageSpeed score          | 89 점  | 67 점  | 90점  |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 모바일에서의 성능이 너무 낮습니다. 사용하지 않는 자바스크립트를 제거하고, 텍스트 기반 리소스를 gzip 으로 압축해야할 것 같습니다.
  특히 webpagetest에서 compress transfer 등급이 F인 점을 통해서 gzip 으로의 압축 이후에 전송이 필요하다고 생각합니다.  
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- latency(서버가 클라이언트로부터 요청을 받아서 응답을 보내주는 시간) : 100ms 
- throughput(1일 평균 rps ~ 1일 최대 rps) : 
  - DAU를 200만
  - 1명당 1일 평균 접속 수 : (출근 + 퇴근 = 2번) * (로그인 + 즐겨찾기 보기 = 2) = 4번
  - 1일 총 요청수 : 200만 * 4번 / 86400 
  - 1일 평균 rps : 92
  - 1일 최대 rps : 460 (5배 예상)
- 부하 유지시간은 2시간이지만 편의상 1분 안으로 테스트 했습니다.
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- smoke test : [smoke test](https://github.com/mj950425/infra-subway-monitoring/blob/step1/test-result/smoke.md)
- load  test : [load test](https://github.com/mj950425/infra-subway-monitoring/blob/step1/test-result/load.md)
- stress tst : [stress test](https://github.com/mj950425/infra-subway-monitoring/blob/step1/test-result/stress.md)

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
