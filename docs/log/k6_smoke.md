```
$ k6 run --out influxdb=http://localhost:8086/k6 smoke.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 2 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 2 looping VUs for 10m0s (gracefulStop: 30s)


running (10m00.5s), 0/2 VUs, 1180 complete and 0 interrupted iterations
default ✗ [======================================] 2 VUs  10m0s

     ✓ lending page running
     ✓ logged in successfully

     checks.........................: 100.00% ✓ 2360     ✗ 0
     data_received..................: 2.0 MB  3.3 kB/s
     data_sent......................: 421 kB  700 B/s
     http_req_blocked...............: avg=120.79µs min=1.13µs  med=2.84µs  max=114.45ms p(90)=5.27µs   p(95)=6.03µs
     http_req_connecting............: avg=1.37µs   min=0s      med=0s      max=869.91µs p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=8.27ms   min=1.27ms  med=7.98ms  max=79.46ms  p(90)=16.1ms   p(95)=20.77ms
       { expected_response:true }...: avg=8.27ms   min=1.27ms  med=7.98ms  max=79.46ms  p(90)=16.1ms   p(95)=20.77ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 2360
     http_req_receiving.............: avg=73.29µs  min=19.45µs med=55.92µs max=5.66ms   p(90)=104.48µs p(95)=152.43µs
     http_req_sending...............: avg=20.55µs  min=6.37µs  med=16.51µs max=562.57µs p(90)=26.29µs  p(95)=31.94µs
     http_req_tls_handshaking.......: avg=92.54µs  min=0s      med=0s      max=98.24ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=8.17ms   min=1.22ms  med=7.92ms  max=79.27ms  p(90)=15.94ms  p(95)=20.6ms
     http_reqs......................: 2360    3.930314/s
     iteration_duration.............: avg=1.01s    min=1s      med=1.01s   max=1.14s    p(90)=1.02s    p(95)=1.03s
     iterations.....................: 1180    1.965157/s
     vus............................: 2       min=2      max=2
     vus_max........................: 2       min=2      max=2
```
