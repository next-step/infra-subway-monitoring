import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<50'], // 99% of requests must complete below 2s
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