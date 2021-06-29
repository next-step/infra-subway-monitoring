// load-highest-connection.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    // vus: 231,
    stages: [
        { duration: '10s', target: 80 },
        { duration: '20s', target: 100 },
        { duration: '30s', target: 150 },
        { duration: '20s', target: 50 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://woowa-infra.kro.kr/';

export default function ()  {
    moveToMain();
    moveToPath();
};

export function moveToMain() {
    http.get(`${BASE_URL}`);

    sleep(1);
}
export function moveToPath() {
    http.get(`${BASE_URL}/path`);

    sleep(1);
}
