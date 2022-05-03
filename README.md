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
Page Speed를 통해 경쟁사(카카오 맵, 네이버 맵, 서울교통공사)와 비교

| 항목 | 지하철노선도 | 카카오 맵 | 네이버 맵 | 서울교통공사 | 목표 |  
| ------------------- | ----------- | -------- | --------- | ------------ | --- |  
| First Content Paint | 2.8s | 0.5s | 0.5s | 1.6s | 0.5s |  
| Time To Interactive | 2.9s | 2.2s | 1.3s | 1.0s | 1.0s |  
| Speed Index | 2.8s | 2.8s | 2.2s | 4.2s | 2.2s |  
| Largest Content Paint | 2.9s | 1.1s | 1.7s | 3.5s | 1.1s |  

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요  
 - 텍스트 압축을 위한 웹서버에 gzip 적용 
 - 사용하지 않는 자바스크립트 제거
 - Lazy 로딩을 위한 코드 스플리팅
 - html,css,image와 같은 정적 파일 요청에 cache-control 설정
 - 변화되지 않은 데이터 캐싱 솔루션을 사용하여 was 서버 메모리에서 관리


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요  
 - 대상 시스템 범위 
   - Web Server, Web Application Server, DB Server  
 - 목표값 설정  
   - 1일 사용자 수(DAU) : 1000만(네이버 지도, T맵 참고)  
   - 1명당 1일 평균수 : 출퇴근(2) x 지하철 역 목록 조회 + 경로검색(2) = 4  
   - 1일 총 접속 수 : 1000만 x 4 = 4000만  
   - 1일 평균 rps : 4000만 / 86400 = 약 463 rps  
   - 1일 최대 rps : 1일 평균 rps x (최대 트래픽 / 평균 트래픽) = 463 rps x 5(최대 트래픽을 5배로 봄) = 2315 rps  
 - 부하 테스트 시 저장될 데이터 건수 및 크기  
   - 부하 테스트 시 저장할 데이터가 존재하지 않음  
 
2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
 - 접속빈도가 높은 페이지(로그인 api, 내 정보 조회 api)
  - smoke
  - load
  - stress

 - 데이터를 갱신하는 페이지(내 정보 수정 api) 
  - smoke
  - load
  - stress

 - 데이터를 조회하는 여러 데이터를 참조하는 페이지(경로 검색 api)
  - smoke
  - load
  - stress

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
