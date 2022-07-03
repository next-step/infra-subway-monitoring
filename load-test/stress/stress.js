import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 1 },
        { duration: '2m', target: 10 },
        { duration: '3m', target: 20 },
        { duration: '4m', target: 30 },
        { duration: '5m', target: 40 },
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1500'],
    },
};

const BASE_URL = 'https://woody-log.kro.kr';
const USERNAME = 'woody-log@naver.com';
const PASSWORD = '1234';

export default function ()  {

    goMainPage();

    let accessToken = login();

    findPath(accessToken);

    getFavorites(accessToken);

    sleep(1);
};

function goMainPage() {
    let mainPage = http.get(`${BASE_URL}`);
    check(mainPage, {
        'go to main page successfully': (resp) => resp.status == 200,
    });
}

function login() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'login successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes.json('accessToken');
}


function findPath(accessToken) {
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    };

    let response = http.get(`${BASE_URL}/path?source=1&target=2`, header);

    check(response, {
        'findPath successfully' : (res) => res.status === 200
    });
}

function getFavorites(accessToken) {
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }

    let response = http.get(`${BASE_URL}/favorites`, header).json();

    check(response, { 'getFavorites successfully': (obj) => obj.id != 0});
}
