- 경로 조회 시 현재 문제가 발생되는 것으로 추정
  - 로그 확인 시 쿼리 문제 확인
```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (12.1s), 0/1 VUs, 3 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved path

     checks.....................: 100.00% ✓ 6        ✗ 0
     data_received..............: 1.6 kB  135 B/s
     data_sent..................: 1.3 kB  109 B/s
     http_req_blocked...........: avg=694.31µs min=5.37µs  med=7.05µs   max=4.13ms   p(90)=2.07ms   p(95)=3.1ms
     http_req_connecting........: avg=141.49µs min=0s      med=0s       max=848.97µs p(90)=424.48µs p(95)=636.72µs
   ✗ http_req_duration..........: avg=1.51s    min=5.48ms  med=1.51s    max=3.01s    p(90)=3.01s    p(95)=3.01s
     http_req_failed............: 100.00% ✓ 6        ✗ 0
     http_req_receiving.........: avg=134.03µs min=90.94µs med=123.93µs max=201.94µs p(90)=175µs    p(95)=188.47µs
     http_req_sending...........: avg=40.65µs  min=15.81µs med=33.56µs  max=88.09µs  p(90)=70.56µs  p(95)=79.32µs
     http_req_tls_handshaking...: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...........: avg=1.51s    min=5.32ms  med=1.51s    max=3.01s    p(90)=3.01s    p(95)=3.01s
     http_reqs..................: 6       0.496537/s
     iteration_duration.........: avg=4.02s    min=4.02s   med=4.02s    max=4.03s    p(90)=4.03s    p(95)=4.03s
     iterations.................: 3       0.248269/s
     vus........................: 1       min=1      max=1
     vus_max....................: 1       min=1      max=1

ERRO[0013] some thresholds have failed
```
- 소스 수정 후 정상 확인
```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.4s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved path

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 9.2 kB  881 B/s
     data_sent......................: 4.4 kB  423 B/s
     http_req_blocked...............: avg=216.55µs min=5.26µs   med=7.19µs   max=4.19ms   p(90)=9.4µs   p(95)=218.71µs
     http_req_connecting............: avg=47.83µs  min=0s       med=0s       max=956.68µs p(90)=0s      p(95)=47.83µs
   ✓ http_req_duration..............: avg=18.66ms  min=7.19ms   med=21.59ms  max=36.29ms  p(90)=30.07ms p(95)=30.93ms
       { expected_response:true }...: avg=28.68ms  min=25.41ms  med=28.28ms  max=36.29ms  p(90)=31.22ms p(95)=33.75ms
     http_req_failed................: 50.00%  ✓ 10       ✗ 10
     http_req_receiving.............: avg=807.93µs min=180.71µs med=556.53µs max=3.91ms   p(90)=1.42ms  p(95)=2.65ms
     http_req_sending...............: avg=34.86µs  min=17.54µs  med=33.4µs   max=93.33µs  p(90)=55.3µs  p(95)=83.22µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=17.82ms  min=6.81ms   med=21.02ms  max=32.32ms  p(90)=28.6ms  p(95)=29.38ms
     http_reqs......................: 20      1.924719/s
     iteration_duration.............: avg=1.03s    min=1.03s    med=1.03s    max=1.05s    p(90)=1.04s   p(95)=1.04s
     iterations.....................: 10      0.962359/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```