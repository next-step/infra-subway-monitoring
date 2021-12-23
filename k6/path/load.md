```javascript


          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 150 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 150 looping VUs for 1m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m01.6s), 000/150 VUs, 2691 complete and 0 interrupted iterations
default ✓ [======================================] 000/150 VUs  1m0s

     ✓ pathPage success
     ✓ getPath success

   ✓ checks.........................: 100.00% ✓ 5382      ✗ 0
     data_received..................: 5.9 MB  95 kB/s
     data_sent......................: 766 kB  12 kB/s
     http_req_blocked...............: avg=676.12µs min=1µs    med=4µs     max=416.3ms  p(90)=7µs      p(95)=9µs
     http_req_connecting............: avg=313.04µs min=0s     med=0s      max=401.3ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=46.7ms   min=3.69ms med=35.05ms max=623.63ms p(90)=104.14ms p(95)=137.56ms
       { expected_response:true }...: avg=46.7ms   min=3.69ms med=35.05ms max=623.63ms p(90)=104.14ms p(95)=137.56ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5382
     http_req_receiving.............: avg=50.93µs  min=14µs   med=44.5µs  max=2.27ms   p(90)=76µs     p(95)=92.94µs
     http_req_sending...............: avg=19.17µs  min=5µs    med=16µs    max=845µs    p(90)=31µs     p(95)=38µs
     http_req_tls_handshaking.......: avg=356.51µs min=0s     med=0s      max=148.75ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=46.63ms  min=3.65ms med=34.97ms max=623.58ms p(90)=104.06ms p(95)=137.46ms
     http_reqs......................: 5382    87.304018/s
     iteration_duration.............: avg=2.09s    min=2.03s  med=2.07s   max=2.63s    p(90)=2.14s    p(95)=2.23s
     iterations.....................: 2691    43.652009/s
     vus............................: 25      min=5       max=149
     vus_max........................: 150     min=150     max=150



```
