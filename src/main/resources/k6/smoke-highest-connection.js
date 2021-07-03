// smoke-highest-connection.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '5s',

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
