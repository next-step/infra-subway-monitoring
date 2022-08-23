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

1. 웹 성능 진단
   * [내 URL] https://sss-next-step.o-r.kr/
   * [서울 교통공사] www.seoulmetro.co.kr/kr/cyberStation.do
   * [네이버 지도] https://m.map.naver.com/subway/subwayLine.naver?region=1000
   * [카카오 맵] https://m.map.kakao.com/
   
### 용어

- First Contentful Paint (FCP) : 콘텐츠가 포함된 첫 페인트는 첫 번째 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
- Time to Interactive (TTI) : 사용할 수 있을 때까지 걸리는 시간은 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간입니다.
- Speed Index (SI) : 속도 색인은 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.
- Total Blocking Time(TBT) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현됩니다.
- Largest Contentful Paint (LCP) : 콘텐츠가 포함된 최대 페인트는 최대 텍스트 또는 이미지가 표시되는 시간을 나타냅니다.
- Cumulative Layout Shift (CLS) : 누적 레이아웃 변경은 표시 영역 안에 보이는 요소의 이동을 측정합니다.

   
## webPageTest

### 용어

| site | First Byte | Start Render |  FCP   | Speed Index |   LCP   | CLS  |  TBT   | Total Bytes | 
| :----: | :----: | :---: |:------:|:-----------:|:-------:|:----:|:------:|:-----------:|
| 내 URL |  1.611s  | 8.5s | 8.469s |   8.528s    | 8.679s  | .058 |   0    |  2,462 kb   |
| 서울 교통공사 | 2.790s | 6.500S | 6.399S |   9.959S    | 6.401S  |  	0  | 8.108S |  1,064 KB   |
| 네이버 지도 | 1.332S |	3.600S | 3.567S |   7.348S    | 11.863S | .031 | .469S  |    988KB    |
| 카카오 맵 | 1.861S |	3.200S |	3.112S |	7.015S |	9.391S |	.004 |	.498S |	1,407KB |

## PageSpeed

1. MOBILE

| Site | SCORE |  FCP  | TTI   |   SI   |   TBT   |  LCP   |  CLS  |
| :----: | :----: |:-----:|:------|:------:|:-------:|:------:|:-----:|
| 내 URL | 33   | 14.6초 | 15.2초 | 14.6 초 | 500 밀리초 | 15.1 초 | 0.042 |
| 서울 교통공사 |  39   | 6.5초  | 8.5초  | 10.5초  | 490밀리초  |  6.9초  |   0   |
| 네이버 지도 |  58   | 2.2 초 | 5.9 초 | 7.2 초  | 250 밀리초 | 8.1 초  | 0.03  |
| 카카오 맵 |   71   | 1.7초  | 3.6초  |  6.3초  |  50밀리초  |  6.1초  | 0.005 |


2. PC

| Site | SCORE |  FCP  | TTI   |   SI   |   TBT   |  LCP   |  CLS  |
|:----------:|:-----:| :----: |:--------------------|:-----------:| :----: |:------------------------:|:-----------------------:|
|   내 URL    |  68   |         2.6 초        |        2.7 초        |      2.6 초       | 40 밀리초 |             2.7 초            |            0.004           |
|  서울 교통공사   |  59   | 1.4초 | 1.9초 | 4.1초 | 240밀리초 | 3.7초 | 0 |
|   네이버 지도   |   87  | 0.5초 | 0.6초 | 2.8초 | 0밀리초 | 1.7초 | 0.006 |
| 카카오 맵  |  91   | 0.5초 | 0.7초 | 2.4초 | 0밀리초 | 1.3초 | 0.039 |

---

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 예산은 경쟁사 대비 최대 120% 전후 성능으로 예산을 산정합니다.

- LCP 는 1초~ 0.5초(PC 기준) 
- FCP 는 0.4 ~ 1초
- TTI 는 0.5 ~ 1.3초
- Lighthouse 80점 이상이 되어야 할것같습니다.


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- [ ] 텍스트 압축 사용
  - 네트워크 바이트를 최소화하기 위해 리소스를 압축(gzip, deflate, brotli)
- [ ] 사용 안하는 자바스크립트 줄인다.
  - /js/vendors.js(sss-next-step.o-r.kr)
  - /js/main.js(sss-next-step.o-r.kr)
- [ ] 렌더링을 블록하는 리소스를 제거한다.
  - /css?family=Roboto:100,300,400,500,700,900(fonts.googleapis.com)
  - /css/materialdesignicons.min.css(cdn.jsdelivr.net) 
- [ ] 콘텐츠가 포함된 최대 페인트 이미지 미리 로드
  - div.v-main__wrap > div.d-flex > div.text-center > img.main-logo
    <img data-v-3660fe18="" src="/images/main_logo.png" class="main-logo mx-auto">

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
