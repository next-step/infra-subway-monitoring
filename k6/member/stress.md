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


running (2m42.7s), 000/240 VUs, 9909 complete and 0 interrupted iterations
default ✓ [======================================] 000/240 VUs  2m40s

     ✓ login success
     ✓ mypage success
     ✓ memberUpdate success

   ✓ checks.........................: 100.00% ✓ 29727      ✗ 0
     data_received..................: 21 MB   130 kB/s
     data_sent......................: 8.9 MB  55 kB/s
     http_req_blocked...............: avg=156.57µs min=1µs    med=3µs    max=327.15ms p(90)=5µs     p(95)=6µs
     http_req_connecting............: avg=53.75µs  min=0s     med=0s     max=314.52ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=12.88ms  min=3.49ms med=9.9ms  max=433.88ms p(90)=16.06ms p(95)=21.87ms
       { expected_response:true }...: avg=12.88ms  min=3.49ms med=9.9ms  max=433.88ms p(90)=16.06ms p(95)=21.87ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 29727
     http_req_receiving.............: avg=33.91µs  min=12µs   med=30µs   max=1.64ms   p(90)=51µs    p(95)=61µs
     http_req_sending...............: avg=17.13µs  min=6µs    med=15µs   max=1.01ms   p(90)=25µs    p(95)=31µs
     http_req_tls_handshaking.......: avg=98.68µs  min=0s     med=0s     max=146.79ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=12.83ms  min=3.45ms med=9.85ms max=433.84ms p(90)=16ms    p(95)=21.82ms
     http_reqs......................: 29727   182.749026/s
     iteration_duration.............: avg=3.04s    min=3.02s  med=3.03s  max=3.45s    p(90)=3.05s   p(95)=3.07s
     iterations.....................: 9909    60.916342/s
     vus............................: 34      min=10       max=240
     vus_max........................: 240     min=240      max=240

```
