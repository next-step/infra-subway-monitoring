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
- service (3.36.98.105)
  - application log: /home/ubuntu/infra-subway-monitoring/log/file.log
  - syslog: /var/log/syslog
- db
  - syslog: /var/log/syslog
- bastion
  - syslog: /var/log/syslog

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=junhwankim-dashboard
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   - 예비 분석
     - 가장 중요한 페이지: 메인 페이지, 서비스의 진입점으로 로딩이 느리면 사용자 이탈률이 늘어날 수 있음

     - 경쟁사 분석 (PageSpeed Insights 휴대전화 기준)
  
     | 사이트 | First Contentful Paint | Time to Interactive | Speed Index | Total Blocking Time | Largest Contentful Paint |
     |:---|---:|---:|---:|---:|---:|
     | 서울교통공사 | 6.9 s | 8.9 s | 10.9 s | 649 ms | 6.9 s |
     | 카카오 맵 | 2.5 s | 5.4 s | 7.3 s | 120 ms | 5.9 s |
     | 네이버 맵 | 2.9 s | 5.8 s | 7.7 s | 310 ms | 7.4 s |
     | 우리 사이트 | 14.7 s | 15.5 s | 14.7 s | 700 ms | 15.4 s |

     - 성능 기준 (목표: 카카오, 네이버 맵에 근접한 수준)
       - First Contentful Paint: 3s 이내
       - Time to Interactive: 6s 이내
       - Speed Index: 8s 이내
       - Total Blocking Time: 400 ms
       - Largest Contentful Paint: 7.5s 이내


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 텍스트, 리소스 압축 사용
   - 사용하지 않는 자바스크립트 줄이기
   - 렌더링 차단 리소스 제거
   - 사용하지 않는 css 줄이기
   - cdn 활용하기

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   * 예상 DAU
     * DAU를 1,000,000 으로 가정 
   * 목표값 설정
     * 피크 시간대: 07:00 ~ 09:00, 18:00 ~ 20:00
     * 집중률 2로 가정
   * 1일 평균 접속, 평균 요청 수
     * 1일 총 접속 수, 1,000,000 * 2 (출근, 퇴근) = 2,000,000
     * 1일 평균 rps, 2,000,000 / 86,400 = 약 23
     * 1일 최대 rps, 23 * (2 / 1) = 약 46

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    * 접속 빈도가 높은 페이지: 메인 페이지
        * smoke
            * k6/main/smoke.js
            * k6/main/smoke.log
        * load
            * k6/main/load.js
            * k6/main/load.log
        * stress
            * k6/main/stress.js
            * k6/main/stress.log
    * 데이터를 갱신하는 페이지: 회원 정보 수정 페이지
        * smoke
            * k6/update/smoke.js
            * k6/update/smoke.log
        * load
            * k6/update/load.js
            * k6/update/load.log
        * stress
            * k6/update/stress.js
            * k6/update/stress.log
    * 테스터를 조회하는데 여러 데이터를 참조하는 페이지: 경로 조회
        * smoke
            * k6/findpath/smoke.js
            * k6/findpath/smoke.log
        * load
            * k6/findpath/load.js
            * k6/findpath/load.log
        * stress
            * k6/findpath/stress.js
            * k6/findpath/stress.log