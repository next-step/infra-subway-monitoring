import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

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

    login();

    moveToPathPage();

    findPath();

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
}

function moveToPathPage() {
    let response = http.get(`${BASE_URL}/path`);

    check(response, { "load path successfully ": (resp) => resp.status === 200 });
}

function findPath() {
    let response = http.get(`${BASE_URL}/path?source=2&target=6`);

    check(response, { "find path successfully ": (resp) => resp.status === 200 });
}
