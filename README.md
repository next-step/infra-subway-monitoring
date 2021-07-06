# 서비스 진단하기
## 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- WebPageTest 기준
  Compress Transfer : E등급 -> A등급
  Cache Static Content : C등급 -> A등급
- PageSpeed Insgihts 기준
  점수 : 67 -> 85~
  FCP : 2.8s -> 2s ↓
  TTI : 2.8s ->  2s ↓
  SpeedIndex : 2.8s ->  2s ↓
  LCP : 2.8s ->  2s ↓  

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 개선 포인트
    - verdor.js, main.js에 gzip을 통한 텍스트 압축, 지연 로딩 적용
      - 위 두 스크립트를 압축 및 지연 로딩, min.js로 최소화 했을 때 예상 되는 개선 효과가 높으므로 조치할 예정입니다.
    - 주요 정적 자원에 캐싱 적용
      - vendor.js와 main.js 외에 사진 등에 대해 캐시를 할 경우 불 필요한 재 요청이 사라지므로 성능 개선을 기대할 수 있습니다.

- 개선 결과
## Step1. 로깅과 모니터링
### 작업 필요 목록
- [x] logback.xml 설정
- [x] build.gradle을 통한 특정 실행 환경에 대한 의존성 적용
- [x] 중요 로직에 요청과 응답에 로깅
  - [x] 로그인 로깅
  - [x] 회원 가입 로깅
  - [x] 경로 탐색 로깅
- [x] application.properties 설정
    - [x] Local profile 설정
    - [x] Test profile 설정
    - [x] Production profile 설정
- [x] Spring Actuator 설정
    - [x] prod 프로필인 경우만 dependency 적용

---
## 미션 수행 내용 제출

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
  - Nginx(10.10.10.179) log:
    - access.log: /var/log/nginx/access.log
    - error.log: /var/log/nginx/error.log
    - syslog: /var/log/syslog
  - Spring App(10.10.10.39) log : /home/ubuntu/workspace/log

2. Cloudwatch 대시보드 URL을 알려주세요
: https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-jordy-torvalds
