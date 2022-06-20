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

### 예비 분석
1. 사용자 트래픽이 많은 페이지
- 경로검색 화면 (http://3.36.65.99:8080/path)

2. Pagespeed를 활용
- 지하철 사이트 및 경쟁사 비교
* 모바일

| 사이트                     |  FCP  |  TTI  |  SI   |  TBT   |  LCP  |  CLS  | Score |
|-------------------------|:-----:|:-----:|:-----:|:------:|:-----:|:-----:|:-----:|
| Infra-Subway-Monitoring | 16.4s | 16.6s | 16.4s | 220ms  | 16.4s | 0.004 |  42   |
| 서울교통공사                  | 7.2s  | 8.9s  | 8.4s  | 410ms  | 11.1s |  0.0  |  41   |
| 네이버지도                   | 2.2s  | 7.2s  | 6.3s  | 470ms  | 8.2s  | 0.03  |  51   |
| 카카오맵                    | 1.7s  | 4.5s  | 6.7s  |  90ms  | 6.4s  | 0.005 |  68   |

*데스크톱

| 사이트                     | FCP  | TTI  |  SI  | TBT  | LCP  |  CLS  | Score |
|-------------------------|:----:|:----:|:----:|:----:|:----:|:-----:|:-----:|
| Infra-Subway-Monitoring | 3.0s | 3.0s | 3.0s | 10ms | 3.0s |  0.0  |  65   |
| 서울교통공사                  | 1.6s | 2.0s | 2.1s | 40ms | 3.6s | 0.014 |  71   |
| 네이버지도                   | 0.5s | 0.7s | 2.3s | 10ms | 1.6s | 0.006 |  90   |
| 카카오맵                    | 0.5s | 1.0s | 2.2s | 0ms  | 1.1s | 0.003 |  94   |

3. 용어
- TTFB (Time to First Byte) : 웹 서버에서 수시한한 첫 번째 바이트가 도착
- FCP (First Contentful Paint) : DOM컨텐츠가 표시되는 시점  
- TTI (ime To Interactive) : 자바스크립트 실행 완료 
- SI  (Speed Index) : 시각적으로 페이지가 채워지는 속도
- TBT (Total Blocking Time) : 키보드나 클릭 같은 이벤트가 동작하지 않았던 시간의 합
- LCP (Largest Contentful Paint) : 가장 큰 영역을 차지하는 이미지나 텍스트의 로딩 시점
- CLS (Cumulative Layout Shift) : 예상치 못한 시각적인 레이아웃
- 용어 참고 사이트
    - https://front-end.me/web/web-site-optimization/
    - https://medium.com/jung-han/라이트하우스-성능-지표-살펴보기-83df3dc96fb9

### 1단계 - 웹 성능 테스트
3개의 경쟁 사이트 평균 점수 
모바일 : (41 + 51 + 68) / 3 = 53
데스크톱 : (71 + 90 + 94) / 3 = 85

```
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    1. 정량 기반 지표
       1. 텍스트 및 이미지 압축을 통해 FCP 개선 ( 모바일 : 7초 이내 , 데스크톱 : 1.6초 이내 )
       - 3개의 경쟁사이트 중 가장 낮은 경쟁사이트의 지표만큼 개선하는 것으로 목표
    2. 시간 기반 지표
       1. 전체 로딩 시간 : TTI 개선 ( 2초 이내 )
    3. 규칙 기반 지표
       1. 성능 점수 : 모바일 53, 데스크톱 85점 이상
```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
```
경쟁사와 비교했을 때 낮은 지표 개선
1. FCP, LCP 개선 : 텍스트 압축 사용( Gzip )
/js/vendors.js(eaststar1129-infra.p-e.kr)
2,125.0 KiB -> 1,716.5 KiB
/js/main.js(eaststar1129-infra.p-e.kr)
172.0 KiB -> 143.6 KiB

2. TTL 개선 : 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기
/js/vendors.js(eaststar1129-infra.p-e.kr)
캐시 TTL : None, SIZE : 2,125 KiB
/js/main.js(eaststar1129-infra.p-e.kr)
캐시 TTL : Nonem SIZE : 172 KiB

```


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요

### 1단계 기능 요구사항 
- [ ] 웹 성능 테스트
- [ ] 웹 성능 예산을 작성
- [ ] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
