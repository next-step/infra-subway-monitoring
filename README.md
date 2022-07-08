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

### 경쟁사와 성능 비교

### Mobile

|                                                                     | FCP   | TTI   | Speed Index | TBT    | LCP   | CLS   | 성능  |
|---------------------------------------------------------------------|-------|-------|----------|--------|-------|-------|-----|
| [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)            | 6.6s  | 8.9s  | 11.1s    | 1,260ms | 6.8s  | 0     | 27  |
| [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | 2.2s  | 6.7s  | 5.5s     | 460ms  | 7.9   | 0.3   | 53  |
| [카카오맵](https://m.map.kakao.com)                                     | 1.7s  | 4.2s  | 6.4s     | 50ms   | 6.4s  | 0.005 | 69  |
| [RUNNING MAP](https://brick0123.o-r.kr)                             | 14.6s | 15.1s | 14.6s    | 470ms  | 15.1s | 0.041 | 34  |

### Desktop
|                                                                     | FCP  | TTI  | Speed Index | TBT  | LCP  | CLS   | 성능  |
|---------------------------------------------------------------------|------|------|------|------|------|-------|-----|
| [서울교통공사](http://www.seoulmetro.co.kr/kr/cyberStation.do)            | 1.5s | 2.0s | 4.0s | 40ms | 1.7s | 0     | 79  |
| [네이버지도](https://m.map.naver.com/subway/subwayLine.naver?region=1000) | 0.5s | 0.5s | 2.3s | 0ms  | 1.6s | 0.006 | 89  |
| [카카오맵](https://m.map.kakao.com)                                     | 0.5s | 0.7s | 2.1s | 0ms  | 1.3s | 0.039 | 93  |
| [RUNNING MAP](https://brick0123.o-r.kr)                             | 2.7s | 2.8s | 2.7s | 30ms | 2.8s | 0.004 | 68  |


**우선 순위**  
`RUNNING MAP`에서 가장 중요한 핵심 기능은 **지하철 경로 검색**라고 생각합니다.  
컨텐츠 노출, 경로 검색 기능을 빠르게 사용자에게 제공함으로써 서비스에 대한 고객 경험을 좋게 만드는 것이 목표입니다.    
따라서 우선 FCP, TTI, LCP 세 가지 지표를 비슷한 기능을 제공하는 경쟁사 네이버, 서교공 중 가장 좋은 지표를 기준으로 최대 20%의 값을 목표로 설정했습니다. 

**Timing based Metric**
- FCB
  - Mobile: 2.64s
  - Desktop: 0.6s
- TTI
  - Mobile: 8.04s
  - Desktop: 0.6s
- LCP: 
  - Mobile: 8.16s
  - Desktop: 1.92s


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- gzip등의 압축을 이용해서 네트워크상 전송하는 바이트를 최소화 합니다.
- 동적인 요청을 처리할 때 캐시를 활용해서 반복되는 DB IO 횟수를 줄입니다. ex) 지하철 노선 검색
- 실행 계획을 통해서 DB 인덱를 활용한 성능 개선이 가능한지 확인합니다.
- 효율적인 캐시 정책으로 정적 리소스를 제공합니다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

테스트 설정값 구하기.
- 예상 DAU: 3,000,000
- 피크 시간대 집중률: 5
- 1명당 평균 접속 수: 2

1일 사용자 수 = 3,000,000 * 2 = **6,000,000**  
1일 평균 rps = 6,000,000 / 86,400 = **69**  
1일 최대 rps = 69 * (345 / 69) = **345**

VUser 구하기
Latency = 100ms, R = 2 가정 
- T = (2 * 0.1) + 0 = **0.2**
- VUser
  - 평균: (69 * 0.2) / 2 = **7**
  - 최대: (463 * 0.2) / 2 = **35**

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

### Smoke
```k6/smoke.js```
![image](https://user-images.githubusercontent.com/61832162/177760052-f547254a-b90d-427b-8c12-6db7c3d1b5b2.png)
![image](https://user-images.githubusercontent.com/61832162/177760137-43e5a9d9-34c3-463e-9397-b332a1f3fcf1.png)

### Load
```k6/load.js```
![image](https://user-images.githubusercontent.com/61832162/177759275-c48f1f2d-2788-4bbb-ad52-4d0135cabdd4.png)
![image](https://user-images.githubusercontent.com/61832162/177759325-2e331ce0-1ebb-4cf5-b801-1d82009a52a3.png)

### Stree
```k6/stress.js```
![image](https://user-images.githubusercontent.com/61832162/177710576-66475b6b-fee5-43bd-8ca9-f7ba4299f557.png)
![image](https://user-images.githubusercontent.com/61832162/177710074-595d2dfa-ea0c-4ef9-93e9-f9581a18f407.png)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
