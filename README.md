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

### 성능 비교 : PageSpeed에서 측정
#### 내 사이트 : minzzang-subway.kro.kr

   | 디바이스 | FCP  | TTI  | SI   | TBT  | LCP  |   CLS  | Score |
   |------|------|------|------|------|-------|-------|  -----   |
   | MOBILE  | 14.7s | 15.3s | 14.7s | 560ms | 15.3s |  0.042  | 32 |
   | PC  | 2.6s | 2.7s | 2.6s | 50ms | 2.7s |  0.004  | 68 |

#### 경쟁사 사이트 : 서울 교통 공사, 네이버 지도, 카카오 맵

1. 서울 교통 공사

| 디바이스 | FCP  | TTI  | SI   | TBT  | LCP  |   CLS  | Score |
   |------|------|------|------|------|-------|-------|  -----   |
| MOBILE  | 7.2s | 8.6s | 8.3s | 180ms | 8.7s |  0  | 49 |
| PC  | 1.6s | 2.0s | 2.3s | 50ms | 3.5s |  0.014  | 71 |

2. 네이버 지도

| 디바이스 | FCP  | TTI  | SI   | TBT  | LCP  |   CLS  | Score |
   |------|------|------|------|------|-------|-------|  -----   |
| MOBILE  | 2.1s | 6.6s | 5.7s | 240ms | 7.9s |  0.03  | 60 |
| PC  | 0.5s | 0.5s | 2.3s | 0ms | 1.6s |  0.006  | 90 |

3. 카카오 맵

| 디바이스 | FCP  | TTI  | SI   | TBT  | LCP  |   CLS  | Score |
   |------|------|------|------|------|-------|-------|  -----   |
| MOBILE  | 1.7s | 4.5s | 6.7s | 80ms | 6.3s |  0.005  | 68 |
| PC  | 0.5s | 1.0s | 2.6s | 0ms | 1.3s |  0.003  | 91 |

용어 정리
* FCP(First Contentful Paint) - 첫 번째 텍스트 또는 이미가 브라우저에 표시되는 시간
* TTI(Time To Interactive) - 완전히 페이지를 사용할 수 있을 때까지 걸리는 시간
* SI(Speed Index) - 페이지의 보이는 부분이 표시되는 평균 시간
* TBT(Total Blocking Time) - FCP와 TTI사이의 모든 시간의 합
* LCP(Largest Contentful Paint) - 최대 텍스트 또는 이미지가 표시되는 시간
* CLS(Cumulative Layout Shift) - 사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도

### 예산 측정
* pageSpeed 사이트 기준, mobile Score : 75, pc Score : 95
* 경쟁사 대비 빠른 반응으로 유저 확보를 위해 FCP는 mobile : 1s, pc : 0.5s
* 사용자와의 인터랙션이 중요하므로 TTI는 mobile : 3s, pc : 0.5s



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   * 텍스트 기반 리소스를 압축(gzip, deflate, brotli)하여 네트워크 바이트 최소화
     * webServer 또는 was에서 리소스 압축
   * 사용하지 않는 자바스크립트를 줄이고 필요한 부분은 지연 로딩을 하여 네트워크 바이트 최소화
     * 중요도가 낮은 리소스를 지연 로딩 (로딩 시간이 오래걸리나 자주 사용하는 부분을 지연로딩 할 경우 오히려 사용자 경험이 안좋아질 수 있음)
   * 캐시 수명을 적절하게 설정해 응답 속도 향상
      * `Cache-Control `HTTP 응답 헤더를 반환하도록 구성
   
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
* 대상 시스템 범위
    * reverse proxy, was, db
* 목표값 설정
    * throughput
        * 1일 평균 접속자 100만명 (서울시 하루 평균 지하철 이용자 600만명)
        * 1명당 1일 평균 접속 수 : 2번
        * 1일 총 접속 수 : 200만 (100만 * 2)
        * 피크 시간대 집중률 : 오전 (7 ~ 9), 오후 (6 ~ 8) 평소 트래픽에 6배 예상
        * 1일 평균 rps : 23.1 (200만 / 86400)
        * 1일 최대 rps : 138.6 (23.1 * 6)
    * latency
      * 목표 응답 시간 = 0.5s
      * VUser = 69 (138.6 * 0.5 / 1)
    * 부하 유지 기간
      * smoke test : 1분
      * load test : 30분
      * stress test : 7분
* 저장될 데이터 건수
  * 지하철 역 : 616개
  * 지하철 노선 : 23개
  * 구간 : 340개
* 스크립트 시나리오
  * 로그인 하기 (접속 빈도가 높은 페이지)
  * 나의 정보 수정하기 (데이터를 갱신하는 페이지)
  * 경로 검색하기 (데이터를 조회하는데 여러 데이터를 참조하는 페이지)

    
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* loadtest
   * grafana
        * smoke_grafana.png
        * load_grafana.png
        * stress_grafana.png
  * k6
      * smoke_k6.png
      * load_k6.png
      * stress_k6.png
  * scenario
    * smoke.js
    * load.js
    * stress.js
    
* smoke 테스트에서는 목표 latency인 0.5s를 만족
* load 테스트에서는 평균 rps와 최대 rps를 이용해 VUser(10 ~ 70)로 구성 
  * latency 4s
* stress 테스트에서는 실패지점인 VUser(260)까지 올리고 서서히 낮춰서 정상 동작되는지 확인 
  * latency 14s
    
* 서버 로그를 확인해 병목지점을 찾아 성능 개선이 필요
    * 경로 검색 쿼리 개선
    * 자주 사용되는 데이터 캐시 처리

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
