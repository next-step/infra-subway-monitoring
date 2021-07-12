```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: find_path_smoke_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.9s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path successfully

     checks.........................: 100.00% ✓ 30       ✗ 0
     data_received..................: 13 kB   1.2 kB/s
     data_sent......................: 7.2 kB  663 B/s
     http_req_blocked...............: avg=4.46ms   min=0s      med=0s      max=133.97ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=156.76µs min=0s      med=0s      max=4.7ms    p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=22.83ms  min=14.01ms med=21.35ms max=75.21ms  p(90)=27.02ms  p(95)=27.95ms
       { expected_response:true }...: avg=22.83ms  min=14.01ms med=21.35ms max=75.21ms  p(90)=27.02ms  p(95)=27.95ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 30
     http_req_receiving.............: avg=137.92µs min=0s      med=0s      max=999.1µs  p(90)=546.61µs p(95)=806.05µs
     http_req_sending...............: avg=26.48µs  min=0s      med=0s      max=794.4µs  p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=3.91ms   min=0s      med=0s      max=117.52ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=22.66ms  min=14.01ms med=20.94ms max=75.21ms  p(90)=27.02ms  p(95)=27.95ms
     http_reqs......................: 30      2.748292/s
     iteration_duration.............: avg=1.09s    min=1.05s   med=1.07s   max=1.21s    p(90)=1.13s    p(95)=1.17s
     iterations.....................: 10      0.916097/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```
