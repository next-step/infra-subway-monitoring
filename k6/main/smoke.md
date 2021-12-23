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


running (10.3s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ page loading complete

   ✓ checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 19 kB   1.8 kB/s
     data_sent......................: 1.6 kB  151 B/s
     http_req_blocked...............: avg=17.62ms min=4µs    med=5µs    max=176.22ms p(90)=17.62ms p(95)=96.92ms
     http_req_connecting............: avg=2.01ms  min=0s     med=0s     max=20.18ms  p(90)=2.01ms  p(95)=11.1ms
   ✓ http_req_duration..............: avg=10.79ms min=7.94ms med=9.99ms max=18.83ms  p(90)=12.81ms p(95)=15.82ms
       { expected_response:true }...: avg=10.79ms min=7.94ms med=9.99ms max=18.83ms  p(90)=12.81ms p(95)=15.82ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=61.2µs  min=49µs   med=55µs   max=93µs     p(90)=81.3µs  p(95)=87.15µs
     http_req_sending...............: avg=27.79µs min=15µs   med=25µs   max=51µs     p(90)=39.29µs p(95)=45.14µs
     http_req_tls_handshaking.......: avg=15.48ms min=0s     med=0s     max=154.89ms p(90)=15.48ms p(95)=85.19ms
     http_req_waiting...............: avg=10.7ms  min=7.83ms med=9.92ms max=18.75ms  p(90)=12.72ms p(95)=15.73ms
     http_reqs......................: 10      0.970827/s
     iteration_duration.............: avg=1.02s   min=1s     med=1.01s  max=1.18s    p(90)=1.03s   p(95)=1.11s
     iterations.....................: 10      0.970827/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```
