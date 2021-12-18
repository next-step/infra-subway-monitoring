- VU 1000명 진행 시
```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 40s max duration (incl. graceful stop):
           * default: 300 looping VUs for 10s (gracefulStop: 30s)


running (10.1s), 000/300 VUs, 1500 complete and 0 interrupted iterations
default ✓ [======================================] 300 VUs  10s

     ✓ reached request rate

     checks.........................: 100.00% ✓ 1500       ✗ 0
     data_received..................: 1.7 MB  173 kB/s
     data_sent......................: 185 kB  18 kB/s
     http_req_blocked...............: avg=3.81ms   min=3.45µs  med=5.13µs  max=60.47ms  p(90)=20.49ms  p(95)=27.47ms
     http_req_connecting............: avg=2.34ms   min=0s      med=0s      max=36.67ms  p(90)=8.43ms   p(95)=12.43ms
   ✓ http_req_duration..............: avg=60.84ms  min=2.23ms  med=14.61ms max=246.79ms p(90)=196.13ms p(95)=214.34ms
       { expected_response:true }...: avg=60.84ms  min=2.23ms  med=14.61ms max=246.79ms p(90)=196.13ms p(95)=214.34ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 1500
     http_req_receiving.............: avg=198.51µs min=18.89µs med=33.04µs max=10.44ms  p(90)=107.99µs p(95)=622.04µs
     http_req_sending...............: avg=1.03ms   min=8.87µs  med=16.05µs max=15.63ms  p(90)=2.69ms   p(95)=7.36ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=59.61ms  min=2.15ms  med=13.04ms max=246.41ms p(90)=194.09ms p(95)=209.55ms
     http_reqs......................: 1500    148.659449/s
     iteration_duration.............: avg=2s       min=1.99s   med=2s      max=2.02s    p(90)=2s       p(95)=2.01s
     iterations.....................: 1500    148.659449/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300

```
- VU 2000명 진행 시 중간에 에러 발생
  ```
  WARN[0061] Request Failed error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.149.238:80: socket: too many open files"
  ```
```bash
unning (1m01.1s), 0000/2000 VUs, 60754 complete and 0 interrupted iterations
default ✗ [======================================] 0000/2000 VUs  1m0s

     ✗ lending page
      ↳  75% — ✓ 45785 / ✗ 14969

     checks.........................: 75.36% ✓ 45785      ✗ 14969
     data_received..................: 53 MB  870 kB/s
     data_sent......................: 5.6 MB 92 kB/s
     http_req_blocked...............: avg=23.98µs  min=0s     med=5.41µs  max=19.36ms  p(90)=7.62µs  p(95)=14.54µs
     http_req_connecting............: avg=14.87µs  min=0s     med=0s      max=19.28ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=5.43ms   min=0s     med=3.03ms  max=376.62ms p(90)=5.75ms  p(95)=9.02ms
       { expected_response:true }...: avg=7.21ms   min=1.92ms med=3.31ms  max=376.62ms p(90)=6.77ms  p(95)=11.34ms
     http_req_failed................: 24.63% ✓ 14969      ✗ 45785
     http_req_receiving.............: avg=131.7µs  min=0s     med=35.58µs max=84.89ms  p(90)=88.41µs p(95)=200.35µs
     http_req_sending...............: avg=231.16µs min=0s     med=14.7µs  max=98.36ms  p(90)=94.84µs p(95)=329.52µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=5.07ms   min=0s     med=2.92ms  max=278.49ms p(90)=5.42ms  p(95)=8.37ms
     http_reqs......................: 60754  994.192702/s
     iteration_duration.............: avg=1s       min=1s     med=1s      max=1.37s    p(90)=1s      p(95)=1.01s
     iterations.....................: 60754  994.192702/s
     vus............................: 295    min=34       max=1975
     vus_max........................: 2000   min=2000     max=2000

```