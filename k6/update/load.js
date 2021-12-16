import http from 'k6/http';
import {check, group, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 9},
        { duration: '20s', target: 26},
        { duration: '5s', target: 0},
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://wangkdk.kro.kr'
const USERNAME = 'email@email.com';
const PASSWORD = '12345';

export default function () {

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-type': 'application/json'
        },
    };

    let contents = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });

    let response = http.put(`${BASE_URL}/members/me`, contents, authHeaders);
    check(response, {'updated member': (res) => res.status === 200});
    sleep(1);
};
