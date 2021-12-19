import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 100},
        {duration: '10s', target: 200},
        {duration: '10s', target: 300},
        {duration: '10s', target: 400},
        {duration: '10s', target: 500},
        {duration: '10s', target: 600},
        {duration: '10s', target: 700},
        {duration: '10s', target: 800},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://all-forone.p-e.kr';
const USERNAME = 'abc@abc.co.kr';
const PASSWORD = '1234';

function 로그인() {
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

    return loginRes;
}

export default function () {
    let loginRes = 로그인();

    let authHeaders = {
        headers: {
          Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });

    let updateRes = http.post(`${BASE_URL}/members/me`, payload, authHeaders).json();
    check(updateRes, { 'updated member': (response) => response.status === 200 });
    sleep(1);
};