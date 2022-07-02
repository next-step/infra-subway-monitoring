import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 52 },
        { duration: '1m', target: 52 },
        { duration: '1m', target: 517 },
        { duration: '1m', target: 517 },
        { duration: '1m', target: 52 },
        { duration: '30s', target: 52 },
        { duration: '1m', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://sasca-subway.kro.kr/';
const USERNAME = 'sasca37@naver.com';
const PASSWORD = 'qwer1234';

export default function ()  {
    accessMain();
    let loginRes = loginWithToken();
    accessPath(loginRes);
};

function accessMain() {
    let mainPage = http.get(`${BASE_URL}`);
    check(mainPage, {
        'Main Page Access Successfull': (res) => res.status === 200
    });
}

function loginWithToken() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.get(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'Login With Token Successfull' : (res) => res.json('accessToken') !== '',
    });

    sleep(1);

    return loginRes;
}

function accessPath(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    let pathRes = http.get(`${BASE_URL}/path`, authHeaders);
    check(pathRes, {
        'Access Path with Login Successfull': (res) => res.status === 200
    });

    sleep(1);
}


