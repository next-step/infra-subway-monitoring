import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 105 }, // simulate ramp-up of traffic from 1 to 210 users over 10 minutes.
        { duration: '15m', target: 42 }, // stay at 84 users for 15 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://lights93.o-r.kr';
const USERNAME = 'test@test.com';
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


    let headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    let body = {
        email: 'test@test.com',
        password: '1234',
        age: '15'
    };

    let result = http.put(`${BASE_URL}/members/me`, JSON.stringify(body), headers);

    check(result, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
};
