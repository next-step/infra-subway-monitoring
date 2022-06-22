import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://eaststar1129-infra.p-e.kr';
const USERNAME = 'test@mail.com';
const PASSWORD = 'test';

export default function () {
    mainPage();
    loginPage();
    loginAndFindMe();
    pathPage();
    findPath();

    sleep(1);
}

function mainPage() {
    const mainPageRes = http.get(`${BASE_URL}`);

    check(mainPageRes, {
        'main page load successfully': (res) => res.status == 200,
    });
}

function loginPage() {
    const loginPageRes = http.get(`${BASE_URL}`);

    check(loginPageRes, {
        'login page load successfully': (res) => res.status == 200,
    });
}

function loginAndFindMe() {
    const payload = JSON.stringify({
        email: USERNAME, password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    findMe(loginRes);
}

function findMe(loginRes) {
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();

    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
}

function pathPage() {
    const pathPageRes = http.get(`${BASE_URL}/path`);

    check(pathPageRes, {
        'path page load successfully': (res) => res.status == 200,
    });
}

function findPath() {
    const findPathRes = http.get(`${BASE_URL}/paths?source=3&target=9`);

    check(findPathRes, {
        'find path successfully': (res) => res.status == 200,
    });
}