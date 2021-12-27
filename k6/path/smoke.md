```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: smoke.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.1s), 0/1 VUs, 5 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ pathPage success
     ✓ getPath success

   ✓ checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 14 kB   1.3 kB/s
     data_sent......................: 1.0 kB  103 B/s
     http_req_blocked...............: avg=3.03ms   min=3.01µs  med=3.26µs   max=30.29ms  p(90)=3.03ms   p(95)=16.66ms
     http_req_connecting............: avg=120.05µs min=0s      med=0s       max=1.2ms    p(90)=120.05µs p(95)=660.31µs
   ✓ http_req_duration..............: avg=10.68ms  min=4.33ms  med=13.2ms   max=16.95ms  p(90)=15.37ms  p(95)=16.16ms
       { expected_response:true }...: avg=10.68ms  min=4.33ms  med=13.2ms   max=16.95ms  p(90)=15.37ms  p(95)=16.16ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=91.56µs  min=69.44µs med=80.39µs  max=147.41µs p(90)=134.39µs p(95)=140.9µs
     http_req_sending...............: avg=125.08µs min=94.02µs med=116.05µs max=229.13µs p(90)=137.86µs p(95)=183.5µs
     http_req_tls_handshaking.......: avg=1.75ms   min=0s      med=0s       max=17.55ms  p(90)=1.75ms   p(95)=9.65ms
     http_req_waiting...............: avg=10.46ms  min=4.16ms  med=12.91ms  max=16.69ms  p(90)=15.15ms  p(95)=15.92ms
     http_reqs......................: 10      0.985534/s
     iteration_duration.............: avg=2.02s    min=2.01s   med=2.02s    max=2.06s    p(90)=2.04s    p(95)=2.05s
     iterations.....................: 5       0.492767/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
