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

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
