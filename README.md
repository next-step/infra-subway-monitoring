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

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
