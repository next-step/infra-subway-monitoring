import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

/*  Options
    Global options for your script
    stages - Ramping pattern
    thresholds - pass/fail criteria for the test
    ext - Options used by Load Impact cloud service test name and distribution
*/
export let options = {
    stages: [
        { duration: '2m', target: 64 },
        { duration: '2m', target: 128 },
        { duration: '2m', target: 256 },
        { duration: '2m', target: 288 },
        { duration: '2m', target: 320 },
        { duration: '4m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)< 500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra.wootechcamp-sonyoon7.p-e.kr';
const USERNAME = 'sonyoon7@wootechcamp.com';
const PASSWORD = 'password';

function mainPage() {

    let mainPageResponse = http.get(`${BASE_URL}`);
    check(mainPageResponse, {
        '[SUCCESS] connect to main page': (response) => response.status === 200,
    });
}

function loginPage() {

    let loginPageResponse = http.get(`${BASE_URL}/login`);
    check(loginPageResponse, {
        '[SUCCESS] connect to login page': (response) => response.status === 200,
    });
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

    let loginResponse = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginResponse, {
        '[SUCCESS] logged in successfully': (response) => response.json('accessToken') !== '',
    });

    return loginResponse.json('accessToken');
}

function completeLogin(accessToken) {

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let completeLoginResponse = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(completeLoginResponse, {
        '[SUCCESS] be currently logged in': (response) => response.id !== 0,
    });
}

function findPathPage() {

    let findPathPageResponse = http.get(`${BASE_URL}/path`);
    check(findPathPageResponse, {
        '[SUCCESS] connect to find path page': (response) => response.status === 200,
    });
}

function findPath(accessToken) {

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let findPathResponse = http.get(`${BASE_URL}/paths?source=1&target=201`, authHeaders);
    check(findPathResponse, {
        '[SUCCESS] find shortest path': (response) => response.status === 200,
        '[SUCCESS] find shortest path distance': (response) => response.json().distance > 0,
    })
}

/*  Main function
    The main function is what the virtual users will loop over during test execution.
*/
export default function ()  {

    mainPage();

    loginPage();
    const accessToken = login();
    completeLogin(accessToken);

    findPathPage();
    findPath(accessToken);

    sleep(1);
};
