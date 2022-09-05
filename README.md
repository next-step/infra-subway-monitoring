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
   - ✅ 타 서비스 분석 및 비교 (https://pagespeed.web.dev/)
       - 휴대전화

         | Web             | FCP    | TTI   | Speed Index | TBT       | LCP  | CLS     | Total Score |
         |-----------------|------|------|-------|------|------|-------|-------------|
         | 서울교통공사         | 6.7s   | 10.5s | 10.7s     | 2,910ms   | 7.0s  | 0      | 21          |
         | 카카오맵            | 1.7s   | 4.3s | 5.7s       | 110ms     | 6.2s  | 0.139  | 67          |
         | 네이버 지도          | 2.4s   | 6.6s | 5.4s       | 570ms     | 8.2s  | 0.03   | 50          |
         | 타 서비스 평균값      | 3.6s   | 7.13s | 7.27s     | 1196.67ms | 7.1s  | 0.0563 | 46          |
         | Running Map 현재상태 | 14.5s | 15.1s | 14.5s     | 490ms     | 15.1s | 0.042  | 33          |
         | Running Map 예산설정((타 서비스 평균값 * 20%) + 타 서비스 평균값) | 4.32s | 8.56s | 8.72s     | 1436ms    | 8.52s | 0.07   |             |
       - 데스크톱

         | Web             | FCP    | TTI   | Speed Index | TBT       | LCP  | CLS     | Total Score |
         |-----------------|------|------|-------|------|------|-------|-------------|
         | 서울교통공사         | 2.0s   | 2.1s  | 3.2s     | 20ms    | 3.7s  | 0.015      | 65          |
         | 카카오맵            | 0.5s   | 0.7s  | 2.3s     | 0ms     | 1.5s  | 0.04       | 90          |
         | 네이버 지도          | 0.5s  | 1.1s  | 2.5s      | 0ms     | 1.7s  | 0.006     | 88          |
         | 타 서비스 평균값      | 1s    | 1.3s  | 2.7s      | 6.67ms  | 2.3s  | 0.020     | 81          |
         | Running Map 현재상태 | 2.8s | 2.9s  | 2.8s      | 70ms     | 2.9s | 0.004      | 66          |
         | Running Map 예산설정((타 서비스 평균값 * 20%) + 타 서비스 평균값) | 1.2s | 1.56s | 3.24s     | 8ms      | 2.76s | 0.02      |             |
     
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - ✅ pagespeed에 나온 추천과 진단을 참고해서 작성했습니다.
       - 휴대전화
           - 텍스트 압축 사용
           - 사용하지 않는 자바스크립트 줄이기
           - 렌더링 차단 리소스 제거하기
           - 콘텐츠가 포함된 최대 페인트 이미지 미리 로드
           - 사용하지 않는 CSS줄이기
       - 데스크톱
           - 텍스트 압축 사용
           - 사용하지 않는 자바스크립트 줄이기
           - 렌더링 차단 리소스 제거하기


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
