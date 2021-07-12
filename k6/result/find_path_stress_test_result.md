```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: find_path_stress_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 1m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.5s), 000/100 VUs, 2857 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  1m0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path successfully

     checks.........................: 100.00% ✓ 8571       ✗ 0
     data_received..................: 3.0 MB  49 kB/s
     data_sent......................: 2.0 MB  33 kB/s
     http_req_blocked...............: avg=275.62µs min=0s      med=0s      max=519.17ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=44.57µs  min=0s      med=0s      max=10.06ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=18.71ms  min=10.42ms med=17.46ms max=77.86ms  p(90)=25.23ms p(95)=29.2ms
       { expected_response:true }...: avg=18.71ms  min=10.42ms med=17.46ms max=77.86ms  p(90)=25.23ms p(95)=29.2ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 8571
     http_req_receiving.............: avg=139.17µs min=0s      med=0s      max=3.55ms   p(90)=561.6µs p(95)=892.95µs
     http_req_sending...............: avg=21.62µs  min=0s      med=0s      max=1.98ms   p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=196.32µs min=0s      med=0s      max=265.56ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=18.55ms  min=10.31ms med=17.34ms max=77.86ms  p(90)=25.12ms p(95)=29.05ms
     http_reqs......................: 8571    141.622167/s
     iteration_duration.............: avg=1.06s    min=1.04s   med=1.05s   max=1.6s     p(90)=1.07s   p(95)=1.08s
     iterations.....................: 2857    47.207389/s
     vus............................: 6       min=2        max=100
     vus_max........................: 100     min=100      max=100
```
