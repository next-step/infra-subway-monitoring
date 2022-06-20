import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '10s',  target:  20  },
        { duration: '40s',  target:  20  },
        { duration: '1m',   target:  100 },
        { duration: '2m',   target:  100 },
        { duration: '1m',   target:  300 },
        { duration: '1m',   target:  300 },
        { duration: '30s',  target:  30  },
        { duration: '1m',   target:  10   },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://june2-nextstep.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = 'password';

export default function () {
    // 1. 메인페이지에 접속
    accessMain();

    // 2. 로그인
    let token = login(USERNAME, PASSWORD);

    // 경로찾기
    findPath(token, 1, 2);

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