import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
        { duration: '1m', target: 200 }, // stay at 200 users for 1 minutes
        { duration: '1m', target: 300 }, // stay at 300 users for 1 minutes
        { duration: '1m', target: 400 }, // stay at 400 users for 1 minutes
        { duration: '1m', target: 500 }, // stay at 500 users for 1 minutes
        { duration: '1m', target: 600 }, // stay at 600 users for 1 minutes
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
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