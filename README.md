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

- FCP : 첫 텍스트, 이미지 표시되는데 걸린 시간
- TTI : 사용자와 상호 작용할 수 있게 된 시간
- SI : 페이지 콘텐츠가 얼마나 빨리 표시되는지
- TBT : FCP와 TTI사이 모든 시간의 합
- LCP : 가장 큰 텍스트, 이미지 표시 시간
- CLS : 요소들이 얼마나 이동하는지에 대한 정보

https://toughchb.kro.kr/

|         | 성능점수 | FCP   | TTI   | SI    | TBT   | LCP   | CLS   |
|---------|------|-------|-------|-------|-------|-------|-------|
| 휴대전화|  33  | 14.6s | 15.5s | 14.6s | 490ms | 15.2s | 0.041 |
| 데스크탑    |68|2.6s|2.7s|2.6s| 50ms  |2.7s|0.004|

http://www.seoulmetro.co.kr/kr/cyberStation.do

|      | 성능점수 | FCP      | TTI | SI   | TBT   | LCP  | CLS   |
|---|------|----------|---|------|-------|------|-------|
|휴대전화| 45   | 7.1s     |8.8s| 8.9s | 280ms | 8.8s | 0     |
|데스크탑| 66   | 1.6s |2.1s| 2.6s | 160ms |3.6s| 0.014 |


https://m.map.naver.com/subway/subwayLine.naver?region=1000

|      | 성능점수 | FCP  | TTI  | SI   | TBT   | LCP  | CLS   |
|---|------|------|------|------|-------|------|-------|
|휴대전화| 61   | 2.1s | 6.5s | 5.8s | 200ms | 8.0s | 0.03  |
|데스크탑| 89   | 0.5s | 0.7s | 2.5s | 0ms | 1.6s | 0.006 |

https://m.map.kakao.com/

|      | 성능점수 | FCP  | TTI  | SI   | TBT  | LCP  | CLS   |
|---|------|------|------|------|------|------|-------|
|휴대전화| 68   | 1.7s | 4.1s | 7.0s | 60ms | 6.4s | 0.005 |
|데스크탑| 93   | 0.5s | 1.0s | 2.5s | 10ms | 1.0s | 0.003 |


지하철 노선도의 조회가 서비스의 주목적이므로 시간지표에 가장큰 영향을 주는 FCP, TTI 를 우선순위로 둠
경쟁사 대비 성능 20% 이상 차이나지 않도록 
* FCP **2.04s** 
* TTI **4.92s** 

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 총 네트워크 바이트를 최소화하려면 텍스트 기반 리소스를 압축 (/js/vendors.js, /js/main.js)
- 콘텐츠가 포함된 최대 페인트 이미지 미리 로드
  - HTTP 캐싱을 사용하여 정적 리소스를 캐시
  - CDN 서버 활용
- 렌더링 차단 리소스 제거하기
  - 중요한 JS/CSS를 인라인으로 전달
  - 중요하지 않은 모든 JS/Style을 지연
  
---

### 2단계 - 부하 테스트
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
   WEB, WAS, DB
- 목푯값 설정
2022년 서울 지하철 1일 승객수 700만 (https://www.yna.co.kr/view/AKR20220512002200004)
- dau : 70만 (총 이용 승객수의 10%라고 가정)
- 1인당 1일 평균 접속 수 : 4
- 1일 총 접속 수 : 280만
- 1일 평균 rps : 32 = 280만 / 86400
- 1일 최대 rps : 128 = 32 * 4 (집중률이 4배라고 가정)
- Throughput : 32 ~ 128
- latency : 100ms 이하
- 
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   테스트 시나리오: 메인 페이지 접속 -> 로그인 -> 나의 정보 수정 -> 경로 검색
- VUsers
  - R = 4
  - 왕복시간이 0.5s, 지연시간이 1s 라고 가정 
    - T = (4 * 0.5) + 1 = 3
  - 평균 VUsers : (평균 rps: 32 * 3) / 4 = 24
  - 최대 VUsers : (최대 rps: 128 * 3) / 4 = 96
  
- 결과
  - load test
    - 부하 유지 시간 : 20분
    - VUsers : 24 ~ 96
    - http_request_fail : 0.0%
    - latency :
      - http_req_duration : 21.81ms
  - stress test
    - http_request_fail : 8.84%
    - vus 290, rps 1000대를 넘어가는 기점으로 에러 발생
    - latency :
      - http_req_duration : 25.6s
  - 테스트 infra spec : t3.medium 1대,
```
$ lscpu
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
CPU(s):              2
On-line CPU(s) list: 0,1
Thread(s) per core:  2
Core(s) per socket:  1
Socket(s):           1
NUMA node(s):        1
Vendor ID:           GenuineIntel
CPU family:          6
Model:               85
Model name:          Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz
Stepping:            7
CPU MHz:             2499.998
BogoMIPS:            4999.99
Hypervisor vendor:   KVM
Virtualization type: full
L1d cache:           32K
L1i cache:           32K
L2 cache:            1024K
L3 cache:            36608K
```
```
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           3.8G        400M        1.6G        788K        1.7G        3.1G
Swap:            0B          0B          0B
```
---

### 3단계 - 로깅, 모니터링

#### 요구 사항
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
  - 근거 로그
```shell
2022-06-20 16:07:33.025 ERROR 12474 --- [nio-8080-exec-1] o.h.engine.jdbc.spi.SqlExceptionHelper   : Function "SLEEP" not found; SQL statement:
SELECT * FROM line WHERE SLEEP(3) [90022-200]
2022-06-20 16:07:33.030 ERROR 12474 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.springframework.dao.InvalidDataAccessResourceUsageException: could not prepare statement; SQL [SELECT * FROM line WHERE SLEEP(3)]; nested exception is org.hibernate.exception.SQLGrammarException: could not prepare statement] with root cause

org.h2.jdbc.JdbcSQLSyntaxErrorException: Function "SLEEP" not found; SQL statement:
SELECT * FROM line WHERE SLEEP(3) [90022-200]
```
- [ ] 로그 설정하기
  - [ ] Application Log 파일로 저장하기
    - 회원가입, 로그인 등의 이벤트에 로깅을 설정
    - 경로찾기 등의 이벤트 로그를 JSON으로 수집
  - [ ] Nginx Access Log 설정하기
- [ ] Cloudwatch로 모니터링
  - [ ] Cloudwatch로 로그 수집하기
  - [ ] Cloudwatch로 메트릭 수집하기
  - [ ] USE 방법론을 활용하기 용이하도록 대시보드 구성
  
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
