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
<br>`


### 1단계 - 웹 성능 테스트

#### 웹 성능 테스트 결과
#### 모바일
|             |  지하철 노선도  |  서울교통공사  |  네이버지도  |  카카오맵  |
|=============|===============|==============|============|===========|
| FCP         |     14.7s     |     6.4s     |    2.2s    |    1.7s   |
| TTI         |     15.2s     |     8.4s     |    5.8s    |    4.2s   |
| Speed Index |     14.7s     |     7.5s     |    6.5s    |    10.6s  |
| TBT         |     480ms     |     440ms    |    180ms   |    50ms   |
| LCP         |     15.2s     |     6.6s     |    7.8s    |    5.1s   |
| CLS         |     0.042     |       0      |    0.03    |    0.139  |
| SCORE       |      34       |      43      |     61     |     67    |

##### 데스크톱
|             |  지하철 노선도  |  서울교통공사  |  네이버지도  |  카카오맵  |
|=============|===============|==============|============|===========|
| FCP         |     2.6s      |     1.4s     |    0.5s    |    0.5s   |
| TTI         |     2.7s      |     2.0s     |    0.5s    |    0.7s   |
| Speed Index |     2.6s      |     2.1s     |    2.5s    |    3.8s   |
| TBT         |     50ms      |     100ms    |     0ms    |     0ms   |
| LCP         |     2.7s      |     3.7s     |    1.7s    |    1.1s   |
| CLS         |     0.004     |      0       |    0.006   |    0.039  |
| SCORE       |      68       |      71      |     88     |     89    |


1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
-> 사용자 관점에서 콘텐츠가 처음 보이는 시점이 빠른 것이 체감되는 성능이라고 생각하기 때문에, 이러한 관점에서 FCP 및 TTI를 타겟 항목으로 삼았습니다.
1) FCP (First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 시간
- 모바일 3.09s, 데스크톱 0.72s (경쟁사 평균이 모바일 3.43s, 데스크톱 0.8s 이므로 이보다 10% 비교우위를 가져갈 수 있는 지점을 목표로 정했습니다.)
2) TTI (Time to Ineractive) : 완전히 페이지와 상호작용할 수 있게 될 때까지 걸리는 시간
- 모바일 5.52s, 데스크톱 0.96s (경쟁사 평균이 모바일 6.13s, 데스크톱 1.067s 이므로 이보다 10% 비교우위를 가져갈 수 있는 지점을 목표로 정했습니다.)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- 텍스트 기반 리소스 압축(gzip, deflate, brotli) -> 총 네트워크 바이트 최소화
- 사용하지 않는 자바스크립트 최소화 -> 네트워크 활동에 소비되는 바이트 감소
- 지연로딩 사용 -> 렌더링 차단 리소스 제거하기
- 효율적인 캐싱 정책 사용 -> 정적 애셋 제공


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
