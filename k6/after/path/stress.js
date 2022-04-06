import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    // R = 2, latency = 50ms
    // (41 * 0.1) / 2  =  2
    // (123 * 0.1) / 2  =  6
    stages: [
        { duration: '2m', target: 2 },
        { duration: '2m', target: 6 },
        { duration: '2m', target: 12 },
        { duration: '2m', target: 18 },
        { duration: '2m', target: 24 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://mirrors89.p-e.kr/';

export default function ()  {
    http.get(`${BASE_URL}/path`);
    http.get(`${BASE_URL}/paths/?source=1&target=3`);
    sleep(1);
};