import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 23 },
        { duration: '20s', target: 23 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://chapitak.kro.kr';

export default function ()  {

    let selectRes = http.get(`${BASE_URL}/paths?source=3&target=2`);

    check(selectRes, {
        'selected successfully': (resp) => resp.status === 200,
    });

    sleep(1);
};
