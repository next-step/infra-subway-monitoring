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

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] 로그 설정하기
  - [x] 로그인, 회원가입, 최단경로 api 로깅
  - [x] nginx access log 설정
```
# nginx.conf

events {}

http {
    log_format upstream_time '$remote_addr - $remote_user [$time_local] '
                             '"$request" $status $body_bytes_sent '
                             '"$http_referer" "$http_user_agent"'
                             'rt=$request_time uct="$upstream_connect_time" uht="$upstream_header_time" urt="$upstream_response_time"';
    
    upstream app {
        server 192.168.3.45:8080;
    }
    
    # Redirect all traffic to HTTPS
    server {
        listen 80;
        return 301 https://$host$request_uri;
    }
    
    server {
        access_log /var/log/nginx/access.log upstream_time;
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/nextstep.5minho.p-e.kr/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/nextstep.5minho.p-e.kr/privkey.pem;
    
        ...
    }
}
```
- [x] Cloudwatch 로 모니터링
  - [x] Cloudwatch 로 로그 수집하기
  - [x] Cloudwatch 로 메트릭 수집하기

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요

#### application
* ip : 3.34.196.155
* 로그 경로 : /home/ubuntu/app/infra-subway-monitoring/log (https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/5minho_was_sys_log)
#### reverse-proxy
* ip : 3.37.87.194
* 로그 경로 
  * /var/log/nginx/access.log (https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/5minho_reverse_proxy_access.log)
  * /var/log/nginx/error.log (https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/5minho_reverse_proxy_error.log)

2. Cloudwatch 대시보드 URL을 알려주세요

https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-5minho;start=PT1H

---
-[x] 웹 성능 테스트
    -[x] 예산 작성
    -[x] 개선이 필요한 부분 파악
-[x] 부하테스트
    -[x] 목표치 설정
    -[x] 부하 테스트를 위한 네트워크 구성
    -[x] 부하 테스트 진행
    
### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요 
   
경쟁사와(카카오맵) 와 비교해서 결정 ([PageSpeed 사이트](https://developers.google.com/speed/pagespeed/insights/) 비교)

| 항목                    | 카카오맵 | 지하철노선도 | 목표치|  
|------------------------|--------|----------|------|
|First Contentful Paint  |  0.6s  |   3.0s   | 0.7s |
|Time to Interactive     |  2.7s  |   3.2s   | 2.0s |
|Speed Index             |  2.8s  |   3.0s   | 2.0s |  
|Total Blocking Time     | 720 ms |   30ms   | 30ms |
|Largest Contentful Paint|  0.6s  |   3.0s   | 1.0s |
|Cumulative Layout Shift | 0.017  |   0      | 0    |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   * 웹 서버에서 gzip 적용 해주기
   * css, js, image 같은 정적 파일에 cache-control 설정 해주기
   * 코드 스플리팅 적용하기
   * 사용하지 않는 js 코드 삭제하기
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
* 대상 시스템 범위
  * web server, application server, db server
* 목푯값 설정
  1. DAU : 5,000,000 명 (카카오맵, T맵의 DAU 를 참고)
  2. 1 명당 1일 요청 수 : 2 x 3 = 6 (접속 수 (출근, 퇴근) x 요청 수 (내 정보 조회 + 지하철 목록 조회 + 최단 경로 조회)) 
  3. 1일 총 요청 수 : 30,000,000 (1일 사용자 수(DAU) x 1명당 1일 평균 요청 수)
  4. 1일 평균 rps : 347,222 (1일 총 요청 수 / 86,400 (초/일))
  5. 1일 최대 rps : 1,736,110 (1일 평균 rps x (최대 트래픽 / 평소 트래픽), 5배 정도 예상했음) 
  6. latency : 100ms
* 부하 테스트 시 저장될 데이터 건수 및 크기 
    * 저장되는 데이터 없음 
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

* 접속 빈도가 높은 페이지 : 메인페이지 (로그인 api, 내 정보 조회 api)
    * [Smoke](./page-test/main-page/smoke/README.md)
    * [Load](./page-test/main-page/load/README.md)
    * [Stress](./page-test/main-page/stress/README.md)
* 데이터를 갱신하는 페이지 페이지 : 내 정보 수정 페이지 (로그인 api, 내 정보 수정 api)
    * [Smoke](./page-test/update-page/smoke/README.md)
    * [Load](./page-test/update-page/load/README.md)
    * [Stress](./page-test/update-page/stress/README.md)
* 데이터를 조회하는데 여러 데이터를 참조하는 페이지 : 경로 검색 페이지 (지하철 api, 경로 검색 api)
    * [Smoke](./page-test/line-search-page/smoke/README.md)
    * [Load](./page-test/line-search-page/load/README.md) 
    * [Stress](./page-test/line-search-page/stress/README.md)
