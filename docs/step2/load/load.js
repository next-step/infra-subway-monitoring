import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 10},
        {duration: '1m', target: 20},
        {duration: '3m', target: 30},
        {duration: '3m', target: 60},
        {duration: '1m', target: 10},
        {duration: '1m', target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://weno-nextstep.p-e.kr/';
const USERNAME = 'wenodev@nextstep.com';
const PASSWORD = '1234';
const AGE = 20;
const LOGIN_INFO = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: AGE,
});

export default function () {
    goToMainPage();
    goToLoginPage();
    goToJoinPage();

    let loginRes = login(LOGIN_INFO);

    let authHeaders = getAuthHeaders(loginRes);

    findMyInfo(authHeaders);
    findStation();
    findPath();

    sleep(1);
};

function goToMainPage() {
    const res = http.get(BASE_URL);

    const checkRes = check(res, {
        'goToMainPage() status is 200': (r) => r.status === 200
    });
}

function goToLoginPage() {
    const res = http.get(`${BASE_URL}/login`);

    const checkRes = check(res, {
        'goToLoginPage() status is 200': (r) => r.status === 200
    });
}

function goToJoinPage() {
    const res = http.get(`${BASE_URL}/join`);

    const checkRes = check(res, {
        'goToJoinPage() status is 200': (r) => r.status === 200
    });
}

function login(payload) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'login() status is 200': (r) => r.status === 200,
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

function isLoginSuccess(response) {
    return response.status === 200;
}

function getAuthHeaders(loginRes) {
    return {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
}

function createMember(payload) {
    const res = http.post(`${BASE_URL}/members`, payload, {
        headers: {'Content-Type': 'application/json'},
    });

    check(res, {
        'createMember() status is 201': (r) => r.status === 201,
    });
}

function findMyInfo(authHeaders) {
    const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders);

    check(myObjects, {
        'findMyInfo() status is 200': (resp) => resp.status === 200,
        'find member successfully': (resp) => resp.json().id !== 0
    });
}

function findStation() {
    const res = http.get(`${BASE_URL}/stations`);

    check(res, {
        'findStation() status is 200': (resp) => resp.status === 200,
    });
}

function findPath() {
    const res = http.get(`${BASE_URL}/paths?source=167&target=392`);

    check(res, {
        'findPath() status is 200': (resp) => resp.status === 200,
    });
}
