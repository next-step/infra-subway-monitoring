```javascript

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


running (12.5s), 0/1 VUs, 4 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ login success
     ✓ mypage success
     ✓ memberUpdate success

   ✓ checks.........................: 100.00% ✓ 12       ✗ 0
     data_received..................: 13 kB   1.0 kB/s
     data_sent......................: 4.0 kB  316 B/s
     http_req_blocked...............: avg=11.98ms  min=3µs    med=4µs     max=143.73ms p(90)=6µs     p(95)=64.68ms
     http_req_connecting............: avg=274.08µs min=0s     med=0s      max=3.28ms   p(90)=0s      p(95)=1.48ms
   ✓ http_req_duration..............: avg=28.88ms  min=6.29ms med=13.15ms max=123.78ms p(90)=91.55ms p(95)=110.37ms
       { expected_response:true }...: avg=28.88ms  min=6.29ms med=13.15ms max=123.78ms p(90)=91.55ms p(95)=110.37ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 12
     http_req_receiving.............: avg=65.16µs  min=38µs   med=50µs    max=116µs    p(90)=107.5µs p(95)=111.6µs
     http_req_sending...............: avg=90.66µs  min=16µs   med=25µs    max=811µs    p(90)=36.69µs p(95)=385.29µs
     http_req_tls_handshaking.......: avg=11.63ms  min=0s     med=0s      max=139.57ms p(90)=0s      p(95)=62.8ms
     http_req_waiting...............: avg=28.72ms  min=6.22ms med=13.05ms max=123.65ms p(90)=90.73ms p(95)=109.81ms
     http_reqs......................: 12      0.958555/s
     iteration_duration.............: avg=3.12s    min=3.03s  med=3.04s   max=3.37s    p(90)=3.28s   p(95)=3.33s
     iterations.....................: 4       0.319518/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
