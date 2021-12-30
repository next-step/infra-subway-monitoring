import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

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
