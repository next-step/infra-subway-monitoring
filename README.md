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
- WAS (EC2-sungdukim-WAS)
    - `/var/log/syslog`
    - `/home/ubuntu/log/file.log`
    - `/home/ubuntu/log/json.log`

2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=sungdukim-dashboard
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- 웹 서버에 영향을 받는 지표 ([WebPageTest](https://www.webpagetest.org/))

| Index                | My | 카카오맵 | 네이버지도 | 서울교통공사 | 구글맵 |
|----------------------|----|--------|---------|-----------|------|
| Security score       | F  | F      | D       | F         | E    |
| First Byte Time      | A  | A      | A       | B         | B    |
| Keep-alive Enabled   | A  | A      | A       | A         | A    |
| Compress Transfer    | F  | A      | D       | F         | A    |
| Compress Images      | A  | A      | A       | A         | A    |
| Cache static content | C  | F      | B       | F         | A    |
| Effective use of CDN | X  | X      | X       | X         | O    |

- 정적 컨텐츠와 네트워크에 영향을 받는 지표 ([PageSpeed](https://developers.google.com/speed/pagespeed/insights/))

| Index                    | My    | 카카오맵 | 네이버지도 | 서울교통공사 | 구글맵  |
|--------------------------|-------|--------|---------|-----------|-------|
| First Contentful Paint   | 14.4s | 2.5s   | 3.5s    | 7.0s      | 2.6s  |
| Speed Index              | 14.4s | 6.9s   | 5.0s    | 13.0s     | 6.3s  |
| Largest Contentful Paint | 15.0s | 5.8s   | 3.7s    | 7.1s      | 6.7s  |
| Time to Interactive      | 15.1s | 5.2s   | 3.7s    | 10.6s     | 6.5s  |
| Total Blocking Time      | 640ms | 100ms  | 70ms    | 2,810ms   | 630ms |
| Cumulative Layout Shift  | 0.039 | 0.005  | 0       | 0         | 0.078 |
| Performance              | 30    | 66     | 78      | 21        | 47    |

- 시장 주요 경쟁사 지표의 평균은 아래와 같고, 웹 성능예산의 첫 목표로 잡기에 적당하다고 판단됩니다. 
    - First Contentful Paint: 3.9s 
    - Speed Index: 7.8s              
    - Largest Contentful Paint: 5.8s
    - Time to Interactive: 6.5s      
    - Total Blocking Time: 902.5ms      
    - Cumulative Layout Shift: 0.021   
    - Performance: 53

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
    - 리소스 gzip 압축
    - 불필요한 작업 지연로딩 (자바스크립트 최적화)
    - 정적 자원 캐싱

3. 부하테스트 전제조건은 어느정도로 설정하셨나요
    - 대상 시스템 범위: ALB, WAS, DB
    - 1일 사용자 수 (DAU): 10만
    - 1명당 1일 평균 접속 수: 4회
    - Throughput (1일 평균 rps ~ 1일 최대 rps)
        - 1일 총 접속 수: 10만 x 4 = 40만
        - 1일 평균 rps: 40만 / 86,400 ~ 4.63 
        - 1일 최대 rps: 4.63 x 5 ~ 23.15
    - Total Blocking Time: 1g00ms 이내

5. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
