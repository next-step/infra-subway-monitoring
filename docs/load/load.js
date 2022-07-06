import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        {duration: '30s', target: 50},
        {duration: '30s', target: 80},
        {duration: '30s', target: 115},
        {duration: '2m', target: 115},
        {duration: '30s', target: 80},
        {duration: '30s', target: 50}
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://cold-pumpkin.o-r.kr/';
const USERNAME = 'test@naver.com';
const PASSWORD = 'testpw';

export default function () {
    mainPage();

    loginPage();

    const accessToken = login();

    myPage(accessToken);

    findPath(accessToken,1, 2);

    sleep(1);
};

// 메인 페이지
function mainPage() {
    let response = http.get(`${BASE_URL}/`);
    check(response, {
        'main page' : (res) => res.status === 200
    });
}

// 로그인 페이지
function loginPage() {
    let response = http.get(`${BASE_URL}/login`);
    check(response, {
        'login page' : (res) => res.status === 200
    });
}

// 로그인
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
    return loginRes.json('accessToken');
}

// 마이페이지
function myPage(accessToken) {
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {
        'retrieved member': (obj) => obj.id !== 0
    });
}

// 최단경로 검색
function findPath(token, source, target) {
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    let response = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`, authHeaders);
    check(response, {'find path': (res) => res.status === 200})
}
