# smoke

```markdown
  scenarios: (100.00%) 1 scenario, 5 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 5 looping VUs for 1m0s over 1 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.2s), 0/5 VUs, 515 complete and 0 interrupted iterations
default ✓ [======================================] 0/5 VUs  1m0s

     ✓ index page check
     ✓ get stations check
     ✓ find path check

     checks.........................: 100.00% ✓ 1545      ✗ 0   
     data_received..................: 38 MB   631 kB/s
     data_sent......................: 224 kB  3.7 kB/s
     http_req_blocked...............: avg=78.57µs  min=0s       med=6µs     max=30.33ms  p(90)=13µs     p(95)=14µs    
     http_req_connecting............: avg=14.1µs   min=0s       med=0s      max=6.24ms   p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=96.9ms   min=4.11ms   med=89.07ms max=645.63ms p(90)=217.06ms p(95)=248.94ms
       { expected_response:true }...: avg=96.9ms   min=4.11ms   med=89.07ms max=645.63ms p(90)=217.06ms p(95)=248.94ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 1545
     http_req_receiving.............: avg=1.4ms    min=15µs     med=219µs   max=27.25ms  p(90)=4.67ms   p(95)=5.86ms  
     http_req_sending...............: avg=60.22µs  min=3µs      med=32µs    max=11.92ms  p(90)=60µs     p(95)=68µs    
     http_req_tls_handshaking.......: avg=55.08µs  min=0s       med=0s      max=25.29ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=95.43ms  min=4.05ms   med=85.84ms max=645.48ms p(90)=216.86ms p(95)=248.69ms
     http_reqs......................: 1545    25.675682/s
     iteration_duration.............: avg=292.16ms min=126.48ms med=286.7ms max=1.04s    p(90)=385.87ms p(95)=406.4ms 
     iterations.....................: 515     8.558561/s
     vus............................: 4       min=1       max=4 
     vus_max........................: 5       min=5       max=5
```

# load
```markdown
  scenarios: (100.00%) 1 scenario, 30 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 30 looping VUs for 1m0s over 1 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m02.0s), 00/30 VUs, 439 complete and 0 interrupted iterations
default ✓ [======================================] 00/30 VUs  1m0s

     ✓ index page check
     ✓ get stations check
     ✓ find path check

     checks.........................: 100.00% ✓ 1317     ✗ 0   
     data_received..................: 33 MB   524 kB/s
     data_sent......................: 200 kB  3.2 kB/s
     http_req_blocked...............: avg=599.13µs min=0s       med=7µs      max=36.37ms p(90)=14µs  p(95)=19µs   
     http_req_connecting............: avg=124.38µs min=0s       med=0s       max=8.44ms  p(90)=0s    p(95)=0s     
   ✓ http_req_duration..............: avg=709.03ms min=4.31ms   med=751.18ms max=2.16s   p(90)=1.5s  p(95)=1.68s  
       { expected_response:true }...: avg=709.03ms min=4.31ms   med=751.18ms max=2.16s   p(90)=1.5s  p(95)=1.68s  
     http_req_failed................: 0.00%   ✓ 0        ✗ 1317
     http_req_receiving.............: avg=2.76ms   min=15µs     med=213µs    max=53.66ms p(90)=6.7ms p(95)=11.77ms
     http_req_sending...............: avg=52.43µs  min=3µs      med=31µs     max=10.31ms p(90)=61µs  p(95)=73.19µs
     http_req_tls_handshaking.......: avg=455.29µs min=0s       med=0s       max=29.31ms p(90)=0s    p(95)=0s     
     http_req_waiting...............: avg=706.21ms min=4.22ms   med=750.01ms max=2.16s   p(90)=1.5s  p(95)=1.68s  
     http_reqs......................: 1317    21.2501/s
     iteration_duration.............: avg=2.13s    min=418.52ms med=2.31s    max=3.96s   p(90)=2.9s  p(95)=3.08s  
     iterations.....................: 439     7.083367/s
     vus............................: 19      min=1      max=29
     vus_max........................: 30      min=30     max=30

```

# stress

```markdown
  scenarios: (100.00%) 1 scenario, 100 max VUs, 4m30s max duration (incl. graceful stop):
           * default: Up to 100 looping VUs for 4m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (4m06.9s), 000/100 VUs, 2521 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  4m0s

     ✓ index page check
     ✓ get stations check
     ✓ find path check

     checks.........................: 100.00% ✓ 7563      ✗ 0    
     data_received..................: 186 MB  754 kB/s
     data_sent......................: 1.1 MB  4.6 kB/s
     http_req_blocked...............: avg=384.01µs min=0s       med=7µs   max=67.59ms p(90)=13µs   p(95)=14µs  
     http_req_connecting............: avg=73.2µs   min=0s       med=0s    max=9.32ms  p(90)=0s     p(95)=0s    
   ✗ http_req_duration..............: avg=1.74s    min=3.57ms   med=1.57s max=5.41s   p(90)=4.01s  p(95)=4.29s 
       { expected_response:true }...: avg=1.74s    min=3.57ms   med=1.57s max=5.41s   p(90)=4.01s  p(95)=4.29s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7563 
     http_req_receiving.............: avg=1.9ms    min=13µs     med=215µs max=96.93ms p(90)=5.32ms p(95)=5.96ms
     http_req_sending...............: avg=44.4µs   min=3µs      med=34µs  max=11.7ms  p(90)=62µs   p(95)=69µs  
     http_req_tls_handshaking.......: avg=298.64µs min=0s       med=0s    max=59.63ms p(90)=0s     p(95)=0s    
     http_req_waiting...............: avg=1.74s    min=3.54ms   med=1.57s max=5.41s   p(90)=4.01s  p(95)=4.28s 
     http_reqs......................: 7563    30.635019/s
     iteration_duration.............: avg=5.23s    min=626.58ms med=5.39s max=9.29s   p(90)=8.46s  p(95)=8.72s 
     iterations.....................: 2521    10.211673/s
     vus............................: 20      min=1       max=99 
     vus_max........................: 100     min=100     max=100

ERRO[0247] some thresholds have failed   
```