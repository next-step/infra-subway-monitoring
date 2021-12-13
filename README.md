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
- subway application
  - /home/ubuntu/apps/infra01/log/file.log
- nginx
  - /var/log/nginx/access.log
  - /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-ch3224bin
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

> 지하철 노선도 서비스는 불편함이 없을 정도의 무난한 성능을 제공하면 될 것 같습니다.  
> 지하철 경로 검색이 주된 서비스이고, 사용 목적이 분명하기에 좀 너그러운 측면이 있을 것 같습니다.   
> **무난**하다 생각되는 기준으로 한번 잡아보았습니다.

- 경쟁사 메인페이지와 비교
  - 네이버 지하철 노선도 : FCP 2.8s
  - NextStep 지하철 노선도 : FCP 1.4s
    - 정적리소스 gzip 압축 적용
- PC, Mobile 공통 기준
  - 페이지로드 3초 미만
  - First Contentful Paint(FCP) : 3초 미만
  - Time to Interactive(TTI) : 3초 미만
  - Largest Contentful Paint(LCP) : 3초 미만
  - Total Blocking Time(TBT) : 100ms 미만
  - 메인 페이지의 모든 오브젝트 파일 크기는 2MB 미만

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- javascript, css, html/text 등 정적 리소스를 압축
  - SPA 특성상 js가 무거운 것 같습니다.  
  js, css 등의 정적자원을 gzip으로 압축하여 전송하면 더 빠른 응답속도를 보장 할 수 있을 것 같습니다.  
  실제 nginx에서 gzip 설정을 한 결과 응답속도가 1/3 정도로 줄어들었습니다.

- 렌더링 차단 리소스 제거
  - 웹 페이지 안의 js를 async 등을 통해 비동기로 읽는 방식 등으로 응답속도를 개선할 수 있습니다

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 전제조건
  - 1일 사용자 100만명 대상
  - 1명당 1일 평균 2회 접속
- 대상 시스템 범위
  - proxy(nginx), app(was), db(mysql)
- 목표값
  - Latency
    - 100ms
  - Throughput
    - 1일 총 접속 수 : 200만
    - 1일 평균 rps : 23
    - 1일 최대 rps : 185
      - 평소 트래픽 대비 최대 트래픽을 8배로 산정
  - 부하 유지시간
    - 과제 특성상 
- 부하 테스트 시 저장될 데이터 건수 및 크기
  - 테스트 데이터로 영향도 적음

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 접속 빈도가 높은 페이지
  - Smoke
    - Script : [smoke-freq.js](/k6/smoke-freq.js])
    - Result : [smoke-freq-result.txt](/k6/smoke-freq-result.txt])
  - Load
    - Script : [load-freq.js](/k6/load-freq.js])
    - Result : [load-freq-result.txt](/k6/load-freq-result.txt])
  - Stress
    - Script : [stress-freq.js](/k6/stress-freq.js])
    - Result : [stress-freq-result.txt](/k6/stress-freq-result.txt])
- 데이터를 갱신하는 페이지
  - Smoke
    - Script : [smoke-update.js](/k6/smoke-update.js])
    - Result : [smoke-update-result.txt](/k6/smoke-update-result.txt])
  - Load
    - Script : [load-update.js](/k6/load-update.js])
    - Result : [load-update-result.txt](/k6/load-update-result.txt])
  - Stress
    - Script : [stress-update.js](/k6/stress-update.js])
    - Result : [stress-update-result.txt](/k6/stress-update-result.txt])
- 데이터를 조회하는데 여러 데이터를 참조하는 페이지
  - Smoke
    - Script : [smoke-complex.js](/k6/smoke-complex.js])
    - Result : [smoke-complex-result.txt](/k6/smoke-complex-result.txt])
  - Load
    - Script : [load-complex.js](/k6/load-complex.js])
    - Result : [load-complex-result.txt](/k6/load-complex-result.txt])
  - Stress
    - Script : [stress-complex.js](/k6/stress-complex.js])
    - Result : [stress-complex-result.txt](/k6/stress-complex-result.txt])
