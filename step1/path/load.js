import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 8, // 8 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<300'], // 99% of requests must complete below 0.2s
    },
};

const BASE_URL = 'https://infra-study.p-e.kr/';

export default function ()  {
    let web= http.get(`${BASE_URL}/path`)
    check(web, {
        'web is status 200': (r) => r.status === 200,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let stations = http.get(`${BASE_URL}/stations`, params)
    check(stations, {
        'stations api is status 200': (r) => r.status === 200,
    });

    let path = http.get(`${BASE_URL}/paths/?source=2&target=2`, params)
    check(path, {
        'path api is status 200': (r) => r.status === 200,
    });
};