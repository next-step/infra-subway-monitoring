# 서비스 진단하기
## 2단계 - 성능 테스트
### 요구사항
- [ ] 웹 성능 테스트
    - [x] 웹 성능 예산을 작성
        * Lighthouse 성능 감사에서 80 점 이상이어야한다.
        * PageSpeed의 green 조건을 목표로 삼도록 한다.
            * First Contentful Paint : 1.8초 이하
            * Time to Interactive : 3.8초 이하
            * Speed Index : 3.4초 이하
            * Total Blocking Time : 200ms 이하
            * Largest Contentful Paint : 2.5초 이하
            * Cumulative Layout Shift : 0.1 이하
    - [x] [WebPageTest](https://www.webpagetest.org/), [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) 등 테스트해보고 개선이 필요한 부분을 파악
        * PageSpeed 점수 68점 획득
        * 예상 절감치가 가장 높은 content-encoding을 gzip으로 설정하기 부터 적용하기로 함.
        * nginx gzip encodig 설정 
            ```shell
              http {
          
                #...(생략)...
          
                gzip on;
                gzip_disable "msie6";
            
                gzip_vary on;
                gzip_proxied any;
                gzip_comp_level 6;
                gzip_buffers 16 8k;
                gzip_http_version 1.1;
                # application/javascript추가로 js파일도 인코딩
                gzip_types text/plain text/css application/json application/x-javascript application/javascript text/xml application/xml application/xml+rss text/javascript;
              }
            ```
        * 설정 후 측정 성능
            * First Contentful Paint : 1.1초 green
            * Time to Interactive : 1.2초 green
            * Speed Index : 1.4초 green
            * Total Blocking Time : 60ms green
            * Largest Contentful Paint : 1.2초 green
            * Cumulative Layout Shift : 0.004 green
            * ####Total Score : 94 통과
- [ ] 부하 테스트
    - [ ] 테스트 전제조건 정리
        - [ ] 대상 시스템 범위
        - [ ] 목푯값 설정 (latency, throughput, 부하 유지기간)
        - [ ] 부하 테스트 시 저장될 데이터 건수 및 크기
    - [ ] 각 시나리오에 맞춰 스크립트 작성
        - [ ] 접속 빈도가 높은 페이지
        - [ ] 데이터를 갱신하는 페이지
        - [ ] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
    - [ ] moke, Load, Stress 테스트 후 결과를 기록
    
