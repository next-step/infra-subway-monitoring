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

[**WebPageTest결과**](https://www.webpagetest.org/result/220325_BiDc1R_8GW/3/performance_optimization/)

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

- Light house : (71+94+91)/3 = 85.33 -> 85점 이상 
- FCP : (3.784+1.696+2.165)/3 = 2.548 -> 3.05초 이내 (평균값과 20% 차이 이내)
- SI : (4.446+4.235+6.050)/3 = 4.91 -> 5.892초 이내 (평균값과 20% 차이 이내)
- TTI : (2.0+0.6+1.0)/3 = 1.2 -> 1.44초 이내 (평균값과 20% 차이 이내)
- First View : (7.160+5.619+3.213)/3 = 5.33 -> 6.396초 이내 (평균값과 20% 차이 이내)


- LCP : (5.551+3.270+7.119)/3 = 5.31 (만족)
- CLS : (.001+.004+.037)/3 = 0.016 (만족)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

![](https://user-images.githubusercontent.com/63947424/160116301-fe38ddc5-114a-4c2c-8eba-28d5ae8e7314.png)

- gzip 압축 사용 (compressible text, target size = 497.4 KB)
- 정적 컨텐츠 캐싱 
- CDN 사용
- 렌더링 차단 리소스 제거


3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위 : 경로찾기 (https://yunha-infra-subway.o-r.kr/path)
- (하루 지하철 사용자 수 4500000의 50%가 지하철 앱을 사용한다고 가정)
- 예상 1일 사용자 수 (DAU) : 4500000 * 0.5 = 2250000
- 피크시간대 집중률 (최대트래픽 / 최소트래픽) : 10으로 가정 
- 1일 요청 수 : 3 (카카오 지하철 일일 실행 횟수 참고)  
- Throughtput 
  - 1일 총 접속수 : 2250000 * 3 = 6750000
  - 1일 평균 rps : 6750000 / 86400 = 78.125 
  - 1일 최대 rps : 781.25
- Latency = 50ms
- 요청 수 (R) = 3
- T = (3 * 0.1) = 0.3s
- 평균 VUser = (78.125 * 0.3)/4 = 5.8593 -> 6
- 최대 VUser = (781.25 * 0.3)/4 = 58.593 -> 59
- 부하 유지 기간 :
  - K6 : 
    - smoke test : 10s
    - load test : 3m
    - stress test : 8m
  - Ngrinder : 
    - smoke test : 10s
    - load test : 3m
    - stress test : 3m



4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요.


**PATH 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160393563-2137bb20-7f69-4f02-89e3-0335c2529076.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160393550-9a986a4e-0273-486b-a376-4b77d12e1c89.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160396222-e4d8495a-62bd-48d5-a0db-9263d07780e7.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160397762-7cde6d3e-f423-4258-8590-615964040ba3.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160400703-65a20c88-7e09-43e4-bbdd-5b2e94cd37a8.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160400720-58c0a1c8-62c1-4b3d-82f8-cecf892cdb65.png)


**UPDATE 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160552286-bd7ec8ef-b52f-4d25-a730-fe72aafd262a.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160552288-d1324954-178a-42db-8132-50be24473eb5.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160552259-f38df532-c758-4879-8ed1-bd7537ee0ef8.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160552281-117ceb8c-b100-4001-9afb-54f36bcaefb0.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160552292-6cfecc36-e80b-42f3-91d6-465256e8f167.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160552301-c4f44c21-7a9e-4657-aaa8-81cc03bd757b.png)


**MAIN 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160407155-fb1a485e-7240-4abc-89cd-e2d6a6be9ceb.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160407175-4326f0cc-367e-4b27-b2f6-bdcd52b0576c.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160402730-8dfacc96-f873-4f45-a735-5c3ac94308c7.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160402753-4e914daf-fe3d-4a1a-8496-7ce4b195a13e.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160405889-cb9c142c-c8d7-4bf3-b8b6-d1b5e46d2038.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160405871-5f93a638-63df-49e0-90bc-2057859e0d0f.png)


**ngrinder PATH 테스트**

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


