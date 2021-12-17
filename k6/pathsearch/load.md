
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load.js
output: -

scenarios: (100.00%) 1 scenario, 238 max VUs, 1m30s max duration (incl. graceful stop):
* default: Up to 238 looping VUs for 1m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.9s), 000/238 VUs, 4429 complete and 0 interrupted iterations
default ✓ [======================================] 000/238 VUs  1m0s

     ✓ 로그인페이지_응답 load success
     ✓ 로그인_요청_응답 load success
     ✓ 경로검색_페이지_응답 load success
     ✓ 경로_검색_응답 load success
     ✓ 경로_좋아요_응답 load success

     checks.........................: 100.00% ✓ 22145      ✗ 0    
     data_received..................: 28 MB   461 kB/s
     data_sent......................: 3.0 MB  50 kB/s
     http_req_blocked...............: avg=223.12µs min=144ns   med=1.07µs   max=40.81ms p(90)=1.2µs    p(95)=1.23µs  
     http_req_connecting............: avg=71.27µs  min=0s      med=0s       max=19.24ms p(90)=0s       p(95)=0s      
✓ http_req_duration..............: avg=92.09ms  min=4.51ms  med=13.04ms  max=1.63s   p(90)=321.35ms p(95)=411.79ms
{ expected_response:true }...: avg=84.46ms  min=4.51ms  med=11.58ms  max=1.36s   p(90)=305.82ms p(95)=403.53ms
http_req_failed................: 20.00%  ✓ 4429       ✗ 17716
http_req_receiving.............: avg=530.46µs min=14.3µs  med=122.93µs max=77.49ms p(90)=529.93µs p(95)=1.25ms  
http_req_sending...............: avg=117.36µs min=17.94µs med=111.42µs max=12.03ms p(90)=152.56µs p(95)=171.35µs
http_req_tls_handshaking.......: avg=147.16µs min=0s      med=0s       max=33.73ms p(90)=0s       p(95)=0s      
http_req_waiting...............: avg=91.44ms  min=2.7ms   med=12.59ms  max=1.63s   p(90)=319.7ms  p(95)=410.42ms
http_reqs......................: 22145   363.635365/s
iteration_duration.............: avg=1.46s    min=1.06s   med=1.21s    max=3.42s   p(90)=2.14s    p(95)=2.35s   
iterations.....................: 4429    72.727073/s
vus............................: 14      min=5        max=238
vus_max........................: 238     min=238      max=238
