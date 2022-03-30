import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {

    stages: [
        { duration: '2m', target: 1 }, // below normal load
        { duration: '3m', target: 3 },
        { duration: '2m', target: 5 }, // normal load
        { duration: '3m', target: 9 },
        { duration: '2m', target: 15 }, // around the breaking point
        { duration: '3m', target: 20 },
        { duration: '2m', target: 30 }, // beyond the breaking point
        { duration: '3m', target: 40 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra-subway.p-e.kr/paths/?source=1&target=2';

export default function () {
    const before = new Date().getTime();
    const T = 1.1;

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.get(`${BASE_URL}`, params);

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, { 'reached request rate': remainder > 0 });
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
}