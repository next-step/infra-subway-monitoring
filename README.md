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
1. 웹 성능 진단
   * **[Running Map] https://www.su-hub9.kro.kr/**
   * **[서울교통공사] http://www.seoulmetro.co.kr/kr/cyberStation.do**
   * **[네이버지도] https://m.map.naver.com/subway/subwayLine.naver?region=1000**
   * **[카카오맵] https://m.map.kakao.com/**
   - [x] WebPageTest
   ```
   <FIRST VIEW>
   | Site        | First Byte | Start Render | FCP    | Speed Index | LCP    | CLS   | TBT     | Total Bytes |
   | Running Map | 0.143s     | 4.7s         | 4.75s  | 4.72s       | 4.89s  | 0.004 | ≥0.000s | 2,493KB     |
   | 서울교통공사 | 0.541s     | 2.1s         | 2.05s  | 2.78s       | 4.10s  | 0.001 | ≥1.083s | 1,374KB     |
   | 네이버지도   | 0.214s     | 0.7s         | 3.50s  | 2.12s       | 2.86s  | 0.046 | ≥0.009s | 794KB       |
   | 카카오맵     | 0.199s     | 0.6s         | 2.70s  | 1.11s       | 1.69s  | 0.001 | ≥0.019s | 1,123KB     |
    ```
   - [x] PageSpeed
   ```
   <데스크톱>
   | Site        | Score | FCP   | TTI   | Speed Index  | LCP   | CLS   | TBT   |
   | Running Map | 67    | 2.7s  | 2.8s  | 2.7s         | 2.8s  | 0.004 | 50ms  |
   | 서울교통공사 | 66    | 1.6s  | 2.0s  | 3.6s         | 3.6s  | 0.014 | 70ms  |
   | 네이버지도   | 90    | 0.5s  | 0.5s  | 2.3s         | 1.5s  | 0.006 | 0ms   |
   | 카카오맵     | 88    | 0.5s  | 0.6s  | 2.7s         | 1.5s  | 0.003 | 0ms   |
   
   <휴대전화>
   | Site        | Score | FCP   | TTI   | Speed Index  | LCP   | CLS   | TBT   |
   | Running Map | 32    | 14.5s | 15.2s | 14.5s        | 15.1s | 0.042 | 560ms |
   | 서울교통공사 | 47    | 7.0s  | 8.5s  | 11.3s        | 7.5s  | 0     | 210ms |
   | 네이버지도   | 59    | 2.1s  | 6.6s  | 6.9s         | 7.8s  | 0.03  | 240ms |
   | 카카오맵     | 72    | 1.7s  | 4.4s  | 7.4s         | 4.9s  | 0.005 | 70ms  |
   ```
   
2. 웹 성능 예산은 어느정도가 적당하다고 생각하시나요
   - [x] 정량
     * 압축된 리소스(이미지, 글꼴, 스크립트 등) 최대 크기 200KB 미만
   - [x] 시간
     * 응답 시간이 경쟁사 대비 20% 이상 차이나지 않고, 3초 이내 로딩 되도록 기준 설정
     * 응답 시간의 중요 지표
       - FCP: 초기 DOM 콘텐츠 렌더링 시간 측정값
       - LCP: 가장 큰 콘텐츠 렌더링 시간 측정값(보통 중요한 콘텐츠일수록 크기가 크다고 예상)
       - TTI: 페이지 로드가 시작되고 주요 하위 리소스가 로드되어 사용자 입력에 응답할 수 있는 시점까지의 시간 측정값
     * 경쟁사 평균 **FCP: 1.8s, LCP: 2.54s, TTI: 1.03s** 
     * 목표값
       - 경쟁사 대비 10% 내외 속도 개선
       - First Contentful Paint(FCP): 1.62s 미만
       - Largest Contentful Paint(LCP): 2.28s 미만
       - Time to Interactive(TTI): 1.0s 미만
   - [x] 규칙
     * Lighthouse 성능 점수 81점 이상

3. 웹 성능 예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   * 불필요한 스크립트 제거 및 텍스트 기반 리소스 압축(gzip)
     - /js/vendors.js(2,125KB)
     - /js/main.js(172KB)
   * 렌더링 차단 리소스 제거
     - 중요한 JS/CSS 를 인라인으로 전달
     - 중요하지 않은 모든 JS/Style 을 지연
   * 정적 리소스 캐싱
     - CDN 서버 사용(Cache-Control 헤더)

---

### 2단계 - 부하 테스트
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - 대상 시스템 범위: **WEB, WAS, DB**
   - 목푯값 설정
     - 예상 1일 사용자 수(DAU): **23.8만**
       ```
       * 기존 경쟁사 MAU
         - 네이버지도: 1,112만명
         - 카카오맵: 530만명
         - 지하철 종결자: 500만명
       * 평균 714만명 / 30일 = DAU 23.8만명
       [참고]
       https://signalm.sedaily.com/NewsView/1Z58J6MCL1/GX1502
       https://platum.kr/archives/61943
       ```
     - 시간대별 지하철 이용객: **Max 100만, Avg 21.4만**
       ```
       * 하루 평균 지하철 이용객: 최근 5년 평균 약 450만명
       * 출퇴근 시간대의 이용객: 8-9시 약 100만, 18-19시 약 100만
       * 시간대별 평균: 21.4만
       * 피크 시간대 집중률: 100 / 21.4 = 4.67
       [참고]
       https://www.bigdata-map.kr/datastory/traffic/seoul
       https://news.seoul.go.kr/traffic/archives/31616
       ```
     - 1일 총 접속 수: **71.4만**
       ```
       * 1명당 1일 평균 접속수: 3회
       * DAU 23.8 x 3 = 71.4만
       ```
     - Throughput(1일 평균 rps ~ 1일 최대 rps): **8.26 ~ 38.57** 
       ```
       * 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
       * 71.4만 / 86,400 (초/일) = 8.26
       * 8.26 x ( 4.67 / 1 ) = 38.57
       ```
     - latency: **50ms 이하**
     - VUser: **7(6.88) ~ 33(32.14)**
       ```
       * R = 3
       * 왕복시간이 0.5s, 지연시간이 1초라고 가정
       * T = (3 * 0.5s) + 1s = 2.5
       * VUser(평균) = (8.26 * 2.5) / 3 = 6.88
       * VUser(최대) = (38.57 * 2.5) / 3 = 32.14
       ```
   - 부하 테스트 시 저장될 데이터 건수 및 크기
     * brainbackdoor/data-subway:0.0.1 기준
     * 지하철 노선 23건
     * 지하철 구간 340건
     * 지하철역 616건
   - 테스트 시나리오
     - 접속 빈도가 높은 페이지
       * 메인
       * 로그인
       * 경로 검색
     - 데이터를 갱신하는 페이지
       * 즐겨찾기 등록
     - 데이터를 조회하는데 여러 데이터를 참조하는 페이지
       * 경로 검색
       * 즐겨찾기 조회

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - Smoke
     * [smoke.js](/result/script/smoke.js)
     * [k6](/result/image/k6_smoke.png)
     * [grafana](/result/image/grafana_smoke.png)
   - Load
     * [load.js](/result/script/load.js)
     * [k6](/result/image/k6_load.png)
     * [grafana](/result/image/grafana_load.png)
   - Stress
     * [stress.js](/result/script/stress.js)
     * [k6](/result/image/k6_stress.png)
     * [grafana](/result/image/grafana_stress.png)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
