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
: 성능 진단 결과는 `./test-result/` 폴더 안에 있습니다. 해당 결과를 바탕으로 아래의 표로 나타내었습니다.

- 모바일

| 사이트       | FCP (s) | TTI (s) | SI (s) | TBT (ms) | LCP (s) | CLS | 총점 |
|-------------|---------|---------|---------|-------------|----------|------|-----|
| running map | 14.8    | 15.3    | 14.8    | 450     | 15.3     | 0.042 | 34 |
| 서울교통공사  | 6.4     | 8.6     | 8.2    | 760      | 6.6      | 0    | 35  |
| 네이버지도    | 2.2     | 6.4     | 5.8     | 300      | 8.3      | 0.03 | 58  |
| 카카오맵     | 1.7     | 4.2     | 7.8     | 90       | 5.0      | 0.005 | 71  |

- 데스크탑

| 사이트       | FCP (s) | TTI (s) | SI (s) | TBT (ms) | LCP (s) | CLS | 총점 |
|-------------|---------|---------|---------|-------------|----------|------|-----|
| running map | 2.6     | 2.8     | 2.6     | 50          | 2.7      | 0.004 | 68 |
| 서울교통공사  | 1.9     | 1.9     | 3.0     | 0         | 3.6      | 0.016     | 66 |
| 네이버지도    | 0.5     | 0.5     | 2.1     | 0           | 1.6      | 0.006 | 89 |
| 카카오맵     | 0.5     | 0.7     | 2.5     | 0           | 1.0      | 0.003  | 93  |

- 중요도가 높다고 생각하는 FCP와 TTI 를 우선적으로 줄이는 것이 좋다고 생각합니다.
  경쟁사 중 가장 낮은 성능을 보이는 서울교통공사를 기준으로 잡았으며, 목표값은 아래와 같습니다.

- 목표값

| 기기    | FCP (s) | TTI (s) | SI (s) | TBT (ms) | LCP (s) | CLS | 총점 |
|-------------|---------|---------|---------|-------------|----------|------|-----|
| 모바일   | 3.5     | 6.2     | 8.0    | 450      | 8.5     | 0.042 | 57 |
| 데스크탑  | 1.5     | 1.6     | 3.0    | 0        | 2.0      | 0    | 70  |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- First Contentful Paint 의 값은 6초 미만으로 한다.
- 모바일 기기에서의 Time to Interactive 는 6초 미만으로 한다.
- 모든 웹 페이지의 각 페이지 내 포함된  리소스의 크기를 줄인다.
- 사용하지 않는 자바스크립트, CSS를 줄인다.
- 렌더링을 차단하는 리소스를 제거한다.




---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
