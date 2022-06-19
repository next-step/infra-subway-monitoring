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
- 측정 결과
    - [서울교통공사](https://www.seoulmetro.co.kr/kr/cyberStation.do)
  ```text
     mobile
     | FCP      | Speed Index | LCP     | TTI    | TBT    | CLS    | 성능
     | 6.5s     | 8.5s        | 6.9s    | 8.7s   | 1.010s | 0      |  30
     pc
     | 1.6s     | 2.3s        | 3.6s    | 2.0s   | 0.110s  | 0.014s |  69
  ```
    - [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
  ```text
     mobile
     | FCP      | Speed Index | LCP     | TTI    | TBT    | CLS    | 성능
     | 2.1s     | 5.9s        | 7.5s    | 7.4s   | 0.490s | 0.03   |  51
     pc
     | 0.5s     | 2.4s        | 1.6s    | 0.7s   | 0s     | 0.006s |  89
  ```
    - [지하철노선도](https://mannue.kro.kr/path)
  ```text
     mobile
     | FCP      | Speed Index | LCP     | TTI    | TBT    | CLS    | 성능
     | 16.1s     | 16.1s      | 16.1s   | 16.2s  | 0.80s  | 0.04   |  45
     pc
     | 2.9s     | 2.9s        | 2.9s    | 2.9s   | 10s    | 0s     |  66
  ```
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   - 저는 사용자와의 Interaction 을 중요하다고 생각함에 따라 TTI 에 집중하였습니다.
      - 경쟁사인 네이버 지도 TTI 수치인 mobile 7.4s , pc 0.7s 에 맞춘다.
      - FCP 는 2s 로 맞춘다.
      - TBT 를 0.4s 로 맞춘다.
      - LCP 도 현재 수치의 50프로인 8s 로 맞춘다.
     
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 현재 서버에는 gzip ,image 압축을 하지 않음으로 해당 작업을 통해 전송 데이터를 줄입니다.
   - origin 에서 직접 자원을 가져오지 않고 aws CDN 을 사용해서 가까운 곳에서 자원을 가져올수 있도록 합니다.
   - path 페이지 로딩시 vendor 2125 kb 인 파일이 다운로드 됨으로 해당 파일 용량을 개선할수 있는지 확인합니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
   1. 대상 시스템 범위
      - WAS , DB
   2. 목표값 설정 
        - 경쟁사 네이버 를 기반으로 아래와 같이 산출하였습니다.
        - 네이버 월간 활성 이용자 : 1392만 -> 30일 기준 하루 사용자 : 1392만 / 30 = 46만4천명 
        - 다음 지도, 길찾기, 지하철, 버스 앱 : 일 평균 실행 횟수 3.4
        - [출근시간 하차 인원](https://uri.seoul.go.kr/surc/archive/statsReportSummaryView.do?bbs_seq=26&bbs_master_seq=SUMMARY)
        - 7~8시 사이 승차 인원 : 17864568
        - 13~14시 사이 승차 인원 : 11563938
        - 피크 시간대의 집중률은 출근 시간 승차 인원 과 출근 시간 제외 된 승차인원 = 1.6
        - 1일 사용자 수 : 47만 * 1명당 평균 접속 수 3.4 = 160만
        - 1600000 / 86400 = 1일 평균 18.5 rps
        - 18.5 * 1.6 = __29.6rps__
        - Latency : 50ms
   3. 부하 테스트 시 저장될 데이터 건수 및 크기
      1. Line : 2개
      2. Station : 138 개
      3. Section : 89 개
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   1. 접속 빈도가 높은 페이지
      1. https://mannue.kro.kr/
   2. 데이터를 갱신하는 페이지 
      1. https://mannue.kro.kr/stations
   3. 데이터를 조회하는데 여러 데이터를 참조하는 페이지
      1. https://mannue.kro.kr/path

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
