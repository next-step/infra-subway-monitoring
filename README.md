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

- Running Map : https://yeojiin-subway.o-r.kr/

#### 경쟁사 성능 비교분석 (Mobile)

| 측정항목 | Running Map | 서울교통공사 | 네이버지도 | 카카오맵  |
|------|-------------|--------|-------|-------|
| FCP  | 8.540s      | 6.3s   | 2.2s  | 1.7s  |
| TTI  | 9.1s        | 8.3s   | 6.1s  | 5.2s  |
| SI   | 8.617s      | 9.5s   | 6.2s  | 7.7s  |
| TBT  | 8679ms      | 680ms  | 290ms | 120ms |
| LCP  | 8.679s      | 6.6s   | 7.4s  | 5.5s  |
| CLS  | 0.058       | 0      | 0.03  | 0.005 |

#### 경쟁사 성능 비교분석 (Desktop)

| 측정항목 | Running Map | 서울교통공사 | 네이버지도 | 카카오맵  |
|------|-------------|--------|-------|-------|
| FCP  | 5.935s      | 3.895s | 2.6s  | 1.7s  |
| TTI  | 6.2s        | 8.8s   | 6.1s  | 6.9s  |
| SI   | 5.9s        | 4.625s | 2.4s  | 4.4s  |
| TBT  | 60ms        | 1129ms | 0ms   | 0ms   |
| LCP  | 6.1s        | 5.824s | 6.9s  | 3.45s |
| CLS  | 0.004       | 0.001  | 0.006 | 0.04  |


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- `CLS`는 성능 분석결과(Mobile, Desktop) 90~100점 사이의 결과값이 나와 웹 성능 개선 대상에서는 제외했습니다. 
- TBT는 각각의 수치 편차가 크지 않을 경우 값이 작아져 성능과 큰 연관이 없다고 판단해 제외했습니다.
- 사용자는 비교 경쟁사와 20% 이상이 차이 날 경우 성능차이를 느끼기 때문에 이를 기준으로 개선 대상 항목을 정했습니다.
- 경장사 중 성능이 전테적으로 낮은 `서울교통공사`보다 높게, `네이버지도`와 `카카오맵`의 평군과 대비하여 20%로 목표를 설정합니다.
- 3초 안에 로딩을 목표로 한다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 메인 페이지





#### 힌트
<details>
<summary> </summary>

* 정량 기반(Quantity Based Metric) 예시
  * 메인 페이지의 모든 오브젝트 파일 크기는 10mb 미만으로 제한한다
  * 모든 웹 페이지의 각 페이지 내 포함된 자바스크립트 크기는 1mb 미만 이어야 한다.
  * 검색 페이지에는 2mb 미만의 이미지가 포함되어야 합니다.
* 시간 기반(Timing Based Metric) 예시
  * LTE 환경에서의 모바일 기기의 TTI:Time To Interactive는 5초 미만이어야 한다
  * DCL:Dom Content Loaded는 10초, FMP: First Meaningful Paint는 15초 미만이어야 한다
* 규칙 기반(Rule Based Metric) 예시
  * Lighthouse 성능 검사에서 80점 이상이어야 한다.


* FCP(First Contentful Paint) : 가장 첫번째 유의미한 콘텐츠(텍스트 or 이미지)가 표시되는 시간
* LCP(Large Contentful Paint) : 유의미한 콘텐츠(텍스트 or 이미지) 중 가장 큰 콘텐츠가 표시되는 시간
* TTI(Time To Interactive) : 사용자가 사이트와 완전히 상호작용 할 수 있을 때까지 걸리는 시간
* TBT(Total Blocking Time) : 상호작용이 불가능 했을 때의 시간
* CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정
* Speed Index : 페이지의 보이는 부분이 표시되는 평균 시간

</details>
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요


---

### 🚀 1단계 - 웹 성능 테스트
<details>
<summary> </summary>

#### 요구사항
* 저장소를 활용하여 아래 요구사항을 해결합니다.
* README 에 있는 질문에 답을 추가한 후 PR을 보내고 리뷰요청을 합니다.

* [ ] 웹 성능 예산 작성 후 서버 목표 응답시간 도출
  * 가설을 세우는 단계이므로, 정답은 없습니다. 주어진 정보를 바탕으로 나름의 논리만 세우면 됩니다. 서비스 오픈 등 여러 상황에선 주어진 정보가 제한적이라, 가설을 세우고 테스트하고 운영환경에서 검증해볼 수 밖에 없어요.

#### 힌트
1. 웹 성능 예산 작성하기
   WebPageTest, PageSpeed 등에서 테스트를 진행한 후, 웹 성능 예산을 작성합니다.
* 경쟁사 관련 자료   
  * 아래 자료를 참고하여 웹 성능 예산, 부하테스트 목푯값 등을 설계해보세요.
* 경쟁사   
  * 서울교통공사
  * 네이버지도
  * 카카오맵
* 언론보도
  * 데이터로보는 서울시 대중교통 이용
  * 카카오 모바일 APP 현황
  * 길찾기만 하루 1억건
  * 네이버 지도 MAU

2. 퍼포먼스 탭 활용하기
![img.png](image/img.png)
* 크롬 브라우저 도구를 활용하면, 퍼포먼스 탭에서 각 api별 요청 응답시간을 확인할 수 있어요. 웹 성능 예산에 영향을 주는 api 를 확인해보고, 가설을 세워보세요.


</details>
