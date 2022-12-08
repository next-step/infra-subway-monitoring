import http from 'k6/http';
import {check, sleep} from 'k6';

const BASE_URL = 'https://velcronicity.kro.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';

export default function () {
    mainPage();
    const token = login();
    myInfo(authHeaders(token));
    pathPage(authHeaders(token));
    findPath(authHeaders(token));
    sleep(1);
};

function mainPage() {
    check(http.get(`${BASE_URL}`), {'main page open successfully': res => res.status === 200});
}

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
    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
    return loginRes.json('accessToken');
}

function myInfo(authHeaders) {
    check(http.get(`${BASE_URL}/members/me`, authHeaders), {'retrieved member successfully': (obj) => obj.id != 0});
}

function authHeaders(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

function pathPage(authHeaders) {
    check(http.get(`${BASE_URL}/path`, authHeaders), {'path page open successfully': res => res.status === 200});
}

function findPath(authHeaders) {
    check(http.get(`${BASE_URL}/path?source=1&target=2`, authHeaders), {'find path successfully': res => res.status === 200});
}
