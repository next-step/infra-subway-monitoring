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


running (10.4s), 0/1 VUs, 5 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ pathPage success
     ✓ getPath success

   ✓ checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 22 kB   2.1 kB/s
     data_sent......................: 1.7 kB  164 B/s
     http_req_blocked...............: avg=15.6ms  min=3µs    med=5.5µs   max=155.97ms p(90)=15.6ms   p(95)=85.78ms
     http_req_connecting............: avg=365.5µs min=0s     med=0s      max=3.65ms   p(90)=365.49µs p(95)=2.01ms
   ✓ http_req_duration..............: avg=25.05ms min=5.48ms med=25.31ms max=49.78ms  p(90)=41.59ms  p(95)=45.68ms
       { expected_response:true }...: avg=25.05ms min=5.48ms med=25.31ms max=49.78ms  p(90)=41.59ms  p(95)=45.68ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=78.7µs  min=39µs   med=73.5µs  max=114µs    p(90)=111.3µs  p(95)=112.65µs
     http_req_sending...............: avg=32.5µs  min=17µs   med=23µs    max=104µs    p(90)=46.39µs  p(95)=75.19µs
     http_req_tls_handshaking.......: avg=15.14ms min=0s     med=0s      max=151.49ms p(90)=15.14ms  p(95)=83.32ms
     http_req_waiting...............: avg=24.94ms min=5.32ms med=25.19ms max=49.64ms  p(90)=41.49ms  p(95)=45.56ms
     http_reqs......................: 10      0.958598/s
     iteration_duration.............: avg=2.08s   min=2.04s  med=2.05s   max=2.21s    p(90)=2.15s    p(95)=2.18s
     iterations.....................: 5       0.479299/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1


```
