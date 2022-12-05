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

#### Running map site
- https://programmer-sjk.o-r.kr

### 1단계 - 웹 성능 테스트

#### 용어 정리
- FCP: 첫번째 텍스트 혹은 이미지가 표시되는 시간
- TTI: 사용할 수 있을때까지 걸리는 시간으로 완전히 페이지와 상호작용하는 시점
- SI: 페이지의 컨텐츠가 얼마나 빨리 표시되는지 보여준다
- TBT: FCP와 상호작용 시간 사이의 모든 시간의 합
- LCP: 최대 텍스트 혹은 이미지가 표시되는 시간
- CLS: 표시 영역 안에 보이는 요소의 이동을 측정

#### 경쟁사 분석

| mobile | 서울교통공사 | 네이버지도 | 카카오맵 | Running Map |
|--------|----|-------|------|------|
| FCP    | 6.8s | 2.3s  | 1.7s | 16.4s |
| TTI    | 8.5s | 6.8s  | 4.9s | 17.2s |
| SI     | 9.6s | 5.3s  | 6.3s | 16.4s |
| TBT    | 360ms | 580ms | 220ms | 260ms |
| LCP    | 7.3s | 7.6s  | 6.9s | 16.4s |
| CLS    | 0  | 0.03  | 0.005 | 0.004 |

| desktop | 서울교통공사 | 네이버지도 | 카카오맵  | Running Map |
|---------|-------|-------|-------|------|
| FCP     | 1.5s  | 0.5s  | 0.5s  | 3.0s |
| TTI     | 2.2s  | 0.6s  | 0.7s  | 3.3s |
| SI      | 3.2s  | 2.3s  | 2.4s  | 3.0s |
| TBT     | 430ms | 0ms   | 0ms   | 40ms |
| LCP     | 2.6s  | 1.5s  | 1.4s  | 3.0s |
| CLS     | 0.001 | 0.006 | 0.039 | 0    |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 경쟁사 지표 중, 가장 빠른 성능들을 기준으로 잡았습니다.
- 기준들 중에 우선적으로 성능 개선이 필요한 부분입니다.
  - FCP: 접속 후 화면에 빠르게 렌더링 되어야 하기 때문에 우선순위가 높습니다.
  - TTI: 경로 검색이 주요 서비스이기 때문에 접속 후, 빠르게 경로 검색을 할 가능성이 높습니다. 
  따라서 빠르게 사용가능하도록 우선순위를 높게 잡았습니다.
  
   |     | mobile | desktop |
   |----|---------|-------  |
   | FCP | 1.7s | 0.5s    |
   | TTI | 4.9s | 0.6s    |
   | SI  | 5.3s | 2.3s    |
   | TBT | 220ms | 0ms     |
   | LCP | 6.9s | 1.4s    |
   | CLS | 0  | 0.001   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- RunninMap에서 경로 조회했을 때 api응답 속도와 경쟁사중 제일 빠른 카카오맵에서 api 응답속도를
비교헀을 떄 카카오처럼 경로 검색 시 120ms는 나와야 웹 성능 예산을 맞출 수 있을 것 같습니다.

- **목표 API 응답 속도**: 120ms
- **개선할 부분**
  - 텍스트 압축 (1.48s 개선 예상)
  - 사용하지 않는 자바스크립트 줄이기 (0.5s 개선 예상)
  - 렌더링 차단 리소스 제거하기 (0.4s 개선 예상)
- **LCP 개선** (LCP가 유독 높기 떄문에 개선 방법을 정리)
  - 브라우저가 서버로부터 콘텐츠를 받는데 걸리는 시간이 오래 걸릴수록 렌더링하는데 더 오래 걸립니다.
  따라서 아래와 같이 Time To First Byte(TTFB)를 개선해야 합니다.
    - 가까운 CDN을 사용한다.
    - 자원을 캐시한다.
    - HTML 페이지를 우선 캐시되도록 한다.
  - HTML 파서가 외부 스타일 시트나 동기적인 자바스크립트 태그를 만나면 블로킹되어 LCP를 지연시킵니다.
  따라서 아래와 같은 개선점을 적용할 수 있습니다.
    - CSS를 최소화한다
    - 중요하지 않은 CSS는 지연시킨다.
    - 자바스크립트 파일을 최소화하고 압축시킨다
    - 사용하지 않는 자바스크립트는 지연시키고, 폴리필을 최소화한다.
  - LCP에 영향을 주는 엘리먼트 타입(img, svg, video)을 아래와 같이 개선합니다.
    - 이미지를 최적화 및 압축한다.
    - 중요한 리소스는 미리 로드한다.
    - 텍스트 파일을 압축한다.
    - 리소스르 캐시한다.
  - 클라이언트 사이드 렌더링(CSR)을 사용할 경우, 용량이 큰 자바스크립트 번들이 
  LCP에 영향이 있을 수 있기 때문에 아래와 같은 개선점을 찾을 수 있다.
    - 핵심 자바스크립트를 최소화한다.
    - 서버 사이드 렌더링(SSR)을 적용한다.
    - 사전 렌더링한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

#### 목표 RPS 구하기
- 예상 1일 사용자 수(DAU)를 정해봅니다.
  - 1,000,000 (백만명) 
- 피크 시간대의 집중률을 예상해봅니다. (최대 트래픽 / 평소 트래픽)
  - 3  
- 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
  - 3 
- Throughput을 계산합니다.
 - 하루 총 접속 수(DAU * 평균접속수) = 3,000,000  
 - 하루 평균 rps(하루총접속수 / 86400) = 35rps
 - 하루 최대 rps(하루평균rps * (최대 트래픽 / 평소 트래픽)) = 105rps

#### VUser 구하기
- R = 3 
- T = (3 * 0.5 (http_req_duration) + 0) = 1.5
- 평균 VUser = (35 * 1.5) / 3 = 17
- 최대 Vuser = (105 * 1.5) / 3 = 87

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- 스크립트 위치: k6/scripts
- 테스트 결과 위치: k6/result

---

### 3단계 - 로깅, 모니터링

#### 요구사항
- 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- 로그 설정하기
- Cloudwatch로 모니터링

#### 요구사항 설명
- 저장소를 활용하여 아래 요구사항을 해결합니다.
- README 에 있는 질문에 답을 추가한 후 PR을 보내고 리뷰요청을 합니다.

#### 로그 설정하기
- Application Log 파일로 저장하기
  - 회원가입, 로그인 등의 이벤트에 로깅을 설정
  - 경로찾기 등의 이벤트 로그를 JSON으로 수집
- Nginx Access Log 설정하기

#### Cloudwatch로 모니터링
- Cloudwatch로 로그 수집하기
- Cloudwatch로 메트릭 수집하기
- USE 방법론을 활용하기 용이하도록 대시보드 구성

#### 미션 구현 목록
- [x] README.md 요구사항 작성
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] nginx access log 설정
- [x] 회원가입, 로그인 로깅을 파일로 저장
- [x] 경로찾기 등의 이벤트 로그를 JSON으로 수집
- [x] Cloudwatch로 로그 수집하기
- [x] Cloudwatch로 메트릭 수집하기
- [ ] USE 방법론을 활용하기 용이하도록 대시보드 구성
- [ ] README.md 답변 작성

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
