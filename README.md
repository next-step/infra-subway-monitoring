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


## 1단계 - 웹 성능 테스트

### 개념정리
- FCP(First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- TTI(Time to Interactive) : 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- SI(Speed Index) : 페이지 콘텐츠가 얼마나 빨리 표시되는지 보여주는 수치
- TBT(Total Blocking Time) : FCP와 상호작용 시간 사이의 모든 시간의 합으로 작업 지속 시간이 50ms를 넘으면 밀리초 단위로 표현
- LCP(Large Contentful Paint) : 최대 텍스트 또는 이미지가 표시되는 시간
- CLS(Cumulative Layout Shift) : 표시 영역 안에 보이는 요소의 이동을 측정

### 성능비교
|   사이트   |   FCP  |    TTI  |   SI   |    TBT   |    LCP  |  CLS  |
|----------|---------|---------|--------|----------|---------|-------|
|   러닝맵   | 14.7 초 | 15.4 초 | 14.7 초 | 600 밀리초 | 15.3 초 | 0.042 |
| 서울교통공사 | 6.4 초 |  8.3 초 | 11.1 초 | 500 밀리초 |  6.9 초 |   0   |
|  네이버지도 | 2.4 초 |  6.9 초 |  6.1 초 | 590 밀리초 |  7.2 초 |  0.03  |
|  카카오지도 | 1.7 초 |  4.7 초 |  6.7 초 | 110 밀리초 |  7.0 초 |  0.005 |

### 웹 성능예산은 어느정도가 적당하다고 생각하시나요
- 적어도 경쟁사의 평균치에는 도달해야 한다.
- 유독 차이가 큰 성능예산들을 위주로 성능예산을 잡는다.
    - FCP : 14.7초
    - TTI : 15.4초
    - SI : 14.7초
    - LCP : 15.3초
- 대응 방안을 확인해본다.
    - 텍스트 압축 : 9.15 s 사용
    - 자바스크립트 로딩 : 3.45 s 사용 
      - FCP
        - /js/vendors.js 텍스트 압축
        - /js/main.js 텍스트 압축
      - TTI / SI 
        - TCP, LCP 가 줄어들면 비례하여 같이 조금씩 줄어듬
      - LCP
        - /js/vendors.js 텍스트 압축
        - /js/main.js 텍스트 압축
        - /js/vendors.js 미사용 자바스크립트 줄이기
        - /js/main.js 미사용 자바스크립트 줄이기
    
### 웬페이지 로딩 줄이는 방법에 뭐가 있을까?
1. 레이지로드 (Lazyload) 활용
2. 페이지 상단은 inline CSS 활용 
3. http 요청 개수를 40 이하로 줄이기
4. 렌더링 방해하는 JS 및 CSS 삭제
4. HTML CSS JS를 압축 
5. GZIP 활성화해 파일 크기 줄이기
6. 브라우저 캐싱 적절히 활용
            

### 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
일단, 웹성능 지표에 따르면 "텍스트 압축 + 미사용 자바스크립트"만 줄여도 꽤 큰 변화가 있을 것 같다. <br>
그리고 최초 목표가 적어도 경쟁사의 평균치에 도달을 목표로 잡았으므로
```
최초성능시간 - (텍스트 압축 + 미사용 자바스크립트 반영 시간) < 목표 응답시간 < 경쟁사 평균치시간
```
```
최초성능시간 - 12.6 < 목표 응답시간 < 경쟁사 평균치시간
```
으로 서버 목표 응답시간을 정하면 괜찮을 것 같다.
추가로 힌트에서 제공한 3초의 법칙을 감안하여 3.x초는 넘지 않도록 정한다.

|   사이트   |   FCP  |    TTI  |   SI   |    TBT   |    LCP  |  CLS  |
|----------|---------|---------|--------|----------|---------|-------|
|   러닝맵   | 14.7 초 | 15.4 초 | 14.7 초 | 600 밀리초 | 15.3 초 | 0.042 |
| 경쟁사 평균 |  3.5 초 |  6.7 초 | 7.97 초 |    -     |  7.0 초 |   -   |
| 지표대응시간 | 2.1 초 |  2.8 초 |  2.1 초 |    -     |  2.8 초 |   -   |
| 목표응답시간 | 2.5 초 |  3.5 초 |  3.5 초 |    -     |  3.5 초 |   -   |

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
