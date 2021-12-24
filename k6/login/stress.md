```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 240 max VUs, 3m10s max duration (incl. graceful stop):
           * default: Up to 240 looping VUs for 2m40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m41.0s), 000/240 VUs, 29071 complete and 0 interrupted iterations
default ✓ [======================================] 000/240 VUs  2m40s

     ✓ login success

   ✓ checks.........................: 100.00% ✓ 29071      ✗ 0
     data_received..................: 13 MB   83 kB/s
     data_sent......................: 6.5 MB  41 kB/s
     http_req_blocked...............: avg=282.2µs  min=1µs    med=4µs     max=1.14s    p(90)=6µs     p(95)=7µs
     http_req_connecting............: avg=165.1µs  min=0s     med=0s      max=1.13s    p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=27.96ms  min=6.89ms med=15.71ms max=565.39ms p(90)=45.42ms p(95)=79.39ms
       { expected_response:true }...: avg=27.96ms  min=6.89ms med=15.71ms max=565.39ms p(90)=45.42ms p(95)=79.39ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 29071
     http_req_receiving.............: avg=51.63µs  min=15µs   med=46µs    max=3.3ms    p(90)=77µs    p(95)=92µs
     http_req_sending...............: avg=23.14µs  min=7µs    med=21µs    max=836µs    p(90)=35µs    p(95)=43µs
     http_req_tls_handshaking.......: avg=111.96µs min=0s     med=0s      max=145.29ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=27.88ms  min=6.82ms med=15.64ms max=565.28ms p(90)=45.36ms p(95)=79.29ms
     http_reqs......................: 29071   180.540609/s
     iteration_duration.............: avg=1.02s    min=1s     med=1.01s   max=2.15s    p(90)=1.04s   p(95)=1.08s
     iterations.....................: 29071   180.540609/s
     vus............................: 5       min=5        max=240
     vus_max........................: 240     min=240      max=240


```
