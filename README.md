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



### 경쟁사 분석

[PageSpeed](https://pagespeed.web.dev/) 사용



### [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)

|                          | 모바일 | 데스크탑 |
| ------------------------ | ------ | -------- |
| First Contentful Paint   | 8.8s   | 1.4s     |
| Time to Interactive      | 8.8s   | 2.0s     |
| Speed Index              | 13.6s  | 3.4s     |
| Total Blocking Time      | 0s     | 430ms    |
| Largest Contentful Paint | 9.2s   | 3.7s     |
| Cumulative Layout Shift  | 0      | 0        |
| 성능                     | 49     | 49       |



### [네이버 지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)

|                          | 모바일 | 데스크탑 |
| ------------------------ | ------ | -------- |
| First Contentful Paint   | 2.2s   | 0.5s     |
| Time to Interactive      | 6.2s   | 0.6s     |
| Speed Index              | 4.6s   | 1.5s     |
| Total Blocking Time      | 390ms  | 0ms      |
| Largest Contentful Paint | 8.1s   | 1.8s     |
| Cumulative Layout Shift  | 0.03   | 0.007    |
| 성능                     | 57     | 91       |



### [카카오맵](https://m.map.kakao.com/)

|                          | 모바일 | 데스크탑 |
| ------------------------ | ------ | -------- |
| First Contentful Paint   | 1.7s   | 0.5s     |
| Time to Interactive      | 4.1s   | 0.7s     |
| Speed Index              | 6.3s   | 2.2s     |
| Total Blocking Time      | 40ms   | 0ms      |
| Largest Contentful Paint | 6.4s   | 1.3s     |
| Cumulative Layout Shift  | 0.005  | 0.039    |
| 성능                     | 70     | 92       |





### [RunningMap](https://shinsunyoung.p-e.kr/)

|                          | 모바일 | 데스크탑 |
| ------------------------ | ------ | -------- |
| First Contentful Paint   | 14.6s  | 2.7s     |
| Time to Interactive      | 15.1s  | 2.8s     |
| Speed Index              | 14.6s  | 2.7s     |
| Total Blocking Time      | 480ms  | 50ms     |
| Largest Contentful Paint | 15.1s  | 2.8s     |
| Cumulative Layout Shift  | 0.042  | 0.004    |
| 성능                     | 34     | 67       |



### 웹 성능 예산

- First Contentful Paint : 첫 번째 텍스트 또는 이미지가 표시되는 시간

- Time to Interactive : 완전히 페이지를 사용할 수 있게 될 때까지 걸리는 시간

- Speed Index : 페이지 컨텐츠가 얼마나 빨리 보여지는지 측정한 시간

- Total Blocking Time : FCP와 통신을 하는 시간

- Largest Contentful Paint : 가장 큰 용량을 차지하는 텍스트나 이미지가 표시되는 시간

- Cumulative Layout Shift : 표시 영역 안에 보이는 요소의 이동 측정

  

지하철 노선도 서비스는 사용자에게 컨텐츠가 빠르게 노출되고 렌더링하는 것이 중요하기 때문에 아래 지표들의 우선순위가 높다고 생각합니다.

- First Contentful Paint
- Time to Interactive
- Speed Index
- Total Blocking Time



현재 RunningMap 서비스의 경우에는 다른 세 경쟁사와 비교하면 지표가 좋지 않기 때문에 경쟁사 대비 20% 이상 차이나지 않도록 목표 지표를 설정했습니다.

- First Contentful Paint
  - 모바일
    - 현재 서비스 지표 : 14.6s
    - 경쟁사 avg :  4.2s
    - 목표값 : 5.04s (경쟁사 avg + 20%) 이내
  - 데스크탑
    - 현재 서비스 지표 : 2.7s
    - 경쟁사 avg :  0.8s
    - 목표값 : 0.96s (경쟁사 avg + 20%) 이내
- Time to Interactive
  - 모바일
    - 현재 서비스 지표 : 15.1s
    - 경쟁사 avg :  6.3s
    - 목표값 : 7.56s (경쟁사 avg + 20%) 이내
  - 데스크탑
    - 현재 서비스 지표 : 2.8s
    - 경쟁사 avg :  1.1s
    - 목표값 : 1.32s (경쟁사 avg + 20%) 이내
- Speed Index
  - 모바일
    - 현재 서비스 지표 : 14.6s
    - 경쟁사 avg :  8.1s
    - 목표값 : 9.72s (경쟁사 avg + 20%) 이내
  - 데스크탑
    - 현재 서비스 지표 : 2.7s
    - 경쟁사 avg :  2.3s
    - 목표값 : 2.76s (경쟁사 avg + 20%) 이내

- Total Blocking Time
  - 모바일
    - 현재 서비스 지표 : 480ms
    - 경쟁사 avg :  143ms
    - 목표값 : 171ms (경쟁사 avg + 20%) 이내
  - 데스크탑
    - 현재 서비스 지표 : 50ms
    - 경쟁사 avg :  143ms
    - 목표값 : 516ms (경쟁사 avg + 20%) 이내



1. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- 텍스트 압축을 사용합니다. (gzip)
- 렌더링 차단 리소스를 제거합니다 ([ref](https://web.dev/render-blocking-resources/?utm_source=lighthouse&utm_medium=lr))

- CDN을 사용합니다.
- 캐시를 설정합니다. (CloudFront를 사용하여 정적 리소스의 응답시간을 줄일 수도 있습니다.)
- redis, memcached 등을 사용하여 자주 사용하는 노선의 경우에는 캐싱하여 서버의 응답 시간을 줄입니다.







---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
