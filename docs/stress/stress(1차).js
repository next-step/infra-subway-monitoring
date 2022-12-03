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
        { duration: '1m', target: 1 },
        { duration: '2m', target: 3 },
        { duration: '2m', target: 6 },
        { duration: '2m', target: 9 },
        { duration: '2m', target: 12 },
        { duration: '2m', target: 18 },
        { duration: '2m', target: 24 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 36 },
        { duration: '2m', target: 42 },
        { duration: '2m', target: 48 },
        { duration: '2m', target: 54 },
        { duration: '2m', target: 60 },
        { duration: '2m', target: 72 },
        { duration: '2m', target: 84 },
        { duration: '2m', target: 96 },
        { duration: '2m', target: 72 },
        { duration: '2m', target: 48 },
        { duration: '2m', target: 24 },
        { duration: '2m', target: 12 },
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://earth-h.tk';
const USERNAME = 'earth.h.183@gmail.com';
const PASSWORD = '123456';

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
