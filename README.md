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

### 경쟁사 분석
#### 휴대전화 성능 지표
|서비스|성능|FCP(초)|LCP(초)|TTI(초)|TBT(밀리초)|SI(초)| CLS |
|---|---|---|---|---|---|---|---|
|서울교통공사|25|6.4|6.6|9.2|1810|8.7| 0|
|네이버지도|60|2.2|8|6|250|5.8|0.03|
|카카오맵|70|1.7|5|4.1|40|6.7|0.139|

#### 데스크탑 성능 지표
|서비스|성능|FCP(초)|LCP(초)|TTI(초)| TBT(밀리초) |SI(초)|CLS|
|---|---|---|---|---|---|---|---|
|서울교통공사|70|1.5|3.7|2|70|2.3|0|
|네이버지도|90|0.5|1.6|0.5|0|2.2|0.006|
|카카오맵|92|0.5|1.3|0.7|0|2.2|0.003|

#### 경쟁사를 분석 해보았을때 런닝맵의 웹 성능예산을 아래와 같이 정리하였습니다.
| 지표    | 모바일      | 데스크탑     |
|-------|----------|----------|
| FCP   | 3s       | 0.5s     |
| LCP   | 6s       | 1s       |
| TTI   | 5s       | 0.5s     |
| TBT   | 500ms    | 10ms     |
| JS,CSS | 300KB 미만 | 300KB 미만 |
| 글꼴    | 500KB 미만 | 500KB 미만 |
| Image | 1MB 미만   | 1MB 미만   |
| 성능점수  | 60점 이상   | 80점 이상   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* JS/CSS/글꼴/이미지등의 정적 리소스는 최적화 및 축소하여 네트워크 전송 용량을 줄입니다.
* JS/CSS는 병합하여 브라우저의 호출 횟수를 줄입니다.
* CDN과 캐시를 사용하여 빠르게 컨텐츠를 제공할 수 있도록 합니다.
* 프록시 서버에서도 웹 컨텐츠를 캐싱합니다.
* 데이터베이스 조회 결과를 Redis등으로 캐싱하여 디비 I/O를 줄입니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
