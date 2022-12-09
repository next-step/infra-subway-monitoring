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


### 1단계 - 웹 성능 테스트
| 측정항목                     | **Running Map** | 네이버 지도 | 카카오맵  |
|--------------------------|-----------------|--------|-------|
| First Contentful Paint   | 15.1s           | 2.2s   | 1.7s  |
| Time to Interactive      | 15.6s           | 6.6s   | 4.5s  |
| Speed Index              | 15.1s           | 5.8    | 6.3s  |
| Total Blocking Time      | 460ms           | 490ms  | 60ms  |
| Largest Contentful Paint | 15.6s           | 7.7s   | 5.5s  |
| Cumulative Layout Shift  | 0.042           | 0.03   | 0.139 |
- First Contentful Paint : 첫 번째 텍스트/이미지가 표시되는 시간
- Time to Interactive : 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- Speed Index : 페이지 콘텐츠가 표시되는 시간
- Total Blocking Time : FCP와 상호작용 시간 사이의 모든 시간의 합
- Largest Contentful Paint : 최대 텍스트 또는 이미지가 표시되는 시간
- Cumulative Layout Shift : 표시 영역 안에 보이는 요소의 이동

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- FCP 3초 이내
- TTI 5초 이내
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- PageSpeed에서 추천하는 개선 사항을 먼저 적용합니다.
    1) 사용하지 않는 자바스크립트와 CSS를 제거
    2) gzip 등으로 텍스트 기반 리소스를 압축하여 네트워크 바이트를 최소화
    3) Largest Contentful Paint 미리 로드
    4) 렌더링 차단 리소스 제거
---

### 2단계 - 부하 테스트 
#### 목표 rps
##### 예상 1일 사용자 수 (DAU)
- 2022년 11월 지하철 승객 수 : 204268648
- 월 승객 수 / 출퇴근(2) / 1개월 = 204268648 / 2 / 30 = 3404477
- 이 중 10%의 사용자만 Running Map을 쓴다고 가정
- **예상 DAU** : 340447
##### 피크 시간대의 집중률
- 최대 트래픽(18-19시) : 1019132 / 10 = 101913명
- 평소 트래픽(13-14시) : 482047 / 10 = 48204명
##### 1명 당 1일 평균 접속 수
- 출근 + 퇴근 = 총 2회
##### throughput : 1일 평균 rps ~ 1일 최대 Rps
> - 1일 사용자 수 x 1명당 1일 평균 접속 수 = 1일 총 접속 수
> - 1일 총 접속 수 / 86400 = 1일 평균 rps
> - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
- 1일 총 접속 수 : 340447 * 2 = 680894
- 1일 평균 rps : 680894 / 86400 = 약 7rps
- 1일 최대 rps : 7 * (101913 / 48204) = 약 14rps
#### VUser
> - Request Rate: measured by the number of requests per second (RPS)
> - VU: the number of virtual users
> - R: the number of requests per VU iteration
> - T: a value larger than the time needed to complete a VU iteration
- R : 3(메인-로그인-검색)
- T : 3 * 0.3 + 1 = 1.9
- 평균 VUser = (7 * 1.9) / 3 = 약 4
- 최대 VUser = (14 * 1.9) / 3 = 약 9

1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 1일 총 접속 수 : 680894
- 1일 평균 / 최대 rps : 7 / 14
- 평균 VUser = 4
- 최대 VUser = 9

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
/src/resources/static/loadTest 내에 포함하였습니다.
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
- /home/ubuntu/logs/subway/_file.log
- /home/ubuntu/logs/subway/_json.log

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=ychxexn-dashboard
