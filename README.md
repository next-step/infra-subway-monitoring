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

## 웹 주소
- https://cwjonhpark-subway-px.o-r.kr/

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 외부 자바스크립트 소스 파일은 1mb를 넘지 않아야 한다.
- 외부 자바스크립트 소스 파일 네트워크 시간은 100ms 미만이어야 한다.
- 3G 환경에서 FCP는 10초 미만이어야 한다.
- 웹브라우저 main thread 의 자바스크립트 소스 evaluation 시간은 1초 미만이어야 한다.
- TBT는 1초 미만이어야 한다.
- Lighthouse 의 Performance 점수가 90점 이상이어야 한다.

### 경쟁사 분석

|                 | FCP   | TTI   | SI    | TBT   | LCP   | CLS   |
|-----------------|-------|-------|-------|-------|-------|-------|
| **Running Map** | 13.8s | 14.9s | 14.4s | 410ms | 13.8s | 0.041 |
| 서울교통공사          | 8.7s  | 8.7s  | 33 s  | 0ms   | 9.1s  | 0     |
| 네이버 지도          | 2.2s  | 5.2s  | 3.0s  | 90ms  | 4.2s  | 0.005 |
| 카카오 지도          | 1.8s  | 7.7s  | 6.1s  | 40ms  | 5.5s  | 0.005 |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요. 
- AS-IS: 15 s
- TO-BE: 1 s

### 서버 목표 응답시간 가설 근거
- 구글 폰트를 외부 CDN 이 아닌 자사의 정적 리소스 서버를 사용하여 1s 단축
- 자바스크립트 소스 파일을 gzip 으로 압축하여 클라이언트 단에 전송하여 10s 단축
- 사용하지 않는 자바스크립트 소스 코드를 제거하여 3s 단축
---

### 2단계 - 부하 테스트 

### 요구사항
#### 테스트 전제조건 정리
- 대상 시스템 범위
- 목푯값 설정 (latency, throughput, 부하 유지기간)
- 부하 테스트 시 저장될 데이터 건수 및 크기
- 아래 시나리오 중 하나를 선택하여 스크립트 작성
```markdown
1. 접속 빈도가 높은 페이지
2. 데이터를 갱신하는 페이지
3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지
```
#### Smoke, Load, Stress 테스트 후 결과를 기록

---
## Answer
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
### 목표 rps
- 예상 1일 사용자 수 
   - a. 1일 사용자 수(DAU): 1000만 명 
   - b. 피크 시간대의 집중률(최대 트래픽 / 평소 트래픽): 5
   - c. 1명당 1일 평균 요청수: 2건
   - d. Throughput: 230 RPS(1일 평균) ~ 1000 RPS(1일 최대)
### VUser
```markdown
Glossary
- Request Rate: measured by the number of requests per second (RPS)
- VU: the number of virtual users (VUser = (rps * T) / R)
- R: the number of requests per VU iteration
- T: a value larger than the time needed to complete a VU iteration (T = R * http_req_duration)
- Throughput : 1일 평균 rps ~ 1일 최대 rps
  - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
  - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
```
- T = (2 * 1s) + 1s = 4s
- VU = (2300 * 4s) / 2 = 2400 

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

### Smoke
- VUser: 1
- Duration: 10m
- 99퍼센트 이상의 요청은 1500ms 이내에 완료돼야 한다.
```json
{
  "vus": 1,
  "duration": "10m",

 "thresholds": {
    "http_req_duration": ["p(99)<1500"]
 }
}
```
### 결과
```markdown
  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10m0s (gracefulStop: 30s)

running (10m00.4s), 0/1 VUs, 593 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 1186     ✗ 0
     data_received..................: 421 kB  702 B/s
     data_sent......................: 317 kB  528 B/s
     http_req_blocked...............: avg=39.08µs min=1.62µs  med=3.89µs  max=27.49ms p(90)=5.18µs  p(95)=5.53µs
     http_req_connecting............: avg=488ns   min=0s      med=0s      max=302.4µs p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=5.77ms  min=3.21ms  med=4.82ms  max=52.72ms p(90)=8.75ms  p(95)=11.05ms
       { expected_response:true }...: avg=5.77ms  min=3.21ms  med=4.82ms  max=52.72ms p(90)=8.75ms  p(95)=11.05ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 1186
     http_req_receiving.............: avg=62.65µs min=32.75µs med=57.76µs max=2.37ms  p(90)=75.24µs p(95)=85.52µs
     http_req_sending...............: avg=20.01µs min=7.92µs  med=20.93µs max=99.46µs p(90)=30.41µs p(95)=32.49µs
     http_req_tls_handshaking.......: avg=14.7µs  min=0s      med=0s      max=14.93ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=5.69ms  min=3.16ms  med=4.73ms  max=52.64ms p(90)=8.66ms  p(95)=10.96ms
     http_reqs......................: 1186    1.975288/s
     iteration_duration.............: avg=1.01s   min=1s      med=1.01s   max=1.05s   p(90)=1.01s   p(95)=1.02s
     iterations.....................: 593     0.987644/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```
