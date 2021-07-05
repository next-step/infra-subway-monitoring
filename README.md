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

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요  
    dohchoi91-EC2-monitor(3.34.50.208) : infra-subway-monitoring 배포서버
    - application 로그 : /home/ubuntu/infra-subway-monitoring/log  
    - Nginx 로그 : /var/log/nginx/*  
    - 시스템 로그 : /var/log/syslog  
    
2. Cloudwatch 대시보드 URL을 알려주세요  
https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-dohchoi91
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
    - PageSpeed Insights : `총점 75`이상(데스크톱 기준)
    - First Contentful Paint : `2.5초` 미만
    - Speed Index : `4초` 미만
    - Largest Contentful Paint : `3초` 미만
    - Cumulative Layout Shift : `0.005` 미만
    - Total Blocking Time : `0.3` 미만
    - First Byte Time grade : `A`(400ms 이하)
    - Keep-alive Enabled grade : `A`(Fail 10개 이하) 
    - Compress Transfer grade : `A` (potential savings : 60KB 이하)
    - Compress Images grade : `B` (potential savings : 400KB 이하)
    - Cache static content greade : `A`
    - Effective use of CDN : `Y`
    
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요  
    `First Contentful Paint`, `Speed Index`, `Largest Contentful Paint`  
    `Compress Transfer grade`, `Effective use of CDN`  
    **⇒ 자바스크립트 지연 로딩, 이미지 용량 압축, gzip을 이용한 텍스트 압축 사용, 정적 리소스 캐싱, CDN 사용 등을 통해 개선**
    
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 대상 시스템 범위
        Nginx 1대 + WAS 1대 + DB 1대 (프로젝트 구축된 범위)
    - 목푯값 설정
        목표값을 설정하기 위해 RunningMap Service와 유사한 지하철종결자(어플리케이션)을 참고했습니다.  
        그리고 지하철종결자(어플리케이션)의 DAU에 10%인 90,000을 목표로 설정하였습니다.  
        https://platum.kr/archives/61943  
        - DAU 설정(예상 1일 사용자 수): 90,000건
        - 피크시간대 집중율(=최대트래픽 / 평소트래픽) : 4(예상치)
        - 1명당 1일 평균 접속 수 : 3건(이동, 복귀, 기타로 가정)
        - 1일 총 접속 수 : 270,000건
        - 1일 평균 rps = 3.125 (= 270,000 / 86,400)
        - 1일 최대 rps = 12.5(= 3.125 * 4)
          
        **`throughput` : 3.125 ~ 12.5rps**  
        **`latency` : 50 ~ 100ms 이하**  
        **`부하 유지기간` : 3h (출,퇴근 시간대를 가정)**  	
    - 부하 테스트 시 저장될 데이터 건수 및 크기  
      **1건, 0.5kb(경로 조회 기록을 저장을 가정)**

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요  
    ```text
    시나리오 : 메인 → 로그인 → 내 정보 조회 → 내 정보 수정 → 경로조회
    script 및 수행 결과는 script 디렉토리 참조 부탁드립니다.
    ```
