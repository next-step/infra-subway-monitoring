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
- URL : https://tyranotyrano-subway.p-e.kr
- public-web1
    - public ip : 54.180.141.237
    - private ip : 198.168.100.14
    - app-file.log : /home/ubuntu/infra-subway-monitoring/log/app-file.log
    - app-access-file.log : /home/ubuntu/infra-subway-monitoring/log/app-access-file.log
- public-web2
    - public ip : 13.209.68.20
    - private ip : 198.168.100.115
    - app-file.log : /home/ubuntu/infra-subway-monitoring/log/app-file.log
    - app-access-file.log : /home/ubuntu/infra-subway-monitoring/log/app-access-file.log
- (공통) nginx
    - /var/log/nginx/access.log
    - /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- public-web1 : https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=tyranotyrano-public-web1-dashboard
- public-web2 : https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=tyranotyrano-public-web2-dashboard

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- Desktop 을 기준으로 경쟁사(카카오 맵) 과 비교하여설정
  - 내 사이트 : https://tyranotyrano-subway.p-e.kr
  - 경쟁사 : 카카오 맵(https://map.kakao.com/)

| |내 사이트|카카오맵|목표|결과|
|---|---|---|---|---|
|First Contentful Paint|2.8s|0.6s|2s 미만
|Time to Interactive|2.9s|3.0s|2s 미만
|Speed Index|2.8s|2.7s|2s 미만
|Total Blocking Time|50ms|860ms|유지
|Largest Contentful Paint|2.9s|0.7s| 1s 미만
|Cumulative Layout Shift|0.004|0.017|유지

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- [X] 텍스트 압축 사용
  - [X] server.compression 설정 추가
- [X] 렌더링 차단 리소스 제거하기
  - [X] 렌더링 차단 js 에 async 적용
  - [X] 렌더링 차단 css 에 Critical CSS 적용
- [X] 정적자원들에 캐싱 적용
  - [X] spring.web.resources.chain 설정 추가

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
