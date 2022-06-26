```
$ k6 run --out influxdb=http://localhost:8086/k6 load.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 11 max VUs, 30m30s max duration (incl. graceful stop):
           * default: Up to 11 looping VUs for 30m0s over 8 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (30m00.1s), 00/11 VUs, 12481 complete and 0 interrupted iterations
default ✓ [======================================] 00/11 VUs  30m0s

     ✓ 랜딩 페이지 점검
     ✓ 로그인 후 토큰 획득
     ✓ 모든 지하철역 개수 조회
     ✓ 지하철 최단거리 경로 조회
     ✓ 지하철 경로 즐겨찾기

     checks.........................: 100.00% ✓ 62405     ✗ 0
     data_received..................: 51 MB   28 kB/s
     data_sent......................: 13 MB   7.0 kB/s
     http_req_blocked...............: avg=10.1µs  min=921ns   med=2.47µs  max=19.14ms  p(90)=4.55µs  p(95)=5.35µs
     http_req_connecting............: avg=890ns   min=0s      med=0s      max=2.97ms   p(90)=0s      p(95)=0s
   ✓ http_req_duration..............: avg=12.61ms min=1.01ms  med=11.35ms max=577.19ms p(90)=22.19ms p(95)=28.87ms
       { expected_response:true }...: avg=12.61ms min=1.01ms  med=11.35ms max=577.19ms p(90)=22.19ms p(95)=28.87ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 62405
     http_req_receiving.............: avg=60.66µs min=12.61µs med=51.37µs max=6.84ms   p(90)=83.2µs  p(95)=103.6µs
     http_req_sending...............: avg=19.83µs min=4.55µs  med=14.84µs max=9.36ms   p(90)=27.11µs p(95)=32.08µs
     http_req_tls_handshaking.......: avg=4.62µs  min=0s      med=0s      max=12.5ms   p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=12.53ms min=954.9µs med=11.28ms max=577.1ms  p(90)=22.11ms p(95)=28.78ms
     http_reqs......................: 62405   34.667691/s
     iteration_duration.............: avg=1.06s   min=1.04s   med=1.05s   max=1.67s    p(90)=1.08s   p(95)=1.1s
     iterations.....................: 12481   6.933538/s
     vus............................: 1       min=1       max=11
     vus_max........................: 11      min=11      max=11
```
