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

**[자료1] WebPageTest 성능 테스트 결과**

| 사이트        | First Byte | Start Render |   FCP   | Speed Index |   LCP    |  CLS  |   TBT   | Total Bytes |
|------------|:----------:|:------------:|:-------:|:-----------:|:--------:|:-----:|:-------:|:-----------:|
| 서울교통공사     |  1.645 s   |    5.7 s     | 5.712 s |  	9.808 s   | 5.714 s  |   0   | 9.425 s |  1,063 KB   |
| 네이버지도      |  1.505 s   |    3.6 s     | 3.530 s |   7.411 s   | 11.441 s | 0.031 | 0.493 s |   990 KB    |
| 카카오맵       |  1.911 s   |    3.3 s     | 3.213 s |   7.263 s   | 9.423 s  | 0.004 | 0.412 s |  1,406 KB   |
 | RUNNINGMAP |  1.594 s   |    9.3 s     | 9.243 s |   9.327 s   | 9.443 s  | 0.058 | 0.000 s |  2,462 KB   |

**[자료2] PageSpeed 성능 테스트 결과** (Desktop)

| 사이트        |  TTI  |  FCP  |  SI   |  TBT  |  LCP  |  CLS  | Performance |
|------------|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----------:|
| 서울교통공사     | 2.0 s | 1.6 s | 2.2 s | 90 ms | 3.6 s | 0.014 |     70      |
| 네이버지도      | 0.7 s | 0.5 s | 1.5 s | 0 ms  | 1.6 s | 0.006 |     92      |
| 카카오맵       | 4.5 s | 1.7 s | 5.2 s | 90 ms | 6.4 s | 0.005 |     70      |
| RUNNINGMAP | 2.8 s | 2.7 s | 3.0 s | 50 ms | 2.8 s | 0.004 |     68      |

**경쟁사와 [RUNNINGMAP](https://cold-pumpkin.o-r.kr/) 성능 테스트 결과를 참조하여 예산을 설정**
* 성능 점수가 가장 높은 네이버지도와 비교해 현저히 낮은 FCP와 TTI를 비슷한 수준으로 향상 (PageSpeed 기준)
  * FCP 1.0s 이하
  * TTI 0.7s 이하
* PageSpeed 결과 Red(slow) 인 메트릭 Orange(moderate) 이상으로 향상될 수 있도록 개선
    * SI 2.0s 이하 
    * LCP 2.0s 이하
* 결과적으로 성능 점수 85점 이상으로 향상
* 전체 리소스 크기(Total Bytes)를 2,000 KB 이하로 감소

**※ 용어설명**
* **TTFB (Time to First Byte )**
  * 리소스 요청 후 첫 번째 바이트가 도착하기까지의 시작을 측정한 메트릭
* **INP (Interaction to Next Paint )**
  * 유저가 페이지를 방문할 때 발생하는 응답 지연 시간 중 가장 긴 시간을 측정한 메트릭
* **FCP (First Contentful Paint)**
  * 페이지가 로드되기 시작한 후 부터 페이지 내용 일부가 렌더링 될 때 까지의 시간을 측정한 메트릭
* **FID (First Input Delay)**
  * 유저가 페이지에서 처음 상호작용(링크 클릭, 버튼 탭, 자바스크립트 기반 컨트롤러 등)을 시작한 시간부터 브라우저가 실제로 해당 상호작용에 대한 응답으로 이벤트 핸들러 처리를 시작할 수 있는 시간까지를 측정한 메트릭
* **LCP (Largest Contentful Paint)**
  * 페이지가 처음 로드되기 시작한 이후 가장 큰 이미지 또는 텍스트 블록이 렌더링된 시간을 측정한 메트릭
* **CLS (Cumulative Layout Shift)**
  * 페이지 전체 수명 동안 발생하는 모든 예기치 못한 레이아웃 변경에 대한 레이아웃 변경 스코어 중 가장 큰 스코어를 측정한 메트릭
* **TBT (Total Blocking Time)**
  * 메인 스레드의 입력 응답이 막힐 정도로 오래 block 되었을 때 FCP와 TTI 사이의 총 시간
* **SI (Speed Index)**
  * 뷰 포트내의 콘텐츠가 보여지는 평균 시간을 측정한 것

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* 자바스크립트 리소스 압축으로 FCP, LCP 개선
  * `/js/vendors.js` (2,125 KB → 1,716.5 KB)
  * `/js/main.js` (172 KB → 143.6 KB)
* 사용하지 않는 소스 제거하여 LCP 개선
  * `/js/vendors.js` (2,125.4 KB → 637.3 KB)
  * `/js/main.js` (172.3 KB → 61.8 KB)
* `render-blocking` 리소스 제거로 FCP, LCP 개선
  * `/css?family=Roboto:100,300,400,500,700,900` (230 ms 감소)
  * `/css/materialdesignicons.min.css` (350 ms 감소)
* 정적 리소스 캐싱 정책 변경
  * `/js/vendors.js`, `/js/main.js`, `/images/main_logo.png`, `/images/logo_small.png`
* 이미지 크기(`width`, `height`) 기정
  * `/images/main_logo.png`
  * `/images/logo_small.png`
  
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느 정도로 설정하셨나요 
* **대상 시스템 범위**
  * Reverse Proxy (Nginx)
  * WAS (Tomcat)
  * DB (MySql)
* **목푯값 설정** (latency, throughput, 부하 유지기간)
  * 예상 1일 사용자 수(DAU)
    * 경쟁사 MAU [조사 결과](https://www.sedaily.com/NewsView/22RH3PUBN6), 네이버지도 1,392만 명, 카카오맵 729만 명
    * RUNNINGMAP 예상 MAU는 600만 명, 예상 DAU는 **20만 명**으로 예상 
  * 피크 시간대의 예상 집중률 (최대 트개픽 / 평소 트래픽)
    * [지하철 시간대별 승하차 인원 정보](https://data.seoul.go.kr/dataList/OA-12252/S/1/datasetView.do) 를 참고하여 피크 시간대의 사용자 수를 낮 시간대 대비 약 5배로 산정
    * **예상 집중률 5**
  * 1명당 1일 예상 평균 접속 혹은 요청 수
    * 로그인 페이지 접속, 로그인, 메인 페이지, 경로 검색 페이지, 경로 검색 요청
    * 출근, 퇴근 시점에 각각 위 흐름을 반복할 것으로 간주하여 **1일 평균 요청 수 10회**로 예상
  * 예상 Throughput
    * 1일 총 접속 수 = 20만 명 * 10번 = 200만 번
    * 1일 평균 rps = 200만 / 86,400 (초/일) = 약 23 rps
    * 1일 최대 rps = 23 rps * 5 = 115 rps 
* **부하 테스트 시 저장될 데이터 건수 및 크기**
  * 지하철 노선(`Line`) : 23 건
  * 지하철 역(`Station`) : 616 건
  * 지하철 구간(`Section`) : 340 건
* **VUser**
  * 하루 총 10번의 요청, 총 Latency 목표값 0.2s 가정
  * T = (10번 * 0.2s) = 2
  * VUser = (115 * 2) / 2 = 115

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
