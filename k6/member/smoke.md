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


running (12.2s), 0/1 VUs, 4 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ login success
     ✓ mypage success
     ✓ memberUpdate success

   ✓ checks.........................: 100.00% ✓ 12       ✗ 0
     data_received..................: 11 kB   875 B/s
     data_sent......................: 2.4 kB  196 B/s
     http_req_blocked...............: avg=2.92ms   min=2.99µs   med=3.13µs   max=35.02ms  p(90)=3.45µs   p(95)=15.76ms
     http_req_connecting............: avg=54.22µs  min=0s       med=0s       max=650.65µs p(90)=0s       p(95)=292.79µs
   ✓ http_req_duration..............: avg=10.47ms  min=3.63ms   med=9.79ms   max=22.69ms  p(90)=19.7ms   p(95)=21.42ms
       { expected_response:true }...: avg=10.47ms  min=3.63ms   med=9.79ms   max=22.69ms  p(90)=19.7ms   p(95)=21.42ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 12
     http_req_receiving.............: avg=85.99µs  min=53.45µs  med=76.32µs  max=168.56µs p(90)=123.43µs p(95)=145.33µs
     http_req_sending...............: avg=139.71µs min=108.65µs med=130.23µs max=244.32µs p(90)=155.89µs p(95)=195.75µs
     http_req_tls_handshaking.......: avg=1.31ms   min=0s       med=0s       max=15.77ms  p(90)=0s       p(95)=7.1ms
     http_req_waiting...............: avg=10.25ms  min=3.44ms   med=9.54ms   max=22.45ms  p(90)=19.38ms  p(95)=21.13ms
     http_reqs......................: 12      0.985749/s
     iteration_duration.............: avg=3.04s    min=3.02s    med=3.02s    max=3.08s    p(90)=3.06s    p(95)=3.07s
     iterations.....................: 4       0.328583/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
