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
   * application : /home/ubuntu/nextstep/logs/infra-subway-monitoring.log (3.36.73.166)
   * nginx : /home/ubuntu/nginx/logs (13.209.49.38)

2. Cloudwatch 대시보드 URL을 알려주세요
   * URL :  https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-yjs2952

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   * 이커머스 C 사와 비교
---
### 성능지표 
|   | 지하철노선도 | C사 |
|---|:---:|---:|
|First Contentful Paint|14.5초|  2.6 초  |
|Time to Interactive|15.2초|  8.8 초  | 
|Speed Index|14.5초|  6.4 초  |
|Total Blocking Time|640 밀리초|  440 밀리초  |
|Largest Contentful Paint|15.2초|  12.1 초  |
|Cumulative Layout Shift|0.041|  0.161  |
---
|   | 지하철노선도 | C사 |
|---|:---:|---:|
| First Byte Time | A | A |
| Keep-alive Enabled | A | A|
| Compress Transfer | F |A|
| Compress Images | A |B|
| Cache static content | C | F|
| Effective use of CDN | X | X
---
### 예산설정 (데스크탑 기준)
#### Lighthouse 점수항목 90점이상으로 설정
| 항목  | 수치 |
|---|:---:|
| First Contentful Paint | 910 ms |
| Keep-alive Enabled | 1280 ms |
| Compress Transfer | 1170 ms |
| Time to Interactive | 2380 ms |
| Total Blocking Time | 140 ms |
| Effective use of CDN | 0.10 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   * 텍스트 압축 사용 : gzip, deflate 등
   * 사용하지 않는 자바스크립트 줄이기 : vendors.js, main.js
   * 정적 자원에 캐시사용
   * 웹 폰트가 로드되는 동안 텍스트 표시
   * 이미지 요소에 width, height 명시

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   * Throughput
      - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
      - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
      - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
   * 예상치 도출
      - 모바일&PC 국내 N사 지도의 6개월간 사용자 수 통계 [링크](https://www.similarweb.com/website/coupang.com/?competitors=11st.co.kr)
      - 통계수치를 바탕으로 C사 하루 사용량 예상: 36만명 가량으로 예상
      - 경쟁업체를 기준으로 선정
      - 사용자가 보통 5번씩 사용한다고 가정
      - 1일 총 접속수: 36만명 * 5 = 180만회
      - 180,0000 / 86400 = 20rps
      - 1일 최대 rps: 20 * 100 / 10 = 200 rps
      - 사용자가 1분 내외로 사용한다고 가정.
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
