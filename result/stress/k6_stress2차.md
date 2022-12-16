```shell
ERRO[0532] GoError: the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///Users/jimbae/git/infra-subway-monitoring/result/stress/stress_2.js:40:40(3))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///Users/jimbae/git/infra-subway-monitoring/result/stress/stress_2.js:39:18(33)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0532] Request Failed                                error="Get \"https://tech-pro.jimbae.com/members/me\": EOF"
ERRO[0532] GoError: the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at file:///Users/jimbae/git/infra-subway-monitoring/result/stress/stress_2.js:48:28(57)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0532] Request Failed                                error="Post \"https://tech-pro.jimbae.com/login/token\": EOF"
ERRO[0532] GoError: the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///Users/jimbae/git/infra-subway-monitoring/result/stress/stress_2.js:40:40(3))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///Users/jimbae/git/infra-subway-monitoring/result/stress/stress_2.js:39:18(33)
        at native  executor=ramping-vus scenario=default source=stacktrace
^C
running (08m52.2s), 000/420 VUs, 11555 complete and 266 interrupted iterations
default ✗ [=====================>----------------] 234/420 VUs  08m52.2s/15m00.0s

     ✗ logged in successfully
      ↳  79% — ✓ 9300 / ✗ 2392
     ✓ retrieved member
     ✗ find path
      ↳  98% — ✓ 8959 / ✗ 106
     ✗ retrieved main
      ↳  98% — ✓ 8878 / ✗ 178

     checks.........................: 93.12% ✓ 36262     ✗ 2676 
     data_received..................: 49 MB  92 kB/s
     data_sent......................: 11 MB  20 kB/s
     http_req_blocked...............: avg=2.81ms   min=0s     med=5µs      max=123.88ms p(90)=14µs   p(95)=30.99ms
     http_req_connecting............: avg=777.03µs min=0s     med=0s       max=96.84ms  p(90)=0s     p(95)=8.23ms 
   ✗ http_req_duration..............: avg=1.55s    min=0s     med=890.71ms max=16.69s   p(90)=4.17s  p(95)=4.67s  
       { expected_response:true }...: avg=1.67s    min=5.72ms med=1.1s     max=16.69s   p(90)=4.23s  p(95)=4.71s  
     http_req_failed................: 7.15%  ✓ 2793      ✗ 36262
     http_req_receiving.............: avg=77.58µs  min=0s     med=74µs     max=2.43ms   p(90)=133µs  p(95)=156µs  
     http_req_sending...............: avg=382.18µs min=0s     med=25µs     max=61.25ms  p(90)=49µs   p(95)=61µs   
     http_req_tls_handshaking.......: avg=1.83ms   min=0s     med=0s       max=56.34ms  p(90)=0s     p(95)=21.59ms
     http_req_waiting...............: avg=1.55s    min=0s     med=890.31ms max=16.69s   p(90)=4.17s  p(95)=4.67s  
     http_reqs......................: 39055  73.381992/s
     iteration_duration.............: avg=5.95s    min=1.16ms med=5.01s    max=29.44s   p(90)=12.89s p(95)=14.79s 
     iterations.....................: 11555  21.711149/s
     vus............................: 265    min=1       max=265
     vus_max........................: 420    min=420     max=420

ERRO[0533] some thresholds have failed    
```