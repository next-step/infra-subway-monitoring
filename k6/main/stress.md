```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 250 max VUs, 3m10s max duration (incl. graceful stop):
           * default: Up to 250 looping VUs for 2m40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m40.9s), 000/250 VUs, 27875 complete and 0 interrupted iterations
default ✓ [======================================] 000/250 VUs  2m40s

     ✓ main connect successfully

   ✓ checks.........................: 100.00% ✓ 27875      ✗ 0
     data_received..................: 33 MB   207 kB/s
     data_sent......................: 1.3 MB  8.4 kB/s
     http_req_blocked...............: avg=55.3µs  min=2.52µs  med=2.92µs  max=30.7ms  p(90)=3.17µs   p(95)=3.33µs
     http_req_connecting............: avg=9.61µs  min=0s      med=0s      max=16.55ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=3.78ms  min=2.03ms  med=3.78ms  max=27.12ms p(90)=4.66ms   p(95)=5.15ms
       { expected_response:true }...: avg=3.78ms  min=2.03ms  med=3.78ms  max=27.12ms p(90)=4.66ms   p(95)=5.15ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 27875
     http_req_receiving.............: avg=87.77µs min=19.94µs med=59.85µs max=8.62ms  p(90)=144.61µs p(95)=208.28µs
     http_req_sending...............: avg=76.15µs min=31.32µs med=62.58µs max=14.32ms p(90)=104.43µs p(95)=128.88µs
     http_req_tls_handshaking.......: avg=39.79µs min=0s      med=0s      max=18.71ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=3.62ms  min=1.88ms  med=3.63ms  max=26.22ms p(90)=4.47ms   p(95)=4.94ms
     http_reqs......................: 27875   173.225554/s
     iteration_duration.............: avg=1s      min=1s      med=1s      max=1.03s   p(90)=1s       p(95)=1s
     iterations.....................: 27875   173.225554/s
     vus............................: 33      min=5        max=250
     vus_max........................: 250     min=250      max=250

```
