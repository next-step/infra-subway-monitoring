```bash

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


running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ lending page

     checks.........................: 100.00% ✓ 10       ✗ 0
     data_received..................: 12 kB   1.2 kB/s
     data_sent......................: 1.2 kB  122 B/s
     http_req_blocked...............: avg=458.18µs min=7.98µs  med=9.09µs  max=4.5ms    p(90)=458.85µs p(95)=2.48ms
     http_req_connecting............: avg=55.51µs  min=0s      med=0s      max=555.11µs p(90)=55.51µs  p(95)=305.31µs
   ✓ http_req_duration..............: avg=4.2ms    min=3.08ms  med=3.41ms  max=10.96ms  p(90)=5.07ms   p(95)=8.02ms
       { expected_response:true }...: avg=4.2ms    min=3.08ms  med=3.41ms  max=10.96ms  p(90)=5.07ms   p(95)=8.02ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 10
     http_req_receiving.............: avg=90.15µs  min=69.33µs med=94.72µs max=108.79µs p(90)=103.18µs p(95)=105.98µs
     http_req_sending...............: avg=32.15µs  min=24.26µs med=26.14µs max=83.37µs  p(90)=35.38µs  p(95)=59.37µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=4.07ms   min=2.98ms  med=3.31ms  max=10.78ms  p(90)=4.94ms   p(95)=7.86ms
     http_reqs......................: 10      0.994392/s
     iteration_duration.............: avg=1s       min=1s      med=1s      max=1.01s    p(90)=1s       p(95)=1.01s
     iterations.....................: 10      0.994392/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

```