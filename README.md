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
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [X] 로그 설정하기
- [X] Cloudwatch로 모니터링

1. 각 서버내 로깅 경로를 알려주세요
- nginx server
    - ec2 name : oper912-reverse-proxy
    - 접속 : (bastion 서버에서) ssh ubuntu@nginx
    - 로깅 경로
        - /var/log/nginx/access.log
        - /var/log/nginx/error.log

- application server
    - ec2 name : oper912-was
    - 접속 : (basion 서버에서) ssh ubuntu@was
    - 로깅 경로 : /home/ubuntu/log/app.log
    
- bastion server 정보
    - ec2 name : oper912-Bastion
    - ip : 52.79.239.230
    
2. Cloudwatch 대시보드 URL을 알려주세요
- [DASHBOARD-oper912](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-oper912)
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 허용 가능한 목표를 정한다 
    - 아직 예산을 잡는 경험이 없어서 기준을 잡기가 애매하여 Lighthouse 성능 감사가 80 이상이어야 한다는 가정 하에 
      PageSpeed에서 데스크톱 기준으로 분석 후에 Lighthouse Scoring Calculator 통해서 기준을 잡았습니다. 
      Desktop, v8 기준이며 TBT, CLS 제외 Metric Score를 모두 65로 주었을떄 81점이 되길래 해당 Value를 기준으로 잡았습니다.
        - FCP (First Contentful Paint) - 1400ms
        - SI (Speed Index) - 2000ms
        - LCP (Largest Contentful Paint) - 2000ms
        - TTI (Time to Interactive) - 3800ms
        - TBT (Total Blocking Time) - 60ms
        - CLS (Cumulative Layout Shift) - 0.04
    
---

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축 사용
- 사용하지 않는 자바스크립트 줄이기
- 렌더링 차단 리소스 제거하기
- 효율적인 캐싱 정책을 사용하여 정적인 애셋 제공하기

---

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 지하철 하루 이용 객수 1000만명, 동일한 사람이 출퇴근 시간 이용한다고 가정하에 500만 중 30%정도 서비스를 이용한다고 가정
- 서비스 이용자는 출근전, 출근시, 퇴근전, 퇴근시 하루 4번 요청한다고 가정
- 대중교통 출근시간에 하루 이용객의 20%가 몰린다는 기사 확인 후 지하철 운용 시간을 하루 18시간으로 추정하고 출근시간을 2시간으로 잡았을때
  일평균 이용객보다 출근시간에 2배 정도 많다고 가정
    - ex) 하루 100명 이용시 / 2시간동안 20명 이용 - 시간 평균 10명 / 16시간 동안 80명 이용 - 시간 평균 5명
- DAU = 150만
- 피크시간대 집중율 = 2
- 1일 요청수 = 4
- 1일 총 접속 수 = 1,500,000(DAU) X 4(1일 요청수) = 6,000,000
- 1일 평균 rps = 6,000,000(1일 총 접속수) / 86,400(초/일) = 69.45
- 1일 최대 rps = 69.45(1일 평균 rps) X 2(피크시간대 집중율) = 138.9

---

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
