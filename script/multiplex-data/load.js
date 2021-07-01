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
running (2m10.0s), 000/250 VUs, 869 complete and 59 interrupted iterations
default ✓ [======================================] 250 VUs  1m40s

     ✗ find path in successfully
      ↳  29% — ✓ 256 / ✗ 617

     checks.........................: 29.32% ✓ 256      ✗ 617
     data_received..................: 3.7 MB 28 kB/s
     data_sent......................: 425 kB 3.3 kB/s
     http_req_blocked...............: avg=91.35ms  min=0s    med=4.61ms   max=564.53ms p(90)=375.1ms  p(95)=525.96ms
     http_req_connecting............: avg=5.5ms    min=0s    med=546.64µs max=38.52ms  p(90)=18.17ms  p(95)=31.11ms
   ✗ http_req_duration..............: avg=31.96s   min=0s    med=31.65s   max=59.99s   p(90)=50.59s   p(95)=53.16s
       { expected_response:true }...: avg=30.16s   min=1.16s med=37.85s   max=59.91s   p(90)=55.91s   p(95)=58.66s
     http_req_failed................: 70.67% ✓ 617      ✗ 256
     http_req_receiving.............: avg=138.97µs min=0s    med=80.02µs  max=13.94ms  p(90)=121.26µs p(95)=141.94µs
     http_req_sending...............: avg=3.25ms   min=0s    med=63.43µs  max=111.67ms p(90)=10.61ms  p(95)=17.87ms
     http_req_tls_handshaking.......: avg=80.89ms  min=0s    med=3.9ms    max=506.08ms p(90)=333.96ms p(95)=473.89ms
     http_req_waiting...............: avg=31.95s   min=0s    med=31.65s   max=59.99s   p(90)=50.59s   p(95)=53.16s
     http_reqs......................: 873    6.714687/s
     iteration_duration.............: avg=33.03s   min=1s    med=32.62s   max=1m1s     p(90)=51.63s   p(95)=54.16s
     iterations.....................: 869    6.683921/s
     vus............................: 60     min=60     max=250
     vus_max........................: 250    min=250    max=250

ERRO[0131] some thresholds have failed

*/
