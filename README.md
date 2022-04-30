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
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요]

이 부분은 감이 잘 오지 않아서, 다른 싸이트 대비로 비교하였습니다.

| 성능지표                   | 타 싸이트    | 내 싸이트  |
|----------------------------|----------|--------|
| First Contentful Paint     | 0.6 초    | 2.7 초  |
| Speed Index                | 2.8 초    | 2.7 초  |
| Largest Contentful Paint   | 1.2 초    | 2.8 초  |
| Time to Interactive        | 2.2 초    | 2.8 초  |
| Total Blocking Time        | 430 밀리초  | 50 밀리초 |
| Cumulative Layout Shift    | 0.065    | 0.004  |
| PageSpeed score            | 71 점     | 68 점   |

#### 개선 예산

첫번째 페이지에는 많은 정보가 담겨져 있지 않은데 로딩이 너무 오래걸린다고 판단됩니다.  
따라서 개선예산을 아래와 같이 측정하였습니다.

![img_1.png](img_1.png)
- 현재 Cache 를 다 비우고 페이지를 로드했을때 11초 가량 걸리는데 이를 3초 이상으로 줄여야 합니다.
  - First Contentful Paint -> 3초 이하
  - Speed Index -> 3초 이하
  - Largest Contentful Paint -> 3초 이하

정도로 개선하면 좀 더 사용자 측면에서 빠른 페이지로드를 기대할 수 있다고 생각합니다.

4. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - Bundle 등의 빌드 도구를 통해 asset 파일의 gzip 압축이 필요할거 같습니다.
   - 메인 페이지에서 모든 asset 을 다 불러오는 것 같은데 지연로딩이 필요해 보입니다.
     - 첫번째 로딩 페이지에서 굳이 모든 asset 을 불러올 필요가 없어 보입니다.
   - 현재 메인화면은 잘 변하지 않으므로 Cache 를 이용해 정적파일을 캐싱할 필요가 있어보입니다. (요건 근데 사실 비즈니스에 따라 다를 수도 있다고 생각합니다.)
   - favicon 의 content-type 이 json 인지 잘 모르겠습니다.
     - ![img.png](img.png)



---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
   1. 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
        - 지하철 어플리케이션이 100~130만 사이라고 해서 저희 싸이트는 일단 25만정도로 계산했습니다.
        - 피크 시간대의 집중 트래픽
          - 최대 트래픽 80만
          - 평소 트래픽 50만
        - 한명당 1일 평균 3번 정도 접속할 것이라고 예상했습니다. 
   2. **Throughput**
     - 1 일 총 접속수 = 25 * 3 = **750000**
     - 1 일 평균 rps = 750000 / 86400 = **8.68**
     - 1 일 최대 rps = 8.6 * (8/5) = **13.76**

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   1. [로그인 테스트 결과](/test/login/README.md)
   2. [역 조회 테스트 결과](/test/stations/README.md)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
   1. /home/ubuntu/nextstep/log 입니다.

2. Cloudwatch 대시보드 URL을 알려주세요
   1. https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=tmdgusya
