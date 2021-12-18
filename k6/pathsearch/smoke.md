
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


running (11.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 로그인페이지_응답 load success
     ✓ 로그인_요청_응답 load success
     ✓ 경로검색_페이지_응답 load success
     ✓ 경로_검색_응답 load success
     ✓ 경로_좋아요_응답 load success

     checks.........................: 100.00% ✓ 50       ✗ 0  
     data_received..................: 66 kB   5.9 kB/s
     data_sent......................: 7.2 kB  646 B/s
     http_req_blocked...............: avg=1.14ms   min=208ns   med=752ns    max=57.16ms  p(90)=1.19µs   p(95)=1.2µs   
     http_req_connecting............: avg=124.69µs min=0s      med=0s       max=6.23ms   p(90)=0s       p(95)=0s      
✓ http_req_duration..............: avg=19.68ms  min=6.94ms  med=10.71ms  max=131.07ms p(90)=47.64ms  p(95)=52.77ms
{ expected_response:true }...: avg=21.78ms  min=6.94ms  med=10.35ms  max=131.07ms p(90)=48.25ms  p(95)=54.58ms
http_req_failed................: 20.00%  ✓ 10       ✗ 40
http_req_receiving.............: avg=171.78µs min=24.53µs med=127.19µs max=694.43µs p(90)=325.75µs p(95)=364.35µs
http_req_sending...............: avg=93.99µs  min=25.28µs med=99.03µs  max=214.96µs p(90)=158.98µs p(95)=184.17µs
http_req_tls_handshaking.......: avg=866.73µs min=0s      med=0s       max=43.33ms  p(90)=0s       p(95)=0s      
http_req_waiting...............: avg=19.41ms  min=6.85ms  med=10.32ms  max=130.81ms p(90)=47.49ms  p(95)=52.59ms
http_reqs......................: 50      4.519187/s
iteration_duration.............: avg=1.1s     min=1.08s   med=1.08s    max=1.26s    p(90)=1.11s    p(95)=1.18s   
iterations.....................: 10      0.903837/s
vus............................: 1       min=1      max=1
vus_max........................: 1       min=1      max=1
