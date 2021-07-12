```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: create_station_smoke_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.8s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ created station successfully

     checks.........................: 100.00% ✓ 30       ✗ 0
     data_received..................: 16 kB   1.5 kB/s
     data_sent......................: 8.0 kB  742 B/s
     http_req_blocked...............: avg=4.26ms   min=0s      med=0s      max=127.86ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=135.99µs min=0s      med=0s      max=4.07ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=17.45ms  min=12.96ms med=17.45ms max=26.93ms  p(90)=20.6ms   p(95)=22.85ms
       { expected_response:true }...: avg=17.45ms  min=12.96ms med=17.45ms max=26.93ms  p(90)=20.6ms   p(95)=22.85ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 30
     http_req_receiving.............: avg=170.71µs min=0s      med=0s      max=1.99ms   p(90)=600.85µs p(95)=993.97µs
     http_req_sending...............: avg=50.7µs   min=0s      med=0s      max=997.9µs  p(90)=0s       p(95)=287.81µs
     http_req_tls_handshaking.......: avg=3.91ms   min=0s      med=0s      max=117.56ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=17.23ms  min=12.51ms med=17.2ms  max=24.94ms  p(90)=20.5ms   p(95)=21.81ms
     http_reqs......................: 30      2.790594/s
     iteration_duration.............: avg=1.07s    min=1.05s   med=1.06s   max=1.2s     p(90)=1.08s    p(95)=1.14s
     iterations.....................: 10      0.930198/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```
