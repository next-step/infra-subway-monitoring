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

### 기능 구현 목록
- [x] application log
    - [x] 모든 요청,응답에 대한 로깅 설정 -> filter
    - [x] active profile 에따라 다른 로깅 방법 설정
- [x] cloudwatch로 모니터링
    - [x] cloudwatch로 로그 수집하기
    - [x] cloudwatch로 메트릭 수집하기


## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
   <br>
   ```text
      keyfile: shinmj-nextstep-ec2-key.cer
      bastion: shinmj-bastion-ec2(13.124.238.137)
      webserver: shinmj-web-ec2 (bastion에서 ssh webserver)
      application log: /home/ubuntu/infra-logs
   ```

2. Cloudwatch 대시보드 URL을 알려주세요
   <br>
   [shinmj-dashboard](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=shinmj-dashboard)

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- PageSpeed 로 비교

  |항목|네이버맵|카카오맵|지하철노선도|
       |---|-------|-----|---------|
  |First Contentful Paint (s)|4.6|8.7|14.7|
  |Speed Index (s)|4.6|8.7|14.7|
  |Largest Contentful Paint (s)|3.8|7.4|15.4|
  |Time to Interactive (s)|3.8|8.3|15.5|
  |total Blocking Time (ms)|50|170|700|
  |Comulative Layout Shift Paint|0|0.144|0.041|

- 예산 목표
    ```text
    - First Contentful Paint : 4s
    - Speed Index : 5s
    - Largest Contentful Paint : 4s
    - Time to interactive : 3s
    - Total Blocking Time : 50ms
    - Comulative Layout shift : 0.02
    ```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    ```text
    - gzip을 통한 텍스트 기반 리소스 압축
    - 사용하지 않는 코드(js, css) 삭제
    - 코드 스플리팅
    - 웹폰트 최적화
    - 이미지 사이즈 줄이기
    - cache-control을 통한 정적 리소스 캐싱
    ```

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- [ ] 테스트 전제조건 정리
    - [ ] 대상 시스템 범위
    - webserver, dbserver
    - [ ] 목푯값 설정
        - 목표 rps
            - DAU : 500만명/30 = **약 17만명** (2020년 지도.네비게이션 분야 MAU 참고)
              > (MAU)네이버 지도(1천112만명), 티맵(716만명), 티맵 내비게이션(548만명), 구글 지도(549만명)가 1∼4위였고 카카오맵(530만명)이 5위를 기록했다.
            - 최대트래픽/평소트래픽 : 출퇴근시간/평소시간 = **대략 15배 가정**
            - 1명당 1일 평균 접속수 : 2번접속 * (로그인, 경로검색,즐겨찾기조회) = **6**
            - 1일 총 접속수 : DAU x 1명당 1일 평균 접속수 = **1,020,000**
            - 1일 평균 rps : 1일 총 접속수 /86400 = **11.8**
            - 1일 최대 rps : 1일평균 rps x (최대트래픽/평소트래픽) = **177**
        - latency : **50~100ms**
        - VUser = (목표 rps * T) / R
            - 목표 rps : 일평균 11.8, 최대 35.4
            - R (시나리오에 포함된 요청수)
            - T (VUser 반복을 완료하는데 필요한 시간보다 큰 값) :
              `T = (R * http_req_duration) ( + ls)`  (내부망에서 테스트할 경우 예상 latency 추가)

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
- [ ] [접속빈도가 높은 페이지](./k6-scripts/frequency/README.md)  -  메인 (로그인 - 내정보 조회 - 즐겨찾기 조회)
- [ ] [데이터를 갱신하는 페이지](./k6-scripts/updated/README.md) - 노선정보 변경 (로그인 - 노선 목록 조회, 노선 정보 변경)
- [ ] [데이터를 조회하는데 여러 데이터를 참조하는 페이지](./k6-scripts/reference/README.md)- 경로 검색 (지하철 역조회 - 최단 거리 조회)