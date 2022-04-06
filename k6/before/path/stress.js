import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 50 },
        { duration: '5m', target: 100 },
        { duration: '5m', target: 150 },
        { duration: '5m', target: 200 },
        { duration: '5m', target: 250 },
        { duration: '5m', target: 300 },
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};

const BASE_URL = 'https://mirrors89.p-e.kr/';

export default function ()  {
    const before = new Date().getTime();
    const T = 2;

    http.get(`${BASE_URL}/path`);
    http.get(`${BASE_URL}/stations`);
    http.get(`${BASE_URL}/paths/?source=4&target=6`);

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    if (remainder > 0) {
        sleep(remainder);
    }
};