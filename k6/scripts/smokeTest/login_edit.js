import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics'
export const CounterErrors = new Counter('Errors');
export let options = {
    vus: 1, // 1 user looping for 5 minutes
    duration: '5m',

    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
        'Errors': ['count<100'], // count of errors must be less than 100
    },
};
const BASE_URL = 'https://www.find-subway.p-e.kr';
const USERNAME = 'test@gmail.com';
const PASSWORD = 'test12!#';
const AGE = generateRandomAgeBetween(20, 60);

export default function ()  {
    var payload_login = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let loginRes = http.post(`${BASE_URL}/login/token`, payload_login, params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
    var payload_edit = JSON.stringify({
        email: USERNAME,
        age: AGE,
        password: PASSWORD,
    });
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    const result_1 = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(result_1, { 'go to my page member in successfully': (obj) => obj.id != 0 });
    const result_2 = http.put(`${BASE_URL}/members/me`, payload_edit, authHeaders);
    check(result_2, {
        'check 200 status-code after Editing personal information': (res) =>
            res.status === 200,
    });
    sleep(1);
};

function generateRandomAgeBetween(min, max) {
    return Math.random() * (max - min) + min;
}
