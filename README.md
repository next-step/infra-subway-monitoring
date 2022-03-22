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

경쟁사인 카카오맵, 네이버지도 대비 전체적인 지표가 낮다. 그 중 아래 지표에 대해서 성능 예산을 책정했다. 

FCP : 2.7s → Less than 1s

LCP : 2.8s → Less than 1s 

TTI : 2.8s → 2.5s

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

PageSpeed에서 해주는 제안을 반영할 수 있을 것 같다. 

#### 당장 적용 가능한 부분
- Enable text compression :  vendors.js를 gzip으로 압축. Content-encoding=gzip 이용
- Serve static assets with an efficient cache policy : 정적자원을 캐싱해본다. cache-Control을 1년으로 추가.
- Image elements do not have explicit width and height: width와 height가 없는 이미지의 값을 셋팅한다. 


#### 당장 적용이 어려운 부분
- Reduce unused JavaScript : 코드 스프리팅이나, Dead Code Elimination, Dead Imported Code 을 적용해주는 빌드 툴을 써야 하지만 러닝커브가 있으니 추후에 개선

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
- 대상 시스템 범위: 지하철 노선도 서비스 

- 목푯값 설정 (latency, throughput, 부하 유지기간)

	- latency = 100ms 이하 

	- 부하유지 시간 = 30분

	- Throughput = 0.23 ~ 0.34

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
Login 페이지 대상 smoke, Load, Stress 테스트 결과 

- smoke test 
![image](https://user-images.githubusercontent.com/55608425/159466498-23b3c5be-bcc4-41be-8c27-3ad025dc0b55.png)

- Load tset 

- Stress test



---

### 2단계 - 화면 응답 개선하기
1. 성능 개선 결과를 공유해주세요 (Smoke, Load, Stress 테스트 결과)

2. 어떤 부분을 개선해보셨나요? 과정을 설명해주세요

---

### [추가] 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
