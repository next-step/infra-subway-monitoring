import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 10 seconds
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)< 500'], // 99% of requests must complete below 0.5s
    },
};

const BASE_URL = 'https://bgc8214-subway.kro.kr/';
const USERNAME = 'bgc8214@nextstep.com';
const PASSWORD = '123';

export default function ()  {
    mainPage();
    path();
    let accessToken = loginToken();
    findPath();
};

function mainPage() {
    let res = http.get(`${BASE_URL}`);
    check(res, {
        'Main Page Http status 200': (r) => r.status === 200
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
        'Login Http status is 200': (r) => r.status === 200
    });

    return res.json("accessToken");
}

function path() {
    let res = http.get(`${BASE_URL}/path`);
    check(res, {
        'Path Http status is 200': (r) => r.status === 200
    });
}


function findPath() {
    let res = http.get(`${BASE_URL}/paths?source=1&target=2`);
    check(res, {
        'Find Path Http status is 200': (r) => r.status === 200
    });
} 