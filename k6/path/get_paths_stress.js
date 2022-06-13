import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 200 },
        { duration: '1m', target: 250 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://subway.geunhwanlee.p-e.kr';

export default function ()  {
    let source = '257';
    let target = '1';
    let response = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);

    check(response, {
        'response code 200': (res) => res.status === 200
    });
    sleep(1);
};