### Load
- VUser: 230
- Duration: 30m
- 99퍼센트 이상의 요청은 1500ms 이내에 완료돼야 한다.
```json
{
  "stages": [
      { "duration": "15m", "target": 2400 }, 
      { "duration": "15m", "target": 240 }
  ],
  "thresholds": {
    "http_req_duration": ["p(99)<1500"]
  }
}
```
```markdown
     ✗ logged in successfully
      ↳  43% — ✓ 806398 / ✗ 1028576
     ✓ retrieved member

     checks.........................: 60.98%  ✓ 1607979     ✗ 1028576
     data_received..................: 4.5 GB  2.5 MB/s
     data_sent......................: 1.1 GB  590 kB/s
     http_req_blocked...............: avg=269.16ms min=0s       med=1.59µs  max=57.55s   p(90)=770.1ms  p(95)=1.26s
     http_req_connecting............: avg=262.09ms min=0s       med=2.34ms  max=17.03s   p(90)=673.33ms p(95)=1s
   ✓ http_req_duration..............: avg=60.4ms   min=0s       med=12.44ms max=1m0s     p(90)=173.16ms p(95)=257.76ms
       { expected_response:true }...: avg=95.44ms  min=2.19ms   med=40.97ms max=28.72s   p(90)=213.04ms p(95)=314.07ms
     http_req_failed................: 39.12%  ✓ 1033392     ✗ 1607979
     http_req_receiving.............: avg=250.64µs min=0s       med=21.81µs max=691.37ms p(90)=39.93µs  p(95)=53.28µs
     http_req_sending...............: avg=4.44ms   min=0s       med=8.45µs  max=28.62s   p(90)=1.32ms   p(95)=10.24ms
     http_req_tls_handshaking.......: avg=186.94ms min=0s       med=0s      max=56.31s   p(90)=706.2ms  p(95)=864.06ms
     http_req_waiting...............: avg=55.7ms   min=0s       med=11.25ms max=1m0s     p(90)=168.77ms p(95)=238.36ms
     http_reqs......................: 2641371 1466.604104/s
     iteration_duration.............: avg=1.23s    min=306.79µs med=1s      max=1m2s     p(90)=2.15s    p(95)=2.88s
     iterations.....................: 1834973 1018.856849/s
     vus............................: 43      min=0         max=2400
     vus_max........................: 2400    min=2199      max=2400
```
### Stress
- VUser: 1000
- Duration: 10m
- 99퍼센트 이상의 요청은 3000ms 이내에 완료돼야 한다.

```json
{
  "vus": 24000,
  "duration": "10m",
  "thresholds": {
    "http_req_duration": ["p(99)<3000"]
  }
}
```

```markdown
running (05m02.6s), 0000/1000 VUs, 207983 complete and 1000 interrupted iterations
default ✗ [==================>-------------------] 1000 VUs  05m02.5s/10m0s

     ✗ logged in successfully
      ↳  97% — ✓ 203029 / ✗ 5628
     ✓ retrieved member

     checks.........................: 98.63% ✓ 405812      ✗ 5628
     data_received..................: 1.1 GB 3.6 MB/s
     data_sent......................: 195 MB 645 kB/s
     http_req_blocked...............: avg=217.14ms min=0s       med=32.05µs  max=2.02s    p(90)=545.1ms  p(95)=614.39ms
     http_req_connecting............: avg=7.52ms   min=0s       med=134.15µs max=1.57s    p(90)=5.61ms   p(95)=31.29ms
   ✓ http_req_duration..............: avg=20.64ms  min=0s       med=10.22ms  max=1.4s     p(90)=44.2ms   p(95)=69.95ms
       { expected_response:true }...: avg=20.7ms   min=2.02ms   med=10.25ms  max=1.27s    p(90)=44.03ms  p(95)=69.79ms
     http_req_failed................: 1.42%  ✓ 5869        ✗ 405812
     http_req_receiving.............: avg=114.41µs min=0s       med=25.15µs  max=179.87ms p(90)=39.82µs  p(95)=54.74µs
     http_req_sending...............: avg=1.29ms   min=0s       med=19.63µs  max=1.25s    p(90)=1.22ms   p(95)=5.13ms
     http_req_tls_handshaking.......: avg=211.51ms min=0s       med=0s       max=1.11s    p(90)=535.27ms p(95)=606.92ms
     http_req_waiting...............: avg=19.23ms  min=0s       med=9.98ms   max=1.4s     p(90)=40.7ms   p(95)=62.14ms
     http_reqs......................: 411681 1360.680818/s
     iteration_duration.............: avg=1.45s    min=844.21µs med=1.46s    max=3.7s     p(90)=1.66s    p(95)=1.75s
     iterations.....................: 207983 687.421762/s
     vus............................: 1000   min=1000      max=1000
     vus_max........................: 1000   min=1000      max=1000
```

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
