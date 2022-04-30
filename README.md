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
||[네이버 지도](https://map.naver.com/v5/directions/-/-/-/transit?c=14137575.5199888,4524330.9973991,15,0,0,0,dh)|[카카오지도]()|[nextstep subway](https://dibtp1221.kro.kr/)|
|----------------|-------------------------------|-----------------------------|-----------------------------|
|FCP|0.389|0.741|4.853|
|TTI|3.2|2.5|2.8|
|Speed Index|1.931|3.878|4.803|
|LCP|3.975|2.141|4.885|
|TBT|0.021|0.059|0.005|

#### 타사 비교 (Repeat View, 데스크톱)
사이트 3개 모두 메트릭 webpage test 수치 사용.
단위: 초(s)
||[네이버 지도](https://map.naver.com/v5/directions/-/-/-/transit?c=14137575.5199888,4524330.9973991,15,0,0,0,dh)|[카카오지도]()|[nextstep subway](https://dibtp1221.kro.kr/)|
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

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
