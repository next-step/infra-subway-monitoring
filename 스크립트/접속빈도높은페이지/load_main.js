import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
        { duration: '1m', target: 200 }, // stay at 200 users for 1 minutes
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],

    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://loopstudy.p-e.kr';

export default function ()  {

    let mainRes = http.get(`${BASE_URL}`);

    check(mainRes, {
        'main in successfully': (resp) => resp.status == 200
    });
    sleep(1);
};