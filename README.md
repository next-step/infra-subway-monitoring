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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

#### 지하철 노선 검색 vs 경쟁사 지하철 노선 검색

지하철 : https://jdragon.r-e.kr/path
경쟁사 : https://m.map.naver.com/subway/subwayLine.naver?region=1000

#### WebPageTest 비교

지하철
![image](https://user-images.githubusercontent.com/10750614/159508690-97239bb3-bc3c-457e-9542-0d56028e6cd1.png)
![image](https://user-images.githubusercontent.com/10750614/159513513-fe42169f-770d-41b7-a5dd-ba5a96962fdd.png)

경쟁사
![image](https://user-images.githubusercontent.com/10750614/159508887-0953b14b-df40-46d3-b2d4-24ec8ef7a63f.png)
![image](https://user-images.githubusercontent.com/10750614/159513662-5bd9b6c2-9304-4fd9-a994-656ab7b70ba1.png)


#### PageSpeed(데스크탑) 비교

지하철 : FCP 3.1 TTI 3.3 SI : 3.1 TBT : 30 LCP : 3.1 CLS : 0
경쟁사 : FCP 0.5 TTI 1.2 SI : 2.1 TBT : 20 LCP : 1.6 CLS : 0.006


**지하철**

![image](https://user-images.githubusercontent.com/10750614/159509196-afb0fff8-72b4-42ad-b715-b4ffb1c7b203.png)


**경쟁사**

![image](https://user-images.githubusercontent.com/10750614/159509306-a83696b2-e425-4f8d-a8ac-9046154bc709.png)


#### 성능 예산

성능 예산은 경쟁사의 -20% ~ +20% 로 잡아봤습니다.
- FCP : 0.4 ~ 0.6
- TTI : 0.96 ~ 1.44
- SI  : 1.68 ~ 2.52
- TBT : 16 ~ 24
- LCP : 1.28 ~ 1.92
- CLS : 0



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

사용자 입장에서 생각하면 요청한 페이지가 화면에 빨리 보여야 만족스러울 것 같습니다. 그래서 화면에 빨리
나타나게 하기 위한 개선이 필요하다고 생각합니다. 

WebPageTest 결과
- Compress Transfer, Cache statice content 가 F
- 경쟁사 대비 Start Render, FCP 차이가 많이 남

PageSpeed 결과
- FCP, TTI, LCP 차이가 많이 남
- PageSpeed 추천
  - 텍스트 압축 사용 (네트워크 바이트 최소화하려면 텍스트 기반 리소스를 압축(gzip)해야함)
  - 미사용 자바스크립트 줄이기
  - 캐시 정책 사용하여 정적 애셋 제공

결론
- 화면이 빨리 나오는 방향으로 개선을 해야 합니다. FCP 와 LCP 수치를 낮추는 개선이 필요하다고 생각합니다.
- 정적인 애셋 제공 : 캐시 사용
- 텍스트 압축 사용 : gzip 사용


![image](https://user-images.githubusercontent.com/10750614/159509571-295f5bfa-4cb8-476e-857f-26f9b95820a6.png)


3. 부하테스트 전제조건은 어느정도로 설정하셨나요

- 대상 시스템 범위
  - 접속 빈도 높은 페이지 : 메인 페이지
  - 데이터 갱신 페이지 : 로그인 -> 회원정보 변경 페이지
  - 데이터 조회시 여러 데이터 참조하는 페이지 : 경로 조회 페이지

경쟁사인 네이버와 카카오의 월 이용자수 평균은 1,060만명 입니다. 이보다 조금 더 많이 이용하는 것을 
목표로 해서 MAU 를 1,200만명으로 잡았습니다.
(참고: https://blog.naver.com/rkwkrhspm/222515422896)

- DAU : 1200만 / 30 = 400,000
- 1일 총 접속수 : 400,000 (DAU) * 2 (출퇴근에 한번씩 접속한다고 가정) = 800,000
- 1일 평균 RPS = 800,000 / 86,400 = 9.25
- 1일 최대 RPS = 9.25 * 10 (최대트래픽/평소트래픽) = 92.5

- Throughput : 9.25 ~ 92.5
- Latency : 75ms

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 메인페이지 : https://github.com/koola97620/infra-subway-monitoring/blob/step1/loadtest/main/mainResult.md 
- 데이터 갱신 페이지 : https://github.com/koola97620/infra-subway-monitoring/blob/step1/loadtest/update/updateResult.md
- 데이터 조회 페이지 : https://github.com/koola97620/infra-subway-monitoring/blob/step1/loadtest/path/pathResult.md




---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
