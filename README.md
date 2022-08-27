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

#### 성능 측정 결과(Desktop, Chrome v104, 1920 * 1080, Cable) - WebPageTest

|                     | Start Render | FCP    | LCP    | Total Bytes | DC Time | Requests |
|---------------------|--------------|--------|--------|-------------|--------|----------|
| infra-subway        | 4.7s         | 4.677s | 4.709s | 2493KB      | 5.227s | 19       |
| 서울교통공사        | 2.3s         | 2.223s | 4.411s | 1373KB      | 4.377s | 87       |
| 네이버 지도(지하철) | 0.9s         | 0.732s | 2.814s | 779KB       | 1.196s | 15       |
| 카카오맵            | 1.2s         | 1.130s | 2.406s | 1227KB      | 3.4s   | 40       |

#### 성능 측정 결과(Desktop, Chrome v104, 1920 * 1080, 4G) - WebPageTest

|                     | Start Render | FCP    | LCP    | Total Bytes | DC Time | Requests |
|---------------------|--------------|--------|--------|-------------|---------|----------|
| infra-subway        | 5.3s         | 5.332s | 5.463s | 2493KB      | 6.158s  | 19       |
| 서울교통공사        | 3.8s         | 3.818s | 6.107s | 1373KB      | 6.225s  | 88       |
| 네이버 지도(지하철) | 2.6s         | 1.749s | 6.116s | 779KB       | 3.313s  | 15       |
| 카카오맵            | 2.5s         | 2.514s | 4.107s | 1227KB      | 5.580s  | 41       |

#### 성능 측정 결과(iPhone X, 1366 * 768, 4G) - WebPageTest

|                     | Start Render | FCP    | LCP    | Total Bytes | DC Time | Requests |
|---------------------|--------------|--------|--------|-------------|---------|----------|
| infra-subway        | 5.1s         | 5.094s | 5.253s | 2484KB      | 6.484s  | 19       |
| 서울교통공사        | 3.8s         | 3.796s | 3.796s | 1064KB      | 5.764s  | 73       |
| 네이버 지도(지하철) | 1.6s         | 1.581s | 6.702s | 987KB       | 3.178s  | 15       |
| 카카오맵            | 2.4s         | 2.423s | 4.583s | 1181KB      | 7.166s  | 37       |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
  - PC, Cable 기준
    - 렌더 시작시간 1초 이내(네이버 지도, 카카오맵 기준)
    - FCP 1초 이내(네이버 지도, 카카오맵 기준)
    - TTI 3초 미만(5초는 준수 하고 있으나, 간당간당함)
    - 압축된 리소스 최대 크기 200KB 미만
    - 전체 Byte 크기 1000KB 내외(네이버지도 기준)
    - LCP 2.5초 이내(네이버 지도, 카카오맵 기준)
      - 출처: https://web.dev/lcp/#what-is-a-good-lcp-score
  - iPhone X, 4G 기준
    - 렌더 시작시간 2초 이내
    - FCP 2초 이내
    - TTI 5초 미만
    - 전체 Byte 크기 1000KB 이내
    - LCP 5초 이내
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
  - **사용하지 않는 자바스크립트 제거**(PageSpeed 제안)
  - **텍스트 기반의 데이터 압축**(PageSpeed 제안)
  - **JS, CSS로 block이 생기는 이슈 개선**(PageSpeed 제안)
  - 캐싱이 가능한 요소 캐싱(PageSpeed 제안)
  - **LCP 개선**(PageSpeed 제안)

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
  - Target 시스템의 범위: 클라이언트의 네트워크 커넥션 구간부터, 응답을 받기까지의 구간(서버, DB, 네트워크)
  - 목푯값
    - latency: 100ms
    - throughput: 500DAU | 10 peak | 2 req
      - 1일 평균 rps: 500 * 2 / 86400 = 0.0115
      - 1일 최대 rps: 500 * 20 / 86400 = 0.115
    - 부하 유지기간: 30분
  - 부하 테스트시 저장될 데이터 건수 및 크기: 없음
  - VUser: 
    - 평균: ( 0.0115 * (2 * 0.2) ) / 2 = 0.0023
    - 최대: ( 0.115 * (2 * 0.2) ) / 2 = 0.023
  - 수치를 너무 적게 예상했더니, 의미 없는 값이 나와버린 것 같다.
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
  - 접속 빈도가 높은 페이지(메인화면)
    - smoke
      - [script](./src/test/k6/main_page/smoke.js)
      - ![cli결과](./src/test/k6/main_page/smoke-cli.png)
      - ![대시보드](./src/test/k6/main_page/smoke-dashboard.png)
    - load
      - [script](./src/test/k6/main_page/load.js)
      - ![cli결과](./src/test/k6/main_page/load-cli.png)
      - ![대시보드](./src/test/k6/main_page/load-dashboard.png)
      - ![AWS 대시보드](./src/test/k6/main_page/load-aws-dashboard.png)
    - stress
      - [script](./src/test/k6/main_page/stress.js)
      - ![cli결과](./src/test/k6/main_page/stress-cli.png)
      - ![대시보드](./src/test/k6/main_page/stress-dashboard.png)
      - ![AWS 대시보드](./src/test/k6/main_page/stress-aws-dashboard.png)
  - 기능을 수행하는 페이지(로그인 성공)
    - smoke
    - load
    - stress
3. 테스트 결과

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
