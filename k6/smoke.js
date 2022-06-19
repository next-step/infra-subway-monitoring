import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://handh.kro.kr';
const USERNAME = 'nextstep@nextstep.camp';
const PASSWORD = 'password';
const AGE = 20;

export default function ()  {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: AGE,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    goToMainPage();

    goToLoginPage();

    goToJoinPage();

    let loginRes = login(payload, params);

    if (!isLoginSuccess(loginRes)) {
        createMember(payload);
        loginRes = login(payload, params);
    }

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    findMyInfo(authHeaders);

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

function login(payload, params) {
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

function createMember(payload) {
    const res = http.post(`${BASE_URL}/members`, payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    const checkRes = check(res, {
        'createMember() status is 201': (r) => r.status === 201,
    });
}

function findMyInfo(authHeaders) {
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders);

    check(myObjects, {
        'findMyInfo() status is 200': (resp) => resp.status === 200,
        'find member successfully': (resp) => resp.json().id !== 0
    });
}
