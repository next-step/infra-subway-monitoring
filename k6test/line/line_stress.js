import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {

    stages: [
        { duration: '2m', target: 3 }, // below normal load
        { duration: '3m', target: 5 },
        { duration: '2m', target: 9.3 }, // normal load
        { duration: '3m', target: 15 },
        { duration: '2m', target: 25 }, // around the breaking point
        { duration: '3m', target: 27 },
        { duration: '2m', target: 30 }, // beyond the breaking point
        { duration: '3m', target: 40 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra-subway.p-e.kr';

export default function () {

    const url = new URL(`${BASE_URL}/paths`);
    url.searchParams.append('source', '2')
    url.searchParams.append('target', '3')

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathResponse = http.get(url.toString(), params);

    check(pathResponse, {
        'find path in successfully': (response) => response.status == 200,
    });

    sleep(1);
}