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
<img width="960" alt="스크린샷 2022-10-07 오후 8 16 40" src="https://user-images.githubusercontent.com/29122916/194697847-a15604ca-c6d5-4c2d-bdde-cbe6e6dce78c.png">
<img width="960" alt="스크린샷 2022-10-07 오후 10 31 17" src="https://user-images.githubusercontent.com/29122916/194697858-306f60eb-cbca-4427-911d-d1fd6cc7fe82.png">
3. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
- gzip 압축 적용 후 -> FCP 6.8초, TTI 7.6초로 개선(개선 후 브라우져 캐쉬가 적용되었을지 몰라, 시크릿 모드에서 진행)
- cache 적용 후 -> FCP 5.3 초, TTI 5.9초
- TLS, HTTP/2 설정 -> FCP 5.3 초, TTI 6.0초(단일 요청이라 성능 개선은 크게 되지 않았던 것 같습니다.)
- 정적 파일 경량화 적용 후 -> FCP 2.5 초, TTI 5.7초


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
  - 백만명
- 피크 시간대의 집중률을 예상해봅니다. (최대 트래픽 / 평소 트래픽)
  - 3(평소 트래픽 대비 피크 시간대의 집중률 3배라고 설정)
- 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
  - 3
- 이를 바탕으로 Throughput을 계산합니다
  - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
    ->  백만 * 3 = 3백만
  - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
    -> 3백만 / 86400 = 34
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
    - 34 * 3 = 102
- T = (R * http_req_duration) (+ 1s) = (2 * 1) + 0 = 2
- VUser = (목표 rps * T) / R = 34 * 2 / 2 = 34
- Latency: 100 ms
   
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- smoke test
<img width="959" alt="스크린샷 2022-10-11 오전 2 25 38" src="https://user-images.githubusercontent.com/29122916/194921811-ae45836b-5ba0-4f44-b1c6-bd038f49ba56.png">
- load test
  <img width="921" alt="스크린샷 2022-10-11 오전 2 57 59" src="https://user-images.githubusercontent.com/29122916/194926639-7888725c-b33f-4f90-9805-434f41126877.png">
- Stress test
<img width="928" alt="스크린샷 2022-10-11 오전 3 00 58" src="https://user-images.githubusercontent.com/29122916/194927001-cfea419b-e329-4b0a-b32d-fcb2e4a0053e.png">
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
