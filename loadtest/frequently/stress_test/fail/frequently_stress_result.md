- 결과
```
running (22m01.0s), 0000/1500 VUs, 530327 complete and 0 interrupted iterations
default ✗ [======================================] 0000/1500 VUs  22m0s

     ✗ lending page
      ↳  97% — ✓ 516202 / ✗ 14125

     checks.........................: 97.33% ✓ 516202    ✗ 14125
     data_received..................: 599 MB 454 kB/s
     data_sent......................: 64 MB  48 kB/s
     http_req_blocked...............: avg=16.47µs min=0s     med=6.09µs  max=53.02ms  p(90)=8.92µs  p(95)=12.09µs
     http_req_connecting............: avg=6.1µs   min=0s     med=0s      max=50.93ms  p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=3.83ms  min=0s     med=3.35ms  max=303.24ms p(90)=5.06ms  p(95)=6.28ms
       { expected_response:true }...: avg=3.94ms  min=1.89ms med=3.37ms  max=303.24ms p(90)=5.1ms   p(95)=6.34ms
     http_req_failed................: 2.66%  ✓ 14125     ✗ 516202
     http_req_receiving.............: avg=77.98µs min=0s     med=46.81µs max=57.04ms  p(90)=94.25µs p(95)=184.03µs
     http_req_sending...............: avg=70.35µs min=0s     med=16.76µs max=47.41ms  p(90)=73.47µs p(95)=207.78µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=3.68ms  min=0s     med=3.24ms  max=301.84ms p(90)=4.87ms  p(95)=6.02ms
     http_reqs......................: 530327 401.45606/s
     iteration_duration.............: avg=1s      min=1s     med=1s      max=1.3s     p(90)=1s      p(95)=1s
     iterations.....................: 530327 401.45606/s
     vus............................: 2      min=2       max=1499
     vus_max........................: 1500   min=1500    max=1500
```
- 에러 내용
```
WARN[0748] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.168.150:80: socket: too many open files"
WARN[0748] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.168.150:80: socket: too many open files"
WARN[0748] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.168.150:80: socket: too many open files"
WARN[0748] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.149.238:80: socket: too many open files"
WARN[0748] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.168.150:80: socket: too many open files"
WARN[0748] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.149.238:80: socket: too many open files"
WARN[0749] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.149.238:80: socket: too many open files"
WARN[0749] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.149.238:80: socket: too many open files"
WARN[0749] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.149.238:80: socket: too many open files"
WARN[0749] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.168.150:80: socket: too many open files"
WARN[0749] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.168.150:80: socket: too many open files"
WARN[0749] Request Failed                                error="Get \"http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com\": dial tcp 15.165.168.150:80: socket: too many open files"

```