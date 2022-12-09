/* load-avg.js */
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 4},
        {duration: '28m', target: 4},
        {duration: '1m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
    },
};


const BASE_URL = 'https://subway.sixthou.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '1q2w3e!@';

export default function () {
    accessMainPage();
    accessLoginPage();
    let accessToken = requestLogin();
    accessPathPage();
    findPath(accessToken);
    sleep(1);
};

function accessMainPage() {
    let mainPage = http.get(`${BASE_URL}`);
    check(mainPage, {
        'access main page': (res) => res.status === 200
    });
};

function accessLoginPage() {
    let loginPage = http.get(`${BASE_URL}/login`);
    check(loginPage, {
        'access login page': (res) => res.status === 200
    });
};

function requestLogin() {

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

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes.json('accessToken');
};

function accessPathPage() {
    let pathPage = http.get(`${BASE_URL}/path`);
    check(pathPage, {
        'access path page': (res) => res.status === 200
    });
};

function findPath(accessToken) {

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/paths/?source=2&target=1`, authHeaders).json();
    check(myObjects, {
        'find path': (obj) => obj.stations.length !== 0
    });
    sleep(1);

};
