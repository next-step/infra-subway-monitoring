import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '1m',
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://mirrors89.p-e.kr';

export default function () {
    http.get(`${BASE_URL}/path`);
    http.get(`${BASE_URL}/paths/?source=1&target=3`);
    sleep(1);
};