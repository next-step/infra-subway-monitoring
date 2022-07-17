import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://misudev-infra.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';

export default function ()  {
    let authToken = login();
    findPath(authToken);
};

function login() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    let authToken = loginRes.json('accessToken');

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

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

    check(response, {
        'find path successfully' : (res) => res.status === 200
    });

    sleep(1);
}

function getFavorites(authToken) {
    let params = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
    };

    let response = http.get(`${BASE_URL}/favorites`, params);
    check(response, {
        'get Favorites successfully': (resp) => resp.status === 200
    });

    sleep(1);
}
