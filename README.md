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

![pagespeed](/images/before/page-speed.png)
![pagespeed](/images/before/page-speed-seoul.png)
![pagespeed](/images/before/webpage-test.png)
![pagespeed](/images/before/webpage-test-seoul.png)
First Contentful Paint 1초 이내로 줄이기
성능점수 60점까지 올리기 (현재 31점 / 서울 지하철 21점)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
텍스트 압축 사용
이미지 캐싱 사용

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
지하철을 이용하며 실제로 어플을 사용해 경로를 탐색하는 경우는 처음가는 곳의 경로를 찾을때 왕복으로 2회로 
전체 지하철 이용자수 440만명 중 10프로가 2번 사용한다 가정
- 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
440,000 * 2 = 880,000
- 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
880,000 / 86400 = 약 10
- 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
10 * 3 = 30

5. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
smoke
![test](https://user-images.githubusercontent.com/56009774/160617145-71ccc393-674e-4e55-a033-61145961b28f.png)
![test](https://user-images.githubusercontent.com/56009774/160617162-b1b48b97-11be-44d0-8701-05a1885add26.png)
load
![test](https://user-images.githubusercontent.com/56009774/160617031-d22aaf83-2bc6-4028-998a-1821534afd82.png)
![test](https://user-images.githubusercontent.com/56009774/160617046-19202d50-4706-44f7-b286-a39f03fc4cf9.png)
stress
![test](https://user-images.githubusercontent.com/56009774/160617185-11978959-562e-4f33-b7a6-d353d618f90e.png)
![test](https://user-images.githubusercontent.com/56009774/160617189-9dcd2106-c425-43ee-b7c0-ab07b2dbbdca.png)

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)
smoke
![test](https://user-images.githubusercontent.com/56009774/160616587-1e6c6418-b7f8-4e33-a870-3e1b83503f02.png)
![test](https://user-images.githubusercontent.com/56009774/160616651-c1c5ca4d-e7b6-486f-81d6-6b4a60891dbb.png)
load
![test](https://user-images.githubusercontent.com/56009774/160616247-df1f4c80-579f-4d46-86a6-1e988e7f6b30.png)
![test](https://user-images.githubusercontent.com/56009774/160616433-bf154f1f-cb02-47b2-848a-411b631f2ad8.png)
stress
![test](https://user-images.githubusercontent.com/56009774/160616738-b4ff519f-4236-45f6-acbf-70d5f1f61a72.png)
![test](https://user-images.githubusercontent.com/56009774/160616787-c2083232-8743-4ecf-b14c-0f869e5f3911.png)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
- reverse proxy 개선하기
```
events {}

http {
  upstream app {
    least_conn;
    server 172.17.0.1:8080 max_fails=3 fail_timeout=3s;
    server 172.17.0.1:8081 max_fails=3 fail_timeout=3s;
  }

  # Redirect all traffic to HTTPS
  server {
    listen 80;
    return 301 https://$host$request_uri;
  }
  ## Proxy 캐시 파일 경로, 메모리상 점유할 크기, 캐시 유지기간, 전체 캐시의 최대 크기 등 설정
  proxy_cache_path /tmp/nginx levels=1:2 keys_zone=mycache:10m inactive=10m max_size=200M;

  ## 캐시를 구분하기 위한 Key 규칙
  proxy_cache_key "$scheme$host$request_uri $cookie_user";

  server {
    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/rkdals213.p-e.kr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rkdals213.p-e.kr/privkey.pem;

    # Disable SSL
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    # 통신과정에서 사용할 암호화 알고리즘
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

    # Enable HSTS
    # client의 browser에게 http로 어떠한 것도 load 하지 말라고 규제합니다.
    # 이를 통해 http에서 https로 redirect 되는 request를 minimize 할 수 있습니다.
    add_header Strict-Transport-Security "max-age=31536000" always;

    # SSL sessions
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    location / {
      proxy_pass http://app;
    }

    gzip on; ## http 블록 수준에서 gzip 압축 활성화
    gzip_comp_level 9;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/x-javascript application/javascript text/xml application/xml application/rss+xml text/javascript image/svg+xml application/vnd.ms-fontobject application/x-font-ttf font/opentype;

    location ~* \.(?:css|js|gif|png|jpg|jpeg)$ {
            proxy_pass http://app;

            ## 캐시 설정 적용 및 헤더에 추가
            # 캐시 존을 설정 (캐시 이름)
            proxy_cache mycache;
            # X-Proxy-Cache 헤더에 HIT, MISS, BYPASS와 같은 캐시 적중 상태정보가 설정
            add_header X-Proxy-Cache $upstream_cache_status;
            # 200 302 코드는 20분간 캐싱
            proxy_cache_valid 200 302 10m;
            # 만료기간을 1 달로 설정
            expires 1M;
            # access log 를 찍지 않는다.
            access_log off;
    }
  }
}
```
- redis 적용

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
