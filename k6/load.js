import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 50 },
        { duration: '5s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '5s', target: 100 },
        { duration: '5s', target: 50 },
        { duration: '5s', target: 5 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://infra-subway.gim224-aws.kro.kr';
const USERNAME = 'gt@gt.com';
const PASSWORD = 'gt';

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
