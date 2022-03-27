import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 12, // 12 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
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