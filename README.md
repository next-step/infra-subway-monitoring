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

- 웹 성능 측정 결과 (데스크탑 기준)

|             | [runningmap] | [사이버스테이션] | [서울대중교통] | [네이버맵] | [카카오맵] |
|-------------|--------------|-----------|----------|--------|--------|
| FCP         | 2.9s         | 1.4s      | 1.6s     | 0.5s   | 0.5s   |
| LCP         | 2.9s         | 1.6s      | 1.7s     | 1.4s   | 1.0s   |
| TTI         | 4.9s         | 1.9s      | 8.7s     | 0.6s   | 0.6s   |
| TBT         | 1,800ms      | 190ms     | 70ms     | 0ms    | 0ms    |
| CLS         | 0            | 0.001     | 0.002    | 0.006  | 0      |
| Speed Index | 2.9s         | 2.0s      | 4.1s     | 2.7s   | 2.7s   |

- 측정 페이지 URL
  + runningmap : https://runningmap.kro.kr/stations (로딩이 제일 느린 페이지를 측정대상으로 선정)
  + 사이버스테이션 : http://www.seoulmetro.co.kr/kr/cyberStation.do
  + 서울대중교통 : https://bus.go.kr/subWayMain.jsp?mnuNm=3
  + 네이버맵 : https://m.map.naver.com/subway/subwayLine.naver?region=1000
  + 카카오맵 : https://m.map.kakao.com/


- 측정 사이트, 기준
  - 측정 사이트 : [PageSpeed]
  - 선정 이유
  <br>[WebPageTest]에서 Test Location을 Seoul, Korea로 설정하고 테스트해보았음에도
  <br>[PageSpeed]에 비해 훨씬 좋지 않은 측정결과를 확인할 수 있었습니다.
  <br>해외사이트에서 국내사이트에 대한 테스트가 적합하지 않다고 생각되어 [PageSpeed]를 측정 사이트로 선정했습니다.


- 웹 성능 예산 (데스크탑 기준)

  | 지표  | 목표값  |
  |-----|------|
  | TTI | 1.5s |
  | FCP | 1.0s |
  | LCP | 0.5s |
  사용자 빠르게 컨텐츠가 노출되는 것보다는 등록/수정/경로조회 등 사용자와의 상호작용이 더 중요하므로
  <br>FCP보다는 TTI의 우선순위를 높게 잡았고,
  <br>3초의 법칙을 지키고, 경쟁사이트인 [사이버스테이션]과 [서울대중교통]보다 높은 성능을 내기위해 TTI는 1.5s를 목표로 잡았고
  <br>[PageSpeed]에서 추천하는 개선방안 적용 시 기대되는 지표별 단축시간을 고려하여 FCP,LCP의 목표값을 설정했습니다.

[runningmap]: https://runningmap.kro.kr/stations
[사이버스테이션]: http://www.seoulmetro.co.kr/kr/cyberStation.do
[서울대중교통]: https://bus.go.kr/subWayMain.jsp?mnuNm=3
[네이버맵]: https://m.map.naver.com/subway/subwayLine.naver?region=1000
[카카오맵]: https://m.map.kakao.com/
[PageSpeed]: https://pagespeed.web.dev
[WebPageTest]: https://www.webpagetest.org/

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- gzip 사용하여 텍스트 압축 `FCP, LCP 1.48s 단축 예상`
- 렌더링 차단 리소스 제거 `FCP, LCP 0.4s 단축 예상`
- 사용하지 않는 js파일 지연로딩 `LCP 0.52s 단축 예상`

예상 결과
- FCP 1.88s 단축 예상 `2.9 -> 1.02s`
- LCP 2.4s 단축 예상 `2.9 -> 0.5s`

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
