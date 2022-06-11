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
     
     * AS-IS
     
       * https://subway.kangseonghyo.kro.kr 
       
           | Desktop  | Lighthouse 성능    | FCP(s) | TTI(s) |
           | :------- | ------------------| ---------- | ----------- |
           | 메인     | 67                 | 2.7        | 2.8         |
           | 역관리   | 30                 | 3.0        | 5.1         |
           | 노선관리 | 57                  | 2.9        | 3.2         |
           | 구간관리 | 65                  | 3.0        | 3.2         |
           | 경로검색 | 65                  | 1.6        | 2.0         | 
    
       * 타사 메인페이지(전체 노선) 기준 
         
           | Desktop  | Lighthouse 성능    | FCP(s) | TTI(s) | 스크립트 최대 크기 | 스크립트 개수 |
           | :-------   | ----------------| ----------  | ----------- | ------------    | ----------  |
           | 네이버맵    | 90               | 0.5        | 0.7         | 87KB            | 13          |  
           | 서울교통공사 | 70               | 1.6        | 2.0         | 100KB           | 8           |  
        
     
     * 성능예산 작성 
        - 목표 
            - 빠른 컨텐츠 노출(+렌더링)을 위한 페이지로드 시간 최소화
        - 성능
            - Lighthouse Performance 80점 이상 달성 (타사 +- 15% 유지)
        - 시간
            - Cable 기준 FCP 1초 , TTI 1초 미만
        - 규칙
            - 스크립트 크기 최대 100KB 이하 설정
            - 스크립트 3개 이하로 유지
            - CSS 최대 크기 100KB 이하로 유지
            - 경로 검색 API 응답 250ms 이하로 유지


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

    - 크기가 큰 스크립트 사용하지 않는 내용 제거 및 리소스 압축 필요 (페이지로딩속도 개선)
        - /js/vendors.js(2,125KB) , /js/main.js(172KB)
        - CloudFront 를 활용하여 정적파일 CDN 캐시 활용
    - 불필요 Font css 제거 

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요 
    * 대상시스템 범위
         - [Reverse Proxy -> Service(Pod) -> DataBase(Pod)]
    
    * 목표
        - Throughput : 28 ~ 140
          - 예상 DAU : 500,000 (타사 평균 DAU 1,000,000)
          - 예상 1명당 평균 접속수/1일 총 접속수 : 5회 / 2,500,000
          - 예상 1일 평균 RPS : 28 RPS  
          - 예상 1일 최대 RPS : 140 RPS
        - 데이터수 (data-subway 이미지 사용) 
          - 지하철 노선 24개
          - 지하철역 617개
          - 구간 341개
          - 즐겨찾기 10개
    
    * 각 테스트 조건 (외부망 -> https://subway.kangseonghyo.kro.kr)
        - Smoke
          - VUser : 1
          - Http_req_duration
             - p(99) : ~ 100ms 
            
        - Load
          - VUser(min/max) : 14 / 70
             - T(2.5) = R(5) * http_req_duration(0.5)  
          - 부하유지기간 : 30m
          - Http_req_duration
            - p(95) : ~ 100ms   
            - p(99) : ~ 500ms   
    
    * 테스트 시나리오
        1. 메인페이지에 접속한다.
        2. 로그인 한다. (엑세스토큰 발급)
        3. 즐겨찾기를 조회한다.
        4. 경로검색으로 이동한다.
        5. 경로를 검색한다.

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
    * 결과
        - Load 테스트 
            - 평균 RPS : 1.42K, 최대 RPS : 1.74K
            - 평균 Reqest Duration : 10ms , 최대 Reqest Duration : 700ms 
            - 에러 : 0
        - Stress 테스트(~ max VUser 300)  
            - VUser 260부터 오류 발생
            - Service EC2 인스턴스 CPU : 최대 52.3%
    * 상세 ( 스크립트 / 그라파나&K6 결과 이미지) 
        - [이동](/result)


---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
