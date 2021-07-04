import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 60 },
        { duration: '2m', target: 60 },
        { duration: '1m', target: 120 },
        { duration: '2m', target: 120 },
        { duration: '1m', target: 180 },
        { duration: '2m', target: 180 },
        { duration: '1m', target: 240 },
        { duration: '2m', target: 240 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://mwkwon-service.kro.kr/';
const USERNAME = 'mwkwon@test.com';
const PASSWORD = 'test';

export default function () {

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

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}`, authHeaders);
    check(myObjects, {'response ok': (response) => response.status === 200});
    sleep(1);
};