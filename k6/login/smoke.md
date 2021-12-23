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

     ✓ login success

   ✓ checks.........................: 100.00% ✓ 10      ✗ 0
     data_received..................: 8.7 kB  847 B/s
     data_sent......................: 2.6 kB  252 B/s
     http_req_blocked...............: avg=15.37ms min=3µs    med=4.5µs   max=153.65ms p(90)=15.37ms  p(95)=84.51ms
     http_req_connecting............: avg=357.7µs min=0s     med=0s      max=3.57ms   p(90)=357.69µs p(95)=1.96ms
   ✓ http_req_duration..............: avg=13.52ms min=9.44ms med=13.97ms max=17.73ms  p(90)=17.72ms  p(95)=17.73ms
       { expected_response:true }...: avg=13.52ms min=9.44ms med=13.97ms max=17.73ms  p(90)=17.72ms  p(95)=17.73ms
     http_req_failed................: 0.00%   ✓ 0       ✗ 10
     http_req_receiving.............: avg=61.8µs  min=45µs   med=60.5µs  max=90µs     p(90)=79.19µs  p(95)=84.59µs
     http_req_sending...............: avg=34.1µs  min=19µs   med=27.5µs  max=88µs     p(90)=55.59µs  p(95)=71.79µs
     http_req_tls_handshaking.......: avg=13.97ms min=0s     med=0s      max=139.72ms p(90)=13.97ms  p(95)=76.84ms
     http_req_waiting...............: avg=13.42ms min=9.33ms med=13.89ms max=17.64ms  p(90)=17.61ms  p(95)=17.62ms
     http_reqs......................: 10      0.96954/s
     iteration_duration.............: avg=1.03s   min=1.01s  med=1.01s   max=1.16s    p(90)=1.03s    p(95)=1.09s
     iterations.....................: 10      0.96954/s
     vus............................: 1       min=1     max=1
     vus_max........................: 1       min=1     max=1

```
