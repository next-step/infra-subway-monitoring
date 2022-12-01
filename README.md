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
### 웹 성능
|               | RUNNINGMAP | 서울교통공사 | 네이버지도  | 카카오맵 |
|---------------|------------|----------|----------|--------|
| Total Bytes   | 2462kb     | 1067kb   | 941kb    | 1456kb |

- First Contentful Paint : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- Largest Contentful Paint : 최대 텍스트 또는 이미지가 표시되는 시간
- Time to Interactive : 사용할 수 있을 때까지 걸리는 시간(완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간)
- Total Blocking Time : FCP와 상호작용 시간 사이의 모든 시간의 합
- Cumulative Layout Shift : 영역 내 이동을 측정

#### MOBILE

|     | RUNNINGMAP                              | 서울교통공사                              | 네이버지도                                   | 카카오맵                                   |
|-----|-----------------------------------------|-------------------------------------|-----------------------------------------|----------------------------------------|
| 성능 | <span style="color:red">33</span>       | <span style="color:red">33</span>   | <span style="color:orange">53</span>    | <span style="color:orange">66</span>   |
| FCP | <span style="color:red">14.7s</span>    | <span style="color:red">6.4s</span> | <span style="color:orange">2.4s</span>  | <span style="color:green">1.7s</span>  |
| LCP | <span style="color:red">15.3s</span>    | <span style="color:red">6.8s</span> | <span style="color:red">7.5s</span>     | <span style="color:red">6.8s</span>    |
| TTI | <span style="color:red">15.3s</span>    | <span style="color:red">8.5s</span> | <span style="color:orange">6.5s</span>  | <span style="color:orange">5.2s</span> |
| TBT | <span style="color:orange">490ms</span> | <span style="color:red">790</span>  | <span style="color:orange">420ms</span> | <span style="color:green">100ms</span> |
| CLS | <span style="color:green">0.042</span>  | <span style="color:green">0</span>  | <span style="color:green">0.03</span>   | <span style="color:green">0.005</span> |

#### PC

|     | RUNNINGMAP                             | 서울교통공사                                       | 네이버지도                                  | 카카오맵                                   |
|-----|----------------------------------------|----------------------------------------------|----------------------------------------|----------------------------------------|
| 성능 | <span style="color:orange">67</span>   | <span style="color:red">44</span>            | <span style="color:green">90</span>    | <span style="color:green">90</span>    |
| FCP | <span style="color:red">2.8s</span>    | <span style="color:orange1">1.4s</span>      | <span style="color:green">0.5s</span>  | <span style="color:green">0.5s</span>  |
| LCP | <span style="color:red">2.9s</span>    | <span style="color:red">3.8s</span>          | <span style="color:orange">1.5s</span> | <span style="color:orange">1.4s</span> |
| TTI | <span style="color:orange">2.9s</span> | <span style="color:green">2.2s</span>        | <span style="color:green">1.2s</span>  | <span style="color:green">0.7s</span>  |
| TBT | <span style="color:green">50ms</span>  | <span style="color:red">620ms</span> | <span style="color:green">10ms</span>  | <span style="color:green">0ms</span>   |
| CLS | <span style="color:green">0.004</span> | <span style="color:green">0.001</span>       | <span style="color:green">0.006</span> | <span style="color:green">0.039</span> |

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요.

<table>
  <tr>
    <td rowspan="2"></td>
    <td colspan="2" align="center">AS - IS</td>
    <td colspan="2" align="center">TO - BE</td>
  </tr>
  <tr>
    <td>MOBILE</td>
    <td>PC</td>
    <td>MOBILE</td>
    <td>PC</td>
  </tr>
  <tr>
    <td>TTI</td>
    <td>15.3s</td>
    <td>2.9s</td>
    <td>5s</td>
    <td>0.5s</td>
  </tr>
  <tr>
    <td>FCP</td>
    <td>14.7s</td>
    <td>2.8s</td>
    <td>1.7s</td>
    <td>0.5s</td>
  </tr>
  <tr>
    <td>성능</td>
    <td>33</td>
    <td>67</td>
    <td>80</td>
    <td>90</td>
  </tr>
</table>

> 경쟁사인 서울교통공사, 네이버지도, 카카오맵은 지도를 띄워주는 반면 RUNNINGMAP은 **실제 지도를 띄워주진 않고 <U>경로 검색 및 노선도 관리</U>를 할 수 있는 어플리케이션**입니다.<br><br>
> **[1순위]** 아무래도 지도를 볼 수 있는 기능이 없기 때문에, 경쟁사들보다도 경로 검색을 빠르게 할 수 있도록 TTI 값이 낮아야 합니다.<br>
> **[2순위]** 추가적으로, 3초의 법칙에 의거해 전체 기능을 다 로딩을 못하더라도, 첫 번째 텍스트 또는 이미지가 표시되는 시간인 FCP가 3초 이하로 되어야 합니다.<br><br>
> **LCP의 경우, FCP와 값이 크게 다르지 않은** 걸로 보아 RUNNINGMAP에는 **큰 텍스트 또는 이미지가 특별히 존재하지 않는다고 판단**하였고, 이에 TTI와 FCP가 향상되면 Lighthouse 성능 감사가 80점 이상이 될 거라 생각합니다.

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
    1) RUNNINGMAP을 띄웠을 때 특별한 UI가 눈에 띄지 않음에도 **총 byte 수가 경쟁사 대비 최대 2.6배** 큽니다. 이에, **텍스트를 압축 사용**해야 합니다.
       - /js/vendor.js (전송크기: 2125kb -> 가능한 절감효과: 1716.5kb)
       - /js/main.js (전송크기: 172kb -> 가능한 절감효과: 143.6kb)
    2) RUNNINGMAP의 가장 중요한 기능은 경로 찾기입니다.
       - 기본적인 메인 화면 등에서는 누가 접근하더라도 동일한 화면이기 때문에, 경로 찾기를 하기 위해 띄우는 화면을 랜더링 하는 부분 등은 캐시를 사용해 정적인 애셋을 제공하면 좋습니다.
         - 하기 js에 대해 캐시 TTL 설정
           - /js/vendors.js (전송크기: 2125kb) 
           - /js/main.js (전송크기: 172kb)
           - /images/main_logo.png (전송크기: 4kb)
           - /images/logo_small.png (전송크기: 1kb)
         - 이미지에 대해 사이즈를 지정하여 레이아웃 변경 횟수를 줄입니다.
           - 최소한 width, height에 대한 비율을 지정하여 변경 횟수를 줄입니다.
             - /images/main_logo.png
             - /images/logo_small.png
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
