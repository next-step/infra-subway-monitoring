import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        {duration: '4m', target: 185},
        {duration: '4m', target: 185},
        {duration: '4m', target: 500},
        {duration: '4m', target: 500},
        {duration: '4m', target: 1000},
        {duration: '4m', target: 1000},
        {duration: '6m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
        'checks{myTag:login}': ['rate>0.9'],
        'checks{myTag:getFavorites}': ['rate>0.9'],
    },
};

const BASE_URL = 'https://sm9171.r-e.kr/';
const USERNAME = 'sm9171@nate.com';
const PASSWORD = '1234';
const AGE = '32';
const MEMBER_ID = '1';

export default function () {
    let authToken = login();
    getFavorites(authToken); //접속 빈도가 높은 페이지
};

function login() {
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
    let authToken = loginRes.json('accessToken');

    check(loginRes, {
            'logged in successfully': (resp) => resp.json('accessToken') !== '',
        },
        {myTag: 'login'});

    sleep(1);
    return authToken;
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
        },
        {myTag: 'getFavorites'});

    sleep(1);
}