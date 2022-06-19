import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 12 },
        { duration: '1m', target: 24 },
        { duration: '1m', target: 48 },
        { duration: '1m', target: 96 },
        { duration: '1m', target: 192 },
        { duration: '4m', target: 192 },
        { duration: '1m', target: 288 },
        { duration: '4m', target: 288 },
        { duration: '1m', target: 192 },
        { duration: '1m', target: 96 },
        { duration: '1m', target: 48},
        { duration: '1m', target: 24},
        { duration: '1m', target: 12},
        { duration: '4m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100']
    },
};


const BASE_URL = 'https://kwonyongil-infra.kro.kr/';
const USERNAME = 'test@test';
const PASSWORD = 'password';

export default function ()  {

    mainPage();

    loginPage();

    var accessToken = login(USERNAME, PASSWORD);

    pathPage();

    findFavorites(accessToken);

    findPath();

    sleep(1);
};

function mainPage() {
    var response = http.get(`${BASE_URL}/`);
    check(response, {'main page' : (res) => res.status === 200 });
}

function loginPage() {
    var response = http.get(`${BASE_URL}/login`);
    check(response, {'login page' : (res) => res.status === 200 });
}

function pathPage() {
    var response = http.get(`${BASE_URL}/path`);
    check(response, {'path page' : (res) => res.status === 200 });
}

function login(email, password) {
    var payload = JSON.stringify({
        email: email,
        password: password,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (res) => res.json('accessToken') !== '',
    });

    return loginRes.json('accessToken');
}

function findFavorites(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
     };
     var response = http.get(`${BASE_URL}/favorites`, authHeaders);
     check(response, { 'find favorites': (res) => res.status === 200});
}

function findPath() {
    var response = http.get(`${BASE_URL}/paths?source=1&target=2`);

    check(response, {'find path': (resp) => resp.status === 200 });
}
