```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: find_path_load_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 67 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 67 looping VUs for 3m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m00.4s), 00/67 VUs, 3520 complete and 0 interrupted iterations
default ✓ [======================================] 00/67 VUs  3m0s

     ✓ logged in successfully
     ✓ retrieved member
     ✓ find path successfully

     checks.........................: 100.00% ✓ 10560     ✗ 0
     data_received..................: 3.4 MB  19 kB/s
     data_sent......................: 2.4 MB  14 kB/s
     http_req_blocked...............: avg=142.46µs min=0s     med=0s      max=135.05ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=34.06µs  min=0s     med=0s      max=53.97ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=18.15ms  min=9.67ms med=16.91ms max=167.27ms p(90)=24.03ms  p(95)=27.71ms
       { expected_response:true }...: avg=18.15ms  min=9.67ms med=16.91ms max=167.27ms p(90)=24.03ms  p(95)=27.71ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 10560
     http_req_receiving.............: avg=149.58µs min=0s     med=0s      max=56.26ms  p(90)=583.36µs p(95)=908.43µs
     http_req_sending...............: avg=20.57µs  min=0s     med=0s      max=6.98ms   p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=104.54µs min=0s     med=0s      max=125.9ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=17.98ms  min=9.42ms med=16.73ms max=167.27ms p(90)=23.93ms  p(95)=27.61ms
     http_reqs......................: 10560   58.528242/s
     iteration_duration.............: avg=1.06s    min=1.03s  med=1.05s   max=1.33s    p(90)=1.07s    p(95)=1.07s
     iterations.....................: 3520    19.509414/s
     vus............................: 2       min=1       max=67
     vus_max........................: 67      min=67      max=67
```
