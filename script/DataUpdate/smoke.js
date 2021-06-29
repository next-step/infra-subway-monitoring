import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

    vus: 1, // 1 user looping for 1 minute
    duration: '100s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

let i = 0;
const BASE_URL = 'http://13.124.137.208:8080';
const USERNAME = 'zxc@naver.com' + i++;
const PASSWORD = 'zxc' + i++;

export default function ()  {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/members`, payload, params);

    check(loginRes, {
        'created in successfully': (resp) => resp.status == 201,
    });
    sleep(1);
};

/**
 *
 /\      |‾‾| /‾‾/   /‾‾/
 /\  /  \     |  |/  /   /  /
 /  \/    \    |     (   /   ‾‾\
 /          \   |  |\  \ |  (‾)  |
 / __________ \  |__| \__\ \_____/ .io

 execution: local
 script: smoke.js
 output: -

 scenarios: (100.00%) 1 scenario, 1 max VUs, 2m10s max duration (incl. graceful stop):
 * default: 1 looping VUs for 1m40s (gracefulStop: 30s)


 running (1m40.0s), 0/1 VUs, 95 complete and 0 interrupted iterations
 default ✓ [======================================] 1 VUs  1m40s

 ✓ created in successfully

 checks.........................: 100.00% ✓ 95  ✗ 0
 data_received..................: 9.1 kB  91 B/s
 data_sent......................: 19 kB   188 B/s
 http_req_blocked...............: avg=275.58µs min=3µs     med=5µs     max=25.62ms  p(90)=8µs     p(95)=8µs
 http_req_connecting............: avg=268.64µs min=0s      med=0s      max=25.52ms  p(90)=0s      p(95)=0s
 ✓ http_req_duration..............: avg=50.21ms  min=25.56ms med=35.76ms max=310.82ms p(90)=59.34ms p(95)=195.58ms
 { expected_response:true }...: avg=50.21ms  min=25.56ms med=35.76ms max=310.82ms p(90)=59.34ms p(95)=195.58ms
 http_req_failed................: 0.00%   ✓ 0   ✗ 95
 http_req_receiving.............: avg=57.02µs  min=31µs    med=51µs    max=142µs    p(90)=87.8µs  p(95)=93.9µs
 http_req_sending...............: avg=36.8µs   min=16µs    med=31µs    max=252µs    p(90)=47µs    p(95)=50.59µs
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=50.11ms  min=25.47ms med=35.64ms max=310.51ms p(90)=59.24ms p(95)=195.48ms
 http_reqs......................: 95      0.949636/s
 iteration_duration.............: avg=1.05s    min=1.02s   med=1.03s   max=1.34s    p(90)=1.06s   p(95)=1.19s
 iterations.....................: 95      0.949636/s
 vus............................: 1       min=1 max=1
 vus_max........................: 1       min=1 max=1


 58.140.210.244 - - [29/Jun/2021:16:33:33 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:34.396  INFO 2417 --- [nio-8080-exec-2] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=92, email='zxc@naver.com0', age=30}
 58.140.210.244 - - [29/Jun/2021:16:33:34 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:35.431  INFO 2417 --- [nio-8080-exec-3] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=93, email='zxc@naver.com0', age=30}
 58.140.210.244 - - [29/Jun/2021:16:33:35 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:36.469  INFO 2417 --- [nio-8080-exec-4] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=94, email='zxc@naver.com0', age=30}
 58.140.210.244 - - [29/Jun/2021:16:33:36 +0000] "POST /members HTTP/1.1" 201 0
 2021-06-29 16:33:37.509  INFO 2417 --- [nio-8080-exec-5] n.subway.member.ui.MemberController      : MemberController.createMember - MemberResponse{id=95, email='zxc@naver.com0', age=30}

 성공적으로 생성되는 것을 확인함
 */