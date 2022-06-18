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

### 0단계 - 학습 및 사전실습
1. 웹 성능 최적화 요소
 - TTI(Time TO Interactive) : 상호 작용까지 시간
   - 사용자가 상호작용 가능할때 까지 걸리는 시간
   - ~3.8sec : Green, 3.9 ~ 7.3sec : Yellow
 - FCP(First Contentful Paint) : 페이지 콘텐츠의 일부가 렌더링 시작될때까지 걸리는 시간 
   - ~1.8sec : Green, 1.9~3sec : yellow 
 - LCP(Largest Contentful Pain) : 페이지 콘텐츠중 가장큰 이미지 혹은 텍스트 블록의 렌더링까지 걸리는 시간
   - ~2.5sec : Green, 2.6~5.4sec : yellow
 - TBT(Total Blocking Time) : FCP 와 상호작용 사이의 시간 
   - ~200ms : Green, 200~600ms : yellow

2. 현재 서비스의 문제점(thread.dump를 통한 분석)
 - 현재 Lock을 서로 요구하며 DeadLock 걸린 쓰레드: "http-nio-8080-exec-1", "http-nio-8080-exec-4", "http-nio-8080-exec-8"
   - 발생 위치 (Lock 자원을 서로 요청하는중)
     - LineController.findLockLeft(LineController.java:76)
     - LineController.findLockLeft(LineController.java:78)
 - 무한루프를 진행하고있는 쓰레드 : "http-nio-8080-exec-5", "http-nio-8080-exec-6", "http-nio-8080-exec-7", "http-nio-8080-exec-9"
   - 발생 위치
     - LineController.java:105
   - CPU 점유 시간 
     - http-nio-8080-exec-5 : 7803113.23ms
     - http-nio-8080-exec-6 : 7579947.33ms
     - http-nio-8080-exec-7 : 7259964.67ms
     - http-nio-8080-exec-9 : 7596787.62ms
 - 다른 쓰레드들이 자원을 반납하지 않아 작업을 진행하지 못하는 쓰레드 : "http-nio-8080-exec-2", "http-nio-8080-exec-3", "http-nio-8080-exec-10"
   - 발생 위치 (남은 자원이 없어 대기중)
      - LineController.findLockLeft(LineController.java:76)
   - CPU 점유 시간(무한루프 진행중인 쓰레드들의 점유 시간보다 현저히 적은것을 확인 가능)
     - http-nio-8080-exec-2 : 90.03ms
     - http-nio-8080-exec-3 : 54.31ms
     - http-nio-8080-exec-10: 151.96

### 1단계 - 웹 성능 테스트
0. 경쟁사 조사

|  경쟁사 정보   | FCP(Sec) |LCP(Sec)|TTI(Sec)|TBT(mSec)|
|:---------:|:--------:|:---:|:---:|:---:|
| 서울교통공사/MB |   6.9    |7.0|9.3|1_180|
| 서울교통공사/PC |   1.6    |3.6|2.1|160|
|  네이버/MB   |   2.1    |7.9|6.7|300|
|  네이버/PC   |   0.5    |1.6|0.5|0|
|  카카오/MB   |   1.7    |6.3|4.3|90|
|  카카오/PC   |   0.5    |1.3|1.0|10|

주로 검색을 많은 서비스이므로, TTI가 적은 서비스가 가장 좋은 서비스 일것 같다.
PC와 Mobile의 속도 차이는, 네트워크 속도 차이 일것 같다.

- PC와 Mobile 속도 차이 이유
  - PC와 Mobile에서 첫번째 png파일이 들어오기까지, pc는 50ms, Mobile은 150ms가 걸린다.
<div>
<img src="readmeSource/fcp_Mb.png" width="300" height="250">
<img src="readmeSource/fcp_Pc.png" width="300" height="250">
</div>
 
  - 아래 사진을 보면 해당 png파일이 렌더링 될때까지 queue에 들어가있는 시간이 Mobile이 현저하게 높은데, 그 이유는 앞단에 데이터 로딩에 걸리는 시간때문이다.
<div>
<img src="readmeSource/queue_mb.png" width="600" height="250">
<img src="readmeSource/queue_pc.png" width="600" height="250">
</div>

---

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
 - TTI <= 3Sec : 주로 검색을 위한 사이트이므로, 사용자의 상호작용까지 걸리는 시간이 작아야 한다. 
 - FCP <= 1Sec : 사용자가 웹이 정상적이라는것을 보여주기 위해, 첫 콘텐트가 렌더링 되는 시간을 최대한 짧게 해야한다.
 - TBT <= 1~2Sec

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
 - 현재 https://jhsong2580.kro.kr/stations 의 성능

|          | FCP(Sec) | LCP(Sec) | TTI(Sec) | TBT(mSec) |
|:--------:|:--------:|:--------:|:--------:|:---------:|
| 현재노선도/PC |   2.9    |   2.9    |   4.5    |   1_450   |
| 현재노선도/Mb |   16.1   |   16.1    |   22.5   |   5_840   |
 - 개선 필요 사항 
   1) 텍스트 압축 사용 
      - 경쟁사는 데이터에 Gzip으로(Header의 Content-encoding으로 확인가능) 압축을 하여 client로 전달하지만, 현재 서비스는 일반 텍스트로 전달 
   2) 렌더링 차단 리소스 제거하기 
      - 렌더링이 되기 전 소스를 불러오는 단계에서, 저장된 css가 아닌, 외부에서 다운로드 받아 제공하는 css라 불러오는데 시간이 추가로 소요됨
      - 필수적이지 않다면 body로 css loading을 옮겨서 렌더링 차단을 방지하거나, 로컬에 다운로드 받고 제공을 해야함
   3) 사용하지 않는 js 제거
      - 사용하지 않는 js는 없으나, 텍스트 압축이 되어있지 않아 서버 -> 클라이언트로 전달시 속도가 느려짐 
      - 제거는 하지 않으나 압축하여 전달이 필요함 

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
