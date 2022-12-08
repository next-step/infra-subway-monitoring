/* stress.js */
//k6 run --out influxdb=http://localhost:8086/myk6db stress.js
import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        {duration: '1m30s', target: 50},
        {duration: '3m30s', target: 50},
        {duration: '1m30s', target: 100},
        {duration: '3m30s', target: 100},
        {duration: '1m30s', target: 150},
        {duration: '3m30s', target: 150},
        {duration: '1m30s', target: 200},
        {duration: '3m30s', target: 200},
        {duration: '1m30s', target: 250},
        {duration: '3m30s', target: 250},
        {duration: '1m30s', target: 300},
        {duration: '3m30s', target: 300},
        {duration: '3m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


const BASE_URL = 'https://subway.sixthou.kro.kr';
const USERNAME = 'test@';
const PASSWORD = 'test password';

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

    return loginRes.json('accessToken');
};

function accessPathPage() {
    let pathPage = http.get(`${BASE_URL}/path`);
    check(pathPage, {
        'access login page': (res) => res.status === 200
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
