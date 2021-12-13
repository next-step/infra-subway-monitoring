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

* [인프라정보는 여기 있습니다~](https://github.com/lsm7179/infra-subway-deploy/tree/lsm7179#%EB%AF%B8%EC%85%98)
* logPath  /home/ubuntu/infra-subway-monitoring-app/logs/infra-subway-monitoring.log
* nginx -> 요구사항 변경으로 alb로 수정되었습니다. 
2. Cloudwatch 대시보드 URL을 알려주세요

---
* [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
* [x] 로그 설정하기
  * 운영은 파일로 관리, 로컬은 콘솔로 관리, aop를 활용
* [ ] Cloudwatch로 모니터링
* [x] 로드밸런서 사용 : http://lsm7179-alb-1556721989.ap-northeast-2.elb.amazonaws.com/
* 참고자료 
  * aop: https://jeffrey-oh.tistory.com/332
  * aop: https://memostack.tistory.com/238
  * springActvie: https://blog.leocat.kr/notes/2018/09/18/spring-logback-config-with-spring-multi-active-profile
  * log: https://gaemi606.tistory.com/entry/Spring-Boot-AOP%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%B4-%EB%A1%9C%EA%B7%B8-%EC%B6%9C%EB%A0%A5%ED%95%98%EA%B8%B0-REST-API
---
### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
