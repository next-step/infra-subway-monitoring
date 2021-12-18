import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 21 },
        { duration: '1m', target: 21 },
        { duration: '1m', target: 80 },
        { duration: '1m', target: 80 },
        { duration: '1m', target: 21 },
        { duration: '1m', target: 21 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<900'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<900'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jerry92k-subway.n-e.kr/';

export default function ()  {
    const before = new Date().getTime();
    const T = 0.9;

    http.get(`${BASE_URL}/`);
    const after = new Date().getTime();
    const diff = (after - before) / 1000;

    const remainder = T - diff;
    check(remainder, { 'reached request rate': remainder > 0 });
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
};