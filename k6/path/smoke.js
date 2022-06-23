import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<400'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://pleasesubway.p-e.kr';

export default function ()  {

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathPageRes = http.get(`${BASE_URL}/path`);
    check(pathPageRes, { 'path page res code 200': (res) => res.status === 200 });

    let pathsRes = http.get(`${BASE_URL}/paths/?source=1&target=7`, params);
    check(pathsRes, { 'paths api res code 200': (res) => res.status === 200 });

    sleep(1);
};