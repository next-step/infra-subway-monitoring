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

const BASE_URL = 'https://infra-subway.p-e.kr/login/token';
const USERNAME = 'admin@admin.com';
const PASSWORD = '1234';

export default function () {

    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginResponse = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginResponse, {
        'logged in successfully': (response) => response.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginResponse.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
}