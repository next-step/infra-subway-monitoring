import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 600 },
        { duration: '1m', target: 700 },
        { duration: '1m', target: 800 },
        { duration: '1m', target: 900 },
        { duration: '5m', target: 1000 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 50 },
        { duration: '1m', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://ttungga.r-e.kr/';
const USERNAME = 'test@test';
const PASSWORD = 'test';

export default function ()  {
    mainPage();

    let accessToken = login(USERNAME, PASSWORD);

    pathPage(accessToken);
    getPath(accessToken);

    sleep(1);
};

function mainPage() {
    let response = http.get(BASE_URL);
    check(response, {'메인 페이지 접속' : (res) => res.status === 200 });
}

function login(email, password) {
    let payload = JSON.stringify({
        email: email,
        password: password,
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        '로그인': (res) => res.json('accessToken') !== '',
    });

    return loginRes.json('accessToken');
}

function pathPage(accessToken) {
    let header = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let response = http.get(`${BASE_URL}/path`, header);
    check(response, {'경로 검색 페이지 접속' : (res) => res.status === 200 });
}

function getPath(accessToken) {
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    let response = http.get(`${BASE_URL}/path?source=1&target=2`, header);
    check(response, {'경로 검색' : (res) => res.status === 200 });
}
