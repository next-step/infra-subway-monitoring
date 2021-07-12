```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: create_station_load_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 600 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 600 looping VUs for 1m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.8s), 000/600 VUs, 9667 complete and 0 interrupted iterations
default ✓ [======================================] 000/600 VUs  1m0s

     ✗ logged in successfully
      ↳  99% — ✓ 9592 / ✗ 75
     ✓ retrieved member
     ✗ created station successfully
      ↳  98% — ✓ 9425 / ✗ 163

     checks.........................: 99.17% ✓ 28605      ✗ 238
     data_received..................: 35 MB  580 kB/s
     data_sent......................: 9.8 MB 162 kB/s
     http_req_blocked...............: avg=4.82ms   min=0s       med=0s       max=319.72ms p(90)=21.17ms  p(95)=27.61ms
     http_req_connecting............: avg=1.12ms   min=0s       med=0s       max=181.97ms p(90)=4ms      p(95)=6.27ms
   ✗ http_req_duration..............: avg=193.88ms min=0s       med=103.29ms max=2.58s    p(90)=418.13ms p(95)=691.31ms
       { expected_response:true }...: avg=195.47ms min=10.44ms  med=105.22ms max=2.58s    p(90)=419.96ms p(95)=692.28ms
     http_req_failed................: 0.83%  ✓ 242        ✗ 28605
     http_req_receiving.............: avg=137.73µs min=0s       med=0s       max=38.41ms  p(90)=529µs    p(95)=996.4µs
     http_req_sending...............: avg=223.58µs min=0s       med=0s       max=128.3ms  p(90)=229.28µs p(95)=988.7µs
     http_req_tls_handshaking.......: avg=3.61ms   min=0s       med=0s       max=303.76ms p(90)=15.95ms  p(95)=21ms
     http_req_waiting...............: avg=193.52ms min=0s       med=102.94ms max=2.58s    p(90)=417.55ms p(95)=690.47ms
     http_reqs......................: 28847  474.682736/s
     iteration_duration.............: avg=1.8s     min=141.02ms med=1.48s    max=18.99s   p(90)=2.48s    p(95)=2.99s
     iterations.....................: 9667   159.072278/s
     vus............................: 18     min=10       max=599
     vus_max........................: 600    min=600      max=600

ERRO[0063] some thresholds have failed
```
