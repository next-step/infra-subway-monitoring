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
    - 웹서버 : /var/log/subway/file.log, /var/log/subway/spring.log
    - Nginx: /var/log/nginx/access.log, /var/log/nginx/error.log
2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=minseoklim-dashboard
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 페이지로드 3초 미만
- TTI 5초 미만
- Lighthouse 점수 80점 이상
(WebPageTest, PageSpeed, Lighthouse 등을 이용해 어디까지 성능 개선이 가능한지를 먼저 검토한 후, 일반적인 성능 예산 기준도 참고하여 결정하였습니다.)
(Quantity Based의 경우, 제가 소스 코드를 수정하는데는 한계가 있다고 판단하여 정하지 않았습니다.)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- JS 파일 gzip 압축 및 캐싱 처리
- 이미지 캐싱 처리
- css 스크립트에 defer 속성 추가하여 blocking 시간 줄이기
- image 태그에 width와 height 명시

#### <개선 전>
![스크린샷 2021-12-16 오전 10 29 48](https://user-images.githubusercontent.com/36442984/146302964-05b62fcd-331b-4e0a-ae60-a886dcd15014.png)
![스크린샷 2021-12-16 오후 12 29 10](https://user-images.githubusercontent.com/36442984/146303087-9dae1f66-030d-4714-a348-dc329852823c.png)

#### <개선 후>
![스크린샷 2021-12-16 오후 12 29 55](https://user-images.githubusercontent.com/36442984/146303140-b8d67a1e-41cb-453a-87f8-83814de1380f.png)
![스크린샷 2021-12-16 오후 12 30 34](https://user-images.githubusercontent.com/36442984/146303197-1931a622-84d7-4f04-8afe-95016a75660f.png)
![스크린샷 2021-12-16 오후 12 31 22](https://user-images.githubusercontent.com/36442984/146303264-e3b67961-ab8f-433d-b424-3aa9c4176f3d.png)

(테스트는 가장 느린 것으로 보이는 https://minseoklim.p-e.kr/stations을 대상으로 진행하였습니다)

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- DAU: 10000, 피크시간 집중률: 10, 1명당 1일 평균 접속 수: 50 으로 가정
- 1일 평균 rps: (10000 * 50) / 86400 = 5.8 -> (DAU * 1명당 1일 평균 접속 수) / 86400 
- 1일 최대 rps: 5.8 * 10 = 58 -> 1일 평균 rps * 피크시간 집중률

- 테스트 대상 엔드포인트
  - 로그인 : POST /login/token {"email":"test@test.com","password":"password"}
  - 내 정보 조회 : GET /members/me
  - 지하철역 목록 조회 : GET /stations
  - 경로 검색 : GET /paths/?source=1&target=2
  - 지하철역 저장 : POST /stations {"name": "TEST"}
  - 노선 저장 : POST /lines {"name":"TEST","color":"red lighten-1","upStationId":1,"downStationId":2,"distance":"1"}

- Smoke Test VUser: 1
- Load Test VUser: 58 * (6 * 1.5) / 6 = 87 -> 1일 최대 rps * (요청 횟수 * http_req_duration) / 요청 횟수
- Stress Test VUser: 500 * (6 * 1.5) / 6 = 750 -> 목표 rps * (요청 횟수 * http_req_duration) / 요청 횟수

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- 스크립트는 k6 디렉토리 내에 작성하였습니다.
- Smoke 테스트 결과
![스크린샷 2021-12-16 오후 4 10 37](https://user-images.githubusercontent.com/36442984/146325117-aca27c79-7169-44de-ba46-bfb874d1a70e.png)
- Load 테스트 결과
![스크린샷 2021-12-16 오후 4 13 09](https://user-images.githubusercontent.com/36442984/146325111-b51989c6-5ccd-4ff0-9846-7a2459eb7a7a.png)
- Stress 테스트 결과
![스크린샷 2021-12-16 오후 4 14 49](https://user-images.githubusercontent.com/36442984/146325104-744e8089-f4b3-4337-9609-19078889271f.png)
