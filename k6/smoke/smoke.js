import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '30s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://crongcm.n-e.kr';
const USERNAME = 'crongcm@kakao.com';
const PASSWORD = '1234';

function mainPage() {

    let mainPageResponse = http.get(`${BASE_URL}`);
    check(mainPageResponse, {
        'Move main page': (response) => response.status === 200,
    });
}

function loginPage() {

    let loginPageResponse = http.get(`${BASE_URL}/login`);
    check(loginPageResponse, {
        'Move login page': (response) => response.status === 200,
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

    let loginResponse = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginResponse, {
        'Logged in successfully': (response) => response.json('accessToken') !== '',
    });

    return loginResponse.json('accessToken');
}

function completeLogin(accessToken) {

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let completeLoginResponse = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(completeLoginResponse, {
        'Complete logged in': (response) => response.id !== 0,
    });
}

function pathPage() {

    let findPathPageResponse = http.get(`${BASE_URL}/path`);
    check(findPathPageResponse, {
        'Move path page': (response) => response.status === 200,
    });
}

function findPath() {
    let findPathResponse = http.get(`${BASE_URL}/paths?source=60&target=116`);
    check(findPathResponse, {
        'Find path': (response) => response.status === 200,
        'Path distance': (response) => response.json().distance > 0,
    })
}

export default function ()  {
    mainPage();
    loginPage();
    const accessToken = login();
    completeLogin(accessToken);
    pathPage();
    findPath();
    sleep(1);
};
