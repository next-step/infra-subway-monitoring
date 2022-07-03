import http from 'k7/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '30s', target: 200 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://www.yong2ss.kro.kr/';
const USERNAME = 'yong2ss@nextstep.com';
const PASSWORD = '1234';

export default function ()  {
    toMain();
    path();
    const accessToken = loginToken();
    findPath();
};

function toMain() {
    let res = http.get(`${BASE_URL}`);
    check(res, {
        'Maing status is 200': (r) => r.status === 200
    });
}

function loginToken() {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    let params = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = http.post(`${BASE_URL}/login/token`, payload, params);
    check(res, {
    });

    return res.json("accessToken");
}

function path() {
    let res = http.get(`${BASE_URL}/path`);
    check(res, {
        'Path status is 200': (r) => r.status === 200
    });
}

function findPath() {
    let res = http.get(`${BASE_URL}/paths?source=1&target=2`);
    check(res, {
        'FindPath status is 200': (r) => r.status === 200
    });
}
