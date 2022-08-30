import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 70 },
        { duration: '1m', target: 120 },
        { duration: '1m', target: 180 },
        { duration: '1m', target: 150 },
        { duration: '10s', target: 70 },
        { duration: '10s', target: 120 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://becky-infra.r-e.kr/';
const USERNAME = 'becky-test@test.com';
const PASSWORD = 'test';

export default function ()  {
    main();
    loginPage();
    let token = login();
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${token.json('accessToken')}`,
        },
    };
    findPath();
    sleep(1);
};

function login() {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'login() status is 200': (r) => r.status === 200,
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

function main() {
    const res = http.get(BASE_URL);

    check(res, {
        'main status is 200': (r) => r.status === 200
    });
}

function loginPage() {
    const res = http.get(`${BASE_URL}/login`);

    check(res, {
        'loginPage status is 200': (r) => r.status === 200
    });
}

function findPath() {
    const res = http.get(`${BASE_URL}/paths?source=6&target=7`);

    check(res, {
        'findPath status is 200': (resp) => resp.status === 200,
    });
}