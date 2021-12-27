```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 250 max VUs, 3m10s max duration (incl. graceful stop):
           * default: Up to 250 looping VUs for 2m40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (2m41.9s), 000/250 VUs, 13895 complete and 0 interrupted iterations
default ✓ [======================================] 000/250 VUs  2m40s

     ✓ pathPage success
     ✓ getPath success

   ✓ checks.........................: 100.00% ✓ 27790      ✗ 0
     data_received..................: 26 MB   158 kB/s
     data_sent......................: 1.3 MB  8.3 kB/s
     http_req_blocked...............: avg=64.35µs  min=2.42µs  med=2.91µs  max=40.26ms  p(90)=3.17µs   p(95)=3.41µs
     http_req_connecting............: avg=9.68µs   min=0s      med=0s      max=22.58ms  p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=10.96ms  min=2.11ms  med=8.86ms  max=176.86ms p(90)=22.48ms  p(95)=29.64ms
       { expected_response:true }...: avg=10.96ms  min=2.11ms  med=8.86ms  max=176.86ms p(90)=22.48ms  p(95)=29.64ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 27790
     http_req_receiving.............: avg=229.35µs min=23.05µs med=69.81µs max=21.72ms  p(90)=405.02µs p(95)=814.98µs
     http_req_sending...............: avg=138.76µs min=29.17µs med=68.83µs max=25.33ms  p(90)=158.31µs p(95)=329.29µs
     http_req_tls_handshaking.......: avg=42.68µs  min=0s      med=0s      max=32.45ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=10.59ms  min=0s      med=8.58ms  max=175.34ms p(90)=21.79ms  p(95)=29.07ms
     http_reqs......................: 27790   171.657205/s
     iteration_duration.............: avg=2.02s    min=2.01s   med=2.02s   max=2.2s     p(90)=2.03s    p(95)=2.04s
     iterations.....................: 13895   85.828603/s
     vus............................: 15      min=5        max=250
     vus_max........................: 250     min=250      max=250

```