[**WebPageTest결과**](https://www.webpagetest.org/result/220330_BiDcG3_42P/)
![](https://user-images.githubusercontent.com/63947424/160757097-c628a54d-56df-4dc7-85aa-d058651e0a70.png)


|항목|성능개선 전|성능개선 후|
|------|:---:|:---:|
|**성능**|67|93|
|**First Byte**|1.038S|1.065S|
|**First View**|7.256s|3.459s|
|**First Contentful Paint**|6.133S|3.150S|
|**Speed Index**|6.119S|3.130S|
|**Largest Contentful Paint**|6.298S|3.455S|
|**Cumulative Layout Shift**|.004|.004|
|**Total Blocking Time**|.000S|.000S|
|**Total Byte**|2,493KB|630KB|
|**Time To Interactive**|2.8S|1.3S|

- [⭕️] Light house : 85점 이상  
- [❌] FCP : 3.05초 이내 (하지만 3.459s로 유의미한 차이를 나타냄)
- [⭕️] SI : 5.892초 이내 
- [⭕️] TTI : 1.44초 이내
- [⭕️] First View : 6.396초 이내 



**PATH 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160748943-228104b1-e2d0-4dbe-a9fd-3658740cbb5b.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160748945-c88a30fa-302d-4fbe-a721-7356295ba657.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160748930-d05f5074-0497-4449-ac06-5fd9aa754c9c.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160748939-dbe997a9-e645-4ecd-bcae-79eb7ae43e25.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160754971-a02af2a0-3cf6-4b13-8381-85cce160a3c0.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160755026-9a9f34bf-82ef-4d75-ae7c-0dc0d40014dc.png)


**UPDATE 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160749656-6e430396-3859-47d3-a3ac-f932d81170ca.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160749657-9f2ffcd8-bda1-48df-98f1-9a9e07d6c361.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160749640-9dfccad8-f52c-4511-99c7-2ecdb2e98487.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160749652-99e036c7-8e62-4745-b590-19dfc7081b5b.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160755982-dea0aa47-df9f-4fb9-8670-ddb47bf65dd8.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160755999-908fdd46-5f40-415b-bef9-819ff0429e7c.png)


**MAIN 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160746648-da388a2e-d703-4ceb-ac14-de9a4b507d41.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/160746653-f9f1d322-e31b-475f-95c3-be4a5ce96a17.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160746637-248883c4-4123-413f-974c-40e46f2c299d.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/160746644-5c31500a-679d-4b18-90bd-7383f579a872.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160753976-86965074-4bb8-440f-8e92-6d2c375339f8.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/160753997-eb3b08c3-2a0e-41e9-8fd9-21b4777fb7d5.png)



2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

![](https://user-images.githubusercontent.com/63947424/160757521-b5b272f9-7a28-4e5e-90ff-d1cd46d3ec4d.png)

- ReverseProxy 개선
  - gzip 압축
![](https://user-images.githubusercontent.com/63947424/160758257-7717a865-4851-4a2d-a081-9be9e6e3d31b.png)

  - cache 설정 
![](https://user-images.githubusercontent.com/63947424/160758017-301da39c-9103-4ff3-a139-076b10802ab0.png)

  - http2 적용
![](https://user-images.githubusercontent.com/63947424/160759021-3613763c-6b4c-4ec2-8692-561d50dd6665.png)

  - 부하 분산 적용 (8081 포트의 ec2 추가 생성)

- WAS 성능 개선
  - path를 조회할 때 redis 캐시를 사용하도록 변경

|한번 조회 시 (조회쿼리)|그 이후 조회 시(조회쿼리 없음)|
|:---:|:---:|
|![](https://user-images.githubusercontent.com/63947424/160759260-8edf7a10-e3d0-4f76-8b24-748a83ab2c4c.png)![](https://user-images.githubusercontent.com/63947424/160759277-a45e41af-4999-4de7-9d36-998fcf4a2482.png)|![](https://user-images.githubusercontent.com/63947424/160759322-17f803a9-b3d5-455c-b1d6-12cba45f3e8f.png)|



---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
