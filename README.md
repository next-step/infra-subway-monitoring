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

```KEY:KEY-DOYOUNG0205-NEXT-STEP.pem```

- WAS SERVER (EC2-doyoung0205-was-01)
    - /var/log/syslog
    - /var/subway-was/log/file.log
    - /var/subway-was/log/subway-monitor-api.log
- WAS SERVER (EC2-doyoung0205-was-02)
    - /var/log/syslog
    - /var/subway-was/log/file.log
    - /var/subway-was/log/subway-monitor-api.log

- ALB : `ALB-doyoung0205`

- 로그 그룹
    - LOG_GROUP_doyoung0205-was1-api
    - LOG_GROUP_doyoung0205-was1-monitor
    - LOG_GROUP_doyoung0205-was1-syslog
    - LOG_GROUP_doyoung0205-was2-api
    - LOG_GROUP_doyoung0205-was2-monitor
    - LOG_GROUP_doyoung0205-was2-syslog


2. Cloudwatch 대시보드 URL을 알려주세요 <br/>
   [대시보드링크](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=doyoung0205-dashboard)
3.

---

### 2단계 - 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

| 항목                    | 현재  | 네이버 지하철 | 성능예산 | 
|-----------------------|-----|---------|------|
| security score        | F   | F       | F    | 
| first byte time       | A   | A       | A    | 
| keep-alive enabled    | A   | A       | A    | 
| **compress transfer** | F   | A       | A    |
| compress images       | A   | A       | A    | 
| cache static content  | C   | C       | C    | 
| effective use cdn     | X   | X       | A    | 

| 항목                       | 현재    | 네이버 지하철 | 성능예산 |
|--------------------------|-------|---------|------|
| First Contentful         | 14.6  | 0.5     | 3    | 
| Speed Index              | 14.6  | 2.1     | 3    | 
| Largest Contentful Paint | 15.2  | 1.7     | 3    | 
| Time to Interactive      | 15.4  | 1.6     | 3    | 
| Total Blocking Time      | 0.7   | 0.3     | 0.5  | 
| Cumulative Layout Shift  | 0.039 | 0.006   | 0.02 | 

`단위: 초`

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 압축기능 제공 : gzip, deflate 등
- 자바스크립트 최적화 : 지연로딩
- 정적 자원에 캐시적용 : CDN (CloudFront, S3)
- 웹폰트 로드 되는 동안 텍스트 표시하기 : swap display
- 이미지 요소의 width 와 height 명시 하기
- 캐싱 설정,

3부하테스트 전제조건은 어느정도로 설정하셨나요

- DAU 설정: 9만명
  - '네이버 지도'의 MAU가 1112만명 이고 DAU는 36만 명으로 예상
    [관련기사](https://www.asiae.co.kr/article/2020070908251213843)
  - 네이버 맵을 경쟁사로 삼았으나 네이버 맵은 지하철 노선 관련 서비스만 있는것 아니고
  - 현실적으로 아성을 한번에 따라잡기는 판단하여 9만명으로 설정

- 1명당 1일 평균 접속 수 : 6
  - 출퇴근 시간에 평균적으로 각각 2번 접속
  - 접속시 3번의 추가 요청 (메인 페이지, 경로조회 결과 페이지, 경로검색 결과 페이지)
  - 6 으로 설정

- Throughput
  - 1일 사용자 수(DAU) `9만` x 1명당 1일 평균 접속 수 `6` = 1일 총 접속 수 `54만`
  - 1일 총 접속 수 `54만` / 86,400 (초/일) = 1일 평균 rps `6.25`
  - 1일 평균 rps `6.25` x (최대 트래픽 / 평소 트래픽) `10(가정치)` = 1일 최대 rps `62`


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- ### 접속 빈도가 높은 메인 페이지
  - [load 테스트 결과](./k6/main/load-result.txt)
  - [smoke 테스트 결과](./k6/main/smoke-result.txt)
  - [stress 테스트 결과](./k6/main/stress-result.txt)

- ### 데이터를 갱신하는 내정보 수정 페이지

  - [load 테스트 결과](./k6/myinfo-update/load-result.txt)
  - [smoke 테스트 결과](./k6/myinfo-update/smoke-result.txt)
  - [stress 테스트 결과](./k6/myinfo-update/stress-result.txt)

- ### 데이터를 조회하는데 여러 데이터를 참조하는 경로 탐색 페이지
  - [load 테스트 결과](./k6/path/load-result.txt)
  - [smoke 테스트 결과](./k6/path/smoke-result.txt)
  - [stress 테스트 결과](./k6/path/stress-result.txt)
