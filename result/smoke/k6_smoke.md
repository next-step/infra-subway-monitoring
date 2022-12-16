```shell
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: InfluxDBv1 (http://tech-pro.jimbae.com:8086)

  scenarios: (100.00%) 1 scenario, 1 max VUs, 1m30s max duration (incl. graceful stop):
           * default: 1 looping VUs for 1m0s (gracefulStop: 30s)


running (1m01.1s), 0/1 VUs, 51 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  1m0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path
     ✓ retrieved main

     checks.........................: 100.00% ✓ 204      ✗ 0  
     data_received..................: 194 kB  3.2 kB/s
     data_sent......................: 49 kB   794 B/s
     http_req_blocked...............: avg=247.44µs min=2µs    med=7µs     max=48.98ms  p(90)=12µs     p(95)=14µs    
     http_req_connecting............: avg=57.17µs  min=0s     med=0s      max=11.66ms  p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=48.65ms  min=9.31ms med=17.61ms max=494.56ms p(90)=126.24ms p(95)=161.86ms
       { expected_response:true }...: avg=48.65ms  min=9.31ms med=17.61ms max=494.56ms p(90)=126.24ms p(95)=161.86ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 204
     http_req_receiving.............: avg=129.19µs min=32µs   med=131µs   max=428µs    p(90)=183µs    p(95)=196.85µs
     http_req_sending...............: avg=37.85µs  min=9µs    med=36µs    max=85µs     p(90)=59.7µs   p(95)=66µs    
     http_req_tls_handshaking.......: avg=175.51µs min=0s     med=0s      max=35.8ms   p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=48.48ms  min=9.1ms  med=17.47ms max=494.43ms p(90)=126.06ms p(95)=161.67ms
     http_reqs......................: 204     3.33941/s
     iteration_duration.............: avg=1.19s    min=1.12s  med=1.15s   max=1.95s    p(90)=1.26s    p(95)=1.36s   
     iterations.....................: 51      0.834853/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```