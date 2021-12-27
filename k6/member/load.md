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


running (1m03.0s), 000/130 VUs, 1522 complete and 0 interrupted iterations
default ✓ [======================================] 000/130 VUs  1m0s

     ✓ login success
     ✓ mypage success
     ✓ memberUpdate success

   ✓ checks.........................: 100.00% ✓ 4566      ✗ 0
     data_received..................: 2.9 MB  46 kB/s
     data_sent......................: 750 kB  12 kB/s
     http_req_blocked...............: avg=164.93µs min=2.61µs  med=2.98µs  max=23.7ms  p(90)=3.29µs   p(95)=17.34µs
     http_req_connecting............: avg=26.25µs  min=0s      med=0s      max=1.72ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=6.63ms   min=2.35ms  med=6.48ms  max=48.5ms  p(90)=9.85ms   p(95)=11.76ms
       { expected_response:true }...: avg=6.63ms   min=2.35ms  med=6.48ms  max=48.5ms  p(90)=9.85ms   p(95)=11.76ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 4566
     http_req_receiving.............: avg=108.74µs min=19.5µs  med=59.65µs max=6.45ms  p(90)=170.38µs p(95)=292.08µs
     http_req_sending...............: avg=124.32µs min=45.71µs med=93.46µs max=7.17ms  p(90)=152.35µs p(95)=207.39µs
     http_req_tls_handshaking.......: avg=124.72µs min=0s      med=0s      max=19.09ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=6.39ms   min=96.6µs  med=6.25ms  max=48.17ms p(90)=9.53ms   p(95)=11.39ms
     http_reqs......................: 4566    72.460559/s
     iteration_duration.............: avg=3.02s    min=3.01s   med=3.02s   max=3.09s   p(90)=3.03s    p(95)=3.03s
     iterations.....................: 1522    24.15352/s
     vus............................: 1       min=1       max=130
     vus_max........................: 130     min=130     max=130

```
