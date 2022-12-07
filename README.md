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

## 웹 주소
- https://cwjonhpark-subway-px.o-r.kr/

### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 외부 자바스크립트 소스 파일은 1mb를 넘지 않아야 한다.
- 외부 자바스크립트 소스 파일 네트워크 시간은 100ms 미만이어야 한다.
- 3G 환경에서 FCP는 10초 미만이어야 한다.
- 웹브라우저 main thread 의 자바스크립트 소스 evaluation 시간은 1초 미만이어야 한다.
- TBT는 1초 미만이어야 한다.
- Lighthouse 의 Performance 점수가 90점 이상이어야 한다.

### 경쟁사 분석

|                 | FCP   | TTI   | SI    | TBT   | LCP   | CLS   |
|-----------------|-------|-------|-------|-------|-------|-------|
| **Running Map** | 13.8s | 14.9s | 14.4s | 410ms | 13.8s | 0.041 |
| 서울교통공사          | 8.7s  | 8.7s  | 33 s  | 0ms   | 9.1s  | 0     |
| 네이버 지도          | 2.2s  | 5.2s  | 3.0s  | 90ms  | 4.2s  | 0.005 |
| 카카오 지도          | 1.8s  | 7.7s  | 6.1s  | 40ms  | 5.5s  | 0.005 |


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요. 
- AS-IS: 15 s
- TO-BE: 1 s

### 서버 목표 응답시간 가설 근거
- 구글 폰트를 외부 CDN 이 아닌 자사의 정적 리소스 서버를 사용하여 1s 단축
- 자바스크립트 소스 파일을 gzip 으로 압축하여 클라이언트 단에 전송하여 10s 단축
- 사용하지 않는 자바스크립트 소스 코드를 제거하여 3s 단축
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
