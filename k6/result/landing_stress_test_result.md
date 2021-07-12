```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: landing_stress_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 1m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.9s), 000/100 VUs, 2918 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  1m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 5836      ✗ 0
     data_received..................: 2.5 MB  40 kB/s
     data_sent......................: 1.5 MB  25 kB/s
     http_req_blocked...............: avg=283.61µs min=0s      med=0s      max=218.97ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=72.56µs  min=0s      med=0s      max=16.51ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=17.61ms  min=10.43ms med=16.65ms max=92.17ms  p(90)=23.1ms  p(95)=26.52ms
       { expected_response:true }...: avg=17.61ms  min=10.43ms med=16.65ms max=92.17ms  p(90)=23.1ms  p(95)=26.52ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5836
     http_req_receiving.............: avg=113.31µs min=0s      med=0s      max=1.43ms   p(90)=522.5µs p(95)=892.07µs
     http_req_sending...............: avg=21.94µs  min=0s      med=0s      max=1.03ms   p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=205.05µs min=0s      med=0s      max=201.05ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=17.48ms  min=10.22ms med=16.51ms max=92.17ms  p(90)=23.06ms p(95)=26.44ms
     http_reqs......................: 5836    95.761251/s
     iteration_duration.............: avg=1.04s    min=1.02s   med=1.04s   max=1.26s    p(90)=1.04s   p(95)=1.05s
     iterations.....................: 2918    47.880625/s
     vus............................: 5       min=2       max=100
     vus_max........................: 100     min=100     max=100
```
