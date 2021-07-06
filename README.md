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

- syslog : /var/log/syslog
- nginx access log : /var/log/nginx/access.log
- nginx error log : /var/log/nginx/error.log
- application log : /home/ubuntu/source/infra-subway-monitoring/build/libs/log

2. Cloudwatch 대시보드 URL을 알려주세요

https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-jeongminkyo

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

| 지표 | 자사 | 네이버지도 | 카카오맵 |
|--------:|:--------:|:--------:|:--------:|
| PC FCP(초) | 2.7  | 0.8 | 0.6 |
| PC LCP(초) | 2.8 | 3.6 |0.7 |
| PC TTI(초) | 2.8 | 3.2 | 2.9|
| Mobile FCP(초) | 15.1 | 2.9 | 2.5 |
| Mobile LCP(초) | 15.7 | 7.4 | 7.4 |
| Mobile TTI(초) | 15.7 | 6.7 | 5.7|

사용자는 응답시간이 20% 이상일 때 차이를 인식하므로, 경쟁사 대비 20% 이상 성능 차이가 있어야하며,
3초의 법칙 (3초 안에 로딩되지 않으면 53%의 사용자가 떠나고 로딩 시간이 길어질수록 사용자 이탈률이 늘어남)에 따라 3초 이내에 로딩이 되어야 함.
또한, 자사 페이지의 컨텐츠는 경쟁사보다 적으므로, FCP, LCP는 경쟁사보다 낮아야 된다고 봄. 
위의 근거로 웹 성능 예산은 아래와 같은 지표가 적절한 수준으로 판단됨. 

|  | FCP | LCP | TTI |
|--------:|:--------:|:--------:|:--------:|
| Mobile | 2.5 미만 | 7.4 미만 | 5.7 미만 |
| PC | 0.6 미만 | 0.7 미만 |2.9 미만 |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
현재 지하철 노선도 서비스는 경쟁사에 비해 FCP, LCP 지표 측면이 매우 열악함으로 이를 개선 하기 위한 
    
   1. 사용하지 않는 CSS/JS 제거
   2. js 파일을 압축하여 통신
    
부분의 개선이 필요해 보임.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
