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
    - application: /home/ubuntu/log/infra-subway-monitoring.log
    - system: /var/log/syslog
    - access: /var/log/nginx/access.log
    - error: /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=dhmin5693-dashboard

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

```text
A. 예비 분석
  1. 가장 중요한 페이지
    - 메인페이지: 서비스의 진입점이므로, 이 페이지 로딩이 느리면 사용자가 이탈할 가능성이 높다.

B. 경쟁사 분석
  1. 현재 내 사이트 상태 (https://my-subway.r-e.kr)
    - First Contentful Paint    : 14.7 s
    - Time to Interactive       : 15.3 s
    - Speed Index               : 14.7 s
    - Total Blocking Time       : 550 ms
    - Largest Contentful Paint  : 15.3 s
    
  2. 서울교통공사 사이버스테이션
    - First Contentful Paint    : 7.0 s
    - Time to Interactive       : 9.5 s
    - Speed Index               : 11.5 s
    - Total Blocking Time       : 1,470 ms
    - Largest Contentful Paint  : 7.1 s
    
  3. 카카오맵
    - First Contentful Paint    : 2.5 s
    - Time to Interactive       : 5.3 s
    - Speed Index               : 6.9 s
    - Total Blocking Time       : 60 ms
    - Largest Contentful Paint  : 5.5 s    

C. 성능 목표: 경쟁사 대비 최소 동등, 20% 이상의 성능
  - First Contentful Paint    : 2초 미만
  - Time to Interactive       : 4초 미만
  - Speed Index               : 5.5초 미만
  - Total Blocking Time       : 0.05초 미만
  - Largest Contentful Paint  : 4.5초 미만

```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

```text
1. 텍스트 압축 기능 사용 (적용 후 FCP 14.7s -> 5.3s 로 개선)
  - Spring boot properties 추가
    - server.compression.enabled=true
    - server.compression.mime-types=text/html,text/css,application/javascript,application/json

2. 렌더링 차단 리소스 제거 (적용 후 TTI 5.9s -> 5.8s, SI 6.3s -> 5.5s, TBI 590ms -> 450ms 로 개선)
  - 일부 css의 로드 방식 변경
  - <link href={HREF} rel="preload" as="style" onload="this.rel='stylesheet'"><noscript><link rel="stylesheet" href={HREF}></noscript>
```

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

```text
참고) 경쟁사 카카오맵의 MAU 530만 (https://biz.chosun.com/site/data/html_dir/2020/07/09/2020070901297.html)

1. 예상 DAU
  - 카카오맵을 경쟁사로 삼았으나 현실적으로 카카오맵의 아성을 단번에 따라잡기는 어렵다고 판단
  - 카카오맵의 절반 수준 MAU인 250만을 기준으로 선정
  - DAU는 250만 / 30일의 값을 조금 보정한 85,000으로 설정

2. 예상 피크 시간대
  - 출퇴근 시간에 피크 예상
  - 07:00 ~ 10:00 AM, 06:00 ~ 09:00 PM

3. 1명당 1일 평균 접속 혹은 요청 수
  - 출/퇴근 시간에 1번씩 접속(총 2회)
  - 메인 페이지, 로그인, 메인 페이지, 즐겨찾기 페이지, +@로 평균 5번 요청한다고 가정

4. Throughput (1일 평균 RPS ~ 최대 RPS)
  - 1일 사용자 수(DAU) * 1명당 1일 평균 접속 수 = 85,000 * 10 = 850,000 (1일 총 접속수)
  - 1일 총 접속 수 / 86,400 (초/일) = 850,000 / 86,400 = 평균 9.83 (1일 평균 rps)
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 9.83 * 10(가정치) = 98.3 (1일 최대 rps)

```

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
