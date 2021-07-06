# 🚀 2단계 - 성능 테스트

## 요구사항

- [X] 웹 성능 테스트
  - [X] 웹 성능 예산을 작성
  - [X] WebPageTest, PageSpeed 등 테스트해보고 개선이 필요한 부분을 파악
- [ ] 부하 테스트
  - [ ] 테스트 전제조건 정리
    - [ ] 대상 시스템 범위
    - [ ] 목푯값 설정 (latency, throughput, 부하 유지기간)
    - [ ] 부하 테스트 시 저장될 데이터 건수 및 크기
  - [ ] 각 시나리오에 맞춰 스크립트 작성
    - [ ] 접속 빈도가 높은 페이지
    - [ ] 데이터를 갱신하는 페이지
    - [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
  - [ ] Smoke, Load, Stress 테스트 후 결과를 기록

## Report

1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

| -           | First Contentful Paint | Speed Index | Largest Contentful Paint | Time to Interactive | Total Blocking Time | Cumulative Layout Shift |
| ----------- | ---------------------- | ----------- | ------------------------ | ------------------- | ------------------- | ----------------------- |
| RunningMap  | 14.4 s                 | 14.4 s      | 15.0 s                   | 15.1 s              | 0.51 s              | 0.041 s                 |
| Baemin      | 2.6 s                  | 6.0 s       | 4.3 s                    | 4.7 s               | 0.4 s               | 0.066 s                 |
| NaverMap    | 2.3 s                  | 6.2 s       | 5.9 s                    | 5.8 s               | 0.32 s              | 0.017 s                 |
| KakaoMap    | 2.5 s                  | 7.1 s       | 7.0 s                    | 5.1 s               | 0.9 s               | 0.005 s                 |
| 목표 평균치 | 2.466 s                | 6.43 s      | 5.73 s                   | 5.2 s               | 1.62 s              | 0.029 s                 |

`개선 우선순위: First Contentful Paint > Largest Contentful Paint > Speed Index > Time to Interactive`

1. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
   - 텍스트 압축 사용
    ![1](./1.png)
   - 사용하지 않는 자바스크립트 줄이기
    ![2](./2.png)
   - 렌더링 차단 리소스 제거하기
    ![3](./3.png)
   - 사용하지 않는 CSS 줄이기
    ![4](./4.png)
   - main.js 와 vender.js가 가장 큰 문제로 보여 압축과 캐싱을 통해 개선 가능해보임
   - script 비동기 호출로 개선 가능해보임

2. 부하테스트 전제조건은 어느정도로 설정하셨나요

3. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
