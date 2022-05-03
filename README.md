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

#### 주요 페이지 선정

- 경로 검색 페이지 ( [https://devrunner21.kro.kr/path](https://devrunner21.kro.kr/path) )

#### 경쟁사와 성능 비교

- 데스크톱

    |  | 지하철 노선도 | 네이버 지도 | 서울교통공사 |
    | --- | --- | --- | --- |
    | 성능 | 65 | 90 | 69 |
    | First Contentful Paint | 2.9초 | 0.5 초 | 1.6 초 |
    | Time to Interactive | 2.9 초 | 0.5 초 | 2.0 초 |
    | Speed Index | 2.9 초 | 2.2 초 | 2.3 초 |
    | Total Blocking Time | 10 밀리초 | 0 밀리초 | 120 밀리초 |
    | Largest Contentful Paint | 2.9 초 | 1.5 초 | 3.6 초 |
    | Cumulative Layout Shift | 0 | 0.006 | 0.013 |
  
- 모바일

    |  | 지하철 노선도 | 네이버 지도 | 서울교통공사 |
    | --- | --- | --- | --- |
    | 성능 | 43 | 61 | 36 |
    | First Contentful Paint | 16.2 초 | 2.0 초 | 6.9 초 |
    | Time to Interactive | 16.9 초 | 6.5 초 | 8.9 초 |
    | Speed Index | 16.2 초 | 5.7 초 | 8.6 초 |
    | Total Blocking Time | 190 밀리초 | 240 밀리초 | 650 밀리초 |
    | Largest Contentful Paint | 16.2 초 | 7.6 초 | 6.9 초 |
    | Cumulative Layout Shift | 0.004 | 0.03 | 0 |

#### 우선순위 결정

![image](https://user-images.githubusercontent.com/78334008/165176902-20b00916-5ae0-45c0-84e5-ffd4a71544d8.png)

- 대상 페이지에는 큰 이미지 렌더링이 없다.
- 별도의 많은 필터조건이 없기 때문에 한번 검색하면 조건변경 후 재검색의 확률이 적을 것으로 예상됨
- 검색 시 페이지 응답을 빠르게 가져가는게 좋다고 판단함
- 우선순위
    - SI
    - FCP
    - LCP
    - TTI
    - TBT
    
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    
    - 주 경쟁사(네이버지도)를 바탕으로 근사한 값으로 산정
    - 데스크톱
    
        |  | 목표 | 네이버 지도 |
        | --- | --- | --- |
        | 성능 | 80 | 90 |
        | First Contentful Paint | 1.5초 | 0.5 초 |
        | Time to Interactive | 1 초 | 0.5 초 |
        | Speed Index | 2.2 초 | 2.2 초 |
        | Total Blocking Time | 5 밀리초 | 0 밀리초 |
        | Largest Contentful Paint | 1.5 초 | 1.5 초 |
        | Cumulative Layout Shift | 0 | 0.006 |
      
    - 모바일
    
        |  | 목표 | 네이버 지도 |
        | --- | --- | --- |
        | 성능 | 60 | 61 |
        | First Contentful Paint | 3 초 | 2.0 초 |
        | Time to Interactive | 6.5 초 | 6.5 초 |
        | Speed Index | 6 초 | 5.7 초 |
        | Total Blocking Time | 190 밀리초 | 240 밀리초 |
        | Largest Contentful Paint | 8 초 | 7.6 초 |
        | Cumulative Layout Shift | 0.004 | 0.03 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - Gzip 압축을 통해 콘텐츠 크기를 줄여서 렌더링 속도를 향상시켜야 한다.
    - 중요도가 낮은 JS/CSS를 지연로딩해서 첫 페이지 렌더링 속도를 증가시킨다.


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

- [x] 대상 시스템 범위
  - 어플리케이션 서버
  - DB
    
- [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
  
  1. 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
     - 경쟁사 지표 (네이버 지도) [참고링크](https://www.sedaily.com/NewsVIew/22RH3PUBN6)
       - MAU = 13920000
       - DAU = MAU/30 = 464000
     - 지하철 노선도 서비스 추측 DAU = 464000

  2. 피크 시간대의 집중률을 예상해봅니다. (최대 트래픽 / 평소 트래픽)
     - 출퇴근 시간대를 피크 시간대로 가정한다.
     - 최대 트래픽 = 평소트래픽 * 10
     - 피크시간 = 출퇴근시간 = 2시간 * 2 = 4h ( 요약해서 40분 정도만 측정 예정 )
     
  3. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
     - 1일 평균 접속 수 = 2회
     - 1일 평균 요청 수 = 로그인(1회) + 경로검색 페이지에서 역 목록 조회(1회) + 경로 검색(1회)
        - 메인페이지는 정적컨텐츠 말고는 서버에서 받는 데이터는 없음 -> 따라서 요청수에 넣지 않는다,
        - 대부분의 요청은 노선검색이라고 가정한다.

  4. 이를 바탕으로 Throughput을 계산합니다.
     - 1일 총 접속 수 = 1일 사용자 수(DAU) * 1명당 1일 평균 접속 수 = 464000 * 2 = 928000
     - 1일 평균 rps =  1일 총 접속 수 / 86400 (초/일) = 10.7407... = 11
     - 1일 최대 rps = 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 11 * ( 10 / 1 ) = 110
      
  5. Latency 결정하기
     - 100ms
    
  6. VUSer 수 구하기
    - 메인 페이지
      - 시나리오 상 요청 수 = 로그인 요청 (1회) + 사용자 정보 요청 (1회) = 2
      - T = (R * http_req_duration) = 2 * (0.1s * 2) = 0.4s
      - 평균 VUser = (목표 rps * T) / R =  ( 11 * 0.4 ) / 2 = 2.2 = 2
      - 최대 VUser = (목표 rps * T) / R =  ( 110 * 0.4 ) / 2 = 22

    - 노선관리 페이지
      - 시나리오 상 요청 수 = 노선조회 (1회) + 노선 정보 수정(1회) + 노선조회(1회) = 3
      - T = (R * http_req_duration) = 1 * (0.1s * 3) = 0.3s
      - 평균 VUser = (목표 rps * T) / R =  ( 11 * 0.3 ) / 2 = 1.65 = 2
      - 최대 VUser = (목표 rps * T) / R =  ( 110 * 0.3 ) / 2 = 16.5 = 17
        
    - 경로 검색 페이지
      - 시나리오 상 요청 수 = 역 목록 조회(1회) + 경로검색 (1회)  = 1 
      - T = (R * http_req_duration) = 2 * (0.1s * 2) = 0.4s
      - 평균 VUser = (목표 rps * T) / R =  ( 11 * 0.4 ) / 2 = 2.2 = 2
      - 최대 VUser = (목표 rps * T) / R =  ( 110 * 0.4 ) / 2 = 22
      
  7. 사용자가 검색하는 데이터의 양, 갱신하는 데이터의 양 등을 파악해둡니다.

- [ ] 부하 테스트 시 저장될 데이터 건수 및 크기

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    
    - 접속 빈도가 높은 페이지 (메인 페이지)
        - [smoke](src/main/resources/부하테스트/접속량_빈도가_높은_페이지/main-page-smoke.js)
        - [load](src/main/resources/부하테스트/접속량_빈도가_높은_페이지/main-page-load.js)
        - [stress](src/main/resources/부하테스트/접속량_빈도가_높은_페이지/main-page-stress.js)

    - 데이터를 갱신하는 페이지 (노선수정 페이지)
        - [smoke](src/main/resources/부하테스트/데이터를_갱신하는_페이지/lines-manage-page-smoke.js)
        - [load](src/main/resources/부하테스트/데이터를_갱신하는_페이지/lines-manage-page-load.js)
        - [stress](src/main/resources/부하테스트/데이터를_갱신하는_페이지/lines-manage-page-stress.js)

    - 데이터를 조회하는데 여러 데이터를 참조하는 페이지 ( 경로 검색 페이지 )
        - [smoke](src/main/resources/부하테스트/데이터를_조회하는데_여러_데이터를_참조하는_페이지/path-search-page-smoke.js)
        - [load](src/main/resources/부하테스트/데이터를_조회하는데_여러_데이터를_참조하는_페이지/path-search-page-load.js)
        - [stress](src/main/resources/부하테스트/데이터를_조회하는데_여러_데이터를_참조하는_페이지/path-search-page-stress.js)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
