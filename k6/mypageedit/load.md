
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load.js
output: -

scenarios: (100.00%) 1 scenario, 255 max VUs, 1m30s max duration (incl. graceful stop):
* default: Up to 255 looping VUs for 1m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.5s), 000/255 VUs, 6456 complete and 0 interrupted iterations
default ✓ [======================================] 000/255 VUs  1m0s

     ✓ 로그인페이지_응답 load success
     ✓ 로그인_요청_응답 load success
     ✓ 수정페이지_응답 load success
     ✓ 내정보_수정_응답 load success

     checks.........................: 100.00% ✓ 25824      ✗ 0    
     data_received..................: 17 MB   279 kB/s
     data_sent......................: 3.2 MB  54 kB/s
     http_req_blocked...............: avg=203.11µs min=145ns   med=982ns    max=42.88ms p(90)=1.18µs   p(95)=1.22µs  
     http_req_connecting............: avg=71.26µs  min=0s      med=0s       max=22.42ms p(90)=0s       p(95)=0s      
✓ http_req_duration..............: avg=8.53ms   min=4.18ms  med=8.09ms   max=59.53ms p(90)=11.41ms  p(95)=13.33ms
{ expected_response:true }...: avg=8.53ms   min=4.18ms  med=8.09ms   max=59.53ms p(90)=11.41ms  p(95)=13.33ms
http_req_failed................: 0.00%   ✓ 0          ✗ 25824
http_req_receiving.............: avg=171.73µs min=10.14µs med=87.59µs  max=24.34ms p(90)=299.95µs p(95)=428.69µs
http_req_sending...............: avg=113.28µs min=16.6µs  med=102.38µs max=10.78ms p(90)=158.15µs p(95)=184.33µs
http_req_tls_handshaking.......: avg=127.67µs min=0s      med=0s       max=34.52ms p(90)=0s       p(95)=0s      
http_req_waiting...............: avg=8.25ms   min=2ms     med=7.81ms   max=55.09ms p(90)=11.08ms  p(95)=12.88ms
http_reqs......................: 25824   426.739931/s
iteration_duration.............: avg=1.03s    min=1.02s   med=1.03s    max=1.1s    p(90)=1.04s    p(95)=1.05s   
iterations.....................: 6456    106.684983/s
vus............................: 14      min=5        max=255
vus_max........................: 255     min=255      max=255
