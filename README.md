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

- nginx:
    - access log: /home/ubuntu/nginx/access.log
    - error log: /home/ubuntu/nginx/error.log
- logPath: /home/ubuntu/infra-subway-monitoring-app/logs/infra-subway-monitoring.log
- WAS: 13.125.64.39

2. Cloudwatch 대시보드 URL을 알려주세요

- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-chaeyun17

---

### 2단계 - 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

타 경쟁 사이트와 비교

네이버맵

![네이버맵](docs/naver_map.jpg)

카카오맵

![카카오맵](docs/kakao_map.jpg)

현재 서비스

![나의 맵](docs/my_map.jpg)

First Contentful Paint, Largest Contentful Paint 개선이 필요함을 확인함

3. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 기반 리소스를 압축(gzip, deflate, brotli)
- 이미지 요소에 명시적인 너비 및 높이를 설정
- 이미지 파일 해상도 줄이기
- 정적 파일 캐싱 설정
- 웹 폰트 다이나믹 로딩 설정

67 -> 91 으로 개선

![나의_맵_개선](docs/my_map_improve.jpg)

5. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 1일 총 접속수 = 1일 사용자 수 * 1명당 1일 평균 접속수
- 1일 평균 rps = 1일 총 접속수 / 86400(초/일)
- 1일 최대 rps = 1일 평균 rps * (최대 트래픽 / 최소 트래픽)


- 네이버지도 한달 순이용자수: 1380만
- 카카오지도 한달 순이용자수: 840만
- 현 서비스 예상 한달 순이용자수: 100만 (1000만 의 10%)
- 현 서비스의 예상 하루 순이용자수: 33,333명


- 33,333명 (1일 사용자수) * 3 회(한명당 하루 접속수) => **9999 (1일 총 접속수)**
- 99,999 회 (1일 총 접속수) / 86400 => **1.15(1일 평균 rps)**
- 1.15 (1일 평균 rps) * (최대 트래픽/평소트래픽) => **10 (1일 최대 rps)**

7. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

