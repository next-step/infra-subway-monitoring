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

<img width="990" alt="image" src="https://user-images.githubusercontent.com/81945553/176166113-00bdbb18-a392-428d-b4bb-55b3c648b861.png">

- FCP(First Contentful Paint) : 웹 서버에 첫 바이트가 도착한 이후에 정적 리소스가 표시되는 시점 
- TTI(Time to Interactive) : 페이지가 상호 작용 가능하게 되는 시점 
- SI(Speed Index) : 스크롤 없이 볼 수 있는 페이지가 완성되는 시점
- TBT(Total Blocking Time) : 메인 쓰레드가 응답하지 못하는 시간 
- LCP(Largest Contentful Paint) : 페이지의 메인 콘텐츠가 화면에 모두 렌더링되는 시간 

> 현재 애플리케이션은 링크를 빠르게 클릭하는 것보다 사용자에게 콘텐츠를 빠르게 노출하는 것이 중요하다. 경쟁사 대비 TTI 가 가장 개선해야할 부분이며, 전반적으로 전체 웹 성능이 떨어진다. 



2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
TTI는 대부분의 페이지 속도 테스트를 기반하므로 FCP와 FMP를 최적화 하는 등의 작업이 필요하다. 

- TTI는 모바일 환경에서 7초 미만이어야하며, 데스크탑에선 2초 미만이어야 한다. 
- FCP는 모바일 환경에서 5초 미만이어야하며, 데스크탑에선 1.5초 미만이어야 한다. 
- 모든 이미지는 2MB 미만의 이미지가 되어야한다. 
- 모든 자바 스크립트의 크기를 1MB 미만으로 만들어야 한다.


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
