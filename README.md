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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
  - subway 서비스 테스트 결과
    <img width="962" alt="subway_test" src="https://user-images.githubusercontent.com/16080479/154786348-08736e99-d207-4ef2-87f5-dc7349eae87e.png">
  - 페이지 로드 3초 미만
  - TTI 5초 미만
  - 압축된 리소스  최대 크기 200KB 미만
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
  - keep-alive 설정
  - gzip 압축 이용하여 전송 인코딩 최적화
  - 이미지 압축하기
  - 캐싱 설정하기
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
  - 목표 rps 구하기
    - 1일 예상 사용자 수(DAU) : 100,000명
    - 피크 시간대의 집중률 : 5배
    - 1명당 1일  평군 접속/요청 수 : 3
    - 1일 총 접속 수 : 300,000
    - 1일 평균 rps : 900,000 / 86,400 = 10.416
  - VUser 구하기
    - Request Rate : 50
    - R : 2
      - 로그인(/login/token) + 정보조회(/members/me)
    - T : 0.1s
      - 로그인(/login/token) 76ms + 정보조회(/members/me) 26ms
    - VUser :  (50 * 0.1) / 2 = 2.5
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - smoke test
      <img width="810" alt="smoke" src="https://user-images.githubusercontent.com/16080479/154799428-efea0441-925b-4e66-af5a-1b0b6dfb5662.png">
    - load test : VUser 3으로 진행
      <img width="834" alt="load" src="https://user-images.githubusercontent.com/16080479/154799446-cabf0e9c-ec1e-4c2b-a3d9-6daed57addba.png">
    - stress test
      <img width="856" alt="stress" src="https://user-images.githubusercontent.com/16080479/154799454-a38cd4c1-735e-4603-8f23-9b7afdbeef8b.png">

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
