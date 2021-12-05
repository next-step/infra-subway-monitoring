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
  - bastion 서버
    - name : devyonghee-bastion
    - public ip: 3.36.132.241
    - private ip: 192.169.0.175
      
  - nginx
    - name: devyonghee-subway-reverse-proxy
    - public ip: 3.34.196.5
    - private ip: 192.169.0.61
    - log : /var/log/nginx
      
  - application
    - name: devyonghee-subway-service-web
    - public ip: 15.164.225.129
    - private ip: 192.169.0.158
    - log: /home/ubuntu/infra-subway-monitoring/log

2. Cloudwatch 대시보드 URL을 알려주세요
   
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=devyonghee-dashboard

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

목표를 잡기 전 비슷한 서비스의 타 사이트를 성능을 확인해봤습니다.

#### 네이버 지하철
![naver-subway-desktop-performance](./img/naver-subway-desktop-performance.png)

#### 카카오맵
![kakao-map-desktop-performance](./img/kakao-map-desktop-performance.png)


#### 현재 지하철 노선도 서비스

![before-performance](img/before-performance.png)

타 서비스를 참고하여 목표 점수를 잡았습니다.
다른 부족한 것들도 보였지만 First Contentful Paint, Largest Contentful Paint 개선이 시급해보였습니다.

68점에서 30% 이상 개선하여 88점 이상 향상하는 것이 목표입니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

![after-performance](img/after-performance.png)

- spring 의 compression 을 통해 정적 리소스 압축 
- 프론트엔드 코드 분리하여 dynamic import 적용
- link 태그에 media 를 지정해주면서 로드할 때 렌더링 차단 방지
- spring 의 캐싱 기능을 이용하여 정적 리소스 캐싱

68점에서 93점으로 약 36.7% 개선되었습니다.
적용한 방법 이외에도 CDN 적용, 이미지 용량 감소 등을 통해 추가 개선할 수 있다고 생각됩니다.


3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
