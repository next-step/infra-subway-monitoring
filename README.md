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

#### 주요 페이지 선정

- 경로 검색 페이지 ( [https://devrunner21.kro.kr/path](https://devrunner21.kro.kr/path) )

#### 경쟁사와 성능 비교

- 데스크톱

    |  | 지하철 노선도 | 네이버 지도 | 서울교통공사 |
    | --- | --- | --- | --- |
    | 성능 | 65 | 90 | 69 |
    | First Contentful Paint | 2.9초 | 0.5 초 | 1.6 초 |
    | Time to Interactive | 2.9 초 | 0.5 초 | 2.0 초 |
    | Speed Index | 2.9 초 | 2.2 초 | 2.3 초 |
    | Total Blocking Time | 10 밀리초 | 0 밀리초 | 120 밀리초 |
    | Largest Contentful Paint | 2.9 초 | 1.5 초 | 3.6 초 |
    | Cumulative Layout Shift | 0 | 0.006 | 0.013 |
  
- 모바일

    |  | 지하철 노선도 | 네이버 지도 | 서울교통공사 |
    | --- | --- | --- | --- |
    | 성능 | 43 | 61 | 36 |
    | First Contentful Paint | 16.2 초 | 2.0 초 | 6.9 초 |
    | Time to Interactive | 16.9 초 | 6.5 초 | 8.9 초 |
    | Speed Index | 16.2 초 | 5.7 초 | 8.6 초 |
    | Total Blocking Time | 190 밀리초 | 240 밀리초 | 650 밀리초 |
    | Largest Contentful Paint | 16.2 초 | 7.6 초 | 6.9 초 |
    | Cumulative Layout Shift | 0.004 | 0.03 | 0 |

#### 우선순위 결정

![image](https://user-images.githubusercontent.com/78334008/165176902-20b00916-5ae0-45c0-84e5-ffd4a71544d8.png)

- 대상 페이지에는 큰 이미지 렌더링이 없다.
- 별도의 많은 필터조건이 없기 때문에 한번 검색하면 조건변경 후 재검색의 확률이 적을 것으로 예상됨
- 검색 시 페이지 응답을 빠르게 가져가는게 좋다고 판단함
- 우선순위
    - SI
    - FCP
    - LCP
    - TTI
    - TBT
    
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    
    - 주 경쟁사(네이버지도)를 바탕으로 근사한 값으로 산정
    - 데스크톱
    
        |  | 목표 | 네이버 지도 |
        | --- | --- | --- |
        | 성능 | 80 | 90 |
        | First Contentful Paint | 1.5초 | 0.5 초 |
        | Time to Interactive | 1 초 | 0.5 초 |
        | Speed Index | 2.2 초 | 2.2 초 |
        | Total Blocking Time | 5 밀리초 | 0 밀리초 |
        | Largest Contentful Paint | 1.5 초 | 1.5 초 |
        | Cumulative Layout Shift | 0 | 0.006 |
      
    - 모바일
    
        |  | 목표 | 네이버 지도 |
        | --- | --- | --- |
        | 성능 | 60 | 61 |
        | First Contentful Paint | 3 초 | 2.0 초 |
        | Time to Interactive | 6.5 초 | 6.5 초 |
        | Speed Index | 6 초 | 5.7 초 |
        | Total Blocking Time | 190 밀리초 | 240 밀리초 |
        | Largest Contentful Paint | 8 초 | 7.6 초 |
        | Cumulative Layout Shift | 0.004 | 0.03 |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - Gzip 압축을 통해 콘텐츠 크기를 줄여서 렌더링 속도를 향상시켜야 한다.
    - 중요도가 낮은 JS/CSS를 지연로딩해서 첫 페이지 렌더링 속도를 증가시킨다.


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
