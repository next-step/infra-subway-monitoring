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
- [X] file: /home/ubuntu/monitoring/infra-subway-monitoring/log/file.log
- [X] json: /home/ubuntu/monitoring/infra-subway-monitoring/json.log

2. Cloudwatch 대시보드 URL을 알려주세요
- [X] 경로: https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-sojeong-park

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
* 경쟁사 - [N사 지하철 노선 검색서비스](https://m.map.naver.com/subway/subwayLine.naver?region=1000)

| PageSpeed | 나의 지하철노선도 | N사 지하철노선검색 서비스 |
|---|:---:|---:|
|First Contentful Paint|2.7초|  0.9 초  |
|Speed Index|2.7초|  2.2 초  |
|Largest Contentful Paint|2.8초|  1.6 초  |
|Time to Interactive|2.9초|  1.3 초  |
|Total Blocking Time|60 밀리초|  10 밀리초  |
|Cumulative Layout Shift|0.004|  0.007  |
|총 점수|67|  89  |

| Web Page Test  | 나의 지하철노선도 | N사 지하철노선검색 서비스 |
|---|:---:|---:|
| First Byte Time | A | A |
| Keep-alive Enabled | A | A|
| Compress Transfer | F |A|
| Compress Images | A |A|
| Cache static content | C | C |
| Effective use of CDN | X | X
---

    * PageSpeed Insights 점수 80점 이상
    * webPageTest 성능 테스트 전체 등급 A
    * 응답시간 3초 이내 
    
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 사용하지 않는 vendors.js, main.js 파일 제거 
   - Compress Transfer : F -> gzip 압축, 이미지 압축
   - Cache static content : C -> 적절한 캐시 유지 기간 정하여 정적 컨텐츠 캐싱
   

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - 대상 시스템 범위 : 지하철 노선 메인화면, 로그인, 경로 검색
   - 목푯값 설정 (latency, throughput, 부하 유지기간)
     - latency : 50ms
     - throughput
         - 1일 총 접속수 = 500,000 = 100,000 * 5 [ 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 ]
         - 1일 평균 rps = 5 [ 1일 총 접속 수 / 86,400 (초/일) ]
         - 1일 최대 rps = 50 = 5 * (100 / 10) [ 1일 평균 rps x (최대 트래픽 / 평소 트래픽) ]
         - 부하 유지기간 : 30s
   

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
 - 시나리오
   - 접속 빈도가 높은 페이지 main에 대해 smoke, load, stress 테스트 진행
      - js 및 결과 이미지 : loadtest/main
   - 데이터 갱신하는 페이지인 login에 대해 smoke, load, stress 테스트 진행
      - js 및 결과 이미지 : loadtest/login
   - 데이터 조회시 여러 페이지 참조하는 페이지 path에 대해 smoke, load, stress 테스트 진행
      - js 및 결과 이미지 : loadtest/path
