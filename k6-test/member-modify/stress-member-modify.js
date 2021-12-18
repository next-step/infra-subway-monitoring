import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 300 },
        { duration: '2m', target: 300 },
        { duration: '1m', target: 500 },
        { duration: '2m', target: 500 },
        { duration: '5m', target: 0 },
    ],
};

const BASE_URL = 'https://jerry92k-subway.n-e.kr/';

export default function ()  {
    const before = new Date().getTime();
    const T = 0.9;

    http.get(`${BASE_URL}/`);
    sleep(1);
};