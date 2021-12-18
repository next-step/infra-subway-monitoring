
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: stress.js
output: -

scenarios: (100.00%) 1 scenario, 2000 max VUs, 1m30s max duration (incl. graceful stop):
* default: Up to 2000 looping VUs for 1m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0057] Request Failed                                error="Get \"https://wooobo.r-e.kr/login\": dial: i/o timeout"
WARN[0057] Request Failed                                error="Get \"https://wooobo.r-e.kr/login\": dial: i/o timeout"
WARN[0059] Request Failed                                error="Get \"https://wooobo.r-e.kr/login\": dial: i/o timeout"

running (1m00.1s), 0000/2000 VUs, 5507 complete and 1473 interrupted iterations
default ✗ [======================================] 1474/2000 VUs  1m0s

     ✗ 로그인페이지_응답 load success
      ↳  99% — ✓ 6801 / ✗ 3
     ✓ 로그인_요청_응답 load success
     ✓ 경로검색_페이지_응답 load success
     ✓ 경로_검색_응답 load success
     ✓ 경로_좋아요_응답 load success

     checks.........................: 99.99% ✓ 31432      ✗ 3     
     data_received..................: 47 MB  784 kB/s
     data_sent......................: 5.5 MB 91 kB/s
✗ errorRate......................: 38.96% ✓ 12249      ✗ 19186
http_req_blocked...............: avg=240.81ms min=0s     med=1.07µs   max=34.6s   p(90)=1.23µs   p(95)=21.54ms
http_req_connecting............: avg=40.6ms   min=0s     med=0s       max=16.2s   p(90)=0s       p(95)=6.92ms  
✗ http_req_duration..............: avg=1.8s     min=0s     med=1.09s    max=34.2s   p(90)=3.78s    p(95)=5.59s   
{ expected_response:true }...: avg=1.78s    min=4.66ms med=1.05s    max=34.2s   p(90)=3.79s    p(95)=5.68s   
http_req_failed................: 17.96% ✓ 5647       ✗ 25788
http_req_receiving.............: avg=35.41ms  min=0s     med=122.91µs max=21.81s  p(90)=1.01ms   p(95)=3.41ms  
http_req_sending...............: avg=139.22µs min=0s     med=119.02µs max=11.65ms p(90)=186.74µs p(95)=258.69µs
http_req_tls_handshaking.......: avg=200.18ms min=0s     med=0s       max=34.16s  p(90)=0s       p(95)=14.24ms
http_req_waiting...............: avg=1.76s    min=0s     med=1.06s    max=34.2s   p(90)=3.7s     p(95)=5.52s   
http_reqs......................: 31435  522.957279/s
iteration_duration.............: avg=9.69s    min=1.07s  med=8.18s    max=40.48s  p(90)=18.72s   p(95)=23.96s  
iterations.....................: 5507   91.615261/s
vus............................: 1476   min=50       max=2000
vus_max........................: 2000   min=2000     max=2000

