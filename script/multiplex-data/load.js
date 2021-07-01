import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 300, // 1 user looping for 1 minute
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
running (1m59.0s), 000/300 VUs, 4911 complete and 0 interrupted iterations
default ✓ [======================================] 300 VUs  1m40s

     ✗ find path in successfully
      ↳  30% — ✓ 1502 / ✗ 3409

     checks.........................: 30.58% ✓ 1502      ✗ 3409
     data_received..................: 22 MB  185 kB/s
     data_sent......................: 2.6 MB 22 kB/s
     http_req_blocked...............: avg=32.46ms min=0s       med=4.56ms   max=631.86ms p(90)=10.47ms  p(95)=356.84ms
     http_req_connecting............: avg=3.94ms  min=374.62µs med=554.1µs  max=82.88ms  p(90)=5.26ms   p(95)=28.83ms
   ✗ http_req_duration..............: avg=5.59s   min=0s       med=839.32µs max=35.16s   p(90)=20.01s   p(95)=20.17s
       { expected_response:true }...: avg=18.14s  min=637.36ms med=19.77s   max=35.16s   p(90)=20.27s   p(95)=20.39s
     http_req_failed................: 69.41% ✓ 3409      ✗ 1502
     http_req_receiving.............: avg=99.02µs min=0s       med=86.52µs  max=13.41ms  p(90)=142.95µs p(95)=165.79µs
     http_req_sending...............: avg=2.47ms  min=0s       med=58.19µs  max=170.32ms p(90)=118.45µs p(95)=7.3ms
     http_req_tls_handshaking.......: avg=28.84ms min=0s       med=3.88ms   max=573.36ms p(90)=8.8ms    p(95)=325.05ms
     http_req_waiting...............: avg=5.59s   min=0s       med=634.57µs max=35.16s   p(90)=20.01s   p(95)=20.17s
     http_reqs......................: 4911   41.270301/s
     iteration_duration.............: avg=6.63s   min=1s       med=1s       max=36.17s   p(90)=21.02s   p(95)=21.18s
     iterations.....................: 4911   41.270301/s
     vus............................: 18     min=18      max=300
     vus_max........................: 300    min=300     max=300

ERRO[0120] some thresholds have failed*/
