import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 11 },
        { duration: '30s', target: 11 },
        { duration: '30s', target: 12 },
        { duration: '30s', target: 12 },
        { duration: '30s', target: 11 },
        { duration: '30s', target: 11 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://nextstep-lcjltj.kro.kr/';
const USERNAME = 'lcjltj@gmail.com';
const PASSWORD = '900821';

export default function () {
    const accessToken = login();

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}` || '',
            'Content-Type': 'application/json'
        },
    };

    myObjects(authHeaders);
    changeUser(authHeaders);
    getShortestPath(authHeaders);
};

function login(authHeaders) {
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

    return loginRes.json('accessToken');
}

function myObjects(authHeaders) {
    const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});
    sleep(1);
}

function changeUser(authHeaders) {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: '33'
    });

    const response = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
    check(response, {'chageUser': (res) => res.status === 200});

}

function getShortestPath(authHeaders) {
    const response = http.get(`${BASE_URL}/paths?source=3&target=29`, authHeaders);
    check(response, {'getShortestPath': (res) => res.status === 200});
    sleep(1);
}

function setContentType() {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return params;
}

