import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
    stages: [
        {duration: '4m', target: 185},
        {duration: '4m', target: 185},
        {duration: '4m', target: 500},
        {duration: '4m', target: 500},
        {duration: '4m', target: 1000},
        {duration: '4m', target: 1000},
        {duration: '6m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
        'checks{myTag:login}': ['rate>0.9'],
        'checks{myTag:findPath}': ['rate>0.9'],
    },
};

const BASE_URL = 'https://sm9171.r-e.kr/';
const USERNAME = 'sm9171@nate.com';
const PASSWORD = '1234';

export default function () {
    let authToken = login();
    findPath(authToken); // 여러 데이터를 참조하는 페이지
};

function login() {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    let authToken = loginRes.json('accessToken');

    const success = check(loginRes, {
            'logged in successfully': (resp) => resp.json('accessToken') !== '',
        },
        {myTag: 'login'});
    errorRate.add(!success);
    sleep(1);
    return authToken;
}

function findPath(accessToken) {
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    };

    let response = http.get(`${BASE_URL}/path?source=3&target=8`, params);

    const success = check(response, {
            'find path successfully': (res) => res.status === 200
        },
        {myTag: 'findPath'});
    errorRate.add(!success);
    sleep(1);
}