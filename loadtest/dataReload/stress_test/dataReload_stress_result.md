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


running (1m01.6s), 0000/1000 VUs, 23837 complete and 0 interrupted iterations
default ✗ [======================================] 0000/1000 VUs  1m0s

     ✓ logged in successfully
     ✓ lending page

     checks.........................: 100.00% ✓ 47674      ✗ 0
     data_received..................: 12 MB   199 kB/s
     data_sent......................: 13 MB   211 kB/s
     http_req_blocked...............: avg=459.6µs  min=3.29µs  med=5.66µs  max=599.92ms p(90)=11.54µs  p(95)=66.47µs
     http_req_connecting............: avg=393.76µs min=0s      med=0s      max=598.3ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=142.42ms min=6.67ms  med=53.02ms max=3s       p(90)=393.58ms p(95)=575.9ms
       { expected_response:true }...: avg=142.42ms min=6.67ms  med=53.02ms max=3s       p(90)=393.58ms p(95)=575.9ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 47674
     http_req_receiving.............: avg=1.73ms   min=20.32µs med=56.03µs max=319.68ms p(90)=1.01ms   p(95)=2.28ms
     http_req_sending...............: avg=1.66ms   min=8.94µs  med=19.39µs max=468.65ms p(90)=476.83µs p(95)=2.18ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=139.02ms min=6.47ms  med=51.42ms max=3s       p(90)=386.5ms  p(95)=566.49ms
     http_reqs......................: 47674   774.156485/s
     iteration_duration.............: avg=1.29s    min=1.01s   med=1.13s   max=4.37s    p(90)=1.8s     p(95)=2.04s
     iterations.....................: 23837   387.078242/s
     vus............................: 435     min=17       max=998
     vus_max........................: 1000    min=1000     max=1000

```
- VU 2000명 진행 시 중간에 에러 발생
  - 
```bash
     ✗ logged in successfully
      ↳  66% — ✓ 26037 / ✗ 13133
     ✓ lending page

     checks.........................: 79.85% ✓ 52074      ✗ 13133
     data_received..................: 13 MB  217 kB/s
     data_sent......................: 14 MB  230 kB/s
     http_req_blocked...............: avg=185.08µs min=0s       med=5.17µs   max=474.71ms p(90)=8.73µs   p(95)=31.68µs
     http_req_connecting............: avg=118.74µs min=0s       med=0s       max=263.04ms p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=298.94ms min=0s       med=198.35ms max=3.94s    p(90)=782.09ms p(95)=1s
       { expected_response:true }...: avg=374.33ms min=6.77ms   med=300.85ms max=3.94s    p(90)=857.39ms p(95)=1.07s
     http_req_failed................: 20.14% ✓ 13133      ✗ 52074
     http_req_receiving.............: avg=1.36ms   min=0s       med=39.48µs  max=1.25s    p(90)=549.99µs p(95)=1.58ms
     http_req_sending...............: avg=2.64ms   min=0s       med=16.88µs  max=803.56ms p(90)=453.33µs p(95)=4.6ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=294.93ms min=0s       med=194.32ms max=3.94s    p(90)=770.25ms p(95)=983.12ms
     http_reqs......................: 65207  1055.20771/s
     iteration_duration.............: avg=1.39s    min=183.17µs med=1.3s     max=5.77s    p(90)=2.54s    p(95)=2.83s
     iterations.....................: 39170  633.865781/s
     vus............................: 582    min=34       max=1973
     vus_max........................: 2000   min=2000     max=2000

```