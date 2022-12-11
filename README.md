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

### 요소 개념 정리
- FCP(First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- TTI(Time to Interactive) : 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- SI(Speed Index) : 페이지 콘텐츠가 보여지는 평균시간 (view port 사이즈에 의존)
- TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현
- LCP(Large Contentful Paint) : 최대 텍스트 또는 이미지가 표시되는 시간
- CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정

### 성능비교 - PagesSpeed Mobile 기준
|   사이트   | FCP    | TTI    | SI     | TBT     | LCP    |  CLS  |
|----------|--------|--------|--------|---------|--------|-------|
|   러닝맵   | 14.9 초 | 15.5 초 | 14.9 초 | 600 밀리초 | 15.5 초 | 0.042 |
| 서울교통공사 | 6.4 초  | 8.4 초  | 11.1 초 | 670 밀리초 | 6.9 초  |   0   |
|  네이버지도 | 2.4 초  | 6.3 초  | 5.8 초  | 540 밀리초 | 8 초    |  0.03  |

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- (FCP)모바일에선 빠른 응답이 중요하기 때문에 서울 교통공사와 네이버의 평균치를 잡기 보단 네이버에 가까워질 수 있도록 한다.
- (TTI)사용자는 러닝맵 지하철 서비스에서 Viewing보단 실제 Action을 해야 하는 것들이 많고 아직 기능을 제공하는 js가 네이버보다 크지 않을 것이므로 네이버 보다 빠른 속도를 제공해야 한다.
- 
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- PagesSpeed의 제안에 따르면
  1) 텍스트 압축 - 9.3초
  2) 사용하지 않는 자바스크립트 줄이기 - 3.45초
  약 12.7초를 단축할 수 있다.

두 가지 단축으로 FCP, LCP가 줄어들게 되면 TTI/SI 또한 비례하여 증가할 것으로 예상되므로
제안 반영과 같이 감소할 것이라 가정하고, 마진을 적용하여 모든 지표가 3초 이하가 될 수 있도록 한다.

| 구분    | FCP    | TTI    | SI     | LCP    |
|-------|--------|--------|--------|--------|
| 러닝맵   | 14.9 초 | 15.5 초 | 14.9 초 | 15.5 초 |
| 제안 반영 | 2.2 초  | 2.8 초  | 2.2 초  | 2.8 초  |
| 목표치   | 2.2 초  | 3 초    | 3 초    | 3 초    |

추가로 렌더링 차단 리소스가 존재하는데, TTI를 중요 우선 순위로 선정하였으므로
PagesSpeed의 제안에 따라 반영하면 약 0.75초를 줄일 수 있다.
그래서 최종으로 TTI를 최소화 할 수 있도록 한다.

