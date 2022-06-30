import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        {duration: '2m', target: 20},
        {duration: '5m', target: 20},
        {duration: '2m', target: 40},
        {duration: '5m', target: 40},
        {duration: '3m', target: 100},
        {duration: '5m', target: 100},
        {duration: '3m', target: 200},
        {duration: '5m', target: 200},
        {duration: '3m', target: 500},
        {duration: '5m', target: 500},
    ],

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
    login(USERNAME, PASSWORD);

    // 경로 조회 페이지 & 경로조회
    requestGet('path', 'pathPage');

    requestGet('paths?source=2&target=59', 'requestPath')

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
