import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 5 },
        { duration: '10m', target: 10 },
        { duration: '10m', target: 20 },
        { duration: '10m', target: 30 },
        { duration: '10m', target: 50 },
        { duration: '10m', target: 80 },
        { duration: '10m', target: 100 },
        { duration: '5m', target: 150 },
        { duration: '10m', target: 200 },
        { duration: '5m', target: 220 },
        { duration: '5m', target: 230 },
        { duration: '5m', target: 240 },
        { duration: '5m', target: 250 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jisu1211.kro.kr';
const USERNAME = 'jisu1211';
const PASSWORD = 'password157#';

function main() {
    check(http.get(`${BASE_URL}`), {
        'You have successfully accessed the main page.': (res) => res.status === 200,
    });
}

function path() {
    check(http.get(`${BASE_URL}/path`), {
        'You have successfully accessed the search path page.': (res) => res.status === 200,
    });
}

function findPath() {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    check(http.get(`${BASE_URL}/path?source=1&target=100`, params), {
        'The path was successfully searched.': (res) => res.status === 200,
    });
}

export default function() {
    main();
    path();
    findPath();

    sleep(1);
};
