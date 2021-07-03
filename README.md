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
  - jhh992000-ec2-public-web1 : webapp1(컨테이너) + nginx
      * TLS 접속 주소 : https://jhh992000.ddns.net
    * PUBLIC IP : 3.37.36.221
    * PRIVATE IP : 192.168.100.109
    * NGINX 로그 경로 (access) : /var/log/nginx/access.log
    * NGINX 로그 경로 (error) : /var/log/nginx/error.log
    * WEBAPP1 로그 경로 (info) : /data/logs/infra-subway/subway.log
    * WEBAPP1 로그 경로 (error) : /data/logs/infra-subway/subway-error.log
      
  - jhh992000-ec2-public-web2 : webapp2(컨테이너)
    * PUBLIC IP : 3.35.220.241
    * PRIVATE IP : 192.168.100.157
    * WEBAPP2 로그 경로 (info) : /data/logs/infra-subway/subway.log
    * WEBAPP2 로그 경로 (error) : /data/logs/infra-subway/subway-error.log

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-jhh992000

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

    - 웹 성능 예산
        ```
        우선 경쟁사의 성능을 조사한 후 경쟁사 성능 측정 결과 대비,
        우리의 서비스가 20% 이상(체감가능한)의 성능이 나오는 것이 가장 좋을 것 같습니다.
        경쟁사보다 나은 성능이 나오기 어렵다면 최소한 비슷한 성능(+- 5%차이 이내)이라도 나와야 할것 같습니다.
        
        성능 측정 대상
        - 첫페이지(main)
        
        성능 예산 목표치 (PageSpeed 측정 기준)
        - First Contentful Paint : 3초 미만
        - Time to Interactive : 6초 미만
        - Speed Index : 7초 미만
        - Total Blocking Time : 200 (ms) 미만
        - Largest Contentful Paint : 7초 미만
        - Cumulative Layout Shift : 0.02 미만
        ```

    - 웹 성능 측정

        - 측정에 사용된 도구 : [WebPageTest](https://www.webpagetest.org/)
        - 측정시 설정값
            - 테스트 위치 : Seoul - EC2
            - 브라우저 : Chrome
            - 그외 추가 Advanced Settings : 모바일 LTE 환경

          |지표 구분|지하철 노선도|N사 지도|K사 지도|
          |:---|:---:|:---:|:---:|
          |First Byte Time|A|A|A|
          |Keep-Alive Enabled|A|A|A|
          |Compress Transfer|F|F|A|
          |Compress Image|A|A|A|
          |Cache Static Content|C|B|F|

        * 측정에 사용된 도구 : [PageSpeed](https://developers.google.com/speed/pagespeed/insights/)

          |지표 구분|지하철 노선도|N사 지도|K사 지도|
          |:---|---:|---:|---:|
          |총점|32 점|67 점|70 점|
          |First Contentful Paint|14.8 s|2.9 s|1.7 s|
          |Time to Interactive|15.8 s|6.5 s|4.4 s|
          |Speed Index|14.8 s|7.7 s|6.5 s|
          |Total Blocking Time|960 ms|190 ms|110 ms|
          |Largest Contentful Paint|15.9 s|7.2 s|6.4 s|
          |Cumulative Layout Shift|0.04|0.017|0.005|

        * 측정에 사용된 도구 : [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=ko)

          |지표 구분|지하철 노선도|N사 지도 |K사 지도|
          |:---|---:|---:|---:|
          |총점|24 점|69 점|69 점|
          |First Contentful Paint|13.8 s|2.2 s|1.7 s|
          |Time to Interactive|5.0 s|5.1 s|5.2 s|
          |Speed Index|13.8 s|4.3 s|4.6 s|
          |Total Blocking Time|410 ms|50 ms|50 ms|
          |Largest Contentful Paint|14.0 s|6.9 s|6.3 s|
          |Cumulative Layout Shift|0.04|0.017|0.005|


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

    ```
    - 텍스트 압축 사용 (nginx gzip 압축 적용)
    - 캐시 설정 (nginx cache 적용)
    - 렌더링 차단 리소스 제거하기 (css body로 이동, js async 적용)
    - 사용하지 않는 자바스크립트 줄이기

    (위 3가지 적용후 측정한 테스트 값)
        - First Contentful Paint : 14.8 -> 2.5
        - Time to Interactive : 15.8 -> 5.5
        - Speed Index : 14.8 -> 5.6
        - Total Blocking Time : 960 -> 710
        - Largest Contentful Paint : 15.9 -> 5.6
    ```
   
3. 부하테스트 전제조건은 어느정도로 설정하셨나요

    ```
    - 1일 사용자 수(DAU) 예상
        - 예상 DAU : 50,000
        - 경쟁사의 MAU가 500만 일때 DAU는 약 167,000 (월 5,000,000 / 30일 = 약 16.7만)
        - 우리의 서비스는 현실상 경쟁사에 비해 메리트가 많이 떨어진다고 판단하여 1/4 수준으로 잡음
    - 피크 시간대의 집중률 예상
        - 5만명의 인원이 출근시 모두 접속한다고 가정했을때
        - 1명당 5번의 요청이 발생할것으로 예상
            - 메인페이지 -> 로그인페이지 -> 로그인시도 -> 즐겨찾기 -> 경로검색 (5페이지 경유) 
        - 최대 트래픽 : 50,000 x 5 = 250,000
        - 평소 트래픽 : 평소에는 DAU의 1/10 인원이 서비스에 접속한다고 가정할 때 (50,000 / 10) * 5 = 25,000
        - 집중률 (최대트래픽/평소트래픽): 250,000 / 25,000 = 10
    - 1명당 1일 평균 접속 혹은 요청수 예상
        - 출근시 접속 : 1
        - 퇴근시 접속 : 1
        - 기타 (외근등) : 1
        - 1명당 1일 3회의 접속이 예상되고 접속시마다 5회의 요청이 발생할것으로 예상됨
            - 메인페이지 -> 로그인페이지 -> 로그인시도 -> 즐겨찾기 -> 경로검색 (5페이지 경유)
        - 1명당 1일 요청수 예상 : 3 x 5 = 15
    - Throughput 산출
        - 1일 총 접속수 : 50,000 x 3 = 150,000
            - 공식 : 1일 사용자 수 (DAU) x 1명당 1일 평균 접속수 = 1일 총 접속수 
        - 1일 평균 RPS : 150,000 / 86,400 = 1.7
            - 공식 : 1일 총 접속수 / 86,400 (초/일)
        - 1일 최대 rps : 1.7 x (250,000 / 25,000) = 17
            - 공식 : 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps
     ```
    - 목푯값 설정
   ```
    - 1일 총 접속수 : 150,000
    - 1일 평균 RPS : 1.7
    - 1일 최대 RPS : 17
   ```
   
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
