import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics'
import { login, generateAuthorizationHeaderWith } from '../login.js';
export const CounterErrors = new Counter('Errors');
export let options = {
    stages: [
        {duration: '10m', target: 126},
        {duration: '10m', target: 126},
        {duration: '10m', target: 0},
    ],

    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.5s
        'Errors': ['count<100'], // count of errors must be less than 100
    },
};
const BASE_URL = 'https://www.find-subway.p-e.kr';
const RANDOM_AGE = generateRandomAgeBetween(20, 60);

export default function ()  {
    const authToken = login();
    getPersonalInformation(authToken);
    editPersonalInformation(authToken);
    function getPersonalInformation(authToken) {
        const authHeaders = generateAuthorizationHeaderWith(authToken);
        let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
        check(myObjects, {
            'go to my page member in successfully': (obj) => obj.id != 0,
        });
    }
    function editPersonalInformation(authToken) {
        const authHeaders = generateAuthorizationHeaderWith(authToken);
        var payload = JSON.stringify({
            age: RANDOM_AGE,
            email: 'test@gmail.com',
            password: 'test12!#',
        });
        const res = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
        check(res, {
            'check 200 status-code after Editing personal information': (res) =>
                res.status === 200,
        });
    }
};

function generateRandomAgeBetween(min, max) {
    return Math.random() * (max - min) + min;
}
