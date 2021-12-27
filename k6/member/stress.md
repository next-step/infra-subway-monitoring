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


running (2m43.0s), 000/250 VUs, 9320 complete and 0 interrupted iterations
default ✓ [======================================] 000/250 VUs  2m40s

     ✓ login success
     ✓ mypage success
     ✓ memberUpdate success

   ✓ checks.........................: 100.00% ✓ 27960     ✗ 0
     data_received..................: 15 MB   93 kB/s
     data_sent......................: 4.3 MB  26 kB/s
     http_req_blocked...............: avg=65.76µs  min=2.46µs med=2.9µs   max=51.93ms  p(90)=3.18µs   p(95)=3.61µs
     http_req_connecting............: avg=10.11µs  min=0s     med=0s      max=19.67ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=8.39ms   min=16.3µs med=6.75ms  max=185.08ms p(90)=13.77ms  p(95)=19.75ms
       { expected_response:true }...: avg=8.39ms   min=16.3µs med=6.75ms  max=185.08ms p(90)=13.77ms  p(95)=19.75ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 27960
     http_req_receiving.............: avg=314.96µs min=16.3µs med=64.76µs max=64.09ms  p(90)=495.05µs p(95)=929.17µs
     http_req_sending...............: avg=209.95µs min=0s     med=86.26µs max=47.35ms  p(90)=255.25µs p(95)=545.06µs
     http_req_tls_handshaking.......: avg=44.35µs  min=0s     med=0s      max=30.85ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=7.87ms   min=0s     med=6.45ms  max=181.95ms p(90)=12.95ms  p(95)=18.03ms
     http_reqs......................: 27960   171.5164/s
     iteration_duration.............: avg=3.03s    min=3.01s  med=3.02s   max=3.2s     p(90)=3.04s    p(95)=3.06s
     iterations.....................: 9320    57.172133/s
     vus............................: 1       min=1       max=250
     vus_max........................: 250     min=250     max=250

```
