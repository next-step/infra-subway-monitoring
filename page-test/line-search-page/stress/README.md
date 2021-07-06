# 데이터를 조회하는데 여러 데이터를 참조하는 페이지 Stress Test
## 스크립트
```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
	{duration: '10s', target: 100},
        {duration: '10s', target: 200},
        {duration: '10s', target: 300},
        {duration: '10s', target: 400},
        {duration: '10s', target: 500},
	{duration: '10s', target: 600},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://nextstep.5minho.p-e.kr/';

function 경로_검색(source, target) {
    let pathRes = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);
    check(pathRes, {'find path': (res) => res.status === 200});
}

function 지하철_조회() {
    let stationsRes = http.get(`${BASE_URL}/stations`);
    check(stationsRes, {'find stations': (res) => res.status === 200});
}

export default function ()  {
    지하철_조회();
    경로_검색(103, 102);
}
```
## 결과
```javascript

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: multi-select-stress.js
     output: -

  scenarios: (100.00%) 1 scenario, 600 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 600 looping VUs for 1m0s over 6 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (1m04.5s), 000/600 VUs, 6926 complete and 0 interrupted iterations
default ✗ [======================================] 000/600 VUs  1m0s

     ✗ find stations
      ↳  99% — ✓ 6887 / ✗ 39
     ✗ find path
      ↳  99% — ✓ 6906 / ✗ 20

     checks.........................: 99.57% ✓ 13793      ✗ 59
     data_received..................: 504 MB 7.8 MB/s
     data_sent......................: 2.2 MB 34 kB/s
     http_req_blocked...............: avg=410.71µs min=0s      med=4.64µs   max=81.35ms p(90)=6.42µs  p(95)=6.22ms
     http_req_connecting............: avg=68µs     min=0s      med=0s       max=22.24ms p(90)=0s      p(95)=489.31µs
   ✗ http_req_duration..............: avg=1.4s     min=0s      med=1.35s    max=5.1s    p(90)=2.6s    p(95)=2.78s
       { expected_response:true }...: avg=1.41s    min=18.93ms med=1.36s    max=5.1s    p(90)=2.6s    p(95)=2.78s
     http_req_failed................: 0.42%  ✓ 59         ✗ 13793
     http_req_receiving.............: avg=4.05ms   min=0s      med=123.54µs max=129.7ms p(90)=10.74ms p(95)=24.08ms
     http_req_sending...............: avg=87.51µs  min=0s      med=14.99µs  max=14.48ms p(90)=27.7µs  p(95)=49.72µs
     http_req_tls_handshaking.......: avg=272.86µs min=0s      med=0s       max=51.31ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1.4s     min=0s      med=1.34s    max=5.1s    p(90)=2.59s   p(95)=2.78s
     http_reqs......................: 13852  214.682461/s
     iteration_duration.............: avg=2.81s    min=12.63ms med=2.77s    max=8.66s   p(90)=5.08s   p(95)=5.43s
     iterations.....................: 6926   107.34123/s
     vus............................: 99     min=10       max=599
     vus_max........................: 600    min=600      max=600

ERRO[0066] some thresholds have failed
```
경로 검색 페이지는 vux 550 ~ 600 사이에서 실패하는 요청이 등장했다. <br>
경로 검색 페이지의 API 가 많이 무거워 다른 페이지에 비해 rps 적게 나온다 <br>
하지만 경로 검색 페이지의 데이터들은 한번 추가되면 잘 안바뀌는 데이터이고, 많은 유저들이 조회하는 데이터이기 때문에 캐시를 통해 큰 개선을 얻을 수 있을 것 같다
