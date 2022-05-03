import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://loopstudy.p-e.kr';

export default function ()  {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let paths = http.get(`${BASE_URL}/paths?source=1&target=3`, params);

    check(paths, {
        'paths in successfully': (resp) => resp.status == 200
    });
    sleep(1);
};