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


running (2m42.9s), 000/240 VUs, 9912 complete and 0 interrupted iterations
default ✓ [======================================] 000/240 VUs  2m40s

     ✓ login success
     ✓ mypage success
     ✓ memberUpdate success

   ✓ checks.........................: 100.00% ✓ 29736      ✗ 0
     data_received..................: 21 MB   130 kB/s
     data_sent......................: 8.9 MB  55 kB/s
     http_req_blocked...............: avg=156.13µs min=1µs    med=3µs     max=169.64ms p(90)=6µs     p(95)=7µs
     http_req_connecting............: avg=45.21µs  min=0s     med=0s      max=18.34ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=12.58ms  min=3.54ms med=10.27ms max=350.44ms p(90)=16.09ms p(95)=19.76ms
       { expected_response:true }...: avg=12.58ms  min=3.54ms med=10.27ms max=350.44ms p(90)=16.09ms p(95)=19.76ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 29736
     http_req_receiving.............: avg=39.75µs  min=11µs   med=35µs    max=2.96ms   p(90)=62µs    p(95)=73µs
     http_req_sending...............: avg=19.59µs  min=6µs    med=17µs    max=442µs    p(90)=30µs    p(95)=38µs
     http_req_tls_handshaking.......: avg=105.74µs min=0s     med=0s      max=141.29ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=12.52ms  min=3.48ms med=10.21ms max=350.38ms p(90)=16.02ms p(95)=19.71ms
     http_reqs......................: 29736   182.586983/s
     iteration_duration.............: avg=3.04s    min=3.02s  med=3.03s   max=3.37s    p(90)=3.04s   p(95)=3.06s
     iterations.....................: 9912    60.862328/s
     vus............................: 30      min=10       max=240
     vus_max........................: 240     min=240      max=240


```
