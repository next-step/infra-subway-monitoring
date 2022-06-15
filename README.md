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
Q. 웹 성능 예산은 어느 정도가 적당하다고 생각하시나요
> 상황에 따라 다르다.  
> 다만 다음과 같은 과정을 거쳐 초기 웹 성능 예산을 도출해 볼 수 있다.

첫째, 느슨하게 기준을 세워본다.
1. 정량 기반 지표  
   이미지, 스크립트, 폰트 등 웹 페이지 제작에 필요한 요소들의 한계값을 설정하는 것으로 고려해야 하는 대표 항목은 다음과 같다.
    - 이미지 파일의 최대 크기
    - 자바스크립트 파일의 크기의 합
    - 서드 파티 스크립트 개수의 합
2. 시간 기반 지표  
   브라우저에서 발생하는 다양한 웹 성능 이벤트 값을 측정하여 웹 성능에 대한 목표치를 설정하는 것으로 대표 항목은 다음과 같다.
    - First Contentful Paint : 콘텐츠 렌더링이 시작될 때까지 걸리는 시간
    - Largest Contentful Paint : 가장 큰 이미지 또는 비디오가 렌더링을 시작할 때까지 걸리는 시간
    - First input delay : 사용자가 상호 작용을 한 후 웹 브라우저가 그 상호 작용을 처리할 때까지 걸리는 시간
    - Time to Interactive : 모든 리소스가 로드되고 사용자 입력에 신속하게 안정적으로 응답할 수 있는 시점까지의 시간
    - Total blocking time : 메인 스레드가 입력 응답을 막을 만큼 오래 차단되었을 때 FCP와 TTI 사이의 총 시간
    - Cumulative Layout Shift : 사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도를 수량화한 것
3. 규칙 기반 지표  
   웹 성능 지표를 측정하여 사이트의 점수를 메기는 도구를 활용해 성능을 비교 분석, 개선할 수 있고 대표 도구는 다음과 같다.
    - LightHouse
    - WebPageTest

둘째, 웹 사이트의 성능을 측정해본다.
> [RUNNINGMAP](https://www.tasklet1579.p-e.kr/)
1. First Byte : 1.582초
2. Start Render : 9.200초
3. FCP : 9.127초
4. LCP : 9.337초
5. CLS : 0.058초
6. TBT : 0.004초
7. Total Bytes : 2,462KB

셋째, 경쟁사 사이트의 성능을 측정해본다.
> [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)

1. First Byte : 1.287초
2. Start Render : 3.600초
3. FCP : 3.461초
4. LCP : 12.298초
5. CLS : 0.031초
6. TBT : 0.487초
7. Total Bytes : 989KB

▼ 결론
> 웹 서비스는 변경이 잦기 때문에 언제든 웹 성능 요소가 변경될 수 있고 객관적인 성능을 측정할 수 있는 도구를 활용하여 핵심 지표를 관리해야 한다. 

1. FCP : 2.5초 이하 양호, 4.0초 이상 나쁨
2. FID : 0.1초 이하 양호, 0.3초 이상 나쁨
3. TTI : 평균적으로 모바일 하드웨어에서 5초 미만 권고
4. CLS : 0.1점 이하 양호, 0.25점 이상 나쁨

Q. 웹 성능 예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

첫째, DNS Lookup Time
- [What Is a DNS Lookup Time?](https://sematext.com/glossary/dns-lookup-time/)
- [8 Tips on How to Reduce DNS Lookups and Speed Them Up](https://kinsta.com/blog/reduce-dns-lookups) 

둘째, 텍스트 압축 사용
- 페이지 로드 속도를 향상시키기 위해서는 리소스를 최적화하고 압축하여 전체 다운로드 크기를 최소화해야 한다.
- 이미지를 제외한 대부분이 텍스트 콘텐츠로 구성되어 있고 대부분의 브라우저는 압축 프로그램을 내장하고 있다.
- 서버에서 텍스트 압축을 활성화하는 방법에 대해 알아보자.

셋째, Keep Alive Off
- HTTP는 Connectionless 방식으로 연결을 매번 끊고 새로 생성하는 구조이다.
- 연결을 유지하게 되면 커넥션을 맺고 끊는 데 작업이 없어지기 때문에 그만큼의 시간을 단축할 수 있다. 
- 바쁜 서버 환경에서는 모든 요청 마다 연결을 유지해야 하기 때문에 오히려 성능이 하락할 수 있다.

★ 추천 도서

[웹에 날개를 달아주는 웹 성능 최적화 기법](http://www.yes24.com/product/goods/96262886)

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
