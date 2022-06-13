import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 29 },
        { duration: '5m', target: 70 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://subway.geunhwanlee.p-e.kr';
const USERNAME = 'gunan@gmail.com';
const PASSWORD = '1234';

export default function ()  {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let memberRequest = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30,
    });
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    let updateRes = http.put(`${BASE_URL}/members/me`, memberRequest, authHeaders);
    check(updateRes, { 'response code 200': (res) => res.status === 200 });
    sleep(1);
};
