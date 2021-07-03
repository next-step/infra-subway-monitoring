// smoke-path-search.js
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
