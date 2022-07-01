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
- 경로검색 화면 (http://eaststar1129-infra.p-e.kr:8080/path)

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
       1. 전체 로딩 시간 : TTI 개선 ( 모바일 : 9초 이내, 데스크톱 : 2초 이내 )
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

### 실제 사용자 통계
1. 네이버지도로 사용자가 1392만명
2. 티맵 1020만명 
3. 구글 지도 854만명 
4. 카카오맵 729만명 
5. 카카오 T 550만명 
6. 카카오내비 404만명 
7. 지하철 종결자 197만명 
8. 카카오버스 195만명 
9. 카카오지하철 164만명 
10. 전국 스마트 버스 84만명 
11. 원내비 81만명 
12. 티맵(TMAP) 대중교통 71만명

트래픽 변동 이유
- 네이버지도와 카카오맵 등 지도 서비스는 지난 5월부터 잔여 백신 확인과 예약 기능을 시작한 이후 사용자와 실행횟수가 지속적으로 증가하고 있다.
- 해외여행에서 많이 이용했던 구글 지도의 경우 신종 코로나바이러스 감염증(코로나19) 발생 이후 앱 실행횟수가 크게 감소한 것으로 나타났다.

- 자료 : 2021.08월 한달 통계 https://m.dailian.co.kr/news/view/1033380

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

* 가장 적게 이용한 서비스의 일일 사용자 조사 
  - 2만명 (71만명/31(일))
  1. DAU : 4만명 (특정 시간, 특정 날짜에 몰릴 경우를 대비해 * 2)
  2. 1명당 1일 평균 : 3회
    - 참고 : 앱 이용 횟수 https://www.yna.co.kr/view/AKR20200929159800017

* Throughput : 1일 평균 rps ~ 1일 최대 rps
  1. 1일 총 접속 수 : 4만 * 3 = 12만
  2. 1일 평균 rps : 12만 / 86,400 = 13.89
  3. (최대 트래픽 / 평소트래픽) 을 3배로 가정
  4. 1일 최대 rps : 13.89 * 3 = 41.67

* Latency : 일반적으로 100ms 이하로 잡기에 100ms 이하로 측정

* 부하테스트 시 저장될 데이터 건수 및 크기
  - 역 : 616
  - 구간 : 340
  - 노선 : 23

* 시나리오 대상
- 로그인 (/login)
- 경로 검색 (/path)

* VUser 구하기
  - 평균 트래픽 VUser = 13.89 * 2 = 27
  - 최대 트래픽 VUser = 41.67 * 2 = 83

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* WAS 서버 : 192.168.194.99
* 테스트 서버 : 192.168.194.54

script : script 폴더
result : result 폴더

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
   /var/log/nginx/access.log
   /var/log/nginx/error.log
   /var/log/syslog
   /home/ubuntu/infra-subway-monitoring/log/
 
2. Cloudwatch 대시보드 URL을 알려주세요

### 1단계 기능 요구사항 
- [x] 웹 성능 테스트
- [x] 웹 성능 예산을 작성
- [x] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악

### 2단계 기능 요구사항
- [X] 부하 테스트
  - [x] 테스트 전제조건 정리
    - [x] 대상 시스템 범위
    - [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [x] 부하 테스트 시 저장될 데이터 건수 및 크기
  - [X] 각 시나리오에 맞춰 스크립트 작성
    - [X] 접속 빈도가 높은 페이지 (path)
    - [X] 데이터를 갱신하는 페이지 (stations, lines, sections, login) : login만 테스트
    - [X] 데이터를 조회하는데 여러 데이터를 참조하는 페이지 (path, login) : 로그인은 이전 시나리오
  - [X] Smoke, Load, Stress 테스트 후 결과를 기록

### 서비스가 극한의 상황에서 어떻게 동작하는지 확인합니다.
```xhtml
서비스가 요청에 대한 응답을 하지 못함
서비스의 요청수를 순서대로 처리하거나, 처리량을 늘리는 방법을 고려해야함
```

### 장기간 부하 발생에 대한 한계치를 확인하고 기능이 정상 동작하는지 확인합니다.
```xhtml
###flag 
부하 한계치를 찾기 위해서 테스트
```

### 최대 사용자 또는 최대 처리량을 확인합니다.
```xhtml
###flag 
부하 한계치를 찾기 위해서 테스트
```

### 스트레스 테스트 이후 시스템이 수동 개입없이 복구되는지 확인합니다.
```xhtml
스트레스 테스트 이후 정상적으로 정상 복구
```

### 3단계 기능 요구사항
- [ ] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] 로그 설정하기
- [x] Cloudwatch로 모니터링
- 로그 설정하기
  - [x] Application Log 파일로 저장하기
    - [x] 회원가입, 로그인 등의 이벤트에 로깅을 설정
    - [x] 경로찾기 등의 이벤트 로그를 JSON으로 수집
  - [x] Nginx Access Log 설정하기
- Cloudwatch로 모니터링
  - [x] Cloudwatch로 로그 수집하기
  - [x] Cloudwatch로 메트릭 수집하기
  - [ ] USE 방법론을 활용하기 용이하도록 대시보드 구성