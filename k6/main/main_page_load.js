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
    let response = http.get(`${BASE_URL}`);

    check(response, {
        'response code 200': (res) => res.status === 200
    });
    sleep(1);
};
