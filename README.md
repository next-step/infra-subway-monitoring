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

    - EC2 (i-0fe658ebabba91bdd)
    
        - /home/ubuntu/log/file.log

        - /var/log/syslog

        - /var/log/nginx/access.log

        - /var/log/nginx/error.log

2. Cloudwatch 대시보드 URL을 알려주세요

    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-junhong-kim

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

    * 경쟁사 성능 테스트 결과 by PageSpeed (데스크톱)

        |Service                  | First Contentful Paint | Time to Interactive| Speed Index | Total Blocking Time| Largest Contentful Paint | Cumulative Layout Shift|
        |-------------------------|:----------------------:|:------------------:|:-----------:|:------------------:|:------------------------:|:----------------------:|
        |https://map.naver.com/v5/|0.8s                    |3.4s                |2.7s         |260ms               |3.5s                      |0                       |
        |https://map.kakao.com/   |0.6s                    |3.3s                |2.7s         |1270ms              |0.7s                      |0.018                   |
        |우테캠Pro 지하철 서비스       |2.8s                    |2.9s                |2.7s         |70ms                |2.9s                      |0.004                   |

    * 웹 성능 예산 (경쟁사 성능 평균이내)

        |Service                  | First Contentful Paint | Time to Interactive| Speed Index | Total Blocking Time| Largest Contentful Paint | Cumulative Layout Shift|
        |-------------------------|:----------------------:|:------------------:|:-----------:|:------------------:|:------------------------:|:----------------------:|
        |우테캠Pro 지하철 서비스       | <= 0.7s                |<= 3.35s            |<= 2.7s      |<= 765ms            |<= 2.1s                   |<= 0.009                |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

    * 텍스트 압축 사용

    * 사용하지 않는 자바스크립트 줄이기

    * 웹 폰트 변경

    * 이미지 요소에 width, height 명시

    * 정적 컨텐츠 캐싱 적용

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
