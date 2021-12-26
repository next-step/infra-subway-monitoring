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
    - 서버: EC2-livedetuc 
     (외부IP:13.209.211.203, 내부IP:192.168.11.57)
    - 로깅 경로: `/home/ubuntu/app/log`
    

2. Cloudwatch 대시보드 URL을 알려주세요
    - ```https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-livedetuc```

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

```aidl
A. 예비 분석
  1. 가장 중요한 페이지 판단
    - 접속 빈도가 높은 기능 : 메인, 로그인
    - DB를 사용하는 기능 : 길 찾기

  2. 내 웹페이지 성능 지표 ( https://infra-subway-deploy.o-r.kr/)
    - 참고 툴: PageSpeed 

    - 성능 점수                  : 31
    - First Contentful Paint    : 14.7 s
    - Time to Interactive       : 15.4 s
    - Speed Index               : 14.7 s
    - Total Blocking Time       : 590 ms
    - Largest Contentful Paint  : 15.3 s   
    - Cumulative Layout Shift   : 0.0041
```

```aidl
B. 경쟁사 분석 
  - 참고 툴: PageSpeed (https://developers.google.com/speed/pagespeed/insights/)

  1. 카카오 맵 (https://m.map.kakao.com/)
    - 성능 점수                  : 65
    - First Contentful Paint    : 2.5 s
    - Time to Interactive       : 5.2 s
    - Speed Index               : 7.1 s
    - Total Blocking Time       : 100 ms
    - Largest Contentful Paint  : 7.1 s   
    - Cumulative Layout Shift   : 0.005
    
  2. 네이버 지도 (https://m.map.naver.com/)
    - 성능 점수                  : 56
    - First Contentful Paint    : 2.9 s
    - Time to Interactive       : 5.8 s
    - Speed Index               : 7.5 s
    - Total Blocking Time       : 280 ms
    - Largest Contentful Paint  : 6.9 s   
    - Cumulative Layout Shift   : 0.017
```

```aidl
C. 성능 기준 설정
  1. 메인 홈페이지 
    - 페이지 로드 3초 미만 (3초 미만)
    - TTI 5초 미만
    - 압축된 리소스 최대 크기 200KB 미만
```

<br/>
2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

- [x] 텍스트 압축 사용
- [x] 사용하지 않는 자바스크립트 줄이기
- [x] 렌더링 차단 리소스 제거하기


<br/>
3. 부하테스트 전제조건은 어느정도로 설정하셨나요

```
1.  대상 시스템 범위: application
```
```
2.  목표 rpc 구하기
 A) 1일 사용자 수 (DAU) : 1,000,000 (백만)
 B) 피크 시간대의 집중률  (최대 트개픽 / 평소 트래픽) : 3
 C) 1명당 1일 평균 접속 혹은 요청수 : 2
 D) Throughput: 23 ~ 69
  - 1일 총 접속수: 100만 * 2 = 200만
  - 1일 평균 rps: 200만 / 86400 = 23
  - 1일 최대 rps: 23 * 3 = 69

-------------------------------------------------------------
 A) 네이버 지도의 길 찾기만 하루 1억건 이라고 함.
소박하게 1% 사용자만 노려본다..
https://news.mt.co.kr/mtview.php?no=2021090916014079809

 B) 출퇴근 피크 시간대에 평소보다 3배 정도 더 트래픽이 있을 것으로 예상해본다.
```
```
3.  VUser 구하기
----------------------------------
T = (R * http_req_duration) (+ 1s)
VUser = (목표 rps * T) / R
----------------------------------
세개의 요청 (R=3) 이 있고 왕복 시간이 0.5s, 지연 시간이 0.3초라고 할 때
T = (3 * 0.5 s) + 0.3 s = 1.8 s
VUser_평균 = (23 * 1.8 s) / 3 = 14
VUser_최대 = (69 * 1.8 s) / 3 = 41
----------------------------------
```

```
4. 테스트 기간: 30분
```

<br/>
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

- 시나리오: `메인페이지 - 로그인 - 길찾기`

  A. Smoke (k6/smoke.js) 테스트 결과
```aidl

```

  B. Load (k6/load.js) 테스트 결과
```aidl

```

  C. Stress (k6/stress.js) 테스트 결과
```aidl

```

<br/>
5. 웹 페이지 개선 내역

[ 개선 전 ]
![img.png](src/main/resources/static/images/pagespeed-before.png)

[ 개선 후 - 텍스트(리소스) 압축 사용 ]
![img.png](src/main/resources/static/images/pagespeed-after-zip.png)

[ 개선 후 - 텍스트(리소스) 압축 사용 ]
![img.png](src/main/resources/static/images/pagespeed-after-zip.png)
