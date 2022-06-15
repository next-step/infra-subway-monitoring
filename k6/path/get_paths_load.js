import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 29 },
        { duration: '5m', target: 29 },
        { duration: '1m', target: 70 },
        { duration: '5m', target: 70 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://subway.geunhwanlee.p-e.kr';

export default function ()  {
    let source = Math.floor(Math.random() * 257) + 1;
    let target = Math.floor(Math.random() * 257) + 1;
    while (source === target) {
        target = Math.floor(Math.random() * 257) + 1;
    }
    let response = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);

    check(response, {
        'response code 200': (res) => res.status === 200
    });
    sleep(1);
};
