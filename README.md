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
* [x] 웹 성능 예산 작성 후 서버 목표 응답시간 도출

| Mobile | 서울교통공사 | 네이버지도 | 카카오맵  | Running Map |
|--------|--------|-------|-------|-------------|
| FCP    | 6.7s   | 2.5s  | 1.7s  | 14.8s       |
| SI     | 11.9s  | 5.7s  | 7.1s  | 14.8s       |
| LCP    | 7.2s   | 7.4s  | 6.7s  | 15.3s       |
| TTI    | 9.4s   | 6.6s  | 4.5s  | 15.3s       |
| TBT    | 1390ms | 460ms | 40ms  | 479ms       |
| CLS    | 0.00   | 0.03  | 0.005 | 0.042s      |

| Desktop | 서울교통공사 | 네이버지도 | 카카오맵  | Running Map |
|---------|--------|-------|-------|-------------|
| FCP     | 1.5s   | 0.5s  | 0.5s  | 2.7s        |
| SI      | 2.1s   | 2.7s  | 2.5s  | 2.8s        |
| LCP     | 1.8s   | 1.5s  | 1.4s  | 2.8s        |
| TTI     | 1.9s   | 1.1s  | 0.7s  | 2.8s        |
| TBT     | 200ms  | 0ms   | 0ms   | 50ms        |
| CLS     | 0.001  | 0.006 | 0.039 | 0.004s      |

* 용어
    * FCP(First Contentful Paint): 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타낸다.
    * SI(Speed Index): 콘텐츠가 얼마나 빨리 표시되는지 로드 성능을 보여준다.
    * LCP(Largest Contentful Paint): 최대 텍스트 또는 이미지가 표시되는 시간을 나타낸다.
    * TTI(Time to Interactive): 페이지가 사용자와 상호작용할 수 있게 될 때까지 걸리는 시간이다.
    * TBT(Total Blocking Time): FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현된다.
    * CLS(Cumulative Layout Shift): 표시 영역 안에 보이는 요소의 이동을 측정한다.

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   |         | Mobile | Desktop |
   |---------|--------|---------|
   | FCP     | 3.6s   | 0.83s  |
   | SI      | 8.23s  | 2.65s  |
   | LCP     | 7.1s   | 2.35s  |
   | TTI     | 6.83s  | 2.35s  |
   | TBT     | 630ms  | 100ms  |
   | CLS     | 0.012  | 0.015  |
경쟁 3사의 평균으로 잡았습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
* Lighthouse 성능 감사에서 80 점 이상을 받기 위하여 아래 내용을 개선한다.
    * 텍스트 압축 사용 (예상 절감치: 9.15 s)
    * 사용하지 않는 자바스크립트 줄이기 (예상 절감치: 3.45 s)
    * 렌더링 차단 리소스 제거하기 (예상 절감치: 0.75 s)
    * 콘텐츠가 포함된 최대 페인트 이미지 미리 로드 (예상 절감치: 0.48 s)
    * 사용하지 않는 CSS 줄이기
* vendor.js 크기가 2.2MB로 1MB안으로 줄이도록 개선한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
-[x] 부하 테스트
    -[x] 테스트 전제조건 정리
        -[x] 대상 시스템 범위
        -[x] 목푯값 설정 (latency, throughput, 부하 유지기간)
        -[x] 부하 테스트 시 저장될 데이터 건수 및 크기
    -[x] 아래 시나리오 중 하나를 선택하여 스크립트 작성
        -[x] 접속 빈도가 높은 페이지 - 메인페이지 조회, 경로검색페이지 조회, 경로조회
        -[ ] 데이터를 갱신하는 페이지
        -[ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    -[x] Smoke, Load, Stress 테스트 후 결과를 기록


1. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 대상 시스템 범위
    - 메인페이지 이동
    - 경로검색페이지 이동
    - 경로 조회

- Throughput
    - DAU : [50만]
        - 경쟁사 DAU (22년 8월 기준)
            - 네이버지도 : 2129만(MAU) => 70만
            - 카카오맵 : 950만(MAU) => 30만
            - 참고 ) https://biz.chosun.com/it-science/ict/2022/09/27/I2476GC4KRBOXLT546RZOBYZQA/
        - 목표 DAU : 경쟁사 평균인 50만
    - 1일 평균 접속수 : [3.4회]
        - 경쟁사 일간 평균 실행 횟수
            - 카카오맵 : 3.4회
            - 참고 ) https://ko.lab.appa.pe/2016-09/kakao-korea.html
    - 집중률 : 약 [3.3배] 지하철 총 사용인원 비율로 측정
        - 평소 : 300,000
        - 최대 : 1,000,000
        - 참고 ) https://www.bigdata-map.kr/datastory/traffic/seoul
    - 평균 rps : [19.67]
      - 1일 사용자 수 * 1명당 1일 평균 접속 수 / 86400(초/일) = 1일 평균 rps
      - 500,000 * 3.4 / 86400 = 19.67
    - 최대 rps : [60]
      - 평균 rps * 집중률 = 1일 최대 rps
      - 19.67 * 3.3 = 64.91
      
- VUSER 구하기
    - T = 3 * 0.5 + 1(a) => 2.5
    - 평균 VUSER = 19.67 * 2.5 / 3.4 -> [14.46]
    - 최대 VUSER = 64.91 * 2.5 / 3.4 -> [47.73]


2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - src/k6 폴더 하위에 넣어두었습니다.

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
