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


running (2m42.0s), 000/240 VUs, 14163 complete and 0 interrupted iterations
default ✓ [======================================] 000/240 VUs  2m40s

     ✓ pathPage success
     ✓ getPath success

   ✓ checks.........................: 100.00% ✓ 28326      ✗ 0
     data_received..................: 51 MB   317 kB/s
     data_sent......................: 3.9 MB  24 kB/s
     http_req_blocked...............: avg=175.92µs min=1µs    med=3µs     max=253.2ms  p(90)=6µs      p(95)=7µs
     http_req_connecting............: avg=57.05µs  min=0s     med=0s      max=238.93ms p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=58.98ms  min=3.44ms med=36.25ms max=1.38s    p(90)=117.82ms p(95)=180.11ms
       { expected_response:true }...: avg=58.98ms  min=3.44ms med=36.25ms max=1.38s    p(90)=117.82ms p(95)=180.11ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 28326
     http_req_receiving.............: avg=46.87µs  min=14µs   med=42µs    max=3.01ms   p(90)=70µs     p(95)=83µs
     http_req_sending...............: avg=16.78µs  min=5µs    med=15µs    max=921µs    p(90)=25µs     p(95)=32µs
     http_req_tls_handshaking.......: avg=114.04µs min=0s     med=0s      max=142.59ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=58.91ms  min=3.41ms med=36.18ms max=1.38s    p(90)=117.77ms p(95)=180.05ms
     http_reqs......................: 28326   174.801492/s
     iteration_duration.............: avg=2.11s    min=2.03s  med=2.08s   max=3.4s     p(90)=2.19s    p(95)=2.29s
     iterations.....................: 14163   87.400746/s
     vus............................: 1       min=1        max=240
     vus_max........................: 240     min=240      max=240

```
