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
   - FCP는 4초 미만이어야 한다.
   - TTI는 7초 미만이어야 한다.
   - 모든 페이지에 포함된 자바스크립트는 200kb를 넘지 않아야 한다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
   - 경쟁사 경로 검색 시 걸리는 시간이 250 ~ 300ms 사이기 때문에 서버 목표 응답시간은 300ms 이어야 한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - 대상 시스템 범위
      - 지하철 경로 탐색
   - 목푯값 설정
      - latency: 0.3s
      - throughput: 16 rps ~ 40 rps
      - 부하 유지기간: 30분
   - 부하 테스트 시 저장될 데이터 건수 및 크기
      - 없음

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - [smoke](perf/smoke.js)
    - [smoke-result](perf/smoke-result.pdf)
    - [load](perf/load.js)
    - [load-result](perf/load-result.pdf)
    - [stress](perf/stress.js)
    - [stress-result](perf/stress-result.pdf)

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
    - application log: /home/ubuntu/infra-subway-monitoring/log
    - nginx log: /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
    - [cloudwatch dashboard](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=ifjso-subway)