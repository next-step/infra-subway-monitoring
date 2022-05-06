import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

// VUser = (140 * 4) / 2) = 280
export let options = {
    stages: [
        {duration: '1m', target: 28},  // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        {duration: '2m', target: 280}, // stay at 100 users for 10 minutes
        {duration: '10s', target: 0},  // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'],
    },
};

const BASE_URL = 'https://saerang.r-e.kr/';
const USERNAME = 'saerang@test.com';
const PASSWORD = '1234';

export default function ()  {

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


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
};