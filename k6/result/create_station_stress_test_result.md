```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: create_station_stress_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 1m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.5s), 000/100 VUs, 2863 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  1m0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ created station successfully

     checks.........................: 100.00% ✓ 8589       ✗ 0
     data_received..................: 3.7 MB  61 kB/s
     data_sent......................: 2.2 MB  37 kB/s
     http_req_blocked...............: avg=286.49µs min=0s      med=0s      max=239.9ms  p(90)=0s       p(95)=0s
     http_req_connecting............: avg=50.44µs  min=0s      med=0s      max=14.73ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=18.48ms  min=10.38ms med=17.41ms max=79.34ms  p(90)=24.4ms   p(95)=28.02ms
       { expected_response:true }...: avg=18.48ms  min=10.38ms med=17.41ms max=79.34ms  p(90)=24.4ms   p(95)=28.02ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 8589
     http_req_receiving.............: avg=139.79µs min=0s      med=0s      max=14.95ms  p(90)=552.08µs p(95)=967.25µs
     http_req_sending...............: avg=33.76µs  min=0s      med=0s      max=3.19ms   p(90)=0s       p(95)=87.93µs
     http_req_tls_handshaking.......: avg=226.84µs min=0s      med=0s      max=222.21ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=18.3ms   min=10.38ms med=17.21ms max=79.34ms  p(90)=24.16ms  p(95)=27.89ms
     http_reqs......................: 8589    141.959956/s
     iteration_duration.............: avg=1.06s    min=1.04s   med=1.05s   max=1.31s    p(90)=1.07s    p(95)=1.08s
     iterations.....................: 2863    47.319985/s
     vus............................: 5       min=2        max=100
     vus_max........................: 100     min=100      max=100
```
