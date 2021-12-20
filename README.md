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
- /var/log/syslog
- /var/log/nginx
- /home/ubuntu/infra-subway-monitoring/log/file.log
- /home/ubuntu/infra-subway-monitoring/log/json.log
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=tbvjdudfhr-dashboard
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

   | 항목                       | 현재       | 네이버 지하철 | 성능예산 |
   |---------------------------|-------    |---------|------|
   | First Contentful          | 14.5      | 2.0     | 5    |
   | Speed Index               | 14.5      | 5.3     | 7    |
   | Largest Contentful Paint  | 15.1      | 7.7     | 9    |
   | Time to Interactive       | 15.1      | 5.9     | 8    |
   | Total Blocking Time       | 540(밀리초)| 220     | 350  |
   | Cumulative Layout Shift   | 0.041     | 0.03    | 0.035 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 텍스트 압축 사용
   - 사용하지 않는 자바스크립트 줄이기
   - 캐시정책
   - 이미지 요소 width 및 height 명시
   - 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - DAU 설정: 17만명
      - '네이버 지도'의 MAU가 1112만명 이고 DAU는 36만 명으로 예상

   - 1명당 1일 평균 접속 수 : 6
      - 출퇴근 시간에 평균적으로 각각 2번 접속
      - 접속시 3번의 추가 요청 (메인 페이지, 경로조회 결과 페이지, 경로검색 결과 페이지)
      - 6 으로 설정

   - Throughput
      - 1일 사용자 수(DAU) `17만` x 1명당 1일 평균 접속 수 `6` = 1일 총 접속 수 `102만`
      - 1일 총 접속 수 `102만` / 86,400 (초/일) = 1일 평균 rps `11.8`
      - 1일 평균 rps `11.8` x (최대 트래픽 / 평소 트래픽) `10(가정치)` = 1일 최대 rps `118`
  
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - 메인 (로그인, 내정보 조회, 즐겨찾기)
   - 경로 (지하철 역조회. 최단 거리 조회)
   - 업데이트 (로그인, 노선 목록 조회, 노선 정보 변경)
   
