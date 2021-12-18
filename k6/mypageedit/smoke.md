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


running (10.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ 로그인페이지_응답 load success
     ✓ 로그인_요청_응답 load success
     ✓ 수정페이지_응답 load success
     ✓ 내정보_수정_응답 load success

     checks.........................: 100.00% ✓ 40       ✗ 0  
     data_received..................: 29 kB   2.8 kB/s
     data_sent......................: 5.4 kB  513 B/s
     http_req_blocked...............: avg=1.06ms   min=247ns   med=1.12µs   max=42.66ms  p(90)=1.23µs   p(95)=1.3µs   
     http_req_connecting............: avg=192.9µs  min=0s      med=0s       max=7.71ms   p(90)=0s       p(95)=0s      
✓ http_req_duration..............: avg=10.12ms  min=6.7ms   med=10.35ms  max=31.06ms  p(90)=11.15ms  p(95)=13.22ms
{ expected_response:true }...: avg=10.12ms  min=6.7ms   med=10.35ms  max=31.06ms  p(90)=11.15ms  p(95)=13.22ms
http_req_failed................: 0.00%   ✓ 0        ✗ 40
http_req_receiving.............: avg=132.6µs  min=43.59µs med=110.54µs max=327.48µs p(90)=255.94µs p(95)=274.44µs
http_req_sending...............: avg=124.87µs min=34.83µs med=118.2µs  max=370.56µs p(90)=165.95µs p(95)=171.92µs
http_req_tls_handshaking.......: avg=490.68µs min=0s      med=0s       max=19.62ms  p(90)=0s       p(95)=0s      
http_req_waiting...............: avg=9.86ms   min=6.56ms  med=10.01ms  max=30.77ms  p(90)=10.86ms  p(95)=13.05ms
http_reqs......................: 40      3.821119/s
iteration_duration.............: avg=1.04s    min=1.03s   med=1.03s    max=1.1s     p(90)=1.05s    p(95)=1.07s   
iterations.....................: 10      0.95528/s
vus............................: 1       min=1      max=1
vus_max........................: 1       min=1      max=1
