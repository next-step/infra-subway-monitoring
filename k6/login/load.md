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


running (1m00.6s), 000/150 VUs, 5434 complete and 0 interrupted iterations
default ✓ [======================================] 000/150 VUs  1m0s

     ✓ login success

   ✓ checks.........................: 100.00% ✓ 5434      ✗ 0
     data_received..................: 3.0 MB  49 kB/s
     data_sent......................: 1.3 MB  21 kB/s
     http_req_blocked...............: avg=741.02µs min=2µs    med=5µs     max=142.38ms p(90)=8µs     p(95)=10µs
     http_req_connecting............: avg=229.22µs min=0s     med=0s      max=102.43ms p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=21.15ms  min=7.22ms med=16.07ms max=514.16ms p(90)=29.94ms p(95)=39.16ms
       { expected_response:true }...: avg=21.15ms  min=7.22ms med=16.07ms max=514.16ms p(90)=29.94ms p(95)=39.16ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5434
     http_req_receiving.............: avg=66.41µs  min=17µs   med=64µs    max=454µs    p(90)=98µs    p(95)=108µs
     http_req_sending...............: avg=30.57µs  min=9µs    med=29µs    max=359µs    p(90)=45µs    p(95)=49µs
     http_req_tls_handshaking.......: avg=503.49µs min=0s     med=0s      max=136.96ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=21.05ms  min=7.17ms med=15.97ms max=514.09ms p(90)=29.86ms p(95)=39.08ms
     http_reqs......................: 5434    89.625157/s
     iteration_duration.............: avg=1.02s    min=1s     med=1.01s   max=1.51s    p(90)=1.03s   p(95)=1.04s
     iterations.....................: 5434    89.625157/s
     vus............................: 55      min=5       max=149
     vus_max........................: 150     min=150     max=150

```
