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
**1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요**

#### 1) 경쟁사 성능 지표 비교                
|서비스|FCP|TTI|SI|TBT(ms)|LCP|CLS|성능점수|
|---|---|---|---|---|---|---|---|
|서울교통공사|1.6s|2.0s|2.4s|140ms|3.7s|0.014|66|
|네이버지도|0.5s|1.2s|2.2s|20ms|1.7s|0.006|87|
|카카오|0.5s|0.7s|2.2s|0ms|1.1s|0.003|94|
|지하철노선도|2.7s|2.8s|2.7s|50ms|2.8s|0.04|67|

- 관공서 사이트가 네이버/카카오 서비스 회사보다 성능이 떨어짐
- 네이버,카카오에 준하는 성능이 나와야 경쟁력이 있을듯
- MAU가 가장 높아 서버 요청이 많음에도 네이버/카카오가 좋은 성능으로, 앞으로도 많은 사용자들이 이용할 것으로 보임


---
#### 2) 서비스 목표값
|FCP|TTI|SI|TBT(ms)|LCP|CLS|성능점수|
|---|---|---|---|---|---|---|
|0.5s|0.6s|2.0s|10ms|1.4s|0.004|91|

* 지하철 노선도는 실제 노선 검색으로 이어질 확률이 매우 높음으로,
  사용자가 완전히 웹 페이지와 interactive 가능한 시간이 단축되어야 한다. (TTI)
* 직접 사용자의 눈에 화면의 컨텐츠가 채워지는 속도로 일반 사람들은 해당 사이트가 빠른지 판단하게 될 것으로 보임(SI)
* TTI, SI는 경쟁사 대비 가장 높은 목표 수치
* 나머지는 네이버/카카오의 평균 수치로 목표

---

**2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요**
1) 리소스에 텍스트 압축 사용
    > gzip, deflate, brotli 등을 이용한 텍스트 기반 리소스 압축
2) 차세대 형식을 사용해서 이미지를 제공
    > WebP 및 AVIF와 같은 이미지 형식은 PNG나 JPEG보다 압축률이 높기 때문에 다운로드가 빠르고 데이터 소비량도 적음
3) 사용하지 않는 자바스크립트 줄이기
4) 렌더링 차단 리소스 제거하기
    > 중요한 JS/CSS를 인라인으로 전달하고 중요하지 않은 모든 JS/Style을 지연

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
