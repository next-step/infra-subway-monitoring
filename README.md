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

개인적으로 2초 안에 화면이 나오면 빠르다고 느끼고, 4 ~ 5초가 넘어가면 왜 이렇게 느리지 하고 느꼈던 것 같습니다.

아래는 https://developer.chrome.com/docs/lighthouse/performance/ 의 빠름의 마지노선입니다.
- FCP 1.8s
- SI 3.4s
- LCP 2.5s
- TBT 0.2s 

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.

|        | 서울교통공사 | 네이버지도 | 카카오맵 | Running Map |
|--------|----------|----------|----------|--------|
| FCP    | 2.162s   | 0.977s   | 1.329s   | 4.643s |
| SI     | 2.910s   | 2.406s   | 8.574s   | 4.620s |
| LCP    | 4.082s   | 2.887s   | 5.379s   | 4.683s |
| TBT    | 1.103s   | 0.014s   | 0.608s   | 0s     |
| TB     | 1377KB   | 772KB    | 4478KB   | 2493KB |

제일 성능이 좋은 네이버 지도를 기준으로 응답시간이 20% 차이일 때 인식하므로 + 18% 정도까지 허용하도록 했습니다. (18%의 기준은 아무 이유 없습니다. 20% 보다 적당하게 빠르고 싶었습니다.)

이렇게 경쟁사들과의 웹 성능에서 차이가 느껴지지 않아야 서비스의 품질로 경쟁할 수 있다고 생각했습니다.

LCP 의 경우는 위의 lighthouse performance 의 빠름을 기준을 초과했기에 lighthouse performance 의 빠름 기준으로 선정했습니다. 

- FCP: 1.153s
- SI: 2.839s
- LCP: 2.5s
- TBT: 0.017s
- TB: 910.96KB


- 서울교통공사 http://www.seoulmetro.co.kr/kr/cyberStation.do
- 네이버지도 https://m.map.naver.com/subway/subwayLine.naver?region=1000
- 카카오맵 https://map.kakao.com/?REGION=01&target=subway
- Running Map https://enfunha.kro.kr/

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
