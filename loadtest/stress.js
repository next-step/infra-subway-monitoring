import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '4m', target: 17 }, // simulate ramp-up of traffic from 1 to 17 users over 4 minutes.
        { duration: '4m', target: 17 }, // stay at 17 users for 4 minutes
        { duration: '4m', target: 35 }, // simulate ramp-up of traffic from 17 to 35 users over 4 minutes.
        { duration: '4m', target: 35 }, // stay at 17 users for 4 minutes
        { duration: '4m', target: 50 }, // simulate ramp-up of traffic from 35 to 50 users over 4 minutes.
        { duration: '4m', target: 50 }, // stay at 278 users for 4 minutes
        { duration: '6m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'checks{myTag:login}': ['rate>0.9'],
        'checks{myTag:getFavorites}': ['rate>0.9'],
        'checks{myTag:editMyInfo}': ['rate>0.9'],
        'checks{myTag:findPath}': ['rate>0.9'],
    },
};

const BASE_URL = 'https://sm9171.r-e.kr/';
const USERNAME = 'sm9171@nate.com';
const PASSWORD = '1234';
const AGE  = '32';
const MEMBER_ID = '1';

export default function () {
    let authToken = login();
    getFavorites(authToken); //접속 빈도가 높은 페이지
    editMyInfo(authToken);//데이터를 갱신하는 페이지
    findPath(authToken); // 여러 데이터를 참조하는 페이지
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
        { myTag: 'login' });

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
        { myTag: 'getFavorites' });

    sleep(1);
}

function editMyInfo(accessToken) {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: AGE,
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    };

    let response = http.put(`${BASE_URL}/members/`+MEMBER_ID, payload, params);

    check(response, {
            'editMyInfo successfully': (res) => res.status === 200
        },
        { myTag: 'editMyInfo' });

    sleep(1);
}

function findPath(accessToken) {
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    };

    let response = http.get(`${BASE_URL}/path?source=3&target=8`, params);

    check(response, {
            'find path successfully': (res) => res.status === 200
        },
        { myTag: 'findPath' });

    sleep(1);
}