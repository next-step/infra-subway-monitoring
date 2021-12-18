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
    - EC2-pageprologue-public-web1
        - 시스템 로그: /var/log/syslog/
        - 애플리케이션 로그: /home/ubuntu/pageprologue/logs/file.log

    - EC2-pageprologue-public-web2
        - 시스템 로그: /var/log/syslog/
        - 애플리케이션 로그: /home/ubuntu/pageprologue/logs/file.log

2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-pageprologue

---

### 2단계 - 성능 테스트

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 사이트 분석 (PageSpeed Insights)
    - https://subway-deploy.kro.kr
    - http://www.seoulmetro.co.kr/kr/cyberStation.do#stationInfo
    - https://m.map.naver.com/subway/subwayLine.naver
    - /k6 폴더에 site 비교 이미지를 첨부 하였습니다.

  |  |성능 개선 전<br>subway|성능 개선 후<br>subway|서울교통공사<br>사이버 스테이션|네이버 지하철|
  |:---:|:---:|:---:|:---:|:---:|
  | 성능 | 68<br>(29) | 94<br>(45) | 70<br>(39) | 92<br>(58) |
  | FCP | 2.7 초<br>(14.7 초) | 1.2 초<br>(5.4 초) | 1.6 초<br>(6.8 초) | 0.5 초<br>(2.1 초) |
  | TOI | 2.8 초<br>(15.5 초) | 1.3 초<br>(6.0 초) | 2.0 초<br>(8.7 초) | 0.7 초<br>(6.6 초) |
  | SI | 2.7 초<br>(14.7 초) | 1.2 초<br>(5.4 초) | 2.5 초<br>(8.6 초) | 1.6 초<br>(4.7 초) |
  | TBT | 70 밀리초 | 40 밀리초 | 90 밀리초 | 10 밀리초 |
  | LCP | 2.8 초 | 1.3 초 | 3.5 초 | 1.6 초 |
  | CLS | 0.004 | 0.004 | 0.014 | 0.006 |
  | requests | 21 | 19 | 86 | 40 |
  | transferred | 1.3 kB | 957 B | 338 kB | 165 kB |
  | resources | 3.1 MB | 2.8 MB | 1.3 MB | 2.4 MB |
  | DOMContent<br>Loaded | 189 ms | 310 ms | 867 ms | 139 ms |
  | Load | 313 ms | 194 ms | 890 ms | 174 ms |
  *(괄호 안의 값은 모바일 값)

- 웹 성능 예산
    - 성능을 타 사이트 분석 평균인 81점 이상으로 올린다.
    - FCP 지수를 타 사이트 분석 평균과 20% 이상 차이가 나지 않도록 줄인다.  
      ((1.6 + 0.5) / 2 ) * 1.2 = 1.26
    - TOI 지수를 타 사이트 분석 평균과 20% 이상 차이가 나지 않도록 줄인다.  
      ((2.0 + 0.7) / 2 ) * 1.2 = 1.35
    - SI 지수를 타 사이트 분석 평균과 20% 이상 차이가 나지 않도록 줄인다.  
      ((2.5 + 1.6) / 2 ) * 1.2 = 2.05

- 모바일 성능 예산
    - 성능을 타 사이트 분석 평균인 48.5점 이상으로 올린다.
    - FCP 지수를 타 사이트 분석 평균과 20% 이상 차이가 나지 않도록 줄인다.  
      ((6.8 + 2.1) / 2 ) * 1.2 = 5.34
    - TOI 지수를 타 사이트 분석 평균과 20% 이상 차이가 나지 않도록 줄인다.  
      ((8.7 + 6.6) / 2 ) * 1.2 = 9.18
    - SI 지수를 타 사이트 분석 평균과 20% 이상 차이가 나지 않도록 줄인다.  
      ((8.6 + 4.7) / 2 ) * 1.2 = 7.98

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

    - TCP 연결을 재사용하기 위한 Keep-Alive ALB에 60초로 설정 (기본 설정 되어 있음)
    - 스크립트 파일 Content-Encoding 으로 압축, 최소 압축 사이즈 설정
    - 정적 파일이 캐싱을 위한 Cache Static Content 설정
    
    > 성능 개선 결과
    > - 데스트탑에서 68점 에서 94점으로 약 38% 개선 
    > - 모바일에서 29점에서 45점으로 약 55% 개선


3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - /k6 폴더에 analysis 자료를 참고하였습니다.
   
    - 예상 1일 사용자 수(DAU): 69,000명
        - 2020년 12월 31일 기준 지하철 이용자 수 3,791만명
        - 20210년 1월 기준 네이버지도 순이용자수 1,380만명
        - 네이버지도 순이용자수의 0.5% 인 69000명
    - 피크 시간대의 집중률
        - 지하철 운행 시간대 대: 20 (6시~24시)
        - 평균 이용률: 약 4.5
        - 혼잡 시간대 이용률: 약 10
        - 평소 트래픽: (69,000 / 20) * 4.5 = 15,500
        - 최대 트래픽: (69,000 / 20) * 10 = 34,500
    - 1명당 1일 평균 요청수: 5회
    - Throughput (1일 평균 rps ~ 1일 최대 rps): 4 ~ 9
      ```
      1일 총 접속 수 = 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수
      1일 평균 rps = 1일 총 접속 수 / 86,400 (초/일)
      1일 최대 rps = 1일 평균 rps x (최대 트래픽 / 평소 트래픽)
      ```
        - 1일 총 접속 수: 69,000 * 3 = 345,000
        - 1일 평균 rps: 345,000 / 86,400 = 4
        - 1일 최대 rps: 4 * 2.23 = 9
    - Latency : 50~100ms 이하

5. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - /k6 폴더에 script 와 result 가 있습니다.

   - Smoke 테스트
       - 접속 빈도가 높은 기능
           - 메인 페이지: [main-smoke.js](/k6/script/smoke/main-smoke.js), [main-smoke.txt](/k6/result/main-smoke.txt)
       - 서버 리소스 소비량이 높은 기능
           - 사용자 정보 수정: [mypage-smoke.js](/k6/script/smoke/mypage-smoke.js), [mypage-smoke.txt](/k6/result/mypage-smoke.txt)
       - DB를 사용하는 기능
           - 경로 조회: [path-smoke.js](/k6/script/smoke/path-smoke.js), [path-smoke.txt](/k6/result/path-smoke.txt)

   - Load 테스트
       - 접속 빈도가 높은 기능
           - 메인 페이지: [main-load.js](/k6/script/load/main-load.js), [main-load.txt](/k6/result/main-load.txt)
       - 서버 리소스 소비량이 높은 기능
           - 사용자 정보 수정: [mypage-load.js](/k6/script/load/mypage-load.js), [mypage-load.txt](/k6/result/mypage-load.txt)
       - DB를 사용하는 기능
           - 경로 조회: [path-load.js](/k6/script/load/path-load.js), [path-load.txt](/k6/result/path-load.txt)

   - Stress 테스트
       - 접속 빈도가 높은 기능
           - 메인 페이지: [main-stress.js](/k6/script/stress/main-stress.js), [main-stress.txt](/k6/result/main-stress.txt)
       - 서버 리소스 소비량이 높은 기능
           - 사용자 정보 수정: [mypage-stress.js](/k6/script/stress/mypage-stress.js), [mypage-stress.txt](/k6/result/mypage-stress.txt)
       - DB를 사용하는 기능
           - 경로 조회: [path-stress.js](/k6/script/stress/path-stress.js), [path-stress.txt](/k6/result/path-stress.txt)
      