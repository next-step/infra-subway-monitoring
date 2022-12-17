# 6주차 - 서비스 진단하기
## 1단계 - 웹 성능 테스트

### 요구사항

- [x] 웹 성능 예산 작성 후 서버 목표 응답시간 도출
  - 가설을 세우는 단계이므로, 정답은 없습니다. 주어진 정보를 바탕으로 나름의 논리만 세우면 됩니다.
  <br>서비스 오픈 등 여러 상황에선 주어진 정보가 제한적이라,
  <br>가설을 세우고 테스트하고 운영환경에서 검증해볼 수 밖에 없어요.

<br>

---
### 힌트

#### - 웹 성능 예산 작성하기
- WebPageTest, PageSpeed 등에서 테스트를 진행한 후, 웹 성능 예산을 작성합니다.

  * 경쟁사 관련 자료
    - 아래 자료를 참고하여 웹 성능 예산, 부하테스트 목푯값 등을 설계해보세요.

  * 경쟁사
    - [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)
    - [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
    - [카카오맵](https://m.map.kakao.com/)

  * 언론보도
    - [데이터로보는 서울시 대중교통 이용](https://www.bigdata-map.kr/datastory/traffic/seoul)
    - [카카오 모바일 APP 현황](https://ko.lab.appa.pe/2016-09/kakao-korea.html)
    - [길찾기만 하루 1억건](https://news.mt.co.kr/mtview.php?no=2021090916014079809)
    - [네이버 지도 MAU](https://blog.naver.com/rkwkrhspm/222515422896)


#### - 퍼포먼스 탭 활용하기
- 크롬 브라우저 도구를 활용하면, 퍼포먼스 탭에서 각 api별 요청 응답시간을 확인할 수 있어요.
  <br>웹 성능 예산에 영향을 주는 api 를 확인해보고, 가설을 세워보세요.

<br>

---
### 웹 성능 지표
- 웹 서버의 영향을 받는 지표

| 지표                   | 의미                                     |
|----------------------|----------------------------------------|
| Security Score       | TLS, HTTP 헤더 보안, JS 라이브러리 보안 취약성 보완 여부 |
| First Byte Time      | 웹 서버에서 받은 컨텐츠의 첫 번째 바이트 도착 시간          |
| Keep-Alive Enabled   | TCP 연결을 재사용하기 위한 Keep-Alive 설정 여부      |
| Compress Transfer    | 스크립트 파일 Content-Encoding 압축 여부         |
| Compress Image       | 이미지를 압축 여부                             |
| Cache Static Content | 정적 파일 캐싱 설정이 여부                        |
| CDN                  | 적절한 C부N 활용 여부                          |

<br>

- 정적 컨텐츠, 네트워크 상태의 영향을 받는 지표

| 지표  | 의미                                                                                                             |
|-----|----------------------------------------------------------------------------------------------------------------|
| FCP | ***First Contentful Paint***<br/>첫번째 이미지, 텍스트가 표시되는 시간                                                         |
| LCP | ***Largest Contentful Paint***<br/>가장 큰 컨첸츠가 화면에 렌더링 되는 시간                                                     |
| TTI | ***Time to Interactive***<br/>사용자 입력에 신속하게 안정적으로 응답할 수 있는 시점까지의 시간                                             |
| TBT | ***Total Blocking Time***<br/>페이지가 클릭, 키보드 입력 같은 사용자와 상호작용하지 못했던 시간의 총 합<br/>Task로 인해 사용자와의 상호작용이 차단된 시간이라는 의미 |
| CLS | ***Cumulative Layout Shift***<br/>예상하지 못한 레이아웃을 경험하는 빈도<br/>(뒤늦게 레이아웃에 변화가 오는 현상-잘 못된 클릭 유발하기도 함)              |
| SI  | ***Speed Index***<br/>컨텐츠가 얼마나 빨리 표시되는지                                                                        |

> ※ TTI 와 FCP
> <br>둘 중 어느 지표에 우선순위를 두는 것이 좋은가?
> <br>사용자에게 일단 컨텐츠가 빠르게 표시되는 것이 중요하다면 FCP !!
> <br>사용자가 빠르게 상호작용(클릭, 타이핑)을 하는 것이 중요하다면 TTI !!
> <br>지표의 우선 순위는 정답이 없다! 사이트의 특성에 따라 결정하면 된다

> ※ TTI 와 TBT
> <br>둘은 비슷해보이지만 차이점을 갖고 있다
> <br>TBT는 페이지가 안정적인 상호 작용 환경이 되기 전 상호 작용이 불가능한 시간이고
> <br>TTI는 최소 5초간 긴 작업(50ms이상)이 없는 시간으로
> <br>TTI가 같더라도 TBT가 짧으면 사용자는 답답함을 덜 느끼겠지만
> <br>TBT가 길면 사용자는 긴 시간 동안 상호작용을 못하게 되므로 답답함을 느끼게 된다
> <br>즉, 페이지가 안적적인 상태가 되지 않은 시점에도 상호작용이 가능하다면
> <br>사용자 경험이 개선된다는 의미이다
> <br>
> <br>(예시)
> <br>1. 51ms 작업이 10초 동안 3번에 걸쳐서 일어난 후 5초 간 작업이 없는 경우 (TTI 10초, TBT 10초)
> <br>2. 10초짜리 작업이 1번 일어난 후 5초 간 작업이 없는 경우 (TTI 10초, TBT 3ms)
> <br>
> <br>안정적인 상호작용이 가능해지는데 걸리는 시간(TTI)는 같지만
> <br>1번의 경우 사용자는 10초간 아무 상호작용을 못하고 기다려야하지만
> <br>2번의 경우는 안정적인 상황이 되지 않았더라도 중간에 상호작용을 할 수 있다
> <br>[참고링크 - Time to Interactive(상호 작용까지의 시간, TTI)](https://web.dev/i18n/ko/tti/)
> <br>[참고링크 - Total Blocking Time(총 차단 시간, TBT)](https://web.dev/tbt/#how-does-tbt-relate-to-tti)

<br>

### 목표 성능 작성 기준
- 정량 기준 (Quantity based)
  - 이미지 최대 크기
  - 웹 글꼴 최대 크기
  - 글꼴 최대 갯수
  - 스크립트 최대 크기
  - 스크립트 최대 갯수
  - HTML, CSS 최대 크기
  - 동영상 최대 크기


- 시간 기준 (Timing based)
  - FCP
  - LCP
  - TTI
  - TBT
  - CLS


- 규칙 기준 (Rule based)
  - WebPageTest, pagespeed 등 웹 사이트에서 측정한 점수