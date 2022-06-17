import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '15s', target: 25 },
        { duration: '20s', target: 40 },
        { duration: '25s', target: 50 },
        { duration: '20s', target: 40 },
        { duration: '15s', target: 25 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://nextsteptest.p-e.kr';
const USERNAME = 'cyr9210@nate.com';
const PASSWORD = 'chldydfkr1!';

export default function () {
    // 메인
    accessMain();

    // 로그인
    let token = login(USERNAME, PASSWORD);

    // 내 정보 수정
    updateInfo(token);

    // 경로찾기
    findPath(token, 3, 4);

    sleep(1);
};

function accessMain() {
    let response = http.get(`${BASE_URL}/`);
    check(response, {'access success': (res) => res.status === 200})
}

function login(username, password) {
    var payload = JSON.stringify({
        email: username,
        password: password,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response = http.post(`${BASE_URL}/login/token`, payload, params);
    check(response, {'login success': (res) => res.json('accessToken') !== ''})

    return response.json('accessToken');
}

function updateInfo(token) {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 29
    });

    var params = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    let response = http.put(`${BASE_URL}/members/me`, payload, params);
    check(response, {'update success': (res) => res.status === 200})
}

function findPath(token, source, target) {
    var params = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };
    let response = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`, params);
    check(response, {'findPath succeess': (res) => res.status === 200})
}
