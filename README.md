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
- [ ] Cloudwatch 로 모니터링
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

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
