import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 300 }, // below normal load
        { duration: '5m', target: 400 },
        { duration: '2m', target: 500 }, // normal load
        { duration: '5m', target: 600 },
        { duration: '2m', target: 500 }, // around the breaking point
        { duration: '5m', target: 600 },
        { duration: '2m', target: 700 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://15.164.72.205:8080/';
const USERNAME = 'koola976@gmail.com';
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
