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
   
* [자사앱](https://sung-jin.p-e.kr/)
  
| 구분 | FCP | TTI | SI | TBT | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| 모바일 | 14.4s | 15.1s | 14.4s | 0.660s | 15.1s | 0.047 |
| 데스크톱 | 2.7s | 2.8s | 2.7s | 0.07s | 2.8s | 0.003 |

* [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)

| 구분 | FCP | TTI | SI | TBT | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| 모바일 | 14.8s | 15.5s | 14.8s | 0.7s | 15.4s | 0.042 |
| 데스크톱 | 1.6s | 2.2s | 2.5s | 0.25s | 3.5s | 0.014 |

* [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)

| 구분 | FCP | TTI | SI | TBT | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| 모바일 | 2.0s | 6.5s | 4.6s | 0.24s | 7.6s | 0.03 |
| 데스크톱 | 0.5s | 0.7s | 2.0s | 0.01s | 1.6s | 0.006 |

* [카카오맵](https://m.map.kakao.com/)

| 구분 | FCP | TTI | SI | TBT | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| 모바일 | 1.7s | 4.3s | 6.1s | 0.07s | 4.7s | 0.005 |
| 데스크톱 | 0.5s | 1.1s | 1.9s | 0.02s | 1.1s | 0.039 |

* 경사의 결과를 바탕으로 다음과 같은 목표로 정하였습니다.
    * FCP: 모바일 - 1.5s 이내 / 데스크톱 - 0.4s 이내
    * TTI: 모바일 - 4s 이내 / 데스크톱 - 0.6s 이내
    * SI: 모바일 - 5s 아내 / 데스크톱 - 2.0s 이내
    * TBT: 모바일 - 0.2s 이내 / 데스크톱 - 0.01s 이내
    * LCP: 모바일 - 7s 이내 / 데스크톱 - 1.5s 이내
    * CLS: 모바일 - 0.05 이내 / 데스크톱 - 0.01 이내
* 위와 같이 설정한 이유는 다음과 같습니다
    * 지하철 노선 조회/검색이 주 목표이므로 TTI 가 가장 중요하다고 생각합니다
    * 그 다음으로 사용자가 페이지에 접근하는데 첫 로드가 되는 속도도 중요하다고 생각하기 때문에 다음으로 중요하다고 생각합니다
    * 다른 경쟁사의 경우 지하철 뿐 아니라 여러 기능을 제공하고, 자사앱은 지하철 기능만 제공하므로 최소한 가장 중요한 FCP / TTI 는 더 효율이 좋아야 한다고 생각했습니다

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

1. 텍스트를 압축하여 사용
2. js/css 최적화 하기
    * 사용하지 않는 js/css 다이어트
    * 렌더링 차단 리소스를 제거하여 중요한 js/css 를 인라인으로 전달
    * 중요하지 않은 js/css 는 지연하여 전달
3. 효율적인 캐시 정책을 사용하여 정적인 애셋 제공
4. 웹폰트가 로드되는 동안 텍스트 표시

#### 참고

* FCP(First Contentful Paint)
    * 콘텐츠가 포함된 첫 페인트
    * 첫 번째 텍스트 또는 이미지가 표시되는 시간
* TTI(Time to Interactive)
    * 사용할 수 있을 때까지 걸리는 시간
    * 완전히 페이지와 상호작용을 할 수 있게 될 때까지의 시간
* SI(Speed Index)
    * 속도 색인
    * 페이지 콘텐츠가 얼마나 빨리 표시되는가
* TBT(Total Blocking Time)
    * FCP 와 상호작용 시간 사이의 모든 시간의 합
* LCP(Largest Contentful Paint)
    * 콘텐츠가 포함된 최대 페인트
    * 최대 텍스트 또는 이미지가 표시되는 시간
* CLS(Cumulative Layout Shift)
    * 누적 레이아웃 변경
    * 표시 영역 안에 보이는 요소의 이동을 측정

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
