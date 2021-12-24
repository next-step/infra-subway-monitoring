```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 150 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 150 looping VUs for 1m0s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m03.0s), 000/150 VUs, 1838 complete and 0 interrupted iterations
default ✓ [======================================] 000/150 VUs  1m0s

     ✓ login success
     ✓ mypage success
     ✓ memberUpdate success

   ✓ checks.........................: 100.00% ✓ 5514      ✗ 0
     data_received..................: 4.4 MB  70 kB/s
     data_sent......................: 1.7 MB  27 kB/s
     http_req_blocked...............: avg=2.47ms   min=1µs    med=3µs     max=553.48ms p(90)=6µs     p(95)=8µs
     http_req_connecting............: avg=1.97ms   min=0s     med=0s      max=541.16ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=38.69ms  min=3.66ms med=24.07ms max=580.35ms p(90)=76.45ms p(95)=104.6ms
       { expected_response:true }...: avg=38.69ms  min=3.66ms med=24.07ms max=580.35ms p(90)=76.45ms p(95)=104.6ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5514
     http_req_receiving.............: avg=41µs     min=13µs   med=35µs    max=265µs    p(90)=66µs    p(95)=79µs
     http_req_sending...............: avg=21.37µs  min=6µs    med=18µs    max=495µs    p(90)=34µs    p(95)=43µs
     http_req_tls_handshaking.......: avg=490.32µs min=0s     med=0s      max=236.15ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=38.63ms  min=3.62ms med=24ms    max=580.3ms  p(90)=76.38ms p(95)=104.53ms
     http_reqs......................: 5514    87.456553/s
     iteration_duration.............: avg=3.12s    min=3.02s  med=3.11s   max=3.86s    p(90)=3.23s   p(95)=3.29s
     iterations.....................: 1838    29.152184/s
     vus............................: 10      min=5       max=150
     vus_max........................: 150     min=150     max=150

```
