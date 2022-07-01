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
https://hyunhyunsubway.o-r.kr/

* 경쟁사
  [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)
  [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000)
  [카카오맵](https://m.map.kakao.com/)

* Desktop

| 사이트       | lighthouse 성능 점수 | Speed Index | First Contentful Paint | Time to Interactive | Largest Contentful Paint |
|-------------|------------------|-------------|------------------------|---------------------|---------------------|
| 서울교통공사  | 75               | 11.8s       | 1.8s                   | 1.8s                |  2.0s                     | 
| 네이버지도   | 90               | 2.5s        | 0.5s                   | 0.7s                | 1.4s                     |
| 카카오맵    | 97               | 1.4s        | 0.4s                   | 0.6s                |  1.0s                     |
| __subway__  | 71               | 2.6s        | 2.4s                   | 2.6s                | 2.5s                     | 

* Mobile

| 사이트       | lighthouse 성능 점수 | Speed Index | First Contentful Paint | Time to Interactive | Largest Contentful Paint |
|-------------|----------|-------------|------------------------|---------------------|--------------------------|
| 서울교통공사  | 52         | 5.2s        | 5.2s                   | 8.0s                | 5.4s                     | 
| 네이버지도   | 62         | 42.2s       | 2.4s                   | 5.0s                | 6.3s                     |
| 카카오맵    | 78         | 4.2s        | 1.7s                   | 4.0s                | 5.0s                     |
| __subway__  | 42         | 13.7s       | 13.7s                  | 14.6s               | 13.8s                    |

#### 경쟁사 비교 시간 기준
##### Desktop 목표 성능
*경쟁사 2등 지표의 120% 미만으로 목표*
* lighthouse 성능 점수 : 80점 이상
* Speed Index 3.6s 미만
* First Contentful Paint 0.6s 미만
* Time to Interactive 1s 미만
* Largest Contentful Paint 1.7s 미만

##### Mobile 목표 성능
*경쟁사 2등 지표의 120% 미만으로 목표*
* lighthouse 성능 점수 : 80점 이상
* Speed Index 6.24s 미만
* First Contentful Paint 3.5s 미만
* Time to Interactive 6s 미만 
* Largest Contentful Paint 6.5s 미만

* 규칙
* 압축된 리소스 최대 크기 200KB 미만

```
* gzip 압축으로 first contentful paint 시간 감소
* js/css 지연 로딩하여 랜더링 차단 리소스 제거로 speed index 감소, 불필요 js제거
* largest contentful paint감소 : 최대 페인트 이미지를 미리 로드 또는 압축
```

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
