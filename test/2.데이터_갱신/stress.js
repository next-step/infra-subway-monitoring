import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 100},
        {duration: '20s', target: 200},
        {duration: '20s', target: 300},
        {duration: '20s', target: 400},
        {duration: '20s', target: 500},
        {duration: '20s', target: 600},
        {duration: '10s', target: 0}
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginRes.json('accessToken')}`
        },
    };

    var updatePayload = JSON.stringify({
        age: 35,
        email: USERNAME,
        password: PASSWORD,
    });


    let myObjects = http.put(`${BASE_URL}/members/me`, updatePayload, authHeaders);
    check(myObjects, { 'edit member': (obj) => obj.status == 200 });
    sleep(1);
};