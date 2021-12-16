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

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
