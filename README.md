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


### 1단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
[WebPageTest결과](https://www.webpagetest.org/result/220325_BiDc1R_8GW/3/performance_optimization/)
|항목|서울교통공사|카카오|네이버|지하철|
|------|:---:|:---:|:---:|:---:|
|**성능**|71|94|91|67
|**First Byte**|1.503S|1.208S|.803S|1.038S|
|**First View**|7.160s|5.619s|3.213s|7.256s|
|**First Contentful Paint**|3.784S|1.696S|2.165S|6.133S|
|**Speed Index**|4.446S|4.235S|6.050S|6.119S|
|**Largest Contentful Paint**|5.551S|3.270S|7.119S|6.298S|
|**Cumulative Layout Shift**|.001|.004|.037|.004|
|**Total Blocking Time**|1.071S|.000S|.006S|.000S|
|**Total Byte**|1,365KB|1,564KB|774KB|2,493KB|
|**Time To Interactive**|2.0S|0.6S|1.0S|2.8S|

- Light house 80점 이상 
- FCP 3초 이내 
- TTI 2초 이내 
- LCP 4초 이내 
- First View 3초 이내 


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
![](https://user-images.githubusercontent.com/63947424/160116301-fe38ddc5-114a-4c2c-8eba-28d5ae8e7314.png)
- gzip 압축 사용 (compressible text, target size = 497.4 KB)
- 정적 컨텐츠 캐싱 
- CDN 사용

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- (하루 지하철 사용자 수 4500000의 50%가 지하철 앱을 사용한다고 가정)
- 예상 1일 사용자 수 (DAU) : 4500000 * 0.5 = 2250000
- 피크시간대 집중률 (최대트래픽 / 최소트래픽) : 10으로 가정 
- 1일 요청 수 : 3 (카카오 지하철 일일 실행 횟수 참고)  
- Throughtput 
  - 1일 총 접속수 : 2250000 * 3 = 6750000
  - 1일 평균 rps : 6750000 / 86400 = 78.125 
  - 1일 최대 rps : 781.25
- Latency = 50ms
- 요청 수 (R) = 4
- T = (4 * 0.1) = 0.4s
- 평균 VUser = (78.125 * 0.4)/4 = 7.8125 -> 8
- 최대 VUser = (781.25 * 0.4)/4 = 78.125 -> 79

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요.

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160140870-4597f359-d9fb-4fb8-b3a2-7d5f59ee427e.png)

[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160140886-b2a8bf09-68ca-4a37-89a6-feb825667b70.png)

[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160143573-4869a1b5-9544-42f3-9b64-202f4055a792.png)



[**ngrinder 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/ngrinder/ngrinder.groovy)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160182035-1c7d80ff-19c2-4b2c-a793-3f1160b97ed6.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160182031-106cf0c9-7c9d-40d5-b9e1-434a4807d0aa.png)

![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160182029-88f3e7bb-1c35-478f-a13e-95aeb96fa7c6.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160182024-e881b09e-8c0d-4c46-9a8b-097fa2ca48bd.png)

![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160182017-df297ebc-3972-46df-b485-215d754e727f.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160181999-81f607bc-4fd3-4202-8cc6-275d11c837c7.png)



---



### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)



2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
