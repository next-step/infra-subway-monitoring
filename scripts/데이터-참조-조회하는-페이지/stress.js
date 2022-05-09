import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 1 },
        { duration: '1m', target: 2 },
        { duration: '1m', target: 3 },
        { duration: '1m', target: 4 },
        { duration: '1m', target: 5 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'http://3.39.175.94:8080';

export default function ()  {
    let response = http.get(`${BASE_URL}/paths/?source=2&target=6`);
    check(response, { '200 ok': (obj) => response.status == 200 });
    sleep(1);
};