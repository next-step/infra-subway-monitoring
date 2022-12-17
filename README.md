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

#### 용어 정리
- FCP : 첫 번째 텍스트 또는 이미지가 표시되는 데 걸린 시간
- TTI : 사용자와 페이지가 상호 작용할 수 있게 된 시간
- SI : 페이지 콘텐츠가 얼마나 빨리 표시되는지에 대한 정보
- TBT : FCP 와 TTI 사이 모든 시간의 합으로 작업 지속 시간이 50ms를 초과하면 밀리초 단위로 표현
- LCP : 가장 큰 텍스트 또는 이미지가 표시된 시간
- CLS : 표시 영역 안에 보이는 요소들이 얼마나 이동하는지에 대한 정보

#### 경쟁사 분석 (PageSpeed Insights)
| mobile | 서울교통공사 | 네이버지도 | 카카오맵   | Running Map(https://yohan-subway.o-r.kr/) |
|--------|--------|-------|--------|-------------------------------------------|
| FCP    | 6.3s   | 2.2s  | 1.7s   | 14.9s                                     |
| TTI    | 8.3s   | 6.7s  | 4.5s   | 15.4s                                     |
| SI     | 8.6s   | 6.0s  | 6.0s   | 14.9s                                     |
| TBT    | 580ms  | 450ms | 90ms   | 460ms                                     |
| LCP    | 6.8s   | 7.2s  | 7.6s   | 15.4s                                     |
| CLS    | 0      | 0.03  | 0.005  | 0.041                                     |

| desktop | 서울교통공사 | 네이버지도 | 카카오맵  | Running Map(https://yohan-subway.o-r.kr/) |
|---------|--------|-------|-------|-------------------------------------------|
| FCP     | 1.7s   | 0.5s  | 0.5s  | 2.8s                                      |
| TTI     | 2.1s   | 1.1s  | 0.7s  | 2.8s                                      |
| SI      | 3.0s   | 2.1s  | 2.6s  | 2.8s                                      |
| TBT     | 110ms  | 0ms   | 0ms   | 30ms                                      |
| LCP     | 2.5s   | 1.5s  | 1.1s  | 2.8s                                      |
| CLS     | 0.014  | 0.006 | 0.039 | 0.04                                      |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

- 모바일의 경우 경쟁서와 속도 차이가 많이나는데 현격한 차이가 나는 부분을 우선적으로 줄이는게 좋아보입니다.
- 전체적으로 비슷한 수준이라면 경쟁사보다 더 줄이는 방향으로 가는것도 좋아보이지만 우선은 전체적으로 안정 범위내에 들어오는게 좋아보입니다
- 개선 우선 순위 
  - 미사용 자바스크립트 삭제
  - 텍스트 압축 
  - 렌더링 차단 리소스 제거
---
|     | mobile | desktop |
|-----|--------|---------|
| FCP | 10s    | 2s      |
| TTI | 10s    | 2s      |
| SI  | 10s    | 2s      |
| TBT | -      | -       |
| LCP | 10s    | 2s      |
| CLS | -      | 0.02    |


### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
   1) 목표 rps 구하기(http://www.bigdata-map.kr/datastory/traffic/seoul 데이터를 바탕으로함)
      a. 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
       - 약 1000만
      b. 피크 시간대의 집중률을 예상해봅니다. (최대 트개픽 / 평소 트래픽)
       - 2.5 (08~09, 18~19시 평소보다 약 2.5배 정도 증가)
      c. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
       - 약 50만명(이용객의 약 50% 정도는 앱을 미사용할것으로  예상되고 경쟁사의 앱사용  및 초기 서비스임을 고려)

    2) Throughput : 1일 평균 rps ~ 1일 최대 rps
      a. 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
       - 50만 * 2 = 100만
      b. 1일 평균 rps (1일 총 접속 수 / 86,400 (초/일))
       - 100만 / 86,400 = 12
      d. 1일 최대 rps (1일 평균 rps x (최대 트래픽 / 평소 트래픽))
       - 12 * 2.5 = 30

   3) VUser
      Request Rate: measured by the number of requests per second (RPS)
      VU: the number of virtual users
      R: the number of requests per VU iteration
      T: a value larger than the time needed to complete a VU iteration (R * http_req_duration) (+ 1s)

      - R : 2
      - http_req_duration: 0.1
      - T = 1.1( 2*0.1 + 1)
      - 평균 VUser = (12 * 1.1) / 2 = 7
      - 최대 VUser = (30 * 1.1) / 2 = 16

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
---

### 3단계 - 로깅, 모니터링

- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [ ] 로그 설정하기
    - [ ] Application Log 파일로 저장하기
        - [ ] 회원가입, 로그인 등의 이벤트에 로깅을 설정
        - [ ] 경로찾기 등의 이벤트 로그를 JSON으로 수집
    - [ ] Nginx Access Log 설정하기
- [ ] Cloudwatch로 모니터링
    - [ ] Cloudwatch로 로그 수집하기
    - [ ] Cloudwatch로 메트릭 수집하기
    - [ ] USE 방법론을 활용하기 용이하도록 대시보드 구성

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
