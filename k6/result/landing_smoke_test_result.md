```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: landing_smoke_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.6s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 20       ✗ 0
     data_received..................: 11 kB   1.1 kB/s
     data_sent......................: 5.5 kB  523 B/s
     http_req_blocked...............: avg=6.24ms   min=0s      med=0s      max=124.84ms p(90)=0s       p(95)=6.24ms
     http_req_connecting............: avg=166.58µs min=0s      med=0s      max=3.33ms   p(90)=0s       p(95)=166.59µs
   ✓ http_req_duration..............: avg=17.69ms  min=14.96ms med=17.46ms max=23.2ms   p(90)=19.58ms  p(95)=20.1ms
       { expected_response:true }...: avg=17.69ms  min=14.96ms med=17.46ms max=23.2ms   p(90)=19.58ms  p(95)=20.1ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 20
     http_req_receiving.............: avg=180.1µs  min=0s      med=0s      max=1.51ms   p(90)=623.96µs p(95)=1.02ms
     http_req_sending...............: avg=67µs     min=0s      med=0s      max=996.5µs  p(90)=34.35µs  p(95)=376.15µs
     http_req_tls_handshaking.......: avg=5.85ms   min=0s      med=0s      max=117.08ms p(90)=0s       p(95)=5.85ms
     http_req_waiting...............: avg=17.44ms  min=14.61ms med=17.32ms max=23.2ms   p(90)=19.04ms  p(95)=20.1ms
     http_reqs......................: 20      1.890951/s
     iteration_duration.............: avg=1.05s    min=1.03s   med=1.04s   max=1.17s    p(90)=1.06s    p(95)=1.11s
     iterations.....................: 10      0.945475/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```
