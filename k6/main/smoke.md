```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
/          \   |  |\  \ |  (‾)  |
/ __________ \  |__| \__\ \_____/ .io

execution: local
script: smoke.js
output: -

scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
* default: 1 looping VUs for 10s (gracefulStop: 30s)


running (10.1s), 0/1 VUs, 10 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  10s

     ✓ main connect successfully

✓ checks.........................: 100.00% ✓ 10       ✗ 0
data_received..................: 16 kB   1.6 kB/s
data_sent......................: 1.0 kB  101 B/s
http_req_blocked...............: avg=2.21ms   min=2.9µs   med=3.04µs   max=22.07ms  p(90)=2.21ms   p(95)=12.14ms
http_req_connecting............: avg=126.93µs min=0s      med=0s       max=1.26ms   p(90)=126.93µs p(95)=698.14µs
✓ http_req_duration..............: avg=5.8ms    min=4.37ms  med=4.68ms   max=12.37ms  p(90)=9.21ms   p(95)=10.79ms
{ expected_response:true }...: avg=5.8ms    min=4.37ms  med=4.68ms   max=12.37ms  p(90)=9.21ms   p(95)=10.79ms
http_req_failed................: 0.00%   ✓ 0        ✗ 10
http_req_receiving.............: avg=80.64µs  min=63.1µs  med=78.15µs  max=113.14µs p(90)=93.63µs  p(95)=103.38µs
http_req_sending...............: avg=116.47µs min=96.72µs med=106.15µs max=211.08µs p(90)=125.09µs p(95)=168.09µs
http_req_tls_handshaking.......: avg=1.75ms   min=0s      med=0s       max=17.56ms  p(90)=1.75ms   p(95)=9.65ms
http_req_waiting...............: avg=5.6ms    min=4.18ms  med=4.46ms   max=12.07ms  p(90)=9.02ms   p(95)=10.55ms
http_reqs......................: 10      0.991076/s
iteration_duration.............: avg=1s       min=1s      med=1s       max=1.03s    p(90)=1.01s    p(95)=1.02s
iterations.....................: 10      0.991076/s
vus............................: 1       min=1      max=1
vus_max........................: 1       min=1      max=1

```
