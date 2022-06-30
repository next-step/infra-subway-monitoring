import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1,
    duration: '30s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://minho-subway.p-e.kr';
const USERNAME = 'aa@aa.com';
const PASSWORD = '1111';

export default function () {
    // 메인 페이지
    requestGet('', 'mainPage');

    // 로그인 페이지 & 로그인 요청
    requestGet('login', 'loginPage');
    sleep(1);
    login(USERNAME, PASSWORD);

    // 경로 조회 페이지 & 경로조회
    requestGet('path', 'pathPage');
    sleep(1);
    requestGet('paths?source=2&target=59', 'requestPath')

    sleep(1);
}

function requestGet(path, desc) {
    const page = http.get(`${BASE_URL}/${path}`);
    const obj = {};
    obj[desc] = (resp) => resp.status === 200;
    check(page, obj);
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

    const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id !== 0});
    sleep(1);
}
