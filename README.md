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
   - WEB서버 : ${home}/infra-subway-monitoring/log/fileLog-{날짜}.log

2. Cloudwatch 대시보드 URL을 알려주세요
   - url : https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-all-forone

---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
   : Lighthouse에서 제시하는 3가지 메트릭에 대한 성능 측정 값이 green 영역에 들어온다면 좋은 성능의 서비스라고 생각합니다.
   - Largest Contentful Paint(최대 콘텐츠풀 페인트, LCP) : 2.5초 이하
   - Total Blocking Time(총 차단 시간, TBT) : 200ms 이하
   - Cumulative Layout Shift(누적 레이아웃 이동, CLS) : 0.1 이하
   
   : 또한 경쟁사(NAVER)의 성능 테스트시 아래와 같은 결과를 얻었습니다.  
     경쟁사보다 LCP가 20% 이상 적은 결과를 얻을 수 있도록 개선한다면 사용자가 성능이 좋다고 느낄 수 있을 것 같습니다.
   ![performance_naver](https://user-images.githubusercontent.com/73328076/146875684-62750807-af73-4069-bdfd-3a020436f006.png)


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 성능 측정 결과 vender.js 페이지를 로드하는데 가장 오랜 시간이 걸렸기때문에 gzip 압축을 통해 응답속도를 개선시키면 좋겠습니다.
     정적 페이지 응답시 gzip 압축된 내용으로 응답할 수 있도록 properties에 내용을 추가하였습니다.   
     <성능 테스트 결과 - ASIS>
   ![performance_asis](https://user-images.githubusercontent.com/73328076/146876070-46688453-a0f0-4d6d-9e85-6944b7269dac.png)   
     <성능 테스트 결과 - TOBE>
   ![performance_tobe](https://user-images.githubusercontent.com/73328076/146876075-b1159f00-dde5-48a8-8f1e-13b1630e5a15.png)

     gzip 압축 적용 후 LCP에 걸리는 시간이 ASIS 대비 1/3, 경쟁사 대비 1/4로 감소함을 확인하였습니다.
 
   
3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   - 전제조건
     - 1일 사용자수 100만
     - 1명당 1일 평균 요청수 : 5
     - 1일 평균 rps : 57
     - 최대트래픽 : 285 (평균 rps의 5배로 산정)
   - 목푯값 설정 (latency, throughput, 부하 유지기간)
     - latency : 1s
     - throughput : 57 ~ 285
   
4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   - 접속 빈도가 높은 페이지  
     [smoke_freq.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/d04a64dd115674b789d4d1e5525f6aad9ce4c20b/k6/smoke_freq.js)  
     [smoke_freq.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/smoke_freq.txt)  
     [load_freq.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/load_freq.js)  
     [load_freq.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/load_freq.txt)  
     [stress-freq.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/stress-freq.js)  
     [stress_freq.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/stress_freq.txt)  
   - 데이터를 갱신하는 페이지  
     [smoke_update.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/smoke_update.js)  
     [smoke_update.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/smoke_update.txt)  
     [load_update.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/load_update.js)  
     [load_update.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/load_update.txt)  
     [stress_update.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/stress_update.js)  
     [stress_update.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/307a45473648a2509c7392bcf89e19cb38713d6a/k6/stress_update.txt)  
   - 데이터를 조회하는데 여러 데이터를 참조하는 페이지  
     [smoke_manyDatas.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/smoke_manyDatas.js)  
     [smoke_manyDatas.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/smoke_manyDatas.txt)  
     [load_manyDatas.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/load_manyDatas.js)  
     [load_manyDatas.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/load_manyDatas.txt)  
     [stress_manyDatas.js](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/stress_manyDatas.js)  
     [stress_manyDatas.txt](https://github.com/All-ForOne/infra-subway-monitoring/blob/b9b5f0648d4b35b57f34911430d54ea86d870119/k6/stress_manyDatas.txt)  
