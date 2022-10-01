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


### 1단계 - 화면 응답 개선하기
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요. 이 때, 서버 목표 응답시간은 어떻게 되나요?

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

Mobile

|구분|original|gzip 적용 후|cache 적용 후|TLS, HTTP/2 적용 후|js async 적용 후|dynamic import 적용 후|
|---|---|---|---|---|---|---|
|성능|35|33|35|34|32|31|
|First Contentful Paint|14,900 ms|14,500 ms|14,400 ms|14,800 ms|2,500 ms|2,500 ms|
|Time to Interactive|15,400 ms|15,100 ms|15,000 ms|15,300 ms|14,300 ms|14,500 ms|
|Speed Index|14,900 ms|14,500 ms|14,400 ms|14,800 ms|9,800 ms|8,900 ms|
|Total Blocking Time|450 ms|490 ms|430 ms|470 ms|920 ms|1,090 ms|
|Largest Contentful Paint|15,400 ms|15,100 ms|15,000 ms|15,300 ms|15,100 ms|15,200 ms|
|Cumulative Layout Shift|0.042|0.042|0.042|0.041|0.042|0.041|

Desktop

|구분|original|gzip 적용 후|cache 적용 후|TLS, HTTP/2 적용 후|js async 적용 후|dynamic import 적용 후|
|---|---|---|---|---|---|---|
|성능|59|68|68|64|78|77|
|First Contentful Paint|3,200 ms|2,600 ms|2,700 ms|3,000 ms|700 ms|700 ms|
|Time to Interactive|3,400 ms|2,700 ms|2,800 ms|3,100 ms|2,600 ms|2,600 ms|
|Speed Index|4,500 ms|2,600 ms|2,700 ms|3,000 ms|2,400 ms|2,500 ms|
|Total Blocking Time|110 ms|40 ms|30 ms|80 ms|70 ms|100 ms|
|Largest Contentful Paint|3,300 ms|2,700 ms|2,800 ms|3,100 ms|2,700 ms|2,700 ms|
|Cumulative Layout Shift|0.004|0.004|0.004|0.004|0.004|0.004|



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 스케일 아웃

1. Launch Template 링크를 공유해주세요.

2. cpu 부하 실행 후 EC2 추가생성 결과를 공유해주세요. (Cloudwatch 캡쳐)

```sh
$ stress -c 2
```

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
---

### [추가] WAS 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
