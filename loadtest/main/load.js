import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 300,
    stages: [
        { duration: '10m', target: 100 },
        { duration: '20m', target: 200 },
        { duration: '10m', target: 300 },
        { duration: '20m', target: 200 },
        { duration: '10m', target: 100 },
        { duration: '10m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function () {
    const before = new Date().getTime();
    const T = 2;

    http.get('https://jdragon.r-e.kr/');

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
