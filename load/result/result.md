# smoke

```markdown
  scenarios: (100.00%) 1 scenario, 2 max VUs, 1m30s max duration (incl. graceful stop):
* default: Up to 2 looping VUs for 1m0s over 1 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m00.0s), 0/2 VUs, 672 complete and 0 interrupted iterations
default ✓ [======================================] 0/2 VUs  1m0s

     ✓ index page check
     ✓ get stations check
     ✓ find path check

     checks.........................: 100.00% ✓ 2016      ✗ 0   
     data_received..................: 2.8 MB  47 kB/s
     data_sent......................: 287 kB  4.8 kB/s
     http_req_blocked...............: avg=82.94µs  min=0s      med=4µs     max=108.1ms  p(90)=12µs    p(95)=13µs    
     http_req_connecting............: avg=6.42µs   min=0s      med=0s      max=5.47ms   p(90)=0s      p(95)=0s      
✓ http_req_duration..............: avg=29.44ms  min=3.88ms  med=5.27ms  max=141.93ms p(90)=77.99ms p(95)=80.47ms
{ expected_response:true }...: avg=29.44ms  min=3.88ms  med=5.27ms  max=141.93ms p(90)=77.99ms p(95)=80.47ms
http_req_failed................: 0.00%   ✓ 0         ✗ 2016
http_req_receiving.............: avg=111.73µs min=8µs     med=73µs    max=6.05ms   p(90)=257µs   p(95)=291µs   
http_req_sending...............: avg=25.88µs  min=2µs     med=19µs    max=1.42ms   p(90)=57µs    p(95)=64µs    
http_req_tls_handshaking.......: avg=66.7µs   min=0s      med=0s      max=102.38ms p(90)=0s      p(95)=0s      
http_req_waiting...............: avg=29.3ms   min=3.82ms  med=5.16ms  max=141.66ms p(90)=77.74ms p(95)=80.39ms
http_reqs......................: 2016    33.580407/s
iteration_duration.............: avg=89.3ms   min=81.84ms med=86.77ms max=195.8ms  p(90)=95.39ms p(95)=109.38ms
iterations.....................: 672     11.193469/s
vus............................: 1       min=1       max=1
vus_max........................: 2       min=2       max=2

```

# load
```markdown
 scenarios: (100.00%) 1 scenario, 132 max VUs, 2m10s max duration (incl. graceful stop):
* default: Up to 132 looping VUs for 1m40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m40.0s), 000/132 VUs, 1421 complete and 0 interrupted iterations
default ✓ [======================================] 000/132 VUs  1m40s

     ✓ index page check
     ✓ get stations check
     ✓ find path check

     checks.........................: 100.00% ✓ 4263      ✗ 0    
     data_received..................: 6.4 MB  64 kB/s
     data_sent......................: 654 kB  6.5 kB/s
     http_req_blocked...............: avg=741.45µs min=0s      med=4µs    max=28.88ms p(90)=11µs  p(95)=20µs 
     http_req_connecting............: avg=175.83µs min=0s      med=0s     max=8.06ms  p(90)=0s    p(95)=0s   
✗ http_req_duration..............: avg=2.56s    min=4.01ms  med=7.18ms max=18.24s  p(90)=8.36s p(95)=9.21s
{ expected_response:true }...: avg=2.56s    min=4.01ms  med=7.18ms max=18.24s  p(90)=8.36s p(95)=9.21s
http_req_failed................: 0.00%   ✓ 0         ✗ 4263
http_req_receiving.............: avg=139.67µs min=13µs    med=104µs  max=14.23ms p(90)=251µs p(95)=315µs
http_req_sending...............: avg=32.06µs  min=3µs     med=22µs   max=11.31ms p(90)=51µs  p(95)=63µs
http_req_tls_handshaking.......: avg=552.93µs min=0s      med=0s     max=22.34ms p(90)=0s    p(95)=0s   
http_req_waiting...............: avg=2.55s    min=3.85ms  med=7.01ms max=18.24s  p(90)=8.36s p(95)=9.21s
http_reqs......................: 4263    42.611013/s
iteration_duration.............: avg=7.68s    min=98.22ms med=8.14s  max=18.26s  p(90)=9.54s p(95)=9.69s
iterations.....................: 1421    14.203671/s
vus............................: 1       min=1       max=132
vus_max........................: 132     min=132     max=132

ERRO[0101] some thresholds have failed

```

# stress

```markdown
running (1m14.5s), 000/300 VUs, 3791 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  1m0s

     ✗ index page check
      ↳  23% — ✓ 886 / ✗ 2905
     ✗ get stations check
      ↳  23% — ✓ 894 / ✗ 2897
     ✗ find path check
      ↳  23% — ✓ 899 / ✗ 2892

     checks.........................: 23.55% ✓ 2679       ✗ 8694 
     data_received..................: 31 MB  417 kB/s
     data_sent......................: 4.6 MB 61 kB/s
     http_req_blocked...............: avg=30.8ms   min=0s      med=21.22ms  max=225.98ms p(90)=83.99ms  p(95)=103.64ms
     http_req_connecting............: avg=3.95ms   min=0s      med=4.57ms   max=17.51ms  p(90)=6.11ms   p(95)=6.65ms  
✗ http_req_duration..............: avg=918.82ms min=0s      med=1.6ms    max=28.76s   p(90)=728.81ms p(95)=9.53s   
{ expected_response:true }...: avg=3.89s    min=4.02ms  med=187.36ms max=28.76s   p(90)=13.49s   p(95)=16.59s  
http_req_failed................: 76.44% ✓ 8694       ✗ 2679
http_req_receiving.............: avg=28.46µs  min=0s      med=0s       max=8.16ms   p(90)=102µs    p(95)=160µs   
http_req_sending...............: avg=1.01ms   min=0s      med=10µs     max=133.48ms p(90)=37µs     p(95)=72µs    
http_req_tls_handshaking.......: avg=27.03ms  min=0s      med=15.31ms  max=219.03ms p(90)=78.13ms  p(95)=97.54ms
http_req_waiting...............: avg=917.78ms min=0s      med=1.51ms   max=28.76s   p(90)=725.99ms p(95)=9.53s   
http_reqs......................: 11373  152.578621/s
iteration_duration.............: avg=2.85s    min=22.94ms med=147.71ms max=29.15s   p(90)=11.91s   p(95)=15.93s  
iterations.....................: 3791   50.85954/s
vus............................: 11     min=5        max=299
vus_max........................: 300    min=300      max=300

ERRO[0075] some thresholds have failed  
```