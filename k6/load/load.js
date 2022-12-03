import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 1 },
        { duration: '1m', target: 5 },
        { duration: '3m', target: 10 },
        { duration: '1m', target: 5 },
        { duration: '30s', target: 1 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 200ms
    },
};

const BASE_URL = 'https://web.giraffelim.kro.kr';
const USERNAME = 'tester@tester.com';
const PASSWORD = 'test123';

export default function ()  {
    mainPage();
    const accessToken = login();
    me(accessToken);
    pathSearchPage();
    pathSearch(accessToken);
};

function mainPage() {
    let mainPageResponse = http.get(`${BASE_URL}`);

    check(mainPageResponse, {
        'get main page successfully': (response) => response.status === 200,
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

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes.json('accessToken');
}

function me(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();

    check(myObjects, { 'retrieved member successfully': (obj) => obj.id != 0 });
}

function pathSearchPage() {
    let findPathPageResponse = http.get(`${BASE_URL}/path`);

    check(findPathPageResponse, {
        'get search path page successfully': (response) => response.status === 200,
    });
}

function pathSearch(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let findPathResponse = http.get(`${BASE_URL}/paths?source=50&target=106`, authHeaders);

    check(findPathResponse, {'search shortest path successfully': (response) => response.status === 200})
}
