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
##### 모바일 
| 사이트 | First Contentful Paint | Time to Interactive | Speed Index | Total Blocking Time | Largest Contentful Paint | Cumulative Layout Shift | Score |
|-------|-------|-------|-------|-------|-------|-------|-------|
| [내사이트](https://subway-iamjunsulee.p-e.kr) | **14.6 s** | **15.2 s** | 14.6 s | 490 ms | 15.1 s | 0.042 | 33 |
| [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do) | **6.7 s** | **8.7 s** | 11.1 s | 720 ms | 11 s | 0 | 32 |
| [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | **2.2 s** | **6.3 s** | 6.2 s | 310 ms | 7.6 s | 0.03 | 57 |
| [카카오맵](https://m.map.kakao.com/) | **1.7 s** | **4.1 s** | 6.3 s | 30 ms | 5.1 s | 0.005 | 73 |

##### 데스크톱
| 사이트 | First Contentful Paint | Time to Interactive | Speed Index | Total Blocking Time | Largest Contentful Paint | Cumulative Layout Shift | Score |
|-------|-------|-------|-------|-------|-------|-------|-------|
| [내사이트](https://subway-iamjunsulee.p-e.kr) | **2.8 s** | **2.9 s** | 2.8 s | 50 ms | 2.9 s | 0.004 | 67 |
| [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do) | **1.6 s** | **2.0 s** | 3.5 s | 110 ms | 3.6 s | 0.014 | 65 |
| [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | **0.5 s** | **0.5 s** | 2.3 s | 0 ms | 1.7 s | 0.006 | 89 |
| [카카오맵](https://m.map.kakao.com/) | **0.6 s** | **2.6 s** | 2.7 s | 650 ms | 0.6 s | 0.018 | 67 |

사용자 기준에서 의미 있는 콘텐츠가 처음 보이는 시점이 빠를수록 성능이 좋다고 판단하며, 이 시점을 앞당길 수 있도록 최적화해야 합니다.  
따라서, 위 성능 비교표 기준 FCP, TTI 수치를 개선하고자 하며, 수치가 차이가 많이 나는 서울교통공사를 제외하고, 경쟁사인 네이버, 카카오의 평균 점수 대비 10% 감소를 목표로 합니다.  
- First Contentful Paint(FCP)
    - 14.6 s -> 1.75 s (모바일)
    - 2.8 s -> 0.495 (데스크톱)  
- Time to Interactive(TTI)
    - 15.2 s -> 4.68 s (모바일)  
    - 2.9 s -> 1.395 (데스크톱)
 
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스 압축(gzip, deflate, brotli)
- 캐싱 정책을 통한 정적 애셋 제공
- 지연로딩을 사용하여 렌더링 차단 리소스 제거하기

##### 용어사전
- First Contentful Paint(FCP): 첫 번째 텍스트 또는 이미지가 표시되는 시간
- Time to Ineractive(TTI): 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- Speed Index(SI): 페이지 콘텐츠가 얼마나 빨리 표시되는지를 나타낸다.
- Total Blocking Time(TBT): FCP와 TTI 시간 사이의 모든 시간의 합
- Largest Contentful Paint(LCP): 최대 텍스트 또는 이미지가 표시되는 시간
- Cumulative Layout Shift(CLS): 사용자 입력 500ms 이내에 발생하지 않는 레이아웃 이동에 대한 점수를 합산하여 콘텐츠의 불안정성을 측정한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
