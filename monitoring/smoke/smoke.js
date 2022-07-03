import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 10 second
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jiyeonghwang-infra.kro.kr/';
const USERNAME = 'chandle12340@gmail.com';
const PASSWORD = '1234';

export default function ()  {
    const accessToken = login();

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    myObject(authHeaders);
    findShortestPath(authHeaders);
};

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

    return loginRes.json('accessToken');
}

function myObject(authHeaders) {
    const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {
        'retrieved member': (obj) => obj.id != 0
    });
    sleep(1);
}

function findShortestPath(authHeaders) {
    const pathRes = http.get(`${BASE_URL}/path?source=1&target=4`);
    check(pathRes, {
        'retrieved path': (obj) => obj.status === 200
    });
    sleep(1);
}
