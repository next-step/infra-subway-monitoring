import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 12 },
        { duration: '30s', target: 25 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 12 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://infra-study.p-e.kr/';

export default function ()  {
    let web= http.get(`${BASE_URL}/lines`)
    check(web, {
        'web is status 200': (r) => r.status === 200,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let lines = http.get(`${BASE_URL}/lines`, params)
    check(lines, {
        'api is status 200': (r) => r.status === 200,
    });
};