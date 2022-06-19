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
   
   1. 나의 사이트
      1. PC

            | 사이트                   | FCP  | TTI  | SI   | TBT  | LCP  |   CLS  | Score |
            |------|------|------|------|------|-------|-------|  -----   |
            | tj3828.p-e.kr/path  | 2.9s | 2.9s | 2.9s | 10ms | 2.9s |  0  | 66    |
      2. 모바일
      
         | 사이트                   | FCP   | TTI   | SI    | TBT | LCP   |   CLS   | Score |
         |-------|-------|-------|-----|-------|--------|-------|  -----   |
         | tj3828.p-e.kr/path  | 16.1s | 16.1s | 16.1s | 0ms | 16.1s |  0.004  | 46     |
   
   2. 타사 사이트
      1. PC
      
         | 사이트                   | FCP  | TTI   | SI   | TBT  | LCP  | CLS    | Score |
         |------|-------|------|------|------|--------|-------|  -----   |
         | 서울교통공사  | 1.7s | 1.9s  | 3.5s | 10ms | 3.4s | 0      | 67    |
         | 네이버지도  | 0.5s | 0.7s  | 2.1s | 0ms  | 1.6s | 0.006  | 90    |
         | 카카오맵  | 0.5s | 1.0.s | 2.1s | 20ms | 1.3s | 0.0039 | 92    |
      2. 모바일

         | 사이트                   | FCP  | TTI  | SI    | TBT   | LCP  | CLS   | Score |
         |------|------|-------|-------|------|-------|-------|  -----   |
         | 서울교통공사  | 6.5s | 8.5s | 10.9s | 290ms | 6.9s | 0     | 45    |
         | 네이버지도  | 2.1s | 6.5s | 5.6s  | 190ms | 7.6s | 0.03  | 63    |
         | 카카오맵  | 1.7s | 4.4s | 6.0s  | 100ms | 5.0s | 0.005 | 74     |
      
   3. 측정 사이트
      - pagespeed.web.dev 사이트 기준 측정
      
   4. 성능 예산
      - PC 기준으로 타사 사이트의 최고점 기준 성능차이 20% 미만으로 유지
      - 지하철 경로 검색 기능 특성상 FCP보다 TTI 지표 우선 순위로 단축
      - 시간 : FCP 1초 , TTI 1초 미만
      - 규칙 : 타사 사이트의 최대치 92의 20% 미만으로 유지(74점 이상)
      - 성능 : 압축된 리소스 최대 크기 200KB 미만, 
      

3. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   1. js파일의 로딩 성능을 증가시킨다.
      - 필요없는 파일은 삭제.
      - 텍스트 압축
   2. 캐시 정책 적용
      - `Cache-Control `HTTP 응답 헤더를 반환하도록 구성
   3. css 렌더링 차단 리소스 제거
      - `<script>` 태그이며, `<head>` 태그 안에 있고 defer 또는 async 속성이 없는 스크립트
      - `<link rel="stylesheet">` 태그이며, `disabled` 속성이 없거나 `media` 속성이 없거나 `media="all"`일 경우
   4. 불필요한 폰트 파일 로딩 삭제
   5. api 응답시간이 긴 서버 점검

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 테스트 조건
        - 대상 시스템 범위
            - nginx, was, web application, db
        - 목푯값 설정 (성능지표에서 가장 우수한 카카오맵 2016년 지표 기준)
            - 예상 1일 사용자수(DAU) : 150만(카카오맵 DAU 250만 기준 절반)
            - 예상 1일 평균 접속 수 : 3 (카카오맵 1일 평균 접속 수와 동일)
            - 예상 1일 총 접속 수 : 450만 (DAU * 1일 평균 접속 수)
            - 예상 1일 평균 rps : 52 (1일 총 접속 수 / 86400)
            - 예상 1일 최대 rps : 104 (지하철 비지니스 특성상 이벤트 성으로 트래픽이 갑자기 증가할 날은 없기 때문에 평균 rps 대비 2배)
            - Latency : 100ms 이하
        - 저장된 데이터 건수 및 크기 (SELECT table_name, table_rows FROM information_schema. tables WHERE table_schema = 'subway' ORDER BY table_name;)
          - line : 21
          - section : 340
          - station : 616
          - member : 1
        - 개인 PC에 k6, grafana 셋팅 후 실제 사용자와 동일한 환경으로 테스트 진행
      

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - 메인페이지 -> 로그인 요청 -> 내 정보 조회 -> 경로 찾기 페이지 -> 경로 조회
    - VUSER가 300 근처에서 에러 발생(EOF)
    - CPU 최대 평균 30%
    - [Script / image](./script)
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
