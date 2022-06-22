import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 45 },
        { duration: '1m', target: 90 },
        { duration: '3m', target: 100 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500']
    }
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