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


running (1m02.0s), 000/130 VUs, 2241 complete and 0 interrupted iterations
default ✓ [======================================] 000/130 VUs  1m0s

     ✓ pathPage success
     ✓ getPath success

   ✓ checks.........................: 100.00% ✓ 4482      ✗ 0
     data_received..................: 4.6 MB  73 kB/s
     data_sent......................: 272 kB  4.4 kB/s
     http_req_blocked...............: avg=168.43µs min=2.39µs  med=2.96µs  max=20.98ms p(90)=3.28µs   p(95)=11.98µs
     http_req_connecting............: avg=28.44µs  min=0s      med=0s      max=5.78ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=8.58ms   min=2.22ms  med=8.42ms  max=52.52ms p(90)=15.35ms  p(95)=19.14ms
       { expected_response:true }...: avg=8.58ms   min=2.22ms  med=8.42ms  max=52.52ms p(90)=15.35ms  p(95)=19.14ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 4482
     http_req_receiving.............: avg=141.08µs min=23.21µs med=69.3µs  max=8.49ms  p(90)=224.32µs p(95)=425.73µs
     http_req_sending...............: avg=101.54µs min=36.58µs med=77.35µs max=8.12ms  p(90)=133.82µs p(95)=172.01µs
     http_req_tls_handshaking.......: avg=127.57µs min=0s      med=0s      max=17.1ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=8.34ms   min=63.64µs med=8.24ms  max=52.37ms p(90)=14.91ms  p(95)=18.71ms
     http_reqs......................: 4482    72.27893/s
     iteration_duration.............: avg=2.01s    min=2.01s   med=2.01s   max=2.06s   p(90)=2.02s    p(95)=2.03s
     iterations.....................: 2241    36.139465/s
     vus............................: 1       min=1       max=129
     vus_max........................: 130     min=130     max=130

```
