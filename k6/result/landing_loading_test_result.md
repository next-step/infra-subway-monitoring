```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: landing_load_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 67 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 67 looping VUs for 3m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (3m00.9s), 00/67 VUs, 3568 complete and 0 interrupted iterations
default ✓ [======================================] 00/67 VUs  3m0s

     ✓ logged in successfully
     ✓ retrieved member

     checks.........................: 100.00% ✓ 7136      ✗ 0
     data_received..................: 2.8 MB  15 kB/s
     data_sent......................: 1.9 MB  10 kB/s
     http_req_blocked...............: avg=177.17µs min=0s      med=0s      max=136.96ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=39.09µs  min=0s      med=0s      max=18.01ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=19.94ms  min=10.38ms med=18.45ms max=91.51ms  p(90)=27.91ms p(95)=31.86ms
       { expected_response:true }...: avg=19.94ms  min=10.38ms med=18.45ms max=91.51ms  p(90)=27.91ms p(95)=31.86ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 7136
     http_req_receiving.............: avg=124.09µs min=0s      med=0s      max=14.49ms  p(90)=523.4µs p(95)=960.35µs
     http_req_sending...............: avg=28.75µs  min=0s      med=0s      max=4.5ms    p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=132.31µs min=0s      med=0s      max=128.98ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=19.79ms  min=10.38ms med=18.29ms max=91ms     p(90)=27.79ms p(95)=31.7ms
     http_reqs......................: 7136    39.440366/s
     iteration_duration.............: avg=1.04s    min=1.02s   med=1.04s   max=1.21s    p(90)=1.05s   p(95)=1.06s
     iterations.....................: 3568    19.720183/s
     vus............................: 2       min=1       max=67
     vus_max........................: 67      min=67      max=67
```
