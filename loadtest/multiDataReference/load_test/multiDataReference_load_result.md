```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 40s max duration (incl. graceful stop):
           * default: 300 looping VUs for 10s (gracefulStop: 30s)


running (11.1s), 000/300 VUs, 1500 complete and 0 interrupted iterations
default ✓ [======================================] 300 VUs  10s

     ✓ logged in successfully
     ✓ reached request rate

     checks.........................: 100.00% ✓ 3000       ✗ 0
     data_received..................: 1.4 MB  129 kB/s
     data_sent......................: 837 kB  75 kB/s
     http_req_blocked...............: avg=7.24ms   min=3.34µs  med=5.18µs   max=411.23ms p(90)=12.26ms  p(95)=74.44ms
     http_req_connecting............: avg=3.01ms   min=0s      med=0s       max=52.62ms  p(90)=1.11ms   p(95)=30.11ms
   ✓ http_req_duration..............: avg=427.25ms min=8.91ms  med=397.82ms max=1.6s     p(90)=726.14ms p(95)=870.24ms
       { expected_response:true }...: avg=427.25ms min=8.91ms  med=397.82ms max=1.6s     p(90)=726.14ms p(95)=870.24ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 3000
     http_req_receiving.............: avg=3.41ms   min=22.28µs med=43.6µs   max=496.31ms p(90)=2.91ms   p(95)=9.17ms
     http_req_sending...............: avg=4.69ms   min=9.43µs  med=17.15µs  max=608.27ms p(90)=5.76ms   p(95)=7.94ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=419.14ms min=8.85ms  med=391.04ms max=1.6s     p(90)=713.09ms p(95)=853.54ms
     http_reqs......................: 3000    269.321549/s
     iteration_duration.............: avg=2.04s    min=1.99s   med=2s       max=2.38s    p(90)=2.13s    p(95)=2.28s
     iterations.....................: 1500    134.660775/s
     vus............................: 2       min=2        max=300
     vus_max........................: 300     min=300      max=300

```