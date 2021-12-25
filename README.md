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

### 베스천 서버에 접속을 위한 pem키
- [구글드라이브](https://drive.google.com/drive/folders/1dZiCUwNeH1LMglp8dyTqqsL1b2yBnzd1?usp=sharing)
- 파일명: /pem/wootecam-pro-3/devsigner9920-private-key.pem

### 1단계 - 인프라 운영하기
배스천 서버에서 웹 서버 접속: ssh -i ~/private/devsigner9920-private-key.pem ubuntu@192.168.190.47

1. 각 서버내 로깅 경로를 알려주세요
   - Nginx
     - 경로: /var/log/nginx
   - Web App
     - 경로: /var/log/subway
2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-devsigner9920

### 요구사항
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] 로그 설정하기
- [x] Cloudwatch로 모니터링

- 로그 설정하기
  - [x] Application Log 파일로 저장하기
  - [x] 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
- Nginx Access Log 설정하기
  - [x] Cloudwatch로 모니터링
  - [x] Cloudwatch로 로그 수집하기
  - [x] Cloudwatch로 메트릭 수집하기

---

### 2단계 - 성능 테스트

### TODO 리스트
- 웹 성능 테스트
  - [x] 웹 성능 예산을 작성
  - [x] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
- 부하 테스트
  - 테스트 전제조건 정리
    - [x] 대상 시스템 범위
    - [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [x] 부하 테스트 시 저장될 데이터 건수 및 크기
  - 각 시나리오에 맞춰 스크립트 작성
    - [x] 접속 빈도가 높은 페이지
    - [x] 데이터를 갱신하는 페이지
    - [x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
  - [x] Smoke, Load, Stress 테스트 후 결과를 기록

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

| 웹 사이트                    | First Contentful Paint | Time to Interactive | Speed Index | Total Blocking Time | Largest Contentful Paint | Cumulative Layout Shift |
|------------------------------|------------------------|---------------------|-------------|---------------------|--------------------------|-------------------------|
| Running Map (내 사이트)      | 2.8 s                  | 2.9 s               | 2.8 s       | 50 ms               | 2.9 s                    | 0.004                   |
| 네이버 지하철                | 0.5 s                  | 0.5 s               | 2.0 s       | 0 ms                | 1.6 s                    | 0.006                   |
| 서울교통공사 사이버 스테이션 | 1.6 s                  | 2.0 s               | 3.4 s       | 150 ms              | 3.5 s                    | 0.013                   |

  - 웹 성능 테스트 결과 메이저 경쟁사인 네이버 지하철과 확연히 차이 났으며 서울교통공사와는 FCP 및 Time to Interactive에서 차이가 있었습니다.
  - 메이저 경쟁사와 최대한 근접한 웹 성능을 나타내도록 하고, 첫번째 단계로 네이버 지하철과 서울교통공사 사이의 웹 성능을 낼 수 있도록 개선하는 것이 목표입니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
  - FCP, LCP에 영향을 주는 텍스트 기반 리소스들이 서버로부터 압축되어 오지 않아 리소스들 압축이 필요해 보입니다.
  - 사용하지 않는 스크립트들이 있어 프론트엔드 엔지니어분에게 소스 점검을 요청할 수 있습니다.
  - 정적 리소스들에 대한 캐시 정책을 세워 네트워크 비용을 줄일 수 있습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
  - Nginx Server, Web Application Server, DB
- 목푯값 설정
  - 1일 사용자 수(DAU): 1,000,000명
  - 1일 총 접속 수: 2,000,000 (1,000,000 * 2)
  - 피크 시간대의 집중률: 7 (최대 1,400,000 / 평균 200,000)
  - 1일 평균 rps: 23.14 (2,000,000(DAU) / 86,400 (일/초))
  - 1일 최대 rps: 161.98 (23.14 * 7)
- smoke test
  - VUser: 5
- load test
  - main:
    - reuqest: GET / HTTP/1.1
    - Request: 1
    - T: (Request * http_req_duration) + 1s -> 1.5
    - 최소 VUser: (평균 rps * T) / Request -> 34.17
    - 최대 VUser: (최대 rps * T) / Request -> 242.97
  - post & delete:
    - request
      - POST /stations HTTP/1.1
      - DELETE /stations/{id} HTTP/1.1
    - Request : 2
    - T = (Request * http_req_duration) + 1s -> 2
    - 최소 VUser: (평균 rps * T) / Request -> 23.14
    - 최대 VUser: (최대 rps * T) / Request -> 161.98
- stress test
  - 최대치 찾아서 테스트 시도해보았습니다.

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- 스모크 테스트:
  - script: [smoke.js](/performance_test/script/smoke.js)
  - log: [smoke_test.log](/performance_test/log/smoke_test.log)
- 로드 테스트:
  - script: [load.js](/performance_test/script/load.js)
  - log: [load_test.log](/performance_test/log/load_test.log)
- 스트레스 테스트:
  - script: [stress.js](/performance_test/script/stress.js)
  - log: [stress_test.log](/performance_test/log/stress_test.log)
