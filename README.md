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

#### 타사 비교 (First View, 데스크톱)
사이트 3개 모두 TTI, TBT는 PageSpeed (데스크톱), 그 외 메트릭은  webpage test 수치 사용.
단위: 초(s)
||[네이버 지도](https://map.naver.com/v5/directions/-/-/-/transit?c=14137575.5199888,4524330.9973991,15,0,0,0,dh)|[카카오지도](https://map.kakao.com/)|[nextstep subway](https://dibtp1221.kro.kr/)|
|----------------|-------------------------------|-----------------------------|-----------------------------|
|FCP|0.389|0.741|4.853|
|TTI|3.2|2.5|2.8|
|Speed Index|1.931|3.878|4.803|
|LCP|3.975|2.141|4.885|
|TBT|0.021|0.059|0.005|

#### 타사 비교 (Repeat View, 데스크톱)
사이트 3개 모두 메트릭 webpage test 수치 사용.
단위: 초(s)
||[네이버 지도](https://map.naver.com/v5/directions/-/-/-/transit?c=14137575.5199888,4524330.9973991,15,0,0,0,dh)|[카카오지도](https://map.kakao.com/)|[nextstep subway](https://dibtp1221.kro.kr/)|
|----------------|-------------------------------|-----------------------------|-----------------------------|
|FCP|0.242|0.463|0.639|
|Speed Index|0.761|1.481|0.700|
|LCP|1.406|0.718|0.695|
|TBT|>=0.408|>=0.873|>=0.000|


#### First View 웹 성능 예산 [nextstep subway](https://dibtp1221.kro.kr/)
||목표|
|----------------|-------------------------------|
|FCP|0.7|
|TTI|2|
|Speed Index|2|
|LCP|1|
|TBT|유지|

이렇게 정한 이유 개선 필요한 부분과 함께 설명

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- gzip 압축
    - 웹 페이지 처음 로드할때 다운로드 받는 컨텐츠들을 보면 JS 파일이 2개 총 request 수 중에 11.1% 를 차지하지만 총Bytes에서는 2,352,130 (92.1%) 를 차지한다. 이것은 JS 파일이 gzip 압축이 안 되어있어서 그렇다.
    - 네이버, 카카오 등 타 서비스를 보면 gzip compression score 100/100을 달성함에 비해, 우리 서비스는 22/100이고, vendor.js 와 main.js 가 압축이 안되어있다.
    - vendor.js (2,125KB -> 407KB) , main.js (172.0 -> 28.1KB) 로 각각 압축이 가능하며 그렇게 되면 일단 FCP와 LCP를 1/4 정도로는 줄일 수 있다. 그럼 1~2 값이 되고

- CDN
    - WAS 서버에서 직접 .js 와 .png 파일을 내려주는 대신에 CDN 서버를 이용하면 클라이언트가 더 빠르게 자원을 받을 수 있을거로 생각한다.
    - 그렇게 되면 First View FCP와 LCP를 각각 0.7, 1 정도 수치까지 내릴 수 있지 않을까 생각했다.

- 컨텐츠에 브라우저 캐시 사용을 위한 헤더 추가
    - first view 와 repeat view의 차이가 크고 repeat view 부터는 캐싱이 되어 수치가 많이 낮아지는 것이 아닐까 했다.
    - 그렇다고 하더라도, 프론트 리소스들이 자주 바뀌지 않는다면 브라우저 캐싱을 위한 헤더 설정을 하여 계속 매번 요청해서 받아가지 않게 해야겠다.

---

### 2단계 - 부하 테스트 
 1. 부하테스트 전제조건은 어느정도로 설정하셨나요 
	 1.  목표 rps 구하기  
		 a. 예상 1일 사용자 수(DAU)  : 100,000명    
		 네이버지도, 티맵, 카카오 맵 등등 몇백만명을 훌쩍 넘는데 <- 이걸 기준으로 잡아야 할지 고민했으나, 현실적으로는 실제 서비스를 하더라도 사용하는 사람이 없을거기 때문에,  
    이정도 사양의 서버에 이렇게 프로젝트 구성을 하면 어느정도 버티는지 확인을 위한 수치로 잡았습니다
    
		 b. 피크 시간대 집중률 예상 (최대 트래픽 / 평소 트래픽)  : 2.4  
		 시간대별 이용인원 추이에서 가장 높은값(10%) / 1시간 평균트래픽(1/24)  
    ([2019년 서울 지하철 이용실태 - 시간대별 이용인원 추이](https://www.seouland.com/arti/society/society_general/6239.html) 에서 제일 높은 값이 10%)
   
		   c. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다 : 45회  
		   [지도, 택시, 내비 앱 사용 현황](https://www.sedaily.com/NewsVIew/1RZNNV5UZG) 에서 지하철 종결자 앱의 1인당 평균 실행횟수 

			d. 이를 바탕으로 Throughput 계산 rps : 125  
			(100000 * 45 * 2.4 ) / 86400
	2. VUser
		R=3 , T=2 -> VU = (125*2)/3 = 83.3333... 약 83

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- Smoke Test
  [스크립트 smoke.js](https://github.com/dibtp1221/infra-subway-monitoring/blob/step2/k6/smoke.js)
	- 계정 실패 테스트
	![image](https://user-images.githubusercontent.com/87216027/166157336-a779d7bf-8cc5-4428-be23-072616b54413.png)
	계정 성공 테스트
	![image](https://user-images.githubusercontent.com/87216027/166157397-58b644b3-241b-4df9-8bff-2176ddde8afb.png)

- Load Test
  [스크립트 load.js](https://github.com/dibtp1221/infra-subway-monitoring/blob/step2/k6/load.js)
  ![image](https://user-images.githubusercontent.com/87216027/166162952-7dd7c7e1-79f0-4564-a32e-2e9601c92985.png)
  ![image](https://user-images.githubusercontent.com/87216027/166162954-59753826-236f-4640-ae66-71df1b3cf8a1.png)
```bash
[ubuntu@LOAD]:~$ k6 run --out influxdb=http://localhost:8086/myk6db load.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 83 max VUs, 12m40s max duration (incl. graceful stop):
           * default: Up to 83 looping VUs for 12m10s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (12m14.6s), 00/83 VUs, 2629 complete and 0 interrupted iterations
default ↓ [======================================] 21/83 VUs  12m10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ correct path

     checks.........................: 100.00% ✓ 7887      ✗ 0
     data_received..................: 11 MB   15 kB/s
     data_sent......................: 1.8 MB  2.4 kB/s
     http_req_blocked...............: avg=55.22µs min=1.1µs  med=3.44µs  max=29.63ms p(90)=5.23µs  p(95)=6.12µs
     http_req_connecting............: avg=8.79µs  min=0s     med=0s      max=2.24ms  p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=4.92s   min=5.33ms med=5.18s   max=16.66s  p(90)=8.33s   p(95)=9.23s
       { expected_response:true }...: avg=4.92s   min=5.33ms med=5.18s   max=16.66s  p(90)=8.33s   p(95)=9.23s
     http_req_failed................: 0.00%   ✓ 0         ✗ 7887
     http_req_receiving.............: avg=77.6µs  min=19.3µs med=71.16µs max=2.9ms   p(90)=98.58µs p(95)=113.13µs
     http_req_sending...............: avg=23.46µs min=5.34µs med=20.55µs max=2.22ms  p(90)=32.6µs  p(95)=41.1µs
     http_req_tls_handshaking.......: avg=37.99µs min=0s     med=0s      max=14.93ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=4.92s   min=5.25ms med=5.18s   max=16.66s  p(90)=8.33s   p(95)=9.23s
     http_reqs......................: 7887    10.736837/s
     iteration_duration.............: avg=15.78s  min=1.26s  med=16.9s   max=31.07s  p(90)=22.94s  p(95)=23.27s
     iterations.....................: 2629    3.578946/s
     vus............................: 7       min=1       max=83
     vus_max........................: 83      min=83      max=83

ERRO[0736] some thresholds have failed
```
CPU  109% 정도 사용
 
- Stress Test
  [스크립트 stress.js](https://github.com/dibtp1221/infra-subway-monitoring/blob/step2/k6/stress.js)
![image](https://user-images.githubusercontent.com/87216027/166163013-9326eece-5a7d-4a88-aa90-30a1bc16e206.png)
![image](https://user-images.githubusercontent.com/87216027/166163015-c7c15092-31fe-4781-bc3f-bc7d8c1f1e7b.png)

Http Response Not 200 (수업 실습때 보여주셨던 거에서는 http req failed 자리) - status code 200 아닌 응답이 있으면 수집합니다.  
stress test 에서 401 응답 1건, 500 응답 1건 발생했습니다.

20220506) stress test 다시해서 추가
3600개 넘는 에러 발생했고 중간에 테스트 중단.

```bash
[ubuntu@LOAD]:~$ k6 run --out influxdb=http://localhost:8086/myk6db stress.js

WARN[0826] Request Failed                                error="Get \"https://dibtp1221.kro.kr//paths?source=24&target=12\": EOF"
ERRO[0826] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at file:///home/ubuntu/stress.js:60:31(84)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0826] Request Failed                                error="Post \"https://dibtp1221.kro.kr//login/token\": EOF"
ERRO[0826] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at file:///home/ubuntu/stress.js:44:30(29)
        at native  executor=ramping-vus scenario=default source=stacktrace

running (13m45.8s), 000/410 VUs, 72725 complete and 390 interrupted iterations
default ✗ [===========================>----------] 082/410 VUs  13m45.8s/18m20.0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ correct path

     checks.........................: 100.00% ✓ 208405     ✗ 0
     data_received..................: 327 MB  396 kB/s
     data_sent......................: 51 MB   62 kB/s
     http_req_blocked...............: avg=1.3ms    min=0s     med=2.17µs  max=290.29ms p(90)=4.86µs   p(95)=3.95ms
     http_req_connecting............: avg=454.99µs min=0s     med=0s      max=144.16ms p(90)=0s       p(95)=653.77µs
   ✗ http_req_duration..............: avg=152.33ms min=0s     med=55.77ms max=6.43s    p(90)=434.27ms p(95)=561.14ms
       { expected_response:true }...: avg=154.92ms min=3.38ms med=58.44ms max=6.43s    p(90)=438.52ms p(95)=564.17ms
     http_req_failed................: 1.73%   ✓ 3681       ✗ 208405
     http_req_receiving.............: avg=82.94µs  min=0s     med=41.65µs max=79.5ms   p(90)=77.01µs  p(95)=102.06µs
     http_req_sending...............: avg=162.23µs min=0s     med=13.16µs max=339.26ms p(90)=34.46µs  p(95)=58.92µs
     http_req_tls_handshaking.......: avg=911.42µs min=0s     med=0s      max=216.05ms p(90)=0s       p(95)=3.18ms
     http_req_waiting...............: avg=152.09ms min=0s     med=55.53ms max=6.43s    p(90)=434.14ms p(95)=560.48ms
     http_reqs......................: 212086  256.826444/s
     iteration_duration.............: avg=1.39s    min=1.24ms med=1.11s   max=10.59s   p(90)=2.24s    p(95)=2.64s
     iterations.....................: 72725   88.066648/s
     vus............................: 389     min=1        max=389
     vus_max........................: 410     min=410      max=410

ERRO[0827] some thresholds have failed
```
WAS 서버 로그
```shell
2022-05-06 19:38:05.011  WARN 2263 --- [nio-8080-exec-3] com.zaxxer.hikari.pool.PoolBase          : HikariPool-1 - Failed to validate connection com.mysql.cj.jdbc.ConnectionImpl@64b83211 (No operations allowed after connection closed.). Possibly consider using a shorter maxLifetime value.
```
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
