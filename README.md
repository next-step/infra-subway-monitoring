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
자세한 내용은 [웹 성능 측정 결과지](/performance/22-08-25/performance.md)를 참고.  
요약: page-speed, desktop 기준으로 설정한다면, 
    
    | site       | Score | 기준  | AS-IS  | TO-BE       |
    |------------|-------|-----|--------|-------------|
    | 메인페이지 /    | > 80  | LCP | 2.8 s  | 1.7 s       |
    | 경로검색 /path | > 80  | TTI | 2.24 s | 0.7 ~ 1.0 s |

   - 사용자에게 컨텐츠가 빠르게 노출되는 게 중요할 때 : `LCP` ( 메인페이지 ) : 1.7 s
   - 사용자가 관련 링크를 빠르게 클릭하는 것이 중요할 때 : `TTI` (경로 찾는 페이지) :  0.7 s ~ 1 s

<br>

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 효율적인 캐시 정책 사용 → 정적인 애셋 제공
       - 페이지별 사용하는 js 만 로드되도록 수정
       - css 파일 별도 분리
       - 캐싱 가능한 정적파일 캐싱되도록. (이미지, css..)

   - 텍스트 압축 사용  
     총 네트워크 바이트를 최소화하려면 텍스트 기반 리소스를 압축(gzip, deflate, brotli)
       - [/js/vendors.js](https://mand2-infra-subway.kro.kr/js/vendors.js)
       - [/js/main.js](https://mand2-infra-subway.kro.kr/js/main.js)
       - [/images/logo_small.png](https://mand2-infra-subway.kro.kr/images/logo_small.png)

   - 사용하지 않는 자바스크립트 줄이기
       - [/js/vendors.js](https://mand2-infra-subway.kro.kr/js/vendors.js)
       - [/js/main.js](https://mand2-infra-subway.kro.kr/js/main.js)

   - 렌더링 차단 리소스 제거하기  
     페이지의 첫 페인트 차단(= 블록킹) 인 리소스 삭제  
       - [/css?family=Roboto:100,300,400,500,700,900](https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900)
       - […css/materialdesignicons.min.css](https://cdn.jsdelivr.net/npm/@mdi/font@5.0.45/css/materialdesignicons.min.css)

   - 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인하기  
     웹폰트가 로드되는 동안 사용자에게 텍스트가 표시되도록 글꼴 표시 CSS 기능을 사용

<br>

---

### 2단계 - 부하 테스트 

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

- Throuput   : `1일 평균 rps` 5.5 | `1일 최대 rps` 55    
  값 추출방식: 기존 공유받은 (2021.09 기준) MAU값에서 추출.   
  네이버지도 1억 DAU ⇒ 카카오맵 4,751 만 추측 (1억 * 917만 / 1930만)     
  👀 우리 앱 사용자 수 = 카카오맵의 1%만 사용한다고 추측 : 4.751 만  
  1일 총 접속 수 = (DAU) x 1명당 1일 평균 접속 수 = 47.510 만  
  `1일 평균 rps` 1일 총 접속 수 / 86,400 (초/일) = 5.4988 ~= 5.5   
  `1일 최대 rps` 1일 평균 rps * (최대 트래픽 / 평소 트래픽) ~= 55  

- Latency       : 100ms (일반적으로 50~100ms)   
- 부하 유지기간 : 35 min  
- 피크시간대 집중률: 10 (`데이터로 보는 서울시 대중교통 이용` 참고) 

부하 테스트 시 저장될 데이터 건수 및 크기

- http_req_duration = 200ms
- T(VU iteration)  
  = 요청 건수(R) * `http_req_duration` + 지연시간(내부망에서 테스트할 경우 예상 latency를 추가한다)  
  = (2 * 0.2s) + 1s = 1.4s

- **목표 VUSER**
    - 평균  
      = (목표 rps * T) / R  
      = 55 * 1.4s / 2  
      = **38.5**  
    - 최대  
      =  평균 VU * 피크시간대집중률  
      = 38.5 * 10  
      = **385** 


2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

대상 시스템 범위 (시나리오 범위)
- 접속 빈도가 높은 페이지 : 메인 페이지
- 데이터를 갱신하는 페이지 : 즐겨찾기 등록
- **데이터를 조회하는데 여러 데이터를 참조하는 페이지 : 경로 검색**   
  시나리오 선택!!🔥

스크립트와 결과
- 스크립트 : /scripts/k6/search-path/ 아래에 있음.  
- 결과    : /scripts/k6/search-path/img/

<br> 

참고: 중복되는 메서드들이 있어서 **공통 모듈**로 빼냄.  
보는 순서: 
1. smoke-no-login  : 예제 스크립트처럼 한 스크립트 내에 다 같이 있음.
1. smoke-login-1   : 로그인만 하는 부분만 모듈화 
1. smoke-login-2   : 로그인 후 경로검색하는 부분까지 한번에 모듈화


<br>

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요


<br>
