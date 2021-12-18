
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress.js
output: -

scenarios: (100.00%) 1 scenario, 2000 max VUs, 1m20s max duration (incl. graceful stop):
* default: Up to 2000 looping VUs for 50s over 5 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0063] Request Failed                                error="Get \"https://wooobo.r-e.kr/login\": dial: i/o timeout"
WARN[0071] Request Failed                                error="Get \"https://wooobo.r-e.kr/login\": request timeout"
WARN[0071] Request Failed                                error="Get \"https://wooobo.r-e.kr/login\": request timeout"

running (1m15.7s), 0000/2000 VUs, 11126 complete and 39 interrupted iterations
default ✗ [======================================] 0000/2000 VUs  50s

     ✗ 로그인페이지_응답 load success
      ↳  99% — ✓ 11128 / ✗ 3
     ✓ 로그인_요청_응답 load success
     ✓ 수정페이지_응답 load success
     ✓ 내정보_수정_응답 load success

     checks.........................: 99.99% ✓ 44521      ✗ 3     
     data_received..................: 36 MB  477 kB/s
     data_sent......................: 6.5 MB 86 kB/s
     errorRate......................: 49.99% ✓ 22259      ✗ 22265 
     http_req_blocked...............: avg=286.48ms min=0s    med=1.06µs   max=48.75s  p(90)=1.21µs   p(95)=1.38µs  
     http_req_connecting............: avg=45.48ms  min=0s    med=0s       max=16.95s  p(90)=0s       p(95)=0s      
✗ http_req_duration..............: avg=844.49ms min=0s    med=323.36ms max=45.92s  p(90)=2.17s    p(95)=3.49s   
{ expected_response:true }...: avg=844.55ms min=4.5ms med=323.38ms max=45.92s  p(90)=2.17s    p(95)=3.49s   
http_req_failed................: 0.00%  ✓ 3          ✗ 44521
http_req_receiving.............: avg=14.4ms   min=0s    med=88.58µs  max=24.45s  p(90)=593.66µs p(95)=1.08ms  
http_req_sending...............: avg=137.88µs min=0s    med=116.16µs max=16.38ms p(90)=180.66µs p(95)=241.62µs
http_req_tls_handshaking.......: avg=240.99ms min=0s    med=0s       max=44.12s  p(90)=0s       p(95)=0s      
http_req_waiting...............: avg=829.95ms min=0s    med=322.54ms max=45.92s  p(90)=2.12s    p(95)=3.43s   
http_reqs......................: 44524  587.968652/s
iteration_duration.............: avg=5.52s    min=1.02s med=3.15s    max=1m1s    p(90)=13.03s   p(95)=18.38s  
iterations.....................: 11126  146.926135/s
vus............................: 4      min=4        max=2000
vus_max........................: 2000   min=2000     max=2000
