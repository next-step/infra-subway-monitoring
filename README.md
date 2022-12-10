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

## 2단계 - 부하 테스트 

### 요구사항
- 부하 테스트
  - 테스트 전제조건 정리
    - 대상 시스템 범위
    - 목푯값 설정 (latency, throughput, 부하 유지기간)
    - 부하 테스트 시 저장될 데이터 건수 및 크기
  - 아래 시나리오 중 하나를 선택하여 스크립트 작성 
    - 접속 빈도가 높은 페이지
    - 데이터를 갱신하는 페이지
    - 데이터를 조회하는데 여러 데이터를 참조하는 페이지
- Smoke, Load, Stress 테스트 후 결과를 기록

### 테스트 설정값 구하기
1. 목표 rps 구하기
   - 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
   - 피크 시간대의 집중률을 예상해봅니다. (최대 트개픽 / 평소 트래픽)
   - 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
   - 이를 바탕으로 Throughput을 계산합니다.
- Throughput : 1일 평균 rps ~ 1일 최대 rps
  - 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
  - 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
  - 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
  
2. VUser 구하기
   - Request Rate: measured by the number of requests per second (RPS)
   - VU: the number of virtual users
   - R: the number of requests per VU iteration
   - T: a value larger than the time needed to complete a VU iteration
 ```
   T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency를 추가한다
   VUser = (목표 rps * T) / R
 ```
- 가령, 두개의 요청 (R=2)이 있고, 왕복시간이 0.5s, 지연시간이 1초라고 가정할 때 (T=2), 계산식은 아래와 같다.
 ```
VU = (300 * 2) / 2 = 300
 ```

###  테스트 종류
* Smoke Test
  - 최소한의 부하로 구성된 테스트로, 테스트 시나리오에 오류가 없는지 확인할 수 있어요.
  - 최소 부하 상태에서 시스템에 오류가 발생하지 않는지 확인할 수 있어요.
  - VUser를 1 ~ 2로 구성하여 테스트합니다.
* Load Test
  - 서비스의 평소 트래픽과 최대 트래픽 상황에서 성능이 어떤지 확인합니다. 이 때 기능이 정상 동작하는지도 확인합니다.
  - 애플리케이션 배포 및 인프라 변경(scale out, DB failover 등)시에 성능 변화를 확인합니다.
  - 외부 요인(결제 등)에 따른 예외 상황을 확인합니다.
* Stress Test
  - 서비스가 극한의 상황에서 어떻게 동작하는지 확인합니다. 
  - 장기간 부하 발생에 대한 한계치를 확인하고 기능이 정상 동작하는지 확인합니다.
  - 최대 사용자 또는 최대 처리량을 확인합니다.
  - 스트레스 테스트 이후 시스템이 수동 개입없이 복구되는지 확인합니다.

### 결과
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 대상 시스템 범위
        - nginx
        - application
        - db
    - 목푯값 설정
        - DAU : 1만
            - 네이버지도 MAU : 1천112만명 -> DAU : 37만
            - 카카오맵 MAU : 530만명 -> DAU : 18
        - 피크 시간대의 집중률 : 평소대비 3배
        - 1명당 1일 평균 접속수 / 요청수
            - 접속 수 : 2회
                - 평일 : 출근 / 퇴근 
                - 주말 : 외출 / 귀가
            - 요청 수 : 5
                - 접속 
                - 로그인
                - 경로검색 페이지 접속
                - 지하철 역 조회
                - 경로 조회
        - Throughput
            - 1일 총 접속수 : 10만(1일 사용자수(DAU) * 1명당 1일 평균 접속수)
            - 1일 평균 rps : 1.14rps(1일 총 접속 수 / 86,400 (초/일) )
            - 1일 최대 rps : 3.47rps(1일 평균 rps * 피크 시간대의 집중률)
    - 시나리오
        - 데이터를 조회하는데 여러 데이터를 참조하는 페이지로 시나리오
        - 경로검색 기능을 위주
            - 왜? 실제로 많은 데이터를 참조하기 때문
            - 노선, 역, 금액정책, 로그인 사용 등등
        - 스크립트 시나리오 작성
            - 사용자가 로그인을 한다.
            - 사용자가 경로검색 페이지에 접근한다.
            - 사용자가 경로를 검색한다.

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    - 실제 테스트 스크립트는 하위 src/main/resource/monitoring 하위에 첨부


---

## 3단계 - 로깅, 모니터링

### 요구사항
- 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- 로그 설정하기
  - Application Log 파일로 저장하기
    - 회원가입, 로그인 등의 이벤트에 로깅을 설정
    - 경로찾기 등의 이벤트 로그를 JSON으로 수집
  - Nginx Access Log 설정하기

- Cloudwatch로 모니터링
    - Cloudwatch로 로그 수집하기
    - Cloudwatch로 메트릭 수집하기
    - USE 방법론을 활용하기 용이하도록 대시보드 구성
     ㅇ
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
