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

**!** bastion 접속 : ssh -i enemfk777-ec2-key-pair.pem ubuntu@3.35.0.88 **!**

1. 각 서버내 로깅 경로를 알려주세요
* nginx server
    * ip : 192.168.2.60
    * 접속 : (bastion 서버에서) ssh nginx
    * 로깅경로 :
        * access.log : /var/log/nginx/access.log
        * error.log : /var/log/nginx/error.log
    
* application server
    * pub01
        * ip : 192.168.2.48
        * 접속 : (bastion 서버에서) ssh pub01
        * 로깅경로 : /home/ubuntu/log/app.log
  * pub02
      * ip : 192.168.2.118
      * 접속 : (bastion 서버에서) ssh pub02
      * 로깅경로 : /home/ubuntu/log/app.log
2. Cloudwatch 대시보드 URL을 알려주세요

* [DASHBOARD-enemfk777](https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-enemfk777)



---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

* ####아래 두 조건을 만족시키면 적당하다고 생각했습니다.
    * Lighthouse 성능 감사에서 80 점 이상이다.
    * PageSpeed의 green 조건을 달성했다.
        * First Contentful Paint : 1.8초 이하
        * Time to Interactive : 3.8초 이하
        * Speed Index : 3.4초 이하
        * Total Blocking Time : 200ms 이하
        * Largest Contentful Paint : 2.5초 이하
        * Cumulative Layout Shift : 0.1 이하
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

* ####PageSpeed에서 추천해준 content-encoding을 nginx에 설정해 두는게 좋을 것 같았습니다.
    * nginx에 content-encoding 설정 후 지표
        * First Contentful Paint : 1.1초 green
        * Time to Interactive : 1.2초 green
        * Speed Index : 1.4초 green
        * Total Blocking Time : 60ms green
        * Largest Contentful Paint : 1.2초 green
        * Cumulative Layout Shift : 0.004 green

* ####추가로 렌더링 차단 리소스를 줄이기 위해 index.html의 폰트를 로드하는 부분을 [비동기적으로 로드](https://web.dev/defer-non-critical-css/) 하는 방법이 있지만, 초기 진입시 폰트가 뒤늦게 적용되는 모습이 나타나 보류했습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
