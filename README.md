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
- 네이버맵에서는 일단 더 많은 데이터를 제공하지만 4.0s로 측정이되어 그와 비슷한 시간으로 적당하다고 측정을 했습니다.
- 1초 정도 줄이는 것을 목표로 하고 진행했으나 Total Byte가 줄었는데도 오히려 시간이 늘어 난 것이 의문입니다..

2. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

|  | 나의 웹페이지 | 네이버 맵 | 리버스 프록시 개선후 | 정적 파일 개선 후 | 목표     |
| --- | --- | --- | --- | --- |--------|
| First Byte | 1.240s | 1.335s | 1.597s | 1.650s | 1.200s |
| Start Render | 6.200s | 3.933s | 6.200s | 6.000s | 4.000s |
| FCP | 6.194s | 4.234s | 6.268s | 5.964s | 5.000s |
| Speed Index | 6.213s | 7.413 | 6.229s | 6.028s | 5.500s |
| LCP | 6.390s | 11.240 | 6.458s | 6.124s | 6.000s |
| CLS | .004 | .031 | .058 | .058 |        |
| TBT | ≥ .000s | .303s | .004 | .000 |        |
| Time | 6.816s | 12.313S | 7.355s | 7.014 | 6.0s   |
| Request | 21 |  | 17 | 4s |        |
| Total Byte | 2,493 KB |  | 599KB | 599KB | 1000KB |

3. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요
- 리버스 프록시 서버에 gzip 압축 설정을 통해 HTTP 통신 개선
- nginx 캐싱 설정을 통해 중복된 요청은 좀 더 빠르게 처리하도록 변경
- http 1.1 을 http2.0으로 설정하여 하나의 커넥션에서 동시에 여러개의 메시지를 처리할 수 있도록 변경
- 번들 크기를 줄이고 다이나믹 임포트를 통해 정적 파일에 대한 처리를 하였습니다. 


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
