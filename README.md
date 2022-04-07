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
- 평균 VUser = (78.125 * 0.3)/3 = 7.8125 -> 8
- 최대 VUser = (781.25 * 0.3)/3 = 78.125 -> 79
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


**MAIN 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161009463-d42d153d-9951-42ea-a081-a6bb53547c5b.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161009482-3d1c9197-b0a9-4478-8ed4-100660fe4dd5.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161009490-bd57a8cb-e81e-4e9d-bbba-25ec6e489522.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161009492-82c856f8-132c-40a2-8baa-97bec2ffb7a9.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161011941-3b428c7f-13ea-4409-8cf3-0f9196bdb20d.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161011961-bcb4196b-9ba0-4b81-9b33-940f9713bad7.png)


**PATH 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161011964-67b5342c-f178-4d16-a6a7-483d600d70f7.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161011967-19bee27e-5914-4ebc-ac02-c26d7230c1a3.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161011969-56021b44-00d4-4a27-9533-f5121068e992.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161011974-2fa16c77-dc0d-420a-ada2-9ed18bfc750c.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161013258-28cb9716-6e36-4935-8e44-99f538843694.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161013270-86aaa34c-eb0a-4191-9649-9672eaece56c.png)


**UPDATE 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161013275-1739cec5-07a6-49f7-9e0b-4c35f642044e.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161013282-475196f3-a67c-4a26-855c-356ac4d5a324.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161013287-ccc257f4-9575-4e70-8438-f2b76c2b7105.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161013292-938b4498-6676-4d26-a43c-2f060124e72b.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161018393-c8f4b43a-f41c-4936-818a-f31cb8fd1aa9.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161018410-be34563d-655c-4e6b-ba9c-30cc8c4d0346.png)



**ngrinder PATH 테스트**

[**ngrinder 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/ngrinder/ngrinder.groovy)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161025864-9bb1add4-4b7f-42e6-a0ea-dd1764e9732d.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161025886-a16e4e00-8c81-43e7-a478-c9f223cd6bb5.png)

![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161025889-b18e3d6d-75be-4b8f-9c27-5711ea59f9e7.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161025896-c5025181-5bc8-4566-9192-b216f8e97966.png)

![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161025899-28a7c9ea-6866-4c10-8033-ce8b681c7b22.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161025900-c8d5c9e1-ed72-458d-b28a-ece28de764e3.png)


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



**MAIN 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161036312-9b811837-2a29-4a7e-a1bc-3c137047a376.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161036328-2dc283ed-aa7f-4a58-b620-179f94daefdc.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161949461-f9e24217-5e6d-4845-85b5-8888ad67754d.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161949482-5a28e919-d413-4737-9b8b-5f297047d015.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/main/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161949631-e7205e87-26f5-4376-b03f-e29d961ddcb0.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161949644-ee645ae3-a681-4507-899d-945a32babfd7.png)

**PATH 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161037879-69bfc533-b3cb-479c-8f33-e4333d091d1c.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161037892-b1ffe20c-cc6c-4e4c-834b-266fd9c8cc90.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161949842-3dfdbd08-73f6-4574-a6eb-41da4de7fa9c.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161949857-c0bab9d8-40a3-481d-9d27-0f6036aca3d1.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/path/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161949862-58f23aff-53cd-4e5b-97b0-587c3c9ef170.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161949865-2df8e526-c624-4d0d-b70e-0fe3d6fed3f1.png)


**UPDATE 테스트**

[**smoke 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/smoke.js)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161070705-4bbc21ee-9143-4867-8125-8d2114efbe66.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161070724-4ff514e7-772a-4462-8cb1-8472ba1067bd.png)
[**load 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/load.js)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161951567-7be73d08-7616-46cd-84b1-f2d39163812b.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161951581-8f549b43-fa5a-4efe-a396-5bdc66c7f3d5.png)
[**stress 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/k6/update/stress.js)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161951594-0caf28bc-e030-46ee-8984-050981531fed.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161951601-6f4d598c-c2df-489e-9191-0c264bf09313.png)


**ngrinder PATH 테스트**

[**ngrinder 스크립트**](https://github.com/yunhalee05/infra-subway-monitoring/blob/step1/ngrinder/ngrinder.groovy)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161095460-5888e11a-f90f-4e71-8670-d493e07eede2.png)
![smoke 테스트 결과](https://user-images.githubusercontent.com/63947424/161095485-d653e2a9-2202-4084-a5c6-9f6c56acd189.png)

![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161095488-18163859-e082-4f0c-aaf6-047ac0ae4d4a.png)
![load 테스트 결과](https://user-images.githubusercontent.com/63947424/161095493-be9dafdf-424d-4bc8-8bf5-622294708084.png)

![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161095498-b141ab25-e4ce-4672-8cd8-bd2a9f3d4146.png)
![stress 테스트 결과](https://user-images.githubusercontent.com/63947424/161095506-29832472-7f29-4f2d-ab5d-62f92bdae953.png)



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
- /home/ubuntu/infra-subway-deploy/log
- /home/ubuntu/infra-subway-deploy/log

![](https://user-images.githubusercontent.com/63947424/161982965-97623853-95c7-47cb-af96-46104b46019e.png)
![](https://user-images.githubusercontent.com/63947424/161982980-703298dd-b39b-47da-9927-356e930ed7b6.png)
![](https://user-images.githubusercontent.com/63947424/161982984-2b596a0c-0a39-41ea-9e66-24d836980789.png)


2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=yunhalee05
![](https://user-images.githubusercontent.com/63947424/161982987-d248beab-4e5a-4135-9cbe-41907a34a556.png)
![](https://user-images.githubusercontent.com/63947424/162102517-f08cdf6d-dc9c-4b55-ae99-ab8670bfe48d.png)