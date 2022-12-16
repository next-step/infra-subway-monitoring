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
   - 성능비교 (단위 : 초(s), 출처 : PageSpeed)
    <table>
        <thead>
            <tr>
                <th>대상</th>
                <th>FCP</th>
                <th>TTI</th>
                <th>SI</th>
                <th>TBT</th>
                <th>LCP</th>
                <th>CLS</th>
                <th>성능점수</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>RUNNING MAP</th>
                <td>2.8s</td>
                <td>2.9s</td>
                <td>2.8s</td>
                <td>50ms</td>
                <td>2.9s</td>
                <td>0.004</td>
                <td>67</td>
            </tr>
            <tr>
                <th>한국도로교통공사</th>
                <td>1.5s</td>
                <td>1.9s</td>
                <td>2.1s</td>
                <td>120ms</td>
                <td>2.1s</td>
                <td>0.001</td>
                <td>80</td>
            </tr>
            <tr>
                <th>네이버 지도</th>
                <td>0.5s</td>
                <td>1.2s</td>
                <td>2.4s</td>
                <td>30ms</td>             
                <td>1.5s</td>
                <td>0.006</td>
                <td>89</td>
            </tr>
            <tr>
                <th>카카오 맵</th>
                <td>0.5s</td>
                <td>0.7s</td>
                <td>2.4s</td>
                <td>0ms</td>
                <td>1.2s</td>
                <td>0.039</td>
                <td>92</td>
            </tr>
        </tbody>
    </table>
   - FCP : First Content Paint (사용자가 화면에서 컨텐츠를 볼 수 있는 최초시점)<br>
   - TTI : Time To Interactive (사용자와 페이지간 소통이 가능해질 때 까지 걸리는 시간)<br>
   - SI  : Speed Index (콘텐츠가 시각적으로 표시되는 진행속도)<br>
   - TBT : Total Blocking Time (사용자 입력에 페이지가 응답하지 못하도록 차단된 총 시간)<br>
   - LCP : Large Content Paint (가장 큰 콘텐츠를 표시하는데 걸리는 시간)<br>
   - CLS : Cumulative Layout Shift (레이아웃 불안정이 사용자에게 미치는 부정적인 영향)

- 지하철노선도 서비스의 경우, 사용자에게 컨텐츠를 빠르게 조회시켜주는게 중요하므로 컨텐츠 로딩에 대한 지표를 개선해보도록 한다.
- FCP 의 경우, 한국도로교통공사에 비해 100% 가까이 차이나므로, 최대 20% 차이까지 개선: 목표 1.8s(현재 2.8s 보다 약 35% ~ 40% 개선)
- TTI 의 경우, 경쟁사 중 가장 높은 한국도로교통공사도 2초 미만이므로 최대 2초 내로 개선: 목표 1.9s(현재 2.8s 보다 약 30% 개선)
- SI 의 경우, 경쟁사 모두 2.1s ~ 2.4s 내로 처리되므로 해당 범주 내 까지 개선: 목표 2.2s(현재 2.8s 보다 약 20% 개선)
- LCP 의 경우, 이미지 품질을 조금 낮추더라도 빠른 응답을 목표로 개선: 목표 1.5s(현재 2.9s 보다 약 50% 개선)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 리소스 전송시간 최소화를 위해 텍스트 기반 리소스를 압축하여 제공(ex: gzip)
- 미사용 자바스크립트 제거
- 반복적으로 사용되는 리소스는 캐싱해서 사용 (ex: /js/main.js, /js/vendors.js)
- 웹 폰트가 로딩되는 동안 텍스트가 계속 표시되도록 글꼴 표시 css 기능 사용


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요 
* Throughput 계산
> 예상 DAU 산출<br>
  : 카카오 맵 - 7,290,000(MAU) / 30 = 243,000(DAU) <br>
  : 네이버 지도 - 13,920,000(MAU) / 30 = 464,000(DAU) <br>
  : 위 두 경쟁사의 예상 DAU 에 따라 이번 부하테스트는 DAU 를 **500,000** 으로 설정하기로 함.<br>
> ---
> 피크 시간대  <br>
  : 통합 데이터지도 통계 자료에 따라 지하철 탑승량이 가장 밀집된 시간대를 피크시간대로 설정 <br>
  : 시간대 - **07~10시(출근)** / **17~20시(퇴근)** <br>
> ---
> 1명당 1일 평균 접속 및 요청수 예측 <br>
  : 등/하교 및 출/퇴근 을 고려할 때 **1인당 2회** 접속을 평균으로 가정<br>
  : 각 접속 마다 길찾기를 한다고 예상할 경우, 최대 요청수는 평균의 2배로 가정됨. **최대 1인당 4회**<br>
> ---
> 위 3가지 예측을 통해 throughput 계산 <br>
  : 1일 총 접속수 = DAU * 1인 1일 평균 접속 수 = 500,000 * 2 = 1,000,000 <br>
  : 1일 평균 rps = 1일 총 접속수 / 86,400 = 1,000,000 / 86,400 = 11.574 => **12** <br>
  : 1일 최대 rps = 1일 평균 rps * 2 = **24**<br>
* 목표 latency 는 **100ms** 로 설정
* 데이터 양 점검
> 지하철 역 : 616 건 <br>
> 노선 : 23 건 <br>
> 구간 : 340 건 <br>
* VUser 구하기
> T = 3회 요청 * 0.1 (+ 1s) = 1.3 <br>
> 평균 VUser = 12 * 1.3 / 3 = 4.8 => 5 <br>
> 최대 VUser = 24 * 1.3 / 3 = 9.6 => 10
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요.
* smoke
  - script : /k6/smoke/smoke.js
  - k6 : /k6/smoke/smoke_k6.png
  - grafana : /k6/smoke/smoke_dashboard.png
* load
   - script : /k6/load/load.js
   - k6 : /k6/load/load_k6.png
   - grafana : /k6/load/load_dashboard.png
* stress
   - script : /k6/stress/stress.js
   - k6 : /k6/stress/stress_k6.png
   - grafana : /k6/stress/stress_dashboard.png

---

### 3단계 - 로깅, 모니터링
* 요구사항 정리
> 1. 데이터 추가 관련 기능에 일반 log 수집 - 개인정보 노출 주의 : application.log
> 2. 경로찾기 기능엔 json log 수집 : data.log
> 3. nginx access log 설정
> 4. Cloudwatch 로 로그 수집
> 5. Cloudwatch 로 메트릭 수집
> 6. 대시보드 구성

1. 각 서버내 로깅 경로를 알려주세요
* application log
> 1. application.log : /home/ubuntu/nextstep/log/application/
> 2. data.log : /hone/ubuntu/nextstep/log/data/
* nginx access log
> 1. access.log : /var/log/nginx
> 2. error.log : /var/log/nginx

3. Cloudwatch 대시보드 URL을 알려주세요
