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
#### 경쟁사와의 성능비교
| Desktop | 서울교통공사 | 네이버지도 | 카카오맵  | [Running Map](https://cylee9409-subway.o-r.kr/)|
|---------|-------------|-----------|----------|------------|
| FCP     |     1.5s    |    0.3s   |    0.6s  |     2.7s   |
| TTI     |     2.1s    |    4.0s   |    2.9s  |     2.8s   |
| SI      |     2.5s    |    3.6s   |    2.6s  |     2.7s   |
| TBT     |     300ms   |   1,100ms |  1,010ms |     30ms   |
| LCP     |     2.5s    |    4.1s   |    0.8s  |     2.8s   |
| CLS     |     0.001   |   0.019   |    0.018 |     0.004  |
performed by. [PageSpeed](https://pagespeed.web.dev/?utm_source=psi&utm_medium=redirect)

#### 목표 응답시간
경쟁사인 서울교통공사, 네이버지도, 카카오맵의 평균치에서 평균치 이하의 성능을 목표로 한다.
다만 경쟁사의 평균 성능 수치가 현 서비스의 수치 이상인 경우 현재 성능을 유지하는 것을 목표로 한다.

그 중 우선순위를 FCP(First Contentful Paint)에 높게 두어 해당 항목은 경쟁사의 최고 성능을 기준으로 한다.
경험에 의거하여 판단한다면 사용자 입장에서 특정 서비스를 시작할 때 처음 서비스가 기동되며 정상적으로 작동하는지에 대한 이미지가 그 서비스에 대한 첫 인상이 되기 때문이다.

대상 : [Running Map](https://cylee9409-subway.o-r.kr/)
| Desktop |   현재      |  목표      |
|---------|-------------|-----------|
| FCP     |     2.7s    |    0.3s   |
| TTI     |     2.8s    |    2.8s   |
| SI      |     2.7s    |    2.7s   |
| TBT     |     30ms    |    30ms   |
| LCP     |     2.8s    |    2.4s   |
| CLS     |     0.004   |   0.004   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 텍스트 압축 사용 (예상절감치 : 1.44s)
- 사용하지 않는 자바 스크립트 줄이기 (예상절감치 : 0.56s)
- 렌더링 차단 리소스 제거하기 (예상절감치 : 0.2s)

위의 항목들을 하며 목표 응답시간에 가까워지도록 성능을 개선한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
