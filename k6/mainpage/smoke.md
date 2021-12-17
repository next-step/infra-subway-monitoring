
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


running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ page load success

     checks.........................: 100.00% ✓ 10      ✗ 0  
     data_received..................: 15 kB   1.5 kB/s
     data_sent......................: 1.0 kB  99 B/s
     http_req_blocked...............: avg=3.57ms   min=232ns   med=1.08µs   max=35.71ms  p(90)=3.57ms   p(95)=19.64ms 
     http_req_connecting............: avg=518.68µs min=0s      med=0s       max=5.18ms   p(90)=518.68µs p(95)=2.85ms  
✓ http_req_duration..............: avg=9.68ms   min=7.94ms  med=8.98ms   max=17.63ms  p(90)=10.25ms  p(95)=13.94ms
{ expected_response:true }...: avg=9.68ms   min=7.94ms  med=8.98ms   max=17.63ms  p(90)=10.25ms  p(95)=13.94ms
http_req_failed................: 0.00%   ✓ 0       ✗ 10
http_req_receiving.............: avg=92.79µs  min=39.6µs  med=94.14µs  max=152.3µs  p(90)=136.27µs p(95)=144.28µs
http_req_sending...............: avg=113.58µs min=46.37µs med=130.36µs max=203.84µs p(90)=144.78µs p(95)=174.31µs
http_req_tls_handshaking.......: avg=1.78ms   min=0s      med=0s       max=17.88ms  p(90)=1.78ms   p(95)=9.83ms  
http_req_waiting...............: avg=9.47ms   min=7.84ms  med=8.8ms    max=17.32ms  p(90)=10.02ms  p(95)=13.67ms
http_reqs......................: 10      0.98582/s
iteration_duration.............: avg=1.01s    min=1s      med=1.01s    max=1.05s    p(90)=1.01s    p(95)=1.03s   
iterations.....................: 10      0.98582/s
vus............................: 1       min=1     max=1
vus_max........................: 1       min=1     max=1

