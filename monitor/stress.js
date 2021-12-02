import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2s', target: 100 },
        { duration: '5s', target: 100 },
        { duration: '2s', target: 200 },
        { duration: '5s', target: 200 },
        { duration: '2s', target: 250 }, // 브레이크 포인트
        { duration: '5s', target: 250 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://bgpark82.p-e.kr';
const USERNAME = 'test@test.com';
const PASSWORD = 'test';
const DATA = JSON.stringify({email: USERNAME, password: PASSWORD});
const PARAMS = {headers: {'Content-Type': 'application/json',},};

export default () => {
    let loginRes = http.post(`${BASE_URL}/login/token`, DATA, PARAMS);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 200,
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
};