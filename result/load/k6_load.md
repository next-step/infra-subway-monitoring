```shell
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: InfluxDBv1 (http://tech-pro.jimbae.com:8086)

  scenarios: (100.00%) 1 scenario, 4 max VUs, 10m30s max duration (incl. graceful stop):
           * default: Up to 4 looping VUs for 10m0s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (10m00.4s), 0/4 VUs, 1279 complete and 0 interrupted iterations
default ✓ [======================================] 0/4 VUs  10m0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path
     ✓ retrieved main

     checks.........................: 100.00% ✓ 5116     ✗ 0   
     data_received..................: 4.8 MB  8.0 kB/s
     data_sent......................: 1.2 MB  2.0 kB/s
     http_req_blocked...............: avg=77.41µs  min=1µs    med=7µs     max=74.25ms  p(90)=12µs     p(95)=14µs    
     http_req_connecting............: avg=17.71µs  min=0s     med=0s      max=19.84ms  p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=42.98ms  min=6.6ms  med=13.8ms  max=909.68ms p(90)=131.48ms p(95)=168.23ms
       { expected_response:true }...: avg=42.98ms  min=6.6ms  med=13.8ms  max=909.68ms p(90)=131.48ms p(95)=168.23ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 5116
     http_req_receiving.............: avg=119.62µs min=17µs   med=116µs   max=2.41ms   p(90)=177µs    p(95)=192µs   
     http_req_sending...............: avg=38.35µs  min=5µs    med=34µs    max=1.56ms   p(90)=61µs     p(95)=70µs    
     http_req_tls_handshaking.......: avg=45.31µs  min=0s     med=0s      max=54.06ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=42.82ms  min=6.47ms med=13.63ms max=909.6ms  p(90)=131.32ms p(95)=168.06ms
     http_reqs......................: 5116    8.520768/s
     iteration_duration.............: avg=1.17s    min=1.09s  med=1.15s   max=1.95s    p(90)=1.24s    p(95)=1.29s   
     iterations.....................: 1279    2.130192/s
     vus............................: 2       min=1      max=4 
     vus_max........................: 4       min=4      max=4 

```