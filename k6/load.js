import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 28 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 86 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<50'], // 99% of requests must complete below 1.5s
    },
};



const BASE_URL = 'https://tuliplee.o-r.kr';
export default () => {
    const res = http.get(`${BASE_URL}/path`);
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    const object= http.get(`${BASE_URL}/paths/?source=1&target=8`).json();
    check(object, { 'path': (obj) => obj.distance === 15 });

    sleep(1);
};