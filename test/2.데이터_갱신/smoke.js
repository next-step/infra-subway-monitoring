import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.0s
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