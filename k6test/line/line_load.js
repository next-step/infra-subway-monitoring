import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 9 }, // simulate ramp-up of traffic from 1 to 100 users over 10 minutes.
        { duration: '15m', target: 28 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra-subway.p-e.kr/paths/?source=1&target=2';

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathResponse = http.get(`${BASE_URL}`, params);

    check(pathResponse, {
        'find path in successfully': (response) => response.status == 200,
    });

    sleep(1);
}