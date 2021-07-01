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

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기

### 도메인 변경 : yzzzzun.p-e.kr

1. 각 서버내 로깅 경로를 알려주세요
   - Nginx : /var/log/nginx
   - application log : ~/infra-subway-monitoring/log
2. Cloudwatch 대시보드 URL을 알려주세요
   - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-yzzzzun

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

   우선 경쟁사 서비스를 비교했습니다. 

   👉 네이버 지하철 노선도 : https://m.map.naver.com/subway/subwayLine.naver?region=1000

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 2.3s      |
   | Time to Interactive      | 7.1s      |
   | Speed Index              | 6.8s      |
   | Total Blocking Time      | 560ms     |
   | Largest Contentful Paint | 7.9s      |

   👉카카오 맵 : https://m.map.kakao.com/

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 2.5s      |
   | Time to Interactive      | 5.3s      |
   | Speed Index              | 6.7s      |
   | Total Blocking Time      | 140ms     |
   | Largest Contentful Paint | 6.8s      |

   👉 내 서비스 

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 15.3s     |
   | Time to Interactive      | 15.9s     |
   | Speed Index              | 15.3s     |
   | Total Blocking Time      | 540ms     |
   | Largest Contentful Paint | 15.9s     |

   📄 예산 설정 경쟁사 서비스를 비교하여 가장 좋은 성능을 나타내는 서비스를 기준으로 +20%내의 시간 지표로 설정했습니다.

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 3s        |
   | Time to Interactive      | 6s        |
   | Speed Index              | 8s        |
   | Total Blocking Time      | 168ms     |
   | Largest Contentful Paint | 8s        |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   /js/vendor.js 와 /js/main.js 의 전송 크기가 커서 네트워크 자원을 압축하는게 가장 중요한 해결 방법인것 같습니다. 그에 따라 nginx.conf 에 gzip설정을 추가하고 nginx reload하여 아래와 같은 결과를 얻을 수 있었습니다.

   | **항목**                 | **value** |
   | ------------------------ | --------- |
   | First Contentful Paint   | 6.5s      |
   | Time to Interactive      | 7.1s      |
   | Speed Index              | 7.2s      |
   | Total Blocking Time      | 540ms     |
   | Largest Contentful Paint | 7.1s      |

   추가적인 방법으로 캐시 설정과 불필요한 자원을 지연로딩 하는 방법들도 있을것 같습니다.

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

## 요구사항 정리

### Step1 - 로깅과 모니터링

- [x] Logback 설정
- [x] Application Log 파일로 저장하기
  - [x] 회원가입 로깅
  - [x] 로그인 로깅
  - [x] 최단거리 조회 등 이벤트 로깅
  - [x] Logback 설정
- [x] Nginx Access Log 설정
- [x] Cloudwatch로 모니터링
  - [x] Cloudwatch 로그 수집
  - [x] Cloudwatch 메트릭 수집
