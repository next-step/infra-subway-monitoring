- VU 1000명 진행 시
```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 1000 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 1000 looping VUs for 1m0s over 1 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m03.1s), 0000/1000 VUs, 16103 complete and 0 interrupted iterations
default ✗ [======================================] 0000/1000 VUs  1m0s

     ✓ logged in successfully
     ✗ lending page
      ↳  0% — ✓ 0 / ✗ 16103

     checks.........................: 50.00% ✓ 16103      ✗ 16103
     data_received..................: 9.4 MB 150 kB/s
     data_sent......................: 9.0 MB 142 kB/s
     http_req_blocked...............: avg=8.79ms   min=3.03µs  med=5.31µs   max=1.89s p(90)=9.81µs   p(95)=224.1µs
     http_req_connecting............: avg=7.67ms   min=0s      med=0s       max=1.89s p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=410.2ms  min=7.51ms  med=354.85ms max=2.08s p(90)=902.34ms p(95)=1.02s
       { expected_response:true }...: avg=406.59ms min=7.51ms  med=324.9ms  max=2.08s p(90)=923.91ms p(95)=1.05s
     http_req_failed................: 50.00% ✓ 16103      ✗ 16103
     http_req_receiving.............: avg=5.21ms   min=19.62µs med=38.78µs  max=1.24s p(90)=631.97µs p(95)=3.8ms
     http_req_sending...............: avg=9.75ms   min=9.73µs  med=17.18µs  max=1.15s p(90)=1.07ms   p(95)=48.24ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=395.22ms min=7.39ms  med=340.51ms max=2.06s p(90)=873.07ms p(95)=979.14ms
     http_reqs......................: 32206  510.211315/s
     iteration_duration.............: avg=1.97s    min=1.02s   med=1.91s    max=6.17s p(90)=2.95s    p(95)=3.22s
     iterations.....................: 16103  255.105658/s
     vus............................: 59     min=17       max=999
     vus_max........................: 1000   min=1000     max=1000

```