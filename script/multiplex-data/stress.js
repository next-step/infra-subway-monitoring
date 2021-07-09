import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '2s', target: 100 },
        { duration: '5s', target: 100 },
        { duration: '2s', target: 200 },
        { duration: '5s', target: 200 },
        { duration: '2s', target: 300 },
        { duration: '5s', target: 300 },
        { duration: '2s', target: 400 },
        { duration: '5s', target: 400 },
        { duration: '2s', target: 500 },
        { duration: '5s', target: 500 },
        { duration: '2s', target: 600 },
        { duration: '5s', target: 600 },
        { duration: '2s', target: 700 },
        { duration: '5s', target: 700 },
        { duration: '2s', target: 800 },
        { duration: '5s', target: 800 },
        { duration: '2s', target: 900 },
        { duration: '5s', target: 900 },
        { duration: '2s', target: 1000 },
        { duration: '5s', target: 1000 },
        { duration: '2s', target: 1100 },
        { duration: '5s', target: 1100 },
        { duration: '10s', target: 0 },
    ],
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
running (1m45.4s), 0000/1100 VUs, 30996 complete and 0 interrupted iterations
default ✓ [======================================] 0000/1100 VUs  1m27s

     ✗ find path in successfully
      ↳  3% — ✓ 1192 / ✗ 29804

     checks.........................: 3.84%  ✓ 1192       ✗ 29804
     data_received..................: 32 MB  301 kB/s
     data_sent......................: 10 MB  99 kB/s
     http_req_blocked...............: avg=2.63ms   min=0s      med=0s     max=314.9ms  p(90)=7ms      p(95)=12.72ms
     http_req_connecting............: avg=17.35ms  min=0s      med=3.93ms max=283.95ms p(90)=51.27ms  p(95)=90.64ms
   ✗ http_req_duration..............: avg=722.74ms min=0s      med=0s     max=35.29s   p(90)=924.87µs p(95)=5.61ms
       { expected_response:true }...: avg=18.19s   min=718.1ms med=21.89s max=30.68s   p(90)=24.83s   p(95)=25.1s
     http_req_failed................: 96.15% ✓ 29804      ✗ 1192
     http_req_receiving.............: avg=96.71µs  min=0s      med=0s     max=134.63ms p(90)=78.52µs  p(95)=108.55µs
     http_req_sending...............: avg=112.87µs min=0s      med=0s     max=99.67ms  p(90)=57.94µs  p(95)=98.14µs
     http_req_tls_handshaking.......: avg=2.13ms   min=0s      med=0s     max=305.91ms p(90)=5.67ms   p(95)=10.32ms
     http_req_waiting...............: avg=722.53ms min=0s      med=0s     max=35.28s   p(90)=636.53µs p(95)=3.38ms
     http_reqs......................: 30996  293.997264/s
     iteration_duration.............: avg=1.76s    min=1s      med=1.01s  max=36.3s    p(90)=1.15s    p(95)=1.33s
     iterations.....................: 30996  293.997264/s
     vus............................: 12     min=12       max=1100
     vus_max........................: 1100   min=1100     max=1100

ERRO[0107] some thresholds have failed*/
