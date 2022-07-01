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
#### Desktop

|  | FCP | LCP | Speed Index | TTI | TBT | CLS | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 서울교통공사 | 1.5s | 3.7s | 3.3s | 2.0s | 130ms | 0 | 65 |
| 네이버지도 | 0.5s | 1.6s | 2.2s | 0.5s | 0ms | 0.006 | 89 |
| 카카오맵 | 0.5s | 1.3s | 2.2s | 0.7s | 0ms | 0.039 | 92 |
| 인프라 공방 | 2.6s | 2.7s | 2.6s | 2.7s | 50ms | 0.004 | 68 |

#### Mobile

|  | FCP | LCP | Speed Index | TTI | TBT | CLS | 성능 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 서울교통공사 | 6.5s | 6.9s | 10.4s | 8.5s | 220ms | 0 | 48 |
| 네이버지도 | 2.1s | 7.8s | 5.4s | 6.2s | 290ms | 0.03 | 59 |
| 카카오맵 | 1.7s | 4.7s | 6.4s | 4.1s | 40ms | 0.005 | 75 |
| 인프라 공방 | 14.8s | 15.3s | 14.8s | 15.4s | 510ms | 0.042 | 33 |

#### 우선순위
- 사용자 경험을 위해 컨텐츠가 빠르게 노출되고 렌더링 되는 것
    - FCP(페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간)를 단축해야 합니다.
- 출/퇴근 시간 시간이 촉박한 사용자가 빠르게 사용할 수 있도록 하는 것
    - TTI(자바스크립트 초기 실행이 완료되고, 사용자가 인터랙션할 수 있는 시점)을 단축해야 합니다.

#### 웹 성능 예산

- **Quantity based Metric**
    - 이미지 최대 크기: 경쟁사와 비교하여 이미지 최대 전송량을 235KB로 설정
        - 경쟁사 Total image weight: 서울교통공사 - 95.9KB, 네이버지도 - 147.4KB, 카카오맵 - 234.2KB
    - HTML, CSS 최대 크기: 경쟁사와 비교하여 HTML, CSS 최대 크기를 각각 5KB, 52KB로 설정 (경쟁사 중 서울교통공사와 나머지 두 곳의 차이가 커서 서울교통공사를 제외한 나머지 두 곳중 더 큰 용량을 기준으로 설정했습니다.)
        - 경쟁사 HTML 크기: 서울교통공사 - 123.8KB, 네이버지도 - 4.9KB, 카카오맵 - 4.0KB
        - 경쟁사 CSS 크기: 서울교통공사 - 136.8KB, 네이버지도 - 52KB, 카카오맵 - 34.8KB


- **Timing based Metric**
    - FCP:
        - Desktop - 0.6s, Mobile - 2.04s
        - 경쟁사 중 가장 빠른 FCP를 기준으로 20% 미만으로 차이가 나도록 설정
    - TTI:
        - Desktop - 0.6, Mobile - 4.92s
        - 경쟁사 중 가장 빠른 TTI를 기준으로 20% 미만으로 차이가 나도록 설정


- **Rule based Metric**
    - 성능: Desktop - 77, Mobile - 63
        - 경쟁사 중 가장 높은 성능 점수를 기준으로 20% 미만으로 차이가 나도록 설정


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- gzip 압축을 통해 각 리소스의 전송 인코딩을 최적화
- 효율적인 캐시 정책으로 정적 자산 제공
- JS 축소 및 실행 시간 단축 (JS파일의 크기를 보면 다른 경쟁사에 비해 큰 것을 알 수 있습니다.)
- 요청 수를 낮게 유지하고 전송 크기를 작게 유지 (스크립트 병합)
- CDN 사용하기

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
