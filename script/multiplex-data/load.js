import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 250, // 1 user looping for 1 minute
    duration: '100s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra-subway.kro.kr';

export default function () {

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathRes = http.get(`${BASE_URL}/paths?source=1&target=16`, params);

    check(pathRes, {
        'find path in successfully': (resp) => resp.status == 200
    });
    sleep(1);
};

/*
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load-multiplex.js
     output: -

  scenarios: (100.00%) 1 scenario, 250 max VUs, 2m10s max duration (incl. graceful stop):
           * default: 250 looping VUs for 1m40s (gracefulStop: 30s)


running (1m42.0s), 000/250 VUs, 11112 complete and 0 interrupted iterations
default ✓ [======================================] 250 VUs  1m40s

     ✓ find path in successfully

     checks.........................: 100.00% ✓ 11112      ✗ 0
     data_received..................: 35 MB   343 kB/s
     data_sent......................: 2.0 MB  19 kB/s
     http_req_blocked...............: avg=13.43ms  min=3.53µs  med=6.26µs  max=767.31ms p(90)=8.56µs  p(95)=19.39µs
     http_req_connecting............: avg=650.15µs min=0s      med=0s      max=57.51ms  p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=1.25s    min=40.3ms  med=1.25s   max=3.81s    p(90)=1.39s   p(95)=1.46s
       { expected_response:true }...: avg=1.25s    min=40.3ms  med=1.25s   max=3.81s    p(90)=1.39s   p(95)=1.46s
     http_req_failed................: 0.00%   ✓ 0          ✗ 11112
     http_req_receiving.............: avg=86.19µs  min=24.69µs med=59.72µs max=35.86ms  p(90)=93.29µs p(95)=123.5µs
     http_req_sending...............: avg=607.47µs min=10.62µs med=19.62µs max=237.55ms p(90)=36.7µs  p(95)=58.45µs
     http_req_tls_handshaking.......: avg=12.41ms  min=0s      med=0s      max=736.16ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1.25s    min=40.23ms med=1.25s   max=3.8s     p(90)=1.39s   p(95)=1.46s
     http_reqs......................: 11112   108.931744/s
     iteration_duration.............: avg=2.27s    min=1.04s   med=2.25s   max=5.53s    p(90)=2.4s    p(95)=2.48s
     iterations.....................: 11112   108.931744/s
     vus............................: 2       min=2        max=250
     vus_max........................: 250     min=250      max=250

*/
