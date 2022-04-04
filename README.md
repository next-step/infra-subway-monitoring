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

#### webpagetest
##### 네이버 지도 - https://m.map.naver.com/subway/subwayLine.naver?region=1000

|              | desktop | mobile  |
|--------------|---------|---------|
| First Byte   | .190S   | .202S   |
| Start Render | .700S   | .700S   |
| FCP          | .649S   | .688S   |
| Speed Index  | 2.380S  | 2.363S  |
| LCP          | 2.870S  | 3.225S  |
| CLS          | .041    | .009    |
| TBT          | ≥ .013S | ≥ .010S |
| Total Bytes  | 774KB   | 963KB   |

##### RUNNING MAP - https://mirrors89.p-e.kr/

|              | desktop | mobile  |
|--------------|---------|---------|
| First Byte   | .160S   | .152S   |
| Start Render | 4.800S  | 4.800S  |
| FCP          | 4.883S  | 4.813S  |
| Speed Index  | 4.804S  | 4.804S  |
| LCP          | 4.923S  | 4.833S  |
| CLS          | .004    | .048    |
| TBT          | ≥ .011S | ≥ .000S |
| Total Bytes  | 2,493KB | 2,484KB |


#### pagespeed
##### 네이버 지도 - https://m.map.naver.com/subway/subwayLine.naver?region=1000
|                          | desktop | mobile  |
|--------------------------|---------|---------|
| First Contentful Paint   | 0.5 초   | 2.2 초   |
| Time to Interactive      | 0.5 초   | 7.2 초   |
| Speed Index              | 2.3 초   | 6.3 초   |
| Total Blocking Time      | 0 밀리초   | 410 밀리초 |
| Largest Contentful Paint | 1.6 초   | 7.8 초   |
| Cumulative Layout Shift  | 0.006   | 0.03    |
| Lighthouse 성능 점수         | 89 점    | 53 점    |


##### RUNNING MAP - https://mirrors89.p-e.kr/
|                          | desktop | mobile  |
|--------------------------|---------|---------|
| First Contentful Paint   | 2.7 초   | 14.6 초  |
| Time to Interactive      | 2.8 초   | 15.2 초  |
| Speed Index              | 2.8 초   | 14.6 초  |
| Total Blocking Time      | 50 밀리초  | 570 밀리초 |
| Largest Contentful Paint | 2.8 초   | 15.2 초  |
| Cumulative Layout Shift  | 0.004   | 0.042   |
| Lighthouse 성능 점수         | 67 점    | 31 점    |


**웹 성능예산 측정**
- FCP(First Contentful Paint) 
  - 데스크탑 기준 1초 이내로 줄이기 
  - 모바일 기준 3초 이내로 줄이기
- TTI(Time to Interactive) 
  - 데스크탑 기준 1초 이내로 줄이기
  - 모바일 기준 7초 이내로 줄이기
- Lighthouse 성능 점수 
  - 데스크탑 기준 80점 이상 올리기
  - 모바일 기준 50점 이상 올리기
- Total Bytes 1,500KB 이내로 줄이기

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축 사용 (gzip)
- 사용하지 않는 자바스크립트 줄이기 (코드 스플릿팅)
- 정적 파일 캐시 적용
- 웹폰트 로드 중에 텍스트가 계속 표시되도록 하기
- HTTP2 적용

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 1일 총 접속 수
  - [통합 데이터 지도](https://www.bigdata-map.kr/datastory/traffic/seoul) 기준 평균 DAU 약 450만명
  - 1명당 1일 평균 접속 최소 2회 이상 접속 예상
    - 출퇴근 시간 동안 검색
  - DAU 유저중 40%가 지하철 어플리케이션을 사용한다고 가정 
  - (4,500,000(DAU) x 0.4 ) x 2(1일 평균 접속 수) = 3,600,000 (1일 총 접속 수)
- 1일 평균 rps
  - 3,600,000 (1일 총 접속 수) / 86,400 (초/일) = 41 (1일 평균 rps)
- 1일 최대 rps
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
  - 08시 ~ 09시 2월 승차 인원 13,154,565명 ([참고자료](https://data.seoul.go.kr/dataList/OA-12252/S/1/datasetView.do))
  - 2월 시간별 평균 승차 인원 평균 약 600만명
  - 41 (1일 평균 rps) x 3 (최대 트래픽 / 평소 트래픽) = 123
- Throughput : 41 (1일 평균 rps) ~ 123 (1일 최대 rps)
- Latency : 50~100ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
   - **Reverse Proxy 개선**
     - gzip 설정
       - nginx.conf에 설정한 http content-type에 grip을 적용
         ```
         gzip on; ## http 블록 수준에서 gzip 압축 활성화
         gzip_comp_level 9;
         gzip_vary on;
         gzip_types text/plain text/css application/json application/x-javascript application/javascript text/xml application/xml application/rss+xml text/javascript image/svg+xml application/vnd.ms-fontobject application/x-font-ttf font/opentype;
         ```
     - cache
       - nginx.conf에 정적 데이터에 대한 cache 설정을 적용 
         ```
         proxy_cache_path /tmp/nginx levels=1:2 keys_zone=mirrors89:10m inactive=10m max_size=200M;
          
         proxy_cache_key "$scheme$host$request_uri $cookie_user";
          
         location ~* \.(?:css|js|gif|png|jpg|jpeg)$ {
           proxy_pass http://app;
           proxy_cache mirrors89;
           add_header X-Proxy-Cache $upstream_cache_status;
           proxy_cache_valid 200 302 20m;
           expires 1M;
           access_log off; 
         ```
     - 서버 분산
       - WAS를 3대 실행하여 부하 분산
         ```
         upstream app {
           least_conn;
           server 192.168.89.59:8080 max_fails=3 fail_timeout=3s;
           server 192.168.89.59:8081 max_fails=3 fail_timeout=3s;
           server 192.168.89.59:8082 max_fails=3 fail_timeout=3s;
         }
         ```
       - 새로 사용하는 PORT를 보안 그룹에 설정
     - HTTP2 적용
       ```
       listen 443 ssl http2;
       ```
   - **WAS 개선**
     - Redis Cache 적용
       - 실제 서비스에서 자주 조회되는 서비스를 찾아 캐시 적용
       - 캐시 적용 Service
         - LineService
         - StationService
---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
