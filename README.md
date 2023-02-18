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

    경쟁사 대비 비교해봤습니다.
    |  | 서울교통공사 | [네이버지도](https://map.naver.com/v5/subway/1000/-/-/-?c=15,0,0,0,dh) | [카카오지도](https://map.kakao.com/?REGION=01&target=subway) | 지하철 노선도 서비스 | 목표 |
    | --- | --- | --- | --- | --- | --- |
    | FCP | 1.5 | 0.5 | 0.6 | 2.8 | 0.5 |
    | Time to Interactive | 2.0 | 7.0 | 3.7 | 2.8 | 2.0 |
    | Speed Index | 2.3 | 4.4 | 2.7 | 2.8 | 2.3 |
    | Total Blocking Time | 0.11 | 2.12 | 1.13 | 0.03 | 0.03 |
    | LCP | 2.6 | 6.8 | 2.1 | 2.8 | 2.1 |
    | Cumulative Layout Shift | 0.001 | 0.019 | 0.721 | 0.004 | 0.001 |
    
    우리 서비스가 웹으로 제공되는 것을 감안하여, 모두 동일한 데스크톱 환경의 데스크톱 페이지를 기준으로 측정하였습니다.
    
    타 서비스의 최고 기록을 기준으로 삼아 개선 해나가는 것을 목표로 하였습니다.
    
    <details>
    <summary>비교 이미지</summary>
    <div>
    
    ![image](https://user-images.githubusercontent.com/48702370/218080788-1afe8484-be8a-4438-852b-ee932a7343b9.png)
    ![image](https://user-images.githubusercontent.com/48702370/218080913-550a1834-c832-4f84-a929-15e1d7810a26.png)
    ![image](https://user-images.githubusercontent.com/48702370/218080936-24c612df-d976-4dd4-bc3c-de24795df950.png)
    ![image](https://user-images.githubusercontent.com/48702370/218080953-80e47fa0-9b7a-4781-b462-013cd2c8f18c.png)

    </div>
    </details>
    
    
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
    | API | 시간 |
    | --- | --- |
    | lines | 64.03 |
    | lines/{id} | 40.34 |
    | stations | 114.6 |
    | members | 69.75 |
    | members/{me} | 49.38 |
    | login/token | 109.59 |
    | favorites | 52.55 |
    | path | 52.4 |
    
    FCP가 0.5초인 서비스들을 감안하면, API의 응답속도를 100ms 이하로 유지하는 것이 좋을 것 같습니다.
    
    현재 stations는 db에 많은 데이터가 있지 않음에도 불구하고 응답속도가 느려 부하 테스트를 통해 개선 요소를 파악할 필요성이 있습니다.
---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요
    ### 전제 조건 정리
    역, 노선, 구관 관리와 같은 admin 기능들은 요청 소요가 많지 않다고 생각 했습니다.

    그래서 주로 사용될 경로검색과, 메인페이지를 부하 테스트의 대상으로 삼았습니다.

    > 메인 페이지 → 경로 검색 페이지 → 경로 탐색

    ### 목푯값 설정
   1. 하루평균 700만명의 이용객들이 서울 지하철을 사용합니다.
   2. 서울 지하철 시간대별 사용자 수를 기준으로 판단한 결과 가장 많은 승하차 인원이 발생하는 시간대(18-19시)는 평균보다 약 2.2배 가량의 사용자가 많습니다.
      1. 이에 따라 집중률을 예상해보면 평소 트래픽은 DAU의 6%, 최대 트래픽은 12%정도로 예상 됩니다.

         ![[https://blog.hyundai-rotem.co.kr/691](https://blog.hyundai-rotem.co.kr/691)](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/866f583f-aaa3-4aa2-987e-07917bfbc310/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230212T120104Z&X-Amz-Expires=86400&X-Amz-Signature=a55ba15dee4aa510833cdf393867e79206b132fa50f7ac8082a5bdaff7a3df4e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

         [https://blog.hyundai-rotem.co.kr/691](https://blog.hyundai-rotem.co.kr/691)

   3. 평균 접속수 : 2회 (출/퇴근)
   4. Throughput을 계산합니다.
      - DAU(700만) x 2 x 0.2 = 280만 (1일 총 접속 수)
      - DAU(700만) 중 타 경쟁사를 고려하여 20% 고객들이 우리 서비스를 이용하는 것을 목표로 합니다.
      - 280만(1일 총 접속 수) / 86,400 = 32.4074 (1일 평균 rps)
      - 32.4074(1일 평균 rps) x 2.2(최대 트래픽 / 평소 트래픽) = 71.296 (1일 최대 rps)
      - Throughput : 32.4074 ~ 71.296
      - Latency : 100ms
   5. VUser 구하기
      - Request Rate: 요청수 3회 (메인 → 경로 검색(페이지) → 검색)
      - T = (3 * 100ms) (+ 1s)  → 1.3s
      - 최대 VUser = 71.296 * 1.3 / 3 = 30.8950617284(31)
      - 평균 VUser =  32.4074 * 1.3 / 3 = 14.043206(14)

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - smoke : VUser 2, 100ms를 목표
     ![smoke_k6](img/smoke_k6.png)
     ![smoke_grafana](img/smoke_grafana.png)
   - load : VUser 14 ~ VUser 31
     ![load_k6](img/load_k6.png)
     ![load_grafana](img/load_grafana.png)
   - stress : 점진적으로 최대부하를 테스트(10, 40, 80, 160, 320)
     ![stress_k6](img/stress_k6.png)
     ![stress_k6](img/stress_k6.png)

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
    - Web Server 
        - /var/log/syslog
        - /var/log/nginx/access.log
        - /var/log/nginx/error.log

    - WAS
        - /var/log/syslog
        - /home/ubuntu/infra-subway-monitoring/build/libs/log/file.log
        - /home/ubuntu/infra-subway-monitoring/build/libs/log/json.log
        
2. Cloudwatch 대시보드 URL을 알려주세요
    - https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=icchoi-cloudwatch;start=PT1H
