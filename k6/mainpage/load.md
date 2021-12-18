
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: load.js
output: -

scenarios: (100.00%) 1 scenario, 510 max VUs, 1m30s max duration (incl. graceful stop):
* default: Up to 510 looping VUs for 1m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.9s), 000/510 VUs, 14261 complete and 0 interrupted iterations
default ✓ [======================================] 000/510 VUs  1m0s

     ✓ page load success

     checks.........................: 100.00% ✓ 14261      ✗ 0    
     data_received..................: 17 MB   282 kB/s
     data_sent......................: 905 kB  15 kB/s
     http_req_blocked...............: avg=670.34µs min=110ns   med=1.02µs   max=45.54ms p(90)=1.13µs   p(95)=1.25µs  
     http_req_connecting............: avg=202.68µs min=0s      med=0s       max=24.61ms p(90)=0s       p(95)=0s      
✓ http_req_duration..............: avg=7.74ms   min=4.29ms  med=6.96ms   max=34.48ms p(90)=10.25ms  p(95)=14.98ms
{ expected_response:true }...: avg=7.74ms   min=4.29ms  med=6.96ms   max=34.48ms p(90)=10.25ms  p(95)=14.98ms
http_req_failed................: 0.00%   ✓ 0          ✗ 14261
http_req_receiving.............: avg=154.75µs min=12.16µs med=92.86µs  max=13.11ms p(90)=271.46µs p(95)=323.57µs
http_req_sending...............: avg=98.21µs  min=15.99µs med=101.35µs max=2.99ms  p(90)=136.86µs p(95)=170.24µs
http_req_tls_handshaking.......: avg=457.01µs min=0s      med=0s       max=39.79ms p(90)=0s       p(95)=0s      
http_req_waiting...............: avg=7.49ms   min=4.08ms  med=6.73ms   max=34.12ms p(90)=9.91ms   p(95)=14.62ms
http_reqs......................: 14261   234.144417/s
iteration_duration.............: avg=1s       min=1s      med=1s       max=1.05s   p(90)=1.01s    p(95)=1.02s   
iterations.....................: 14261   234.144417/s
vus............................: 28      min=10       max=509
vus_max........................: 510     min=510      max=510

