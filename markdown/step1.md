# 1단계 - 인프라 운영하기

## 요구사항

- [ ] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
  - [X] GET /lines findAllLines -> SLEEP(3)의 리턴은 0이기에 리스폰스가 없어 해당 코드 삭제
  ![ ](lines.png)
  - [X] GET /left /right 데드락 코드 삭제
  ![ ](left.png)
  ![ ](right.png)
  - [X] GET /tan 무한루프 코드 삭제
  ![ ](tan1.png)
  ![ ](tan2.png)
- [ ] 로그 설정하기
- [ ] Cloudwatch로 모니터링

1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
