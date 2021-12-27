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
1. 각 서버내 로깅 경로를 알려주세요<br>
: admin서버 접속(pem_key : codingknowjam.pem) -> ssh external(alias 설정) <br>
-> 로그 경로 : /home/ubuntu/infra-subway-monitoring/build/libs/log)

2. Cloudwatch 대시보드 URL을 알려주세요<br>
: https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-codingknowjam

---

### 2단계 - 성능 테스트



1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요<br> 
   * 현재 앱 자체의 정적리소스가 많지 않으므로 리소스 크기는 제외하고 비교
   * 동일한 지하철 경로검색 웹서비스를 제공하는 네이버,카카오를 경쟁사로 채택
   * 사용자의 대부분은 경로검색을 빠르게 하길 원하므로 FCP, TTI를 중요지표로 채택
   * 경로검색을 하기 위해 가장 처음 방문하는 메인페이지로 비교
   
항목    | FCP | TTI | Lighthouse Score
|------|-----|-----|----------| 
성능예산 최소기준 | 3초 | 5초  | 80점 이상
네이버지도(경쟁사) | 0.3초 | 2.6초 | 74점
카카오지도(경쟁사) | 0.6초 | 2.7초 | 62점
나의 앱(자사) | 2.7초 | 2.8초 | 68점

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   * FCP는 경쟁사 대비 느린 속도이므로 개선, Lighthouse Score는 80점을 넘도록 개선
   * FCP 향상을 위해 리소스틑 gzip과 같은형태로 압축하여 제공 
   * 사용하지 않는 스크립트는 제거
   * 캐싱을 활용해서 정적리소스 호출 개선 

<br>

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
   * 국내에서 가장 높은 MAU를 보유한 네이버지도를 바탕으로 전제조건을 설정
   * 네이버지도 MAU : 1392만명 (https://blog.naver.com/rkwkrhspm/222515422896)
   * DAU : 약 464,000명 
   * 1명당 1일 접속 수 : 하루에 약 5번 사용으로 가정
   * 1일 평균 rps : 약 26rps
   * 1일 최대 rps : 130rps 가정


4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
   * 메인화면 접속 테스트
     * [smoke 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/main/smoke.js)
     * [smoke 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/main/smoke.md)
     * [load 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/main/load.js)
     * [load 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/main/load.md)
     * [stress 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/main/stress.js)
     * [stress 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/main/stress.md)
   * 내 정보 변경 테스트
      * [smoke 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/member/smoke.js)
      * [smoke 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/member/smoke.md)
      * [load 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/member/load.js)
      * [load 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/member/load.md)
      * [stress 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/member/stress.js)
      * [stress 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/member/stress.md)
   * 경로검색 테스트
      * [smoke 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/path/smoke.js)
      * [smoke 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/path/smoke.md)
      * [load 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/path/load.js)
      * [load 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/path/load.md)
      * [stress 스크립트](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/path/stress.js)
      * [stress 결과](https://github.com/codingknowjam/infra-subway-monitoring/tree/step2/k6/path/stress.md)
