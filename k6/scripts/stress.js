import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 35 },
        { duration: '4m', target: 35 },
        { duration: '2m', target: 70 },
        { duration: '4m', target: 70 },
        { duration: '2m', target: 105 },
        { duration: '4m', target: 105 },
        { duration: '2m', target: 180 },
        { duration: '4m', target: 180 },
        { duration: '2m', target: 255 },
        { duration: '4m', target: 255 },
        { duration: '2m', target: 330 },
        { duration: '4m', target: 330 },
        { duration: '10m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://mandykr.kro.kr';
const USERNAME = 'mandykr@gmail.com';
const PASSWORD = 'mandykr';

export default function ()  {
    mainPage();
    loginPage();
    let accessToken = login();
    favorite(accessToken);

    sleep(1);
}

function mainPage() {
    let mainPageRes = http.get(BASE_URL)

    check(mainPageRes, {
        'landed main page in successfully': (resp) => resp.status === 200
    })
}

function loginPage() {
    let loginPageRes = http.get(`${BASE_URL}/login`);

    check(loginPageRes, {
        'landed login page in successfully': (resp) => resp.status === 200
    })
}

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

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let accessToken = loginRes.json('accessToken');
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

    return accessToken;
}

function favorite(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }

    let favoriteRes = http.get(`${BASE_URL}/favorites`, authHeaders);

    check(favoriteRes, {
        'get favorite list in successfully': (resp) => resp.status === 200
    })
}
