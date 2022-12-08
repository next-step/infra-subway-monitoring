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
* [ ] 웹 성능 예산 작성 후 서버 목표 응답시간 도출

| Mobile | 서울교통공사 | 네이버지도 | 카카오맵  | RunningMap |
|--------|--------|-------|-------|------------|
| FCP    | 6.7s   | 2.2s  | 1.7s  | 14.9s      |
| SI     | 8.4s   | 6.2s  | 6.1s  | 14.9s      |
| LCP    | 7.5s   | 7.3s  | 5.9s  | 15.4s      |
| TTI    | 9.0s   | 6.6s  | 5.3s  | 15.5s      |
| TBT    | 1050ms | 350ms | 390ms | 500ms      |
| CLS    | 0      | 0.03  | 0.005 | 0.041      |

| Desktop | 서울교통공사 | 네이버지도 | 카카오맵 | RunningMap |
|---------|--------|-------|-------|------------|
| FCP     | 1.4s   | 0.7s  | 0.5s  | 2.7s      |
| SI      | 2.2s   | 2.7s  | 2.4s  | 2.9s       |
| LCP     | 2.7s   | 2.0s  | 1.4s  | 2.8s       |
| TTI     | 2.0s   | 2.0s  | 0.7s  | 2.8s       |
| TBT     | 500ms  | 380ms | 0ms   | 30ms       |
| CLS     | 0.001  | 0.005 | 0.039 | 0.004      |

* 용어
  * FCP(First Contentful Paint): 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타낸다.
  * SI(Speed Index): 콘텐츠가 얼마나 빨리 표시되는지 로드 성능을 보여준다.
  * LCP(Largest Contentful Paint): 최대 텍스트 또는 이미지가 표시되는 시간을 나타낸다.
  * TTI(Time to Interactive): 페이지가 사용자와 상호작용할 수 있게 될 때까지 걸리는 시간이다.
  * TBT(Total Blocking Time): FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현된다.
  * CLS(Cumulative Layout Shift): 표시 영역 안에 보이는 요소의 이동을 측정한다.

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
* 서울교통공사, 카카오맵, 네이버지도 경쟁사들 중 가장 빠른 속도를 지표로 생각했습니다.

  |         | Mobile | Desktop |
  |---------|--------|---------|
  | FCP     | 1.7s   | 0.5s  |
  | SI      | 6.1s   | 2.2s  |
  | LCP     | 5.9s   | 1.4s  |
  | TTI     | 5.3s   | 0.7s  |
  | TBT     | 350ms  | 0ms   |
  | CLS     | 0.005  | 0.001 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
* PageSpeed의 추천 가이드 우선 적용
  * 텍스트 압축 사용 (예상 절감치: 9.3 s)
  * 사용하지 않는 자바스크립트 줄이기 (예상 절감치: 3.45 s)
  * 렌더링 차단 리소스 제거하기 (예상 절감치: 0.75 s)
  * 콘텐츠가 포함된 최대 페인트 이미지 미리 로드 (예상 절감치: 0.48 s)
  * 사용하지 않는 CSS 줄이기 

---

### 2단계 - 부하 테스트
* 용어
  * Smoke Test
    * 중요한 기능이 잘 동작하는지 확인하기 위한 최소한의 부하로 구성된 테스트
  * Load Test
    * 임계치의 한계에 도달할 때까지 시스템에 부하를 꾸준히 증가시키며 진행하는 테스트
  * Stress Test
    * 시스템이 과부하 상태에서 어떻게 작동하는지를 검사하는 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

* 목표 rps 구하기
  * a. 우선 예상 1일 사용자 수(DAU)
    * 100,000명
  * b. 피크 시간대의 집중룰 (최대 트래픽 / 평소 트래픽)  
    * 2 (승/하차인원 18-19시(1,308,385명)를 기준으로 산정)
  * c. 1명당 1일 평균 접속 혹은 요청수
    * 10 
  * d. Throughput : 1일 평균 rps ~ 1일 최대 rps
    * 100,000(DAU) * 10 = 1,000,000
    * 1,000,000 / 86,400(초/일) = 12
    * 12 * 2 = 24

* VUser 구하기
  * T = 5 * 0.2 (+ 1s) = 2
  * VUser(평균) = 5 * 2 = 10
  * VUser(최대) = 10 * 2 = 20

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* [Smoke](/k6/smoke)
* [Load](/k6/load)
* [stress](/k6/stress)

---

### 3단계 - 로깅, 모니터링
* [ ] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
* [ ] 로그 설정하기
  * Application Log 파일로 저장하기
    * 회원가입, 로그인 등의 이벤트에 로깅을 설정
    * 경로찾기 등의 이벤트 로그를 JSON으로 수집 
* [ ] Cloudwatch로 모니터링
  * Cloudwatch로 로그 수집하기
  * Cloudwatch로 메트릭 수집하기
  * USE 방법론을 활용하기 용이하도록 대시보드 구성

1. 각 서버내 로깅 경로를 알려주세요
- /home/ubuntu/nextstep/infra-subway-monitoring/log/file.log
- /home/ubuntu/nextstep/infra-subway-monitoring/log/json.log
- /var/log/nginx/access.log
- /var/log/nginx/error.log
2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=anwjrrp33-dashboard