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
- SUBWAYWEB (192.168.170.39) - \[접속 도메인 주소 : https://jerry92k-subway.n-e.kr/]
  - 애플리케이션 로그 : /home/ubuntu/infra-subway-monitoring/log/*
  - syslog : /var/log/syslog
- SUBWAYWAS (192.168.170.155)
  - syslog : /var/log/syslog
- BASTION (192.168.170.190)
    - syslog : /var/log/syslog
    
2. Cloudwatch 대시보드 URL을 알려주세요 
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-jerry92k

---
### 추가 - log4j 이슈에 따라 nginx를 걷어내고 WAF를 추가적으로 적용
1. nginx 인스턴스 중단
  - nginx 도커 컨테이너 중단
  - cloudwatch 수집 대상에서 access log 제외
2. ALB, ACM, WAF 구성하기
  - ACM에 SSL 인증서 가져오기
  - ALB를 통해 1)443 포트로 들어오는 요청을 자바 애플리케이션 포트인 8070으로 포워딩, 2)생성한 ACM을 이용하여 SSL 통신 적용
  - ALB 앞단에 WAF 적용

### 2단계 - 성능 테스트
#### 1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
  - Quantity-Based
    - 모든 페이지의 모든 오브젝트 파일 크기 : 10MB 미만으로 제한
    - 각 페이지 내 포함된 자바스크립트 크기 : 1MB 미만
    - 검색 페이지에는 2MB 미만 이미지 포함  
  - Timing-Based
    - DCL(Dom Content Loaded) : 5초 미만 
    - FCP(First Contentful Paint) 3초 미만
  - Rule-Based
    - light-house 성능 감사 점수 : 80점 이상

#### 2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
**https://jerry92k-subway.n-e.kr/** (메인페이지)
- 측정치 
  - First Byte: 1.067s, FCP : 6.52s, LCP(Largest Contentful Pain):6.75s, DCL: 6.9s
- 문제점
  - js 로딩으로 DOM 생성 지연
  - vendors.js 로딩 : 5.05s
  - main.js 로딩 : 1.59s
- 개선방향 : vendors.js와 main.js 경량화 및 html, css 파일로 분리 
  - js에서 에서 생성 하고있는 DOM 객체와 css style 정의를 별도의 html, css 파일로 분리한다. 
  - DOM 생성 이전에 반드시 로딩되어야 하는 js와 비동기로 로딩해도 되는 js 파일을 분리한다.
  - 선행 js 로딩 -> DOM 생성, css로딩 -> 비동기 js 로딩 순으로 변경한다.
  - 각 파일들을 압축하여 크기를 줄인다.
- 기대효과 : FCP 성능 향상으로 사용자 체감 속도 개선

**https://jerry92k-subway.n-e.kr/path?source=16&target=8** (경로검색)
- 측정 결과는 ```메인페이지``` 테스트와 유사함. (문제점, 개선방향 동일) 
- First Byte(1.045s)도 메인페이지와 유사함.
  - 경로찾기 기능이 지하철 서비스에서 가장 복잡한 로직임에도 성능에 미치는 영향은 미비한것으로 판단됨

#### 3. 부하테스트 전제조건은 어느정도로 설정하셨나요

[목표 rps 구하기]

1) 1일 예상 사용자 수(DAU) : 500,000
2) 피크 시간대의 집중률 (최대 트래픽/평소 트래픽) : 10
3) 1명당 1일 평균 요청수 : 4

**Throughput 계산 : 1일 평균 rps ~ 1일 최대 rps**
- 1일 총 접속 수 : DAU(1일 사용자 수) X 1명당 1일 평균 접속 수
  - 1,000,000 * 5 = 2,000,000
- 1일 평균 rps : 1일 총 접속 수 / 86,400(초/일)
  - 5,000,000 / 86,400 = 23.14 => 24
- 1일 최대 rps : 1일 평균 rps * (피크 시간대 집중률)
  - 23.14 * 4 = 92.56 => 93
  
[VUser 구하기]

```
VU: 가상 사용자 수
R: 하나의 VU iteration(시나리오)에 포함된 요청 수
T: VU iteration을 완료하는데 소요되는 시간보다 큰 시간
```
- http_req_duration : 0.8s
- Latency : 100ms 이하
- R : 시나리오마다 다름
- T = R * http_req_duration + Latency
- VUser = (목표 rps * T) / R

#### 시나리오 별 목표값 구하기

[메인페이지 - 접속 빈도가 높은 페이지]

1)목표 rps
- 1일 평균 rps : 24
- 1일 최대 rps : 93

2)VUser 구하기
- R: 1
- T = 1*0.8s +0.1s = 0.9s
- 평균 VUser = 24 * 0.9s = 21.6 => 22
- 최대 VUser = 93 * 0.9s = 83.7 => 84

[나의 정보 수정(나이) - 데이터를 갱신하는 페이지]

1)목표 rps
- 1일 평균 rps : 24
- 1일 최대 rps : 93

2)VUser 구하기
- R: 2
- T = 2*0.8s +0.1s = 1.7s
- 평균 VUser = 24 * 1.7s / 2 = 20.4 => 21
- 최대 VUser = 93 * 1.7s / 2 = 79.05 => 80
  
[경로검색(회원인 경우) - 데이터를 조회하는데 여러 데이터를 참조하는 페이지]

1)목표 rps
- 1일 평균 rps : 24
- 1일 최대 rps : 93

2)VUser 구하기
- R: 2
- T = 2*0.8s +0.1s = 1.7s
- 평균 VUser = 24 * 1.7s / 2 = 20.4 => 21
- 최대 VUser = 93 * 1.7s / 2 = 79.05 => 80

#### 4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- smoke : 특이사항 없음
- load : 특이사항 없음
- stress
  - VUser가 240을 넘어갈 때 ```dial tcp 15.164.249.85:443: socket: too many open files``` 발생
  - VUser가  500에서 내려오면서 240 부근에서 다시 정상
  - 서버가 다운되는 것은 아님
  - 오류율 : 경로 찾기 > 나의 정보 수정 > 메인페이지
    - 메인페이지 : 31.50%
    - 나의 정보 수정 : 31.56%
    - 경로 찾기 : 99.22%
    => 성능테스트에선 경로찾기 이벤트가 특별한 이슈를 나타내진 않았지만, 
    부하테스트에선 ```메인페이지```, ```나의 정보 수정``` 대비 처리 시간이 오래 걸려 그만큼 다른 request들의 요청이 더 실패한 것으로 보임  
    
**스크립트와 테스트 결과는 ```k6-test``` 폴더 참조**
- 메인 페이지 테스트 : k6-test/mainpage
- 나의 정보 수정 테스트 : k6-test/member-modify
- 경로찾기 테스트 : k6-test/path