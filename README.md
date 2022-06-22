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
아래 측정한 결과를 바탕으로 생각하였습니다.

#### 모바일
| 사이트 | First Contentful Paint | Time to Interactive | Speed Index | Total Blocking Time | Largest Contentful Paint | Cumulative Layout Shift pagespeed | score |
| --- | --- | --- | --- | --- | --- | --- | --- |
| my | 14.6 초 | 15.2 초 | 14.6 초 | 470 밀리초 | 15.2 초 | 0.042 | 34 |
| 서교공 | 6.6 초 | 9.5 초 | 11.0 초 | 2,080 밀리초 | 7.1 초 | 0 | 22 |
| 네이버지도 | 2.3 초 | 6.5 초 | 6.2 초 | 420 밀리초 | 7.9 초 | 0.03 | 53 |
| 카카오 | 1.7 초 | 4.2 초	 | 7.2 초 | 50 밀리초 | 6.4 초 | 0.005 | 68 |

#### 데스크톱
| 사이트 | First Contentful Paint | Time to Interactive | Speed Index | Total Blocking Time | Largest Contentful Paint | Cumulative Layout Shift pagespeed | score |
| --- | --- | --- | --- | --- | --- | --- | --- |
| my |	2.6 초 |	2.7 초 |	2.6 초 |	40 밀리초 | 2.7 초 | 0.004 | 68 |
| 서교공 |	2.0 초 |	2.0 초 |	4.2 초 |	0 밀리초 |	3.7 초 |	0.016 |	64 |
| 네이버지도 |	0.5 초 |	1.2 초 |	2.0 초 |	0 밀리초 |	1.7 초 |	0.006 |	90 |
| 카카오 |	0.5 초 |	0.7 초 |	2.2 초 |	0 밀리초 |	1.0 초 |	0.039 |	94 |


* 개선이 필요한 주요 항목
  * 모든 수치에 집중하기 보다는 중요한 2가지 수치 개선에 집중합니다.
  * FCP, TTI - 데이터 수신, 로딩 등에 걸리는 시간 수치이고 사용자가 가장 민감하게 반응하는 지표라 판단
  * 서울교통공사의 수치는 다른 타사(네이버, 카카오)에 비해 눈에 띄게 score가 낮기 때문에 제외하였습니다.
  * min(네이버, 카카오)을 이하로 목표
* 개선 사항
  * FCP
    * 모바일 - 14.6초 → 1.7초  
    * 데스크톱 - 2.6초 → 0.5초
  * TTI
    * 모바일 - 15.2초 → 4.2초
    * 데스크톱 - 2.7초 → 0.7초
    
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
* 데이터 용량 개선
  * text gzip 압축
  * 불필요하게 큰 이미지 용량 개선
* 데이터 속도 개선
  * 정적 리소스 캐시
  * 이미지 캐시

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
