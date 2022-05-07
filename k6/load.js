import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 10},  // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        {duration: '2m', target: 20}, // stay at 100 users for 10 minutes
        {duration: '10s', target: 0},  // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(95)<2000'],
    },
};

const BASE_URL = 'https://songsimo.kro.kr';
const USERNAME = 'songsimo@gmail.com';
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