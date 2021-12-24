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


running (1m00.6s), 000/150 VUs, 5454 complete and 0 interrupted iterations
default ✓ [======================================] 000/150 VUs  1m0s

     ✓ page loading complete

   ✓ checks.........................: 100.00% ✓ 5454      ✗ 0
     data_received..................: 8.3 MB  138 kB/s
     data_sent......................: 696 kB  12 kB/s
     http_req_blocked...............: avg=1.14ms   min=1µs    med=5µs     max=437.76ms p(90)=8µs     p(95)=10µs
     http_req_connecting............: avg=473.38µs min=0s     med=0s      max=413.84ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=18.92ms  min=3.69ms med=12.25ms max=651.71ms p(90)=16.17ms p(95)=18.28ms
       { expected_response:true }...: avg=18.92ms  min=3.69ms med=12.25ms max=651.71ms p(90)=16.17ms p(95)=18.28ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5454
     http_req_receiving.............: avg=62.73µs  min=14µs   med=58µs    max=453µs    p(90)=99µs    p(95)=114µs
     http_req_sending...............: avg=23.65µs  min=5µs    med=21µs    max=306µs    p(90)=36µs    p(95)=45µs
     http_req_tls_handshaking.......: avg=666.25µs min=0s     med=0s      max=167.6ms  p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=18.83ms  min=3.64ms med=12.16ms max=651.58ms p(90)=16.07ms p(95)=18.19ms
     http_reqs......................: 5454    89.993494/s
     iteration_duration.............: avg=1.02s    min=1s     med=1.01s   max=1.65s    p(90)=1.01s   p(95)=1.02s
     iterations.....................: 5454    89.993494/s
     vus............................: 53      min=5       max=149
     vus_max........................: 150     min=150     max=150
```
