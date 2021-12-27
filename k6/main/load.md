```


          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 130 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 130 looping VUs for 1m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m01.0s), 000/130 VUs, 4442 complete and 0 interrupted iterations
default ✓ [======================================] 000/130 VUs  1m0s

     ✓ main connect successfully

   ✓ checks.........................: 100.00% ✓ 4442      ✗ 0
     data_received..................: 5.7 MB  94 kB/s
     data_sent......................: 267 kB  4.4 kB/s
     http_req_blocked...............: avg=168.01µs min=2.61µs  med=2.95µs  max=20.42ms p(90)=3.28µs   p(95)=6.62µs
     http_req_connecting............: avg=28.44µs  min=0s      med=0s      max=2.27ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=3.49ms   min=2.09ms  med=3.4ms   max=16.42ms p(90)=4.41ms   p(95)=4.68ms
       { expected_response:true }...: avg=3.49ms   min=2.09ms  med=3.4ms   max=16.42ms p(90)=4.41ms   p(95)=4.68ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 4442
     http_req_receiving.............: avg=75.19µs  min=25.52µs med=61.66µs max=1.5ms   p(90)=110.3µs  p(95)=152.88µs
     http_req_sending...............: avg=81.2µs   min=36.08µs med=67.67µs max=3.92ms  p(90)=117.76µs p(95)=134.65µs
     http_req_tls_handshaking.......: avg=129.33µs min=0s      med=0s      max=16.37ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=3.34ms   min=1.87ms  med=3.22ms  max=16.13ms p(90)=4.23ms   p(95)=4.48ms
     http_reqs......................: 4442    72.831509/s
     iteration_duration.............: avg=1s       min=1s      med=1s      max=1.03s   p(90)=1s       p(95)=1s
     iterations.....................: 4442    72.831509/s
     vus............................: 34      min=3       max=130
     vus_max........................: 130     min=130     max=130

```
