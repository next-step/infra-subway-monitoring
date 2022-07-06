import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 25 },
        { duration: '5m', target: 25 },
        { duration: '3m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '3m', target: 25 },
        { duration: '10m', target: 25 },
        { duration: '2m', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://subway-iamjunsulee.p-e.kr/';
const USERNAME = 'test@naver.com';
const PASSWORD = '1234';

export default function ()  {
    let token = login();

    let authHeaders = {
        headers: {
            Authorization: `Bearer ` + token,
            'Content-Type': 'application/json'
        },
    };

    update(authHeaders);

    findPath(1, 4);

    sleep(1);
};

function login() {
    let loginUrl = `${BASE_URL}/login/token`;

    let loginPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginParams = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    let loginResponse = http.post(loginUrl, loginPayload, loginParams);

    check(loginResponse, {
        'logged in successfully': (response) => response.json('accessToken') !== '',
    });
    return loginResponse.json('accessToken');
}

function update(authHeaders) {
    let updateRequest = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 33,
    });

    let updateResponse = http.put(`${BASE_URL}/members/me`, updateRequest, authHeaders);
    check(updateResponse, { 'updated successfully': (response) => response.status === 200});
}

function findPath(source, target) {
    let pathResponse = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);
    check(pathResponse, { 'finding path successful': (response) => response.status === 200});
}