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
자세한 내용은 [웹 성능 측정 결과지](/performance/22-08-25/performance.md)를 참고.  
요약: page-speed, desktop 기준으로 설정한다면, 
    
    | site       | Score | 기준  | AS-IS  | TO-BE       |
    |------------|-------|-----|--------|-------------|
    | 메인페이지 /    | > 80  | LCP | 2.8 s  | 1.7 s       |
    | 경로검색 /path | > 80  | TTI | 2.24 s | 0.7 ~ 1.0 s |

   - 사용자에게 컨텐츠가 빠르게 노출되는 게 중요할 때 : `LCP` ( 메인페이지 ) : 1.7 s
   - 사용자가 관련 링크를 빠르게 클릭하는 것이 중요할 때 : `TTI` (경로 찾는 페이지) :  0.7 s ~ 1 s

<br>

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 효율적인 캐시 정책 사용 → 정적인 애셋 제공
       - 페이지별 사용하는 js 만 로드되도록 수정
       - css 파일 별도 분리
       - 캐싱 가능한 정적파일 캐싱되도록. (이미지, css..)

   - 텍스트 압축 사용  
     총 네트워크 바이트를 최소화하려면 텍스트 기반 리소스를 압축(gzip, deflate, brotli)
       - [/js/vendors.js](https://mand2-infra-subway.kro.kr/js/vendors.js)
       - [/js/main.js](https://mand2-infra-subway.kro.kr/js/main.js)
       - [/images/logo_small.png](https://mand2-infra-subway.kro.kr/images/logo_small.png)

   - 사용하지 않는 자바스크립트 줄이기
       - [/js/vendors.js](https://mand2-infra-subway.kro.kr/js/vendors.js)
       - [/js/main.js](https://mand2-infra-subway.kro.kr/js/main.js)

   - 렌더링 차단 리소스 제거하기  
     페이지의 첫 페인트 차단(= 블록킹) 인 리소스 삭제  
       - [/css?family=Roboto:100,300,400,500,700,900](https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900)
       - […css/materialdesignicons.min.css](https://cdn.jsdelivr.net/npm/@mdi/font@5.0.45/css/materialdesignicons.min.css)

   - 웹폰트가 로드되는 동안 텍스트가 계속 표시되는지 확인하기  
     웹폰트가 로드되는 동안 사용자에게 텍스트가 표시되도록 글꼴 표시 CSS 기능을 사용

<br>

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

<br>

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요


<br>
