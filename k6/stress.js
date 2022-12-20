import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 0 },
        { duration: '10s', target: 40 },
        { duration: '10s', target: 74 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
    },
};

const BASE_URL = 'https://ganjinajae.n-e.kr';
const USERNAME = 'email@email.com';
const PASSWORD = 'password';

export default function ()  {
    // 홈 페이지
    homePage();
    // 경로 검색
    findPath();
    // 로그인
    login();

    sleep(1);
}

function homePage() {
    const response = http.get(BASE_URL);

    check(response, {
        'entered in main page successfully': (res) => res.status === 200
    });
}

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

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
}

function findPath() {
    const response = http.get(`${BASE_URL}/paths?source=3&target=4`);

    check(response, {
        'find path successfully': (res) => res.status === 200
    });
}
