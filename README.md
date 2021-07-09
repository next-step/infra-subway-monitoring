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
* 인스턴스아이디: i-0f1bae395bb20186b
* IP: 52.78.141.10
* Application log path: /home/ubuntu/log/infra-subway-deploy/file.log
* nginx access log path: /var/log/nginx/access.log
* nginx error log path: /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
* https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-ybh89

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
경쟁사 사이트인 서울교통공사 사이버스테이션의 경로페이지(http://www.seoulmetro.co.kr/kr/cyberStation.do#wayInfo)의 데스크톱 필드 데이터를 기준으로 설정하였습니다.
* Lighthouse: 80점 이상
* FCP: 1900ms
* FID: 2000ms
* LCP: 3300ms
* CLS: 0.02ms

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* 텍스트 압축 사용
* 사용하지 않는 자바스크립트 줄이기
* 렌더링 차단 리소스 제거하기
* 정적 파일 캐싱 설정
* CDN 사용
* 이미지 압축

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
* DAU: 100만 - 지하철 앱 시장 점유율 1위 '지하철 종결자'의 2016년 DAU가 100만으로 추정.
* 1명당 1일 평균 접속 수: 4번 - 목적지의 경로확인, 빠른 환승지점 확인 * 2(왕복)
* 1일 총 접속수: 400만
* 1일 평균 rps: 46rps
* 1일 최대 rps: 460rps - 피크시간대 집중율 = 10
* 목표값
    * Throughput: 46rps ~ 460rps
    * Latency: 80ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* script/ 에 스크립트, 결과 공유했습니다.
* 접속 빈도가 높은 페이지 - script/connection-frequency
* 데이터를 갱신하는 페이지 - script/data-update
* 여러 데이터를 참조하여 조회하는 페이지 - script/multiplex-data