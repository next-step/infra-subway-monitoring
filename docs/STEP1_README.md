## STEP1 - 웹 성능 테스트

### 요구사항
- 웹 성능 테스트
    - 웹 성능 예산을 작성
    - WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악

### 경쟁사와 비교
* 사이트
    * target : https://bestsilver-step1.o-r.kr/path
    * 서울교통공사 : http://www.seoulmetro.co.kr/kr/cyberStation.do
    * 네이버 지도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000

* PC 기준

| 사이트   | FCP  | TTI | SI   | TBT  | LCP  | CLS  | Score| 
|--------|------|-----|------|------|------|------|------|
| target | 2.7s | 2.7s | 2.7s | 30ms | 2.7초 | 0.004| 66  |
| 서울교통공사 | 1.5s | 2.0s| 2.1s| 50ms| 3.7s | 0    | 71   |
| 네이버지도 | 0.5s | 0.5s | 2.2s | 0ms | 1.6s | 0.006 | 90 |

* Mobile 기준

| 사이트   | FCP   | TTI   | SI    | TBT   | LCP   | CLS   | Score |
|--------|-------|-------|-------|-------|-------|-------|-------|
| target | 16.2s | 16.8s | 16.2s | 150ms | 16.2s | 0.004 | 44    |
| 서울교통공사 | 6.4s  | 8.4s  | 8.0s  | 460ms | 6.6s  | 0   | 51    |
| 네이버지도 | 2.2s  | 5.8s  | 6.3s  | 200ms | 8.1s  | 0.03  | 61   |

* 목표
    * target 사이트가 다른 경쟁사 지표보다 모두 낮게 나왔기 때문에 각 지표를 20% 이상 향상하는 것을 목표로 하면 좋을 것 같다.

### 용어 정리
* FCP
    * First Contentful Paint
    * 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링 될 때까지의 시간을 측정
    * gzip 등의 압축이 큰 영향을 미친다.

* SI
    * Speed Index
    * 웹 페이지를 불러올 때 콘텐츠가 시각적으로 표시되는 속도를 측정

* LCP
    * Largest Contentful Paint
    * 페이지가 처음으로 로드를 시작한 시점을 기준으로 뷰포트 내에 있는 가장 큰 이미지 또는 텍스트 블록의 렌더링 시간을 측정

* CLS
    * Cumulative Layout Shift
    * 방문자에게 콘텐츠가 얼마나 불안정한 지 측정
    * 일정 기간동안 레이아웃 이동이 없는 상태에서 발생하는 예기치 않은 레이아웃 이동에 대한 누적된 점수

* TBT
    * Total Blocking Time
    * 메인 스레드가 입력 응답을 막을 만큼 오래 차단되었을 때 FCP와 TTI 사이 총 시간을 측정

* TTI
    * Time to Interactive
    * 페이지가 로드되기 시작한 시점부터 주요 하위 리소스가 로드되고 사용자 입력에 신속하고 안정적으로 응답할 수 있는 시점까지의 시간을 측정
