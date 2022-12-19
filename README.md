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

#### 경쟁사와의 비교를 통한 선능예산 측정

> - 측정 사이트: PageSpeed Insights
> - 사용 이유: WebPageTest사이트의 경우 외국에서 국내사이트를 측정하기 때문에 속도적으로 정확성을 기대하기 현실적으로 힘들 수 있음

#### 데스크탑

|     | [RUNNINGMAP](https://tech-pro.jimbae.com/) | [서울메트로](http://www.seoulmetro.co.kr/kr/cyberStation.do) | [네이버 지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | [카카오 지도](https://m.map.kakao.com/) |
| ----- | -------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------- |
| FCP | 2.6초                                      | 1.6초                                                        | 0.5초                                                                      | 0.5초                                   |
| TTI | 2.7초                                      | 2.0초                                                        | 1.1초                                                                      | 0.7초                                   |
| SI  | 2.6초                                      | 2.3초                                                        | 2.1초                                                                      | 2.2초                                   |
| TBT | 50밀리초                                   | 60밀리초                                                     | 10밀리초                                                                   | 0                                       |
| LCP | 2.7초                                      | 1.9초                                                        | 1.5초                                                                      | 1.2초                                   |
| CLS | 0.004                                      | 0.001                                                        | 0.006                                                                      | 0.039                                   |

#### 모바일

|     | [RUNNINGMAP](https://tech-pro.jimbae.com/) | [서울메트로](http://www.seoulmetro.co.kr/kr/cyberStation.do) | [네이버 지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | [카카오 지도](https://m.map.kakao.com/) |
| ----- | -------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------- |
| FCP | 14.8초                                     | 6.8초                                                        | 2.3초                                                                      | 1.7초                                   |
| TTI | 15.4초                                     | 9.9초                                                        | 6.7초                                                                      | 4.5초                                   |
| SI  | 14.8초                                     | 9.2초                                                        | 6.1초                                                                      | 6.3초                                   |
| TBT | 560밀리초                                  | 2,270밀리초                                                  | 440밀리초                                                                  | 60밀리초                                |
| LCP | 15.3초                                     | 7.1초                                                        | 7.7초                                                                      | 6.8초                                   |
| CLS | 0.042                                      | 0                                                            | 0.03                                                                       | 0.005                                   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

> 데스크탑의 경우 Google LightHouse 에서 권장하는 좋은속도 기준을 따라가는것이 좋아 보입니다.
>
> * FCP(First Contentful Paint): 1.8초 이하
> * TTI(Time to Interactive): 3.8초 이하
> * SI(Speed Index): 3.4초 이하
> * TBT(Total Blocking Time): 200밀리초 이하
> * LCP(Largest Contentful Paint): 2.5초 이하
> * LCS(Cumulative Layout Shift): 0.1초 이하

> 모바일의 경우 현실적으로 경쟁사중 네이버와 비슷한 속도를 목표로 하는것이 좋아보입니다
>
> * FCP(First Contentful Paint): 2.3초 이하
> * TTI(Time to Interactive): 6.7초 이하
> * SI(Speed Index): 6.1초 이하
> * TBT(Total Blocking Time): 400밀리초 이하
> * LCP(Largest Contentful Paint): 7.7초 이하
> * LCS(Cumulative Layout Shift): 0.03초 이하

- 우선 개선 대상
    - PageSpeed Insight에서 제공되는 기본적이 개선
        - 사용하지 않는 자바스크립트 줄이기
            - /js/vendors.js
            - /js/main.js
        - gzip 등을 활용한 텍스트 압축
        - 웹폰트가 로드되는 동안 텍스트 계속 표시되는지 확인

---

### 2단계 - 부하 테스트

1. 부하테스트 전제조건은 어느정도로 설정하셨나요

    * 대상 시스템 범위
        * 웹 사이트
            * 메인
            * 경로검색
        * 웹서버
        * Was서버
        * 데이터 베이스
    * 목푯값 설정 (latency, throughput, 부하 유지기간)
        * 1일 총 접속수 = DAU * 명당 1일 평균 접속수 = 10만
            * 가장 비슷한 서비스인 카카오 지하철 MAU = 154만
            * 154만/30일 DAU = 5만
            * 1명당 1일 평균 접속수 = 출퇴근 2회
        * 1일 평균 rps = 10만 / 86,400 = 1.16rps
        * 1일 최대 rps = 1.16 * (10/1) = 11.6rps
        * VU iteration = 4 * 0.05 + 1 = 1.2s
        * VUser = (1.16 * 1.2) / 4 = 0.348 -> 1명
        * MaxVUser = (11.16 * 1.2) / 4 = 3.348 -> 4명
        * .... 너무 낮나???
    * 부하 테스트 시 저장될 데이터 건수 및 크기
        * 기존 미션에 사용된 데이터 베이스
        * 역정보 노선정보 보유 회원 1건 추가
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

* reuslt 하위 폴더에 정리해 두었습니다.
* 210명때부터 문제가 발생하더니 250명대에서 완전히 응답을 정지함.
* 서비스는 정상 복구됨

---

### 3단계 - 로깅, 모니터링

1. 각 서버내 로깅 경로를 알려주세요
    * 서버: ubuntu@web
    * Application: /var/log/application
    * nginx: /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
    * https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=jimbaemon-dashboard;start=PT12H