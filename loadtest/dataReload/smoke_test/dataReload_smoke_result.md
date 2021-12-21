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


running (10.2s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ logged in successfully
     ✗ retrieved me
      ↳  0% — ✓ 0 / ✗ 10

     checks.........................: 50.00% ✓ 10       ✗ 10
     data_received..................: 5.2 kB 503 B/s
     data_sent......................: 5.5 kB 532 B/s
     http_req_blocked...............: avg=209.32µs min=4.61µs  med=7.62µs   max=4.05ms   p(90)=8.85µs  p(95)=211.16µs
     http_req_connecting............: avg=26.52µs  min=0s      med=0s       max=530.4µs  p(90)=0s      p(95)=26.52µs
   ✓ http_req_duration..............: avg=11.13ms  min=9.57ms  med=10.68ms  max=19.43ms  p(90)=12.58ms p(95)=14.44ms
       { expected_response:true }...: avg=11.13ms  min=9.57ms  med=10.68ms  max=19.43ms  p(90)=12.58ms p(95)=14.44ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 20
     http_req_receiving.............: avg=123.22µs min=79.36µs med=117.53µs max=295.78µs p(90)=137.9µs p(95)=200.82µs
     http_req_sending...............: avg=32.34µs  min=14.71µs med=31.36µs  max=103.94µs p(90)=41.55µs p(95)=51.82µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=10.98ms  min=9.41ms  med=10.56ms  max=19.2ms   p(90)=12.37ms p(95)=14.3ms
     http_reqs......................: 20     1.95277/s
     iteration_duration.............: avg=1.02s    min=1.02s   med=1.02s    max=1.03s    p(90)=1.02s   p(95)=1.03s
     iterations.....................: 10     0.976385/s
     vus............................: 1      min=1      max=1
     vus_max........................: 1      min=1      max=1

```