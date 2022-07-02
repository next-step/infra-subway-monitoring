## 요구사항
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- 로그 설정하기
  - [x] Application Log 파일로 저장하기
    - 회원가입, 로그인 등의 이벤트에 로깅을 설정
    - 경로찾기 등의 이벤트 로그를 JSON으로 수집
- Cloudwatch로 모니터링
    - [x] Cloudwatch로 로그 수집하기
    - [x] Cloudwatch로 메트릭 수집하기
    - [x] USE 방법론을 활용하기 용이하도록 대시보드 구성

## 1. 각 서버내 로깅 경로를 알려주세요
- application : /home/ubuntu/infra-subway-monitoring/logs
- nginx : /var/log/nginx

## 2. Cloudwatch 대시보드 URL을 알려주세요
- https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=jaesungahn91-dashboard