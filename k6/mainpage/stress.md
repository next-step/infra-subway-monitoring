          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress.js
output: -

scenarios: (100.00%) 1 scenario, 2000 max VUs, 4m30s max duration (incl. graceful stop):
* default: Up to 2000 looping VUs for 4m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0141] Request Failed                                error="Get \"https://wooobo.r-e.kr\": dial: i/o timeout"
WARN[0148] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0149] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0153] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0153] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0159] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0159] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0161] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0162] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0162] Request Failed                                error="request timeout"
WARN[0163] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0164] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0164] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0165] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0166] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0166] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0167] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0167] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0167] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0168] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0169] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0169] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0173] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0173] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0174] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0177] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0179] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0180] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0182] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0185] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0187] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0189] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0192] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0195] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0196] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0198] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0199] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0201] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0201] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0201] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0202] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0203] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0205] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0205] Request Failed                                error="request timeout"
WARN[0214] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0217] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0221] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0222] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0226] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"
WARN[0243] Request Failed                                error="Get \"https://wooobo.r-e.kr\": request timeout"

running (4m04.1s), 0000/2000 VUs, 143097 complete and 4 interrupted iterations
default ✓ [======================================] 0000/2000 VUs  4m0s

     ✗ page load success
      ↳  99% — ✓ 143048 / ✗ 50

✓ check_failure_rate.............: 0.00%  ✓ 0          ✗ 143098
checks.........................: 99.96% ✓ 143048     ✗ 50    
data_received..................: 158 MB 647 kB/s
data_sent......................: 7.3 MB 30 kB/s
✓ errorRate......................: 0.03%  ✓ 50         ✗ 143048
http_req_blocked...............: avg=42.07ms  min=0s     med=1.03µs   max=59.96s p(90)=1.1µs    p(95)=1.13µs
http_req_connecting............: avg=8.87ms   min=0s     med=0s       max=16.22s p(90)=0s       p(95)=0s     
✗ http_req_duration..............: avg=1.06s    min=0s     med=560.81ms max=1m0s   p(90)=2.61s    p(95)=3.82s  
{ expected_response:true }...: avg=1.05s    min=4.47ms med=560.61ms max=59.94s p(90)=2.6s     p(95)=3.8s   
http_req_failed................: 0.03%  ✓ 50         ✗ 143048
http_req_receiving.............: avg=22.34ms  min=0s     med=247.39µs max=52.22s p(90)=1.03ms   p(95)=1.53ms
http_req_sending...............: avg=518.08µs min=0s     med=102.91µs max=59.36s p(90)=129.14µs p(95)=158.4µs
http_req_tls_handshaking.......: avg=33.32ms  min=0s     med=0s       max=59.31s p(90)=0s       p(95)=0s     
http_req_waiting...............: avg=1.04s    min=0s     med=555.01ms max=1m0s   p(90)=2.55s    p(95)=3.72s  
http_reqs......................: 143098 586.219517/s
iteration_duration.............: avg=2.11s    min=1s     med=1.56s    max=1m1s   p(90)=3.65s    p(95)=4.97s  
iterations.....................: 143097 586.215421/s
vus............................: 1      min=1        max=2000
vus_max........................: 2000   min=2000     max=2000
