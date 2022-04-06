import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    // R = 1, latency = 50ms
    // (41 * 0.05) / 1  =  2
    // (123 * 0.05) / 1  =  6
    stages: [
        { duration: '2m', target: 2 },
        { duration: '2m', target: 4 },
        { duration: '2m', target: 6 },
        { duration: '2m', target: 6 },
        { duration: '2m', target: 4 },
        { duration: '2m', target: 2 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://mirrors89.p-e.kr/';

export default function ()  {

    http.get(`${BASE_URL}`);
    sleep(1);
};