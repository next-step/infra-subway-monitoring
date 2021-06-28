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

bbbnam-EC2-public1 : 3.36.90.29  
  - /home/ubuntu/log/thread.dump   ->  thread.dump 분석 실습
  - /home/ubuntu/infra-subway-monitoring/log/path.log  -> 최단경로 조회에 로그 설정
  - /home/ubuntu/infra-subway-monitoring/log/member.log  -> 로그인, 회원가입 등에 로그 설정

bbbnam-EC2-reverseproxy : 13.125.241.78 
  - /var/log/nginx  -> Nginx log 설정 위치  
  
2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD_bbbnam

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   - 웹 성능 예산을 측정해 본적은 없고, 기본적으로 3초룰에 대해서는 알고 있었습니다.
    그래서 시간 기반 지표로는 3초 이내에 로딩이 되어야 한다고 생각합니다.
    그 외의 지표는 미션 설명에 주어진대로 이미지 사이즈 2MB 미만, 자바스크립트 크기는 1MB 미만
    등을 정량적 지표로 두면 될 것 같고, 규칙 기반 지표는 80~85점 정도 이상이면 적절하지 않을까 생각됩니다.
    우선순위를 두자면 웹에서는 아무래도 페이지 로딩이 가장 우선시 되어야 한다고 생각하기 때문에
    시간 기반지표를 중점으로 하여 성능 예산을 구성하는 게 좋을 거 같습니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - https://bbbnam-public.kro.kr/js/vendors.js 와 https://bbbnam-public.kro.kr/js/main.js 가 다른 리소스에 비해 먼저 
   호출이 되고 있는데 이 두 파일이 응답시간의 대부분을 차지하고 있는 것 같습니다.
   텍스트 압축, 지연로딩, 캐시 설정을 사용하여 개선할 수 있을 것 같습니다.
   
   - 텍스트 압축, 지연로딩, 캐시 설정을 통해
   기존 compress Transfer : F등급, Cache static content : C 등급 , Largest Contentful Paint 4.7초 
   변경후  compress Transfer : A등급, Cache static content : B 등급, Largest Contentful Paint 1.537초 
   로 개선하였습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
