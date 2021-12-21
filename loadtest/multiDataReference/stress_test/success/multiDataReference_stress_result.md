```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 1000 max VUs, 22m30s max duration (incl. graceful stop):
           * default: Up to 1000 looping VUs for 22m0s over 20 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (22m01.0s), 0000/1000 VUs, 499965 complete and 0 interrupted iterations
default ✗ [======================================] 0000/1000 VUs  22m0s

     ✓ lending page

     checks.........................: 100.00% ✓ 499965     ✗ 0
     data_received..................: 581 MB  439 kB/s
     data_sent......................: 62 MB   47 kB/s
     http_req_blocked...............: avg=16.93µs min=404ns   med=6.23µs  max=28.92ms p(90)=9.14µs  p(95)=12.28µs
     http_req_connecting............: avg=6.52µs  min=0s      med=0s      max=19.93ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=4.5ms   min=1.9ms   med=3.36ms  max=1.17s   p(90)=4.91ms  p(95)=6.1ms
       { expected_response:true }...: avg=4.5ms   min=1.9ms   med=3.36ms  max=1.17s   p(90)=4.91ms  p(95)=6.1ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 499965
     http_req_receiving.............: avg=75.71µs min=16.36µs med=48.74µs max=82.83ms p(90)=94.23µs p(95)=179.44µs
     http_req_sending...............: avg=61.14µs min=7.89µs  med=17.06µs max=70.61ms p(90)=64.48µs p(95)=167.43µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=4.36ms  min=1.85ms  med=3.26ms  max=1.17s   p(90)=4.74ms  p(95)=5.87ms
     http_reqs......................: 499965  378.473675/s
     iteration_duration.............: avg=1s      min=1s      med=1s      max=2.17s   p(90)=1s      p(95)=1s
     iterations.....................: 499965  378.473675/s
     vus............................: 4       min=2        max=999
     vus_max........................: 1000    min=1000     max=1000

```