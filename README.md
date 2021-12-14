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

- 베스천 서버 접속 : `ssh -i y2o2u2n-RSA.pem ubuntu@52.79.198.129`
- 서비스 서버 접속 : `ssh service-b`
- 로깅 경로 이동 : `cd infra-subway-monitoring/docker/logs/`
- 각각 `nginx`, `spring-boot` 내 파일 로그

2. Cloudwatch 대시보드 URL을 알려주세요

- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-y2o2u2n

---

### 2단계 - 성능 테스트

#### 웹 성능예산은 어느정도가 적당하다고 생각하시나요

##### A. 예비 분석

- 역, 노선, 구간이 모두 등록되어 있다는 가정 하에 사용자가 제일 자주 사용할 기능은 경로 검색이라 예상됨.
- 그러므로 **경로 검색 페이지**가 가장 중요한 페이지로 보임.
- 사용자는 이동하면서 서비스를 사용할 것이라 예상되어 **휴대전화**로 **경로 검색 페이지**를 방문하는 것으로 가정함. 

##### B. 경쟁사 분석

- [지하철 서비스](http://54.180.71.34/path)
- [서울교통공사 사이버 스테이션](http://www.seoulmetro.co.kr/kr/cyberStation.do)
- [네이버 지도](https://m.map.naver.com/)
- [카카오 맵](https://m.map.kakao.com/)

|                          | subway | metro  | naver | kakao |
|--------------------------|--------|--------|-------|-------|
| First Contentful Paint   | 16.6s  | 6.9s   | 2.2s  | 1.7s  |
| Time to Interactive      | 16.7s  | 9.0s   | 5.7s  | 4.7s  |
| Speed Index              | 16.6s  | 8.3s   | 5.1s  | 5.0s  |
| Total Blocking Time      | 220ms  | 1050ms | 300ms | 150ms |
| Largest Contentful Paint | 16.6s  | 6.9s   | 6.4s  | 7.3s  |
| Cumulative Layout Shift  | 0.004  | 0      | 0.017 | 0.005 |

> 경쟁사 대비 FCP, TTI, SI, LCP 4가지 지표가 20% 이상 성능 차이 발생함.

##### C. 성능 기준 설정

- FCP : Orange (1.8-3)
- TTI : Orange (3.9-7.3)
- SI : Orange (3.4-5.8)
- LCP : Orange (2.5-4)

##### D. 우선 순위

FCP 가 경쟁사 대비 성능 차이가 가장 크며 다른 지표에도 영향을 주는 듯 해서 제일 첫번째 개선 대상으로 생각함.

#### 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 압축 사용 : gzip 으로 리소스를 압축해서 제공해볼 수 있을 듯
- 사용하지 않는 자바스크립트 줄이기 : 코드 스플리팅을 통해 번들 파일을 여러 개의 파일로 분리해볼 수 있을 듯

#### 부하테스트 전제조건은 어느정도로 설정하셨나요

TBD

#### Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

TBD

## 요구사항

### 1단계

- [x] 로그 설정하기
    - [x] Application Log
        - [x] Phase 별
            - [x] `local | test` : 스프링 부트 로그백 기본값
            - [x] `prod` : 콘솔 출력 및 파일 저장 (`INFO` 레벨 이상)
        - [x] Log
            - [x] 컨트롤러의 요청, 응답에 대한 `INFO`, `ERROR` 로깅
            - [x] 글로벌 예외 처리시 `ERROR` 로깅
    - [x] 문제가 되는 코드 수정하기
    - [x] Nginx Access Log 설정하기
- [x] CloudWatch 로 모니터링
    - [x] cAdvisor 설치
    - [x] 로그 수집하기
        - [x] EC2 에 IAM 역할 설정
        - [x] python & awslogs agent 설치
        - [x] `awslogs.conf` 수정 및 awslogs 재시작
    - [x] 메트릭 수집하기
        - [x] cloudwatch agent 설치 및 `config.json` 설정
        - [x] 대시보드 내 위젯 추가

### 2단계

- [x] 웹 성능 테스트
    - [x] 웹 성능 예산을 작성
    - [x] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
- [ ] 부하 테스트
    - [ ] 테스트 전제조건 정리
        - [ ] 대상 시스템 범위
        - [ ] 목푯값 설정 (latency, throughput, 부하 유지기간)
        - [ ] 부하 테스트 시 저장될 데이터 건수 및 크기
    - [ ] 각 시나리오에 맞춰 스크립트 작성
        - [ ] 접속 빈도가 높은 페이지
        - [ ] 데이터를 갱신하는 페이지
        - [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    - [ ] Smoke, Load, Stress 테스트 후 결과를 기록
