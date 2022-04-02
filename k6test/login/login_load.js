import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 5 }, // simulate ramp-up of traffic from 1 to 100 users over 10 minutes.
        { duration: '3m', target: 11 }, // simulate ramp-up of traffic from 1 to 100 users over 10 minutes.
        { duration: '10m', target: 33 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1200'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1200'], // 99% of requests must complete below 1.5s
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