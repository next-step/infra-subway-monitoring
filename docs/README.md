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
    - [x] 테스트 전제조건 정리
        - [x] 대상 시스템 범위
            * 접속빈도 높은 페이지 : 메인 페이지
            * 데이터를 갱신하는 페이지 : 회원 가입
            * 데이터를 조회하는데 여러 데이터를 참조하는 페이지 : 경로 검색
        - [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
            * DAU : 10만 상정 (카카오 지하철 2017 DAU 1/4 수준)
            * 1명당 1일 평균 접속 수 : 3
            * 피크 시간대 집중률(최대 트래픽 / 평소 트래픽) : 10
            * 1일 총 접속수 (DAU * 1명당 1일 평균 접속 수) : 300,000
            * 1일 평균 rps (1일 총 접속수 / 86,400) = 3.47
            * 1일 최대 rps (1일 평균 rps * 피크 시간대 집중률) = 34.7
        - [x] 부하 테스트 시 저장될 데이터 건수 및 크기
            * 준비 된 운영 DB 데이터
    - [x] 각 시나리오에 맞춰 스크립트 작성
        - [x] 접속 빈도가 높은 페이지
            * docs/script/main-smoke.js
            * docs/script/main-load.js
            * docs/script/main-stress.js
        - [x] 데이터를 갱신하는 페이지
            * docs/script/sign-smoke.js
            * docs/script/sign-load.js
            * docs/script/sign-stress.js
        - [x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
            * docs/script/path-smoke.js
            * docs/script/path-load.js
            * docs/script/path-stress.js
    - [x] smoke, Load, Stress 테스트 후 결과를 기록
        * 메인페이지
            * somke test
                ```shell
                  
                          /\      |‾‾| /‾‾/   /‾‾/
                  /\  /  \     |  |/  /   /  /
                  /  \/    \    |     (   /   ‾‾\
                  /          \   |  |\  \ |  (‾)  |
                  / __________ \  |__| \__\ \_____/ .io
                
                  execution: local
                  script: main-smoke.js
                  output: -
                
                  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
                  * default: 1 looping VUs for 10s (gracefulStop: 30s)
                
                
                running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
                default ↓ [======================================] 1 VUs  10s
                
                     ✓ logged in successfully
                     ✓ response was ok
                
                     checks.........................: 100.00% ✓ 20  ✗ 0
                     data_received..................: 22 kB   2.1 kB/s
                     data_sent......................: 5.4 kB  522 B/s
                     http_req_blocked...............: avg=7.16ms  min=3.94µs  med=7.58µs  max=143.24ms p(90)=8.6µs   p(95)=7.17ms
                     http_req_connecting............: avg=60.4µs  min=0s      med=0s      max=1.2ms    p(90)=0s      p(95)=60.4µs
                ✓ http_req_duration..............: avg=10.21ms min=4.76ms  med=9.18ms  max=36.05ms  p(90)=14.53ms p(95)=19.41ms
                { expected_response:true }...: avg=10.21ms min=4.76ms  med=9.18ms  max=36.05ms  p(90)=14.53ms p(95)=19.41ms
                http_req_failed................: 0.00%   ✓ 0   ✗ 20
                http_req_receiving.............: avg=46.48µs min=30.79µs med=44.99µs max=76.02µs  p(90)=66.77µs p(95)=70.6µs
                http_req_sending...............: avg=26.22µs min=11.95µs med=23.11µs max=94.85µs  p(90)=34.31µs p(95)=38.69µs
                http_req_tls_handshaking.......: avg=6.53ms  min=0s      med=0s      max=130.69ms p(90)=0s      p(95)=6.53ms
                http_req_waiting...............: avg=10.13ms min=4.71ms  med=9.1ms   max=35.88ms  p(90)=14.45ms p(95)=19.3ms
                http_reqs......................: 20      1.930364/s
                iteration_duration.............: avg=1.03s   min=1.01s   med=1.01s   max=1.18s    p(90)=1.04s   p(95)=1.11s
                iterations.....................: 10      0.965182/s
                vus............................: 1       min=1 max=1
                vus_max........................: 1       min=1 max=1
                ```
            * load test
                ```shell
                            
                          /\      |‾‾| /‾‾/   /‾‾/
                  /\  /  \     |  |/  /   /  /
                  /  \/    \    |     (   /   ‾‾\
                  /          \   |  |\  \ |  (‾)  |
                  / __________ \  |__| \__\ \_____/ .io
                
                  execution: local
                  script: main-load.js
                  output: -
                
                  scenarios: (100.00%) 1 scenario, 35 max VUs, 3m40s max duration (incl. graceful stop):
                  * default: Up to 35 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                
                
                running (3m10.7s), 00/35 VUs, 5375 complete and 0 interrupted iterations
                default ↓ [======================================] 03/35 VUs  3m10s
                
                     ✓ logged in successfully
                     ✓ response was ok
                
                     checks.........................: 100.00% ✓ 10750 ✗ 0
                     data_received..................: 9.3 MB  49 kB/s
                     data_sent......................: 2.7 MB  14 kB/s
                     http_req_blocked...............: avg=40.9µs  min=3.22µs  med=4.83µs  max=151.07ms p(90)=7.97µs  p(95)=8.47µs
                     http_req_connecting............: avg=4.58µs  min=0s      med=0s      max=3.96ms   p(90)=0s      p(95)=0s
                ✓ http_req_duration..............: avg=6.19ms  min=2.17ms  med=6.06ms  max=167.17ms p(90)=9.48ms  p(95)=10.2ms
                { expected_response:true }...: avg=6.19ms  min=2.17ms  med=6.06ms  max=167.17ms p(90)=9.48ms  p(95)=10.2ms
                http_req_failed................: 0.00%   ✓ 0     ✗ 10750
                http_req_receiving.............: avg=46.69µs min=20.48µs med=34.89µs max=13.08ms  p(90)=59.87µs p(95)=69.49µs
                http_req_sending...............: avg=24.56µs min=9.81µs  med=16.3µs  max=2.52ms   p(90)=31.74µs p(95)=35.61µs
                http_req_tls_handshaking.......: avg=28.8µs  min=0s      med=0s      max=129.66ms p(90)=0s      p(95)=0s
                http_req_waiting...............: avg=6.12ms  min=2.13ms  med=6ms     max=167.13ms p(90)=9.39ms  p(95)=10.1ms
                http_reqs......................: 10750   56.374307/s
                iteration_duration.............: avg=1.01s   min=1s      med=1.01s   max=1.19s    p(90)=1.01s   p(95)=1.01s
                iterations.....................: 5375    28.187153/s
                vus............................: 3       min=1   max=35
                vus_max........................: 35      min=35  max=35
                ```
            * stress test
                ```shell
                
                            /\      |‾‾| /‾‾/   /‾‾/
                      /\  /  \     |  |/  /   /  /
                      /  \/    \    |     (   /   ‾‾\
                      /          \   |  |\  \ |  (‾)  |
                      / __________ \  |__| \__\ \_____/ .io
                    
                      execution: local
                      script: main-stress.js
                      output: -
                    
                      scenarios: (100.00%) 1 scenario, 140 max VUs, 12m40s max duration (incl. graceful stop):
                      * default: Up to 140 looping VUs for 12m10s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                    
                    
                    running (12m10.8s), 000/140 VUs, 40287 complete and 0 interrupted iterations
                    default ↓ [======================================] 006/140 VUs  12m10s
                    
                         ✓ logged in successfully
                         ✓ response was ok
                    
                         checks.........................: 100.00% ✓ 80574 ✗ 0
                         data_received..................: 70 MB   95 kB/s
                         data_sent......................: 20 MB   28 kB/s
                         http_req_blocked...............: avg=1.74ms   min=3µs     med=4.53µs  max=4.71s p(90)=7.18µs   p(95)=8.85µs
                         http_req_connecting............: avg=584.98µs min=0s      med=0s      max=1.72s p(90)=0s       p(95)=0s
                    ✗ http_req_duration..............: avg=191.28ms min=2.19ms  med=81.19ms max=4.09s p(90)=409.47ms p(95)=695.71ms
                    { expected_response:true }...: avg=191.28ms min=2.19ms  med=81.19ms max=4.09s p(90)=409.47ms p(95)=695.71ms
                    http_req_failed................: 0.00%   ✓ 0     ✗ 80574
                    http_req_receiving.............: avg=3.95ms   min=19.54µs med=31.9µs  max=2.94s p(90)=205.17µs p(95)=567.37µs
                    http_req_sending...............: avg=2.46ms   min=9.22µs  med=14.46µs max=1.88s p(90)=29.73µs  p(95)=38.1µs
                    http_req_tls_handshaking.......: avg=940.76µs min=0s      med=0s      max=4.46s p(90)=0s       p(95)=0s
                    http_req_waiting...............: avg=184.86ms min=2.14ms  med=81.01ms max=3.51s p(90)=408.69ms p(95)=656.52ms
                    http_reqs......................: 80574   110.247558/s
                    iteration_duration.............: avg=1.47s    min=1s      med=1.22s   max=6.42s p(90)=2s       p(95)=2.98s
                    iterations.....................: 40287   55.123779/s
                    vus............................: 6       min=1   max=140
                    vus_max........................: 140     min=140 max=140
                ```
    
        * 회원 가입
            * smoke test
                ```shell
                            /\      |‾‾| /‾‾/   /‾‾/
                          /\  /  \     |  |/  /   /  /
                          /  \/    \    |     (   /   ‾‾\
                          /          \   |  |\  \ |  (‾)  |
                          / __________ \  |__| \__\ \_____/ .io
                        
                          execution: local
                          script: sign-smoke.js
                          output: -
                        
                          scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
                          * default: 1 looping VUs for 10s (gracefulStop: 30s)
                        
                        
                        running (10.5s), 0/1 VUs, 9 complete and 0 interrupted iterations
                        default ↓ [======================================] 1 VUs  10s
                        
                             ✓ logged in successfully
                        
                             checks.........................: 100.00% ✓ 9   ✗ 0
                             data_received..................: 6.5 kB  617 B/s
                             data_sent......................: 2.6 kB  251 B/s
                             http_req_blocked...............: avg=90.31ms  min=6.97µs  med=8.01µs  max=812.77ms p(90)=162.56ms p(95)=487.66ms
                             http_req_connecting............: avg=9ms      min=0s      med=0s      max=81.01ms  p(90)=16.2ms   p(95)=48.6ms
                        ✓ http_req_duration..............: avg=49.98ms  min=40.28ms med=40.7ms  max=85.01ms  p(90)=81.84ms  p(95)=83.43ms
                        { expected_response:true }...: avg=49.98ms  min=40.28ms med=40.7ms  max=85.01ms  p(90)=81.84ms  p(95)=83.43ms
                        http_req_failed................: 0.00%   ✓ 0   ✗ 9
                        http_req_receiving.............: avg=156.64µs min=54.23µs med=77.45µs max=355.87µs p(90)=329.32µs p(95)=342.6µs
                        http_req_sending...............: avg=42.88µs  min=28.58µs med=31.1µs  max=133.91µs p(90)=53.91µs  p(95)=93.91µs
                        http_req_tls_handshaking.......: avg=72.43ms  min=0s      med=0s      max=651.95ms p(90)=130.39ms p(95)=391.17ms
                        http_req_waiting...............: avg=49.78ms  min=40.18ms med=40.39ms max=84.81ms  p(90)=81.72ms  p(95)=83.26ms
                        http_reqs......................: 9       0.860341/s
                        iteration_duration.............: avg=1.16s    min=1.05s   med=1.06s   max=1.9s     p(90)=1.26s    p(95)=1.58s
                        iterations.....................: 9       0.860341/s
                        vus............................: 1       min=1 max=1
                        vus_max........................: 1       min=1 max=1
                ```
            * load test
                ```shell
                            /\      |‾‾| /‾‾/   /‾‾/
                      /\  /  \     |  |/  /   /  /
                      /  \/    \    |     (   /   ‾‾\
                      /          \   |  |\  \ |  (‾)  |
                      / __________ \  |__| \__\ \_____/ .io
                    
                      execution: local
                      script: sign-load.js
                      output: -
                    
                      scenarios: (100.00%) 1 scenario, 35 max VUs, 3m40s max duration (incl. graceful stop):
                      * default: Up to 35 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                    
                    
                    running (3m10.7s), 00/35 VUs, 4703 complete and 0 interrupted iterations
                    default ✗ [======================================] 00/35 VUs  3m10s
                    
                         ✓ logged in successfully
                    
                         checks.........................: 100.00% ✓ 4703 ✗ 0
                         data_received..................: 1.2 MB  6.2 kB/s
                         data_sent......................: 1.2 MB  6.2 kB/s
                         http_req_blocked...............: avg=1.26ms   min=3.7µs   med=4.8µs   max=1.72s    p(90)=8.25µs   p(95)=9.08µs
                         http_req_connecting............: avg=94.18µs  min=0s      med=0s      max=247.43ms p(90)=0s       p(95)=0s
                    ✓ http_req_duration..............: avg=93.16ms  min=34.09ms med=80.88ms max=899.76ms p(90)=85.86ms  p(95)=166.03ms
                    { expected_response:true }...: avg=93.16ms  min=34.09ms med=80.88ms max=899.76ms p(90)=85.86ms  p(95)=166.03ms
                    http_req_failed................: 0.00%   ✓ 0    ✗ 4703
                    http_req_receiving.............: avg=850.06µs min=15.42µs med=22.14µs max=492.8ms  p(90)=493.14µs p(95)=848.87µs
                    http_req_sending...............: avg=228.67µs min=11.78µs med=15.12µs max=487.66ms p(90)=31.81µs  p(95)=36.32µs
                    http_req_tls_handshaking.......: avg=1.12ms   min=0s      med=0s      max=1.3s     p(90)=0s       p(95)=0s
                    http_req_waiting...............: avg=92.08ms  min=34.04ms med=80.69ms max=899.72ms p(90)=85.43ms  p(95)=165.62ms
                    http_reqs......................: 4703    24.660071/s
                    iteration_duration.............: avg=1.15s    min=1.06s   med=1.14s   max=2.78s    p(90)=1.22s    p(95)=1.26s
                    iterations.....................: 4703    24.660071/s
                    vus............................: 4       min=1  max=35
                    vus_max........................: 35      min=35 max=35

                ```
            * stress test
                ```shell
                            /\      |‾‾| /‾‾/   /‾‾/
                      /\  /  \     |  |/  /   /  /
                      /  \/    \    |     (   /   ‾‾\
                      /          \   |  |\  \ |  (‾)  |
                      / __________ \  |__| \__\ \_____/ .io
                    
                      execution: local
                      script: sign-stress.js
                      output: -
                    
                      scenarios: (100.00%) 1 scenario, 140 max VUs, 12m40s max duration (incl. graceful stop):
                      * default: Up to 140 looping VUs for 12m10s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                    
                    
                    running (12m11.0s), 000/140 VUs, 38370 complete and 0 interrupted iterations
                    default ↓ [======================================] 008/140 VUs  12m10s
                    
                         ✓ logged in successfully
                    
                         checks.........................: 100.00% ✓ 38370 ✗ 0
                         data_received..................: 9.2 MB  12 kB/s
                         data_sent......................: 9.6 MB  13 kB/s
                         http_req_blocked...............: avg=5.22ms   min=3.43µs  med=4.68µs   max=9.58s  p(90)=7.94µs   p(95)=9.4µs
                         http_req_connecting............: avg=1.75ms   min=0s      med=0s       max=3.6s   p(90)=0s       p(95)=0s
                    ✗ http_req_duration..............: avg=367.21ms min=8.2ms   med=164.25ms max=7.54s  p(90)=737.42ms p(95)=1.3s
                    { expected_response:true }...: avg=367.21ms min=8.2ms   med=164.25ms max=7.54s  p(90)=737.42ms p(95)=1.3s
                    http_req_failed................: 0.00%   ✓ 0     ✗ 38370
                    http_req_receiving.............: avg=7.06ms   min=14.51µs med=20.23µs  max=5.02s  p(90)=63.26µs  p(95)=529.69µs
                    http_req_sending...............: avg=5.92ms   min=11.42µs med=14.7µs   max=6.14s  p(90)=31.72µs  p(95)=44.48µs
                    http_req_tls_handshaking.......: avg=2.96ms   min=0s      med=0s       max=5.98s  p(90)=0s       p(95)=0s
                    http_req_waiting...............: avg=354.22ms min=8.15ms  med=163.93ms max=5.8s   p(90)=732.01ms p(95)=1.27s
                    http_reqs......................: 38370   52.493166/s
                    iteration_duration.............: avg=1.54s    min=1.01s   med=1.31s    max=13.27s p(90)=2.05s    p(95)=2.86s
                    iterations.....................: 38370   52.493166/s
                    vus............................: 4       min=1   max=140
                    vus_max........................: 140     min=140 max=140
                ```
        * 경로 조회
            * smoke test
                ```shell
                            /\      |‾‾| /‾‾/   /‾‾/
                      /\  /  \     |  |/  /   /  /
                      /  \/    \    |     (   /   ‾‾\
                      /          \   |  |\  \ |  (‾)  |
                      / __________ \  |__| \__\ \_____/ .io
                    
                      execution: local
                      script: path-smoke.js
                      output: -
                    
                      scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
                      * default: 1 looping VUs for 10s (gracefulStop: 30s)
                    
                    
                    running (10.3s), 0/1 VUs, 7 complete and 0 interrupted iterations
                    default ↓ [======================================] 1 VUs  10s
                    
                         ✓ logged in successfully
                         ✓ correct distance
                    
                         checks.........................: 100.00% ✓ 14  ✗ 0
                         data_received..................: 28 kB   2.8 kB/s
                         data_sent......................: 1.6 kB  154 B/s
                         http_req_blocked...............: avg=221.81ms min=7.49µs  med=7.93µs   max=1.55s    p(90)=621.06ms p(95)=1.08s
                         http_req_connecting............: avg=347.45µs min=0s      med=0s       max=2.43ms   p(90)=972.87µs p(95)=1.7ms
                    ✓ http_req_duration..............: avg=164.48ms min=161.9ms med=163.36ms max=169.43ms p(90)=167.47ms p(95)=168.45ms
                    { expected_response:true }...: avg=164.48ms min=161.9ms med=163.36ms max=169.43ms p(90)=167.47ms p(95)=168.45ms
                    http_req_failed................: 0.00%   ✓ 0   ✗ 7
                    http_req_receiving.............: avg=175.69µs min=63.82µs med=116.26µs max=369.21µs p(90)=356.3µs  p(95)=362.76µs
                    http_req_sending...............: avg=34.87µs  min=22.21µs med=25.06µs  max=83.29µs  p(90)=58.13µs  p(95)=70.71µs
                    http_req_tls_handshaking.......: avg=197.97ms min=0s      med=0s       max=1.38s    p(90)=554.32ms p(95)=970.06ms
                    http_req_waiting...............: avg=164.27ms min=161.8ms med=163.16ms max=169.34ms p(90)=167.2ms  p(95)=168.27ms
                    http_reqs......................: 7       0.67914/s
                    iteration_duration.............: avg=1.47s    min=1.22s   med=1.22s    max=2.77s    p(90)=1.94s    p(95)=2.36s
                    iterations.....................: 7       0.67914/s
                    vus............................: 1       min=1 max=1
                    vus_max........................: 1       min=1 max=1
                ``` 
            * load test
                ```shell
                            /\      |‾‾| /‾‾/   /‾‾/
                      /\  /  \     |  |/  /   /  /
                      /  \/    \    |     (   /   ‾‾\
                      /          \   |  |\  \ |  (‾)  |
                      / __________ \  |__| \__\ \_____/ .io
                    
                      execution: local
                      script: path-load.js
                      output: -
                    
                      scenarios: (100.00%) 1 scenario, 35 max VUs, 3m40s max duration (incl. graceful stop):
                      * default: Up to 35 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                    
                    
                    running (3m11.0s), 00/35 VUs, 3141 complete and 0 interrupted iterations
                    default ↓ [======================================] 03/35 VUs  3m10s
                    
                         ✓ logged in successfully
                         ✓ correct distance
                    
                         checks.........................: 100.00% ✓ 6282 ✗ 0
                         data_received..................: 11 MB   57 kB/s
                         data_sent......................: 557 kB  2.9 kB/s
                         http_req_blocked...............: avg=884.71µs min=3.94µs   med=7.26µs   max=858.44ms p(90)=9.02µs   p(95)=11.86µs
                         http_req_connecting............: avg=39.56µs  min=0s       med=0s       max=81.04ms  p(90)=0s       p(95)=0s
                    ✗ http_req_duration..............: avg=710.67ms min=104.99ms med=369.18ms max=2.05s    p(90)=1.52s    p(95)=1.63s
                    { expected_response:true }...: avg=710.67ms min=104.99ms med=369.18ms max=2.05s    p(90)=1.52s    p(95)=1.63s
                    http_req_failed................: 0.00%   ✓ 0    ✗ 3141
                    http_req_receiving.............: avg=343.66µs min=28.47µs  med=92.23µs  max=82.9ms   p(90)=443.02µs p(95)=587.09µs
                    http_req_sending...............: avg=47.91µs  min=11.23µs  med=22.3µs   max=77.64ms  p(90)=27.5µs   p(95)=33.37µs
                    http_req_tls_handshaking.......: avg=785.38µs min=0s       med=0s       max=697.03ms p(90)=0s       p(95)=0s
                    http_req_waiting...............: avg=710.28ms min=104.89ms med=368.88ms max=2.05s    p(90)=1.52s    p(95)=1.63s
                    http_reqs......................: 3141    16.44673/s
                    iteration_duration.............: avg=1.73s    min=1.12s    med=1.39s    max=3.07s    p(90)=2.55s    p(95)=2.66s
                    iterations.....................: 3141    16.44673/s
                    vus............................: 3       min=1  max=35
                    vus_max........................: 35      min=35 max=35
                ```
            * stress test
                ```shell
                            /\      |‾‾| /‾‾/   /‾‾/
                      /\  /  \     |  |/  /   /  /
                      /  \/    \    |     (   /   ‾‾\
                      /          \   |  |\  \ |  (‾)  |
                      / __________ \  |__| \__\ \_____/ .io
                    
                      execution: local
                      script: path-stress.js
                      output: -
                    
                      scenarios: (100.00%) 1 scenario, 140 max VUs, 12m40s max duration (incl. graceful stop):
                      * default: Up to 140 looping VUs for 12m10s over 9 stages (gracefulRampDown: 30s, gracefulStop: 30s)
                    
                    
                    running (12m39.6s), 000/140 VUs, 10045 complete and 23 interrupted iterations
                    default ↓ [======================================] 122/140 VUs  12m10s
                    
                         ✗ logged in successfully
                          ↳  97% — ✓ 9790 / ✗ 260
                         ✗ correct distance
                          ↳  97% — ✓ 9790 / ✗ 260
                    
                         checks.........................: 97.41% ✓ 19580 ✗ 520
                         data_received..................: 34 MB  45 kB/s
                         data_sent......................: 1.8 MB 2.4 kB/s
                         http_req_blocked...............: avg=1.11ms   min=4.01µs  med=7.43µs  max=1.18s    p(90)=9.13µs   p(95)=12.49µs
                         http_req_connecting............: avg=79.72µs  min=0s      med=0s      max=81.99ms  p(90)=0s       p(95)=0s
                    ✗ http_req_duration..............: avg=5.07s    min=98.94ms med=1.34s   max=39.27s   p(90)=8.7s     p(95)=35.69s
                    { expected_response:true }...: avg=4.4s     min=98.94ms med=1.3s    max=39.27s   p(90)=8.28s    p(95)=35.86s
                    http_req_failed................: 2.58%  ✓ 260   ✗ 9790
                    http_req_receiving.............: avg=312.33µs min=27.05µs med=89.84µs max=123.2ms  p(90)=376.83µs p(95)=486.9µs
                    http_req_sending...............: avg=63.6µs   min=9.97µs  med=23.87µs max=78.81ms  p(90)=28.7µs   p(95)=36.24µs
                    http_req_tls_handshaking.......: avg=954.43µs min=0s      med=0s      max=779.48ms p(90)=0s       p(95)=0s
                    http_req_waiting...............: avg=5.07s    min=98.82ms med=1.34s   max=39.27s   p(90)=8.7s     p(95)=35.69s
                    http_reqs......................: 10050  13.230704/s
                    iteration_duration.............: avg=6.08s    min=1.11s   med=2.37s   max=40.29s   p(90)=9.7s     p(95)=36.64s
                    iterations.....................: 10045  13.224122/s
                    vus............................: 2      min=1   max=140
                    vus_max........................: 140    min=140 max=140
                ```
