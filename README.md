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


### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

    경쟁사 대비 비교해봤습니다.
    |  | 서울교통공사 | [네이버지도](https://map.naver.com/v5/subway/1000/-/-/-?c=15,0,0,0,dh) | [카카오지도](https://map.kakao.com/?REGION=01&target=subway) | 지하철 노선도 서비스 | 목표 |
    | --- | --- | --- | --- | --- | --- |
    | FCP | 1.5 | 0.5 | 0.6 | 2.8 | 0.5 |
    | Time to Interactive | 2.0 | 7.0 | 3.7 | 2.8 | 2.0 |
    | Speed Index | 2.3 | 4.4 | 2.7 | 2.8 | 2.3 |
    | Total Blocking Time | 0.11 | 2.12 | 1.13 | 0.03 | 0.03 |
    | LCP | 2.6 | 6.8 | 2.1 | 2.8 | 2.1 |
    | Cumulative Layout Shift | 0.001 | 0.019 | 0.721 | 0.004 | 0.001 |
    
    우리 서비스가 웹으로 제공되는 것을 감안하여, 모두 동일한 데스크톱 환경의 데스크톱 페이지를 기준으로 측정하였습니다.
    
    타 서비스의 최고 기록을 기준으로 삼아 개선 해나가는 것을 목표로 하였습니다.
    
    <details>
    <summary>비교 이미지</summary>
    <div>
    
    ![image](https://user-images.githubusercontent.com/48702370/218080788-1afe8484-be8a-4438-852b-ee932a7343b9.png)
    ![image](https://user-images.githubusercontent.com/48702370/218080913-550a1834-c832-4f84-a929-15e1d7810a26.png)
    ![image](https://user-images.githubusercontent.com/48702370/218080936-24c612df-d976-4dd4-bc3c-de24795df950.png)
    ![image](https://user-images.githubusercontent.com/48702370/218080953-80e47fa0-9b7a-4781-b462-013cd2c8f18c.png)

    </div>
    </details>
    
    
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
    | API | 시간 |
    | --- | --- |
    | lines | 64.03 |
    | lines/{id} | 40.34 |
    | stations | 114.6 |
    | members | 69.75 |
    | members/{me} | 49.38 |
    | login/token | 109.59 |
    | favorites | 52.55 |
    | path | 52.4 |
    
    FCP가 0.5초인 서비스들을 감안하면, API의 응답속도를 100ms 이하로 유지하는 것이 좋을 것 같습니다.
    
    현재 stations는 db에 많은 데이터가 있지 않음에도 불구하고 응답속도가 느려 부하 테스트를 통해 개선 요소를 파악할 필요성이 있습니다.
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
