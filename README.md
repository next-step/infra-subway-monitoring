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
   ![image](https://user-images.githubusercontent.com/6476469/161757733-21475074-65df-4d02-94d9-b802c5c50ab5.png)
   <br>
   (네이버 지하철 녹양 -> 신도림 길찾기)
   <br><br>
   ![image](https://user-images.githubusercontent.com/6476469/161765988-543783d8-a5a5-43a7-b13c-da06b6074dea.png)
   <br>
   (Running map 경로검색 페이지)
```
FCP: 0.5초 이하
네이버 수준을 목표
```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
```
불필요한 파일 다운로드 제거, 캐싱 설정, gzip 압축
```

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
```
DAU: 3,000,000 (1,000,000 * 3)
평균 rps: 34.6
최대 rps: 346
```

- 접속 빈도가 높은 페이지(https://pleasesubway.p-e.kr)
    - T: 0.1 (1 * 0.1)
    - 평균 VU: 3.45 (34.6 * 0.1 / 1)
    - 최대 VU: 34.5 (346 * 0.1 / 1)

- 데이터를 갱신하는 페이지(https://pleasesubway.p-e.kr/lines)
    - T: 0.6 (3 * 0.2)
    - 평균 VU: 6.92 (34.6 * 0.6 / 3)
    - 최대 VU: 69.2 (346 * 0.6 / 3)

- 데이터를 조회하는데 여러 데이터를 참조하는 페이지 (https://pleasesubway.p-e.kr/path)
    - T: 0.4 (2 * 0.2)
    - 평균 VU: 6.92 (34.6 * 0.4 / 2)
    - 최대 VU: 69.2 (346 * 0.4 / 2)

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
  - 접속 빈도가 높은 페이지(https://pleasesubway.p-e.kr)
    - [Smoke](./k6/main/smoke.js)
      ![img_1.png](k6/main/img_1.png)
    - [Load](./k6/main/load.js)
      ![img_2.png](k6/main/img_2.png)
    - [Stress](./k6/main/stress.js)
      ![img_1.png](k6/main/img_3.png)
  - 데이터를 갱신하는 페이지(https://pleasesubway.p-e.kr/lines)
    - [Smoke](./k6/lines/smoke.js)
      ![img_1.png](k6/lines/img_1.png)
    - [Load](./k6/lines/load.js)
      ![img_2.png](k6/lines/img_2.png)
    - [Stress](./k6/lines/stress.js)
      ![img_3.png](k6/lines/img_3.png)
  - 데이터를 조회하는데 여러 데이터를 참조하는 페이지 (https://pleasesubway.p-e.kr/path)
    - [Smoke](./k6/path/smoke.js)
      ![img_1.png](k6/path/img_1.png)
    - [Load](./k6/path/load.js)
      ![img.png](k6/path/img.png)
    - [Stress](./k6/path/stress.js)
      ![img_2.png](k6/path/img_2.png)

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
