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
- 성능 대상 URL : https://인쿠26.메인.한국/stations
- 성능 테스트 사이트 : https://www.webpagetest.org/, https://pagespeed.web.dev/
- 경쟁사
  서울교통공사 : http://www.seoulmetro.co.kr/kr/cyberStation.do
  네이버지도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000
  카카오맵 : https://m.map.kakao.com/
- 
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- First Contentful Paint 2.5초 미만
- Time to Interactive 2초 이하
- Largest Contentful Paint 1.2초 이하
- Speed Index 2초 이하
- Total Blocking Time 140 밀리초
- Cumulative Layout Shift 0.006
- 성능 70점 이상

3. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 압축 사용
- 사용하지 않는 자바스크립트 줄이기
- 렌더링 차단 리소스 제거하기
- 캐시정책 늘리기
- DOM 크기 관리
- 이미지에 width, height 명시하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
