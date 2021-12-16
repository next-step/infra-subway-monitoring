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
key: mnonm-aws-key.pem
bastion: 3.34.191.156
EC2: ssh web (alias 적용)
로그: /home/ubuntu/log/file.log

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-mnonm

---

# kakao
- First Contentful Paint(FCP): 2.5s
- Time to Interactive(TTI): 5.3s
- Largest Contentful Paint(LCP): 5.9s
- Total Blocking Time(TBT): 130ms
- 
# nextstep
- First Contentful Paint(FCP): 2.7s
- Time to Interactive(TTI): 2.8s
- Largest Contentful Paint(LCP): 5.9s
- Total Blocking Time(TBT): 70ms

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- FCP: 2.5s
  - 경쟁사 대비 20% 차이는 나지 않아 경쟁사와 동일한 수치를 목표로 했습니다.
  
- TTI: 2.6s
  - 현재는 FCP랑 큰 차이가 없어 비슷한 수치를 목표로 했습니다.
  
- 압축된 리소스 최대 크기: 200kb 미만

- Lighthouse 성능 감사: 75점 이상(개선 이전 대비 10% 증가)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스 압축
- 이미지 압축
- 사용하지 않는 자바스크립트 삭제
- 글꼴 표시 CSS
- 이미지 너비, 높이 설정
- JS, CSS, 이미지, 웹 폰트 등 정적 컨텐츠 캐시 적용
- CDN 사용
- JS/CSS 지연 로딩
- 스크립트 병합하여 요청 최소화

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위
  nginx, application, mysql

- 목푯값 설정
  - Throughput (23.15 ~ 231.5)
    - DAU: 100만
    - 피크 시간대 집중률: 10
    - 1명당 1일 평균 접속수: 2회
    - 100만 * 2 = 200만 (1일 총 접속수)
    - 200만/86400 = 23.15 (1일 평균 rps)
    - 23.15 * 10 = 231.5 (1일 최대 rps)

  - Latency
    100ms 이하

  - 부하 유지기간
    30분

- 부하 테스트시 저장될 데이터 건수 및 크기
  역 추가 1만건

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요



### step2 요구사항
- [X] 웹 성능 테스트
  - [X] 웹 성능 예산을 작성
  - [X] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
  
- [ ] 부하 테스트 
  - [X] 테스트 전제조건 정리
    - [X] 대상 시스템 범위
    - [X] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [X] 부하 테스트 시 저장될 데이터 건수 및 크기 
  - [ ] 각 시나리오에 맞춰 스크립트 작성 
    - [X] 접속 빈도가 높은 페이지
    - [X] 데이터를 갱신하는 페이지 
    - [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지 
  - [ ] Smoke, Load, Stress 테스트 후 결과를 기록


### step1 요구사항
- [X] 로그 설정하기
  - [X] 로그 추가
  - [X] Nginx Access Log 설정하기
- [X] Cloudwatch 모니터링
  - [X] Cloudwatch 로그 수집
  - [X] Cloudwatch 메트릭 수집