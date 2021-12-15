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

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
- web 서버
  - /log/file.log
- nginx 서버
  - /var/log/nginx/access.log
  - /var/log/nginx/error.log
    
2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-vvshinevv

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
```text
A. 예비 분석
 - 메인 페이지
  - 이유: 서비스의 진입점
   
B. 경쟁사 분석
 - 사이트 (https://xn--o26bo7nvya.xn--h32bi4v.xn--3e0b707e/) - webpagetest.org 분석 결과
    - First Contentful Paint    : 6106.667(ms) 
    - Largest Contentful Paint  : 6330.000(ms)
    - Load Time                 : 6458.667(ms)
    - Browser-reported Load Time: 6458.000(ms)
    - Speed Index               : 6121.667(ms)
    - Time to First Byte        : 1145.668(ms)
   
 - 네이버 지하철 (https://m.map.naver.com/subway/subwayLine.naver?region=1000) - webpagetest.org 분석 결과
    - First Contentful Paint    : 2179.667(ms) 
    - Largest Contentful Paint  : 7189.667(ms)
    - Load Time                 : 3217.000(ms)
    - Browser-reported Load Time: 3217.333(ms)
    - Speed Index               : 6139.000(ms)
    - Time to First Byte        :  828.333(ms)
 
    
C. 성능 기준 설정
  - 네이버 지하철과 동등한 기준으로 측정 설정
  - 네이버 지하철 (https://m.map.naver.com/subway/subwayLine.naver?region=1000) - webpagetest.org 분석 결과
    - First Contentful Paint    : 2179.667(ms) 
    - Largest Contentful Paint  : 7189.667(ms)
    - Load Time                 : 3217.000(ms)
    - Browser-reported Load Time: 3217.333(ms)
    - Speed Index               : 6139.000(ms)
    - Time to First Byte        :  828.333(ms)

```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
```text
A. 압축 기능 사용
 - properties
  - server.compression.enabled=true
  - server.compression.mime-types=text/html,text/css,application/javascript,application/json
  - server.compression.min-response-size=1024
  
 - webpagetest.org 결과
  - Largest Contentful Paint 6.369s -> 3.521s
  - Compress Transfer F -> A
  
 - pagespeed.web.dev 결과
  - Performance 30 -> 90    
```

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
```text

```

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
```text

```
