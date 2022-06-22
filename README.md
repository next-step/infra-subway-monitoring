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
유사 경쟁 사이트들의 성능을 우선적으로 비교 분석해봤습니다.  
- 서울교통공사
    - 모바일: FCP: 2.9 / TTI: 8.6
    - 데스크톱: FCP: 2.0 / TTI: 2.2
- 네이버지도
  - 모바일: FCP: 0.8 / TTI: 7.2
  - 데스크톱: FCP: 0.5 / TTI: 0.5
- 카카오지도
    - 모바일: FCP: 0.8 / TTI: 4.3
    - 데스크톱: FCP: 0.3 / TTI: 0.6
    
일단 FCP와 TTI값을 기준으로 하였는데요. 이 두 값이 사용자가 직접적으로 빠르다 느리다를 판단할 수 있는 수치라고 생각되었습니다.  
그결과 20%이상 차이가 나면 사용자가 다른서비스들 보다 느리다고 느낀다고 하였기 떄문에 속도에서 경쟁력이 밀린 서교공을 제외하고 빠른 카카오지도를 기준으로 잡기로 하였습니다.

- subway 목표치
  - 모바일: FCP : 0.8 , TTI : 4.3
  - 데스크톱: FCP : 0.3 , TTI : 0.6

- 현재 https://yang-infra-subway.p-e.kr/
    - 모바일: FCP : 14.4 , TTI : 15.0
    - 데스크톱: FCP : 2.6 , TTI : 2.7


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
gzip 압축이 되어있지 않은것을 확인하였습니다.  
이부분을 최초 개선하니 다음과 같이 개선되었습니다.
  - 모바일: FCP : 5.2 , TTI : 5.8
  - 데스크톱: FCP : 1.2 , TTI : 1.3

다음으로 렌더링 차단 리소스 제거하기를 진행하였습니다. 
- 모바일: FCP : 1.7 , TTI : 5.3
- 데스크톱: FCP : 0.5 , TTI : 1.2

다음으로 상대적으로 퀄리티가 그렇게 중요하다고 여겨지지 않는 이미지 용량을 조금 줄여봤습니다.
- 모바일: FCP : 1.7 , TTI : 5.3
- 데스크톱: FCP : 0.5 , TTI : 1.1

변화 과정은 images 디렉토리에 담았습니다.

---

### 2단계 - 부하 테스트 
그라파나 주소: http://3.38.207.201:3000/
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 서비스 범위
  - nginx, tomcat(application), db
- 목표값 설정
    - 일 DAU: 140만
      - [카카오DAU기사](https://ko.lab.appa.pe/2016-09/kakao-korea.html)
      - 지도보다 비슷한 서비스인 카카오 지하철의 근사값으로 가정
    - 1명당 1일 평균접속수: 5회
      - 본인 기준으로 출퇴근시 4~5회정도 사용하여 5회로 가정(출근3회 퇴근2회)
    - 1일 총접속수: 700만
    - 피크시간 집중률 4.1
      - [피크시간기사](https://www.yna.co.kr/view/AKR20110511056500004)
      - 평균8만 피크 33만명으로 가정
    - 일 평균 rps
        - 1일총 접속수/ 86400 = 81 rps
    - 일 최대 rps
      - 1일 총 접속수/86400 * 피크시간집중률 = 332.1rps
      

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요  
- step2 디렉토리에 추가하였습니다.
- 스트레스 테스트의경우 vuser가 348명을 넘어가면서 죽어버리는것을 확인 하였습니다.


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
