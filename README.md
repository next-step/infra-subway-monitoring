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

테스트 웹: https://giyeon95.kro.kr/

개선전
 - PageSpeed Test: [결과보기](https://pagespeed.web.dev/report?url=https%3A%2F%2Fgiyeon95.kro.kr%2F)

| 측정 항목                    | My (68점) | 서울교통공사 [결과보기](https://pagespeed.web.dev/report?url=http%3A%2F%2Fwww.seoulmetro.co.kr%2Fkr%2FcyberStation.do) | Naver [결과보기](https://pagespeed.web.dev/report?url=https%3A%2F%2Fm.map.naver.com%2Fsubway%2FsubwayLine.naver%3Fregion%3D1000) |
|--------------------------|----------|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| First Contentful Paint   | 2.7s     | 1.6s                                                                                                         | 0.5s                                                                                                                         |
| Time to Interactive      | 2.8s     | 3.1s                                                                                                         | 0.7s                                                                                                                         |
| Speed Index              | 2.7s     | 3.4s                                                                                                         | 2.7s                                                                                                                         |
| Total Blocking Time      | 0.05s    | 1.3s                                                                                                         | 0.01s                                                                                                                        |
| Largest Contentful Paint | 2.8s     | 3.6s                                                                                                         | 1.6s                                                                                                                         |
| Cumulative Layout Shift  | 0.004    | 0.013                                                                                                        | 0.006                                                                                                                        |

- WebPage Test: [결과보기](https://www.webpagetest.org/result/220216_BiDcFR_CB2/)

- GMetrix: [결과보기](https://gtmetrix.com/reports/giyeon95.kro.kr/BW6cuoYc/)

| 측정 항목      | My      | 서울교통공사 [결과보기](https://www.webpagetest.org/result/220216_BiDc19_CNQ/) | Naver [결과보기](https://www.webpagetest.org/result/220216_AiDc4A_EEE/) | 
|------------|---------|----------------------------------------------------------------------|---------------------------------------------------------------------|
| First View | 5.0004s | 4.231s                                                               | 1.330s                                                              |   

개선 목표
- [x] First Contentful Paint: 1초 이내
- [x] Time To Interactive: 1초 이내
- [x] Speed Index: 2초 이내
- [x] Largest Contentful Paint: 2초 이내
- [x] First View: 3초 이내
- [x] Lighthouse: 80점 이상

---


2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

### nginx 내 텍스트 압축 설정 적용
[Reference](https://chicpro.dev/nginx-gzip-압축-설정/)

| 측정 항목                    | 적용 전 (68점) | 적용 후 (90점) |
|--------------------------|------------|------------|
| First Contentful Paint   | 2.7s       | 1.3s       |
| Time to Interactive      | 2.8s       | 1.4s       |
| Speed Index              | 2.7s       | 1.7s       |
| Total Blocking Time      | 0.05s      | 0.07s      |
| Largest Contentful Paint | 2.8s       | 1.4s       |
| Cumulative Layout Shift  | 0.004      | 0.004      |

| 측정 항목      | 적용 전    | 적용 후   |
|------------|---------|--------|
| First View | 5.0004s | 1.826s |

WebPage Test: [결과보기](https://www.webpagetest.org/result/220217_BiDc28_J64/)

결과: 5.0004s - 1.826s / 1.826 = 173% 개선

### http2 설정
[Reference](https://ma.ttias.be/enable-http2-in-nginx/)

| 측정 항목                    | 적용 전 (90점) | 적용 후 (94점) |
|--------------------------|------------|------------|
| First Contentful Paint   | 1.3s       | 1.2s       |
| Time to Interactive      | 1.4s       | 1.2s       |
| Speed Index              | 1.7s       | 1.3s       |
| Total Blocking Time      | 0.07s      | 0.02s      |
| Largest Contentful Paint | 1.4s       | 1.2s       |
| Cumulative Layout Shift  | 0.004      | 0.004      |

| 측정 항목      | 적용 전   | 적용 후   |
|------------|--------|--------|
| First View | 1.826s | 1.876s |

WebPage Test: [결과보기](https://www.webpagetest.org/result/220217_BiDcFV_JCK/)

결과: PageSpeedInsignt 결과는 좋아졌지만,, 속도 개선 미비함, (컨텐츠가 많지 않아 그렇지 않을까 추측🤔)

### 렌더링 차단 리소스 제거
[Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)

| 측정 항목                    | 적용 전 (94점) | 적용 후 (90점) |
|--------------------------|------------|------------|
| First Contentful Paint   | 1.2s       | 1.0s       |
| Time to Interactive      | 1.2s       | 1.3s       |
| Speed Index              | 1.3s       | 1.4s       |
| Total Blocking Time      | 0.02s      | 0.17s      |
| Largest Contentful Paint | 1.2s       | 1.3s       |
| Cumulative Layout Shift  | 0.004      | 0.004      |


| 측정 항목      | 적용 전   | 적용 후 |
|------------|--------|--|
| First View | 1.876s | 1.791s |

WebPage Test: [결과보기](https://www.webpagetest.org/result/220217_BiDc24_JNK/)

결과: PageSpeedInsignt 결과가 나빠(?)지고, 약간의 속도 개선 (흠,, 값이 튀어서, 평균값을 구할껄..🤔)



3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
