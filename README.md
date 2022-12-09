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
- 정량 기반 지표
    - 이미지 파일 최대 크기 : 2MB (https://designlog.org/2512906 참고)
    - 자바 스크립트 파일 크기 합 : 2 MB
- 시간 기반 지표
    - FCP : 1초미만
    - TTI or LCP : 3초 미만 (by 3초의 법칙)
- 규칙 기반 지표
    - pagespeed 측정 데스크톱 기준 평균 80점 이상
- 유사 서비스 성능 기반 지표
    - 서울교통공사
        - 메인 페이지 응답 시간 : 6.3 s(FCP), 8.4 s(TTI)
        - 서비스 응답 시간 (부천 -> 강남 경로 검색 :/kr/getRoute/SearchResult.do) : 427 ms
    - 네이버지도
        - 메인 페이지 응답 시간 : 2.4 s(FCP), 6.2 s(TTI)
        - 서비스 응답 시간 (부천 -> 강남 경로 검색 :/subway/subwayPath.naver) : 439 ms
    - 카카오맵
        - 메인 페이지 응답 시간 : 1.7 s(FCP), 4.9 s(TTI)
        - 서비스 응답 시간 (부천 -> 강남 경로 검색 :/actions/publicRoute) : 1350 ms


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- 유사 서비스의 메인 페이지의 응답 시간은 1~6 초 사이에 이루어지고 있다.
이 결과와 3초의 법칙을 근거로, 지하철 노선도 서비스의 메인 페이지의 응답 시간은 3초 이내가 되는 것을 목표로 한다.

- 유사 서비스의 경로 탐색 응답 시간은 평균 0.5 초 내에 이루어진다. 
(단, 카카오맵 서비스의 경우 가능한 모든 경로를 탐색하는 더 확장된 기능을 제공하기에 응답 시간이 길게 측정 되었다고 판단한다.)
이 측정 결과의 20 % 를 초과하지 않는 0.6 초 미만을 지하철 노선도 서비스의 경로 탐색 응답 시간 목표로 한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
