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
- 우선 순위
    + 1순위: FCP (UI적인 접근이 우선)
    + 2순위: TTI
- 경쟁사 평균 대비 20% 이상 차이나지 않도록 설정
- 목표 성능예산
    + 압축된 리소스 최대 크기 200KB 미만
    + TTI: 3s 이하
    + FCP: 2s 이하
    + TTI: pc 2s 이하, 모바일 10s 이하 (현재 pc 2.7s, 모바일 15.5s 소요)
    + FCP: pc 2s 이하, 모바일 10s 이하 (현재 pc 2.7s, 모바일 15s 소요)
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- `vendors.js`, `main.js` 의 크기를 줄여본다. (vendors.js의 경우 200KB 이하로)
- `vendors.js`, `main.js` 의 크기를 줄여본다.
    ```
    vendors.js : 2,127kb -> 200kb 이하로
    main.js : 172kb -> 100kb 이하로
    ```
    + 압축
    + 소스 스플릿
    + lazy-loading
    + 불필요한 소스 제거
- 정적 리소스 캐싱
    + `cache-control` 헤더 활용
    + CDN 서버 이용
- 웹폰트가 로드되는 동안 텍스트 표시하기

### 용어 정리
- [FCP(First Contentful Paint)](https://web.dev/fcp/): 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간
- [TTI(Time To Interactive)](https://web.dev/tti/): 페이지가 로드되기 시작한 시점부터 주요 하위 리소스가 로드되고 사용자 입력에 신속하게 안정적으로 응답할 수 있는 시점까지의 시간
- [SI(Speed Index)](https://web.dev/speed-index/): 페이지 로드 중에 내용이 시각적으로 표시되는 속도
- [TBT(Total Blocking Time)](https://web.dev/tbt/): 메인 스레드가 입력 응답을 막을 만큼 오래 차단되었을 때 FCP와 TTI 사이 총 시간
- [LCP(Largest Contentful Paint)](https://web.dev/lcp/): 페이지가 처음으로 로드를 시작한 시점을 기준으로 뷰포트 내에 있는 가장 큰 이미지 또는 텍스트 블록의 렌더링 시간
- [CLS(Cumulative Layout Shift)](https://web.dev/cls/): 페이지의 전체 수명 동안 발생하는 모든 예기치 않은 레이아웃 이동에 대해 가장 큰 레이아웃 이동 점수

### 경쟁사 비교
1. [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)
- mobile
    + FCP: 6.6 s
    + TTI: 8.4 s
    + SI: 7.5 s
    + TBT: 130 ms
    + LCP: 7.0 s
    + CLS: 0
- pc
    + FCP: 1.7 s
    + TTI: 1.9 s
    + SI: 2.3 s
    + TBT: 60 ms
    + LCP: 3.6 s
    + CLS: 0.016
2. [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
- mobile
    + FCP: 2.2 s
    + TTI: 5.8 s
    + SI: 6.6 s
    + TBT: 260 ms
    + LCP: 8.3 s
    + CLS: 0.03
- pc
    + FCP: 0.5 s
    + TTI: 1.1 s
    + SI: 2.4 s
    + TBT: 0 ms
    + LCP: 1.7 s
    + CLS: 0.006
3. [카카오맵](https://m.map.kakao.com/)
- mobile
    + FCP: 1.7 s
    + TTI: 4.2 s
    + SI: 6.4 s
    + TBT: 50 ms
    + LCP: 6.3 s
    + CLS: 0.005
- pc
    + FCP: 0.5 s
    + TTI: 0.7 s
    + SI: 2.2 s
    + TBT: 0 ms
    + LCP: 1.3 s
    + CLS: 0.039

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 목푯값 설정 (latency, throughput, 부하 유지기간)
    + (a) 예상 1일 사용자 수(DAU): 10만
    + (b) 피크 시간대의 집중률: 4.0
    + (c) 1명당 1일 평균 접속 혹은 요청수: 8회
    + (d) Throughput: 1일 평균 rps ~ 1일 최대 rps
      ```
      1일 총 접속 수 = 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수
                   = 100,000 x 8
                   = 800,000
      ```
      ```
      1일 평균 rps = 1일 총 접속 수 / 86,400 (초/일)
                  = 800,000 / 86,400
                  = 9.3
      ```
      ```
      1일 최대 rps = 1일 평균 rps x (최대 트래픽 / 평소 트래픽)
                  = 9.3 x 4
                  = 37.2
      ```
- VUser 구하기
    + 평균 VUser = (9.3 * 2) / 6 = 3.1
    + 최대 VUser = (37.2 * 2) / 6 = 12.4
    ```
    T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency를 추가한다
      = (6 * 0.1) + 1
      = 2s
    ```
    ```
    VUser = (목표 rps * T) / R
          = (9.3 * 2) / 6 = 3.1
          = (37.2 * 2) / 6 = 12.4
    ```
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- Smoke
    + [smoke.js](/k6/script/smoke.js)
    + [k6](/k6/result/smoke_k6.png)
    + [grafana](/k6/result/smoke_grafana.png)
- Load
    + [load.js](/k6/script/load.js)
    + [k6](/k6/result/load_k6.png)
    + [grafana](/k6/result/load_grafana.png)
- Stress
    + [stress.js](/k6/script/stress.js)
    + [k6](/k6/result/stress_k6.png)
    + [grafana](/k6/result/stress_grafana.png)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
