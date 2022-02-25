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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

테스트 웹: https://giyeon95.kro.kr/

개선전
 - PageSpeed Test: [결과보기](https://pagespeed.web.dev/report?url=https%3A%2F%2Fgiyeon95.kro.kr%2F)

| 측정 항목                    | My (68점) | 서울교통공사 [결과보기](https://pagespeed.web.dev/report?url=http%3A%2F%2Fwww.seoulmetro.co.kr%2Fkr%2FcyberStation.do) | Naver [결과보기](https://pagespeed.web.dev/report?url=https%3A%2F%2Fm.map.naver.com%2Fsubway%2FsubwayLine.naver%3Fregion%3D1000) |
|--------------------------|----------|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| First Contentful Paint   | 2.7s     | 1.6s                                                                                                         | 0.5s                                                                                                                         |
| Time to Interactive      | 2.8s     | 3.1s                                                                                                         | 0.7s                                                                                                                         |
| Speed Index              | 2.7s     | 3.4s                                                                                                         | 2.7s                                                                                                                         |
| Total Blocking Time      | 0.05s    | 1.3s                                                                                                         | 0.01s                                                                                                                        |
| Largest Contentful Paint | 2.8s     | 3.6s                                                                                                         | 1.6s                                                                                                                         |
| Cumulative Layout Shift  | 0.004    | 0.013                                                                                                        | 0.006                                                                                                                        |

- WebPage Test: [결과보기](https://www.webpagetest.org/result/220216_BiDcFR_CB2/)

- GMetrix: [결과보기](https://gtmetrix.com/reports/giyeon95.kro.kr/BW6cuoYc/)

| 측정 항목      | My      | 서울교통공사 [결과보기](https://www.webpagetest.org/result/220216_BiDc19_CNQ/) | Naver [결과보기](https://www.webpagetest.org/result/220216_AiDc4A_EEE/) | 
|------------|---------|----------------------------------------------------------------------|---------------------------------------------------------------------|
| First View | 5.0004s | 4.231s                                                               | 1.330s                                                              |   

개선 목표
- [x] First Contentful Paint: 1초 이내
- [x] Time To Interactive: 1초 이내
- [x] Speed Index: 2초 이내
- [x] Largest Contentful Paint: 2초 이내
- [x] First View: 3초 이내
- [x] Lighthouse: 80점 이상

---


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

### nginx 내 텍스트 압축 설정 적용
[Reference](https://chicpro.dev/nginx-gzip-압축-설정/)

| 측정 항목                    | 적용 전 (68점) | 적용 후 (90점) |
|--------------------------|------------|------------|
| First Contentful Paint   | 2.7s       | 1.3s       |
| Time to Interactive      | 2.8s       | 1.4s       |
| Speed Index              | 2.7s       | 1.7s       |
| Total Blocking Time      | 0.05s      | 0.07s      |
| Largest Contentful Paint | 2.8s       | 1.4s       |
| Cumulative Layout Shift  | 0.004      | 0.004      |

| 측정 항목      | 적용 전    | 적용 후   |
|------------|---------|--------|
| First View | 5.0004s | 1.826s |

WebPage Test: [결과보기](https://www.webpagetest.org/result/220217_BiDc28_J64/)

결과: 5.0004s - 1.826s / 1.826 = 173% 개선

### http2 설정
[Reference](https://ma.ttias.be/enable-http2-in-nginx/)

| 측정 항목                    | 적용 전 (90점) | 적용 후 (94점) |
|--------------------------|------------|------------|
| First Contentful Paint   | 1.3s       | 1.2s       |
| Time to Interactive      | 1.4s       | 1.2s       |
| Speed Index              | 1.7s       | 1.3s       |
| Total Blocking Time      | 0.07s      | 0.02s      |
| Largest Contentful Paint | 1.4s       | 1.2s       |
| Cumulative Layout Shift  | 0.004      | 0.004      |

| 측정 항목      | 적용 전   | 적용 후   |
|------------|--------|--------|
| First View | 1.826s | 1.876s |

WebPage Test: [결과보기](https://www.webpagetest.org/result/220217_BiDcFV_JCK/)

결과: PageSpeedInsignt 결과는 좋아졌지만,, 속도 개선 미비함, (컨텐츠가 많지 않아 그렇지 않을까 추측🤔)


-- 아래 사항은 테스트만 해보고 적용은 별도로 진행하지 않았다.

### 렌더링 차단 리소스 제거 (롤백)
[Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)

| 측정 항목                    | 적용 전 (94점) | 적용 후 (90점) |
|--------------------------|------------|------------|
| First Contentful Paint   | 1.2s       | 1.0s       |
| Time to Interactive      | 1.2s       | 1.3s       |
| Speed Index              | 1.3s       | 1.4s       |
| Total Blocking Time      | 0.02s      | 0.17s      |
| Largest Contentful Paint | 1.2s       | 1.3s       |
| Cumulative Layout Shift  | 0.004      | 0.004      |


| 측정 항목      | 적용 전   | 적용 후    |
|------------|--------|---------|
| First View | 1.876s | 1.791s  |

WebPage Test: [결과보기](https://www.webpagetest.org/result/220217_BiDc24_JNK/)

결과: PageSpeedInsignt 결과가 나빠(?)지고, 약간의 속도 개선 (흠,, 값이 튀어서, 평균값을 구할껄 싶다..🤔)


### 렌더링 차단 리소스 별도 css파일로 구성 (롤백)
- 위 방식으로 진행시, `materialdesignicons.min.cs` 을 읽어오지 못하는 이슈가 있어, 위 설정 제거 후 css파일을 내려받아 구성해보았다.
- 랜더링 차단 리소스 제거 이전 적용으로 비교했다.

| 측정 항목                    | 적용 전 (94점) | 적용 후 (91점) |
|--------------------------|------------|------------|
| First Contentful Paint   | 1.2s       | 1.0s       |
| Time to Interactive      | 1.2s       | 1.3s       |
| Speed Index              | 1.3s       | 1.4s       |
| Total Blocking Time      | 0.02s      | 0.17s      |
| Largest Contentful Paint | 1.2s       | 1.2s       |
| Cumulative Layout Shift  | 0.004      | 0.003      |

결과: 음, 왜 속도가 내려갔을까..🥲 

| 측정 항목      | 적용 전   | 적용 후   |
|------------|--------|--------|
| First View | 1.876s | 2.069s |


3. 부하테스트 전제조건은 어느정도로 설정하셨나요

[참고자료: 데이터로 보는 서울시 대중교통 이용](https://www.bigdata-map.kr/datastory/traffic/seoul) 를 참고하여, 지하철 이용자의 70% 가 노선을 확인한다고 가정하였습니다.
- 예상 1일 사용자 수(DAU): 4,500,000 * 0.7 = 3,150,000
- 피크 시간대의 집중률: (최대 트래픽 / 평소 트래픽)
  - 트래픽 계산 법: 메인 -> 경로검색 -> 출발역 & 도착역 입력 -> 검색 (약 3MB)
    - 최대 트래픽: (1,100,000 * 0.7) * 3MB = 2,310,000MB -> 2,310GB 
    - 평소 트래픽: (500,000 * 0.7) * 3MB = 175,000 -> 1,750GB

- 1명당 1일 평균 요청 수: 3회 ([참고: 카카오 모바일 APP 현황](https://ko.lab.appa.pe/2016-09/kakao-korea.html))
- Throughput(RPS): 3,150,000 / 86,400 = 36.45
- Latency: 100 이하

- VUser: 36 * 4(4번의 request) / 0.4 = 360

5. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

## Load (/k6/load.js)
<img width="997" alt="CleanShot 2022-02-19 at 21 22 04@2x" src="https://user-images.githubusercontent.com/37217320/154800551-f94f267d-3e2a-4f4b-a2f2-3abddb274171.png">

## Smoke (/k6/smoke.js)
<img width="1163" alt="CleanShot 2022-02-19 at 22 02 29@2x" src="https://user-images.githubusercontent.com/37217320/154801919-0be8fd0c-04b9-48c2-9680-6c3808d2fcb5.png">

## Stress (/k6/stress.js)
<img width="1196" alt="CleanShot 2022-02-19 at 22 35 51@2x" src="https://user-images.githubusercontent.com/37217320/154803070-e7eacd64-d13b-4a43-9ab5-7bed67c49f1d.png">

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)


2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

- 웹서버 성능 개선은, 1차때 진행한 결과로 도출했으므로 스킵하였습니다.

참고사항
- 위 테스트는 목표 레이턴시 1500ms
- 이후 성능개선 목표 레이턴시 100ms

## Redis 원격 캐시 적용
- 반복 조회성 데이터 캐시 적용
- load test 기준, 평균 응답 시간이 53.37ms -> 4.05ms로 약 1200% 성능 개선
- smoke 테스트, stress 테스트는, Thread pool 이슈로 판단되어, 부하분산시 추가 측정 예정

## Load
<img width="1098" alt="CleanShot 2022-02-24 at 01 08 58@2x" src="https://user-images.githubusercontent.com/37217320/155359035-6003936d-dfde-4ba6-8214-024eb188c159.png">


## HikariCP 옵션 최적화
- DB 성능이 효과가 있을지는 모르겠으나, HikariCP 옵션 최적화를 진행후 결과를 도출해보자.
- `show variables like 'max_connections';` 명령어로 확인결과, 151 건이며,, HikariCP의 connection_pool 을 20으로 변경 및 권장 옵션을 추가하고자 한다.
<img width="334" alt="CleanShot 2022-02-25 at 21 54 52@2x" src="https://user-images.githubusercontent.com/37217320/155718640-e61b2c9d-62da-476b-8e05-cf61dc508fb5.png">

[Recerence](https://2ssue.github.io/programming/HikariCP-MySQL/)
```yaml
spring:
  datasource:
   hikari:
      maximum-pool-size: 20
      data-source-properties:
        cachePrepStmts: true
        prepStmtCacheSize: 250
        prepStmtCacheSqlLimit: 2048
        useServerPrepStmts: true
        cacheResultSetMetadata: true
        cacheServerConfiguration: true
        elideSetAutoCommits: true
        maintainTimeStats: true
```

<img width="1059" alt="CleanShot 2022-02-25 at 22 21 30@2x" src="https://user-images.githubusercontent.com/37217320/155722167-c40d9c16-ca65-45b3-869e-d6ad1d810f5b.png">

결과: 음 성능이 더 떨어졌다.. 데이터 양이 적고, 캐시에 저장 설정등이 추가되면서, 영향이 있지 않을까 추측해본다.


### 로드 밸런싱
동일 서버에 5개의 인스턴스를 추가로 띄워 보았다.
```
  upstream app {
    server 172.17.0.1:8080 max_fails=3 fail_timeout=3s;
    server 172.17.0.1:8081 max_fails=3 fail_timeout=3s;
    server 172.17.0.1:8082 max_fails=3 fail_timeout=3s;
    server 172.17.0.1:8083 max_fails=3 fail_timeout=3s;
    server 172.17.0.1:8084 max_fails=3 fail_timeout=3s;
  }
```

## Load
<img width="1077" alt="CleanShot 2022-02-26 at 00 13 57@2x" src="https://user-images.githubusercontent.com/37217320/155739564-324dd8e6-23da-4e10-a512-f506008ccb34.png">

## Smoke
<img width="1499" alt="CleanShot 2022-02-25 at 23 35 20@2x" src="https://user-images.githubusercontent.com/37217320/155733233-2570e68b-e551-4553-b16f-ee83888d1e94.png">


## Stress
<img width="942" alt="CleanShot 2022-02-26 at 00 07 52@2x" src="https://user-images.githubusercontent.com/37217320/155738542-b6a087f4-f39f-41ed-9965-a1345c319a9b.png">


## 결과분석
```
 - Load Test: 평균 응답 속도가 (28.3ms -> 19.4ms)로 줄어들었으며, LoadTest의 경우, 크게 줄지 않을 줄 알았는데 의외였습니다. (추측은, 로드밸런싱이 되면서 JVM GC와, 최대 Heap 메모리 등이, 영향이 있지 않을까 싶습니다.)
 - Smoke Test: 로드밸런싱 (Scale out)을 진행함으로서, 평균 응답 속도가, 크게 줄었습니다. (1790ms -> 117ms)
 - Stress Test: 평균 응답 속도는 (1140s -> 412ms) 으로, 줄어들었으나, 최대 요청시간이 1분이 넘고, Timeout이 걸린듯 한 요청들도 많이 보여 에러율이 더 높아졌습니다.
   이같은 경우는, 서버내 리소스 부족 문제로 보여지며, Scale Up 또는 다른 신규 서버로 Scale Out 하면 개선이 될 것 으로 확인됩니다.
```


---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
