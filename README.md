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
- 경쟁사인 카카오맵이 FCP 1.7초, TTI 4.5초
- 제가 올린 서버는 FCP 14.6초, TTI 15.2초로 걸리는 것을 확인하였습니다.
- 실제로 사용하기까지 시간을 짧게 줄이는 것을 목표로 하고 TTI를 경쟁사와 비슷한 수준인 5초로 목표를 정하였습니다.
2. 성능 개선 결과를 공유해주세요
![](../../Desktop/스크린샷 2022-10-07 오후 8.16.40.png)
![](../../Desktop/스크린샷 2022-10-07 오후 10.31.17.png)
3. 
3. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
- gzip 압축 적용 후 -> FCP 6.8초, TTI 7.6초로 개선(개선 후 브라우져 캐쉬가 적용되었을지 몰라, 시크릿 모드에서 진행)
- cache 적용 후 -> FCP 5.3 초, TTI 5.9초
- TLS, HTTP/2 설정 -> FCP 5.3 초, TTI 6.0초(단일 요청이라 성능 개선은 크게 되지 않았던 것 같습니다.)
- 정적 파일 경량화 적용 후 -> FCP 2.5 초, TTI 5.7초


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
