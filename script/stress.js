import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 200 },
        { duration: '2m', target: 200 },
        { duration: '1m', target: 400 },
        { duration: '2m', target: 400 },
        { duration: '1m', target: 600 },
        { duration: '2m', target: 600 },
        { duration: '1m', target: 800 },
        { duration: '2m', target: 800 },
        { duration: '1m', target: 1000 },
        { duration: '2m', target: 1000 },
        { duration: '3m', target: 0 }
    ],

    thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://mins99-subway.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '123';

export default function ()  {

    moveToMainPage();

    moveToLoginPage();

    var accessToken = login();

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    findFavorite(authHeaders);

    moveToPathPage();

    findPath(authHeaders);

    sleep(1);
};

function moveToMainPage() {
    let response = http.get(`${BASE_URL}`);

    check(response, { "load main successfully ": (resp) => resp.status === 200 });
}

function moveToLoginPage() {
    let response = http.get(`${BASE_URL}/login`);

    check(response, { "load login successfully ": (resp) => resp.status === 200 });
}

function login() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    let response = http.post(`${BASE_URL}/login/token`, payload, params);

    check(response, { "login successfully ": (resp) => resp.json('accessToken') !== ''});

    return response.json('accessToken');
}

function findFavorite(accessToken) {
    let response = http.get(`${BASE_URL}/favorites`, accessToken);

    check(response, { "find favorite successfully ": (resp) => resp.status === 200 });
}

function moveToPathPage() {
    let response = http.get(`${BASE_URL}/path`);

    check(response, { "load path successfully ": (resp) => resp.status === 200 });
}

function findPath(accessToken) {
    let response = http.get(`${BASE_URL}/path?source=2&target=6`, accessToken);

    check(response, { "find path successfully ": (resp) => resp.status === 200 });
}
