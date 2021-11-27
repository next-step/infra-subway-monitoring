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

## 1단계 - 인프라 운영하기
### PR 질문 문답
1. 각 서버내 로깅 경로를 알려주세요
  =>
2. Cloudwatch 대시보드 URL을 알려주세요
  =>

### 작업 리스트
- [x] Application Log에대한 로그파일 생성 및 저장
  - [x] Auth 항목에대한 Log 추가
  - [x] favorite 항목에대한 Log 추가
  - [x] line 항목에대한 Log 추가
  - [x] map 항목에대한 Log 추가
  - [x] member 항목에대한 Log 추가
  - [x] station 항목에대한 Log 추가
- [x] Nginx Access Log 설정
- [x] Docker 상태확인하기 (cAdvisor 설치)
- [x] Cloudwatch로 로그 수집하기
- [x] Cloudwatch로 메트릭 수집하기
---

## 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
