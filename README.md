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
# 성능 결과
### 서울 교통 공사
* 휴대폰 성능: 44 / 데스크톱 성능: 64  

  |항목| 휴대폰(초) | 데스크톱(초) |
  |-------:|--------:|----:|
  | FCP|    6.4 |   1.5 |
  | TTI|    8.4 |     2 |
  | SI |      8 |     2 |
  | TBT| 460 ms | 50 ms |
  | LCP|    6.6 |    3.7 |

### 네이버 지하철
* 휴대폰 성능: 58 / 데스크톱 성능: 90

  |항목| 휴대폰(초) | 데스크톱(초) |
  |-------:|--------:|----:|
  | FCP|    2.4 |  0.5 |
  | TTI|    6.6 |  0.5 |
  | SI |    6.3 |  2.3 |
  | TBT| 450 ms |    0 |
  | LCP|    8.4 |   1.6 |

### 카카오맵
* 휴대폰 성능: 75 / 데스크톱 성능: 93

  |항목| 휴대폰(초) | 데스크톱(초) |
  |-------:|--------:|----:|
  | FCP|    1.7 |     0.5 |
  | TTI|    4.2 |     0.6 |
  | SI |      6 |     2.2 |
  | TBT|  50 ms |       0 |
  | LCP|      5 |     1.1 |

### 지하철 노선도
* 휴대폰 성능: 34 / 데스크톱 성능: 69

  |항목| 휴대폰(초) | 데스크톱(초) |
  |-------:|--------:|----:|
  | FCP|   14.7 |   2.6 |
  | TTI|   15.3 |   2.7 |
  | SI |   14.7 |   2.6 |
  | TBT| 500 ms | 40 ms |
  | LCP|   15.3 |    2.7 |

# 웹 성능예산
### 정량
* 텍스트 압축 사용
* 사용하지 않는 JS 줄이기
* 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기

### 시간
* First Contentful Paint: 휴대폰 3 초 / 데스크톱 1 초
* Largest Contentful Paint: 휴대폰 7 초 / 데스크톱 1.5 초
* Speed Index: 휴대폰 7초 / 데스크톱 2.5 초

### 규칙
* 휴대폰 성능: 80 / 데스크톱 성능: 80

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

지하철 노선도는 휴대폰 성능과 데스크톱 성능을 일정 수준 이상 관리해야 한다고 생각했습니다.  
이유는 작은 규모의 서비스일수록 사용자 접근 시 복잡도와 진입장벽이 낮아야한다고 생각했으며,  
이 과정에서 성능이 한쪽에 치우쳐 극단적인 경험을 주는 것보다 두 환경 모두 고른 경험을 주는 것이 좋을 것이라 생각했습니다.   

성능예산 산정 기준은 웹하고 모바일의 접근성이 높은 `네이버 지하철`과 `카카오맵`을 중심으로 산정했습니다.  

시간 기반 지표 우선순위: FCP, LCP, SI

사용자의 접근성이 높은 페이지는 `메인 페이지`, `경로 검색`, `즐겨찾기` 라고 판단했습니다.  
현재 사용자의 서비스 이용 목적은 지하철 최단 경로 확인을 위한 목적이 크다고 생각했고, 해당 기능 중심으로 요구사항이 추가 될 것이라 생각했습니다.  
이를 위해 컨텐츠가 빠르게 노출되고 렌더링되는 것이 중요하다고 생각했습니다.  

시간 기반 지표의 목표 산정은 `네이버 지하철`과 `카카오맵` 의 평균치보다 조금 여유있게 산정했습니다.  
아직 성능 개선 경험이 없는 것과 개선 후 달라진 수치를 비교하며 점진적으로 접근해 볼 필요성이 있다고 생각했습니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
