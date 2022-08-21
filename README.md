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

# 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

우선 타사와 자사 서비스 퍼포먼스 측정 결과입니다.  

측정 서비스:  
https://pagespeed.web.dev/

> 참고: 자사 서비스의 사용자 데이터가 없기 때문에 실제 사용자 경험 스코어는 사용하지 않음

## 1.1. 데스크탑에서의 성능  
| Web             | FCP  | SI   | LCP   | TTI  | TBT   | CLS   | Total Score |  
|-----------------|------|------|-------|------|-------|-------|-------------|  
| Naver Map       | 0.4s | 3.6s | 9.6s  | 3.6s | 780ms | 0     | 38          |  
| Kakao Map       | 0.6s | 3.1s | 0.6ms | 2.6s | 670ms | 0.018 | 74          |  
| 서울교통공사          | 1.5s | 2.2s | 3.7s  | 1.9s | 90ms  | 0     | 69          |  
| Running Map(자사) | 2.7s | 2.7s | 2.8s  | 2.8s | 50ms  | 0.004 | 67          |  

## 1.2. 모바일에서의 성능
| Mobile          | FCP  | SI   | LCP   | TTI  | TBT   | CLS   | Total Score |  
|-----------------|------|------|-------|------|-------|-------|-------------|
| Naver Map       |2.3s|12.0s|18.3s|23.2s|14,170ms|0.017|23|
| Kakao Map       |1.7s|7.0s|6.4s|4.2s|60ms|0.139|66|
| 서울교통공사          |6.8s|7.9s|11.4s|8.2s|940ms|0|30|
| RunnaingMap(자사) |14.6s|14.6s|15.2s|15.2s|490ms|0.042|34|

## 1.3. 분석

우선 모바일에서 전반적으로 성능이 떨어집니다. 또, TTI가 타사 서비스에 비해 눈에 띄게 느립니다.  
TTI가 낮기 때문에 처음 앱 오픈 시 느리거나 멈추었다는 느낌을 줄 수 있습니다.  

# 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

노선 조회라는 서비스 특성 상 TTI를 개선하여 기민한 사용성을 제공하는 것이 좋다고 생각합니다.  

## 2.1. gzip을 적용해보기

우선 사이즈가 큰 리소스의 목록은 다음과 같습니다.

|URL|Cache TTL| Size    |
|---|---------|---------|
|/js/vendors.js|None| 2125KiB |
|/js/main.js|None| 172KiB  |
|/images/main_logo.png|None| 4KiB    |
|/images/logo_small.png|None| 1KiB    |

js는 minify가 되어 있다고 판단되므로 프론트 레벨에서 사이즈 개선은 여기까지가 최대치입니다.  
하지만 gzip을 적용하여 더 줄일 여지가 존재합니다. 따라서 gzip을 적용해보았습니다.  
참고로 압축 레벨은 6으로 하였습니다. 버퍼 사이즈나 min_length 기준은 지금 당장 중요하지 않아 설정하지 않았습니다.  

적용이 되는 리소스는 다음과 같습니다.
```
    text/plain
    text/css
    text/js
    text/xml
    text/javascript
    application/javascript
    application/x-javascript
    application/json
    application/xml
    application/rss+xml
    image/svg+xml
```

* gzip 적용 후 vendors.js 사이즈: 2125kib -> 419kib
* 지표변화 
  * 웹(데스크탑)
    * 기존: 2.7s|2.7s|2.8s|2.8s|50ms|0.004|67 
    * 변경: 1.2s|1.7s|1.3s|1.3s|50ms|0.004|92 
  * 모바일 
    * 기존: 14.6s|14.6s|15.2s|15.2s|490ms|0.042|34 
    * 변경: 5.1s|5.2s|5.7s|5.7s|540ms|0.042|49 
  * 분석 
    * 리소스의 사이즈가 전반적으로 감소하면서 클라에 delivery 되는 시간이 빨라짐
    * 다만 모바일에서 TBT 상승은 압축 레벨이 높아서 해제하는데 걸리는 시간이 증가한걸까? 
      * TODO: 압축 레벨을 변경해가면서 실험해보자

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