| 구분    | FCP    | TTI    | SI     | LCP    |
|-------|--------|--------|--------|--------|
| 러닝맵   | 14.9 초 | 15.5 초 | 14.9 초 | 15.5 초 |
| 제안 반영 | 2.2 초  | 2.05 초 | 2.2 초  | 2.8 초  |
| 목표치   | 2.2 초  | 2.1 초  | 3 초    | 3 초    |
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 하루 지하철 사용자: `약 1500만 명`(ref: [데이터로 보는 서울시 대중교통 이용](https://www.bigdata-map.kr/datastory/traffic/seoul))
- 하루 지하철 사용자 대비 퍼센트를 지정할 수도 있지만, reference에 따르면 명확히 peak time과 아닐 때가 구분되고 있음
- peak time: 1_000_000명 (1시간 기준)
- average time: 400_000명 (1시간 기준)
- 해당 시간별 이용자 수 중, 우리 앱을 이용하는 사람은 20%일 것이라 가정(네이버 50%/카카오30%)
- 1일 평균 rps : 44 (400_000(명) * 2(번요청) * 0.2 / 3600s)
- 1일 최대 rps : 110 (44 * 1_000_000 / 400_000);

- VUser 구하기
  - R: 1 (path 검색 1회)
  - http_req_duration: 0.5s
  - T: 1.5(1 * 0.5s + 1s)
  - 목표 rps: 150 (향후 이벤트를 고려하여 margin 확보) 
  - VUser: 225(150 * 1.5 / 1);

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
### smoke
````
  scenarios: (100.00%) 1 scenario, 2 max VUs, 1m32s max duration (incl. graceful stop):
  * default: Up to 2 looping VUs for 1m2s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m02.0s), 0/2 VUs, 1005 complete and 0 interrupted iterations
default ✓ [======================================] 0/2 VUs  1m2s

     ✓ is success

     checks.........................: 100.00% ✓ 1005      ✗ 0   
     data_received..................: 4.4 MB  72 kB/s
     data_sent......................: 139 kB  2.2 kB/s
     http_req_blocked...............: avg=28.4µs   min=1.45µs  med=3.3µs    max=21.94ms  p(90)=4.51µs   p(95)=5.41µs  
     http_req_connecting............: avg=575ns    min=0s      med=0s       max=297.79µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=121.76ms min=51.21ms med=111.92ms max=407.01ms p(90)=160.81ms p(95)=177.48ms
       { expected_response:true }...: avg=121.76ms min=51.21ms med=111.92ms max=407.01ms p(90)=160.81ms p(95)=177.48ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 1005
     http_req_receiving.............: avg=108.81µs min=33.02µs med=100.15µs max=3.99ms   p(90)=137.13µs p(95)=155.84µs
     http_req_sending...............: avg=19.32µs  min=6.7µs   med=17µs     max=138.9µs  p(90)=25.25µs  p(95)=29.68µs 
     http_req_tls_handshaking.......: avg=14.52µs  min=0s      med=0s       max=12.57ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=121.63ms min=51.07ms med=111.76ms max=406.85ms p(90)=160.7ms  p(95)=177.29ms
     http_reqs......................: 1005    16.201683/s
     iteration_duration.............: avg=121.95ms min=51.43ms med=112.17ms max=429.31ms p(90)=160.98ms p(95)=177.64ms
     iterations.....................: 1005    16.201683/s
     vus............................: 1       min=1       max=2 
     vus_max........................: 2       min=2       max=2 
````
### load
````
  scenarios: (100.00%) 1 scenario, 225 max VUs, 9m30s max duration (incl. graceful stop):
           * default: Up to 225 looping VUs for 9m0s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (9m18.9s), 000/225 VUs, 3194 complete and 9 interrupted iterations
default ✓ [======================================] 000/225 VUs  9m0s

     ✗ is success
      ↳  72% — ✓ 2327 / ✗ 867

     checks.........................: 72.85% ✓ 2327     ✗ 867  
     data_received..................: 12 MB  21 kB/s
     data_sent......................: 527 kB 944 B/s
     http_req_blocked...............: avg=223.24µs min=1.59µs  med=3.44µs  max=44.72ms  p(90)=6.5µs    p(95)=2.53ms  
     http_req_connecting............: avg=25.29µs  min=0s      med=0s      max=1.21ms   p(90)=0s       p(95)=321.58µs
     http_req_duration..............: avg=25.76s   min=49.74ms med=32.14s  max=38.08s   p(90)=36.43s   p(95)=36.86s  
       { expected_response:true }...: avg=23.38s   min=49.74ms med=31.84s  max=38.08s   p(90)=36.61s   p(95)=36.98s  
     http_req_failed................: 27.14% ✓ 867      ✗ 2327 
     http_req_receiving.............: avg=108.95µs min=39.09µs med=97.08µs max=2.7ms    p(90)=143.64µs p(95)=170.76µs
     http_req_sending...............: avg=23.04µs  min=7.7µs   med=18.56µs max=361.73µs p(90)=32.12µs  p(95)=54.58µs 
     http_req_tls_handshaking.......: avg=176.88µs min=0s      med=0s      max=14.03ms  p(90)=0s       p(95)=2.07ms  
     http_req_waiting...............: avg=25.76s   min=49.59ms med=32.14s  max=38.08s   p(90)=36.43s   p(95)=36.86s  
     http_reqs......................: 3194   5.714995/s
     iteration_duration.............: avg=25.76s   min=49.9ms  med=32.14s  max=38.08s   p(90)=36.43s   p(95)=36.86s  
     iterations.....................: 3194   5.714995/s
     vus............................: 1      min=1      max=225
     vus_max........................: 225    min=225    max=225
````

### stress
````
running (4m17.8s), 000/260 VUs, 73541 complete and 28 interrupted iterations
default ✓ [======================================] 000/260 VUs  4m0s

     ✗ is success
      ↳  1% — ✓ 874 / ✗ 72667

     checks.........................: 1.18%  ✓ 874        ✗ 72667
     data_received..................: 40 MB  154 kB/s
     data_sent......................: 22 MB  86 kB/s
     http_req_blocked...............: avg=653.3µs  min=0s       med=0s     max=32.28ms p(90)=3.4ms  p(95)=5.66ms  
     http_req_connecting............: avg=1.45ms   min=0s       med=1.01ms max=22.02ms p(90)=3.11ms p(95)=3.78ms  
     http_req_duration..............: avg=681.52ms min=0s       med=0s     max=47.33s  p(90)=0s     p(95)=766.75µs
       { expected_response:true }...: avg=34.05s   min=2.26s    med=35.98s max=47.33s  p(90)=43.93s p(95)=45.74s  
     http_req_failed................: 98.81% ✓ 72667      ✗ 874  
     http_req_receiving.............: avg=8.66µs   min=0s       med=0s     max=14.72ms p(90)=0s     p(95)=0s      
     http_req_sending...............: avg=49.16µs  min=0s       med=0s     max=18.15ms p(90)=0s     p(95)=69.83µs 
     http_req_tls_handshaking.......: avg=583.43µs min=0s       med=0s     max=29.69ms p(90)=2.94ms p(95)=5.05ms  
     http_req_waiting...............: avg=681.46ms min=0s       med=0s     max=47.33s  p(90)=0s     p(95)=41.96µs 
     http_reqs......................: 73541  285.302453/s
     iteration_duration.............: avg=684.63ms min=593.71µs med=2.62ms max=47.33s  p(90)=6.72ms p(95)=9ms     
     iterations.....................: 73541  285.302453/s
     vus............................: 7      min=7        max=260
     vus_max........................: 260    min=260      max=260
````
### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
