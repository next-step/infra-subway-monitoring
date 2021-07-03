// stress-path-search.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 80 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 400 },
        { duration: '10s', target: 600 },
        { duration: '10s', target: 800 },
        { duration: '10s', target: 500 },
        { duration: '20s', target: 700 },
        { duration: '20s', target: 600 },
        { duration: '10s', target: 350 },
        { duration: '20s', target: 200 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://woowa-infra.kro.kr/';

export default function ()  {
    moveToPath();
};

export function moveToPath() {
    http.get(`${BASE_URL}/path`);

    sleep(1);
}

export function searchPath() {
    http.get(`${BASE_URL}/paths/?source=106&target=198`);

    sleep(1);
}
